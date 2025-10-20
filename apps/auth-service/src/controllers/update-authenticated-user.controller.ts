import { Body, Controller, NotFoundException } from '@nestjs/common'
import { MessagePattern, RpcException } from '@nestjs/microservices'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import User from '../database/entities/user.entity'
import { UpdateAuthenticatedUserDTO } from './dto/update-authenticated-user.dto'

@Controller()
export class UpdateAuthenticatedUserController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @MessagePattern('updated.user')
  async updateUserById(
    @Body()
    { userId, ...updatedUser }: UpdateAuthenticatedUserDTO
  ) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      Object.assign(user, updatedUser)

      await this.userRepository.update(userId, user)

      return {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    } catch (err) {
      throw new RpcException({
        message: err.message,
        status: err.status || 500,
      })
    }
  }
}
