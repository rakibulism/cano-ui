"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Calendar,
  Settings,
  Search,
  Bell,
  Plus,
  MoreHorizontal,
  CircleDot,
  Clock,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Paperclip,
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
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderKanban, active: false },
  { label: "My Tasks", icon: CheckSquare, active: false },
  { label: "Team", icon: Users, active: false },
  { label: "Calendar", icon: Calendar, active: false },
  { label: "Settings", icon: Settings, active: false },
]

const KPIS = [
  { label: "Active projects", value: "12", delta: "+2 this month", icon: FolderKanban },
  { label: "Open tasks", value: "48", delta: "8 due this week", icon: CheckSquare },
  { label: "Completed", value: "126", delta: "+18% vs last month", icon: CheckCircle2 },
  { label: "Team velocity", value: "92%", delta: "+4 pts", icon: TrendingUp },
]

const PROJECTS = [
  { name: "Mobile App Redesign", progress: 72, tasks: "24/33", tone: "On track" },
  { name: "Marketing Website", progress: 45, tasks: "11/24", tone: "At risk" },
  { name: "API v2 Migration", progress: 90, tasks: "27/30", tone: "On track" },
]

type Task = {
  id: string
  title: string
  project: string
  priority: "Low" | "Medium" | "High"
  comments: number
  files: number
  assignees: { name: string; img: string }[]
  mine: boolean
}

const A = {
  lin: { name: "Lin Wu", img: "https://i.pravatar.cc/80?img=47" },
  raj: { name: "Raj Patel", img: "https://i.pravatar.cc/80?img=12" },
  mia: { name: "Mia Cho", img: "https://i.pravatar.cc/80?img=32" },
  sam: { name: "Sam Ortiz", img: "https://i.pravatar.cc/80?img=68" },
  you: { name: "You", img: "https://i.pravatar.cc/80?img=5" },
}

const COLUMNS: { key: string; title: string; icon: typeof CircleDot; tasks: Task[] }[] = [
  {
    key: "todo",
    title: "To do",
    icon: CircleDot,
    tasks: [
      {
        id: "t1",
        title: "Audit onboarding funnel drop-off",
        project: "Mobile App Redesign",
        priority: "High",
        comments: 3,
        files: 2,
        assignees: [A.you, A.lin],
        mine: true,
      },
      {
        id: "t2",
        title: "Draft Q3 content calendar",
        project: "Marketing Website",
        priority: "Medium",
        comments: 1,
        files: 0,
        assignees: [A.mia],
        mine: false,
      },
    ],
  },
  {
    key: "doing",
    title: "In progress",
    icon: Clock,
    tasks: [
      {
        id: "t3",
        title: "Build new dashboard charts",
        project: "API v2 Migration",
        priority: "High",
        comments: 5,
        files: 4,
        assignees: [A.you, A.raj],
        mine: true,
      },
      {
        id: "t4",
        title: "Refactor auth middleware",
        project: "API v2 Migration",
        priority: "Medium",
        comments: 2,
        files: 1,
        assignees: [A.sam],
        mine: false,
      },
      {
        id: "t5",
        title: "Polish empty states",
        project: "Mobile App Redesign",
        priority: "Low",
        comments: 0,
        files: 3,
        assignees: [A.you],
        mine: true,
      },
    ],
  },
  {
    key: "done",
    title: "Done",
    icon: CheckCircle2,
    tasks: [
      {
        id: "t6",
        title: "Set up design tokens",
        project: "Mobile App Redesign",
        priority: "Medium",
        comments: 4,
        files: 2,
        assignees: [A.lin],
        mine: false,
      },
      {
        id: "t7",
        title: "Ship pricing page hero",
        project: "Marketing Website",
        priority: "High",
        comments: 6,
        files: 1,
        assignees: [A.you, A.mia],
        mine: true,
      },
    ],
  },
]

const TABS = [
  { key: "mine", label: "My tasks" },
  { key: "team", label: "Team" },
] as const

type TabKey = (typeof TABS)[number]["key"]

function priorityClasses(p: Task["priority"]) {
  if (p === "High") return "border-destructive/40 text-destructive"
  if (p === "Medium") return "border-primary/40 text-primary"
  return "text-muted-foreground"
}

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="cursor-pointer gap-3 border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-2">
        <Badge variant="outline" className={cn("font-medium", priorityClasses(task.priority))}>
          {task.priority}
        </Badge>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" aria-label="Task options">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm font-medium leading-snug text-foreground">{task.title}</p>
      <p className="text-xs text-muted-foreground">{task.project}</p>
      <div className="flex items-center justify-between pt-1">
        <div className="flex -space-x-2">
          {task.assignees.map((a) => (
            <Avatar key={a.name} className="h-7 w-7 border-2 border-card">
              <AvatarImage src={a.img} alt="" />
              <AvatarFallback className="text-[10px]">
                {a.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            {task.comments}
          </span>
          <span className="flex items-center gap-1">
            <Paperclip className="h-3.5 w-3.5" />
            {task.files}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default function ProjectDashboard() {
  const [tab, setTab] = React.useState<TabKey>("mine")

  const columns = React.useMemo(
    () =>
      COLUMNS.map((col) => ({
        ...col,
        tasks: tab === "mine" ? col.tasks.filter((t) => t.mine) : col.tasks,
      })),
    [tab]
  )

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FolderKanban className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Northwind</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => (
            <a
              key={item.label}
              href="#"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-md px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={A.you.img} alt="" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Alex Morgan</p>
              <p className="truncate text-xs text-muted-foreground">Product lead</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div>
            <h1 className="text-base font-semibold leading-none">Overview</h1>
            <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
              Welcome back, Alex
            </p>
          </div>
          <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tasks, projects..." className="pl-9" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New task
          </Button>
        </header>

        <main className="flex-1 space-y-6 p-4 sm:p-6">
          {/* KPI cards */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((kpi) => (
              <Card key={kpi.label} className="gap-0 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <kpi.icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{kpi.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{kpi.delta}</p>
              </Card>
            ))}
          </section>

          {/* Project progress */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <Card key={p.name} className="gap-3 p-5">
                <CardHeader className="p-0">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription>{p.tasks} tasks completed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 p-0">
                  <div className="flex items-center justify-between text-sm">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        p.tone === "At risk"
                          ? "border-destructive/40 text-destructive"
                          : "border-primary/40 text-primary"
                      )}
                    >
                      {p.tone}
                    </Badge>
                    <span className="font-medium text-foreground">{p.progress}%</span>
                  </div>
                  <Progress value={p.progress} />
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Board */}
          <section className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Task board</h2>
                <p className="text-sm text-muted-foreground">
                  Drag-and-drop your work across stages
                </p>
              </div>
              <div className="inline-flex items-center rounded-lg border bg-muted/30 p-1">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    className={cn(
                      "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                      tab === t.key
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {columns.map((col) => (
                <div key={col.key} className="flex flex-col gap-3 rounded-xl bg-muted/30 p-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <col.icon className="h-4 w-4 text-muted-foreground" />
                      {col.title}
                      <Badge variant="secondary" className="ml-1">
                        {col.tasks.length}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground"
                      aria-label={`Add task to ${col.title}`}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {col.tasks.length > 0 ? (
                      col.tasks.map((task) => <TaskCard key={task.id} task={task} />)
                    ) : (
                      <div className="rounded-lg border border-dashed p-6 text-center text-xs text-muted-foreground">
                        No tasks here
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
