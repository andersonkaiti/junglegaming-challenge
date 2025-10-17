import { Controller, Get, HttpException } from '@nestjs/common'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class FindTasksController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  async findTasks() {
    try {
      return await this.gatewayService.emitEvent({
        key: 'tasks',
      })
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || DEFAULT_ERROR_STATUS_CODE
      )
    }
  }
}
