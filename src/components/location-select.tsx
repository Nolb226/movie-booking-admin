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
import { getCity } from '@/service/cinema'
import { SelectTriggerProps } from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

async function LocationSelect({ className, ...props }: SelectTriggerProps) {
    const city = await getCity()
    return (
        <Select defaultValue="1" name="location">
            <SelectTrigger {...props} className={cn('', className)}>
                <SelectValue placeholder="City" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>City</SelectLabel>
                    {city.map((city) => (
                        <SelectItem
                            className=""
                            key={city.slug}
                            value={city.id + ''}
                        >
                            {city.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default LocationSelect
