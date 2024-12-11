import { END_POINTS } from '@/constants/endpoint'
import { get } from '@/lib/api'
import { Bill } from '@/model/bill'
import { User } from '@/model/user'

export const getAllUser = () => get<User[]>(END_POINTS.USER.LIST)
export const getUser = (id: string) => get<User>(END_POINTS.USER.DETAIL(id))
export const getUserBill = (id: string) => get<Bill[]>(END_POINTS.USER.BILL(id))
