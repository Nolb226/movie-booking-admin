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
