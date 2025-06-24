"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarData } from "@/lib/sidebar-data"

export function Discovery5Sidebar() {
  return (
    <Sidebar className="rounded-4xl bg-surface shadow-lg mt-15 ml-4 overflow-hidden h-[calc(100vh-5rem)] [&>[data-sidebar=sidebar]]:rounded-4xl [&>[data-sidebar=sidebar]]:bg-surface">
      <SidebarContent className="px-2 py-3 rounded-4xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-outline-variant/30 hover:scrollbar-thumb-outline-variant/50">
        {sidebarData.map((section, sectionIndex) => (
          <React.Fragment key={section.id}>
            <SidebarGroup className="pb-1">
              <SidebarGroupLabel className="px-0 py-1.5 text-sm font-semibold text-on-surface">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "w-full justify-start gap-3 !px-2 !py-3 !h-auto rounded-full",
                          "hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:rounded-full transition-all duration-200",
                          "text-on-surface-variant hover:text-on-surface",
                          "cursor-pointer"
                        )}
                      >
                        <a href={item.href || "#"} className="flex items-center gap-3 w-full hover:[&>svg]:text-purple-700 dark:hover:[&>svg]:text-purple-400">
                          <item.icon
                            variant="Outline"
                            size={20}
                            className="shrink-0 text-on-surface-variant transition-colors duration-200"
                          />
                          <span className="flex-1 text-left text-sm font-medium">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Add separator between sections, but not after the last one */}
            {sectionIndex < sidebarData.length - 1 && (
              <Separator className="my-1.5 mx-3 bg-outline-variant" />
            )}
          </React.Fragment>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
