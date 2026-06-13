"use client"

import * as React from "react"
import {
  Package,
  Leaf,
  Truck,
  Calendar,
  Gift,
  Star,
  Check,
  ArrowRight,
  Coffee,
  Cookie,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Quote,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const PLANS = [
  {
    id: "monthly",
    label: "Monthly",
    cadence: "every month",
    price: 32,
    per: "/box",
    note: "Cancel anytime",
    save: null as string | null,
  },
  {
    id: "quarterly",
    label: "Every 3 months",
    cadence: "every 3 months",
    price: 28,
    per: "/box",
    note: "Most popular",
    save: "Save 12%",
  },
  {
    id: "annual",
    label: "Annual",
    cadence: "12 boxes a year",
    price: 24,
    per: "/box",
    note: "Best value",
    save: "Save 25%",
  },
]

const STEPS = [
  {
    icon: Leaf,
    title: "Tell us your taste",
    desc: "Take our 60-second flavor quiz so every box matches what you actually love.",
  },
  {
    icon: Package,
    title: "We curate the box",
    desc: "Our tasting team hand-picks 6–8 small-batch treats from independent makers.",
  },
  {
    icon: Truck,
    title: "It lands at your door",
    desc: "Free carbon-neutral shipping, delivered on a schedule that suits you.",
  },
  {
    icon: RefreshCw,
    title: "Adjust or skip anytime",
    desc: "Pause, swap, or cancel in a tap. You are always in control of your boxes.",
  },
]

const INSIDE = [
  { icon: Coffee, name: "Single-origin coffee", tag: "Roasted this week" },
  { icon: Cookie, name: "Artisan biscuits", tag: "Small batch" },
  { icon: Gift, name: "Seasonal surprise", tag: "Limited edition" },
  { icon: Leaf, name: "Organic tea blend", tag: "Caffeine-free" },
  { icon: Sparkles, name: "Maker spotlight", tag: "New each month" },
  { icon: Package, name: "Recipe card", tag: "Pairing guide" },
]

const REVIEWS = [
  {
    name: "Priya N.",
    handle: "@priyabakes",
    quote:
      "Every box feels like a tiny holiday. The coffee alone is worth the price, and I have discovered three makers I now buy from directly.",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
  },
  {
    name: "Marcus L.",
    handle: "@marcus.eats",
    quote:
      "I gifted a quarterly plan to my parents and they text me a photo of every delivery. Best recurring gift I have ever sent.",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
  },
  {
    name: "Dana R.",
    handle: "@danatastes",
    quote:
      "Skipping a month is genuinely one tap. No emails, no guilt. The curation keeps getting smarter the longer I subscribe.",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
  },
]

const FAQS = [
  {
    q: "When will my first box ship?",
    a: "Orders placed before Thursday ship the following Monday. You will get a tracking link by email the moment it leaves our warehouse.",
  },
  {
    q: "Can I skip or pause a delivery?",
    a: "Yes — manage everything from your account. Skip a single box, pause for as long as you like, or cancel with no fees and no phone calls.",
  },
  {
    q: "What if I have allergies or dietary needs?",
    a: "Our flavor quiz captures allergies and preferences, and we label every item. You can flag nut-free, vegan, or gluten-free at any time.",
  },
  {
    q: "Do you ship internationally?",
    a: "We currently ship across the US, Canada, and the UK with free carbon-neutral delivery. More regions are rolling out this year.",
  },
]

export default function SubscriptionBoxTemplate() {
  const [planId, setPlanId] = React.useState("quarterly")
  const activePlan = PLANS.find((p) => p.id === planId) ?? PLANS[1]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Package className="h-4 w-4" />
            </span>
            <span className="text-lg tracking-tight">Crate &amp; Crumb</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#inside" className="transition-colors hover:text-foreground">What's inside</a>
            <a href="#plans" className="transition-colors hover:text-foreground">Plans</a>
            <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm" asChild>
              <a href="#plans">Get started</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero with plan selector */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Over 40,000 happy crates shipped
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                A box of small-batch joy, delivered on your schedule
              </h1>
              <p className="mt-4 max-w-md text-pretty text-lg text-muted-foreground">
                Hand-curated treats from independent makers, matched to your taste.
                Pick a plan, skip anytime, and never get the same box twice.
              </p>

              <div className="mt-8">
                <p className="mb-3 text-sm font-medium">Choose your delivery</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PLANS.map((plan) => {
                    const active = plan.id === planId
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setPlanId(plan.id)}
                        aria-pressed={active}
                        className={cn(
                          "rounded-xl border bg-card p-4 text-left transition-all",
                          active
                            ? "border-primary ring-2 ring-primary/40"
                            : "hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{plan.label}</span>
                          {active && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="mt-2 text-2xl font-bold">
                          ${plan.price}
                          <span className="text-sm font-normal text-muted-foreground">{plan.per}</span>
                        </div>
                        {plan.save && (
                          <span className="mt-1 inline-block text-xs font-medium text-primary">
                            {plan.save}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button size="lg" className="gap-2" asChild>
                    <a href="#plans">
                      Start at ${activePlan.price}/box <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Billed {activePlan.cadence} · {activePlan.note}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> Free shipping</span>
                <span className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4 text-primary" /> Skip anytime</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> No commitment</span>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden">
                <div className="aspect-[4/3] w-full bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=900&q=60"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">This month: The Cozy Edit</p>
                      <p className="text-sm text-muted-foreground">8 items · curated for slow mornings</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                </CardContent>
              </Card>
              <div className="absolute -bottom-5 -left-5 hidden rounded-xl border bg-card p-4 shadow-sm sm:block">
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-sm font-medium">4.9 / 5 from 6,200 reviews</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">How it works</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From quiz to doorstep in four steps</h2>
            <p className="mt-3 text-muted-foreground">
              We do the curating. You do the unboxing. Here is the whole journey.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="relative">
                <CardContent className="p-6">
                  <span className="absolute right-4 top-4 text-sm font-semibold text-muted-foreground">
                    0{i + 1}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What's inside */}
        <section id="inside" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-3">What's inside</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A peek at a typical crate</h2>
                <p className="mt-3 text-muted-foreground">
                  Six to eight full-size treats, never miniatures. Contents rotate every box.
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href="#plans" className="gap-2">See past boxes <ArrowRight className="h-4 w-4" /></a>
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INSIDE.map((item) => (
                <div key={item.name} className="flex items-center gap-4 rounded-xl border bg-card p-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent">
                    <item.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plan tiers */}
        <section id="plans" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Plans</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pick a cadence, change it whenever</h2>
            <p className="mt-3 text-muted-foreground">
              The longer your commitment, the more you save per box. No cancellation fees, ever.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const featured = plan.id === "quarterly"
              return (
                <Card
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col",
                    featured && "border-primary shadow-sm ring-1 ring-primary/30"
                  )}
                >
                  {featured && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-base font-medium text-muted-foreground">
                      {plan.label}
                    </CardTitle>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">{plan.per}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Billed {plan.cadence}</p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <Separator className="mb-5" />
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2"><Check className="h-4 w-4 flex-shrink-0 text-primary" /> 6–8 curated full-size items</li>
                      <li className="flex gap-2"><Check className="h-4 w-4 flex-shrink-0 text-primary" /> Free carbon-neutral shipping</li>
                      <li className="flex gap-2"><Check className="h-4 w-4 flex-shrink-0 text-primary" /> Skip, pause, or cancel anytime</li>
                      {plan.save && (
                        <li className="flex gap-2 font-medium text-primary">
                          <Sparkles className="h-4 w-4 flex-shrink-0" /> {plan.save} vs monthly
                        </li>
                      )}
                    </ul>
                    <Button
                      className="mt-6 w-full"
                      variant={featured ? "default" : "outline"}
                      onClick={() => setPlanId(plan.id)}
                    >
                      {plan.id === planId ? "Selected" : "Choose plan"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-3">Reviews</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by snackers everywhere</h2>
              <p className="mt-3 text-muted-foreground">
                Real notes from real subscribers. Average rating 4.9 out of 5.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {REVIEWS.map((r) => (
                <Card key={r.name} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed">{r.quote}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={r.avatar} alt="" />
                        <AvatarFallback>{r.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.handle}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-0.5 text-primary">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <Badge variant="outline" className="mb-3">FAQ</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered</h2>
            <p className="mt-3 text-muted-foreground">
              Still curious? Email hello@crateandcrumb.co and a human will reply.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Subscribe CTA */}
        <section className="border-t bg-primary/10">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 lg:py-24">
            <Calendar className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your first crate ships Monday
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Lock in the {activePlan.label.toLowerCase()} plan at ${activePlan.price}/box.
              Drop your email and we will save your spot.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="you@example.com" aria-label="Email address" className="bg-background" />
              <Button type="submit" size="lg" className="gap-2">
                Start subscription <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              No commitment · Cancel anytime · Free shipping on every box
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Package className="h-4 w-4" />
                </span>
                Crate &amp; Crumb
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Small-batch treats from independent makers, delivered to your door on your schedule.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Button variant="ghost" size="icon" aria-label="Instagram"><Instagram className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Twitter"><Twitter className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" aria-label="Facebook"><Facebook className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium">Shop</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#plans" className="hover:text-foreground">Plans</a></li>
                  <li><a href="#inside" className="hover:text-foreground">Past boxes</a></li>
                  <li><a href="#" className="hover:text-foreground">Gift cards</a></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Company</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Our makers</a></li>
                  <li><a href="#" className="hover:text-foreground">Sustainability</a></li>
                  <li><a href="#" className="hover:text-foreground">Careers</a></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Support</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact</a></li>
                  <li><a href="#" className="hover:text-foreground">Shipping</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Crate &amp; Crumb. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
