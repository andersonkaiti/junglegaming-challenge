import { removeToken } from '@utils/remove-token'
import { HTTPError } from 'ky'
import { api } from '../api-client'

const STATUS_CODE_UNAUTHORIZED = 401

export interface IUpdateUserRequest {
  username: string
  password?: string
}

export async function updateAuthenticatedUser(user: IUpdateUserRequest) {
  try {
    return await api.put('auth/user', {
      json: user,
    })
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
