"use client"

import * as React from "react"
import {
  Scale,
  CheckCircle2,
  AlertCircle,
  Landmark,
  BookOpen,
  Link2,
  ArrowLeftRight,
  RefreshCw,
  Download,
  ShieldCheck,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

type Side = "bank" | "book"

type Txn = {
  id: string
  date: string
  description: string
  reference: string
  amount: number
  side: Side
}

const BANK_TXNS: Txn[] = [
  { id: "B-1", date: "Jun 12", description: "Card settlement — Stripe payout", reference: "ACH 88421", amount: 12840, side: "bank" },
  { id: "B-2", date: "Jun 11", description: "Wire in — Northwind Co.", reference: "WIRE 50912", amount: 9200, side: "bank" },
  { id: "B-3", date: "Jun 10", description: "Direct debit — AWS billing", reference: "DD 33107", amount: -1840, side: "bank" },
  { id: "B-4", date: "Jun 09", description: "Payroll run — Gusto", reference: "ACH 71550", amount: -14250, side: "bank" },
  { id: "B-5", date: "Jun 08", description: "Bank fee — wire transfer", reference: "FEE 0091", amount: -35, side: "bank" },
  { id: "B-6", date: "Jun 07", description: "Deposit — Acme LLC", reference: "DEP 22418", amount: 5400, side: "bank" },
]

const BOOK_TXNS: Txn[] = [
  { id: "K-1", date: "Jun 12", description: "Stripe sales revenue", reference: "INV batch", amount: 12840, side: "book" },
  { id: "K-2", date: "Jun 11", description: "Client retainer — Northwind", reference: "INV-2041", amount: 9200, side: "book" },
  { id: "K-3", date: "Jun 10", description: "Cloud infrastructure expense", reference: "BILL-771", amount: -1840, side: "book" },
  { id: "K-4", date: "Jun 09", description: "Engineering payroll", reference: "PAY-06", amount: -14250, side: "book" },
  { id: "K-5", date: "Jun 06", description: "License revenue — Acme", reference: "INV-2038", amount: 5400, side: "book" },
  { id: "K-6", date: "Jun 05", description: "Refund — Pioneer Studio", reference: "CN-118", amount: -420, side: "book" },
]

// Pre-matched pairs. The bank fee (B-5) and book refund (K-6) start unmatched.
const INITIAL_MATCHED = new Set<string>(["B-1", "B-2", "B-3", "B-4", "K-1", "K-2", "K-3", "K-4"])

// Suggested counterpart for one-click matching of the obvious leftovers.
const SUGGESTED: Record<string, string> = {
  "B-6": "K-5",
  "K-5": "B-6",
}

type FilterValue = "all" | "matched" | "unmatched"

function money(n: number) {
  const sign = n < 0 ? "-" : ""
  return sign + "$" + Math.abs(n).toLocaleString("en-US")
}

export default function BankReconciliationPage() {
  const [matched, setMatched] = React.useState<Set<string>>(() => new Set(INITIAL_MATCHED))
  const [filter, setFilter] = React.useState<FilterValue>("all")

  const allTxns = React.useMemo(() => [...BANK_TXNS, ...BOOK_TXNS], [])
  const matchedCount = allTxns.filter((t) => matched.has(t.id)).length
  const unmatchedCount = allTxns.length - matchedCount

  const bankTotal = BANK_TXNS.reduce((s, t) => s + t.amount, 0)
  const bookTotal = BOOK_TXNS.reduce((s, t) => s + t.amount, 0)
  const difference = bankTotal - bookTotal

  const matchRate = Math.round((matchedCount / allTxns.length) * 100)

  function visible(txns: Txn[]) {
    return txns.filter((t) => {
      if (filter === "matched") return matched.has(t.id)
      if (filter === "unmatched") return !matched.has(t.id)
      return true
    })
  }

  function matchRow(id: string) {
    setMatched((prev) => {
      const next = new Set(prev)
      next.add(id)
      const partner = SUGGESTED[id]
      if (partner) next.add(partner)
      return next
    })
  }

  const bankRows = visible(BANK_TXNS)
  const bookRows = visible(BOOK_TXNS)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Scale className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Reconcilr</p>
              <p className="text-xs text-muted-foreground">Operating Account ·· 4821</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 text-sm md:flex">
            <Button variant="ghost" size="sm">Overview</Button>
            <Button variant="secondary" size="sm">Reconcile</Button>
            <Button variant="ghost" size="sm">Statements</Button>
            <Button variant="ghost" size="sm">Rules</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <RefreshCw className="h-4 w-4" />
              Re-sync
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" />
              Export report
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
            <h1 className="text-2xl font-semibold tracking-tight">June 2026 Reconciliation</h1>
            <p className="text-sm text-muted-foreground">
              Statement period Jun 1 – Jun 12 · Imported 12 transactions
            </p>
          </div>
          <Badge
            variant={difference === 0 ? "secondary" : "destructive"}
            className="gap-1.5"
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                difference === 0 ? "bg-primary" : "bg-destructive"
              )}
            />
            {difference === 0 ? "Reconciled" : "Out of balance"}
          </Badge>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Matched"
            value={String(matchedCount)}
            sub={matchRate + "% of statement"}
            tone="primary"
            icon={<CheckCircle2 className="h-4 w-4" />}
          />
          <KpiCard
            label="Unmatched"
            value={String(unmatchedCount)}
            sub={unmatchedCount === 0 ? "Nothing pending" : "Needs review"}
            tone={unmatchedCount === 0 ? "muted" : "warn"}
            icon={<AlertCircle className="h-4 w-4" />}
          />
          <KpiCard
            label="Bank balance"
            value={money(bankTotal)}
            sub="Cleared per statement"
            tone="muted"
            icon={<Landmark className="h-4 w-4" />}
          />
          <KpiCard
            label="Difference"
            value={money(difference)}
            sub={difference === 0 ? "Books agree" : "Bank vs. books"}
            tone={difference === 0 ? "primary" : "warn"}
            icon={<ArrowLeftRight className="h-4 w-4" />}
          />
        </div>

        <Card className="mt-6">
          <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">Reconciliation progress</p>
                <p className="text-xs text-muted-foreground">
                  {matchedCount} of {allTxns.length} lines matched across both ledgers
                </p>
              </div>
            </div>
            <div className="flex w-full max-w-xs items-center gap-3">
              <Progress value={matchRate} className="h-2 flex-1" />
              <span className="text-sm font-semibold tabular-nums">{matchRate}%</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterValue)}>
            <TabsList>
              <TabsTrigger value="all">All ({allTxns.length})</TabsTrigger>
              <TabsTrigger value="matched">Matched ({matchedCount})</TabsTrigger>
              <TabsTrigger value="unmatched">Unmatched ({unmatchedCount})</TabsTrigger>
            </TabsList>
          </Tabs>
          <p className="text-xs text-muted-foreground">
            Showing {filter === "all" ? "every line" : filter + " lines only"}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LedgerColumn
            title="Bank statement"
            subtitle="As imported from your bank"
            icon={<Landmark className="h-4 w-4" />}
            rows={bankRows}
            matched={matched}
            onMatch={matchRow}
          />
          <LedgerColumn
            title="Book entries"
            subtitle="Recorded in your accounting"
            icon={<BookOpen className="h-4 w-4" />}
            rows={bookRows}
            matched={matched}
            onMatch={matchRow}
          />
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Reconcilr. All figures in USD.</p>
          <p>Auto-match confidence model v4 · Last run Jun 12</p>
        </div>
      </footer>
    </div>
  )
}

function LedgerColumn({
  title,
  subtitle,
  icon,
  rows,
  matched,
  onMatch,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
  rows: Txn[]
  matched: Set<string>
  onMatch: (id: string) => void
}) {
  const total = rows.reduce((s, t) => s + t.amount, 0)
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            {icon}
          </span>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-2.5">
        {rows.map((t) => {
          const isMatched = matched.has(t.id)
          return (
            <div
              key={t.id}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                isMatched ? "bg-muted/30" : "bg-card"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{t.date}</span>
                    {isMatched ? (
                      <Badge variant="secondary" className="gap-1 px-1.5 py-0 text-[11px]">
                        <Link2 className="h-3 w-3" /> Matched
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 border-primary/40 px-1.5 py-0 text-[11px] text-primary">
                        <AlertCircle className="h-3 w-3" /> Unmatched
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm font-medium">{t.description}</p>
                  <p className="text-xs text-muted-foreground">{t.reference}</p>
                </div>
                <div className="text-right">
                  <span
                    className={cn(
                      "text-sm font-semibold tabular-nums",
                      t.amount < 0 ? "text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {money(t.amount)}
                  </span>
                </div>
              </div>
              {!isMatched && (
                <div className="mt-2.5 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-xs"
                    onClick={() => onMatch(t.id)}
                  >
                    <Link2 className="h-3.5 w-3.5" /> Match line
                  </Button>
                </div>
              )}
            </div>
          )
        })}
        {rows.length === 0 && (
          <div className="rounded-lg border border-dashed py-10 text-center text-sm text-muted-foreground">
            No lines in this view.
          </div>
        )}
      </CardContent>
      <Separator />
      <div className="flex items-center justify-between px-6 py-3 text-sm">
        <span className="text-muted-foreground">Subtotal ({rows.length})</span>
        <span className="font-semibold tabular-nums">{money(total)}</span>
      </div>
    </Card>
  )
}

function KpiCard({
  label,
  value,
  sub,
  tone,
  icon,
}: {
  label: string
  value: string
  sub: string
  tone: "primary" | "warn" | "muted"
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              tone === "primary" && "bg-primary/10 text-primary",
              tone === "warn" && "bg-muted text-foreground",
              tone === "muted" && "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </span>
        </div>
        <div className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
        <div
          className={cn(
            "mt-1 text-xs font-medium",
            tone === "warn" ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {sub}
        </div>
      </CardContent>
    </Card>
  )
}
