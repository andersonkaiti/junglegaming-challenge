import { IsObject, IsString } from 'class-validator'

export class GatewayDTO {
  @IsString()
  key: string

  @IsObject()
  data?: unknown
}
