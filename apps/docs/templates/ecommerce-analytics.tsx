"use client"
import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Calendar,
  Download,
  Globe,
  Mail,
  Search,
  Settings,
  ShoppingCart,
  Store,
  Target,
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

type RangeKey = "7d" | "30d" | "90d" | "12m"

const RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
  { key: "12m", label: "12 months" },
]

type Kpi = {
  label: string
  value: string
  delta: string
  up: boolean
  icon: React.ComponentType<{ className?: string }>
}

const KPIS: Record<RangeKey, Kpi[]> = {
  "7d": [
    { label: "Revenue", value: "$48,210", delta: "+6.4%", up: true, icon: BarChart3 },
    { label: "Orders", value: "1,184", delta: "+3.1%", up: true, icon: ShoppingCart },
    { label: "Avg. order value", value: "$40.72", delta: "+2.0%", up: true, icon: Target },
    { label: "Conversion", value: "3.12%", delta: "-0.4%", up: false, icon: Store },
  ],
  "30d": [
    { label: "Revenue", value: "$214,980", delta: "+11.2%", up: true, icon: BarChart3 },
    { label: "Orders", value: "5,402", delta: "+8.7%", up: true, icon: ShoppingCart },
    { label: "Avg. order value", value: "$39.80", delta: "+1.4%", up: true, icon: Target },
    { label: "Conversion", value: "2.98%", delta: "-0.9%", up: false, icon: Store },
  ],
  "90d": [
    { label: "Revenue", value: "$612,440", delta: "+14.8%", up: true, icon: BarChart3 },
    { label: "Orders", value: "15,930", delta: "+12.3%", up: true, icon: ShoppingCart },
    { label: "Avg. order value", value: "$38.45", delta: "-0.6%", up: false, icon: Target },
    { label: "Conversion", value: "3.05%", delta: "+0.7%", up: true, icon: Store },
  ],
  "12m": [
    { label: "Revenue", value: "$2.41M", delta: "+22.5%", up: true, icon: BarChart3 },
    { label: "Orders", value: "61,208", delta: "+18.9%", up: true, icon: ShoppingCart },
    { label: "Avg. order value", value: "$39.41", delta: "+3.0%", up: true, icon: Target },
    { label: "Conversion", value: "2.91%", delta: "+1.1%", up: true, icon: Store },
  ],
}

const CHART: Record<RangeKey, { label: string; value: number }[]> = {
  "7d": [
    { label: "Mon", value: 42 },
    { label: "Tue", value: 58 },
    { label: "Wed", value: 71 },
    { label: "Thu", value: 64 },
    { label: "Fri", value: 88 },
    { label: "Sat", value: 96 },
    { label: "Sun", value: 67 },
  ],
  "30d": [
    { label: "W1", value: 52 },
    { label: "W2", value: 64 },
    { label: "W3", value: 78 },
    { label: "W4", value: 91 },
    { label: "W5", value: 73 },
    { label: "W6", value: 84 },
    { label: "W7", value: 99 },
  ],
  "90d": [
    { label: "Jan", value: 61 },
    { label: "Feb", value: 54 },
    { label: "Mar", value: 72 },
    { label: "Apr", value: 80 },
    { label: "May", value: 88 },
    { label: "Jun", value: 76 },
    { label: "Jul", value: 94 },
  ],
  "12m": [
    { label: "Q1", value: 66 },
    { label: "Q2", value: 71 },
    { label: "Q3", value: 58 },
    { label: "Q4", value: 100 },
    { label: "Q5", value: 82 },
    { label: "Q6", value: 90 },
    { label: "Q7", value: 95 },
  ],
}

type Product = { name: string; sku: string; units: number; revenue: string; share: number }

const PRODUCTS: Record<RangeKey, Product[]> = {
  "7d": [
    { name: "Aurora Wireless Buds", sku: "AWB-22", units: 312, revenue: "$12,480", share: 26 },
    { name: "Terra Travel Mug", sku: "TTM-09", units: 286, revenue: "$8,580", share: 18 },
    { name: "Lumen Desk Lamp", sku: "LDL-14", units: 204, revenue: "$7,140", share: 15 },
    { name: "Drift Cotton Tee", sku: "DCT-31", units: 488, revenue: "$6,832", share: 14 },
    { name: "Pulse Fitness Band", sku: "PFB-07", units: 142, revenue: "$5,680", share: 12 },
  ],
  "30d": [
    { name: "Aurora Wireless Buds", sku: "AWB-22", units: 1408, revenue: "$56,320", share: 28 },
    { name: "Lumen Desk Lamp", sku: "LDL-14", units: 902, revenue: "$31,570", share: 17 },
    { name: "Terra Travel Mug", sku: "TTM-09", units: 1120, revenue: "$33,600", share: 16 },
    { name: "Pulse Fitness Band", sku: "PFB-07", units: 610, revenue: "$24,400", share: 13 },
    { name: "Drift Cotton Tee", sku: "DCT-31", units: 1940, revenue: "$27,160", share: 11 },
  ],
  "90d": [
    { name: "Aurora Wireless Buds", sku: "AWB-22", units: 4120, revenue: "$164,800", share: 29 },
    { name: "Lumen Desk Lamp", sku: "LDL-14", units: 2680, revenue: "$93,800", share: 18 },
    { name: "Pulse Fitness Band", sku: "PFB-07", units: 1815, revenue: "$72,600", share: 15 },
    { name: "Terra Travel Mug", sku: "TTM-09", units: 3210, revenue: "$96,300", share: 14 },
    { name: "Drift Cotton Tee", sku: "DCT-31", units: 5460, revenue: "$76,440", share: 10 },
  ],
  "12m": [
    { name: "Aurora Wireless Buds", sku: "AWB-22", units: 16240, revenue: "$649,600", share: 31 },
    { name: "Lumen Desk Lamp", sku: "LDL-14", units: 9870, revenue: "$345,450", share: 19 },
    { name: "Pulse Fitness Band", sku: "PFB-07", units: 7120, revenue: "$284,800", share: 14 },
    { name: "Terra Travel Mug", sku: "TTM-09", units: 12680, revenue: "$380,400", share: 13 },
    { name: "Drift Cotton Tee", sku: "DCT-31", units: 21340, revenue: "$298,760", share: 9 },
  ],
}

type Source = { name: string; pct: number; icon: React.ComponentType<{ className?: string }> }

const SOURCES: Record<RangeKey, Source[]> = {
  "7d": [
    { name: "Organic search", pct: 38, icon: Search },
    { name: "Direct", pct: 24, icon: Globe },
    { name: "Email", pct: 21, icon: Mail },
    { name: "Paid social", pct: 17, icon: Target },
  ],
  "30d": [
    { name: "Organic search", pct: 41, icon: Search },
    { name: "Direct", pct: 22, icon: Globe },
    { name: "Paid social", pct: 20, icon: Target },
    { name: "Email", pct: 17, icon: Mail },
  ],
  "90d": [
    { name: "Organic search", pct: 44, icon: Search },
    { name: "Paid social", pct: 21, icon: Target },
    { name: "Direct", pct: 19, icon: Globe },
    { name: "Email", pct: 16, icon: Mail },
  ],
  "12m": [
    { name: "Organic search", pct: 46, icon: Search },
    { name: "Direct", pct: 21, icon: Globe },
    { name: "Paid social", pct: 18, icon: Target },
    { name: "Email", pct: 15, icon: Mail },
  ],
}

export default function EcommerceAnalytics() {
  const [range, setRange] = React.useState<RangeKey>("30d")

  const kpis = KPIS[range]
  const chart = CHART[range]
  const products = PRODUCTS[range]
  const sources = SOURCES[range]
  const maxBar = Math.max(...chart.map((c) => c.value))
  const activeLabel = RANGES.find((r) => r.key === range)?.label ?? ""

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Marketview</p>
              <p className="text-xs text-muted-foreground">Store analytics</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 text-sm md:flex" aria-label="Primary">
            <a className="rounded-md bg-accent px-3 py-1.5 font-medium" href="#">Overview</a>
            <a className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground" href="#">Orders</a>
            <a className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground" href="#">Customers</a>
            <a className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground" href="#">Products</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Performance overview</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Showing the last {activeLabel} of store activity
            </p>
          </div>
          <div
            className="inline-flex rounded-lg border bg-muted/30 p-1"
            role="group"
            aria-label="Date range"
          >
            {RANGES.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRange(r.key)}
                aria-pressed={range === r.key}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  range === r.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{kpi.label}</CardDescription>
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <kpi.icon className="h-4 w-4" />
                  </span>
                </div>
                <CardTitle className="text-2xl">{kpi.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium",
                    kpi.up ? "text-primary" : "text-destructive"
                  )}
                >
                  {kpi.up ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {kpi.delta}
                  <span className="text-muted-foreground">vs prev. period</span>
                </span>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales by period</CardTitle>
              <CardDescription>Gross sales index for the last {activeLabel}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-2 sm:gap-3">
                {chart.map((bar) => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className="w-full rounded-t-md bg-primary/20 transition-all"
                        style={{ height: `${(bar.value / maxBar) * 100}%` }}
                      >
                        <div className="h-full w-full rounded-t-md bg-primary/80" />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{bar.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Traffic sources</CardTitle>
              <CardDescription>Where converting visitors came from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {sources.map((source) => (
                <div key={source.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <source.icon className="h-4 w-4 text-muted-foreground" />
                      {source.name}
                    </span>
                    <span className="text-muted-foreground">{source.pct}%</span>
                  </div>
                  <Progress value={source.pct} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top products</CardTitle>
                <CardDescription>Best sellers across the last {activeLabel}</CardDescription>
              </div>
              <Badge variant="secondary">{products.length} items</Badge>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead className="text-right">Units</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="hidden text-right sm:table-cell">Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.sku}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="text-muted-foreground">{p.sku}</TableCell>
                      <TableCell className="text-right tabular-nums">{p.units.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{p.revenue}</TableCell>
                      <TableCell className="hidden text-right sm:table-cell">
                        <span className="inline-flex items-center gap-2">
                          <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-muted md:inline-block">
                            <span
                              className="block h-full rounded-full bg-primary"
                              style={{ width: `${p.share}%` }}
                            />
                          </span>
                          <span className="tabular-nums text-muted-foreground">{p.share}%</span>
                        </span>
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
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>Marketview Analytics</p>
          <p>Data refreshed every 15 minutes</p>
        </div>
      </footer>
    </div>
  )
}
