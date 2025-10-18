import { Body, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import TaskUser from '../database/entities/task-user.entity'
import Task from '../database/entities/task.entity'
import { RabbitMQService } from '../tasks.service'
import { CreateTaskDTO } from './dto/create-task.dto'

@Controller()
export class CreateTaskController {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskUser)
    private readonly taskUserRepository: Repository<TaskUser>,
    private readonly rabbitMQService: RabbitMQService
  ) {}

  @MessagePattern('task.created')
  async createTask(@Body() data: CreateTaskDTO) {
    try {
      const { userIds, ...taskData } = data

      const task = this.taskRepository.create(taskData)

      await this.taskRepository.save(task)

      const relations = userIds.map((userId) =>
        this.taskUserRepository.create({
          taskId: task.id,
          userId,
        })
      )

      await this.taskUserRepository.save(relations)

      this.rabbitMQService.emitEvent({
        key: 'task:created',
        data: {
          ...task,
          users: userIds,
        },
      })

      return {
        ...task,
        users: userIds,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
