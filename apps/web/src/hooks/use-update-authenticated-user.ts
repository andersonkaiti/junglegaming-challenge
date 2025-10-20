import { zodResolver } from '@hookform/resolvers/zod'
import type { IUser } from '@http/auth/get-authenticated-user'
import { updateAuthenticatedUser } from '@http/auth/update-authenticated-user'
import { useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const USERNAME_MIN_CHARACTERS = 2
const USERNAME_MAX_CHARACTERS = 32

const MIN_PASSWORD_LENGTH = 6

const updateSettingsSchema = z
  .object({
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
    password: z
      .union([
        z
          .string()
          .min(
            MIN_PASSWORD_LENGTH,
            `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`
          ),
        z.literal(''),
        z.undefined(),
      ])
      .transform((val) => (val === '' ? undefined : val)),
    confirmPassword: z
      .union([z.string(), z.literal(''), z.undefined()])
      .transform((val) => (val === '' ? undefined : val)),
  })
  .refine(
    ({ password, confirmPassword }) =>
      password === confirmPassword ||
      (typeof password === 'undefined' &&
        typeof confirmPassword === 'undefined'),
    {
      message: 'As senhas não coincidem.',
      path: ['confirmPassword'],
    }
  )

const STATUS_CODE_OK = 200

export function useUpdateAuthenticatedUser({ username }: IUser) {
  const form = useForm({
    resolver: zodResolver(updateSettingsSchema),
    values: {
      username: username || '',
      password: '',
      confirmPassword: '',
    },
  })

  const queryClient = useQueryClient()

  const [serverError, setServerError] = useState('')

  const submit = form.handleSubmit(async (data) => {
    try {
      const response = await updateAuthenticatedUser(data)

      if (response.status === STATUS_CODE_OK) {
        toast.success('Usuário atualizado com sucesso!')

        queryClient.invalidateQueries({
          queryKey: ['user'],
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
