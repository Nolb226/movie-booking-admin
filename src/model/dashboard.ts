export type ChartData = ChartDataMonth[]

export type ChartDataMonth = {
    month: string
    numberOfTickets: number
    revenues: number
    numberOfBill: number
}

export type TopMovie = {
    id: string
    name: string
    poster: string
    numberOfTickets: number
    revenues: number
}
