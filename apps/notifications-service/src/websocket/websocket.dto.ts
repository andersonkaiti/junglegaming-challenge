import { IsObject, IsString } from 'class-validator'

export class WebSocketDTO {
  @IsString()
  event: string

  @IsObject()
  data: unknown
}
