import { api } from '../api-client'

interface ISignInRequest {
  email: string
  password: string
}

interface ISignInResponse {
  token: string
}

export async function signIn({
  email,
  password,
}: ISignInRequest): Promise<ISignInResponse> {
  return await api
    .post('auth/login', {
      json: {
        email,
        password,
      },
    })
    .json()
}
