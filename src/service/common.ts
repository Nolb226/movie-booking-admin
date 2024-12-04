import { END_POINTS } from '@/constants/endpoint'
import { post } from '@/lib/api'
import { LoginResponse } from '@/model/common'

export const login = ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    return post<LoginResponse>(END_POINTS.AUTH.LOGIN, {
        body: {
            email,
            password,
        },
    })
}
