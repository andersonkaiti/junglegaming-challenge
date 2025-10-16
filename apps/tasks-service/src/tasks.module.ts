import { RabbitMQModule } from '@junglegaming-challenge/rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Env, envSchema } from './env.schema'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    RabbitMQModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const rabbitMQUri = configService.get('RABBIT_MQ_URI', { infer: true })

        return {
          queue: 'TASKS',
          rabbitMQUris: [rabbitMQUri],
        }
      },
    }),
    RabbitMQModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const rabbitMQUri = configService.get('RABBIT_MQ_URI', { infer: true })

        return {
          queue: 'NOTIFICATIONS',
          rabbitMQUris: [rabbitMQUri],
        }
      },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
