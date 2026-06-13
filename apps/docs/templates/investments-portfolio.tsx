"use client"
import * as React from "react"
import { TrendingUp, TrendingDown, Plus, MoreHorizontal, Wallet, ArrowUpRight, Star, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Holding = {
  symbol: string
  name: string
  shares: number
  price: string
  value: string
  change: number
  changeLabel: string
}

const KPIS = [
  { label: "Total Portfolio Value", value: "$248,930.42", sub: "+$3,204.18 today", up: true },
  { label: "Day Change", value: "+1.31%", sub: "vs. -0.12% S&P 500", up: true },
  { label: "Total Gain / Loss", value: "+$61,204.90", sub: "+32.6% all time", up: true },
  { label: "Cash Available", value: "$12,480.00", sub: "Settled funds", up: true },
]

const ALLOCATION = [
  { label: "US Equities", pct: 46, amount: "$114,508" },
  { label: "International", pct: 21, amount: "$52,275" },
  { label: "Bonds", pct: 14, amount: "$34,850" },
  { label: "Crypto", pct: 11, amount: "$27,382" },
  { label: "Cash", pct: 8, amount: "$19,914" },
]

const HOLDINGS: Holding[] = [
  { symbol: "NVDA", name: "NVIDIA Corp.", shares: 120, price: "$486.20", value: "$58,344", change: 4.12, changeLabel: "+4.12%" },
  { symbol: "AAPL", name: "Apple Inc.", shares: 210, price: "$192.84", value: "$40,496", change: 0.84, changeLabel: "+0.84%" },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: 64, price: "$418.10", value: "$26,758", change: -1.06, changeLabel: "-1.06%" },
  { symbol: "VTI", name: "Vanguard Total Market", shares: 90, price: "$252.40", value: "$22,716", change: 0.22, changeLabel: "+0.22%" },
  { symbol: "TSLA", name: "Tesla Inc.", shares: 75, price: "$241.05", value: "$18,078", change: -2.34, changeLabel: "-2.34%" },
  { symbol: "BTC", name: "Bitcoin", shares: 0.42, price: "$64,120.00", value: "$26,930", change: 3.58, changeLabel: "+3.58%" },
]

const WATCHLIST = [
  { symbol: "AMZN", name: "Amazon.com", price: "$178.22", change: 1.94, changeLabel: "+1.94%" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: "$152.50", change: -0.41, changeLabel: "-0.41%" },
  { symbol: "META", name: "Meta Platforms", price: "$498.30", change: 2.11, changeLabel: "+2.11%" },
  { symbol: "AMD", name: "Advanced Micro", price: "$162.78", change: -1.28, changeLabel: "-1.28%" },
]

const TIMEFRAMES = ["1D", "1W", "1M", "6M", "1Y", "ALL"] as const
type Timeframe = (typeof TIMEFRAMES)[number]

const SERIES: Record<Timeframe, number[]> = {
  "1D": [40, 44, 41, 48, 52, 49, 55, 53, 60, 58, 64, 62],
  "1W": [30, 38, 35, 42, 50, 47, 44, 52, 58, 55, 62, 68],
  "1M": [20, 26, 24, 32, 30, 40, 38, 46, 52, 50, 58, 66],
  "6M": [12, 22, 18, 30, 42, 38, 50, 46, 58, 64, 60, 72],
  "1Y": [8, 16, 28, 22, 36, 48, 44, 56, 62, 70, 66, 80],
  ALL: [4, 12, 20, 34, 30, 46, 54, 60, 72, 78, 84, 92],
}

const TF_DELTA: Record<Timeframe, string> = {
  "1D": "+1.31%",
  "1W": "+3.42%",
  "1M": "+6.10%",
  "6M": "+14.88%",
  "1Y": "+22.04%",
  ALL: "+32.60%",
}

export default function InvestmentsPortfolioTemplate() {
  const [timeframe, setTimeframe] = React.useState<Timeframe>("1M")
  const data = SERIES[timeframe]
  const max = Math.max(...data)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Ledgerline</span>
          </div>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            <Button variant="secondary" size="sm">Portfolio</Button>
            <Button variant="ghost" size="sm">Research</Button>
            <Button variant="ghost" size="sm">Transfers</Button>
            <Button variant="ghost" size="sm">Reports</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Investment Portfolio</h1>
            <p className="text-sm text-muted-foreground">Last synced 2 minutes ago · 6 accounts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Export</Button>
            <Button size="sm">
              <Plus className="mr-1.5 h-4 w-4" /> Add funds
            </Button>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <CardDescription>{kpi.label}</CardDescription>
                <CardTitle className="text-2xl tabular-nums">{kpi.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn("flex items-center gap-1 text-xs font-medium", kpi.up ? "text-primary" : "text-destructive")}>
                  {kpi.up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {kpi.sub}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div>
                <CardTitle>Performance</CardTitle>
                <CardDescription className="mt-1 flex items-center gap-2">
                  <span className="text-base font-semibold text-primary tabular-nums">{TF_DELTA[timeframe]}</span>
                  <span>over {timeframe}</span>
                </CardDescription>
              </div>
              <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as Timeframe)}>
                <TabsList>
                  {TIMEFRAMES.map((tf) => (
                    <TabsTrigger key={tf} value={tf} className="px-2.5 text-xs">{tf}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-1.5 sm:gap-2">
                {data.map((v, i) => (
                  <div key={i} className="flex flex-1 flex-col justify-end">
                    <div
                      className="w-full rounded-t-md bg-primary/80 transition-all duration-500 ease-out hover:bg-primary"
                      style={{ height: (v / max) * 100 + "%" }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>Open</span>
                <span>Close</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allocation</CardTitle>
              <CardDescription>Breakdown by asset class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ALLOCATION.map((a) => (
                <div key={a.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">{a.label}</span>
                    <span className="text-muted-foreground tabular-nums">{a.pct}% · {a.amount}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: a.pct + "%" }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Holdings</CardTitle>
                <CardDescription>6 positions across all accounts</CardDescription>
              </div>
              <Button variant="ghost" size="icon" aria-label="Holdings options">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                    <TableHead className="text-right">Today</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {HOLDINGS.map((h) => (
                    <TableRow key={h.symbol}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-xs font-semibold">
                            {h.symbol.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium">{h.symbol}</div>
                            <div className="truncate text-xs text-muted-foreground">{h.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{h.shares}</TableCell>
                      <TableCell className="text-right tabular-nums">{h.price}</TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{h.value}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className={cn("tabular-nums", h.change >= 0 ? "text-primary" : "text-destructive")}>
                          {h.changeLabel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <CardTitle>Watchlist</CardTitle>
              </div>
              <Button variant="ghost" size="icon" aria-label="Add to watchlist">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-1">
              {WATCHLIST.map((w, i) => (
                <React.Fragment key={w.symbol}>
                  {i > 0 && <Separator />}
                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="text-sm font-medium">{w.symbol}</div>
                      <div className="text-xs text-muted-foreground">{w.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium tabular-nums">{w.price}</div>
                      <div className={cn("flex items-center justify-end gap-0.5 text-xs font-medium tabular-nums", w.change >= 0 ? "text-primary" : "text-destructive")}>
                        {w.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {w.changeLabel}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
              <Button variant="outline" size="sm" className="mt-2 w-full">
                View research <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2026 Ledgerline. Investing involves risk, including loss of principal.</span>
          <span>Market data delayed 15 minutes.</span>
        </div>
      </footer>
    </div>
  )
}
