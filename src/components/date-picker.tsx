'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
    onSelect?: (date: Date) => void
    defaultValue?: Date
    className?: string
}

export function DatePicker({
    onSelect,
    defaultValue = new Date(),
    className,
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date>(defaultValue)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'ghost'}
                    className={cn(
                        'w-[200px] justify-start py-0 text-left font-normal',
                        !date && 'text-muted-foreground',
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, 'P', {
                            // locale: vi,
                        })
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => {
                        setDate(day!)
                        onSelect?.(day!)
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
