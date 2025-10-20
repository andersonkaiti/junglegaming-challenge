import {
  Priority,
  PriorityMapping,
} from '@components/dashboard/tasks/table/columns'
import { socket } from '@lib/socket'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { toast } from 'sonner'

const SocketContext = createContext(socket)

interface ITaskCreated {
  title: string
  description: string
  dueDate: Date
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  users: string[]
}

interface ITaskUpdated {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
  users: string[]
}

interface ICommentCreated {
  id: string
  text: string
  taskId: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export function SocketProvider({ children }: { children: ReactNode }) {
  const [_, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      console.log('🛜 WebSocket conectado com sucesso!')

      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      console.log('WebSocket desconectado!')

      setIsConnected(false)
    })

    socket.on('task:created', (payload: ITaskCreated) => {
      const priority = PriorityMapping[payload.priority as Priority]?.label

      toast.success(
        `A tarefa "${payload.title}" foi criada com prioridade: ${priority}.`
      )
    })

    socket.on('task:updated', (payload: ITaskUpdated) => {
      toast.success(`A tarefa "${payload.title}" foi atualizada.`)
    })

    socket.on('comment:new', (payload: ICommentCreated) => {
      toast.success(`Novo comentário criado na tarefa ${payload.taskId}.`)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('task:created')
      socket.off('task:updated')
      socket.off('comment:new')
      socket.disconnect()
    }
  }, [socket])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

// export const useSocket = () => useContext(SocketContext)
