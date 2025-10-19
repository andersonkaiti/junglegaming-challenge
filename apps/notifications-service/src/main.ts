import { RabbitMQService } from '@junglegaming-challenge/rabbitmq'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RmqOptions } from '@nestjs/microservices'
import { Env } from './env.schema'
import { NotificationsModule } from './notifications.module'

const WEBSOCKET_PORT = 4000

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const rabbitMQUri = configService.get('RABBIT_MQ_URI', { infer: true })

  app.connectMicroservice<RmqOptions>(
    rabbitMQService.getOptions({
      queue: 'NOTIFICATIONS',
      rabbitMQUris: [rabbitMQUri],
      noAck: true,
    })
  )

  await app.startAllMicroservices()

  await app.listen(WEBSOCKET_PORT)

  console.log(
    `🚀 Notification service WebSocket listening on port ${WEBSOCKET_PORT}`
  )
}

bootstrap()
