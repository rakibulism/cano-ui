"use client"

import {
  BarChart3,
  CreditCard,
  Home,
  KeyRound,
  Rocket,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AppShell,
  AppShellContent,
  AppShellMain,
  AppShellMobileTrigger,
  AppShellNav,
  AppShellNavGroup,
  AppShellNavItem,
  AppShellSidebar,
  AppShellSidebarFooter,
  AppShellSidebarHeader,
  AppShellSidebarToggle,
  AppShellTopbar,
  useAppShell,
} from "@/registry/ui/app-shell"

const stats = [
  {
    label: "Monthly revenue",
    value: "$48,210",
    delta: "+8.1% from last month",
  },
  {
    label: "Active customers",
    value: "1,284",
    delta: "+121 this month",
  },
  {
    label: "Deployments",
    value: "312",
    delta: "98.2% success rate",
  },
]

const chartBars = [40, 64, 52, 80, 68, 96, 88, 72, 104, 90, 112, 84]

function Brand() {
  const { collapsed } = useAppShell()

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
        a
      </div>
      {!collapsed && (
        <span className="text-sm font-semibold tracking-tight">acme</span>
      )}
    </div>
  )
}

function UserMenu() {
  const { collapsed } = useAppShell()

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2 rounded-md p-1.5 text-left transition-colors hover:bg-accent",
        collapsed && "justify-center"
      )}
    >
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
        MC
      </div>
      {!collapsed && (
        <div className="min-w-0 leading-tight">
          <div className="truncate text-xs font-medium">Maya Chen</div>
          <div className="truncate text-xs text-muted-foreground">
            maya@acme.com
          </div>
        </div>
      )}
    </button>
  )
}

export default function AppShellDemo() {
  return (
    <div className="h-[600px] w-full overflow-hidden rounded-lg border">
      <AppShell>
        <AppShellSidebar>
          <AppShellSidebarHeader>
            <Brand />
          </AppShellSidebarHeader>
          <AppShellNav aria-label="Main">
            <AppShellNavGroup label="Platform">
              <AppShellNavItem href="#" icon={Home} active>
                Overview
              </AppShellNavItem>
              <AppShellNavItem href="#" icon={BarChart3}>
                Analytics
              </AppShellNavItem>
              <AppShellNavItem href="#" icon={Users}>
                Customers
              </AppShellNavItem>
              <AppShellNavItem href="#" icon={Rocket}>
                Deployments
              </AppShellNavItem>
            </AppShellNavGroup>
            <AppShellNavGroup label="Settings">
              <AppShellNavItem href="#" icon={Settings}>
                General
              </AppShellNavItem>
              <AppShellNavItem href="#" icon={CreditCard}>
                Billing
              </AppShellNavItem>
              <AppShellNavItem href="#" icon={KeyRound}>
                API keys
              </AppShellNavItem>
            </AppShellNavGroup>
          </AppShellNav>
          <AppShellSidebarFooter>
            <UserMenu />
          </AppShellSidebarFooter>
        </AppShellSidebar>
        <AppShellMain>
          <AppShellTopbar>
            <AppShellMobileTrigger />
            <AppShellSidebarToggle />
            <h1 className="text-sm font-medium">Overview</h1>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="sm">
                Feedback
              </Button>
              <Button size="sm">New project</Button>
            </div>
          </AppShellTopbar>
          <AppShellContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                  <Card key={stat.label}>
                    <CardHeader>
                      <CardDescription>{stat.label}</CardDescription>
                      <CardTitle className="text-2xl tabular-nums">
                        {stat.value}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        {stat.delta}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Revenue over time</CardTitle>
                  <CardDescription>
                    Last 30 days across all workspaces.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-32 items-end gap-2">
                    {chartBars.map((height, index) => (
                      <Skeleton
                        key={index}
                        className="w-full rounded-sm"
                        style={{ height }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </AppShellContent>
        </AppShellMain>
      </AppShell>
    </div>
  )
}
