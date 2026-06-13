"use client"

import * as React from "react"
import {
  Headphones,
  Inbox,
  Timer,
  CheckCircle2,
  Smile,
  Mail,
  MessageSquare,
  Phone,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Download,
  Settings,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type Channel = "all" | "email" | "chat" | "phone"

const CHANNELS: { id: Channel; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All channels", icon: Filter },
  { id: "email", label: "Email", icon: Mail },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "phone", label: "Phone", icon: Phone },
]

type Kpi = {
  tickets: number
  ticketsDelta: number
  frt: string
  frtDelta: number
  resolution: string
  resolutionDelta: number
  csat: number
  csatDelta: number
}

const STATS: Record<Channel, Kpi> = {
  all: { tickets: 4820, ticketsDelta: 8, frt: "1h 12m", frtDelta: -14, resolution: "6h 04m", resolutionDelta: -9, csat: 94, csatDelta: 2 },
  email: { tickets: 2140, ticketsDelta: 5, frt: "2h 38m", frtDelta: -6, resolution: "9h 21m", resolutionDelta: -4, csat: 91, csatDelta: 1 },
  chat: { tickets: 1860, ticketsDelta: 12, frt: "0h 46m", frtDelta: -22, resolution: "3h 12m", resolutionDelta: -15, csat: 96, csatDelta: 3 },
  phone: { tickets: 820, ticketsDelta: 3, frt: "0h 09m", frtDelta: -2, resolution: "1h 48m", resolutionDelta: -7, csat: 92, csatDelta: 1 },
}

const VOLUME: Record<Channel, { day: string; value: number }[]> = {
  all: [
    { day: "Mon", value: 720 }, { day: "Tue", value: 810 }, { day: "Wed", value: 690 },
    { day: "Thu", value: 880 }, { day: "Fri", value: 940 }, { day: "Sat", value: 470 }, { day: "Sun", value: 410 },
  ],
  email: [
    { day: "Mon", value: 330 }, { day: "Tue", value: 360 }, { day: "Wed", value: 300 },
    { day: "Thu", value: 390 }, { day: "Fri", value: 420 }, { day: "Sat", value: 190 }, { day: "Sun", value: 150 },
  ],
  chat: [
    { day: "Mon", value: 290 }, { day: "Tue", value: 330 }, { day: "Wed", value: 270 },
    { day: "Thu", value: 350 }, { day: "Fri", value: 380 }, { day: "Sat", value: 160 }, { day: "Sun", value: 80 },
  ],
  phone: [
    { day: "Mon", value: 100 }, { day: "Tue", value: 120 }, { day: "Wed", value: 120 },
    { day: "Thu", value: 140 }, { day: "Fri", value: 140 }, { day: "Sat", value: 120 }, { day: "Sun", value: 180 },
  ],
}

const AGENTS: { name: string; initials: string; channel: Exclude<Channel, "all">; solved: number; frt: string; csat: number }[] = [
  { name: "Maya Tran", initials: "MT", channel: "chat", solved: 412, frt: "0h 41m", csat: 98 },
  { name: "Diego Alvarez", initials: "DA", channel: "email", solved: 388, frt: "2h 11m", csat: 93 },
  { name: "Priya Nair", initials: "PN", channel: "phone", solved: 271, frt: "0h 08m", csat: 95 },
  { name: "Sam Whitfield", initials: "SW", channel: "chat", solved: 356, frt: "0h 52m", csat: 92 },
  { name: "Lena Brandt", initials: "LB", channel: "email", solved: 302, frt: "2h 47m", csat: 90 },
  { name: "Omar Haddad", initials: "OH", channel: "phone", solved: 198, frt: "0h 12m", csat: 94 },
]

const CHANNEL_BADGE: Record<Exclude<Channel, "all">, { label: string; icon: React.ElementType }> = {
  email: { label: "Email", icon: Mail },
  chat: { label: "Chat", icon: MessageSquare },
  phone: { label: "Phone", icon: Phone },
}

function Delta({ value, invert }: { value: number; invert?: boolean }) {
  const positive = invert ? value < 0 : value > 0
  const Icon = value < 0 ? ArrowDownRight : ArrowUpRight
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
        positive ? "text-primary" : "text-muted-foreground",
      )}
    >
      <Icon className="h-3 w-3" />
      {Math.abs(value)}%
    </span>
  )
}

export default function SupportAnalyticsDashboard() {
  const [channel, setChannel] = React.useState<Channel>("all")
  const stat = STATS[channel]
  const volume = VOLUME[channel]
  const peak = Math.max(...volume.map((v) => v.value))
  const agents =
    channel === "all" ? AGENTS : AGENTS.filter((a) => a.channel === channel)

  const kpis = [
    { label: "Tickets received", value: stat.tickets.toLocaleString(), delta: stat.ticketsDelta, invert: true, icon: Inbox },
    { label: "First response time", value: stat.frt, delta: stat.frtDelta, invert: false, icon: Timer },
    { label: "Avg. resolution time", value: stat.resolution, delta: stat.resolutionDelta, invert: false, icon: CheckCircle2 },
    { label: "CSAT score", value: stat.csat + "%", delta: stat.csatDelta, invert: false, icon: Smile },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Helpdesk Insights</p>
              <p className="text-xs text-muted-foreground">Support analytics</p>
            </div>
          </div>
          <div className="relative ml-auto hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tickets, agents…" className="w-64 pl-9" />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarFallback>JL</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Support overview</h1>
            <p className="text-sm text-muted-foreground">
              Last 7 days · updated daily · all KPIs reflect the selected channel
            </p>
          </div>
          <Badge variant="secondary" className="w-fit gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            On track to SLA
          </Badge>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-medium text-muted-foreground">Channel</span>
          {CHANNELS.map((c) => {
            const active = channel === c.id
            const Icon = c.icon
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c.id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {c.label}
              </button>
            )
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => {
            const Icon = k.icon
            return (
              <Card key={k.label}>
                <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {k.label}
                  </CardTitle>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-semibold tabular-nums">{k.value}</span>
                    <Delta value={k.delta} invert={k.invert} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">vs. previous 7 days</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base">Ticket volume over time</CardTitle>
                <p className="text-sm text-muted-foreground">Tickets per day this week</p>
              </div>
              <Badge variant="outline" className="tabular-nums">
                Peak {peak}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end justify-between gap-2 sm:gap-4">
                {volume.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={cn(
                          "w-full rounded-t-md transition-all",
                          d.value === peak ? "bg-primary" : "bg-primary/30",
                        )}
                        style={{ height: Math.max(8, (d.value / peak) * 100) + "%" }}
                        title={d.day + ": " + d.value + " tickets"}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">CSAT breakdown</CardTitle>
              <p className="text-sm text-muted-foreground">Distribution of ratings</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Very satisfied", pct: 72 },
                { label: "Satisfied", pct: 18 },
                { label: "Neutral", pct: 6 },
                { label: "Dissatisfied", pct: 4 },
              ].map((row) => (
                <div key={row.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium tabular-nums">{row.pct}%</span>
                  </div>
                  <Progress value={row.pct} className="h-2" />
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall CSAT</span>
                <span className="text-lg font-semibold tabular-nums">{stat.csat}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base">Agent performance</CardTitle>
              <p className="text-sm text-muted-foreground">
                {channel === "all"
                  ? "All agents across every channel"
                  : "Agents on " + CHANNEL_BADGE[channel].label}
              </p>
            </div>
            <Badge variant="secondary" className="tabular-nums">
              {agents.length} agents
            </Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead className="text-right">Solved</TableHead>
                  <TableHead className="text-right">First response</TableHead>
                  <TableHead className="text-right">CSAT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((a) => {
                  const meta = CHANNEL_BADGE[a.channel]
                  const Icon = meta.icon
                  return (
                    <TableRow key={a.name}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{a.initials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{a.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <Icon className="h-3 w-3" />
                          {meta.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{a.solved}</TableCell>
                      <TableCell className="text-right tabular-nums">{a.frt}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium tabular-nums",
                            a.csat >= 95
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {a.csat}%
                        </span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            {agents.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No agents for this channel.
              </p>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2024 Helpdesk Insights. All rights reserved.</p>
          <p>Data refreshed daily at 00:00 UTC</p>
        </div>
      </footer>
    </div>
  )
}
