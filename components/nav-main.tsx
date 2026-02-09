"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
    const pathname = usePathname()
  return (
    // <SidebarGroup>
    //   <SidebarGroupLabel>Platform</SidebarGroupLabel>
    //   <SidebarMenu>
    //     {items.map((item) => (
    //       <Collapsible
    //         key={item.title}
    //         asChild
    //         defaultOpen={item.isActive}
    //         className="group/collapsible"
    //       >
    //         <SidebarMenuItem>
    //           <CollapsibleTrigger asChild>
    //             <SidebarMenuButton tooltip={item.title}>
    //               {item.icon && <item.icon />}
    //               <span>{item.title}</span>
    //               <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
    //             </SidebarMenuButton>
    //           </CollapsibleTrigger>
    //           <CollapsibleContent>
    //             <SidebarMenuSub>
    //               {item.items?.map((subItem) => (
    //                 <SidebarMenuSubItem key={subItem.title}>
    //                   <SidebarMenuSubButton asChild>
    //                     <a href={subItem.url}>
    //                       <span>{subItem.title}</span>
    //                     </a>
    //                   </SidebarMenuSubButton>
    //                 </SidebarMenuSubItem>
    //               ))}
    //             </SidebarMenuSub>
    //           </CollapsibleContent>
    //         </SidebarMenuItem>
    //       </Collapsible>
    //     ))}
    //   </SidebarMenu>
    // </SidebarGroup>
     <SidebarGroup>
      <SidebarGroupLabel>HRMS</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isMainActive =
            pathname.startsWith(item.url) ||
            item.items?.some((sub) => pathname.startsWith(sub.url))

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isMainActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    className={cn(
                      "flex items-center gap-2 transition-all",
                      isMainActive && "bg-[var(--sidebar-teal)] text-[var(--sidebar-accent-foreground)]"
                    )}
                  >
                    <Link href={item.url}>
                      {item.icon && <item.icon className="w-4 h-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items?.length ? (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                "transition-all",
                                isSubActive && "bg-[var(--sidebar-teal)] text-[var(--sidebar-accent-foreground)]"
                              )}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
