'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
// import { env } from '../../env.mjs'
export const deleteSession = () => {
    cookies().delete('_session')
    redirect('/login')
}

export const getSession = () => cookies().get('_session')?.value
