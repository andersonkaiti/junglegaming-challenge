import {
  IsArray,
  IsDateString,
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator'

export class CreateTaskDTO {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsDateString()
  dueDate: string

  @IsEnum(['LOW', 'MEDIUM', 'HIGHT', 'URGENT'])
  priority: string

  @IsEnum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'])
  status: string

  @IsArray()
  @IsUUID('all', {
    each: true,
  })
  userIds: string[]
}
