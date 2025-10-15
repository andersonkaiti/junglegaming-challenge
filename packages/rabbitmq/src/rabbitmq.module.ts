import { DynamicModule, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RabbitMQService } from './rabbitmq.service'

interface IRabbitMQModuleOptions {
  queue: string
  rabbitMQUris: string[]
}

interface IRabbitMQAsyncOptions {
  name?: string
  useFactory: (
    ...args: any[]
  ) => Promise<IRabbitMQModuleOptions> | IRabbitMQModuleOptions
  inject?: any[]
  imports?: any[]
}

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  static registerAsync(options: IRabbitMQAsyncOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ...(options.imports || []),
        ClientsModule.registerAsync([
          {
            name: options.name || 'RABBITMQ_CLIENT',
            inject: options.inject || [],
            useFactory: async (...args: any[]) => {
              const { queue, rabbitMQUris } = await options.useFactory(...args)

              return {
                transport: Transport.RMQ,
                options: {
                  urls: rabbitMQUris,
                  queue,
                },
              }
            },
          },
        ]),
      ],
      providers: [RabbitMQService],
      exports: [RabbitMQService, ClientsModule],
    }
  }
}
