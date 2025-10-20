import { IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateAuthenticatedUserDTO {
  @IsString()
  @MinLength(2)
  username: string

  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string
}
