"use client"

import * as React from "react"
import {
  Rocket,
  CalendarDays,
  CircleCheckBig,
  Clock,
  ListChecks,
  Tag,
  Plus,
  GitBranch,
  AlertTriangle,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Status = "Planned" | "In progress" | "Shipped"

type ChecklistItem = {
  id: string
  label: string
  done: boolean
}

type Release = {
  id: string
  version: string
  name: string
  target: string
  status: Status
  owner: string
  initials: string
  branch: string
  progress: number
  checklist: ChecklistItem[]
}

const RELEASES: Release[] = [
  {
    id: "r-2-9",
    version: "v2.9",
    name: "Insights & Reporting",
    target: "Jun 28, 2026",
    status: "In progress",
    owner: "Mara Lindqvist",
    initials: "ML",
    branch: "release/2.9",
    progress: 62,
    checklist: [
      { id: "c1", label: "Feature freeze on release branch", done: true },
      { id: "c2", label: "Release notes drafted", done: true },
      { id: "c3", label: "QA regression suite passing", done: false },
      { id: "c4", label: "Migration scripts reviewed", done: false },
      { id: "c5", label: "Marketing assets approved", done: false },
      { id: "c6", label: "Rollback plan documented", done: true },
    ],
  },
  {
    id: "r-3-0",
    version: "v3.0",
    name: "Workspace Redesign",
    target: "Aug 14, 2026",
    status: "Planned",
    owner: "Theo Castellano",
    initials: "TC",
    branch: "epic/workspace",
    progress: 18,
    checklist: [
      { id: "c1", label: "Scope locked with stakeholders", done: true },
      { id: "c2", label: "Design specs handed off", done: false },
      { id: "c3", label: "Engineering estimates filed", done: false },
      { id: "c4", label: "Feature flags configured", done: false },
      { id: "c5", label: "Beta cohort selected", done: false },
    ],
  },
  {
    id: "r-2-8-1",
    version: "v2.8.1",
    name: "Stability Patch",
    target: "Jun 6, 2026",
    status: "Shipped",
    owner: "Priya Raman",
    initials: "PR",
    branch: "hotfix/2.8.1",
    progress: 100,
    checklist: [
      { id: "c1", label: "Critical bugs verified fixed", done: true },
      { id: "c2", label: "Smoke tests green", done: true },
      { id: "c3", label: "Deployed to production", done: true },
      { id: "c4", label: "Customers notified", done: true },
    ],
  },
  {
    id: "r-2-7",
    version: "v2.7",
    name: "Billing Overhaul",
    target: "May 2, 2026",
    status: "Shipped",
    owner: "Devon Walsh",
    initials: "DW",
    branch: "release/2.7",
    progress: 100,
    checklist: [
      { id: "c1", label: "Payment provider integration tested", done: true },
      { id: "c2", label: "Invoicing edge cases covered", done: true },
      { id: "c3", label: "Finance team sign-off", done: true },
      { id: "c4", label: "Shipped to all tiers", done: true },
    ],
  },
  {
    id: "r-3-1",
    version: "v3.1",
    name: "Mobile Companion",
    target: "Oct 9, 2026",
    status: "Planned",
    owner: "Aiko Tanaka",
    initials: "AT",
    branch: "epic/mobile",
    progress: 6,
    checklist: [
      { id: "c1", label: "Platform research complete", done: false },
      { id: "c2", label: "Tech spike scheduled", done: false },
      { id: "c3", label: "API surface drafted", done: false },
    ],
  },
]

const STATUS_TABS: Array<"All" | Status> = ["All", "Planned", "In progress", "Shipped"]

const statusStyles: Record<Status, string> = {
  Planned: "bg-muted text-muted-foreground",
  "In progress": "bg-primary/10 text-primary",
  Shipped: "bg-secondary text-foreground",
}

const statusIcon: Record<Status, React.ComponentType<{ className?: string }>> = {
  Planned: Clock,
  "In progress": Rocket,
  Shipped: CircleCheckBig,
}

export default function ReleasePlanner() {
  const [filter, setFilter] = React.useState<"All" | Status>("All")
  const [selectedId, setSelectedId] = React.useState<string>(RELEASES[0].id)
  const [checklists, setChecklists] = React.useState<Record<string, ChecklistItem[]>>(
    () => Object.fromEntries(RELEASES.map((r) => [r.id, r.checklist]))
  )

  const visibleReleases = RELEASES.filter(
    (r) => filter === "All" || r.status === filter
  )

  const selected = RELEASES.find((r) => r.id === selectedId) ?? RELEASES[0]
  const selectedChecklist = checklists[selected.id] ?? []
  const doneCount = selectedChecklist.filter((i) => i.done).length
  const checklistProgress =
    selectedChecklist.length === 0
      ? 0
      : Math.round((doneCount / selectedChecklist.length) * 100)

  const toggleItem = (releaseId: string, itemId: string) => {
    setChecklists((prev) => ({
      ...prev,
      [releaseId]: prev[releaseId].map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      ),
    }))
  }

  const kpis = [
    {
      label: "Active releases",
      value: RELEASES.filter((r) => r.status === "In progress").length,
      icon: Rocket,
      hint: "Currently in flight",
    },
    {
      label: "Planned",
      value: RELEASES.filter((r) => r.status === "Planned").length,
      icon: Clock,
      hint: "On the roadmap",
    },
    {
      label: "Shipped this quarter",
      value: RELEASES.filter((r) => r.status === "Shipped").length,
      icon: CircleCheckBig,
      hint: "Delivered to users",
    },
    {
      label: "Next ship date",
      value: "Jun 28",
      icon: CalendarDays,
      hint: "v2.9 Insights",
    },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Launchpad</p>
              <p className="text-xs text-muted-foreground">Release planner</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Primary">
            <a className="rounded-md px-3 py-2 font-medium text-foreground" href="#">
              Releases
            </a>
            <a
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              href="#"
            >
              Roadmap
            </a>
            <a
              className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
              href="#"
            >
              Changelog
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <GitBranch className="h-4 w-4" />
              Sync
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New release
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Release schedule</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track readiness across upcoming versions and ship with confidence.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label}>
                <CardHeader>
                  <CardDescription className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    {kpi.label}
                  </CardDescription>
                  <CardTitle className="text-3xl">{kpi.value}</CardTitle>
                  <CardAction>
                    <Badge variant="outline" className="text-muted-foreground">
                      {kpi.hint}
                    </Badge>
                  </CardAction>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between gap-4">
              <Tabs value={filter} onValueChange={(v) => setFilter(v as "All" | Status)}>
                <TabsList>
                  {STATUS_TABS.map((tab) => (
                    <TabsTrigger key={tab} value={tab}>
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {visibleReleases.length} release{visibleReleases.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {visibleReleases.map((release) => {
                const StatusIcon = statusIcon[release.status]
                const items = checklists[release.id] ?? release.checklist
                const liveProgress =
                  release.status === "Shipped"
                    ? 100
                    : Math.round(
                        (items.filter((i) => i.done).length / items.length) * 100
                      )
                const active = release.id === selectedId
                return (
                  <button
                    key={release.id}
                    type="button"
                    onClick={() => setSelectedId(release.id)}
                    className={cn(
                      "w-full rounded-xl border bg-card p-5 text-left transition-colors hover:bg-accent",
                      active && "border-primary ring-1 ring-primary"
                    )}
                    aria-pressed={active}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 font-mono text-sm font-semibold text-primary">
                          <Tag className="h-3.5 w-3.5" />
                          {release.version}
                        </span>
                        <div>
                          <p className="font-medium leading-tight">{release.name}</p>
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {release.target}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          "gap-1 border-transparent",
                          statusStyles[release.status]
                        )}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {release.status}
                      </Badge>
                    </div>

                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Readiness</span>
                        <span className="font-medium tabular-nums">{liveProgress}%</span>
                      </div>
                      <Progress value={liveProgress} />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">
                            {release.initials}
                          </AvatarFallback>
                        </Avatar>
                        {release.owner}
                      </div>
                      <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                        <GitBranch className="h-3.5 w-3.5" />
                        {release.branch}
                      </span>
                    </div>
                  </button>
                )
              })}

              {visibleReleases.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">No releases match this filter</p>
                    <p className="text-sm text-muted-foreground">
                      Try selecting a different status above.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          <aside className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24">
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  Launch checklist
                </CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <span className="font-mono text-primary">{selected.version}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-base font-medium">{selected.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {doneCount} of {selectedChecklist.length} complete
                    </span>
                    <span className="font-medium tabular-nums">{checklistProgress}%</span>
                  </div>
                  <Progress value={checklistProgress} />
                </div>

                <Separator />

                <ul className="space-y-1">
                  {selectedChecklist.map((item) => (
                    <li key={item.id}>
                      <label
                        htmlFor={`${selected.id}-${item.id}`}
                        className="flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent"
                      >
                        <Checkbox
                          id={`${selected.id}-${item.id}`}
                          checked={item.done}
                          onCheckedChange={() => toggleItem(selected.id, item.id)}
                          className="mt-0.5"
                        />
                        <span
                          className={cn(
                            "text-sm leading-snug",
                            item.done && "text-muted-foreground line-through"
                          )}
                        >
                          {item.label}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-3">
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Owner
                  </span>
                  <span className="flex items-center gap-2 font-medium">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px]">
                        {selected.initials}
                      </AvatarFallback>
                    </Avatar>
                    {selected.owner}
                  </span>
                </div>
                <Button
                  className="w-full"
                  disabled={checklistProgress < 100 || selected.status === "Shipped"}
                >
                  <Rocket className="h-4 w-4" />
                  {selected.status === "Shipped" ? "Shipped" : "Ship release"}
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>Launchpad · Release planner</p>
          <p>Last synced from main · 5 active branches</p>
        </div>
      </footer>
    </div>
  )
}
