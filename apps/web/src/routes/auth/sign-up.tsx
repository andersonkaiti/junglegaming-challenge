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
import { useSignUp } from '@hooks/use-sign-up.hook'
import { createFileRoute, Link } from '@tanstack/react-router'
import { TriangleAlert } from 'lucide-react'

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUp,
})

function SignUp() {
  const { submit, form, serverError } = useSignUp()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <h1 className="text-3xl font-bold">Crie sua conta</h1>

      <Form {...form}>
        <form onSubmit={submit} className="w-full max-w-xl space-y-8 p-5">
          {serverError && (
            <Alert variant="destructive">
              <TriangleAlert />

              <AlertTitle>Erro ao cadastrar usuário.</AlertTitle>
              <AlertDescription>
                <p>{serverError}</p>
              </AlertDescription>
            </Alert>
          )}
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-mail" {...field} />
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Cadastrar</Button>
        </form>
      </Form>

      <footer>
        <p className="text-sm">
          Já tem uma conta?{' '}
          <Link to="/auth/sign-in" className="font-semibold hover:underline">
            Entre aqui
          </Link>{' '}
        </p>
      </footer>
    </div>
  )
}
