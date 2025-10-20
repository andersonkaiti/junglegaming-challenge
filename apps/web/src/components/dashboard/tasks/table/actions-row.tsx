import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { useDeleteTask } from '@hooks/use-delete-task'
import { deleteTask } from '@http/tasks/delete-task'
import { Link } from '@tanstack/react-router'
import { Edit2, EllipsisVertical, Eye } from 'lucide-react'

interface IActionsRowProps {
  taskId: string
}

export function ActionsRow({ taskId }: IActionsRowProps) {
  const {} = useDeleteTask(taskId)

  return (
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
            <Button variant="ghost" className="w-full" asChild>
              <Link
                to="/dashboard/tasks/comments/$taskId"
                params={{
                  taskId,
                }}
              >
                <Eye /> <span className="ml-2">Visualizar comentários</span>
              </Link>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full">
                  <Eye /> <span className="ml-2">Deletar tarefa</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="gap-8">
                <DialogHeader className="gap-8">
                  <DialogTitle>
                    Tem certeza de que deseja deletar essa tarefa?
                  </DialogTitle>
                  <DialogDescription>
                    Esta ação não pode ser desfeita. Isso irá excluir
                    permanentemente sua tarefa e remover seus dados dos nossos
                    servidores.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <form onSubmit={async () => await deleteTask(taskId)}>
                    <Button type="submit">Deletar</Button>
                  </form>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
