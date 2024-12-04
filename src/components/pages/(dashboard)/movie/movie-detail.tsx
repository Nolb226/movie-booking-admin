'use client'
import { CountryDropdown } from '@/components/country-dropdown'
import { DatePicker } from '@/components/date-picker'
import { MultiSelect } from '@/components/multi-select'
import { TimePicker } from '@/components/time-picker/time-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Movie, MovieFormat, MovieGenre } from '@/model/movie'
import React, { useMemo } from 'react'

interface MovieDetailProps {
    movie: Movie
    genres: MovieGenre[]
    formats: MovieFormat[]
}

export default function MovieDetail({
    formats,
    genres,
    movie,
}: MovieDetailProps) {
    console.log(movie)

    const formattedDuration = useMemo(() => {
        const now = new Date()
        const runningTime = movie.runningTime
        const hours = runningTime / 60
        const minutes = runningTime % 60
        now.setHours(hours, minutes)
        return now
    }, [movie.runningTime])
    const [duration, setDuration] = React.useState<Date>(formattedDuration)

    const genreOptions = useMemo(
        () =>
            genres.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
            })),
        [genres]
    )
    const formatOptions = useMemo(
        () =>
            formats.map((format) => ({
                value: format.id.toString(),
                label: `${format.version} - ${format.caption}`,
            })),
        [formats]
    )

    const defaultGenres = useMemo(
        () =>
            movie.genres.map((genre) => ({
                value: genre.id.toString(),
                label: genre.name,
            })),
        [movie.genres]
    )

    const defaultFormats = useMemo(
        () =>
            movie.formats.map((format) => ({
                value: format.id.toString(),
                label: `${format.version} - ${format.caption}`,
            })),
        [movie.formats]
    )
    return (
        <div className="flex h-full">
            <div className="flex flex-1 flex-col">
                <div className="header flex h-fit items-center justify-between border-b border-main pl-6 pr-8">
                    <div className="flex items-center gap-4">
                        <div className="text-base">Movie</div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                                Release on:
                            </span>
                            <DatePicker
                                defaultValue={new Date(movie.releaseDate)}
                                onSelect={console.log}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                                End at:
                            </span>
                            <DatePicker
                                defaultValue={new Date(movie.endDate)}
                                onSelect={console.log}
                            />
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex w-[calc(100%_-7.5rem)] flex-col gap-6 rounded-md px-4 py-8">
                    <div className="flex max-h-[330px] gap-6 *:rounded-lg">
                        <div className="relative aspect-[2/3] max-w-[220px] bg-neutral-950 p-2">
                            <span className="absolute left-2 top-2 rounded-br-md border-b border-r border-zinc-800 bg-neutral-950 pb-2 pr-2 text-xs font-semibold text-[lch(63.975_1.933_272)]">
                                Poster
                            </span>
                            <img
                                src={movie.poster}
                                className="h-full w-full rounded-md border border-zinc-800"
                                alt=""
                            />
                        </div>
                        <div className="relative h-full max-w-[574px] bg-neutral-950 p-2">
                            <span className="absolute left-2 top-2 rounded-br-md border-b border-r border-zinc-800 bg-neutral-950 pb-2 pr-2 text-xs font-semibold text-[lch(63.975_1.933_272)]">
                                Banner
                            </span>
                            <img
                                className="aspect-video h-full w-full rounded-md border border-zinc-800 bg-neutral-950 object-cover"
                                src={movie.horizontalPoster}
                                alt=""
                            />
                        </div>
                        <div className="relative bg-neutral-950 p-2">
                            <div className="absolute left-2 right-2 top-2 flex items-center gap-2 border-b border-zinc-800 bg-neutral-950 pb-2 pr-2 text-xs font-semibold text-[lch(63.975_1.933_272)]">
                                <span>Trailer</span>
                                <Input
                                    value={movie.trailer}
                                    className="h-fit py-0.5 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <iframe
                                className="aspect-video h-full w-full rounded-md border border-zinc-800 bg-neutral-950 object-cover"
                                src="https://www.youtube.com/embed/XC3ftnZ1WYk"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="rounded-md bg-neutral-950 p-2">
                        <Input
                            className="rounded-none border-0 border-b-2 border-gray-400 bg-transparent text-2xl focus-visible:ring-0"
                            defaultValue={movie.name}
                        />
                    </div>
                    {/* <div className="max-h-64 w-fit">
                        <img
                            src={movie.poster}
                            className="aspect-video h-full w-full object-contain"
                        />
                    </div> */}
                </div>
            </div>
            <div className="flex h-full w-1/6 flex-col gap-4 border-l border-main bg-[lch(8.3_1.867_272)] pl-5 pr-6">
                <div className="header flex items-center">
                    <div className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Properties
                    </div>
                </div>
                <div className="">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Status
                    </span>
                    <ToggleGroup
                        className="mt-2"
                        defaultValue={movie.status.id.toString()}
                        type="single"
                    >
                        <ToggleGroupItem
                            asChild
                            variant={null}
                            size={null}
                            value="1"
                        >
                            <Button
                                className="text-xs"
                                size={'sm'}
                                variant={'outline'}
                            >
                                {/* <CalendarCheckIcon className="size-4" /> */}
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
                                className="text-xs"
                                size={'sm'}
                                variant={'outline'}
                            >
                                {/* <CalendarClockIcon className="size-4" /> */}
                                <span>Coming soon</span>
                            </Button>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Country
                    </span>
                    <CountryDropdown
                        placeholder="Select country"
                        defaultValue="USA"
                        // defaultValue={movie.language}
                        //   onChange={() => void}
                        slim
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Duration
                    </span>
                    <TimePicker
                        date={duration}
                        setDate={(date) => setDuration(date!)}
                    />
                </div>
                <div className="">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Genres
                    </span>
                    <MultiSelect
                        options={genreOptions}
                        defaultValue={defaultGenres}
                    />
                </div>
                <div className="">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Format
                    </span>
                    <MultiSelect
                        options={formatOptions}
                        defaultValue={defaultFormats}
                    />
                </div>
            </div>
        </div>
    )
}
