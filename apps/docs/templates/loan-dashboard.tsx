"use client"

import * as React from "react"
import {
  Landmark,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  Download,
  Plus,
  Bell,
  CircleDollarSign,
  Home,
  Car,
  Building2,
  GraduationCap,
  MoreHorizontal,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type LoanStatus = "Active" | "Late" | "Paid" | "Defaulted"

type Loan = {
  id: string
  borrower: string
  initials: string
  type: string
  principal: number
  rate: number
  term: string
  status: LoanStatus
}

const KPIS = [
  {
    label: "Outstanding balance",
    value: "$12.84M",
    delta: "+4.2%",
    up: true,
    icon: Wallet,
  },
  {
    label: "Total disbursed",
    value: "$28.10M",
    delta: "+9.6%",
    up: true,
    icon: CircleDollarSign,
  },
  {
    label: "Active borrowers",
    value: "1,284",
    delta: "+3.1%",
    up: true,
    icon: Landmark,
  },
  {
    label: "Default rate",
    value: "2.4%",
    delta: "-0.5%",
    up: false,
    icon: AlertTriangle,
  },
]

const LOANS: Loan[] = [
  { id: "LN-4821", borrower: "Amara Okafor", initials: "AO", type: "Mortgage", principal: 420000, rate: 5.8, term: "30 yr", status: "Active" },
  { id: "LN-4822", borrower: "Diego Marquez", initials: "DM", type: "Auto", principal: 38500, rate: 7.2, term: "5 yr", status: "Late" },
  { id: "LN-4823", borrower: "Priya Nair", initials: "PN", type: "Business", principal: 165000, rate: 9.1, term: "7 yr", status: "Active" },
  { id: "LN-4824", borrower: "Caleb Foster", initials: "CF", type: "Student", principal: 54000, rate: 4.5, term: "10 yr", status: "Paid" },
  { id: "LN-4825", borrower: "Mei Tanaka", initials: "MT", type: "Mortgage", principal: 510000, rate: 6.1, term: "30 yr", status: "Active" },
  { id: "LN-4826", borrower: "Jordan Blake", initials: "JB", type: "Auto", principal: 27200, rate: 8.4, term: "4 yr", status: "Defaulted" },
  { id: "LN-4827", borrower: "Sofia Rossi", initials: "SR", type: "Business", principal: 220000, rate: 8.7, term: "6 yr", status: "Late" },
  { id: "LN-4828", borrower: "Liam Walsh", initials: "LW", type: "Student", principal: 31000, rate: 4.9, term: "10 yr", status: "Active" },
  { id: "LN-4829", borrower: "Hana Kim", initials: "HK", type: "Mortgage", principal: 385000, rate: 5.6, term: "25 yr", status: "Paid" },
  { id: "LN-4830", borrower: "Omar Haddad", initials: "OH", type: "Business", principal: 98000, rate: 9.8, term: "5 yr", status: "Defaulted" },
]

const REPAYMENTS = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 71 },
  { month: "Mar", value: 58 },
  { month: "Apr", value: 84 },
  { month: "May", value: 79 },
  { month: "Jun", value: 92 },
  { month: "Jul", value: 88 },
  { month: "Aug", value: 100 },
]

const LOAN_TYPES = [
  { label: "Mortgage", share: 46, amount: "$5.9M", icon: Home },
  { label: "Business", share: 27, amount: "$3.5M", icon: Building2 },
  { label: "Auto", share: 16, amount: "$2.1M", icon: Car },
  { label: "Student", share: 11, amount: "$1.4M", icon: GraduationCap },
]

const STATUS_STYLES: Record<LoanStatus, string> = {
  Active: "bg-primary/10 text-primary border-transparent",
  Late: "bg-accent text-foreground border-transparent",
  Paid: "bg-muted text-muted-foreground border-transparent",
  Defaulted: "bg-destructive/10 text-destructive border-transparent",
}

const FILTERS = ["All", "Active", "Late", "Paid", "Defaulted"] as const

function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-US")
}

export default function LoanDashboard() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All")
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    return LOANS.filter((loan) => {
      const matchesStatus = filter === "All" || loan.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        q === "" ||
        loan.borrower.toLowerCase().includes(q) ||
        loan.id.toLowerCase().includes(q) ||
        loan.type.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [filter, query])

  const countFor = (f: (typeof FILTERS)[number]) =>
    f === "All" ? LOANS.length : LOANS.filter((l) => l.status === f).length

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Landmark className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Meridian Capital</p>
              <p className="text-xs text-muted-foreground">Lending Console</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm" className="text-foreground">
              Portfolio
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Borrowers
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Reports
            </Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Loan Portfolio
            </h1>
            <p className="text-sm text-muted-foreground">
              Overview of all active and historical lending activity.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New loan
            </Button>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription className="text-xs font-medium">
                  {kpi.label}
                </CardDescription>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tabular-nums">
                  {kpi.value}
                </div>
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1 text-xs font-medium",
                    kpi.up ? "text-primary" : "text-destructive"
                  )}
                >
                  {kpi.up ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {kpi.delta}
                  <span className="text-muted-foreground">vs last quarter</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Repayments over time</CardTitle>
              <CardDescription>
                Monthly collections, indexed to peak ($1.0M)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-52 items-end gap-2 sm:gap-3">
                {REPAYMENTS.map((bar) => (
                  <div
                    key={bar.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                        style={{ height: bar.value + "%" }}
                        aria-label={bar.month + " repayments " + bar.value + "%"}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {bar.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Loan type breakdown</CardTitle>
              <CardDescription>Share of outstanding balance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {LOAN_TYPES.map((t) => (
                <div key={t.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <t.icon className="h-4 w-4 text-muted-foreground" />
                      {t.label}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {t.amount}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: t.share + "%" }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card className="mt-6">
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <CardTitle className="text-base">All loans</CardTitle>
                <CardDescription>
                  {filtered.length} of {LOANS.length} loans shown
                </CardDescription>
              </div>
              <div className="relative w-full lg:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search borrower, ID, or type..."
                  className="pl-9"
                  aria-label="Search loans"
                />
              </div>
            </div>
            <Tabs
              value={filter}
              onValueChange={(v) =>
                setFilter(v as (typeof FILTERS)[number])
              }
            >
              <TabsList className="flex w-full flex-wrap justify-start">
                {FILTERS.map((f) => (
                  <TabsTrigger key={f} value={f} className="gap-1.5">
                    {f}
                    <span className="text-xs text-muted-foreground">
                      {countFor(f)}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Principal</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No loans match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {loan.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{loan.borrower}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {loan.id}
                      </TableCell>
                      <TableCell>{loan.type}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(loan.principal)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {loan.rate.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {loan.term}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn("font-medium", STATUS_STYLES[loan.status])}
                        >
                          {loan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={"Actions for " + loan.id}
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2025 Meridian Capital. All rights reserved.</p>
          <p>Data refreshed every 15 minutes.</p>
        </div>
      </footer>
    </div>
  )
}
