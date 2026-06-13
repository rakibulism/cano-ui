"use client"
import * as React from "react"
import { TrendingUp, Users, PieChart, DollarSign, Building2, ArrowUpRight, Download, Plus, Layers, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Round = "seed" | "seriesA" | "seriesB"

type Holder = {
  name: string
  initials: string
  klass: "Founders" | "Investors" | "ESOP" | "Others"
  type: string
  shares: Record<Round, number>
}

const ROUNDS: { id: Round; label: string; date: string; raised: string; valuation: string; lead: string }[] = [
  { id: "seed", label: "Seed", date: "Mar 2022", raised: "$2.5M", valuation: "$12M", lead: "Northwind Ventures" },
  { id: "seriesA", label: "Series A", date: "Aug 2023", raised: "$11M", valuation: "$48M", lead: "Bridgepoint Capital" },
  { id: "seriesB", label: "Series B", date: "Feb 2025", raised: "$32M", valuation: "$185M", lead: "Atlas Growth Partners" },
]

const HOLDERS: Holder[] = [
  { name: "Dana Okafor", initials: "DO", klass: "Founders", type: "Common", shares: { seed: 4200000, seriesA: 4200000, seriesB: 4200000 } },
  { name: "Marcus Lin", initials: "ML", klass: "Founders", type: "Common", shares: { seed: 3800000, seriesA: 3800000, seriesB: 3800000 } },
  { name: "Northwind Ventures", initials: "NV", klass: "Investors", type: "Pref. Seed", shares: { seed: 1600000, seriesA: 1600000, seriesB: 1600000 } },
  { name: "Bridgepoint Capital", initials: "BC", klass: "Investors", type: "Pref. A", shares: { seed: 0, seriesA: 2300000, seriesB: 2300000 } },
  { name: "Atlas Growth Partners", initials: "AG", klass: "Investors", type: "Pref. B", shares: { seed: 0, seriesA: 0, seriesB: 3100000 } },
  { name: "Option Pool", initials: "OP", klass: "ESOP", type: "Reserved", shares: { seed: 900000, seriesA: 1500000, seriesB: 2100000 } },
  { name: "Advisors & SAFEs", initials: "AS", klass: "Others", type: "Common", shares: { seed: 300000, seriesA: 450000, seriesB: 620000 } },
]

const CLASS_META: { klass: Holder["klass"]; tone: string }[] = [
  { klass: "Founders", tone: "bg-primary" },
  { klass: "Investors", tone: "bg-foreground" },
  { klass: "ESOP", tone: "bg-muted-foreground" },
  { klass: "Others", tone: "bg-primary/40" },
]

function fmt(n: number) {
  return n.toLocaleString("en-US")
}

export default function CapTableApp() {
  const [round, setRound] = React.useState<Round>("seriesB")

  const totalShares = React.useMemo(
    () => HOLDERS.reduce((sum, h) => sum + h.shares[round], 0),
    [round]
  )

  const classBreakdown = React.useMemo(() => {
    return CLASS_META.map((meta) => {
      const shares = HOLDERS.filter((h) => h.klass === meta.klass).reduce((s, h) => s + h.shares[round], 0)
      return { ...meta, shares, pct: totalShares ? (shares / totalShares) * 100 : 0 }
    })
  }, [round, totalShares])

  const activeRound = ROUNDS.find((r) => r.id === round)!
  const founderPct = classBreakdown.find((c) => c.klass === "Founders")!.pct
  const investorPct = classBreakdown.find((c) => c.klass === "Investors")!.pct
  const esopPct = classBreakdown.find((c) => c.klass === "ESOP")!.pct

  const kpis = [
    { label: "Total Shares Issued", value: fmt(totalShares), icon: Layers, sub: `as of ${activeRound.label}` },
    { label: "Post-Money Valuation", value: activeRound.valuation, icon: TrendingUp, sub: activeRound.date },
    { label: "Founder Ownership", value: `${founderPct.toFixed(1)}%`, icon: Users, sub: "fully diluted" },
    { label: "ESOP Pool", value: `${esopPct.toFixed(1)}%`, icon: PieChart, sub: "allocated + reserved" },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <PieChart className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Equita</span>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <span className="hidden text-sm text-muted-foreground sm:block">Helios Robotics, Inc.</span>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" /> New round
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>DO</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Capitalization Table</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Ownership snapshot recalculated per financing round.
            </p>
          </div>
          <Tabs value={round} onValueChange={(v) => setRound(v as Round)}>
            <TabsList>
              {ROUNDS.map((r) => (
                <TabsTrigger key={r.id} value={r.id}>
                  {r.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => {
            const Icon = k.icon
            return (
              <Card key={k.label}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardDescription>{k.label}</CardDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold tracking-tight">{k.value}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{k.sub}</p>
                </CardContent>
              </Card>
            )
          })}
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Ownership Breakdown</CardTitle>
              <CardDescription>By stakeholder class at {activeRound.label}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                {classBreakdown.map((c) => (
                  <div
                    key={c.klass}
                    className={cn("h-full transition-all duration-500", c.tone)}
                    style={{ width: `${c.pct}%` }}
                    aria-label={`${c.klass} ${c.pct.toFixed(1)} percent`}
                  />
                ))}
              </div>
              <div className="space-y-4">
                {classBreakdown.map((c) => (
                  <div key={c.klass}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2.5 w-2.5 rounded-sm", c.tone)} />
                        <span className="font-medium">{c.klass}</span>
                      </div>
                      <div className="flex items-center gap-3 tabular-nums">
                        <span className="text-muted-foreground">{fmt(c.shares)}</span>
                        <span className="w-12 text-right font-semibold">{c.pct.toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", c.tone)}
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Round Summary</CardTitle>
              <CardDescription>{activeRound.date}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="h-4 w-4 text-primary" />
                  Lead investor
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{activeRound.lead}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5" /> Raised
                  </div>
                  <div className="mt-1 text-lg font-semibold">{activeRound.raised}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5" /> Valuation
                  </div>
                  <div className="mt-1 text-lg font-semibold">{activeRound.valuation}</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Investor stake</span>
                <Badge variant="secondary" className="tabular-nums">{investorPct.toFixed(1)}%</Badge>
              </div>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4" /> View round docs
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Shareholders</CardTitle>
              <CardDescription>{HOLDERS.filter((h) => h.shares[round] > 0).length} holders at {activeRound.label}</CardDescription>
            </div>
            <Badge variant="outline">Fully diluted</Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stakeholder</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                  <TableHead className="text-right">Ownership</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {HOLDERS.filter((h) => h.shares[round] > 0)
                  .sort((a, b) => b.shares[round] - a.shares[round])
                  .map((h) => {
                    const pct = totalShares ? (h.shares[round] / totalShares) * 100 : 0
                    return (
                      <TableRow key={h.name}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">{h.initials}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{h.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={h.klass === "Founders" ? "default" : "secondary"}>{h.klass}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{h.type}</TableCell>
                        <TableCell className="text-right tabular-nums">{fmt(h.shares[round])}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-muted sm:block">
                              <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="w-12 text-right font-semibold tabular-nums">{pct.toFixed(1)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Funding Timeline</CardTitle>
            <CardDescription>Financing history and dilution events</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-6 border-l pl-6">
              {ROUNDS.map((r) => {
                const isActive = r.id === round
                return (
                  <li key={r.id} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background",
                        isActive ? "bg-primary" : "bg-muted-foreground"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setRound(r.id)}
                      className={cn(
                        "flex w-full flex-col gap-1 rounded-lg border p-4 text-left transition-colors sm:flex-row sm:items-center sm:justify-between",
                        isActive ? "border-primary bg-primary/5" : "hover:bg-muted/40"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{r.label}</span>
                        {isActive && <Badge>Viewing</Badge>}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>{r.date}</span>
                        <span className="flex items-center gap-1">
                          <ArrowUpRight className="h-3.5 w-3.5" /> {r.raised} raised
                        </span>
                        <span className="font-medium text-foreground">{r.valuation}</span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ol>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span>Equita Cap Table — figures are illustrative and not legal advice.</span>
          <span>Last updated {activeRound.date}</span>
        </div>
      </footer>
    </div>
  )
}
