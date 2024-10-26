import AppSidebar from '@/components/app-sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen gap-2">
            <AppSidebar />
            <div className="border-main m-2 flex-1 rounded border bg-[lch(4.8_0.7_272)] md:ml-0">
                {children}
            </div>
        </main>
    )
}
