import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

function Logo({ className }: LogoProps) {
    return (
        <div className={cn('w-fit', className)}>
            <Link href={'/'}>
                <img src={'/images/logo.png'} alt="" />
                <p className="block text-right text-lg font-medium text-blue-500">
                    Admin{' '}
                    <span className="text-sm text-slate-500">by pwer-dev</span>
                </p>
            </Link>
        </div>
    )
}

export default Logo
