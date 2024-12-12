'use client'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Cinema, HallWithShow, ShowsByCinema } from '@/model/cinema'
import { useEffect, useMemo, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Minus, Plus, Sidebar } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Calendar } from '@/components/ui/calendar'
import useSWR from 'swr'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { getCinemaShows } from '@/service/cinema'
import { Movie, MovieFormat, MovieShow } from '@/model/movie'
import { DatePicker } from '@/components/date-picker'
import { DataTable } from '@/components/data-table'
import { NumberInput } from '@/components/number-input'
import { autoFillShow } from '@/actions/cinema'
import { toast } from 'sonner'

interface CinemaShowProps {
    cinemas: Cinema[]
    movies: Movie[]
}

export default function CinemaShow({ cinemas, movies }: CinemaShowProps) {
    const [date, setDate] = useState<Date>(new Date())
    const calendarRef = useRef<FullCalendar>(null)
    const [currentCinema, setCurrentCinema] = useState<string | null>(null)
    const [selectedMovies, setSelectedMovies] = useState<MovieShow[]>([])
    const [currentHall, setCurrentHall] = useState<HallWithShow | null>(null)
    const {
        data: cinema,
        isLoading,
        mutate,
    } = useSWR(currentCinema ?? null, getCinemaShows, {
        shouldRetryOnError: false,
    })
    const toggleSidebar = () => {
        const calendarApi = calendarRef.current?.getApi()

        setTimeout(() => calendarApi?.updateSize(), 200)
    }

    const onSelectDate = (date: Date | undefined) => {
        setDate(date)
        const calendarApi = calendarRef.current?.getApi()
        calendarApi?.gotoDate(date!)
    }

    const events = useMemo(() => {
        return currentHall?.showtimes.map((show) => {
            return {
                title: show.movie.name,
                start: `${show.startDate}T${show.startTime}`,
            }
        })
    }, [currentHall?.showtimes])

    const handleSelectMovie = (movie: Movie, format: MovieFormat) => {
        if (
            selectedMovies.find(
                (selectedMovie) => selectedMovie.id === movie.id
            )
        )
            return

        {
            setSelectedMovies([
                ...selectedMovies,
                { id: movie.id, name: movie.name, format, priority: 0 },
            ])
        }
    }
    const handleUnselectMovie = (movie: MovieShow) => {
        setSelectedMovies(
            selectedMovies.filter((selectedMovie) => {
                return selectedMovie.id !== movie.id
            })
        )
    }

    return (
        <>
            <div className="header flex items-center justify-between border-b border-main pl-6 pr-8">
                <div className="flex items-center gap-2">
                    <SidebarTrigger onClick={toggleSidebar} className="size-5">
                        <Sidebar />
                    </SidebarTrigger>
                    <span>Shows</span>
                </div>
                <div className="">
                    <Dialog>
                        <DialogTrigger>Open</DialogTrigger>
                        <DialogContent className="h-[calc(100vh_-_200px)] max-w-screen-xl">
                            <DialogHeader>
                                <DialogTitle>
                                    <div className="flex gap-2">
                                        <p>Fill show automatically</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-nowrap text-sm font-medium">
                                                Fill for date:
                                            </p>
                                            <DatePicker
                                                defaultValue={date}
                                                onSelect={(date) =>
                                                    setDate(date)
                                                }
                                            />
                                            <Select
                                                onValueChange={(value) => {
                                                    setCurrentCinema(value)
                                                    mutate()
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select cinema" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Cinema
                                                        </SelectLabel>
                                                        {cinemas.map(
                                                            (cinema) => {
                                                                return (
                                                                    <SelectItem
                                                                        key={
                                                                            cinema.id
                                                                        }
                                                                        value={
                                                                            cinema.id
                                                                        }
                                                                    >
                                                                        {
                                                                            cinema.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            }
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </DialogTitle>
                                <DialogDescription className="flex h-full gap-6">
                                    <div className="w-3/4">
                                        <div className="flex h-full flex-col gap-3 rounded-md bg-black p-2">
                                            {selectedMovies.map((movie) => {
                                                return (
                                                    <div
                                                        key={movie.id}
                                                        className="flex items-center justify-between border-b border-main pb-1"
                                                    >
                                                        <div className="text-sm">
                                                            {movie.name}
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <div className="flex items-center gap-1">
                                                                <p>Priority</p>
                                                                <NumberInput
                                                                    value={
                                                                        movie.priority
                                                                    }
                                                                    onChange={(
                                                                        value
                                                                    ) => {
                                                                        setSelectedMovies(
                                                                            selectedMovies.map(
                                                                                (
                                                                                    selectedMovie
                                                                                ) => {
                                                                                    if (
                                                                                        selectedMovie.id ===
                                                                                        movie.id
                                                                                    ) {
                                                                                        return {
                                                                                            ...selectedMovie,
                                                                                            priority:
                                                                                                value,
                                                                                        }
                                                                                    }
                                                                                    return selectedMovie
                                                                                }
                                                                            )
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="text-sm">
                                                                    {
                                                                        movie
                                                                            .format
                                                                            .caption
                                                                    }{' '}
                                                                    {
                                                                        movie
                                                                            .format
                                                                            .version
                                                                    }
                                                                </div>
                                                                <Button
                                                                    size={
                                                                        'icon'
                                                                    }
                                                                    variant={
                                                                        'outline'
                                                                    }
                                                                    className="size-6"
                                                                    onClick={() =>
                                                                        handleUnselectMovie(
                                                                            movie
                                                                        )
                                                                    }
                                                                >
                                                                    <Minus className="size-3" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex w-1/4 flex-col">
                                        {movies.map((movie) => {
                                            return movie.formats.map(
                                                (format) => {
                                                    return (
                                                        <div
                                                            key={`${movie.id}-${format.id}`}
                                                            className="flex items-center gap-2 py-2"
                                                        >
                                                            <div className="">
                                                                {movie.name}
                                                            </div>
                                                            <div className="ml-auto flex items-center gap-2">
                                                                <div className="">
                                                                    {
                                                                        format.caption
                                                                    }{' '}
                                                                    {
                                                                        format.version
                                                                    }
                                                                </div>
                                                                <Button
                                                                    onClick={() =>
                                                                        handleSelectMovie(
                                                                            movie,
                                                                            format
                                                                        )
                                                                    }
                                                                    size={
                                                                        'icon'
                                                                    }
                                                                    variant={
                                                                        'outline'
                                                                    }
                                                                    className="ml-auto size-6"
                                                                >
                                                                    <Plus className="size-3.5" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        })}
                                        <div className="mt-auto">
                                            <Button
                                                onClick={() => {
                                                    toast.promise(
                                                        autoFillShow({
                                                            cinemaId:
                                                                currentCinema!,
                                                            movies: selectedMovies.map(
                                                                (movie) => {
                                                                    return {
                                                                        id: movie.id,
                                                                        formatId:
                                                                            movie
                                                                                .format
                                                                                .id,
                                                                        priority:
                                                                            movie.priority,
                                                                    }
                                                                }
                                                            ),
                                                            date: date!,
                                                        }),
                                                        {
                                                            loading:
                                                                'Filling...',
                                                            success: 'Filled',
                                                            error: 'Failed',
                                                        }
                                                    )

                                                    setSelectedMovies([])
                                                    // autoFillShow({
                                                    //     cinemaId:
                                                    //         currentCinema!,
                                                    //     movies: selectedMovies.map(
                                                    //         (movie) => {
                                                    //             return {
                                                    //                 id: movie.id,
                                                    //                 formatId:
                                                    //                     movie
                                                    //                         .format
                                                    //                         .id +
                                                    //                     '',
                                                    //                 priority:
                                                    //                     movie.priority,
                                                    //             }
                                                    //         }
                                                    //     ),
                                                    //     date: date!,
                                                    // })
                                                }}
                                                className="w-full"
                                            >
                                                Fill Now
                                            </Button>
                                        </div>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="relative h-[calc(100vh_-_4.25rem)]">
                <div className="flex h-full flex-col">
                    <div className="flex h-full justify-between">
                        <div className="w-1/6">
                            <Select
                                onValueChange={(value) => {
                                    setCurrentCinema(value)
                                    mutate()
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select cinema" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Cinema</SelectLabel>
                                        {cinemas.map((cinema) => {
                                            return (
                                                <SelectItem
                                                    key={cinema.id}
                                                    value={cinema.id}
                                                >
                                                    {cinema.name}
                                                </SelectItem>
                                            )
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {cinema?.halls && (
                                <Select
                                    onValueChange={(value) => {
                                        setCurrentHall(
                                            cinema?.halls.find(
                                                (hall) =>
                                                    hall.id === parseInt(value)
                                            ) ?? null
                                        )
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select cinema" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Cinema</SelectLabel>
                                            {cinema?.halls.map((hall) => {
                                                return (
                                                    <SelectItem
                                                        key={hall.id}
                                                        value={hall.id + ''}
                                                    >
                                                        {hall.name}
                                                    </SelectItem>
                                                )
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={onSelectDate}
                            />
                        </div>
                        <div className="flex-1">
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[timeGridPlugin]}
                                initialView="timeGridWeek"
                                locale={'vi'}
                                slotLaneClassNames={'!h-10 !border-solid'}
                                slotLabelClassNames={'!text-xs !text-[#c4c7c5]'}
                                handleWindowResize
                                height={'100%'}
                                events={events}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
