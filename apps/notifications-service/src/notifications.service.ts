import { Injectable } from '@nestjs/common'

@Injectable()
export class NotificationsService {
  getHello() {
    return 'Event'
  }
}
