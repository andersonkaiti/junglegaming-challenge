import { Controller, Delete, Param } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class DeleteTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.gatewayService.emitEvent({
      key: 'task.deleted',
      data: { id },
    })
  }
}
