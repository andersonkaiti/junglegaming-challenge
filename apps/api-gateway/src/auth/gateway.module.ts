import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '../env.schema'
import { GatewayService } from './gateway.service'
import { LoginController } from './login.controller'
import { RefreshController } from './refresh.controller'
import { RegisterController } from './register.controller'

@Module({
  imports: [
    RabbitMQModule.registerAsync({
      name: 'AUTH',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const rabbitMQUri = configService.get('RABBIT_MQ_URI', { infer: true })

        return {
          queue: 'AUTH',
          rabbitMQUris: [rabbitMQUri],
        }
      },
    }),
  ],
  controllers: [RegisterController, LoginController, RefreshController],
  providers: [GatewayService],
})
export class AuthGatewayModule {}
