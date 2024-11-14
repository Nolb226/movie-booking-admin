'use client'

import { Line, LineChart, XAxis, YAxis } from 'recharts'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import React from 'react'
import { ChartData } from '@/model/dashboard'
import { cn } from '@/lib/utils'

const chartConfig: ChartConfig = {
    numberOfTickets: {
        label: 'Tickets',
        color: '#0c3a66',
    },
    revenues: {
        label: 'Revenue',
        color: '#036A99',
    },
    numberOfBill: {
        label: 'Bills',
        color: '#0c3a66',
    },
}

interface DashboardChartProps extends React.HTMLAttributes<HTMLDivElement> {
    data: ChartData
}

export default function DashboardChart({
    data,
    className,
    ...props
}: DashboardChartProps) {
    return (
        <div className={cn('', className)} {...props}>
            <ChartContainer
                className="min-h-[200px] w-full"
                config={chartConfig}
            >
                <LineChart data={data}>
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <YAxis />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent labelKey="numberOfTickets" />
                        }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                        type="monotone"
                        dataKey="numberOfTickets"
                        stroke="var(--color-numberOfTickets)"
                    />
                    <Line
                        type="monotone"
                        dataKey="revenues"
                        stroke="var(--color-revenues)"
                    />
                    <Line
                        type="monotone"
                        dataKey="numberOfBill"
                        stroke="var(--color-numberOfBill)"
                    />
                </LineChart>
            </ChartContainer>
        </div>
    )
}
