"use client"

import * as React from "react"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  GitBranch,
  Inbox,
  LayoutGrid,
  Map,
  Plus,
  Search,
  Settings,
  Timer,
  UserPlus,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const nav = [
  ["Routing", GitBranch, true],
  ["Queue", Inbox, false],
  ["Reps", Users, false],
  ["Territories", Map, false],
  ["Reports", LayoutGrid, false],
  ["Settings", Settings, false],
] as const

const kpis = [
  ["Unassigned", "14", "leads waiting", Inbox],
  ["Routed today", "212", "+18 vs. yesterday", Zap],
  ["Avg. route time", "1.4s", "under 2s SLA", Timer],
  ["Active reps", "9 / 12", "3 at capacity", Users],
] as const

const TERRITORIES = ["All", "West", "Midwest", "Northeast", "South", "EMEA"] as const
type Territory = (typeof TERRITORIES)[number]

type Rule = {
  id: string
  name: string
  desc: string
  territory: Exclude<Territory, "All">
  matched: number
  on: boolean
}

const INITIAL_RULES: Rule[] = [
  {
    id: "r1",
    name: "Enterprise round-robin",
    desc: "Company size > 500 → senior AE pool",
    territory: "West",
    matched: 48,
    on: true,
  },
  {
    id: "r2",
    name: "Inbound demo requests",
    desc: "Form = demo → fastest available rep",
    territory: "Northeast",
    matched: 126,
    on: true,
  },
  {
    id: "r3",
    name: "Trial-to-paid signals",
    desc: "PQL score ≥ 80 → account owner",
    territory: "Midwest",
    matched: 31,
    on: false,
  },
  {
    id: "r4",
    name: "EMEA business hours",
    desc: "Region = EU → London desk 9–6 CET",
    territory: "EMEA",
    matched: 64,
    on: true,
  },
  {
    id: "r5",
    name: "SMB self-serve overflow",
    desc: "Plan = starter → SMB queue",
    territory: "South",
    matched: 90,
    on: false,
  },
]

type Lead = {
  id: string
  name: string
  company: string
  source: string
  score: number
  territory: Exclude<Territory, "All">
  assignee: string | null
}

const LEADS: Lead[] = [
  { id: "L-8841", name: "Dana Okafor", company: "Northwind Labs", source: "Demo form", score: 92, territory: "West", assignee: "RM" },
  { id: "L-8840", name: "Priya Nair", company: "Helio Freight", source: "Webinar", score: 74, territory: "Northeast", assignee: "TC" },
  { id: "L-8839", name: "Marco Bianchi", company: "Vela Group", source: "Inbound chat", score: 61, territory: "EMEA", assignee: null },
  { id: "L-8838", name: "Sasha Lund", company: "Cedar & Co", source: "Trial signup", score: 88, territory: "Midwest", assignee: "AK" },
  { id: "L-8837", name: "Omar Reyes", company: "Bright Tiles", source: "Pricing page", score: 55, territory: "South", assignee: null },
  { id: "L-8836", name: "Yuki Tanaka", company: "Pulse Analytics", source: "Demo form", score: 81, territory: "West", assignee: "RM" },
  { id: "L-8835", name: "Greta Holm", company: "Atlas Retail", source: "Referral", score: 69, territory: "Northeast", assignee: null },
]

type Rep = {
  initials: string
  name: string
  role: string
  load: number
  cap: number
  territory: Exclude<Territory, "All">
}

const REPS: Rep[] = [
  { initials: "RM", name: "Rosa Méndez", role: "Senior AE", load: 11, cap: 12, territory: "West" },
  { initials: "TC", name: "Theo Clark", role: "AE", load: 7, cap: 12, territory: "Northeast" },
  { initials: "AK", name: "Aisha Khan", role: "AE", load: 9, cap: 10, territory: "Midwest" },
  { initials: "LB", name: "Liam Byrne", role: "SDR", load: 4, cap: 14, territory: "EMEA" },
  { initials: "NV", name: "Nina Volkov", role: "AE", load: 12, cap: 12, territory: "South" },
]

function scoreTone(score: number) {
  if (score >= 80) return "bg-primary/10 text-primary"
  if (score >= 65) return "bg-secondary text-foreground"
  return "bg-muted text-muted-foreground"
}

export default function LeadRoutingTemplate() {
  const [rules, setRules] = React.useState<Rule[]>(INITIAL_RULES)
  const [territory, setTerritory] = React.useState<Territory>("All")

  const toggleRule = (id: string) =>
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, on: !r.on } : r)))

  const activeCount = rules.filter((r) => r.on).length

  const visibleRules =
    territory === "All" ? rules : rules.filter((r) => r.territory === territory)
  const visibleLeads =
    territory === "All" ? LEADS : LEADS.filter((l) => l.territory === territory)
  const visibleReps =
    territory === "All" ? REPS : REPS.filter((r) => r.territory === territory)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GitBranch className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Routely</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map(([label, Icon, active]) => (
            <button
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="m-3 rounded-lg border bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">SLA this week</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">98.6%</p>
          <Progress value={98.6} className="mt-3 h-1.5" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Lead Routing</h1>
            <p className="text-xs text-muted-foreground">
              {activeCount} of {rules.length} rules active
            </p>
          </div>
          <div className="relative ml-auto hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search leads or rules" className="w-64 pl-9" />
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New rule
          </Button>
        </header>

        <main className="flex-1 space-y-6 p-6">
          {/* KPIs */}
          <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {kpis.map(([label, value, sub, Icon]) => (
              <div key={label} className="rounded-xl border bg-card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {label}
                  </span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </section>

          {/* Territory chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Map className="h-3.5 w-3.5" />
              Territory
            </span>
            {TERRITORIES.map((t) => (
              <button
                key={t}
                onClick={() => setTerritory(t)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  territory === t
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Left + center column */}
            <div className="space-y-6 xl:col-span-2">
              {/* Routing rules */}
              <section className="rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <div>
                    <h2 className="text-sm font-semibold">Routing rules</h2>
                    <p className="text-xs text-muted-foreground">
                      Evaluated top to bottom on every inbound lead
                    </p>
                  </div>
                  <Badge variant="secondary" className="tabular-nums">
                    {activeCount} on
                  </Badge>
                </div>
                <ul className="divide-y">
                  {visibleRules.length === 0 && (
                    <li className="px-5 py-10 text-center text-sm text-muted-foreground">
                      No rules for this territory.
                    </li>
                  )}
                  {visibleRules.map((rule) => (
                    <li
                      key={rule.id}
                      className="flex items-center gap-4 px-5 py-4"
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          rule.on
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">
                            {rule.name}
                          </p>
                          <Badge variant="outline" className="shrink-0 text-[10px]">
                            {rule.territory}
                          </Badge>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {rule.desc}
                        </p>
                      </div>
                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="text-sm font-semibold tabular-nums">
                          {rule.matched}
                        </p>
                        <p className="text-[10px] text-muted-foreground">matched</p>
                      </div>
                      <Switch
                        checked={rule.on}
                        onCheckedChange={() => toggleRule(rule.id)}
                        aria-label={`Toggle ${rule.name}`}
                      />
                    </li>
                  ))}
                </ul>
              </section>

              {/* Incoming queue */}
              <section className="rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <div>
                    <h2 className="text-sm font-semibold">Incoming queue</h2>
                    <p className="text-xs text-muted-foreground">
                      {visibleLeads.length} leads in view
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View all
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <ul className="divide-y">
                  {visibleLeads.map((lead) => {
                    const rep = REPS.find((r) => r.initials === lead.assignee)
                    return (
                      <li key={lead.id} className="flex items-center gap-3 px-5 py-3">
                        <span
                          className={cn(
                            "rounded-md px-2 py-1 text-xs font-semibold tabular-nums",
                            scoreTone(lead.score)
                          )}
                        >
                          {lead.score}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {lead.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {lead.company} · {lead.source}
                          </p>
                        </div>
                        <Badge variant="outline" className="hidden text-[10px] sm:inline-flex">
                          {lead.territory}
                        </Badge>
                        {rep ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                                {rep.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="hidden text-xs text-muted-foreground md:inline">
                              {rep.name.split(" ")[0]}
                            </span>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                            <UserPlus className="h-3.5 w-3.5" />
                            Assign
                          </Button>
                        )}
                      </li>
                    )
                  })}
                  {visibleLeads.length === 0 && (
                    <li className="px-5 py-10 text-center text-sm text-muted-foreground">
                      No leads waiting in this territory.
                    </li>
                  )}
                </ul>
              </section>
            </div>

            {/* Rep capacity sidebar */}
            <aside className="space-y-6">
              <section className="rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <h2 className="text-sm font-semibold">Rep capacity</h2>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <ul className="space-y-4 p-5">
                  {visibleReps.map((rep) => {
                    const pct = Math.round((rep.load / rep.cap) * 100)
                    const full = pct >= 100
                    return (
                      <li key={rep.initials} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-muted text-xs font-medium">
                              {rep.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {rep.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {rep.role} · {rep.territory}
                            </p>
                          </div>
                          {full ? (
                            <Badge variant="destructive" className="text-[10px]">
                              Full
                            </Badge>
                          ) : (
                            <span className="text-xs font-medium tabular-nums text-muted-foreground">
                              {rep.load}/{rep.cap}
                            </span>
                          )}
                        </div>
                        <Progress value={pct} className="h-1.5" />
                      </li>
                    )
                  })}
                  {visibleReps.length === 0 && (
                    <li className="py-6 text-center text-sm text-muted-foreground">
                      No reps in this territory.
                    </li>
                  )}
                </ul>
              </section>

              <section className="rounded-xl border bg-card p-5">
                <h2 className="text-sm font-semibold">Recent activity</h2>
                <Separator className="my-4" />
                <ul className="space-y-4">
                  {[
                    ["Dana Okafor routed to Rosa M.", "2m ago", CheckCircle2],
                    ["Enterprise rule matched 3 leads", "11m ago", Zap],
                    ["Nina V. hit capacity", "26m ago", Clock],
                    ["EMEA desk reopened", "1h ago", ArrowRight],
                  ].map(([text, time, Icon]) => (
                    <li key={text as string} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug">{text as string}</p>
                        <p className="text-xs text-muted-foreground">
                          {time as string}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
