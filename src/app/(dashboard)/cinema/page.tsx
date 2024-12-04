import CinemaStatusSelect from '@/components/cinema-status-select'
import { DataTable } from '@/components/data-table'
import LocationSelect from '@/components/location-select'
import AddCinemaForm from '@/components/pages/(dashboard)/cinema/add-cinema'

import { cinemaColumns } from '@/components/pages/(dashboard)/cinema/columns'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { getCinemaList } from '@/service/cinema'
import { ListFilterIcon, Plus } from 'lucide-react'

export default async function Page() {
    const data = await getCinemaList()

    return (
        <>
            <div className="header flex items-center justify-between border-b border-main pl-6 pr-8">
                <div className="text-base">Cinema</div>
                <div className="">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="h-6 min-h-6 gap-1 rounded-[5px] border border-main bg-[lch(12.3_3.7_272)] px-2 py-1 text-[lch(62.6%_1.35_272_/_1)]">
                                <Plus className="size-3" />
                                <span className="text-sm">Add cinema</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Add New Cinema</SheetTitle>
                                <SheetDescription>
                                    Write the information of the cinema you want
                                    to add
                                </SheetDescription>
                            </SheetHeader>
                            <AddCinemaForm>
                                <Label className="flex items-center">
                                    <span className="w-1/3 font-semibold text-black">
                                        City
                                    </span>
                                    <LocationSelect className="w-2/3" />
                                </Label>
                                <Label className="flex items-center">
                                    <span className="w-1/3 font-semibold text-black">
                                        Status
                                    </span>
                                    <CinemaStatusSelect
                                        name="status"
                                        className="w-2/3"
                                    />
                                </Label>
                            </AddCinemaForm>
                            <SheetFooter className="mt-4">
                                <SheetClose asChild>
                                    <Button variant={'secondary'}>
                                        Cancel
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild></SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className="flex items-center justify-between border-b border-main px-6 py-[7px]">
                <Button
                    variant={'ghost'}
                    className="flex h-fit items-center gap-2 px-2 py-1"
                    size={'sm'}
                >
                    <ListFilterIcon className="size-4" />
                    <span>Filter</span>
                </Button>
            </div>
            <div className="">
                <DataTable columns={cinemaColumns} data={data} />
            </div>
        </>
    )
}
