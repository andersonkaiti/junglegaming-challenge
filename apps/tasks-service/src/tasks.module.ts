import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './database/database.module'
import { envSchema } from './env.schema'
import { TasksRabbitMQModule } from './rabbitmq/tasks-rabbitmq.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    TasksRabbitMQModule,
    DatabaseModule,
  ],
})
export class TasksModule {}
