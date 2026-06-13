"use client"
import * as React from "react"
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Network,
  Wallet,
  Search,
  Plus,
  TrendingUp,
  TrendingDown,
  UserPlus,
  Building2,
  Check,
  X,
  Settings,
  Bell,
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
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "directory", label: "Directory", icon: Users },
  { id: "timeoff", label: "Time off", icon: CalendarDays },
  { id: "orgchart", label: "Org chart", icon: Network },
  { id: "payroll", label: "Payroll", icon: Wallet },
] as const

type Section = (typeof NAV)[number]["id"]

const KPIS = [
  { label: "Total headcount", value: "248", delta: "+12", up: true, note: "vs last quarter" },
  { label: "New hires (Q2)", value: "18", delta: "+5", up: true, note: "3 starting this week" },
  { label: "Open roles", value: "9", delta: "-2", up: false, note: "across 4 teams" },
  { label: "Attrition rate", value: "4.1%", delta: "-0.6%", up: false, note: "trailing 12 mo" },
]

const DEPTS = ["All", "Engineering", "Design", "Sales", "Marketing", "People"]

const HEADCOUNT = [
  { dept: "Engineering", count: 96, pct: 39 },
  { dept: "Sales", count: 54, pct: 22 },
  { dept: "Marketing", count: 31, pct: 13 },
  { dept: "Design", count: 28, pct: 11 },
  { dept: "People", count: 21, pct: 8 },
  { dept: "Finance", count: 18, pct: 7 },
]

const EMPLOYEES = [
  { name: "Amara Osei", role: "Staff Engineer", dept: "Engineering", location: "Remote", status: "Active", img: "https://i.pravatar.cc/80?img=47" },
  { name: "Diego Marchetti", role: "Product Designer", dept: "Design", location: "Milan", status: "Active", img: "https://i.pravatar.cc/80?img=12" },
  { name: "Priya Nair", role: "Account Executive", dept: "Sales", location: "Austin", status: "Active", img: "https://i.pravatar.cc/80?img=32" },
  { name: "Tomas Berg", role: "Growth Marketer", dept: "Marketing", location: "Berlin", status: "On leave", img: "https://i.pravatar.cc/80?img=15" },
  { name: "Lena Fischer", role: "People Partner", dept: "People", location: "Remote", status: "Active", img: "https://i.pravatar.cc/80?img=5" },
  { name: "Hassan Ali", role: "Backend Engineer", dept: "Engineering", location: "Cairo", status: "Active", img: "https://i.pravatar.cc/80?img=68" },
  { name: "Maya Chen", role: "Brand Designer", dept: "Design", location: "Toronto", status: "Active", img: "https://i.pravatar.cc/80?img=44" },
  { name: "Owen Hart", role: "Sales Manager", dept: "Sales", location: "London", status: "Active", img: "https://i.pravatar.cc/80?img=53" },
]

const INITIAL_REQUESTS = [
  { id: "r1", name: "Tomas Berg", img: "https://i.pravatar.cc/80?img=15", type: "Vacation", range: "Jun 18 – Jun 25", days: 6, balance: "11 days left", note: "Family trip" },
  { id: "r2", name: "Priya Nair", img: "https://i.pravatar.cc/80?img=32", type: "Sick", range: "Jun 14", days: 1, balance: "8 days left", note: "Doctor appointment" },
  { id: "r3", name: "Hassan Ali", img: "https://i.pravatar.cc/80?img=68", type: "Personal", range: "Jun 20 – Jun 21", days: 2, balance: "4 days left", note: "Moving apartments" },
  { id: "r4", name: "Maya Chen", img: "https://i.pravatar.cc/80?img=44", type: "Vacation", range: "Jul 01 – Jul 12", days: 9, balance: "15 days left", note: "Summer holiday" },
]

const UPCOMING = [
  { name: "Lena Fischer", img: "https://i.pravatar.cc/80?img=5", type: "Vacation", range: "Jun 16 – Jun 17" },
  { name: "Owen Hart", img: "https://i.pravatar.cc/80?img=53", type: "Conference", range: "Jun 19 – Jun 20" },
]

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2)
}

export default function HrPlatformTemplate() {
  const [section, setSection] = React.useState<Section>("overview")
  const [dept, setDept] = React.useState("All")
  const [query, setQuery] = React.useState("")
  const [decisions, setDecisions] = React.useState<Record<string, "approved" | "denied">>({})

  const filteredEmployees = EMPLOYEES.filter((e) => {
    const matchDept = dept === "All" || e.dept === dept
    const matchQuery =
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.role.toLowerCase().includes(query.toLowerCase())
    return matchDept && matchQuery
  })

  const pendingCount = INITIAL_REQUESTS.filter((r) => !decisions[r.id]).length
  const activeNav = NAV.find((n) => n.id === section)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Users className="size-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">Northwind People</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = section === item.id
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {item.label}
                {item.id === "timeoff" && pendingCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">{pendingCount}</Badge>
                )}
              </button>
            )
          })}
        </nav>
        <Separator />
        <div className="flex items-center gap-3 p-4">
          <Avatar className="size-9">
            <AvatarImage src="https://i.pravatar.cc/80?img=8" alt="" />
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Jordan Reyes</p>
            <p className="truncate text-xs text-muted-foreground">HR Admin</p>
          </div>
          <Button variant="ghost" size="icon" className="ml-auto" aria-label="Settings">
            <Settings className="size-4" />
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur">
          <div className="lg:hidden flex items-center gap-2">
            {NAV.map((item) => (
              <Button
                key={item.id}
                variant={section === item.id ? "secondary" : "ghost"}
                size="icon"
                aria-label={item.label}
                onClick={() => setSection(item.id)}
              >
                <item.icon className="size-4" />
              </Button>
            ))}
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold tracking-tight">{activeNav?.label}</h1>
            <p className="text-xs text-muted-foreground">People operations dashboard</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-4" />
            </Button>
            <Button size="sm">
              <Plus className="size-4" /> Add employee
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {section === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {KPIS.map((kpi) => (
                  <Card key={kpi.label}>
                    <CardHeader className="pb-2">
                      <CardDescription>{kpi.label}</CardDescription>
                      <CardTitle className="text-3xl">{kpi.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 font-medium",
                            kpi.up ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          )}
                        >
                          {kpi.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                          {kpi.delta}
                        </span>
                        <span className="text-muted-foreground">{kpi.note}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="size-4 text-muted-foreground" /> Headcount by department
                    </CardTitle>
                    <CardDescription>248 employees across 6 departments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {HEADCOUNT.map((row) => (
                      <div key={row.dept} className="space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{row.dept}</span>
                          <span className="text-muted-foreground">{row.count}</span>
                        </div>
                        <Progress value={row.pct} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <UserPlus className="size-4 text-muted-foreground" /> Starting soon
                    </CardTitle>
                    <CardDescription>Onboarding this week</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {EMPLOYEES.slice(0, 3).map((e) => (
                      <div key={e.name} className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarImage src={e.img} alt="" />
                          <AvatarFallback>{initials(e.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{e.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{e.role}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">{e.dept}</Badge>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setSection("directory")}>
                      View directory <ChevronRight className="size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {section === "directory" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or role"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                    aria-label="Search employees"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {filteredEmployees.length} of {EMPLOYEES.length} people
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {DEPTS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDept(d)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                      dept === d
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <Card className="overflow-hidden p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((e) => (
                      <TableRow key={e.name}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarImage src={e.img} alt="" />
                              <AvatarFallback>{initials(e.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{e.name}</p>
                              <p className="text-xs text-muted-foreground">{e.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{e.dept}</Badge>
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground md:table-cell">{e.location}</TableCell>
                        <TableCell>
                          <Badge variant={e.status === "Active" ? "secondary" : "outline"}>{e.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                          No employees match your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {section === "timeoff" && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Pending requests</h2>
                  <Badge variant="secondary">{pendingCount} pending</Badge>
                </div>
                {INITIAL_REQUESTS.map((r) => {
                  const decision = decisions[r.id]
                  return (
                    <Card key={r.id} className={cn(decision && "opacity-70")}>
                      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex flex-1 items-center gap-3">
                          <Avatar className="size-10">
                            <AvatarImage src={r.img} alt="" />
                            <AvatarFallback>{initials(r.name)}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{r.name}</p>
                              <Badge variant="outline">{r.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {r.range} · {r.days} {r.days === 1 ? "day" : "days"} · {r.balance}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">&ldquo;{r.note}&rdquo;</p>
                          </div>
                        </div>
                        {decision ? (
                          <Badge
                            variant={decision === "approved" ? "secondary" : "destructive"}
                            className="self-start sm:self-center"
                          >
                            {decision === "approved" ? "Approved" : "Denied"}
                          </Badge>
                        ) : (
                          <div className="flex gap-2 self-start sm:self-center">
                            <Button
                              size="sm"
                              onClick={() => setDecisions((d) => ({ ...d, [r.id]: "approved" }))}
                            >
                              <Check className="size-4" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setDecisions((d) => ({ ...d, [r.id]: "denied" }))}
                            >
                              <X className="size-4" /> Deny
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Out this week</CardTitle>
                    <CardDescription>Approved upcoming leave</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {UPCOMING.map((u) => (
                      <div key={u.name} className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarImage src={u.img} alt="" />
                          <AvatarFallback>{initials(u.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{u.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{u.range}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">{u.type}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Team capacity</CardTitle>
                    <CardDescription>June availability</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-semibold">92%</span>
                      <span className="text-xs text-muted-foreground">8 on leave today</span>
                    </div>
                    <Progress value={92} />
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {section === "orgchart" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Leadership</CardTitle>
                  <CardDescription>Reporting structure overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <div className="flex w-56 flex-col items-center gap-2 rounded-lg border bg-primary/10 p-4 text-center">
                      <Avatar className="size-12">
                        <AvatarImage src="https://i.pravatar.cc/80?img=8" alt="" />
                        <AvatarFallback>JR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">Jordan Reyes</p>
                        <p className="text-xs text-muted-foreground">Chief People Officer</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {EMPLOYEES.slice(4, 7).map((e) => (
                      <div key={e.name} className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center">
                        <Avatar className="size-11">
                          <AvatarImage src={e.img} alt="" />
                          <AvatarFallback>{initials(e.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{e.name}</p>
                          <p className="text-xs text-muted-foreground">{e.role}</p>
                        </div>
                        <Badge variant="outline">{e.dept}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {section === "payroll" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { label: "Next run", value: "Jun 30", note: "in 17 days" },
                  { label: "Gross monthly", value: "$1.82M", note: "248 employees" },
                  { label: "Pending approvals", value: "3", note: "expense reports" },
                ].map((s) => (
                  <Card key={s.label}>
                    <CardHeader className="pb-2">
                      <CardDescription>{s.label}</CardDescription>
                      <CardTitle className="text-2xl">{s.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{s.note}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="overflow-hidden p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Run</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead className="hidden md:table-cell">Employees</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { run: "May 2026", period: "May 1 – May 31", emp: 246, amount: "$1.79M", status: "Paid" },
                      { run: "Apr 2026", period: "Apr 1 – Apr 30", emp: 241, amount: "$1.74M", status: "Paid" },
                      { run: "Mar 2026", period: "Mar 1 – Mar 31", emp: 238, amount: "$1.71M", status: "Paid" },
                    ].map((p) => (
                      <TableRow key={p.run}>
                        <TableCell className="font-medium">{p.run}</TableCell>
                        <TableCell className="text-muted-foreground">{p.period}</TableCell>
                        <TableCell className="hidden md:table-cell">{p.emp}</TableCell>
                        <TableCell>{p.amount}</TableCell>
                        <TableCell><Badge variant="secondary">{p.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
