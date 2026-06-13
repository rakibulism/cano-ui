"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Car,
  Coffee,
  CreditCard,
  Home,
  PiggyBank,
  Plus,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wallet,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Category =
  | "Housing"
  | "Food"
  | "Transport"
  | "Shopping"
  | "Utilities"
  | "Coffee"

type Txn = {
  id: string
  merchant: string
  date: string
  category: Category
  amount: number
}

const CATEGORY_META: Record<
  Category,
  { icon: React.ComponentType<{ className?: string }>; spent: number; budget: number }
> = {
  Housing: { icon: Home, spent: 1450, budget: 1600 },
  Food: { icon: Utensils, spent: 612, budget: 700 },
  Transport: { icon: Car, spent: 284, budget: 350 },
  Shopping: { icon: ShoppingBag, spent: 396, budget: 300 },
  Utilities: { icon: Zap, spent: 178, budget: 250 },
  Coffee: { icon: Coffee, spent: 94, budget: 80 },
}

const CATEGORIES = Object.keys(CATEGORY_META) as Category[]

const TRANSACTIONS: Txn[] = [
  { id: "t1", merchant: "Greenfield Apartments", date: "Jun 01", category: "Housing", amount: 1450 },
  { id: "t2", merchant: "Whole Foods Market", date: "Jun 03", category: "Food", amount: 86.4 },
  { id: "t3", merchant: "Metro Transit Pass", date: "Jun 04", category: "Transport", amount: 78 },
  { id: "t4", merchant: "Blue Bottle Coffee", date: "Jun 05", category: "Coffee", amount: 6.5 },
  { id: "t5", merchant: "Nordstrom", date: "Jun 06", category: "Shopping", amount: 142.99 },
  { id: "t6", merchant: "City Power & Light", date: "Jun 07", category: "Utilities", amount: 112 },
  { id: "t7", merchant: "Trader Joe's", date: "Jun 09", category: "Food", amount: 64.18 },
  { id: "t8", merchant: "Shell Station", date: "Jun 10", category: "Transport", amount: 52.3 },
  { id: "t9", merchant: "Amazon", date: "Jun 11", category: "Shopping", amount: 88.27 },
  { id: "t10", merchant: "Local Roasters", date: "Jun 12", category: "Coffee", amount: 5.75 },
  { id: "t11", merchant: "Internet Fiber Co.", date: "Jun 12", category: "Utilities", amount: 66 },
  { id: "t12", merchant: "Sweetgreen", date: "Jun 13", category: "Food", amount: 17.5 },
]

const TREND = [
  { month: "Jan", value: 2840 },
  { month: "Feb", value: 3120 },
  { month: "Mar", value: 2680 },
  { month: "Apr", value: 3340 },
  { month: "May", value: 2910 },
  { month: "Jun", value: 3014 },
]

const KPIS = [
  {
    label: "Available balance",
    value: "$8,420.50",
    delta: "+2.4%",
    up: true,
    icon: Wallet,
    note: "vs. last month",
  },
  {
    label: "Spent this month",
    value: "$3,014.00",
    delta: "+3.6%",
    up: false,
    icon: CreditCard,
    note: "across 6 categories",
  },
  {
    label: "Monthly budget",
    value: "$3,280.00",
    delta: "92% used",
    up: true,
    icon: PiggyBank,
    note: "$266 remaining",
  },
]

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
}

export default function ExpenseTracker() {
  const [filter, setFilter] = React.useState<Category | "All">("All")

  const visible = React.useMemo(
    () =>
      filter === "All"
        ? TRANSACTIONS
        : TRANSACTIONS.filter((t) => t.category === filter),
    [filter]
  )

  const maxTrend = Math.max(...TREND.map((t) => t.value))
  const totalBudget = CATEGORIES.reduce((s, c) => s + CATEGORY_META[c].budget, 0)
  const totalSpent = CATEGORIES.reduce((s, c) => s + CATEGORY_META[c].spent, 0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PiggyBank className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Ledgerly</p>
              <p className="text-xs text-muted-foreground">Personal finance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              June 2026
            </Badge>
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add expense
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 flex flex-col justify-between gap-1 sm:mb-8 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back, Maya
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here is how your money moved this month.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              You are <span className="font-medium text-foreground">$266</span> under budget
            </span>
          </div>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KPIS.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardDescription>{kpi.label}</CardDescription>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <kpi.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tracking-tight">{kpi.value}</div>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 font-medium",
                      kpi.up ? "text-primary" : "text-destructive"
                    )}
                  >
                    {kpi.up ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {kpi.delta}
                  </span>
                  <span className="text-muted-foreground">{kpi.note}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Spending by category</CardTitle>
              <CardDescription>
                {money(totalSpent)} of {money(totalBudget)} budgeted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {CATEGORIES.map((cat) => {
                const meta = CATEGORY_META[cat]
                const pct = Math.round((meta.spent / meta.budget) * 100)
                const over = meta.spent > meta.budget
                return (
                  <div key={cat}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                          <meta.icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-medium">{cat}</span>
                      </span>
                      <span className="text-muted-foreground">
                        {money(meta.spent)}
                        <span className="text-muted-foreground/60">
                          {" "}/ {money(meta.budget)}
                        </span>
                      </span>
                    </div>
                    <Progress value={Math.min(pct, 100)} className="h-2" />
                    <div className="mt-1 flex justify-end">
                      <span
                        className={cn(
                          "text-xs",
                          over ? "text-destructive" : "text-muted-foreground"
                        )}
                      >
                        {over ? "Over by " + money(meta.spent - meta.budget) : pct + "% used"}
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Monthly spending trend</CardTitle>
              <CardDescription>Last 6 months of total expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end justify-between gap-3 sm:gap-4">
                {TREND.map((t) => {
                  const h = Math.round((t.value / maxTrend) * 100)
                  const current = t.month === "Jun"
                  return (
                    <div
                      key={t.month}
                      className="flex flex-1 flex-col items-center gap-2"
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        ${(t.value / 1000).toFixed(1)}k
                      </span>
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className={cn(
                            "w-full rounded-t-md transition-all",
                            current ? "bg-primary" : "bg-primary/25"
                          )}
                          style={{ height: h + "%" }}
                          aria-hidden="true"
                        />
                      </div>
                      <span
                        className={cn(
                          "text-xs",
                          current ? "font-semibold text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {t.month}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Recent transactions</CardTitle>
              <CardDescription>
                {visible.length} {visible.length === 1 ? "entry" : "entries"}
                {filter !== "All" ? " in " + filter : ""}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["All", ...CATEGORIES] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    filter === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Merchant</TableHead>
                  <TableHead className="hidden sm:table-cell">Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((t) => {
                  const Icon = CATEGORY_META[t.category].icon
                  return (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="leading-tight">
                            <p className="font-medium">{t.merchant}</p>
                            <p className="text-xs text-muted-foreground sm:hidden">
                              {t.category} &middot; {t.date}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary">{t.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {t.date}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        -{money(t.amount)}
                      </TableCell>
                    </TableRow>
                  )
                })}
                {visible.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                      No transactions in this category.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>&copy; 2026 Ledgerly. All figures are sample data.</p>
          <p>Synced just now &middot; Bank-grade encryption</p>
        </div>
      </footer>
    </div>
  )
}
