import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Env } from '../env.schema'
import User from './entities/user.entity'
import { CreateUsersTable1760548535462 } from './migrations/1760548535462-create-users-table'

config()

const configService = new ConfigService<Env, true>()

const datasource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST', { infer: true }),
  port: configService.get('POSTGRES_PORT', { infer: true }),
  username: configService.get('POSTGRES_USER', { infer: true }),
  password: configService.get('POSTGRES_PASSWORD', { infer: true }),
  database: configService.get('POSTGRES_DB', { infer: true }),
  entities: [User],
  migrations: [CreateUsersTable1760548535462],
  synchronize: false,
})

export default datasource
