"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Download,
  RefreshCcw,
  Settings,
  Search,
  Bell,
  Wallet,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  ChevronDown,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

type RangeKey = "24h" | "7d" | "30d" | "12m"

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "24h", label: "24 hours" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "12m", label: "12 months" },
]

type Kpi = {
  gross: string
  net: string
  refunds: string
  disputes: string
  grossDelta: number
  netDelta: number
  refundsDelta: number
  disputesDelta: number
}

const KPI_BY_RANGE: Record<RangeKey, Kpi> = {
  "24h": {
    gross: "$48,210",
    net: "$45,902",
    refunds: "$1,140",
    disputes: "$320",
    grossDelta: 4.2,
    netDelta: 3.8,
    refundsDelta: -1.1,
    disputesDelta: 0.4,
  },
  "7d": {
    gross: "$312,884",
    net: "$298,440",
    refunds: "$7,920",
    disputes: "$2,160",
    grossDelta: 8.6,
    netDelta: 7.9,
    refundsDelta: 2.3,
    disputesDelta: -0.8,
  },
  "30d": {
    gross: "$1,284,560",
    net: "$1,221,308",
    refunds: "$31,440",
    disputes: "$9,810",
    grossDelta: 12.4,
    netDelta: 11.7,
    refundsDelta: -3.5,
    disputesDelta: 1.2,
  },
  "12m": {
    gross: "$14,902,330",
    net: "$14,118,002",
    refunds: "$402,118",
    disputes: "$118,440",
    grossDelta: 22.9,
    netDelta: 21.3,
    refundsDelta: 5.1,
    disputesDelta: -2.4,
  },
}

const CHART_BY_RANGE: Record<RangeKey, { label: string; value: number }[]> = {
  "24h": [
    { label: "00", value: 32 },
    { label: "04", value: 18 },
    { label: "08", value: 54 },
    { label: "12", value: 82 },
    { label: "16", value: 71 },
    { label: "20", value: 96 },
  ],
  "7d": [
    { label: "Mon", value: 64 },
    { label: "Tue", value: 72 },
    { label: "Wed", value: 58 },
    { label: "Thu", value: 88 },
    { label: "Fri", value: 100 },
    { label: "Sat", value: 46 },
    { label: "Sun", value: 51 },
  ],
  "30d": [
    { label: "W1", value: 60 },
    { label: "W2", value: 74 },
    { label: "W3", value: 69 },
    { label: "W4", value: 92 },
  ],
  "12m": [
    { label: "Jan", value: 42 },
    { label: "Feb", value: 51 },
    { label: "Mar", value: 58 },
    { label: "Apr", value: 64 },
    { label: "May", value: 71 },
    { label: "Jun", value: 79 },
    { label: "Jul", value: 74 },
    { label: "Aug", value: 83 },
    { label: "Sep", value: 88 },
    { label: "Oct", value: 95 },
    { label: "Nov", value: 90 },
    { label: "Dec", value: 100 },
  ],
}

type Status = "Succeeded" | "Pending" | "Failed" | "Refunded"

const STATUS_VARIANT: Record<Status, "default" | "secondary" | "outline" | "destructive"> = {
  Succeeded: "default",
  Pending: "secondary",
  Failed: "destructive",
  Refunded: "outline",
}

const PAYMENTS: {
  id: string
  customer: string
  email: string
  amount: string
  method: string
  status: Status
  date: string
}[] = [
  { id: "pi_4Qx81", customer: "Lena Ortiz", email: "lena@northwind.io", amount: "$1,240.00", method: "Visa ·· 4242", status: "Succeeded", date: "Jun 13, 14:02" },
  { id: "pi_4Qx80", customer: "Marcus Bell", email: "m.bell@acme.co", amount: "$320.50", method: "Mastercard ·· 5511", status: "Pending", date: "Jun 13, 13:41" },
  { id: "pi_4Qx7f", customer: "Priya Nair", email: "priya@lumen.dev", amount: "$89.00", method: "Apple Pay", status: "Succeeded", date: "Jun 13, 12:58" },
  { id: "pi_4Qx7a", customer: "David Kim", email: "dkim@vertex.app", amount: "$2,100.00", method: "Visa ·· 1881", status: "Failed", date: "Jun 13, 11:30" },
  { id: "pi_4Qx76", customer: "Sofia Rossi", email: "sofia@studio.fm", amount: "$540.00", method: "Amex ·· 0007", status: "Refunded", date: "Jun 13, 10:14" },
  { id: "pi_4Qx71", customer: "Tom Becker", email: "tom@payhub.com", amount: "$76.25", method: "Mastercard ·· 9020", status: "Succeeded", date: "Jun 13, 09:46" },
]

const METHODS: { name: string; share: number; volume: string }[] = [
  { name: "Visa", share: 46, volume: "$591k" },
  { name: "Mastercard", share: 28, volume: "$359k" },
  { name: "Apple Pay", share: 14, volume: "$179k" },
  { name: "Amex", share: 8, volume: "$102k" },
  { name: "Other", share: 4, volume: "$51k" },
]

function Delta({ value }: { value: number }) {
  const positive = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 text-xs font-medium",
        positive ? "text-primary" : "text-destructive"
      )}
    >
      {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {Math.abs(value)}%
    </span>
  )
}

export default function PaymentsDashboard() {
  const [range, setRange] = React.useState<RangeKey>("30d")
  const kpi = KPI_BY_RANGE[range]
  const chart = CHART_BY_RANGE[range]
  const rangeLabel = RANGES.find((r) => r.key === range)?.label ?? ""

  const kpiCards = [
    { title: "Gross volume", value: kpi.gross, delta: kpi.grossDelta, icon: TrendingUp, tint: "bg-primary/10 text-primary" },
    { title: "Net volume", value: kpi.net, delta: kpi.netDelta, icon: Wallet, tint: "bg-primary/10 text-primary" },
    { title: "Refunds", value: kpi.refunds, delta: kpi.refundsDelta, icon: RefreshCcw, tint: "bg-muted text-muted-foreground" },
    { title: "Disputes", value: kpi.disputes, delta: kpi.disputesDelta, icon: ShieldAlert, tint: "bg-muted text-muted-foreground" },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <CreditCard className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Plinth Pay</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
              Live
            </Badge>
          </div>

          <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Primary">
            {["Overview", "Payments", "Balances", "Customers"].map((item, i) => (
              <Button
                key={item}
                variant={i === 0 ? "secondary" : "ghost"}
                size="sm"
                className="font-medium"
              >
                {item}
              </Button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search payments…"
                className="h-9 w-56 pl-8"
                aria-label="Search payments"
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing activity for the last {rangeLabel.toLowerCase()}.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="inline-flex items-center rounded-lg border bg-muted/30 p-1"
              role="tablist"
              aria-label="Date range"
            >
              {RANGES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  role="tab"
                  aria-selected={range === r.key}
                  onClick={() => setRange(r.key)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    range === r.key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {r.key}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((c) => (
            <Card key={c.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {c.title}
                </CardTitle>
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-md", c.tint)}>
                  <c.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tracking-tight tabular-nums">
                  {c.value}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Delta value={c.delta} />
                  <span>vs previous</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>Volume over time</CardTitle>
                <CardDescription>Processed payment volume, {rangeLabel.toLowerCase()}</CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                {kpi.gross}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-2 sm:gap-3">
                {chart.map((bar) => (
                  <div key={bar.label} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/20 transition-colors group-hover:bg-primary"
                        style={{ height: `${bar.value}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Hover a bar to highlight. Figures update with the selected range.
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment methods</CardTitle>
              <CardDescription>Share of volume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {METHODS.map((m) => (
                <div key={m.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-muted-foreground tabular-nums">
                      {m.share}% · {m.volume}
                    </span>
                  </div>
                  <Progress value={m.share} className="h-2" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full justify-between">
                View full breakdown
                <ChevronDown className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Recent payments</CardTitle>
              <CardDescription>Latest transactions across all channels</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View all
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PAYMENTS.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {p.customer.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{p.customer}</div>
                            <div className="truncate text-xs text-muted-foreground">{p.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                        {p.method}
                      </TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[p.status]}>{p.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                        {p.date}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium tabular-nums">
                        {p.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="border-primary/30 bg-primary/10">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base">Payout scheduled</CardTitle>
                <CardDescription>Next deposit in 2 days</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {kpi.net} will be deposited to your linked account ending ·· 3391.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base">Needs review</CardTitle>
                <CardDescription>2 disputes awaiting evidence</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Respond before Jun 18 to avoid auto-loss.</span>
              <Button variant="outline" size="sm">
                Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span>© 2026 Plinth Pay. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">Documentation</a>
            <a href="#" className="hover:text-foreground">API status</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
