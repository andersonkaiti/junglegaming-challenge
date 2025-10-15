import { Body, Controller, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcryptjs'
import { Repository } from 'typeorm'
import User from '../database/entities/user.entity'
import { LoginDTO } from './dto/login.dto'

@Controller()
export class LoginController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwt: JwtService
  ) {}

  @MessagePattern('login')
  async login(@Body() body: LoginDTO) {
    try {
      const { email, password } = body

      const user = await this.userRepository.findOne({
        where: {
          email,
        },
      })

      if (!user) {
        throw new UnauthorizedException('Invalid credentials.')
      }

      const isPasswordValid = compare(password, user.password)

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials.')
      }

      const token = this.jwt.sign({ sub: user.id }, { expiresIn: '15m' })

      return {
        token,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
