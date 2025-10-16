import { Injectable } from '@nestjs/common'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'

interface IRabbitMQServiceOptions {
  queue: string
  rabbitMQUris: string[]
  noAck: boolean
}

@Injectable()
export class RabbitMQService {
  getOptions({
    queue,
    rabbitMQUris,
    noAck = false,
  }: IRabbitMQServiceOptions): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [...rabbitMQUris],
        queue,
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
