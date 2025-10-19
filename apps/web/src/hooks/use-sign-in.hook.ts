import { signIn } from '@/http/auth/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const MIN_PASSWORD_LENGTH = 6

const signInSchema = z.object({
  email: z.email('E-mail inválido.'),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
    ),
})

export function useSignIn() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(signInSchema),
    values: {
      email: '',
      password: '',
    },
  })

  const [serverError, setServerError] = useState('')

  const submit = form.handleSubmit(async (data) => {
    try {
      const token = await signIn(data)

      if (token) {
        document.cookie = `token=${token.token}; path=/`

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
