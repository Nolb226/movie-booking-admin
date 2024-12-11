'use client'

import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface NumberInputProps {
    min?: number
    max?: number
    step?: number
    value: number
    onChange: (value: number) => void
}

export function NumberInput({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
}: NumberInputProps) {
    const [inputValue, setInputValue] = useState(value.toString())

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)

        const numericValue = parseFloat(newValue)
        if (
            !isNaN(numericValue) &&
            numericValue >= min &&
            numericValue <= max
        ) {
            onChange(numericValue)
        }
    }

    const handleBlur = () => {
        const numericValue = parseFloat(inputValue)
        if (isNaN(numericValue) || numericValue < min) {
            setInputValue(min.toString())
            onChange(min)
        } else if (numericValue > max) {
            setInputValue(max.toString())
            onChange(max)
        } else {
            setInputValue(numericValue.toString())
            onChange(numericValue)
        }
    }

    const increment = useCallback(() => {
        const newValue = Math.min(value + step, max)
        setInputValue(newValue.toString())
        onChange(newValue)
    }, [value, step, max, onChange])

    const decrement = useCallback(() => {
        const newValue = Math.max(value - step, min)
        setInputValue(newValue.toString())
        onChange(newValue)
    }, [value, step, min, onChange])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            increment()
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            decrement()
        }
    }

    return (
        <div className="relative w-20">
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="pr-8 text-sm"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                role="spinbutton"
            />
            <div className="absolute inset-y-0 right-0 flex flex-col">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={increment}
                    disabled={value >= max}
                    className="h-1/2 rounded-none rounded-tr-md px-2"
                >
                    <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={decrement}
                    disabled={value <= min}
                    className="h-1/2 rounded-none rounded-br-md px-2"
                >
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
