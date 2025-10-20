import { env } from '@config/env'
import { io, Socket } from 'socket.io-client'

const URL = env.VITE_API_WEBSOCKET_URL

const socket: Socket = io(URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  path: '/socket.io',
})

export { socket }
