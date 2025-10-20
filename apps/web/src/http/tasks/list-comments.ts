import { redirect } from '@tanstack/react-router'
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

export interface IListCommentsResponse {
  page: number
  size: number
  total: number
  comments: IComment[]
}

const STATUS_CODE_UNAUTHORIZED = 401

export async function listComments(
  taskId: string,
  { page, size }: { page: number; size: number }
): Promise<IListCommentsResponse> {
  const searchParams = new URLSearchParams()

  searchParams.append('page', String(page))
  searchParams.append('size', String(size))

  try {
    return await api.get(`tasks/${taskId}/comments?${searchParams}`).json()
  } catch (err) {
    if (err instanceof HTTPError) {
      const errorBody = await err.response.json()

      if (errorBody.statusCode === STATUS_CODE_UNAUTHORIZED) {
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

        throw redirect({
          to: '/auth/sign-in',
        })
      }
    }
    throw err
  }
}
