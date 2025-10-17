import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { GatewayService } from '../gateway.service'
import { CreateTaskDTO } from './dto/create-task.dto'

const DEFAULT_ERROR_STATUS_CODE = 500

@Controller()
export class CreateTaskController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  async createTask(@Body() data: CreateTaskDTO) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'task.created',
        data,
      })
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || DEFAULT_ERROR_STATUS_CODE
      )
    }
  }
}
