import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { TasksService } from './tasks.service'

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @EventPattern('tasks_event')
  handleEvent() {
    console.log('Event received')

    return this.tasksService.getHello()
  }
}
