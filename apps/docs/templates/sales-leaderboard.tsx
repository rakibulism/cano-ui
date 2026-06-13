"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Crown,
  DollarSign,
  Download,
  Medal,
  Minus,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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

type Period = "month" | "quarter" | "year"

const PERIODS: { key: Period; label: string }[] = [
  { key: "month", label: "This month" },
  { key: "quarter", label: "Quarter" },
  { key: "year", label: "Year" },
]

type Rep = {
  id: number
  name: string
  initials: string
  region: string
  revenue: Record<Period, number>
  quota: Record<Period, number>
  deals: Record<Period, number>
  trend: Record<Period, number>
}

const REPS: Rep[] = [
  {
    id: 1,
    name: "Amara Okafor",
    initials: "AO",
    region: "West",
    revenue: { month: 184000, quarter: 512000, year: 1980000 },
    quota: { month: 150000, quarter: 480000, year: 1800000 },
    deals: { month: 12, quarter: 34, year: 121 },
    trend: { month: 14, quarter: 9, year: 22 },
  },
  {
    id: 2,
    name: "Diego Marquez",
    initials: "DM",
    region: "East",
    revenue: { month: 161000, quarter: 538000, year: 1740000 },
    quota: { month: 150000, quarter: 480000, year: 1800000 },
    deals: { month: 9, quarter: 31, year: 108 },
    trend: { month: 6, quarter: 12, year: -3 },
  },
  {
    id: 3,
    name: "Hannah Webb",
    initials: "HW",
    region: "Central",
    revenue: { month: 142000, quarter: 421000, year: 1910000 },
    quota: { month: 150000, quarter: 480000, year: 1800000 },
    deals: { month: 11, quarter: 28, year: 117 },
    trend: { month: -4, quarter: 3, year: 18 },
  },
  {
    id: 4,
    name: "Leo Karlsson",
    initials: "LK",
    region: "West",
    revenue: { month: 138000, quarter: 466000, year: 1620000 },
    quota: { month: 150000, quarter: 480000, year: 1800000 },
    deals: { month: 8, quarter: 30, year: 99 },
    trend: { month: 11, quarter: 7, year: 5 },
  },
  {
    id: 5,
    name: "Priya Nair",
    initials: "PN",
    region: "East",
    revenue: { month: 129000, quarter: 488000, year: 1555000 },
    quota: { month: 150000, quarter: 480000, year: 1800000 },
    deals: { month: 10, quarter: 33, year: 95 },
    trend: { month: 8, quarter: -2, year: 9 },
  },
  {
    id: 6,
    name: "Owen Frost",
    initials: "OF",
    region: "Central",
    revenue: { month: 117000, quarter: 392000, year: 1488000 },
    quota: { month: 150000, quarter: 480000, year: 1800000 },
    deals: { month: 7, quarter: 25, year: 91 },
    trend: { month: 3, quarter: 5, year: -1 },
  },
  {
    id: 7,
    name: "Sofia Marin",
    initials: "SM",
    region: "West",
    revenue: { month: 104000, quarter: 451000, year: 1402000 },
    quota: { month: 150000, quarter: 480000, year: 1800000 },
    deals: { month: 6, quarter: 29, year: 84 },
    trend: { month: -7, quarter: 4, year: 13 },
  },
]

type Deal = {
  id: number
  account: string
  rep: string
  initials: string
  stage: "Closed Won" | "Closed Won" | "Closed Won"
  amount: number
  closed: string
}

const DEALS: Deal[] = [
  { id: 1, account: "Northgate Logistics", rep: "Amara Okafor", initials: "AO", stage: "Closed Won", amount: 62000, closed: "Jun 11" },
  { id: 2, account: "StackForge", rep: "Diego Marquez", initials: "DM", stage: "Closed Won", amount: 48500, closed: "Jun 10" },
  { id: 3, account: "Brightwave", rep: "Priya Nair", initials: "PN", stage: "Closed Won", amount: 37000, closed: "Jun 09" },
  { id: 4, account: "Vertex Co.", rep: "Hannah Webb", initials: "HW", stage: "Closed Won", amount: 29800, closed: "Jun 08" },
  { id: 5, account: "Cobalt Studio", rep: "Leo Karlsson", initials: "LK", stage: "Closed Won", amount: 54200, closed: "Jun 06" },
  { id: 6, account: "Meridian", rep: "Owen Frost", initials: "OF", stage: "Closed Won", amount: 21500, closed: "Jun 05" },
]

function formatCurrency(n: number): string {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M"
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K"
  return "$" + n
}

function rankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-4 w-4" aria-hidden="true" />
  if (rank === 2) return <Medal className="h-4 w-4" aria-hidden="true" />
  if (rank === 3) return <Award className="h-4 w-4" aria-hidden="true" />
  return null
}

export default function SalesLeaderboard() {
  const [period, setPeriod] = React.useState<Period>("month")

  const ranked = React.useMemo(
    () => [...REPS].sort((a, b) => b.revenue[period] - a.revenue[period]),
    [period],
  )

  const periodLabel = PERIODS.find((p) => p.key === period)!.label

  const totals = React.useMemo(() => {
    const revenue = ranked.reduce((s, r) => s + r.revenue[period], 0)
    const quota = ranked.reduce((s, r) => s + r.quota[period], 0)
    const deals = ranked.reduce((s, r) => s + r.deals[period], 0)
    const attainment = Math.round((revenue / quota) * 100)
    return { revenue, quota, deals, attainment }
  }, [ranked, period])

  const kpis = [
    {
      label: "Team revenue",
      value: formatCurrency(totals.revenue),
      icon: DollarSign,
      sub: periodLabel.toLowerCase(),
    },
    {
      label: "Quota attainment",
      value: totals.attainment + "%",
      icon: Target,
      sub: "of " + formatCurrency(totals.quota),
    },
    {
      label: "Deals closed",
      value: String(totals.deals),
      icon: TrendingUp,
      sub: "won " + periodLabel.toLowerCase(),
    },
    {
      label: "Active reps",
      value: String(REPS.length),
      icon: Users,
      sub: "across 3 regions",
    },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Trophy className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-none">Pinnacle Sales</p>
            <p className="mt-1 text-xs text-muted-foreground">Leaderboard</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sales leaderboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ranked by closed revenue · {periodLabel}
            </p>
          </div>
          <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <TabsList>
              {PERIODS.map((p) => (
                <TabsTrigger key={p.key} value={p.key}>
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {k.label}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <k.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight">{k.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Podium / rep cards */}
        <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Rankings
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ranked.map((rep, i) => {
            const rank = i + 1
            const revenue = rep.revenue[period]
            const quota = rep.quota[period]
            const attainment = Math.round((revenue / quota) * 100)
            const trend = rep.trend[period]
            const isPodium = rank <= 3
            return (
              <Card
                key={rep.id}
                className={cn(
                  "relative overflow-hidden",
                  rank === 1 && "border-primary ring-1 ring-primary/30",
                )}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{rep.initials}</AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card text-xs font-semibold",
                          isPodium
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                        aria-label={"Rank " + rank}
                      >
                        {rank}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate font-semibold">{rep.name}</p>
                        {isPodium && (
                          <span className="text-primary">{rankIcon(rank)}</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{rep.region} region</p>
                    </div>
                    <Badge
                      variant={trend >= 0 ? "secondary" : "outline"}
                      className={cn(
                        "shrink-0 gap-0.5",
                        trend < 0 && "text-destructive",
                      )}
                    >
                      {trend > 0 ? (
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      ) : trend < 0 ? (
                        <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      )}
                      {Math.abs(trend)}%
                    </Badge>
                  </div>

                  <div className="mt-5 flex items-baseline justify-between">
                    <span className="text-2xl font-semibold tracking-tight">
                      {formatCurrency(revenue)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {rep.deals[period]} deals
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Quota attainment</span>
                      <span
                        className={cn(
                          "font-medium",
                          attainment >= 100 ? "text-primary" : "text-foreground",
                        )}
                      >
                        {attainment}%
                      </span>
                    </div>
                    <Progress value={Math.min(attainment, 100)} className="h-2" />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      Goal {formatCurrency(quota)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Deals table */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recently closed deals
          </h2>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Account</TableHead>
                <TableHead className="hidden sm:table-cell">Rep</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="hidden md:table-cell">Closed</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEALS.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.account}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">{d.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{d.rep}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{d.stage}</Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {d.closed}
                  </TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    {formatCurrency(d.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Separator className="my-8" />
        <p className="text-center text-xs text-muted-foreground">
          Figures reflect {periodLabel.toLowerCase()} · Updated daily at 6:00 AM
        </p>
      </main>
    </div>
  )
}
