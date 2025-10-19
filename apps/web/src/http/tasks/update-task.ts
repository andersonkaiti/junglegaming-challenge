import { api } from '../api-client'

export interface IUpdateTaskRequest {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  userIds: string[]
}

export async function updateTask(data: IUpdateTaskRequest) {
  return await api.put(`tasks/${data.id}`, {
    json: data,
  })
}
