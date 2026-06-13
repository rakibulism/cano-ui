"use client"

import * as React from "react"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Download,
  Filter,
  Gauge,
  LayoutGrid,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
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
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Platform = "all" | "ios" | "android"

type Metrics = {
  dau: number
  mau: number
  retention: number
  crashFree: number
  dauDelta: number
  mauDelta: number
  retentionDelta: number
  crashFreeDelta: number
  funnel: { step: string; pct: number }[]
  retentionCurve: number[]
  events: { name: string; count: string; users: string; share: number }[]
}

const DATA: Record<Platform, Metrics> = {
  all: {
    dau: 482300,
    mau: 1840000,
    retention: 41.6,
    crashFree: 99.82,
    dauDelta: 6.4,
    mauDelta: 3.1,
    retentionDelta: 1.8,
    crashFreeDelta: 0.05,
    funnel: [
      { step: "App install", pct: 100 },
      { step: "Account created", pct: 78 },
      { step: "Onboarding finished", pct: 61 },
      { step: "First key action", pct: 44 },
      { step: "Day-7 active", pct: 29 },
    ],
    retentionCurve: [100, 62, 48, 41, 37, 33, 30, 28],
    events: [
      { name: "session_start", count: "8.42M", users: "1.61M", share: 100 },
      { name: "feed_scroll", count: "5.10M", users: "1.22M", share: 78 },
      { name: "post_created", count: "1.94M", users: "612K", share: 39 },
      { name: "purchase_complete", count: "318K", users: "204K", share: 13 },
      { name: "push_opened", count: "742K", users: "488K", share: 30 },
    ],
  },
  ios: {
    dau: 268900,
    mau: 980000,
    retention: 45.2,
    crashFree: 99.91,
    dauDelta: 7.9,
    mauDelta: 4.0,
    retentionDelta: 2.3,
    crashFreeDelta: 0.03,
    funnel: [
      { step: "App install", pct: 100 },
      { step: "Account created", pct: 83 },
      { step: "Onboarding finished", pct: 67 },
      { step: "First key action", pct: 51 },
      { step: "Day-7 active", pct: 34 },
    ],
    retentionCurve: [100, 68, 54, 47, 43, 39, 36, 34],
    events: [
      { name: "session_start", count: "4.61M", users: "902K", share: 100 },
      { name: "feed_scroll", count: "3.02M", users: "744K", share: 82 },
      { name: "post_created", count: "1.21M", users: "388K", share: 43 },
      { name: "purchase_complete", count: "212K", users: "141K", share: 16 },
      { name: "push_opened", count: "401K", users: "276K", share: 31 },
    ],
  },
  android: {
    dau: 213400,
    mau: 860000,
    retention: 37.4,
    crashFree: 99.71,
    dauDelta: 4.6,
    mauDelta: 2.2,
    retentionDelta: 1.1,
    crashFreeDelta: 0.09,
    funnel: [
      { step: "App install", pct: 100 },
      { step: "Account created", pct: 72 },
      { step: "Onboarding finished", pct: 54 },
      { step: "First key action", pct: 37 },
      { step: "Day-7 active", pct: 23 },
    ],
    retentionCurve: [100, 56, 41, 34, 30, 27, 24, 22],
    events: [
      { name: "session_start", count: "3.81M", users: "708K", share: 100 },
      { name: "feed_scroll", count: "2.08M", users: "476K", share: 72 },
      { name: "post_created", count: "734K", users: "224K", share: 34 },
      { name: "purchase_complete", count: "106K", users: "63K", share: 9 },
      { name: "push_opened", count: "341K", users: "212K", share: 28 },
    ],
  },
}

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "all", label: "All platforms" },
  { id: "ios", label: "iOS" },
  { id: "android", label: "Android" },
]

function formatCompact(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M"
  if (n >= 1_000) return Math.round(n / 1_000) + "K"
  return String(n)
}

function Delta({ value }: { value: number }) {
  const up = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        up ? "text-primary" : "text-destructive"
      )}
    >
      {up ? (
        <ArrowUpRight className="h-3.5 w-3.5" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" />
      )}
      {up ? "+" : ""}
      {value}%
    </span>
  )
}

export default function MobileAnalyticsDashboard() {
  const [platform, setPlatform] = React.useState<Platform>("all")
  const m = DATA[platform]

  const kpis = [
    {
      label: "Daily active users",
      value: formatCompact(m.dau),
      delta: m.dauDelta,
      icon: Users,
      hint: "vs. prior week",
    },
    {
      label: "Monthly active users",
      value: formatCompact(m.mau),
      delta: m.mauDelta,
      icon: Activity,
      hint: "vs. prior month",
    },
    {
      label: "Day-30 retention",
      value: m.retention + "%",
      delta: m.retentionDelta,
      icon: RefreshCw,
      hint: "cohort average",
    },
    {
      label: "Crash-free sessions",
      value: m.crashFree + "%",
      delta: m.crashFreeDelta,
      icon: ShieldCheck,
      hint: "last 7 days",
    },
  ]

  const days = ["D0", "D1", "D3", "D7", "D14", "D21", "D30", "D60"]

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Gauge className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Pulsemetric</span>
        </div>
        <nav className="flex-1 space-y-1 p-3" aria-label="Primary">
          {[
            { label: "Overview", icon: LayoutGrid, active: true },
            { label: "Users", icon: Users, active: false },
            { label: "Retention", icon: RefreshCw, active: false },
            { label: "Events", icon: Activity, active: false },
            { label: "Stability", icon: ShieldCheck, active: false },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="m-3 rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            Insights
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            iOS onboarding completion leads Android by 13 points this week.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-5 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-muted-foreground lg:hidden" />
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                Product Analytics
              </h1>
              <p className="text-xs text-muted-foreground">
                Last synced 12 min ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Filter className="mr-1.5 h-4 w-4" />
              Last 30 days
            </Button>
            <Button size="sm">
              <Download className="mr-1.5 h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-5 lg:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-muted-foreground">Platform:</span>
            {PLATFORMS.map((p) => {
              const active = platform === p.id
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {p.id !== "all" && <Smartphone className="h-3.5 w-3.5" />}
                  {p.label}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => (
              <Card key={k.label}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription className="text-xs">
                      {k.label}
                    </CardDescription>
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <k.icon className="h-4 w-4" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight tabular-nums">
                    {k.value}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <Delta value={k.delta} />
                    <span className="text-xs text-muted-foreground">{k.hint}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Onboarding funnel</CardTitle>
                <CardDescription>
                  Conversion through first-week activation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {m.funnel.map((step, i) => {
                  const prev = i === 0 ? step.pct : m.funnel[i - 1].pct
                  const drop = i === 0 ? 0 : prev - step.pct
                  return (
                    <div key={step.step}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium">{step.step}</span>
                        <span className="tabular-nums text-muted-foreground">
                          {step.pct}%
                        </span>
                      </div>
                      <div className="relative h-9 overflow-hidden rounded-md bg-muted">
                        <div
                          className="flex h-full items-center justify-end rounded-md bg-primary/80 px-3 transition-all"
                          style={{ width: step.pct + "%" }}
                        >
                          {drop > 0 && (
                            <span className="text-xs font-medium text-primary-foreground">
                              -{drop}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Retention curve</CardTitle>
                <CardDescription>
                  Share of cohort still active over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-44 items-end gap-2">
                  {m.retentionCurve.map((v, i) => (
                    <div
                      key={days[i]}
                      className="flex flex-1 flex-col items-center justify-end gap-2"
                    >
                      <span className="text-[10px] font-medium tabular-nums text-muted-foreground">
                        {v}%
                      </span>
                      <div
                        className={cn(
                          "w-full rounded-t-sm transition-all",
                          i === 0 ? "bg-primary" : "bg-primary/40"
                        )}
                        style={{ height: v + "%" }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {days[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Top events</CardTitle>
                <CardDescription>
                  Most triggered events for the selected platform
                </CardDescription>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {platform === "all"
                  ? "All platforms"
                  : platform === "ios"
                    ? "iOS"
                    : "Android"}
              </Badge>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead className="text-right">Unique users</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Reach
                    </TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {m.events.map((e) => (
                    <TableRow key={e.name}>
                      <TableCell className="font-mono text-xs font-medium">
                        {e.name}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {e.count}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {e.users}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: e.share + "%" }}
                            />
                          </div>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {e.share}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
