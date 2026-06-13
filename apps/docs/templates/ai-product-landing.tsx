"use client"

import * as React from "react"
import {
  Sparkles,
  ArrowRight,
  Wand2,
  PenLine,
  Languages,
  ShieldCheck,
  Gauge,
  FileText,
  Quote,
  Check,
  Zap,
  CornerDownLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const PROMPTS = [
  "Write a launch announcement for our new feature",
  "Turn these bullet points into a polished email",
  "Make this paragraph 40% shorter and punchier",
] as const

const CAPABILITIES = [
  {
    icon: Wand2,
    title: "Instant rewrites",
    desc: "Rephrase, expand, or tighten any passage in a single click without losing your voice.",
  },
  {
    icon: PenLine,
    title: "Brand-aware tone",
    desc: "Train Quill on your style guide so every draft sounds unmistakably like you.",
  },
  {
    icon: Languages,
    title: "32 languages",
    desc: "Draft, translate, and localize content while keeping nuance and intent intact.",
  },
  {
    icon: FileText,
    title: "Long-form drafts",
    desc: "Outline, draft, and polish articles, docs, and reports from a single prompt.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "Your content is never used for training. SOC 2 Type II and GDPR ready.",
  },
  {
    icon: Gauge,
    title: "Real-time scoring",
    desc: "Live readability, clarity, and tone signals as you write, right in the margin.",
  },
] as const

const STEPS = [
  {
    step: "01",
    title: "Drop in your draft",
    desc: "Paste text or start from a prompt. Quill reads the context instantly.",
  },
  {
    step: "02",
    title: "Pick a direction",
    desc: "Shorten, expand, change tone, or fix grammar with one tap.",
  },
  {
    step: "03",
    title: "Ship with confidence",
    desc: "Review tracked suggestions and export anywhere you write.",
  },
] as const

const TESTIMONIALS = [
  {
    quote:
      "Quill cut our content review cycle from three days to an afternoon. The tone matching is uncanny.",
    name: "Maya Chen",
    role: "Head of Content, Northwind",
    initials: "MC",
    img: "https://i.pravatar.cc/96?img=47",
  },
  {
    quote:
      "It is the first writing tool that actually sounds like our brand instead of a robot.",
    name: "Devon Park",
    role: "Marketing Lead, Lumen",
    initials: "DP",
    img: "https://i.pravatar.cc/96?img=12",
  },
  {
    quote:
      "I draft twice as fast and ship cleaner copy. The readability scoring is a game changer.",
    name: "Aria Solis",
    role: "Founder, Pagecraft",
    initials: "AS",
    img: "https://i.pravatar.cc/96?img=32",
  },
] as const

const LOGOS = ["Northwind", "Lumen", "Pagecraft", "Vela", "Orbit", "Kindred"] as const

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    desc: "For trying Quill on personal projects.",
    features: ["50 rewrites / month", "3 saved tones", "English only"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$24",
    period: "/mo",
    desc: "For writers and small teams shipping daily.",
    features: [
      "Unlimited rewrites",
      "Brand voice training",
      "32 languages",
      "Readability scoring",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
] as const

export default function AiProductLanding() {
  const [activePrompt, setActivePrompt] = React.useState(0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Quill
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                New: Brand voice training
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                The AI writing partner that{" "}
                <span className="text-primary">sounds like you</span>.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Quill drafts, rewrites, and polishes your words in seconds, while
                keeping your tone, intent, and ideas intact.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Try Quill free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch demo
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required. Cancel anytime.
              </p>
            </div>

            {/* Prompt-input mock */}
            <Card className="border-primary/20 shadow-lg">
              <CardHeader className="border-b">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-muted" />
                  <span className="h-3 w-3 rounded-full bg-muted" />
                  <span className="h-3 w-3 rounded-full bg-muted" />
                  <CardTitle className="ml-2 text-sm font-medium text-muted-foreground">
                    Ask Quill
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex flex-wrap gap-2">
                  {PROMPTS.map((p, i) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setActivePrompt(i)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs transition-colors",
                        activePrompt === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {p.split(" ").slice(0, 3).join(" ")}…
                    </button>
                  ))}
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-foreground">{PROMPTS[activePrompt]}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Quill is ready
                    </span>
                    <Button size="sm" className="gap-1.5">
                      Generate
                      <CornerDownLeft className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-full rounded bg-muted" />
                  <div className="h-2.5 w-11/12 rounded bg-muted" />
                  <div className="h-2.5 w-4/5 rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Logos */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by writing teams at
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {LOGOS.map((logo) => (
                <span
                  key={logo}
                  className="text-lg font-semibold text-muted-foreground/70"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              From rough to remarkable
            </h2>
            <p className="mt-3 text-muted-foreground">
              See exactly what Quill does to a first draft, with one prompt.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="bg-muted/30">
              <CardHeader>
                <Badge variant="outline" className="w-fit text-muted-foreground">
                  Before
                </Badge>
                <CardTitle className="text-base font-medium text-muted-foreground">
                  Your draft
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  we are happy to announce that our new product is now available
                  and we think it is really good and has a lot of features that
                  people will probably like a lot so check it out today maybe.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader>
                <Badge className="w-fit gap-1">
                  <Sparkles className="h-3 w-3" />
                  After
                </Badge>
                <CardTitle className="text-base font-medium">
                  Polished by Quill
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">
                  Our newest product is here, and we built it for the way you
                  actually work. Packed with features teams asked for, it is
                  ready to try today. Take it for a spin.
                </p>
              </CardContent>
              <CardFooter className="gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-3 w-3" /> Clearer
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-3 w-3" /> On-brand
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Check className="h-3 w-3" /> 38% shorter
                </Badge>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Capabilities */}
        <section id="features" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                Everything you need to write better, faster
              </h2>
              <p className="mt-3 text-muted-foreground">
                One assistant for every part of the writing workflow.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map((c) => (
                <Card key={c.title} className="bg-card transition-shadow hover:shadow-md">
                  <CardHeader>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="mt-3 text-lg">{c.title}</CardTitle>
                    <CardDescription>{c.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Three steps to a better draft
            </h2>
            <p className="mt-3 text-muted-foreground">
              No new workflow to learn. Quill fits where you already write.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="relative">
                <span className="text-5xl font-semibold text-primary/20">
                  {s.step}
                </span>
                <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">
                Loved by people who write for a living
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="bg-card">
                  <CardContent className="pt-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={t.img} alt="" />
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Simple, honest pricing
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start free. Upgrade when Quill becomes indispensable.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={cn(plan.featured && "border-primary shadow-lg")}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.featured && <Badge>Most popular</Badge>}
                  </div>
                  <CardDescription>{plan.desc}</CardDescription>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Separator className="mb-4" />
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary/10">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Write your best draft yet, today
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Join thousands of writers using Quill to ship clearer, sharper copy
              in a fraction of the time.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg">
                Start writing free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Talk to sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Quill
          </div>
          <p>© 2024 Quill Labs, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
