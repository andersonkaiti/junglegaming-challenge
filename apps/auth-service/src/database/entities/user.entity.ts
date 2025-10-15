import { hashSync } from 'bcryptjs'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

const SALT_ROUNDS = 8

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, SALT_ROUNDS)
  }
}

export default User
