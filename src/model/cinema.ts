import { Movie, MovieFormat } from './movie'

export type City = {
    id: string
    name: string
    slug: string
}

export type Cinema = {
    id: string
    address: string
    name: string
    hotline: string
    description: string
    location: string
}

export type CinemaDetails = Cinema & {
    status: CinemaStatus
    halls: Hall[]
}

export type Hall = {
    id: number
    name: string
    totalSeats: number
    status: HallStatus
}

export type HallStatus = {
    id: number
    name: string
}

export type SeatRow = {
    rowName: string
    seats: Seat[]
}

export type Seat = {
    id: number
    status: boolean
    rowIndex: number
    order: number
    isReserved: boolean
    seatType: SeatType
}

export type SeatType = {
    id: number
    name: string
    price: number
}

export type CinemaStatus = {
    id: string
    name: string
}

export type HallSeatResponse = Hall & {
    rows: SeatRow[]
}

export type Show = {
    id: string
    runningTime: number
    startDate: string
    startTime: string
    status: boolean
    format: MovieFormat
    movie: Movie
}

export type HallWithShow = Hall & { showtimes: Show[] }

export type ShowsByCinema = {
    id: string
    name: string
    address: string
    hotline: string
    description: string
    location: string
    halls: HallWithShow[]
}
