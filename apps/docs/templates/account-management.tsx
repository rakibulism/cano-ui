"use client"

import * as React from "react"
import {
  Activity,
  Building2,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  Download,
  Mail,
  Phone,
  Plus,
  Search,
  Filter,
  TrendingUp,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Health = "Healthy" | "At risk" | "Churning"

type Contact = {
  name: string
  initials: string
  role: string
  email: string
}

type ActivityItem = {
  label: string
  when: string
}

type Account = {
  id: number
  name: string
  initials: string
  segment: string
  health: Health
  arr: number
  owner: string
  ownerInitials: string
  renewal: string
  contacts: Contact[]
  activity: ActivityItem[]
}

const ACCOUNTS: Account[] = [
  {
    id: 1,
    name: "Northwind Labs",
    initials: "NL",
    segment: "Enterprise",
    health: "Healthy",
    arr: 248000,
    owner: "Priya Shah",
    ownerInitials: "PS",
    renewal: "Aug 14, 2026",
    contacts: [
      { name: "Dana Okafor", initials: "DO", role: "VP Engineering", email: "dana@northwind.io" },
      { name: "Lee Carter", initials: "LC", role: "Procurement", email: "lee@northwind.io" },
    ],
    activity: [
      { label: "QBR completed, +2 seats added", when: "2 days ago" },
      { label: "Renewal proposal sent", when: "1 week ago" },
      { label: "Product training delivered", when: "3 weeks ago" },
    ],
  },
  {
    id: 2,
    name: "Atlas Freight",
    initials: "AF",
    segment: "Mid-market",
    health: "At risk",
    arr: 96000,
    owner: "Marcus Bell",
    ownerInitials: "MB",
    renewal: "Jul 02, 2026",
    contacts: [
      { name: "Renee Vargas", initials: "RV", role: "Ops Director", email: "renee@atlasfreight.com" },
      { name: "Sam Patel", initials: "SP", role: "Finance Lead", email: "sam@atlasfreight.com" },
    ],
    activity: [
      { label: "Support ticket escalated", when: "Yesterday" },
      { label: "Usage down 18% month over month", when: "5 days ago" },
      { label: "Check-in call rescheduled", when: "2 weeks ago" },
    ],
  },
  {
    id: 3,
    name: "Bluepeak Media",
    initials: "BM",
    segment: "Mid-market",
    health: "Healthy",
    arr: 132000,
    owner: "Priya Shah",
    ownerInitials: "PS",
    renewal: "Oct 30, 2026",
    contacts: [
      { name: "Ivy Chen", initials: "IC", role: "Head of Growth", email: "ivy@bluepeak.co" },
    ],
    activity: [
      { label: "Expansion opportunity flagged", when: "4 days ago" },
      { label: "NPS survey: promoter (9/10)", when: "2 weeks ago" },
    ],
  },
  {
    id: 4,
    name: "Cedar & Co.",
    initials: "CC",
    segment: "SMB",
    health: "Churning",
    arr: 28000,
    owner: "Marcus Bell",
    ownerInitials: "MB",
    renewal: "Jun 21, 2026",
    contacts: [
      { name: "Tom Reyes", initials: "TR", role: "Founder", email: "tom@cedarco.com" },
    ],
    activity: [
      { label: "Cancellation intent submitted", when: "Today" },
      { label: "No logins in 21 days", when: "3 weeks ago" },
      { label: "Invoice past due", when: "1 month ago" },
    ],
  },
  {
    id: 5,
    name: "Solstice Health",
    initials: "SH",
    segment: "Enterprise",
    health: "Healthy",
    arr: 410000,
    owner: "Ava Lindqvist",
    ownerInitials: "AL",
    renewal: "Dec 12, 2026",
    contacts: [
      { name: "Grace Kim", initials: "GK", role: "CTO", email: "grace@solstice.health" },
      { name: "Omar Diaz", initials: "OD", role: "Security", email: "omar@solstice.health" },
    ],
    activity: [
      { label: "Multi-year contract signed", when: "1 week ago" },
      { label: "Executive sponsor aligned", when: "3 weeks ago" },
    ],
  },
  {
    id: 6,
    name: "Vertex Retail",
    initials: "VR",
    segment: "Mid-market",
    health: "At risk",
    arr: 74000,
    owner: "Ava Lindqvist",
    ownerInitials: "AL",
    renewal: "Sep 08, 2026",
    contacts: [
      { name: "Nora Webb", initials: "NW", role: "IT Manager", email: "nora@vertexretail.com" },
    ],
    activity: [
      { label: "Champion left the company", when: "6 days ago" },
      { label: "Onboarding stalled at 40%", when: "2 weeks ago" },
    ],
  },
]

const HEALTH_FILTERS = ["All", "Healthy", "At risk", "Churning"] as const
type HealthFilter = (typeof HEALTH_FILTERS)[number]

const healthStyles: Record<Health, string> = {
  Healthy: "bg-primary/10 text-primary border-transparent",
  "At risk": "bg-secondary text-foreground border-transparent",
  Churning: "bg-destructive/10 text-destructive border-transparent",
}

function formatArr(value: number) {
  return "$" + (value / 1000).toFixed(0) + "k"
}

export default function AccountManagement() {
  const [filter, setFilter] = React.useState<HealthFilter>("All")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState(1)

  const visible = React.useMemo(() => {
    return ACCOUNTS.filter((a) => {
      const matchHealth = filter === "All" || a.health === filter
      const matchQuery =
        query.trim() === "" ||
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.owner.toLowerCase().includes(query.toLowerCase())
      return matchHealth && matchQuery
    })
  }, [filter, query])

  const selected =
    visible.find((a) => a.id === selectedId) ?? visible[0] ?? ACCOUNTS[0]

  const totalArr = visible.reduce((sum, a) => sum + a.arr, 0)
  const atRisk = visible.filter((a) => a.health !== "Healthy").length

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Building2 className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Accounts</p>
              <p className="text-xs text-muted-foreground">Customer success workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="size-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              New account
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <SummaryCard
            icon={<Building2 className="size-4" />}
            label="Accounts shown"
            value={String(visible.length)}
          />
          <SummaryCard
            icon={<CircleDollarSign className="size-4" />}
            label="ARR in view"
            value={formatArr(totalArr)}
          />
          <SummaryCard
            icon={<Activity className="size-4" />}
            label="Needs attention"
            value={String(atRisk)}
          />
          <SummaryCard
            icon={<TrendingUp className="size-4" />}
            label="Net retention"
            value="112%"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
          <section className="rounded-xl border bg-card">
            <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search accounts or owners"
                  className="pl-9"
                  aria-label="Search accounts"
                />
              </div>
              <Tabs value={filter} onValueChange={(v) => setFilter(v as HealthFilter)}>
                <TabsList>
                  {HEALTH_FILTERS.map((f) => (
                    <TabsTrigger key={f} value={f} className="text-xs sm:text-sm">
                      {f}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <ul className="divide-y">
              {visible.map((a) => {
                const active = a.id === selected.id
                return (
                  <li key={a.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(a.id)}
                      className={cn(
                        "flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                        active && "bg-primary/5"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold",
                          active && "bg-primary/10 text-primary"
                        )}
                        aria-hidden="true"
                      >
                        {a.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-medium">{a.name}</span>
                          <Badge variant="outline" className="hidden text-[10px] font-normal sm:inline-flex">
                            {a.segment}
                          </Badge>
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          Renews {a.renewal}
                        </span>
                      </span>
                      <span className="hidden text-right md:block">
                        <span className="block text-sm font-semibold tabular-nums">{formatArr(a.arr)}</span>
                        <span className="block text-xs text-muted-foreground">ARR</span>
                      </span>
                      <Badge className={cn("shrink-0 text-xs", healthStyles[a.health])}>
                        {a.health}
                      </Badge>
                      <Avatar className="hidden size-7 sm:flex" title={a.owner}>
                        <AvatarFallback className="text-[10px]">{a.ownerInitials}</AvatarFallback>
                      </Avatar>
                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground transition-transform",
                          active && "translate-x-0.5 text-foreground"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                )
              })}
              {visible.length === 0 && (
                <li className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                  <Filter className="size-6 text-muted-foreground" />
                  <p className="text-sm font-medium">No accounts match</p>
                  <p className="text-xs text-muted-foreground">
                    Try a different health filter or search term.
                  </p>
                </li>
              )}
            </ul>
          </section>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-xl border bg-card">
              <div className="flex items-start gap-3 p-5">
                <span
                  className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-base font-semibold text-primary"
                  aria-hidden="true"
                >
                  {selected.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold">{selected.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selected.segment} &middot; Owner {selected.owner}
                  </p>
                  <Badge className={cn("mt-2 text-xs", healthStyles[selected.health])}>
                    {selected.health}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 px-5">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-xs text-muted-foreground">Annual value</p>
                  <p className="mt-1 text-lg font-semibold tabular-nums">{formatArr(selected.arr)}</p>
                </div>
                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarClock className="size-3.5" />
                    Renewal
                  </p>
                  <p className="mt-1 text-sm font-semibold">{selected.renewal}</p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Contacts
                </h3>
                <ul className="space-y-3">
                  {selected.contacts.map((c) => (
                    <li key={c.email} className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="text-xs">{c.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{c.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{c.role}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="size-8" aria-label={"Email " + c.name}>
                          <Mail className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8" aria-label={"Call " + c.name}>
                          <Phone className="size-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>

                <Separator className="my-5" />

                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Recent activity
                </h3>
                <ol className="space-y-4">
                  {selected.activity.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 flex flex-col items-center" aria-hidden="true">
                        <span className="size-2 rounded-full bg-primary" />
                        {i < selected.activity.length - 1 && (
                          <span className="mt-1 h-8 w-px bg-border" />
                        )}
                      </span>
                      <div className="-mt-0.5">
                        <p className="text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.when}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <Button className="mt-5 w-full" variant="outline">
                  View full account
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  )
}
