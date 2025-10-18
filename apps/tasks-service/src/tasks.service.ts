import { Body, Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { RabbitMQDTO } from './rabbitmq.dto'

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('NOTIFICATIONS') private readonly rabbitMQClient: ClientProxy
  ) {}

  emitEvent(@Body() { key, data = {} }: RabbitMQDTO) {
    return firstValueFrom(this.rabbitMQClient.emit(key, data))
  }
}
