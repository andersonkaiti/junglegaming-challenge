import { IsString, IsUUID } from 'class-validator'

export class CreateCommentDTO {
  @IsString()
  text: string

  @IsUUID()
  taskId: string

  @IsUUID()
  userId: string
}
