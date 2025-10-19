import { TasksTable } from '@components/dashboard/tasks/table/table'
import { Button } from '@components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/dashboard/tasks/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <header className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">Tarefas</h1>

        <Button asChild>
          <Link to="/dashboard/tasks/new">
            <Plus />
            Criar tarefa
          </Link>
        </Button>
      </header>

      <TasksTable />
    </div>
  )
}
