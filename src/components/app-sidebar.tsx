'use client'

import React from 'react'
import {
    Clapperboard,
    LayoutGrid,
    Projector,
    Receipt,
    UserSquare,
} from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from '@/components/ui/sidebar'
import useMediaQuery from '@/hooks/use-media-query'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from './ui/collapsible'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './logo'

function AppSidebar() {
    const pathname = usePathname()
    return (
        <>
            <Sidebar className="border-none bg-[lch(2.467%_0_272)]">
                <SidebarContent className="py-4">
                    <Logo />
                    <SidebarGroup>
                        <SidebarGroupLabel>Management</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        isActive={pathname === '/'}
                                        asChild
                                    >
                                        <Link href={'/'}>
                                            <LayoutGrid className="size-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        isActive={pathname === '/movie'}
                                        asChild
                                    >
                                        <Link href={'/movie'}>
                                            <Clapperboard className="size-4" />
                                            <span>Movie List</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        isActive={pathname === '/user'}
                                        asChild
                                    >
                                        <Link href={'/user'}>
                                            <UserSquare className="size-4" />
                                            <span>User List</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <Collapsible
                                    defaultOpen
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton asChild>
                                                <p className="cursor-pointer">
                                                    <Projector className="size-4" />
                                                    <span>Cinema</span>
                                                </p>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={
                                                            pathname ===
                                                            '/cinema'
                                                        }
                                                    >
                                                        <Link href={'/cinema'}>
                                                            List
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                                <SidebarMenuSubItem>
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={
                                                            pathname ===
                                                            '/showtime'
                                                        }
                                                    >
                                                        <Link
                                                            href={'/showtime'}
                                                        >
                                                            Shows
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        isActive={pathname === '/bill'}
                                        asChild
                                    >
                                        <Link href={'/bill'}>
                                            <Receipt className="size-4" />
                                            <span>Bill List</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </>
    )
}

export default AppSidebar
