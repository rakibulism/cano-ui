"use client"
import * as React from "react"
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Lightbulb,
  Users,
  Mail,
  Download,
  PieChart,
  Rocket,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const COMPANY = "Cargologic"
const PITCH = "The autonomous freight network that cuts empty-mile waste for mid-market carriers."

const TRACTION = [
  { label: "ARR", value: "$4.2M", sub: "+18% MoM" },
  { label: "Active carriers", value: "1,840", sub: "+12% MoM" },
  { label: "Net revenue retention", value: "139%", sub: "trailing 12mo" },
  { label: "Gross margin", value: "71%", sub: "blended" },
]

const REVENUE_BARS = [
  { quarter: "Q1 24", value: 22 },
  { quarter: "Q2 24", value: 34 },
  { quarter: "Q3 24", value: 51 },
  { quarter: "Q4 24", value: 68 },
  { quarter: "Q1 25", value: 82 },
  { quarter: "Q2 25", value: 100 },
]

const PROBLEMS = [
  { stat: "$87B", text: "lost annually to empty backhauls across North American trucking." },
  { stat: "35%", text: "of all truck miles are driven with no paying load on board." },
  { stat: "11 days", text: "average time mid-market carriers wait to fill a return route." },
]

const SOLUTION = [
  "Real-time load matching across a shared carrier network",
  "Predictive routing that pre-books backhauls before delivery",
  "Automated settlement and instant payouts on completed hauls",
  "Carrier-grade dashboards with margin and utilization insights",
]

const MARKET = [
  { label: "TAM", value: "$212B", desc: "Global digital freight brokerage" },
  { label: "SAM", value: "$48B", desc: "North American mid-market carriers" },
  { label: "SOM", value: "$6.4B", desc: "Reachable in 5 years at 13% share" },
]

const TEAM = [
  { name: "Dana Reyes", role: "CEO — ex-Flexport, scaled ops to $300M GMV", initials: "DR" },
  { name: "Marcus Hale", role: "CTO — ex-Uber Freight, built routing engine", initials: "MH" },
  { name: "Priya Nandan", role: "COO — 12yr logistics, ex-XPO regional VP", initials: "PN" },
]

const LOGOS = ["Sequoia Scout", "Y Combinator", "Lux Capital", "Freight Ventures"]

export default function InvestorOnepager() {
  const [email, setEmail] = React.useState("")
  const [sent, setSent] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="size-4" aria-hidden="true" />
            </div>
            <span className="text-lg font-semibold tracking-tight">{COMPANY}</span>
            <Badge variant="secondary" className="ml-2 hidden sm:inline-flex">
              Series A
            </Badge>
          </div>
          <Button size="sm" className="gap-2">
            <Download className="size-4" aria-hidden="true" />
            Get the deck
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center">
            <Badge variant="outline" className="mb-6 gap-1">
              <TrendingUp className="size-3" aria-hidden="true" />
              Raising $12M Series A
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              {PITCH}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We turn wasted return trips into booked revenue. Carriers earn more per mile, shippers
              get cheaper capacity, and the road moves less air.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2">
                Request the full deck
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline">
                See traction
              </Button>
            </div>
            <div className="mt-12">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Backed by
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {LOGOS.map((logo) => (
                  <span key={logo} className="text-sm font-semibold text-muted-foreground">
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex items-center gap-2 text-primary">
            <Target className="size-5" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">The problem</span>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight">
            Freight runs half-empty, and everyone pays for it.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <Card key={p.stat}>
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-foreground">{p.stat}</p>
                  <p className="mt-3 text-muted-foreground">{p.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-primary">
                <Lightbulb className="size-5" aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wide">The solution</span>
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                One network that keeps every truck loaded.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Cargologic connects fragmented carriers into a shared liquidity pool, then uses
                routing intelligence to fill the empty leg before the first delivery is even done.
              </p>
              <ul className="mt-8 space-y-4">
                {SOLUTION.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="bg-card">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Utilization lift</span>
                  <Badge>Live cohort</Badge>
                </div>
                <p className="mt-4 text-5xl font-bold tracking-tight">+27%</p>
                <p className="mt-2 text-muted-foreground">
                  Average revenue-per-mile increase for carriers in their first 90 days.
                </p>
                <Separator className="my-6" />
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-2xl font-semibold">2.4M</p>
                    <p className="text-sm text-muted-foreground">Loads matched</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">19min</p>
                    <p className="text-sm text-muted-foreground">Median match time</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="size-5" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">Traction</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Growth that compounds.</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACTION.map((t) => (
              <Card key={t.label}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{t.label}</p>
                  <p className="mt-2 text-3xl font-bold">{t.value}</p>
                  <p className="mt-1 text-sm font-medium text-primary">{t.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardContent className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">Net revenue run-rate</p>
                  <p className="text-sm text-muted-foreground">Indexed, last six quarters</p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="size-3" aria-hidden="true" />
                  4.5x YoY
                </Badge>
              </div>
              <div className="mt-10 flex h-56 items-end justify-between gap-3 sm:gap-6">
                {REVENUE_BARS.map((bar, i) => (
                  <div key={bar.quarter} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex w-full flex-1 items-end">
                      <div
                        className={cn(
                          "w-full rounded-t-md transition-all",
                          i === REVENUE_BARS.length - 1 ? "bg-primary" : "bg-primary/30"
                        )}
                        style={{ height: bar.value + "%" }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{bar.quarter}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex items-center gap-2 text-primary">
              <PieChart className="size-5" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide">Market size</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">A massive, structurally broken market.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {MARKET.map((m) => (
                <Card key={m.label} className="bg-card">
                  <CardContent className="pt-6">
                    <Badge variant="outline">{m.label}</Badge>
                    <p className="mt-4 text-4xl font-bold tracking-tight">{m.value}</p>
                    <p className="mt-2 text-muted-foreground">{m.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex items-center gap-2 text-primary">
            <Users className="size-5" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide">Team</span>
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Operators who have shipped at scale.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TEAM.map((member) => (
              <Card key={member.name}>
                <CardContent className="flex items-start gap-4 pt-6">
                  <Avatar className="size-12">
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t bg-primary/10">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
            <Mail className="mx-auto size-8 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Get the full investor deck.</h2>
            <p className="mt-3 text-muted-foreground">
              Drop your email and we will send the complete deck, data room access, and a time to
              talk with Dana.
            </p>
            {sent ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium">
                <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                Thanks — the deck is on its way to your inbox.
              </div>
            ) : (
              <form
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSent(true)
                }}
              >
                <div className="flex-1 text-left">
                  <Label htmlFor="deck-email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="deck-email"
                    type="email"
                    placeholder="you@fund.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="gap-2">
                  Send the deck
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              </form>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Or reach the founders directly at investors@cargologic.io
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Rocket className="size-3" aria-hidden="true" />
            </div>
            <span className="font-medium text-foreground">{COMPANY}</span>
          </div>
          <p>Confidential — for prospective investors only. 2025.</p>
        </div>
      </footer>
    </div>
  )
}
