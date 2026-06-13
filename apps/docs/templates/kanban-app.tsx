"use client"

import * as React from "react"
import {
  LayoutGrid,
  List,
  Plus,
  Search,
  ChevronDown,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  Filter,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type Member = {
  id: string
  name: string
  initials: string
  avatar: string
}

type Label = {
  name: string
  className: string
}

type Task = {
  id: string
  title: string
  column: ColumnId
  labels: Label[]
  assignee: string
  comments: number
  attachments: number
  due: string
}

type ColumnId = "backlog" | "todo" | "progress" | "done"

const PROJECTS = ["Mobile App Redesign", "Marketing Site", "API Platform"]

const MEMBERS: Member[] = [
  { id: "all", name: "Everyone", initials: "ALL", avatar: "" },
  { id: "ada", name: "Ada Lovelace", initials: "AL", avatar: "https://i.pravatar.cc/80?img=47" },
  { id: "grace", name: "Grace Hopper", initials: "GH", avatar: "https://i.pravatar.cc/80?img=32" },
  { id: "alan", name: "Alan Turing", initials: "AT", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: "katherine", name: "Katherine J.", initials: "KJ", avatar: "https://i.pravatar.cc/80?img=20" },
]

const LABELS: Record<string, Label> = {
  design: { name: "Design", className: "bg-primary/10 text-primary" },
  bug: { name: "Bug", className: "bg-destructive/10 text-destructive" },
  feature: { name: "Feature", className: "bg-accent text-accent-foreground" },
  research: { name: "Research", className: "bg-secondary text-secondary-foreground" },
  infra: { name: "Infra", className: "bg-muted text-muted-foreground" },
}

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "To do" },
  { id: "progress", title: "In progress" },
  { id: "done", title: "Done" },
]

const TASKS: Task[] = [
  { id: "T-101", title: "Define new color tokens for dark mode", column: "backlog", labels: [LABELS.design], assignee: "ada", comments: 4, attachments: 2, due: "Jun 18" },
  { id: "T-102", title: "Audit competitor onboarding flows", column: "backlog", labels: [LABELS.research], assignee: "katherine", comments: 1, attachments: 0, due: "Jun 21" },
  { id: "T-103", title: "Spike: offline-first sync strategy", column: "backlog", labels: [LABELS.research, LABELS.infra], assignee: "alan", comments: 7, attachments: 3, due: "Jun 24" },
  { id: "T-201", title: "Redesign empty states for the inbox", column: "todo", labels: [LABELS.design, LABELS.feature], assignee: "ada", comments: 2, attachments: 1, due: "Jun 16" },
  { id: "T-202", title: "Crash on logout when token expired", column: "todo", labels: [LABELS.bug], assignee: "grace", comments: 9, attachments: 0, due: "Jun 15" },
  { id: "T-203", title: "Add keyboard shortcuts to the board", column: "todo", labels: [LABELS.feature], assignee: "alan", comments: 3, attachments: 1, due: "Jun 19" },
  { id: "T-301", title: "Build settings page navigation shell", column: "progress", labels: [LABELS.feature], assignee: "grace", comments: 5, attachments: 2, due: "Jun 14" },
  { id: "T-302", title: "Migrate avatar uploads to new CDN", column: "progress", labels: [LABELS.infra], assignee: "alan", comments: 6, attachments: 4, due: "Jun 17" },
  { id: "T-303", title: "Polish drag-and-drop interactions", column: "progress", labels: [LABELS.design], assignee: "ada", comments: 2, attachments: 0, due: "Jun 20" },
  { id: "T-401", title: "Ship responsive top navigation", column: "done", labels: [LABELS.feature], assignee: "katherine", comments: 0, attachments: 1, due: "Jun 10" },
  { id: "T-402", title: "Fix flaky avatar fallback test", column: "done", labels: [LABELS.bug], assignee: "grace", comments: 3, attachments: 0, due: "Jun 09" },
]

function memberById(id: string) {
  return MEMBERS.find((m) => m.id === id)
}

function TaskCard({ task }: { task: Task }) {
  const member = memberById(task.assignee)
  return (
    <div className="group rounded-lg border bg-card p-3 shadow-sm transition-colors hover:border-primary/40">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {task.labels.map((label) => (
          <span
            key={label.name}
            className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", label.className)}
          >
            {label.name}
          </span>
        ))}
      </div>
      <p className="mb-3 text-sm font-medium leading-snug text-foreground">{task.title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" aria-hidden="true" />
            {task.due}
          </span>
          {task.comments > 0 && (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="size-3.5" aria-hidden="true" />
              {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="size-3.5" aria-hidden="true" />
              {task.attachments}
            </span>
          )}
        </div>
        {member && (
          <Avatar className="size-6">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="text-[10px]">{member.initials}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  )
}

export default function KanbanApp() {
  const [project, setProject] = React.useState(PROJECTS[0])
  const [projectOpen, setProjectOpen] = React.useState(false)
  const [view, setView] = React.useState<"board" | "list">("board")
  const [assignee, setAssignee] = React.useState("all")
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    return TASKS.filter((t) => {
      const byAssignee = assignee === "all" || t.assignee === assignee
      const byQuery = t.title.toLowerCase().includes(query.trim().toLowerCase())
      return byAssignee && byQuery
    })
  }, [assignee, query])

  const countFor = (id: ColumnId) => filtered.filter((t) => t.column === id).length

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutGrid className="size-5" aria-hidden="true" />
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setProjectOpen((o) => !o)}
                className="flex items-center gap-2 rounded-md px-2 py-1 text-left transition-colors hover:bg-muted"
                aria-haspopup="listbox"
                aria-expanded={projectOpen}
              >
                <span className="text-sm font-semibold">{project}</span>
                <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
              </button>
              {projectOpen && (
                <ul
                  className="absolute left-0 top-full z-30 mt-1 w-56 overflow-hidden rounded-md border bg-card shadow-md"
                  role="listbox"
                >
                  {PROJECTS.map((p) => (
                    <li key={p}>
                      <button
                        type="button"
                        onClick={() => {
                          setProject(p)
                          setProjectOpen(false)
                        }}
                        className={cn(
                          "block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                          p === project && "bg-primary/10 text-primary",
                        )}
                        role="option"
                        aria-selected={p === project}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks"
                className="h-9 w-44 pl-8"
                aria-label="Search tasks"
              />
            </div>
            <div className="inline-flex rounded-md border p-0.5">
              <Button
                size="sm"
                variant={view === "board" ? "secondary" : "ghost"}
                className="h-8 gap-1.5 px-2.5"
                onClick={() => setView("board")}
                aria-pressed={view === "board"}
              >
                <LayoutGrid className="size-4" aria-hidden="true" />
                Board
              </Button>
              <Button
                size="sm"
                variant={view === "list" ? "secondary" : "ghost"}
                className="h-8 gap-1.5 px-2.5"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
              >
                <List className="size-4" aria-hidden="true" />
                List
              </Button>
            </div>
            <Button size="sm" className="h-9 gap-1.5">
              <Plus className="size-4" aria-hidden="true" />
              New task
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t px-4 py-2.5 sm:px-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Filter className="size-3.5" aria-hidden="true" />
            Assignee
          </span>
          {MEMBERS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setAssignee(m.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border py-1 pl-1 pr-3 text-xs font-medium transition-colors",
                assignee === m.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-transparent bg-muted text-muted-foreground hover:bg-accent",
              )}
              aria-pressed={assignee === m.id}
            >
              {m.id === "all" ? (
                <span className="flex size-5 items-center justify-center rounded-full bg-background text-[9px] font-semibold">
                  ALL
                </span>
              ) : (
                <Avatar className="size-5">
                  <AvatarImage src={m.avatar} alt="" />
                  <AvatarFallback className="text-[9px]">{m.initials}</AvatarFallback>
                </Avatar>
              )}
              {m.name}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 px-4 py-5 sm:px-6">
        {view === "board" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((col) => {
              const tasks = filtered.filter((t) => t.column === col.id)
              return (
                <section key={col.id} className="flex flex-col rounded-xl bg-muted/30 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-semibold">{col.title}</h2>
                      <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                        {countFor(col.id)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Button variant="ghost" size="icon" className="size-7" aria-label={`Add task to ${col.title}`}>
                        <Plus className="size-4" aria-hidden="true" />
                      </Button>
                      <Button variant="ghost" size="icon" className="size-7" aria-label={`${col.title} options`}>
                        <MoreHorizontal className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                    {tasks.length === 0 && (
                      <p className="rounded-lg border border-dashed py-6 text-center text-xs text-muted-foreground">
                        No tasks
                      </p>
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border">
            {COLUMNS.map((col) => {
              const tasks = filtered.filter((t) => t.column === col.id)
              if (tasks.length === 0) return null
              return (
                <div key={col.id}>
                  <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {col.title}
                    </h2>
                    <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                      {tasks.length}
                    </Badge>
                  </div>
                  {tasks.map((task) => {
                    const member = memberById(task.assignee)
                    return (
                      <div
                        key={task.id}
                        className="flex items-center justify-between gap-4 border-b px-4 py-3 last:border-b-0 hover:bg-muted/30"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="hidden shrink-0 text-xs font-mono text-muted-foreground sm:inline">
                            {task.id}
                          </span>
                          <span className="truncate text-sm font-medium">{task.title}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                          <div className="hidden gap-1.5 sm:flex">
                            {task.labels.map((label) => (
                              <span
                                key={label.name}
                                className={cn(
                                  "rounded-full px-2 py-0.5 text-[11px] font-medium",
                                  label.className,
                                )}
                              >
                                {label.name}
                              </span>
                            ))}
                          </div>
                          <span className="hidden text-xs text-muted-foreground md:inline">{task.due}</span>
                          {member && (
                            <Avatar className="size-6">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-[10px]">{member.initials}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
