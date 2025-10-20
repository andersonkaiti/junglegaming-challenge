import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, idx) => (
        <Skeleton key={idx} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  )
}
