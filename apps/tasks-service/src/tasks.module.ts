import { ConfigModule } from '@junglegaming-challenge/config'
import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.register({
      name: 'TASKS',
    }),
    RabbitMQModule.register({
      name: 'NOTIFICATIONS',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
