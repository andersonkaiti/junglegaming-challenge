import { Controller } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import User from '../database/entities/user.entity'

@Controller()
export class ListUsersController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @MessagePattern('users')
  async findUsers() {
    try {
      return await this.userRepository.find({
        select: {
          username: true,
          email: true,
          id: true,
        },
      })
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status || 500,
      })
    }
  }
}
