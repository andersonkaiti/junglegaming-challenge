import { findTasks, type IFindTasksResponse } from '@http/tasks/find-tasks'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useEffect } from 'react'

export function useFindTasks() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(11))
  const [filter] = useQueryState('filter', parseAsString.withDefault(''))

  const { refetch, data, ...rest } = useQuery({
    queryKey: ['tasks', page, size, filter],
    queryFn: async () =>
      await findTasks({
        page,
        size,
        filter,
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
