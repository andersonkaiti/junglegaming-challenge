import { RabbitMQService } from '@junglegaming-challenge/rabbitmq'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RmqOptions } from '@nestjs/microservices'
import { Env } from './env.schema'
import { TasksModule } from './tasks.module'

async function bootstrap() {
  const app = await NestFactory.create(TasksModule)

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const rabbitMQUri = configService.get('RABBIT_MQ_URI', { infer: true })

  app.connectMicroservice<RmqOptions>(
    rabbitMQService.getOptions({
      queue: 'TASKS',
      rabbitMQUris: [rabbitMQUri],
      noAck: true,
    })
  )

  await app.startAllMicroservices()
}

bootstrap()
