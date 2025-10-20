import { AnimatedThemeToggler } from '@components/ui/animated-theme-toggler'
import { Toaster } from '@components/ui/sonner'
import { QueryProvider } from '@providers/query-provider'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <div className="relative">
          <AnimatedThemeToggler className="absolute top-5 right-5 z-50" />

          <Outlet />

          <Toaster />
        </div>
      </NuqsAdapter>
    </QueryProvider>
  )
}
