"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import React from "react"

export function NavMainOthers({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: React.ComponentType<any>
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {

      const pathname = usePathname()

    return (
        // <SidebarGroup style={{ marginTop: "-16px" }}>
        //     {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
        //     <SidebarMenu>
        //         {items.map(item => (
        //             <SidebarMenuItem key={item.title}>
        //                 {/* <SidebarMenuButton asChild tooltip={item.title}>
        //                     <a href={item.url} className="flex items-center gap-2">
        //                         {item.icon && <item.icon className="w-4 h-4" />}
        //                         <span>{item.title}</span>
        //                     </a>
        //                 </SidebarMenuButton> */}
        //                 <SidebarMenuButton
        //                     onClick={() => window.location.href = item.url}
        //                     tooltip={item.title}
        //                     className="flex items-center gap-2"
        //                 >
        //                     {item.icon && <item.icon className="w-4 h-4" />}
        //                     <span>{item.title}</span>
        //                 </SidebarMenuButton>

        //             </SidebarMenuItem>
        //         ))}
        //     </SidebarMenu>
        // </SidebarGroup>
          <SidebarGroup style={{ marginTop: "-16px" }}>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  "flex items-center gap-2 transition-all",
                  isActive && "bg-[var(--sidebar-teal)] text-[var(--sidebar-accent-foreground)]"
                )}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
    )
}
