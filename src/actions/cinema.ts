'use server'

import { AddCinemaSchema } from '@/lib/validations/cinema'
import { AddCinemaBody, FillShowBody } from '@/model/cinema'
import { postCinema, postCinemaShows, postHall } from '@/service/cinema'
import { redirect } from 'next/navigation'

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

export const addCinema = async (
    state: AddCinemaFormState,
    formData: FormData
) => {
    const rawData = {
        name: formData.get('name'),
        location: formData.get('location'),
        status: formData.get('status')!,
        address: formData.get('address')!,
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
    let id
    try {
        const data = await postCinema({
            ...validatedFields.data,
            status: +validatedFields.data.status,
            location: +validatedFields.data.location,
        })
        id = data
    } catch (error) {
        console.log(error)
    }

    if (id) redirect(`/cinema/${id}`)
}

export const addHallAction = async (cinemaId: string, objData: any) => {
    try {
        postHall(cinemaId, objData)
    } catch (error) {
        console.log(error)
    }
    redirect(`/cinema/${cinemaId}`)
}

export const autoFillShow = async (data: FillShowBody) => {
    try {
        const test = await postCinemaShows(data.cinemaId, data)
        console.log(test)
    } catch (error) {
        console.log(error)
    }
}
