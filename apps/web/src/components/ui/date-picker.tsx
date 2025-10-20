import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { useEffect, useState } from 'react'

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(value)

  useEffect(() => {
    if (value !== undefined) {
      setDate(value)
    }
  }, [value])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setOpen(false)
    if (onChange) {
      onChange(selectedDate)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
