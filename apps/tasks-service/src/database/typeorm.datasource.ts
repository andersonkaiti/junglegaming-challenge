import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { Env } from '../env.schema'
import Comment from './entities/comment.entity'
import TaskUser from './entities/task-user.entity'
import Task from './entities/task.entity'
import { CreateTasksTable1760626008929 } from './migrations/1760626008929-create-tasks-table'
import { CreateCommentsTable1760713818512 } from './migrations/1760713818512-create-comments-table'

config()

const configService = new ConfigService<Env, true>()

const datasource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST', { infer: true }),
  port: configService.get('POSTGRES_PORT', { infer: true }),
  username: configService.get('POSTGRES_USER', { infer: true }),
  password: configService.get('POSTGRES_PASSWORD', { infer: true }),
  database: configService.get('POSTGRES_DB', { infer: true }),
  entities: [Task, TaskUser, Comment],
  migrations: [CreateTasksTable1760626008929, CreateCommentsTable1760713818512],
  synchronize: false,
})

export default datasource
