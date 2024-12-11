export type Bill = {
    id: string
    createAt: string
    expireAt: string
    failureReason: string
    paymentAt: string
    paymentUrl?: string
    total: number
    status: BillStatus
    show: {
        id: string
        runningTime: number
        startDate: string
        startTime: string
        format: string
    }
    customer: {
        fullname: string
        email: string
    }
    movie: {
        id: string
        name: string
        subName: string
        poster: string
        horizontalPoster: string
    }
    cinema: {
        id: string
        name: string
        hallName: string
    }
    tickets: BillTicket[]
}

export type BillStatus = {
    id: number
    name: string
}

export type BillTicket = {
    id: string
    seatName: string
    type: string
    price: number
}
