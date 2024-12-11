'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import { User } from '@/model/user'
import { getUserBill } from '@/service/user'
import { UserIcon } from 'lucide-react'
import useSWR from 'swr'
import BillTicket from './bill-ticket'
import { DataTable } from '@/components/data-table'
import { userBillColumns } from './user-bill-columns'

interface UserDetailProps {
    user: User
}

export default function UserDetail({ user }: UserDetailProps) {
    const { data: bills, isLoading } = useSWR(`${user.id}`, getUserBill)

    return (
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent className="overflow-y-scroll sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Các thông tin cơ bản</SheetTitle>
                    <SheetDescription>
                        Các thông tin cở bản của người dung {user.fullName}
                    </SheetDescription>
                    <div className="">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                    <UserIcon className="size-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="">{user.fullName}</div>
                        </div>
                        <div className="text-sm">
                            <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                                Basic information
                            </span>
                            <div className="flex flex-col gap-1.5">
                                <div className="">Email: {user.email}</div>
                                <div className="">
                                    Phone: {user.phoneNumber}
                                </div>
                                <div className="">
                                    Date of Birth: {user.dateOfBirth}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                                User's bill
                            </span>
                            <div className="flex flex-col items-center gap-2">
                                {/* {bills?.map((bill) => (
                                    <BillTicket
                                        // className=""
                                        key={bill.id}
                                        bill={bill}
                                    />
                                ))} */}
                                {bills?.length && (
                                    <DataTable
                                        data={bills}
                                        columns={userBillColumns}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
