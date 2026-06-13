"use client"

import * as React from "react"
import {
  BarChart3,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  MousePointerClick,
  Percent,
  Sparkles,
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
  CardAction,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

type ModelKey = "first" | "last" | "linear"

const MODELS: { key: ModelKey; label: string; blurb: string }[] = [
  { key: "first", label: "First touch", blurb: "Full credit to the first interaction in the journey." },
  { key: "last", label: "Last touch", blurb: "Full credit to the final touch before conversion." },
  { key: "linear", label: "Linear", blurb: "Credit split evenly across every touchpoint." },
]

// Per-channel weighted share of attributed revenue under each model.
const CHANNELS: {
  name: string
  weights: Record<ModelKey, number>
  conversions: number
  cpa: string
}[] = [
  { name: "Paid Search", weights: { first: 22, last: 38, linear: 29 }, conversions: 1840, cpa: "$41.20" },
  { name: "Organic Search", weights: { first: 31, last: 14, linear: 23 }, conversions: 2210, cpa: "$0.00" },
  { name: "Paid Social", weights: { first: 18, last: 21, linear: 19 }, conversions: 1320, cpa: "$53.80" },
  { name: "Email", weights: { first: 9, last: 19, linear: 15 }, conversions: 980, cpa: "$6.40" },
  { name: "Referral", weights: { first: 12, last: 5, linear: 9 }, conversions: 640, cpa: "$11.10" },
  { name: "Direct", weights: { first: 8, last: 3, linear: 5 }, conversions: 410, cpa: "$0.00" },
]

const TOTAL_REVENUE = 1284500

const CAMPAIGNS: {
  name: string
  channel: string
  spend: string
  revenue: string
  roas: number
}[] = [
  { name: "Q2 Brand Awareness", channel: "Paid Social", spend: "$48,200", revenue: "$176,900", roas: 3.67 },
  { name: "Branded Search — Always On", channel: "Paid Search", spend: "$31,400", revenue: "$214,300", roas: 6.82 },
  { name: "Retargeting — Cart Abandon", channel: "Paid Social", spend: "$12,800", revenue: "$98,400", roas: 7.69 },
  { name: "Newsletter — Spring Drop", channel: "Email", spend: "$2,100", revenue: "$41,600", roas: 19.81 },
  { name: "Competitor Conquesting", channel: "Paid Search", spend: "$27,900", revenue: "$52,300", roas: 1.87 },
  { name: "Influencer Seeding", channel: "Referral", spend: "$18,500", revenue: "$22,100", roas: 1.19 },
]

function roasVariant(roas: number): "default" | "secondary" | "destructive" {
  if (roas >= 4) return "default"
  if (roas >= 2) return "secondary"
  return "destructive"
}

const KPIS = [
  {
    label: "Attributed Revenue",
    value: "$1.28M",
    delta: "+14.2%",
    up: true,
    icon: DollarSign,
    sub: "vs. previous 90 days",
  },
  {
    label: "Conversions",
    value: "7,400",
    delta: "+8.6%",
    up: true,
    icon: Target,
    sub: "across all channels",
  },
  {
    label: "Avg. Order Value",
    value: "$173.58",
    delta: "+3.1%",
    up: true,
    icon: MousePointerClick,
    sub: "blended AOV",
  },
  {
    label: "Conversion Rate",
    value: "3.42%",
    delta: "-0.4%",
    up: false,
    icon: Percent,
    sub: "session to order",
  },
]

export default function AttributionDashboard() {
  const [model, setModel] = React.useState<ModelKey>("linear")

  const activeModel = MODELS.find((m) => m.key === model)!

  const rankedChannels = React.useMemo(() => {
    return [...CHANNELS]
      .map((c) => ({ ...c, share: c.weights[model] }))
      .sort((a, b) => b.share - a.share)
  }, [model])

  const maxShare = rankedChannels[0]?.share ?? 1
  const topChannel = rankedChannels[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Attributo</p>
              <p className="text-xs text-muted-foreground">Marketing Attribution</p>
            </div>
          </div>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm">Overview</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Channels</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Campaigns</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">Journeys</Button>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <span className="font-medium">Last 90 days</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Filters">
              <Filter className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Attribution Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Revenue and conversion credit by marketing channel.
            </p>
          </div>
          <Badge variant="outline" className="w-fit gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Model: {activeModel.label}
          </Badge>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => {
            const Icon = kpi.icon
            return (
              <Card key={kpi.label}>
                <CardHeader>
                  <CardDescription>{kpi.label}</CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums">
                    {kpi.value}
                  </CardTitle>
                  <CardAction>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 font-medium",
                        kpi.up ? "text-primary" : "text-destructive"
                      )}
                    >
                      {kpi.up ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5" />
                      )}
                      {kpi.delta}
                    </span>
                    <span className="text-muted-foreground">{kpi.sub}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <section className="mt-6">
          <Tabs value={model} onValueChange={(v) => setModel(v as ModelKey)}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Attribution model</h2>
                <p className="text-sm text-muted-foreground">{activeModel.blurb}</p>
              </div>
              <TabsList>
                {MODELS.map((m) => (
                  <TabsTrigger key={m.key} value={m.key}>
                    {m.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {MODELS.map((m) => (
              <TabsContent key={m.key} value={m.key} className="mt-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Channel contribution</CardTitle>
                      <CardDescription>
                        Share of attributed revenue under the {m.label.toLowerCase()} model.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {rankedChannels.map((c) => (
                        <div key={c.name}>
                          <div className="mb-1.5 flex items-baseline justify-between text-sm">
                            <span className="font-medium">{c.name}</span>
                            <span className="tabular-nums text-muted-foreground">
                              {c.share}% &middot;{" "}
                              <span className="text-foreground">
                                ${Math.round((TOTAL_REVENUE * c.share) / 100 / 1000)}k
                              </span>
                            </span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-500"
                              style={{ width: `${(c.share / maxShare) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top channel</CardTitle>
                      <CardDescription>Under {m.label.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-3xl font-semibold tracking-tight">
                          {topChannel.name}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Credited with{" "}
                          <span className="font-medium text-foreground">
                            {topChannel.share}%
                          </span>{" "}
                          of attributed revenue.
                        </p>
                      </div>
                      <Separator />
                      <dl className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Attributed</dt>
                          <dd className="font-medium tabular-nums">
                            ${Math.round((TOTAL_REVENUE * topChannel.share) / 100 / 1000)}k
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Conversions</dt>
                          <dd className="font-medium tabular-nums">
                            {topChannel.conversions.toLocaleString()}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Cost / acq.</dt>
                          <dd className="font-medium tabular-nums">{topChannel.cpa}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel breakdown</CardTitle>
              <CardDescription>
                Re-weighted live as you switch attribution models.
              </CardDescription>
              <CardAction>
                <Badge variant="secondary" className="tabular-nums">
                  {rankedChannels.length} channels
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channel</TableHead>
                      <TableHead className="text-right">Credit share</TableHead>
                      <TableHead className="text-right">Attr. revenue</TableHead>
                      <TableHead className="text-right">Conversions</TableHead>
                      <TableHead className="text-right">CPA</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankedChannels.map((c) => (
                      <TableRow key={c.name}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-muted sm:block">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${(c.share / maxShare) * 100}%` }}
                              />
                            </div>
                            <span className="tabular-nums">{c.share}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          ${Math.round((TOTAL_REVENUE * c.share) / 100 / 1000)}k
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {c.conversions.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {c.cpa}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign performance</CardTitle>
              <CardDescription>Return on ad spend across active campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Channel</TableHead>
                      <TableHead className="text-right">Spend</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">ROAS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {CAMPAIGNS.map((c) => (
                      <TableRow key={c.name}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-muted-foreground">{c.channel}</TableCell>
                        <TableCell className="text-right tabular-nums">{c.spend}</TableCell>
                        <TableCell className="text-right tabular-nums">{c.revenue}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={roasVariant(c.roas)} className="tabular-nums">
                            {c.roas.toFixed(2)}x
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Attributo Analytics &middot; Data refreshed hourly</p>
          <p>Modeled on 90 days of multi-touch journey data</p>
        </div>
      </footer>
    </div>
  )
}
