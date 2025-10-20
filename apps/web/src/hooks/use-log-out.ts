import { removeToken } from '@utils/remove-token'

export function useLogOut() {
  function logOut() {
    removeToken()
  }

  return {
    logOut,
  }
}
