import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { AuthGatewayModule } from './auth/gateway.module'
import { envSchema } from './env.schema'
import { TasksGatewayModule } from './tasks/gateway.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    RabbitMQModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthGatewayModule,
      },
      {
        path: 'tasks',
        module: TasksGatewayModule,
      },
    ]),
    AuthGatewayModule,
    TasksGatewayModule,
  ],
})
export class GatewayModule {}
