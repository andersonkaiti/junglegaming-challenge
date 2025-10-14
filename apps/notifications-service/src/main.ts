import { RabbitMQService } from '@junglegaming-challenge/rabbitmq'
import { NestFactory } from '@nestjs/core'
import { RmqOptions } from '@nestjs/microservices'
import { NotificationsModule } from './notifications.module'

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule)

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService)

  app.connectMicroservice<RmqOptions>(
    rabbitMQService.getOptions('NOTIFICATIONS', true)
  )

  await app.startAllMicroservices()
}

bootstrap()
