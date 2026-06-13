"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  DollarSign,
  Download,
  Megaphone,
  MousePointerClick,
  Search,
  Sparkles,
  Target,
  TrendingUp,
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
import { Badge } from "@/components/ui/badge"
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

type Kpi = {
  label: string
  value: string
  delta: number
  caption: string
  icon: React.ComponentType<{ className?: string }>
}

const KPIS: Kpi[] = [
  { label: "Total spend", value: "$148,920", delta: 8.4, caption: "vs. prior 30 days", icon: DollarSign },
  { label: "Attributed revenue", value: "$612,540", delta: 14.2, caption: "blended last-click", icon: TrendingUp },
  { label: "Blended ROAS", value: "4.11x", delta: 5.6, caption: "return on ad spend", icon: Target },
  { label: "Conversions", value: "9,284", delta: -2.1, caption: "purchases + signups", icon: MousePointerClick },
]

type Channel = { name: string; spendShare: number; cpa: string; tone: "primary" | "muted" }

const CHANNELS: Channel[] = [
  { name: "Paid Search", spendShare: 88, cpa: "$34.10", tone: "primary" },
  { name: "Paid Social", spendShare: 72, cpa: "$41.80", tone: "primary" },
  { name: "Display", spendShare: 46, cpa: "$58.20", tone: "muted" },
  { name: "Email", spendShare: 31, cpa: "$9.40", tone: "muted" },
  { name: "Affiliate", spendShare: 22, cpa: "$27.65", tone: "muted" },
]

const FILTERS = ["All channels", "Paid Search", "Paid Social", "Display", "Email"] as const
type Filter = (typeof FILTERS)[number]

type Campaign = {
  name: string
  channel: Exclude<Filter, "All channels">
  spend: string
  revenue: string
  roas: number
  status: "Active" | "Paused" | "Scheduled"
}

const CAMPAIGNS: Campaign[] = [
  { name: "Spring Brand — Search", channel: "Paid Search", spend: "$28,400", revenue: "$142,900", roas: 5.03, status: "Active" },
  { name: "Retargeting — Meta", channel: "Paid Social", spend: "$19,200", revenue: "$71,640", roas: 3.73, status: "Active" },
  { name: "Lookalike Prospecting", channel: "Paid Social", spend: "$15,860", revenue: "$44,300", roas: 2.79, status: "Paused" },
  { name: "Generic Keywords", channel: "Paid Search", spend: "$22,110", revenue: "$118,250", roas: 5.35, status: "Active" },
  { name: "Programmatic Display", channel: "Display", spend: "$12,400", revenue: "$28,900", roas: 2.33, status: "Active" },
  { name: "Win-back Newsletter", channel: "Email", spend: "$2,140", revenue: "$31,820", roas: 14.87, status: "Active" },
  { name: "Holiday Teaser", channel: "Display", spend: "$8,300", revenue: "$0", roas: 0, status: "Scheduled" },
]

type MonthBar = { month: string; spend: number; revenue: number }

const MONTHLY: MonthBar[] = [
  { month: "Jan", spend: 38, revenue: 121 },
  { month: "Feb", spend: 44, revenue: 148 },
  { month: "Mar", spend: 41, revenue: 162 },
  { month: "Apr", spend: 52, revenue: 198 },
  { month: "May", spend: 49, revenue: 214 },
  { month: "Jun", spend: 58, revenue: 246 },
]

const CHART_MAX = 260

function Delta({ value }: { value: number }) {
  const up = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
        up ? "text-primary" : "text-destructive"
      )}
    >
      {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
      {Math.abs(value)}%
    </span>
  )
}

const STATUS_VARIANT: Record<Campaign["status"], "default" | "secondary" | "outline"> = {
  Active: "default",
  Paused: "secondary",
  Scheduled: "outline",
}

export default function MarketingAnalytics() {
  const [filter, setFilter] = React.useState<Filter>("All channels")

  const rows = React.useMemo(
    () => (filter === "All channels" ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.channel === filter)),
    [filter]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Megaphone className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Plume Analytics</span>
            <Badge variant="secondary" className="hidden sm:inline-flex">Marketing</Badge>
          </div>
          <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Primary">
            <Button variant="ghost" size="sm">Overview</Button>
            <Button variant="ghost" size="sm">Campaigns</Button>
            <Button variant="ghost" size="sm">Audiences</Button>
            <Button variant="ghost" size="sm">Reports</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search campaigns" className="w-56 pl-8" />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Campaign performance</h1>
            <p className="text-sm text-muted-foreground">
              Cross-channel spend, revenue and ROAS for the last 30 days.
            </p>
          </div>
          <Badge variant="outline" className="w-fit gap-1.5 font-normal">
            <CalendarDays className="h-3.5 w-3.5" />
            May 14 – Jun 13, 2026
          </Badge>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{kpi.label}</CardDescription>
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight tabular-nums">{kpi.value}</div>
                  <div className="mt-1 flex items-center gap-2">
                    <Delta value={kpi.delta} />
                    <span className="text-xs text-muted-foreground">{kpi.caption}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Spend vs. revenue</CardTitle>
                <CardDescription>Monthly, in thousands (USD)</CardDescription>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/40" /> Spend
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Revenue
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end justify-between gap-3 sm:gap-5">
                {MONTHLY.map((m) => (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end justify-center gap-1.5">
                      <div
                        className="w-1/2 rounded-t bg-muted-foreground/30"
                        style={{ height: `${(m.spend / CHART_MAX) * 100}%` }}
                        title={`Spend $${m.spend}k`}
                      />
                      <div
                        className="w-1/2 rounded-t bg-primary"
                        style={{ height: `${(m.revenue / CHART_MAX) * 100}%` }}
                        title={`Revenue $${m.revenue}k`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{m.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Channel breakdown</CardTitle>
              <CardDescription>Share of spend · cost per acquisition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {CHANNELS.map((ch) => (
                <div key={ch.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{ch.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{ch.cpa} CPA</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        ch.tone === "primary" ? "bg-primary" : "bg-muted-foreground/40"
                      )}
                      style={{ width: `${ch.spendShare}%` }}
                    />
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-3 text-xs text-muted-foreground">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Email drives the lowest CPA. Shifting 10% of Display budget here is projected to lift ROAS to 4.4x.
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader className="gap-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">Campaigns</CardTitle>
                  <CardDescription>{rows.length} of {CAMPAIGNS.length} campaigns shown</CardDescription>
                </div>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by channel">
                {FILTERS.map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={filter === f ? "default" : "outline"}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead className="hidden sm:table-cell">Channel</TableHead>
                    <TableHead className="text-right">Spend</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">ROAS</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((c) => (
                    <TableRow key={c.name}>
                      <TableCell className="font-medium">{c.name}</TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">{c.channel}</TableCell>
                      <TableCell className="text-right tabular-nums">{c.spend}</TableCell>
                      <TableCell className="text-right tabular-nums">{c.revenue}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "font-medium tabular-nums",
                            c.roas >= 4
                              ? "text-primary"
                              : c.roas === 0
                                ? "text-muted-foreground"
                                : "text-foreground"
                          )}
                        >
                          {c.roas === 0 ? "—" : `${c.roas.toFixed(2)}x`}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={STATUS_VARIANT[c.status]}>{c.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {rows.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No campaigns for this channel yet.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2026 Plume Analytics. Data refreshed hourly.</span>
          <span>Last sync · 11:40 AM UTC</span>
        </div>
      </footer>
    </div>
  )
}
