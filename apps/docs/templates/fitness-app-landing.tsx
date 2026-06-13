"use client"

import * as React from "react"
import {
  Activity,
  Apple,
  ArrowRight,
  Check,
  ChevronRight,
  Dumbbell,
  Flame,
  HeartPulse,
  Menu,
  Play,
  Quote,
  Smartphone,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"

const navLinks = ["Features", "Programs", "Pricing", "Reviews", "FAQ"]

const features = [
  {
    icon: Dumbbell,
    title: "Personalized plans",
    body: "Adaptive workouts that recalibrate every week based on your effort, recovery, and goals.",
  },
  {
    icon: Activity,
    title: "Real-time tracking",
    body: "Log sets, reps, and heart rate in one tap. Watch every PR climb on a live dashboard.",
  },
  {
    icon: HeartPulse,
    title: "1:1 coaching",
    body: "Message a certified coach any time, get form feedback on video, and stay accountable.",
  },
]

const programs = {
  Strength: {
    icon: Dumbbell,
    title: "Hypertrophy Builder",
    blurb: "Progressive overload split engineered to add lean mass across 12 focused weeks.",
    duration: "12 weeks",
    sessions: "4 / week",
    level: "Intermediate",
    moves: ["Barbell Back Squat", "Romanian Deadlift", "Weighted Pull-Up", "Incline Press"],
  },
  Cardio: {
    icon: Flame,
    title: "Engine Accelerator",
    blurb: "Zone-based intervals and steady-state work to torch calories and raise your VO2 max.",
    duration: "8 weeks",
    sessions: "5 / week",
    level: "All levels",
    moves: ["Tempo Run Intervals", "Rowing Pyramids", "Assault Bike Sprints", "Incline Walk"],
  },
  Yoga: {
    icon: Sparkles,
    title: "Mobility Flow",
    blurb: "Daily flows that unlock hips and shoulders while building calm, controlled breathing.",
    duration: "6 weeks",
    sessions: "Daily",
    level: "Beginner",
    moves: ["Sun Salutation A", "Pigeon Hold", "Warrior Sequence", "Restorative Wind-Down"],
  },
} as const

type ProgramKey = keyof typeof programs

const stats = [
  { value: "2.4M", label: "Active members" },
  { value: "180M+", label: "Workouts logged" },
  { value: "4.9", label: "App Store rating" },
  { value: "92%", label: "Hit weekly goals" },
]

const testimonials = [
  {
    quote:
      "Down 18 pounds and my deadlift is up 60. The plan just keeps adjusting — I never plateau anymore.",
    name: "Maya Okonkwo",
    role: "Member · 14 months",
    initials: "MO",
  },
  {
    quote:
      "Having a coach in my pocket changed everything. Form checks over video saved my shoulders.",
    name: "Diego Ramirez",
    role: "Member · 8 months",
    initials: "DR",
  },
  {
    quote:
      "I actually look forward to training now. The streaks and live stats are weirdly addictive.",
    name: "Priya Nair",
    role: "Member · 2 years",
    initials: "PN",
  },
]

const plans = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    tagline: "Try the basics free, forever.",
    features: ["3 starter programs", "Workout logging", "Community challenges"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    monthly: 14,
    annual: 9,
    tagline: "Everything you need to progress.",
    features: [
      "All training programs",
      "Adaptive plan engine",
      "Advanced progress analytics",
      "Apple Watch & wearables sync",
    ],
    cta: "Start 7-day trial",
    highlight: true,
  },
  {
    name: "Coached",
    monthly: 49,
    annual: 39,
    tagline: "Pro plus a dedicated human coach.",
    features: [
      "Everything in Pro",
      "1:1 certified coach",
      "Weekly video form reviews",
      "Custom nutrition guidance",
    ],
    cta: "Match me with a coach",
    highlight: false,
  },
]

const faqs = [
  {
    q: "Do I need equipment to get started?",
    a: "Not at all. Most programs offer a bodyweight or minimal-equipment variation, and you can filter by exactly what you have at home or in your gym.",
  },
  {
    q: "Can I switch programs whenever I want?",
    a: "Yes. Swap between Strength, Cardio, and Yoga tracks at any time — your history, streaks, and PRs all carry over automatically.",
  },
  {
    q: "How does the coaching plan work?",
    a: "You're matched with a certified coach who reviews your goals, builds your weekly plan, and gives feedback on form videos. Message them any time in the app.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Pro includes a 7-day free trial with no commitment. Cancel anytime before it ends and you won't be charged.",
  },
]

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px]">
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-primary/10 blur-2xl" aria-hidden="true" />
      <div className="rounded-[2.75rem] border-8 border-foreground/90 bg-card p-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-muted" aria-hidden="true" />
        <div className="space-y-3 rounded-[1.75rem] bg-muted/30 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Today</p>
              <p className="text-lg font-semibold">Push Day</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Flame className="h-5 w-5" />
            </span>
          </div>
          <Card className="border-none bg-card">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Calories</span>
                <span className="text-muted-foreground">412 / 600</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[68%] rounded-full bg-primary" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { k: "Sets", v: "18" },
                  { k: "Time", v: "42m" },
                  { k: "BPM", v: "138" },
                ].map((m) => (
                  <div key={m.k} className="rounded-lg bg-muted/50 py-2">
                    <p className="text-base font-semibold">{m.v}</p>
                    <p className="text-[10px] text-muted-foreground">{m.k}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-3 text-primary">
            <Trophy className="h-5 w-5" />
            <p className="text-xs font-medium">New PR: Bench Press 185 lb</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StoreButton({ icon: Icon, top, bottom }: { icon: React.ElementType; top: string; bottom: string }) {
  return (
    <Button
      variant="default"
      size="lg"
      className="h-14 gap-3 rounded-xl px-5"
    >
      <Icon className="h-6 w-6" />
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-normal opacity-80">{top}</span>
        <span className="text-sm font-semibold">{bottom}</span>
      </span>
    </Button>
  )
}

export default function FitnessAppLanding() {
  const [program, setProgram] = React.useState<ProgramKey>("Strength")
  const [annual, setAnnual] = React.useState(true)

  const active = programs[program]
  const ActiveIcon = active.icon

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Dumbbell className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Pulse</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button size="sm" className="gap-1.5">
              Get the app
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-background" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                New: AI-adaptive plans
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Train smarter.
                <span className="block text-primary">Get stronger.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Pulse builds a workout plan around your body, tracks every rep in real time, and pairs you with a coach who keeps you moving.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <StoreButton icon={Apple} top="Download on the" bottom="App Store" />
                <StoreButton icon={Play} top="Get it on" bottom="Google Play" />
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2" aria-hidden="true">
                  {["bg-primary", "bg-accent", "bg-secondary", "bg-muted"].map((c, i) => (
                    <span key={i} className={cn("h-8 w-8 rounded-full border-2 border-background", c)} />
                  ))}
                </div>
                <span>
                  <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                    <Star className="h-4 w-4 fill-current text-primary" /> 4.9
                  </span>{" "}
                  from 50k+ reviews
                </span>
              </div>
            </div>
            <PhoneMockup />
          </div>
        </section>

        {/* Stats band */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything in one app</h2>
            <p className="mt-3 text-muted-foreground">
              Plans, tracking, and coaching that work together so you never have to guess what comes next.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <Card key={f.title} className="border bg-card transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Interactive programs */}
        <section id="programs" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pick your track</h2>
              <p className="mt-3 text-muted-foreground">
                Switch focus any time — your stats and streaks follow you across every program.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-full border bg-background p-1">
                {(Object.keys(programs) as ProgramKey[]).map((key) => {
                  const Icon = programs[key].icon
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setProgram(key)}
                      aria-pressed={program === key}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                        program === key
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {key}
                    </button>
                  )
                })}
              </div>
            </div>

            <Card className="mx-auto mt-10 max-w-4xl overflow-hidden border bg-card">
              <CardContent className="grid gap-8 p-8 md:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <ActiveIcon className="h-6 w-6" />
                    </span>
                    <Badge variant="outline">{program}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">{active.title}</h3>
                  <p className="mt-2 text-muted-foreground">{active.blurb}</p>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { icon: Timer, label: "Duration", value: active.duration },
                      { icon: Activity, label: "Frequency", value: active.sessions },
                      { icon: TrendingUp, label: "Level", value: active.level },
                    ].map((m) => {
                      const MIcon = m.icon
                      return (
                        <div key={m.label} className="rounded-xl border bg-muted/30 p-3 text-center">
                          <MIcon className="mx-auto mb-1 h-4 w-4 text-primary" />
                          <p className="text-sm font-semibold">{m.value}</p>
                          <p className="text-[11px] text-muted-foreground">{m.label}</p>
                        </div>
                      )
                    })}
                  </div>
                  <Button className="mt-6 gap-1.5">
                    Start {active.title}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="rounded-2xl border bg-muted/30 p-6">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Sample session
                  </p>
                  <ul className="space-y-3">
                    {active.moves.map((move, i) => (
                      <li key={move} className="flex items-center gap-3 rounded-lg bg-background p-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium">{move}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by people who move</h2>
            <p className="mt-3 text-muted-foreground">
              Real results from members who showed up, one workout at a time.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border bg-card">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="h-7 w-7 text-primary/40" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed">{t.quote}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Plans for every goal</h2>
              <p className="mt-3 text-muted-foreground">Start free. Upgrade when you're ready to push harder.</p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className={cn("text-sm font-medium", !annual && "text-foreground", annual && "text-muted-foreground")}>
                Monthly
              </span>
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
                    "absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform",
                    annual ? "translate-x-[1.375rem]" : "translate-x-0.5"
                  )}
                />
              </button>
              <span className={cn("text-sm font-medium", annual && "text-foreground", !annual && "text-muted-foreground")}>
                Annual
              </span>
              <Badge variant="secondary" className="ml-1">Save 35%</Badge>
            </div>

            <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
              {plans.map((plan) => {
                const price = annual ? plan.annual : plan.monthly
                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      "relative flex flex-col border bg-card",
                      plan.highlight && "border-primary shadow-lg"
                    )}
                  >
                    {plan.highlight && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                    )}
                    <CardContent className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
                      <div className="mt-5 flex items-baseline gap-1">
                        <span className="text-4xl font-bold tracking-tight">${price}</span>
                        <span className="text-sm text-muted-foreground">/ mo</span>
                      </div>
                      {annual && price > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">Billed annually</p>
                      )}
                      <Separator className="my-6" />
                      <ul className="flex-1 space-y-3">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-6 w-full"
                        variant={plan.highlight ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered</h2>
            <p className="mt-3 text-muted-foreground">Everything you need to know before your first workout.</p>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <Card className="overflow-hidden border-none bg-primary text-primary-foreground">
            <CardContent className="relative flex flex-col items-center gap-6 p-10 text-center sm:p-16">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/15">
                <Smartphone className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your first workout is free</h2>
                <p className="mx-auto mt-3 max-w-md text-primary-foreground/80">
                  Download Pulse today and let an AI-built plan and a real coach take it from here.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Apple className="h-5 w-5" /> App Store
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Play className="h-5 w-5" /> Google Play
                </Button>
              </div>
              <p className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Users className="h-4 w-4" /> Join 2.4M members already training with Pulse
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Dumbbell className="h-4 w-4" />
                </span>
                Pulse
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                The workout app that adapts to you — plans, tracking, and coaching in your pocket.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {[
                { title: "Product", links: ["Features", "Programs", "Pricing", "Wearables"] },
                { title: "Company", links: ["About", "Coaches", "Careers", "Blog"] },
                { title: "Support", links: ["Help center", "Contact", "Privacy", "Terms"] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-sm font-semibold">{col.title}</p>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Pulse Fitness, Inc. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <HeartPulse className="h-4 w-4 text-primary" /> Built to keep you moving.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
