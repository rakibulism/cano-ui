"use client"

import * as React from "react"
import {
  Zap,
  Check,
  Star,
  ShieldCheck,
  Clock,
  Infinity as InfinityIcon,
  ArrowRight,
  Flame,
  RefreshCw,
  Layers,
  Lock,
  Headphones,
  TrendingUp,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const COUNTDOWN = [
  { value: "02", label: "Days" },
  { value: "11", label: "Hours" },
  { value: "47", label: "Mins" },
  { value: "09", label: "Secs" },
]

const INCLUDED = [
  "Unlimited projects and workspaces, forever",
  "All current and future Pro features at no extra cost",
  "Up to 25 team seats included on the Agency tier",
  "AI writing assistant with 50,000 monthly credits",
  "Priority email and live-chat support",
  "Commercial license for unlimited client work",
  "One-click import from Notion, Trello, and Asana",
  "Lifetime access — no recurring subscription, ever",
]

const TIERS = [
  {
    id: "starter",
    name: "Solo",
    price: 69,
    original: 468,
    blurb: "For freelancers and one-person shops.",
    perks: ["1 user seat", "10 active projects", "10k AI credits / mo", "Standard support"],
    codes: "1 code",
  },
  {
    id: "pro",
    name: "Studio",
    price: 138,
    original: 936,
    blurb: "For small teams shipping fast.",
    perks: ["5 user seats", "Unlimited projects", "25k AI credits / mo", "Priority support"],
    codes: "2 codes",
    popular: true,
  },
  {
    id: "agency",
    name: "Agency",
    price: 276,
    original: 1872,
    blurb: "For agencies serving many clients.",
    perks: ["25 user seats", "Unlimited everything", "50k AI credits / mo", "Dedicated manager"],
    codes: "4 codes",
  },
]

const FEATURES = [
  { icon: Layers, title: "Unlimited workspaces", desc: "Spin up a clean space for every client or product line — no caps, no overage fees." },
  { icon: Sparkles, title: "Built-in AI assistant", desc: "Draft briefs, summarize threads, and generate tasks with credits that refill monthly." },
  { icon: Lock, title: "Roles and permissions", desc: "Granular access controls keep clients in their lane and your team in control." },
  { icon: RefreshCw, title: "Real-time sync", desc: "Changes land instantly across web, desktop, and mobile — even offline edits reconcile." },
  { icon: Headphones, title: "Human support", desc: "Talk to real people over chat and email, with priority queues on paid tiers." },
  { icon: TrendingUp, title: "Insights dashboard", desc: "Track velocity, workload, and deadlines with reports you can export and share." },
]

const REVIEWS = [
  {
    quote: "Bought it in the first hour of the launch and it has paid for itself ten times over. The lifetime deal is a no-brainer.",
    name: "Marisol Vega",
    role: "Founder, Tide Studio",
    initials: "MV",
    img: "https://i.pravatar.cc/120?img=45",
    stars: 5,
  },
  {
    quote: "We replaced three separate subscriptions with this. Paying once and never seeing a renewal email is the dream.",
    name: "Devon Park",
    role: "Ops Lead, Northbound",
    initials: "DP",
    img: "https://i.pravatar.cc/120?img=13",
    stars: 5,
  },
  {
    quote: "Skeptical of LTDs but this one ships real updates every month. Support actually answered me in minutes.",
    name: "Priya Anand",
    role: "Solo designer",
    initials: "PA",
    img: "https://i.pravatar.cc/120?img=30",
    stars: 5,
  },
]

const FAQS = [
  {
    q: "What does \"lifetime\" actually mean here?",
    a: "You pay once and keep access for the lifetime of the product — no monthly or annual fees, ever. As long as we operate, your account stays active on the tier you bought.",
  },
  {
    q: "Do I get future features and updates?",
    a: "Yes. Every feature we ship to your tier going forward is included at no extra cost. You'll never be asked to upgrade to keep what you already have.",
  },
  {
    q: "Can I stack codes to unlock a higher tier?",
    a: "Absolutely. Each tier maps to a number of codes. Buy additional codes within 60 days of purchase to climb to Studio or Agency and unlock more seats and credits.",
  },
  {
    q: "What if it isn't right for me?",
    a: "You're covered by a 60-day money-back guarantee. Try everything, and if it's not a fit, request a full refund — no forms, no hassle.",
  },
  {
    q: "Is there a limit on how many I can buy?",
    a: "This launch is capped at 1,000 lifetime licenses. Once they're gone, the deal ends and we return to standard monthly pricing.",
  },
]

const STATS = [
  { value: "1,000", label: "licenses only" },
  { value: "823", label: "already claimed" },
  { value: "4.9/5", label: "average rating" },
]

export default function LifetimeDeal() {
  const [selected, setSelected] = React.useState("pro")
  const active = TIERS.find((t) => t.id === selected) ?? TIERS[1]
  const savings = active.original - active.price

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Urgency banner */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2 px-6 py-2 text-center text-sm font-medium">
          <Flame className="h-4 w-4" />
          Launch week pricing ends soon — 823 of 1,000 codes claimed
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            Flowdeck
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#included" className="transition-colors hover:text-foreground">What you get</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Button size="sm" className="gap-1" asChild>
            <a href="#pricing">
              Get the deal <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center sm:py-24">
            <Badge variant="secondary" className="mb-6 gap-1">
              <InfinityIcon className="h-3 w-3" />
              One-time payment · Lifetime access
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Pay once. Use Flowdeck forever.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              The project hub that replaces your stack of monthly subscriptions —
              now available as a limited lifetime deal. No renewals, no surprises.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-2xl font-medium text-muted-foreground line-through">
                $936
              </span>
              <span className="text-5xl font-bold tracking-tight">$138</span>
              <Badge className="gap-1">
                <Flame className="h-3 w-3" /> Save 85%
              </Badge>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="#pricing">
                  Claim your lifetime deal <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                60-day money-back guarantee
              </span>
            </div>

            {/* Countdown */}
            <div className="mx-auto mt-12 max-w-md">
              <p className="mb-3 flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" /> Offer ends in
              </p>
              <div className="grid grid-cols-4 gap-3">
                {COUNTDOWN.map((c) => (
                  <div key={c.label} className="rounded-xl border bg-card py-3">
                    <div className="text-2xl font-bold tabular-nums sm:text-3xl">{c.value}</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-lg items-center justify-center gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold sm:text-3xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get checklist */}
        <section id="included" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <Badge variant="outline" className="mb-4">Everything included</Badge>
                <h2 className="text-3xl font-bold tracking-tight">
                  One purchase. The whole toolkit.
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  No tiered paywalls hiding the good stuff. Your lifetime license
                  unlocks the features teams actually pay monthly for — kept up to
                  date for as long as you own it.
                </p>
                <Button className="mt-8 gap-2" asChild>
                  <a href="#pricing">
                    See the plans <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <Card className="border bg-card">
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {INCLUDED.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing tiers with selection */}
        <section id="pricing" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4 gap-1">
                <InfinityIcon className="h-3 w-3" /> Lifetime plans
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Choose your lifetime tier
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                Pick a tier and pay once. Stack codes within 60 days if you grow.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {TIERS.map((tier) => {
                const isActive = tier.id === selected
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelected(tier.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative flex flex-col rounded-2xl border bg-card p-6 text-left transition-all hover:shadow-md",
                      isActive ? "border-primary ring-2 ring-primary" : "border"
                    )}
                  >
                    {tier.popular && (
                      <Badge className="absolute -top-3 left-6 gap-1">
                        <Star className="h-3 w-3 fill-current" /> Most popular
                      </Badge>
                    )}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{tier.name}</h3>
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                          isActive ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"
                        )}
                      >
                        {isActive && <Check className="h-3 w-3" />}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{tier.blurb}</p>
                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-4xl font-bold tracking-tight">${tier.price}</span>
                      <span className="mb-1 text-sm text-muted-foreground line-through">
                        ${tier.original}
                      </span>
                    </div>
                    <Badge variant="outline" className="mt-3 w-fit">{tier.codes} · one-time</Badge>
                    <Separator className="my-5" />
                    <ul className="space-y-3">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 shrink-0 text-primary" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </button>
                )
              })}
            </div>

            {/* Selection summary / buy CTA */}
            <Card className="mt-8 border bg-card">
              <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">You selected</p>
                  <p className="text-xl font-semibold">
                    {active.name} — ${active.price}{" "}
                    <span className="text-sm font-normal text-muted-foreground line-through">
                      ${active.original}
                    </span>
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-primary">
                    <Flame className="h-4 w-4" /> You save ${savings} for life
                  </p>
                </div>
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  Buy {active.name} now <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features grid */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Everything you'd expect — and then some
              </h2>
              <p className="mt-3 text-muted-foreground">
                Flowdeck isn't a stripped-down lifetime gimmick. It's the full
                product, built to run your work for years.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <Card key={f.title} className="border bg-card">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <div className="mb-3 flex items-center justify-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Loved by 823 lifetime buyers
              </h2>
              <p className="mt-3 text-muted-foreground">Rated 4.9 out of 5 across the launch.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {REVIEWS.map((r) => (
                <Card key={r.name} className="border bg-card">
                  <CardContent className="flex h-full flex-col pt-6">
                    <div className="flex gap-1 text-primary">
                      {Array.from({ length: r.stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed">"{r.quote}"</p>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={r.img} alt="" />
                        <AvatarFallback>{r.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <Card className="border bg-card">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center md:flex-row md:text-left">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </span>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold tracking-tight">
                    Try it risk-free for 60 days
                  </h2>
                  <p className="mt-2 max-w-2xl text-muted-foreground">
                    Buy the deal, use every feature, and bring your whole team on
                    board. If Flowdeck isn't right for you within 60 days, we'll
                    refund every cent — no questions, no forms.
                  </p>
                </div>
                <Button size="lg" className="gap-2 md:shrink-0" asChild>
                  <a href="#pricing">
                    Get started <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Questions, answered</h2>
              <p className="mt-3 text-muted-foreground">
                Everything you need to know before you claim the deal.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final buy CTA */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10">
              <InfinityIcon className="h-6 w-6" />
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Lock in lifetime access before the codes run out
            </h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Once all 1,000 licenses are claimed, Flowdeck goes back to monthly
              pricing. Pay once today and never see a renewal again.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2">
                Claim my lifetime deal <ArrowRight className="h-4 w-4" />
              </Button>
              <span className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
                <Clock className="h-4 w-4" /> Only 177 codes left
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="h-3 w-3" />
            </span>
            <span className="font-medium text-foreground">Flowdeck</span>
          </div>
          <nav className="flex gap-6">
            <a href="#included" className="transition-colors hover:text-foreground">What you get</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <p>© 2026 Flowdeck. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
