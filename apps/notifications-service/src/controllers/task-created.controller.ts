import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { WebSocketService } from '../websocket/websocket.service'

@Controller()
export class TaskCreatedController {
  constructor(private readonly webSocketService: WebSocketService) {}

  @MessagePattern('task:created')
  async handleTaskCreated(@Body() data: any) {
    try {
      this.webSocketService.emitEvent({
        event: 'task:created',
        data,
      })
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
