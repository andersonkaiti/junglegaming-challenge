import { RabbitMQService } from '@junglegaming-challenge/rabbitmq'
import { NestFactory } from '@nestjs/core'
import { RmqOptions } from '@nestjs/microservices'
import { AuthModule } from './auth.module'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService)

  app.connectMicroservice<RmqOptions>(rabbitMQService.getOptions('AUTH', true))

  await app.startAllMicroservices()
}

bootstrap()
