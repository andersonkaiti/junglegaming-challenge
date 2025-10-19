import { DataTable } from '@components/ui/data-table'
import { useFindTasks } from '@hooks/use-find-tasks'
import Paginator from '../paginator'
import { tasksColumns } from './columns'
import { LoadingSkeleton } from './loading-skeleton'

export function TasksTable() {
  const { data, page, isLoading } = useFindTasks()

  return (
    <div className="flex h-full flex-col justify-between gap-4 py-5">
      {isLoading && <LoadingSkeleton />}

      {!isLoading && (
        <DataTable columns={tasksColumns} data={data?.tasks || []} />
      )}

      <Paginator currentPage={page} totalPages={data?.total || 10} />
    </div>
  )
}
