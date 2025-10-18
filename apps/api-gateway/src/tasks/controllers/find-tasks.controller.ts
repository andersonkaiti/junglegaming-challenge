import { Controller, Get, HttpException, Query } from '@nestjs/common'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

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
