import { zodResolver } from '@hookform/resolvers/zod'
import { createComment } from '@http/tasks/create-comment'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const createCommentSchema = z.object({
  text: z.string().min(1, 'Comentário é obrigatório'),
  taskId: z.uuid('ID da tarefa inválido'),
  userId: z.uuid('ID do usuário inválido'),
})

type CreateCommentSchema = z.infer<typeof createCommentSchema>

const STATUS_CODE_CREATED = 201

export function useCreateComment(taskId: string) {
  const navigate = useNavigate()

  const form = useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      text: '',
      taskId: taskId,
      userId: '',
    },
  })

  const [serverError, setServerError] = useState('')

  const submit = form.handleSubmit(async (data: CreateCommentSchema) => {
    try {
      const response = await createComment(data)

      if (response.status === STATUS_CODE_CREATED) {
        toast.success('Comentário criado com sucesso!')

        navigate({
          to: '/dashboard/tasks/comments/$taskId',
          params: {
            taskId,
          },
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
