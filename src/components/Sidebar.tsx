"use client"
import { cn } from '@/lib/utils'
import { Book, LayoutDashboard, School, StickyNoteIcon, Video } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {

    // Get current page path 
    const pathName = usePathname();

    // Menu items 
    const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-sky-500"

        },
        {
            label: "Notes",
            icon: StickyNoteIcon,
            href: "/notes",
            color: "text-sky-500"

        },
        {
            label: "Videos",
            icon: Video,
            href: "/videos",
            color: "text-sky-500"

        },
        {
            label: "Class",
            icon: School,
            href: "/class",
            color: "text-sky-500"
        },
        {
            label: "Subject",
            icon: Book,
            href: "/subject",
            color: "text-sky-500"

        },
        {
            label: "Term",
            icon: LayoutDashboard,
            href: "/term",
            color: "text-sky-500"
        },
    ]
    return (
        // Vertical flex container
        <div className="space-y-4 py-4 md:flex flex-col h-[100vh] bg-[#111827] text-white md:w-72 flex-shrink-0">

            {/* // Menu links */}
            <div className="px-5 py-2 flex-1">
                <div className='space-y-3'>
                    {routes.map(route => (
                        // Conditional styling for active route
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition",
                                // Active styles
                                pathName === route.href ? "text-black bg-[#7CF5B2]" : "text-white",
                                pathName === route.href ? "" : "hover:text-white hover:bg-white/10"
                            )}
                        >
                            {/* // Display label and icon */}
                            <div className="flex items-center flex-1">
                                <route.icon
                                    className={cn(
                                        "h-5 w-5 mr-3 text-white",
                                        pathName === route.href ? "text-black" : "text-white"
                                    )}
                                />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Sidebar