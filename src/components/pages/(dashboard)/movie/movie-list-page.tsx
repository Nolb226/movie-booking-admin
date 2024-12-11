'use client'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
    CalendarCheckIcon,
    CalendarClockIcon,
    LogsIcon,
    Plus,
} from 'lucide-react'
import Link from 'next/link'
import { movieColumns } from './columns'
import { Movie } from '@/model/movie'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useState } from 'react'

export default function MovieListPage({ movies }: { movies: Movie[] }) {
    console.log(movies)

    const [status, setStatus] = useState(0)
    const filteredMovies = movies.filter((movie) =>
        status === 0 ? true : movie.status.id === status
    )
    return (
        <>
            <div className="header flex items-center justify-between pl-6 pr-8">
                <div className="flex items-center gap-4">
                    <div className="text-base">Movie</div>
                    <ToggleGroup
                        value={status + ''}
                        onValueChange={(value) => setStatus(+value)}
                        defaultValue="0"
                        type="single"
                    >
                        <ToggleGroupItem
                            asChild
                            variant={null}
                            size={null}
                            value="0"
                        >
                            <Button
                                size={'sm'}
                                className="px-2 py-1"
                                variant={'outline'}
                            >
                                <LogsIcon className="size-4" />
                                All
                            </Button>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            asChild
                            variant={null}
                            size={null}
                            value="1"
                        >
                            <Button
                                size={'sm'}
                                className="px-2 py-1"
                                variant={'outline'}
                            >
                                <CalendarCheckIcon className="size-4" />
                                <span>Showing now</span>
                            </Button>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            asChild
                            variant={null}
                            size={null}
                            value="2"
                        >
                            <Button
                                size={'sm'}
                                className="px-2 py-1"
                                variant={'outline'}
                            >
                                <CalendarClockIcon className="size-4" />
                                <span>Coming soon</span>
                            </Button>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <div className="">
                    <Button
                        className="h-6 min-h-6 gap-1.5 rounded-[5px] border border-main bg-[lch(12.3_3.7_272)] px-2 py-0 text-[lch(62.6%_1.35_272_/_1)]"
                        asChild
                    >
                        <Link className="" href={'/movie/add'}>
                            <Plus className="size-3" />
                            <span>Add Movie</span>
                        </Link>
                    </Button>
                </div>
            </div>
            {/* <div className="flex items-center justify-between border-b border-main px-6 py-[7px]">
                <Button
                    variant={'ghost'}
                    className="flex items-center gap-2"
                    size={'sm'}
                >
                    <ListFilterIcon className="size-4" />
                    <span>Filter</span>
                </Button>
                <Button className="flex items-center gap-2" size={'sm'}>
                    <SlidersHorizontalIcon className="size-4" />
                    <span>Display</span>
                </Button>
            </div> */}
            <div className="">
                <DataTable columns={movieColumns} data={filteredMovies} />
            </div>
        </>
    )
}
