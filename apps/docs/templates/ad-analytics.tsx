"use client"

import * as React from "react"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  MousePointerClick,
  Target,
  ArrowUpDown,
  Download,
  Calendar,
  Search,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

type Channel = "Google" | "Meta" | "TikTok" | "LinkedIn"
type Status = "Active" | "Paused" | "Ended"
type SortKey = "name" | "spend" | "impressions" | "ctr" | "cpa"

type Campaign = {
  id: string
  name: string
  channel: Channel
  status: Status
  spend: number
  impressions: number
  ctr: number
  cpa: number
}

const CHANNELS: Channel[] = ["Google", "Meta", "TikTok", "LinkedIn"]

const CAMPAIGNS: Campaign[] = [
  { id: "c1", name: "Spring Sale — Search", channel: "Google", status: "Active", spend: 12840, impressions: 482000, ctr: 4.2, cpa: 18.4 },
  { id: "c2", name: "Retargeting Pool", channel: "Meta", status: "Active", spend: 9320, impressions: 1240000, ctr: 2.1, cpa: 22.7 },
  { id: "c3", name: "Gen-Z Awareness", channel: "TikTok", status: "Active", spend: 6710, impressions: 2110000, ctr: 1.6, cpa: 31.2 },
  { id: "c4", name: "B2B Decision Makers", channel: "LinkedIn", status: "Paused", spend: 5480, impressions: 184000, ctr: 0.9, cpa: 64.5 },
  { id: "c5", name: "Brand Defense", channel: "Google", status: "Active", spend: 4120, impressions: 96000, ctr: 7.8, cpa: 9.3 },
  { id: "c6", name: "Lookalike 1% — Video", channel: "Meta", status: "Active", spend: 8050, impressions: 980000, ctr: 2.8, cpa: 19.9 },
  { id: "c7", name: "Hashtag Challenge", channel: "TikTok", status: "Ended", spend: 14200, impressions: 4320000, ctr: 1.2, cpa: 42.0 },
  { id: "c8", name: "Webinar Lead Gen", channel: "LinkedIn", status: "Active", spend: 3960, impressions: 142000, ctr: 1.4, cpa: 38.6 },
  { id: "c9", name: "Shopping — Performance Max", channel: "Google", status: "Active", spend: 17320, impressions: 612000, ctr: 3.4, cpa: 15.1 },
  { id: "c10", name: "Cart Abandoners", channel: "Meta", status: "Paused", spend: 2410, impressions: 318000, ctr: 3.9, cpa: 12.8 },
]

const SPEND_SERIES = [
  { label: "Wk 1", value: 9.2 },
  { label: "Wk 2", value: 12.6 },
  { label: "Wk 3", value: 10.8 },
  { label: "Wk 4", value: 15.4 },
  { label: "Wk 5", value: 13.1 },
  { label: "Wk 6", value: 18.9 },
  { label: "Wk 7", value: 16.7 },
  { label: "Wk 8", value: 21.3 },
]

const KPIS = [
  { key: "spend", label: "Total Spend", value: "$84,412", delta: 8.2, up: true, icon: DollarSign },
  { key: "impr", label: "Impressions", value: "10.5M", delta: 12.4, up: true, icon: Eye },
  { key: "ctr", label: "Avg. CTR", value: "2.93%", delta: 1.1, up: true, icon: MousePointerClick },
  { key: "cpa", label: "Avg. CPA", value: "$27.45", delta: 4.6, up: false, icon: Target },
]

const channelDot: Record<Channel, string> = {
  Google: "bg-primary",
  Meta: "bg-foreground",
  TikTok: "bg-accent-foreground",
  LinkedIn: "bg-muted-foreground",
}

function statusVariant(status: Status): "default" | "secondary" | "outline" {
  if (status === "Active") return "default"
  if (status === "Paused") return "secondary"
  return "outline"
}

function fmtMoney(n: number) {
  return "$" + n.toLocaleString("en-US")
}

function fmtCompact(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M"
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K"
  return String(n)
}

export default function AdAnalyticsDashboard() {
  const [activeChannels, setActiveChannels] = React.useState<Channel[]>([])
  const [query, setQuery] = React.useState("")
  const [sortKey, setSortKey] = React.useState<SortKey>("spend")
  const [sortDesc, setSortDesc] = React.useState(true)

  const toggleChannel = (c: Channel) => {
    setActiveChannels((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
  }

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDesc((d) => !d)
    } else {
      setSortKey(key)
      setSortDesc(true)
    }
  }

  const rows = React.useMemo(() => {
    let r = CAMPAIGNS.filter((c) =>
      activeChannels.length === 0 ? true : activeChannels.includes(c.channel)
    )
    if (query.trim()) {
      const q = query.toLowerCase()
      r = r.filter((c) => c.name.toLowerCase().includes(q))
    }
    r = [...r].sort((a, b) => {
      let cmp = 0
      if (sortKey === "name") cmp = a.name.localeCompare(b.name)
      else cmp = (a[sortKey] as number) - (b[sortKey] as number)
      return sortDesc ? -cmp : cmp
    })
    return r
  }, [activeChannels, query, sortKey, sortDesc])

  const maxSpend = Math.max(...SPEND_SERIES.map((d) => d.value))

  const SortHead = ({ label, k, right }: { label: string; k: SortKey; right?: boolean }) => (
    <TableHead className={cn(right && "text-right")}>
      <button
        type="button"
        onClick={() => handleSort(k)}
        className={cn(
          "inline-flex items-center gap-1 transition-colors hover:text-foreground",
          sortKey === k ? "text-foreground" : "text-muted-foreground",
          right && "flex-row-reverse"
        )}
      >
        {label}
        <ArrowUpDown className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </TableHead>
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">AdPulse</p>
              <p className="text-xs text-muted-foreground">Campaign Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Last 8 weeks
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" aria-hidden="true" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 sm:px-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Paid Acquisition Overview</h1>
          <p className="text-sm text-muted-foreground">
            Cross-channel performance for your active ad spend.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.key}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{kpi.label}</CardDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tabular-nums">{kpi.value}</div>
                  <div
                    className={cn(
                      "mt-1 flex items-center gap-1 text-xs font-medium",
                      kpi.up ? "text-primary" : "text-destructive"
                    )}
                  >
                    {kpi.up ? (
                      <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {kpi.delta}%
                    <span className="text-muted-foreground">vs. prev period</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Spend Over Time</CardTitle>
              <CardDescription>Weekly ad spend in thousands (USD)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-3">
                {SPEND_SERIES.map((d) => (
                  <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                        style={{ height: `${(d.value / maxSpend) * 100}%` }}
                        title={`$${d.value}K`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{d.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spend by Channel</CardTitle>
              <CardDescription>Share of total budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { c: "Google" as Channel, pct: 41 },
                { c: "Meta" as Channel, pct: 28 },
                { c: "TikTok" as Channel, pct: 22 },
                { c: "LinkedIn" as Channel, pct: 9 },
              ].map((item) => (
                <div key={item.c} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className={cn("h-2.5 w-2.5 rounded-full", channelDot[item.c])} />
                      {item.c}
                    </span>
                    <span className="font-medium tabular-nums">{item.pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader className="gap-4">
              <div className="flex flex-col gap-1">
                <CardTitle>Campaigns</CardTitle>
                <CardDescription>
                  {rows.length} of {CAMPAIGNS.length} campaigns shown
                </CardDescription>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  {CHANNELS.map((c) => {
                    const active = activeChannels.includes(c)
                    return (
                      <button
                        key={c}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleChannel(c)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "bg-background text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <span className={cn("h-2 w-2 rounded-full", channelDot[c])} />
                        {c}
                      </button>
                    )
                  })}
                  {activeChannels.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveChannels([])}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                <div className="relative w-full lg:w-64">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search campaigns..."
                    className="pl-9"
                    aria-label="Search campaigns"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <SortHead label="Campaign" k="name" />
                      <TableHead>Channel</TableHead>
                      <TableHead>Status</TableHead>
                      <SortHead label="Spend" k="spend" right />
                      <SortHead label="Impressions" k="impressions" right />
                      <SortHead label="CTR" k="ctr" right />
                      <SortHead label="CPA" k="cpa" right />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                            <span className={cn("h-2 w-2 rounded-full", channelDot[c.channel])} />
                            {c.channel}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant(c.status)}>{c.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{fmtMoney(c.spend)}</TableCell>
                        <TableCell className="text-right tabular-nums">{fmtCompact(c.impressions)}</TableCell>
                        <TableCell className="text-right tabular-nums">{c.ctr.toFixed(1)}%</TableCell>
                        <TableCell className="text-right tabular-nums">{fmtMoney(c.cpa)}</TableCell>
                      </TableRow>
                    ))}
                    {rows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                          No campaigns match your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>AdPulse Analytics — Data refreshed 2 hours ago</p>
          <p>All currency in USD</p>
        </div>
      </footer>
    </div>
  )
}
