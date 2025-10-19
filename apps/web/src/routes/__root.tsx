import { AnimatedThemeToggler } from '@components/ui/animated-theme-toggler'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="relative">
      <AnimatedThemeToggler className="absolute top-5 right-5 z-50" />

      <Outlet />
    </div>
  )
}
