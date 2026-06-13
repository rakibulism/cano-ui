"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Banknote,
  Calendar,
  Download,
  FileText,
  Percent,
  PiggyBank,
  Receipt,
  TrendingUp,
  Wallet,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Line = { label: string; value: string; emphasis?: boolean; muted?: boolean }
type Statement = { columns: [string, string]; rows: Line[] }

const PERIODS = ["Q1 2026", "Q2 2026", "H1 2026", "FY 2025"] as const
type Period = (typeof PERIODS)[number]

const REPORTS = ["P&L", "Balance sheet", "Cash flow"] as const
type Report = (typeof REPORTS)[number]

const KPIS: Record<
  Period,
  { revenue: string; expenses: string; net: string; margin: string; deltas: number[] }
> = {
  "Q1 2026": {
    revenue: "$4.82M",
    expenses: "$3.11M",
    net: "$1.71M",
    margin: "35.5%",
    deltas: [12.4, 6.1, 18.9, 3.2],
  },
  "Q2 2026": {
    revenue: "$5.36M",
    expenses: "$3.40M",
    net: "$1.96M",
    margin: "36.6%",
    deltas: [11.2, 9.3, 14.6, 1.1],
  },
  "H1 2026": {
    revenue: "$10.18M",
    expenses: "$6.51M",
    net: "$3.67M",
    margin: "36.1%",
    deltas: [13.7, 7.8, 21.4, 2.0],
  },
  "FY 2025": {
    revenue: "$17.40M",
    expenses: "$11.92M",
    net: "$5.48M",
    margin: "31.5%",
    deltas: [8.9, 5.2, 16.3, -1.4],
  },
}

const STATEMENTS: Record<Report, Statement> = {
  "P&L": {
    columns: ["Line item", "Amount"],
    rows: [
      { label: "Product revenue", value: "$4,120,000" },
      { label: "Services revenue", value: "$700,000" },
      { label: "Total revenue", value: "$4,820,000", emphasis: true },
      { label: "Cost of goods sold", value: "($1,640,000)", muted: true },
      { label: "Gross profit", value: "$3,180,000", emphasis: true },
      { label: "Sales & marketing", value: "($820,000)", muted: true },
      { label: "Research & development", value: "($410,000)", muted: true },
      { label: "General & admin", value: "($240,000)", muted: true },
      { label: "Operating income", value: "$1,710,000", emphasis: true },
      { label: "Net income", value: "$1,710,000", emphasis: true },
    ],
  },
  "Balance sheet": {
    columns: ["Account", "Balance"],
    rows: [
      { label: "Cash & equivalents", value: "$6,240,000" },
      { label: "Accounts receivable", value: "$1,880,000" },
      { label: "Inventory", value: "$920,000" },
      { label: "Total current assets", value: "$9,040,000", emphasis: true },
      { label: "Property & equipment", value: "$2,310,000" },
      { label: "Total assets", value: "$11,350,000", emphasis: true },
      { label: "Accounts payable", value: "($1,120,000)", muted: true },
      { label: "Long-term debt", value: "($2,400,000)", muted: true },
      { label: "Total liabilities", value: "($3,520,000)", emphasis: true },
      { label: "Total equity", value: "$7,830,000", emphasis: true },
    ],
  },
  "Cash flow": {
    columns: ["Activity", "Net flow"],
    rows: [
      { label: "Net income", value: "$1,710,000" },
      { label: "Depreciation & amortization", value: "$185,000" },
      { label: "Change in working capital", value: "($240,000)", muted: true },
      { label: "Cash from operations", value: "$1,655,000", emphasis: true },
      { label: "Capital expenditures", value: "($430,000)", muted: true },
      { label: "Cash from investing", value: "($430,000)", emphasis: true },
      { label: "Debt repayment", value: "($300,000)", muted: true },
      { label: "Dividends paid", value: "($120,000)", muted: true },
      { label: "Cash from financing", value: "($420,000)", emphasis: true },
      { label: "Net change in cash", value: "$805,000", emphasis: true },
    ],
  },
}

const CHART = [
  { month: "Jan", revenue: 1.42, expense: 0.98 },
  { month: "Feb", revenue: 1.55, expense: 1.02 },
  { month: "Mar", revenue: 1.85, expense: 1.11 },
  { month: "Apr", revenue: 1.71, expense: 1.08 },
  { month: "May", revenue: 1.94, expense: 1.16 },
  { month: "Jun", revenue: 1.71, expense: 1.16 },
]

const CHART_MAX = 2.2

function KpiCard({
  icon: Icon,
  label,
  value,
  delta,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  delta: number
  accent?: boolean
}) {
  const up = delta >= 0
  return (
    <Card className={cn(accent && "border-primary/40 bg-primary/5")}>
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
          <Icon
            className={cn("h-4 w-4", accent ? "text-primary" : "text-muted-foreground")}
            aria-hidden="true"
          />
          {label}
        </CardDescription>
        <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent>
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
          {delta}% YoY
        </span>
      </CardContent>
    </Card>
  )
}

export default function FinancialReportsDashboard() {
  const [period, setPeriod] = React.useState<Period>("Q1 2026")
  const [report, setReport] = React.useState<Report>("P&L")

  const kpi = KPIS[period]
  const statement = STATEMENTS[report]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Banknote className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Ledgerline Finance</span>
          </div>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Reporting
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>CF</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Financial reports
            </h1>
            <p className="text-sm text-muted-foreground">
              Consolidated statements for the selected reporting period.
            </p>
          </div>
          <div className="inline-flex items-center gap-2">
            <Calendar
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="inline-flex rounded-lg border bg-muted/30 p-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    period === p
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon={Wallet}
            label="Revenue"
            value={kpi.revenue}
            delta={kpi.deltas[0]}
            accent
          />
          <KpiCard
            icon={Receipt}
            label="Expenses"
            value={kpi.expenses}
            delta={kpi.deltas[1]}
          />
          <KpiCard
            icon={PiggyBank}
            label="Net income"
            value={kpi.net}
            delta={kpi.deltas[2]}
          />
          <KpiCard
            icon={Percent}
            label="Net margin"
            value={kpi.margin}
            delta={kpi.deltas[3]}
          />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <TrendingUp
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Income vs expense
                  </CardTitle>
                  <CardDescription>
                    Monthly comparison, in millions ({period}).
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-1.5 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/40" />
                    Expense
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex h-52 items-end gap-3">
                {CHART.map((d) => (
                  <div
                    key={d.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex h-full w-full items-end justify-center gap-1">
                      <div
                        className="group relative w-1/2 rounded-t-sm bg-primary transition-colors hover:bg-primary/80"
                        style={{ height: `${(d.revenue / CHART_MAX) * 100}%` }}
                      >
                        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-background opacity-0 transition-opacity group-hover:opacity-100">
                          {d.revenue}M
                        </span>
                      </div>
                      <div
                        className="w-1/2 rounded-t-sm bg-muted-foreground/40 transition-colors hover:bg-muted-foreground/60"
                        style={{ height: `${(d.expense / CHART_MAX) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      {d.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Period highlights</CardTitle>
              <CardDescription>Key takeaways at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Gross margin</span>
                <span className="font-medium tabular-nums">66.0%</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Operating margin</span>
                <span className="font-medium tabular-nums">{kpi.margin}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Burn / runway</span>
                <span className="font-medium tabular-nums">28 mo</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">DSO</span>
                <span className="font-medium tabular-nums">41 days</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary">Audited</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {report}
                  </CardTitle>
                  <CardDescription>
                    {period} — figures in USD, unaudited management view.
                  </CardDescription>
                </div>
                <div
                  className="inline-flex rounded-lg border bg-muted/30 p-1"
                  role="tablist"
                  aria-label="Report type"
                >
                  {REPORTS.map((r) => (
                    <button
                      key={r}
                      role="tab"
                      aria-selected={report === r}
                      onClick={() => setReport(r)}
                      className={cn(
                        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                        report === r
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{statement.columns[0]}</TableHead>
                    <TableHead className="text-right">
                      {statement.columns[1]}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statement.rows.map((row) => (
                    <TableRow
                      key={row.label}
                      className={cn(row.emphasis && "bg-muted/40")}
                    >
                      <TableCell
                        className={cn(
                          row.emphasis ? "font-semibold" : "font-normal"
                        )}
                      >
                        {row.label}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-right tabular-nums",
                          row.emphasis && "font-semibold",
                          row.muted && "text-muted-foreground"
                        )}
                      >
                        {row.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>Ledgerline Finance — generated reporting workspace.</span>
          <span className="tabular-nums">Last close: May 31, 2026</span>
        </div>
      </footer>
    </div>
  )
}
