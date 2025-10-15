import { Body, Controller, Post } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class CreateTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  createTask(@Body() data: unknown) {
    return this.gatewayService.emitEvent({
      key: 'task.created',
      data,
    })
  }
}
