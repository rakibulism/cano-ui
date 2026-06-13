"use client"

import * as React from "react"
import {
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Diamond,
  Filter,
  Flag,
  ListFilter,
  Plus,
  Search,
  Settings2,
  Share2,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type ViewMode = "Weeks" | "Months"

type GroupKey = "discovery" | "design" | "build" | "launch"

type Task = {
  id: string
  name: string
  group: GroupKey
  owner: string
  initials: string
  // offset and span are expressed in timeline units (0-11), see UNIT logic below
  start: number
  span: number
  progress: number
  status: "On track" | "At risk" | "Done"
}

type Milestone = {
  id: string
  label: string
  at: number
}

const GROUPS: { key: GroupKey; label: string }[] = [
  { key: "discovery", label: "Discovery" },
  { key: "design", label: "Design" },
  { key: "build", label: "Build" },
  { key: "launch", label: "Launch" },
]

const WEEK_LABELS = ["W14", "W15", "W16", "W17", "W18", "W19", "W20", "W21", "W22", "W23", "W24", "W25"]
const MONTH_LABELS = ["Apr", "May", "Jun"]

// Tasks are authored on a 12-column "Weeks" grid. In Months view we collapse
// every 4 weeks into one month column, so positions divide cleanly by 4.
const TASKS: Task[] = [
  { id: "t1", name: "Stakeholder interviews", group: "discovery", owner: "Maya Chen", initials: "MC", start: 0, span: 2, progress: 100, status: "Done" },
  { id: "t2", name: "Competitive research", group: "discovery", owner: "Dev Patel", initials: "DP", start: 1, span: 2, progress: 100, status: "Done" },
  { id: "t3", name: "Requirements draft", group: "discovery", owner: "Maya Chen", initials: "MC", start: 2, span: 2, progress: 80, status: "On track" },
  { id: "t4", name: "Wireframes", group: "design", owner: "Lena Ruiz", initials: "LR", start: 3, span: 2, progress: 70, status: "On track" },
  { id: "t5", name: "Visual design system", group: "design", owner: "Lena Ruiz", initials: "LR", start: 4, span: 3, progress: 55, status: "On track" },
  { id: "t6", name: "Prototype + usability", group: "design", owner: "Theo Park", initials: "TP", start: 5, span: 2, progress: 40, status: "At risk" },
  { id: "t7", name: "Frontend foundation", group: "build", owner: "Sam Cole", initials: "SC", start: 6, span: 3, progress: 30, status: "On track" },
  { id: "t8", name: "API + data layer", group: "build", owner: "Dev Patel", initials: "DP", start: 6, span: 4, progress: 25, status: "At risk" },
  { id: "t9", name: "Integration + QA", group: "build", owner: "Sam Cole", initials: "SC", start: 8, span: 3, progress: 5, status: "On track" },
  { id: "t10", name: "Beta rollout", group: "launch", owner: "Theo Park", initials: "TP", start: 9, span: 2, progress: 0, status: "On track" },
  { id: "t11", name: "Marketing + GA", group: "launch", owner: "Maya Chen", initials: "MC", start: 10, span: 2, progress: 0, status: "On track" },
]

const MILESTONES: Milestone[] = [
  { id: "m1", label: "Kickoff", at: 0 },
  { id: "m2", label: "Design sign-off", at: 6 },
  { id: "m3", label: "Code complete", at: 10 },
  { id: "m4", label: "Launch", at: 12 },
]

const TEAM = [
  { name: "Maya Chen", initials: "MC" },
  { name: "Lena Ruiz", initials: "LR" },
  { name: "Dev Patel", initials: "DP" },
  { name: "Sam Cole", initials: "SC" },
  { name: "Theo Park", initials: "TP" },
]

const STATUS_STYLES: Record<Task["status"], string> = {
  "On track": "bg-primary/10 text-primary border-primary/20",
  "At risk": "bg-destructive/10 text-destructive border-destructive/20",
  Done: "bg-muted text-muted-foreground border-transparent",
}

const BAR_STYLES: Record<Task["status"], string> = {
  "On track": "bg-primary/15 border-primary/30",
  "At risk": "bg-destructive/15 border-destructive/30",
  Done: "bg-muted-foreground/20 border-muted-foreground/30",
}

const FILL_STYLES: Record<Task["status"], string> = {
  "On track": "bg-primary",
  "At risk": "bg-destructive",
  Done: "bg-muted-foreground/60",
}

export default function GanttTimeline() {
  const [view, setView] = React.useState<ViewMode>("Weeks")

  // Total grid units depends on the view mode.
  const totalUnits = view === "Weeks" ? 12 : 3
  const columns = view === "Weeks" ? WEEK_LABELS : MONTH_LABELS

  // Convert week-based authoring positions into the current view's units.
  const toUnits = (weeks: number) => (view === "Weeks" ? weeks : weeks / 4)

  const pct = (units: number) => `${(units / totalUnits) * 100}%`

  const completed = TASKS.filter((t) => t.status === "Done").length
  const avgProgress = Math.round(TASKS.reduce((s, t) => s + t.progress, 0) / TASKS.length)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CalendarRange className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold tracking-tight">Atlas Mobile App</h1>
                <Badge variant="secondary" className="font-normal">
                  Q2 Roadmap
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {completed} of {TASKS.length} tasks complete &middot; {avgProgress}% overall
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden items-center -space-x-2 sm:flex">
              {TEAM.map((m) => (
                <Avatar key={m.name} className="h-8 w-8 border-2 border-background">
                  <AvatarFallback className="bg-muted text-xs">{m.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Users className="h-4 w-4" />
              Invite
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add task
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Filter tasks" className="h-9 w-44 pl-8" />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Status</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <ListFilter className="h-4 w-4" />
              <span className="hidden sm:inline">Group</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg border bg-muted/30 p-0.5">
              {(["Weeks", "Months"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  aria-pressed={view === mode}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    view === mode
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon" aria-label="Previous period">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Next period">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Timeline settings">
              <Settings2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Share timeline">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              {/* Header row: task column + timeline scale */}
              <div className="flex border-b bg-muted/30">
                <div className="w-64 shrink-0 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Task
                </div>
                <div className="relative flex-1">
                  <div
                    className="grid"
                    style={{ gridTemplateColumns: `repeat(${totalUnits}, minmax(0, 1fr))` }}
                  >
                    {columns.map((label) => (
                      <div
                        key={label}
                        className="border-l px-2 py-3 text-center text-xs font-medium text-muted-foreground"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestone strip */}
              <div className="flex border-b bg-background">
                <div className="flex w-64 shrink-0 items-center gap-1.5 px-4 py-2 text-xs font-medium text-muted-foreground">
                  <Flag className="h-3.5 w-3.5" />
                  Milestones
                </div>
                <div className="relative flex-1 py-2">
                  {MILESTONES.map((m) => (
                    <div
                      key={m.id}
                      className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                      style={{ left: pct(toUnits(m.at)) }}
                    >
                      <Diamond className="h-3 w-3 fill-primary text-primary" />
                      <span className="mt-0.5 whitespace-nowrap text-[10px] font-medium text-muted-foreground">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task rows grouped by phase */}
              {GROUPS.map((group) => {
                const rows = TASKS.filter((t) => t.group === group.key)
                return (
                  <div key={group.key}>
                    <div className="flex items-center border-b bg-muted/20">
                      <div className="w-64 shrink-0 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-foreground">
                        {group.label}
                      </div>
                      <div className="flex-1 px-4 py-1.5 text-xs text-muted-foreground">
                        {rows.length} {rows.length === 1 ? "task" : "tasks"}
                      </div>
                    </div>

                    {rows.map((task) => (
                      <div
                        key={task.id}
                        className="group flex items-center border-b transition-colors last:border-b-0 hover:bg-muted/30"
                      >
                        <div className="flex w-64 shrink-0 items-center gap-3 px-4 py-3">
                          <Avatar className="h-7 w-7 shrink-0">
                            <AvatarFallback className="bg-muted text-[10px]">
                              {task.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{task.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{task.owner}</p>
                          </div>
                        </div>

                        <div className="relative flex-1 px-0 py-3">
                          {/* grid guide lines */}
                          <div
                            className="pointer-events-none absolute inset-0 grid"
                            style={{ gridTemplateColumns: `repeat(${totalUnits}, minmax(0, 1fr))` }}
                            aria-hidden="true"
                          >
                            {Array.from({ length: totalUnits }).map((_, i) => (
                              <div key={i} className="border-l border-border/60" />
                            ))}
                          </div>

                          {/* task bar */}
                          <div
                            className={cn(
                              "absolute top-1/2 flex h-7 -translate-y-1/2 items-center overflow-hidden rounded-md border px-2",
                              BAR_STYLES[task.status],
                            )}
                            style={{
                              left: pct(toUnits(task.start)),
                              width: pct(toUnits(task.span)),
                            }}
                          >
                            <div
                              className={cn("absolute inset-y-0 left-0 opacity-40", FILL_STYLES[task.status])}
                              style={{ width: `${task.progress}%` }}
                              aria-hidden="true"
                            />
                            <span className="relative z-10 whitespace-nowrap text-[11px] font-medium">
                              {task.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Legend + status summary */}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-semibold">Legend</h2>
            <Separator className="my-3" />
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-3 w-5 rounded border border-primary/30 bg-primary/15" />
                <span className="text-muted-foreground">On track</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-5 rounded border border-destructive/30 bg-destructive/15" />
                <span className="text-muted-foreground">At risk</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-5 rounded border border-muted-foreground/30 bg-muted-foreground/20" />
                <span className="text-muted-foreground">Done</span>
              </li>
              <li className="flex items-center gap-2">
                <Diamond className="h-3 w-3 fill-primary text-primary" />
                <span className="text-muted-foreground">Milestone</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-semibold">Overall progress</h2>
            <Separator className="my-3" />
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-3xl font-semibold tabular-nums">{avgProgress}%</span>
              <span className="text-xs text-muted-foreground">across {TASKS.length} tasks</span>
            </div>
            <Progress value={avgProgress} className="h-2" />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {GROUPS.slice(0, 3).map((g) => {
                const rows = TASKS.filter((t) => t.group === g.key)
                const avg = Math.round(rows.reduce((s, t) => s + t.progress, 0) / rows.length)
                return (
                  <div key={g.key} className="rounded-lg bg-muted/40 p-2">
                    <p className="text-sm font-semibold tabular-nums">{avg}%</p>
                    <p className="text-[11px] text-muted-foreground">{g.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <h2 className="text-sm font-semibold">Upcoming milestones</h2>
            <Separator className="my-3" />
            <ul className="space-y-3">
              {MILESTONES.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Diamond className="h-3.5 w-3.5 fill-primary text-primary" />
                    <span className="text-sm">{m.label}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-normal",
                      m.at === 12
                        ? STATUS_STYLES["At risk"]
                        : m.at <= 6
                          ? STATUS_STYLES.Done
                          : STATUS_STYLES["On track"],
                    )}
                  >
                    {view === "Weeks" ? WEEK_LABELS[Math.min(m.at, 11)] : MONTH_LABELS[Math.min(Math.floor(m.at / 4), 2)]}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
