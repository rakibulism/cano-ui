"use client"

import * as React from "react"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Building2,
  PiggyBank,
  FileSpreadsheet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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

type Account = "Revenue" | "Expenses" | "Assets"

type Entry = {
  id: string
  date: string
  description: string
  category: string
  account: Account
  debit: number
  credit: number
}

const ENTRIES: Entry[] = [
  { id: "TXN-2041", date: "Jun 12", description: "Client retainer — Northwind Co.", category: "Consulting", account: "Revenue", debit: 0, credit: 9200 },
  { id: "TXN-2040", date: "Jun 11", description: "AWS infrastructure", category: "Software", account: "Expenses", debit: 1840, credit: 0 },
  { id: "TXN-2039", date: "Jun 11", description: "Office equipment — standing desks", category: "Equipment", account: "Assets", debit: 3120, credit: 0 },
  { id: "TXN-2038", date: "Jun 10", description: "Product license — Acme LLC", category: "Licensing", account: "Revenue", debit: 0, credit: 5400 },
  { id: "TXN-2037", date: "Jun 09", description: "Payroll — engineering", category: "Salaries", account: "Expenses", debit: 14250, credit: 0 },
  { id: "TXN-2036", date: "Jun 08", description: "Bank transfer to reserve", category: "Cash", account: "Assets", debit: 8000, credit: 0 },
  { id: "TXN-2035", date: "Jun 07", description: "Workshop ticket sales", category: "Events", account: "Revenue", debit: 0, credit: 2150 },
  { id: "TXN-2034", date: "Jun 06", description: "Marketing — paid social", category: "Advertising", account: "Expenses", debit: 2680, credit: 0 },
  { id: "TXN-2033", date: "Jun 05", description: "Inventory restock", category: "Inventory", account: "Assets", debit: 4570, credit: 0 },
  { id: "TXN-2032", date: "Jun 04", description: "Subscription revenue — June", category: "Recurring", account: "Revenue", debit: 0, credit: 18900 },
]

const FILTERS: { label: string; value: "All" | Account }[] = [
  { label: "All", value: "All" },
  { label: "Revenue", value: "Revenue" },
  { label: "Expenses", value: "Expenses" },
  { label: "Assets", value: "Assets" },
]

const CASH_FLOW = [
  { month: "Jan", inflow: 62, outflow: 41 },
  { month: "Feb", inflow: 58, outflow: 47 },
  { month: "Mar", inflow: 71, outflow: 44 },
  { month: "Apr", inflow: 66, outflow: 52 },
  { month: "May", inflow: 80, outflow: 49 },
  { month: "Jun", inflow: 88, outflow: 55 },
]

const accountTone: Record<Account, string> = {
  Revenue: "bg-primary/10 text-primary",
  Expenses: "bg-muted text-foreground",
  Assets: "bg-secondary text-foreground",
}

function money(n: number) {
  return "$" + n.toLocaleString("en-US")
}

export default function AccountingLedgerPage() {
  const [filter, setFilter] = React.useState<"All" | Account>("All")
  const [query, setQuery] = React.useState("")

  const rows = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return ENTRIES.filter((e) => {
      const matchAccount = filter === "All" || e.account === filter
      const matchQuery =
        q === "" ||
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
      return matchAccount && matchQuery
    })
  }, [filter, query])

  const totalDebit = rows.reduce((s, e) => s + e.debit, 0)
  const totalCredit = rows.reduce((s, e) => s + e.credit, 0)
  const maxFlow = Math.max(...CASH_FLOW.map((c) => Math.max(c.inflow, c.outflow)))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Ledgerly</p>
              <p className="text-xs text-muted-foreground">FY 2026 · Books</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 text-sm md:flex">
            <Button variant="ghost" size="sm">Dashboard</Button>
            <Button variant="secondary" size="sm">Ledger</Button>
            <Button variant="ghost" size="sm">Reports</Button>
            <Button variant="ghost" size="sm">Accounts</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New entry
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>RB</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">General Ledger</h1>
            <p className="text-sm text-muted-foreground">
              Reconciled through June 12, 2026 · Last sync 4 min ago
            </p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Books balanced
          </Badge>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Cash balance"
            value="$148,920"
            delta="+6.4%"
            up
            icon={<Wallet className="h-4 w-4" />}
          />
          <KpiCard
            label="Net profit (MTD)"
            value="$41,260"
            delta="+12.1%"
            up
            icon={<PiggyBank className="h-4 w-4" />}
          />
          <KpiCard
            label="Revenue (MTD)"
            value="$98,540"
            delta="+8.7%"
            up
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <KpiCard
            label="Expenses (MTD)"
            value="$57,280"
            delta="-2.3%"
            up={false}
            icon={<Receipt className="h-4 w-4" />}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Cash flow</CardTitle>
              <CardDescription>Inflow vs. outflow, last 6 months (in thousands)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-52 items-end gap-3 sm:gap-5">
                {CASH_FLOW.map((c) => (
                  <div key={c.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end justify-center gap-1">
                      <div
                        className="w-1/2 rounded-t bg-primary"
                        style={{ height: (c.inflow / maxFlow) * 100 + "%" }}
                        aria-label={c.month + " inflow"}
                      />
                      <div
                        className="w-1/2 rounded-t bg-muted"
                        style={{ height: (c.outflow / maxFlow) * 100 + "%" }}
                        aria-label={c.month + " outflow"}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{c.month}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Inflow
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-muted" /> Outflow
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account mix</CardTitle>
              <CardDescription>Filtered period totals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <MixRow icon={<TrendingUp className="h-4 w-4 text-primary" />} label="Total credits" value={money(totalCredit)} />
              <Separator />
              <MixRow icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />} label="Total debits" value={money(totalDebit)} />
              <Separator />
              <MixRow
                icon={<Building2 className="h-4 w-4 text-foreground" />}
                label="Net movement"
                value={money(totalCredit - totalDebit)}
                strong
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  {rows.length} {rows.length === 1 ? "entry" : "entries"} shown
                </CardDescription>
              </div>
              <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search description, category, ID..."
                  className="pl-8"
                  aria-label="Search transactions"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm transition-colors",
                    filter === f.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                  aria-pressed={filter === f.value}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="pr-6 text-right">Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="pl-6 align-top">
                      <div className="font-medium">{e.date}</div>
                      <div className="text-xs text-muted-foreground">{e.id}</div>
                    </TableCell>
                    <TableCell className="align-top">
                      <div className="font-medium">{e.description}</div>
                      <Badge variant="outline" className="mt-1 font-normal">
                        {e.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="align-top">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                          accountTone[e.account]
                        )}
                      >
                        {e.account}
                      </span>
                    </TableCell>
                    <TableCell className="text-right align-top tabular-nums">
                      {e.debit > 0 ? (
                        <span className="text-foreground">{money(e.debit)}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="pr-6 text-right align-top tabular-nums">
                      {e.credit > 0 ? (
                        <span className="font-medium text-primary">{money(e.credit)}</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                      No transactions match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Separator />
            <div className="flex flex-wrap items-center justify-end gap-8 px-6 py-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total debit</span>
                <span className="font-semibold tabular-nums">{money(totalDebit)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total credit</span>
                <span className="font-semibold tabular-nums text-primary">{money(totalCredit)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Ledgerly Bookkeeping. All figures in USD.</p>
          <p>Period: Jun 1 – Jun 12, 2026 · Cash basis</p>
        </div>
      </footer>
    </div>
  )
}

function KpiCard({
  label,
  value,
  delta,
  up,
  icon,
}: {
  label: string
  value: string
  delta: string
  up: boolean
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {icon}
          </span>
        </div>
        <div className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-xs font-medium",
            up ? "text-primary" : "text-destructive"
          )}
        >
          {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {delta}
          <span className="font-normal text-muted-foreground">vs last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

function MixRow({
  icon,
  label,
  value,
  strong,
}: {
  icon: React.ReactNode
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className={cn("tabular-nums", strong ? "text-base font-semibold" : "font-medium")}>
        {value}
      </span>
    </div>
  )
}
