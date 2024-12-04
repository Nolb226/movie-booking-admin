import { END_POINTS } from '@/constants/endpoint'
import { get } from '@/lib/api'
import { Movie, MovieFormat, MovieGenre } from '@/model/movie'

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
