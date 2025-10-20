import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Label } from '@components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Textarea } from '@components/ui/textarea'
import { useCreateComment } from '@hooks/use-create-comment'
import { listUsers } from '@http/users/list-users'
import {
  createFileRoute,
  Link,
  redirect,
  useLoaderData,
} from '@tanstack/react-router'
import { HTTPError } from 'ky'

const STATUS_CODE_UNAUTHORIZED = 401

export const Route = createFileRoute('/dashboard/tasks/comments/new/$taskId')({
  component: CreateComment,
  loader: async ({ params: { taskId } }) => {
    try {
      return {
        taskId,
        users: await listUsers(),
      }
    } catch (err) {
      if (err instanceof HTTPError) {
        const errorBody = await err.response.json()

        if (errorBody.statusCode === STATUS_CODE_UNAUTHORIZED) {
          document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

          throw redirect({
            to: '/auth/sign-in',
          })
        }
      }
    }
  },
})

function CreateComment() {
  const data = useLoaderData({
    from: '/dashboard/tasks/comments/new/$taskId',
  })

  const users = data?.users || []
  const taskId = data?.taskId || ''

  const { form, serverError, submit } = useCreateComment(taskId)

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <Form {...form}>
        <form onSubmit={submit} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentário</FormLabel>
                <FormControl>
                  <Textarea placeholder="Digite seu comentário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <Label>ID da tarefa</Label>
            <p>{taskId}</p>
          </FormItem>

          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuários</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um ou mais usuários" />
                    </SelectTrigger>
                    <SelectContent>
                      {users && users.length > 0 ? (
                        users.map((user: any) => (
                          <SelectItem key={user.id} value={user.id}>
                            {`${user.username} (${user.email})`}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="px-2 py-2 text-center text-sm">
                          Nenhum usuário encontrado
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {serverError && (
            <div className="text-destructive text-sm">{serverError}</div>
          )}

          <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
            <Button
              type="button"
              asChild
              className="w-full md:w-fit"
              variant="outline"
            >
              <Link
                to="/dashboard/tasks/comments/$taskId"
                params={{
                  taskId,
                }}
              >
                Cancelar
              </Link>
            </Button>

            <Button type="submit" className="w-full md:w-fit">
              Criar Comentário
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
