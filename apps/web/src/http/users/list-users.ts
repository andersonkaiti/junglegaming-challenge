import { api } from '../api-client'

interface IUser {
  id: string
  username: string
  email: string
}

export async function listUsers(): Promise<IUser[]> {
  return await api.get('auth/users').json()
}
