import { Controller, Headers, HttpException, Post } from '@nestjs/common'
import { GatewayService } from './gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class RefreshController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('refresh')
  async refresh(@Headers('authorization') token: string) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'refresh',
        data: {
          token,
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
