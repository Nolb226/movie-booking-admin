import { END_POINTS } from '@/constants/endpoint'
import { get } from '@/lib/api'
import { User } from '@/model/user'

export const getAllUser = () => get<User[]>(END_POINTS.USER.LIST)
