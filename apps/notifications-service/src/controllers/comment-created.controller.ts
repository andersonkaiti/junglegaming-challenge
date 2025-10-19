import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { WebSocketService } from '../websocket/websocket.service'

@Controller()
export class CommentCreatedController {
  constructor(private readonly webSocketService: WebSocketService) {}

  @MessagePattern('comment:new')
  async handleCommentCreated(@Body() data: any) {
    try {
      this.webSocketService.emitEvent({
        event: 'comment:new',
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
