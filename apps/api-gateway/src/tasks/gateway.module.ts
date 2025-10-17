import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '../env.schema'
import { CreateTaskController } from './controllers/create-task.controller'
import { DeleteTaskController } from './controllers/delete-task.controller'
import { FindTasksController } from './controllers/find-tasks.controller'
import { GatewayService } from './gateway.service'

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
    CreateTaskController,
    FindTasksController,
    DeleteTaskController,
  ],
  providers: [GatewayService],
})
export class TasksGatewayModule {}
