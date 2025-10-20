import { Button } from '@components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Columns3Icon } from 'lucide-react'
import { parseAsBoolean, useQueryStates } from 'nuqs'
import { tasksColumns } from './columns'

type ToggleColumnsKeys = 'title' | 'dueDate' | 'priority' | 'status'

export function ToggleColumns() {
  const [columnsVisibility, setColumnsVisibility] = useQueryStates({
    title: parseAsBoolean.withDefault(true),
    dueDate: parseAsBoolean.withDefault(true),
    priority: parseAsBoolean.withDefault(true),
    status: parseAsBoolean.withDefault(true),
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Columns3Icon
            className="-ms-1 opacity-60"
            size={16}
            aria-hidden="true"
          />
          Visualizar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuLabel>Alternar colunas</DropdownMenuLabel>
        {tasksColumns.map((column) => {
          const columnKey = column.id as ToggleColumnsKeys

          if (column.id === 'actions') {
            return
          }

          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={columnsVisibility[columnKey]}
              onCheckedChange={(value) =>
                setColumnsVisibility((prev) => ({
                  ...prev,
                  [columnKey]: value,
                }))
              }
              onSelect={(event) => event.preventDefault()}
            >
              {typeof column.header === 'function' ? column.id : column.header}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
