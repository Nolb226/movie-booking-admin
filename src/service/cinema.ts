import { END_POINTS } from '@/constants/endpoint'
import { get, post } from '@/lib/api'
import {
    Cinema,
    CinemaDetails,
    CinemaStatus,
    City,
    HallSeatResponse,
} from '@/model/cinema'

export const getCinemaList = async () => {
    return get<Cinema[]>(END_POINTS.CINEMA.LIST)
}

export const getCinema = async (id: string) => {
    return get<CinemaDetails>(END_POINTS.CINEMA.DETAIL(id))
}

export const getCity = async () => {
    return get<City[]>(END_POINTS.CINEMA.CITY)
}

export const getCinemasStatuses = async () => {
    return get<CinemaStatus[]>(END_POINTS.CINEMA.STATUS)
}

export const getSeat = (id: number) => {
    return get<HallSeatResponse>(END_POINTS.CINEMA.HALL_DETAIL(id))
}

export const postHall = (id: string, body: any) => {
    return post(END_POINTS.CINEMA.ADD_HALL(id), {
        body: body,
    })
}
