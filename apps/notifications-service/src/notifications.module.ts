import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommentCreatedController } from './controllers/comment-created.controller'
import { TaskCreatedController } from './controllers/task-created.controller'
import { TaskUpdatedController } from './controllers/task-updated.controller'
import { envSchema } from './env.schema'
import { NotificationsRabbitMQModule } from './rabbitmq/notifications-rabbitmq.module'
import { WebSocketModule } from './websocket/websocket.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    NotificationsRabbitMQModule,
    WebSocketModule,
  ],
  controllers: [
    CommentCreatedController,
    TaskCreatedController,
    TaskUpdatedController,
  ],
})
export class NotificationsModule {}
