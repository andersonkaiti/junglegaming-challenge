import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@components/ui/input-group'
import { SearchIcon } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { ToggleColumns } from './table/toggle-columns'

export function FilterInput() {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsString.withDefault('')
  )

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <InputGroup className="w-full md:w-fit">
        <InputGroupInput
          placeholder="Buscar..."
          value={filter}
          onChange={(event) => setFilter(event.currentTarget.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>

      <ToggleColumns />
    </div>
  )
}
