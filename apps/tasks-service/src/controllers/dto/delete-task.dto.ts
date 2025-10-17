import { IsUUID } from 'class-validator'

export class DeleteTaskDTO {
  @IsUUID()
  id: string
}
