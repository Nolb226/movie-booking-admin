import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Hall } from '@/model/cinema'
import { getSeat } from '@/service/cinema'
import Seats from './seats'

interface HallCardProps extends React.HTMLAttributes<HTMLDivElement> {
    hall: Hall
}

export default async function HallCard({
    className,
    hall,
    ...props
}: HallCardProps) {
    const hallSeat = await getSeat(hall.id)
    return (
        <Card className={cn('', className)} {...props}>
            <CardHeader>
                <CardTitle>
                    {hall.name} -{' '}
                    <span className="text-sm">{hall.totalSeats} ghế</span>
                </CardTitle>
                <CardDescription>{hall.id}</CardDescription>
            </CardHeader>
            <CardContent>
                <Seats rows={hallSeat.rows} />
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}
