import { Body, Controller, Param, Post } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class CreateCommentController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post(':id/comments')
  createComment(@Param('id') id: string, @Body() data: unknown) {
    return this.gatewayService.emitEvent({
      key: 'task.comment.created',
      data: { id, ...((data as object) || {}) },
    })
  }
}
