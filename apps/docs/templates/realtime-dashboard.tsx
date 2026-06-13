"use client"

import * as React from "react"
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Circle,
  Gauge,
  Globe,
  Pause,
  Play,
  RefreshCw,
  Server,
  Users,
  Zap,
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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type MetricKey = "users" | "requests" | "errors" | "latency"

type MetricDef = {
  key: MetricKey
  label: string
  value: string
  unit: string
  delta: string
  up: boolean
  good: boolean
  icon: React.ComponentType<{ className?: string }>
  series: number[]
}

const METRICS: Record<MetricKey, MetricDef> = {
  users: {
    key: "users",
    label: "Active users now",
    value: "12,847",
    unit: "online",
    delta: "+4.2%",
    up: true,
    good: true,
    icon: Users,
    series: [42, 48, 45, 52, 60, 58, 64, 70, 68, 74, 80, 78, 84, 88, 92, 90, 96, 94, 98, 100],
  },
  requests: {
    key: "requests",
    label: "Requests / sec",
    value: "9,312",
    unit: "req/s",
    delta: "+1.8%",
    up: true,
    good: true,
    icon: Zap,
    series: [70, 65, 72, 80, 76, 84, 90, 78, 88, 95, 82, 90, 98, 86, 92, 100, 88, 94, 90, 96],
  },
  errors: {
    key: "errors",
    label: "Error rate",
    value: "0.42",
    unit: "%",
    delta: "-0.11%",
    up: false,
    good: true,
    icon: AlertTriangle,
    series: [30, 28, 35, 26, 40, 32, 22, 38, 25, 30, 20, 34, 18, 28, 24, 16, 22, 14, 20, 12],
  },
  latency: {
    key: "latency",
    label: "p95 latency",
    value: "184",
    unit: "ms",
    delta: "+6ms",
    up: true,
    good: false,
    icon: Gauge,
    series: [50, 55, 52, 60, 58, 65, 62, 70, 66, 72, 68, 75, 80, 76, 82, 78, 85, 80, 88, 84],
  },
}

const TAB_ORDER: MetricKey[] = ["users", "requests", "errors", "latency"]

const EVENTS: { id: number; type: string; label: string; meta: string; tone: "ok" | "warn" | "err" }[] = [
  { id: 1, type: "deploy", label: "Deploy succeeded", meta: "api-gateway v2.14.0", tone: "ok" },
  { id: 2, type: "spike", label: "Traffic spike detected", meta: "us-east-1 · +38%", tone: "warn" },
  { id: 3, type: "error", label: "5xx burst on /checkout", meta: "14 events in 30s", tone: "err" },
  { id: 4, type: "user", label: "New cohort online", meta: "ios-app · 1.2k users", tone: "ok" },
  { id: 5, type: "scale", label: "Autoscaled workers", meta: "12 → 18 pods", tone: "ok" },
  { id: 6, type: "cache", label: "Cache hit ratio dipped", meta: "redis-main · 91%", tone: "warn" },
  { id: 7, type: "deploy", label: "Canary promoted", meta: "web-app v8.3.1", tone: "ok" },
]

const TOP_PAGES: { path: string; users: number; views: string; trend: number }[] = [
  { path: "/dashboard", users: 3210, views: "42.1k", trend: 12 },
  { path: "/checkout", users: 1842, views: "18.6k", trend: -4 },
  { path: "/pricing", users: 1390, views: "15.2k", trend: 8 },
  { path: "/docs/quickstart", users: 1104, views: "11.9k", trend: 21 },
  { path: "/settings/billing", users: 786, views: "7.4k", trend: -2 },
  { path: "/blog/realtime", users: 612, views: "6.1k", trend: 33 },
]

function buildAreaPath(series: number[], width: number, height: number) {
  const max = Math.max(...series)
  const min = Math.min(...series)
  const range = max - min || 1
  const step = width / (series.length - 1)
  const points = series.map((v, i) => {
    const x = i * step
    const y = height - ((v - min) / range) * (height - 12) - 6
    return [x, y] as const
  })
  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ")
  const area = `${line} L${width},${height} L0,${height} Z`
  return { line, area, points }
}

function Sparkline({ series }: { series: number[] }) {
  const { line } = buildAreaPath(series, 96, 32)
  return (
    <svg viewBox="0 0 96 32" className="h-8 w-24 text-primary" preserveAspectRatio="none" aria-hidden="true">
      <path d={line} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function RealtimeDashboard() {
  const [active, setActive] = React.useState<MetricKey>("users")
  const [live, setLive] = React.useState(true)
  const metric = METRICS[active]
  const { line, area } = buildAreaPath(metric.series, 760, 240)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Pulse</p>
              <p className="text-xs text-muted-foreground">Realtime Operations</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="outline" className="gap-1.5 font-normal">
              <Circle className={cn("h-2 w-2 fill-current", live ? "text-primary" : "text-muted-foreground")} />
              {live ? "Live" : "Paused"}
            </Badge>
            <Button
              variant={live ? "secondary" : "default"}
              size="sm"
              onClick={() => setLive((v) => !v)}
              className="gap-1.5"
            >
              {live ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {live ? "Pause" : "Resume"}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Refresh data">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Realtime dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Last updated 2 seconds ago · 3 regions reporting
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TAB_ORDER.map((key) => {
            const m = METRICS[key]
            const Icon = m.icon
            const isActive = key === active
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={cn(
                  "group rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary/60",
                  isActive && "border-primary ring-1 ring-primary"
                )}
                aria-pressed={isActive}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-medium",
                      m.good ? "text-primary" : "text-destructive"
                    )}
                  >
                    {m.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {m.delta}
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{m.label}</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold tracking-tight tabular-nums">{m.value}</span>
                  <span className="text-xs text-muted-foreground">{m.unit}</span>
                </p>
                <div className="mt-2">
                  <Sparkline series={m.series} />
                </div>
              </button>
            )
          })}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle>{metric.label}</CardTitle>
                  <CardDescription>
                    {metric.value} {metric.unit} · rolling 5 minute window
                  </CardDescription>
                </div>
                <Tabs value={active} onValueChange={(v) => setActive(v as MetricKey)}>
                  <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="requests">Requests</TabsTrigger>
                    <TabsTrigger value="errors">Errors</TabsTrigger>
                    <TabsTrigger value="latency">Latency</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-[240px] w-full">
                <svg
                  viewBox="0 0 760 240"
                  className="h-full w-full text-primary"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label={`${metric.label} over time`}
                >
                  <defs>
                    <linearGradient id="rt-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity={0.28} />
                      <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((g) => (
                    <line
                      key={g}
                      x1={0}
                      x2={760}
                      y1={240 * g}
                      y2={240 * g}
                      stroke="currentColor"
                      strokeOpacity={0.08}
                      strokeWidth={1}
                    />
                  ))}
                  <path d={area} fill="url(#rt-fill)" />
                  <path
                    d={line}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>5m ago</span>
                <span>4m</span>
                <span>3m</span>
                <span>2m</span>
                <span>1m</span>
                <span>now</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Server className="h-4 w-4 text-primary" />
                Live events
              </CardTitle>
              <CardDescription>Streaming from all services</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {EVENTS.map((ev, i) => (
                  <li key={ev.id}>
                    <div className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                          ev.tone === "ok" && "bg-primary",
                          ev.tone === "warn" && "bg-accent-foreground/60",
                          ev.tone === "err" && "bg-destructive"
                        )}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{ev.label}</p>
                        <p className="truncate text-xs text-muted-foreground">{ev.meta}</p>
                      </div>
                      {ev.tone === "err" && (
                        <Badge variant="destructive" className="shrink-0 text-[10px]">
                          alert
                        </Badge>
                      )}
                    </div>
                    {i < EVENTS.length - 1 && <Separator className="mt-3" />}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Globe className="h-4 w-4 text-primary" />
                    Top pages right now
                  </CardTitle>
                  <CardDescription>Ranked by concurrent active users</CardDescription>
                </div>
                <Badge variant="secondary" className="font-normal">9,894 active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">Active users</TableHead>
                    <TableHead className="text-right">Views (5m)</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOP_PAGES.map((page) => {
                    const max = Math.max(...TOP_PAGES.map((p) => p.users))
                    const pct = Math.round((page.users / max) * 100)
                    return (
                      <TableRow key={page.path}>
                        <TableCell>
                          <div className="flex flex-col gap-1.5">
                            <span className="font-medium">{page.path}</span>
                            <span className="h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-muted">
                              <span
                                className="block h-full rounded-full bg-primary"
                                style={{ width: `${pct}%` }}
                              />
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium tabular-nums">
                          {page.users.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {page.views}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={cn(
                              "inline-flex items-center gap-0.5 text-xs font-medium",
                              page.trend >= 0 ? "text-primary" : "text-destructive"
                            )}
                          >
                            {page.trend >= 0 ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {Math.abs(page.trend)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Pulse Realtime · all systems operational</p>
          <p className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-current text-primary" />
            Connected · 12ms socket latency
          </p>
        </div>
      </footer>
    </div>
  )
}
