import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class GatewayService {
  constructor(@Inject('TASKS') private readonly rabbitMQCLient: ClientProxy) {}

  authEvent() {
    console.log('Event emitted')

    return this.rabbitMQCLient.emit('tasks_event', 'Tasks event!')
  }
}
