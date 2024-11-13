import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const seatVariants = cva(
    'hover:ring-highlight-500 size-7 rounded-sm ring-1 ring-inset',
    {
        variants: {
            type: {
                1: 'bg-primary-900 ring-primary-850',
                2: 'ring-highlight-600 bg-yellow-800',
            },
        },
        defaultVariants: {
            type: 1,
        },
    }
)

interface SeatProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof seatVariants> {}

const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
    ({ type, className, ...props }, ref) => {
        return (
            <div
                className={cn(seatVariants({ type, className }))}
                ref={ref}
                {...props}
            ></div>
        )
    }
)

Seat.displayName = 'Seat'

export { Seat }
