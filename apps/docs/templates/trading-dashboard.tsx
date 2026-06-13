"use client"
import * as React from "react"
import { TrendingUp, TrendingDown, Search, Bell, Wallet, ArrowUpRight, ArrowDownRight, Settings, LineChart, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

type Asset = {
  symbol: string
  name: string
  price: number
  change: number
  spark: number[]
}

const WATCHLIST: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", price: 67421.55, change: 2.84, spark: [38, 42, 40, 47, 44, 52, 49, 58, 55, 63, 67, 72] },
  { symbol: "ETH", name: "Ethereum", price: 3512.18, change: 1.42, spark: [44, 41, 46, 43, 49, 47, 52, 50, 55, 53, 58, 61] },
  { symbol: "SOL", name: "Solana", price: 148.92, change: -3.17, spark: [70, 66, 68, 60, 62, 55, 57, 50, 48, 44, 41, 38] },
  { symbol: "AAPL", name: "Apple Inc.", price: 214.07, change: 0.62, spark: [50, 51, 49, 52, 53, 51, 54, 55, 53, 56, 57, 58] },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 121.44, change: 4.91, spark: [30, 34, 33, 40, 44, 42, 51, 56, 60, 66, 71, 78] },
  { symbol: "TSLA", name: "Tesla Inc.", price: 182.63, change: -1.08, spark: [60, 58, 61, 57, 59, 54, 56, 52, 53, 50, 51, 48] },
]

const TIMEFRAMES = ["1H", "1D", "1W", "1M", "1Y"] as const

type Position = {
  symbol: string
  side: "Long" | "Short"
  size: string
  entry: number
  mark: number
  pnl: number
}

const POSITIONS: Position[] = [
  { symbol: "BTC", side: "Long", size: "0.42 BTC", entry: 64120.0, mark: 67421.55, pnl: 1386.65 },
  { symbol: "ETH", side: "Long", size: "3.10 ETH", entry: 3580.4, mark: 3512.18, pnl: -211.48 },
  { symbol: "NVDA", side: "Long", size: "120 sh", entry: 110.2, mark: 121.44, pnl: 1348.8 },
  { symbol: "SOL", side: "Short", size: "85 SOL", entry: 156.7, mark: 148.92, pnl: 661.3 },
]

function fmtUsd(n: number, max = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: max })
}

function Sparkline({ points, up }: { points: number[]; up: boolean }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 100
  const h = 36
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((p - min) / range) * h
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const line = coords.join(" ")
  const area = `0,${h} ${line} ${w},${h}`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
      <polygon points={area} className={cn(up ? "fill-primary/10" : "fill-destructive/10")} />
      <polyline
        points={line}
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={cn(up ? "stroke-primary" : "stroke-destructive")}
      />
    </svg>
  )
}

export default function TradingDashboard() {
  const [selected, setSelected] = React.useState<Asset>(WATCHLIST[0])
  const [timeframe, setTimeframe] = React.useState<(typeof TIMEFRAMES)[number]>("1D")
  const [side, setSide] = React.useState<"buy" | "sell">("buy")
  const [amount, setAmount] = React.useState("0.25")

  const up = selected.change >= 0
  const amountNum = parseFloat(amount) || 0
  const estTotal = amountNum * selected.price

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <aside className="hidden w-16 flex-col items-center gap-6 border-r bg-card py-6 lg:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LineChart className="h-5 w-5" />
        </div>
        <nav className="flex flex-col items-center gap-2">
          <Button variant="secondary" size="icon" aria-label="Markets">
            <TrendingUp className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wallet">
            <Wallet className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Watchlist">
            <Star className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background/95 px-4 py-3 backdrop-blur sm:px-6">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Trading Desk</h1>
            <p className="text-xs text-muted-foreground">Live markets · spot & futures</p>
          </div>
          <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search assets" aria-label="Search assets" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
        </header>

        <main className="grid flex-1 grid-cols-1 gap-4 p-4 sm:p-6 xl:grid-cols-12">
          <section className="xl:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base">Watchlist</CardTitle>
                <CardDescription>Tap an asset to load it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {WATCHLIST.map((a) => {
                  const isUp = a.change >= 0
                  const active = a.symbol === selected.symbol
                  return (
                    <button
                      key={a.symbol}
                      onClick={() => setSelected(a)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors",
                        active ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"
                      )}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-xs font-semibold">
                        {a.symbol.slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-tight">{a.symbol}</p>
                        <p className="truncate text-xs text-muted-foreground">{a.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium tabular-nums">${fmtUsd(a.price)}</p>
                        <Badge
                          variant="outline"
                          className={cn(
                            "mt-0.5 gap-0.5 px-1.5 py-0 text-xs tabular-nums",
                            isUp ? "text-primary" : "text-destructive"
                          )}
                        >
                          {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {Math.abs(a.change).toFixed(2)}%
                        </Badge>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4 xl:col-span-6">
            <Card>
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">{selected.symbol}</CardTitle>
                    <span className="text-sm text-muted-foreground">{selected.name}</span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-3xl font-semibold tabular-nums">${fmtUsd(selected.price)}</span>
                    <span
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium tabular-nums",
                        up ? "text-primary" : "text-destructive"
                      )}
                    >
                      {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      {up ? "+" : "-"}
                      {Math.abs(selected.change).toFixed(2)}%
                    </span>
                  </div>
                </div>
                <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as (typeof TIMEFRAMES)[number])}>
                  <TabsList>
                    {TIMEFRAMES.map((t) => (
                      <TabsTrigger key={t} value={t} className="px-3 text-xs">
                        {t}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="h-56 w-full rounded-lg border bg-muted/30 p-3">
                  <Sparkline points={selected.spark} up={up} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">24h High</p>
                    <p className="font-medium tabular-nums">${fmtUsd(selected.price * 1.04)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">24h Low</p>
                    <p className="font-medium tabular-nums">${fmtUsd(selected.price * 0.96)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">24h Volume</p>
                    <p className="font-medium tabular-nums">$1.82B</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Mkt Cap</p>
                    <p className="font-medium tabular-nums">$48.6B</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Open Positions</CardTitle>
                <CardDescription>4 active · unrealized P&L $3,185.27</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Asset</TableHead>
                      <TableHead>Side</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead className="text-right">Entry</TableHead>
                      <TableHead className="text-right">Mark</TableHead>
                      <TableHead className="text-right">P&L</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {POSITIONS.map((p) => {
                      const isUp = p.pnl >= 0
                      return (
                        <TableRow key={p.symbol}>
                          <TableCell className="font-medium">{p.symbol}</TableCell>
                          <TableCell>
                            <Badge variant={p.side === "Long" ? "secondary" : "outline"}>{p.side}</Badge>
                          </TableCell>
                          <TableCell className="tabular-nums">{p.size}</TableCell>
                          <TableCell className="text-right tabular-nums">${fmtUsd(p.entry)}</TableCell>
                          <TableCell className="text-right tabular-nums">${fmtUsd(p.mark)}</TableCell>
                          <TableCell
                            className={cn("text-right font-medium tabular-nums", isUp ? "text-primary" : "text-destructive")}
                          >
                            {isUp ? "+" : "-"}${fmtUsd(Math.abs(p.pnl))}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          <section className="xl:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base">Order Ticket</CardTitle>
                <CardDescription>{selected.symbol} · Market order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={side === "buy" ? "default" : "outline"}
                    onClick={() => setSide("buy")}
                    className={cn(side === "buy" && "bg-primary text-primary-foreground")}
                  >
                    Buy
                  </Button>
                  <Button
                    variant={side === "sell" ? "destructive" : "outline"}
                    onClick={() => setSide("sell")}
                  >
                    Sell
                  </Button>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="amount">Amount ({selected.symbol})</Label>
                  <Input
                    id="amount"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {["25%", "50%", "75%", "Max"].map((q) => (
                    <Button key={q} variant="secondary" size="sm" className="text-xs">
                      {q}
                    </Button>
                  ))}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="price">Limit Price (USD)</Label>
                  <Input id="price" inputMode="decimal" defaultValue={fmtUsd(selected.price)} />
                </div>

                <Separator />

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Total</span>
                    <span className="font-medium tabular-nums">${fmtUsd(estTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Fee (0.10%)</span>
                    <span className="font-medium tabular-nums">${fmtUsd(estTotal * 0.001)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-medium tabular-nums">$24,810.00</span>
                  </div>
                </div>

                <Button
                  className={cn("w-full", side === "sell" && "bg-destructive text-primary-foreground hover:bg-destructive/90")}
                  size="lg"
                  variant={side === "buy" ? "default" : "destructive"}
                >
                  {side === "buy" ? "Buy" : "Sell"} {selected.symbol}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Orders execute at best available market price.
                </p>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}
