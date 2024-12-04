import MovieListPage from '@/components/pages/(dashboard)/movie/movie-list-page'
import { getMovies } from '@/service/movie'

export default async function Page() {
    const movies = await getMovies()

    return <MovieListPage movies={movies} />
}
