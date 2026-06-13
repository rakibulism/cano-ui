"use client"

import * as React from "react"
import {
  Activity,
  Apple,
  Bell,
  Check,
  ChevronRight,
  Flame,
  LineChart,
  Play,
  Quote,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

type FeatureKey = "streaks" | "reminders" | "insights"

const FEATURES: {
  key: FeatureKey
  label: string
  icon: React.ElementType
  title: string
  body: string
  bullets: string[]
}[] = [
  {
    key: "streaks",
    label: "Streaks",
    icon: Flame,
    title: "Keep the chain alive",
    body: "Watch your streak grow day after day. A single tap marks a habit done, and the momentum does the rest.",
    bullets: ["Visual streak counter", "Freeze days for travel", "Milestone celebrations"],
  },
  {
    key: "reminders",
    label: "Reminders",
    icon: Bell,
    title: "Gentle nudges, never nagging",
    body: "Smart reminders learn when you are most likely to follow through and quietly show up at the right moment.",
    bullets: ["Adaptive timing", "Location triggers", "Calm notification tone"],
  },
  {
    key: "insights",
    label: "Insights",
    icon: LineChart,
    title: "See what is actually working",
    body: "Weekly trends and completion heatmaps turn your effort into a story you can read at a glance.",
    bullets: ["Completion heatmap", "Best-time analysis", "Habit correlations"],
  },
]

const SHOWCASE: Record<
  FeatureKey,
  { metric: string; metricLabel: string; rows: { name: string; value: number }[] }
> = {
  streaks: {
    metric: "47",
    metricLabel: "day streak",
    rows: [
      { name: "Morning run", value: 92 },
      { name: "Read 20 min", value: 78 },
      { name: "No sugar", value: 64 },
    ],
  },
  reminders: {
    metric: "8:30",
    metricLabel: "ideal nudge time",
    rows: [
      { name: "Meditate", value: 88 },
      { name: "Stretch", value: 71 },
      { name: "Journal", value: 55 },
    ],
  },
  insights: {
    metric: "+18%",
    metricLabel: "vs last month",
    rows: [
      { name: "Consistency", value: 84 },
      { name: "Mornings", value: 67 },
      { name: "Weekends", value: 49 },
    ],
  },
}

const BENEFITS = [
  {
    icon: Target,
    title: "Tiny goals, real change",
    body: "Break big ambitions into daily wins that compound into lasting habits.",
  },
  {
    icon: Activity,
    title: "Stay accountable",
    body: "Share progress with a friend or keep it private. Either way you show up.",
  },
  {
    icon: Sparkles,
    title: "Built to feel good",
    body: "A calm, friendly interface that rewards effort instead of guilting you.",
  },
  {
    icon: TrendingUp,
    title: "Progress you can trust",
    body: "Honest stats with no vanity metrics, so you always know where you stand.",
  },
]

const TESTIMONIALS = [
  {
    quote: "I finally hit a 60-day meditation streak. The nudges feel like a friend, not an alarm.",
    name: "Maya R.",
    role: "Designer",
  },
  {
    quote: "The insights tab showed me I quit on weekends. One tweak later and I am consistent.",
    name: "Devon K.",
    role: "Engineer",
  },
  {
    quote: "Simple enough that I actually open it every morning. That is the whole game.",
    name: "Priya S.",
    role: "Teacher",
  },
]

const FAQS = [
  {
    q: "Is there really a free plan?",
    a: "Yes. The free plan lets you track up to three habits forever, with daily reminders and a 7-day history.",
  },
  {
    q: "Does it work offline?",
    a: "Absolutely. Mark habits done anywhere and everything syncs the moment you reconnect.",
  },
  {
    q: "Can I cancel anytime?",
    a: "You can cancel in two taps. Your data stays exportable for 30 days after you leave.",
  },
  {
    q: "Which platforms are supported?",
    a: "Streak is available on iOS, Android, and the web, with a watch companion for quick check-ins.",
  },
]

const PRICING = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    tagline: "For getting started",
    features: ["3 habits", "Daily reminders", "7-day history"],
    highlight: false,
  },
  {
    name: "Pro",
    monthly: 6,
    annual: 4,
    tagline: "For building momentum",
    features: ["Unlimited habits", "Smart reminders", "Full insights", "Streak freezes"],
    highlight: true,
  },
  {
    name: "Circle",
    monthly: 10,
    annual: 7,
    tagline: "For you and a partner",
    features: ["Everything in Pro", "Shared goals", "Accountability buddy", "Priority support"],
    highlight: false,
  },
]

export default function HabitTrackerLanding() {
  const [feature, setFeature] = React.useState<FeatureKey>("streaks")
  const [annual, setAnnual] = React.useState(true)
  const active = FEATURES.find((f) => f.key === feature) ?? FEATURES[0]
  const show = SHOWCASE[feature]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Flame className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Streak</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#progress" className="transition-colors hover:text-foreground">Progress</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log in</Button>
            <Button size="sm" className="rounded-full">Get the app</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 rounded-full">
                <Sparkles className="mr-1 h-3 w-3" /> Loved by 1M+ habit builders
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Small habits,{" "}
                <span className="text-primary">big momentum</span>.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Streak turns the habits you keep meaning to start into a daily routine you actually
                look forward to.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="rounded-full">
                  <Apple className="mr-1 h-4 w-4" /> App Store
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  <Play className="mr-1 h-4 w-4" /> Google Play
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="-ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium first:ml-0"
                    >
                      {["M", "D", "P", "A"][i]}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <span className="ml-1">4.9 average rating</span>
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center">
              <div className="relative w-[280px] rounded-[2.5rem] border-8 border-foreground/90 bg-card p-3 shadow-2xl">
                <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-muted" />
                <div className="space-y-3 rounded-2xl bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Today</span>
                    <Badge className="rounded-full">
                      <Flame className="mr-1 h-3 w-3" /> 47
                    </Badge>
                  </div>
                  {[
                    { n: "Morning run", done: true },
                    { n: "Drink water", done: true },
                    { n: "Read 20 min", done: false },
                    { n: "Meditate", done: false },
                  ].map((h) => (
                    <div
                      key={h.n}
                      className="flex items-center justify-between rounded-xl bg-card p-3"
                    >
                      <span className="text-sm">{h.n}</span>
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full border",
                          h.done
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border"
                        )}
                      >
                        {h.done ? <Check className="h-3.5 w-3.5" /> : null}
                      </span>
                    </div>
                  ))}
                  <div className="rounded-xl bg-primary/10 p-3 text-center text-xs text-primary">
                    2 of 4 done — keep it up!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature tabs */}
        <section id="features" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to stick with it
              </h2>
              <p className="mt-3 text-muted-foreground">
                Three pillars that work together to keep you consistent.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {FEATURES.map((f) => {
                const Icon = f.icon
                const isActive = f.key === feature
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFeature(f.key)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    )}
                    aria-pressed={isActive}
                  >
                    <Icon className="h-4 w-4" /> {f.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Badge variant="outline" className="mb-4 rounded-full">
                  <active.icon className="mr-1 h-3 w-3" /> {active.label}
                </Badge>
                <h3 className="text-2xl font-semibold tracking-tight">{active.title}</h3>
                <p className="mt-3 text-muted-foreground">{active.body}</p>
                <ul className="mt-6 space-y-3">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-4xl font-bold tracking-tight">{show.metric}</div>
                      <div className="text-sm text-muted-foreground">{show.metricLabel}</div>
                    </div>
                    <active.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="mt-6 space-y-4">
                    {show.rows.map((r) => (
                      <div key={r.name}>
                        <div className="mb-1.5 flex justify-between text-sm">
                          <span>{r.name}</span>
                          <span className="text-muted-foreground tabular-nums">{r.value}%</span>
                        </div>
                        <Progress value={r.value} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => {
              const Icon = b.icon
              return (
                <Card key={b.title} className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Progress highlight */}
        <section id="progress" className="border-y bg-primary/5">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 rounded-full">Your year at a glance</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Watch consistency become second nature
              </h2>
              <p className="mt-4 text-muted-foreground">
                The progress heatmap turns every completed habit into a square of color. Over weeks,
                a quiet grid becomes a wall of green you will not want to break.
              </p>
              <div className="mt-6 flex gap-8">
                <div>
                  <div className="text-3xl font-bold tracking-tight">312</div>
                  <div className="text-sm text-muted-foreground">habits this year</div>
                </div>
                <div>
                  <div className="text-3xl font-bold tracking-tight">86%</div>
                  <div className="text-sm text-muted-foreground">completion rate</div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="font-medium">Last 12 weeks</span>
                  <span className="text-muted-foreground">Mon → Sun</span>
                </div>
                <div className="grid grid-cols-[repeat(12,minmax(0,1fr))] gap-1.5">
                  {Array.from({ length: 84 }).map((_, i) => {
                    const levels = [
                      "bg-muted",
                      "bg-primary/30",
                      "bg-primary/60",
                      "bg-primary",
                    ]
                    const lvl = (i * 7 + (i % 5)) % 4
                    return (
                      <span
                        key={i}
                        className={cn("aspect-square rounded-sm", levels[lvl])}
                        aria-hidden="true"
                      />
                    )
                  })}
                </div>
                <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  <span>Less</span>
                  <span className="h-3 w-3 rounded-sm bg-muted" />
                  <span className="h-3 w-3 rounded-sm bg-primary/30" />
                  <span className="h-3 w-3 rounded-sm bg-primary/60" />
                  <span className="h-3 w-3 rounded-sm bg-primary" />
                  <span>More</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              People are sticking with it
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="h-6 w-6 text-primary" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed">{t.quote}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Simple pricing that grows with you
              </h2>
              <p className="mt-3 text-muted-foreground">
                Start free. Upgrade when your habits do.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className={cn("text-sm", !annual && "font-medium")}>Monthly</span>
              <button
                type="button"
                role="switch"
                aria-checked={annual}
                aria-label="Toggle annual billing"
                onClick={() => setAnnual((v) => !v)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  annual ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-all",
                    annual ? "left-[1.375rem]" : "left-0.5"
                  )}
                />
              </button>
              <span className={cn("text-sm", annual && "font-medium")}>
                Annual <Badge variant="secondary" className="ml-1 rounded-full">Save 30%</Badge>
              </span>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {PRICING.map((p) => {
                const price = annual ? p.annual : p.monthly
                return (
                  <Card
                    key={p.name}
                    className={cn(
                      "relative h-full",
                      p.highlight && "border-primary shadow-lg"
                    )}
                  >
                    {p.highlight && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full">
                        Most popular
                      </Badge>
                    )}
                    <CardContent className="flex h-full flex-col p-6">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <p className="text-sm text-muted-foreground">{p.tagline}</p>
                      <div className="mt-5 flex items-end gap-1">
                        <span className="text-4xl font-bold tracking-tight tabular-nums">
                          ${price}
                        </span>
                        <span className="mb-1 text-sm text-muted-foreground">/mo</span>
                      </div>
                      {annual && price > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          billed annually
                        </p>
                      )}
                      <ul className="mt-6 flex-1 space-y-3">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary" /> {f}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-6 w-full rounded-full"
                        variant={p.highlight ? "default" : "outline"}
                      >
                        {price === 0 ? "Start free" : "Choose " + p.name}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-16 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={"item-" + i}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20">
          <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center lg:p-16">
              <Flame className="h-10 w-10" />
              <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                Your first streak starts today
              </h2>
              <p className="max-w-md text-primary-foreground/80">
                Download Streak and build a habit that finally sticks. Free to start, no card needed.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" className="rounded-full">
                  <Apple className="mr-1 h-4 w-4" /> App Store
                </Button>
                <Button size="lg" variant="secondary" className="rounded-full">
                  <Play className="mr-1 h-4 w-4" /> Google Play
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Flame className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium text-foreground">Streak</span>
            <span>© 2026</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
            <a href="#" className="flex items-center gap-1 transition-colors hover:text-foreground">
              Privacy <ChevronRight className="h-3 w-3" />
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
