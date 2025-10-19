import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit2, EllipsisVertical, Eye } from 'lucide-react'

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
    }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Button variant="ghost" asChild className="w-full">
                <Link
                  to="/dashboard/tasks/edit/$taskId"
                  params={{
                    taskId,
                  }}
                >
                  <Edit2 /> <span className="mr-auto ml-2">Editar</span>
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Button variant="ghost" className="w-full">
                <Eye /> <span className="ml-2">Visualizar comentários</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
