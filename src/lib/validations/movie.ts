import { z } from 'zod'

export const MovieValidation = z.object({
    name: z.string().min(1, { message: 'Title cannot be empty' }),
    description: z.string().min(1, { message: 'Description cannot be empty' }),
    releaseDate: z.string().min(1, { message: 'Release date cannot be empty' }),
    director: z.string().min(1, { message: 'Director cannot be empty' }),
    trailer: z.string().min(1, { message: 'Trailer cannot be empty' }),
    poster: z.any().nullable(),
    horizontalPoster: z.any().nullable(),
    genres: z
        .object({
            value: z.string().min(1, { message: 'Format ID cannot be empty' }),
            label: z
                .string()
                .min(1, { message: 'Format name cannot be empty' }),
        })
        .array()
        .nonempty({ message: 'At least one genre must be selected' }),
    formats: z
        .object({
            value: z.string().min(1, { message: 'Format ID cannot be empty' }),
            label: z
                .string()
                .min(1, { message: 'Format name cannot be empty' }),
        })
        .array()
        .nonempty({ message: 'At least one format must be selected' }),
    language: z.string().min(1, { message: 'Language cannot be empty' }),
    producer: z.string().min(1, { message: 'Producer cannot be empty' }),
    runningTime: z.date(),
    ageRestriction: z
        .number()
        .min(1, { message: 'Age restriction cannot be empty' }),
    endDate: z.string().min(1, { message: 'End date cannot be empty' }),
    status: z.string().min(1, { message: 'Status cannot be empty' }),
    subName: z.string().min(1, { message: 'SubName cannot be empty' }),
})
