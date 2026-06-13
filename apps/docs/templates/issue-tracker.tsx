"use client"

import * as React from "react"
import {
  Search,
  Plus,
  Inbox,
  CircleDot,
  Circle,
  CircleDashed,
  CircleCheck,
  SignalHigh,
  SignalMedium,
  SignalLow,
  AlertTriangle,
  MinusCircle,
  Layers,
  Star,
  Filter,
  SlidersHorizontal,
  Bookmark,
  Users,
  ListFilter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Status = "backlog" | "todo" | "in-progress" | "done"
type Priority = "urgent" | "high" | "medium" | "low" | "none"

type Issue = {
  id: string
  title: string
  status: Status
  priority: Priority
  labels: { name: string; tone: string }[]
  assignee: { name: string; initials: string; src: string }
  updated: string
}

const STATUS_TABS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "backlog", label: "Backlog" },
  { key: "todo", label: "Todo" },
  { key: "in-progress", label: "In progress" },
  { key: "done", label: "Done" },
]

const VIEWS = [
  { key: "active", label: "Active", icon: CircleDot, count: 18 },
  { key: "all", label: "All issues", icon: Inbox, count: 42 },
  { key: "backlog", label: "Backlog", icon: CircleDashed, count: 11 },
  { key: "mine", label: "Assigned to me", icon: Users, count: 6 },
]

const SAVED = [
  { key: "triage", label: "Triage queue", icon: ListFilter },
  { key: "starred", label: "Starred", icon: Star },
  { key: "design", label: "Design review", icon: Bookmark },
]

const ISSUES: Issue[] = [
  {
    id: "CANO-241",
    title: "Search input should clear on Escape key",
    status: "in-progress",
    priority: "high",
    labels: [{ name: "Bug", tone: "destructive" }, { name: "UX", tone: "muted" }],
    assignee: { name: "Maya Chen", initials: "MC", src: "https://i.pravatar.cc/64?img=47" },
    updated: "2h",
  },
  {
    id: "CANO-238",
    title: "Add keyboard shortcut to open new-issue composer",
    status: "todo",
    priority: "medium",
    labels: [{ name: "Feature", tone: "primary" }],
    assignee: { name: "Devon Park", initials: "DP", src: "https://i.pravatar.cc/64?img=12" },
    updated: "5h",
  },
  {
    id: "CANO-235",
    title: "Avatars overflow on narrow viewports in the list row",
    status: "backlog",
    priority: "low",
    labels: [{ name: "Frontend", tone: "muted" }],
    assignee: { name: "Ana Ruiz", initials: "AR", src: "https://i.pravatar.cc/64?img=32" },
    updated: "1d",
  },
  {
    id: "CANO-232",
    title: "Status filter loses selection after refetch",
    status: "in-progress",
    priority: "urgent",
    labels: [{ name: "Bug", tone: "destructive" }, { name: "P0", tone: "primary" }],
    assignee: { name: "Sam Okoro", initials: "SO", src: "https://i.pravatar.cc/64?img=15" },
    updated: "3h",
  },
  {
    id: "CANO-229",
    title: "Document the saved-views data model in the wiki",
    status: "todo",
    priority: "low",
    labels: [{ name: "Docs", tone: "muted" }],
    assignee: { name: "Lena Vogel", initials: "LV", src: "https://i.pravatar.cc/64?img=20" },
    updated: "2d",
  },
  {
    id: "CANO-224",
    title: "Migrate priority icons to the shared icon set",
    status: "done",
    priority: "medium",
    labels: [{ name: "Chore", tone: "muted" }, { name: "Design", tone: "primary" }],
    assignee: { name: "Maya Chen", initials: "MC", src: "https://i.pravatar.cc/64?img=47" },
    updated: "3d",
  },
  {
    id: "CANO-219",
    title: "Empty state for views with no matching issues",
    status: "backlog",
    priority: "medium",
    labels: [{ name: "Feature", tone: "primary" }, { name: "UX", tone: "muted" }],
    assignee: { name: "Devon Park", initials: "DP", src: "https://i.pravatar.cc/64?img=12" },
    updated: "4d",
  },
  {
    id: "CANO-211",
    title: "Persist last-used filter tab to local storage",
    status: "done",
    priority: "low",
    labels: [{ name: "Feature", tone: "primary" }],
    assignee: { name: "Sam Okoro", initials: "SO", src: "https://i.pravatar.cc/64?img=15" },
    updated: "5d",
  },
]

const priorityMeta: Record<Priority, { icon: React.ElementType; label: string; cls: string }> = {
  urgent: { icon: AlertTriangle, label: "Urgent", cls: "text-destructive" },
  high: { icon: SignalHigh, label: "High", cls: "text-foreground" },
  medium: { icon: SignalMedium, label: "Medium", cls: "text-muted-foreground" },
  low: { icon: SignalLow, label: "Low", cls: "text-muted-foreground" },
  none: { icon: MinusCircle, label: "No priority", cls: "text-muted-foreground" },
}

const statusMeta: Record<Status, { icon: React.ElementType; label: string; cls: string }> = {
  backlog: { icon: CircleDashed, label: "Backlog", cls: "text-muted-foreground" },
  todo: { icon: Circle, label: "Todo", cls: "text-muted-foreground" },
  "in-progress": { icon: CircleDot, label: "In progress", cls: "text-primary" },
  done: { icon: CircleCheck, label: "Done", cls: "text-primary" },
}

function labelClasses(tone: string) {
  if (tone === "destructive") return "border-destructive/40 text-destructive"
  if (tone === "primary") return "border-primary/40 text-primary"
  return "border text-muted-foreground"
}

export default function IssueTrackerTemplate() {
  const [activeTab, setActiveTab] = React.useState<Status | "all">("all")
  const [query, setQuery] = React.useState("")
  const [activeView, setActiveView] = React.useState("active")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return ISSUES.filter((issue) => {
      const matchesStatus = activeTab === "all" || issue.status === activeTab
      const matchesQuery =
        q.length === 0 ||
        issue.title.toLowerCase().includes(q) ||
        issue.id.toLowerCase().includes(q) ||
        issue.labels.some((l) => l.name.toLowerCase().includes(q)) ||
        issue.assignee.name.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [activeTab, query])

  const countFor = (key: Status | "all") =>
    key === "all" ? ISSUES.length : ISSUES.filter((i) => i.status === key).length

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 md:flex">
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Layers className="size-4" />
          </div>
          <span className="text-sm font-semibold">Beacon</span>
          <Badge variant="secondary" className="ml-auto text-[10px]">
            Pro
          </Badge>
        </div>
        <Separator />
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Views
          </p>
          <ul className="space-y-0.5">
            {VIEWS.map((view) => {
              const Icon = view.icon
              const active = activeView === view.key
              return (
                <li key={view.key}>
                  <button
                    type="button"
                    onClick={() => setActiveView(view.key)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{view.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{view.count}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          <p className="px-2 pb-2 pt-5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Saved
          </p>
          <ul className="space-y-0.5">
            {SAVED.map((view) => {
              const Icon = view.icon
              const active = activeView === view.key
              return (
                <li key={view.key}>
                  <button
                    type="button"
                    onClick={() => setActiveView(view.key)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{view.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
        <Separator />
        <div className="flex items-center gap-2 px-4 py-3">
          <Avatar className="size-7">
            <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Maya Chen</p>
            <p className="truncate text-xs text-muted-foreground">Engineering</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
          <div className="flex items-center gap-3 px-4 py-3 lg:px-6">
            <CircleDot className="size-4 text-primary" />
            <h1 className="text-sm font-semibold">Active issues</h1>
            <Badge variant="outline" className="text-[11px]">
              {filtered.length} shown
            </Badge>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search issues..."
                  className="h-9 w-44 pl-8 sm:w-64"
                  aria-label="Search issues"
                />
              </div>
              <Button variant="outline" size="icon" className="hidden sm:inline-flex" aria-label="Filter">
                <Filter className="size-4" />
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:inline-flex" aria-label="Display options">
                <SlidersHorizontal className="size-4" />
              </Button>
              <Button size="sm">
                <Plus className="size-4" />
                New issue
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto px-4 pb-2 lg:px-6">
            {STATUS_TABS.map((tab) => {
              const active = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "rounded px-1.5 text-[11px]",
                      active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {countFor(tab.key)}
                  </span>
                </button>
              )
            })}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 border-b bg-muted/30 px-4 py-2.5 lg:px-6"
          >
            <Circle className="size-4 shrink-0 text-muted-foreground" />
            <Input
              placeholder="Create a new issue... (type a title and press Enter)"
              className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              aria-label="New issue title"
            />
            <Badge variant="outline" className="hidden shrink-0 gap-1 sm:flex">
              <SignalMedium className="size-3" />
              Medium
            </Badge>
            <Button type="submit" size="sm" variant="secondary" className="shrink-0">
              Add
            </Button>
          </form>

          <ul>
            {filtered.map((issue) => {
              const P = priorityMeta[issue.priority]
              const S = statusMeta[issue.status]
              const PIcon = P.icon
              const SIcon = S.icon
              return (
                <li
                  key={issue.id}
                  className="group flex items-center gap-3 border-b px-4 py-3 transition-colors hover:bg-muted/50 lg:px-6"
                >
                  <PIcon className={cn("size-4 shrink-0", P.cls)} aria-label={P.label} />
                  <SIcon className={cn("size-4 shrink-0", S.cls)} aria-label={S.label} />
                  <span className="hidden w-20 shrink-0 font-mono text-xs text-muted-foreground sm:inline">
                    {issue.id}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{issue.title}</span>
                  <div className="hidden shrink-0 items-center gap-1.5 md:flex">
                    {issue.labels.map((label) => (
                      <Badge
                        key={label.name}
                        variant="outline"
                        className={cn("text-[11px]", labelClasses(label.tone))}
                      >
                        {label.name}
                      </Badge>
                    ))}
                  </div>
                  <span className="hidden w-10 shrink-0 text-right text-xs text-muted-foreground lg:inline">
                    {issue.updated}
                  </span>
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage src={issue.assignee.src} alt="" />
                    <AvatarFallback className="text-[10px]">{issue.assignee.initials}</AvatarFallback>
                  </Avatar>
                </li>
              )
            })}
          </ul>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <Inbox className="size-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No issues match your filters</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Try a different status tab or clear your search to see more results.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveTab("all")
                  setQuery("")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
