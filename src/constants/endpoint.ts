export const END_POINTS = {
    CINEMA: {
        LIST: '/cinemas/admin',
        CITY: '/cinemas/location',
        STATUS: '/cinemas/status',
        ADD_CINEMA: '/cinemas',
        DETAIL: (id: string) => `/cinemas/${id}`,
        HALL_DETAIL: (id: number) => `/cinemas/hall/${id}`,
    },
    MOVIE: {
        LIST: '/movies',
        STATUS: '/movies/status',
        ADD_MOVIE: '/movies',
        DETAIL: (id: string) => `/movies/${id}`,
    },
}
