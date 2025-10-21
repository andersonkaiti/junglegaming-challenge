import { Home, Wrench } from 'lucide-react'

export const sidebarMenuItems = [
  {
    label: 'Tarefas',
    icon: <Home className="size-3.5" />,
    to: '/dashboard/tasks',
    testid: 'nav-tasks',
  },
  {
    label: 'Configurações',
    icon: <Wrench className="size-3.5" />,
    to: '/dashboard/settings',
    testid: 'nav-settings',
  },
]
