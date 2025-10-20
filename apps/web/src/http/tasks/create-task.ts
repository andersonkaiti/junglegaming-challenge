import { api } from '../api-client'

export interface ICreateTaskRequest {
  title: string
  description: string
  dueDate: Date
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  userIds: string[]
}

export async function createTask(data: ICreateTaskRequest) {
  return await api.post('tasks', {
    json: data,
  })
}
