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

export async function getTaskById(id: string): Promise<IGetTaskByIdResponse> {
  return await api.get(`tasks/${id}`).json()
}
