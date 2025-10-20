import { useNavigate } from '@tanstack/react-router'
import { removeToken } from '@utils/remove-token'
import { toast } from 'sonner'

export function useLogOut() {
  const navigate = useNavigate()

  function logOut() {
    removeToken()

    toast.success('Deslogado com sucesso!')

    navigate({
      to: '/auth/sign-in',
      replace: true,
    })
  }

  return {
    logOut,
  }
}
