"use client"

import * as React from "react"
import {
  ArrowLeft,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Download,
  FileText,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  Phone,
  Plus,
  Star,
  TrendingUp,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const STAGES = [
  "Lead",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
] as const

const DEAL_FACTS = [
  ["Owner", "Dana Whitfield"],
  ["Account", "Northwind Logistics"],
  ["Source", "Inbound — Website"],
  ["Close date", "Jul 18, 2026"],
  ["Probability", "65%"],
  ["Deal ID", "#DL-40293"],
]

const CONTACTS = [
  {
    name: "Marcus Reed",
    role: "VP of Operations",
    initials: "MR",
    primary: true,
    email: "marcus@northwind.co",
    phone: "+1 (415) 555-0192",
  },
  {
    name: "Lena Park",
    role: "Procurement Lead",
    initials: "LP",
    primary: false,
    email: "lena@northwind.co",
    phone: "+1 (415) 555-0177",
  },
]

const TIMELINE = [
  {
    icon: Mail,
    title: "Proposal sent to Marcus",
    detail: "Shared the annual enterprise plan PDF and pricing breakdown.",
    when: "Today, 9:42 AM",
    by: "Dana Whitfield",
  },
  {
    icon: Phone,
    title: "Discovery call completed",
    detail: "30-min call covering rollout timeline and seat count for Q3.",
    when: "Yesterday, 2:15 PM",
    by: "Dana Whitfield",
  },
  {
    icon: MessageSquare,
    title: "Lena replied to follow-up",
    detail: "Confirmed budget approval is pending one more sign-off.",
    when: "Jun 11, 4:08 PM",
    by: "Lena Park",
  },
  {
    icon: TrendingUp,
    title: "Stage moved to Qualified",
    detail: "Deal advanced after the discovery call met all criteria.",
    when: "Jun 10, 11:20 AM",
    by: "Dana Whitfield",
  },
]

const INITIAL_TASKS = [
  { id: 1, label: "Send revised proposal with volume discount", due: "Due today", done: false },
  { id: 2, label: "Schedule technical review with their IT team", due: "Jun 16", done: false },
  { id: 3, label: "Confirm budget sign-off with procurement", due: "Jun 17", done: false },
  { id: 4, label: "Log discovery call notes in CRM", due: "Done", done: true },
]

const FILES = [
  { name: "Enterprise-Proposal-v3.pdf", size: "2.4 MB", when: "Today", icon: FileText },
  { name: "MSA-Draft-Northwind.docx", size: "184 KB", when: "Jun 12", icon: FileText },
  { name: "Pricing-Breakdown.xlsx", size: "92 KB", when: "Jun 10", icon: FileText },
]

export default function DealDetail() {
  const [stageIndex, setStageIndex] = React.useState(1)
  const [tasks, setTasks] = React.useState(INITIAL_TASKS)

  const toggleTask = (id: number) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )

  const completed = tasks.filter((t) => t.done).length
  const progress = STAGES.length > 1 ? (stageIndex / (STAGES.length - 1)) * 100 : 0

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="icon" aria-label="Back to deals">
            <ArrowLeft className="size-4" />
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Deals</span>
            <ChevronRight className="hidden size-3.5 sm:inline" />
            <span className="font-medium text-foreground">Northwind — Annual</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Star className="size-4" />
              <span className="hidden sm:inline">Follow</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <section className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Enterprise</Badge>
                <span className="text-xs text-muted-foreground">Updated 12 min ago</span>
              </div>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Northwind Logistics — Annual Contract
              </h1>
              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <Building2 className="size-4" />
                <span className="text-sm">Northwind Logistics</span>
              </div>
            </div>
            <Card className="w-full shrink-0 sm:w-56">
              <CardContent className="flex items-center gap-3 py-4">
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <DollarSign className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Deal value</p>
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">$184,000</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium">Pipeline stage</p>
              <span className="text-xs text-muted-foreground tabular-nums">
                {Math.round(progress)}% to close
              </span>
            </div>
            <Progress value={progress} className="mb-3 h-1.5" />
            <div className="flex flex-wrap gap-2">
              {STAGES.map((stage, i) => {
                const isActive = i === stageIndex
                const isPast = i < stageIndex
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setStageIndex(i)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive &&
                        "border-primary bg-primary text-primary-foreground",
                      isPast &&
                        "border-primary/40 bg-primary/10 text-primary",
                      !isActive &&
                        !isPast &&
                        "bg-background text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {isPast && <Check className="size-3.5" />}
                    {stage}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <Separator className="mb-6" />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Deal facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {DEAL_FACTS.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Contacts</CardTitle>
                <Button variant="ghost" size="icon" aria-label="Add contact">
                  <Plus className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {CONTACTS.map((c) => (
                  <div key={c.name} className="flex items-start gap-3">
                    <Avatar className="size-9">
                      <AvatarFallback>{c.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{c.name}</p>
                        {c.primary && (
                          <Badge variant="outline" className="text-[10px]">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{c.role}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <Button variant="outline" size="icon" className="size-7" aria-label={"Email " + c.name}>
                          <Mail className="size-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="size-7" aria-label={"Call " + c.name}>
                          <Phone className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Activity</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="size-4" />
                  Log activity
                </Button>
              </CardHeader>
              <CardContent>
                <ol className="relative space-y-6 border-l pl-6">
                  {TIMELINE.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <li key={i} className="relative">
                        <span className="absolute -left-[33px] flex size-6 items-center justify-center rounded-full border bg-card text-muted-foreground">
                          <Icon className="size-3.5" />
                        </span>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              {item.detail}
                            </p>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <User className="size-3" />
                              {item.by}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {item.when}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-3">
            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Tasks</CardTitle>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {completed}/{tasks.length}
                </span>
              </CardHeader>
              <CardContent className="space-y-1">
                {tasks.map((task) => (
                  <label
                    key={task.id}
                    htmlFor={"task-" + task.id}
                    className="flex cursor-pointer items-start gap-3 rounded-md p-2 transition-colors hover:bg-accent"
                  >
                    <Checkbox
                      id={"task-" + task.id}
                      checked={task.done}
                      onCheckedChange={() => toggleTask(task.id)}
                      className="mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-sm",
                          task.done && "text-muted-foreground line-through"
                        )}
                      >
                        {task.label}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarClock className="size-3" />
                        {task.due}
                      </p>
                    </div>
                  </label>
                ))}
                <Button variant="ghost" size="sm" className="mt-1 w-full justify-start text-muted-foreground">
                  <Plus className="size-4" />
                  Add task
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Files</CardTitle>
                <Button variant="ghost" size="icon" aria-label="Attach file">
                  <Paperclip className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {FILES.map((f) => {
                  const Icon = f.icon
                  return (
                    <div
                      key={f.name}
                      className="group flex items-center gap-3 rounded-md border p-2.5"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <Icon className="size-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {f.size} · {f.when}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        aria-label={"Download " + f.name}
                      >
                        <Download className="size-3.5" />
                      </Button>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {stageIndex === STAGES.length - 1 && (
              <div className="flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 p-3 text-sm text-primary">
                <CheckCircle2 className="size-4 shrink-0" />
                Deal marked as won. Nice work!
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
