import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import z from 'zod'
import { Env } from '../env.schema'

const tokenPayloadSchema = z.object({
  sub: z.uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService<Env, true>) {
    const secretKey = configService.get('SECRET_KEY', { infer: true })

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    })
  }

  validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload)
  }
}
