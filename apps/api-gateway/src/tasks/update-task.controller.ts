import { Body, Controller, Param, Put } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class UpdateTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() data: unknown) {
    return this.gatewayService.emitEvent({
      key: 'task.updated',
      data: { id, ...((data as object) || {}) },
    })
  }
}
