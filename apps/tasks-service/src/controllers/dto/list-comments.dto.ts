import { IsUUID } from 'class-validator'

export class ListCommentsDTO {
  @IsUUID()
  id: string
}
