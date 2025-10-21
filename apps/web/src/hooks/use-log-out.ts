import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export function useLogOut() {
  const navigate = useNavigate()

  function logOut() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

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
