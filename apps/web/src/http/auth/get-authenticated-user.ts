import { removeToken } from '@utils/remove-token'
import { HTTPError } from 'ky'
import { api } from '../api-client'

interface IUser {
  id: string
  username: string
  email: string
}

const STATUS_CODE_UNAUTHORIZED = 401

export async function getAuthenticatedUser(): Promise<IUser> {
  try {
    return await api.get(`auth/user`).json()
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
