import { Skeleton } from '@/components/ui/skeleton'

export default function Page() {
    return (
        <div className="flex h-full">
            <div className="flex flex-1 flex-col">
                <div className="header flex h-fit items-center justify-between border-b border-main pl-6 pr-8">
                    <div className="flex items-center gap-4">
                        <div className="text-base">Movie</div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                                Release on:
                            </span>
                            <Skeleton className="w-50 h-6" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                                End at:
                            </span>
                            <Skeleton className="w-50 h-6" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-full w-1/6 flex-col gap-4 border-l border-main bg-[lch(8.3_1.867_272)] pl-5 pr-6">
                <div className="header flex items-center">
                    <div className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Properties
                    </div>
                </div>
                <div className="">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Status
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Country
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Duration
                    </span>
                </div>
                <div className="">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Genres
                    </span>
                </div>
                <div className="">
                    <span className="text-sm font-medium text-[lch(63.975_1.933_272)]">
                        Format
                    </span>
                </div>
            </div>
        </div>
    )
}
