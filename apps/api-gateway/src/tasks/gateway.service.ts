import { Body, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { GatewayDTO } from './controllers/dto/gateway.dto'

@Injectable()
export class GatewayService {
  constructor(@Inject('TASKS') private readonly rabbitMQClient: ClientProxy) {}

  emitEvent(@Body() { key, data = {} }: GatewayDTO) {
    return firstValueFrom(this.rabbitMQClient.send(key, data))
  }
}
