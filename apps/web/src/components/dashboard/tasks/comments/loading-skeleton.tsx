import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, idx) => (
        <Skeleton key={idx} className="h-32.5 w-full rounded-lg" />
      ))}
    </div>
  )
}
