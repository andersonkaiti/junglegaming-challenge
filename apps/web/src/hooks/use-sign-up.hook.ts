import { signUp } from '@/http/auth/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const USERNAME_MIN_CHARACTERS = 2
const USERNAME_MAX_CHARACTERS = 32

const MIN_PASSWORD_LENGTH = 6

const signUpSchema = z.object({
  username: z
    .string()
    .min(
      USERNAME_MIN_CHARACTERS,
      `O nome de usuário deve ter pelo menos ${USERNAME_MIN_CHARACTERS} caracteres.`
    )
    .max(
      USERNAME_MAX_CHARACTERS,
      `O nome de usuário deve ter no máximo ${USERNAME_MAX_CHARACTERS} caracteres.`
    ),
  email: z.email('E-mail inválido.'),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
    ),
})

const STATUS_CODE_CREATED = 201

export function useSignUp() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    values: {
      username: '',
      email: '',
      password: '',
    },
  })

  const [serverError, setServerError] = useState('')

  const submit = form.handleSubmit(async (data) => {
    try {
      const response = await signUp(data)

      if (response.status === STATUS_CODE_CREATED) {
        navigate({
          to: '/auth/sign-in',
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
