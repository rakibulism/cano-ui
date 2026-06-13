"use client"

import * as React from "react"
import {
  Award,
  Building2,
  ChevronRight,
  CircleDollarSign,
  Download,
  Handshake,
  Mail,
  Phone,
  Plus,
  Search,
  TrendingUp,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Tier = "Platinum" | "Gold" | "Silver"

type Deal = {
  name: string
  stage: string
  value: string
}

type PartnerContact = {
  name: string
  initials: string
  role: string
  email: string
}

type Partner = {
  id: number
  name: string
  initials: string
  region: string
  tier: Tier
  sourcedRevenue: string
  dealsRegistered: number
  manager: string
  signed: string
  deals: Deal[]
  contacts: PartnerContact[]
}

const PARTNERS: Partner[] = [
  {
    id: 1,
    name: "Vertex Cloud Solutions",
    initials: "VC",
    region: "North America",
    tier: "Platinum",
    sourcedRevenue: "$1.84M",
    dealsRegistered: 42,
    manager: "Dana Okafor",
    signed: "Mar 2021",
    deals: [
      { name: "Helios Manufacturing", stage: "Closed Won", value: "$220k" },
      { name: "Cedar Health Group", stage: "Negotiation", value: "$145k" },
      { name: "Orbit Logistics", stage: "Proposal", value: "$98k" },
    ],
    contacts: [
      { name: "Marco Reyes", initials: "MR", role: "Alliance Lead", email: "marco@vertexcloud.com" },
      { name: "Priya Nair", initials: "PN", role: "Solutions Architect", email: "priya@vertexcloud.com" },
    ],
  },
  {
    id: 2,
    name: "Brightway Digital",
    initials: "BD",
    region: "EMEA",
    tier: "Gold",
    sourcedRevenue: "$960k",
    dealsRegistered: 27,
    manager: "Liam Carter",
    signed: "Sep 2022",
    deals: [
      { name: "Nordwind Retail", stage: "Closed Won", value: "$132k" },
      { name: "Apex Insurance", stage: "Discovery", value: "$76k" },
    ],
    contacts: [
      { name: "Sofia Lind", initials: "SL", role: "Partner Owner", email: "sofia@brightway.io" },
      { name: "Tom Becker", initials: "TB", role: "Sales Engineer", email: "tom@brightway.io" },
    ],
  },
  {
    id: 3,
    name: "Meridian Systems",
    initials: "MS",
    region: "APAC",
    tier: "Platinum",
    sourcedRevenue: "$1.42M",
    dealsRegistered: 35,
    manager: "Dana Okafor",
    signed: "Jan 2020",
    deals: [
      { name: "Pacific Freight Co", stage: "Negotiation", value: "$188k" },
      { name: "Kanso Foods", stage: "Closed Won", value: "$210k" },
      { name: "Lumen Media", stage: "Proposal", value: "$64k" },
    ],
    contacts: [
      { name: "Aiko Tanaka", initials: "AT", role: "Channel Director", email: "aiko@meridian.co" },
    ],
  },
  {
    id: 4,
    name: "Cobalt Integrations",
    initials: "CI",
    region: "North America",
    tier: "Silver",
    sourcedRevenue: "$310k",
    dealsRegistered: 11,
    manager: "Nadia Frost",
    signed: "Jun 2023",
    deals: [
      { name: "Granite Builders", stage: "Discovery", value: "$42k" },
      { name: "Pinecrest Schools", stage: "Proposal", value: "$58k" },
    ],
    contacts: [
      { name: "Jordan Pope", initials: "JP", role: "Account Manager", email: "jordan@cobalt.dev" },
    ],
  },
  {
    id: 5,
    name: "Lumière Consulting",
    initials: "LC",
    region: "EMEA",
    tier: "Gold",
    sourcedRevenue: "$745k",
    dealsRegistered: 22,
    manager: "Liam Carter",
    signed: "Nov 2021",
    deals: [
      { name: "Atelier Group", stage: "Closed Won", value: "$96k" },
      { name: "Rivage Hotels", stage: "Negotiation", value: "$120k" },
    ],
    contacts: [
      { name: "Camille Roy", initials: "CR", role: "Managing Partner", email: "camille@lumiere.fr" },
      { name: "Hugo Petit", initials: "HP", role: "Delivery Lead", email: "hugo@lumiere.fr" },
    ],
  },
  {
    id: 6,
    name: "Summit Resellers",
    initials: "SR",
    region: "APAC",
    tier: "Silver",
    sourcedRevenue: "$228k",
    dealsRegistered: 8,
    manager: "Nadia Frost",
    signed: "Feb 2024",
    deals: [
      { name: "Banyan Telecom", stage: "Discovery", value: "$34k" },
    ],
    contacts: [
      { name: "Wei Chen", initials: "WC", role: "Founder", email: "wei@summitresell.com" },
    ],
  },
]

const TIER_FILTERS: Array<{ label: string; value: Tier | "All" }> = [
  { label: "All tiers", value: "All" },
  { label: "Platinum", value: "Platinum" },
  { label: "Gold", value: "Gold" },
  { label: "Silver", value: "Silver" },
]

const TIER_STYLES: Record<Tier, string> = {
  Platinum: "border-primary/40 bg-primary/10 text-primary",
  Gold: "border-border bg-secondary text-foreground",
  Silver: "border-border bg-muted text-muted-foreground",
}

const KPIS = [
  { label: "Active partners", value: "128", delta: "+12 this quarter", icon: Handshake },
  { label: "Sourced revenue", value: "$7.4M", delta: "+18% vs last Q", icon: CircleDollarSign },
  { label: "Deals registered", value: "342", delta: "+47 this month", icon: TrendingUp },
  { label: "Avg. partner ARR", value: "$58k", delta: "+6% YoY", icon: Building2 },
]

export default function PartnerCrm() {
  const [tier, setTier] = React.useState<Tier | "All">("All")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<number>(PARTNERS[0].id)

  const filtered = React.useMemo(() => {
    return PARTNERS.filter((p) => {
      const matchesTier = tier === "All" || p.tier === tier
      const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
      return matchesTier && matchesQuery
    })
  }, [tier, query])

  const selected =
    filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? null

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Handshake className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">ChannelHub</span>
          </div>
          <nav className="ml-2 hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm">Overview</Button>
            <Button variant="secondary" size="sm">Partners</Button>
            <Button variant="ghost" size="sm">Deals</Button>
            <Button variant="ghost" size="sm">Payouts</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add partner
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>DO</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Partner CRM</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage channel partners, registered deals, and sourced revenue.
          </p>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{kpi.label}</span>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">{kpi.value}</div>
              <div className="mt-1 text-xs text-primary">{kpi.delta}</div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-xl border bg-card">
            <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
              <Tabs value={tier} onValueChange={(v) => setTier(v as Tier | "All")}>
                <TabsList>
                  {TIER_FILTERS.map((f) => (
                    <TabsTrigger key={f.value} value={f.value}>
                      {f.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="relative sm:w-56">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search partners"
                  className="pl-8"
                  aria-label="Search partners"
                />
              </div>
            </div>

            <div className="divide-y">
              <div className="hidden grid-cols-[1fr_120px_120px_90px] gap-4 px-4 py-2 text-xs font-medium text-muted-foreground sm:grid">
                <span>Partner</span>
                <span>Sourced</span>
                <span>Deals</span>
                <span>Tier</span>
              </div>
              {filtered.map((p) => {
                const active = selected?.id === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className={cn(
                      "grid w-full grid-cols-1 gap-3 px-4 py-3 text-left transition-colors hover:bg-accent sm:grid-cols-[1fr_120px_120px_90px] sm:items-center sm:gap-4",
                      active && "bg-accent"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{p.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{p.name}</div>
                        <div className="truncate text-xs text-muted-foreground">{p.region}</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium tabular-nums">{p.sourcedRevenue}</div>
                    <div className="text-sm tabular-nums text-muted-foreground">{p.dealsRegistered}</div>
                    <div>
                      <Badge variant="outline" className={cn("gap-1", TIER_STYLES[p.tier])}>
                        <Award className="h-3 w-3" />
                        {p.tier}
                      </Badge>
                    </div>
                  </button>
                )
              })}
              {filtered.length === 0 && (
                <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No partners match your filters.
                </div>
              )}
            </div>
          </section>

          <aside className="rounded-xl border bg-card">
            {selected ? (
              <div className="flex h-full flex-col">
                <div className="border-b p-5">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{selected.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold">{selected.name}</h2>
                      <p className="text-xs text-muted-foreground">{selected.region}</p>
                      <Badge
                        variant="outline"
                        className={cn("mt-2 gap-1", TIER_STYLES[selected.tier])}
                      >
                        <Award className="h-3 w-3" />
                        {selected.tier} partner
                      </Badge>
                    </div>
                  </div>
                  <dl className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/30 p-3">
                      <dt className="text-xs text-muted-foreground">Sourced revenue</dt>
                      <dd className="mt-0.5 text-sm font-semibold tabular-nums">
                        {selected.sourcedRevenue}
                      </dd>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <dt className="text-xs text-muted-foreground">Deals registered</dt>
                      <dd className="mt-0.5 text-sm font-semibold tabular-nums">
                        {selected.dealsRegistered}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Manager: {selected.manager}</span>
                    <span>Since {selected.signed}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    Active deals
                  </h3>
                  <ul className="space-y-2">
                    {selected.deals.map((d) => (
                      <li
                        key={d.name}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{d.name}</div>
                          <div className="text-xs text-muted-foreground">{d.stage}</div>
                        </div>
                        <span className="text-sm font-medium tabular-nums">{d.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Contacts
                  </h3>
                  <ul className="space-y-3">
                    {selected.contacts.map((c) => (
                      <li key={c.email} className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{c.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{c.name}</div>
                          <div className="truncate text-xs text-muted-foreground">{c.role}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" aria-label={"Email " + c.name}>
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label={"Call " + c.name}>
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto border-t p-5">
                  <Button className="w-full">
                    View partner profile
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-12 text-center text-sm text-muted-foreground">
                Select a partner to view details.
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}
