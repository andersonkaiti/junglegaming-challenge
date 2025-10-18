import {
  Controller,
  Delete,
  HttpException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../../jwt/jwt-auth.guard'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@UseGuards(JwtAuthGuard)
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
