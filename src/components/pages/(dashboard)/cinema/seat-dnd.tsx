'use client'
import { Seat } from '@/components/ui/seat'
import { cn } from '@/lib/utils'
import { useDrag, useDrop } from 'react-dnd'
import { useSelectable } from 'react-selectable-box'

interface DraggableSeatProps {
    seat: {
        type: 1 | 2 | 0
    } | null
}

function DraggableSeat({ seat }: DraggableSeatProps) {
    const [, drag] = useDrag(
        () => ({
            type: 'seat',
            item: { seat },

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
    zones: any
    currentSeat?: { type: 1 | 2 | 0 }
    onSeatDrop: (seat: any, row: number, col: number) => void
}
function SeatDropzone({
    currentSeat,
    col,
    row,
    zones,
    onSeatDrop,
}: SeatDropzoneProps) {
    const { setNodeRef, isSelecting, isSelected } = useSelectable({
        value: { row, col },
    })

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: 'seat',
            drop: (item) => onSeatDrop(item.seat, row, col),
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [zones, col, row]
    )

    return (
        <div
            className={cn('size-7 rounded-sm bg-gray-800', {
                'ring-2 ring-white': isSelecting || isSelected || isOver,
            })}
            ref={(node) => {
                drop(node)
                setNodeRef(node)
            }}
        >
            {currentSeat ? (
                currentSeat.type !== 0 ? (
                    <Seat type={currentSeat.type} />
                ) : null
            ) : null}
        </div>
    )
}

export { DraggableSeat, SeatDropzone }
