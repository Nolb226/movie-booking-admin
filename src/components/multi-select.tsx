'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'

export type Options = Record<'value' | 'label', string>

interface MultiSelectProps {
    options: Options[]
    defaultValue?: Options[]
    onSelect?: (value: Options) => void
    onUnselect?: (value: Options) => void
}

export function MultiSelect({
    options,
    defaultValue = [],
    onSelect,
    onUnselect,
}: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<Options[]>(defaultValue)
    const [inputValue, setInputValue] = React.useState('')

    const handleUnselect = React.useCallback(
        (options: Options) => {
            setSelected((prev) => prev.filter((s) => s.value !== options.value))
            onUnselect?.(options)
        },
        [onUnselect]
    )

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (input) {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    if (input.value === '') {
                        setSelected((prev) => {
                            const newSelected = [...prev]
                            newSelected.pop()
                            return newSelected
                        })
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === 'Escape') {
                    input.blur()
                }
            }
        },
        []
    )

    const selectables = React.useMemo(
        () =>
            options.filter(
                (option) => !selected.some((s) => s.value === option.value)
            ),
        [options, selected]
    )

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
        >
            <div className="focus-within:ring-ring group rounded-md px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-offset-2">
                <div className="flex flex-wrap gap-1">
                    {selected.map((option) => {
                        return (
                            <Badge key={option.value} variant="secondary">
                                {option.label}
                                <button
                                    className="focus:ring-ring ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUnselect(option)
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    onClick={() => handleUnselect(option)}
                                >
                                    <X className="text-muted-foreground h-3 w-3 hover:text-foreground" />
                                </button>
                            </Badge>
                        )
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder="Select genres..."
                        className="placeholder:text-muted-foreground ml-2 flex-1 bg-transparent outline-none"
                    />
                </div>
            </div>
            <div className="relative mt-2">
                <CommandList>
                    {open && selectables.length > 0 ? (
                        <div className="absolute top-0 z-10 w-full rounded-md border border-main bg-gray-600 shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((option) => {
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            onSelect={(value) => {
                                                setInputValue('')
                                                setSelected((prev) => [
                                                    ...prev,
                                                    option,
                                                ])
                                                onSelect?.(option)
                                            }}
                                            className={'cursor-pointer'}
                                        >
                                            {option.label}
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    )
}
