import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModuleWrapper } from './auth/jwt.module'
import { LoginController } from './controllers/login.controller'
import { RegisterController } from './controllers/register.controller'
import { DatabaseModule } from './database/database.module'
import { envSchema } from './env.schema'
import { RabbitMQModuleWrapper } from './rabbitmq/rabbitmq.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    RabbitMQModuleWrapper,
    DatabaseModule,
    JwtModuleWrapper,
  ],
  controllers: [RegisterController, LoginController],
})
export class AuthModule {}
