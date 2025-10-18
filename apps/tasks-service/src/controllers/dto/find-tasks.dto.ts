import { IsNumber, Min } from 'class-validator'

export class FindTasksDTO {
  @IsNumber()
  @Min(1)
  page: number

  @IsNumber()
  @Min(1)
  size: number
}
