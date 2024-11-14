'use client'
import { Seat } from '@/components/ui/seat'
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
                    <Seat
                        className="flex items-center justify-center"
                        key={seat.id}
                        type={seat.seatType.id}
                    >
                        {seat.rowIndex}
                    </Seat>
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
