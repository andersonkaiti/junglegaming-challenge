import { Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Task from '../database/entities/task.entity'

@Controller()
export class FindTasksController {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @MessagePattern('tasks')
  async findTasks() {
    try {
      return await this.taskRepository.find({
        relations: ['taskUsers'],
      })
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
