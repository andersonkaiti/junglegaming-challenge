import { Body, ConflictException, Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import User from '../database/entities/user.entity'
import { RegisterDTO } from './dto/register.dto'

@Controller()
export class RegisterController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @MessagePattern('register')
  async register(@Body() body: RegisterDTO) {
    try {
      const { username, email, password } = body

      const userAlreadyExists = await this.userRepository.findOne({
        where: {
          email,
        },
      })

      if (userAlreadyExists) {
        throw new ConflictException('User already exists.')
      }

      const user = this.userRepository.create({
        username,
        email,
        password,
      })

      const saved = await this.userRepository.save(user)

      const { password: _password, ...savedUser } = saved

      return savedUser
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status,
      })
    }
  }
}
