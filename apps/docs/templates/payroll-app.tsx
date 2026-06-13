"use client"

import * as React from "react"
import {
  Wallet,
  Users,
  CalendarClock,
  Landmark,
  TrendingUp,
  Play,
  Download,
  CheckCircle2,
  Search,
  ArrowUpRight,
  Building2,
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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Employee = {
  id: string
  name: string
  initials: string
  role: string
  department: string
  status: "Active" | "On leave"
  gross: number
  taxes: number
}

const EMPLOYEES: Employee[] = [
  { id: "e1", name: "Amara Okafor", initials: "AO", role: "Staff Engineer", department: "Engineering", status: "Active", gross: 11200, taxes: 3024 },
  { id: "e2", name: "Daniel Reyes", initials: "DR", role: "Backend Engineer", department: "Engineering", status: "Active", gross: 8650, taxes: 2249 },
  { id: "e3", name: "Priya Nair", initials: "PN", role: "Design Lead", department: "Design", status: "Active", gross: 9100, taxes: 2457 },
  { id: "e4", name: "Marcus Lindqvist", initials: "ML", role: "Product Designer", department: "Design", status: "On leave", gross: 7200, taxes: 1872 },
  { id: "e5", name: "Sofia Bianchi", initials: "SB", role: "Account Executive", department: "Sales", status: "Active", gross: 6800, taxes: 1768 },
  { id: "e6", name: "Jamal Brooks", initials: "JB", role: "Sales Manager", department: "Sales", status: "Active", gross: 10400, taxes: 2808 },
  { id: "e7", name: "Hana Kobayashi", initials: "HK", role: "People Partner", department: "Operations", status: "Active", gross: 7600, taxes: 1976 },
  { id: "e8", name: "Tomas Vega", initials: "TV", role: "Finance Analyst", department: "Operations", status: "Active", gross: 8200, taxes: 2132 },
]

const DEPARTMENTS = ["All", "Engineering", "Design", "Sales", "Operations"] as const

function formatCurrency(value: number) {
  return "$" + value.toLocaleString("en-US")
}

export default function PayrollAppTemplate() {
  const [department, setDepartment] = React.useState<(typeof DEPARTMENTS)[number]>("All")
  const [query, setQuery] = React.useState("")
  const [didRun, setDidRun] = React.useState(false)

  const filtered = React.useMemo(() => {
    return EMPLOYEES.filter((e) => {
      const matchesDept = department === "All" || e.department === department
      const matchesQuery = e.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesDept && matchesQuery
    })
  }, [department, query])

  const totals = React.useMemo(() => {
    const gross = filtered.reduce((sum, e) => sum + e.gross, 0)
    const taxes = filtered.reduce((sum, e) => sum + e.taxes, 0)
    return { gross, taxes, net: gross - taxes }
  }, [filtered])

  const grossPct = 100
  const taxesPct = totals.gross === 0 ? 0 : Math.round((totals.taxes / totals.gross) * 100)
  const netPct = totals.gross === 0 ? 0 : Math.round((totals.net / totals.gross) * 100)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">Paystream</p>
              <p className="text-xs text-muted-foreground">Acme Inc. payroll</p>
            </div>
          </div>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <Button variant="ghost" size="sm">Overview</Button>
            <Button variant="ghost" size="sm">Employees</Button>
            <Button variant="ghost" size="sm">Reports</Button>
            <Button variant="ghost" size="sm">Settings</Button>
          </nav>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden sm:inline-flex">Cycle 06 / 2026</Badge>
            <Avatar className="h-8 w-8">
              <AvatarFallback>FN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Run payroll</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review pay for this cycle and submit when everything looks right.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              size="sm"
              onClick={() => setDidRun(true)}
              disabled={didRun || filtered.length === 0}
            >
              {didRun ? <CheckCircle2 className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {didRun ? "Payroll submitted" : "Run payroll"}
            </Button>
          </div>
        </div>

        {didRun ? (
          <div className="mt-5 flex items-center gap-3 rounded-lg border border-primary bg-primary/10 px-4 py-3 text-sm text-primary">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p>
              Payroll for {filtered.length} {filtered.length === 1 ? "employee" : "employees"} is scheduled. Funds release on the next payday.
            </p>
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                <CardDescription>Next payday</CardDescription>
              </div>
              <CardTitle className="text-2xl">Fri, June 26</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Net to disburse</p>
                  <p className="text-3xl font-semibold tracking-tight tabular-nums">
                    {formatCurrency(totals.net)}
                  </p>
                </div>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  On track
                </Badge>
              </div>
              <Separator />
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Employees</dt>
                  <dd className="font-medium tabular-nums">{filtered.length}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Pay schedule</dt>
                  <dd className="font-medium">Monthly</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Cutoff</dt>
                  <dd className="font-medium">June 24</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Method</dt>
                  <dd className="font-medium">ACH transfer</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Cycle totals</CardTitle>
              <CardDescription>Breakdown for the current selection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <TotalRow
                icon={<Wallet className="h-4 w-4" />}
                label="Gross pay"
                value={formatCurrency(totals.gross)}
                pct={grossPct}
                hint="Total earnings before deductions"
              />
              <TotalRow
                icon={<Landmark className="h-4 w-4" />}
                label="Taxes & deductions"
                value={formatCurrency(totals.taxes)}
                pct={taxesPct}
                hint={taxesPct + "% of gross"}
              />
              <TotalRow
                icon={<ArrowUpRight className="h-4 w-4" />}
                label="Net pay"
                value={formatCurrency(totals.net)}
                pct={netPct}
                hint={netPct + "% of gross"}
                emphasize
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4" />
                Employee pay
              </CardTitle>
              <CardDescription>Filter by department to scope this run.</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search employees"
                className="pl-9"
                aria-label="Search employees"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {DEPARTMENTS.map((dept) => {
                const active = department === dept
                return (
                  <Button
                    key={dept}
                    variant={active ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDepartment(dept)}
                    className="gap-1.5"
                  >
                    <Building2 className={cn("h-3.5 w-3.5", active ? "opacity-100" : "opacity-60")} />
                    {dept}
                  </Button>
                )
              })}
            </div>

            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Employee</TableHead>
                    <TableHead className="hidden md:table-cell">Department</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-right">Gross</TableHead>
                    <TableHead className="text-right">Taxes</TableHead>
                    <TableHead className="text-right">Net</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{e.initials}</AvatarFallback>
                          </Avatar>
                          <div className="leading-tight">
                            <p className="font-medium">{e.name}</p>
                            <p className="text-xs text-muted-foreground">{e.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {e.department}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={e.status === "Active" ? "secondary" : "outline"}>
                          {e.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(e.gross)}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {formatCurrency(e.taxes)}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {formatCurrency(e.gross - e.taxes)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                        No employees match this filter.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t bg-muted/30">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filtered.length}</span> of {EMPLOYEES.length} employees
            </p>
            <p className="text-sm">
              Net total: <span className="font-semibold tabular-nums">{formatCurrency(totals.net)}</span>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Paystream payroll. All figures are estimates until the run is finalized.</p>
          <p>Last synced June 13, 2026</p>
        </div>
      </footer>
    </div>
  )
}

function TotalRow({
  icon,
  label,
  value,
  pct,
  hint,
  emphasize,
}: {
  icon: React.ReactNode
  label: string
  value: string
  pct: number
  hint: string
  emphasize?: boolean
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md",
              emphasize ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{hint}</p>
          </div>
        </div>
        <p className={cn("text-lg font-semibold tabular-nums", emphasize && "text-primary")}>{value}</p>
      </div>
      <Progress value={pct} />
    </div>
  )
}
