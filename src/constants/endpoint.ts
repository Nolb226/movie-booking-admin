export const END_POINTS = {
    AUTH: {
        LOGIN: '/auth/login',
    },
    USER: {
        LIST: '/user/all',
        DETAIL: (id: string) => `/user/${id}`,
        BILL: (id: string) => `/bills/user/${id}/`,
    },
    CINEMA: {
        LIST: '/cinemas',
        CITY: '/cinemas/location',
        STATUS: '/cinemas/status',
        ADD_CINEMA: '/cinemas',
        DETAIL: (id: string) => `/cinemas/${id}`,
        HALL_DETAIL: (id: number) => `/cinemas/hall/${id}`,
        ADD_HALL: (id: string) => `/cinemas/${id}/hall`,
        SHOWS: (id: string) => `/cinemas/${id}/admin`,
        SHOWS_LIST: '/showtimes',
    },
    MOVIE: {
        LIST: '/movies',
        STATUS: '/movies/status',
        ADD_MOVIE: '/movies',
        DETAIL: (id: string) => `/movies/${id}`,
        GENRES: '/genres',
        FORMATS: '/formats',
    },
    DASHBOARD: {
        CHART: '/dashboard',
        TOP_MOVIES: '/dashboard/movie',
    },
    BILL: {
        LIST: '/bills',
    },
}
