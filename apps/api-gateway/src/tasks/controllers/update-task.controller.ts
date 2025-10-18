import {
  Body,
  Controller,
  HttpException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@UseGuards(JwtAuthGuard)
@Controller()
export class UpdateTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() task: any) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'task.updated',
        data: {
          id,
          ...task,
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
