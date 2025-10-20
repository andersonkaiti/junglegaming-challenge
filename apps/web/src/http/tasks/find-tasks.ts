import { removeToken } from '@utils/remove-token'
import { HTTPError } from 'ky'
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
}

export interface IFindTasksResponse {
  page: number
  size: number
  total: number
  tasks: ITask[]
}

const STATUS_CODE_UNAUTHORIZED = 401

export async function findTasks({
  page,
  size,
}: IFindTaskRequest): Promise<IFindTasksResponse> {
  const searchParams = new URLSearchParams()

  searchParams.append('page', String(page))
  searchParams.append('size', String(size))

  try {
    return await api.get(`tasks?${searchParams}`).json()
  } catch (err) {
    if (err instanceof HTTPError) {
      const errorBody = await err.response.json()

      if (errorBody.statusCode === STATUS_CODE_UNAUTHORIZED) {
        removeToken()
      }
    }

    throw err
  }
}
