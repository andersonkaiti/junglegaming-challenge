import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { WebSocketService } from '../websocket/websocket.service'

@Controller()
export class TaskUpdatedController {
  constructor(private readonly webSocketService: WebSocketService) {}

  @MessagePattern('task:updated')
  async handleTaskUpdated(@Body() data: any) {
    try {
      this.webSocketService.emitEvent({
        event: 'task:updated',
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
