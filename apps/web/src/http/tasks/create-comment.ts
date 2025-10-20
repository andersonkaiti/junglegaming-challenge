import { api } from '../api-client'

export interface ICreateCommentRequest {
  text: string
  taskId: string
  userId: string
}

export async function createComment({
  taskId,
  ...data
}: ICreateCommentRequest) {
  return await api.post(`tasks/${taskId}/comments`, {
    json: data,
  })
}
