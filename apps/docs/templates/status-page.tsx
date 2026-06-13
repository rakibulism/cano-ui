"use client"

import * as React from "react"
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Server,
  LayoutDashboard,
  Webhook,
  Database,
  Globe,
  Bell,
  Mail,
  Rss,
  Clock,
  History,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type StatusKind = "operational" | "degraded" | "outage" | "maintenance"

const statusMeta: Record<
  StatusKind,
  { label: string; pill: string; dot: string; icon: React.ComponentType<{ className?: string }> }
> = {
  operational: {
    label: "Operational",
    pill: "bg-primary/10 text-primary",
    dot: "bg-primary",
    icon: CheckCircle2,
  },
  degraded: {
    label: "Degraded",
    pill: "bg-accent text-foreground",
    dot: "bg-muted-foreground",
    icon: AlertTriangle,
  },
  outage: {
    label: "Outage",
    pill: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
    icon: XCircle,
  },
  maintenance: {
    label: "Maintenance",
    pill: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    icon: Clock,
  },
}

const components: {
  name: string
  description: string
  uptime: string
  status: StatusKind
  icon: React.ComponentType<{ className?: string }>
}[] = [
  {
    name: "API",
    description: "Core REST & GraphQL endpoints",
    uptime: "99.99%",
    status: "operational",
    icon: Server,
  },
  {
    name: "Dashboard",
    description: "Web application & console",
    uptime: "99.97%",
    status: "operational",
    icon: LayoutDashboard,
  },
  {
    name: "Webhooks",
    description: "Event delivery & retries",
    uptime: "99.62%",
    status: "degraded",
    icon: Webhook,
  },
  {
    name: "Database",
    description: "Primary & read replicas",
    uptime: "99.98%",
    status: "operational",
    icon: Database,
  },
  {
    name: "CDN & Edge",
    description: "Static assets & caching",
    uptime: "100.0%",
    status: "operational",
    icon: Globe,
  },
]

// 90 deterministic day cells. A few seeded incidents break the streak.
const degradedDays = new Set([12, 41, 67])
const outageDays = new Set([54])
const uptimeDays = Array.from({ length: 90 }, (_, i) => {
  if (outageDays.has(i)) return "outage" as StatusKind
  if (degradedDays.has(i)) return "degraded" as StatusKind
  return "operational" as StatusKind
})

const cellColor: Record<StatusKind, string> = {
  operational: "bg-primary/70 hover:bg-primary",
  degraded: "bg-muted-foreground/60 hover:bg-muted-foreground",
  outage: "bg-destructive/80 hover:bg-destructive",
  maintenance: "bg-muted hover:bg-muted-foreground/40",
}

const incidents: {
  date: string
  title: string
  severity: StatusKind
  duration: string
  updates: { time: string; label: string; text: string }[]
}[] = [
  {
    date: "Jun 11, 2026",
    title: "Elevated webhook delivery latency",
    severity: "degraded",
    duration: "1h 42m",
    updates: [
      {
        time: "14:38 UTC",
        label: "Resolved",
        text: "Delivery queues have fully drained and latency is back to baseline. We will publish a postmortem within 5 business days.",
      },
      {
        time: "13:55 UTC",
        label: "Monitoring",
        text: "A fix has been deployed to the retry workers. Backlogged events are processing and latency is dropping.",
      },
      {
        time: "12:56 UTC",
        label: "Investigating",
        text: "We are seeing increased delivery times for outbound webhooks in the us-east region.",
      },
    ],
  },
  {
    date: "May 28, 2026",
    title: "API timeouts in eu-west",
    severity: "outage",
    duration: "34m",
    updates: [
      {
        time: "09:12 UTC",
        label: "Resolved",
        text: "A failed database node was promoted out of rotation. All API traffic in eu-west has recovered.",
      },
      {
        time: "08:38 UTC",
        label: "Identified",
        text: "We have isolated the issue to a single unhealthy replica and are routing around it.",
      },
    ],
  },
  {
    date: "May 14, 2026",
    title: "Scheduled maintenance: database upgrade",
    severity: "maintenance",
    duration: "20m",
    updates: [
      {
        time: "02:20 UTC",
        label: "Completed",
        text: "The primary database cluster was upgraded with zero data loss. No customer action required.",
      },
    ],
  },
]

export default function StatusPage() {
  const [selectedRange, setSelectedRange] = React.useState<"90" | "30">("90")
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const visibleDays =
    selectedRange === "90" ? uptimeDays : uptimeDays.slice(uptimeDays.length - 30)

  const allOperational = components.every((c) => c.status === "operational")
  const overall: StatusKind = allOperational ? "operational" : "degraded"
  const OverallIcon = statusMeta[overall].icon

  const overallUptime = "99.94%"

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Plated Status</span>
          </div>
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <History className="h-4 w-4" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
              Subscribe
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        {/* Overall banner */}
        <section
          className={cn(
            "flex flex-col gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between",
            overall === "operational" ? "border-primary/30 bg-primary/10" : "bg-accent"
          )}
        >
          <div className="flex items-center gap-4">
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                overall === "operational" ? "bg-primary/15 text-primary" : "bg-background text-foreground"
              )}
            >
              <OverallIcon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                {allOperational ? "All systems operational" : "Some systems degraded"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated 2 minutes ago &middot; Refreshes automatically
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 sm:gap-8">
            <div className="text-right">
              <div className="text-2xl font-semibold tabular-nums tracking-tight">{overallUptime}</div>
              <div className="text-xs text-muted-foreground">90-day uptime</div>
            </div>
          </div>
        </section>

        {/* Components status list */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Components
            </h2>
            <span className="text-xs text-muted-foreground">5 services monitored</span>
          </div>
          <Card>
            <CardContent className="divide-y p-0">
              {components.map((c) => {
                const meta = statusMeta[c.status]
                return (
                  <div
                    key={c.name}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div
                          className="text-sm font-medium"
                          dangerouslySetInnerHTML={{ __html: c.name }}
                        />
                        <div
                          className="text-xs text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: c.description }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden text-xs tabular-nums text-muted-foreground sm:inline">
                        {c.uptime}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          meta.pill
                        )}
                      >
                        <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
                        {meta.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>

        {/* Uptime grid */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Uptime history
            </h2>
            <div className="inline-flex rounded-md border p-0.5">
              {(["30", "90"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRange(r)}
                  className={cn(
                    "rounded px-3 py-1 text-xs font-medium transition-colors",
                    selectedRange === r
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r} days
                </button>
              ))}
            </div>
          </div>
          <Card>
            <CardContent className="p-5">
              <div className="flex flex-wrap gap-[3px]">
                {visibleDays.map((day, i) => (
                  <span
                    key={i}
                    title={`Day ${i + 1}: ${statusMeta[day].label}`}
                    className={cn(
                      "h-8 w-2 rounded-sm transition-colors",
                      cellColor[day]
                    )}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{visibleDays.length} days ago</span>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-primary/70" /> Operational
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-muted-foreground/60" /> Degraded
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-destructive/80" /> Outage
                  </span>
                </div>
                <span>Today</span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Incident timeline */}
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Past incidents
          </h2>
          <div className="space-y-4">
            {incidents.map((inc) => {
              const meta = statusMeta[inc.severity]
              return (
                <Card key={inc.title}>
                  <CardContent className="p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <meta.icon
                          className={cn(
                            "h-4 w-4",
                            inc.severity === "outage"
                              ? "text-destructive"
                              : inc.severity === "operational"
                                ? "text-primary"
                                : "text-muted-foreground"
                          )}
                        />
                        <h3 className="text-sm font-semibold">{inc.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {inc.duration}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{inc.date}</span>
                      </div>
                    </div>
                    <ol className="mt-4 space-y-3 border-l pl-4">
                      {inc.updates.map((u, idx) => (
                        <li key={idx} className="relative">
                          <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-foreground/40" />
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-semibold">{u.label}</span>
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {u.time}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground">{u.text}</p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Subscribe */}
        <section className="mt-10">
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-md">
                <h2 className="text-base font-semibold tracking-tight">
                  Get status updates
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Subscribe to be notified by email when an incident is opened, updated, or resolved.
                </p>
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded-md bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  You are subscribed
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (email.trim()) setSubscribed(true)
                  }}
                  className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-label="Email address"
                      className="pl-9"
                    />
                  </div>
                  <Button type="submit">
                    Subscribe
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>&copy; 2026 Plated, Inc. &middot; All times shown in UTC</span>
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Rss className="h-3.5 w-3.5" />
              RSS
            </a>
            <a href="#" className="hover:text-foreground">
              Incident history
            </a>
            <a href="#" className="hover:text-foreground">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
