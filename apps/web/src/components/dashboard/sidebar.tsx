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
import { Link, useRouterState } from '@tanstack/react-router'
import { EllipsisVertical, LogOut } from 'lucide-react'
import { sidebarMenuItems } from './sidebar-menu-items'
import { UserProfile } from './user-profile/user-profile'

export function DashboardSidebar() {
  const { logOut } = useLogOut()
  const { location } = useRouterState()

  return (
    <Sidebar>
      <SidebarHeader className="border-border mb-4 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <UserProfile />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="User actions">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    logOut()
                  }}
                >
                  <LogOut />
                  <span>Deslogar</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.to}
                  >
                    <Link
                      to={item.to}
                      className={`flex w-full items-center gap-2 ${
                        location.pathname === item.to
                          ? 'bg-accent text-accent-foreground font-semibold'
                          : ''
                      }`}
                      data-testid={item.testid}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
