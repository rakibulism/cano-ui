"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Bell,
  Briefcase,
  Building2,
  CheckCircle2,
  Contact,
  DollarSign,
  Home,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const nav = [
  ["Overview", Home, true],
  ["Contacts", Contact, false],
  ["Deals", Briefcase, false],
  ["Accounts", Building2, false],
  ["Team", Users, false],
  ["Settings", Settings, false],
] as const

const kpis = [
  ["Pipeline value", "$1.84M", 12.4, DollarSign],
  ["Open deals", "126", 6.1, Briefcase],
  ["Win rate", "38%", 3.2, Target],
  ["Avg. deal size", "$14.6k", 8.7, TrendingUp],
] as const

const STAGES = ["All", "Lead", "Qualified", "Proposal", "Negotiation", "Won"] as const
type Stage = (typeof STAGES)[number]

type Deal = {
  company: string
  owner: string
  value: string
  stage: Exclude<Stage, "All">
  close: string
}

const deals: Deal[] = [
  { company: "Northwind Traders", owner: "JL", value: "$48,000", stage: "Negotiation", close: "Jun 28" },
  { company: "Acme Corporation", owner: "MP", value: "$22,500", stage: "Proposal", close: "Jul 02" },
  { company: "Globex Industries", owner: "RK", value: "$96,000", stage: "Qualified", close: "Jul 14" },
  { company: "Initech LLC", owner: "JL", value: "$12,800", stage: "Lead", close: "Jul 19" },
  { company: "Umbrella Health", owner: "SD", value: "$64,200", stage: "Won", close: "Jun 11" },
  { company: "Hooli Cloud", owner: "MP", value: "$31,400", stage: "Proposal", close: "Jul 05" },
  { company: "Stark Solutions", owner: "RK", value: "$18,900", stage: "Qualified", close: "Jul 21" },
  { company: "Wayne Enterprises", owner: "SD", value: "$120,000", stage: "Negotiation", close: "Jun 30" },
  { company: "Soylent Foods", owner: "JL", value: "$9,600", stage: "Lead", close: "Jul 25" },
]

const stageStyles: Record<Exclude<Stage, "All">, string> = {
  Lead: "bg-muted text-muted-foreground",
  Qualified: "bg-secondary text-foreground",
  Proposal: "bg-primary/10 text-primary",
  Negotiation: "bg-accent text-foreground",
  Won: "bg-primary text-primary-foreground",
}

const tasks = [
  { label: "Follow up with Northwind Traders", meta: "Due today · Call", done: false },
  { label: "Send proposal to Acme Corporation", meta: "Due today · Email", done: false },
  { label: "Demo prep for Globex Industries", meta: "Tomorrow · Meeting", done: false },
  { label: "Renewal check-in: Umbrella Health", meta: "Completed · Note", done: true },
]

const activity = [
  ["Deal moved to Negotiation", "Wayne Enterprises · JL · 18m ago"],
  ["New contact added", "Priya Sharma — Globex · 1h ago"],
  ["Deal won", "Umbrella Health · SD · 3h ago"],
  ["Email logged", "Acme Corporation · MP · 5h ago"],
]

export default function CrmDashboard() {
  const [stage, setStage] = React.useState<Stage>("All")
  const [checked, setChecked] = React.useState<Record<number, boolean>>(
    () => Object.fromEntries(tasks.map((t, i) => [i, t.done]))
  )

  const visibleDeals = React.useMemo(
    () => (stage === "All" ? deals : deals.filter((d) => d.stage === stage)),
    [stage]
  )
  const visibleTotal = visibleDeals.reduce(
    (sum, d) => sum + Number(d.value.replace(/[$,]/g, "")),
    0
  )
  const openTasks = tasks.filter((_, i) => !checked[i]).length

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r p-3 lg:flex">
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold tracking-tight">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Target className="size-3.5" />
          </span>
          Relay CRM
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {nav.map(([label, Icon, active]) => (
            <button
              key={label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-2 rounded-md px-2 py-2">
          <Avatar className="size-7"><AvatarFallback className="text-xs">JL</AvatarFallback></Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">Jordan Lee</span>
            <span className="truncate text-xs text-muted-foreground">Sales lead</span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search contacts, deals…" className="pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button size="sm" className="hidden sm:inline-flex">
              <Plus className="size-4" />
              New deal
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications"><Bell /></Button>
            <Avatar className="size-8"><AvatarFallback className="text-xs">JL</AvatarFallback></Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Sales overview</h1>
              <p className="text-sm text-muted-foreground">Your pipeline at a glance.</p>
            </div>
            <Badge variant="outline" className="gap-1.5">
              <CheckCircle2 className="size-3.5 text-primary" />
              {openTasks} open tasks today
            </Badge>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map(([label, value, delta, Icon]) => (
              <Card key={label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <Icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
                    <ArrowUpRight className="size-3.5" />
                    {delta}% vs last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">Deals</CardTitle>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {visibleDeals.length} deals · ${visibleTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STAGES.map((s) => (
                    <Button
                      key={s}
                      variant={stage === s ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStage(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6">Company</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="pr-6 text-right">Close</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleDeals.map((d) => (
                      <TableRow key={d.company}>
                        <TableCell className="pl-6 font-medium">{d.company}</TableCell>
                        <TableCell>
                          <Avatar className="size-6"><AvatarFallback className="text-[10px]">{d.owner}</AvatarFallback></Avatar>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("border-transparent font-medium", stageStyles[d.stage])}>
                            {d.stage}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{d.value}</TableCell>
                        <TableCell className="pr-6 text-right text-muted-foreground tabular-nums">{d.close}</TableCell>
                      </TableRow>
                    ))}
                    {visibleDeals.length === 0 ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                          No deals in this stage.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Tasks</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-3">
                {tasks.map((t, i) => (
                  <label
                    key={t.label}
                    className="flex cursor-pointer items-start gap-3 text-sm"
                  >
                    <Checkbox
                      checked={!!checked[i]}
                      onCheckedChange={(v) =>
                        setChecked((prev) => ({ ...prev, [i]: v === true }))
                      }
                      className="mt-0.5"
                    />
                    <span className="flex min-w-0 flex-col">
                      <span className={cn("font-medium", checked[i] && "text-muted-foreground line-through")}>
                        {t.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{t.meta}</span>
                    </span>
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader><CardTitle className="text-base">Recent activity</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              {activity.map(([title, meta], i) => (
                <React.Fragment key={title + i}>
                  {i > 0 ? <Separator /> : null}
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="size-4" />
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="font-medium">{title}</span>
                      <span className="truncate text-xs text-muted-foreground">{meta}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
