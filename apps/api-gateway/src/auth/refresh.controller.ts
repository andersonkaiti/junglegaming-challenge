import { Controller, Post } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class RefreshController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('refresh')
  refresh() {
    return this.gatewayService.emitEvent({
      key: 'refresh',
      data: undefined,
    })
  }
}
