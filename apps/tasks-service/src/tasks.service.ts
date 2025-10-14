import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class TasksService {
  constructor(
    @Inject('NOTIFICATIONS') private readonly rabbitMQCLient: ClientProxy
  ) {}

  getHello() {
    console.log('Event emitted')

    return this.rabbitMQCLient.emit(
      'notifications_event',
      'Notifications event!'
    )
  }
}
