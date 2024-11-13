'use client'
import {
    DraggableSeat,
    SeatDropzone,
} from '@/components/pages/(dashboard)/cinema/seat-dnd'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ALPHABET } from '@/constants/alphabet'
import { useState } from 'react'
export default function Page() {
    const [numberOfRows, setNumberOfRows] = useState(5)
    const [numberOfColumns, setNumberOfColumns] = useState(5)
    const [seats, setSeats] = useState(
        Array.from({ length: numberOfRows }, (_, row) =>
            Array.from({ length: numberOfColumns }, (_, col) => null)
        )
    )

    const onDropSeat = (seat: any, row: number, col: number) => {
        const newSeats = [...seats]
        newSeats[row][col] = seat
        setSeats(newSeats)
    }

    return (
        <div className="mt-4 flex gap-12 pl-6 pr-8">
            <div className="flex w-3/4">
                <div className="flex w-full flex-col-reverse gap-2 rounded-md p-4">
                    {seats.map((row, rowIndex) => (
                        <div className="flex" key={rowIndex}>
                            <div className="">{ALPHABET[rowIndex]}</div>
                            <div className="flex flex-1 justify-center gap-2">
                                {row.map((seat, colIndex) => (
                                    <SeatDropzone
                                        key={`${rowIndex}-${colIndex}`}
                                        row={rowIndex}
                                        col={colIndex}
                                        onSeatDrop={onDropSeat}
                                        currentSeat={seat}
                                    />
                                ))}
                            </div>
                            <div className="">{ALPHABET[rowIndex]}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/4 flex-col gap-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Seat</CardTitle>
                        <CardDescription>
                            Choose seat to drop into the layout
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <DraggableSeat seat={{ type: 1 }} />
                            <span className="text-sm font-semibold">
                                Normal
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DraggableSeat seat={{ type: 2 }} />
                            <span className="text-sm font-semibold">Vip</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
