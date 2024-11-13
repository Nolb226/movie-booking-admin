export type Movie = {
    id: string
    title: string
    description: string
    duration: string
    poster: string
    trailer: string
    releaseDate: string
    createdAt: string
    updatedAt: string
    status: MovieStatus
}
export type MovieStatus = {
    id: string
    description: string
    slug: string
}
