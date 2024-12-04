import { Badge } from '@/components/ui/badge'
import { Movie } from '@/model/movie'
import { ColumnDef } from '@tanstack/react-table'
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
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
export const movieColumns: ColumnDef<Movie>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Title',
    },
    {
        accessorKey: 'runningTime',
        header: 'Duration',
    },

    {
        accessorKey: 'releaseDate',
        header: 'Release Date',
    },
    {
        accessorKey: 'status.description',
        header: 'Status',
        cell: ({ row }) => {
            const movie = row.original
            return (
                <Badge
                    variant={movie.status.id === 1 ? 'default' : 'secondary'}
                >
                    {movie.status.description}
                </Badge>
            )
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const movie = row.original

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
                                <Link href={`/movie/${movie.id}`}>
                                    View details
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Delete movie</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
