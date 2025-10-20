import { IsUUID } from 'class-validator'

export class AuthenticatedUserDTO {
  @IsUUID()
  userId: string
}
