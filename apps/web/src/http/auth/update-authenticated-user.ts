import { api } from '../api-client'

export interface IUpdateUserRequest {
  username: string
  password?: string
}

export async function updateAuthenticatedUser(user: IUpdateUserRequest) {
  return await api.put('auth/user', {
    json: user,
  })
}
