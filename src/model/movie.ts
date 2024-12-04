export type Movie = {
    id: string
    name: string
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
