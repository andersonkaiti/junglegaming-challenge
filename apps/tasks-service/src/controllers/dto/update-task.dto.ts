import {
  IsArray,
  IsDateString,
  IsEnum,
  IsString,
  IsUUID,
} from 'class-validator'

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export class UpdateTaskDTO {
  @IsUUID()
  id: string

  @IsString()
  title: string

  @IsString()
  description: string

  @IsDateString()
  dueDate: string

  @IsEnum(TaskPriority)
  priority: TaskPriority

  @IsEnum(TaskStatus)
  status: TaskStatus

  @IsArray()
  @IsUUID('all', {
    each: true,
  })
  userIds: string[]
}
