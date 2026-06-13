"use client"

import * as React from "react"
import {
  Wallet,
  Home,
  Utensils,
  Car,
  PartyPopper,
  PiggyBank,
  Plus,
  TrendingDown,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Settings,
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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

type CategoryKey = "Housing" | "Food" | "Transport" | "Fun" | "Savings"

const CATEGORIES: {
  key: CategoryKey
  icon: React.ComponentType<{ className?: string }>
  budget: number
  spent: number
}[] = [
  { key: "Housing", icon: Home, budget: 1800, spent: 1800 },
  { key: "Food", icon: Utensils, budget: 650, spent: 512 },
  { key: "Transport", icon: Car, budget: 300, spent: 184 },
  { key: "Fun", icon: PartyPopper, budget: 250, spent: 311 },
  { key: "Savings", icon: PiggyBank, budget: 700, spent: 700 },
]

const MONTHS = ["April 2026", "May 2026", "June 2026"] as const

type Txn = {
  id: number
  name: string
  category: CategoryKey
  date: string
  amount: number
}

const INITIAL_TXNS: Txn[] = [
  { id: 1, name: "Whole Foods Market", category: "Food", date: "Jun 12", amount: -86.4 },
  { id: 2, name: "Monthly Rent", category: "Housing", date: "Jun 1", amount: -1800 },
  { id: 3, name: "Shell Gas Station", category: "Transport", date: "Jun 10", amount: -54.2 },
  { id: 4, name: "Cinema Tickets", category: "Fun", date: "Jun 9", amount: -42 },
  { id: 5, name: "Vanguard Transfer", category: "Savings", date: "Jun 5", amount: -700 },
  { id: 6, name: "Trattoria Verde", category: "Food", date: "Jun 8", amount: -63.5 },
  { id: 7, name: "Metro Card Top-up", category: "Transport", date: "Jun 4", amount: -40 },
]

const CATEGORY_META: Record<
  CategoryKey,
  { icon: React.ComponentType<{ className?: string }> }
> = {
  Housing: { icon: Home },
  Food: { icon: Utensils },
  Transport: { icon: Car },
  Fun: { icon: PartyPopper },
  Savings: { icon: PiggyBank },
}

function money(n: number) {
  const abs = Math.abs(n)
  return (
    (n < 0 ? "-$" : "$") +
    abs.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  )
}

export default function BudgetingApp() {
  const [monthIndex, setMonthIndex] = React.useState(2)
  const [filter, setFilter] = React.useState<CategoryKey | "All">("All")
  const [txns, setTxns] = React.useState<Txn[]>(INITIAL_TXNS)
  const [composerName, setComposerName] = React.useState("")
  const [composerAmount, setComposerAmount] = React.useState("")
  const [composerCat, setComposerCat] = React.useState<CategoryKey>("Food")

  const totalBudget = CATEGORIES.reduce((s, c) => s + c.budget, 0)
  const totalSpent = CATEGORIES.reduce((s, c) => s + c.spent, 0)
  const remaining = totalBudget - totalSpent
  const spentPct = Math.round((totalSpent / totalBudget) * 100)

  const filtered =
    filter === "All" ? txns : txns.filter((t) => t.category === filter)

  function addTransaction(e: React.FormEvent) {
    e.preventDefault()
    const amt = parseFloat(composerAmount)
    if (!composerName.trim() || Number.isNaN(amt) || amt <= 0) return
    setTxns((prev) => [
      {
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        name: composerName.trim(),
        category: composerCat,
        date: "Jun 13",
        amount: -Math.abs(amt),
      },
      ...prev,
    ])
    setComposerName("")
    setComposerAmount("")
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Plume Budget</p>
              <p className="text-xs text-muted-foreground">Personal finances</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border bg-card p-0.5">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Previous month"
                className="h-8 w-8"
                onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
                disabled={monthIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="w-28 text-center text-sm font-medium tabular-nums">
                {MONTHS[monthIndex]}
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Next month"
                className="h-8 w-8"
                onClick={() =>
                  setMonthIndex((i) => Math.min(MONTHS.length - 1, i + 1))
                }
                disabled={monthIndex === MONTHS.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary-foreground/80">
                Remaining this month
              </CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {money(remaining)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                {remaining >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {money(totalSpent)} of {money(totalBudget)} spent
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total budget</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {money(totalBudget)}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Across {CATEGORIES.length} categories
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Spent so far</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {money(totalSpent)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={spentPct} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {spentPct}% of budget used
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Categories</h2>
              <span className="text-sm text-muted-foreground">
                {MONTHS[monthIndex]}
              </span>
            </div>
            <div className="space-y-3">
              {CATEGORIES.map((c) => {
                const pct = Math.min(
                  100,
                  Math.round((c.spent / c.budget) * 100)
                )
                const over = c.spent > c.budget
                const left = c.budget - c.spent
                const Icon = c.icon
                return (
                  <Card key={c.key}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg",
                              over
                                ? "bg-destructive/10 text-destructive"
                                : "bg-primary/10 text-primary"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{c.key}</p>
                            <p className="text-xs text-muted-foreground tabular-nums">
                              {money(c.spent)} of {money(c.budget)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={cn(
                              "text-sm font-semibold tabular-nums",
                              over ? "text-destructive" : "text-foreground"
                            )}
                          >
                            {over ? money(left) : money(left) + " left"}
                          </p>
                          {over && (
                            <Badge variant="destructive" className="mt-1">
                              Over budget
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress
                          value={pct}
                          className={cn("h-2", over && "[&>div]:bg-destructive")}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          <section className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base">Add transaction</CardTitle>
                <CardDescription>
                  Logs against {MONTHS[monthIndex]}
                </CardDescription>
              </CardHeader>
              <form onSubmit={addTransaction}>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="txn-name">Description</Label>
                    <Input
                      id="txn-name"
                      placeholder="e.g. Corner Cafe"
                      value={composerName}
                      onChange={(e) => setComposerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="txn-amount">Amount</Label>
                    <Input
                      id="txn-amount"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={composerAmount}
                      onChange={(e) => setComposerAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(CATEGORY_META) as CategoryKey[]).map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setComposerCat(k)}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                            composerCat === k
                              ? "border-primary bg-primary/10 text-primary"
                              : "bg-card text-muted-foreground hover:bg-accent"
                          )}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    <Plus className="mr-1 h-4 w-4" />
                    Add transaction
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent transactions</CardTitle>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(["All", ...Object.keys(CATEGORY_META)] as (
                    | CategoryKey
                    | "All"
                  )[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setFilter(k)}
                      className={cn(
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                        filter === k
                          ? "border-primary bg-primary/10 text-primary"
                          : "bg-card text-muted-foreground hover:bg-accent"
                      )}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <ul>
                  {filtered.length === 0 && (
                    <li className="px-6 py-8 text-center text-sm text-muted-foreground">
                      No transactions in this category.
                    </li>
                  )}
                  {filtered.map((t, i) => {
                    const Icon = CATEGORY_META[t.category].icon
                    return (
                      <li key={t.id}>
                        {i > 0 && <Separator />}
                        <div className="flex items-center justify-between gap-3 px-6 py-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {t.name}
                              </p>
                              <div className="mt-0.5 flex items-center gap-2">
                                <Badge variant="secondary" className="text-[10px]">
                                  {t.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {t.date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="shrink-0 text-sm font-semibold tabular-nums">
                            {money(t.amount)}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
          Plume Budget — keep every dollar accounted for.
        </div>
      </footer>
    </div>
  )
}
