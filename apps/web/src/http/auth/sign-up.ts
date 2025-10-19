import { api } from '../api-client'

interface ISignUpRequest {
  username: string
  email: string
  password: string
}

export async function signUp({ username, email, password }: ISignUpRequest) {
  return await api.post('auth/register', {
    json: {
      username,
      email,
      password,
    },
  })
}
