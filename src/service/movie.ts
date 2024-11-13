import { END_POINTS } from '@/constants/endpoint'
import { get } from '@/lib/api'
import { Movie } from '@/model/movie'

export const getMovies = () => {
    return get<Movie[]>(END_POINTS.MOVIE.LIST)
}
