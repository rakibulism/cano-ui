"use client"

import * as React from "react"
import {
  Inbox,
  Search,
  Star,
  Phone,
  Mail,
  Building2,
  MapPin,
  Clock,
  CheckCircle2,
  UserPlus,
  Flame,
  TrendingUp,
  Filter,
  Globe,
  Users,
  Megaphone,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

type Status = "new" | "contacted" | "qualified" | "unqualified"
type Source = "Website" | "Referral" | "LinkedIn" | "Event" | "Cold Outreach"

type Lead = {
  id: number
  name: string
  initials: string
  title: string
  company: string
  location: string
  email: string
  phone: string
  source: Source
  status: Status
  score: number
  value: string
  preview: string
  age: string
  timeline: { time: string; label: string }[]
}

const LEADS: Lead[] = [
  {
    id: 1,
    name: "Dana Whitfield",
    initials: "DW",
    title: "VP of Operations",
    company: "Northwind Logistics",
    location: "Austin, TX",
    email: "dana@northwind.io",
    phone: "+1 (512) 555-0142",
    source: "Website",
    status: "new",
    score: 92,
    value: "$48,000",
    preview: "Requested a demo for a 60-seat operations team.",
    age: "12m ago",
    timeline: [
      { time: "12m ago", label: "Submitted demo request form" },
      { time: "12m ago", label: "Visited Pricing page (3x)" },
      { time: "18m ago", label: "Downloaded Logistics whitepaper" },
    ],
  },
  {
    id: 2,
    name: "Marcus Reyes",
    initials: "MR",
    title: "Head of Growth",
    company: "Bright Labs",
    location: "Denver, CO",
    email: "marcus@brightlabs.com",
    phone: "+1 (303) 555-0188",
    source: "Referral",
    status: "contacted",
    score: 78,
    value: "$24,500",
    preview: "Intro from existing customer at Atlas Group.",
    age: "2h ago",
    timeline: [
      { time: "2h ago", label: "Replied to intro email" },
      { time: "1d ago", label: "Referred by Atlas Group" },
      { time: "1d ago", label: "Added to nurture sequence" },
    ],
  },
  {
    id: 3,
    name: "Priya Anand",
    initials: "PA",
    title: "Director of IT",
    company: "Cedar Health",
    location: "Seattle, WA",
    email: "priya@cedarhealth.org",
    phone: "+1 (206) 555-0119",
    source: "LinkedIn",
    status: "qualified",
    score: 88,
    value: "$72,000",
    preview: "Confirmed budget and Q3 timeline on discovery call.",
    age: "4h ago",
    timeline: [
      { time: "4h ago", label: "Completed discovery call" },
      { time: "1d ago", label: "Accepted LinkedIn connection" },
      { time: "2d ago", label: "Engaged with product post" },
    ],
  },
  {
    id: 4,
    name: "Tom Becker",
    initials: "TB",
    title: "Owner",
    company: "Becker & Sons",
    location: "Chicago, IL",
    email: "tom@beckerandsons.com",
    phone: "+1 (312) 555-0177",
    source: "Event",
    status: "new",
    score: 64,
    value: "$15,000",
    preview: "Scanned badge at SaaS Summit booth.",
    age: "6h ago",
    timeline: [
      { time: "6h ago", label: "Badge scanned at SaaS Summit" },
      { time: "6h ago", label: "Joined live product demo" },
    ],
  },
  {
    id: 5,
    name: "Lena Fischer",
    initials: "LF",
    title: "COO",
    company: "Volta Energy",
    location: "Portland, OR",
    email: "lena@volta.energy",
    phone: "+1 (971) 555-0103",
    source: "Cold Outreach",
    status: "unqualified",
    score: 31,
    value: "$0",
    preview: "Not a fit — no budget allocated this fiscal year.",
    age: "1d ago",
    timeline: [
      { time: "1d ago", label: "Replied: revisit next year" },
      { time: "3d ago", label: "Opened outreach email" },
    ],
  },
  {
    id: 6,
    name: "Sofia Marino",
    initials: "SM",
    title: "Marketing Lead",
    company: "Pivot Studio",
    location: "Miami, FL",
    email: "sofia@pivotstudio.co",
    phone: "+1 (305) 555-0166",
    source: "Website",
    status: "contacted",
    score: 71,
    value: "$19,800",
    preview: "Started a trial, asked about onboarding support.",
    age: "1d ago",
    timeline: [
      { time: "1d ago", label: "Sent onboarding question" },
      { time: "1d ago", label: "Started 14-day trial" },
      { time: "2d ago", label: "Signed up from blog CTA" },
    ],
  },
]

const STATUS_META: Record<Status, { label: string; className: string }> = {
  new: { label: "New", className: "bg-primary/10 text-primary border-transparent" },
  contacted: { label: "Contacted", className: "bg-accent text-foreground border-transparent" },
  qualified: { label: "Qualified", className: "bg-primary text-primary-foreground border-transparent" },
  unqualified: { label: "Unqualified", className: "bg-muted text-muted-foreground border-transparent" },
}

const SOURCE_ICON: Record<Source, React.ElementType> = {
  Website: Globe,
  Referral: Users,
  LinkedIn: Megaphone,
  Event: Star,
  "Cold Outreach": Mail,
}

const FILTERS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "unqualified", label: "Unqualified" },
]

function scoreTone(score: number) {
  if (score >= 80) return "text-primary"
  if (score >= 60) return "text-foreground"
  return "text-muted-foreground"
}

export default function LeadInbox() {
  const [filter, setFilter] = React.useState<Status | "all">("all")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<number>(LEADS[0].id)

  const filtered = LEADS.filter((l) => {
    const matchesFilter = filter === "all" || l.status === filter
    const q = query.trim().toLowerCase()
    const matchesQuery =
      q === "" ||
      l.name.toLowerCase().includes(q) ||
      l.company.toLowerCase().includes(q)
    return matchesFilter && matchesQuery
  })

  const selected =
    filtered.find((l) => l.id === selectedId) ?? filtered[0] ?? LEADS[0]

  const counts = {
    total: LEADS.length,
    new: LEADS.filter((l) => l.status === "new").length,
    qualified: LEADS.filter((l) => l.status === "qualified").length,
    hot: LEADS.filter((l) => l.score >= 80).length,
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Inbox className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Lead Inbox</p>
              <p className="text-xs text-muted-foreground">Pipeline triage</p>
            </div>
          </div>
          <div className="relative ml-auto hidden max-w-xs flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads or companies"
              className="pl-9"
              aria-label="Search leads"
            />
          </div>
          <Button size="sm" className="gap-1.5">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Add lead</span>
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <SummaryCard icon={Inbox} label="Open leads" value={counts.total} hint="in inbox" />
          <SummaryCard icon={Star} label="New today" value={counts.new} hint="awaiting triage" />
          <SummaryCard icon={CheckCircle2} label="Qualified" value={counts.qualified} hint="ready for sales" />
          <SummaryCard icon={Flame} label="Hot (80+)" value={counts.hot} hint="high intent" />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </span>
              {FILTERS.map((f) => {
                const active = filter === f.key
                const count =
                  f.key === "all"
                    ? LEADS.length
                    : LEADS.filter((l) => l.status === f.key).length
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {f.label}
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[10px]",
                        active ? "bg-primary-foreground/20" : "bg-muted"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <Card className="overflow-hidden p-0">
              <ul className="divide-y">
                {filtered.length === 0 && (
                  <li className="px-5 py-12 text-center text-sm text-muted-foreground">
                    No leads match your filters.
                  </li>
                )}
                {filtered.map((lead) => {
                  const SourceIcon = SOURCE_ICON[lead.source]
                  const active = selected.id === lead.id
                  return (
                    <li key={lead.id}>
                      <button
                        onClick={() => setSelectedId(lead.id)}
                        className={cn(
                          "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50",
                          active && "bg-muted/60"
                        )}
                      >
                        <Avatar className="mt-0.5 h-10 w-10">
                          <AvatarFallback>{lead.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold">{lead.name}</p>
                            <Badge
                              variant="outline"
                              className={cn("shrink-0 text-[10px]", STATUS_META[lead.status].className)}
                            >
                              {STATUS_META[lead.status].label}
                            </Badge>
                          </div>
                          <p className="truncate text-xs text-muted-foreground">
                            {lead.title} · {lead.company}
                          </p>
                          <p className="mt-1 truncate text-xs text-muted-foreground">
                            {lead.preview}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              <SourceIcon className="h-3 w-3" />
                              {lead.source}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {lead.age}
                            </span>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className={cn("text-base font-bold tabular-nums", scoreTone(lead.score))}>
                            {lead.score}
                          </span>
                          <span className="text-[10px] text-muted-foreground">score</span>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </div>

          <aside className="lg:col-span-2">
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{selected.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base">{selected.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{selected.title}</p>
                    <Badge
                      variant="outline"
                      className={cn("mt-1.5 text-[10px]", STATUS_META[selected.status].className)}
                    >
                      {STATUS_META[selected.status].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Lead score
                    </span>
                    <span className={cn("text-lg font-bold tabular-nums", scoreTone(selected.score))}>
                      {selected.score}/100
                    </span>
                  </div>
                  <Progress value={selected.score} className="mt-2 h-2" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Estimated value {selected.value}
                  </p>
                </div>

                <div className="grid gap-2 text-sm">
                  <InfoRow icon={Building2} text={selected.company} />
                  <InfoRow icon={MapPin} text={selected.location} />
                  <InfoRow icon={Mail} text={selected.email} />
                  <InfoRow icon={Phone} text={selected.phone} />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Qualify
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1.5">
                    <UserPlus className="h-4 w-4" />
                    Assign
                  </Button>
                  <Button size="sm" variant="ghost" className="px-2" aria-label="Star lead">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>

                <Separator />

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Activity timeline
                  </p>
                  <ol className="space-y-3">
                    {selected.timeline.map((event, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span
                            className={cn(
                              "mt-1 h-2 w-2 rounded-full",
                              i === 0 ? "bg-primary" : "bg-muted-foreground/40"
                            )}
                          />
                          {i < selected.timeline.length - 1 && (
                            <span className="mt-1 w-px flex-1 bg-border" />
                          )}
                        </div>
                        <div className="pb-1">
                          <p className="text-sm leading-snug">{event.label}</p>
                          <p className="text-xs text-muted-foreground">{event.time}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <Button variant="link" size="sm" className="h-auto gap-1 p-0">
                  View full profile
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          Showing {filtered.length} of {LEADS.length} leads · Synced just now
        </div>
      </footer>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ElementType
  label: string
  value: number
  hint: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-none tabular-nums">{value}</p>
          <p className="mt-1 truncate text-xs font-medium">{label}</p>
          <p className="truncate text-[11px] text-muted-foreground">{hint}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function InfoRow({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate text-foreground">{text}</span>
    </div>
  )
}
