import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import TaskUser from './task-user.entity'

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

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'timestamp', name: 'due_date', nullable: true })
  dueDate?: Date

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
    nullable: false,
  })
  priority: TaskPriority

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
    nullable: false,
  })
  status: TaskStatus

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date

  @BeforeInsert()
  setDefaultsBeforeInsert() {
    if (!this.priority) {
      this.priority = TaskPriority.MEDIUM
    }

    if (!this.status) {
      this.status = TaskStatus.TODO
    }

    if (!this.createdAt) {
      this.createdAt = new Date()
    }

    if (!this.updatedAt) {
      this.updatedAt = new Date()
    }
  }

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date()
  }

  @OneToMany(() => TaskUser, (taskUser) => taskUser.task)
  taskUsers: TaskUser[]
}

export default Task
