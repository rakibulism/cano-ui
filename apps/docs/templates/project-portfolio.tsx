"use client"

import * as React from "react"
import {
  LayoutGrid,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  CircleCheck,
  Wallet,
  FolderKanban,
  Plus,
  ArrowUpRight,
  Bell,
  ChevronDown,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

type Status = "On track" | "At risk" | "Delayed" | "Completed"

type Project = {
  id: string
  name: string
  code: string
  owner: string
  initials: string
  avatar: string
  status: Status
  progress: number
  budget: number
  spent: number
  due: string
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Atlas Platform Migration",
    code: "PRJ-1042",
    owner: "Dana Reyes",
    initials: "DR",
    avatar: "https://i.pravatar.cc/80?img=1",
    status: "On track",
    progress: 72,
    budget: 480000,
    spent: 312000,
    due: "Aug 14",
  },
  {
    id: "p2",
    name: "Customer Portal Redesign",
    code: "PRJ-1058",
    owner: "Marcus Hale",
    initials: "MH",
    avatar: "https://i.pravatar.cc/80?img=12",
    status: "At risk",
    progress: 38,
    budget: 220000,
    spent: 168000,
    due: "Jul 02",
  },
  {
    id: "p3",
    name: "Billing Engine Overhaul",
    code: "PRJ-1067",
    owner: "Priya Nair",
    initials: "PN",
    avatar: "https://i.pravatar.cc/80?img=5",
    status: "Delayed",
    progress: 21,
    budget: 360000,
    spent: 290000,
    due: "Jun 20",
  },
  {
    id: "p4",
    name: "Mobile App v3 Launch",
    code: "PRJ-1071",
    owner: "Sofia Bianchi",
    initials: "SB",
    avatar: "https://i.pravatar.cc/80?img=9",
    status: "On track",
    progress: 64,
    budget: 290000,
    spent: 161000,
    due: "Sep 30",
  },
  {
    id: "p5",
    name: "Data Warehouse Consolidation",
    code: "PRJ-1080",
    owner: "Leo Tanaka",
    initials: "LT",
    avatar: "https://i.pravatar.cc/80?img=15",
    status: "Completed",
    progress: 100,
    budget: 540000,
    spent: 512000,
    due: "May 11",
  },
  {
    id: "p6",
    name: "Security Compliance Audit",
    code: "PRJ-1088",
    owner: "Amara Okafor",
    initials: "AO",
    avatar: "https://i.pravatar.cc/80?img=20",
    status: "At risk",
    progress: 45,
    budget: 150000,
    spent: 122000,
    due: "Jul 25",
  },
  {
    id: "p7",
    name: "Partner API Gateway",
    code: "PRJ-1093",
    owner: "Dana Reyes",
    initials: "DR",
    avatar: "https://i.pravatar.cc/80?img=1",
    status: "On track",
    progress: 81,
    budget: 410000,
    spent: 298000,
    due: "Oct 08",
  },
]

const KPIS = [
  { label: "Active projects", value: "24", delta: "+3 this quarter", icon: FolderKanban },
  { label: "On track", value: "16", delta: "67% of portfolio", icon: CircleCheck },
  { label: "At risk", value: "5", delta: "Needs attention", icon: AlertTriangle },
  { label: "Budget used", value: "68%", delta: "$4.1M of $6.0M", icon: Wallet },
]

const FILTERS: Array<{ key: "all" | Status; label: string }> = [
  { key: "all", label: "All" },
  { key: "On track", label: "On track" },
  { key: "At risk", label: "At risk" },
  { key: "Delayed", label: "Delayed" },
  { key: "Completed", label: "Completed" },
]

const STATUS_META: Record<Status, { badge: "default" | "secondary" | "outline" | "destructive"; bar: string }> = {
  "On track": { badge: "secondary", bar: "[&>div]:bg-primary" },
  "At risk": { badge: "outline", bar: "[&>div]:bg-foreground/60" },
  Delayed: { badge: "destructive", bar: "[&>div]:bg-destructive" },
  Completed: { badge: "default", bar: "[&>div]:bg-primary" },
}

function money(n: number) {
  return "$" + (n / 1000).toFixed(0) + "k"
}

export default function ProjectPortfolioPage() {
  const [filter, setFilter] = React.useState<"all" | Status>("all")
  const [query, setQuery] = React.useState("")

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      const matchesStatus = filter === "all" || p.status === filter
      const matchesQuery =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [filter, query])

  const summary = React.useMemo(() => {
    return (["On track", "At risk", "Delayed", "Completed"] as Status[]).map((s) => ({
      status: s,
      count: PROJECTS.filter((p) => p.status === s).length,
    }))
  }, [])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Northbeam PMO</p>
              <p className="text-xs text-muted-foreground">Portfolio Overview</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm" className="text-foreground">Portfolio</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Resources</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Reports</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Risks</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New project</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/80?img=32" alt="" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Q3 Portfolio Health</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Tracking 24 strategic initiatives across 6 business units.
            </p>
          </div>
          <Button variant="outline" size="sm" className="mt-3 gap-1.5 sm:mt-0">
            Fiscal Q3 2026
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((k) => (
            <Card key={k.label} className="border bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <k.icon className="h-5 w-5" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-4 text-3xl font-semibold tabular-nums">{k.value}</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{k.label}</p>
                <p className="mt-2 text-xs text-muted-foreground">{k.delta}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {summary.map((s) => (
            <Card
              key={s.status}
              className={cn(
                "cursor-pointer border bg-muted/30 transition-colors hover:bg-accent",
                filter === s.status && "border-primary ring-1 ring-ring"
              )}
              onClick={() => setFilter(filter === s.status ? "all" : s.status)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{s.status}</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums">{s.count}</p>
                </div>
                <Badge variant={STATUS_META[s.status].badge}>{s.status === "On track" ? "OK" : s.status.slice(0, 4)}</Badge>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="mt-6 border bg-card">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-lg">Projects</CardTitle>
                <CardDescription>
                  {visible.length} of {PROJECTS.length} initiatives
                </CardDescription>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search name, code, owner"
                    className="pl-9"
                    aria-label="Search projects"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Filter className="h-4 w-4" />
                  More filters
                </Button>
              </div>
            </div>
            <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | Status)}>
              <TabsList className="flex-wrap">
                {FILTERS.map((f) => (
                  <TabsTrigger key={f.key} value={f.key}>
                    {f.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="min-w-[160px]">Progress</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                    <TableHead className="text-right">Spent</TableHead>
                    <TableHead className="text-right">Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((p) => {
                    const over = p.spent / p.budget > 0.85 && p.status !== "Completed"
                    return (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-muted-foreground">{p.code}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={p.avatar} alt="" />
                              <AvatarFallback className="text-xs">{p.initials}</AvatarFallback>
                            </Avatar>
                            <span className="hidden text-sm md:inline">{p.owner}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={STATUS_META[p.status].badge}>{p.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={p.progress}
                              className={cn("h-2 w-24", STATUS_META[p.status].bar)}
                            />
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {p.progress}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{money(p.budget)}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={cn(
                              "tabular-nums",
                              over ? "font-medium text-destructive" : "text-muted-foreground"
                            )}
                          >
                            {money(p.spent)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {p.due}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {visible.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                        No projects match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between rounded-lg border bg-muted/30 px-5 py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-foreground/70" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">3 projects</span> are trending over budget this period.
            </p>
          </div>
          <Button variant="link" size="sm" className="gap-1">
            View risk report
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </main>

      <footer className="mt-auto border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Northbeam PMO Portfolio Console</p>
          <p>Last synced May 11, 2026 - 09:42</p>
        </div>
      </footer>
    </div>
  )
}
