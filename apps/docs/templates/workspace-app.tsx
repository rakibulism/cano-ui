"use client"
import * as React from "react"
import {
  Home,
  FileText,
  CheckSquare,
  Calendar as CalendarIcon,
  Plus,
  Search,
  Settings,
  ChevronRight,
  Clock,
  Star,
  MoreHorizontal,
  Circle,
  CheckCircle2,
  Bell,
  Sparkles,
  Folder,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Section = "home" | "docs" | "tasks" | "calendar"

const NAV: { id: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "docs", label: "Docs", icon: FileText },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "calendar", label: "Calendar", icon: CalendarIcon },
]

const DOCS = [
  { id: 1, title: "Product Roadmap 2026", folder: "Strategy", edited: "2h ago", emoji: "🗺️", starred: true },
  { id: 2, title: "Engineering Wiki", folder: "Engineering", edited: "Yesterday", emoji: "⚙️", starred: false },
  { id: 3, title: "Onboarding Checklist", folder: "People", edited: "3 days ago", emoji: "✅", starred: true },
  { id: 4, title: "Brand Guidelines", folder: "Design", edited: "Apr 28", emoji: "🎨", starred: false },
  { id: 5, title: "Q2 OKRs", folder: "Strategy", edited: "May 02", emoji: "🎯", starred: false },
  { id: 6, title: "Meeting Notes — Sync", folder: "General", edited: "May 04", emoji: "📝", starred: false },
]

const COLUMNS = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
] as const

const TASKS = [
  { id: 1, title: "Draft launch announcement", col: "todo", tag: "Marketing", who: "AL" },
  { id: 2, title: "Finalize pricing tiers", col: "todo", tag: "Product", who: "RK" },
  { id: 3, title: "Migrate billing service", col: "doing", tag: "Backend", who: "MO" },
  { id: 4, title: "Redesign empty states", col: "doing", tag: "Design", who: "SJ" },
  { id: 5, title: "Ship dark mode", col: "done", tag: "Frontend", who: "AL" },
  { id: 6, title: "Write API reference", col: "done", tag: "Docs", who: "RK" },
]

const EVENTS: Record<number, { label: string; tone: "primary" | "muted" | "accent" }[]> = {
  4: [{ label: "Standup", tone: "muted" }],
  9: [{ label: "Design review", tone: "primary" }],
  11: [{ label: "1:1 with Mia", tone: "accent" }],
  17: [{ label: "Sprint planning", tone: "primary" }, { label: "Demo", tone: "muted" }],
  23: [{ label: "All-hands", tone: "accent" }],
  28: [{ label: "Release", tone: "primary" }],
}

const RECENT = [
  { title: "Product Roadmap 2026", kind: "Doc", when: "2h ago" },
  { title: "Finalize pricing tiers", kind: "Task", when: "4h ago" },
  { title: "Sprint planning", kind: "Event", when: "Yesterday" },
]

const ACTIVITY = [
  { who: "Ava Lin", action: "commented on", target: "Q2 OKRs", when: "12m" },
  { who: "Marco Ortiz", action: "completed", target: "Ship dark mode", when: "1h" },
  { who: "Sara Jung", action: "edited", target: "Brand Guidelines", when: "3h" },
  { who: "Rk Islam", action: "created", target: "Meeting Notes", when: "5h" },
]

export default function WorkspaceApp() {
  const [section, setSection] = React.useState<Section>("home")
  const [taskFilter, setTaskFilter] = React.useState<string>("all")
  const [done, setDone] = React.useState<Record<number, boolean>>({ 5: true, 6: true })

  const sectionTitle = NAV.find((n) => n.id === section)?.label ?? "Home"
  const tags = ["all", ...Array.from(new Set(TASKS.map((t) => t.tag)))]
  const visibleTasks = taskFilter === "all" ? TASKS : TASKS.filter((t) => t.tag === taskFilter)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Left nav */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 md:flex">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Acme HQ</p>
            <p className="text-xs text-muted-foreground">Workspace</p>
          </div>
        </div>

        <div className="px-3">
          <Button className="w-full justify-start gap-2" size="sm">
            <Plus className="size-4" />
            Quick create
          </Button>
        </div>

        <nav className="mt-4 flex flex-col gap-1 px-3">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = section === item.id
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <Separator className="my-4" />

        <div className="px-3">
          <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Workspaces
          </p>
          <div className="flex flex-col gap-1">
            {["Strategy", "Engineering", "Design", "People"].map((w) => (
              <button
                key={w}
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Folder className="size-4" />
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 border-t p-3">
          <Avatar className="size-8">
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium">Rk Islam</p>
            <p className="truncate text-xs text-muted-foreground">manik@acme.co</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="size-4" />
          </Button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Acme HQ</span>
            <ChevronRight className="size-3.5" />
            <span className="font-medium text-foreground">{sectionTitle}</span>
          </div>
          <div className="relative ml-auto hidden max-w-xs flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search everything…" className="pl-9" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-4" />
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="size-4" />
            <span className="hidden sm:inline">New</span>
          </Button>
        </header>

        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-auto p-4 sm:p-6">
            {section === "home" && (
              <div className="mx-auto max-w-4xl space-y-8">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">Good morning, Rk</h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You have 4 tasks due today and 2 events on the calendar.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Open tasks", value: "12", icon: CheckSquare },
                    { label: "Docs edited", value: "6", icon: FileText },
                    { label: "Events today", value: "2", icon: CalendarIcon },
                  ].map((s) => {
                    const Icon = s.icon
                    return (
                      <Card key={s.label}>
                        <CardContent className="flex items-center gap-3 p-4">
                          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon className="size-5" />
                          </div>
                          <div>
                            <p className="text-2xl font-semibold leading-none">{s.value}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <section>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Recently visited
                    </h2>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {RECENT.map((r) => (
                      <Card key={r.title} className="transition-colors hover:border-primary/40">
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-3">
                            {r.kind}
                          </Badge>
                          <p className="font-medium leading-snug">{r.title}</p>
                          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            {r.when}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Jump back in
                  </h2>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button variant="outline" className="h-auto justify-start gap-3 py-3" onClick={() => setSection("docs")}>
                      <FileText className="size-4 text-primary" />
                      <span className="text-left">
                        <span className="block text-sm font-medium">Browse docs</span>
                        <span className="block text-xs text-muted-foreground">6 documents</span>
                      </span>
                    </Button>
                    <Button variant="outline" className="h-auto justify-start gap-3 py-3" onClick={() => setSection("tasks")}>
                      <CheckSquare className="size-4 text-primary" />
                      <span className="text-left">
                        <span className="block text-sm font-medium">Open task board</span>
                        <span className="block text-xs text-muted-foreground">3 columns</span>
                      </span>
                    </Button>
                  </div>
                </section>
              </div>
            )}

            {section === "docs" && (
              <div className="mx-auto max-w-4xl space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Docs</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{DOCS.length} documents across your workspace</p>
                  </div>
                  <Button size="sm" className="gap-1.5">
                    <Plus className="size-4" />
                    New doc
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  {DOCS.map((d, i) => (
                    <div
                      key={d.id}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50",
                        i !== DOCS.length - 1 && "border-b",
                      )}
                    >
                      <span className="text-lg" aria-hidden="true">{d.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{d.title}</p>
                        <p className="text-xs text-muted-foreground">{d.folder}</p>
                      </div>
                      <span className="hidden text-xs text-muted-foreground sm:block">{d.edited}</span>
                      <Star
                        className={cn(
                          "size-4",
                          d.starred ? "fill-primary text-primary" : "text-muted-foreground",
                        )}
                      />
                      <Button variant="ghost" size="icon" aria-label="More options">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "tasks" && (
              <div className="mx-auto max-w-5xl space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Drag-free board for the current sprint</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <Button
                        key={t}
                        size="sm"
                        variant={taskFilter === t ? "default" : "outline"}
                        onClick={() => setTaskFilter(t)}
                        className="capitalize"
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {COLUMNS.map((col) => {
                    const colTasks = visibleTasks.filter((t) => t.col === col.id)
                    return (
                      <div key={col.id} className="rounded-lg bg-muted/40 p-3">
                        <div className="mb-3 flex items-center justify-between px-1">
                          <p className="text-sm font-medium">{col.title}</p>
                          <Badge variant="secondary">{colTasks.length}</Badge>
                        </div>
                        <div className="space-y-2">
                          {colTasks.map((t) => {
                            const isDone = done[t.id] ?? t.col === "done"
                            return (
                              <Card key={t.id} className="border-border/60">
                                <CardContent className="p-3">
                                  <div className="flex items-start gap-2">
                                    <button
                                      onClick={() => setDone((p) => ({ ...p, [t.id]: !isDone }))}
                                      aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                                      className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-primary"
                                    >
                                      {isDone ? (
                                        <CheckCircle2 className="size-4 text-primary" />
                                      ) : (
                                        <Circle className="size-4" />
                                      )}
                                    </button>
                                    <p
                                      className={cn(
                                        "text-sm leading-snug",
                                        isDone && "text-muted-foreground line-through",
                                      )}
                                    >
                                      {t.title}
                                    </p>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between">
                                    <Badge variant="outline">{t.tag}</Badge>
                                    <Avatar className="size-6">
                                      <AvatarFallback className="text-[10px]">{t.who}</AvatarFallback>
                                    </Avatar>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                          <Button variant="ghost" size="sm" className="w-full justify-start gap-1.5 text-muted-foreground">
                            <Plus className="size-3.5" />
                            Add task
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {section === "calendar" && (
              <div className="mx-auto max-w-5xl space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
                    <p className="mt-1 text-sm text-muted-foreground">May 2026</p>
                  </div>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <Plus className="size-4" />
                    Event
                  </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  <div className="grid grid-cols-7 border-b bg-muted/40 text-center text-xs font-medium text-muted-foreground">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <div key={d} className="py-2">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {Array.from({ length: 35 }).map((_, idx) => {
                      const day = idx - 2
                      const valid = day >= 1 && day <= 31
                      const events = valid ? EVENTS[day] ?? [] : []
                      const isToday = day === 13
                      return (
                        <div
                          key={idx}
                          className={cn(
                            "min-h-20 border-b border-r p-1.5 last:border-r-0",
                            (idx + 1) % 7 === 0 && "border-r-0",
                            !valid && "bg-muted/20",
                          )}
                        >
                          {valid && (
                            <>
                              <span
                                className={cn(
                                  "inline-flex size-6 items-center justify-center rounded-full text-xs",
                                  isToday ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground",
                                )}
                              >
                                {day}
                              </span>
                              <div className="mt-1 space-y-1">
                                {events.map((e) => (
                                  <div
                                    key={e.label}
                                    className={cn(
                                      "truncate rounded px-1.5 py-0.5 text-[10px] font-medium",
                                      e.tone === "primary" && "bg-primary/10 text-primary",
                                      e.tone === "accent" && "bg-accent text-foreground",
                                      e.tone === "muted" && "bg-muted text-muted-foreground",
                                    )}
                                  >
                                    {e.label}
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Right activity sidebar */}
          <aside className="hidden w-72 shrink-0 border-l bg-muted/20 p-4 lg:block">
            <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
              <Bell className="size-4" />
              Activity
            </h2>
            <div className="space-y-4">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-[10px]">
                      {a.who.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-sm leading-snug">
                    <p>
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.action}</span>{" "}
                      <span className="font-medium">{a.target}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.when} ago</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-5" />

            <h2 className="mb-3 text-sm font-semibold">Due soon</h2>
            <div className="space-y-2">
              {TASKS.filter((t) => t.col !== "done").slice(0, 3).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSection("tasks")}
                  className="flex w-full items-center gap-2 rounded-md border bg-card px-3 py-2 text-left text-sm transition-colors hover:border-primary/40"
                >
                  <Circle className="size-3.5 shrink-0 text-muted-foreground" />
                  <span className="truncate">{t.title}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
