import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { useUpdateAuthenticatedUser } from '@hooks/use-update-authenticated-user'
import { getAuthenticatedUser } from '@http/auth/get-authenticated-user'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { TriangleAlert } from 'lucide-react'

export const Route = createFileRoute('/dashboard/settings/')({
  component: Settings,
  loader: async () => ({
    authenticatedUser: await getAuthenticatedUser(),
  }),
})

function Settings() {
  const { authenticatedUser } = useLoaderData({
    from: '/dashboard/settings/',
  })

  const { serverError, submit, form } =
    useUpdateAuthenticatedUser(authenticatedUser)

  const { email } = authenticatedUser

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <Form {...form}>
        <form onSubmit={submit} className="w-full space-y-8 p-5">
          <h1 className="text-3xl font-bold">Atualizar usuário</h1>

          {serverError && (
            <Alert variant="destructive">
              <TriangleAlert />

              <AlertTitle>Erro ao atualizar usuário.</AlertTitle>
              <AlertDescription>
                <p>{serverError}</p>
              </AlertDescription>
            </Alert>
          )}

          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl>
              <Input value={email} disabled />
            </FormControl>
          </FormItem>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de usuário</FormLabel>
                <FormControl>
                  <Input placeholder="Nome de usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Nova senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme a nova senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme a nova senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Atualizar
          </Button>
        </form>
      </Form>
    </div>
  )
}
