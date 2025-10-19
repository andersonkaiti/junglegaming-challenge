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
import { useSignIn } from '@hooks/use-sign-in.hook'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in')({
  component: Home,
})

function Home() {
  const { submit, form } = useSignIn()

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <h1 className="text-3xl font-bold">Entre na sua conta</h1>

      <Form {...form}>
        <form onSubmit={submit} className="w-full max-w-xl space-y-8">
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
                  <Input placeholder="Senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Entrar</Button>
        </form>
      </Form>

      <footer>
        <p className="text-sm">
          Não tem uma conta?{' '}
          <Link to="/sign-up" className="font-semibold hover:underline">
            Cadastra-se aqui
          </Link>{' '}
        </p>
      </footer>
    </div>
  )
}
