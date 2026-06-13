"use client"

import * as React from "react"
import { BarChart3, Home, Inbox, Search, Settings } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/ui/sidebar"

const nav = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "Analytics", icon: BarChart3 },
  { title: "Settings", icon: Settings },
]

export default function SidebarDemo() {
  const [active, setActive] = React.useState("Home")

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border">
      <SidebarProvider className="min-h-[380px]">
        <Sidebar collapsible="none" className="border-r">
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1 text-sm font-semibold">
              <span className="flex size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                C
              </span>
              cano
            </div>
            <SidebarInput placeholder="Search…" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {nav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={active === item.title}
                        onClick={() => setActive(item.title)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="bg-background">
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-medium">{active}</span>
          </header>
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
            {active} content
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
