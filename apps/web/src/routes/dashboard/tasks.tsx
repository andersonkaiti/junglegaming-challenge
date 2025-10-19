import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/tasks')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="flex h-full items-center justify-center">
      <h1>Tarefas</h1>
    </div>
  )
}
