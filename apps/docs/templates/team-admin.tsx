"use client"

import * as React from "react"
import {
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  Filter,
  LayoutDashboard,
  Mail,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NAV = [
  ["Overview", LayoutDashboard, false],
  ["Members", Users, true],
  ["Organization", Building2, false],
  ["Billing", CreditCard, false],
  ["Settings", Settings, false],
] as const

type Role = "Owner" | "Admin" | "Member" | "Viewer"
type MemberStatus = "Active" | "Invited" | "Suspended"

type TeamMember = {
  id: number
  name: string
  initials: string
  email: string
  role: Role
  status: MemberStatus
  team: string
  lastActive: string
}

const MEMBERS: TeamMember[] = [
  { id: 1, name: "Jordan Reyes", initials: "JR", email: "jordan@northwind.co", role: "Owner", status: "Active", team: "Leadership", lastActive: "Just now" },
  { id: 2, name: "Amelia Brooks", initials: "AB", email: "amelia@northwind.co", role: "Admin", status: "Active", team: "Engineering", lastActive: "12 min ago" },
  { id: 3, name: "Daniel Cho", initials: "DC", email: "daniel@northwind.co", role: "Member", status: "Active", team: "Design", lastActive: "1 hour ago" },
  { id: 4, name: "Sofia Marin", initials: "SM", email: "sofia@northwind.co", role: "Member", status: "Invited", team: "Marketing", lastActive: "Pending" },
  { id: 5, name: "Marcus Hale", initials: "MH", email: "marcus@northwind.co", role: "Admin", status: "Active", team: "Engineering", lastActive: "3 hours ago" },
  { id: 6, name: "Priya Nair", initials: "PN", email: "priya@northwind.co", role: "Viewer", status: "Active", team: "Finance", lastActive: "Yesterday" },
  { id: 7, name: "Tomás Vidal", initials: "TV", email: "tomas@northwind.co", role: "Member", status: "Suspended", team: "Sales", lastActive: "2 weeks ago" },
  { id: 8, name: "Hannah Webb", initials: "HW", email: "hannah@northwind.co", role: "Viewer", status: "Invited", team: "Support", lastActive: "Pending" },
  { id: 9, name: "Owen Frost", initials: "OF", email: "owen@northwind.co", role: "Member", status: "Active", team: "Sales", lastActive: "5 hours ago" },
]

const ROLE_FILTERS = ["All", "Owner", "Admin", "Member", "Viewer"] as const
type RoleFilter = (typeof ROLE_FILTERS)[number]

const SEATS_TOTAL = 15

function roleVariant(role: Role): "default" | "secondary" | "outline" {
  switch (role) {
    case "Owner":
      return "default"
    case "Admin":
      return "secondary"
    default:
      return "outline"
  }
}

function StatusDot({ status }: { status: MemberStatus }) {
  const config: Record<MemberStatus, { cls: string; label: string }> = {
    Active: { cls: "bg-primary", label: "Active" },
    Invited: { cls: "bg-muted-foreground", label: "Invited" },
    Suspended: { cls: "bg-destructive", label: "Suspended" },
  }
  const { cls, label } = config[status]
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className={cn("h-2 w-2 rounded-full", cls)} aria-hidden="true" />
      <span className={cn(status === "Suspended" && "text-destructive")}>{label}</span>
    </span>
  )
}

export default function TeamAdmin() {
  const [role, setRole] = React.useState<RoleFilter>("All")
  const [query, setQuery] = React.useState("")
  const [inviteRole, setInviteRole] = React.useState<Role>("Member")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return MEMBERS.filter((m) => {
      const inRole = role === "All" || m.role === role
      const inQuery =
        q === "" ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.team.toLowerCase().includes(q)
      return inRole && inQuery
    })
  }, [role, query])

  const seatsUsed = MEMBERS.filter((m) => m.status !== "Suspended").length
  const seatsPct = Math.round((seatsUsed / SEATS_TOTAL) * 100)
  const activeCount = MEMBERS.filter((m) => m.status === "Active").length
  const pendingCount = MEMBERS.filter((m) => m.status === "Invited").length
  const adminCount = MEMBERS.filter((m) => m.role === "Owner" || m.role === "Admin").length

  const roleCount = (r: RoleFilter) =>
    r === "All" ? MEMBERS.length : MEMBERS.filter((m) => m.role === r).length

  const inviteRoles: Role[] = ["Admin", "Member", "Viewer"]

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Northwind Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Primary">
          {NAV.map(([label, Icon, active]) => (
            <button
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="m-3 rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Seats used</span>
            <span className="text-xs font-medium">
              {seatsUsed}/{SEATS_TOTAL}
            </span>
          </div>
          <Progress value={seatsPct} className="mt-3" aria-label="Seats used" />
          <p className="mt-2 text-xs text-muted-foreground">
            {SEATS_TOTAL - seatsUsed} seats remaining on Growth plan
          </p>
          <Button variant="outline" size="sm" className="mt-3 w-full">
            Manage plan
          </Button>
        </div>
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>JR</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Jordan Reyes</p>
              <p className="truncate text-xs text-muted-foreground">Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div>
            <h1 className="text-base font-semibold leading-tight">Members</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Manage who has access to your workspace
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Mail className="h-4 w-4" />
              Resend invites
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4" />
              Invite member
            </Button>
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col gap-6 p-4 sm:p-6 xl:flex-row">
          {/* Left: stats + table */}
          <section className="flex min-w-0 flex-1 flex-col">
            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-medium">Total</span>
                </div>
                <p className="mt-2 text-2xl font-semibold">{MEMBERS.length}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-medium">Active</span>
                </div>
                <p className="mt-2 text-2xl font-semibold">{activeCount}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-medium">Pending</span>
                </div>
                <p className="mt-2 text-2xl font-semibold">{pendingCount}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs font-medium">Admins</span>
                </div>
                <p className="mt-2 text-2xl font-semibold">{adminCount}</p>
              </div>
            </div>

            {/* Toolbar: search + role filter */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search members, email, team…"
                  className="pl-9"
                  aria-label="Search members"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="hidden h-4 w-4 text-muted-foreground sm:block" />
                {ROLE_FILTERS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors",
                      role === r
                        ? "border-primary bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {r}
                    <span
                      className={cn(
                        "rounded-full px-1.5",
                        role === r ? "bg-primary/15 text-primary" : "bg-muted",
                      )}
                    >
                      {roleCount(r)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Members table */}
            <div className="mt-4 overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Member</TableHead>
                    <TableHead className="hidden md:table-cell">Team</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Last active</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{m.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium">{m.name}</p>
                            <p className="truncate text-xs text-muted-foreground">
                              {m.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                        {m.team}
                      </TableCell>
                      <TableCell>
                        <Badge variant={roleVariant(m.role)}>{m.role}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <StatusDot status={m.status} />
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                        {m.lastActive}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`More actions for ${m.name}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-16 text-center">
                        <p className="text-sm font-medium">No members found</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Try a different search or role filter.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Showing {filtered.length} of {MEMBERS.length} members
            </p>
          </section>

          {/* Right: invite panel + seats */}
          <aside className="w-full shrink-0 space-y-6 xl:w-80">
            <div className="rounded-lg border bg-card p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Invite a member</h2>
                  <p className="text-xs text-muted-foreground">
                    They will get an email to join
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="invite-email">Email address</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {inviteRoles.map((r) => (
                      <button
                        key={r}
                        onClick={() => setInviteRole(r)}
                        className={cn(
                          "rounded-md border px-2 py-2 text-xs font-medium transition-colors",
                          inviteRole === r
                            ? "border-primary bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <Button className="w-full">
                  <Mail className="h-4 w-4" />
                  Send invitation
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Inviting as <span className="font-medium text-foreground">{inviteRole}</span>
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Seat usage</h2>
                <Badge variant="secondary">{seatsPct}%</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Growth plan, billed yearly</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold">{seatsUsed}</span>
                <span className="text-sm text-muted-foreground">/ {SEATS_TOTAL} seats</span>
              </div>
              <Progress value={seatsPct} className="mt-3" aria-label="Seat usage" />
              <Separator className="my-4" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active members</span>
                  <span className="font-medium">{activeCount}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Pending invites</span>
                  <span className="font-medium">{pendingCount}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-medium">{SEATS_TOTAL - seatsUsed}</span>
                </li>
              </ul>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <CreditCard className="h-4 w-4" />
                Add more seats
              </Button>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}
