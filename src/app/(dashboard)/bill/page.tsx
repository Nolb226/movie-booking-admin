import { DataTable } from '@/components/data-table'
import { billColumns } from '@/components/pages/(dashboard)/bill/columns'
import { getBills } from '@/service/bill'

export default async function Page() {
    const bills = await getBills()
    console.log(bills)

    return <DataTable columns={billColumns} data={bills} />
}
