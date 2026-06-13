"use client"

import * as React from "react"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  ArrowUpRight,
  Download,
  Filter,
  BarChart3,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

type RangeKey = "7d" | "30d" | "90d" | "12m"

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
  { key: "12m", label: "12 months" },
]

type Kpi = {
  label: string
  value: string
  delta: string
  up: boolean
  icon: React.ComponentType<{ className?: string }>
}

const KPI_DATA: Record<RangeKey, Kpi[]> = {
  "7d": [
    { label: "MRR", value: "$48.2k", delta: "+2.1%", up: true, icon: DollarSign },
    { label: "ARR", value: "$578k", delta: "+1.8%", up: true, icon: TrendingUp },
    { label: "Churn", value: "1.1%", delta: "-0.2%", up: true, icon: Activity },
    { label: "Expansion", value: "$3.4k", delta: "+4.0%", up: true, icon: ArrowUpRight },
  ],
  "30d": [
    { label: "MRR", value: "$49.6k", delta: "+5.4%", up: true, icon: DollarSign },
    { label: "ARR", value: "$595k", delta: "+5.4%", up: true, icon: TrendingUp },
    { label: "Churn", value: "1.4%", delta: "+0.3%", up: false, icon: Activity },
    { label: "Expansion", value: "$12.8k", delta: "+9.2%", up: true, icon: ArrowUpRight },
  ],
  "90d": [
    { label: "MRR", value: "$52.9k", delta: "+12.6%", up: true, icon: DollarSign },
    { label: "ARR", value: "$635k", delta: "+12.6%", up: true, icon: TrendingUp },
    { label: "Churn", value: "1.7%", delta: "+0.4%", up: false, icon: Activity },
    { label: "Expansion", value: "$41.2k", delta: "+18.4%", up: true, icon: ArrowUpRight },
  ],
  "12m": [
    { label: "MRR", value: "$58.4k", delta: "+34.1%", up: true, icon: DollarSign },
    { label: "ARR", value: "$701k", delta: "+34.1%", up: true, icon: TrendingUp },
    { label: "Churn", value: "2.0%", delta: "+0.6%", up: false, icon: Activity },
    { label: "Expansion", value: "$168k", delta: "+52.7%", up: true, icon: ArrowUpRight },
  ],
}

type Bar = { label: string; value: number }

const CHART_DATA: Record<RangeKey, Bar[]> = {
  "7d": [
    { label: "Mon", value: 6.2 },
    { label: "Tue", value: 6.8 },
    { label: "Wed", value: 6.4 },
    { label: "Thu", value: 7.1 },
    { label: "Fri", value: 7.6 },
    { label: "Sat", value: 5.9 },
    { label: "Sun", value: 5.5 },
  ],
  "30d": [
    { label: "W1", value: 11.2 },
    { label: "W2", value: 12.0 },
    { label: "W3", value: 12.8 },
    { label: "W4", value: 13.6 },
  ],
  "90d": [
    { label: "Jan", value: 41.0 },
    { label: "Feb", value: 44.2 },
    { label: "Mar", value: 47.5 },
  ],
  "12m": [
    { label: "Jul", value: 36 },
    { label: "Aug", value: 38 },
    { label: "Sep", value: 41 },
    { label: "Oct", value: 43 },
    { label: "Nov", value: 45 },
    { label: "Dec", value: 49 },
    { label: "Jan", value: 50 },
    { label: "Feb", value: 52 },
    { label: "Mar", value: 53 },
    { label: "Apr", value: 55 },
    { label: "May", value: 57 },
    { label: "Jun", value: 58 },
  ],
}

type Plan = {
  name: string
  tier: string
  mrr: string
  accounts: number
  share: number
  trend: string
  up: boolean
}

const PLAN_DATA: Record<RangeKey, Plan[]> = {
  "7d": [
    { name: "Scale", tier: "Enterprise", mrr: "$22.4k", accounts: 18, share: 46, trend: "+1.2%", up: true },
    { name: "Growth", tier: "Business", mrr: "$15.1k", accounts: 64, share: 31, trend: "+0.8%", up: true },
    { name: "Starter", tier: "Team", mrr: "$8.0k", accounts: 142, share: 17, trend: "-0.3%", up: false },
    { name: "Solo", tier: "Individual", mrr: "$2.7k", accounts: 310, share: 6, trend: "+0.1%", up: true },
  ],
  "30d": [
    { name: "Scale", tier: "Enterprise", mrr: "$23.6k", accounts: 19, share: 47, trend: "+4.4%", up: true },
    { name: "Growth", tier: "Business", mrr: "$15.4k", accounts: 66, share: 31, trend: "+3.1%", up: true },
    { name: "Starter", tier: "Team", mrr: "$7.9k", accounts: 138, share: 16, trend: "-1.0%", up: false },
    { name: "Solo", tier: "Individual", mrr: "$2.7k", accounts: 305, share: 6, trend: "+0.4%", up: true },
  ],
  "90d": [
    { name: "Scale", tier: "Enterprise", mrr: "$25.8k", accounts: 21, share: 49, trend: "+11.2%", up: true },
    { name: "Growth", tier: "Business", mrr: "$16.2k", accounts: 70, share: 31, trend: "+7.6%", up: true },
    { name: "Starter", tier: "Team", mrr: "$8.1k", accounts: 144, share: 15, trend: "+0.9%", up: true },
    { name: "Solo", tier: "Individual", mrr: "$2.8k", accounts: 318, share: 5, trend: "+1.1%", up: true },
  ],
  "12m": [
    { name: "Scale", tier: "Enterprise", mrr: "$29.4k", accounts: 26, share: 50, trend: "+38.1%", up: true },
    { name: "Growth", tier: "Business", mrr: "$17.8k", accounts: 78, share: 31, trend: "+22.4%", up: true },
    { name: "Starter", tier: "Team", mrr: "$8.4k", accounts: 151, share: 14, trend: "+6.2%", up: true },
    { name: "Solo", tier: "Individual", mrr: "$2.8k", accounts: 322, share: 5, trend: "+2.0%", up: true },
  ],
}

type Cohort = { month: string; size: string; cells: number[] }

const COHORTS: Cohort[] = [
  { month: "Jan", size: "210", cells: [100, 92, 86, 81, 78, 75] },
  { month: "Feb", size: "238", cells: [100, 90, 84, 80, 77] },
  { month: "Mar", size: "256", cells: [100, 93, 88, 84] },
  { month: "Apr", size: "274", cells: [100, 91, 85] },
  { month: "May", size: "299", cells: [100, 94] },
  { month: "Jun", size: "318", cells: [100] },
]

function retentionTone(v: number): string {
  if (v >= 95) return "bg-primary text-primary-foreground"
  if (v >= 88) return "bg-primary/70 text-primary-foreground"
  if (v >= 82) return "bg-primary/40 text-primary"
  if (v >= 78) return "bg-primary/20 text-primary"
  return "bg-muted text-muted-foreground"
}

export default function RevenueAnalytics() {
  const [range, setRange] = React.useState<RangeKey>("30d")

  const kpis = KPI_DATA[range]
  const bars = CHART_DATA[range]
  const plans = PLAN_DATA[range]
  const maxBar = Math.max(...bars.map((b) => b.value))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BarChart3 className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Lumen Revenue</span>
          </div>
          <nav className="ml-4 hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <span className="rounded-md px-3 py-1.5 font-medium text-foreground">Overview</span>
            <span className="rounded-md px-3 py-1.5 hover:text-foreground">Subscriptions</span>
            <span className="rounded-md px-3 py-1.5 hover:text-foreground">Forecasts</span>
            <span className="rounded-md px-3 py-1.5 hover:text-foreground">Reports</span>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <RefreshCw className="h-4 w-4" />
              Sync
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Revenue Analytics</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor recurring revenue, churn and expansion across your subscription base.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
              <Filter className="h-3.5 w-3.5" />
              Range
            </span>
            <div
              role="tablist"
              aria-label="Date range"
              className="inline-flex rounded-lg border bg-muted/30 p-1"
            >
              {RANGES.map((r) => (
                <button
                  key={r.key}
                  role="tab"
                  aria-selected={range === r.key}
                  onClick={() => setRange(r.key)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    range === r.key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r.key}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-medium uppercase tracking-wide">
                      {kpi.label}
                    </CardDescription>
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight tabular-nums">
                    {kpi.value}
                  </div>
                  <div
                    className={cn(
                      "mt-1 flex items-center gap-1 text-xs font-medium",
                      kpi.up ? "text-primary" : "text-destructive"
                    )}
                  >
                    {kpi.up ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {kpi.delta}
                    <span className="text-muted-foreground">vs prev.</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Monthly recurring revenue</CardTitle>
                  <CardDescription>Gross MRR by period, in thousands USD</CardDescription>
                </div>
                <Badge variant="secondary">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-2 sm:gap-3">
                {bars.map((b) => (
                  <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-all duration-300 hover:bg-primary"
                        style={{ height: `${Math.max(8, (b.value / maxBar) * 100)}%` }}
                        aria-label={`${b.label}: ${b.value}k`}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{b.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Peak {maxBar}k MRR over the selected window.
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net revenue mix</CardTitle>
              <CardDescription>Where growth is coming from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New business", value: 42 },
                { label: "Expansion", value: 31 },
                { label: "Reactivation", value: 14 },
                { label: "Contraction", value: 13 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium tabular-nums">{row.value}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
              <Separator />
              <p className="text-xs text-muted-foreground">
                Net revenue retention holds above 100% across all tiers this period.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Top plans by revenue</CardTitle>
              <CardDescription>Recurring revenue contribution per plan</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>MRR</TableHead>
                    <TableHead className="hidden sm:table-cell">Accounts</TableHead>
                    <TableHead>Share</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((p) => (
                    <TableRow key={p.name}>
                      <TableCell>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.tier}</div>
                      </TableCell>
                      <TableCell className="font-medium tabular-nums">{p.mrr}</TableCell>
                      <TableCell className="hidden tabular-nums sm:table-cell">
                        {p.accounts}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-muted sm:block">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${p.share}%` }}
                            />
                          </div>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {p.share}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-medium",
                            p.up ? "text-primary" : "text-destructive"
                          )}
                        >
                          {p.up ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {p.trend}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Cohort retention</CardTitle>
                  <CardDescription>% of accounts retained by month</CardDescription>
                </div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[320px] space-y-1.5">
                  <div className="flex items-center gap-1.5 pl-14 text-[11px] text-muted-foreground">
                    {["M0", "M1", "M2", "M3", "M4", "M5"].map((m) => (
                      <span key={m} className="flex-1 text-center">
                        {m}
                      </span>
                    ))}
                  </div>
                  {COHORTS.map((c) => (
                    <div key={c.month} className="flex items-center gap-1.5">
                      <div className="flex w-14 shrink-0 flex-col">
                        <span className="text-xs font-medium">{c.month}</span>
                        <span className="text-[10px] text-muted-foreground">{c.size}</span>
                      </div>
                      {Array.from({ length: 6 }).map((_, i) => {
                        const v = c.cells[i]
                        return (
                          <div
                            key={i}
                            className={cn(
                              "flex h-9 flex-1 items-center justify-center rounded text-[11px] font-medium tabular-nums",
                              v === undefined
                                ? "bg-muted/30"
                                : retentionTone(v)
                            )}
                          >
                            {v === undefined ? "" : `${v}`}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>Lower</span>
                <div className="flex flex-1 items-center gap-1">
                  <span className="h-2 flex-1 rounded bg-muted" />
                  <span className="h-2 flex-1 rounded bg-primary/20" />
                  <span className="h-2 flex-1 rounded bg-primary/40" />
                  <span className="h-2 flex-1 rounded bg-primary/70" />
                  <span className="h-2 flex-1 rounded bg-primary" />
                </div>
                <span>Higher</span>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>Lumen Revenue Analytics — data shown for the selected range.</span>
          <span>Last refreshed at close of period.</span>
        </div>
      </footer>
    </div>
  )
}
