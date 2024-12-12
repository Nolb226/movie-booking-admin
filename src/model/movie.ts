export type Movie = {
    id: string
    name: string
    subName: string
    description: string
    runningTime: number
    poster: string
    trailer: string
    releaseDate: string
    createdAt: string
    updatedAt: string
    status: MovieStatus
    genres: MovieGenre[]
    endDate: string
    language: string
    producer: string
    director: string
    horizontalPoster: string
    ageRestriction: number
    formats: MovieFormat[]
}
export type MovieStatus = {
    id: number
    description: string
    slug: string
}

export type MovieGenre = {
    id: number
    name: string
}

export type MovieFormat = {
    id: number
    caption: string
    version: string
}

export type UpdateMovieBody = {
    name: string
    subName: string
    description: string
    runningTime: number
    director: string
    producer: string
    trailer: string
    poster: string
    horizontalPoster: string
    releaseDate: string
    endDate: string
    ageRestriction: number
    performers: string
    genres: number[]
    formats: number[]
    status: number
}

export type MovieShow = {
    id: string
    format: MovieFormat
    name: string
    priority: number
}
