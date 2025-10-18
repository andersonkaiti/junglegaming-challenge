import {
  Controller,
  Get,
  HttpException,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../../jwt/jwt-auth.guard'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@UseGuards(JwtAuthGuard)
@Controller()
export class FindTasksController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  async findTasks(@Query('page') page?: string, @Query('size') size?: string) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'tasks',
        data: {
          page: Number(page),
          size: Number(size),
        },
      })
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || DEFAULT_ERROR_STATUS_CODE
      )
    }
  }
}
