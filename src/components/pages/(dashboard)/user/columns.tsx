'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/model/user'
import { ColumnDef } from '@tanstack/react-table'
import { UserIcon } from 'lucide-react'

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'avatar',
        header: '',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src={row.original.avatar} />
                    <AvatarFallback>
                        <UserIcon className="size-4" />
                    </AvatarFallback>
                </Avatar>
                <div className="">{row.original.fullName}</div>
            </div>
        ),
    },

    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'phoneNumber',
        header: 'Phone',
    },
    {
        accessorKey: 'dateOfBirth',
        header: 'Date of Birth',
    },
]
