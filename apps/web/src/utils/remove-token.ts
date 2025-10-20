import { redirect } from '@tanstack/react-router'

export function removeToken() {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

  throw redirect({
    to: '/auth/sign-in',
    replace: true,
  })
}
