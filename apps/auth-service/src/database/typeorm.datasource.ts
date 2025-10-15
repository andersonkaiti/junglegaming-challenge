import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Env } from '../env.schema'

config()

const configService = new ConfigService<Env, true>()

const datasource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST', { infer: true }),
  port: configService.get('POSTGRES_PORT', { infer: true }),
  username: configService.get('POSTGRES_USER', { infer: true }),
  password: configService.get('POSTGRES_PASSWORD', { infer: true }),
  database: configService.get('POSTGRES_DB', { infer: true }),
  entities: [],
  migrations: [],
  synchronize: false,
})

export default datasource
