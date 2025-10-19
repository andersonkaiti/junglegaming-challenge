import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@components/ui/sidebar'
import { useLogOut } from '@hooks/use-log-out'
import { Link } from '@tanstack/react-router'
import { EllipsisVertical, Home, LogOut, Wrench } from 'lucide-react'
import { UserProfile } from './user-profile'

export function DashboardSidebar() {
  const { logOut } = useLogOut()

  return (
    <Sidebar>
      <SidebarHeader className="pt-4">
        <Button variant="ghost" className="w-full justify-between">
          <UserProfile />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="ghost">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Button variant="ghost" className="w-full" onClick={logOut}>
                  <LogOut />
                  <span>Deslogar</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    to="/dashboard/tasks"
                    className="flex items-center gap-2"
                  >
                    <Home className="size-3.5" />
                    <span>Tarefas</span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton>
                  <Link
                    to="/dashboard/tasks"
                    className="flex items-center gap-2"
                  >
                    <Wrench className="size-3.5" />
                    <span>Configurações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
