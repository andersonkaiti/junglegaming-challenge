import { Body, Controller, HttpException, Put, UseGuards } from '@nestjs/common'
import { CurrentUser } from 'src/jwt/current-user.decorator'
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard'
import type { UserPayload } from 'src/jwt/jwt.strategy'
import { GatewayService } from '../gateway.service'
import { UpdateAuthenticatedUserDTO } from './dto/update-authenticated-user.dto'

const DEFAULT_ERROR_STATUS_CODE = 500

@UseGuards(JwtAuthGuard)
@Controller()
export class UpdateAuthenticatedUserController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Put('user')
  async updateUser(
    @CurrentUser() user: UserPayload,
    @Body() { username, password }: UpdateAuthenticatedUserDTO
  ) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'updated.user',
        data: {
          userId: user.sub,
          username,
          password,
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
