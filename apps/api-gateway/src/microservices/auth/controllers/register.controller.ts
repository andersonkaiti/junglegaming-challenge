import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { GatewayService } from '../gateway.service'
import { RegisterDTO } from './dto/register.dto'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class RegisterController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('register')
  async register(@Body() data: RegisterDTO) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'register',
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
