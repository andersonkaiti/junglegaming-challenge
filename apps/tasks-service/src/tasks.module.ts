import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateTaskController } from './controllers/create-task.controller'
import { DeleteTaskController } from './controllers/delete-task.controller'
import { FindTasksController } from './controllers/find-tasks.controller'
import { GetTaskController } from './controllers/get-task.controller'
import { UpdateTaskController } from './controllers/update-task.controller'
import { DatabaseModule } from './database/database.module'
import { envSchema } from './env.schema'
import { TasksRabbitMQModule } from './rabbitmq/tasks-rabbitmq.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    TasksRabbitMQModule,
    DatabaseModule,
  ],
  controllers: [
    CreateTaskController,
    FindTasksController,
    DeleteTaskController,
    GetTaskController,
    UpdateTaskController,
  ],
})
export class TasksModule {}
