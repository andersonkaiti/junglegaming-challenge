import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @EventPattern('auth_event')
  handleEvent() {
    console.log('Event received')

    return this.appService.getHello()
  }
}
