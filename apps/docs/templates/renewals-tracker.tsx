"use client"
import * as React from "react"
import {
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  CalendarClock,
  Building2,
  Mail,
  Phone,
  ArrowUpRight,
  Filter,
  ChevronRight,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

type Status = "Upcoming" | "At risk" | "Renewed"
type Health = "Healthy" | "Watch" | "Critical"

type Account = {
  id: string
  name: string
  segment: string
  owner: string
  arr: number
  status: Status
  health: Health
  daysToRenewal: number
  renewalDate: string
  usage: number
  contact: string
  email: string
  phone: string
  note: string
}

const ACCOUNTS: Account[] = [
  { id: "ACC-1042", name: "Northwind Logistics", segment: "Enterprise", owner: "Priya Nair", arr: 184000, status: "At risk", health: "Critical", daysToRenewal: 12, renewalDate: "Jun 25", usage: 34, contact: "Dana Whitaker", email: "dana@northwind.co", phone: "+1 (415) 555-0182", note: "Usage down 40% QoQ. Champion left in April; new stakeholder unconvinced on ROI." },
  { id: "ACC-1108", name: "Helios Retail Group", segment: "Mid-Market", owner: "Marcus Lee", arr: 96000, status: "Upcoming", health: "Healthy", daysToRenewal: 41, renewalDate: "Jul 24", usage: 88, contact: "Owen Park", email: "owen@heliosretail.com", phone: "+1 (312) 555-0144", note: "Strong adoption, expansion likely. Proposed 2 added seats at renewal." },
  { id: "ACC-1190", name: "Quanta Biosciences", segment: "Enterprise", owner: "Priya Nair", arr: 220000, status: "Upcoming", health: "Watch", daysToRenewal: 28, renewalDate: "Jul 11", usage: 61, contact: "Lena Voss", email: "lena@quanta.bio", phone: "+1 (617) 555-0117", note: "Procurement review in progress. Awaiting security questionnaire sign-off." },
  { id: "ACC-1233", name: "Cobalt Studios", segment: "SMB", owner: "Aisha Khan", arr: 28000, status: "Renewed", health: "Healthy", daysToRenewal: 0, renewalDate: "May 30", usage: 92, contact: "Theo Marsh", email: "theo@cobalt.studio", phone: "+1 (206) 555-0198", note: "Renewed 12-month term, +1 add-on module. NPS 9." },
  { id: "ACC-1276", name: "Vertex Financial", segment: "Enterprise", owner: "Marcus Lee", arr: 312000, status: "At risk", health: "Critical", daysToRenewal: 9, renewalDate: "Jun 22", usage: 41, contact: "Grace Liu", email: "grace@vertexfin.com", phone: "+1 (212) 555-0163", note: "Competitor in eval. Exec sponsor meeting scheduled to defend value." },
  { id: "ACC-1301", name: "Tideway Media", segment: "Mid-Market", owner: "Aisha Khan", arr: 74000, status: "Upcoming", health: "Watch", daysToRenewal: 35, renewalDate: "Jul 18", usage: 57, contact: "Sam Okoye", email: "sam@tideway.media", phone: "+1 (404) 555-0120", note: "Adoption recovering after onboarding refresh. Monitoring weekly." },
  { id: "ACC-1355", name: "Brightline Health", segment: "Enterprise", owner: "Priya Nair", arr: 158000, status: "Renewed", health: "Healthy", daysToRenewal: 0, renewalDate: "Jun 02", usage: 79, contact: "Mia Cho", email: "mia@brightline.health", phone: "+1 (503) 555-0155", note: "Multi-year renewal closed. Reference customer for Q3 launch." },
  { id: "ACC-1402", name: "Apex Manufacturing", segment: "Mid-Market", owner: "Marcus Lee", arr: 88000, status: "Upcoming", health: "Healthy", daysToRenewal: 47, renewalDate: "Jul 30", usage: 84, contact: "Ravi Patel", email: "ravi@apexmfg.com", phone: "+1 (713) 555-0171", note: "On track. QBR completed; success plan green across all goals." },
]

const TABS: Array<{ value: "All" | Status; label: string }> = [
  { value: "All", label: "All" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "At risk", label: "At risk" },
  { value: "Renewed", label: "Renewed" },
]

function fmtMoney(n: number): string {
  return "$" + n.toLocaleString("en-US")
}

function healthClasses(h: Health): string {
  if (h === "Critical") return "border-destructive/40 bg-destructive/10 text-destructive"
  if (h === "Watch") return "border-primary/40 bg-primary/10 text-primary"
  return "border-border bg-muted text-muted-foreground"
}

function statusBadgeVariant(s: Status): "default" | "secondary" | "outline" | "destructive" {
  if (s === "At risk") return "destructive"
  if (s === "Renewed") return "secondary"
  return "outline"
}

export default function RenewalsTracker() {
  const [filter, setFilter] = React.useState<"All" | Status>("All")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<string>(ACCOUNTS[0].id)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return ACCOUNTS.filter((a) => {
      const matchStatus = filter === "All" || a.status === filter
      const matchQuery =
        q === "" ||
        a.name.toLowerCase().includes(q) ||
        a.owner.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      return matchStatus && matchQuery
    })
  }, [filter, query])

  const selected = React.useMemo(
    () => ACCOUNTS.find((a) => a.id === selectedId) ?? ACCOUNTS[0],
    [selectedId]
  )

  const arrUpForRenewal = ACCOUNTS.filter((a) => a.status !== "Renewed").reduce((s, a) => s + a.arr, 0)
  const atRiskArr = ACCOUNTS.filter((a) => a.status === "At risk").reduce((s, a) => s + a.arr, 0)
  const renewedArr = ACCOUNTS.filter((a) => a.status === "Renewed").reduce((s, a) => s + a.arr, 0)
  const atRiskCount = ACCOUNTS.filter((a) => a.status === "At risk").length

  const kpis = [
    {
      label: "ARR up for renewal",
      value: fmtMoney(arrUpForRenewal),
      sub: "6 accounts in window",
      icon: CircleDollarSign,
      tone: "text-foreground",
      chip: "+8% vs last qtr",
    },
    {
      label: "At-risk ARR",
      value: fmtMoney(atRiskArr),
      sub: atRiskCount + " accounts flagged",
      icon: AlertTriangle,
      tone: "text-destructive",
      chip: "Needs attention",
    },
    {
      label: "Renewed ARR",
      value: fmtMoney(renewedArr),
      sub: "2 accounts closed",
      icon: CheckCircle2,
      tone: "text-foreground",
      chip: "94% gross retention",
    },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Renewals Tracker</p>
              <p className="text-xs text-muted-foreground">Q3 renewal cohort</p>
            </div>
          </div>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <Button variant="outline" size="sm">
              <Activity className="mr-1.5 h-4 w-4" />
              Forecast
            </Button>
            <Button size="sm">
              <ArrowUpRight className="mr-1.5 h-4 w-4" />
              New renewal play
            </Button>
          </div>
          <Avatar className="h-8 w-8 md:ml-2">
            <AvatarFallback>PN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Upcoming renewals</h1>
          <p className="text-sm text-muted-foreground">
            Track ARR at stake, surface at-risk accounts, and act before the renewal date.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {kpis.map((k) => {
            const Icon = k.icon
            return (
              <Card key={k.label} className="overflow-hidden">
                <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{k.label}</CardDescription>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Icon className={cn("h-4 w-4", k.tone)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={cn("text-2xl font-semibold tracking-tight", k.tone)}>{k.value}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{k.sub}</p>
                    <span className="text-[11px] font-medium text-muted-foreground">{k.chip}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-base">Renewal pipeline</CardTitle>
                    <CardDescription>
                      {filtered.length} of {ACCOUNTS.length} accounts
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search account or owner"
                      className="pl-8"
                      aria-label="Search renewals"
                    />
                  </div>
                </div>
                <Tabs value={filter} onValueChange={(v) => setFilter(v as "All" | Status)}>
                  <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
                    {TABS.map((t) => (
                      <TabsTrigger key={t.value} value={t.value}>
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y border-t">
                  {filtered.length === 0 && (
                    <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
                      <Filter className="h-6 w-6 text-muted-foreground" />
                      <p className="text-sm font-medium">No accounts match</p>
                      <p className="text-xs text-muted-foreground">
                        Try a different status or clear the search.
                      </p>
                    </div>
                  )}
                  {filtered.map((a) => {
                    const isActive = a.id === selectedId
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setSelectedId(a.id)}
                        aria-pressed={isActive}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:px-6",
                          isActive && "bg-accent"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                            isActive ? "border-primary bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          )}
                        >
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-medium">{a.name}</p>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                                healthClasses(a.health)
                              )}
                            >
                              {a.health}
                            </span>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">
                            {a.segment} · {fmtMoney(a.arr)} ARR · {a.owner}
                          </p>
                        </div>
                        <div className="hidden text-right sm:block">
                          <Badge variant={statusBadgeVariant(a.status)}>{a.status}</Badge>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {a.status === "Renewed" ? "Closed " + a.renewalDate : a.daysToRenewal + "d to renewal"}
                          </p>
                        </div>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                            isActive && "translate-x-0.5 text-primary"
                          )}
                        />
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">{selected.name}</CardTitle>
                    <CardDescription>
                      {selected.id} · {selected.segment}
                    </CardDescription>
                  </div>
                  <Badge variant={statusBadgeVariant(selected.status)}>{selected.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Annual ARR</p>
                    <p className="mt-0.5 text-lg font-semibold">{fmtMoney(selected.arr)}</p>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Renewal date</p>
                    <p className="mt-0.5 text-lg font-semibold">{selected.renewalDate}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Days to renewal</span>
                    <span className="font-medium">
                      {selected.status === "Renewed" ? "Renewed" : selected.daysToRenewal + " days"}
                    </span>
                  </div>
                  <Progress value={selected.status === "Renewed" ? 100 : Math.max(8, 100 - selected.daysToRenewal)} />
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Product usage</span>
                    <span className="font-medium">{selected.usage}%</span>
                  </div>
                  <Progress value={selected.usage} />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      healthClasses(selected.health)
                    )}
                  >
                    {selected.health}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Owner: {selected.owner}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Primary contact</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {selected.contact.split(" ").map((p) => p[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{selected.contact}</p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {selected.email}
                      </p>
                    </div>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {selected.phone}
                  </p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-3">
                  <p className="text-xs font-medium">Renewal note</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{selected.note}</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    Log activity
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    Open account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Renewals Tracker · CRM workspace</p>
          <p>Pipeline updated 2 hours ago</p>
        </div>
      </footer>
    </div>
  )
}
