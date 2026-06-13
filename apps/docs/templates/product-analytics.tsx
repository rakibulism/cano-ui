"use client"

import * as React from "react"
import { Activity, ArrowDownRight, ArrowUpRight, Filter, MousePointerClick, Search, Sparkles, TrendingUp, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type MetricKey = "activeUsers" | "sessions" | "conversion"

const METRICS: { key: MetricKey; label: string; value: string; delta: string; up: boolean; series: number[] }[] = [
  { key: "activeUsers", label: "Active Users", value: "48,209", delta: "+12.4%", up: true, series: [22, 28, 26, 34, 31, 40, 38, 46, 44, 52, 49, 58] },
  { key: "sessions", label: "Sessions", value: "126,847", delta: "+8.1%", up: true, series: [60, 58, 64, 62, 70, 68, 74, 72, 78, 80, 77, 85] },
  { key: "conversion", label: "Conversion", value: "4.62%", delta: "-0.7%", up: false, series: [50, 52, 49, 53, 48, 51, 47, 50, 46, 48, 45, 44] },
]

const FUNNEL = [
  { stage: "Visited Site", users: 48209, color: "bg-primary" },
  { stage: "Signed Up", users: 31420, color: "bg-primary/80" },
  { stage: "Activated Workspace", users: 19880, color: "bg-primary/60" },
  { stage: "Invited Teammate", users: 9460, color: "bg-primary/40" },
  { stage: "Upgraded Plan", users: 4120, color: "bg-primary/25" },
]

const COHORTS: { label: string; size: string; cells: number[] }[] = [
  { label: "Mar 2026", size: "8,210", cells: [100, 62, 48, 41, 38, 35] },
  { label: "Apr 2026", size: "9,044", cells: [100, 66, 52, 45, 40, 0] },
  { label: "May 2026", size: "10,318", cells: [100, 69, 55, 49, 0, 0] },
  { label: "Jun 2026", size: "11,902", cells: [100, 71, 58, 0, 0, 0] },
  { label: "Jul 2026", size: "12,540", cells: [100, 74, 0, 0, 0, 0] },
  { label: "Aug 2026", size: "13,866", cells: [100, 0, 0, 0, 0, 0] },
]

const TOP_EVENTS = [
  { name: "project_created", count: "84,210", users: "18,402", trend: "+14%", up: true },
  { name: "report_exported", count: "61,930", users: "12,118", trend: "+9%", up: true },
  { name: "dashboard_viewed", count: "240,508", users: "31,772", trend: "+5%", up: true },
  { name: "invite_sent", count: "22,640", users: "8,930", trend: "-3%", up: false },
  { name: "integration_connected", count: "14,082", users: "6,204", trend: "+21%", up: true },
  { name: "billing_upgraded", count: "4,120", users: "4,120", trend: "+2%", up: true },
]

function Sparkline({ data, muted }: { data: number[]; muted?: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 280
  const h = 64
  const step = w / (data.length - 1)
  const points = data.map((d, i) => `${i * step},${h - ((d - min) / range) * (h - 8) - 4}`).join(" ")
  const area = `0,${h} ${points} ${w},${h}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
      <polygon points={area} className={cn("fill-primary/10", muted && "fill-muted-foreground/10")} />
      <polyline
        points={points}
        fill="none"
        strokeWidth={2.5}
        className={cn("stroke-primary", muted && "stroke-muted-foreground")}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProductAnalyticsDashboard() {
  const [metric, setMetric] = React.useState<MetricKey>("activeUsers")
  const [range, setRange] = React.useState<"7d" | "30d" | "90d">("30d")
  const active = METRICS.find((m) => m.key === metric) ?? METRICS[0]
  const topFunnel = FUNNEL[0].users

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </span>
            <span>Pulse</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">Product Analytics</Badge>
          </div>
          <div className="relative ml-auto hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search events, users, funnels…" className="w-64 pl-8" />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          <Button size="sm" className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">New Insight</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Product Overview</h1>
            <p className="text-sm text-muted-foreground">How users move through, stick around, and engage with the app.</p>
          </div>
          <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
            <TabsList>
              <TabsTrigger value="7d">7d</TabsTrigger>
              <TabsTrigger value="30d">30d</TabsTrigger>
              <TabsTrigger value="90d">90d</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((m) => {
            const selected = m.key === metric
            return (
              <button
                key={m.key}
                onClick={() => setMetric(m.key)}
                className={cn(
                  "rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent/40",
                  selected && "border-primary ring-1 ring-primary"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  <span className={cn("flex items-center gap-1 text-xs font-medium", m.up ? "text-primary" : "text-destructive")}>
                    {m.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {m.delta}
                  </span>
                </div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{m.value}</div>
              </button>
            )
          })}
        </div>

        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  {active.label} trend
                </CardTitle>
                <CardDescription>Daily {active.label.toLowerCase()} over the last {range}.</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold tabular-nums">{active.value}</div>
                <div className={cn("text-xs", active.up ? "text-primary" : "text-destructive")}>{active.delta} vs prior</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Sparkline data={active.series} muted={!active.up} />
          </CardContent>
        </Card>

        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Activation Funnel</CardTitle>
              <CardDescription>Conversion through each step of onboarding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {FUNNEL.map((step, i) => {
                const pct = Math.round((step.users / topFunnel) * 100)
                const prev = i === 0 ? step.users : FUNNEL[i - 1].users
                const drop = i === 0 ? 0 : Math.round((1 - step.users / prev) * 100)
                return (
                  <div key={step.stage}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{step.stage}</span>
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <span className="tabular-nums">{step.users.toLocaleString()}</span>
                        <span className="tabular-nums">{pct}%</span>
                        {drop > 0 && <span className="text-destructive tabular-nums">-{drop}%</span>}
                      </span>
                    </div>
                    <div className="h-7 w-full overflow-hidden rounded-md bg-muted">
                      <div
                        className={cn("flex h-full items-center justify-end rounded-md pr-2 text-xs font-medium text-primary-foreground", step.color)}
                        style={{ width: `${pct}%` }}
                      >
                        {pct >= 18 && <span>{pct}%</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Live Engagement
              </CardTitle>
              <CardDescription>Active users right now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-3xl font-semibold tabular-nums">2,841</div>
                <p className="text-sm text-muted-foreground">currently online</p>
              </div>
              <Sparkline data={[18, 24, 21, 30, 27, 36, 33, 42, 39, 48, 45, 54]} />
              <Separator />
              <div className="space-y-2 text-sm">
                {[
                  { label: "Web app", value: 68 },
                  { label: "Mobile", value: 24 },
                  { label: "API / SDK", value: 8 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{row.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${row.value}%` }} />
                      </div>
                      <span className="w-8 text-right tabular-nums">{row.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Retention Cohorts</CardTitle>
            <CardDescription>Percentage of each signup cohort still active by month.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-1 text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="px-2 py-1 font-medium">Cohort</th>
                  <th className="px-2 py-1 font-medium">Users</th>
                  {["M0", "M1", "M2", "M3", "M4", "M5"].map((m) => (
                    <th key={m} className="px-2 py-1 text-center font-medium">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COHORTS.map((cohort) => (
                  <tr key={cohort.label}>
                    <td className="whitespace-nowrap px-2 py-1 font-medium">{cohort.label}</td>
                    <td className="whitespace-nowrap px-2 py-1 tabular-nums text-muted-foreground">{cohort.size}</td>
                    {cohort.cells.map((c, i) => (
                      <td key={i} className="p-0.5">
                        {c === 0 ? (
                          <div className="h-9 rounded-md bg-muted/30" />
                        ) : (
                          <div
                            className="flex h-9 items-center justify-center rounded-md text-xs font-medium"
                            style={{ opacity: 0.18 + (c / 100) * 0.82 }}
                          >
                            <div className="flex h-full w-full items-center justify-center rounded-md bg-primary/10 text-primary">
                              {c}%
                            </div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4 text-primary" />
                  Top Events
                </CardTitle>
                <CardDescription>Most fired events across all users.</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead className="text-right">Occurrences</TableHead>
                  <TableHead className="text-right">Unique Users</TableHead>
                  <TableHead className="text-right">7d Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOP_EVENTS.map((ev) => (
                  <TableRow key={ev.name}>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{ev.name}</code>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{ev.count}</TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">{ev.users}</TableCell>
                    <TableCell className="text-right">
                      <span className={cn("inline-flex items-center gap-1 text-xs font-medium", ev.up ? "text-primary" : "text-destructive")}>
                        {ev.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                        {ev.trend}
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
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>Pulse Analytics — data refreshed every 5 minutes</span>
          <span className="tabular-nums">Tracking 1.2M events / day</span>
        </div>
      </footer>
    </div>
  )
}
