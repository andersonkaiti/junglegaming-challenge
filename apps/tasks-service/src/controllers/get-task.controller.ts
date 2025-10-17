import { Body, Controller, NotFoundException } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Task from '../database/entities/task.entity'
import { GetTaskDTO } from './dto/get-task.dto'

@Controller()
export class GetTaskController {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @MessagePattern('task.get')
  async getTask(@Body() { id }: GetTaskDTO) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id,
        },
        relations: ['taskUsers'],
      })

      if (!task) {
        throw new NotFoundException('Task not found.')
      }

      return {
        task,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
