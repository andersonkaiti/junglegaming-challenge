import { DashboardSidebar } from '@components/dashboard/sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar />

      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex items-center gap-2 p-4">
            <SidebarTrigger className="cursor-pointer" />
          </div>

          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
