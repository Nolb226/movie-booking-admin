'use server'

import { LoginSchema } from '@/lib/validations/common'
import { login } from '@/service/common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type LoginFormState =
    | {
          message?: string
          fields?: {
              email: string
              password: string
          }
      }
    | undefined

export const loginAction = async (
    state: LoginFormState,
    FormData: FormData
) => {
    const formData = Object.fromEntries(FormData)
    const safeParse = LoginSchema.safeParse(formData)
    if (!safeParse.success) {
        return {
            fields: safeParse.data,
        }
    }

    try {
        console.log(safeParse.data)

        const { token } = await login(safeParse.data)
        if (!token) {
            return {
                message: 'Invalid credentials',
                fields: safeParse.data,
            }
        }

        cookies().set('_session', token, {
            httpOnly: true,
            secure: true,
            path: '/',
        })
    } catch (error) {
        console.log(error)

        return {
            message: 'Username or password is incorrect',
            fields: safeParse.data,
        }
    }
    redirect('/')
}
