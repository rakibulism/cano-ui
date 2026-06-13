"use client"

import * as React from "react"
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Filter,
  Headset,
  Inbox,
  LifeBuoy,
  Paperclip,
  Send,
  Settings,
  Tag,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type Priority = "urgent" | "high" | "normal" | "low"
type Status = "open" | "pending" | "solved"

type Message = {
  author: string
  initials: string
  agent: boolean
  time: string
  body: string
}

type Ticket = {
  id: string
  subject: string
  requester: string
  initials: string
  email: string
  channel: string
  priority: Priority
  status: Status
  updated: string
  sla: string
  slaBreached: boolean
  tags: string[]
  thread: Message[]
}

const TICKETS: Ticket[] = [
  {
    id: "TKT-4821",
    subject: "Checkout fails with a 402 on annual upgrade",
    requester: "Maya Chen",
    initials: "MC",
    email: "maya.chen@northwind.io",
    channel: "Email",
    priority: "urgent",
    status: "open",
    updated: "4m ago",
    sla: "Due in 26m",
    slaBreached: false,
    tags: ["billing", "checkout"],
    thread: [
      {
        author: "Maya Chen",
        initials: "MC",
        agent: false,
        time: "10:02 AM",
        body: "I'm trying to move my team to the annual plan but checkout keeps throwing a 402 right after I hit confirm. Card is valid — it worked for the monthly charge last week.",
      },
      {
        author: "Ari Romero",
        initials: "AR",
        agent: true,
        time: "10:11 AM",
        body: "Thanks for flagging, Maya — I can see the failed attempts on our side. It looks like the annual SKU isn't picking up your saved card. I'm escalating to billing now and will have a fix shortly.",
      },
    ],
  },
  {
    id: "TKT-4820",
    subject: "SSO login loop after the SAML update",
    requester: "Devon Park",
    initials: "DP",
    email: "devon@arcadialabs.com",
    channel: "Web form",
    priority: "high",
    status: "open",
    updated: "22m ago",
    sla: "Due in 1h 40m",
    slaBreached: false,
    tags: ["auth", "sso"],
    thread: [
      {
        author: "Devon Park",
        initials: "DP",
        agent: false,
        time: "9:31 AM",
        body: "Since this morning every SSO attempt bounces back to the login screen. Half my team can't get in. Anything change on your end overnight?",
      },
    ],
  },
  {
    id: "TKT-4816",
    subject: "Export to CSV is missing the last column",
    requester: "Priya Nair",
    initials: "PN",
    email: "priya@studioform.design",
    channel: "Chat",
    priority: "normal",
    status: "pending",
    updated: "1h ago",
    sla: "Due in 5h",
    slaBreached: false,
    tags: ["reports", "export"],
    thread: [
      {
        author: "Priya Nair",
        initials: "PN",
        agent: false,
        time: "Yesterday",
        body: "When I export the weekly report the final column (owner) is always blank in the CSV, though it shows fine in the dashboard.",
      },
      {
        author: "Ari Romero",
        initials: "AR",
        agent: true,
        time: "Yesterday",
        body: "Reproduced it — owner is dropped only on the CSV path. Pushed it to engineering. Waiting on a patch ETA before I close the loop with you.",
      },
    ],
  },
  {
    id: "TKT-4809",
    subject: "How do I invite read-only members?",
    requester: "Sam Idris",
    initials: "SI",
    email: "sam@brightfold.co",
    channel: "Email",
    priority: "low",
    status: "pending",
    updated: "3h ago",
    sla: "Due tomorrow",
    slaBreached: false,
    tags: ["how-to", "teams"],
    thread: [
      {
        author: "Sam Idris",
        initials: "SI",
        agent: false,
        time: "8:04 AM",
        body: "Is there a way to add someone who can view dashboards but not edit anything? Can't find the role in settings.",
      },
    ],
  },
  {
    id: "TKT-4798",
    subject: "Webhook retries hammering our endpoint",
    requester: "Lena Okafor",
    initials: "LO",
    email: "lena@meridian.dev",
    channel: "API",
    priority: "high",
    status: "open",
    updated: "5h ago",
    sla: "Overdue 18m",
    slaBreached: true,
    tags: ["webhooks", "api"],
    thread: [
      {
        author: "Lena Okafor",
        initials: "LO",
        agent: false,
        time: "6:12 AM",
        body: "Our endpoint is getting the same event delivered ~40 times a minute. Looks like retries aren't backing off after a 200. Can you throttle this?",
      },
    ],
  },
  {
    id: "TKT-4771",
    subject: "Refund processed, thanks for the help",
    requester: "Theo Vance",
    initials: "TV",
    email: "theo@cloudpine.io",
    channel: "Chat",
    priority: "normal",
    status: "solved",
    updated: "1d ago",
    sla: "Met",
    slaBreached: false,
    tags: ["billing", "refund"],
    thread: [
      {
        author: "Theo Vance",
        initials: "TV",
        agent: false,
        time: "Mon",
        body: "Got the refund confirmation just now. Appreciate the quick turnaround!",
      },
      {
        author: "Ari Romero",
        initials: "AR",
        agent: true,
        time: "Mon",
        body: "Glad it landed, Theo. I've marked this solved — reopen any time if anything else comes up.",
      },
    ],
  },
]

const STATUS_FILTERS: { key: Status | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "open", label: "Open" },
  { key: "pending", label: "Pending" },
  { key: "solved", label: "Solved" },
]

const PRIORITY_STYLES: Record<Priority, string> = {
  urgent: "bg-destructive/10 text-destructive border-destructive/30",
  high: "bg-primary/10 text-primary border-primary/30",
  normal: "bg-secondary text-secondary-foreground border-transparent",
  low: "bg-muted text-muted-foreground border-transparent",
}

function statusVariant(status: Status): "default" | "secondary" | "outline" {
  if (status === "open") return "default"
  if (status === "pending") return "secondary"
  return "outline"
}

const QUEUES = [
  { key: "all", label: "All tickets", icon: Inbox, count: TICKETS.length },
  {
    key: "mine",
    label: "Assigned to me",
    icon: Headset,
    count: 4,
  },
  { key: "urgent", label: "Urgent", icon: AlertTriangle, count: 1 },
  { key: "unassigned", label: "Unassigned", icon: Users, count: 2 },
] as const

const STATS = [
  { label: "Open tickets", value: "3", icon: Inbox, hint: "+2 today" },
  { label: "SLA breached", value: "1", icon: Timer, hint: "Needs attention" },
  { label: "Avg first reply", value: "11m", icon: Clock, hint: "Goal: 30m" },
  { label: "CSAT (7d)", value: "94%", icon: TrendingUp, hint: "+3 pts" },
]

export default function SupportDesk() {
  const [statusFilter, setStatusFilter] = React.useState<Status | "all">("all")
  const [activeQueue, setActiveQueue] = React.useState<string>("all")
  const [selectedId, setSelectedId] = React.useState(TICKETS[0].id)
  const [reply, setReply] = React.useState("")
  const [tickets, setTickets] = React.useState(TICKETS)

  const filtered = tickets.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false
    if (activeQueue === "urgent" && t.priority !== "urgent") return false
    return true
  })

  const selected =
    filtered.find((t) => t.id === selectedId) ?? filtered[0] ?? tickets[0]

  function openTicket(id: string) {
    setSelectedId(id)
    setReply("")
  }

  function resolveSelected() {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selected.id ? { ...t, status: "solved", sla: "Met" } : t
      )
    )
  }

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LifeBuoy className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Helpline
          </span>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 pt-2" aria-label="Ticket queues">
          {QUEUES.map((q) => {
            const Icon = q.icon
            const active = activeQueue === q.key
            return (
              <button
                key={q.key}
                onClick={() => setActiveQueue(q.key)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{q.label}</span>
                <span
                  className={cn(
                    "text-xs",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {q.count}
                </span>
              </button>
            )
          })}
        </nav>

        <Separator className="my-4" />

        <div className="px-5">
          <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Tag className="h-3.5 w-3.5" /> Views
          </p>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center justify-between">
              <span>Awaiting customer</span>
              <span className="text-xs">5</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Reopened</span>
              <span className="text-xs">1</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Solved today</span>
              <span className="text-xs">12</span>
            </li>
          </ul>
        </div>

        <div className="mt-auto flex items-center gap-3 border-t p-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Ari Romero</p>
            <p className="truncate text-xs text-muted-foreground">
              Tier 2 agent
            </p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </aside>

      {/* Ticket list + detail */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Stats bar */}
        <header className="border-b bg-background px-4 py-4 md:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                Support desk
              </h1>
              <p className="text-sm text-muted-foreground">
                {filtered.length} ticket{filtered.length === 1 ? "" : "s"} in
                view
              </p>
            </div>
            <Button size="sm" className="gap-2">
              <Headset className="h-4 w-4" /> New ticket
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="rounded-lg border bg-card p-3"
                >
                  <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </div>
                  <div className="text-xl font-semibold tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.hint}</div>
                </div>
              )
            })}
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
          {/* Tickets table */}
          <section className="flex min-w-0 flex-col border-b xl:w-[58%] xl:border-b-0 xl:border-r">
            <div className="flex items-center gap-2 overflow-x-auto border-b bg-muted/20 px-4 py-3">
              <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
              {STATUS_FILTERS.map((f) => {
                const active = statusFilter === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setStatusFilter(f.key)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-transparent bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>

            <div className="min-w-0 flex-1 overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10 bg-background">
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-2.5 font-medium">Ticket</th>
                    <th className="px-4 py-2.5 font-medium">Priority</th>
                    <th className="hidden px-4 py-2.5 font-medium sm:table-cell">
                      Status
                    </th>
                    <th className="hidden px-4 py-2.5 font-medium md:table-cell">
                      SLA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-12 text-center text-muted-foreground"
                      >
                        No tickets match this filter.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((t) => {
                      const active = t.id === selected.id
                      return (
                        <tr
                          key={t.id}
                          onClick={() => openTicket(t.id)}
                          className={cn(
                            "cursor-pointer border-b transition-colors",
                            active ? "bg-accent" : "hover:bg-muted/50"
                          )}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="mt-0.5 h-8 w-8 shrink-0">
                                <AvatarFallback className="text-xs">
                                  {t.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="truncate font-medium">
                                  {t.subject}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                  {t.id} · {t.requester} · {t.updated}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                                PRIORITY_STYLES[t.priority]
                              )}
                            >
                              {t.priority}
                            </span>
                          </td>
                          <td className="hidden px-4 py-3 sm:table-cell">
                            <Badge
                              variant={statusVariant(t.status)}
                              className="capitalize"
                            >
                              {t.status}
                            </Badge>
                          </td>
                          <td className="hidden px-4 py-3 md:table-cell">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 text-xs",
                                t.slaBreached
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                              )}
                            >
                              {t.slaBreached ? (
                                <AlertTriangle className="h-3.5 w-3.5" />
                              ) : (
                                <Clock className="h-3.5 w-3.5" />
                              )}
                              {t.sla}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Conversation pane */}
          <section className="flex min-w-0 flex-1 flex-col bg-muted/20">
            <div className="flex items-start justify-between gap-3 border-b bg-background px-5 py-4">
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {selected.id}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                      PRIORITY_STYLES[selected.priority]
                    )}
                  >
                    {selected.priority}
                  </span>
                  <Badge
                    variant={statusVariant(selected.status)}
                    className="capitalize"
                  >
                    {selected.status}
                  </Badge>
                </div>
                <h2 className="truncate text-base font-semibold tracking-tight">
                  {selected.subject}
                </h2>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {selected.requester} · {selected.email} · via{" "}
                  {selected.channel}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 gap-1.5"
                onClick={resolveSelected}
                disabled={selected.status === "solved"}
              >
                <CheckCircle2 className="h-4 w-4" />
                {selected.status === "solved" ? "Solved" : "Resolve"}
              </Button>
            </div>

            {/* SLA strip */}
            <div className="flex items-center gap-3 border-b bg-background/60 px-5 py-3">
              <Timer
                className={cn(
                  "h-4 w-4 shrink-0",
                  selected.slaBreached
                    ? "text-destructive"
                    : "text-muted-foreground"
                )}
              />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    First-response SLA
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      selected.slaBreached
                        ? "text-destructive"
                        : "text-foreground"
                    )}
                  >
                    {selected.sla}
                  </span>
                </div>
                <Progress value={selected.slaBreached ? 100 : 64} />
              </div>
            </div>

            {/* Thread */}
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {selected.thread.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3",
                    m.agent && "flex-row-reverse text-right"
                  )}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-xs">
                      {m.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "min-w-0 max-w-[85%] rounded-lg border px-4 py-3",
                      m.agent
                        ? "bg-primary/10 text-foreground"
                        : "bg-card"
                    )}
                  >
                    <div
                      className={cn(
                        "mb-1 flex items-center gap-2 text-xs text-muted-foreground",
                        m.agent && "flex-row-reverse"
                      )}
                    >
                      <span className="font-medium text-foreground">
                        {m.author}
                      </span>
                      {m.agent ? (
                        <Badge variant="secondary" className="font-normal">
                          Agent
                        </Badge>
                      ) : null}
                      <span>{m.time}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {m.body}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {selected.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="font-normal">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Reply box */}
            <div className="border-t bg-background p-4">
              <div className="rounded-lg border bg-card p-3">
                <Textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder={`Reply to ${selected.requester}…`}
                  className="min-h-20 resize-none border-0 px-1 shadow-none focus-visible:ring-0"
                  aria-label="Reply to ticket"
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-muted-foreground"
                    >
                      Macro
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    className="gap-2"
                    disabled={!reply.trim()}
                  >
                    <Send className="h-4 w-4" /> Send reply
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
