import { Controller, Get } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller('/auth')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  emitEvent() {
    return this.gatewayService.authEvent()
  }
}
