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
import { ALPHABET, SEAT_COLS } from '@/constants/alphabet'
import Selectable, { SelectableRef } from 'react-selectable-box'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { addHallAction } from '@/actions/cinema'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default function Page({ params }: { params: { id: string } }) {
    const [numberOfRows, setNumberOfRows] = useState<number>(5)
    const [numberOfColumns, setNumberOfColumns] = useState<number>(5)
    const [seats, setSeats] = useState(
        Array.from({ length: numberOfRows }, () =>
            Array.from({ length: numberOfColumns }, () => null)
        )
    )

    const selectableRef = useRef<SelectableRef>(null)
    const [selectedZones, setSelectedZones] = useState([])
    useEffect(() => {
        const newSeat = Array.from({ length: numberOfRows }, () =>
            Array.from({ length: numberOfColumns }, () => null)
        )
        setSeats([...newSeat])
    }, [numberOfRows, numberOfColumns])

    const onDropSeat = (
        seat: { type: 0 | 1 | 2 },
        row: number,
        col: number
    ) => {
        setSeats((prevSeats) => {
            const newSeats = [...prevSeats.map((row) => [...row])]

            if (selectedZones.length === 0) {
                // Update single seat
                newSeats[row][col] =
                    seat.type === 0
                        ? null
                        : {
                              ...seat,
                              rowIndex: col + 1,
                              rowName: ALPHABET[row],
                              status: true,
                          }
            } else {
                // Update selected zone seats
                selectedZones.forEach((zone: { col: number; row: number }) => {
                    newSeats[zone.row][zone.col] =
                        seat.type === 0
                            ? null
                            : {
                                  ...seat,
                                  rowIndex: zone.col + 1,
                                  rowName: ALPHABET[zone.row],
                                  status: true,
                              }
                })
            }

            return newSeats
        })

        setSelectedZones([])
    }

    return (
        <div className="relative mt-4 flex h-full flex-col justify-between gap-12 pb-8 pl-6 pr-8 lg:flex-row">
            <div className="flex w-full items-center lg:w-3/4">
                <Selectable
                    value={selectedZones}
                    ref={selectableRef}
                    onEnd={(selected) => {
                        setSelectedZones(() => selected)
                    }}
                    compareFn={(item, value) => {
                        return item.row === value.row && item.col === value.col
                    }}
                    onStart={() => {
                        setSelectedZones([])
                    }}
                    dragContainer={() =>
                        document.getElementById('drag-container')!
                    }
                >
                    <div
                        id="drag-container"
                        className="flex w-full flex-col-reverse gap-2 rounded-md p-4"
                    >
                        {seats.map((row, rowIndex) => (
                            <div className="flex" key={rowIndex}>
                                <div className="">{ALPHABET[rowIndex]}</div>
                                <div className="flex flex-1 justify-center gap-2">
                                    {row.map((seat, colIndex) => (
                                        <SeatDropzone
                                            key={`${rowIndex}-${colIndex}`}
                                            row={rowIndex}
                                            col={colIndex}
                                            zones={selectedZones}
                                            onSeatDrop={onDropSeat}
                                            currentSeat={seat}
                                        />
                                    ))}
                                </div>
                                <div className="">{ALPHABET[rowIndex]}</div>
                            </div>
                        ))}
                    </div>
                </Selectable>
            </div>
            <div className="bottom-0 left-0 right-0 flex w-full gap-2 max-lg:absolute lg:w-1/4 lg:flex-col">
                <Card>
                    <CardHeader>
                        <CardTitle>Seat</CardTitle>
                        <CardDescription>
                            Choose seat to drop into the layout
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4 lg:flex-col">
                        <div className="flex items-center gap-2">
                            <DraggableSeat seat={{ type: 0 }} />
                            <span className="text-sm font-semibold">Empty</span>
                        </div>
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
                <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>
                            Set number of rows and columns
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 lg:flex-col">
                            <Select
                                onValueChange={(value) => {
                                    setNumberOfRows(() => +value)
                                }}
                                defaultValue={numberOfColumns + ''}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seat rows" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ALPHABET.map((letter, index) => (
                                        <SelectItem
                                            key={`${letter}-${index}`}
                                            value={`${index + 1}`}
                                        >
                                            {letter}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                onValueChange={(value) => {
                                    setNumberOfColumns(() => +value)
                                }}
                                defaultValue={numberOfRows + ''}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seat rows" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SEAT_COLS.map((number, index) => (
                                        <SelectItem
                                            key={`${number}-${index}`}
                                            value={`${index + 1}`}
                                        >
                                            {number}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
                <Button
                    className="flex-1"
                    onClick={() => {
                        const objData = {
                            numberOfRows: numberOfRows,
                            name: 'Test',
                            seatsPerRow: numberOfColumns,
                            status: 1,
                            seats: seats.flat(2).filter((seat) => seat),
                        }
                        addHallAction(params.id, objData)
                    }}
                >
                    Create Hall
                </Button>
            </div>
        </div>
    )
}
