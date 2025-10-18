import { IsNumber, IsUUID, Min } from 'class-validator'

export class ListCommentsDTO {
  @IsUUID()
  id: string

  @IsNumber()
  @Min(1)
  page: number

  @IsNumber()
  @Min(1)
  size: number
}
