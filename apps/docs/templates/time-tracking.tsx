"use client"

import * as React from "react"
import {
  BarChart3,
  CalendarDays,
  Clock,
  FolderKanban,
  LayoutDashboard,
  Pause,
  Play,
  Plus,
  Settings,
  Square,
  Timer,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Timesheets", icon: CalendarDays, active: false },
  { label: "Projects", icon: FolderKanban, active: false },
  { label: "Reports", icon: BarChart3, active: false },
  { label: "Settings", icon: Settings, active: false },
]

const PROJECTS = [
  { name: "Acme Redesign", client: "Acme Inc.", color: "bg-primary" },
  { name: "Mobile App v2", client: "Northwind", color: "bg-foreground" },
  { name: "Marketing Site", client: "Lumen Co.", color: "bg-muted-foreground" },
]

const ENTRIES = [
  { task: "Design system audit", project: "Acme Redesign", start: "09:12", end: "10:48", dur: "1h 36m", running: false },
  { task: "API integration", project: "Mobile App v2", start: "11:05", end: "12:30", dur: "1h 25m", running: false },
  { task: "Landing hero section", project: "Marketing Site", start: "13:15", end: "14:02", dur: "0h 47m", running: false },
  { task: "Component refactor", project: "Acme Redesign", start: "14:40", end: "—", dur: "live", running: true },
]

const WEEK = [
  { day: "Mon", hours: 6.5 },
  { day: "Tue", hours: 7.2 },
  { day: "Wed", hours: 5.8 },
  { day: "Thu", hours: 8.1 },
  { day: "Fri", hours: 4.4 },
  { day: "Sat", hours: 1.2 },
  { day: "Sun", hours: 0 },
]

const BREAKDOWN = [
  { name: "Acme Redesign", hours: 14.2, pct: 46, color: "bg-primary" },
  { name: "Mobile App v2", hours: 9.6, pct: 31, color: "bg-foreground" },
  { name: "Marketing Site", hours: 7.1, pct: 23, color: "bg-muted-foreground" },
]

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

export default function TimeTracking() {
  const [running, setRunning] = React.useState(false)
  const [seconds, setSeconds] = React.useState(2 * 3600 + 14 * 60 + 38)
  const [project, setProject] = React.useState(PROJECTS[0].name)

  React.useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [running])

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const maxHours = Math.max(...WEEK.map((d) => d.hours), 1)
  const weekTotal = WEEK.reduce((a, b) => a + b.hours, 0)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-card lg:flex">
        <div className="flex items-center gap-2 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Timer className="h-5 w-5" />
          </div>
          <span className="text-base font-semibold tracking-tight">Tempo</span>
        </div>
        <Separator />
        <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
          {NAV.map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="flex items-center gap-3 px-4 py-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Jamie Doe</p>
            <p className="truncate text-xs text-muted-foreground">Freelancer</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background/95 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Today</h1>
            <p className="text-sm text-muted-foreground">Thursday, June 13</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {weekTotal.toFixed(1)}h this week
            </Badge>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              New entry
            </Button>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-6">
          <Card className="overflow-hidden">
            <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                    running ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  )}
                >
                  <Timer className="h-7 w-7" />
                </div>
                <div>
                  <div className="font-mono text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
                    {pad(h)}:{pad(m)}:{pad(s)}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {running ? "Tracking" : "Paused"} on{" "}
                    <span className="font-medium text-foreground">{project}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {PROJECTS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setProject(p.name)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        project === p.name
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <span className={cn("h-2 w-2 rounded-full", p.color)} />
                      {p.name}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="lg"
                    variant={running ? "secondary" : "default"}
                    className="gap-2"
                    onClick={() => setRunning((r) => !r)}
                  >
                    {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {running ? "Pause" : "Start"}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2"
                    aria-label="Stop timer"
                    onClick={() => {
                      setRunning(false)
                      setSeconds(0)
                    }}
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Today's entries</CardTitle>
                <CardDescription>Logged sessions for June 13</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {ENTRIES.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-4 rounded-md px-2 py-3 hover:bg-muted/30"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                          e.running ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Clock className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{e.task}</p>
                        <p className="truncate text-xs text-muted-foreground">{e.project}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <span className="hidden text-xs text-muted-foreground sm:inline">
                        {e.start} – {e.end}
                      </span>
                      {e.running ? (
                        <Badge className="gap-1.5">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" />
                          Live
                        </Badge>
                      ) : (
                        <span className="font-mono text-sm font-medium tabular-nums">{e.dur}</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">This week</CardTitle>
                <CardDescription>{weekTotal.toFixed(1)} hours tracked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-44 items-end justify-between gap-2">
                  {WEEK.map((d) => (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className="w-full rounded-t-md bg-primary/80 transition-all"
                          style={{ height: `${Math.max((d.hours / maxHours) * 100, 4)}%` }}
                          aria-label={`${d.day}: ${d.hours} hours`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Projects breakdown</CardTitle>
              <CardDescription>Hours by project this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {BREAKDOWN.map((p) => (
                <div key={p.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={cn("h-2.5 w-2.5 rounded-full", p.color)} />
                      <span className="font-medium">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="font-mono tabular-nums">{p.hours.toFixed(1)}h</span>
                      <span className="w-8 text-right">{p.pct}%</span>
                    </div>
                  </div>
                  <Progress value={p.pct} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick log</CardTitle>
              <CardDescription>Add a manual time entry</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row">
              <Input placeholder="What did you work on?" className="flex-1" />
              <Input placeholder="2h 30m" className="sm:w-32" />
              <Button className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
