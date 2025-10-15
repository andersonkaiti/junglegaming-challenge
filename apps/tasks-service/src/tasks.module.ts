import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env.schema'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
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
