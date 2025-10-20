import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Task from '../database/entities/task.entity'
import { FindTasksDTO } from './dto/find-tasks.dto'

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

@Controller()
export class FindTasksController {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  @MessagePattern('tasks')
  async findTasks(@Body() { page, size }: FindTasksDTO) {
    try {
      const safePage = page || DEFAULT_PAGE
      const safeSize = size || DEFAULT_SIZE

      const tasks = await this.taskRepository.find({
        relations: ['taskUsers'],
        take: safeSize,
        skip: safePage * safeSize - safeSize,
      })

      const countTasks = await this.taskRepository.count()

      return {
        page: safePage,
        size: safeSize,
        total: Math.max(Math.ceil(countTasks / safeSize), 1),
        tasks,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
