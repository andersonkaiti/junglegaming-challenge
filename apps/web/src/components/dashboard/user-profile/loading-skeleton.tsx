import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="h-5 w-28" />
    </div>
  )
}
