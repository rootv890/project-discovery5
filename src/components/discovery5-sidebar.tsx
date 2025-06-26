"use client"

import * as React from "react"
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
    <Sidebar className="w-[231px] h-[870px] rounded-[28px] bg-surface-container-low flex flex-col ml-6 mt-[94px]">
      <SidebarContent className="p-3">
        {sidebarData.map((section, sectionIndex) => (
          <React.Fragment key={section.id}>
            <SidebarGroup>
              <SidebarGroupLabel className="w-[207px] h-[60px] rounded-full flex items-center gap-2.5 py-[18px] px-4 text-on-surface-variant">
                {section.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="w-[207px]">
                  {section.items.map((item) => (
                    <SidebarMenuItem key={item.id} className="w-[207px] h-[56px]">
                      <SidebarMenuButton asChild>
                        <a href={item.href || "#"} className="w-[207px] h-full flex items-center py-4 pl-4 pr-6 gap-3 bg-surface-container-low text-on-surface-variant hover:bg-secondary-container hover:rounded-full transition-all duration-200">
                          <item.icon
                            variant="Outline"
                            size={20}
                          />
                          <span>
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {sectionIndex < sidebarData.length - 1 && (
              <Separator />
            )}
          </React.Fragment>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
