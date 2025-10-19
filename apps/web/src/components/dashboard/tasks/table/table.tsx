import { DataTable } from '@components/ui/data-table'
import { tasksColumns } from './columns'

interface ITaskUser {
  id: string
  taskId: string
  userId: string
}

interface ITasks {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: string
  status: string
  createdAt: Date
  updatedAt: Date
  taskUsers: ITaskUser[]
}

interface ITasksTable {
  tasks: ITasks[]
}

export function TasksTable({ tasks }: ITasksTable) {
  return <DataTable columns={tasksColumns} data={tasks} />
}
