import { Body, Controller, Post } from '@nestjs/common'
import { RegisterDTO } from './dto/register.dto'
import { GatewayService } from './gateway.service'

@Controller()
export class RegisterController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('register')
  register(@Body() data: RegisterDTO) {
    return this.gatewayService.emitEvent({
      key: 'register',
      data,
    })
  }
}
