"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  CircleDollarSign,
  Clock,
  Download,
  FileText,
  LayoutDashboard,
  Plus,
  Receipt,
  Search,
  Send,
  Settings,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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

const nav = [
  ["Dashboard", LayoutDashboard, true],
  ["Invoices", FileText, false],
  ["Payments", Wallet, false],
  ["Clients", Users, false],
  ["Settings", Settings, false],
] as const

const summary = [
  {
    label: "Outstanding",
    value: "$48,920",
    sub: "23 open invoices",
    delta: 4.2,
    up: true,
    icon: CircleDollarSign,
  },
  {
    label: "Paid this month",
    value: "$112,640",
    sub: "61 invoices settled",
    delta: 12.8,
    up: true,
    icon: Banknote,
  },
  {
    label: "Overdue",
    value: "$14,380",
    sub: "7 invoices past due",
    delta: 2.1,
    up: false,
    icon: TriangleAlert,
  },
] as const

const STATUSES = ["All", "Paid", "Pending", "Overdue", "Draft"] as const
type Status = (typeof STATUSES)[number]
type InvoiceStatus = Exclude<Status, "All">

type Invoice = {
  id: string
  client: string
  initials: string
  issued: string
  due: string
  amount: number
  status: InvoiceStatus
}

const invoices: Invoice[] = [
  { id: "INV-2041", client: "Northwind Traders", initials: "NT", issued: "May 28", due: "Jun 11", amount: 4800, status: "Overdue" },
  { id: "INV-2042", client: "Acme Corporation", initials: "AC", issued: "Jun 01", due: "Jun 15", amount: 12500, status: "Paid" },
  { id: "INV-2043", client: "Globex Industries", initials: "GI", issued: "Jun 02", due: "Jun 16", amount: 9600, status: "Pending" },
  { id: "INV-2044", client: "Initech LLC", initials: "IL", issued: "Jun 04", due: "Jun 18", amount: 2280, status: "Draft" },
  { id: "INV-2045", client: "Umbrella Health", initials: "UH", issued: "Jun 05", due: "Jun 19", amount: 18200, status: "Paid" },
  { id: "INV-2046", client: "Hooli Cloud", initials: "HC", issued: "Jun 06", due: "Jun 20", amount: 7400, status: "Pending" },
  { id: "INV-2047", client: "Stark Solutions", initials: "SS", issued: "May 24", due: "Jun 07", amount: 5320, status: "Overdue" },
  { id: "INV-2048", client: "Wayne Enterprises", initials: "WE", issued: "Jun 08", due: "Jun 22", amount: 24000, status: "Paid" },
  { id: "INV-2049", client: "Soylent Foods", initials: "SF", issued: "Jun 09", due: "Jun 23", amount: 1960, status: "Draft" },
]

const statusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-primary text-primary-foreground",
  Pending: "bg-primary/10 text-primary",
  Overdue: "bg-destructive/10 text-destructive",
  Draft: "bg-muted text-muted-foreground",
}

const payments = [
  { client: "Wayne Enterprises", initials: "WE", method: "Bank transfer", when: "2h ago", amount: 24000 },
  { client: "Umbrella Health", initials: "UH", method: "Card · Visa", when: "Yesterday", amount: 18200 },
  { client: "Acme Corporation", initials: "AC", method: "ACH", when: "2 days ago", amount: 12500 },
  { client: "Globex Industries", initials: "GI", method: "Card · Amex", when: "4 days ago", amount: 6400 },
]

const fmt = (n: number) => "$" + n.toLocaleString()

export default function InvoicingApp() {
  const [status, setStatus] = React.useState<Status>("All")
  const [query, setQuery] = React.useState("")

  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return invoices.filter((inv) => {
      const matchStatus = status === "All" || inv.status === status
      const matchQuery =
        q === "" ||
        inv.client.toLowerCase().includes(q) ||
        inv.id.toLowerCase().includes(q)
      return matchStatus && matchQuery
    })
  }, [status, query])

  const visibleTotal = visible.reduce((sum, inv) => sum + inv.amount, 0)
  const collectionRate = 78

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r p-3 lg:flex">
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold tracking-tight">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Receipt className="size-3.5" />
          </span>
          Ledgerly
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {nav.map(([label, Icon, active]) => (
            <button
              key={label}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <Card className="mt-4 bg-muted/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Collection rate</span>
              <span className="tabular-nums">{collectionRate}%</span>
            </div>
            <Progress value={collectionRate} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">
              On-time payments this quarter.
            </p>
          </CardContent>
        </Card>
        <div className="mt-auto flex items-center gap-2 rounded-md px-2 py-2">
          <Avatar className="size-7"><AvatarFallback className="text-xs">MP</AvatarFallback></Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">Mia Park</span>
            <span className="truncate text-xs text-muted-foreground">Finance ops</span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search invoices, clients…"
              className="pl-9"
            />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="size-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="size-4" />
              <span className="hidden sm:inline">Create invoice</span>
              <span className="sm:hidden">New</span>
            </Button>
            <Avatar className="size-8"><AvatarFallback className="text-xs">MP</AvatarFallback></Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Billing overview</h1>
              <p className="text-sm text-muted-foreground">Track invoices, payments, and what is owed.</p>
            </div>
            <Badge variant="outline" className="gap-1.5">
              <Clock className="size-3.5 text-destructive" />
              7 invoices need attention
            </Badge>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summary.map((s) => (
              <Card key={s.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <s.icon className="size-4 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{s.value}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.sub}</span>
                    <span
                      className={cn(
                        "flex items-center gap-0.5 text-xs font-medium",
                        s.up ? "text-primary" : "text-destructive"
                      )}
                    >
                      {s.up ? (
                        <ArrowUpRight className="size-3.5" />
                      ) : (
                        <ArrowDownRight className="size-3.5" />
                      )}
                      {s.delta}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">Invoices</CardTitle>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {visible.length} shown · {fmt(visibleTotal)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <Button
                      key={s}
                      variant={status === s ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatus(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="pl-6">Invoice</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due</TableHead>
                      <TableHead className="pr-6 text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="pl-6 font-medium tabular-nums">{inv.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <Avatar className="size-6"><AvatarFallback className="text-[10px]">{inv.initials}</AvatarFallback></Avatar>
                            <span className="truncate">{inv.client}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={cn("border-transparent font-medium", statusStyles[inv.status])}>
                            {inv.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground tabular-nums">{inv.due}</TableCell>
                        <TableCell className="pr-6 text-right font-medium tabular-nums">{fmt(inv.amount)}</TableCell>
                      </TableRow>
                    ))}
                    {visible.length === 0 ? (
                      <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                          No invoices match your filters.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent payments</CardTitle>
                  <Send className="size-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 text-sm">
                {payments.map((p, i) => (
                  <React.Fragment key={p.client + i}>
                    {i > 0 ? <Separator /> : null}
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8"><AvatarFallback className="text-xs">{p.initials}</AvatarFallback></Avatar>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate font-medium">{p.client}</span>
                        <span className="truncate text-xs text-muted-foreground">{p.method} · {p.when}</span>
                      </div>
                      <span className="font-medium text-primary tabular-nums">+{fmt(p.amount)}</span>
                    </div>
                  </React.Fragment>
                ))}
                <Button variant="ghost" size="sm" className="mt-1 w-full justify-center text-muted-foreground">
                  View all payments
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
