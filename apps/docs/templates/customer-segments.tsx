"use client"
import * as React from "react"
import { Users, Plus, Filter, Save, Search, Download, ChevronRight, Sparkles, TrendingUp, DollarSign, ShoppingCart, X, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

type Rule = { field: string; op: string; value: string }
type Customer = { name: string; email: string; spend: string; orders: number; status: string; region: string }
type Segment = {
  id: string
  name: string
  description: string
  match: string
  count: number
  growth: string
  revenue: string
  aov: string
  retention: number
  logic: "ALL" | "ANY"
  rules: Rule[]
  customers: Customer[]
}

const SEGMENTS: Segment[] = [
  {
    id: "vip",
    name: "VIP High-Spenders",
    description: "Top revenue accounts with strong repeat behavior",
    match: "1,284",
    count: 1284,
    growth: "+8.2%",
    revenue: "$1.92M",
    aov: "$486",
    retention: 91,
    logic: "ALL",
    rules: [
      { field: "Lifetime spend", op: "is greater than", value: "$5,000" },
      { field: "Orders", op: "is at least", value: "8" },
      { field: "Last purchase", op: "within", value: "30 days" },
    ],
    customers: [
      { name: "Amara Osei", email: "amara@northwind.io", spend: "$12,480", orders: 24, status: "Active", region: "EU" },
      { name: "Devon Park", email: "devon@lumenco.com", spend: "$9,310", orders: 18, status: "Active", region: "US" },
      { name: "Priya Nair", email: "priya@brightleaf.co", spend: "$8,205", orders: 16, status: "Active", region: "APAC" },
      { name: "Marco Conti", email: "marco@altavia.it", spend: "$7,640", orders: 13, status: "Active", region: "EU" },
    ],
  },
  {
    id: "churn",
    name: "At-Risk / Churning",
    description: "Previously active buyers gone quiet for 60+ days",
    match: "3,902",
    count: 3902,
    growth: "-4.1%",
    revenue: "$612K",
    aov: "$214",
    retention: 38,
    logic: "ALL",
    rules: [
      { field: "Last purchase", op: "is older than", value: "60 days" },
      { field: "Lifetime orders", op: "is at least", value: "3" },
      { field: "Email engagement", op: "is below", value: "20%" },
    ],
    customers: [
      { name: "Lena Hartwig", email: "lena@vesper.de", spend: "$2,140", orders: 6, status: "Dormant", region: "EU" },
      { name: "Tomas Vega", email: "tomas@cielo.mx", spend: "$1,880", orders: 5, status: "Dormant", region: "LATAM" },
      { name: "Iris Bennett", email: "iris@harbourly.com", spend: "$1,610", orders: 4, status: "At risk", region: "US" },
      { name: "Kenji Mori", email: "kenji@sora.jp", spend: "$1,420", orders: 3, status: "At risk", region: "APAC" },
    ],
  },
  {
    id: "new",
    name: "New & Promising",
    description: "First-time buyers in the last 14 days",
    match: "5,471",
    count: 5471,
    growth: "+21.7%",
    revenue: "$284K",
    aov: "$52",
    retention: 64,
    logic: "ANY",
    rules: [
      { field: "First purchase", op: "within", value: "14 days" },
      { field: "Signup source", op: "is one of", value: "Paid, Referral" },
      { field: "Cart value", op: "is greater than", value: "$40" },
    ],
    customers: [
      { name: "Sofia Reyes", email: "sofia@nimbus.io", spend: "$118", orders: 2, status: "New", region: "US" },
      { name: "Owen Clarke", email: "owen@meadowlark.uk", spend: "$94", orders: 1, status: "New", region: "EU" },
      { name: "Hana Suzuki", email: "hana@kawa.jp", spend: "$76", orders: 1, status: "New", region: "APAC" },
      { name: "Felix Brandt", email: "felix@orbit.de", spend: "$61", orders: 1, status: "New", region: "EU" },
    ],
  },
  {
    id: "wholesale",
    name: "Wholesale Accounts",
    description: "Bulk buyers on the trade pricing tier",
    match: "412",
    count: 412,
    growth: "+3.4%",
    revenue: "$2.41M",
    aov: "$1,940",
    retention: 87,
    logic: "ALL",
    rules: [
      { field: "Account type", op: "is", value: "Wholesale" },
      { field: "Avg order value", op: "is greater than", value: "$1,000" },
      { field: "Region", op: "is one of", value: "US, EU" },
    ],
    customers: [
      { name: "Crestline Supply", email: "ap@crestline.com", spend: "$84,200", orders: 41, status: "Active", region: "US" },
      { name: "Borealis Trade", email: "orders@borealis.no", spend: "$66,900", orders: 33, status: "Active", region: "EU" },
      { name: "Atlas Provisions", email: "buy@atlaspro.com", spend: "$52,310", orders: 27, status: "Active", region: "US" },
      { name: "Verde Imports", email: "hello@verde.es", spend: "$44,180", orders: 22, status: "Active", region: "EU" },
    ],
  },
]

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()
}

export default function CustomerSegmentsPage() {
  const [selectedId, setSelectedId] = React.useState(SEGMENTS[0].id)
  const seg = SEGMENTS.find((s) => s.id === selectedId) ?? SEGMENTS[0]
  const totalCustomers = SEGMENTS.reduce((sum, s) => sum + s.count, 0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Layers className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold leading-tight">Audience Studio</h1>
            <p className="truncate text-xs text-muted-foreground">Segment builder</p>
          </div>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search segments" className="w-56 pl-8" />
            </div>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> New segment
            </Button>
          </div>
          <Button size="icon" variant="outline" className="md:hidden" aria-label="Create new segment">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Total customers", value: totalCustomers.toLocaleString(), icon: Users, hint: "across all sources" },
            { label: "Saved segments", value: String(SEGMENTS.length), icon: Layers, hint: "1 syncing now" },
            { label: "In this segment", value: seg.match, icon: Filter, hint: seg.growth + " vs last 30d" },
            { label: "Segment revenue", value: seg.revenue, icon: DollarSign, hint: "AOV " + seg.aov },
          ].map((k) => (
            <Card key={k.label}>
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <k.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <p className="text-xl font-semibold leading-tight">{k.value}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{k.hint}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Saved segments</CardTitle>
                <CardDescription className="text-xs">Select one to edit its rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1.5 p-2">
                {SEGMENTS.map((s) => {
                  const active = s.id === selectedId
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedId(s.id)}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                        active ? "border-primary bg-primary/10" : "border-transparent hover:bg-muted"
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate text-sm font-medium", active && "text-primary")}>{s.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.match} customers</p>
                      </div>
                      <ChevronRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", active && "translate-x-0.5 text-primary")} />
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </aside>

          <section className="lg:col-span-5">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{seg.name}</CardTitle>
                    <CardDescription className="mt-1 text-xs">{seg.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="gap-1 whitespace-nowrap">
                    <Sparkles className="h-3 w-3" /> {seg.logic === "ALL" ? "Match all" : "Match any"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {seg.rules.map((r, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="w-12 shrink-0 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {seg.logic === "ALL" ? "and" : "or"}
                        </span>
                      )}
                      {i === 0 && <span className="w-12 shrink-0 text-center text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">where</span>}
                      <div className="flex flex-1 flex-wrap items-center gap-1.5 rounded-lg border bg-muted/30 px-3 py-2">
                        <Badge variant="outline" className="bg-background">{r.field}</Badge>
                        <span className="text-xs text-muted-foreground">{r.op}</span>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">{r.value}</Badge>
                        <button className="ml-auto text-muted-foreground hover:text-destructive" aria-label={"Remove condition " + r.field}>
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="w-full gap-1.5 border-dashed">
                  <Plus className="h-4 w-4" /> Add condition
                </Button>

                <Separator />

                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    Changes apply to the live preview instantly
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">Reset</Button>
                    <Button size="sm" className="gap-1.5">
                      <Save className="h-4 w-4" /> Save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="lg:col-span-4">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-sm">Results preview</CardTitle>
                    <CardDescription className="text-xs">Live match estimate</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border bg-primary/10 p-4">
                  <p className="text-xs font-medium text-primary">Matched customers</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">{seg.match}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" /> {seg.growth}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ShoppingCart className="h-3.5 w-3.5" /> AOV {seg.aov}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Retention rate</span>
                    <span className="font-medium">{seg.retention}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: seg.retention + "%" }} />
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Sample customers</p>
                  <div className="space-y-2">
                    {seg.customers.slice(0, 3).map((c) => (
                      <div key={c.email} className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-[11px]">{initials(c.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{c.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                        </div>
                        <span className="shrink-0 text-sm font-medium tabular-nums">{c.spend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <Card className="mt-6">
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm">Matched customers in {seg.name}</CardTitle>
                <CardDescription className="text-xs">{seg.match} total, showing top {seg.customers.length}</CardDescription>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Filter results" className="w-full pl-8 sm:w-56" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Region</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Lifetime spend</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {seg.customers.map((c) => (
                  <TableRow key={c.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-[11px]">{initials(c.name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{c.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{c.region}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{c.orders}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{c.spend}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === "Active" || c.status === "New" ? "secondary" : "outline"}>{c.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Audience Studio — segment data refreshed every 15 minutes</p>
          <p>{SEGMENTS.length} segments · {totalCustomers.toLocaleString()} customers tracked</p>
        </div>
      </footer>
    </div>
  )
}
