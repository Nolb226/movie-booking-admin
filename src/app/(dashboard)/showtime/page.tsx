import CinemaShow from '@/components/pages/(dashboard)/showtime/cinema-show'
import { getCinemaList } from '@/service/cinema'

export default async function Page() {
    const cinemas = await getCinemaList()
    return <CinemaShow cinemas={cinemas} />
}
