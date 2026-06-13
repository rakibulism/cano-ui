"use client"

import * as React from "react"
import {
  ArrowRight,
  Megaphone,
  Target,
  Code2,
  Headphones,
  Zap,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  Workflow,
  Quote,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type PersonaKey = "marketing" | "sales" | "engineering" | "support"

const PERSONAS: {
  key: PersonaKey
  label: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { key: "marketing", label: "For Marketing", icon: Megaphone },
  { key: "sales", label: "For Sales", icon: Target },
  { key: "engineering", label: "For Engineering", icon: Code2 },
  { key: "support", label: "For Support", icon: Headphones },
]

const CONTENT: Record<
  PersonaKey,
  {
    headline: string
    sub: string
    benefits: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }[]
    stats: { value: string; label: string }[]
    steps: { title: string; desc: string }[]
    quote: { text: string; name: string; role: string; initials: string }
  }
> = {
  marketing: {
    headline: "Launch campaigns that actually convert",
    sub: "Unify every channel, automate the busywork, and prove ROI with attribution your CFO will trust.",
    benefits: [
      { icon: Zap, title: "Multi-channel automation", desc: "Orchestrate email, ads, and social from one canvas with branching journeys." },
      { icon: TrendingUp, title: "Full-funnel attribution", desc: "See exactly which campaign drove each closed deal, down to the touchpoint." },
      { icon: Sparkles, title: "AI content drafts", desc: "Spin up on-brand copy variants and test them automatically against your goals." },
    ],
    stats: [
      { value: "3.4x", label: "Return on ad spend" },
      { value: "62%", label: "Faster campaign launches" },
      { value: "18hrs", label: "Saved per week" },
    ],
    steps: [
      { title: "Connect your channels", desc: "Plug in ad accounts, your ESP, and the CRM in minutes — no engineering required." },
      { title: "Design the journey", desc: "Drag-and-drop audiences, triggers, and content into a single visual workflow." },
      { title: "Measure & optimize", desc: "Watch attribution roll in live and let the optimizer reallocate budget for you." },
    ],
    quote: {
      text: "We cut our campaign setup time by more than half and finally have one dashboard the whole team trusts.",
      name: "Priya Nair",
      role: "VP Marketing, Loftwork",
      initials: "PN",
    },
  },
  sales: {
    headline: "Close more deals with less guesswork",
    sub: "Give reps a pipeline that prioritizes itself, with the context to win every conversation.",
    benefits: [
      { icon: Target, title: "Smart lead scoring", desc: "Surface the accounts most likely to buy so reps spend time where it counts." },
      { icon: Zap, title: "Auto-logged activity", desc: "Calls, emails, and meetings sync to the deal record without a single manual entry." },
      { icon: TrendingUp, title: "Accurate forecasts", desc: "Roll-up forecasts update in real time as deals move, not once a quarter." },
    ],
    stats: [
      { value: "27%", label: "Higher win rate" },
      { value: "2.1x", label: "More pipeline coverage" },
      { value: "9 days", label: "Shorter sales cycle" },
    ],
    steps: [
      { title: "Import your pipeline", desc: "Bring deals and contacts over with a guided migration that maps every field." },
      { title: "Set scoring rules", desc: "Define the signals that matter and let the engine rank every open opportunity." },
      { title: "Coach with insights", desc: "Spot stalled deals early and give managers the data to coach in 1:1s." },
    ],
    quote: {
      text: "My reps stopped fighting the CRM and started selling. Forecast accuracy went from a guess to a number I report on.",
      name: "Marcus Lee",
      role: "Head of Revenue, Northvane",
      initials: "ML",
    },
  },
  engineering: {
    headline: "Ship reliable software, faster",
    sub: "Catch regressions before they reach prod and give every engineer the context to move with confidence.",
    benefits: [
      { icon: Code2, title: "Automated checks", desc: "Run tests, linting, and security scans on every pull request, in parallel." },
      { icon: Workflow, title: "Deploy with confidence", desc: "Progressive rollouts and one-click rollback keep incidents short and rare." },
      { icon: TrendingUp, title: "Actionable insights", desc: "DORA metrics and flaky-test detection point you to what to fix next." },
    ],
    stats: [
      { value: "4.5x", label: "More frequent deploys" },
      { value: "73%", label: "Fewer prod incidents" },
      { value: "11min", label: "Mean time to recovery" },
    ],
    steps: [
      { title: "Connect your repo", desc: "Link GitHub or GitLab and we wire up CI for every branch automatically." },
      { title: "Define your pipeline", desc: "Compose build, test, and deploy stages as code with sensible defaults." },
      { title: "Monitor & roll back", desc: "Track every release and revert a bad deploy with a single keystroke." },
    ],
    quote: {
      text: "We went from weekly releases to shipping a dozen times a day — and our on-call pager finally went quiet.",
      name: "Dev Okafor",
      role: "Staff Engineer, Arcframe",
      initials: "DO",
    },
  },
  support: {
    headline: "Delight customers at any scale",
    sub: "Resolve issues in one touch with a shared inbox, smart routing, and answers your team can trust.",
    benefits: [
      { icon: Headphones, title: "Unified inbox", desc: "Email, chat, and social conversations land in one place with full history." },
      { icon: Zap, title: "AI-assisted replies", desc: "Suggested answers drawn from your docs cut handle time without losing the human touch." },
      { icon: Users, title: "Smart routing", desc: "Tickets reach the right agent instantly based on skill, load, and priority." },
    ],
    stats: [
      { value: "41%", label: "Faster first response" },
      { value: "94%", label: "CSAT score" },
      { value: "68%", label: "One-touch resolutions" },
    ],
    steps: [
      { title: "Bring in your channels", desc: "Forward email, embed chat, and connect social in a few guided steps." },
      { title: "Build your knowledge base", desc: "Import existing docs so AI can draft accurate, on-brand answers from day one." },
      { title: "Route & resolve", desc: "Let rules assign every ticket and watch resolution times drop week over week." },
    ],
    quote: {
      text: "Our queue used to feel bottomless. Now agents close tickets in one reply and customers actually thank us.",
      name: "Sofia Reyes",
      role: "Support Lead, Brightline",
      initials: "SR",
    },
  },
}

export default function UseCasesPage() {
  const [active, setActive] = React.useState<PersonaKey>("marketing")
  const data = CONTENT[active]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Workflow className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Cadence</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#solutions" className="transition-colors hover:text-foreground">Solutions</a>
            <a href="#workflow" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#story" className="transition-colors hover:text-foreground">Customers</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Get a demo</Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 pt-16 pb-10 text-center sm:pt-24">
          <Badge variant="secondary" className="mb-5 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            One platform, every team
          </Badge>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Built for the way your whole company works
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            See how teams across the org turn Cadence into outcomes. Pick your team to explore the workflows and results that matter to you.
          </p>
        </section>

        <section id="solutions" className="mx-auto w-full max-w-6xl px-6">
          <div role="tablist" aria-label="Choose a team" className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-2xl border bg-muted/30 p-2">
            {PERSONAS.map((p) => {
              const Icon = p.icon
              const selected = active === p.key
              return (
                <button
                  key={p.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(p.key)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                    selected
                      ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{p.label}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-balance">{data.headline}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{data.sub}</p>
              <div className="mt-8 space-y-5">
                {data.benefits.map((b) => {
                  const Icon = b.icon
                  return (
                    <div key={b.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{b.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Button className="mt-8 gap-2">
                Explore {PERSONAS.find((p) => p.key === active)?.label.replace("For ", "")} solutions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4">
              {data.stats.map((s, i) => (
                <Card
                  key={s.label}
                  className={cn(
                    "border bg-card",
                    i === 0 && "border-primary/30 bg-primary/5"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold tracking-tight">{s.value}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
              <p className="mt-3 text-muted-foreground">Three steps to go from setup to measurable results.</p>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {data.steps.map((step, i) => (
                <li key={step.title} className="relative">
                  <Card className="h-full bg-background">
                    <CardContent className="p-6">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {i + 1}
                      </div>
                      <h3 className="mt-4 font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                  {i < data.steps.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground md:block" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="story" className="mx-auto w-full max-w-4xl px-6 py-16">
          <Card className="bg-card">
            <CardContent className="p-8 sm:p-12">
              <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
              <blockquote className="mt-5 text-xl font-medium leading-relaxed text-balance sm:text-2xl">
                &ldquo;{data.quote.text}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {data.quote.initials}
                </div>
                <div>
                  <div className="font-semibold">{data.quote.name}</div>
                  <div className="text-sm text-muted-foreground">{data.quote.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="overflow-hidden rounded-3xl border bg-primary px-8 py-14 text-center text-primary-foreground sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Ready to see Cadence work for your team?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Join thousands of teams shipping faster, selling smarter, and delighting customers — all on one platform.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" variant="secondary" className="gap-2">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Talk to sales
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> No credit card required</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> Setup in under 10 minutes</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Workflow className="h-4 w-4" />
            </div>
            <span className="font-medium text-foreground">Cadence</span>
          </div>
          <p>&copy; 2026 Cadence, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#solutions" className="transition-colors hover:text-foreground">Solutions</a>
            <a href="#workflow" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#story" className="transition-colors hover:text-foreground">Customers</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
