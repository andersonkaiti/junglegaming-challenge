import { api } from '../api-client'

export interface IUser {
  id: string
  username: string
  email: string
}

export async function getAuthenticatedUser(): Promise<IUser> {
  return await api.get(`auth/user`).json()
}
