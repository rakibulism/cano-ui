"use client"

import * as React from "react"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Repeat,
  Activity,
  Download,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  Trophy,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

type Region = "global" | "namer" | "emea" | "apac"

const REGIONS: { id: Region; label: string }[] = [
  { id: "global", label: "Global" },
  { id: "namer", label: "North America" },
  { id: "emea", label: "EMEA" },
  { id: "apac", label: "APAC" },
]

const KPIS: Record<
  Region,
  { mrr: string; arr: string; churn: string; nrr: string; deltas: number[] }
> = {
  global: { mrr: "$482.6K", arr: "$5.79M", churn: "1.8%", nrr: "118%", deltas: [12.4, 14.1, -0.3, 6.2] },
  namer: { mrr: "$268.1K", arr: "$3.22M", churn: "1.5%", nrr: "124%", deltas: [9.8, 11.0, -0.5, 7.1] },
  emea: { mrr: "$142.9K", arr: "$1.71M", churn: "2.1%", nrr: "111%", deltas: [15.2, 16.8, 0.4, 4.9] },
  apac: { mrr: "$71.6K", arr: "$859K", churn: "2.4%", nrr: "109%", deltas: [21.6, 23.4, -0.2, 5.5] },
}

const TREND: Record<Region, number[]> = {
  global: [38, 44, 41, 52, 49, 58, 63, 61, 72, 78, 84, 92],
  namer: [22, 26, 25, 31, 29, 35, 38, 37, 43, 47, 51, 56],
  emea: [10, 12, 11, 14, 13, 16, 17, 16, 19, 21, 22, 25],
  apac: [4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 10, 12],
}

const MONTHS = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]

const REPS: Record<
  Region,
  { name: string; initials: string; deals: number; revenue: string; quota: number; trend: number }[]
> = {
  global: [
    { name: "Priya Natarajan", initials: "PN", deals: 41, revenue: "$612K", quota: 128, trend: 9 },
    { name: "Marcus Bell", initials: "MB", deals: 38, revenue: "$574K", quota: 119, trend: 4 },
    { name: "Sofia Lindqvist", initials: "SL", deals: 35, revenue: "$498K", quota: 104, trend: -2 },
    { name: "Daniel Okoye", initials: "DO", deals: 31, revenue: "$441K", quota: 92, trend: 6 },
    { name: "Hannah Cho", initials: "HC", deals: 28, revenue: "$389K", quota: 81, trend: 3 },
  ],
  namer: [
    { name: "Marcus Bell", initials: "MB", deals: 38, revenue: "$574K", quota: 119, trend: 4 },
    { name: "Hannah Cho", initials: "HC", deals: 28, revenue: "$389K", quota: 81, trend: 3 },
    { name: "Tyler Reyes", initials: "TR", deals: 24, revenue: "$331K", quota: 88, trend: 7 },
  ],
  emea: [
    { name: "Sofia Lindqvist", initials: "SL", deals: 35, revenue: "$498K", quota: 104, trend: -2 },
    { name: "Priya Natarajan", initials: "PN", deals: 22, revenue: "$318K", quota: 96, trend: 9 },
    { name: "Lukas Vogel", initials: "LV", deals: 19, revenue: "$262K", quota: 79, trend: 5 },
  ],
  apac: [
    { name: "Daniel Okoye", initials: "DO", deals: 18, revenue: "$241K", quota: 92, trend: 6 },
    { name: "Mei Tanaka", initials: "MT", deals: 14, revenue: "$188K", quota: 74, trend: 11 },
    { name: "Arjun Mehta", initials: "AM", deals: 11, revenue: "$142K", quota: 68, trend: 2 },
  ],
}

const CLOSED_WON = [
  { company: "Heliograph Labs", plan: "Enterprise", amount: "$84,000", rep: "Priya Natarajan", region: "EMEA", when: "2h ago" },
  { company: "Northwind Freight", plan: "Growth", amount: "$36,500", rep: "Marcus Bell", region: "North America", when: "5h ago" },
  { company: "Tideway Studios", plan: "Pro", amount: "$18,200", rep: "Hannah Cho", region: "North America", when: "Yesterday" },
  { company: "Kintsugi Health", plan: "Enterprise", amount: "$112,000", rep: "Sofia Lindqvist", region: "EMEA", when: "Yesterday" },
  { company: "Pacific Loom", plan: "Growth", amount: "$29,750", rep: "Mei Tanaka", region: "APAC", when: "2d ago" },
]

const KPI_META = [
  { key: "mrr", label: "Monthly Recurring Revenue", icon: DollarSign },
  { key: "arr", label: "Annual Recurring Revenue", icon: Repeat },
  { key: "churn", label: "Revenue Churn", icon: Activity },
  { key: "nrr", label: "Net Revenue Retention", icon: Users },
] as const

export default function SalesAnalytics() {
  const [region, setRegion] = React.useState<Region>("global")
  const kpi = KPIS[region]
  const trend = TREND[region]
  const reps = REPS[region]
  const maxTrend = Math.max(...trend)
  const kpiValues = [kpi.mrr, kpi.arr, kpi.churn, kpi.nrr]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Revflow Analytics</span>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <span className="hidden text-sm text-muted-foreground sm:block">Sales Performance</span>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Last 12 months
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sales Analytics</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Recurring revenue, retention, and pipeline performance across regions.
            </p>
          </div>
          <nav
            aria-label="Region filter"
            className="inline-flex flex-wrap gap-1 rounded-lg border bg-muted/30 p-1"
          >
            {REGIONS.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegion(r.id)}
                aria-pressed={region === r.id}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  region === r.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPI_META.map((meta, i) => {
            const Icon = meta.icon
            const delta = kpi.deltas[i]
            const isChurn = meta.key === "churn"
            const up = delta >= 0
            const good = isChurn ? !up : up
            return (
              <Card key={meta.key}>
                <CardHeader>
                  <CardDescription>{meta.label}</CardDescription>
                  <CardTitle className="text-3xl tabular-nums">{kpiValues[i]}</CardTitle>
                  <CardAction>
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1.5 text-sm">
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium tabular-nums",
                        good
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {up ? (
                        <TrendingUp className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <TrendingDown className="h-3 w-3" aria-hidden="true" />
                      )}
                      {up ? "+" : ""}
                      {delta}%
                    </span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Net new MRR by month (in $K)</CardDescription>
              <CardAction>
                <Badge variant="secondary" className="tabular-nums">
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  +{kpi.deltas[0]}% YoY
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-1.5 sm:gap-2">
                {trend.map((v, i) => {
                  const h = Math.round((v / maxTrend) * 100)
                  const isLast = i === trend.length - 1
                  return (
                    <div key={i} className="group flex flex-1 flex-col items-center justify-end gap-2">
                      <div
                        className="relative flex w-full items-end justify-center rounded-t-md transition-all"
                        style={{ height: `${h}%` }}
                      >
                        <div
                          className={cn(
                            "w-full rounded-t-md transition-colors",
                            isLast ? "bg-primary" : "bg-primary/25 group-hover:bg-primary/50"
                          )}
                          style={{ height: "100%" }}
                          aria-hidden="true"
                        />
                        <span className="pointer-events-none absolute -top-5 rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-background opacity-0 transition-opacity group-hover:opacity-100">
                          ${v}K
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{MONTHS[i]}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Closed-Won</CardTitle>
              <CardDescription>Latest deals across the org</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {CLOSED_WON.map((deal) => (
                <div key={deal.company} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{deal.company}</p>
                      <span className="shrink-0 text-sm font-semibold tabular-nums">{deal.amount}</span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="px-1.5 py-0 text-[10px]">
                        {deal.plan}
                      </Badge>
                      <span className="truncate">{deal.rep}</span>
                      <span className="ml-auto shrink-0">{deal.when}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" aria-hidden="true" />
              Top Reps Leaderboard
            </CardTitle>
            <CardDescription>
              Ranked by closed revenue in {REGIONS.find((r) => r.id === region)?.label}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Rep</TableHead>
                  <TableHead className="text-right">Deals</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="w-40">Quota attainment</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reps.map((rep, i) => (
                  <TableRow key={rep.name}>
                    <TableCell className="font-medium tabular-nums text-muted-foreground">
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">{rep.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{rep.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{rep.deals}</TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">
                      {rep.revenue}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={Math.min(rep.quota, 100)} className="h-2" />
                        <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                          {rep.quota}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
                          rep.trend >= 0 ? "text-primary" : "text-destructive"
                        )}
                      >
                        {rep.trend >= 0 ? (
                          <TrendingUp className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <TrendingDown className="h-3 w-3" aria-hidden="true" />
                        )}
                        {rep.trend >= 0 ? "+" : ""}
                        {rep.trend}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>Revflow Analytics — data shown is illustrative.</span>
          <span className="tabular-nums">Last synced: Jun 13, 2026 · 09:42 UTC</span>
        </div>
      </footer>
    </div>
  )
}
