import {
  listComments,
  type IListCommentsResponse,
} from '@http/tasks/list-comments'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { useEffect } from 'react'

export function useListComments(taskId: string) {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(5))
  const [filter] = useQueryState('filter', parseAsString.withDefault(''))

  const { refetch, data, ...rest } = useQuery({
    queryKey: ['comments', taskId, page, size, filter],
    queryFn: async () =>
      await listComments({
        taskId,
        page,
        size,
        filter,
      }),
    enabled: !!taskId,
    initialData: keepPreviousData,
  })

  useEffect(() => {
    if (taskId) {
      refetch()
    }
  }, [taskId, page, size])

  return {
    refetch,
    page,
    size,
    ...rest,
    paginatedComments: data as IListCommentsResponse,
  }
}
