import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Env } from '../env.schema'

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env, true>) => {
        const secretKey = configService.get('SECRET_KEY', { infer: true })

        return {
          global: true,
          secret: secretKey,
        }
      },
    }),
  ],
  exports: [JwtModule],
})
export class JwtModuleWrapper {}
