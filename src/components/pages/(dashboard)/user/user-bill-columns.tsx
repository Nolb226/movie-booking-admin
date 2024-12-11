import { Bill } from '@/model/bill'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const userBillColumns: ColumnDef<Bill>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'createAt',
        header: 'Bought At',
        cell: ({ row }) => {
            const bill = row.original
            return <div>{format(bill.createAt, 'yyyy-MM-dd')}</div>
        },
    },
    {
        accessorKey: 'Tickets',
        cell: ({ row }) => {
            const bill = row.original
            return (
                <div className="pt-4 text-sm">
                    Seats:{' '}
                    <span className="font-semibold">
                        {bill.tickets
                            .map((ticket) => ticket.seatName)
                            .join(', ')}
                    </span>
                </div>
            )
        },
    },
]
