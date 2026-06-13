"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Minus,
  MousePointerClick,
  Percent,
  Search,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const RANGES = ["7d", "28d", "3mo", "12mo"] as const
type Range = (typeof RANGES)[number]

type Kpis = {
  clicks: string
  impressions: string
  ctr: string
  position: string
  clicksDelta: number
  imprDelta: number
  ctrDelta: number
  posDelta: number
  label: string
}

const KPI_BY_RANGE: Record<Range, Kpis> = {
  "7d": {
    clicks: "12.4K",
    impressions: "486K",
    ctr: "2.55%",
    position: "14.2",
    clicksDelta: 8.3,
    imprDelta: 5.1,
    ctrDelta: 3.0,
    posDelta: -1.4,
    label: "Apr 7 – Apr 13",
  },
  "28d": {
    clicks: "49.8K",
    impressions: "1.92M",
    ctr: "2.59%",
    position: "13.8",
    clicksDelta: 11.7,
    imprDelta: 9.4,
    ctrDelta: 2.1,
    posDelta: -2.0,
    label: "Mar 17 – Apr 13",
  },
  "3mo": {
    clicks: "148K",
    impressions: "5.71M",
    ctr: "2.59%",
    position: "13.1",
    clicksDelta: 19.2,
    imprDelta: 14.6,
    ctrDelta: 4.8,
    posDelta: -3.2,
    label: "Jan 14 – Apr 13",
  },
  "12mo": {
    clicks: "612K",
    impressions: "24.3M",
    ctr: "2.52%",
    position: "15.6",
    clicksDelta: 42.5,
    imprDelta: 38.1,
    ctrDelta: -1.2,
    posDelta: 5.5,
    label: "Apr 2025 – Apr 2026",
  },
}

const CHART_BY_RANGE: Record<Range, { label: string; value: number }[]> = {
  "7d": [
    { label: "Mon", value: 1620 },
    { label: "Tue", value: 1840 },
    { label: "Wed", value: 1755 },
    { label: "Thu", value: 1990 },
    { label: "Fri", value: 1880 },
    { label: "Sat", value: 1310 },
    { label: "Sun", value: 1205 },
  ],
  "28d": [
    { label: "W1", value: 11200 },
    { label: "W2", value: 12450 },
    { label: "W3", value: 12980 },
    { label: "W4", value: 13170 },
  ],
  "3mo": [
    { label: "Jan", value: 41200 },
    { label: "Feb", value: 48900 },
    { label: "Mar", value: 57900 },
  ],
  "12mo": [
    { label: "Q2", value: 121000 },
    { label: "Q3", value: 138000 },
    { label: "Q4", value: 167000 },
    { label: "Q1", value: 186000 },
  ],
}

type Query = { term: string; clicks: string; ctr: string; pos: number; delta: number }

const QUERIES: Query[] = [
  { term: "headless cms pricing", clicks: "3,412", ctr: "6.1%", pos: 2.1, delta: 1.4 },
  { term: "best static site generator", clicks: "2,980", ctr: "4.8%", pos: 3.4, delta: 0.0 },
  { term: "nextjs vs astro", clicks: "2,145", ctr: "3.9%", pos: 5.2, delta: 2.7 },
  { term: "edge functions tutorial", clicks: "1,702", ctr: "2.6%", pos: 8.9, delta: -3.1 },
  { term: "deploy react to cdn", clicks: "1,388", ctr: "2.2%", pos: 11.3, delta: 0.6 },
  { term: "image optimization guide", clicks: "1,054", ctr: "1.7%", pos: 14.8, delta: -1.9 },
]

type Page = { path: string; clicks: string; impressions: string; ctr: string }

const PAGES: Page[] = [
  { path: "/docs/getting-started", clicks: "5,201", impressions: "182K", ctr: "2.9%" },
  { path: "/pricing", clicks: "3,940", impressions: "96K", ctr: "4.1%" },
  { path: "/blog/edge-rendering", clicks: "2,617", impressions: "141K", ctr: "1.9%" },
  { path: "/compare/nextjs-astro", clicks: "2,088", impressions: "73K", ctr: "2.9%" },
  { path: "/templates", clicks: "1,455", impressions: "58K", ctr: "2.5%" },
]

function Delta({ value, invert = false }: { value: number; invert?: boolean }) {
  if (value === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
        0%
      </span>
    )
  }
  const good = invert ? value < 0 : value > 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium tabular-nums",
        good ? "text-primary" : "text-destructive"
      )}
    >
      {value > 0 ? (
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      {value > 0 ? "+" : ""}
      {value}%
    </span>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  invert = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  delta: number
  invert?: boolean
}) {
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
        <div className="flex items-center gap-1.5">
          <Delta value={delta} invert={invert} />
          <span className="text-xs text-muted-foreground">vs prior</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SeoAnalyticsDashboard() {
  const [range, setRange] = React.useState<Range>("28d")
  const kpis = KPI_BY_RANGE[range]
  const chart = CHART_BY_RANGE[range]
  const peak = Math.max(...chart.map((d) => d.value))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Search className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">SearchScope</span>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            cano.app/property
          </Badge>
          <div className="ml-auto">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4" aria-hidden="true" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Organic search performance
            </h1>
            <p className="text-sm text-muted-foreground tabular-nums">
              {kpis.label} · vs previous period
            </p>
          </div>
          <div
            className="inline-flex rounded-lg border bg-muted/30 p-1"
            role="group"
            aria-label="Date range"
          >
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                aria-pressed={range === r}
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

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon={MousePointerClick}
            label="Total clicks"
            value={kpis.clicks}
            delta={kpis.clicksDelta}
          />
          <KpiCard
            icon={TrendingUp}
            label="Impressions"
            value={kpis.impressions}
            delta={kpis.imprDelta}
          />
          <KpiCard
            icon={Percent}
            label="Average CTR"
            value={kpis.ctr}
            delta={kpis.ctrDelta}
          />
          <KpiCard
            icon={Search}
            label="Avg. position"
            value={kpis.position}
            delta={kpis.posDelta}
            invert
          />
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Clicks over time</CardTitle>
              <CardDescription>
                Organic clicks across the selected {range} window.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-3">
                {chart.map((d) => (
                  <div
                    key={d.label}
                    className="group flex flex-1 flex-col items-center justify-end gap-2"
                  >
                    <span className="text-[10px] font-medium tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      {d.value.toLocaleString()}
                    </span>
                    <div
                      className="w-full rounded-t-md bg-primary/70 transition-colors group-hover:bg-primary"
                      style={{ height: `${(d.value / peak) * 100}%` }}
                    />
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Top queries</CardTitle>
              <CardDescription>
                Keywords driving the most organic traffic.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">
                      CTR
                    </TableHead>
                    <TableHead className="text-right">Position</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {QUERIES.map((q) => (
                    <TableRow key={q.term}>
                      <TableCell className="font-medium">{q.term}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {q.clicks}
                      </TableCell>
                      <TableCell className="hidden text-right tabular-nums text-muted-foreground sm:table-cell">
                        {q.ctr}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="tabular-nums">{q.pos}</span>
                          <Badge
                            variant={
                              q.delta === 0
                                ? "secondary"
                                : q.delta > 0
                                  ? "default"
                                  : "destructive"
                            }
                            className="w-14 justify-center tabular-nums"
                          >
                            {q.delta > 0 ? "+" : ""}
                            {q.delta === 0 ? "—" : q.delta}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="mt-3 text-[11px] text-muted-foreground">
                Position badge shows change in average rank vs the prior period.
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Top pages</CardTitle>
              <CardDescription>Best-performing landing paths.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {PAGES.map((p) => (
                <div
                  key={p.path}
                  className="rounded-lg border bg-muted/30 p-3"
                >
                  <code className="block truncate text-xs font-medium">
                    {p.path}
                  </code>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="tabular-nums">
                      <span className="text-foreground">{p.clicks}</span> clicks
                    </span>
                    <span className="tabular-nums">{p.impressions} impr.</span>
                    <span className="tabular-nums">{p.ctr} CTR</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>SearchScope — organic search intelligence.</span>
          <span className="tabular-nums">Last synced 2026-04-13 09:00 UTC</span>
        </div>
      </footer>
    </div>
  )
}
