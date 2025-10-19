import { api } from '../api-client'

interface ITaskUser {
  id: string
  taskId: string
  userId: string
}

interface IFindTasksResponse {
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

export async function findTasks(): Promise<IFindTasksResponse[]> {
  return await api.get('tasks').json()
}
