import type { ColumnDef } from '@tanstack/react-table'
import { ActionsRow } from './actions-row'

interface ITaskUser {
  id: string
  taskId: string
  userId: string
}

interface ITasks {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: string
  status: string
  createdAt: Date
  updatedAt: Date
  taskUsers: ITaskUser[]
}

export const tasksColumns: ColumnDef<ITasks>[] = [
  {
    id: 'title',
    header: 'Título',
    cell: ({
      row: {
        original: { title },
      },
    }) => title,
  },
  {
    id: 'dueDate',
    header: 'Vencimento',
    cell: ({
      row: {
        original: { dueDate },
      },
    }) =>
      dueDate instanceof Date
        ? dueDate.toLocaleDateString()
        : new Date(dueDate).toLocaleDateString(),
  },
  {
    id: 'priority',
    header: 'Prioridade',
    cell: ({
      row: {
        original: { priority },
      },
    }) => priority,
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({
      row: {
        original: { status },
      },
    }) => status,
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({
      row: {
        original: { id: taskId },
      },
    }) => <ActionsRow taskId={taskId} />,
  },
]
