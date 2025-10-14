import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { join } from 'node:path'
import { envSchema } from './env.schema'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../../.env'),
      validate: (env) => envSchema.parse(env),
    }),
  ],
})
export class ConfigModule {}
