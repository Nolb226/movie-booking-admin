'use server'

import { AddCinemaSchema } from '@/lib/validations/cinema'
import { postHall } from '@/service/cinema'

// import { post } from '@/lib/api'

export type AddCinemaFormState =
    | {
          errors?: {
              name?: string[]
              hotline?: string[]
              location?: string[]
              status?: string[]
              description?: string[]
              address?: string[]
          }
          message?: string
      }
    | undefined

export const addCinema = (state: AddCinemaFormState, formData: FormData) => {
    const rawData = {
        name: formData.get('name'),
        location: formData.get('location'),
        status: formData.get('status'),
        address: formData.get('address'),
        hotline: formData.get('hotline'),
        description: formData.get('description'),
    }

    const validatedFields = AddCinemaSchema.safeParse(rawData)

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    console.log(rawData)
}

export const addHallAction = async (cinemaId: string, objData: any) => {
    try {
        postHall(cinemaId, objData)
    } catch (error) {
        console.log(error)
    }
}
