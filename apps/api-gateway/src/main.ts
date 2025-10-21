import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'
import { Env } from './env.schema'
import { GatewayModule } from './gateway.module'
import initSwagger from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule)

  app.enableCors({
    origin: ['http://localhost:5173', 'http://web:5173'],
    credentials: true,
  })

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  app.useGlobalGuards(app.get(ThrottlerGuard))

  initSwagger(app)

  const configService = app.get<ConfigService<Env, true>>(ConfigService)

  const PORT = configService.get('PORT', { infer: true })

  await app.listen(PORT)

  console.log(`🚀 API Gateway listening on port ${PORT}`)
}

bootstrap()
