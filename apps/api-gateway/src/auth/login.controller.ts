import { Body, Controller, Post } from '@nestjs/common'
import { LoginDTO } from './dto/login.dto'
import { GatewayService } from './gateway.service'

@Controller()
export class LoginController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.gatewayService.emitEvent({
      key: 'login',
      data,
    })
  }
}
