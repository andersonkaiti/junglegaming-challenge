import { Body, Controller, NotFoundException } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import TaskUser from '../database/entities/task-user.entity'
import Task from '../database/entities/task.entity'
import { RabbitMQService } from '../tasks.service'
import { UpdateTaskDTO } from './dto/update-task.dto'

@Controller()
export class UpdateTaskController {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskUser)
    private readonly taskUserRepository: Repository<TaskUser>,
    private readonly rabbitMQService: RabbitMQService
  ) {}

  @MessagePattern('task.updated')
  async updateTask(@Body() { id, userIds, ...taskData }: UpdateTaskDTO) {
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

      await this.taskRepository.update(id, taskData)

      let newUserIds: TaskUser[] | undefined

      if (userIds) {
        await this.taskUserRepository.delete({ taskId: id })

        const relations = userIds.map((userId) =>
          this.taskUserRepository.create({
            taskId: task.id,
            userId,
          })
        )

        newUserIds = await this.taskUserRepository.save(relations)
      }

      this.rabbitMQService.emitEvent({
        key: 'task:updated',
        data: {
          ...taskData,
          newUserIds,
        },
      })

      return {
        ...taskData,
        newUserIds,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
