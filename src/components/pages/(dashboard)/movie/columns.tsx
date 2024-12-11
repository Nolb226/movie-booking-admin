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
import { formatDuration } from '@/lib/utils'
export const movieColumns: ColumnDef<Movie>[] = [
    {
        accessorKey: 'id',
        header: 'Id',
    },
    {
        accessorKey: 'name',
        header: 'Title',
        cell: ({ row }) => {
            const movie = row.original
            return (
                <div className="flex items-center gap-0.5">
                    <div className="text-sm">{movie.name}</div>
                    <span className="self-start text-[10px] text-gray-500">
                        {movie.subName}
                    </span>
                </div>
            )
        },
    },
    // {
    //     accessorKey: 'poster',
    //     header: 'Poster',
    //     cell: ({ row }) => (
    //         <div className="aspect-[3/2]">
    //             <img src={row.original.poster} alt="" />
    //         </div>
    //     ),
    // },
    {
        accessorKey: 'runningTime',
        header: 'Duration',
        cell: ({ row }) => (
            <div>{formatDuration(row.original.runningTime)}</div>
        ),
    },

    {
        accessorKey: 'releaseDate',
        header: 'Release Date',
    },
    // {
    //     header: 'Genre',
    //     cell: ({ row }) => {
    //         const movie = row.original
    //         return (
    //             <div>
    //                 {movie.genres.map((genre) => (
    //                     <Badge key={genre.id} variant="default">
    //                         {genre.name}
    //                     </Badge>
    //                 ))}
    //             </div>
    //         )
    //     },
    // },
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
