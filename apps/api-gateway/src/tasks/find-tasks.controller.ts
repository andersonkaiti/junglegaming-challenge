import { Controller, Get } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class FindTasksController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  findTasks() {
    return this.gatewayService.emitEvent({
      key: 'tasks',
    })
  }
}
