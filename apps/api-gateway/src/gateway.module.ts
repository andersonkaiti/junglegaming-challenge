import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'
import { envSchema } from './env.schema'
import { AuthModule } from './jwt/auth.module'
import { AuthGatewayModule } from './microservices/auth/gateway.module'
import { TasksGatewayModule } from './microservices/tasks/gateway.module'

const ONE_SECOND = 1000
const TEN_SECONDS = 10 * ONE_SECOND

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: TEN_SECONDS,
          limit: 10,
        },
      ],
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
