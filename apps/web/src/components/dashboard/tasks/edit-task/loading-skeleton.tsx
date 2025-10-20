import { Skeleton } from '@components/ui/skeleton'

export function LoadingSkeleton() {
  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <div className="w-full space-y-8">
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            Título
          </label>
          <Skeleton className="h-8 w-full" />
        </div>

        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            Descrição
          </label>
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Data de Vencimento
            </label>
            <Skeleton className="h-12 w-full" />
          </div>
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Prioridade
            </label>
            <Skeleton className="h-12 w-full" />
          </div>
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Status
            </label>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>

        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            Usuários
          </label>
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
          <Skeleton className="h-10 w-full md:w-32" />
          <Skeleton className="h-10 w-full md:w-48" />
        </div>
      </div>
    </div>
  )
}
