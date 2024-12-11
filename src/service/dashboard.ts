import { END_POINTS } from '@/constants/endpoint'
import { get } from '@/lib/api'
import { ChartData, TopMovie } from '@/model/dashboard'

export const getDashboardChart = (year: number) => {
    return get<ChartData>(END_POINTS.DASHBOARD.CHART, {
        params: {
            year,
        },
    })
}

export const getTopMovies = (month: number, year: number) => {
    return get<TopMovie[]>(END_POINTS.DASHBOARD.TOP_MOVIES, {
        params: {
            month,
            year,
        },
    })
}
