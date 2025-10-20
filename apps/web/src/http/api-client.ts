import { env } from '@config/env'
import ky from 'ky'

export const api = ky.create({
  prefixUrl: env.VITE_API_GATEWAY_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const tokenValue = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))

        const token = tokenValue ? tokenValue.split('=')[1] : undefined

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
