import { IsObject, IsOptional, IsString } from 'class-validator'

export class GatewayDTO {
  @IsString()
  key: string

  @IsObject()
  @IsOptional()
  data?: unknown
}
