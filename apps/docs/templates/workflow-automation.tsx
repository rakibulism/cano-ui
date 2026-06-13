"use client"

import * as React from "react"
import {
  Zap,
  Plus,
  Search,
  Mail,
  MessageSquare,
  Database,
  Filter,
  GitBranch,
  Webhook,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  Settings2,
  ArrowDown,
  Activity,
  ChevronRight,
  Sparkles,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

type StepKind = "trigger" | "action" | "filter"

type Step = {
  id: string
  kind: StepKind
  app: string
  title: string
  detail: string
  icon: React.ComponentType<{ className?: string }>
}

type Automation = {
  id: string
  name: string
  description: string
  enabled: boolean
  runs: string
  successRate: string
  lastRun: string
  steps: Step[]
}

const INITIAL_AUTOMATIONS: Automation[] = [
  {
    id: "lead-sync",
    name: "New lead to CRM + Slack",
    description: "Form submissions sync to CRM and ping the sales channel.",
    enabled: true,
    runs: "1,284",
    successRate: "99.2%",
    lastRun: "2 min ago",
    steps: [
      { id: "s1", kind: "trigger", app: "Webhooks", title: "New form submission", detail: "Triggers when the contact form receives an entry.", icon: Webhook },
      { id: "s2", kind: "filter", app: "Filter", title: "Only qualified leads", detail: "Continue only when budget is greater than $5,000.", icon: Filter },
      { id: "s3", kind: "action", app: "CRM", title: "Create contact", detail: "Adds the lead as a new contact record.", icon: Database },
      { id: "s4", kind: "action", app: "Slack", title: "Post to #sales", detail: "Notifies the sales team with lead details.", icon: MessageSquare },
    ],
  },
  {
    id: "invoice-mailer",
    name: "Daily invoice digest",
    description: "Emails a summary of unpaid invoices every morning.",
    enabled: true,
    runs: "642",
    successRate: "100%",
    lastRun: "1 hr ago",
    steps: [
      { id: "s1", kind: "trigger", app: "Schedule", title: "Every day at 8:00 AM", detail: "Runs on a fixed daily schedule.", icon: Calendar },
      { id: "s2", kind: "action", app: "Database", title: "Query unpaid invoices", detail: "Fetches invoices past their due date.", icon: Database },
      { id: "s3", kind: "action", app: "Email", title: "Send digest email", detail: "Delivers the summary to finance@acme.co.", icon: Mail },
    ],
  },
  {
    id: "churn-watch",
    name: "Churn risk alert",
    description: "Flags inactive accounts and routes to success team.",
    enabled: false,
    runs: "318",
    successRate: "96.4%",
    lastRun: "Yesterday",
    steps: [
      { id: "s1", kind: "trigger", app: "Schedule", title: "Weekly on Monday", detail: "Runs at the start of every week.", icon: Clock },
      { id: "s2", kind: "filter", app: "Filter", title: "No login in 30 days", detail: "Continue only for dormant accounts.", icon: Filter },
      { id: "s3", kind: "action", app: "Branch", title: "Route by plan tier", detail: "Enterprise accounts go to a dedicated CSM.", icon: GitBranch },
      { id: "s4", kind: "action", app: "Slack", title: "Alert #customer-success", detail: "Pings the success channel with the account list.", icon: MessageSquare },
    ],
  },
  {
    id: "ticket-triage",
    name: "Support ticket triage",
    description: "Auto-labels new tickets and assigns an owner.",
    enabled: true,
    runs: "2,901",
    successRate: "98.7%",
    lastRun: "Just now",
    steps: [
      { id: "s1", kind: "trigger", app: "Email", title: "New support email", detail: "Triggers on inbound mail to support@acme.co.", icon: Mail },
      { id: "s2", kind: "action", app: "AI", title: "Classify intent", detail: "Tags the ticket by category and urgency.", icon: Sparkles },
      { id: "s3", kind: "action", app: "Helpdesk", title: "Assign to queue", detail: "Routes the ticket to the right team.", icon: Database },
    ],
  },
]

const KIND_LABEL: Record<StepKind, string> = {
  trigger: "Trigger",
  action: "Action",
  filter: "Filter",
}

const HISTORY = [
  { id: "r1", status: "success", started: "10:42 AM", duration: "1.2s", steps: "4 / 4" },
  { id: "r2", status: "success", started: "10:18 AM", duration: "0.9s", steps: "4 / 4" },
  { id: "r3", status: "failed", started: "09:55 AM", duration: "2.4s", steps: "2 / 4" },
  { id: "r4", status: "success", started: "09:30 AM", duration: "1.1s", steps: "4 / 4" },
  { id: "r5", status: "success", started: "08:47 AM", duration: "1.0s", steps: "4 / 4" },
]

function kindStyles(kind: StepKind) {
  switch (kind) {
    case "trigger":
      return "bg-primary/10 text-primary border-primary/30"
    case "filter":
      return "bg-accent text-foreground border-border"
    default:
      return "bg-muted text-foreground border-border"
  }
}

export default function WorkflowAutomation() {
  const [automations, setAutomations] = React.useState<Automation[]>(INITIAL_AUTOMATIONS)
  const [selectedId, setSelectedId] = React.useState<string>(INITIAL_AUTOMATIONS[0].id)
  const [selectedStepId, setSelectedStepId] = React.useState<string>(INITIAL_AUTOMATIONS[0].steps[0].id)
  const [query, setQuery] = React.useState("")

  const selected = automations.find((a) => a.id === selectedId) ?? automations[0]
  const selectedStep =
    selected.steps.find((s) => s.id === selectedStepId) ?? selected.steps[0]

  const filtered = automations.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()),
  )

  const enabledCount = automations.filter((a) => a.enabled).length

  function toggleEnabled(id: string) {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)),
    )
  }

  function selectAutomation(id: string) {
    setSelectedId(id)
    const next = automations.find((a) => a.id === id)
    if (next) setSelectedStepId(next.steps[0].id)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 flex items-center gap-4 border-b bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">Flowmint</span>
        </div>
        <Separator orientation="vertical" className="hidden h-6 sm:block" />
        <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          <span className="rounded-md bg-muted px-3 py-1.5 font-medium text-foreground">Automations</span>
          <span className="px-3 py-1.5">Connections</span>
          <span className="px-3 py-1.5">Logs</span>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            {enabledCount} active
          </Badge>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New automation
          </Button>
        </div>
      </header>

      <main className="grid flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
        {/* Left: automations list */}
        <aside className="border-b lg:border-b-0 lg:border-r">
          <div className="border-b p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search automations"
                className="pl-8"
                aria-label="Search automations"
              />
            </div>
          </div>
          <ul className="divide-y">
            {filtered.map((a) => {
              const active = a.id === selected.id
              return (
                <li key={a.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => selectAutomation(a.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        selectAutomation(a.id)
                      }
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50",
                      active && "bg-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-2 w-2 shrink-0 rounded-full",
                        a.enabled ? "bg-primary" : "bg-muted-foreground/40",
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{a.name}</span>
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">
                        {a.description}
                      </span>
                      <span className="mt-1.5 block text-[11px] text-muted-foreground">
                        {a.steps.length} steps · {a.lastRun}
                      </span>
                    </span>
                    <Switch
                      checked={a.enabled}
                      onCheckedChange={() => toggleEnabled(a.id)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Toggle ${a.name}`}
                    />
                  </div>
                </li>
              )
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                No automations match.
              </li>
            )}
          </ul>
        </aside>

        {/* Center: visual flow */}
        <section className="border-b bg-muted/30 lg:border-b-0 lg:border-r">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-lg font-semibold tracking-tight">{selected.name}</h1>
                <Badge variant={selected.enabled ? "default" : "outline"}>
                  {selected.enabled ? "Enabled" : "Paused"}
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{selected.description}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" disabled={!selected.enabled}>
              <Play className="h-4 w-4" />
              Test run
            </Button>
          </div>

          <div className="mx-auto flex max-w-md flex-col items-center px-4 py-6 sm:py-8">
            {selected.steps.map((step, i) => {
              const StepIcon = step.icon
              const active = step.id === selectedStep.id
              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedStepId(step.id)}
                    className={cn(
                      "w-full rounded-xl border bg-card p-3.5 text-left shadow-sm transition-all hover:shadow-md",
                      active ? "border-primary ring-1 ring-primary" : "border-border",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                          kindStyles(step.kind),
                        )}
                      >
                        <StepIcon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                            {KIND_LABEL[step.kind]}
                          </span>
                          <span className="text-[10px] text-muted-foreground">·</span>
                          <span className="text-[11px] font-medium text-muted-foreground">{step.app}</span>
                        </div>
                        <p className="truncate text-sm font-medium">{step.title}</p>
                      </div>
                      <ChevronRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition", active && "text-primary")} />
                    </div>
                  </button>
                  {i < selected.steps.length - 1 && (
                    <div className="flex h-8 items-center justify-center">
                      <ArrowDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
            <div className="mt-8 flex w-full items-center justify-center">
              <Button variant="ghost" size="sm" className="gap-1.5 border border-dashed text-muted-foreground">
                <Plus className="h-4 w-4" />
                Add step
              </Button>
            </div>
          </div>
        </section>

        {/* Right: step settings + KPIs */}
        <aside className="flex flex-col">
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Step settings</h2>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                <span className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg border", kindStyles(selectedStep.kind))}>
                  <selectedStep.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{selectedStep.title}</p>
                  <p className="text-xs text-muted-foreground">{KIND_LABEL[selectedStep.kind]} · {selectedStep.app}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{selectedStep.detail}</p>

              <div className="space-y-1.5">
                <Label htmlFor="step-name">Step name</Label>
                <Input id="step-name" value={selectedStep.title} readOnly />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="step-app">Connected app</Label>
                <Input id="step-app" value={selectedStep.app} readOnly />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Continue on error</p>
                  <p className="text-xs text-muted-foreground">Keep running later steps.</p>
                </div>
                <Switch aria-label="Continue on error" />
              </div>
              <Button className="w-full" size="sm">Save step</Button>
            </div>
          </div>

          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Run history</h2>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg border bg-card p-2.5">
                <p className="text-[11px] text-muted-foreground">Total runs</p>
                <p className="text-base font-semibold">{selected.runs}</p>
              </div>
              <div className="rounded-lg border bg-card p-2.5">
                <p className="text-[11px] text-muted-foreground">Success</p>
                <p className="text-base font-semibold text-primary">{selected.successRate}</p>
              </div>
              <div className="rounded-lg border bg-card p-2.5">
                <p className="text-[11px] text-muted-foreground">Last run</p>
                <p className="truncate text-base font-semibold">{selected.lastRun}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="h-8">Status</TableHead>
                  <TableHead className="h-8">Started</TableHead>
                  <TableHead className="h-8 text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {HISTORY.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="py-2">
                      <span className="flex items-center gap-1.5 text-xs">
                        {run.status === "success" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-destructive" />
                        )}
                        <span className="capitalize">{run.status}</span>
                      </span>
                    </TableCell>
                    <TableCell className="py-2 text-xs text-muted-foreground">{run.started}</TableCell>
                    <TableCell className="py-2 text-right text-xs text-muted-foreground">{run.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </aside>
      </main>
    </div>
  )
}
