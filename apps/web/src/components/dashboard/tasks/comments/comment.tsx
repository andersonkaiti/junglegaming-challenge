import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from '@components/ui/item'

interface IUser {
  id: string
  username: string
  email: string
}

export interface IComment {
  id: string
  taskId: string
  userId: string
  text: string
  createdAt: string
  updatedAt: string
}

interface ICommentProps {
  users: IUser[]
  comment: IComment
}

export function Comment({ users, comment }: ICommentProps) {
  function getUserDisplay(userId: string) {
    const user = users?.find((user) => user?.id === userId)

    return `${user?.username} (${user?.email})`
  }

  return (
    <Item key={comment.id}>
      <ItemHeader>
        <ItemTitle className="text-lg">
          Para: {getUserDisplay(comment.userId)}
        </ItemTitle>
      </ItemHeader>

      <ItemContent>
        <p>{comment.text}</p>
      </ItemContent>

      <ItemFooter>
        <p className="text-xs">
          {' '}
          Criado em{' '}
          {new Date(comment.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </ItemFooter>
    </Item>
  )
}
