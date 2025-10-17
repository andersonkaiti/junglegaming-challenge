import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import Task from './task.entity'

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  text: string

  @Column('uuid', { name: 'task_id', nullable: false })
  taskId: string

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string

  @Column({ name: 'created_at', nullable: false })
  createdAt: Date

  @Column({ name: 'updated_at', nullable: false })
  updatedAt: Date

  @BeforeInsert()
  setDefaultsBeforeInsert() {
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

  @ManyToOne(() => Task, (task) => task.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task
}

export default Comment
