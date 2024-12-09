import { DataTable } from '@/components/data-table'
import { userColumns } from '@/components/pages/(dashboard)/user/columns'
import { getAllUser } from '@/service/user'
import React from 'react'

async function Page() {
    const users = await getAllUser()

    return (
        <>
            <div className="header flex items-center justify-between border-b border-main pl-6 pr-8">
                <div className="text-base">Users</div>
            </div>
            <DataTable columns={userColumns} data={users} />
        </>
    )
}

export default Page
