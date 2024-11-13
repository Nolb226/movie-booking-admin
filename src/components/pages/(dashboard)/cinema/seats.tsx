'use client'
import { cn } from '@/lib/utils'
import { SeatRow, Seat as TSeat } from '@/model/cinema'
import { useCallback, useMemo } from 'react'

interface SeatsProps extends React.HTMLAttributes<HTMLDivElement> {
    rows: SeatRow[]
}

export default function Seats({ rows, className, ...props }: SeatsProps) {
    const maxColumn = useMemo(
        () => Math.max(...rows.map((row) => row.seats.length)),
        [rows]
    )
    const renderSeat = useCallback(
        (row: SeatRow) => {
            return Array.from({ length: maxColumn }).map((_, index) => {
                const seat = row.seats.find((seat) => seat.rowIndex === index)
                return seat ? (
                    <Seat key={seat.id} seat={{ ...seat }} />
                ) : (
                    <div key={index} className="size-7"></div>
                )
            })
        },
        [maxColumn]
    )

    return (
        <div
            className={cn('flex flex-col-reverse gap-2', className)}
            {...props}
        >
            {rows.map((row) => {
                return (
                    <div key={row.rowName} className="flex">
                        <div className="font-semibold">{row.rowName}</div>
                        <div className="flex flex-1 justify-center gap-2">
                            {renderSeat(row)}
                        </div>
                        <div className="font-semibold">{row.rowName}</div>
                    </div>
                )
            })}
        </div>
    )
}

interface SeatProps extends React.HTMLAttributes<HTMLDivElement> {
    seat: TSeat
}

function Seat({
    className,
    seat: { id, isReserved, rowIndex },
    ...props
}: SeatProps) {
    return (
        <label htmlFor={id + ''}>
            <input
                id={id + ''}
                type="checkbox"
                className="peer hidden"
                disabled={isReserved}
            />
            <div
                className={cn(
                    'bg-primary-900 ring-primary-850 peer-disabled:bg-secondary-900 peer-disabled:text-secondary-850 flex size-7 cursor-pointer select-none items-center justify-center rounded-sm ring-1 ring-inset',
                    className
                )}
                {...props}
            >
                {/* {rowName} */}
                {rowIndex}
            </div>
        </label>
    )
}
