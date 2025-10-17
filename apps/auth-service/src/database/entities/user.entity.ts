import { hashSync } from 'bcryptjs'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'

const SALT_ROUNDS = 8

@Entity('users')
@Unique(['email'])
@Unique(['username'])
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', nullable: false })
  username: string

  @Column({ type: 'varchar', nullable: false })
  email: string

  @Column({ type: 'varchar', nullable: false })
  password: string

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
  hashPassword() {
    if (this.password && !this.password.startsWith('$2')) {
      this.password = hashSync(this.password, SALT_ROUNDS)
    }
  }

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
  async hashPasswordBeforeUpdate() {
    if (this.password && !this.password.startsWith('$2')) {
      this.password = hashSync(this.password, SALT_ROUNDS)
    }

    this.updatedAt = new Date()
  }
}

export default User
