import ky from 'ky'

export const api = ky.create({
  prefixUrl: 'http://localhost:3001/api',
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = document.cookie.split('; ').find((row) => row === 'token')

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
