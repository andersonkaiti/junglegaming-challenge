import { cn } from '@lib/utils'
import type { ColumnDef } from '@tanstack/react-table'
import { isAfter } from 'date-fns'
import { ActionsRow } from './actions-row'

interface ITaskUser {
  id: string
  taskId: string
  userId: string
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export const PriorityMapping: Record<
  Priority,
  { label: string; className: string }
> = {
  [Priority.HIGH]: {
    label: 'Alta',
    className:
      'bg-red-100 text-red-700 border border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700',
  },
  [Priority.MEDIUM]: {
    label: 'Média',
    className:
      'bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700',
  },
  [Priority.LOW]: {
    label: 'Baixa',
    className:
      'bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700',
  },
  [Priority.URGENT]: {
    label: 'Urgente',
    className:
      'bg-orange-100 text-orange-800 border border-orange-300 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-700',
  },
}

export const StatusMapping: Record<
  Status,
  { label: string; className: string }
> = {
  [Status.TODO]: {
    label: 'A Fazer',
    className:
      'bg-gray-100 text-gray-800 border border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700',
  },
  [Status.IN_PROGRESS]: {
    label: 'Em Progresso',
    className:
      'bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700',
  },
  [Status.REVIEW]: {
    label: 'Revisão',
    className:
      'bg-purple-100 text-purple-800 border border-purple-300 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700',
  },
  [Status.DONE]: {
    label: 'Concluída',
    className:
      'bg-green-100 text-green-800 border border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700',
  },
}

interface ITasks {
  id: string
  title: string
  description: string
  dueDate: Date
  priority: Priority
  status: Status
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
    }) => {
      const isOverdue = !isAfter(new Date(dueDate), new Date(Date.now()))
      return (
        <span
          className={cn(
            'inline-block rounded-full border px-2 py-1 text-xs font-semibold',
            isOverdue
              ? 'animate-pulse border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-900 dark:text-red-100'
              : 'border-green-200 bg-green-50 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-100'
          )}
          title={isOverdue ? 'A tarefa está atrasada' : 'Dentro do prazo'}
        >
          {new Date(dueDate).toLocaleDateString()}
        </span>
      )
    },
  },
  {
    id: 'priority',
    header: 'Prioridade',
    cell: ({
      row: {
        original: { priority },
      },
    }) => {
      return (
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1 text-xs font-semibold',
            PriorityMapping[priority as Priority]?.className
          )}
        >
          {PriorityMapping[priority as Priority]?.label}
        </span>
      )
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({
      row: {
        original: { status },
      },
    }) => {
      return (
        <span
          className={cn(
            'inline-block rounded-full px-3 py-1 text-xs font-semibold',
            StatusMapping[status as Status]?.className
          )}
        >
          {StatusMapping[status as Status]?.label}
        </span>
      )
    },
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
