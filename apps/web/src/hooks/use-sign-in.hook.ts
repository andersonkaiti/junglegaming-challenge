import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const loginSchema = z.object({
  email: z.email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 8 caracteres.'),
})

export function useSignIn() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    values: {
      email: '',
      password: '',
    },
  })

  const submit = form.handleSubmit(async (data) => {
    console.log(data)
  })

  return {
    form,
    submit,
  }
}
