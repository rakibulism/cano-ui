"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Home,
  LayoutGrid,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const RANGES = ["7d", "30d", "90d"] as const
type Range = (typeof RANGES)[number]

const DATA: Record<Range, { kpis: [string, string, number][]; bars: number[] }> = {
  "7d": {
    kpis: [
      ["Revenue", "$12,840", 8.2],
      ["Visitors", "18.2k", 4.1],
      ["Signups", "642", -2.3],
      ["Churn", "1.4%", -0.6],
    ],
    bars: [40, 55, 48, 70, 62, 80, 75],
  },
  "30d": {
    kpis: [
      ["Revenue", "$58,210", 12.5],
      ["Visitors", "82.6k", 9.8],
      ["Signups", "3,104", 6.7],
      ["Churn", "1.7%", 0.3],
    ],
    bars: [35, 42, 50, 48, 62, 70, 66, 78, 72, 84, 80, 92],
  },
  "90d": {
    kpis: [
      ["Revenue", "$184,920", 21.0],
      ["Visitors", "248k", 15.2],
      ["Signups", "9,870", 11.4],
      ["Churn", "1.9%", -1.1],
    ],
    bars: [30, 38, 44, 52, 49, 60, 66, 63, 72, 78, 74, 86, 90, 88, 96],
  },
}

const pages = [
  ["/pricing", "24,510", "3.2%"],
  ["/", "19,240", "2.1%"],
  ["/docs/cli", "12,880", "5.6%"],
  ["/components", "9,310", "4.0%"],
  ["/blog/v2", "6,742", "6.8%"],
]

const nav = [
  ["Overview", Home, true],
  ["Audience", Users, false],
  ["Reports", BarChart3, false],
  ["Apps", LayoutGrid, false],
  ["Settings", Settings, false],
] as const

export default function AnalyticsDashboard() {
  const [range, setRange] = React.useState<Range>("30d")
  const { kpis, bars } = DATA[range]
  const max = Math.max(...bars)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r p-3 md:flex">
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold tracking-tight">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BarChart3 className="size-3.5" />
          </span>
          Pulse
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {nav.map(([label, Icon, active]) => (
            <button
              key={label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-md px-2 py-2">
          <Avatar className="size-7"><AvatarFallback className="text-xs">MP</AvatarFallback></Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">Mia Park</span>
            <span className="truncate text-xs text-muted-foreground">Pro plan</span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" className="pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Notifications"><Bell /></Button>
            <Avatar className="size-8"><AvatarFallback className="text-xs">MP</AvatarFallback></Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
              <p className="text-sm text-muted-foreground">Your store at a glance.</p>
            </div>
            <div className="isolate inline-flex">
              {RANGES.map((r, i) => (
                <Button
                  key={r}
                  variant={range === r ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRange(r)}
                  className={cn(
                    "rounded-none tabular-nums",
                    i === 0 && "rounded-l-md",
                    i === RANGES.length - 1 && "rounded-r-md",
                    i > 0 && "-ml-px"
                  )}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map(([label, value, delta]) => (
              <Card key={label}>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">{label}</div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
                  <div
                    className={cn(
                      "mt-1 flex items-center gap-1 text-xs font-medium",
                      delta >= 0 ? "text-emerald-600 dark:text-emerald-500" : "text-destructive"
                    )}
                  >
                    {delta >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                    {Math.abs(delta)}% vs prev.
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Traffic</CardTitle>
                <Tabs defaultValue="visitors" className="mt-2">
                  <TabsList>
                    <TabsTrigger value="visitors">Visitors</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="signups">Signups</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="flex h-48 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-primary/80 transition-all hover:bg-primary"
                      style={{ height: `${(h / max) * 100}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Top pages</CardTitle></CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6">Page</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="pr-6 text-right">Conv.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pages.map(([page, views, conv]) => (
                      <TableRow key={page}>
                        <TableCell className="pl-6 font-mono text-xs">{page}</TableCell>
                        <TableCell className="text-right tabular-nums">{views}</TableCell>
                        <TableCell className="pr-6 text-right tabular-nums text-muted-foreground">{conv}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader><CardTitle className="text-base">Recent activity</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              {[
                ["New Pro subscription", "Jonas Weber · 2m ago", "+$24"],
                ["Refund issued", "Acme Inc. · 1h ago", "-$96"],
                ["New Pro subscription", "Priya Sharma · 3h ago", "+$24"],
              ].map(([title, meta], i) => (
                <React.Fragment key={i}>
                  {i > 0 ? <Separator /> : null}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{title}</span>
                      <span className="text-xs text-muted-foreground">{meta}</span>
                    </div>
                    <Badge variant="secondary" className="tabular-nums">{title.includes("Refund") ? "-$96" : "+$24"}</Badge>
                  </div>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
