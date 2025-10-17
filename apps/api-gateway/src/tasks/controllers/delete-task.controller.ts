import { Controller, Delete, HttpException, Param } from '@nestjs/common'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class DeleteTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'task.deleted',
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
