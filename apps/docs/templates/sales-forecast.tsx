"use client"

import * as React from "react"
import {
  TrendingUp,
  Target,
  DollarSign,
  Filter,
  ChevronDown,
  Briefcase,
  CircleCheck,
  Sparkles,
  Layers,
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
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

type Quarter = "Q1" | "Q2" | "Q3" | "Q4"
type Category = "all" | "commit" | "best" | "pipeline"

const QUARTERS: { id: Quarter; label: string }[] = [
  { id: "Q1", label: "Q1 FY26" },
  { id: "Q2", label: "Q2 FY26" },
  { id: "Q3", label: "Q3 FY26" },
  { id: "Q4", label: "Q4 FY26" },
]

const QUARTER_DATA: Record<
  Quarter,
  {
    quota: number
    closed: number
    commit: number
    bestCase: number
    pipeline: number
    deltaPct: number
    stages: { name: string; value: number; deals: number }[]
  }
> = {
  Q1: {
    quota: 4200000,
    closed: 3540000,
    commit: 3980000,
    bestCase: 4460000,
    pipeline: 5120000,
    deltaPct: 8.4,
    stages: [
      { name: "Discovery", value: 1320000, deals: 22 },
      { name: "Qualified", value: 1680000, deals: 18 },
      { name: "Proposal", value: 1240000, deals: 11 },
      { name: "Negotiation", value: 880000, deals: 7 },
      { name: "Closing", value: 540000, deals: 4 },
    ],
  },
  Q2: {
    quota: 4600000,
    closed: 2880000,
    commit: 4210000,
    bestCase: 4980000,
    pipeline: 6340000,
    deltaPct: 12.1,
    stages: [
      { name: "Discovery", value: 1820000, deals: 28 },
      { name: "Qualified", value: 1540000, deals: 16 },
      { name: "Proposal", value: 1460000, deals: 12 },
      { name: "Negotiation", value: 980000, deals: 8 },
      { name: "Closing", value: 540000, deals: 5 },
    ],
  },
  Q3: {
    quota: 4800000,
    closed: 1240000,
    commit: 3120000,
    bestCase: 4640000,
    pipeline: 7180000,
    deltaPct: -3.2,
    stages: [
      { name: "Discovery", value: 2480000, deals: 34 },
      { name: "Qualified", value: 1920000, deals: 21 },
      { name: "Proposal", value: 1380000, deals: 13 },
      { name: "Negotiation", value: 820000, deals: 6 },
      { name: "Closing", value: 580000, deals: 4 },
    ],
  },
  Q4: {
    quota: 5400000,
    closed: 320000,
    commit: 2480000,
    bestCase: 5020000,
    pipeline: 9120000,
    deltaPct: 5.6,
    stages: [
      { name: "Discovery", value: 3640000, deals: 41 },
      { name: "Qualified", value: 2380000, deals: 24 },
      { name: "Proposal", value: 1680000, deals: 15 },
      { name: "Negotiation", value: 940000, deals: 7 },
      { name: "Closing", value: 480000, deals: 3 },
    ],
  },
}

const REPS: {
  name: string
  initials: string
  region: string
  commit: Record<Quarter, number>
  best: Record<Quarter, number>
  pipeline: Record<Quarter, number>
}[] = [
  {
    name: "Maya Okonkwo",
    initials: "MO",
    region: "AMER East",
    commit: { Q1: 920000, Q2: 980000, Q3: 720000, Q4: 540000 },
    best: { Q1: 1040000, Q2: 1180000, Q3: 1080000, Q4: 1240000 },
    pipeline: { Q1: 1320000, Q2: 1480000, Q3: 1640000, Q4: 2080000 },
  },
  {
    name: "Devin Russo",
    initials: "DR",
    region: "AMER West",
    commit: { Q1: 780000, Q2: 840000, Q3: 640000, Q4: 480000 },
    best: { Q1: 910000, Q2: 1020000, Q3: 960000, Q4: 1080000 },
    pipeline: { Q1: 1180000, Q2: 1340000, Q3: 1520000, Q4: 1880000 },
  },
  {
    name: "Priya Nair",
    initials: "PN",
    region: "EMEA",
    commit: { Q1: 860000, Q2: 920000, Q3: 700000, Q4: 520000 },
    best: { Q1: 980000, Q2: 1100000, Q3: 1020000, Q4: 1160000 },
    pipeline: { Q1: 1260000, Q2: 1420000, Q3: 1580000, Q4: 1960000 },
  },
  {
    name: "Tomas Berg",
    initials: "TB",
    region: "EMEA",
    commit: { Q1: 640000, Q2: 700000, Q3: 540000, Q4: 420000 },
    best: { Q1: 760000, Q2: 880000, Q3: 820000, Q4: 940000 },
    pipeline: { Q1: 980000, Q2: 1140000, Q3: 1280000, Q4: 1620000 },
  },
  {
    name: "Hana Sato",
    initials: "HS",
    region: "APAC",
    commit: { Q1: 580000, Q2: 640000, Q3: 480000, Q4: 360000 },
    best: { Q1: 700000, Q2: 800000, Q3: 740000, Q4: 860000 },
    pipeline: { Q1: 880000, Q2: 1020000, Q3: 1160000, Q4: 1480000 },
  },
]

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All categories" },
  { id: "commit", label: "Commit" },
  { id: "best", label: "Best case" },
  { id: "pipeline", label: "Pipeline" },
]

function formatMoney(n: number) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M"
  if (n >= 1000) return "$" + Math.round(n / 1000) + "K"
  return "$" + n
}

export default function SalesForecastPage() {
  const [quarter, setQuarter] = React.useState<Quarter>("Q2")
  const [category, setCategory] = React.useState<Category>("all")

  const data = QUARTER_DATA[quarter]
  const attainment = Math.round((data.closed / data.quota) * 100)
  const commitAttainment = Math.round((data.commit / data.quota) * 100)
  const gapToQuota = data.quota - data.commit
  const maxStage = Math.max(...data.stages.map((s) => s.value))

  const repTotals = REPS.map((r) => {
    const commit = r.commit[quarter]
    const best = r.best[quarter]
    const pipeline = r.pipeline[quarter]
    let highlight = commit + best + pipeline
    if (category === "commit") highlight = commit
    else if (category === "best") highlight = best
    else if (category === "pipeline") highlight = pipeline
    return { ...r, commit, best, pipeline, highlight }
  }).sort((a, b) => b.highlight - a.highlight)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Quotient</p>
              <p className="text-xs text-muted-foreground">Revenue forecasting</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {["Forecast", "Pipeline", "Reps", "Reports"].map((item, i) => (
              <Button
                key={item}
                variant={i === 0 ? "secondary" : "ghost"}
                size="sm"
                className="text-sm"
              >
                {item}
              </Button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Export
            </Button>
            <Button size="sm">Submit forecast</Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                SL
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Sales Forecast
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Quota attainment and pipeline outlook for the selected quarter.
            </p>
          </div>
          <div className="inline-flex rounded-lg border bg-muted/30 p-1">
            {QUARTERS.map((q) => (
              <button
                key={q.id}
                onClick={() => setQuarter(q.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  quarter === q.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={quarter === q.id}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-1.5">
                  <Target className="h-4 w-4" /> Quota attainment
                </CardDescription>
                <Badge variant="secondary">{attainment}%</Badge>
              </div>
              <CardTitle className="text-2xl tabular-nums">
                {formatMoney(data.closed)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={attainment} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                of {formatMoney(data.quota)} quota closed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-1.5">
                  <CircleCheck className="h-4 w-4" /> Commit
                </CardDescription>
                <Badge variant="outline">{commitAttainment}%</Badge>
              </div>
              <CardTitle className="text-2xl tabular-nums">
                {formatMoney(data.commit)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Gap to quota{" "}
                <span className="font-medium text-foreground tabular-nums">
                  {formatMoney(gapToQuota)}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> Best case
                </CardDescription>
                <Badge variant="secondary">
                  {Math.round((data.bestCase / data.quota) * 100)}%
                </Badge>
              </div>
              <CardTitle className="text-2xl tabular-nums">
                {formatMoney(data.bestCase)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Upside above commit{" "}
                <span className="font-medium text-foreground tabular-nums">
                  {formatMoney(data.bestCase - data.commit)}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4" /> Open pipeline
                </CardDescription>
                <Badge
                  variant={data.deltaPct >= 0 ? "default" : "destructive"}
                  className="tabular-nums"
                >
                  {data.deltaPct >= 0 ? "+" : ""}
                  {data.deltaPct}%
                </Badge>
              </div>
              <CardTitle className="text-2xl tabular-nums">
                {formatMoney(data.pipeline)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                vs prior quarter snapshot
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="h-4 w-4 text-muted-foreground" />
                Pipeline by stage
              </CardTitle>
              <CardDescription>
                Weighted value across {QUARTERS.find((q) => q.id === quarter)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.stages.map((stage) => (
                <div key={stage.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.name}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {formatMoney(stage.value)}{" "}
                      <span className="text-xs">· {stage.deals} deals</span>
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${Math.round((stage.value / maxStage) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Forecast roll-up</CardTitle>
              <CardDescription>Category breakdown for the quarter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Closed won", value: data.closed, tone: "bg-primary" },
                { label: "Commit", value: data.commit, tone: "bg-primary/60" },
                { label: "Best case", value: data.bestCase, tone: "bg-primary/35" },
                { label: "Pipeline", value: data.pipeline, tone: "bg-muted-foreground/40" },
              ].map((row) => {
                const max = data.pipeline
                return (
                  <div key={row.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium tabular-nums">
                        {formatMoney(row.value)}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", row.tone)}
                        style={{ width: `${Math.round((row.value / max) * 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  Deals by rep
                </CardTitle>
                <CardDescription>
                  Sorted by {CATEGORIES.find((c) => c.id === category)?.label.toLowerCase()}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:inline-flex">
                  <Filter className="h-3.5 w-3.5" /> Category
                </span>
                <div className="inline-flex flex-wrap rounded-lg border bg-muted/30 p-1">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                        category === c.id
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-pressed={category === c.id}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rep</TableHead>
                  <TableHead className="hidden sm:table-cell">Region</TableHead>
                  <TableHead
                    className={cn(
                      "text-right",
                      category === "commit" && "text-primary"
                    )}
                  >
                    Commit
                  </TableHead>
                  <TableHead
                    className={cn(
                      "text-right",
                      category === "best" && "text-primary"
                    )}
                  >
                    Best case
                  </TableHead>
                  <TableHead
                    className={cn(
                      "text-right",
                      category === "pipeline" && "text-primary"
                    )}
                  >
                    Pipeline
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repTotals.map((r) => (
                  <TableRow key={r.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted text-xs">
                            {r.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{r.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{r.region}</Badge>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right tabular-nums",
                        category === "commit"
                          ? "font-semibold text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatMoney(r.commit)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right tabular-nums",
                        category === "best"
                          ? "font-semibold text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatMoney(r.best)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right tabular-nums",
                        category === "pipeline"
                          ? "font-semibold text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {formatMoney(r.pipeline)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Quotient · Forecast as of close of business</p>
          <p>All figures in USD · Weighted pipeline model</p>
        </div>
      </footer>
    </div>
  )
}
