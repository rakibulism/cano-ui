"use client"

import * as React from "react"
import {
  Calculator,
  Receipt,
  FileCheck2,
  CalendarClock,
  Download,
  CheckCircle2,
  Clock,
  CircleDashed,
  TrendingDown,
  TrendingUp,
  Landmark,
  FileText,
  Bell,
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
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TAX_YEARS = ["2023", "2024", "2025"] as const
type TaxYear = (typeof TAX_YEARS)[number]

type Kpi = {
  label: string
  value: string
  sub: string
  trend: number
  icon: React.ComponentType<{ className?: string }>
}

const KPIS: Record<TaxYear, Kpi[]> = {
  "2023": [
    { label: "Estimated tax owed", value: "$18,420", sub: "After withholding", trend: 4.2, icon: Calculator },
    { label: "Total deductions", value: "$24,180", sub: "Itemized", trend: 6.8, icon: Receipt },
    { label: "Effective rate", value: "21.4%", sub: "Federal + state", trend: -1.1, icon: TrendingDown },
    { label: "Filing status", value: "Filed", sub: "Accepted Apr 9", trend: 0, icon: FileCheck2 },
  ],
  "2024": [
    { label: "Estimated tax owed", value: "$21,960", sub: "After withholding", trend: 8.4, icon: Calculator },
    { label: "Total deductions", value: "$27,540", sub: "Itemized", trend: 9.2, icon: Receipt },
    { label: "Effective rate", value: "22.6%", sub: "Federal + state", trend: 1.4, icon: TrendingUp },
    { label: "Filing status", value: "In review", sub: "Submitted Mar 2", trend: 0, icon: FileCheck2 },
  ],
  "2025": [
    { label: "Estimated tax owed", value: "$15,310", sub: "After withholding", trend: -12.5, icon: Calculator },
    { label: "Total deductions", value: "$29,870", sub: "Projected", trend: 8.5, icon: Receipt },
    { label: "Effective rate", value: "19.8%", sub: "Federal + state", trend: -2.8, icon: TrendingDown },
    { label: "Filing status", value: "Draft", sub: "Due Apr 15", trend: 0, icon: FileCheck2 },
  ],
}

type Deduction = {
  category: string
  description: string
  amount: string
  type: "Standard" | "Business" | "Charity" | "Medical"
}

const DEDUCTIONS: Record<TaxYear, Deduction[]> = {
  "2023": [
    { category: "Mortgage interest", description: "Primary residence", amount: "$9,840", type: "Standard" },
    { category: "Home office", description: "320 sq ft dedicated", amount: "$3,120", type: "Business" },
    { category: "Donations", description: "Cash + goods", amount: "$4,500", type: "Charity" },
    { category: "Health premiums", description: "Self-employed plan", amount: "$6,720", type: "Medical" },
  ],
  "2024": [
    { category: "Mortgage interest", description: "Primary residence", amount: "$9,420", type: "Standard" },
    { category: "Equipment", description: "Laptop + monitor", amount: "$4,180", type: "Business" },
    { category: "Donations", description: "DAF contribution", amount: "$6,200", type: "Charity" },
    { category: "Health premiums", description: "Family HDHP", amount: "$7,740", type: "Medical" },
  ],
  "2025": [
    { category: "Mortgage interest", description: "Primary residence", amount: "$9,010", type: "Standard" },
    { category: "Software & SaaS", description: "Business tools", amount: "$5,640", type: "Business" },
    { category: "Donations", description: "Stock gift", amount: "$8,400", type: "Charity" },
    { category: "Health premiums", description: "Family HDHP", amount: "$6,820", type: "Medical" },
  ],
}

const DEDUCTION_VARIANT: Record<Deduction["type"], "default" | "secondary" | "outline" | "destructive"> = {
  Standard: "secondary",
  Business: "default",
  Charity: "outline",
  Medical: "destructive",
}

type Quarter = {
  quarter: string
  period: string
  amount: string
  status: "Paid" | "Due" | "Upcoming"
  dueDate: string
}

const QUARTERS: Record<TaxYear, Quarter[]> = {
  "2023": [
    { quarter: "Q1", period: "Jan – Mar", amount: "$4,600", status: "Paid", dueDate: "Apr 15" },
    { quarter: "Q2", period: "Apr – May", amount: "$4,600", status: "Paid", dueDate: "Jun 15" },
    { quarter: "Q3", period: "Jun – Aug", amount: "$4,600", status: "Paid", dueDate: "Sep 15" },
    { quarter: "Q4", period: "Sep – Dec", amount: "$4,620", status: "Paid", dueDate: "Jan 15" },
  ],
  "2024": [
    { quarter: "Q1", period: "Jan – Mar", amount: "$5,490", status: "Paid", dueDate: "Apr 15" },
    { quarter: "Q2", period: "Apr – May", amount: "$5,490", status: "Paid", dueDate: "Jun 15" },
    { quarter: "Q3", period: "Jun – Aug", amount: "$5,490", status: "Due", dueDate: "Sep 15" },
    { quarter: "Q4", period: "Sep – Dec", amount: "$5,490", status: "Upcoming", dueDate: "Jan 15" },
  ],
  "2025": [
    { quarter: "Q1", period: "Jan – Mar", amount: "$3,830", status: "Due", dueDate: "Apr 15" },
    { quarter: "Q2", period: "Apr – May", amount: "$3,830", status: "Upcoming", dueDate: "Jun 16" },
    { quarter: "Q3", period: "Jun – Aug", amount: "$3,830", status: "Upcoming", dueDate: "Sep 15" },
    { quarter: "Q4", period: "Sep – Dec", amount: "$3,820", status: "Upcoming", dueDate: "Jan 15" },
  ],
}

type Doc = { name: string; source: string; ready: boolean }

const DOCUMENTS: Record<TaxYear, Doc[]> = {
  "2023": [
    { name: "W-2 Wage statement", source: "Acme Corp", ready: true },
    { name: "1099-NEC", source: "Freelance clients", ready: true },
    { name: "1098 Mortgage interest", source: "First National", ready: true },
    { name: "Charitable receipts", source: "Self-uploaded", ready: true },
    { name: "1095-A Health coverage", source: "Marketplace", ready: true },
  ],
  "2024": [
    { name: "W-2 Wage statement", source: "Acme Corp", ready: true },
    { name: "1099-NEC", source: "Freelance clients", ready: true },
    { name: "1098 Mortgage interest", source: "First National", ready: true },
    { name: "Charitable receipts", source: "Self-uploaded", ready: false },
    { name: "1095-A Health coverage", source: "Marketplace", ready: false },
  ],
  "2025": [
    { name: "W-2 Wage statement", source: "Acme Corp", ready: false },
    { name: "1099-NEC", source: "Freelance clients", ready: true },
    { name: "1098 Mortgage interest", source: "First National", ready: false },
    { name: "Charitable receipts", source: "Self-uploaded", ready: false },
    { name: "1095-A Health coverage", source: "Marketplace", ready: false },
  ],
}

const STATUS_STYLES: Record<Quarter["status"], { badge: "default" | "secondary" | "outline"; icon: React.ComponentType<{ className?: string }> }> = {
  Paid: { badge: "secondary", icon: CheckCircle2 },
  Due: { badge: "default", icon: Clock },
  Upcoming: { badge: "outline", icon: CircleDashed },
}

export default function TaxDashboard() {
  const [year, setYear] = React.useState<TaxYear>("2025")

  const kpis = KPIS[year]
  const deductions = DEDUCTIONS[year]
  const quarters = QUARTERS[year]
  const documents = DOCUMENTS[year]
  const readyCount = documents.filter((d) => d.ready).length
  const docProgress = Math.round((readyCount / documents.length) * 100)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Landmark className="size-5" />
          </div>
          <div className="mr-auto">
            <p className="text-sm font-semibold leading-tight">Ledgerly Tax</p>
            <p className="text-xs text-muted-foreground">Filing workspace</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="hidden sm:inline-flex">
            <Bell className="size-4" />
          </Button>
          <Button size="sm" className="gap-1.5">
            <Download className="size-4" />
            <span className="hidden sm:inline">Export return</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Tax overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track estimates, deductions, and filing readiness for tax year {year}.
            </p>
          </div>
          <div
            role="tablist"
            aria-label="Tax year"
            className="inline-flex w-fit items-center gap-1 rounded-lg border bg-muted/30 p-1"
          >
            {TAX_YEARS.map((y) => (
              <button
                key={y}
                role="tab"
                aria-selected={year === y}
                onClick={() => setYear(y)}
                className={cn(
                  "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
                  year === y
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label}>
                <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                  <CardDescription>{kpi.label}</CardDescription>
                  <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">{kpi.value}</div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{kpi.sub}</span>
                    {kpi.trend !== 0 && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-0.5 font-medium",
                          kpi.trend < 0 ? "text-primary" : "text-foreground"
                        )}
                      >
                        {kpi.trend < 0 ? (
                          <TrendingDown className="size-3" />
                        ) : (
                          <TrendingUp className="size-3" />
                        )}
                        {Math.abs(kpi.trend)}%
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Receipt className="size-4 text-muted-foreground" />
                Deductions
              </CardTitle>
              <CardDescription>Categorized write-offs for {year}.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden sm:table-cell">Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deductions.map((d) => (
                    <TableRow key={d.category}>
                      <TableCell>
                        <div className="font-medium">{d.category}</div>
                        <div className="text-xs text-muted-foreground">{d.description}</div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={DEDUCTION_VARIANT[d.type]}>{d.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{d.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="size-4 text-muted-foreground" />
                Documents
              </CardTitle>
              <CardDescription>
                {readyCount} of {documents.length} ready to file.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Progress value={docProgress} />
                <p className="mt-2 text-xs text-muted-foreground">{docProgress}% collected</p>
              </div>
              <Separator />
              <ul className="space-y-3">
                {documents.map((doc) => (
                  <li key={doc.name} className="flex items-start gap-3">
                    <Checkbox checked={doc.ready} aria-label={doc.name} className="mt-0.5" />
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "truncate text-sm font-medium",
                          doc.ready && "text-muted-foreground line-through"
                        )}
                      >
                        {doc.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{doc.source}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock className="size-4 text-muted-foreground" />
              Quarterly estimates
            </CardTitle>
            <CardDescription>Estimated payment schedule for {year}.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quarters.map((q) => {
                const meta = STATUS_STYLES[q.status]
                const StatusIcon = meta.icon
                return (
                  <li
                    key={q.quarter}
                    className={cn(
                      "rounded-lg border p-4",
                      q.status === "Due" ? "border-primary bg-primary/5" : "bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{q.quarter}</span>
                      <Badge variant={meta.badge} className="gap-1">
                        <StatusIcon className="size-3" />
                        {q.status}
                      </Badge>
                    </div>
                    <p className="mt-3 text-xl font-semibold tracking-tight tabular-nums">{q.amount}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{q.period}</p>
                    <Separator className="my-3" />
                    <p className="text-xs text-muted-foreground">
                      Due <span className="font-medium text-foreground">{q.dueDate}</span>
                    </p>
                  </li>
                )
              })}
            </ol>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Ledgerly Tax — estimates are for planning only, not tax advice.</p>
          <p>Tax year {year} · Last synced today</p>
        </div>
      </footer>
    </div>
  )
}
