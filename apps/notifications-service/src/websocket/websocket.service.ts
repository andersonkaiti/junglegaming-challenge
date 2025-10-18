import { Injectable } from '@nestjs/common'
import { WebSocketDTO } from './websocket.dto'
import { WSGateway } from './websocket.gateway'

@Injectable()
export class WebSocketService {
  constructor(private readonly webSocketGateway: WSGateway) {}

  emitEvent({ event, data }: WebSocketDTO) {
    this.webSocketGateway.emitEvent({ event, data })
  }
}
