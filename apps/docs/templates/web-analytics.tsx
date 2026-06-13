"use client"

import * as React from "react"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Globe2,
  MousePointerClick,
  Radio,
  Timer,
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
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Referrer = { source: string; visitors: string; share: number; trend: number }

const SOURCE_TABS = ["Referral", "Search", "Social", "Direct"] as const
type SourceTab = (typeof SOURCE_TABS)[number]

const REFERRERS: Record<SourceTab, Referrer[]> = {
  Referral: [
    { source: "news.ycombinator.com", visitors: "4,210", share: 100, trend: 12.4 },
    { source: "producthunt.com", visitors: "2,884", share: 68, trend: 8.1 },
    { source: "dev.to", visitors: "1,507", share: 36, trend: -3.2 },
    { source: "css-tricks.com", visitors: "942", share: 22, trend: 1.9 },
    { source: "smashingmagazine.com", visitors: "613", share: 15, trend: -1.1 },
  ],
  Search: [
    { source: "Google", visitors: "18,402", share: 100, trend: 5.6 },
    { source: "Bing", visitors: "2,114", share: 11, trend: 2.2 },
    { source: "DuckDuckGo", visitors: "1,330", share: 7, trend: 9.8 },
    { source: "Ecosia", visitors: "428", share: 2, trend: -0.4 },
    { source: "Brave", visitors: "311", share: 2, trend: 4.3 },
  ],
  Social: [
    { source: "X / Twitter", visitors: "3,940", share: 100, trend: -6.7 },
    { source: "LinkedIn", visitors: "2,612", share: 66, trend: 14.2 },
    { source: "Reddit", visitors: "1,801", share: 45, trend: 3.5 },
    { source: "Bluesky", visitors: "1,205", share: 30, trend: 22.0 },
    { source: "Mastodon", visitors: "489", share: 12, trend: 1.0 },
  ],
  Direct: [
    { source: "Typed / bookmark", visitors: "9,318", share: 100, trend: 2.0 },
    { source: "Email client", visitors: "3,002", share: 32, trend: 6.4 },
    { source: "Slack", visitors: "1,744", share: 18, trend: 11.3 },
    { source: "Native app", visitors: "1,120", share: 12, trend: -2.8 },
    { source: "Unknown", visitors: "604", share: 6, trend: 0.3 },
  ],
}

const REGIONS = [
  { name: "United States", flag: "US", pct: 38 },
  { name: "Germany", flag: "DE", pct: 17 },
  { name: "United Kingdom", flag: "GB", pct: 12 },
  { name: "India", flag: "IN", pct: 11 },
  { name: "Brazil", flag: "BR", pct: 8 },
  { name: "Japan", flag: "JP", pct: 6 },
  { name: "Australia", flag: "AU", pct: 4 },
]

const TOP_PAGES = [
  { path: "/", views: "24,901", change: 6.2 },
  { path: "/pricing", views: "11,340", change: 13.7 },
  { path: "/docs/getting-started", views: "8,772", change: -2.1 },
  { path: "/blog/launch-week", views: "6,418", change: 41.5 },
  { path: "/changelog", views: "3,205", change: 0.8 },
]

const SESSIONS = [
  9, 12, 11, 14, 18, 16, 22, 26, 24, 31, 29, 34, 41, 38, 46, 52, 49, 57, 61, 58,
  66, 72, 69, 78, 84, 80, 91, 88, 96, 103,
]

const RANGES = ["24h", "7d", "30d", "90d"] as const

function StatCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  delta: number
}) {
  const up = delta >= 0
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          {label}
        </CardDescription>
        <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium",
            up ? "text-primary" : "text-destructive"
          )}
        >
          {up ? (
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {up ? "+" : ""}
          {delta}% vs prior period
        </span>
      </CardContent>
    </Card>
  )
}

export default function WebAnalyticsDashboard() {
  const [range, setRange] = React.useState<(typeof RANGES)[number]>("7d")
  const [tab, setTab] = React.useState<SourceTab>("Referral")
  const [live, setLive] = React.useState(248)

  React.useEffect(() => {
    const id = setInterval(() => {
      setLive((prev) => {
        const drift = ((prev * 7 + 13) % 19) - 9
        const next = prev + drift
        return Math.max(180, Math.min(320, next))
      })
    }, 2200)
    return () => clearInterval(id)
  }, [])

  const peak = Math.max(...SESSIONS)
  const rows = REFERRERS[tab]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Pulse Analytics</span>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            cano.app
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border bg-muted/30 px-3 py-1.5 text-xs font-medium sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Live
            </div>
            <Button size="sm" variant="outline">
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
            <p className="text-sm text-muted-foreground">
              Traffic, sources and engagement across your site.
            </p>
          </div>
          <div className="inline-flex rounded-lg border bg-muted/30 p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  range === r
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                <Radio className="h-4 w-4 text-primary" aria-hidden="true" />
                Realtime visitors
              </CardDescription>
              <CardTitle className="text-5xl tabular-nums">{live}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Active in the last 5 minutes
              </p>
              <div className="mt-4 flex items-end gap-1" aria-hidden="true">
                {SESSIONS.slice(-16).map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/30"
                    style={{ height: `${(v / peak) * 48 + 6}px` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            <StatCard icon={Users} label="Visitors" value="84.2K" delta={9.4} />
            <StatCard
              icon={Activity}
              label="Pageviews"
              value="312K"
              delta={4.8}
            />
            <StatCard
              icon={Timer}
              label="Avg. session"
              value="2m 41s"
              delta={-1.6}
            />
            <StatCard
              icon={MousePointerClick}
              label="Bounce rate"
              value="38.5%"
              delta={-3.0}
            />
          </div>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sessions trend</CardTitle>
              <CardDescription>
                Hourly sessions over the selected {range} window.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 items-end gap-1">
                {SESSIONS.map((v, i) => (
                  <div
                    key={i}
                    className="group relative flex-1 rounded-t-sm bg-primary/70 transition-colors hover:bg-primary"
                    style={{ height: `${(v / peak) * 100}%` }}
                  >
                    <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-background opacity-0 transition-opacity group-hover:opacity-100">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>now</span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Top sources</CardTitle>
              <CardDescription>
                Where your traffic is coming from.
              </CardDescription>
              <div className="mt-3 inline-flex flex-wrap gap-1 rounded-lg border bg-muted/30 p-1">
                {SOURCE_TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      tab === t
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Visitors</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">
                      Share
                    </TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.source}>
                      <TableCell className="font-medium">{r.source}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {r.visitors}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${r.share}%` }}
                            />
                          </div>
                          <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
                            {r.share}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right text-xs font-medium tabular-nums",
                          r.trend >= 0 ? "text-primary" : "text-destructive"
                        )}
                      >
                        {r.trend >= 0 ? "+" : ""}
                        {r.trend}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Regions
              </CardTitle>
              <CardDescription>Visitors by country.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {REGIONS.map((region) => (
                <div key={region.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="flex h-5 w-7 items-center justify-center rounded border bg-muted text-[10px] font-semibold text-muted-foreground">
                        {region.flag}
                      </span>
                      {region.name}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {region.pct}%
                    </span>
                  </div>
                  <Progress value={region.pct} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top pages</CardTitle>
              <CardDescription>
                Most viewed paths in the selected window.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {TOP_PAGES.map((page, i) => (
                <div key={page.path}>
                  {i > 0 && <Separator className="my-1" />}
                  <div className="flex items-center justify-between py-2">
                    <code className="rounded bg-muted px-2 py-1 text-xs">
                      {page.path}
                    </code>
                    <div className="flex items-center gap-4">
                      <span className="text-sm tabular-nums text-muted-foreground">
                        {page.views} views
                      </span>
                      <span
                        className={cn(
                          "flex w-16 items-center justify-end gap-1 text-xs font-medium tabular-nums",
                          page.change >= 0 ? "text-primary" : "text-destructive"
                        )}
                      >
                        {page.change >= 0 ? (
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {page.change >= 0 ? "+" : ""}
                        {page.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>Pulse Analytics — privacy-first, cookieless.</span>
          <span className="tabular-nums">Data refreshed every 2s</span>
        </div>
      </footer>
    </div>
  )
}
