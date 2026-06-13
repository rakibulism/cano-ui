"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  ScrollText,
  Settings,
  Search,
  Plus,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  UserPlus,
  KeyRound,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ChevronRight,
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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"

type SectionId = "overview" | "users" | "roles" | "audit" | "settings"

const NAV: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "roles", label: "Roles", icon: ShieldCheck },
  { id: "audit", label: "Audit log", icon: ScrollText },
  { id: "settings", label: "Settings", icon: Settings },
]

const KPIS = [
  { label: "Total users", value: "4,820", delta: "+6.2%", up: true, icon: Users },
  { label: "Active today", value: "1,294", delta: "+3.1%", up: true, icon: Activity },
  { label: "Pending invites", value: "37", delta: "-12%", up: false, icon: UserPlus },
  { label: "Failed logins", value: "18", delta: "-24%", up: false, icon: AlertTriangle },
]

type Role = "Admin" | "Editor" | "Viewer" | "Billing"
type Status = "Active" | "Invited" | "Suspended"

const SEED_USERS: {
  id: number
  name: string
  email: string
  role: Role
  status: Status
  seen: string
  active: boolean
}[] = [
  { id: 1, name: "Amara Okafor", email: "amara@northwind.io", role: "Admin", status: "Active", seen: "2 min ago", active: true },
  { id: 2, name: "Devon Park", email: "devon@northwind.io", role: "Editor", status: "Active", seen: "1 hr ago", active: true },
  { id: 3, name: "Mira Solberg", email: "mira@northwind.io", role: "Viewer", status: "Invited", seen: "Pending", active: false },
  { id: 4, name: "Theo Castellanos", email: "theo@northwind.io", role: "Billing", status: "Active", seen: "Yesterday", active: true },
  { id: 5, name: "Priya Nair", email: "priya@northwind.io", role: "Editor", status: "Suspended", seen: "5 days ago", active: false },
  { id: 6, name: "Jonas Weber", email: "jonas@northwind.io", role: "Viewer", status: "Active", seen: "3 hr ago", active: true },
  { id: 7, name: "Lena Fitzgerald", email: "lena@northwind.io", role: "Admin", status: "Active", seen: "12 min ago", active: true },
  { id: 8, name: "Cole Bennett", email: "cole@northwind.io", role: "Viewer", status: "Invited", seen: "Pending", active: false },
]

const ROLE_DEFS: { name: Role; members: number; perms: string; desc: string }[] = [
  { name: "Admin", members: 2, perms: "Full access", desc: "Manage members, billing, and all workspace settings." },
  { name: "Editor", members: 2, perms: "Read / write", desc: "Create and edit resources, but cannot manage members." },
  { name: "Billing", members: 1, perms: "Billing only", desc: "View invoices and update payment methods." },
  { name: "Viewer", members: 3, perms: "Read only", desc: "View dashboards and reports without editing." },
]

type AuditKind = "auth" | "member" | "billing" | "security"
const AUDIT: { id: number; actor: string; action: string; target: string; kind: AuditKind; time: string }[] = [
  { id: 1, actor: "Amara Okafor", action: "Updated role for", target: "Devon Park → Editor", kind: "member", time: "09:42" },
  { id: 2, actor: "System", action: "Blocked sign-in from", target: "203.0.113.44", kind: "security", time: "09:31" },
  { id: 3, actor: "Theo Castellanos", action: "Changed payment method on", target: "Workspace billing", kind: "billing", time: "08:58" },
  { id: 4, actor: "Lena Fitzgerald", action: "Invited new member", target: "cole@northwind.io", kind: "member", time: "08:20" },
  { id: 5, actor: "Mira Solberg", action: "Signed in via SSO from", target: "Oslo, NO", kind: "auth", time: "07:55" },
  { id: 6, actor: "System", action: "Rotated API key for", target: "ingest-prod-01", kind: "security", time: "07:14" },
  { id: 7, actor: "Devon Park", action: "Failed sign-in attempt from", target: "Unknown device", kind: "auth", time: "06:49" },
]

const AUDIT_FILTERS: { id: AuditKind | "all"; label: string }[] = [
  { id: "all", label: "All events" },
  { id: "auth", label: "Auth" },
  { id: "member", label: "Members" },
  { id: "billing", label: "Billing" },
  { id: "security", label: "Security" },
]

function roleVariant(role: Role): "default" | "secondary" | "outline" {
  if (role === "Admin") return "default"
  if (role === "Billing") return "outline"
  return "secondary"
}

function statusTone(status: Status): string {
  if (status === "Active") return "bg-primary/10 text-primary"
  if (status === "Invited") return "bg-muted text-muted-foreground"
  return "bg-destructive/10 text-destructive"
}

function auditTone(kind: AuditKind): string {
  if (kind === "security") return "bg-destructive/10 text-destructive"
  if (kind === "billing") return "bg-accent text-foreground"
  if (kind === "member") return "bg-primary/10 text-primary"
  return "bg-muted text-muted-foreground"
}

export default function AdminConsole() {
  const [section, setSection] = React.useState<SectionId>("overview")
  const [query, setQuery] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<Role | "all">("all")
  const [users, setUsers] = React.useState(SEED_USERS)
  const [auditFilter, setAuditFilter] = React.useState<AuditKind | "all">("all")

  const filteredUsers = users.filter((u) => {
    const matchesQuery =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    return matchesQuery && matchesRole
  })

  const filteredAudit =
    auditFilter === "all" ? AUDIT : AUDIT.filter((a) => a.kind === auditFilter)

  function toggleActive(id: number) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)),
    )
  }

  const current = NAV.find((n) => n.id === section)!

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-card md:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Northwind</p>
            <p className="text-xs text-muted-foreground">Admin console</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = item.id === section
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <Separator />
        <div className="flex items-center gap-3 p-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium">Amara Okafor</p>
            <p className="truncate text-xs text-muted-foreground">Super admin</p>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Console</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{current.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search workspace"
                className="w-56 pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button size="sm">
              <Plus className="mr-1 h-4 w-4" />
              Invite
            </Button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mb-6 flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">{current.label}</h1>
            <p className="text-sm text-muted-foreground">
              {section === "overview" && "Workspace health and member activity at a glance."}
              {section === "users" && "Search, filter, and manage everyone in this workspace."}
              {section === "roles" && "Define permission sets and assign them to members."}
              {section === "audit" && "An immutable record of everything that happens here."}
              {section === "settings" && "Configure workspace-wide preferences and security."}
            </p>
          </div>

          {section === "overview" && (
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {KPIS.map((kpi) => {
                  const Icon = kpi.icon
                  return (
                    <Card key={kpi.label}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>{kpi.label}</CardDescription>
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-semibold tracking-tight">{kpi.value}</div>
                        <div
                          className={cn(
                            "mt-1 flex items-center gap-1 text-xs font-medium",
                            kpi.up ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {kpi.up ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {kpi.delta} vs last week
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Recent activity</CardTitle>
                    <CardDescription>Latest events across the workspace.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {AUDIT.slice(0, 5).map((a) => (
                      <div key={a.id} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                            auditTone(a.kind),
                          )}
                        >
                          {a.kind === "security" ? (
                            <AlertTriangle className="h-3.5 w-3.5" />
                          ) : a.kind === "billing" ? (
                            <KeyRound className="h-3.5 w-3.5" />
                          ) : a.kind === "member" ? (
                            <UserPlus className="h-3.5 w-3.5" />
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1 text-sm">
                          <p>
                            <span className="font-medium">{a.actor}</span>{" "}
                            <span className="text-muted-foreground">{a.action}</span>{" "}
                            <span className="font-medium">{a.target}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">Today at {a.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Role distribution</CardTitle>
                    <CardDescription>Members per permission set.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {ROLE_DEFS.map((r) => (
                      <div key={r.name} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{r.name}</span>
                          <span className="text-muted-foreground">{r.members}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(r.members / 8) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {section === "users" && (
            <Card>
              <CardHeader className="gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email"
                      className="pl-8"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    {(["all", "Admin", "Editor", "Billing", "Viewer"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setRoleFilter(r)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          roleFilter === r
                            ? "border-primary bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {r === "all" ? "All roles" : r}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Last seen</TableHead>
                      <TableHead className="text-center">Active</TableHead>
                      <TableHead className="w-10" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {u.name.split(" ").map((p) => p[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="leading-tight">
                              <p className="text-sm font-medium">{u.name}</p>
                              <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={roleVariant(u.role)}>{u.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                              statusTone(u.status),
                            )}
                          >
                            {u.status}
                          </span>
                        </TableCell>
                        <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                          {u.seen}
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch
                            checked={u.active}
                            onCheckedChange={() => toggleActive(u.id)}
                            aria-label={`Toggle active state for ${u.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`More actions for ${u.name}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                          No members match your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {section === "roles" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {ROLE_DEFS.map((r) => (
                <Card key={r.name}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{r.name}</CardTitle>
                        <CardDescription>{r.perms}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{r.members} members</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{r.desc}</p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit permissions
                      </Button>
                      <Button variant="ghost" size="sm">
                        View members
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {section === "audit" && (
            <Card>
              <CardHeader className="gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {AUDIT_FILTERS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setAuditFilter(f.id)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        auditFilter === f.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col">
                {filteredAudit.map((a, i) => (
                  <div key={a.id}>
                    <div className="flex items-start gap-3 py-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          auditTone(a.kind),
                        )}
                      >
                        {a.kind === "security" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : a.kind === "billing" ? (
                          <KeyRound className="h-4 w-4" />
                        ) : a.kind === "member" ? (
                          <UserPlus className="h-4 w-4" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{a.actor}</span>{" "}
                          <span className="text-muted-foreground">{a.action}</span>{" "}
                          <span className="font-medium">{a.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">Today at {a.time}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {a.kind}
                      </Badge>
                    </div>
                    {i < filteredAudit.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {section === "settings" && (
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Workspace</CardTitle>
                  <CardDescription>General details for this workspace.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="ws-name">Workspace name</Label>
                    <Input id="ws-name" defaultValue="Northwind" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="ws-domain">Primary domain</Label>
                    <Input id="ws-domain" defaultValue="northwind.io" />
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm">Save changes</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Security</CardTitle>
                  <CardDescription>Protect every member.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {[
                    { label: "Require 2FA", desc: "Enforce two-factor for all members." },
                    { label: "SSO only", desc: "Restrict sign-in to SAML SSO." },
                    { label: "Session alerts", desc: "Email on new device sign-in." },
                  ].map((s) => (
                    <div key={s.label} className="flex items-start justify-between gap-3">
                      <div className="leading-tight">
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </div>
                      <Switch defaultChecked={s.label === "Require 2FA"} aria-label={s.label} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
