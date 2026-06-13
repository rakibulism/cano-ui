"use client"

import * as React from "react"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Timer,
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  Download,
  RefreshCw,
  Search,
  ShieldCheck,
  CircleDollarSign,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

type Scope = "all" | "USD" | "EUR" | "GBP"

const SCOPES: { id: Scope; label: string }[] = [
  { id: "all", label: "All currencies" },
  { id: "USD", label: "USD" },
  { id: "EUR", label: "EUR" },
  { id: "GBP", label: "GBP" },
]

const ACCOUNTS = [
  { name: "Operating — JPMorgan", entity: "Northwind Inc.", currency: "USD", symbol: "$", balance: 18420500, change: 2.4 },
  { name: "Reserve — Citi", entity: "Northwind Inc.", currency: "USD", symbol: "$", balance: 9650000, change: -0.8 },
  { name: "Payroll — BofA", entity: "Northwind US", currency: "USD", symbol: "$", balance: 3120750, change: 1.1 },
  { name: "Operating — Deutsche Bank", entity: "Northwind GmbH", currency: "EUR", symbol: "€", balance: 7480300, change: 3.6 },
  { name: "Reserve — BNP Paribas", entity: "Northwind EU", currency: "EUR", symbol: "€", balance: 4210000, change: 0.5 },
  { name: "Operating — Barclays", entity: "Northwind UK Ltd.", currency: "GBP", symbol: "£", balance: 5340200, change: -1.3 },
  { name: "Tax Holding — HSBC", entity: "Northwind UK Ltd.", currency: "GBP", symbol: "£", balance: 2180900, change: 0.2 },
] as const

const FLOW = [
  { month: "Jan", inflow: 62, outflow: 48 },
  { month: "Feb", inflow: 71, outflow: 53 },
  { month: "Mar", inflow: 58, outflow: 61 },
  { month: "Apr", inflow: 80, outflow: 56 },
  { month: "May", inflow: 74, outflow: 49 },
  { month: "Jun", inflow: 89, outflow: 64 },
] as const

const PAYMENTS = [
  { ref: "WIR-4821", payee: "Atlas Logistics", currency: "USD", symbol: "$", amount: 1240000, due: "Jun 16", status: "Scheduled" },
  { ref: "ACH-7714", payee: "Nimbus Cloud Services", currency: "USD", symbol: "$", amount: 386500, due: "Jun 18", status: "Pending approval" },
  { ref: "SEPA-3390", payee: "Rhein Manufacturing", currency: "EUR", symbol: "€", amount: 920000, due: "Jun 20", status: "Scheduled" },
  { ref: "ACH-7720", payee: "Payroll Run — US", currency: "USD", symbol: "$", amount: 2110000, due: "Jun 25", status: "Scheduled" },
  { ref: "FPS-1188", payee: "Camden Property Group", currency: "GBP", symbol: "£", amount: 475000, due: "Jun 27", status: "Pending approval" },
  { ref: "SEPA-3402", payee: "Lumière Tax Authority", currency: "EUR", symbol: "€", amount: 640000, due: "Jun 30", status: "On hold" },
] as const

function fmt(value: number, symbol: string) {
  return symbol + value.toLocaleString("en-US")
}

function fmtCompact(value: number, symbol: string) {
  if (value >= 1_000_000) return symbol + (value / 1_000_000).toFixed(1) + "M"
  if (value >= 1_000) return symbol + (value / 1_000).toFixed(0) + "K"
  return symbol + value.toLocaleString("en-US")
}

export default function TreasuryDashboard() {
  const [scope, setScope] = React.useState<Scope>("all")
  const [query, setQuery] = React.useState("")

  const scopeSymbol = scope === "all" ? "$" : scope === "EUR" ? "€" : scope === "GBP" ? "£" : "$"

  const scopedAccounts = React.useMemo(
    () => ACCOUNTS.filter((a) => scope === "all" || a.currency === scope),
    [scope]
  )

  const visibleAccounts = React.useMemo(
    () =>
      scopedAccounts.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.entity.toLowerCase().includes(query.toLowerCase())
      ),
    [scopedAccounts, query]
  )

  const totalCash = scopedAccounts.reduce((sum, a) => sum + a.balance, 0)
  const scopedPayments = PAYMENTS.filter((p) => scope === "all" || p.currency === scope)
  const monthlyOutflow = scope === "all" ? 64_000_000 : Math.round(totalCash * 0.18)
  const monthlyInflow = scope === "all" ? 89_000_000 : Math.round(totalCash * 0.24)
  const runwayMonths = monthlyOutflow > 0 ? Math.round((totalCash / monthlyOutflow) * 10) / 10 : 0

  const kpis = [
    { label: "Total cash position", value: fmtCompact(totalCash, scopeSymbol), delta: "+4.2%", up: true, icon: Wallet },
    { label: "Operating runway", value: runwayMonths + " mo", delta: "+0.6 mo", up: true, icon: Timer },
    { label: "Inflow (30d)", value: fmtCompact(monthlyInflow, scopeSymbol), delta: "+11.0%", up: true, icon: ArrowDownLeft },
    { label: "Outflow (30d)", value: fmtCompact(monthlyOutflow, scopeSymbol), delta: "-3.4%", up: false, icon: ArrowUpRight },
  ]

  const maxFlow = Math.max(...FLOW.map((f) => Math.max(f.inflow, f.outflow)))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CircleDollarSign className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Northwind Treasury</p>
              <p className="text-xs text-muted-foreground">Cash & Liquidity</p>
            </div>
          </div>
          <div className="relative ml-auto hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search accounts or entities"
              className="w-64 pl-9"
              aria-label="Search accounts"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Sync</span>
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Treasury overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              As of close, June 13 2026. Balances consolidated across {ACCOUNTS.length} accounts.
            </p>
          </div>
          <Tabs value={scope} onValueChange={(v) => setScope(v as Scope)}>
            <TabsList>
              {SCOPES.map((s) => (
                <TabsTrigger key={s.id} value={s.id}>
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{kpi.label}</CardDescription>
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <kpi.icon className="h-4 w-4" />
                  </span>
                </div>
                <CardTitle className="text-2xl tabular-nums">{kpi.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium",
                    kpi.up ? "text-primary" : "text-destructive"
                  )}
                >
                  {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.delta}
                  <span className="text-muted-foreground">vs last month</span>
                </span>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Cash flow</CardTitle>
              <CardDescription>Inflow vs outflow, last 6 months (in millions)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-3 sm:gap-5">
                {FLOW.map((f) => (
                  <div key={f.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-full w-full items-end justify-center gap-1">
                      <div
                        className="w-1/2 rounded-t bg-primary transition-all"
                        style={{ height: `${(f.inflow / maxFlow) * 100}%` }}
                        aria-label={`Inflow ${f.month}: ${f.inflow}M`}
                      />
                      <div
                        className="w-1/2 rounded-t bg-muted-foreground/40 transition-all"
                        style={{ height: `${(f.outflow / maxFlow) * 100}%` }}
                        aria-label={`Outflow ${f.month}: ${f.outflow}M`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{f.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Inflow
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/40" /> Outflow
              </span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Liquidity health</CardTitle>
              <CardDescription>Targets for the current quarter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: "Reserve coverage", value: 78, note: "Target 80%" },
                { label: "Hedged FX exposure", value: 64, note: "Target 70%" },
                { label: "Idle cash deployed", value: 91, note: "Target 85%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    <span className="tabular-nums font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} />
                  <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
                </div>
              ))}
              <Separator />
              <div className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm text-primary">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>All covenants satisfied this period.</span>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Accounts</CardTitle>
              <CardDescription>
                {visibleAccounts.length} account{visibleAccounts.length === 1 ? "" : "s"} shown ·{" "}
                {SCOPES.find((s) => s.id === scope)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Ccy</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">24h</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleAccounts.map((a) => (
                    <TableRow key={a.name}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                          </span>
                          <div className="leading-tight">
                            <p className="font-medium">{a.name}</p>
                            <p className="text-xs text-muted-foreground">{a.entity}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{a.currency}</Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        {fmt(a.balance, a.symbol)}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right tabular-nums",
                          a.change >= 0 ? "text-primary" : "text-destructive"
                        )}
                      >
                        {a.change >= 0 ? "+" : ""}
                        {a.change}%
                      </TableCell>
                    </TableRow>
                  ))}
                  {visibleAccounts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                        No accounts match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Upcoming payments</CardTitle>
              <CardDescription>Next 30 days · {scopedPayments.length} scheduled</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payee</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scopedPayments.map((p) => (
                    <TableRow key={p.ref}>
                      <TableCell>
                        <div className="leading-tight">
                          <p className="font-medium">{p.payee}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{p.ref}</span>
                            <Badge
                              variant={
                                p.status === "Scheduled"
                                  ? "default"
                                  : p.status === "On hold"
                                  ? "destructive"
                                  : "outline"
                              }
                              className="text-[10px]"
                            >
                              {p.status}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        {fmt(p.amount, p.symbol)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.due}</TableCell>
                    </TableRow>
                  ))}
                  {scopedPayments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="py-10 text-center text-sm text-muted-foreground">
                        No payments due for this currency.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View payment calendar
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2026 Northwind Treasury Operations</span>
          <span>Balances delayed up to 15 minutes · Internal use only</span>
        </div>
      </footer>
    </div>
  )
}
