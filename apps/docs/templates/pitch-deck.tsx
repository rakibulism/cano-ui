"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Circle,
  Flame,
  Github,
  Linkedin,
  Mail,
  Quote,
  Rocket,
  Target,
  TrendingUp,
  Twitter,
  Users,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const SECTIONS = [
  { id: "cover", label: "Cover" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "market", label: "Market" },
  { id: "traction", label: "Traction" },
  { id: "team", label: "Team" },
  { id: "ask", label: "The Ask" },
] as const

const PROBLEMS = [
  {
    icon: Flame,
    title: "Teams drown in tool sprawl",
    body: "The average go-to-market team juggles 14 disconnected apps. Context lives everywhere and nowhere.",
  },
  {
    icon: Target,
    title: "Insight arrives too late",
    body: "By the time reports are stitched together, the moment to act has already passed. Decisions lag reality.",
  },
  {
    icon: Zap,
    title: "Manual work eats the week",
    body: "Reps spend 9 hours a week copying data between systems instead of talking to customers.",
  },
]

const SOLUTION_STEPS = [
  {
    step: "01",
    title: "Connect everything",
    body: "One integration layer unifies your CRM, calendar, inbox, and data warehouse in minutes.",
  },
  {
    step: "02",
    title: "Surface the signal",
    body: "Our engine watches every account in real time and ranks what actually deserves attention today.",
  },
  {
    step: "03",
    title: "Act in one click",
    body: "Recommended plays run inline. No tab-switching, no copy-paste, no waiting on the data team.",
  },
]

const MARKET = [
  { label: "TAM", value: "$84B", note: "Global revenue tooling spend" },
  { label: "SAM", value: "$19B", note: "Mid-market GTM teams" },
  { label: "SOM", value: "$1.2B", note: "Reachable in 3 years" },
]

const STATS = [
  { value: "$4.2M", label: "ARR", delta: "+218% YoY" },
  { value: "380", label: "Paying teams", delta: "+62 this quarter" },
  { value: "131%", label: "Net revenue retention", delta: "+9 pts" },
  { value: "11 mo", label: "CAC payback", delta: "-4 months" },
]

const LOGOS = ["Northwind", "Acme Cloud", "Lattice", "Vantage", "Helio", "Quill"]

const TEAM = [
  {
    name: "Mara Okafor",
    role: "Co-founder & CEO",
    bio: "Ex-VP Revenue at Segment. Scaled GTM from $0 to $90M.",
    img: "https://i.pravatar.cc/160?img=47",
    initials: "MO",
  },
  {
    name: "Devin Cho",
    role: "Co-founder & CTO",
    bio: "Early Stripe engineer. Built data infra serving 2B events/day.",
    img: "https://i.pravatar.cc/160?img=12",
    initials: "DC",
  },
  {
    name: "Priya Nair",
    role: "Head of Product",
    bio: "Led product at Notion. Obsessed with workflow clarity.",
    img: "https://i.pravatar.cc/160?img=32",
    initials: "PN",
  },
  {
    name: "Tomas Reyes",
    role: "Head of Growth",
    bio: "Built the PLG motion behind two unicorn launches.",
    img: "https://i.pravatar.cc/160?img=15",
    initials: "TR",
  },
]

const USE_OF_FUNDS = [
  { label: "Engineering & product", pct: 45 },
  { label: "Go-to-market", pct: 35 },
  { label: "Operations & runway", pct: 20 },
]

export default function PitchDeckTemplate() {
  const [active, setActive] = React.useState<string>("cover")

  const scrollTo = React.useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    setActive(id)
  }, [])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Cadence</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">Seed Round</Badge>
          </div>
          <Button size="sm" onClick={() => scrollTo("ask")} className="gap-1.5">
            Request deck
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Button>
        </div>
      </header>

      {/* Sticky dot navigation */}
      <nav
        aria-label="Slide navigation"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={active === s.id ? "true" : undefined}
            className="group flex items-center justify-end gap-2"
          >
            <span
              className={cn(
                "whitespace-nowrap text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100",
                active === s.id ? "text-foreground opacity-100" : "text-muted-foreground"
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full border transition-all",
                active === s.id ? "scale-125 border-primary bg-primary" : "border-muted-foreground/40 bg-transparent"
              )}
            />
          </button>
        ))}
      </nav>

      <main className="flex-1">
        {/* Cover */}
        <section
          id="cover"
          className="flex min-h-[88vh] items-center border-b bg-muted/30"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <Badge variant="outline" className="mb-6 gap-1.5">
              <Circle className="h-2 w-2 fill-primary text-primary" aria-hidden="true" />
              Pitch Deck · Confidential
            </Badge>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              The operating system for{" "}
              <span className="text-primary">revenue teams.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Cadence unifies your go-to-market stack into one intelligent surface — so teams act on what matters before the moment passes.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => scrollTo("problem")} className="gap-2">
                Walk the deck
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("ask")}>
                Skip to the ask
              </Button>
            </div>
            <p className="mt-12 text-sm text-muted-foreground">
              Raising a <span className="font-semibold text-foreground">$6M Seed</span> to scale a category-defining product.
            </p>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <SectionLabel index="01" title="The Problem" />
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Modern revenue teams are flying blind.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              The tools meant to help have multiplied — and made the picture blurrier than ever.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {PROBLEMS.map((p) => (
                <Card key={p.title} className="border bg-card">
                  <CardContent className="pt-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <p.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <SectionLabel index="02" title="The Solution" />
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              One surface. Every signal. Zero busywork.
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {SOLUTION_STEPS.map((s) => (
                <div key={s.step} className="relative">
                  <span className="text-5xl font-bold text-primary/20">{s.step}</span>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
            <Card className="mt-12 border bg-card">
              <CardContent className="flex flex-col items-start gap-4 py-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <Quote className="mt-1 h-8 w-8 shrink-0 text-primary" aria-hidden="true" />
                  <p className="max-w-2xl text-lg font-medium leading-snug">
                    “Cadence replaced four tools and gave our reps back a full day every week. It paid for itself in a month.”
                  </p>
                </div>
                <div className="shrink-0 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Lena Ortiz</span><br />
                  VP Sales, Northwind
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market */}
        <section id="market" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <SectionLabel index="03" title="Market" />
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              A massive, expanding wedge.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              We start with mid-market GTM teams and expand outward into the full revenue stack.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {MARKET.map((m, i) => (
                <Card
                  key={m.label}
                  className={cn(
                    "border",
                    i === 2 ? "border-primary bg-primary/5" : "bg-card"
                  )}
                >
                  <CardContent className="py-8">
                    <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      {m.label}
                    </span>
                    <div className="mt-2 text-5xl font-bold tracking-tight">{m.value}</div>
                    <p className="mt-3 text-sm text-muted-foreground">{m.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Traction */}
        <section id="traction" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <SectionLabel index="04" title="Traction" />
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              The numbers are compounding.
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <Card key={s.label} className="border bg-card">
                  <CardContent className="py-7">
                    <div className="text-4xl font-bold tracking-tight">{s.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                      {s.delta}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12">
              <p className="text-sm font-medium text-muted-foreground">Trusted by fast-growing teams</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-4">
                {LOGOS.map((l) => (
                  <span key={l} className="text-lg font-semibold tracking-tight text-muted-foreground">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <SectionLabel index="05" title="Team" />
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Operators who have built this before.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <div key={member.name} className="flex flex-col items-start">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={member.img} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center gap-3 text-muted-foreground">
              <Users className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm">28 people across product, engineering, and go-to-market.</span>
            </div>
          </div>
        </section>

        {/* Ask */}
        <section id="ask" className="bg-primary/5">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <SectionLabel index="06" title="The Ask" />
            <div className="mt-4 grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Raising <span className="text-primary">$6M</span> to own the category.
                </h2>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">
                  This round takes us from $4.2M to $15M ARR and ships the AI layer our customers are already asking for.
                </p>
                <div className="mt-10 space-y-6">
                  {USE_OF_FUNDS.map((f) => (
                    <div key={f.label}>
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>{f.label}</span>
                        <span className="text-muted-foreground">{f.pct}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${f.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="border bg-card">
                <CardContent className="py-8">
                  <h3 className="text-xl font-semibold">Let’s talk</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get the full data room and a live walkthrough with the founders.
                  </p>
                  <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input aria-label="Your name" placeholder="Your name" />
                      <Input aria-label="Fund / firm" placeholder="Fund / firm" />
                    </div>
                    <Input type="email" aria-label="Email address" placeholder="you@fund.com" />
                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Request the deck
                    </Button>
                  </form>
                  <p className="mt-4 text-xs text-muted-foreground">
                    We respond within one business day. Materials shared under NDA.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold">Cadence</span>
            <span className="text-sm text-muted-foreground">· hello@cadence.io</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => scrollTo("cover")}>
              Back to top
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold tracking-widest text-primary">{index}</span>
      <span className="h-px w-8 bg-border" />
      <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </span>
    </div>
  )
}
