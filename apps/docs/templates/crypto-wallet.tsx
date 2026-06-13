"use client"

import * as React from "react"
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Bitcoin,
  ChevronDown,
  Copy,
  Eye,
  Repeat,
  Settings,
  Sparkles,
  TrendingDown,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const TIMEFRAMES = ["24H", "1W", "1M", "1Y", "ALL"] as const
type Timeframe = (typeof TIMEFRAMES)[number]

type PortfolioStat = { balance: string; change: string; changePct: number; up: boolean }

const PORTFOLIO: Record<Timeframe, PortfolioStat> = {
  "24H": { balance: "$84,213.57", change: "+$1,902.44", changePct: 2.31, up: true },
  "1W": { balance: "$84,213.57", change: "-$3,118.09", changePct: -3.57, up: false },
  "1M": { balance: "$84,213.57", change: "+$9,640.21", changePct: 12.94, up: true },
  "1Y": { balance: "$84,213.57", change: "+$41,508.77", changePct: 97.21, up: true },
  ALL: { balance: "$84,213.57", change: "+$62,890.33", changePct: 294.9, up: true },
}

const SPARKS: Record<Timeframe, number[]> = {
  "24H": [42, 48, 45, 52, 49, 58, 55, 61, 64, 60, 68, 72],
  "1W": [60, 58, 62, 55, 50, 48, 52, 46, 44, 49, 47, 45],
  "1M": [30, 34, 40, 38, 46, 52, 50, 58, 63, 67, 72, 78],
  "1Y": [10, 18, 15, 28, 35, 30, 44, 52, 60, 71, 80, 92],
  ALL: [5, 12, 22, 30, 41, 38, 55, 64, 70, 82, 88, 96],
}

type Asset = {
  symbol: string
  name: string
  icon: string
  holdings: string
  fiat: string
  price: string
  change: number
  alloc: number
}

const ASSETS: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", holdings: "0.9124", fiat: "$38,940.11", price: "$42,678.20", change: 2.84, alloc: 46 },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", holdings: "9.412", fiat: "$24,108.55", price: "$2,561.30", change: 1.12, alloc: 29 },
  { symbol: "SOL", name: "Solana", icon: "◎", holdings: "112.5", fiat: "$11,250.00", price: "$100.00", change: -4.36, alloc: 13 },
  { symbol: "LINK", name: "Chainlink", icon: "⬡", holdings: "640.0", fiat: "$6,720.00", price: "$10.50", change: 5.91, alloc: 8 },
  { symbol: "USDC", name: "USD Coin", icon: "$", holdings: "3,194.91", fiat: "$3,194.91", price: "$1.00", change: 0.01, alloc: 4 },
]

function ChangeBadge({ value }: { value: number }) {
  const up = value >= 0
  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 font-medium tabular-nums",
        up ? "border-primary/30 bg-primary/10 text-primary" : "border-destructive/30 text-destructive"
      )}
    >
      {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
      {up ? "+" : ""}
      {value.toFixed(2)}%
    </Badge>
  )
}

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - ((v - min) / range) * 100
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-24 w-full">
      <polyline
        points={pts}
        fill="none"
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        className={up ? "stroke-primary" : "stroke-destructive"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function CryptoWallet() {
  const [timeframe, setTimeframe] = React.useState<Timeframe>("24H")
  const [hidden, setHidden] = React.useState(false)
  const stat = PORTFOLIO[timeframe]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Wallet className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Vaultcoin</span>
          </div>
          <nav className="ml-6 hidden items-center gap-1 text-sm md:flex">
            {["Portfolio", "Trade", "Earn", "Activity"].map((item, i) => (
              <Button key={item} variant={i === 0 ? "secondary" : "ghost"} size="sm">
                {item}
              </Button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden gap-2 font-mono sm:flex">
              0xA1c4...9F2b
              <Copy className="size-3.5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="size-5" />
            </Button>
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
              <div className="space-y-1">
                <CardDescription className="flex items-center gap-2">
                  <Bitcoin className="size-4" /> Total balance
                </CardDescription>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-4xl tabular-nums tracking-tight">
                    {hidden ? "••••••••" : stat.balance}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    aria-label="Toggle balance visibility"
                    onClick={() => setHidden((h) => !h)}
                  >
                    <Eye className="size-4" />
                  </Button>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-medium tabular-nums",
                    stat.up ? "text-primary" : "text-destructive"
                  )}
                >
                  {stat.up ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                  {stat.change} ({stat.up ? "+" : ""}
                  {stat.changePct.toFixed(2)}%)
                  <span className="text-muted-foreground">· past {timeframe}</span>
                </div>
              </div>
              <div className="flex rounded-lg border bg-muted/30 p-0.5">
                {TIMEFRAMES.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-medium tabular-nums transition-colors",
                      timeframe === tf
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Sparkline data={SPARKS[timeframe]} up={stat.up} />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Button className="gap-2">
                  <ArrowUpRight className="size-4" /> Send
                </Button>
                <Button variant="secondary" className="gap-2">
                  <ArrowDownLeft className="size-4" /> Receive
                </Button>
                <Button variant="outline" className="gap-2">
                  <Repeat className="size-4" /> Swap
                </Button>
                <Button variant="outline" className="gap-2">
                  <Bitcoin className="size-4" /> Buy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Allocation</CardTitle>
              <CardDescription>Across 5 assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ASSETS.map((a) => (
                <div key={a.symbol} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs">
                        {a.icon}
                      </span>
                      {a.symbol}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{a.alloc}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${a.alloc}%` }}
                    />
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
                <Sparkles className="mt-0.5 size-4 shrink-0" />
                <p>Your portfolio is up 12.94% this month, outperforming the market index.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Your assets</CardTitle>
              <CardDescription>Holdings, live price and 24h change</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5">
              Market <ChevronDown className="size-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead className="text-right">Holdings</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">24h</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ASSETS.map((a) => (
                  <TableRow key={a.symbol}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full bg-muted text-base">
                          {a.icon}
                        </span>
                        <div className="leading-tight">
                          <div className="font-medium">{a.name}</div>
                          <div className="text-xs text-muted-foreground">{a.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <div className="font-medium">{a.holdings}</div>
                      <div className="text-xs text-muted-foreground">{a.symbol}</div>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{a.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end">
                        <ChangeBadge value={a.change} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold tabular-nums">{a.fiat}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2026 Vaultcoin. Non-custodial wallet.</span>
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary" /> Network: synced
          </span>
        </div>
      </footer>
    </div>
  )
}
