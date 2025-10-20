import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'

export function UserProfile() {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>

      <span>andersonkaiti</span>
    </div>
  )
}
