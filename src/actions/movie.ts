'use server'
import { objectToFormData } from '@/lib/utils'
import { UpdateMovieBody } from '@/model/movie'
import { putMovie } from '@/service/movie'
import { redirect } from 'next/navigation'

export const updateMovie = async (id: string, data: FormData) => {
    let statusResponse
    try {
        // const formData = objectToFormData(data)
        console.log(data)

        const status = await putMovie(id, data)
        statusResponse = status
    } catch (error) {
        console.log(error)
    }
    if (statusResponse === 200) redirect('/movie')
}

export const addMovie = async (data: UpdateMovieBody) => {
    let statusResponse
    try {
        const formData = objectToFormData(data)
        const status = await putMovie('', formData)
        statusResponse = status
    } catch (error) {
        console.log(error)
    }
    if (statusResponse === 200) redirect('/movie')
}
