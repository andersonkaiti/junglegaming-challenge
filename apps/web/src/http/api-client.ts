import { env } from '@config/env'
import ky from 'ky'

function getTokenFromCookie() {
  const tokenValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
  return tokenValue ? tokenValue.split('=')[1] : undefined
}

function setTokenToCookie(token: string) {
  document.cookie = `token=${token}; path=/;`
}

export const api = ky.create({
  prefixUrl: env.VITE_API_GATEWAY_URL,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = getTokenFromCookie()
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],

    afterResponse: [
      async (request, _options, response) => {
        if (response.status === 401) {
          try {
            const token = getTokenFromCookie()

            const refreshTokenResponse = await ky.post<{ token: string }>(
              `${env.VITE_API_GATEWAY_URL}/auth/refresh`,
              {
                credentials: 'include',
                headers: token
                  ? { Authorization: `Bearer ${token}` }
                  : undefined,
              }
            )

            if (!refreshTokenResponse.ok) {
              throw new Error('Refresh token failed to return OK status.')
            }

            const { token: newToken } = await refreshTokenResponse.json()

            setTokenToCookie(newToken)

            const retryRequest = new Request(request)

            retryRequest.headers.set('Authorization', `Bearer ${newToken}`)

            return api(retryRequest)
          } catch (error) {
            document.cookie =
              'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
            throw new Error(
              'Falha na autenticação. Sessão expirada, redirecionando para o login.'
            )
          }
        }

        return response
      },
    ],
  },
})
