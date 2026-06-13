"use client"

import * as React from "react"
import {
  ArrowUpRight,
  ArrowDownRight,
  Beaker,
  CheckCircle2,
  Circle,
  Clock,
  Flag,
  FlaskConical,
  Plus,
  Target,
  Trophy,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Status = "Running" | "Completed" | "Draft"

type Variant = {
  name: string
  label: string
  visitors: number
  conversions: number
  rate: number
  winner: boolean
  isControl: boolean
}

type Timeline = { date: string; label: string; done: boolean }

type Experiment = {
  id: string
  name: string
  hypothesis: string
  status: Status
  metric: string
  uplift: number
  confidence: number
  sampleSize: string
  daysRunning: number
  variants: Variant[]
  timeline: Timeline[]
}

const EXPERIMENTS: Experiment[] = [
  {
    id: "exp-checkout-cta",
    name: "Checkout CTA color & copy",
    hypothesis:
      "A higher-contrast button with urgency copy will lift completed checkouts.",
    status: "Running",
    metric: "Checkout completion",
    uplift: 14.2,
    confidence: 96,
    sampleSize: "48,210",
    daysRunning: 12,
    variants: [
      {
        name: "A",
        label: "Control — grey \"Continue\"",
        visitors: 24102,
        conversions: 2891,
        rate: 12.0,
        winner: false,
        isControl: true,
      },
      {
        name: "B",
        label: "Bold \"Buy now — free shipping\"",
        visitors: 24108,
        conversions: 3302,
        rate: 13.7,
        winner: true,
        isControl: false,
      },
    ],
    timeline: [
      { date: "May 28", label: "Experiment launched", done: true },
      { date: "Jun 02", label: "Reached 25% sample", done: true },
      { date: "Jun 09", label: "Crossed 90% confidence", done: true },
      { date: "Jun 16", label: "Significance target met", done: false },
    ],
  },
  {
    id: "exp-pricing-table",
    name: "Pricing table layout",
    hypothesis:
      "Highlighting the annual plan as \"Most popular\" will shift users to annual billing.",
    status: "Completed",
    metric: "Annual plan signups",
    uplift: 23.8,
    confidence: 99,
    sampleSize: "31,640",
    daysRunning: 21,
    variants: [
      {
        name: "A",
        label: "Control — flat 3-column grid",
        visitors: 15780,
        conversions: 1262,
        rate: 8.0,
        winner: false,
        isControl: true,
      },
      {
        name: "B",
        label: "Annual highlighted + badge",
        visitors: 15860,
        conversions: 1571,
        rate: 9.9,
        winner: true,
        isControl: false,
      },
    ],
    timeline: [
      { date: "May 01", label: "Experiment launched", done: true },
      { date: "May 10", label: "Reached 50% sample", done: true },
      { date: "May 18", label: "Crossed 95% confidence", done: true },
      { date: "May 22", label: "Winner shipped to 100%", done: true },
    ],
  },
  {
    id: "exp-onboarding",
    name: "Onboarding step count",
    hypothesis:
      "Collapsing 5 onboarding steps into 3 will increase activation rate.",
    status: "Running",
    metric: "Day-1 activation",
    uplift: -2.4,
    confidence: 61,
    sampleSize: "12,905",
    daysRunning: 5,
    variants: [
      {
        name: "A",
        label: "Control — 5-step wizard",
        visitors: 6440,
        conversions: 2447,
        rate: 38.0,
        winner: false,
        isControl: true,
      },
      {
        name: "B",
        label: "Condensed 3-step wizard",
        visitors: 6465,
        conversions: 2398,
        rate: 37.1,
        winner: false,
        isControl: false,
      },
    ],
    timeline: [
      { date: "Jun 09", label: "Experiment launched", done: true },
      { date: "Jun 12", label: "Reached 25% sample", done: true },
      { date: "Jun 19", label: "Confidence checkpoint", done: false },
      { date: "Jun 26", label: "Decision review", done: false },
    ],
  },
  {
    id: "exp-homepage-hero",
    name: "Homepage hero headline",
    hypothesis:
      "A benefit-led headline will outperform the current feature-led one on demo requests.",
    status: "Draft",
    metric: "Demo requests",
    uplift: 0,
    confidence: 0,
    sampleSize: "0",
    daysRunning: 0,
    variants: [
      {
        name: "A",
        label: "Control — \"Ship UI faster\"",
        visitors: 0,
        conversions: 0,
        rate: 0,
        winner: false,
        isControl: true,
      },
      {
        name: "B",
        label: "\"Cut design time in half\"",
        visitors: 0,
        conversions: 0,
        rate: 0,
        winner: false,
        isControl: false,
      },
    ],
    timeline: [
      { date: "Jun 14", label: "Draft created", done: true },
      { date: "—", label: "QA variants", done: false },
      { date: "—", label: "Schedule launch", done: false },
      { date: "—", label: "Go live", done: false },
    ],
  },
]

const STATUS_TABS = ["All", "Running", "Completed", "Draft"] as const
type StatusTab = (typeof STATUS_TABS)[number]

function statusBadge(status: Status) {
  if (status === "Running")
    return (
      <Badge className="gap-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-foreground" />
        </span>
        Running
      </Badge>
    )
  if (status === "Completed")
    return (
      <Badge variant="secondary" className="gap-1">
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
        Completed
      </Badge>
    )
  return (
    <Badge variant="outline" className="gap-1">
      <Circle className="h-3 w-3" aria-hidden="true" />
      Draft
    </Badge>
  )
}

export default function AbTestingDashboard() {
  const [filter, setFilter] = React.useState<StatusTab>("All")
  const [selectedId, setSelectedId] = React.useState(EXPERIMENTS[0].id)

  const filtered =
    filter === "All"
      ? EXPERIMENTS
      : EXPERIMENTS.filter((e) => e.status === filter)

  const selected =
    EXPERIMENTS.find((e) => e.id === selectedId) ?? EXPERIMENTS[0]

  React.useEffect(() => {
    if (!filtered.some((e) => e.id === selectedId) && filtered.length > 0) {
      setSelectedId(filtered[0].id)
    }
  }, [filter, filtered, selectedId])

  const maxRate = Math.max(...selected.variants.map((v) => v.rate), 1)
  const upliftUp = selected.uplift >= 0
  const hasData = selected.status !== "Draft"

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Splitwise Experiments</span>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Production
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="hidden sm:inline-flex">
              Documentation
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" aria-hidden="true" />
              New experiment
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Experiment results
            </h1>
            <p className="text-sm text-muted-foreground">
              Compare variants, track significance and pick winners with
              confidence.
            </p>
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as StatusTab)}>
            <TabsList>
              {STATUS_TABS.map((t) => (
                <TabsTrigger key={t} value={t}>
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          {/* Experiments list */}
          <aside className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Experiments
              </span>
              <span className="text-xs tabular-nums text-muted-foreground">
                {filtered.length}
              </span>
            </div>
            {filtered.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No experiments in this status.
                </CardContent>
              </Card>
            ) : (
              filtered.map((exp) => {
                const active = exp.id === selected.id
                const up = exp.uplift >= 0
                return (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedId(exp.id)}
                    className={cn(
                      "rounded-lg border bg-card p-4 text-left transition-colors hover:bg-accent",
                      active && "border-primary ring-1 ring-primary"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm font-medium leading-snug">
                        {exp.name}
                      </span>
                      {exp.variants.some((v) => v.winner) && (
                        <Trophy
                          className="h-4 w-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      {statusBadge(exp.status)}
                      {exp.status !== "Draft" && (
                        <span
                          className={cn(
                            "flex items-center gap-0.5 text-xs font-medium tabular-nums",
                            up ? "text-primary" : "text-destructive"
                          )}
                        >
                          {up ? (
                            <ArrowUpRight
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          ) : (
                            <ArrowDownRight
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          )}
                          {up ? "+" : ""}
                          {exp.uplift}%
                        </span>
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </aside>

          {/* Selected experiment results */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {selected.name}
                  </h2>
                  {statusBadge(selected.status)}
                </div>
                <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
                  <Beaker
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {selected.hypothesis}
                </p>
              </div>
              <Button
                size="sm"
                variant={selected.status === "Draft" ? "default" : "outline"}
                className="shrink-0"
              >
                {selected.status === "Draft"
                  ? "Launch experiment"
                  : selected.status === "Running"
                    ? "Declare winner"
                    : "View report"}
              </Button>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                    <Target
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Uplift
                  </CardDescription>
                  <CardTitle
                    className={cn(
                      "text-3xl tabular-nums",
                      hasData
                        ? upliftUp
                          ? "text-primary"
                          : "text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    {hasData ? `${upliftUp ? "+" : ""}${selected.uplift}%` : "—"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-muted-foreground">
                    vs. control
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                    <Flag
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Confidence
                  </CardDescription>
                  <CardTitle className="text-3xl tabular-nums">
                    {hasData ? `${selected.confidence}%` : "—"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {hasData ? (
                    <Progress value={selected.confidence} className="h-1.5" />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Not started
                    </span>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                    <Users
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Sample size
                  </CardDescription>
                  <CardTitle className="text-3xl tabular-nums">
                    {selected.sampleSize}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-muted-foreground">
                    total visitors
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                    <Clock
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Duration
                  </CardDescription>
                  <CardTitle className="text-3xl tabular-nums">
                    {selected.daysRunning}
                    <span className="text-base font-normal text-muted-foreground">
                      {" "}
                      d
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-xs text-muted-foreground">
                    {selected.metric}
                  </span>
                </CardContent>
              </Card>
            </div>

            {/* Variants comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Variants comparison</CardTitle>
                <CardDescription>
                  Conversion rate on {selected.metric.toLowerCase()}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {selected.variants.map((v) => (
                  <div key={v.name} className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold",
                            v.winner
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {v.name}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {v.label}
                            </span>
                            {v.isControl && (
                              <Badge variant="outline" className="h-5 text-[10px]">
                                Control
                              </Badge>
                            )}
                            {v.winner && (
                              <Badge className="h-5 gap-1 text-[10px]">
                                <Trophy
                                  className="h-3 w-3"
                                  aria-hidden="true"
                                />
                                Winner
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs tabular-nums text-muted-foreground">
                            {v.conversions.toLocaleString()} /{" "}
                            {v.visitors.toLocaleString()} converted
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-semibold tabular-nums">
                        {v.rate}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          v.winner ? "bg-primary" : "bg-primary/40"
                        )}
                        style={{ width: `${(v.rate / maxRate) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Experiment timeline</CardTitle>
                <CardDescription>
                  Key milestones from launch to decision.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative">
                  {selected.timeline.map((step, i) => (
                    <li key={i} className="flex gap-4 pb-6 last:pb-0">
                      <div className="relative flex flex-col items-center">
                        <span
                          className={cn(
                            "z-10 flex h-6 w-6 items-center justify-center rounded-full border-2",
                            step.done
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted-foreground/30 bg-background text-muted-foreground"
                          )}
                        >
                          {step.done ? (
                            <CheckCircle2
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                          ) : (
                            <Circle className="h-3 w-3" aria-hidden="true" />
                          )}
                        </span>
                        {i < selected.timeline.length - 1 && (
                          <span
                            className={cn(
                              "absolute top-6 h-full w-0.5",
                              step.done ? "bg-primary" : "bg-border"
                            )}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 items-center justify-between pt-0.5">
                        <span
                          className={cn(
                            "text-sm",
                            step.done
                              ? "font-medium"
                              : "text-muted-foreground"
                          )}
                        >
                          {step.label}
                        </span>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {step.date}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span className="flex items-center gap-1.5">
            <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
            Splitwise Experiments — statistical significance at 95% threshold.
          </span>
          <span className="tabular-nums">{EXPERIMENTS.length} experiments tracked</span>
        </div>
      </footer>
    </div>
  )
}
