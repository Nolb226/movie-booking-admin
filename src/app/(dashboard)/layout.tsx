'use client'
import AppSidebar from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider className="flex min-h-screen gap-2">
            <TooltipProvider>
                <AppSidebar />
                <div className="m-3.5 flex-1 rounded border border-main bg-[lch(4.8_0.7_272)] md:ml-0">
                    {children}
                </div>
            </TooltipProvider>
        </SidebarProvider>
    )
}
