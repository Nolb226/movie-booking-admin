import MovieDetail from '@/components/pages/(dashboard)/movie/movie-detail'
import { getMovie, getMovieFormats, getMovieGenres } from '@/service/movie'

export default async function Page({ params }: { params: { id: string } }) {
    const movie = await getMovie(params.id)
    const genres = await getMovieGenres()
    const format = await getMovieFormats()

    return <MovieDetail movie={movie} genres={genres} formats={format} />
}
