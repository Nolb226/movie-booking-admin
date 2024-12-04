import { getAllUser } from '@/service/user'
import React from 'react'

async function Page() {
    const users = await getAllUser()
    console.log(users)

    return <div>Page</div>
}

export default Page
