import { Body, Controller, NotFoundException } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import User from '../database/entities/user.entity'
import { AuthenticatedUserDTO } from './dto/authenticated-user.dto'

@Controller()
export class GetAuthenticatedUserController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @MessagePattern('user')
  async findUserByEmail(@Body() { userId }: AuthenticatedUserDTO) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      return user
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status || 500,
      })
    }
  }
}
