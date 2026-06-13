"use client"
import * as React from "react"
import { Calendar, ChevronLeft, ChevronRight, CheckCircle2, Clock, AlertTriangle, Send, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Status = "submitted" | "pending" | "blocked"

type Update = {
  id: string
  name: string
  role: string
  initials: string
  avatar: string
  status: Status
  time: string
  yesterday: string
  today: string
  blockers: string | null
}

const TEAM: Update[] = [
  {
    id: "u1",
    name: "Maya Chen",
    role: "Frontend Engineer",
    initials: "MC",
    avatar: "https://i.pravatar.cc/120?img=47",
    status: "submitted",
    time: "8:42 AM",
    yesterday: "Shipped the new onboarding flow and merged the dark-mode token refactor.",
    today: "Pairing on the billing settings page and reviewing the design QA tickets.",
    blockers: null,
  },
  {
    id: "u2",
    name: "Devon Walker",
    role: "Backend Engineer",
    initials: "DW",
    avatar: "https://i.pravatar.cc/120?img=12",
    status: "blocked",
    time: "8:55 AM",
    yesterday: "Wired up the webhook retry queue and added idempotency keys.",
    today: "Trying to finish the migration but waiting on staging DB access.",
    blockers: "Need staging database credentials from DevOps to run the migration.",
  },
  {
    id: "u3",
    name: "Priya Nair",
    role: "Product Designer",
    initials: "PN",
    avatar: "https://i.pravatar.cc/120?img=32",
    status: "submitted",
    time: "9:03 AM",
    yesterday: "Finalized the empty-state illustrations and updated the component library.",
    today: "Running a usability test on the export flow at noon.",
    blockers: null,
  },
  {
    id: "u4",
    name: "Theo Martin",
    role: "QA Engineer",
    initials: "TM",
    avatar: "https://i.pravatar.cc/120?img=15",
    status: "pending",
    time: "—",
    yesterday: "—",
    today: "—",
    blockers: null,
  },
  {
    id: "u5",
    name: "Sara Okafor",
    role: "Engineering Manager",
    initials: "SO",
    avatar: "https://i.pravatar.cc/120?img=45",
    status: "blocked",
    time: "8:30 AM",
    yesterday: "Drafted the Q3 roadmap and synced with stakeholders on scope.",
    today: "Unblocking the team and prepping the sprint review deck.",
    blockers: "Roadmap sign-off is stuck pending finance approval on headcount.",
  },
  {
    id: "u6",
    name: "Liam Foster",
    role: "Data Engineer",
    initials: "LF",
    avatar: "https://i.pravatar.cc/120?img=68",
    status: "pending",
    time: "—",
    yesterday: "—",
    today: "—",
    blockers: null,
  },
]

const DATES = [
  { label: "Mon, Jun 9", value: "2026-06-09" },
  { label: "Tue, Jun 10", value: "2026-06-10" },
  { label: "Wed, Jun 11", value: "2026-06-11" },
  { label: "Thu, Jun 12", value: "2026-06-12" },
  { label: "Fri, Jun 13", value: "2026-06-13" },
]

const FILTERS = [
  { key: "all", label: "All" },
  { key: "submitted", label: "Submitted" },
  { key: "pending", label: "Pending" },
  { key: "blocked", label: "Blocked" },
] as const

function statusMeta(status: Status) {
  switch (status) {
    case "submitted":
      return { label: "Submitted", icon: CheckCircle2, badge: "secondary" as const }
    case "blocked":
      return { label: "Blocked", icon: AlertTriangle, badge: "destructive" as const }
    default:
      return { label: "Pending", icon: Clock, badge: "outline" as const }
  }
}

export default function StandupTracker() {
  const [dateIndex, setDateIndex] = React.useState(4)
  const [filter, setFilter] = React.useState<string>("all")

  const counts = React.useMemo(() => {
    return {
      submitted: TEAM.filter((u) => u.status === "submitted").length,
      pending: TEAM.filter((u) => u.status === "pending").length,
      blocked: TEAM.filter((u) => u.status === "blocked").length,
    }
  }, [])

  const visible = React.useMemo(() => {
    if (filter === "all") return TEAM
    return TEAM.filter((u) => u.status === filter)
  }, [filter])

  const completion = Math.round((counts.submitted / TEAM.length) * 100)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Async Standup</p>
              <p className="text-xs text-muted-foreground">Platform Squad</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">{completion}% complete</Badge>
            <Avatar className="size-8">
              <AvatarImage src="https://i.pravatar.cc/120?img=47" alt="" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Daily Standup</h1>
            <p className="mt-1 text-sm text-muted-foreground">Catch up on what the team is working on, async.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-card p-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous day"
              disabled={dateIndex === 0}
              onClick={() => setDateIndex((i) => Math.max(0, i - 1))}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <div className="flex min-w-36 items-center justify-center gap-2 px-2 text-sm font-medium">
              <Calendar className="size-4 text-muted-foreground" aria-hidden="true" />
              {DATES[dateIndex].label}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next day"
              disabled={dateIndex === DATES.length - 1}
              onClick={() => setDateIndex((i) => Math.min(DATES.length - 1, i + 1))}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Team</p>
            <p className="mt-1 text-2xl font-bold">{TEAM.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Submitted</p>
            <p className="mt-1 text-2xl font-bold text-primary">{counts.submitted}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Pending</p>
            <p className="mt-1 text-2xl font-bold">{counts.pending}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-medium text-muted-foreground">Blocked</p>
            <p className="mt-1 text-2xl font-bold text-destructive">{counts.blocked}</p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs value={filter} onValueChange={setFilter} className="mb-4">
              <TabsList className="grid w-full grid-cols-4">
                {FILTERS.map((f) => (
                  <TabsTrigger key={f.key} value={f.key}>
                    {f.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="space-y-4">
              {visible.map((u) => {
                const meta = statusMeta(u.status)
                const Icon = meta.icon
                return (
                  <Card key={u.id} className={cn(u.status === "blocked" && "border-destructive/40")}>
                    <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarImage src={u.avatar} alt="" />
                          <AvatarFallback>{u.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{u.name}</CardTitle>
                          <p className="text-xs text-muted-foreground">{u.role}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant={meta.badge} className="gap-1">
                          <Icon className="size-3" aria-hidden="true" />
                          {meta.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{u.time}</span>
                      </div>
                    </CardHeader>
                    {u.status === "pending" ? (
                      <CardContent>
                        <div className="flex items-center gap-2 rounded-md border border-dashed bg-muted/30 px-4 py-6 text-sm text-muted-foreground">
                          <Clock className="size-4" aria-hidden="true" />
                          Hasn&apos;t submitted an update yet.
                        </div>
                      </CardContent>
                    ) : (
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Yesterday</p>
                            <p className="text-sm leading-relaxed">{u.yesterday}</p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Today</p>
                            <p className="text-sm leading-relaxed">{u.today}</p>
                          </div>
                        </div>
                        {u.blockers && (
                          <div className="flex items-start gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                            <span>{u.blockers}</span>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                )
              })}
              {visible.length === 0 && (
                <Card className="p-10 text-center text-sm text-muted-foreground">
                  No updates match this filter.
                </Card>
              )}
            </div>
          </div>

          <aside className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-base">Submit your update</CardTitle>
                <p className="text-sm text-muted-foreground">Posting as Maya Chen</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="yesterday">Yesterday</Label>
                  <Textarea id="yesterday" placeholder="What did you get done?" rows={3} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="today">Today</Label>
                  <Textarea id="today" placeholder="What are you focused on?" rows={3} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="blockers">Blockers</Label>
                  <Textarea id="blockers" placeholder="Anything in your way?" rows={2} />
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2">
                <Button className="w-full gap-2">
                  <Send className="size-4" aria-hidden="true" />
                  Post update
                </Button>
                <p className="text-center text-xs text-muted-foreground">Reminders go out at 9:00 AM daily.</p>
              </CardFooter>
            </Card>
          </aside>
        </div>

        <Separator className="my-8" />
        <footer className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>Async Standup · Platform Squad</p>
          <p>Last digest sent {DATES[dateIndex].label} at 9:00 AM</p>
        </footer>
      </main>
    </div>
  )
}
