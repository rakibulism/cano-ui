"use client"

import * as React from "react"
import {
  Bug,
  Search,
  Filter,
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  CircleDot,
  Clock,
  CheckCircle2,
  ListChecks,
  GitBranch,
  Tag,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

type Severity = "Critical" | "High" | "Medium" | "Low"
type Status = "Open" | "In progress" | "Resolved"

type BugRow = {
  id: string
  title: string
  area: string
  severity: Severity
  status: Status
  assignee: { name: string; initials: string; img: string }
  reporter: string
  opened: string
  branch: string
  comments: number
  description: string
  steps: string[]
}

const BUGS: BugRow[] = [
  {
    id: "BUG-4821",
    title: "Checkout total ignores applied promo code on retry",
    area: "Payments",
    severity: "Critical",
    status: "In progress",
    assignee: { name: "Mara Voss", initials: "MV", img: "https://i.pravatar.cc/80?img=47" },
    reporter: "QA Bot",
    opened: "2h ago",
    branch: "fix/promo-retry",
    comments: 6,
    description:
      "When a payment fails and the user retries, the previously applied promo discount is silently dropped, so the customer is charged the full amount.",
    steps: [
      "Add any item to cart and proceed to checkout.",
      "Apply promo code SPRING25 (25% off).",
      "Submit with a card that triggers a decline.",
      "Retry the payment with a valid card.",
      "Observe the total reverts to the undiscounted amount.",
    ],
  },
  {
    id: "BUG-4810",
    title: "Session token not refreshed after SSO re-auth",
    area: "Auth",
    severity: "Critical",
    status: "Open",
    assignee: { name: "Dev Patel", initials: "DP", img: "https://i.pravatar.cc/80?img=12" },
    reporter: "secops@acme",
    opened: "5h ago",
    branch: "—",
    comments: 3,
    description:
      "After an SSO re-authentication, the old access token is reused, causing 401 loops on long-lived tabs.",
    steps: [
      "Sign in via Okta SSO.",
      "Leave the tab idle past token expiry.",
      "Trigger any authenticated request.",
      "Re-auth completes but the stale token is sent.",
    ],
  },
  {
    id: "BUG-4799",
    title: "Dashboard chart tooltip overflows on narrow viewports",
    area: "Dashboard",
    severity: "Medium",
    status: "Open",
    assignee: { name: "Lina Koch", initials: "LK", img: "https://i.pravatar.cc/80?img=32" },
    reporter: "design@acme",
    opened: "1d ago",
    branch: "—",
    comments: 2,
    description:
      "On viewports under 380px the revenue chart tooltip extends past the screen edge and clips its values.",
    steps: [
      "Open the dashboard on a 360px device.",
      "Hover or tap a data point on the revenue chart.",
      "Notice the tooltip is cut off on the right edge.",
    ],
  },
  {
    id: "BUG-4787",
    title: "CSV export drops rows with unicode characters",
    area: "Reporting",
    severity: "High",
    status: "In progress",
    assignee: { name: "Theo Bright", initials: "TB", img: "https://i.pravatar.cc/80?img=15" },
    reporter: "support@acme",
    opened: "1d ago",
    branch: "fix/csv-unicode",
    comments: 4,
    description:
      "Exporting a report containing emoji or non-Latin names truncates the file at the first multibyte character.",
    steps: [
      "Create a report with a name containing 名前 or an emoji.",
      "Click Export to CSV.",
      "Open the downloaded file and count the rows.",
    ],
  },
  {
    id: "BUG-4776",
    title: "Notification bell badge stays after marking all read",
    area: "Notifications",
    severity: "Low",
    status: "Open",
    assignee: { name: "Ivy Sun", initials: "IS", img: "https://i.pravatar.cc/80?img=20" },
    reporter: "user-report",
    opened: "2d ago",
    branch: "—",
    comments: 1,
    description:
      "The unread count badge persists in the bell icon until a full page reload even after Mark all as read.",
    steps: [
      "Receive two or more notifications.",
      "Open the bell and click Mark all as read.",
      "The dropdown clears but the badge count remains.",
    ],
  },
  {
    id: "BUG-4762",
    title: "Webhook retries fire twice on 5xx responses",
    area: "Integrations",
    severity: "High",
    status: "Open",
    assignee: { name: "Omar Reyes", initials: "OR", img: "https://i.pravatar.cc/80?img=68" },
    reporter: "platform@acme",
    opened: "3d ago",
    branch: "—",
    comments: 5,
    description:
      "A single failed webhook delivery is retried twice in parallel, causing duplicate downstream events.",
    steps: [
      "Configure a webhook endpoint returning HTTP 503.",
      "Trigger an event that fans out to the webhook.",
      "Inspect the delivery log for duplicate attempt IDs.",
    ],
  },
  {
    id: "BUG-4751",
    title: "Avatar upload accepts files over the 5MB limit",
    area: "Profile",
    severity: "Medium",
    status: "Resolved",
    assignee: { name: "Mara Voss", initials: "MV", img: "https://i.pravatar.cc/80?img=47" },
    reporter: "QA Bot",
    opened: "4d ago",
    branch: "fix/avatar-size",
    comments: 2,
    description:
      "Client-side validation is bypassed when dragging a file directly, allowing oversized uploads.",
    steps: [
      "Open profile settings.",
      "Drag a 12MB image onto the avatar drop zone.",
      "Observe the upload succeeds without an error.",
    ],
  },
  {
    id: "BUG-4740",
    title: "Dark mode toggle flickers on first paint",
    area: "Theme",
    severity: "Low",
    status: "Resolved",
    assignee: { name: "Lina Koch", initials: "LK", img: "https://i.pravatar.cc/80?img=32" },
    reporter: "design@acme",
    opened: "5d ago",
    branch: "fix/theme-flash",
    comments: 0,
    description:
      "On hard reload with system dark preference, the page paints light for a frame before switching.",
    steps: [
      "Set OS appearance to Dark.",
      "Hard reload the app.",
      "Watch the brief flash of the light theme.",
    ],
  },
]

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/30",
  High: "bg-primary/10 text-primary border-primary/30",
  Medium: "bg-muted text-foreground border-border",
  Low: "bg-secondary text-muted-foreground border-border",
}

const SEVERITY_DOT: Record<Severity, string> = {
  Critical: "bg-destructive",
  High: "bg-primary",
  Medium: "bg-foreground/50",
  Low: "bg-muted-foreground/50",
}

const STATUS_META: Record<Status, { icon: React.ElementType; label: string }> = {
  Open: { icon: CircleDot, label: "Open" },
  "In progress": { icon: Clock, label: "In progress" },
  Resolved: { icon: CheckCircle2, label: "Resolved" },
}

const SEVERITY_TABS: Array<Severity | "All"> = ["All", "Critical", "High", "Medium", "Low"]

export default function BugTriageTemplate() {
  const [activeSeverity, setActiveSeverity] = React.useState<Severity | "All">("All")
  const [query, setQuery] = React.useState("")
  const [selectedId, setSelectedId] = React.useState<string>(BUGS[0].id)

  const counts = React.useMemo(() => {
    const base: Record<Severity, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 }
    for (const b of BUGS) base[b.severity] += 1
    return base
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return BUGS.filter((b) => {
      const matchSeverity = activeSeverity === "All" || b.severity === activeSeverity
      const matchQuery =
        q === "" ||
        b.title.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.assignee.name.toLowerCase().includes(q)
      return matchSeverity && matchQuery
    })
  }, [activeSeverity, query])

  const selected = React.useMemo(
    () => filtered.find((b) => b.id === selectedId) ?? filtered[0] ?? null,
    [filtered, selectedId],
  )

  const kpis: Array<{ severity: Severity; icon: React.ElementType; hint: string }> = [
    { severity: "Critical", icon: AlertOctagon, hint: "Needs an owner now" },
    { severity: "High", icon: AlertTriangle, hint: "Fix this sprint" },
    { severity: "Medium", icon: CircleDot, hint: "Scheduled" },
    { severity: "Low", icon: Tag, hint: "Backlog" },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bug className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Triage</p>
              <p className="text-xs text-muted-foreground">Acme Platform</p>
            </div>
          </div>
          <nav className="ml-4 hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <span className="rounded-md bg-accent px-3 py-1.5 font-medium text-foreground">Board</span>
            <span className="rounded-md px-3 py-1.5">Sprints</span>
            <span className="rounded-md px-3 py-1.5">Reports</span>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Saved views
            </Button>
            <Button size="sm">
              <Bug className="h-4 w-4" aria-hidden="true" />
              New bug
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight">Bug triage board</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {BUGS.length} open issues across 8 areas. Prioritize by severity and assign owners.
          </p>
        </div>

        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map(({ severity, icon: Icon, hint }) => {
            const active = activeSeverity === severity
            return (
              <button
                key={severity}
                type="button"
                onClick={() => setActiveSeverity(active ? "All" : severity)}
                className={cn(
                  "group rounded-xl border bg-card p-4 text-left transition-colors hover:bg-accent",
                  active && "border-primary ring-1 ring-primary",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{severity}</span>
                  <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-semibold tabular-nums">{counts[severity]}</span>
                  <span className={cn("h-2 w-2 rounded-full", SEVERITY_DOT[severity])} aria-hidden="true" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
              </button>
            )
          })}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-1.5">
                {SEVERITY_TABS.map((tab) => {
                  const active = activeSeverity === tab
                  return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveSeverity(tab)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:bg-accent",
                      )}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>
              <div className="relative w-full sm:w-64">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search bugs, IDs, owners…"
                  aria-label="Search bugs"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-[42%]">Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Owner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((bug) => {
                    const isSelected = selected?.id === bug.id
                    const StatusIcon = STATUS_META[bug.status].icon
                    return (
                      <TableRow
                        key={bug.id}
                        onClick={() => setSelectedId(bug.id)}
                        className={cn(
                          "cursor-pointer transition-colors",
                          isSelected ? "bg-accent" : "hover:bg-muted/40",
                        )}
                      >
                        <TableCell className="align-top">
                          <div className="flex items-start gap-2">
                            <span
                              className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", SEVERITY_DOT[bug.severity])}
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">{bug.title}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {bug.id} · {bug.area} · {bug.opened}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="align-top">
                          <Badge
                            variant="outline"
                            className={cn("font-medium", SEVERITY_STYLES[bug.severity])}
                          >
                            {bug.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="align-top">
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            {bug.status}
                          </span>
                        </TableCell>
                        <TableCell className="align-top text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="hidden text-xs text-muted-foreground md:inline">
                              {bug.assignee.name}
                            </span>
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={bug.assignee.img} alt="" />
                              <AvatarFallback className="text-[10px]">
                                {bug.assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
                  <Search className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                  <p className="text-sm font-medium">No matching bugs</p>
                  <p className="text-xs text-muted-foreground">
                    Try a different severity or clear your search.
                  </p>
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Showing {filtered.length} of {BUGS.length} issues
            </p>
          </section>

          <aside className="lg:sticky lg:top-20 lg:self-start">
            {selected ? (
              <div className="rounded-xl border bg-card">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{selected.id}</span>
                    <Badge variant="outline" className={cn("font-medium", SEVERITY_STYLES[selected.severity])}>
                      {selected.severity}
                    </Badge>
                  </div>
                  <h2 className="mt-2 text-base font-semibold leading-snug">{selected.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{selected.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-px bg-border text-sm">
                  <div className="bg-card p-4">
                    <p className="text-xs text-muted-foreground">Assignee</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={selected.assignee.img} alt="" />
                        <AvatarFallback className="text-[10px]">
                          {selected.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{selected.assignee.name}</span>
                    </div>
                  </div>
                  <div className="bg-card p-4">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 font-medium">
                      {React.createElement(STATUS_META[selected.status].icon, {
                        className: "h-4 w-4 text-muted-foreground",
                        "aria-hidden": true,
                      })}
                      {selected.status}
                    </p>
                  </div>
                  <div className="bg-card p-4">
                    <p className="text-xs text-muted-foreground">Reporter</p>
                    <p className="mt-1.5 font-medium">{selected.reporter}</p>
                  </div>
                  <div className="bg-card p-4">
                    <p className="text-xs text-muted-foreground">Branch</p>
                    <p className="mt-1.5 inline-flex items-center gap-1.5 font-medium">
                      <GitBranch className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span className="truncate">{selected.branch}</span>
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <ListChecks className="h-4 w-4 text-primary" aria-hidden="true" />
                    Steps to reproduce
                  </p>
                  <ol className="mt-3 space-y-2.5">
                    {selected.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold tabular-nums text-primary">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center gap-2 border-t p-4">
                  <Button size="sm" className="flex-1">
                    Assign to me
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    Open
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="View comments">
                    <span className="relative">
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Button>
                </div>
                <p className="px-4 pb-4 text-xs text-muted-foreground">
                  {selected.comments} comments · last activity {selected.opened}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border bg-card py-16 text-center">
                <Bug className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                <p className="text-sm font-medium">No bug selected</p>
                <p className="text-xs text-muted-foreground">Pick an issue from the list.</p>
              </div>
            )}
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Triage · Acme Platform</p>
          <p>Synced 3 minutes ago</p>
        </div>
      </footer>
    </div>
  )
}
