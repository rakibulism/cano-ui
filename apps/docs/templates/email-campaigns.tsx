"use client"
import * as React from "react"
import { Mail, Plus, Users, MousePointerClick, Eye, Send, TrendingUp, Search, MoreHorizontal, Sparkles, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

type Status = "Sent" | "Scheduled" | "Draft" | "Sending"

type Campaign = {
  id: string
  name: string
  subject: string
  status: Status
  recipients: number
  openRate: number
  clickRate: number
  sentOn: string
}

const CAMPAIGNS: Campaign[] = [
  { id: "c1", name: "Summer Launch 2026", subject: "Your early access starts now", status: "Sent", recipients: 18420, openRate: 54.2, clickRate: 12.8, sentOn: "Jun 09" },
  { id: "c2", name: "Weekly Product Digest", subject: "5 features you might have missed", status: "Sent", recipients: 24110, openRate: 41.7, clickRate: 7.3, sentOn: "Jun 07" },
  { id: "c3", name: "Cart Abandonment Flow", subject: "Still thinking it over?", status: "Sending", recipients: 3280, openRate: 38.9, clickRate: 9.1, sentOn: "Live" },
  { id: "c4", name: "Win-Back: Dormant 90d", subject: "We saved your spot", status: "Scheduled", recipients: 9640, openRate: 0, clickRate: 0, sentOn: "Jun 15" },
  { id: "c5", name: "VIP Loyalty Rewards", subject: "A thank-you, just for you", status: "Draft", recipients: 0, openRate: 0, clickRate: 0, sentOn: "—" },
  { id: "c6", name: "Onboarding Day 3", subject: "Get more from your account", status: "Sent", recipients: 5870, openRate: 62.5, clickRate: 18.4, sentOn: "Jun 05" },
  { id: "c7", name: "Spring Clearance Final", subject: "Last call: 40% off ends tonight", status: "Sent", recipients: 31200, openRate: 47.1, clickRate: 14.6, sentOn: "May 31" },
]

const SEGMENTS = [
  { name: "All Subscribers", size: 48210, growth: "+3.4%", share: 100 },
  { name: "Engaged (30d)", size: 21640, growth: "+5.1%", share: 45 },
  { name: "New This Month", size: 6320, growth: "+12.7%", share: 13 },
  { name: "VIP Customers", size: 2890, growth: "+1.2%", share: 6 },
  { name: "At Risk", size: 4110, growth: "-2.8%", share: 9 },
]

const FILTERS: Array<{ key: Status | "All"; label: string }> = [
  { key: "All", label: "All" },
  { key: "Sent", label: "Sent" },
  { key: "Sending", label: "Sending" },
  { key: "Scheduled", label: "Scheduled" },
  { key: "Draft", label: "Draft" },
]

function statusBadge(status: Status) {
  if (status === "Sent") return <Badge variant="secondary">Sent</Badge>
  if (status === "Sending") return <Badge className="bg-primary text-primary-foreground">Sending</Badge>
  if (status === "Scheduled") return <Badge variant="outline">Scheduled</Badge>
  return <Badge variant="outline" className="text-muted-foreground">Draft</Badge>
}

function fmt(n: number) {
  return n.toLocaleString("en-US")
}

export default function EmailCampaignsPage() {
  const [filter, setFilter] = React.useState<Status | "All">("All")
  const [query, setQuery] = React.useState("")

  const visible = CAMPAIGNS.filter((c) => {
    const matchStatus = filter === "All" || c.status === filter
    const matchQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.subject.toLowerCase().includes(query.toLowerCase())
    return matchStatus && matchQuery
  })

  const kpis = [
    { label: "Active Subscribers", value: "48,210", delta: "+3.4%", icon: Users },
    { label: "Avg. Open Rate", value: "49.1%", delta: "+2.2 pts", icon: Eye },
    { label: "Avg. Click Rate", value: "12.6%", delta: "+0.9 pts", icon: MousePointerClick },
    { label: "Sent This Month", value: "112,420", delta: "+8.0%", icon: Send },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Postmark Studio</p>
              <p className="text-xs text-muted-foreground">Campaigns</p>
            </div>
          </div>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search campaigns…"
                className="w-64 pl-9"
                aria-label="Search campaigns"
              />
            </div>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Campaign</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Email Campaigns</h1>
          <p className="text-sm text-muted-foreground">Monitor performance and manage every send from one console.</p>
        </div>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Key metrics">
          {kpis.map((k) => (
            <Card key={k.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{k.label}</CardDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <k.icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tracking-tight">{k.value}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-primary" />
                  <span className="font-medium text-primary">{k.delta}</span>
                  <span>vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>All Campaigns</CardTitle>
                  <CardDescription>{visible.length} of {CAMPAIGNS.length} shown</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <div className="flex flex-wrap gap-1.5">
                    {FILTERS.map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          filter === f.key
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Recipients</TableHead>
                      <TableHead className="text-right">Open</TableHead>
                      <TableHead className="text-right">Click</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.subject}</div>
                        </TableCell>
                        <TableCell>{statusBadge(c.status)}</TableCell>
                        <TableCell className="text-right tabular-nums">{c.recipients ? fmt(c.recipients) : "—"}</TableCell>
                        <TableCell className="text-right tabular-nums">{c.openRate ? c.openRate + "%" : "—"}</TableCell>
                        <TableCell className="text-right tabular-nums">{c.clickRate ? c.clickRate + "%" : "—"}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{c.sentOn}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" aria-label={"Actions for " + c.name}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {visible.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                          No campaigns match your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Audience Segments</CardTitle>
                    <CardDescription>Targetable lists</CardDescription>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {SEGMENTS.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="tabular-nums text-muted-foreground">{fmt(s.size)}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <Progress value={s.share} className="h-1.5" />
                      <span
                        className={cn(
                          "w-12 shrink-0 text-right text-xs font-medium tabular-nums",
                          s.growth.startsWith("-") ? "text-destructive" : "text-primary"
                        )}
                      >
                        {s.growth}
                      </span>
                    </div>
                    {i < SEGMENTS.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  New Segment
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base">Send Smarter</CardTitle>
                </div>
                <CardDescription>
                  Your best open rates land Tuesdays at 9:00am. Schedule your next send for peak engagement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Postmark Studio — Email marketing console</p>
          <p>Last synced Jun 09, 2026 · 9:41 AM</p>
        </div>
      </footer>
    </div>
  )
}
