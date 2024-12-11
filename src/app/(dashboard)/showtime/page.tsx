import CinemaShow from '@/components/pages/(dashboard)/showtime/cinema-show'
import { getCinemaList } from '@/service/cinema'
import { getMovies } from '@/service/movie'

export default async function Page() {
    const cinemas = await getCinemaList()
    const movies = await getMovies()
    return <CinemaShow movies={movies} cinemas={cinemas} />
}
