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
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Sidebar } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Calendar } from '@/components/ui/calendar'
import useSWR from 'swr'
import { getCinemaShows } from '@/service/cinema'
import { EventSourceInput } from '@fullcalendar/core/index.js'

interface CinemaShowProps {
    cinemas: Cinema[]
}

export default function CinemaShow({ cinemas }: CinemaShowProps) {
    const [isOpen, setIsOpen] = useState<'open' | 'close'>('close')
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
    const handleToggle = () => setIsOpen(isOpen === 'open' ? 'close' : 'open')
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
                <div className=""></div>
            </div>
            <div className="relative h-[calc(100vh_-_4.25rem)]">
                <div className="flex h-full flex-col">
                    <div className="">
                        <Button onClick={handleToggle}>Toggle</Button>
                    </div>
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
