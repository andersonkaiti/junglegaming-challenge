import { findTasks, type IFindTasksResponse } from '@http/tasks/find-tasks'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'

export function useFindTasks() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(13))

  const { refetch, data, ...rest } = useQuery({
    queryKey: ['tasks', page, size],
    queryFn: async () =>
      await findTasks({
        page,
        size,
      }),
    initialData: keepPreviousData,
  })

  useEffect(() => {
    refetch()
  }, [page, size])

  return {
    refetch,
    page,
    size,
    ...rest,
    data: data as IFindTasksResponse,
  }
}
