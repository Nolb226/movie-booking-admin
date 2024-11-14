import { END_POINTS } from '@/constants/endpoint'
import { get } from '@/lib/api'
import { ChartData } from '@/model/dashboard'

export const getDashboardChart = (year: number) => {
    return get<ChartData>(END_POINTS.DASHBOARD.CHART, {
        params: {
            year,
        },
    })
}
