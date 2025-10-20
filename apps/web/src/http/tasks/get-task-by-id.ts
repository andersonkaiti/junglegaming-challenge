import { removeToken } from '@utils/remove-token'
import { HTTPError } from 'ky'
import { api } from '../api-client'

interface ITaskUser {
  id: string
  taskId: string
  userId: string
}

export interface IGetTaskByIdResponse {
  task: {
    id: string
    title: string
    description: string
    dueDate: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
    status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
    taskUsers: ITaskUser[]
  }
}

const STATUS_CODE_UNAUTHORIZED = 401

export async function getTaskById(id: string): Promise<IGetTaskByIdResponse> {
  try {
    return await api.get(`tasks/${id}`).json()
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
