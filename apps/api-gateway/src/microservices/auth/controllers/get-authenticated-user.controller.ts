import { Controller, Get, HttpException, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/jwt/current-user.decorator'
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard'
import type { UserPayload } from 'src/jwt/jwt.strategy'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@UseGuards(JwtAuthGuard)
@Controller()
export class GetAuthenticatedUserController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('user')
  async findUser(@CurrentUser() user: UserPayload) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'user',
        data: {
          userId: user.sub,
        },
      })
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || DEFAULT_ERROR_STATUS_CODE
      )
    }
  }
}
