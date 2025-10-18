import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { GatewayService } from '../gateway.service'
import { LoginDTO } from './dto/login.dto'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class LoginController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('login')
  async login(@Body() data: LoginDTO) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'login',
        data,
      })
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || DEFAULT_ERROR_STATUS_CODE
      )
    }
  }
}
