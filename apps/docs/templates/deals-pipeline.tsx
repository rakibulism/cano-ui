"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Filter,
  LayoutGrid,
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
import { Input } from "@/components/ui/input"

type Stage = "Lead" | "Qualified" | "Proposal" | "Won"

type Deal = {
  id: number
  company: string
  contact: string
  initials: string
  amount: number
  stage: Stage
  owner: string
  probability: number
  closeDate: string
}

const OWNERS = ["All owners", "You", "Priya R.", "Leo K.", "Mara V."] as const
type OwnerFilter = (typeof OWNERS)[number]

const STAGES: { key: Stage; label: string; accent: string }[] = [
  { key: "Lead", label: "Lead", accent: "bg-muted-foreground/40" },
  { key: "Qualified", label: "Qualified", accent: "bg-primary/40" },
  { key: "Proposal", label: "Proposal", accent: "bg-primary/70" },
  { key: "Won", label: "Won", accent: "bg-primary" },
]

const DEALS: Deal[] = [
  { id: 1, company: "Northgate Logistics", contact: "Amelia Brooks", initials: "AB", amount: 48000, stage: "Lead", owner: "You", probability: 20, closeDate: "Jul 18" },
  { id: 2, company: "Lumen App", contact: "Daniel Cho", initials: "DC", amount: 22500, stage: "Lead", owner: "Priya R.", probability: 15, closeDate: "Jul 24" },
  { id: 3, company: "Vertex Co.", contact: "Sofia Marin", initials: "SM", amount: 64000, stage: "Lead", owner: "Leo K.", probability: 25, closeDate: "Aug 02" },
  { id: 4, company: "StackForge", contact: "Marcus Hale", initials: "MH", amount: 91000, stage: "Qualified", owner: "You", probability: 45, closeDate: "Jul 09" },
  { id: 5, company: "Brightwave", contact: "Priya Nair", initials: "PN", amount: 37500, stage: "Qualified", owner: "Mara V.", probability: 50, closeDate: "Jul 14" },
  { id: 6, company: "Cobalt Studio", contact: "Tomás Vidal", initials: "TV", amount: 18000, stage: "Qualified", owner: "Priya R.", probability: 40, closeDate: "Jul 21" },
  { id: 7, company: "Meridian", contact: "Owen Frost", initials: "OF", amount: 120000, stage: "Proposal", owner: "You", probability: 70, closeDate: "Jul 03" },
  { id: 8, company: "Orbit Systems", contact: "Hannah Webb", initials: "HW", amount: 54000, stage: "Proposal", owner: "Leo K.", probability: 65, closeDate: "Jul 11" },
  { id: 9, company: "Hatchet Foods", contact: "Ivy Long", initials: "IL", amount: 43000, stage: "Proposal", owner: "Mara V.", probability: 60, closeDate: "Jul 16" },
  { id: 10, company: "Drift Labs", contact: "Caleb Ortiz", initials: "CO", amount: 76000, stage: "Won", owner: "You", probability: 100, closeDate: "Jun 28" },
  { id: 11, company: "Pinecone Health", contact: "Nora Diaz", initials: "ND", amount: 88500, stage: "Won", owner: "Priya R.", probability: 100, closeDate: "Jun 24" },
  { id: 12, company: "Atlas Freight", contact: "Sam Patel", initials: "SP", amount: 31000, stage: "Won", owner: "Leo K.", probability: 100, closeDate: "Jun 19" },
]

function formatMoney(n: number): string {
  if (n >= 1000) return "$" + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k"
  return "$" + n
}

function fullMoney(n: number): string {
  return "$" + n.toLocaleString("en-US")
}

export default function DealsPipeline() {
  const [owner, setOwner] = React.useState<OwnerFilter>("All owners")
  const [query, setQuery] = React.useState("")
  const [ownerOpen, setOwnerOpen] = React.useState(false)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return DEALS.filter((d) => {
      const byOwner = owner === "All owners" || d.owner === owner
      const byQuery =
        q === "" ||
        d.company.toLowerCase().includes(q) ||
        d.contact.toLowerCase().includes(q)
      return byOwner && byQuery
    })
  }, [owner, query])

  const dealsByStage = React.useMemo(() => {
    const map: Record<Stage, Deal[]> = { Lead: [], Qualified: [], Proposal: [], Won: [] }
    for (const d of filtered) map[d.stage].push(d)
    return map
  }, [filtered])

  const stageTotal = (stage: Stage) =>
    dealsByStage[stage].reduce((sum, d) => sum + d.amount, 0)

  const openValue = filtered
    .filter((d) => d.stage !== "Won")
    .reduce((s, d) => s + d.amount, 0)
  const wonValue = stageTotal("Won")
  const weighted = filtered.reduce((s, d) => s + (d.amount * d.probability) / 100, 0)

  const summary = [
    { label: "Pipeline value", value: fullMoney(openValue + wonValue), icon: TrendingUp, hint: filtered.length + " active deals" },
    { label: "Weighted forecast", value: fullMoney(Math.round(weighted)), icon: Target, hint: "Probability-adjusted" },
    { label: "Closed won", value: fullMoney(wonValue), icon: ArrowUpRight, hint: dealsByStage.Won.length + " deals this quarter" },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Topbar */}
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <LayoutGrid className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Pipeline</p>
              <p className="hidden text-xs text-muted-foreground sm:block">Q3 · West region</p>
            </div>
          </div>

          <div className="relative ml-2 hidden w-full max-w-xs md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search deals…"
              className="pl-9"
              aria-label="Search deals"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Owner filter */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOwnerOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={ownerOpen}
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{owner}</span>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
              {ownerOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-md border bg-card p-1 shadow-md"
                >
                  {OWNERS.map((o) => (
                    <li key={o}>
                      <button
                        role="option"
                        aria-selected={owner === o}
                        onClick={() => {
                          setOwner(o)
                          setOwnerOpen(false)
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm transition-colors",
                          owner === o
                            ? "bg-primary/10 font-medium text-primary"
                            : "hover:bg-accent",
                        )}
                      >
                        {o}
                        {owner === o && <span className="h-2 w-2 rounded-full bg-primary" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Filters">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New deal</span>
            </Button>
          </div>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-1 gap-px border-t bg-border sm:grid-cols-3">
          {summary.map((s) => (
            <div key={s.label} className="flex items-center gap-3 bg-background px-4 py-3 sm:px-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <s.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-lg font-semibold tracking-tight">{s.value}</p>
              </div>
              <p className="ml-auto hidden text-right text-xs text-muted-foreground lg:block">
                {s.hint}
              </p>
            </div>
          ))}
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((stage) => {
            const deals = dealsByStage[stage.key]
            return (
              <section
                key={stage.key}
                className="flex flex-col rounded-xl border bg-muted/30"
                aria-label={stage.label + " column"}
              >
                <div className="flex items-center justify-between gap-2 px-4 pt-4">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full", stage.accent)} aria-hidden="true" />
                    <h2 className="text-sm font-semibold">{stage.label}</h2>
                    <Badge variant="secondary" className="rounded-full px-2 tabular-nums">
                      {deals.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7" aria-label={"Add deal to " + stage.label}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="px-4 pb-2 pt-1">
                  <p className="text-xs text-muted-foreground">
                    Total{" "}
                    <span className="font-medium text-foreground tabular-nums">
                      {formatMoney(stageTotal(stage.key))}
                    </span>
                  </p>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-3 pt-1">
                  {deals.map((d) => (
                    <article
                      key={d.id}
                      className="group cursor-pointer rounded-lg border bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <Building2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <p className="truncate text-sm font-medium">{d.company}</p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold tabular-nums">
                          {formatMoney(d.amount)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">{d.initials}</AvatarFallback>
                        </Avatar>
                        <span className="truncate text-xs text-muted-foreground">{d.contact}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <Badge
                          variant={d.stage === "Won" ? "default" : "outline"}
                          className="tabular-nums"
                        >
                          {d.probability}%
                        </Badge>
                        <span className="text-xs text-muted-foreground">Close {d.closeDate}</span>
                      </div>
                    </article>
                  ))}

                  {deals.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-10 text-center">
                      <Target className="h-5 w-5 text-muted-foreground" />
                      <p className="mt-2 text-xs text-muted-foreground">No deals here</p>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
            <Search className="h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">No deals match your filters</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a different owner or clear your search.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setOwner("All owners")
                setQuery("")
              }}
            >
              Reset filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
