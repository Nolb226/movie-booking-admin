import DashboardPage from '@/components/pages/(dashboard)/dashboard-page'
import { getDashboardChart } from '@/service/dashboard'

export default async function Page() {
    const data = await getDashboardChart(2024)
    console.log(data)

    return <DashboardPage data={data} />
}
