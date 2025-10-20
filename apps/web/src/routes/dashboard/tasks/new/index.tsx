import { Button } from '@components/ui/button'
import { DatePicker } from '@components/ui/date-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import MultipleSelector from '@components/ui/multiselect'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@components/ui/select'
import { Textarea } from '@components/ui/textarea'
import { useCreateTask } from '@hooks/use-create-task'
import { listUsers } from '@http/users/list-users'
import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tasks/new/')({
  component: CreateTask,
  loader: async () => ({
    users: await listUsers(),
  }),
})

function CreateTask() {
  const { users } = useLoaderData({ from: '/dashboard/tasks/new/' })

  const { form, submit } = useCreateTask()

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <Form {...form}>
        <form onSubmit={submit} className="w-full space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da tarefa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite a descrição da tarefa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Vencimento</FormLabel>
                  <FormControl>
                    <DatePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridade</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        {{
                          LOW: 'Baixa',
                          MEDIUM: 'Média',
                          HIGH: 'Alta',
                          URGENT: 'Urgente',
                        }[field.value] || 'Selecione a prioridade'}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Baixa</SelectItem>
                        <SelectItem value="MEDIUM">Média</SelectItem>
                        <SelectItem value="HIGH">Alta</SelectItem>
                        <SelectItem value="URGENT">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        {{
                          TODO: 'A Fazer',
                          IN_PROGRESS: 'Em Progresso',
                          REVIEW: 'Em Revisão',
                          DONE: 'Concluído',
                        }[field.value] || 'Selecione o status'}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TODO">A Fazer</SelectItem>
                        <SelectItem value="IN_PROGRESS">
                          Em Progresso
                        </SelectItem>
                        <SelectItem value="REVIEW">Em Revisão</SelectItem>
                        <SelectItem value="DONE">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="userIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuários</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={
                      users
                        ?.filter((user) => field.value?.includes(user.id))
                        .map((user) => ({
                          label: `${user.username} (${user.email})`,
                          value: user.id,
                        })) || []
                    }
                    defaultOptions={
                      users?.map((user) => ({
                        label: `${user.username} (${user.email})`,
                        value: user.id,
                      })) || []
                    }
                    placeholder="Selecione um ou mais usuários"
                    hideClearAllButton
                    hidePlaceholderWhenSelected
                    emptyIndicator={
                      <p className="text-center text-sm">
                        Nenhum usuário encontrado
                      </p>
                    }
                    onChange={(options) => {
                      field.onChange(options.map((opt) => opt.value))
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
            <Button
              type="button"
              asChild
              className="w-full md:w-fit"
              variant="outline"
            >
              <Link to="/dashboard/tasks">Cancelar</Link>
            </Button>

            <Button type="submit" className="w-full md:w-fit">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
