"use client"

import * as React from "react"
import {
  CircleDot,
  Clock,
  Columns3,
  GitBranch,
  Plus,
  Search,
  Filter,
  Rocket,
  Sparkles,
  Target,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Avatar as _Avatar,
} from "@/components/ui/avatar"

type Status = "on-track" | "at-risk" | "planned" | "shipped"

type Owner = {
  name: string
  initials: string
  src: string
}

type Initiative = {
  id: string
  title: string
  summary: string
  column: "now" | "next" | "later"
  status: Status
  progress: number
  tag: string
  owners: Owner[]
  target: string
}

const TEAM: Owner[] = [
  { name: "Maya Chen", initials: "MC", src: "https://i.pravatar.cc/80?img=47" },
  { name: "Devon Park", initials: "DP", src: "https://i.pravatar.cc/80?img=12" },
  { name: "Aisha Rahman", initials: "AR", src: "https://i.pravatar.cc/80?img=32" },
  { name: "Leo Santos", initials: "LS", src: "https://i.pravatar.cc/80?img=15" },
  { name: "Priya Nair", initials: "PN", src: "https://i.pravatar.cc/80?img=49" },
  { name: "Tom Becker", initials: "TB", src: "https://i.pravatar.cc/80?img=8" },
]

const INITIATIVES: Initiative[] = [
  {
    id: "i1",
    title: "Realtime collaboration cursors",
    summary: "Multiplayer presence and live cursors across all canvases.",
    column: "now",
    status: "on-track",
    progress: 72,
    tag: "Core",
    owners: [TEAM[0], TEAM[1]],
    target: "Q2 2026",
  },
  {
    id: "i2",
    title: "SSO + SCIM provisioning",
    summary: "Enterprise identity, auto-provisioning and role mapping.",
    column: "now",
    status: "at-risk",
    progress: 41,
    tag: "Enterprise",
    owners: [TEAM[2]],
    target: "Q2 2026",
  },
  {
    id: "i3",
    title: "Mobile offline mode",
    summary: "Queue edits offline and sync when the device reconnects.",
    column: "now",
    status: "on-track",
    progress: 88,
    tag: "Mobile",
    owners: [TEAM[3], TEAM[4]],
    target: "Q2 2026",
  },
  {
    id: "i4",
    title: "AI summary assistant",
    summary: "Generate digests and action items from any project thread.",
    column: "next",
    status: "planned",
    progress: 15,
    tag: "AI",
    owners: [TEAM[0], TEAM[5]],
    target: "Q3 2026",
  },
  {
    id: "i5",
    title: "Advanced permissions matrix",
    summary: "Granular per-folder access controls for large orgs.",
    column: "next",
    status: "planned",
    progress: 8,
    tag: "Enterprise",
    owners: [TEAM[2], TEAM[1]],
    target: "Q3 2026",
  },
  {
    id: "i6",
    title: "Public API v2",
    summary: "Versioned REST + webhooks with first-class rate limits.",
    column: "next",
    status: "at-risk",
    progress: 22,
    tag: "Platform",
    owners: [TEAM[5]],
    target: "Q3 2026",
  },
  {
    id: "i7",
    title: "Workflow automations",
    summary: "No-code triggers and actions across the workspace.",
    column: "later",
    status: "planned",
    progress: 0,
    tag: "Platform",
    owners: [TEAM[4]],
    target: "Q4 2026",
  },
  {
    id: "i8",
    title: "Native desktop app",
    summary: "Tauri-based desktop client with deep OS integration.",
    column: "later",
    status: "planned",
    progress: 0,
    tag: "Desktop",
    owners: [TEAM[3], TEAM[0]],
    target: "Q4 2026",
  },
  {
    id: "i9",
    title: "Audit log export",
    summary: "Streaming compliance logs to S3 and SIEM destinations.",
    column: "later",
    status: "shipped",
    progress: 100,
    tag: "Enterprise",
    owners: [TEAM[2]],
    target: "Shipped",
  },
]

const COLUMNS: { key: Initiative["column"]; label: string; hint: string; icon: React.ElementType }[] = [
  { key: "now", label: "Now", hint: "In active development", icon: Rocket },
  { key: "next", label: "Next", hint: "Up next this cycle", icon: Target },
  { key: "later", label: "Later", hint: "On the horizon", icon: Sparkles },
]

const STATUS_META: Record<Status, { label: string; icon: React.ElementType; className: string }> = {
  "on-track": { label: "On track", icon: CheckCircle2, className: "bg-primary/10 text-primary" },
  "at-risk": { label: "At risk", icon: AlertCircle, className: "bg-destructive/10 text-destructive" },
  planned: { label: "Planned", icon: PauseCircle, className: "bg-muted text-muted-foreground" },
  shipped: { label: "Shipped", icon: CircleDot, className: "bg-secondary text-secondary-foreground" },
}

const STATUS_FILTERS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "on-track", label: "On track" },
  { key: "at-risk", label: "At risk" },
  { key: "planned", label: "Planned" },
  { key: "shipped", label: "Shipped" },
]

function OwnerStack({ owners }: { owners: Owner[] }) {
  return (
    <div className="flex -space-x-2">
      {owners.map((o) => (
        <Avatar key={o.name} className="size-7 border-2 border-background">
          <AvatarImage src={o.src} alt="" />
          <AvatarFallback className="text-[10px]">{o.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  )
}

function StatusPill({ status }: { status: Status }) {
  const meta = STATUS_META[status]
  const Icon = meta.icon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        meta.className,
      )}
    >
      <Icon className="size-3" aria-hidden="true" />
      {meta.label}
    </span>
  )
}

function InitiativeCard({ item }: { item: Initiative }) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="gap-2 pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="font-normal">
            {item.tag}
          </Badge>
          <StatusPill status={item.status} />
        </div>
        <CardTitle className="text-base leading-snug">{item.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{item.summary}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="tabular-nums font-medium text-foreground">{item.progress}%</span>
        </div>
        <Progress value={item.progress} className="h-1.5" />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-3">
        <OwnerStack owners={item.owners} />
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" aria-hidden="true" />
          {item.target}
        </span>
      </CardFooter>
    </Card>
  )
}

export default function RoadmapApp() {
  const [statusFilter, setStatusFilter] = React.useState<Status | "all">("all")
  const [view, setView] = React.useState<"board" | "timeline">("board")
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    return INITIATIVES.filter((i) => {
      const matchStatus = statusFilter === "all" || i.status === statusFilter
      const matchQuery =
        query.trim() === "" ||
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.tag.toLowerCase().includes(query.toLowerCase())
      return matchStatus && matchQuery
    })
  }, [statusFilter, query])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GitBranch className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg font-semibold leading-tight">Product Roadmap</h1>
                <p className="text-xs text-muted-foreground">Aurora · Workspace Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center sm:flex">
                <div className="flex -space-x-2">
                  {TEAM.slice(0, 5).map((o) => (
                    <Avatar key={o.name} className="size-8 border-2 border-background">
                      <AvatarImage src={o.src} alt="" />
                      <AvatarFallback className="text-[10px]">{o.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-[11px] font-medium text-muted-foreground">
                    +7
                  </span>
                </div>
              </div>
              <Button size="sm">
                <Plus className="size-4" aria-hidden="true" />
                New initiative
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground md:inline-flex">
                <Filter className="size-3.5" aria-hidden="true" />
                Status
              </span>
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setStatusFilter(f.key)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    statusFilter === f.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search initiatives"
                  className="h-9 w-44 pl-8"
                  aria-label="Search initiatives"
                />
              </div>
              <div className="flex items-center rounded-lg border p-0.5">
                <button
                  type="button"
                  onClick={() => setView("board")}
                  aria-label="Board view"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                    view === "board"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Columns3 className="size-4" aria-hidden="true" />
                  Board
                </button>
                <button
                  type="button"
                  onClick={() => setView("timeline")}
                  aria-label="Timeline view"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                    view === "timeline"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Clock className="size-4" aria-hidden="true" />
                  Timeline
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {view === "board" ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {COLUMNS.map((col) => {
              const items = filtered.filter((i) => i.column === col.key)
              const Icon = col.icon
              return (
                <section key={col.key} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <h2 className="text-sm font-semibold leading-tight">{col.label}</h2>
                        <p className="text-xs text-muted-foreground">{col.hint}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="tabular-nums">
                      {items.length}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-4">
                    {items.length === 0 ? (
                      <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
                        No matching initiatives
                      </div>
                    ) : (
                      items.map((item) => <InitiativeCard key={item.id} item={item} />)
                    )}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {COLUMNS.map((col) => {
              const items = filtered.filter((i) => i.column === col.key)
              const Icon = col.icon
              return (
                <div key={col.key} className="rounded-xl border bg-card">
                  <div className="flex items-center gap-2 border-b px-4 py-3">
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <h2 className="text-sm font-semibold">{col.label}</h2>
                    <span className="text-xs text-muted-foreground">· {items.length} initiatives</span>
                  </div>
                  <div className="divide-y">
                    {items.length === 0 ? (
                      <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                        No matching initiatives
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-medium">{item.title}</p>
                              <Badge variant="outline" className="hidden font-normal sm:inline-flex">
                                {item.tag}
                              </Badge>
                            </div>
                            <p className="truncate text-xs text-muted-foreground">{item.summary}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <StatusPill status={item.status} />
                            <div className="hidden w-40 items-center gap-2 md:flex">
                              <Progress value={item.progress} className="h-1.5" />
                              <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                                {item.progress}%
                              </span>
                            </div>
                            <OwnerStack owners={item.owners} />
                            <span className="hidden w-20 shrink-0 text-right text-xs text-muted-foreground lg:block">
                              {item.target}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>Roadmap reflects current plans and is subject to change.</p>
          <p className="tabular-nums">{filtered.length} of {INITIATIVES.length} initiatives shown</p>
        </div>
      </footer>
    </div>
  )
}
