import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../../jwt/jwt-auth.guard'
import { GatewayService } from '../gateway.service'

const DEFAULT_ERROR_STATUS_CODE = 500

@UseGuards(JwtAuthGuard)
@Controller()
export class ListCommentsController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get(':id/comments')
  async listComments(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('filter') filter?: string
  ) {
    try {
      return await this.gatewayService.emitEvent({
        key: 'task.comments',
        data: {
          id,
          page: Number(page),
          size: Number(size),
          filter,
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
