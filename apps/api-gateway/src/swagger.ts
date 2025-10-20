import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

export default function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.use(
    '/api/docs',
    apiReference({
      content: document,
      theme: 'kepler',
    })
  )
}
