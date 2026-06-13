"use client"
import * as React from "react"
import {
  PhoneCall,
  PhoneIncoming,
  Clock,
  Users,
  Smile,
  Search,
  Headphones,
  PhoneForwarded,
  Settings,
  Bell,
  Mic,
  Pause,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

type AgentState = "Available" | "On call" | "Break"

const kpis = [
  { label: "Calls in queue", value: "7", delta: "+2", up: true, icon: PhoneIncoming, hint: "vs last hour" },
  { label: "Avg wait time", value: "1:24", delta: "-0:18", up: false, icon: Clock, hint: "vs last hour" },
  { label: "Agents available", value: "9", delta: "+1", up: true, icon: Users, hint: "of 16 online" },
  { label: "CSAT today", value: "94%", delta: "+3%", up: true, icon: Smile, hint: "412 responses" },
]

const agents: {
  name: string
  initials: string
  state: AgentState
  ext: string
  handled: number
  duration: string
}[] = [
  { name: "Maya Chen", initials: "MC", state: "On call", ext: "1042", handled: 31, duration: "4:12" },
  { name: "Diego Ramos", initials: "DR", state: "Available", ext: "1043", handled: 28, duration: "0:00" },
  { name: "Priya Nair", initials: "PN", state: "Break", ext: "1044", handled: 19, duration: "—" },
  { name: "Sam Okafor", initials: "SO", state: "On call", ext: "1045", handled: 34, duration: "7:48" },
  { name: "Lena Vogt", initials: "LV", state: "Available", ext: "1046", handled: 25, duration: "0:00" },
  { name: "Tariq Aziz", initials: "TA", state: "On call", ext: "1047", handled: 22, duration: "2:05" },
  { name: "Emma Wills", initials: "EW", state: "Break", ext: "1048", handled: 17, duration: "—" },
  { name: "Noah Park", initials: "NP", state: "Available", ext: "1049", handled: 30, duration: "0:00" },
]

const queue = [
  { name: "Inbound +1 (415) 555-0188", reason: "Billing dispute", wait: "3:41", priority: "High" },
  { name: "Inbound +1 (212) 555-0119", reason: "Technical support", wait: "2:12", priority: "Normal" },
  { name: "Inbound +1 (646) 555-0142", reason: "Account access", wait: "1:55", priority: "High" },
  { name: "Inbound +1 (305) 555-0173", reason: "New order", wait: "1:08", priority: "Normal" },
  { name: "Inbound +1 (503) 555-0160", reason: "Refund status", wait: "0:46", priority: "Low" },
]

const recentCalls = [
  { id: "C-9921", caller: "Olivia Brooks", agent: "Maya Chen", type: "Inbound", duration: "6:22", outcome: "Resolved", csat: "5.0" },
  { id: "C-9920", caller: "Jonas Meyer", agent: "Sam Okafor", type: "Inbound", duration: "3:14", outcome: "Escalated", csat: "3.5" },
  { id: "C-9919", caller: "Aiko Tanaka", agent: "Diego Ramos", type: "Outbound", duration: "2:48", outcome: "Resolved", csat: "4.8" },
  { id: "C-9918", caller: "Marcus Lee", agent: "Tariq Aziz", type: "Inbound", duration: "9:01", outcome: "Resolved", csat: "4.2" },
  { id: "C-9917", caller: "Sofia Castro", agent: "Lena Vogt", type: "Inbound", duration: "1:37", outcome: "Voicemail", csat: "—" },
  { id: "C-9916", caller: "Henry Adams", agent: "Noah Park", type: "Outbound", duration: "5:09", outcome: "Resolved", csat: "5.0" },
]

const stateStyles: Record<AgentState, string> = {
  Available: "bg-primary/10 text-primary border-transparent",
  "On call": "bg-secondary text-secondary-foreground border-transparent",
  Break: "bg-muted text-muted-foreground border-transparent",
}

const stateDot: Record<AgentState, string> = {
  Available: "text-primary fill-primary",
  "On call": "text-foreground fill-foreground",
  Break: "text-muted-foreground fill-muted-foreground",
}

const filters: { key: string; label: string }[] = [
  { key: "all", label: "All agents" },
  { key: "Available", label: "Available" },
  { key: "On call", label: "On call" },
  { key: "Break", label: "On break" },
]

export default function CallCenterDashboard() {
  const [filter, setFilter] = React.useState("all")
  const [query, setQuery] = React.useState("")

  const visibleAgents = agents.filter((a) => {
    const matchesState = filter === "all" || a.state === filter
    const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase())
    return matchesState && matchesQuery
  })

  const counts = {
    all: agents.length,
    Available: agents.filter((a) => a.state === "Available").length,
    "On call": agents.filter((a) => a.state === "On call").length,
    Break: agents.filter((a) => a.state === "Break").length,
  } as Record<string, number>

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Headphones className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Helpline Ops</p>
              <p className="text-xs text-muted-foreground">Contact center live board</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground sm:flex">
              <Circle className="h-2 w-2 fill-primary text-primary" />
              16 agents online
            </span>
            <Button variant="outline" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>SV</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Live overview</h1>
            <p className="text-sm text-muted-foreground">Real-time queue, agent status and call activity.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Mic className="mr-1.5 h-4 w-4" />
              Whisper
            </Button>
            <Button size="sm">
              <PhoneForwarded className="mr-1.5 h-4 w-4" />
              Distribute queue
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{kpi.label}</CardDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <kpi.icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tabular-nums tracking-tight">{kpi.value}</span>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-medium",
                      kpi.up ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.delta}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Agent status</CardTitle>
                  <CardDescription>Filter the floor by current state.</CardDescription>
                </div>
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search agents"
                    className="pl-8"
                    aria-label="Search agents"
                  />
                </div>
              </div>
              <Tabs value={filter} onValueChange={setFilter} className="mt-2">
                <TabsList className="flex w-full flex-wrap justify-start">
                  {filters.map((f) => (
                    <TabsTrigger key={f.key} value={f.key} className="gap-1.5">
                      {f.label}
                      <span className="rounded bg-muted px-1.5 text-xs tabular-nums text-muted-foreground">
                        {counts[f.key]}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col divide-y">
                {visibleAgents.map((agent) => (
                  <div key={agent.ext} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{agent.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">Ext {agent.ext} · {agent.handled} handled</p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-xs text-muted-foreground">On state</p>
                      <p className="text-sm font-medium tabular-nums">{agent.duration}</p>
                    </div>
                    <Badge variant="outline" className={cn("gap-1.5", stateStyles[agent.state])}>
                      <Circle className={cn("h-2 w-2", stateDot[agent.state])} />
                      {agent.state}
                    </Badge>
                  </div>
                ))}
                {visibleAgents.length === 0 && (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    No agents match this filter.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Live queue</CardTitle>
                  <CardDescription>{queue.length} callers waiting</CardDescription>
                </div>
                <Badge className="gap-1">
                  <PhoneCall className="h-3 w-3" />
                  Inbound
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {queue.map((caller, i) => (
                <div key={i} className="rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{caller.name}</p>
                      <p className="text-xs text-muted-foreground">{caller.reason}</p>
                    </div>
                    <Badge
                      variant={caller.priority === "High" ? "destructive" : caller.priority === "Low" ? "secondary" : "outline"}
                      className="shrink-0"
                    >
                      {caller.priority}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Waiting {caller.wait}
                    </span>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-primary">
                      <PhoneCall className="mr-1 h-3.5 w-3.5" />
                      Answer
                    </Button>
                  </div>
                </div>
              ))}
              <div className="rounded-lg border border-dashed p-3">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-medium">Service level (20s)</span>
                  <span className="tabular-nums text-muted-foreground">82%</span>
                </div>
                <Progress value={82} />
                <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Pause className="h-3 w-3" />
                  2 callers on hold
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent calls</CardTitle>
            <CardDescription>Last completed interactions across the team.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Call ID</TableHead>
                    <TableHead>Caller</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead className="text-right">CSAT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCalls.map((call) => (
                    <TableRow key={call.id}>
                      <TableCell className="font-medium tabular-nums">{call.id}</TableCell>
                      <TableCell>{call.caller}</TableCell>
                      <TableCell className="text-muted-foreground">{call.agent}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          {call.type === "Inbound" ? (
                            <PhoneIncoming className="h-3 w-3" />
                          ) : (
                            <PhoneForwarded className="h-3 w-3" />
                          )}
                          {call.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="tabular-nums">{call.duration}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "text-sm",
                            call.outcome === "Escalated"
                              ? "text-destructive"
                              : call.outcome === "Resolved"
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {call.outcome}
                        </span>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{call.csat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Helpline Ops · Live board refreshes every 5 seconds</p>
          <p>Shift A · 9 supervisors active</p>
        </div>
      </footer>
    </div>
  )
}
