import { IsUUID } from 'class-validator'

export class GetTaskDTO {
  @IsUUID()
  id: string
}
