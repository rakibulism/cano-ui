"use client"
import * as React from "react"
import { Users, AlertTriangle, Gauge, CalendarDays, Filter, Mail, MoreHorizontal, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

type Member = {
  id: string
  name: string
  role: string
  initials: string
  project: string
  availability: string
  weekly: Record<string, number>
}

const WEEKS = [
  { id: "w24", label: "Jun 10 - 14" },
  { id: "w25", label: "Jun 17 - 21" },
  { id: "w26", label: "Jun 24 - 28" },
  { id: "w27", label: "Jul 1 - 5" },
] as const

const PROJECTS = [
  { id: "all", label: "All projects" },
  { id: "atlas", label: "Atlas Rebrand" },
  { id: "orbit", label: "Orbit Mobile" },
  { id: "ledger", label: "Ledger API" },
] as const

const MEMBERS: Member[] = [
  { id: "1", name: "Priya Nair", role: "Product Designer", initials: "PN", project: "atlas", availability: "Full-time", weekly: { w24: 92, w25: 78, w26: 64, w27: 50 } },
  { id: "2", name: "Marcus Webb", role: "Frontend Engineer", initials: "MW", project: "orbit", availability: "Full-time", weekly: { w24: 118, w25: 104, w26: 96, w27: 88 } },
  { id: "3", name: "Lena Fischer", role: "Backend Engineer", initials: "LF", project: "ledger", availability: "Full-time", weekly: { w24: 74, w25: 86, w26: 110, w27: 95 } },
  { id: "4", name: "Diego Romero", role: "QA Lead", initials: "DR", project: "orbit", availability: "Part-time", weekly: { w24: 48, w25: 55, w26: 62, w27: 40 } },
  { id: "5", name: "Aisha Khan", role: "UX Researcher", initials: "AK", project: "atlas", availability: "Full-time", weekly: { w24: 70, w25: 90, w26: 82, w27: 60 } },
  { id: "6", name: "Tom Becker", role: "DevOps", initials: "TB", project: "ledger", availability: "On call", weekly: { w24: 105, w25: 112, w26: 98, w27: 120 } },
]

const PROJECT_LABEL: Record<string, string> = {
  atlas: "Atlas Rebrand",
  orbit: "Orbit Mobile",
  ledger: "Ledger API",
}

function utilTone(pct: number) {
  if (pct > 100) return "text-destructive"
  if (pct >= 85) return "text-foreground"
  return "text-muted-foreground"
}

export default function ResourcePlanner() {
  const [week, setWeek] = React.useState<string>("w24")
  const [project, setProject] = React.useState<string>("all")

  const visible = React.useMemo(
    () => MEMBERS.filter((m) => project === "all" || m.project === project),
    [project]
  )

  const stats = React.useMemo(() => {
    const utils = visible.map((m) => m.weekly[week])
    const avg = utils.length ? Math.round(utils.reduce((a, b) => a + b, 0) / utils.length) : 0
    const over = utils.filter((u) => u > 100).length
    const free = visible.filter((m) => m.weekly[week] < 80).length
    return { avg, over, free, count: visible.length }
  }, [visible, week])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Capacity</p>
              <p className="text-xs text-muted-foreground">Resource Planner</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <CalendarDays className="h-4 w-4" /> Timeline
            </Button>
            <Button size="sm">Assign work</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Team capacity</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Weekly allocation across {MEMBERS.length} people. Plan ahead and spot overload early.
            </p>
          </div>
          <div className="inline-flex rounded-lg border bg-muted/30 p-1" role="group" aria-label="Select week">
            {WEEKS.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setWeek(w.id)}
                aria-pressed={week === w.id}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  week === w.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" /> Avg utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className={cn("text-3xl font-semibold tabular-nums", utilTone(stats.avg))}>{stats.avg}%</span>
                <span className="text-xs text-muted-foreground">across {stats.count} people</span>
              </div>
              <Progress value={Math.min(stats.avg, 100)} className="mt-3 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <AlertTriangle className="h-4 w-4" /> Overallocated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className={cn("text-3xl font-semibold tabular-nums", stats.over > 0 ? "text-destructive" : "text-foreground")}>
                  {stats.over}
                </span>
                <span className="text-xs text-muted-foreground">over 100% this week</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {stats.over > 0 ? "Rebalance before the sprint starts." : "Everyone is within capacity."}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4" /> Free capacity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums">{stats.free}</span>
                <span className="text-xs text-muted-foreground">people under 80%</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Room to take on new work.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> Project
          </span>
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProject(p.id)}
              aria-pressed={project === p.id}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                project === p.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <Card className="mt-4 overflow-hidden">
          <ul className="divide-y">
            {visible.map((m) => {
              const pct = m.weekly[m.id ? week : week]
              const over = pct > 100
              return (
                <li key={m.id} className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted text-xs font-medium">{m.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{m.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:w-40 sm:justify-start">
                    <Badge variant="secondary" className="font-normal">{PROJECT_LABEL[m.project]}</Badge>
                  </div>

                  <div className="flex items-center gap-2 sm:w-32">
                    <Badge variant={m.availability === "Part-time" ? "outline" : "outline"} className="font-normal text-muted-foreground">
                      {m.availability}
                    </Badge>
                  </div>

                  <div className="flex flex-1 items-center gap-3 sm:max-w-xs">
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", over ? "bg-destructive" : "bg-primary")}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <span className={cn("w-12 text-right text-sm font-semibold tabular-nums", utilTone(pct))}>
                      {pct}%
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:w-16 sm:justify-end">
                    <Button variant="ghost" size="icon" aria-label={`Email ${m.name}`}>
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label={`More options for ${m.name}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              )
            })}
            {visible.length === 0 && (
              <li className="px-5 py-12 text-center text-sm text-muted-foreground">
                No team members assigned to this project.
              </li>
            )}
          </ul>
        </Card>

        <p className="mt-4 text-xs text-muted-foreground">
          Bars show planned allocation for {WEEKS.find((w) => w.id === week)?.label}. Anything above 100% is flagged in red.
        </p>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <span>Capacity Planner</span>
          <span>Last synced from project tracker</span>
        </div>
      </footer>
    </div>
  )
}
