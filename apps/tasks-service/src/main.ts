import { RabbitMQService } from '@junglegaming-challenge/rabbitmq'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RmqOptions } from '@nestjs/microservices'
import { Env } from './env.schema'
import { TasksModule } from './tasks.module'

async function bootstrap() {
  const app = await NestFactory.create(TasksModule)

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
      queue: 'TASKS',
      rabbitMQUris: [rabbitMQUri],
      noAck: true,
    })
  )

  await app.startAllMicroservices()

  const PORT = configService.get('PORT', { infer: true })

  await app.listen(PORT)

  console.log(`🚀 Tasks service listening on port ${PORT}`)
}

bootstrap()
