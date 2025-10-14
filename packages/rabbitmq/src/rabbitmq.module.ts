import {
  ConfigModule,
  ConfigService,
  Env,
} from '@junglegaming-challenge/config'
import { DynamicModule, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RabbitMQService } from './rabbitmq.service'

interface IRabbitMQModuleOptions {
  name: string
}

@Module({
  imports: [ConfigModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  static register({ name }: IRabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService<Env, true>) => ({
              transport: Transport.RMQ,
              options: {
                urls: [
                  configService.get<string>('RABBIT_MQ_URI', {
                    infer: true,
                  }),
                ],
                queue: configService.get<string>(`RABBIT_MQ_${name}_QUEUE`, {
                  infer: true,
                }),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    }
  }
}
