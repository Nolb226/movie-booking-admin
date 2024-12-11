import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { SelectTriggerProps } from '@radix-ui/react-select'
import { getCinemasStatuses } from '@/service/cinema'
import { cn } from '@/lib/utils'

async function CinemaStatusSelect({ className, ...props }: SelectTriggerProps) {
    const statuses = await getCinemasStatuses()
    return (
        <Select defaultValue="1" name="status">
            <SelectTrigger {...props} className={cn('', className)}>
                <SelectValue placeholder="Choose a status" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statuses?.map((status) => (
                        <SelectItem
                            className=""
                            key={status.id}
                            value={status.id + ''}
                        >
                            {status.name}
                        </SelectItem>
                    )) || <EmptySelect />}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function EmptySelect() {
    return <div className="">Something went wrong</div>
}

export default CinemaStatusSelect
