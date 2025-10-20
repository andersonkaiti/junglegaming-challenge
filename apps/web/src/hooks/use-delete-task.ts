import { deleteTask } from '@http/tasks/delete-task'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { parseAsInteger, useQueryState } from 'nuqs'
import type { FormEvent } from 'react'
import { toast } from 'sonner'

export function useDeleteTask(taskId: string) {
  const queryClient = useQueryClient()

  const [page] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size] = useQueryState('size', parseAsInteger.withDefault(13))

  const { mutate } = useMutation({
    mutationKey: ['delete', taskId],
    mutationFn: async () => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', page, size],
      })

      toast.success('Tarefa deletada com sucesso!')
    },
  })

  function handleTaskDelete(event: FormEvent) {
    event.preventDefault()

    mutate()
  }

  return {
    handleTaskDelete,
  }
}
