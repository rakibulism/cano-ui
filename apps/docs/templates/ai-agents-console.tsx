"use client"

import * as React from "react"
import {
  Activity,
  Bot,
  CheckCircle2,
  Clock,
  Cpu,
  Gauge,
  KeyRound,
  LayoutGrid,
  Plus,
  Search,
  Settings,
  Sparkles,
  Timer,
  Workflow,
  XCircle,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const nav = [
  ["Console", LayoutGrid, true],
  ["Agents", Bot, false],
  ["Workflows", Workflow, false],
  ["Runs", Activity, false],
  ["API keys", KeyRound, false],
  ["Settings", Settings, false],
] as const

const kpis = [
  ["Runs today", "2,418", "+14.2%", Zap],
  ["Success rate", "97.3%", "+1.4%", Gauge],
  ["Avg. latency", "1.9s", "-0.3s", Timer],
  ["Tokens used", "8.6M", "+9.1%", Cpu],
] as const

type Agent = {
  name: string
  role: string
  model: string
  runs: string
  success: number
  enabled: boolean
}

const initialAgents: Agent[] = [
  { name: "Support Triage", role: "Classifies and routes tickets", model: "opus-4.8", runs: "1,204", success: 98, enabled: true },
  { name: "Sales Outreach", role: "Drafts personalized emails", model: "sonnet-4.5", runs: "642", success: 95, enabled: true },
  { name: "Doc Summarizer", role: "Condenses long PDFs", model: "haiku-4.5", runs: "388", success: 99, enabled: false },
  { name: "Code Reviewer", role: "Flags risky diffs in PRs", model: "opus-4.8", runs: "176", success: 92, enabled: true },
  { name: "Data Enricher", role: "Fills missing CRM fields", model: "sonnet-4.5", runs: "84", success: 88, enabled: false },
]

const STATUSES = ["All", "Success", "Running", "Failed"] as const
type Status = (typeof STATUSES)[number]

type Run = {
  id: string
  agent: string
  trigger: string
  duration: string
  tokens: string
  status: Exclude<Status, "All">
  time: string
}

const runs: Run[] = [
  { id: "run_8f21", agent: "Support Triage", trigger: "Webhook", duration: "1.4s", tokens: "3.2k", status: "Success", time: "2m ago" },
  { id: "run_8f1d", agent: "Code Reviewer", trigger: "GitHub PR", duration: "4.1s", tokens: "12.8k", status: "Running", time: "3m ago" },
  { id: "run_8f0a", agent: "Sales Outreach", trigger: "Schedule", duration: "2.7s", tokens: "5.6k", status: "Success", time: "11m ago" },
  { id: "run_8efb", agent: "Data Enricher", trigger: "Manual", duration: "0.9s", tokens: "1.1k", status: "Failed", time: "18m ago" },
  { id: "run_8ee4", agent: "Doc Summarizer", trigger: "Upload", duration: "6.3s", tokens: "22.4k", status: "Success", time: "24m ago" },
  { id: "run_8ed0", agent: "Support Triage", trigger: "Webhook", duration: "1.2s", tokens: "2.9k", status: "Success", time: "31m ago" },
  { id: "run_8ec7", agent: "Code Reviewer", trigger: "GitHub PR", duration: "3.8s", tokens: "10.4k", status: "Failed", time: "44m ago" },
  { id: "run_8eb2", agent: "Sales Outreach", trigger: "Schedule", duration: "2.2s", tokens: "4.8k", status: "Running", time: "52m ago" },
]

const statusStyles: Record<Run["status"], string> = {
  Success: "bg-primary/10 text-primary border-transparent",
  Running: "bg-secondary text-foreground border-transparent",
  Failed: "bg-muted text-destructive border-transparent",
}

const statusIcon: Record<Run["status"], React.ReactNode> = {
  Success: <CheckCircle2 className="h-3.5 w-3.5" />,
  Running: <Clock className="h-3.5 w-3.5" />,
  Failed: <XCircle className="h-3.5 w-3.5" />,
}

export default function AiAgentsConsole() {
  const [agents, setAgents] = React.useState<Agent[]>(initialAgents)
  const [filter, setFilter] = React.useState<Status>("All")

  const toggleAgent = (name: string) =>
    setAgents((prev) =>
      prev.map((a) => (a.name === name ? { ...a, enabled: !a.enabled } : a))
    )

  const activeCount = agents.filter((a) => a.enabled).length
  const visibleRuns = runs.filter((r) => filter === "All" || r.status === filter)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Aether AI</span>
        </div>
        <Separator />
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary">
          {nav.map(([label, Icon, active]) => (
            <button
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Mira Okafor</p>
            <p className="truncate text-xs text-muted-foreground">Workspace admin</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Agents Console</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {activeCount} of {agents.length} agents active
            </p>
          </div>
          <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search agents and runs" className="pl-9" />
          </div>
          <Button>
            <Plus className="h-4 w-4" />
            Create agent
          </Button>
        </header>

        <main className="flex-1 space-y-8 p-4 sm:p-6">
          <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {kpis.map(([label, value, delta, Icon]) => (
              <Card key={label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{label}</CardDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">{value}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{delta} vs last week</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Your agents</CardTitle>
                <CardDescription>Toggle agents on or off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {agents.map((agent, i) => (
                  <div key={agent.name}>
                    {i > 0 && <Separator className="my-1" />}
                    <div className="flex items-center gap-3 py-2">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          agent.enabled
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">{agent.name}</p>
                          <Badge variant="outline" className="font-mono text-[10px]">
                            {agent.model}
                          </Badge>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{agent.role}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {agent.runs} runs · {agent.success}% success
                        </p>
                      </div>
                      <Switch
                        checked={agent.enabled}
                        onCheckedChange={() => toggleAgent(agent.name)}
                        aria-label={"Toggle " + agent.name}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="text-base">Recent runs</CardTitle>
                  <CardDescription>{visibleRuns.length} runs shown</CardDescription>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={filter === s ? "default" : "outline"}
                      onClick={() => setFilter(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-0 sm:px-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Run</TableHead>
                      <TableHead className="hidden sm:table-cell">Agent</TableHead>
                      <TableHead className="hidden md:table-cell">Trigger</TableHead>
                      <TableHead className="hidden lg:table-cell">Duration</TableHead>
                      <TableHead className="hidden lg:table-cell">Tokens</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">When</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleRuns.map((run) => (
                      <TableRow key={run.id}>
                        <TableCell className="font-mono text-xs">{run.id}</TableCell>
                        <TableCell className="hidden text-sm sm:table-cell">{run.agent}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="secondary" className="font-normal">
                            {run.trigger}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                          {run.duration}
                        </TableCell>
                        <TableCell className="hidden font-mono text-xs text-muted-foreground lg:table-cell">
                          {run.tokens}
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("gap-1 font-medium", statusStyles[run.status])}>
                            {statusIcon[run.status]}
                            {run.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-xs text-muted-foreground">
                          {run.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {visibleRuns.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                    <Activity className="h-6 w-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No {filter.toLowerCase()} runs yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
