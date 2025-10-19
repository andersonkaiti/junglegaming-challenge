import { zodResolver } from '@hookform/resolvers/zod'
import { createTask } from '@http/tasks/create-task'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const createTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  dueDate: z.date('Data de entrega é obrigatória'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']),
  userIds: z
    .array(z.string())
    .min(1, 'Pelo menos um usuário deve ser selecionado'),
})

type CreateTaskSchema = z.infer<typeof createTaskSchema>

const STATUS_CODE_CREATED = 201

export function useCreateTask() {
  const navigate = useNavigate()

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'LOW',
      status: 'TODO',
      userIds: [],
    },
  })

  const [serverError, setServerError] = useState('')

  const submit = form.handleSubmit(async (data: CreateTaskSchema) => {
    try {
      const response = await createTask(data)

      if (response.status === STATUS_CODE_CREATED) {
        toast.success('Tarefa criada com sucesso!')

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
