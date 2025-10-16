import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Task from './task.entity'

@Entity('tasks_users')
class TaskUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid', { name: 'task_id' })
  taskId: string

  @Column('uuid', { name: 'user_id' })
  userId: string

  @ManyToOne(() => Task, (task) => task.taskUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task
}

export default TaskUser
