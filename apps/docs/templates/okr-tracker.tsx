"use client"

import * as React from "react"
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CircleSlash,
  Plus,
  ChevronRight,
  Flag,
  Users,
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
import { Separator } from "@/components/ui/separator"

type Health = "on-track" | "at-risk" | "off-track"

type KeyResult = {
  id: string
  title: string
  owner: string
  progress: number
  health: Health
  current: string
  target: string
}

type Objective = {
  id: string
  title: string
  description: string
  team: string
  quarter: string
  lead: string
  progress: number
  keyResults: KeyResult[]
}

const QUARTERS = ["Q1 2026", "Q2 2026", "Q3 2026"] as const

const TEAMS = [
  { id: "all", label: "All teams" },
  { id: "Product", label: "Product" },
  { id: "Growth", label: "Growth" },
  { id: "Engineering", label: "Engineering" },
  { id: "Revenue", label: "Revenue" },
] as const

const HEALTH_META: Record<
  Health,
  { label: string; icon: React.ElementType; dot: string }
> = {
  "on-track": { label: "On track", icon: TrendingUp, dot: "bg-primary" },
  "at-risk": { label: "At risk", icon: AlertTriangle, dot: "bg-foreground/40" },
  "off-track": {
    label: "Off track",
    icon: CircleSlash,
    dot: "bg-destructive",
  },
}

const OBJECTIVES: Objective[] = [
  {
    id: "o1",
    title: "Make onboarding the fastest in the category",
    description: "Cut the time to first value and raise activation across new accounts.",
    team: "Product",
    quarter: "Q2 2026",
    lead: "Priya Anand",
    progress: 72,
    keyResults: [
      { id: "k1", title: "Reduce median time-to-value to under 10 min", owner: "PA", progress: 80, health: "on-track", current: "11m", target: "10m" },
      { id: "k2", title: "Lift 7-day activation rate to 55%", owner: "DM", progress: 68, health: "on-track", current: "49%", target: "55%" },
      { id: "k3", title: "Ship guided setup checklist to 100% of signups", owner: "PA", progress: 90, health: "on-track", current: "92%", target: "100%" },
    ],
  },
  {
    id: "o2",
    title: "Build a repeatable, efficient growth engine",
    description: "Diversify acquisition and improve the economics of every channel.",
    team: "Growth",
    quarter: "Q2 2026",
    lead: "Marcus Lee",
    progress: 41,
    keyResults: [
      { id: "k4", title: "Grow organic signups by 40% QoQ", owner: "ML", progress: 35, health: "at-risk", current: "+14%", target: "+40%" },
      { id: "k5", title: "Lower blended CAC to $180", owner: "ML", progress: 52, health: "at-risk", current: "$214", target: "$180" },
      { id: "k6", title: "Launch 3 partner co-marketing campaigns", owner: "SR", progress: 33, health: "off-track", current: "1", target: "3" },
    ],
  },
  {
    id: "o3",
    title: "Reach best-in-class platform reliability",
    description: "Harden the platform so customers trust us with mission-critical work.",
    team: "Engineering",
    quarter: "Q2 2026",
    lead: "Hana Sato",
    progress: 88,
    keyResults: [
      { id: "k7", title: "Sustain 99.95% monthly uptime", owner: "HS", progress: 96, health: "on-track", current: "99.94%", target: "99.95%" },
      { id: "k8", title: "Cut p95 API latency to 120ms", owner: "TO", progress: 84, health: "on-track", current: "138ms", target: "120ms" },
      { id: "k9", title: "Close all critical security findings", owner: "HS", progress: 85, health: "on-track", current: "17/20", target: "20/20" },
    ],
  },
  {
    id: "o4",
    title: "Accelerate expansion revenue",
    description: "Turn existing customers into our largest source of net-new ARR.",
    team: "Revenue",
    quarter: "Q2 2026",
    lead: "Devon Carter",
    progress: 23,
    keyResults: [
      { id: "k10", title: "Reach 118% net revenue retention", owner: "DC", progress: 30, health: "off-track", current: "104%", target: "118%" },
      { id: "k11", title: "Convert 25 accounts to enterprise tier", owner: "DC", progress: 28, health: "at-risk", current: "7", target: "25" },
      { id: "k12", title: "Launch usage-based add-on pricing", owner: "JN", progress: 12, health: "off-track", current: "Scoping", target: "GA" },
    ],
  },
  {
    id: "o5",
    title: "Plan the next major product surface",
    description: "Lay the research and design foundations for the Q3 platform bet.",
    team: "Product",
    quarter: "Q3 2026",
    lead: "Priya Anand",
    progress: 18,
    keyResults: [
      { id: "k13", title: "Complete 30 discovery interviews", owner: "PA", progress: 40, health: "on-track", current: "12", target: "30" },
      { id: "k14", title: "Validate 2 prototypes with design partners", owner: "DM", progress: 10, health: "at-risk", current: "0", target: "2" },
    ],
  },
  {
    id: "o6",
    title: "Tighten the funnel before scaling spend",
    description: "Fix conversion leaks so paid growth compounds in Q3.",
    team: "Growth",
    quarter: "Q1 2026",
    lead: "Marcus Lee",
    progress: 94,
    keyResults: [
      { id: "k15", title: "Lift landing page conversion to 6%", owner: "ML", progress: 100, health: "on-track", current: "6.3%", target: "6%" },
      { id: "k16", title: "Reduce signup drop-off to under 20%", owner: "SR", progress: 88, health: "on-track", current: "22%", target: "20%" },
    ],
  },
]

function healthOf(progress: number): Health {
  if (progress >= 70) return "on-track"
  if (progress >= 40) return "at-risk"
  return "off-track"
}

export default function OkrTrackerPage() {
  const [quarter, setQuarter] = React.useState<string>("Q2 2026")
  const [team, setTeam] = React.useState<string>("all")

  const filtered = React.useMemo(() => {
    return OBJECTIVES.filter(
      (o) =>
        o.quarter === quarter && (team === "all" || o.team === team)
    )
  }, [quarter, team])

  const summary = React.useMemo(() => {
    const counts = { "on-track": 0, "at-risk": 0, "off-track": 0 } as Record<Health, number>
    for (const o of filtered) counts[healthOf(o.progress)] += 1
    const avg =
      filtered.length === 0
        ? 0
        : Math.round(
            filtered.reduce((s, o) => s + o.progress, 0) / filtered.length
          )
    return { counts, avg, total: filtered.length }
  }, [filtered])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Northstar</p>
              <p className="text-xs text-muted-foreground">OKR Tracker</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center -space-x-2 sm:flex">
              {["PA", "ML", "HS", "DC"].map((i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-background">
                  <AvatarFallback className="bg-muted text-xs">{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              New objective
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Company OKRs</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Tracking measurable outcomes across every team this quarter.
            </p>
          </div>
          <div
            className="inline-flex items-center rounded-lg border bg-muted/30 p-1"
            role="tablist"
            aria-label="Select quarter"
          >
            {QUARTERS.map((q) => (
              <button
                key={q}
                role="tab"
                aria-selected={quarter === q}
                onClick={() => setQuarter(q)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  quarter === q
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Avg. progress</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{summary.avg}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={summary.avg} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {summary.total} objective{summary.total === 1 ? "" : "s"} in view
              </p>
            </CardContent>
          </Card>

          {(["on-track", "at-risk", "off-track"] as Health[]).map((h) => {
            const meta = HEALTH_META[h]
            const Icon = meta.icon
            return (
              <Card key={h}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{meta.label}</CardDescription>
                    <span className={cn("h-2.5 w-2.5 rounded-full", meta.dot)} />
                  </div>
                  <CardTitle className="text-3xl tabular-nums">
                    {summary.counts[h]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    objectives
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Team
          </span>
          {TEAMS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTeam(t.id)}
              aria-pressed={team === t.id}
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                team === t.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          {filtered.map((o) => {
            const oHealth = healthOf(o.progress)
            const oMeta = HEALTH_META[oHealth]
            return (
              <Card key={o.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent">
                        <Flag className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-base">{o.title}</CardTitle>
                          <Badge variant="secondary">{o.team}</Badge>
                        </div>
                        <CardDescription className="mt-1">
                          {o.description}
                        </CardDescription>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="bg-muted text-[10px]">
                              {o.lead
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          Owned by {o.lead}
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 sm:w-44 sm:flex-col sm:items-end">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          oHealth === "on-track" && "bg-primary/10 text-primary",
                          oHealth === "at-risk" && "bg-muted text-foreground",
                          oHealth === "off-track" &&
                            "bg-destructive/10 text-destructive"
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", oMeta.dot)} />
                        {oMeta.label}
                      </span>
                      <div className="flex items-center gap-2 sm:w-full sm:flex-col sm:items-end">
                        <span className="text-sm font-semibold tabular-nums">
                          {o.progress}%
                        </span>
                        <Progress value={o.progress} className="h-2 w-24 sm:w-full" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {o.keyResults.map((kr) => {
                      const m = HEALTH_META[kr.health]
                      return (
                        <li
                          key={kr.id}
                          className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/30"
                        >
                          <span
                            className={cn("h-2 w-2 shrink-0 rounded-full", m.dot)}
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{kr.title}</p>
                            <p className="text-xs text-muted-foreground tabular-nums">
                              {kr.current} of {kr.target}
                            </p>
                          </div>
                          <div className="hidden w-40 items-center gap-3 sm:flex">
                            <Progress value={kr.progress} className="h-1.5" />
                            <span className="w-9 text-right text-xs font-medium tabular-nums">
                              {kr.progress}%
                            </span>
                          </div>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-muted text-[10px]">
                              {kr.owner}
                            </AvatarFallback>
                          </Avatar>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </li>
                      )
                    })}
                  </ul>
                </CardContent>
              </Card>
            )
          })}

          {filtered.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Target className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">No objectives here yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    No objectives for this team in {quarter}.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setTeam("all")}>
                  Clear team filter
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Northstar OKR Tracker</p>
          <p>Last synced for {quarter}</p>
        </div>
      </footer>
    </div>
  )
}
