import { findTasks } from '@/http/tasks/find-tasks'
import { TasksTable } from '@components/dashboard/tasks/table/table'
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from '@tanstack/react-router'
import { HTTPError } from 'ky'

const STATUS_CODE_UNAUTHORIZED = 401

export const Route = createFileRoute('/dashboard/tasks')({
  component: Dashboard,
  loader: async () => {
    try {
      return {
        tasks: await findTasks(),
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

function Dashboard() {
  const data = useLoaderData({ from: '/dashboard/tasks' })

  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <h1 className="text-3xl font-bold">Tarefas</h1>

      <TasksTable tasks={data?.tasks || []} />
    </div>
  )
}
