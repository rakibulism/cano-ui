"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  Gauge,
  Layers,
  LineChart,
  Mail,
  PlayCircle,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Product", href: "#product" },
  { label: "Traction", href: "#traction" },
  { label: "Team", href: "#team" },
]

const painPoints = [
  {
    icon: Layers,
    title: "Fragmented stacks",
    body: "Ops teams stitch together six disconnected tools just to ship one workflow — and nothing talks to anything.",
  },
  {
    icon: Gauge,
    title: "Glacial cycle times",
    body: "A single change request takes eleven days to clear review. By the time it ships, the requirement has moved.",
  },
  {
    icon: Target,
    title: "Zero visibility",
    body: "Leaders fly blind. There is no shared source of truth for what is in flight, blocked, or shipped.",
  },
]

const highlights = [
  {
    icon: Zap,
    title: "One canvas, every workflow",
    body: "Design, automate, and monitor operational flows in a single drag-and-drop canvas — no glue code required.",
  },
  {
    icon: LineChart,
    title: "Live decision intelligence",
    body: "Every flow streams telemetry into dashboards that update in real time, so bottlenecks surface instantly.",
  },
  {
    icon: Sparkles,
    title: "AI co-pilot built in",
    body: "Describe an outcome in plain language and Helix drafts the workflow, the checks, and the rollout plan.",
  },
  {
    icon: CheckCircle2,
    title: "Governance by default",
    body: "Approvals, audit trails, and role-based access are baked in — not bolted on after a security review.",
  },
]

const metrics = [
  { label: "Monthly recurring revenue", value: "$420K", pct: 84, note: "+38% QoQ" },
  { label: "Net revenue retention", value: "141%", pct: 71, note: "best in category" },
  { label: "Design partners signed", value: "27", pct: 90, note: "9 of them Fortune 500" },
  { label: "Workflows shipped", value: "12.4K", pct: 62, note: "across 27 accounts" },
]

const team = [
  {
    name: "Mara Velez",
    role: "Co-founder & CEO",
    bio: "Ex-VP Ops at Stripe. Scaled internal tooling for 4,000 employees.",
    initials: "MV",
  },
  {
    name: "Devin Okafor",
    role: "Co-founder & CTO",
    bio: "Built distributed systems at Snowflake. Two patents in stream processing.",
    initials: "DO",
  },
  {
    name: "Priya Raman",
    role: "Head of Product",
    bio: "Led the automation suite at Airtable from zero to ten million ARR.",
    initials: "PR",
  },
]

const milestones = [
  { quarter: "Q1", text: "Launched private beta with 5 design partners" },
  { quarter: "Q2", text: "Crossed $100K MRR, closed pre-seed" },
  { quarter: "Q3", text: "Shipped AI co-pilot, NRR hit 141%" },
  { quarter: "Q4", text: "Raising seed to expand go-to-market" },
]

export default function DemoDay() {
  const [email, setEmail] = React.useState("")
  const [requested, setRequested] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim().length > 0) setRequested(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Helix</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
              Demo Day 2026
            </Badge>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
              <a href="#contact">
                <FileText className="mr-1.5 h-4 w-4" aria-hidden="true" />
                Get the deck
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="#demo">Watch demo</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="outline" className="mb-5 gap-1.5 border-primary/40 text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Batch W26 · Seed stage
              </Badge>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                The operating system for{" "}
                <span className="text-primary">internal operations</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Helix turns weeks of cross-team coordination into a single canvas —
                design, automate, and monitor every operational workflow in one place.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#demo">
                    <PlayCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                    Watch the 2-min demo
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#contact">
                    Request the deck
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
                <div>
                  <dt className="text-2xl font-bold tracking-tight">$420K</dt>
                  <dd className="text-xs text-muted-foreground">MRR</dd>
                </div>
                <div>
                  <dt className="text-2xl font-bold tracking-tight">141%</dt>
                  <dd className="text-xs text-muted-foreground">NRR</dd>
                </div>
                <div>
                  <dt className="text-2xl font-bold tracking-tight">27</dt>
                  <dd className="text-xs text-muted-foreground">Design partners</dd>
                </div>
              </dl>
            </div>
            <div id="demo" className="relative">
              <Card className="overflow-hidden border-primary/20 shadow-sm">
                <div className="relative flex aspect-video items-center justify-center bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent" aria-hidden="true" />
                  <button
                    type="button"
                    aria-label="Play product demo video"
                    className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
                  >
                    <PlayCircle className="h-8 w-8" aria-hidden="true" />
                  </button>
                </div>
                <CardContent className="flex items-center justify-between gap-3 py-4">
                  <div>
                    <p className="text-sm font-medium">Live product walkthrough</p>
                    <p className="text-xs text-muted-foreground">2:04 · recorded today</p>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    HD
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">The problem</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Internal operations are stuck in 2010.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Every growing company runs on a tangle of spreadsheets, tickets, and
                Slack threads. The cost is invisible until it is enormous.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {painPoints.map((p) => (
                <Card key={p.title} className="border-border/60">
                  <CardContent className="pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                      <p.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Product highlights */}
        <section id="product" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">The product</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                One canvas. Every workflow. Real-time.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Helix replaces the operational glue with a single, governed platform
                your whole team can build on.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {highlights.map((h) => (
                <Card key={h.title} className="group border-border/60 transition-colors hover:border-primary/40">
                  <CardContent className="flex gap-4 pt-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <h.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{h.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{h.body}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Traction */}
        <section id="traction" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">Traction</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Growing fast, retaining better.
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Three quarters in, the numbers are compounding. Net retention above
                  140% means customers expand faster than we can churn them.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm">
                  <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="font-medium">38% quarter-over-quarter revenue growth</span>
                </div>
              </div>
              <div className="space-y-6">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium">{m.label}</span>
                      <span className="text-lg font-bold tracking-tight">{m.value}</span>
                    </div>
                    <Progress value={m.pct} className="mt-2 h-2" />
                    <p className="mt-1.5 text-xs text-muted-foreground">{m.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <Separator className="my-14" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {milestones.map((ms) => (
                <div key={ms.quarter} className="rounded-xl border bg-card p-5">
                  <Badge variant="outline" className="border-primary/40 text-primary">
                    {ms.quarter}
                  </Badge>
                  <p className="mt-3 text-sm text-muted-foreground">{ms.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">The team</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Operators who lived this problem.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We spent a combined fifteen years building internal tools at companies
                you have heard of. Helix is what we wished we had.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <Card key={member.name} className="border-border/60">
                  <CardContent className="pt-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                      {member.initials}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                14 people, fully remote
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                Founded 2025
              </span>
              <span className="inline-flex items-center gap-2">
                <Rocket className="h-4 w-4" aria-hidden="true" />
                Backed by Foundry & angels
              </span>
            </div>
          </div>
        </section>

        {/* Contact for deck */}
        <section id="contact" className="bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <Card className="overflow-hidden border-primary/20">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="bg-primary p-10 text-primary-foreground lg:p-12">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Want the full deck?
                  </h2>
                  <p className="mt-4 max-w-md text-primary-foreground/80">
                    Drop your email and we will send the investor deck, the metrics
                    appendix, and a calendar link to meet the founders this week.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm">
                    {["Full financial model", "Customer reference calls", "Live product sandbox"].map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-10 lg:p-12">
                  {requested ? (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">Deck on its way</h3>
                      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                        Check your inbox — we just sent everything to{" "}
                        <span className="font-medium text-foreground">{email}</span>.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="deck-name">Your name</Label>
                        <Input id="deck-name" placeholder="Jordan Lee" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deck-email">Work email</Label>
                        <Input
                          id="deck-email"
                          type="email"
                          placeholder="jordan@fund.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deck-firm">Firm</Label>
                        <Input id="deck-firm" placeholder="Acme Ventures" />
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                        Send me the deck
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">
                        We reply within 24 hours. No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold">Helix</span>
            <span className="text-sm text-muted-foreground">· The ops OS</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#contact" className="inline-flex items-center gap-1 transition-colors hover:text-foreground">
              Contact founders
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <span className={cn("text-xs")}>© 2026 Helix Labs, Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
