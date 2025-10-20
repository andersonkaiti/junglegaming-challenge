import { LoadingSkeleton } from '@components/dashboard/tasks/comments/loading-skeleton'
import Paginator from '@components/dashboard/tasks/paginator'
import { Button } from '@components/ui/button'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from '@components/ui/item'
import { useListComments } from '@hooks/use-list-comments'
import { listUsers } from '@http/users/list-users'
import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/dashboard/tasks/comments/$taskId')({
  component: Comments,
  loader: async ({ params: { taskId } }) => ({
    taskId,
    users: await listUsers(),
  }),
})

function Comments() {
  const { taskId, users } = useLoaderData({
    from: '/dashboard/tasks/comments/$taskId',
  })

  const { paginatedComments, page, isLoading } = useListComments(taskId)

  function getUserDisplay(userId: string) {
    const user = users?.find((user) => user?.id === userId)

    return `${user?.username} (${user?.email})`
  }

  return (
    <div className="flex h-full flex-col justify-between gap-4 p-5">
      <header className="flex flex-col justify-between gap-4 md:flex-row">
        <h1 className="text-3xl font-bold">Comentários</h1>

        <Button asChild>
          <Link
            to="/dashboard/tasks/comments/new/$taskId"
            params={{
              taskId,
            }}
          >
            <Plus />
            Publicar comentário
          </Link>
        </Button>
      </header>

      <div className="flex h-full flex-col gap-4">
        {isLoading && <LoadingSkeleton />}

        {!isLoading && paginatedComments?.comments?.length === 0 && (
          <div className="text-muted-foreground py-8 text-center">
            Nenhum comentário encontrado.
          </div>
        )}

        {!isLoading &&
          paginatedComments?.comments?.map((comment) => (
            <Item key={comment.id}>
              <ItemTitle className="text-lg">{comment.text}</ItemTitle>

              <ItemFooter>
                <ItemDescription>
                  Para: {getUserDisplay(comment.userId)}
                </ItemDescription>

                <ItemContent className="text-xs">
                  {' '}
                  Criado em{' '}
                  {new Date(comment.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </ItemContent>
              </ItemFooter>
            </Item>
          ))}
      </div>

      <Paginator
        currentPage={page}
        totalPages={paginatedComments?.total || 1}
      />
    </div>
  )
}
