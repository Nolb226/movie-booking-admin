import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
    return (
        <div className="header border-main flex items-center justify-between border-b pl-6 pr-8">
            <div className="text-base">Movie</div>
            <div className="">
                <Button
                    className="border-main h-6 min-h-6 gap-1.5 rounded-[5px] border bg-[lch(12.3_3.7_272)] px-2 py-0 text-[lch(62.6%_1.35_272_/_1)]"
                    asChild
                >
                    <Link className="" href={'/cinema/add'}>
                        <Plus className="size-3" />
                        <span className="text-sm">Add Movie</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}
