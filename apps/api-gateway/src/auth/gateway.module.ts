import { ConfigModule } from '@junglegaming-challenge/config'
import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { GatewayController } from './gateway.controller'
import { GatewayService } from './gateway.service'

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.register({
      name: 'AUTH',
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class AuthGatewayModule {}
