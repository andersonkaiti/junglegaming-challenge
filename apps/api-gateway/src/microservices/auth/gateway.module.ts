import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '../../env.schema'
import { LoginController } from './controllers/login.controller'
import { RefreshController } from './controllers/refresh.controller'
import { RegisterController } from './controllers/register.controller'
import { GatewayService } from './gateway.service'

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
