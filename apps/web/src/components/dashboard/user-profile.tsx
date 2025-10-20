import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { getAuthenticatedUser } from '@http/auth/get-authenticated-user'
import { useQuery } from '@tanstack/react-query'

export function UserProfile() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getAuthenticatedUser,
  })

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>
          {user?.username
            ? user.username
                .split(' ')
                .slice(0, 2)
                .map((word) => word.charAt(0))
                .join('')
                .toUpperCase()
            : null}
        </AvatarFallback>
      </Avatar>

      <span>{user?.username}</span>
    </div>
  )
}
