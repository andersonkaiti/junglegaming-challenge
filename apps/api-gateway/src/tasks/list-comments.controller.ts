import { Controller, Get, Param, Query } from '@nestjs/common'
import { GatewayService } from './gateway.service'

@Controller()
export class ListCommentsController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get(':id/comments')
  listComments(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('size') size?: string
  ) {
    return this.gatewayService.emitEvent({
      key: 'task.comments',
      data: { id, page, size },
    })
  }
}
