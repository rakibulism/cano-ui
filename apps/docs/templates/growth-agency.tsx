"use client"

import * as React from "react"
import {
  ArrowUpRight,
  TrendingUp,
  Search,
  Megaphone,
  MousePointerClick,
  BarChart3,
  Mail,
  Target,
  Check,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const SERVICES = [
  {
    icon: Search,
    title: "SEO & Content",
    desc: "Rank for the keywords that convert. Editorial engines that compound month over month.",
  },
  {
    icon: MousePointerClick,
    title: "Paid Acquisition",
    desc: "Profitable spend across search, social and programmatic with real-time guardrails.",
  },
  {
    icon: Mail,
    title: "Lifecycle & CRM",
    desc: "Email and SMS flows that turn one-time buyers into repeat revenue machines.",
  },
  {
    icon: Target,
    title: "Conversion Rate",
    desc: "Experimentation programs that lift checkout, signup and lead-form completion.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Attribution",
    desc: "Clean tracking and dashboards so every dollar is tied to a result you can defend.",
  },
  {
    icon: Megaphone,
    title: "Brand Demand",
    desc: "Creative and positioning that makes the rest of your funnel cheaper to run.",
  },
]

const CASES = [
  {
    client: "Northwind Apparel",
    industry: "E-commerce",
    metricLabel: "Return on ad spend",
    before: "1.8x",
    after: "4.6x",
    note: "Rebuilt the paid social account and creative testing loop in 90 days.",
  },
  {
    client: "Lumen Health",
    industry: "B2B SaaS",
    metricLabel: "Qualified pipeline",
    before: "$120K",
    after: "$910K",
    note: "Intent-led SEO plus a demand engine that filled the sales calendar.",
  },
  {
    client: "Cadence Fintech",
    industry: "Fintech",
    metricLabel: "Cost per signup",
    before: "$84",
    after: "$23",
    note: "Landing page experiments cut acquisition cost by 73% in two quarters.",
  },
  {
    client: "Verde Goods",
    industry: "DTC",
    metricLabel: "Email revenue",
    before: "6%",
    after: "31%",
    note: "Lifecycle flows now drive nearly a third of total store revenue.",
  },
]

const PROCESS = [
  {
    step: "01",
    title: "Audit & Diagnose",
    desc: "We pull apart your funnel, tracking and spend to find where growth actually leaks.",
  },
  {
    step: "02",
    title: "Build the Plan",
    desc: "A 90-day roadmap with named bets, owners and the metric each one is supposed to move.",
  },
  {
    step: "03",
    title: "Launch & Test",
    desc: "Ship campaigns and experiments weekly. Kill losers fast, double down on winners.",
  },
  {
    step: "04",
    title: "Scale What Works",
    desc: "Pour budget into proven channels and report the revenue impact in plain numbers.",
  },
]

const CLIENTS = ["Northwind", "Lumen", "Cadence", "Verde", "Atlas", "Brightly"]

const PLANS = [
  {
    name: "Sprint",
    price: "$6K",
    cadence: "/ month",
    tagline: "One channel, fully owned.",
    features: ["1 acquisition channel", "Weekly experiments", "Shared dashboard", "Monthly review call"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$14K",
    cadence: "/ month",
    tagline: "Full-funnel revenue team.",
    features: ["Up to 4 channels", "Dedicated strategist", "CRO + lifecycle", "Weekly reporting", "Slack access"],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "",
    tagline: "Embedded growth org.",
    features: ["Unlimited channels", "Pod of specialists", "Custom attribution", "Quarterly planning"],
    featured: false,
  },
]

export default function GrowthAgencyPage() {
  const [activeCase, setActiveCase] = React.useState(0)
  const current = CASES[activeCase]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </span>
            Upcurve
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#results" className="transition-colors hover:text-foreground">Results</a>
            <a href="#process" className="transition-colors hover:text-foreground">Process</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Book a teardown</a>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div className="flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Performance marketing, no fluff
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                We grow revenue, not just traffic.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Upcurve is the growth team for brands done guessing. We find what moves the
                number and pour fuel on it.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#contact" className="gap-2">
                    Get your free teardown
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#results">See the results</a>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                Rated 4.9 by 120+ founders
              </div>
            </div>

            <div className="relative">
              <Card className="border-primary/30 bg-card shadow-sm">
                <CardContent className="flex flex-col gap-6 p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Avg. client revenue lift
                    </span>
                    <Badge variant="outline" className="gap-1 text-primary">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                      Live
                    </Badge>
                  </div>
                  <div className="text-7xl font-bold tracking-tight text-primary">
                    +312%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Median 12-month revenue growth across active retainer accounts.
                  </p>
                  <Separator />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { v: "73%", l: "Lower CPA" },
                      { v: "4.6x", l: "Blended ROAS" },
                      { v: "$2.4M", l: "Pipeline / qtr" },
                    ].map((s) => (
                      <div key={s.l} className="flex flex-col gap-1">
                        <span className="text-xl font-semibold">{s.v}</span>
                        <span className="text-xs text-muted-foreground">{s.l}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by growth teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {CLIENTS.map((c) => (
                <span key={c} className="text-xl font-semibold tracking-tight text-muted-foreground">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">What we do</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                One team across every growth lever.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Pick the channel that is holding you back, or hand us the whole funnel. Either
                way, the strategist is the same.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <Card key={s.title} className="group transition-colors hover:border-primary/40">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Results / Case studies */}
        <section id="results" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Proof</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Before and after, in real numbers.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Select a client to see the metric we were hired to move.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              <div className="flex flex-col gap-2">
                {CASES.map((c, i) => (
                  <button
                    key={c.client}
                    onClick={() => setActiveCase(i)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border bg-card px-4 py-4 text-left transition-colors",
                      i === activeCase
                        ? "border-primary bg-primary/5"
                        : "hover:border-primary/40",
                    )}
                    aria-pressed={i === activeCase}
                  >
                    <div>
                      <div className="font-semibold">{c.client}</div>
                      <div className="text-sm text-muted-foreground">{c.industry}</div>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 transition-colors",
                        i === activeCase ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                  </button>
                ))}
              </div>

              <Card className="border-primary/30">
                <CardContent className="flex flex-col gap-8 p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">{current.industry}</div>
                      <div className="text-xl font-semibold">{current.client}</div>
                    </div>
                    <Badge className="gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Win
                    </Badge>
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="flex flex-col gap-1 rounded-lg bg-muted p-5">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        Before
                      </span>
                      <span className="text-3xl font-bold text-muted-foreground">
                        {current.before}
                      </span>
                    </div>
                    <ArrowRight className="h-6 w-6 text-primary" />
                    <div className="flex flex-col gap-1 rounded-lg bg-primary/10 p-5">
                      <span className="text-xs uppercase tracking-wide text-primary">
                        After
                      </span>
                      <span className="text-3xl font-bold text-primary">
                        {current.after}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium">{current.metricLabel}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{current.note}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">How it works</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A repeatable system, not a black box.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p) => (
                <div key={p.step} className="flex flex-col gap-3">
                  <span className="text-4xl font-bold text-primary/30">{p.step}</span>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Engagements</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Pick the level of firepower.
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(
                    "flex flex-col",
                    plan.featured && "border-primary shadow-sm",
                  )}
                >
                  <CardContent className="flex flex-1 flex-col gap-6 p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      {plan.featured && <Badge>Most popular</Badge>}
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                      <span className="pb-1 text-sm text-muted-foreground">{plan.cadence}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                    <Separator />
                    <ul className="flex flex-1 flex-col gap-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      className="w-full"
                    >
                      <a href="#contact">Start with {plan.name}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit">Free teardown</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Tell us where you are stuck.
              </h2>
              <p className="text-muted-foreground">
                Send a few details and we will record a 15-minute teardown of your funnel with
                three things you can fix this week. No pitch, no obligation.
              </p>
              <ul className="flex flex-col gap-3 text-sm">
                {[
                  "A senior strategist reviews your account",
                  "Three concrete, prioritized opportunities",
                  "A clear estimate of the upside",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Card>
              <CardContent className="p-8">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jordan Reyes" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="goal">What are you trying to grow?</Label>
                    <Textarea
                      id="goal"
                      rows={4}
                      placeholder="We are spending $40K/mo on paid social but ROAS has stalled at 2x..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Request my teardown
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    We reply within one business day.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
            Upcurve
          </div>
          <p className="text-sm text-muted-foreground">
            (c) 2024 Upcurve Growth Co. Built for compounding results.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#results" className="transition-colors hover:text-foreground">Results</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
