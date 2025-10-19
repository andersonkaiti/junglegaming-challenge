import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const signUpSchema = z.object({
  username: z
    .string()
    .min(2, 'O nome de usuário deve ter pelo menos 2 caracteres.')
    .max(32, 'O nome de usuário deve ter no máximo 32 caracteres.'),
  email: z.email('E-mail inválido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
})

export function useSignUp() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    values: {
      username: '',
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
