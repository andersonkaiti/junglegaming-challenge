import { api } from '../api-client'

export async function deleteTask(taskId: string) {
  return await api.delete(`tasks/${taskId}`)
}
