'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-neutral-950 transition-colors hover:bg-neutral-800 hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-800 data-[state=on]:text-neutral-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-transparent',
                outline:
                    'border border-neutral-800 bg-transparent hover:bg-neutral-800 hover:text-neutral-50',
            },
            size: {
                default: 'h-10 min-w-10 px-3',
                sm: 'h-9 min-w-9 px-2.5',
                lg: 'h-11 min-w-11 px-5',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

const Toggle = React.forwardRef<
    React.ElementRef<typeof TogglePrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
        VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
    />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
