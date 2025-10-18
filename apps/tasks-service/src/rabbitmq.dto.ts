import { IsObject, IsString } from 'class-validator'

export class RabbitMQDTO {
  @IsString()
  key: string

  @IsObject()
  data: unknown
}
