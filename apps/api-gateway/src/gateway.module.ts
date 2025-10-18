import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { envSchema } from './env.schema'
import { AuthModule } from './jwt/auth.module'
import { AuthGatewayModule } from './microservices/auth/gateway.module'
import { TasksGatewayModule } from './microservices/tasks/gateway.module'

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
    AuthModule,
  ],
})
export class GatewayModule {}
