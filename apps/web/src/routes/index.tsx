import { DashboardSidebar } from '@components/dashboard/sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@components/ui/sidebar'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <div className="min-h-scren flex w-full flex-col">
          <SidebarTrigger className="mt-4 ml-4 cursor-pointer" />

          <div className="flex h-full items-center justify-center">
            <h1>Dashboard</h1>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
