"use client"

import * as React from "react"
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  CircleDot,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Period = "month" | "quarter" | "year"

type PeriodData = {
  label: string
  winRate: number
  winRateDelta: number
  wonCount: number
  lostCount: number
  wonValue: string
  avgDealSize: string
  avgDealDelta: number
  cycleDays: number
  cycleDelta: number
  monthly: { name: string; won: number; lost: number }[]
  reasons: { reason: string; pct: number }[]
}

const PERIODS: Record<Period, PeriodData> = {
  month: {
    label: "This Month",
    winRate: 58,
    winRateDelta: 4,
    wonCount: 24,
    lostCount: 17,
    wonValue: "$412K",
    avgDealSize: "$17.2K",
    avgDealDelta: 6,
    cycleDays: 28,
    cycleDelta: -3,
    monthly: [
      { name: "W1", won: 5, lost: 4 },
      { name: "W2", won: 7, lost: 3 },
      { name: "W3", won: 6, lost: 5 },
      { name: "W4", won: 6, lost: 5 },
    ],
    reasons: [
      { reason: "Price too high", pct: 34 },
      { reason: "Lost to competitor", pct: 26 },
      { reason: "No budget", pct: 18 },
      { reason: "Timing / on hold", pct: 13 },
      { reason: "Missing feature", pct: 9 },
    ],
  },
  quarter: {
    label: "This Quarter",
    winRate: 53,
    winRateDelta: 2,
    wonCount: 71,
    lostCount: 63,
    wonValue: "$1.24M",
    avgDealSize: "$16.4K",
    avgDealDelta: 3,
    cycleDays: 31,
    cycleDelta: -1,
    monthly: [
      { name: "Apr", won: 22, lost: 19 },
      { name: "May", won: 25, lost: 22 },
      { name: "Jun", won: 24, lost: 22 },
    ],
    reasons: [
      { reason: "Lost to competitor", pct: 31 },
      { reason: "Price too high", pct: 28 },
      { reason: "No budget", pct: 16 },
      { reason: "Missing feature", pct: 14 },
      { reason: "Timing / on hold", pct: 11 },
    ],
  },
  year: {
    label: "This Year",
    winRate: 49,
    winRateDelta: -2,
    wonCount: 268,
    lostCount: 279,
    wonValue: "$4.87M",
    avgDealSize: "$15.9K",
    avgDealDelta: -1,
    cycleDays: 34,
    cycleDelta: 2,
    monthly: [
      { name: "Q1", won: 62, lost: 71 },
      { name: "Q2", won: 71, lost: 63 },
      { name: "Q3", won: 68, lost: 70 },
      { name: "Q4", won: 67, lost: 75 },
    ],
    reasons: [
      { reason: "Price too high", pct: 30 },
      { reason: "Lost to competitor", pct: 29 },
      { reason: "Missing feature", pct: 17 },
      { reason: "No budget", pct: 14 },
      { reason: "Timing / on hold", pct: 10 },
    ],
  },
}

const DEALS = [
  { company: "Northwind Retail", rep: "AC", repName: "Ada Cole", value: "$48,200", outcome: "won", reason: "Strong ROI case", date: "Jun 11" },
  { company: "Helios Media", rep: "TM", repName: "Theo Marsh", value: "$12,900", outcome: "lost", reason: "Lost to competitor", date: "Jun 10" },
  { company: "Cobalt Logistics", rep: "RP", repName: "Rosa Pike", value: "$31,500", outcome: "won", reason: "Champion buy-in", date: "Jun 09" },
  { company: "Vertex Health", rep: "AC", repName: "Ada Cole", value: "$22,400", outcome: "lost", reason: "Price too high", date: "Jun 08" },
  { company: "Stratus Cloud", rep: "JN", repName: "Jonah Ng", value: "$67,800", outcome: "won", reason: "Multi-year contract", date: "Jun 06" },
  { company: "Lumen Foods", rep: "RP", repName: "Rosa Pike", value: "$9,750", outcome: "lost", reason: "No budget", date: "Jun 05" },
  { company: "Apex Manufacturing", rep: "TM", repName: "Theo Marsh", value: "$54,000", outcome: "won", reason: "Displaced incumbent", date: "Jun 03" },
]

export default function WinLossAnalysisDashboard() {
  const [period, setPeriod] = React.useState<Period>("month")
  const data = PERIODS[period]

  const maxBar = Math.max(
    ...data.monthly.flatMap((m) => [m.won, m.lost])
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Pipeline IQ</p>
              <p className="text-xs text-muted-foreground">Win / Loss Analysis</p>
            </div>
          </div>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Win / Loss Analysis</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Understand why deals close and what drives losses for {data.label.toLowerCase()}.
            </p>
          </div>
          <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi
            icon={<Trophy className="h-4 w-4" />}
            label="Win rate"
            value={`${data.winRate}%`}
            delta={data.winRateDelta}
            suffix="pts"
          />
          <Kpi
            icon={<DollarSign className="h-4 w-4" />}
            label="Closed-won value"
            value={data.wonValue}
            delta={data.winRateDelta}
            hint={`${data.wonCount} deals won`}
            hideDeltaUnit
          />
          <Kpi
            icon={<Target className="h-4 w-4" />}
            label="Avg deal size"
            value={data.avgDealSize}
            delta={data.avgDealDelta}
            suffix="%"
          />
          <Kpi
            icon={<TrendingDown className="h-4 w-4" />}
            label="Avg sales cycle"
            value={`${data.cycleDays} days`}
            delta={data.cycleDelta}
            suffix=" days"
            invert
          />
        </section>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Won vs. Lost</CardTitle>
                  <CardDescription>
                    Deal volume by period for {data.label.toLowerCase()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
                    Won
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/40" />
                    Lost
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-6 sm:gap-10">
                {data.monthly.map((m) => (
                  <div key={m.name} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end justify-center gap-2">
                      <div className="flex flex-1 flex-col items-center justify-end">
                        <span className="mb-1 text-xs font-medium">{m.won}</span>
                        <div
                          className="w-full rounded-t-md bg-primary transition-all"
                          style={{ height: `${(m.won / maxBar) * 100}%` }}
                        />
                      </div>
                      <div className="flex flex-1 flex-col items-center justify-end">
                        <span className="mb-1 text-xs font-medium text-muted-foreground">{m.lost}</span>
                        <div
                          className="w-full rounded-t-md bg-muted-foreground/40 transition-all"
                          style={{ height: `${(m.lost / maxBar) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{m.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top loss reasons</CardTitle>
              <CardDescription>Why deals slipped away</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.reasons.map((r) => (
                <div key={r.reason}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-foreground">{r.reason}</span>
                    <span className="font-medium tabular-nums text-muted-foreground">{r.pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Recently closed deals</CardTitle>
                <CardDescription>Latest outcomes across the team</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    aria-label="Search deals"
                    placeholder="Search deals"
                    className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="text-right">Closed</TableHead>
                    <TableHead className="text-right">Outcome</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEALS.map((d) => (
                    <TableRow key={d.company}>
                      <TableCell className="font-medium">{d.company}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">{d.rep}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{d.repName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="tabular-nums">{d.value}</TableCell>
                      <TableCell className="text-muted-foreground">{d.reason}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{d.date}</TableCell>
                      <TableCell className="text-right">
                        {d.outcome === "won" ? (
                          <Badge className="gap-1">
                            <ArrowUpRight className="h-3 w-3" />
                            Won
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1 text-muted-foreground">
                            <ArrowDownRight className="h-3 w-3" />
                            Lost
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p className="flex items-center gap-1.5">
            <CircleDot className="h-3.5 w-3.5" />
            Data synced from CRM, {data.label.toLowerCase()}.
          </p>
          <p>Pipeline IQ. All deals analyzed for sales intelligence.</p>
        </div>
      </footer>
    </div>
  )
}

function Kpi({
  icon,
  label,
  value,
  delta,
  suffix = "",
  hint,
  invert = false,
  hideDeltaUnit = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  delta: number
  suffix?: string
  hint?: string
  invert?: boolean
  hideDeltaUnit?: boolean
}) {
  const positive = invert ? delta < 0 : delta > 0
  const up = delta > 0
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <span
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              positive ? "text-primary" : "text-destructive"
            )}
          >
            {up ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {up ? "+" : ""}
            {delta}
            {hideDeltaUnit ? "" : suffix}
          </span>
        </div>
        <p className="mt-4 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
        <p className="mt-1 text-sm text-muted-foreground">{label}</p>
        {hint ? (
          <>
            <Separator className="my-3" />
            <p className="text-xs text-muted-foreground">{hint}</p>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}
