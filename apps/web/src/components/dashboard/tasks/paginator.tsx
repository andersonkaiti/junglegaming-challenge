import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { usePagination } from '@hooks/use-pagination'
import { parseAsInteger, useQueryState } from 'nuqs'

type PaginationProps = {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay?: number
}

export default function Paginator({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  })

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [size, setSize] = useQueryState('size', parseAsInteger.withDefault(10))

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) {
      return
    }

    setPage(newPage)
  }

  function handleSizeChange(newSize: string) {
    setSize(Number(newSize))
    setPage(1)
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p
        className="text-muted-foreground hidden flex-1 text-sm whitespace-nowrap sm:block"
        aria-live="polite"
      >
        Página <span className="text-foreground">{page}</span> de{' '}
        <span className="text-foreground">{totalPages}</span>
      </p>

      <div className="w-full sm:grow">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : 0}
                style={{
                  pointerEvents: page === 1 ? 'none' : undefined,
                  opacity: page === 1 ? 0.5 : undefined,
                }}
                onClick={() => handlePageChange(page - 1)}
              />
            </PaginationItem>

            {totalPages > 3 ? (
              <>
                {/* Mobile */}
                <div className="flex sm:hidden">
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationLink
                        isActive={false}
                        aria-current={undefined}
                        onClick={() => handlePageChange(page - 1)}
                        size="default"
                        className="hover:bg-accent rounded-md px-3 py-1 transition-colors"
                      >
                        {page - 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      isActive={true}
                      aria-current="page"
                      size="default"
                      className="text-primary bg-primary/5 rounded-md px-3 py-1 font-bold"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  {page < totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        isActive={false}
                        aria-current={undefined}
                        onClick={() => handlePageChange(page + 1)}
                        size="default"
                        className="hover:bg-accent rounded-md px-3 py-1 transition-colors"
                      >
                        {page + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                </div>

                {/* Desktop */}
                <div className="hidden sm:flex">
                  {showLeftEllipsis && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {pages.map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        aria-current={p === page ? 'page' : undefined}
                        onClick={() => handlePageChange(p)}
                        size="default"
                        style={{
                          fontWeight: p === page ? 'bold' : undefined,
                          borderColor: undefined,
                        }}
                        className={`rounded-md px-3 py-1 transition-colors ${
                          p === page
                            ? 'text-primary bg-primary/5'
                            : 'hover:bg-accent'
                        } `}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {showRightEllipsis && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </div>
              </>
            ) : (
              pages.map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    aria-current={p === page ? 'page' : undefined}
                    onClick={() => handlePageChange(p)}
                    size="default"
                    style={{
                      fontWeight: p === page ? 'bold' : undefined,
                      borderColor: undefined,
                    }}
                    className={`rounded-md px-3 py-1 transition-colors ${
                      p === page
                        ? 'text-primary bg-primary/5'
                        : 'hover:bg-accent'
                    } `}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))
            )}

            <PaginationItem>
              <PaginationNext
                aria-disabled={page === totalPages}
                tabIndex={page === totalPages ? -1 : 0}
                style={{
                  pointerEvents: page === totalPages ? 'none' : undefined,
                  opacity: page === totalPages ? 0.5 : undefined,
                }}
                onClick={() => handlePageChange(page + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <div className="flex w-full flex-1 justify-end sm:w-auto">
        <Select
          value={String(size)}
          onValueChange={handleSizeChange}
          aria-label="Resultados por página"
        >
          <SelectTrigger
            id="results-per-page"
            className="w-full whitespace-nowrap sm:w-fit"
          >
            <SelectValue placeholder="Selecione o número de resultados" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={String(num)}>
                {num} / página
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p
        className="text-muted-foreground mt-2 block text-center text-xs sm:hidden"
        aria-live="polite"
      >
        Página <span className="text-foreground">{page}</span> de{' '}
        <span className="text-foreground">{totalPages}</span>
      </p>
    </div>
  )
}
