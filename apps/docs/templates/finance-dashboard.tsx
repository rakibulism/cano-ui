"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Bell,
  CreditCard,
  Home,
  PiggyBank,
  Receipt,
  Search,
  Settings,
  Wallet,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const RANGES = ["This week", "This month", "This year"] as const
type Range = (typeof RANGES)[number]

type Kpi = { label: string; value: string; delta: number; icon: React.ElementType }

const DATA: Record<Range, { kpis: Kpi[]; bars: number[] }> = {
  "This week": {
    kpis: [
      { label: "Total balance", value: "$24,180", delta: 2.4, icon: Wallet },
      { label: "Income", value: "$3,920", delta: 6.1, icon: Banknote },
      { label: "Expenses", value: "$2,140", delta: -3.2, icon: Receipt },
      { label: "Savings rate", value: "45.4%", delta: 1.8, icon: PiggyBank },
    ],
    bars: [62, 48, 70, 55, 80, 38, 66],
  },
  "This month": {
    kpis: [
      { label: "Total balance", value: "$24,180", delta: 8.7, icon: Wallet },
      { label: "Income", value: "$16,420", delta: 9.4, icon: Banknote },
      { label: "Expenses", value: "$9,860", delta: 4.5, icon: Receipt },
      { label: "Savings rate", value: "39.9%", delta: -2.1, icon: PiggyBank },
    ],
    bars: [40, 55, 48, 70, 62, 80, 75, 58, 84, 72, 90, 66],
  },
  "This year": {
    kpis: [
      { label: "Total balance", value: "$24,180", delta: 21.3, icon: Wallet },
      { label: "Income", value: "$198,540", delta: 14.2, icon: Banknote },
      { label: "Expenses", value: "$121,300", delta: 7.8, icon: Receipt },
      { label: "Savings rate", value: "38.9%", delta: 3.6, icon: PiggyBank },
    ],
    bars: [30, 38, 44, 52, 49, 60, 66, 63, 72, 78, 74, 90],
  },
}

const TRANSACTIONS: { name: string; date: string; category: string; amount: string; positive: boolean }[] = [
  { name: "Acme Payroll", date: "Jun 12", category: "Income", amount: "+$5,200.00", positive: true },
  { name: "Whole Foods Market", date: "Jun 11", category: "Groceries", amount: "-$128.40", positive: false },
  { name: "Figma Annual", date: "Jun 10", category: "Software", amount: "-$144.00", positive: false },
  { name: "Stripe Payout", date: "Jun 09", category: "Income", amount: "+$1,840.00", positive: true },
  { name: "Delta Airlines", date: "Jun 08", category: "Travel", amount: "-$612.30", positive: false },
  { name: "City Power & Gas", date: "Jun 07", category: "Utilities", amount: "-$96.12", positive: false },
]

const BUDGETS: { label: string; spent: number; cap: number }[] = [
  { label: "Housing", spent: 1850, cap: 2000 },
  { label: "Groceries", spent: 540, cap: 700 },
  { label: "Transport", spent: 320, cap: 400 },
  { label: "Dining", spent: 410, cap: 350 },
  { label: "Subscriptions", spent: 88, cap: 150 },
]

const NAV = [
  ["Overview", Home, true],
  ["Accounts", Wallet, false],
  ["Transactions", Receipt, false],
  ["Cards", CreditCard, false],
  ["Settings", Settings, false],
] as const

const DAYS = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F"]

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US")
}

export default function FinanceDashboard() {
  const [range, setRange] = React.useState<Range>("This month")
  const { kpis, bars } = DATA[range]
  const max = Math.max(...bars)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-56 shrink-0 flex-col border-r p-3 lg:flex">
        <div className="flex items-center gap-2 px-2 py-1.5 font-semibold tracking-tight">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Wallet className="size-3.5" />
          </span>
          Ledger
        </div>
        <nav className="mt-4 flex flex-col gap-0.5">
          {NAV.map(([label, Icon, active]) => (
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
        <div className="mt-auto rounded-lg border bg-muted/30 p-3">
          <div className="text-xs font-medium">Upgrade to Pro</div>
          <p className="mt-1 text-xs text-muted-foreground">Unlimited accounts and reports.</p>
          <Button size="sm" className="mt-3 w-full">Upgrade</Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b px-4">
          <div className="relative max-w-xs flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search transactions…" className="pl-9" />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Notifications"><Bell /></Button>
            <Avatar className="size-8"><AvatarFallback className="text-xs">RI</AvatarFallback></Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Finance overview</h1>
              <p className="text-sm text-muted-foreground">Track balance, cash flow, and budgets.</p>
            </div>
            <div className="isolate inline-flex">
              {RANGES.map((r, i) => (
                <Button
                  key={r}
                  variant={range === r ? "default" : "outline"}
                  size="sm"
                  onClick={() => setRange(r)}
                  className={cn(
                    "rounded-none",
                    i === 0 && "rounded-l-md",
                    i === RANGES.length - 1 && "rounded-r-md",
                    i > 0 && "-ml-px"
                  )}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map(({ label, value, delta, icon: Icon }) => (
              <Card key={label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
                  <div
                    className={cn(
                      "mt-1 flex items-center gap-1 text-xs font-medium",
                      delta >= 0 ? "text-primary" : "text-destructive"
                    )}
                  >
                    {delta >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                    {Math.abs(delta)}% vs prev.
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Cash flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-52 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary"
                          style={{ height: `${(h / max) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{DAYS[i]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Budgets</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {BUDGETS.map(({ label, spent, cap }) => {
                  const pct = Math.min(100, Math.round((spent / cap) * 100))
                  const over = spent > cap
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{label}</span>
                        <span className={cn("tabular-nums", over ? "text-destructive" : "text-muted-foreground")}>
                          {fmt(spent)} / {fmt(cap)}
                        </span>
                      </div>
                      <Progress value={pct} className="mt-2 h-2" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent transactions</CardTitle>
              <Button variant="outline" size="sm">View all</Button>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Merchant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="pr-6 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TRANSACTIONS.map((t) => (
                    <TableRow key={t.name}>
                      <TableCell className="pl-6 font-medium">{t.name}</TableCell>
                      <TableCell className="text-muted-foreground tabular-nums">{t.date}</TableCell>
                      <TableCell>
                        <Badge variant={t.positive ? "default" : "secondary"}>{t.category}</Badge>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "pr-6 text-right font-medium tabular-nums",
                          t.positive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {t.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
