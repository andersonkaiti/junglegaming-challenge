import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Task from '../database/entities/task.entity'
import { FindTasksDTO } from './dto/find-tasks.dto'

@Controller()
export class FindTasksController {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @MessagePattern('tasks')
  async findTasks(@Body() { page, size = 10 }: FindTasksDTO) {
    try {
      return await this.taskRepository.find({
        relations: ['taskUsers'],
        take: size,
        skip: page * size - size,
      })
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
