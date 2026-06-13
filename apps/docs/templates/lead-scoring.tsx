"use client"

import * as React from "react"
import { Search, Flame, Sun, Snowflake, Mail, Phone, Building2, TrendingUp, Calendar, ArrowUpRight, Target, Users, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

type Tier = "Hot" | "Warm" | "Cold"
type Grade = "A" | "B" | "C" | "D"

interface Lead {
  id: number
  name: string
  initials: string
  company: string
  title: string
  email: string
  phone: string
  score: number
  grade: Grade
  tier: Tier
  value: string
  source: string
  lastTouch: string
  signals: string[]
}

const LEADS: Lead[] = [
  { id: 1, name: "Dana Whitfield", initials: "DW", company: "Northwind Labs", title: "VP Engineering", email: "dana@northwind.io", phone: "+1 415 555 0188", score: 94, grade: "A", tier: "Hot", value: "$48,000", source: "Demo request", lastTouch: "2 hours ago", signals: ["Booked a demo", "Visited pricing 4x", "Opened 3 emails"] },
  { id: 2, name: "Marcus Lindholm", initials: "ML", company: "Cobalt Systems", title: "Head of Ops", email: "marcus@cobalt.co", phone: "+1 312 555 0142", score: 88, grade: "A", tier: "Hot", value: "$36,500", source: "Referral", lastTouch: "Yesterday", signals: ["Replied to outreach", "500+ employees"] },
  { id: 3, name: "Priya Nandakumar", initials: "PN", company: "Helix Retail", title: "Director Growth", email: "priya@helix.com", phone: "+1 646 555 0119", score: 76, grade: "B", tier: "Warm", value: "$22,000", source: "Webinar", lastTouch: "3 days ago", signals: ["Attended webinar", "Downloaded guide"] },
  { id: 4, name: "Tomás Reyes", initials: "TR", company: "Brightpath", title: "Founder", email: "tomas@brightpath.dev", phone: "+1 503 555 0173", score: 71, grade: "B", tier: "Warm", value: "$18,400", source: "Content", lastTouch: "5 days ago", signals: ["Read 2 blog posts", "Free trial active"] },
  { id: 5, name: "Aisha Bello", initials: "AB", company: "Vantage Finance", title: "CFO", email: "aisha@vantage.fin", phone: "+1 212 555 0156", score: 58, grade: "C", tier: "Warm", value: "$12,900", source: "Cold email", lastTouch: "1 week ago", signals: ["Opened 1 email"] },
  { id: 6, name: "Owen Castellano", initials: "OC", company: "Drift Media", title: "Marketing Lead", email: "owen@driftmedia.tv", phone: "+1 718 555 0134", score: 49, grade: "C", tier: "Cold", value: "$8,200", source: "Event", lastTouch: "2 weeks ago", signals: ["Scanned badge at event"] },
  { id: 7, name: "Hana Sato", initials: "HS", company: "Lumen Health", title: "Product Manager", email: "hana@lumen.health", phone: "+1 408 555 0190", score: 34, grade: "D", tier: "Cold", value: "$4,500", source: "Newsletter", lastTouch: "3 weeks ago", signals: ["Subscribed to newsletter"] },
  { id: 8, name: "Felix Achterberg", initials: "FA", company: "Orbit Logistics", title: "COO", email: "felix@orbit.cargo", phone: "+1 305 555 0127", score: 27, grade: "D", tier: "Cold", value: "$3,100", source: "Cold email", lastTouch: "1 month ago", signals: ["No engagement yet"] },
]

const TIERS: { tier: Tier; icon: React.ComponentType<{ className?: string }> }[] = [
  { tier: "Hot", icon: Flame },
  { tier: "Warm", icon: Sun },
  { tier: "Cold", icon: Snowflake },
]

const GRADE_SUMMARY: { grade: Grade; label: string; count: number; pipeline: string; share: number }[] = [
  { grade: "A", label: "Sales-ready", count: 2, pipeline: "$84.5k", share: 38 },
  { grade: "B", label: "Nurturing", count: 2, pipeline: "$40.4k", share: 24 },
  { grade: "C", label: "Engaging", count: 2, pipeline: "$21.1k", share: 18 },
  { grade: "D", label: "New / cold", count: 2, pipeline: "$7.6k", share: 20 },
]

function gradeBadgeClass(grade: Grade) {
  switch (grade) {
    case "A":
      return "bg-primary text-primary-foreground"
    case "B":
      return "bg-primary/10 text-primary"
    case "C":
      return "bg-secondary text-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function tierBadgeClass(tier: Tier) {
  switch (tier) {
    case "Hot":
      return "border-primary text-primary"
    case "Warm":
      return "border text-foreground"
    default:
      return "border text-muted-foreground"
  }
}

export default function LeadScoringPage() {
  const [activeTiers, setActiveTiers] = React.useState<Tier[]>([])
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<number>(LEADS[0].id)

  function toggleTier(tier: Tier) {
    setActiveTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    )
  }

  const filtered = LEADS.filter((lead) => {
    const matchesTier = activeTiers.length === 0 || activeTiers.includes(lead.tier)
    const matchesQuery =
      query.trim() === "" ||
      lead.name.toLowerCase().includes(query.trim().toLowerCase())
    return matchesTier && matchesQuery
  })

  const selected = LEADS.find((l) => l.id === selectedId) ?? LEADS[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Target className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">LeadGrade</p>
              <p className="text-xs text-muted-foreground">Pipeline scoring</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Primary">
            <Button variant="secondary" size="sm">Leads</Button>
            <Button variant="ghost" size="sm">Accounts</Button>
            <Button variant="ghost" size="sm">Reports</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">Export</Button>
            <Button size="sm">
              <ArrowUpRight className="h-4 w-4" />
              New lead
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Lead scoring</h1>
          <p className="text-sm text-muted-foreground">
            Ranked by fit and engagement across {LEADS.length} active leads.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pipeline by grade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {GRADE_SUMMARY.map((g) => (
                    <div key={g.grade} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={cn("flex h-6 w-6 items-center justify-center rounded text-xs font-bold", gradeBadgeClass(g.grade))}>
                            {g.grade}
                          </span>
                          <span className="text-sm font-medium">{g.label}</span>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">{g.pipeline}</span>
                      </div>
                      <Progress value={g.share} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">{g.count} leads</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="grid grid-cols-2 gap-4 pt-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-xs">Leads</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold tabular-nums">{LEADS.length}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs">Pipeline</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold tabular-nums">$153k</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Flame className="h-4 w-4" />
                      <span className="text-xs">Hot</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold tabular-nums">2</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs">Avg score</span>
                    </div>
                    <p className="mt-1 text-xl font-semibold tabular-nums">62</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          <section className="lg:col-span-6">
            <Card>
              <CardHeader className="gap-3 pb-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search leads by name..."
                    className="pl-9"
                    aria-label="Search leads by name"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {TIERS.map(({ tier, icon: Icon }) => {
                    const active = activeTiers.includes(tier)
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => toggleTier(tier)}
                        aria-pressed={active}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "bg-background text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {tier}
                      </button>
                    )
                  })}
                  {(activeTiers.length > 0 || query) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                      onClick={() => {
                        setActiveTiers([])
                        setQuery("")
                      }}
                    >
                      Clear
                    </Button>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                    {filtered.length} shown
                  </span>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <ul className="divide-y">
                  {filtered.map((lead) => {
                    const isSelected = lead.id === selected.id
                    return (
                      <li key={lead.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(lead.id)}
                          className={cn(
                            "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                            isSelected && "bg-muted"
                          )}
                        >
                          <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-bold", gradeBadgeClass(lead.grade))}>
                            {lead.grade}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-sm font-medium">{lead.name}</p>
                              <Badge variant="outline" className={cn("h-5 shrink-0 gap-1 px-1.5 text-[10px]", tierBadgeClass(lead.tier))}>
                                {lead.tier}
                              </Badge>
                            </div>
                            <p className="truncate text-xs text-muted-foreground">{lead.company}</p>
                          </div>
                          <div className="hidden w-28 shrink-0 sm:block">
                            <Progress value={lead.score} className="h-1.5" />
                          </div>
                          <span className="w-7 shrink-0 text-right text-sm font-semibold tabular-nums">
                            {lead.score}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                  {filtered.length === 0 && (
                    <li className="px-4 py-12 text-center text-sm text-muted-foreground">
                      No leads match your filters.
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </section>

          <aside className="lg:col-span-3">
            <Card className="lg:sticky lg:top-20">
              <CardHeader className="items-center text-center">
                <Avatar className="mx-auto h-14 w-14">
                  <AvatarFallback className="text-base">{selected.initials}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-2 text-base">{selected.name}</CardTitle>
                <CardDescription>{selected.title}</CardDescription>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className={cn("flex h-7 w-7 items-center justify-center rounded text-sm font-bold", gradeBadgeClass(selected.grade))}>
                    {selected.grade}
                  </span>
                  <Badge variant="outline" className={cn("gap-1", tierBadgeClass(selected.tier))}>
                    {selected.tier} lead
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Lead score</span>
                    <span className="text-sm font-semibold tabular-nums">{selected.score}/100</span>
                  </div>
                  <Progress value={selected.score} className="mt-2 h-2" />
                </div>

                <dl className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span className="text-foreground">{selected.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate text-foreground">{selected.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span className="text-foreground">{selected.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4 shrink-0" />
                    <span className="text-foreground">{selected.value} est. value</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span className="text-foreground">Last touch {selected.lastTouch}</span>
                  </div>
                </dl>

                <Separator />

                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Scoring signals</p>
                  <ul className="space-y-1.5">
                    {selected.signals.map((signal) => (
                      <li key={signal} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium text-muted-foreground">Source</p>
                  <Badge variant="secondary">{selected.source}</Badge>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full">
                  <Mail className="h-4 w-4" />
                  Email lead
                </Button>
                <Button variant="outline" className="w-full">View full profile</Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>LeadGrade CRM</p>
          <p>Scores recalculated every 15 minutes.</p>
        </div>
      </footer>
    </div>
  )
}
