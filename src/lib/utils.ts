import { TimePickerType } from '@/components/time-picker'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function currencyFormat(currency: number) {
    const { format } = Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
    return format(currency)
}
export function isValidHour(value: string) {
    return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value)
}

/**
 * regular expression to check for valid 12 hour format (01-12)
 */
export function isValid12Hour(value: string) {
    return /^(0[1-9]|1[0-2])$/.test(value)
}

/**
 * regular expression to check for valid minute format (00-59)
 */
export function isValidMinuteOrSecond(value: string) {
    return /^[0-5][0-9]$/.test(value)
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean }

export function getValidNumber(
    value: string,
    { max, min = 0, loop = false }: GetValidNumberConfig
) {
    let numericValue = parseInt(value, 10)

    if (!isNaN(numericValue)) {
        if (!loop) {
            if (numericValue > max) numericValue = max
            if (numericValue < min) numericValue = min
        } else {
            if (numericValue > max) numericValue = min
            if (numericValue < min) numericValue = max
        }
        return numericValue.toString().padStart(2, '0')
    }

    return '00'
}

export function getValidHour(value: string) {
    if (isValidHour(value)) return value
    return getValidNumber(value, { max: 23 })
}

export function getValid12Hour(value: string) {
    if (isValid12Hour(value)) return value
    return getValidNumber(value, { min: 1, max: 12 })
}

export function getValidMinuteOrSecond(value: string) {
    if (isValidMinuteOrSecond(value)) return value
    return getValidNumber(value, { max: 59 })
}

type GetValidArrowNumberConfig = {
    min: number
    max: number
    step: number
}

export function getValidArrowNumber(
    value: string,
    { min, max, step }: GetValidArrowNumberConfig
) {
    let numericValue = parseInt(value, 10)
    if (!isNaN(numericValue)) {
        numericValue += step
        return getValidNumber(String(numericValue), { min, max, loop: true })
    }
    return '00'
}

export function getValidArrowHour(value: string, step: number) {
    return getValidArrowNumber(value, { min: 0, max: 23, step })
}

export function getValidArrow12Hour(value: string, step: number) {
    return getValidArrowNumber(value, { min: 1, max: 12, step })
}

export function getValidArrowMinuteOrSecond(value: string, step: number) {
    return getValidArrowNumber(value, { min: 0, max: 59, step })
}

export function getArrowByType(
    value: string,
    step: number,
    type: TimePickerType
) {
    switch (type) {
        case 'minutes':
            return getValidArrowMinuteOrSecond(value, step)
        case 'seconds':
            return getValidArrowMinuteOrSecond(value, step)
        case 'hours':
            return getValidArrowHour(value, step)

        default:
            return '00'
    }
}

export const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}h ${minutes}m`
}
