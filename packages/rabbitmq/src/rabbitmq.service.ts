import { ConfigService, Env } from '@junglegaming-challenge/config'
import { Injectable } from '@nestjs/common'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'

@Injectable()
export class RabbitMQService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          this.configService.get<string>('RABBIT_MQ_URI', {
            infer: true,
          }),
        ],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`, {
          infer: true,
        }),
        noAck,
        persistent: true,
      },
    }
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()
    channel.ack(originalMessage)
  }
}
