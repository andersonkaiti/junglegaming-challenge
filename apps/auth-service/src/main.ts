import { RabbitMQService } from '@junglegaming-challenge/rabbitmq'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { RmqOptions } from '@nestjs/microservices'
import 'reflect-metadata'
import { AuthModule } from './auth.module'
import { Env } from './env.schema'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const rabbitMQUri = configService.get('RABBIT_MQ_URI', { infer: true })

  app.connectMicroservice<RmqOptions>(
    rabbitMQService.getOptions({
      queue: 'AUTH',
      rabbitMQUris: [rabbitMQUri],
      noAck: true,
    })
  )

  await app.startAllMicroservices()
}

bootstrap()
