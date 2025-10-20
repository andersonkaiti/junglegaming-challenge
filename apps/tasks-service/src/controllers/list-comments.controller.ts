import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import Comment from '../database/entities/comment.entity'
import { ListCommentsDTO } from './dto/list-comments.dto'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

@Controller()
export class ListCommentsController {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  @MessagePattern('task.comments')
  async listComments(@Body() { id, page, size, filter = '' }: ListCommentsDTO) {
    try {
      const safePage = page || DEFAULT_PAGE
      const safeSize = size || DEFAULT_SIZE

      const comments = await this.commentRepository.find({
        where: {
          taskId: id,
          text: Like(`%${filter}%`),
        },
        take: safeSize,
        skip: safePage * safeSize - safeSize,
      })

      const countComments = await this.commentRepository.count({
        where: {
          taskId: id,
          text: Like(`%${filter}%`),
        },
      })

      return {
        page: safePage,
        size: safeSize,
        total: Math.max(Math.ceil(countComments / safeSize), 1),
        comments,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
