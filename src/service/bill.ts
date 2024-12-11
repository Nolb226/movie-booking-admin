import { END_POINTS } from '@/constants/endpoint'
import { get } from '@/lib/api'
import { Bill } from '@/model/bill'

export const getBills = () => {
    return get<Bill[]>(END_POINTS.BILL.LIST)
}
