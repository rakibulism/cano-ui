"use client"

import * as React from "react"
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Filter,
  HeartPulse,
  RotateCcw,
  Search,
  TrendingDown,
  UserMinus,
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

type PeriodKey = "7d" | "30d" | "90d" | "12m"

const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "Quarter" },
  { key: "12m", label: "12 months" },
]

type Kpi = {
  churnRate: string
  churnDelta: number
  retained: string
  retainedDelta: number
  atRisk: string
  atRiskDelta: number
  reactivated: string
  reactivatedDelta: number
}

const KPIS: Record<PeriodKey, Kpi> = {
  "7d": {
    churnRate: "1.2%",
    churnDelta: -0.3,
    retained: "98.8%",
    retainedDelta: 0.3,
    atRisk: "84",
    atRiskDelta: -6,
    reactivated: "19",
    reactivatedDelta: 4,
  },
  "30d": {
    churnRate: "3.4%",
    churnDelta: -0.6,
    retained: "96.6%",
    retainedDelta: 0.6,
    atRisk: "312",
    atRiskDelta: -18,
    reactivated: "76",
    reactivatedDelta: 12,
  },
  "90d": {
    churnRate: "8.1%",
    churnDelta: 1.1,
    retained: "91.9%",
    retainedDelta: -1.1,
    atRisk: "894",
    atRiskDelta: 41,
    reactivated: "203",
    reactivatedDelta: -15,
  },
  "12m": {
    churnRate: "21.7%",
    churnDelta: -2.4,
    retained: "78.3%",
    retainedDelta: 2.4,
    atRisk: "2,140",
    atRiskDelta: -132,
    reactivated: "688",
    reactivatedDelta: 57,
  },
}

const COHORTS: Record<PeriodKey, { label: string; rates: number[] }[]> = {
  "7d": [
    { label: "Jun W1", rates: [99, 99, 98, 98, 97, 97, 96] },
    { label: "May W4", rates: [99, 98, 98, 97, 96, 96, 95] },
    { label: "May W3", rates: [98, 98, 97, 96, 95, 95, 94] },
    { label: "May W2", rates: [98, 97, 96, 95, 94, 94, 93] },
  ],
  "30d": [
    { label: "May", rates: [100, 97, 94, 92, 90, 88, 86] },
    { label: "Apr", rates: [100, 96, 93, 90, 88, 85, 83] },
    { label: "Mar", rates: [100, 95, 91, 88, 85, 82, 80] },
    { label: "Feb", rates: [100, 94, 90, 86, 83, 80, 77] },
  ],
  "90d": [
    { label: "Q2", rates: [100, 92, 86, 81, 77, 74, 71] },
    { label: "Q1", rates: [100, 90, 83, 78, 73, 70, 67] },
    { label: "Q4", rates: [100, 88, 81, 75, 70, 66, 63] },
    { label: "Q3", rates: [100, 87, 79, 73, 68, 64, 60] },
  ],
  "12m": [
    { label: "2024", rates: [100, 84, 74, 67, 62, 58, 55] },
    { label: "2023", rates: [100, 81, 70, 63, 57, 53, 49] },
    { label: "2022", rates: [100, 79, 67, 59, 53, 48, 45] },
    { label: "2021", rates: [100, 76, 63, 55, 49, 44, 41] },
  ],
}

const COHORT_PERIODS = ["M0", "M1", "M2", "M3", "M4", "M5", "M6"]

const REASONS: Record<PeriodKey, { label: string; value: number }[]> = {
  "7d": [
    { label: "Price sensitivity", value: 34 },
    { label: "Missing features", value: 26 },
    { label: "Poor onboarding", value: 18 },
    { label: "Support gaps", value: 14 },
    { label: "Switched to competitor", value: 8 },
  ],
  "30d": [
    { label: "Price sensitivity", value: 31 },
    { label: "Missing features", value: 28 },
    { label: "Poor onboarding", value: 19 },
    { label: "Support gaps", value: 13 },
    { label: "Switched to competitor", value: 9 },
  ],
  "90d": [
    { label: "Missing features", value: 33 },
    { label: "Price sensitivity", value: 27 },
    { label: "Switched to competitor", value: 17 },
    { label: "Poor onboarding", value: 13 },
    { label: "Support gaps", value: 10 },
  ],
  "12m": [
    { label: "Missing features", value: 30 },
    { label: "Switched to competitor", value: 24 },
    { label: "Price sensitivity", value: 22 },
    { label: "Poor onboarding", value: 14 },
    { label: "Support gaps", value: 10 },
  ],
}

type Account = {
  name: string
  plan: string
  mrr: string
  health: number
  signal: string
  level: "high" | "medium" | "low"
}

const AT_RISK_ACCOUNTS: Record<PeriodKey, Account[]> = {
  "7d": [
    { name: "Northwind Labs", plan: "Scale", mrr: "$4,200", health: 28, signal: "Logins down 64%", level: "high" },
    { name: "Acme Robotics", plan: "Growth", mrr: "$1,850", health: 41, signal: "Support ticket open 9d", level: "high" },
    { name: "Vertex Media", plan: "Growth", mrr: "$1,200", health: 53, signal: "Seats reduced 3 → 1", level: "medium" },
    { name: "Lumen Studio", plan: "Starter", mrr: "$390", health: 66, signal: "Invoice past due", level: "low" },
  ],
  "30d": [
    { name: "Northwind Labs", plan: "Scale", mrr: "$4,200", health: 24, signal: "Logins down 71%", level: "high" },
    { name: "Cobalt Finance", plan: "Scale", mrr: "$3,600", health: 33, signal: "No active integrations", level: "high" },
    { name: "Acme Robotics", plan: "Growth", mrr: "$1,850", health: 39, signal: "Support ticket open 12d", level: "high" },
    { name: "Vertex Media", plan: "Growth", mrr: "$1,200", health: 51, signal: "Seats reduced 3 → 1", level: "medium" },
    { name: "Lumen Studio", plan: "Starter", mrr: "$390", health: 64, signal: "Invoice past due", level: "low" },
  ],
  "90d": [
    { name: "Cobalt Finance", plan: "Scale", mrr: "$3,600", health: 22, signal: "No active integrations", level: "high" },
    { name: "Northwind Labs", plan: "Scale", mrr: "$4,200", health: 27, signal: "Logins down 58%", level: "high" },
    { name: "Pinecrest Co", plan: "Growth", mrr: "$2,100", health: 36, signal: "Downgrade requested", level: "high" },
    { name: "Acme Robotics", plan: "Growth", mrr: "$1,850", health: 44, signal: "Usage flat 60d", level: "medium" },
    { name: "Vertex Media", plan: "Growth", mrr: "$1,200", health: 57, signal: "Champion left", level: "medium" },
  ],
  "12m": [
    { name: "Pinecrest Co", plan: "Growth", mrr: "$2,100", health: 19, signal: "Renewal at risk", level: "high" },
    { name: "Cobalt Finance", plan: "Scale", mrr: "$3,600", health: 25, signal: "No active integrations", level: "high" },
    { name: "Northwind Labs", plan: "Scale", mrr: "$4,200", health: 31, signal: "Logins down 49%", level: "high" },
    { name: "Harbor Group", plan: "Scale", mrr: "$5,400", health: 42, signal: "Exec sponsor churned", level: "medium" },
    { name: "Acme Robotics", plan: "Growth", mrr: "$1,850", health: 55, signal: "Usage flat 120d", level: "medium" },
  ],
}

function Delta({ value, invert = false }: { value: number; invert?: boolean }) {
  const positive = value >= 0
  const good = invert ? !positive : positive
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
        good ? "text-primary" : "text-destructive",
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {positive ? "+" : ""}
      {value}
    </span>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
}

export default function ChurnAnalytics() {
  const [period, setPeriod] = React.useState<PeriodKey>("30d")
  const k = KPIS[period]
  const cohorts = COHORTS[period]
  const reasons = REASONS[period]
  const accounts = AT_RISK_ACCOUNTS[period]
  const maxReason = Math.max(...reasons.map((r) => r.value))

  const kpiCards = [
    {
      label: "Churn rate",
      value: k.churnRate,
      delta: k.churnDelta,
      invert: true,
      icon: TrendingDown,
      hint: "vs. previous period",
    },
    {
      label: "Retained",
      value: k.retained,
      delta: k.retainedDelta,
      invert: false,
      icon: Users,
      hint: "active subscriptions",
    },
    {
      label: "At-risk",
      value: k.atRisk,
      delta: k.atRiskDelta,
      invert: true,
      icon: AlertTriangle,
      hint: "accounts flagged",
    },
    {
      label: "Reactivated",
      value: k.reactivated,
      delta: k.reactivatedDelta,
      invert: false,
      icon: RotateCcw,
      hint: "win-backs",
    },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Retainly</p>
              <p className="text-xs text-muted-foreground">Churn Analytics</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm" className="text-foreground">
              Overview
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Cohorts
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Accounts
            </Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder="Search accounts"
                className="h-9 w-44 pl-8"
                aria-label="Search accounts"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Retention overview
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor churn signals and act before accounts leave.
            </p>
          </div>
          <Tabs
            value={period}
            onValueChange={(v) => setPeriod(v as PeriodKey)}
            className="w-full sm:w-auto"
          >
            <TabsList className="w-full sm:w-auto">
              {PERIODS.map((p) => (
                <TabsTrigger key={p.key} value={p.key} className="flex-1 sm:flex-none">
                  {p.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((c) => (
            <Card key={c.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {c.label}
                </CardTitle>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <c.icon className="h-4 w-4" aria-hidden="true" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tabular-nums">
                    {c.value}
                  </span>
                  <Delta value={c.delta} invert={c.invert} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.hint}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Retention by cohort</CardTitle>
                  <CardDescription>
                    Share of accounts still active, by months since signup
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Activity className="h-3 w-3" aria-hidden="true" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-1">
                  <thead>
                    <tr>
                      <th className="w-20 px-1 pb-1 text-left text-xs font-medium text-muted-foreground">
                        Cohort
                      </th>
                      {COHORT_PERIODS.map((m) => (
                        <th
                          key={m}
                          className="px-1 pb-1 text-center text-xs font-medium text-muted-foreground"
                        >
                          {m}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cohorts.map((row) => (
                      <tr key={row.label}>
                        <td className="px-1 text-xs font-medium text-muted-foreground">
                          {row.label}
                        </td>
                        {row.rates.map((rate, i) => (
                          <td key={i} className="p-0">
                            <div
                              className="flex h-9 items-center justify-center rounded-md text-xs font-medium tabular-nums"
                              style={{
                                backgroundColor: `color-mix(in oklab, var(--primary) ${rate}%, var(--muted))`,
                                color:
                                  rate > 70
                                    ? "var(--primary-foreground)"
                                    : "var(--foreground)",
                              }}
                              title={`${row.label} · ${COHORT_PERIODS[i]}: ${rate}%`}
                            >
                              {rate}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Top churn reasons</CardTitle>
              <CardDescription>Self-reported at cancellation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reasons.map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{r.label}</span>
                    <span className="font-medium tabular-nums text-muted-foreground">
                      {r.value}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        r.value === maxReason ? "bg-primary" : "bg-primary/50",
                      )}
                      style={{ width: `${(r.value / maxReason) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <Separator />
              <p className="text-xs text-muted-foreground">
                Based on {period === "7d" ? "84" : period === "30d" ? "312" : period === "90d" ? "894" : "2,140"} exit
                surveys this period.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">At-risk accounts</CardTitle>
                  <CardDescription>
                    Prioritized by health score and revenue impact
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Filter className="h-4 w-4" aria-hidden="true" />
                  Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead className="hidden sm:table-cell">Plan</TableHead>
                    <TableHead>MRR</TableHead>
                    <TableHead className="w-40">Health</TableHead>
                    <TableHead className="hidden md:table-cell">Signal</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((a) => (
                    <TableRow key={a.name}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {initials(a.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="leading-tight">
                            <p className="text-sm font-medium">{a.name}</p>
                            <p className="text-xs text-muted-foreground sm:hidden">
                              {a.plan}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{a.plan}</Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium tabular-nums">
                        {a.mrr}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={a.health} className="h-1.5" />
                          <span className="w-7 text-right text-xs tabular-nums text-muted-foreground">
                            {a.health}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span
                            className={cn(
                              "inline-block h-1.5 w-1.5 rounded-full",
                              a.level === "high"
                                ? "bg-destructive"
                                : a.level === "medium"
                                  ? "bg-primary"
                                  : "bg-muted-foreground",
                            )}
                            aria-hidden="true"
                          />
                          {a.signal}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-1.5">
                          <UserMinus className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="hidden lg:inline">Reach out</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Retainly · Churn intelligence</p>
          <p>Data refreshed for the selected period.</p>
        </div>
      </footer>
    </div>
  )
}
