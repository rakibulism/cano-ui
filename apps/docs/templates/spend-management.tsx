"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Download,
  Plane,
  ServerCog,
  ShoppingBag,
  Utensils,
  Wallet,
  Briefcase,
  PiggyBank,
  Plus,
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

type Category = "Travel" | "Software" | "Meals" | "Office"

const CATEGORY_META: Record<
  Category,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  Travel: { icon: Plane, label: "Travel" },
  Software: { icon: ServerCog, label: "Software" },
  Meals: { icon: Utensils, label: "Meals" },
  Office: { icon: ShoppingBag, label: "Office" },
}

type Txn = {
  id: string
  merchant: string
  cardholder: string
  category: Category
  date: string
  amount: number
}

const TRANSACTIONS: Txn[] = [
  { id: "t1", merchant: "Delta Air Lines", cardholder: "Priya Nair", category: "Travel", date: "Jun 12", amount: 842.5 },
  { id: "t2", merchant: "Amazon Web Services", cardholder: "Marco Diaz", category: "Software", date: "Jun 12", amount: 1290.0 },
  { id: "t3", merchant: "Blue Bottle Coffee", cardholder: "Lena Vogt", category: "Meals", date: "Jun 11", amount: 38.2 },
  { id: "t4", merchant: "Figma", cardholder: "Marco Diaz", category: "Software", date: "Jun 11", amount: 540.0 },
  { id: "t5", merchant: "WeWork", cardholder: "Tom Becker", category: "Office", date: "Jun 10", amount: 1100.0 },
  { id: "t6", merchant: "Marriott Hotels", cardholder: "Priya Nair", category: "Travel", date: "Jun 10", amount: 612.0 },
  { id: "t7", merchant: "Sweetgreen", cardholder: "Lena Vogt", category: "Meals", date: "Jun 9", amount: 64.75 },
  { id: "t8", merchant: "Notion Labs", cardholder: "Sara Okafor", category: "Software", date: "Jun 9", amount: 96.0 },
  { id: "t9", merchant: "Staples", cardholder: "Tom Becker", category: "Office", date: "Jun 8", amount: 214.3 },
  { id: "t10", merchant: "Uber", cardholder: "Priya Nair", category: "Travel", date: "Jun 8", amount: 47.9 },
  { id: "t11", merchant: "Chipotle", cardholder: "Sara Okafor", category: "Meals", date: "Jun 7", amount: 29.4 },
  { id: "t12", merchant: "Datadog", cardholder: "Marco Diaz", category: "Software", date: "Jun 7", amount: 780.0 },
]

const CARDS = [
  { holder: "Priya Nair", team: "Sales", last4: "4821", spent: 1502, limit: 3000 },
  { holder: "Marco Diaz", team: "Engineering", last4: "7710", spent: 2610, limit: 4000 },
  { holder: "Lena Vogt", team: "Marketing", last4: "3398", spent: 920, limit: 1500 },
  { holder: "Tom Becker", team: "Operations", last4: "6205", spent: 1314, limit: 2000 },
  { holder: "Sara Okafor", team: "Product", last4: "9054", spent: 1180, limit: 2500 },
]

const TEAM_BUDGETS = [
  { team: "Engineering", spent: 24800, budget: 32000 },
  { team: "Sales", spent: 18200, budget: 20000 },
  { team: "Marketing", spent: 9400, budget: 15000 },
  { team: "Operations", spent: 6100, budget: 12000 },
  { team: "Product", spent: 7300, budget: 10000 },
]

const FILTERS = ["All", "Travel", "Software", "Meals", "Office"] as const
type Filter = (typeof FILTERS)[number]

function money(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })
}

function CategoryBadge({ category }: { category: Category }) {
  const { icon: Icon, label } = CATEGORY_META[category]
  return (
    <Badge variant="secondary" className="gap-1 font-medium">
      <Icon className="h-3 w-3" aria-hidden="true" />
      {label}
    </Badge>
  )
}

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  delta?: number
  hint?: string
}) {
  const up = (delta ?? 0) >= 0
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          {label}
        </CardDescription>
        <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        {delta !== undefined ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs font-medium",
              up ? "text-primary" : "text-destructive"
            )}
          >
            {up ? (
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {up ? "+" : ""}
            {delta}% vs last month
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </CardContent>
    </Card>
  )
}

export default function SpendManagement() {
  const [filter, setFilter] = React.useState<Filter>("All")

  const visibleTxns =
    filter === "All"
      ? TRANSACTIONS
      : TRANSACTIONS.filter((t) => t.category === filter)

  const totalSpend = 65800
  const totalBudget = 89000
  const remaining = totalBudget - totalSpend
  const usedPct = Math.round((totalSpend / totalBudget) * 100)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Wallet className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Ledgerly</span>
          </div>
          <Badge variant="outline" className="hidden sm:inline-flex">
            June 2026
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Download className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">New card</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Spend overview</h1>
          <p className="text-sm text-muted-foreground">
            Company-wide spend, cards and team budgets for the current cycle.
          </p>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon={CreditCard}
            label="Total spend"
            value={money(totalSpend)}
            delta={8.3}
          />
          <KpiCard
            icon={PiggyBank}
            label="Budget remaining"
            value={money(remaining)}
            delta={-4.1}
          />
          <KpiCard
            icon={Briefcase}
            label="Active cards"
            value="42"
            hint="Across 5 teams"
          />
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                <Wallet className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Budget used
              </CardDescription>
              <CardTitle className="text-3xl tabular-nums">{usedPct}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={usedPct} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground tabular-nums">
                {money(totalSpend)} of {money(totalBudget)}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Company cards</CardTitle>
              <CardDescription>Monthly limit usage per cardholder.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {CARDS.map((card) => {
                const pct = Math.round((card.spent / card.limit) * 100)
                const over = pct >= 90
                return (
                  <div key={card.last4} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-11 items-center justify-center rounded-md border bg-muted/50 text-[10px] font-semibold tabular-nums text-muted-foreground">
                          {card.last4}
                        </span>
                        <div className="leading-tight">
                          <div className="font-medium">{card.holder}</div>
                          <div className="text-xs text-muted-foreground">
                            {card.team}
                          </div>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium tabular-nums",
                          over ? "text-destructive" : "text-muted-foreground"
                        )}
                      >
                        {pct}%
                      </span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                    <div className="flex justify-between text-xs text-muted-foreground tabular-nums">
                      <span>{money(card.spent)}</span>
                      <span>limit {money(card.limit)}</span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Recent transactions</CardTitle>
              <CardDescription>
                Filter the feed by spend category.
              </CardDescription>
              <div className="mt-3 inline-flex flex-wrap gap-1 rounded-lg border bg-muted/30 p-1">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                      filter === f
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f}
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
                    <TableHead className="hidden md:table-cell">Cardholder</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleTxns.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <div className="font-medium leading-tight">{t.merchant}</div>
                        <div className="text-xs text-muted-foreground">{t.date}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <CategoryBadge category={t.category} />
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                        {t.cardholder}
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {money(t.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {visibleTxns.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="py-8 text-center text-sm text-muted-foreground"
                      >
                        No transactions in this category.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Budgets by team</CardTitle>
              <CardDescription>
                How each team is tracking against its monthly allocation.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {TEAM_BUDGETS.map((b) => {
                const pct = Math.round((b.spent / b.budget) * 100)
                const over = pct >= 90
                return (
                  <div key={b.team} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{b.team}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {money(b.spent)} / {money(b.budget)}
                      </span>
                    </div>
                    <Progress value={pct} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground tabular-nums">
                        {pct}% used
                      </span>
                      <span
                        className={cn(
                          "font-medium tabular-nums",
                          over ? "text-destructive" : "text-primary"
                        )}
                      >
                        {money(b.budget - b.spent)} left
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>Ledgerly — corporate spend, under control.</span>
          <span className="tabular-nums">Cycle resets Jul 1, 2026</span>
        </div>
      </footer>
    </div>
  )
}
