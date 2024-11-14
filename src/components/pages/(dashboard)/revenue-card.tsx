'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { currencyFormat } from '@/lib/utils'
import { ChartData } from '@/model/dashboard'
import { Line, LineChart } from 'recharts'

interface RevenueCardProps extends React.HTMLAttributes<typeof Card> {
    data: ChartData
}
const chartConfig: ChartConfig = {
    revenues: {
        label: 'Revenue',
        color: '#1873cc',
    },
}

export default function RevenueCard({ data }: RevenueCardProps) {
    const totals = data.reduce((acc, curr) => acc + curr.revenues, 0)
    return (
        <Card>
            <CardHeader>
                <span className="text-sm">Total revenues</span>
                <CardTitle>{currencyFormat(totals)}</CardTitle>
                <CardDescription>Revenues in Months</CardDescription>
                <CardContent>
                    <ChartContainer
                        className="min-h-[50px] w-full"
                        config={chartConfig}
                    >
                        <LineChart data={data}>
                            <Line
                                type="monotone"
                                dataKey="revenues"
                                stroke="#036A99"
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </CardHeader>
        </Card>
    )
}
