import { ConfigModule } from '@junglegaming-challenge/config'
import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { AuthGatewayModule } from './auth/gateway.module'
import { TasksGatewayModule } from './tasks/gateway.module'

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule,
    AuthGatewayModule,
    TasksGatewayModule,
  ],
})
export class GatewayModule {}
