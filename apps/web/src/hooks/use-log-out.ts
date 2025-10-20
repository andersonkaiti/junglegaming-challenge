import { useNavigate } from '@tanstack/react-router'

export function useLogOut() {
  const navigate = useNavigate()

  function logOut() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

    navigate({
      to: '/auth/sign-in',
      replace: true,
    })
  }

  return {
    logOut,
  }
}
