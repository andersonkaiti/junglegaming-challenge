import { io, Socket } from 'socket.io-client'

const URL = 'http://localhost:3004'

const socket: Socket = io(URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  path: '/socket.io',
})

export { socket }
