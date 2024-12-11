'use client'
import MonthPicker from '@/components/month-picker'
import RevenueCard from './revenue-card'
import DashboardChart from './dashboard-chart'
import Logo from '@/components/logo'
import { ChartData } from '@/model/dashboard'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getTopMovies } from '@/service/dashboard'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function DashboardPage({ data }: { data: ChartData }) {
    const [month, setMonth] = useState<Date>(new Date())
    const {
        data: movies,
        isLoading,
        mutate: mutateTopMovies,
    } = useSWR('dashboard', () =>
        getTopMovies(month.getMonth() + 1, month.getFullYear())
    )
    console.log(movies)

    useEffect(() => {
        mutateTopMovies()
    }, [month, mutateTopMovies])

    return (
        <>
            <div className="header flex items-center justify-between border-b border-main pl-6 pr-8">
                <div className="text-base">Dashboard</div>
            </div>
            <div className="flex divide-x divide-main">
                <div className="flex w-3/4 flex-col gap-4 px-8 pt-4">
                    <div className="from-65 flex min-h-[200px] items-center justify-center rounded-md border border-neutral-800 bg-gradient-to-b from-primary-700 to-[lch(4.8_0.7_272)]">
                        <Logo />
                    </div>

                    <div className="flex">
                        <div className="flex w-2/3 flex-col gap-6">
                            <p className="text-lg font-semibold">ALL</p>
                            <DashboardChart
                                className="max-w-[700px]"
                                data={data}
                            />
                        </div>
                        <div className="w-1/3">
                            <RevenueCard data={data} />
                        </div>
                    </div>
                </div>
                <div className="w-1/4 px-3 py-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="px-2" variant={'outline'}>
                                {format(month, 'MM yyyy')}{' '}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <MonthPicker
                                currentMonth={month}
                                onMonthChange={(date) => {
                                    setMonth(() => date)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <div className="flex flex-col gap-2">
                        {isLoading ? (
                            <div className="">Loading...</div>
                        ) : (
                            movies!.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="flex gap-2 px-2 py-1"
                                >
                                    <img
                                        src={movie.poster}
                                        className="size-24 rounded-md object-cover"
                                        alt=""
                                    />
                                    <div className="flex flex-col gap-2">
                                        <div className="text-xs font-semibold">
                                            {movie.name} -{' '}
                                            {movie.numberOfTickets}
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-sm text-highlight-500">
                                                {formatCurrency(movie.revenues)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
