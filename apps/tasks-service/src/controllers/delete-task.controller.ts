import { Body, Controller, NotFoundException } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import Task from '../database/entities/task.entity'
import { DeleteTaskDTO } from './dto/delete-task.dto'

@Controller()
export class DeleteTaskController {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>
  ) {}

  @MessagePattern('task.deleted')
  async deleteTask(@Body() { id }: DeleteTaskDTO) {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id,
        },
      })

      if (!task) {
        throw new NotFoundException("Task doesn't exist.")
      }

      await this.taskRepository.delete({ id })

      return {
        message: 'Deleted successfully.',
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
