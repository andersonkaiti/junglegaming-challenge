import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Comment from '../database/entities/comment.entity'
import { ListCommentsDTO } from './dto/list-comments.dto'

@Controller()
export class ListCommentsController {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  @MessagePattern('task.comments')
  listComments(@Body() { id }: ListCommentsDTO) {
    try {
      return this.commentRepository.find({
        where: {
          taskId: id,
        },
      })
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
