import { Comment } from '@components/dashboard/tasks/comments/comment'
import { LoadingSkeleton } from '@components/dashboard/tasks/comments/loading-skeleton'
import { FilterInput } from '@components/dashboard/tasks/filter-input'
import Paginator from '@components/dashboard/tasks/paginator'
import { Button } from '@components/ui/button'
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

      <FilterInput />

      <div className="flex h-full flex-col gap-4">
        {isLoading && <LoadingSkeleton />}

        {!isLoading && paginatedComments?.comments?.length === 0 && (
          <div className="text-muted-foreground py-8 text-center">
            Nenhum comentário encontrado.
          </div>
        )}

        {!isLoading &&
          paginatedComments?.comments?.map((comment) => (
            <Comment users={users} comment={comment} />
          ))}
      </div>

      <Paginator
        currentPage={page}
        totalPages={paginatedComments?.total || 1}
      />
    </div>
  )
}
