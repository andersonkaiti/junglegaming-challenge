import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '../env.schema'
import { CreateCommentController } from './create-comment.controller'
import { CreateTaskController } from './create-task.controller'
import { DeleteTaskController } from './delete-task.controller'
import { FindTasksController } from './find-tasks.controller'
import { GatewayService } from './gateway.service'
import { GetTaskController } from './get-task.controller'
import { ListCommentsController } from './list-comments.controller'
import { UpdateTaskController } from './update-task.controller'

@Module({
  imports: [
    RabbitMQModule.registerAsync({
      name: 'TASKS',
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const rabbitMQUri = configService.get('RABBIT_MQ_URI', { infer: true })

        return {
          queue: 'TASKS',
          rabbitMQUris: [rabbitMQUri],
        }
      },
    }),
  ],
  controllers: [
    FindTasksController,
    CreateTaskController,
    GetTaskController,
    UpdateTaskController,
    DeleteTaskController,
    CreateCommentController,
    ListCommentsController,
  ],
  providers: [GatewayService],
})
export class TasksGatewayModule {}
