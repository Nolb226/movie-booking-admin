import HallCard from '@/components/pages/(dashboard)/cinema/hall-card'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { getCinema } from '@/service/cinema'
import { ChevronRight, PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: string } }) {
    const cinema = await getCinema(params.id)
    return (
        <>
            <div className="header flex items-center justify-between border-b border-main pl-6 pr-8">
                <div className="flex items-center">
                    <div className="text-base">Cinema</div>
                    <ChevronRight className="size-3.5" />
                    <div className="text-base">{cinema.name}</div>
                </div>
            </div>
            <div className="mt-4 flex gap-12 pl-6 pr-8">
                <div className="flex h-fit w-3/4 flex-col gap-3">
                    <div className="shadow-sm' flex items-start justify-center rounded-lg border border-neutral-800 bg-neutral-950 p-12 text-neutral-50">
                        <Link
                            href={`/cinema/${cinema.id}/new`}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="size-fit rounded-md bg-slate-600 p-4">
                                <PlusIcon className="size-12" />
                            </div>
                            <span className="text-sm font-semibold">
                                Add New Hall
                            </span>
                        </Link>
                    </div>
                    {cinema.halls.map((hall) => (
                        <HallCard key={hall.id} hall={hall} />
                    ))}
                </div>
                <div className="flex w-1/4 flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                            <CardDescription>
                                Status of the cinema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select defaultValue={cinema.status.id + ''}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">
                                        <div className="flex items-center gap-2">
                                            <span>Opening</span>
                                            <div className="flex size-3 flex-shrink-0 items-center justify-center rounded-full bg-green-300">
                                                <div className="size-2 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="2">
                                        <div className="flex items-center gap-2">
                                            <span>Close</span>
                                            <div className="flex size-3 flex-shrink-0 items-center justify-center rounded-full bg-red-300">
                                                <div className="size-2 rounded-full bg-red-400"></div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Cinema Information</CardTitle>
                            <CardDescription>
                                Information about the cinema
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                {cinema.name}{' '}
                                <div className="size-1 rounded-full bg-gray-400" />
                                <span className="text-sm text-gray-500">
                                    {cinema.location}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}
