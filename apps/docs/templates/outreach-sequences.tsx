"use client"

import * as React from "react"
import {
  Mail,
  Clock,
  Users,
  Reply,
  Plus,
  Play,
  Pause,
  GitBranch,
  Search,
  Filter,
  MousePointerClick,
  Send,
  ChevronRight,
  Phone,
  Linkedin,
  CheckCircle2,
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
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type StepKind = "email" | "wait" | "call" | "linkedin"

type Step = {
  id: string
  kind: StepKind
  title: string
  detail: string
  day: number
}

type Sequence = {
  id: string
  name: string
  audience: string
  enrolled: number
  open: number
  reply: number
  steps: Step[]
}

const SEQUENCES: Sequence[] = [
  {
    id: "outbound-saas",
    name: "Outbound — SaaS Founders",
    audience: "Seed-stage CEOs",
    enrolled: 342,
    open: 61,
    reply: 14,
    steps: [
      { id: "s1", kind: "email", title: "Intro + value prop", detail: "Personalized opener referencing their funding round.", day: 1 },
      { id: "s2", kind: "wait", title: "Wait 2 days", detail: "Pause before the first follow-up.", day: 3 },
      { id: "s3", kind: "linkedin", title: "Connection request", detail: "Soft touch with a short note.", day: 4 },
      { id: "s4", kind: "email", title: "Case study follow-up", detail: "Share a relevant customer story + metric.", day: 6 },
      { id: "s5", kind: "call", title: "Discovery call attempt", detail: "Reference both prior emails; leave a voicemail.", day: 9 },
      { id: "s6", kind: "email", title: "Break-up email", detail: "Last touch with a clear opt-out.", day: 13 },
    ],
  },
  {
    id: "reengage-trial",
    name: "Re-engage — Cold Trials",
    audience: "Expired free trials",
    enrolled: 188,
    open: 48,
    reply: 9,
    steps: [
      { id: "r1", kind: "email", title: "We miss you", detail: "Highlight what shipped since they left.", day: 1 },
      { id: "r2", kind: "wait", title: "Wait 3 days", detail: "Give them room to respond.", day: 4 },
      { id: "r3", kind: "email", title: "Extended trial offer", detail: "Reset their workspace with 14 free days.", day: 5 },
      { id: "r4", kind: "call", title: "Check-in call", detail: "Ask what blocked adoption last time.", day: 8 },
    ],
  },
  {
    id: "expansion-enterprise",
    name: "Expansion — Enterprise",
    audience: "Active multi-seat accounts",
    enrolled: 76,
    open: 72,
    reply: 23,
    steps: [
      { id: "e1", kind: "email", title: "Usage milestone recap", detail: "Surface the team's adoption highlights.", day: 1 },
      { id: "e2", kind: "linkedin", title: "Engage champion", detail: "Comment on a recent post; stay warm.", day: 2 },
      { id: "e3", kind: "email", title: "Volume pricing intro", detail: "Tease org-wide rollout savings.", day: 4 },
      { id: "e4", kind: "call", title: "Exec alignment call", detail: "Loop in their VP for a roadmap review.", day: 7 },
    ],
  },
  {
    id: "event-followup",
    name: "Event Follow-up — Q2 Summit",
    audience: "Booth scans",
    enrolled: 254,
    open: 55,
    reply: 11,
    steps: [
      { id: "v1", kind: "email", title: "Great meeting you", detail: "Recap the conversation from the booth.", day: 1 },
      { id: "v2", kind: "wait", title: "Wait 2 days", detail: "Let the event buzz settle.", day: 3 },
      { id: "v3", kind: "email", title: "Demo invite", detail: "Offer a tailored 20-minute walkthrough.", day: 4 },
    ],
  },
]

const STEP_META: Record<StepKind, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  email: { label: "Email", icon: Mail },
  wait: { label: "Delay", icon: Clock },
  call: { label: "Call", icon: Phone },
  linkedin: { label: "LinkedIn", icon: Linkedin },
}

function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

export default function OutreachSequences() {
  const [active, setActive] = React.useState<Record<string, boolean>>({
    "outbound-saas": true,
    "reengage-trial": true,
    "expansion-enterprise": true,
    "event-followup": false,
  })
  const [selectedId, setSelectedId] = React.useState<string>(SEQUENCES[0].id)

  const toggle = (id: string) =>
    setActive((prev) => ({ ...prev, [id]: !prev[id] }))

  const selected = SEQUENCES.find((s) => s.id === selectedId) ?? SEQUENCES[0]

  const activeCount = SEQUENCES.filter((s) => active[s.id]).length
  const enrolledTotal = SEQUENCES.filter((s) => active[s.id]).reduce(
    (sum, s) => sum + s.enrolled,
    0,
  )
  const replyAvg = activeCount
    ? Math.round(
        SEQUENCES.filter((s) => active[s.id]).reduce((sum, s) => sum + s.reply, 0) /
          activeCount,
      )
    : 0

  const kpis = [
    { label: "Active sequences", value: String(activeCount), icon: Play, hint: `of ${SEQUENCES.length} total` },
    { label: "Contacts enrolled", value: enrolledTotal.toLocaleString(), icon: Users, hint: "across active flows" },
    { label: "Avg reply rate", value: `${replyAvg}%`, icon: Reply, hint: "active sequences" },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Cadence</span>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <span className="hidden text-sm text-muted-foreground sm:block">Sequences</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search sequences"
                className="h-9 w-56 pl-8"
                aria-label="Search sequences"
              />
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New sequence
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Sales sequences</h1>
          <p className="text-sm text-muted-foreground">
            Multi-step outreach across email, calls, and social. Toggle a sequence to start or pause enrollment.
          </p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <kpi.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-semibold tabular-nums">{kpi.value}</div>
                  <div className="truncate text-sm text-muted-foreground">{kpi.label}</div>
                  <div className="truncate text-xs text-muted-foreground/80">{kpi.hint}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">All sequences</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="space-y-3">
              {SEQUENCES.map((seq) => {
                const isActive = active[seq.id]
                const isSelected = seq.id === selectedId
                return (
                  <Card
                    key={seq.id}
                    onClick={() => setSelectedId(seq.id)}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-muted/30",
                      isSelected && "border-primary ring-1 ring-primary",
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-semibold">{seq.name}</h3>
                            <Badge variant={isActive ? "default" : "secondary"}>
                              {isActive ? "Active" : "Paused"}
                            </Badge>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {seq.audience} · {seq.steps.length} steps · {seq.enrolled} enrolled
                          </p>
                        </div>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex shrink-0 items-center gap-2"
                        >
                          <Switch
                            checked={isActive}
                            onCheckedChange={() => toggle(seq.id)}
                            aria-label={`Toggle ${seq.name}`}
                          />
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <MousePointerClick className="h-3.5 w-3.5" />
                              Open rate
                            </span>
                            <span className="font-medium tabular-nums">{seq.open}%</span>
                          </div>
                          <Progress value={seq.open} className="h-1.5" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Reply className="h-3.5 w-3.5" />
                              Reply rate
                            </span>
                            <span className="font-medium tabular-nums">{seq.reply}%</span>
                          </div>
                          <Progress value={seq.reply} className="h-1.5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <section className="lg:sticky lg:top-20 lg:self-start">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <GitBranch className="h-4 w-4 text-primary" />
                      <span className="truncate">{selected.name}</span>
                    </CardTitle>
                    <CardDescription>Step builder · {selected.steps.length} steps</CardDescription>
                  </div>
                  <Badge variant={active[selected.id] ? "default" : "secondary"}>
                    {active[selected.id] ? "Running" : "Paused"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {initials(selected.audience)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 text-sm">
                    <div className="font-medium">{selected.audience}</div>
                    <div className="text-xs text-muted-foreground">
                      {selected.enrolled} contacts enrolled
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={active[selected.id] ? "outline" : "default"}
                    className="ml-auto"
                    onClick={() => toggle(selected.id)}
                  >
                    {active[selected.id] ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Start
                      </>
                    )}
                  </Button>
                </div>

                <ol className="relative space-y-1">
                  {selected.steps.map((step, i) => {
                    const meta = STEP_META[step.kind]
                    const isWait = step.kind === "wait"
                    return (
                      <li key={step.id} className="relative flex gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                              isWait
                                ? "border-dashed bg-muted text-muted-foreground"
                                : "bg-primary/10 text-primary",
                            )}
                          >
                            <meta.icon className="h-4 w-4" />
                          </div>
                          {i < selected.steps.length - 1 && (
                            <div className="my-1 w-px flex-1 bg-border" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{step.title}</span>
                            <Badge variant="outline" className="text-[10px]">
                              {meta.label}
                            </Badge>
                            <span className="ml-auto text-xs text-muted-foreground">
                              Day {step.day}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>

                <Button variant="outline" className="mt-1 w-full border-dashed">
                  <Plus className="h-4 w-4" />
                  Add step
                </Button>

                <Separator className="my-4" />

                <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-xs text-primary">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    Steps send automatically while the sequence is running.
                  </span>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 text-xs text-muted-foreground sm:px-6">
          <span>Cadence — Sales Engagement</span>
          <span>{activeCount} running · {enrolledTotal.toLocaleString()} enrolled</span>
        </div>
      </footer>
    </div>
  )
}
