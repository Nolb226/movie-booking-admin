import { z } from 'zod'

export const MovieValidation = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    description: z.string().min(1, { message: 'Description cannot be empty' }),
    duration: z.string().min(1, { message: 'Duration cannot be empty' }),
    releaseDate: z.string().min(1, { message: 'Release date cannot be empty' }),
    director: z.string().min(1, { message: 'Director cannot be empty' }),
    trailer: z.string().min(1, { message: 'Trailer cannot be empty' }),
    poster: z.string().min(1, { message: 'Poster cannot be empty' }),
    horizontalPoster: z
        .string()
        .min(1, { message: 'Horizontal poster cannot be empty' }),
    // genres: z.array(z.string()).min(1, { message: 'Genres cannot be empty' }),
    // formats: z.array(z.string()).min(1, { message: 'Formats cannot be empty' }),
    language: z.string().min(1, { message: 'Language cannot be empty' }),
    producer: z.string().min(1, { message: 'Producer cannot be empty' }),
    ageRestriction: z
        .string()
        .min(1, { message: 'Age restriction cannot be empty' }),
    endDate: z.string().min(1, { message: 'End date cannot be empty' }),
    status: z.string().min(1, { message: 'Status cannot be empty' }),
})
