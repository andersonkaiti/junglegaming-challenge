import { RabbitMQService } from '@junglegaming-challenge/rabbitmq'
import { NestFactory } from '@nestjs/core'
import { RmqOptions } from '@nestjs/microservices'
import { TasksModule } from './tasks.module'

async function bootstrap() {
  const app = await NestFactory.create(TasksModule)

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService)

  app.connectMicroservice<RmqOptions>(rabbitMQService.getOptions('TASKS', true))

  await app.startAllMicroservices()
}

bootstrap()
