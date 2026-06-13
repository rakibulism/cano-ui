"use client"

import * as React from "react"
import {
  CheckCircle2,
  Circle,
  Plus,
  Flag,
  Calendar,
  Inbox,
  Star,
  Briefcase,
  Home,
  ShoppingCart,
  Search,
  MoreHorizontal,
  ListTodo,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type Priority = "high" | "medium" | "low"
type Bucket = "today" | "upcoming" | "completed"

type Task = {
  id: number
  title: string
  list: string
  priority: Priority
  due: string
  bucket: Bucket
  done: boolean
}

const PROJECTS = [
  { id: "inbox", name: "Inbox", icon: Inbox, count: 5 },
  { id: "work", name: "Work", icon: Briefcase, count: 3 },
  { id: "personal", name: "Personal", icon: Home, count: 2 },
  { id: "errands", name: "Errands", icon: ShoppingCart, count: 2 },
  { id: "starred", name: "Starred", icon: Star, count: 1 },
]

const FILTERS: { id: "all" | Bucket; label: string }[] = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
]

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Finalize Q3 product roadmap", list: "Work", priority: "high", due: "Today", bucket: "today", done: false },
  { id: 2, title: "Review pull requests for billing service", list: "Work", priority: "medium", due: "Today", bucket: "today", done: false },
  { id: 3, title: "Reply to design feedback thread", list: "Work", priority: "low", due: "Today", bucket: "today", done: true },
  { id: 4, title: "Book flights for the offsite", list: "Personal", priority: "high", due: "Jun 16", bucket: "upcoming", done: false },
  { id: 5, title: "Renew gym membership", list: "Personal", priority: "low", due: "Jun 18", bucket: "upcoming", done: false },
  { id: 6, title: "Pick up dry cleaning", list: "Errands", priority: "medium", due: "Jun 17", bucket: "upcoming", done: false },
  { id: 7, title: "Order new desk lamp", list: "Errands", priority: "low", due: "Jun 20", bucket: "upcoming", done: false },
  { id: 8, title: "Submit expense report", list: "Work", priority: "medium", due: "Jun 12", bucket: "completed", done: true },
  { id: 9, title: "Schedule dentist appointment", list: "Personal", priority: "low", due: "Jun 10", bucket: "completed", done: true },
]

const PRIORITY_STYLES: Record<Priority, string> = {
  high: "text-destructive",
  medium: "text-primary",
  low: "text-muted-foreground",
}

const PRIORITY_LABEL: Record<Priority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
}

export default function TaskListApp() {
  const [tasks, setTasks] = React.useState<Task[]>(INITIAL_TASKS)
  const [filter, setFilter] = React.useState<"all" | Bucket>("all")
  const [activeProject, setActiveProject] = React.useState("inbox")
  const [draft, setDraft] = React.useState("")
  const [nextId, setNextId] = React.useState(100)

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, bucket: !t.done ? "completed" : "today" }
          : t,
      ),
    )
  }

  const addTask = () => {
    const title = draft.trim()
    if (!title) return
    const newTask: Task = {
      id: nextId,
      title,
      list: "Inbox",
      priority: "medium",
      due: "Today",
      bucket: "today",
      done: false,
    }
    setTasks((prev) => [newTask, ...prev])
    setNextId((n) => n + 1)
    setDraft("")
  }

  const filtered = tasks.filter((t) => {
    if (filter === "all") return true
    if (filter === "completed") return t.done
    return t.bucket === filter && !t.done
  })

  const completedCount = tasks.filter((t) => t.done).length
  const totalCount = tasks.length
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ListTodo className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold">Tasker</span>
        </div>
        <Separator />
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="px-2 pb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Lists
          </p>
          {PROJECTS.map((project) => {
            const Icon = project.icon
            const active = activeProject === project.id
            return (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4" />
                  {project.name}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {project.count}
                </span>
              </button>
            )
          })}
        </nav>
        <Separator />
        <div className="px-4 py-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Daily progress</span>
            <span className="font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            {completedCount} of {totalCount} tasks done
          </p>
        </div>
        <Separator />
        <div className="flex items-center gap-3 px-4 py-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Maya Klein</p>
            <p className="truncate text-xs text-muted-foreground">Personal plan</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background/80 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Today</h1>
            <p className="text-sm text-muted-foreground">Thursday, June 13</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks"
                className="w-48 pl-8"
                aria-label="Search tasks"
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="More options">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-6">
          {/* Quick add */}
          <div className="mb-5 flex items-center gap-2 rounded-lg border bg-card p-2 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Plus className="h-4 w-4" />
            </span>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask()
              }}
              placeholder="Add a task and press Enter"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              aria-label="Add a task"
            />
            <Button size="sm" onClick={addTask} disabled={!draft.trim()}>
              Add
            </Button>
          </div>

          {/* Filter row */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id
              const count =
                f.id === "all"
                  ? tasks.length
                  : f.id === "completed"
                    ? tasks.filter((t) => t.done).length
                    : tasks.filter((t) => t.bucket === f.id && !t.done).length
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-background text-muted-foreground hover:bg-accent",
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs",
                      active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Task list */}
          <ul className="space-y-2">
            {filtered.map((task) => (
              <li
                key={task.id}
                className={cn(
                  "group flex items-center gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50",
                  task.done && "opacity-70",
                )}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                  aria-label={task.done ? "Mark as not done" : "Mark as done"}
                >
                  {task.done ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "truncate text-sm font-medium",
                      task.done && "text-muted-foreground line-through",
                    )}
                  >
                    {task.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-normal">
                      {task.list}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {task.due}
                    </span>
                  </div>
                </div>

                <span
                  className={cn(
                    "flex shrink-0 items-center gap-1 text-xs font-medium",
                    PRIORITY_STYLES[task.priority],
                  )}
                  title={PRIORITY_LABEL[task.priority] + " priority"}
                >
                  <Flag className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{PRIORITY_LABEL[task.priority]}</span>
                </span>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">All clear here</p>
              <p className="mt-1 text-sm text-muted-foreground">
                No tasks match this filter. Add one above to get started.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
