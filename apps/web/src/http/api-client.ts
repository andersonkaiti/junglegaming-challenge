import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3001/api',
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
