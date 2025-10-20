import {
  listComments,
  type IListCommentsResponse,
} from '@http/tasks/list-comments'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'

export function useListComments(taskId: string) {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(13))

  const { refetch, data, ...rest } = useQuery({
    queryKey: ['comments', taskId, page, size],
    queryFn: async () =>
      await listComments(taskId, {
        page,
        size,
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
