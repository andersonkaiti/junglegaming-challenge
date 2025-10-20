import { IsString, IsUUID } from 'class-validator'

export class UpdateAuthenticatedUserDTO {
  @IsUUID()
  userId: string

  @IsString()
  username: string

  @IsString()
  password?: string
}
