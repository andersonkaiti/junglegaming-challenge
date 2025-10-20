import { DataTable } from '@components/ui/data-table'
import { useFindTasks } from '@hooks/use-find-tasks'
import type { ITask } from '@http/tasks/find-tasks'
import type { ColumnDef } from '@tanstack/react-table'
import { parseAsBoolean, useQueryStates } from 'nuqs'
import Paginator from '../paginator'
import { tasksColumns } from './columns'
import { LoadingSkeleton } from './loading-skeleton'

// Fix: Show columns that are enabled by the corresponding boolean, not disabled.
export function TasksTable() {
  const { data, page, isLoading } = useFindTasks()

  const [{ dueDate, priority, status, title }] = useQueryStates({
    title: parseAsBoolean.withDefault(true),
    dueDate: parseAsBoolean.withDefault(true),
    priority: parseAsBoolean.withDefault(true),
    status: parseAsBoolean.withDefault(true),
  })

  const filteredTasksTable: ColumnDef<ITask>[] = tasksColumns.filter(
    (column) => {
      if (column.id === 'title') {
        return title
      }

      if (column.id === 'dueDate') {
        return dueDate
      }

      if (column.id === 'priority') {
        return priority
      }

      if (column.id === 'status') {
        return status
      }

      return true
    }
  )

  return (
    <div className="flex h-full flex-col justify-between gap-4 py-5">
      {isLoading && <LoadingSkeleton />}

      {!isLoading && (
        <DataTable columns={filteredTasksTable} data={data?.tasks || []} />
      )}

      <Paginator currentPage={page} totalPages={data?.total || 10} />
    </div>
  )
}
