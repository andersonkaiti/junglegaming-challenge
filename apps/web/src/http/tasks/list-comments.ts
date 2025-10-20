import { removeToken } from '@utils/remove-token'
import { HTTPError } from 'ky'
import { api } from '../api-client'

export interface IComment {
  id: string
  taskId: string
  userId: string
  text: string
  createdAt: string
  updatedAt: string
}

interface IListCommentRequest {
  taskId: string
  page: number
  size: number
  filter?: string
}

export interface IListCommentsResponse {
  page: number
  size: number
  total: number
  comments: IComment[]
}

const STATUS_CODE_UNAUTHORIZED = 401

export async function listComments({
  taskId,
  page,
  size,
  filter,
}: IListCommentRequest): Promise<IListCommentsResponse> {
  const searchParams = new URLSearchParams()

  searchParams.append('page', String(page))
  searchParams.append('size', String(size))

  if (filter) {
    searchParams.append('filter', filter)
  }

  try {
    return await api.get(`tasks/${taskId}/comments?${searchParams}`).json()
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
