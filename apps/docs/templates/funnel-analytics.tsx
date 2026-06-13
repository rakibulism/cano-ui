"use client"

import * as React from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Gauge,
  TrendingDown,
  Users,
  Workflow,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Step = {
  name: string
  detail: string
  users: number
  dropoff: number
  median: string
}

type Funnel = {
  key: string
  label: string
  entered: string
  converted: string
  rate: string
  rateDelta: number
  avgTime: string
  biggestDrop: string
  steps: Step[]
}

const SEGMENTS = ["All visitors", "New users", "Returning", "Mobile", "Paid traffic"] as const
type Segment = (typeof SEGMENTS)[number]

const FUNNELS: Funnel[] = [
  {
    key: "signup",
    label: "Signup",
    entered: "48,920",
    converted: "9,142",
    rate: "18.7%",
    rateDelta: 2.3,
    avgTime: "3m 12s",
    biggestDrop: "Verify email",
    steps: [
      { name: "Landing page", detail: "Visited marketing page", users: 48920, dropoff: 0, median: "0s" },
      { name: "Started signup", detail: "Opened the form", users: 26104, dropoff: 46.6, median: "41s" },
      { name: "Submitted details", detail: "Completed all fields", users: 17388, dropoff: 33.4, median: "1m 18s" },
      { name: "Verify email", detail: "Clicked confirmation link", users: 11206, dropoff: 35.6, median: "2m 04s" },
      { name: "Account created", detail: "Reached dashboard", users: 9142, dropoff: 18.4, median: "3m 12s" },
    ],
  },
  {
    key: "checkout",
    label: "Checkout",
    entered: "21,540",
    converted: "6,287",
    rate: "29.2%",
    rateDelta: -1.4,
    avgTime: "2m 47s",
    biggestDrop: "Payment info",
    steps: [
      { name: "Cart viewed", detail: "Opened the cart", users: 21540, dropoff: 0, median: "0s" },
      { name: "Checkout started", detail: "Hit checkout button", users: 15078, dropoff: 30.0, median: "22s" },
      { name: "Shipping added", detail: "Entered address", users: 10832, dropoff: 28.2, median: "1m 05s" },
      { name: "Payment info", detail: "Entered card details", users: 7415, dropoff: 31.5, median: "2m 11s" },
      { name: "Order placed", detail: "Confirmed purchase", users: 6287, dropoff: 15.2, median: "2m 47s" },
    ],
  },
  {
    key: "onboarding",
    label: "Onboarding",
    entered: "9,142",
    converted: "4,015",
    rate: "43.9%",
    rateDelta: 5.1,
    avgTime: "6m 38s",
    biggestDrop: "Invite team",
    steps: [
      { name: "Welcome screen", detail: "Started onboarding", users: 9142, dropoff: 0, median: "0s" },
      { name: "Profile setup", detail: "Added name & role", users: 7836, dropoff: 14.3, median: "48s" },
      { name: "Connected data", detail: "Linked a source", users: 6021, dropoff: 23.2, median: "2m 30s" },
      { name: "Invite team", detail: "Sent invites", users: 4587, dropoff: 23.8, median: "4m 50s" },
      { name: "Activated", detail: "Completed setup", users: 4015, dropoff: 12.5, median: "6m 38s" },
    ],
  },
]

function fmt(n: number): string {
  return n.toLocaleString("en-US")
}

export default function FunnelAnalyticsTemplate() {
  const [active, setActive] = React.useState<string>(FUNNELS[0].key)
  const [segment, setSegment] = React.useState<Segment>("All visitors")

  const funnel = FUNNELS.find((f) => f.key === active) ?? FUNNELS[0]
  const maxUsers = funnel.steps[0].users

  const kpis = [
    { label: "Entered funnel", value: funnel.entered, icon: Users, delta: 4.2 },
    { label: "Converted", value: funnel.converted, icon: Gauge, delta: funnel.rateDelta },
    { label: "Conversion rate", value: funnel.rate, icon: Workflow, delta: funnel.rateDelta },
    { label: "Avg. time to convert", value: funnel.avgTime, icon: Calendar, delta: -0.8 },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Workflow className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Funnelscope</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <span className="rounded-md bg-accent px-2.5 py-1 font-medium text-foreground">Funnels</span>
            <span className="rounded-md px-2.5 py-1">Cohorts</span>
            <span className="rounded-md px-2.5 py-1">Events</span>
            <span className="rounded-md px-2.5 py-1">Reports</span>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Calendar className="h-4 w-4" />
              Last 30 days
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Conversion funnels</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track how users move through your key flows and find where they drop off.
            </p>
          </div>
          <Badge variant="secondary" className="w-fit gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Live data
          </Badge>
        </div>

        <Tabs value={active} onValueChange={setActive} className="mt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              {FUNNELS.map((f) => (
                <TabsTrigger key={f.key} value={f.key}>
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
              {SEGMENTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSegment(s)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    segment === s
                      ? "border-primary bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {FUNNELS.map((f) => (
            <TabsContent key={f.key} value={f.key} className="mt-6 space-y-6">
              <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {kpis.map((k) => {
                  const Icon = k.icon
                  const up = k.delta >= 0
                  return (
                    <Card key={k.label}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardDescription className="text-xs">{k.label}</CardDescription>
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-2xl tabular-nums">{k.value}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs font-medium",
                            up ? "text-primary" : "text-destructive"
                          )}
                        >
                          {up ? (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDownRight className="h-3.5 w-3.5" />
                          )}
                          {Math.abs(k.delta)}% vs. prior period
                        </span>
                      </CardContent>
                    </Card>
                  )
                })}
              </section>

              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{f.label} funnel</CardTitle>
                        <CardDescription>
                          {segment} &middot; {f.steps.length} steps
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="gap-1 text-destructive">
                        <TrendingDown className="h-3.5 w-3.5" />
                        Drop at {f.biggestDrop}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {f.steps.map((step, i) => {
                      const pct = Math.round((step.users / maxUsers) * 100)
                      return (
                        <div key={step.name}>
                          <div className="mb-1 flex items-baseline justify-between text-sm">
                            <span className="font-medium">
                              <span className="mr-2 text-xs text-muted-foreground tabular-nums">
                                {i + 1}
                              </span>
                              {step.name}
                            </span>
                            <span className="tabular-nums text-muted-foreground">
                              {fmt(step.users)} &middot; {pct}%
                            </span>
                          </div>
                          <div className="h-9 w-full overflow-hidden rounded-md bg-muted">
                            <div
                              className="flex h-full items-center rounded-md bg-primary/80 px-3 text-xs font-medium text-primary-foreground transition-all"
                              style={{ width: `${Math.max(pct, 6)}%` }}
                            >
                              <span className="truncate">{step.detail}</span>
                            </div>
                          </div>
                          {step.dropoff > 0 && (
                            <div className="mt-1 flex items-center gap-1.5 pl-0.5 text-xs text-destructive">
                              <ArrowDownRight className="h-3.5 w-3.5" />
                              {step.dropoff}% drop-off from previous step
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Summary</CardTitle>
                    <CardDescription>End-to-end performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Overall conversion</span>
                      <span className="font-semibold tabular-nums">{f.rate}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total entered</span>
                      <span className="tabular-nums">{f.entered}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total converted</span>
                      <span className="tabular-nums">{f.converted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg. completion</span>
                      <span className="tabular-nums">{f.avgTime}</span>
                    </div>
                    <Separator />
                    <div className="rounded-md bg-muted/30 p-3">
                      <p className="text-xs font-medium">Biggest opportunity</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        The <span className="font-medium text-foreground">{f.biggestDrop}</span> step
                        loses the most users. Reducing friction here could lift conversion meaningfully.
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View step details
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Step breakdown</CardTitle>
                  <CardDescription>Users, conversion and timing for each step</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Step</TableHead>
                        <TableHead className="text-right">Users</TableHead>
                        <TableHead className="text-right">Step rate</TableHead>
                        <TableHead className="text-right">Drop-off</TableHead>
                        <TableHead className="text-right">Median time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {f.steps.map((step) => {
                        const stepRate = Math.round((step.users / maxUsers) * 100)
                        return (
                          <TableRow key={step.name}>
                            <TableCell>
                              <div className="font-medium">{step.name}</div>
                              <div className="text-xs text-muted-foreground">{step.detail}</div>
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{fmt(step.users)}</TableCell>
                            <TableCell className="text-right tabular-nums">{stepRate}%</TableCell>
                            <TableCell className="text-right tabular-nums">
                              {step.dropoff > 0 ? (
                                <span className="text-destructive">{step.dropoff}%</span>
                              ) : (
                                <span className="text-muted-foreground">&mdash;</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right tabular-nums text-muted-foreground">
                              {step.median}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-muted-foreground sm:flex-row">
          <span>&copy; 2026 Funnelscope Analytics</span>
          <span>Data refreshed every 15 minutes</span>
        </div>
      </footer>
    </div>
  )
}
