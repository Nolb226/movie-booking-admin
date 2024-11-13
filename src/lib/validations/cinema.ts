import { z } from 'zod'

export const AddCinemaSchema = z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }),
    address: z.string().trim().min(1, { message: 'Address cannot be empty' }),
    hotline: z.string().trim().min(1, { message: 'Hotline cannot be empty' }),
    location: z
        .string()
        .trim()
        .min(1, { message: "Please choose cinema's location" }),
    description: z
        .string()
        .trim()
        .min(1, { message: 'Description cannot be empty' }),
    status: z
        .string()
        .trim()
        .min(1, { message: "Please choose cinema's status" }),
})
