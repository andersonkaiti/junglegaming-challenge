import { Body, Controller, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import User from '../database/entities/user.entity'
import { RefreshTokenDTO } from './dto/refresh.dto'

interface IJwtPayload {
  id: string
}

@Controller()
export class RefreshTokenController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt: JwtService
  ) {}

  @MessagePattern('refresh')
  async refreshToken(@Body() body: RefreshTokenDTO) {
    try {
      const token = body.token.replace('Bearer', '').trim()

      const decodedToken = this.jwt.decode<IJwtPayload>(token)

      const { id } = decodedToken

      const user = await this.userRepository.findOne({
        where: {
          id,
        },
      })

      if (!user) {
        throw new UnauthorizedException('User not found.')
      }

      const newToken = this.jwt.sign({ sub: user.id }, { expiresIn: '7d' })

      return {
        token: newToken,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
