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
import { Sidebar } from 'lucide-react'
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
import { Movie } from '@/model/movie'

interface CinemaShowProps {
    cinemas: Cinema[]
    movies: Movie[]
}

export default function CinemaShow({ cinemas, movies }: CinemaShowProps) {
    console.log(movies)

    const [date, setDate] = useState<Date | undefined>(undefined)
    const calendarRef = useRef<FullCalendar>(null)
    const [currentCinema, setCurrentCinema] = useState<string | null>(null)
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
                        <DialogContent className="h-[calc(100vh_-_200px)] max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>
                                    Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription className="flex">
                                    <div className="w-3/4"></div>
                                    <div className="w-1/4">
                                        {movies.map((movie) => {
                                            return movie.formats.map(
                                                (format) => {
                                                    return (
                                                        <div
                                                            key={`${movie.id}-${format.id}`}
                                                            className="flex gap-2 py-2"
                                                        >
                                                            <div className="">
                                                                {movie.name}
                                                            </div>
                                                            <div className="">
                                                                {format.caption}{' '}
                                                                {format.version}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        })}
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
