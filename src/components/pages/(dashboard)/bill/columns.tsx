'use client'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import { Bill } from '@/model/bill'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import Link from 'next/link'

export const billColumns: ColumnDef<Bill>[] = [
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
        accessorKey: 'cinema.name',
        header: 'Cinema',
        cell: ({ row }) => {
            const bill = row.original
            return (
                <div>
                    <Button variant={'link'} asChild>
                        <Link href={`/cinema/${bill.cinema.id}`}>
                            {bill.cinema.name}
                        </Link>
                    </Button>
                    <div className="text-xs text-gray-500">
                        {bill.cinema.hallName}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'movie.name',
        header: 'Movie',
        cell: ({ row }) => {
            const bill = row.original
            return (
                <div className="flex items-center gap-0.5">
                    <Button variant={'link'} asChild>
                        <Link href={`/movie/${bill.movie.id}`}>
                            {bill.movie.name}
                        </Link>
                    </Button>
                    <span className="self-start text-[11px] text-gray-500">
                        {bill.show.format}
                    </span>
                </div>
            )
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
    {
        header: 'Customer',

        cell: ({ row }) => {
            const bill = row.original
            return (
                <div className="gap-2 text-left">
                    <div className="text-sm">{bill.customer.fullname}</div>
                    <div className="text-xs text-gray-500">
                        {bill.customer.email}
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ row }) => {
            const bill = row.original
            return (
                <span className="font-semibold text-highlight-500">
                    {formatCurrency(bill.total)}
                </span>
            )
        },
    },
]
