import { Body, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { GatewayDTO } from './dto/gateway.dto'

@Injectable()
export class GatewayService {
  constructor(@Inject('AUTH') private readonly rabbitMQClient: ClientProxy) {}

  emitEvent(@Body() { key, data }: GatewayDTO) {
    return this.rabbitMQClient.emit(key, data)
  }
}
