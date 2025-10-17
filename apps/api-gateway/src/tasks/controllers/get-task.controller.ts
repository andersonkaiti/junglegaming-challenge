import { Controller, Get, HttpException, Param } from '@nestjs/common'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class GetTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get(':id')
  async getTask(@Param('id') id: string) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'task.get',
        data: {
          id,
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
