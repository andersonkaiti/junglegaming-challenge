import { Module } from '@nestjs/common'
import { WSGateway } from './websocket.gateway'
import { WebSocketService } from './websocket.service'

@Module({
  providers: [WSGateway, WebSocketService],
  exports: [WebSocketService],
})
export class WebSocketModule {}
