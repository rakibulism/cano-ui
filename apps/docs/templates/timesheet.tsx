"use client"
import * as React from "react"
import { Clock, Filter, ChevronLeft, ChevronRight, Send, CheckCircle2, CalendarDays, TimerReset, FolderKanban } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

type WeekKey = "w1" | "w2" | "w3"

const WEEKS: { key: WeekKey; label: string; range: string }[] = [
  { key: "w1", label: "Week 23", range: "Jun 2 – Jun 8" },
  { key: "w2", label: "Week 24", range: "Jun 9 – Jun 15" },
  { key: "w3", label: "Week 25", range: "Jun 16 – Jun 22" },
]

const CLIENTS = ["All clients", "Northwind", "Acme Co", "Internal"] as const

type Project = {
  id: string
  name: string
  client: (typeof CLIENTS)[number]
  code: string
}

const PROJECTS: Project[] = [
  { id: "p1", name: "Dashboard redesign", client: "Northwind", code: "NW-204" },
  { id: "p2", name: "Mobile checkout", client: "Acme Co", code: "AC-118" },
  { id: "p3", name: "Design system", client: "Internal", code: "IN-007" },
  { id: "p4", name: "API migration", client: "Northwind", code: "NW-231" },
  { id: "p5", name: "Onboarding flow", client: "Acme Co", code: "AC-145" },
]

type Grid = Record<WeekKey, Record<string, number[]>>

const SEED: Grid = {
  w1: {
    p1: [3, 4, 2, 0, 1, 0, 0],
    p2: [2, 2, 3, 4, 2, 0, 0],
    p3: [1, 0, 2, 1, 1, 0, 0],
    p4: [0, 1, 0, 2, 3, 0, 0],
    p5: [2, 1, 1, 1, 1, 0, 0],
  },
  w2: {
    p1: [4, 4, 3, 3, 2, 0, 0],
    p2: [1, 2, 2, 2, 3, 0, 0],
    p3: [2, 1, 1, 0, 1, 0, 0],
    p4: [0, 0, 2, 3, 2, 0, 0],
    p5: [1, 1, 0, 1, 2, 0, 0],
  },
  w3: {
    p1: [0, 2, 1, 0, 0, 0, 0],
    p2: [0, 0, 0, 0, 0, 0, 0],
    p3: [3, 2, 0, 0, 0, 0, 0],
    p4: [0, 0, 0, 0, 0, 0, 0],
    p5: [1, 0, 0, 0, 0, 0, 0],
  },
}

export default function TimesheetTemplate() {
  const [week, setWeek] = React.useState<WeekKey>("w2")
  const [client, setClient] = React.useState<(typeof CLIENTS)[number]>("All clients")
  const [grid, setGrid] = React.useState<Grid>(SEED)
  const [submitted, setSubmitted] = React.useState<Record<WeekKey, boolean>>({ w1: true, w2: false, w3: false })

  const weekIndex = WEEKS.findIndex((w) => w.key === week)
  const activeWeek = WEEKS[weekIndex]

  const visibleProjects = PROJECTS.filter((p) => client === "All clients" || p.client === client)

  const projectTotal = (pid: string) => grid[week][pid].reduce((a, b) => a + b, 0)
  const dayTotal = (dayIdx: number) =>
    visibleProjects.reduce((sum, p) => sum + grid[week][p.id][dayIdx], 0)
  const weekTotal = visibleProjects.reduce((sum, p) => sum + projectTotal(p.id), 0)
  const billableTotal = visibleProjects
    .filter((p) => p.client !== "Internal")
    .reduce((sum, p) => sum + projectTotal(p.id), 0)
  const targetHours = 40
  const remaining = Math.max(targetHours - weekTotal, 0)

  const setHour = (pid: string, dayIdx: number, raw: string) => {
    const val = Math.max(0, Math.min(24, Number(raw) || 0))
    setGrid((prev) => {
      const nextDays = [...prev[week][pid]]
      nextDays[dayIdx] = val
      return { ...prev, [week]: { ...prev[week], [pid]: nextDays } }
    })
    setSubmitted((prev) => ({ ...prev, [week]: false }))
  }

  const shiftWeek = (dir: -1 | 1) => {
    const next = WEEKS[weekIndex + dir]
    if (next) setWeek(next.key)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TimerReset className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Hourly</p>
              <p className="mt-1 text-xs text-muted-foreground">Weekly timesheet</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <Button variant="ghost" size="sm">Timesheet</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Reports</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Projects</Button>
          </nav>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden sm:inline-flex">{activeWeek.range}</Badge>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="" />
              <AvatarFallback>RM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">My timesheet</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Log hours per project for {activeWeek.label} · {activeWeek.range}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border bg-card p-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Previous week"
                onClick={() => shiftWeek(-1)}
                disabled={weekIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {WEEKS.map((w) => (
                <button
                  key={w.key}
                  onClick={() => setWeek(w.key)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    week === w.key
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  {w.label}
                </button>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label="Next week"
                onClick={() => shiftWeek(1)}
                disabled={weekIndex === WEEKS.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Total logged
              </CardDescription>
              <CardTitle className="text-3xl tabular-nums">{weekTotal}h</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">
              of {targetHours}h weekly target
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <FolderKanban className="h-3.5 w-3.5" /> Billable
              </CardDescription>
              <CardTitle className="text-3xl tabular-nums">{billableTotal}h</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">
              {weekTotal > 0 ? Math.round((billableTotal / weekTotal) * 100) : 0}% of logged time
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> Remaining
              </CardDescription>
              <CardTitle className="text-3xl tabular-nums">{remaining}h</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">
              to reach your target
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" /> Status
              </CardDescription>
              <CardTitle className="text-xl">
                {submitted[week] ? (
                  <Badge className="text-sm">Submitted</Badge>
                ) : (
                  <Badge variant="secondary" className="text-sm">Draft</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground">
              {submitted[week] ? "Awaiting approval" : "Not yet submitted"}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 border-b">
            <div>
              <CardTitle className="text-base">Hours by project</CardTitle>
              <CardDescription>Click a cell to edit logged hours</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-1">
                {CLIENTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setClient(c)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      client === c
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Project</th>
                    {WEEKDAYS.map((d) => (
                      <th key={d} className="px-2 py-3 text-center font-medium text-muted-foreground">
                        {d}
                      </th>
                    ))}
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.map((p) => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-medium">{p.name}</div>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="rounded bg-muted px-1.5 py-0.5 font-mono">{p.code}</span>
                          <span>{p.client}</span>
                        </div>
                      </td>
                      {WEEKDAYS.map((d, di) => (
                        <td key={d} className="px-1.5 py-2 text-center">
                          <Input
                            type="number"
                            min={0}
                            max={24}
                            value={grid[week][p.id][di] === 0 ? "" : grid[week][p.id][di]}
                            placeholder="0"
                            onChange={(e) => setHour(p.id, di, e.target.value)}
                            aria-label={`${p.name} hours on ${d}`}
                            className={cn(
                              "mx-auto h-9 w-14 text-center tabular-nums",
                              di >= 5 && "bg-muted/40"
                            )}
                          />
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right font-semibold tabular-nums">
                        {projectTotal(p.id)}h
                      </td>
                    </tr>
                  ))}
                  {visibleProjects.length === 0 && (
                    <tr>
                      <td colSpan={WEEKDAYS.length + 2} className="px-4 py-10 text-center text-muted-foreground">
                        No projects for this client.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t bg-muted/30 font-semibold">
                    <td className="px-4 py-3 text-muted-foreground">Daily total</td>
                    {WEEKDAYS.map((d, di) => (
                      <td key={d} className="px-2 py-3 text-center tabular-nums">
                        {dayTotal(di)}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right tabular-nums text-primary">{weekTotal}h</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {submitted[week] ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Clock className="h-5 w-5" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium">
                {submitted[week]
                  ? `${activeWeek.label} submitted for approval`
                  : `${weekTotal}h logged across ${visibleProjects.length} projects`}
              </p>
              <p className="text-xs text-muted-foreground">
                {submitted[week]
                  ? "You can still reopen and edit before it's approved."
                  : "Review your entries, then submit for your manager to approve."}
              </p>
            </div>
          </div>
          <Separator className="sm:hidden" />
          <div className="flex w-full items-center gap-2 sm:w-auto">
            {submitted[week] ? (
              <Button
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => setSubmitted((prev) => ({ ...prev, [week]: false }))}
              >
                Reopen week
              </Button>
            ) : (
              <Button
                className="flex-1 sm:flex-none"
                disabled={weekTotal === 0}
                onClick={() => setSubmitted((prev) => ({ ...prev, [week]: true }))}
              >
                <Send className="mr-2 h-4 w-4" /> Submit week
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
