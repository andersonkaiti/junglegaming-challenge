import { Controller, Get, HttpException, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@UseGuards(JwtAuthGuard)
@Controller()
export class ListUsersController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('users')
  async findUsers() {
    try {
      return await this.gatewayService.emitEvent({
        key: 'users',
      })
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || DEFAULT_ERROR_STATUS_CODE
      )
    }
  }
}
