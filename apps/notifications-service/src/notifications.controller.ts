import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { NotificationsService } from './notifications.service'

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notifications_event')
  handleEvent() {
    console.log('Event received')

    return this.notificationsService.getHello()
  }
}
