import AddMovie from '@/components/pages/(dashboard)/movie/add-movie'
import { getMovieFormats, getMovieGenres } from '@/service/movie'

export default async function Page() {
    const genres = await getMovieGenres()
    const format = await getMovieFormats()
    return <AddMovie formats={format} genres={genres} />
}
