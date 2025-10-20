import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="flex">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex-1 px-4 py-2">
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>

          {Array.from({ length: 13 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="border-muted-foreground/10 flex border-t"
            >
              {Array.from({ length: 6 }).map((_, colIdx) => (
                <div key={colIdx} className="h-12.5 flex-1 px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
