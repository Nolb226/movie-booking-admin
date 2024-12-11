import { ContentType } from '@/constants/content-type'
import { END_POINTS } from '@/constants/endpoint'
import { get, put } from '@/lib/api'
import { Movie, MovieFormat, MovieGenre, UpdateMovieBody } from '@/model/movie'
import { env } from '../../env.mjs'
import { cookies } from 'next/headers'

export const getMovies = () => {
    return get<Movie[]>(END_POINTS.MOVIE.LIST)
}

export const getMovie = (id: string) => {
    return get<Movie>(END_POINTS.MOVIE.DETAIL(id))
}
export const getMovieGenres = () => {
    return get<MovieGenre[]>(END_POINTS.MOVIE.GENRES)
}

export const getMovieFormats = () => {
    return get<MovieFormat[]>(END_POINTS.MOVIE.FORMATS)
}

export const putMovie = async (id: string, data: FormData) => {
    const token = cookies().get('_session')?.value

    try {
        const res = await fetch(
            `${env.NEXT_PUBLIC_MOVIE_API_URL}${END_POINTS.MOVIE.DETAIL(id)}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Accept: 'application/json',
                },
                body: data,
            }
        )
        return res.status
    } catch (error) {
        console.log(error)
        console.log('error')
    }
}

export const postMovie = async (data: FormData) => {
    const token = cookies().get('_session')?.value
    try {
        const res = await fetch(
            `${env.NEXT_PUBLIC_MOVIE_API_URL}${END_POINTS.MOVIE.LIST}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            }
        )
        return res.status
    } catch (error) {
        console.log(error)
        console.log('error')
    }
}
