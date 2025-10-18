import { Body, Controller, HttpException, Param, Post } from '@nestjs/common'
import { GatewayService } from '../gateway.service'
import { CreateCommentDTO } from './dto/create-comment.dto'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class CreateCommentController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post(':id/comments')
  async createComment(
    @Param('id') taskId: string,
    @Body() data: CreateCommentDTO
  ) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'task.comment.created',
        data: {
          taskId,
          ...data,
        },
      })
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || DEFAULT_ERROR_STATUS_CODE
      )
    }
  }
}
