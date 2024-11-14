import Logo from '@/components/logo'
import DashboardChart from '@/components/pages/(dashboard)/dashboard-chart'
import RevenueCard from '@/components/pages/(dashboard)/revenue-card'
import { getDashboardChart } from '@/service/dashboard'

export default async function Page() {
    const data = await getDashboardChart(2024)
    console.log(data)

    return (
        <>
            <div className="header flex items-center justify-between border-b border-main pl-6 pr-8">
                <div className="text-base">Dashboard</div>
            </div>
            <div className="flex divide-x divide-main">
                <div className="flex w-3/4 flex-col gap-4 px-8 pt-4">
                    <div className="from-65 flex min-h-[200px] items-center justify-center rounded-md border border-neutral-800 bg-gradient-to-b from-primary-700 to-[lch(4.8_0.7_272)]">
                        <Logo />
                    </div>

                    <div className="flex">
                        <div className="flex w-2/3 flex-col gap-6">
                            <p className="text-lg font-semibold">ALL</p>
                            <DashboardChart
                                className="max-w-[700px]"
                                data={data}
                            />
                        </div>
                        <div className="w-1/3">
                            <RevenueCard data={data} />
                        </div>
                    </div>
                </div>
                <div className="w-1/4"></div>
            </div>
        </>
    )
}
