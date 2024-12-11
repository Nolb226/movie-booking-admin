'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/model/user'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, UserIcon } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import UserDetail from './user-detail'

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
    {
        header: 'Action',
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(movie.id)
                            }
                        >
                            Copy payment ID
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <UserDetail user={row.original} />
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete movie</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
