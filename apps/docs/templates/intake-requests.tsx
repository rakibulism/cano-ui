"use client"

import * as React from "react"
import {
  Bug,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Inbox,
  MessageSquare,
  Palette,
  Search,
  Sparkles,
  UserPlus,
  Wrench,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Status = "New" | "Triaged" | "In progress" | "Done"
type Priority = "Urgent" | "High" | "Medium" | "Low"
type ReqType = "Bug" | "Feature" | "Design" | "Content" | "Support"

type Request = {
  id: string
  ref: string
  title: string
  summary: string
  type: ReqType
  priority: Priority
  status: Status
  requester: string
  initials: string
  team: string
  submitted: string
  comments: number
  attachments: number
}

const REQUESTS: Request[] = [
  {
    id: "r1",
    ref: "INT-4821",
    title: "Checkout page crashes on Safari 17",
    summary:
      "Customers on Safari 17 report a blank screen after applying a promo code. Reproduced on three devices. Blocks roughly 12% of mobile checkouts.",
    type: "Bug",
    priority: "Urgent",
    status: "New",
    requester: "Dana Whitfield",
    initials: "DW",
    team: "Customer Success",
    submitted: "8m ago",
    comments: 3,
    attachments: 2,
  },
  {
    id: "r2",
    ref: "INT-4818",
    title: "Add CSV export to the analytics dashboard",
    summary:
      "Enterprise accounts want to export the weekly engagement table to CSV. Requested by two of our top five accounts during QBRs.",
    type: "Feature",
    priority: "High",
    status: "New",
    requester: "Marcus Lin",
    initials: "ML",
    team: "Sales",
    submitted: "41m ago",
    comments: 1,
    attachments: 0,
  },
  {
    id: "r3",
    ref: "INT-4805",
    title: "Refresh onboarding illustration set",
    summary:
      "The current onboarding artwork feels dated against the new brand. Need three updated spot illustrations matching the 2026 palette.",
    type: "Design",
    priority: "Medium",
    status: "Triaged",
    requester: "Priya Nair",
    initials: "PN",
    team: "Brand",
    submitted: "2h ago",
    comments: 5,
    attachments: 4,
  },
  {
    id: "r4",
    ref: "INT-4799",
    title: "Update pricing page copy for new tiers",
    summary:
      "We are launching the Scale tier next month. The pricing page needs revised copy, a new comparison row, and an updated FAQ entry.",
    type: "Content",
    priority: "High",
    status: "Triaged",
    requester: "Eli Brooks",
    initials: "EB",
    team: "Marketing",
    submitted: "5h ago",
    comments: 2,
    attachments: 1,
  },
  {
    id: "r5",
    ref: "INT-4781",
    title: "SSO login loops for Okta users",
    summary:
      "A subset of Okta-provisioned users get bounced back to the login screen. Mitigation deployed; root cause still under investigation.",
    type: "Bug",
    priority: "Urgent",
    status: "In progress",
    requester: "Sofia Reyes",
    initials: "SR",
    team: "Support",
    submitted: "Yesterday",
    comments: 9,
    attachments: 3,
  },
  {
    id: "r6",
    ref: "INT-4774",
    title: "Build in-app notification preferences",
    summary:
      "Let users choose which notifications they receive in-app versus by email. Designs approved; engineering picked it up this sprint.",
    type: "Feature",
    priority: "Medium",
    status: "In progress",
    requester: "Tomas Adler",
    initials: "TA",
    team: "Product",
    submitted: "2d ago",
    comments: 6,
    attachments: 0,
  },
  {
    id: "r7",
    ref: "INT-4760",
    title: "Help center search returns no results",
    summary:
      "Searching common terms in the help center returned empty. Index rebuild resolved the issue and was verified across locales.",
    type: "Support",
    priority: "Low",
    status: "Done",
    requester: "Grace Okafor",
    initials: "GO",
    team: "Support",
    submitted: "4d ago",
    comments: 4,
    attachments: 1,
  },
  {
    id: "r8",
    ref: "INT-4742",
    title: "Dark mode contrast fixes on settings",
    summary:
      "Several labels on the settings screen failed contrast checks in dark mode. Tokens updated and re-audited against WCAG AA.",
    type: "Design",
    priority: "Low",
    status: "Done",
    requester: "Noah Feld",
    initials: "NF",
    team: "Design",
    submitted: "6d ago",
    comments: 2,
    attachments: 2,
  },
]

const TABS: { label: Status | "All"; }[] = [
  { label: "All" },
  { label: "New" },
  { label: "Triaged" },
  { label: "In progress" },
  { label: "Done" },
]

const TYPE_META: Record<ReqType, { icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  Bug: { icon: Bug, tone: "text-destructive" },
  Feature: { icon: Sparkles, tone: "text-primary" },
  Design: { icon: Palette, tone: "text-foreground" },
  Content: { icon: FileText, tone: "text-foreground" },
  Support: { icon: Wrench, tone: "text-muted-foreground" },
}

function priorityBadge(p: Priority): "default" | "secondary" | "outline" | "destructive" {
  if (p === "Urgent") return "destructive"
  if (p === "High") return "default"
  if (p === "Medium") return "secondary"
  return "outline"
}

function statusDot(s: Status): string {
  if (s === "New") return "bg-primary"
  if (s === "Triaged") return "bg-secondary"
  if (s === "In progress") return "bg-foreground"
  return "bg-muted-foreground"
}

export default function IntakeRequestsTemplate() {
  const [tab, setTab] = React.useState<Status | "All">("All")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<string>("r1")
  const [assigned, setAssigned] = React.useState<Record<string, boolean>>({})

  const filtered = React.useMemo(() => {
    return REQUESTS.filter((r) => {
      const matchTab = tab === "All" || r.status === tab
      const q = query.trim().toLowerCase()
      const matchQuery =
        q === "" ||
        r.title.toLowerCase().includes(q) ||
        r.ref.toLowerCase().includes(q) ||
        r.requester.toLowerCase().includes(q)
      return matchTab && matchQuery
    })
  }, [tab, query])

  React.useEffect(() => {
    if (filtered.length > 0 && !filtered.some((r) => r.id === selectedId)) {
      setSelectedId(filtered[0].id)
    }
  }, [filtered, selectedId])

  const selected = REQUESTS.find((r) => r.id === selectedId) ?? null

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { All: REQUESTS.length }
    for (const r of REQUESTS) c[r.status] = (c[r.status] ?? 0) + 1
    return c
  }, [])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Inbox className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Work Intake</p>
              <p className="text-xs text-muted-foreground">Request queue</p>
            </div>
          </div>
          <div className="relative ml-auto hidden flex-1 max-w-sm sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search requests, refs, people"
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            <Filter className="size-4" />
            Filters
          </Button>
          <Button size="sm">
            <UserPlus className="size-4" />
            New request
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Incoming requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Triage and route work as it lands. {counts["New"] ?? 0} new this view.
          </p>
        </div>

        <div className="relative sm:hidden">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search requests"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((t) => {
            const active = tab === t.label
            return (
              <button
                key={t.label}
                onClick={() => setTab(t.label)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "bg-card text-muted-foreground hover:bg-muted"
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs",
                    active ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  )}
                >
                  {counts[t.label] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="flex flex-col gap-3">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 px-6 py-16 text-center">
                <Inbox className="size-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">No matching requests</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different status or clear your search.
                </p>
              </div>
            ) : (
              filtered.map((r) => {
                const TypeIcon = TYPE_META[r.type].icon
                const active = r.id === selectedId
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={cn(
                      "group w-full rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/40",
                      active && "border-primary ring-1 ring-primary"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted",
                          TYPE_META[r.type].tone
                        )}
                      >
                        <TypeIcon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground">{r.ref}</span>
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <span className={cn("size-1.5 rounded-full", statusDot(r.status))} />
                            {r.status}
                          </span>
                        </div>
                        <h3 className="mt-1 truncate text-sm font-semibold">{r.title}</h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.summary}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                          <Badge variant={priorityBadge(r.priority)}>{r.priority}</Badge>
                          <Badge variant="outline">{r.type}</Badge>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Avatar className="size-5">
                              <AvatarFallback className="text-[10px]">{r.initials}</AvatarFallback>
                            </Avatar>
                            {r.requester}
                          </span>
                          <span className="ml-auto inline-flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <MessageSquare className="size-3.5" />
                              {r.comments}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3.5" />
                              {r.submitted}
                            </span>
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="mt-2 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </button>
                )
              })
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            {selected ? (
              <div className="rounded-xl border bg-card">
                <div className="border-b p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">{selected.ref}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className={cn("size-1.5 rounded-full", statusDot(selected.status))} />
                      {selected.status}
                    </span>
                  </div>
                  <h2 className="mt-2 text-base font-semibold leading-snug">{selected.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant={priorityBadge(selected.priority)}>{selected.priority}</Badge>
                    <Badge variant="outline">{selected.type}</Badge>
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Description
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground">{selected.summary}</p>
                  </div>

                  <Separator />

                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-xs text-muted-foreground">Requester</dt>
                      <dd className="mt-1 flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">{selected.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{selected.requester}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Team</dt>
                      <dd className="mt-1 font-medium">{selected.team}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Submitted</dt>
                      <dd className="mt-1 font-medium">{selected.submitted}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Activity</dt>
                      <dd className="mt-1 flex items-center gap-3 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="size-3.5 text-muted-foreground" />
                          {selected.comments}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <FileText className="size-3.5 text-muted-foreground" />
                          {selected.attachments}
                        </span>
                      </dd>
                    </div>
                  </dl>

                  <Separator />

                  <div className="flex flex-col gap-2">
                    {assigned[selected.id] ? (
                      <Button disabled className="justify-center">
                        <Check className="size-4" />
                        Assigned to you
                      </Button>
                    ) : (
                      <Button
                        className="justify-center"
                        onClick={() =>
                          setAssigned((prev) => ({ ...prev, [selected.id]: true }))
                        }
                      >
                        <UserPlus className="size-4" />
                        Accept & assign to me
                      </Button>
                    )}
                    <Button variant="outline" className="justify-center">
                      Reassign
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
                <p className="text-sm text-muted-foreground">Select a request to view details.</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}
