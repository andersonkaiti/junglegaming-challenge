import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateCommentController } from './controllers/create-comment.controller'
import { CreateTaskController } from './controllers/create-task.controller'
import { DeleteTaskController } from './controllers/delete-task.controller'
import { FindTasksController } from './controllers/find-tasks.controller'
import { GetTaskController } from './controllers/get-task.controller'
import { ListCommentsController } from './controllers/list-comments.controller'
import { UpdateTaskController } from './controllers/update-task.controller'
import { DatabaseModule } from './database/database.module'
import { envSchema } from './env.schema'
import { NotificationsRabbitMQModule } from './rabbitmq/notifications-rabbitmq.module'
import { TasksRabbitMQModule } from './rabbitmq/tasks-rabbitmq.module'
import { RabbitMQService } from './tasks.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    TasksRabbitMQModule,
    NotificationsRabbitMQModule,
    DatabaseModule,
  ],
  controllers: [
    CreateTaskController,
    FindTasksController,
    DeleteTaskController,
    GetTaskController,
    UpdateTaskController,
    CreateCommentController,
    ListCommentsController,
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class TasksModule {}
