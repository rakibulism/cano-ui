"use client"

import * as React from "react"
import {
  Bug,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Filter,
  Flame,
  GitPullRequest,
  Plus,
  Search,
  Sparkles,
  Timer,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Member = {
  id: string
  name: string
  initials: string
}

const TEAM: Member[] = [
  { id: "ml", name: "Maya Lin", initials: "ML" },
  { id: "dk", name: "Dev Khanna", initials: "DK" },
  { id: "sr", name: "Sara Reyes", initials: "SR" },
  { id: "to", name: "Tom Okafor", initials: "TO" },
]

const MEMBER_BY_ID: Record<string, Member> = Object.fromEntries(
  TEAM.map((m) => [m.id, m]),
)

type ColumnId = "todo" | "progress" | "review" | "done"
type Priority = "Low" | "Medium" | "High"
type Kind = "feature" | "bug" | "chore"

type Story = {
  id: string
  title: string
  tag: string
  points: number
  assignee: string
  priority: Priority
  kind: Kind
  column: ColumnId
}

const STORIES: Story[] = [
  { id: "CANO-412", title: "Drag-and-drop reordering for board cards", tag: "Board", points: 8, assignee: "ml", priority: "High", kind: "feature", column: "todo" },
  { id: "CANO-418", title: "Empty state illustration for new sprints", tag: "Design", points: 3, assignee: "sr", priority: "Low", kind: "chore", column: "todo" },
  { id: "CANO-421", title: "Keyboard shortcuts for quick card creation", tag: "Board", points: 5, assignee: "dk", priority: "Medium", kind: "feature", column: "todo" },

  { id: "CANO-407", title: "Burndown chart data aggregation endpoint", tag: "API", points: 8, assignee: "dk", priority: "High", kind: "feature", column: "progress" },
  { id: "CANO-409", title: "Assignee avatars overflow on small columns", tag: "UI", points: 2, assignee: "to", priority: "Medium", kind: "bug", column: "progress" },
  { id: "CANO-415", title: "Sprint capacity planning sidebar", tag: "Planning", points: 5, assignee: "ml", priority: "Medium", kind: "feature", column: "progress" },

  { id: "CANO-401", title: "Realtime card updates over WebSocket", tag: "API", points: 13, assignee: "sr", priority: "High", kind: "feature", column: "review" },
  { id: "CANO-404", title: "Story point estimate validation", tag: "API", points: 3, assignee: "to", priority: "Low", kind: "bug", column: "review" },

  { id: "CANO-388", title: "Column virtualization for large backlogs", tag: "Perf", points: 8, assignee: "dk", priority: "High", kind: "feature", column: "done" },
  { id: "CANO-392", title: "Sprint summary export to PDF", tag: "Reports", points: 5, assignee: "ml", priority: "Medium", kind: "feature", column: "done" },
  { id: "CANO-396", title: "Fix flaky board reordering tests", tag: "QA", points: 2, assignee: "sr", priority: "Low", kind: "chore", column: "done" },
  { id: "CANO-399", title: "Accessible focus rings on cards", tag: "A11y", points: 3, assignee: "to", priority: "Medium", kind: "chore", column: "done" },
]

const COLUMNS: { id: ColumnId; label: string; accent: string }[] = [
  { id: "todo", label: "To do", accent: "bg-muted-foreground/40" },
  { id: "progress", label: "In progress", accent: "bg-primary" },
  { id: "review", label: "Review", accent: "bg-primary/60" },
  { id: "done", label: "Done", accent: "bg-foreground/70" },
]

// Remaining story points at the end of each day of a 10-day sprint.
const BURNDOWN = [62, 58, 55, 47, 44, 38, 30, 24, 17, 9]
const BURNDOWN_MAX = 62

const PRIORITY_STYLE: Record<Priority, string> = {
  High: "text-destructive",
  Medium: "text-primary",
  Low: "text-muted-foreground",
}

function KindIcon({ kind, className }: { kind: Kind; className?: string }) {
  if (kind === "bug") return <Bug className={className} aria-hidden="true" />
  if (kind === "chore") return <CircleDashed className={className} aria-hidden="true" />
  return <Sparkles className={className} aria-hidden="true" />
}

export default function SprintBoard() {
  const [activeAssignee, setActiveAssignee] = React.useState<string>("all")
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return STORIES.filter((s) => {
      const byAssignee = activeAssignee === "all" || s.assignee === activeAssignee
      const byQuery =
        q === "" ||
        s.title.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q)
      return byAssignee && byQuery
    })
  }, [activeAssignee, query])

  const totalPoints = filtered.reduce((sum, s) => sum + s.points, 0)
  const donePoints = filtered
    .filter((s) => s.column === "done")
    .reduce((sum, s) => sum + s.points, 0)
  const pct = totalPoints === 0 ? 0 : Math.round((donePoints / totalPoints) * 100)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="size-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Cadence</span>
          </div>
          <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Primary">
            <Button variant="ghost" size="sm">Backlog</Button>
            <Button variant="secondary" size="sm">Board</Button>
            <Button variant="ghost" size="sm">Reports</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories"
                className="h-9 w-44 pl-8 lg:w-56"
                aria-label="Search stories"
              />
            </div>
            <Button size="sm">
              <Plus className="size-4" aria-hidden="true" />
              New story
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        {/* Sprint header */}
        <section className="mb-6 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col justify-between gap-4 rounded-xl border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-semibold tracking-tight">Sprint 24 — Board polish</h1>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Jun 2 – Jun 13 · 10 working days
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-1.5 text-sm">
                <Timer className="size-4 text-primary" aria-hidden="true" />
                <span className="font-medium">2 days left</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Committed" value={`${totalPoints} pts`} icon={<Flame className="size-4 text-primary" aria-hidden="true" />} />
              <Stat label="Completed" value={`${donePoints} pts`} icon={<CheckCircle2 className="size-4 text-primary" aria-hidden="true" />} />
              <Stat label="In review" value={`${filtered.filter((s) => s.column === "review").length}`} icon={<GitPullRequest className="size-4 text-primary" aria-hidden="true" />} />
            </div>
          </div>

          {/* Burndown mini-chart */}
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium">Burndown</h2>
              <span className="text-xs text-muted-foreground">{pct}% done</span>
            </div>
            <div className="mt-4 flex h-24 items-end gap-1.5" role="img" aria-label="Remaining story points per day, trending down across the sprint">
              {BURNDOWN.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-full rounded-t-sm transition-colors",
                      i === BURNDOWN.length - 1 ? "bg-primary" : "bg-primary/30",
                    )}
                    style={{ height: `${Math.max(6, (v / BURNDOWN_MAX) * 100)}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{i + 1}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              9 pts remaining · on track for sprint goal
            </p>
          </div>
        </section>

        {/* Assignee filter */}
        <section className="mb-5 flex flex-wrap items-center gap-2">
          <div className="mr-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Filter className="size-4" aria-hidden="true" />
            Assignee
          </div>
          <button
            type="button"
            onClick={() => setActiveAssignee("all")}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              activeAssignee === "all"
                ? "border-primary bg-primary/10 text-primary"
                : "bg-card text-muted-foreground hover:bg-accent",
            )}
          >
            Everyone
          </button>
          {TEAM.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveAssignee(m.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm transition-colors",
                activeAssignee === m.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "bg-card text-muted-foreground hover:bg-accent",
              )}
            >
              <Avatar className="size-6">
                <AvatarFallback className="text-[10px]">{m.initials}</AvatarFallback>
              </Avatar>
              {m.name.split(" ")[0]}
            </button>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">
            {filtered.length} of {STORIES.length} stories
          </span>
        </section>

        {/* Board */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => {
            const cards = filtered.filter((s) => s.column === col.id)
            const colPoints = cards.reduce((sum, s) => sum + s.points, 0)
            return (
              <div key={col.id} className="flex flex-col rounded-xl border bg-muted/30">
                <div className="flex items-center justify-between gap-2 px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span className={cn("size-2 rounded-full", col.accent)} aria-hidden="true" />
                    <h3 className="text-sm font-medium">{col.label}</h3>
                    <Badge variant="outline" className="rounded-full px-2 text-xs font-normal">
                      {cards.length}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{colPoints} pts</span>
                </div>

                <div className="flex flex-1 flex-col gap-2.5 px-2.5 pb-3">
                  {cards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed py-8 text-center">
                      <CircleDashed className="size-5 text-muted-foreground" aria-hidden="true" />
                      <p className="text-xs text-muted-foreground">No stories</p>
                    </div>
                  ) : (
                    cards.map((story) => {
                      const member = MEMBER_BY_ID[story.assignee]
                      return (
                        <article
                          key={story.id}
                          className="group rounded-lg border bg-card p-3 shadow-sm transition-colors hover:border-primary/40"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] text-muted-foreground">{story.id}</span>
                            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-normal">
                              {story.tag}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm leading-snug">{story.title}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs">
                              <span className={cn("flex items-center gap-1", PRIORITY_STYLE[story.priority])}>
                                <KindIcon kind={story.kind} className="size-3.5" />
                                {story.priority}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="flex size-6 items-center justify-center rounded-md bg-muted text-[11px] font-medium tabular-nums">
                                {story.points}
                              </span>
                              <Avatar className="size-6" title={member?.name}>
                                <AvatarFallback className="text-[10px]">{member?.initials}</AvatarFallback>
                              </Avatar>
                            </div>
                          </div>
                        </article>
                      )
                    })
                  )}
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed py-2 text-xs text-muted-foreground transition-colors hover:bg-accent"
                  >
                    <Plus className="size-3.5" aria-hidden="true" />
                    Add story
                  </button>
                </div>
              </div>
            )
          })}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span>Cadence · Sprint 24 board</span>
          <span className="flex items-center gap-1">
            <ChevronDown className="size-3.5" aria-hidden="true" />
            Daily standup at 9:30 AM
          </span>
        </div>
      </footer>
    </div>
  )
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  )
}
