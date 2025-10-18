import { Body, Controller, NotFoundException } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Comment from '../database/entities/comment.entity'
import Task from '../database/entities/task.entity'
import { RabbitMQService } from '../tasks.service'
import { CreateCommentDTO } from './dto/create-comment.dto'

@Controller()
export class CreateCommentController {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    private readonly rabbitMQService: RabbitMQService
  ) {}

  @MessagePattern('task.comment.created')
  async createComment(@Body() data: CreateCommentDTO) {
    try {
      const { taskId } = data

      const task = await this.taskRepository.findOne({
        where: {
          id: taskId,
        },
      })

      if (!task) {
        throw new NotFoundException('Task not found.')
      }

      const comment = this.commentRepository.create(data)

      const savedComment = await this.commentRepository.save(comment)

      this.rabbitMQService.emitEvent({
        key: 'comment:new',
        data: savedComment,
      })

      return savedComment
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
