'use client'
import { Seat } from '@/components/ui/seat'
import { cn } from '@/lib/utils'
import { useDrag, useDrop } from 'react-dnd'

interface DraggableSeatProps {
    seat: {
        type: 1 | 2
    }
}

function DraggableSeat({ seat }: DraggableSeatProps) {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: 'seat',
            item: { seat },
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult()
                if (item && dropResult) {
                    console.log(
                        `You dropped ${item.seat.type} into ${
                            dropResult.row
                        }, ${dropResult.col}`
                    )
                }
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        []
    )
    return <Seat ref={drag} type={seat.type} />
}

interface SeatDropzoneProps {
    row: number
    col: number
    currentSeat?: { type: 1 | 2 }
    onSeatDrop: (seat: any, row: number, col: number) => void
}
function SeatDropzone({
    currentSeat,
    col,
    row,
    onSeatDrop,
}: SeatDropzoneProps) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'seat',
        drop: (item) => onSeatDrop(item.seat, row, col),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }))

    return (
        <div
            className="size-7 rounded-sm"
            style={{
                backgroundColor: isOver ? 'rgba(255, 255, 255, 0.1)' : 'gray',
                border: isOver ? '1px solid white' : '',
            }}
            ref={drop}
        >
            {currentSeat ? <Seat type={currentSeat.type} /> : null}
        </div>
    )
}

export { DraggableSeat, SeatDropzone }
