'use client'
import { CountryDropdown } from '@/components/country-dropdown'
import { DatePicker } from '@/components/date-picker'
import { MultiSelect } from '@/components/multi-select'
import { TimePicker } from '@/components/time-picker/time-picker'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MovieValidation } from '@/lib/validations/movie'
import { Movie, MovieFormat, MovieGenre } from '@/model/movie'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { format } from 'date-fns'
import React, { useMemo } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

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
    const formattedDuration = useMemo(() => {
        const now = new Date()
        const runningTime = movie.runningTime
        const hours = runningTime / 60
        const minutes = runningTime % 60
        now.setHours(hours, minutes)
        return now
    }, [movie.runningTime])

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

    const form = useForm({
        // resolver: zodResolver(MovieValidation),
        defaultValues: {
            name: movie.name,
            releaseDate: movie.releaseDate,
            endDate: movie.endDate,
            trailer: movie.trailer,
            status: movie.status.id.toString(),
            language: 'USA',
            duration: formattedDuration,
            genres: defaultGenres,
            formats: defaultFormats,
        },
    })

    const {
        append: appendGenres,
        remove: removeGenres,
        fields: fieldGenres,
    } = useFieldArray({
        control: form.control,
        name: 'genres',
    })

    const {
        append: appendFormats,
        remove: removeFormats,
        fields: fieldFormats,
    } = useFieldArray({
        control: form.control,
        name: 'formats',
    })

    return (
        <Form {...form}>
            <form
                className="flex h-full"
                onSubmit={form.handleSubmit((data) => {
                    console.log(form.formState.isDirty)

                    console.log(data)
                })}
            >
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
                                <Controller
                                    name="releaseDate"
                                    control={form.control}
                                    render={({ field }) => (
                                        <DatePicker
                                            defaultValue={
                                                new Date(field.value as string)
                                            }
                                            onSelect={(date) => {
                                                const value = format(
                                                    date,
                                                    'yyyy-MM-dd'
                                                )
                                                field.onChange(value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                                    End at:
                                </span>
                                <Controller
                                    name="endDate"
                                    control={form.control}
                                    render={({ field }) => (
                                        <DatePicker
                                            defaultValue={
                                                new Date(field.value as string)
                                            }
                                            onSelect={(date) => {
                                                const value = format(
                                                    date,
                                                    'yyyy-MM-dd'
                                                )
                                                field.onChange(value)
                                            }}
                                        />
                                    )}
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
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="rounded-md bg-neutral-950 p-2">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="rounded-none border-0 border-b-2 border-gray-400 bg-transparent text-2xl focus-visible:ring-0"
                                                // defaultValue={movie.name}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
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
                <div className="flex h-full w-1/6 min-w-[230px] flex-col gap-4 border-l border-main bg-[lch(8.3_1.867_272)] pb-6 pl-5 pr-6">
                    <div className="header flex items-center">
                        <div className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                            Properties
                        </div>
                    </div>
                    <div className="">
                        <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                            Status
                        </span>
                        <FormField
                            name="status"
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex items-center"
                                    defaultValue="1"
                                >
                                    <div className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem
                                                className="peer"
                                                hidden
                                                value="1"
                                                id="r1"
                                            />
                                        </FormControl>
                                        <Label
                                            className="peer-data-[state=checked]:*:bg-neutral-800"
                                            htmlFor="r1"
                                        >
                                            <Button
                                                className="text-xs"
                                                size={'sm'}
                                                variant={'outline'}
                                                asChild
                                            >
                                                <span>Showing now</span>
                                            </Button>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <FormControl>
                                            <RadioGroupItem
                                                className="peer"
                                                hidden
                                                value="2"
                                                id="r2"
                                            />
                                        </FormControl>

                                        <Label
                                            className="peer-data-[state=checked]:*:bg-neutral-800"
                                            htmlFor="r2"
                                        >
                                            <Button
                                                className="text-xs"
                                                size={'sm'}
                                                variant={'outline'}
                                                asChild
                                            >
                                                <span>Coming soon</span>
                                            </Button>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                            Country
                        </span>
                        <Controller
                            name="language"
                            control={form.control}
                            render={({ field }) => (
                                <CountryDropdown
                                    placeholder="Select country"
                                    defaultValue={field.value}
                                    onChange={(value) =>
                                        field.onChange(value.alpha3)
                                    }
                                    slim
                                />
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                            Duration
                        </span>
                        <Controller
                            name="duration"
                            render={({ field }) => (
                                <TimePicker
                                    date={field.value as Date}
                                    setDate={(date) => field.onChange(date)}
                                />
                            )}
                        />
                    </div>
                    <div className="">
                        <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                            Genres
                        </span>
                        <MultiSelect
                            options={genreOptions}
                            defaultValue={defaultGenres}
                            onSelect={appendGenres}
                            onUnselect={(unseletedOption) => {
                                const index = fieldGenres.findIndex(
                                    (genre) =>
                                        genre.value === unseletedOption.value
                                )
                                removeGenres(index)
                            }}
                        />
                    </div>
                    <div className="">
                        <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                            Format
                        </span>
                        <MultiSelect
                            options={formatOptions}
                            defaultValue={defaultFormats}
                            onSelect={appendFormats}
                            onUnselect={(unseletedOption) => {
                                const index = fieldFormats.findIndex(
                                    (format) =>
                                        format.value === unseletedOption.value
                                )
                                removeFormats(index)
                            }}
                        />
                    </div>
                    <div className="mt-auto">
                        <Button
                            disabled={!form.formState.isDirty}
                            className="w-full"
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}
