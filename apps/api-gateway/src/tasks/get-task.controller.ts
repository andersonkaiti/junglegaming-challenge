import { Controller, Get, Param } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class GetTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.gatewayService.emitEvent({
      key: 'task.get',
      data: { id },
    })
  }
}
