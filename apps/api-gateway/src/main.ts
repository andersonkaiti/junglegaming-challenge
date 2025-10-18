import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'
import { GatewayModule } from './gateway.module'

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule)

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  app.useGlobalGuards(app.get(ThrottlerGuard))

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
