"use client"
import * as React from "react"
import { TrendingUp, TrendingDown, DollarSign, Users, Gauge, UserCheck, ArrowUpRight, Target, Building2, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

type Period = "monthly" | "quarterly" | "yearly"

const PERIODS: { id: Period; label: string }[] = [
  { id: "monthly", label: "This Month" },
  { id: "quarterly", label: "This Quarter" },
  { id: "yearly", label: "This Year" },
]

type Kpi = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  values: Record<Period, { value: string; delta: number; sub: string }>
}

const KPIS: Kpi[] = [
  {
    id: "revenue",
    label: "Revenue",
    icon: DollarSign,
    values: {
      monthly: { value: "$4.2M", delta: 8.4, sub: "vs $3.9M last month" },
      quarterly: { value: "$12.6M", delta: 11.2, sub: "vs $11.3M last quarter" },
      yearly: { value: "$48.9M", delta: 17.6, sub: "vs $41.6M last year" },
    },
  },
  {
    id: "customers",
    label: "Active Customers",
    icon: Users,
    values: {
      monthly: { value: "9,420", delta: 3.1, sub: "+284 net new" },
      quarterly: { value: "9,420", delta: 9.8, sub: "+842 net new" },
      yearly: { value: "9,420", delta: 24.5, sub: "+1,856 net new" },
    },
  },
  {
    id: "nps",
    label: "NPS Score",
    icon: Gauge,
    values: {
      monthly: { value: "62", delta: 2.0, sub: "+2 pts vs last month" },
      quarterly: { value: "58", delta: -1.0, sub: "-1 pt vs last quarter" },
      yearly: { value: "60", delta: 6.0, sub: "+6 pts vs last year" },
    },
  },
  {
    id: "headcount",
    label: "Headcount",
    icon: UserCheck,
    values: {
      monthly: { value: "312", delta: 1.6, sub: "+5 hires" },
      quarterly: { value: "312", delta: 6.5, sub: "+19 hires" },
      yearly: { value: "312", delta: 22.4, sub: "+57 hires" },
    },
  },
]

const REVENUE_CHART: Record<Period, { label: string; actual: number; target: number }[]> = {
  monthly: [
    { label: "W1", actual: 0.9, target: 1.0 },
    { label: "W2", actual: 1.1, target: 1.0 },
    { label: "W3", actual: 1.0, target: 1.05 },
    { label: "W4", actual: 1.2, target: 1.1 },
  ],
  quarterly: [
    { label: "Jul", actual: 3.8, target: 4.0 },
    { label: "Aug", actual: 4.1, target: 4.0 },
    { label: "Sep", actual: 4.7, target: 4.3 },
  ],
  yearly: [
    { label: "Q1", actual: 10.4, target: 10.0 },
    { label: "Q2", actual: 11.8, target: 11.0 },
    { label: "Q3", actual: 12.6, target: 12.0 },
    { label: "Q4", actual: 14.1, target: 13.5 },
  ],
}

type DeptStatus = "On Track" | "At Risk" | "Behind"

const DEPARTMENTS: {
  name: string
  owner: string
  attainment: number
  status: DeptStatus
  trend: number
}[] = [
  { name: "Sales", owner: "M. Carter", attainment: 104, status: "On Track", trend: 6.2 },
  { name: "Marketing", owner: "L. Okafor", attainment: 91, status: "At Risk", trend: -2.1 },
  { name: "Product", owner: "S. Nguyen", attainment: 98, status: "On Track", trend: 3.4 },
  { name: "Engineering", owner: "D. Alvarez", attainment: 88, status: "At Risk", trend: 1.1 },
  { name: "Customer Success", owner: "R. Patel", attainment: 76, status: "Behind", trend: -4.5 },
  { name: "Finance", owner: "K. Brooks", attainment: 100, status: "On Track", trend: 0.8 },
]

const GOALS: { label: string; progress: number; due: string }[] = [
  { label: "Reach $50M ARR", progress: 82, due: "Dec 2026" },
  { label: "Expand to EMEA market", progress: 45, due: "Q3 2026" },
  { label: "Lift NPS above 65", progress: 68, due: "Q4 2026" },
  { label: "Reduce churn under 4%", progress: 57, due: "Ongoing" },
]

function statusVariant(status: DeptStatus): "default" | "secondary" | "outline" | "destructive" {
  if (status === "On Track") return "default"
  if (status === "At Risk") return "secondary"
  return "destructive"
}

export default function ExecutiveDashboard() {
  const [period, setPeriod] = React.useState<Period>("quarterly")
  const chart = REVENUE_CHART[period]
  const chartMax = Math.max(...chart.flatMap((d) => [d.actual, d.target])) * 1.15

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight">Northwind Corp</h1>
              <p className="text-xs text-muted-foreground">Executive Overview</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <TabsList>
                {PERIODS.map((p) => (
                  <TabsTrigger key={p.id} value={p.id}>
                    {p.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <div className="mb-8 flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">
            {PERIODS.find((p) => p.id === period)?.label} performance snapshot
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Company Health</h2>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => {
            const data = kpi.values[period]
            const up = data.delta >= 0
            const Icon = kpi.icon
            return (
              <Card key={kpi.id} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{kpi.label}</CardDescription>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold tracking-tight">{data.value}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium",
                        up ? "bg-primary/10 text-primary" : "bg-muted text-destructive"
                      )}
                    >
                      {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {up ? "+" : ""}
                      {data.delta}%
                    </span>
                    <span className="truncate text-xs text-muted-foreground">{data.sub}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue vs Target</CardTitle>
                  <CardDescription>Actual revenue against the planned target ($M)</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
                    Actual
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-muted" />
                    Target
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end justify-around gap-4 border-b border-l pl-2">
                {chart.map((d) => (
                  <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="flex h-full w-full items-end justify-center gap-1.5">
                      <div
                        className="w-1/3 rounded-t bg-muted transition-all duration-500"
                        style={{ height: (d.target / chartMax) * 100 + "%" }}
                        aria-label={d.label + " target " + d.target}
                      />
                      <div
                        className="w-1/3 rounded-t bg-primary transition-all duration-500"
                        style={{ height: (d.actual / chartMax) * 100 + "%" }}
                        aria-label={d.label + " actual " + d.actual}
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
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <CardTitle>Strategic Goals</CardTitle>
              </div>
              <CardDescription>Progress toward annual objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {GOALS.map((g) => (
                <div key={g.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{g.label}</span>
                    <span className="text-muted-foreground">{g.progress}%</span>
                  </div>
                  <Progress value={g.progress} />
                  <p className="text-xs text-muted-foreground">Target: {g.due}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Health</CardTitle>
              <CardDescription>Goal attainment and trend across teams</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Attainment</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEPARTMENTS.map((d) => {
                    const up = d.trend >= 0
                    return (
                      <TableRow key={d.name}>
                        <TableCell className="font-medium">{d.name}</TableCell>
                        <TableCell className="text-muted-foreground">{d.owner}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: Math.min(d.attainment, 100) + "%" }}
                              />
                            </div>
                            <span className="text-sm tabular-nums">{d.attainment}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center gap-0.5 text-sm tabular-nums",
                              up ? "text-primary" : "text-destructive"
                            )}
                          >
                            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                            {up ? "+" : ""}
                            {d.trend}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant={statusVariant(d.status)}>{d.status}</Badge>
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

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>Northwind Corp Executive Dashboard</span>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <span>Data refreshed daily. Figures are illustrative.</span>
        </div>
      </footer>
    </div>
  )
}
