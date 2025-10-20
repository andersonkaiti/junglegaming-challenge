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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { useDeleteTask } from '@hooks/use-delete-task'
import { cn } from '@lib/utils'
import { Link } from '@tanstack/react-router'
import { Edit2, EllipsisVertical, MessageCircle, Trash2 } from 'lucide-react'

interface IActionsRowProps {
  taskId: string
}

export function ActionsRow({ taskId }: IActionsRowProps) {
  const { handleTaskDelete } = useDeleteTask(taskId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted focus-visible:ring-primary transition-all focus-visible:ring-2"
        >
          <EllipsisVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="border-border bg-background/95 w-56 rounded-lg border shadow-lg backdrop-blur">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              asChild
              className={cn(
                'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-md px-3 py-2 transition-all'
              )}
            >
              <Link
                to="/dashboard/tasks/edit/$taskId"
                params={{ taskId }}
                className="flex w-full items-center"
              >
                <Edit2 className="text-muted-foreground h-4 w-4" />
                <span className="mr-auto ml-2 font-medium">Editar</span>
              </Link>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              asChild
              className={cn(
                'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-md px-3 py-2 transition-all'
              )}
            >
              <Link
                to="/dashboard/tasks/comments/$taskId"
                params={{ taskId }}
                className="flex w-full items-center"
              >
                <MessageCircle className="text-muted-foreground h-4 w-4" />
                <span className="mr-auto ml-2 font-medium">
                  Visualizar comentários
                </span>
              </Link>
            </Button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive flex w-full items-center gap-2 rounded-md px-3 py-2 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="ml-2 font-medium">Deletar tarefa</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-auto max-w-md gap-6">
                <DialogHeader className="gap-6">
                  <DialogTitle>
                    Tem certeza de que deseja deletar essa tarefa?
                  </DialogTitle>
                  <DialogDescription>
                    Esta ação{' '}
                    <span className="text-foreground font-semibold">
                      não pode ser desfeita
                    </span>
                    . Isso irá excluir permanentemente sua tarefa e remover seus
                    dados dos nossos servidores.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-row gap-2">
                  <form onSubmit={handleTaskDelete}>
                    <Button type="submit" variant="destructive">
                      Deletar
                    </Button>
                  </form>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
