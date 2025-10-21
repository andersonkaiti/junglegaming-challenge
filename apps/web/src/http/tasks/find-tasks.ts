import { api } from '../api-client'

interface ITaskUser {
  id: string
  taskId: string
  userId: string
}

export interface ITask {
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

interface IFindTaskRequest {
  page: number
  size: number
  filter?: string
}

export interface IFindTasksResponse {
  page: number
  size: number
  total: number
  tasks: ITask[]
}

export async function findTasks({
  page,
  size,
  filter,
}: IFindTaskRequest): Promise<IFindTasksResponse> {
  const searchParams = new URLSearchParams()

  searchParams.append('page', String(page))
  searchParams.append('size', String(size))

  if (filter) {
    searchParams.append('filter', filter)
  }

  return await api.get(`tasks?${searchParams}`).json()
}
