import { zodResolver } from '@hookform/resolvers/zod'
import type { IGetTaskByIdResponse } from '@http/tasks/get-task-by-id'
import { updateTask } from '@http/tasks/update-task'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  dueDate: z.date('Data de entrega é obrigatória'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']),
  userIds: z
    .array(z.string())
    .min(1, 'Pelo menos um usuário deve ser selecionado'),
})

type UpdateTaskSchema = z.infer<typeof updateTaskSchema>

const STATUS_CODE_OK = 200

export function useUpdateTask({ task }: IGetTaskByIdResponse) {
  const navigate = useNavigate()

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      id: task?.id || '',
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
      priority: task?.priority || 'LOW',
      status: task?.status || 'TODO',
      userIds: task.taskUsers.map((taskUser) => taskUser.userId) || [],
    },
  })

  const [serverError, setServerError] = useState('')

  const submit = form.handleSubmit(async (data: UpdateTaskSchema) => {
    try {
      const response = await updateTask(data)

      if (response.status === STATUS_CODE_OK) {
        toast.success('Tarefa atualizada com sucesso!')

        navigate({
          to: '/dashboard/tasks',
        })
      }
    } catch (err) {
      if (err instanceof HTTPError) {
        const errorBody = await err.response.json()
        setServerError(errorBody.message)
      }
    }
  })

  return {
    form,
    submit,
    serverError,
  }
}
