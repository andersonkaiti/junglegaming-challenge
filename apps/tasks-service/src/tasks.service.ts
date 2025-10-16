import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class TasksService {
  constructor(
    @Inject('NOTIFICATIONS') private readonly rabbitMQClient: ClientProxy
  ) {}

  getHello() {
    console.log('Event emitted')

    return this.rabbitMQClient.emit(
      'notifications_event',
      'Notifications event!'
    )
  }
}
