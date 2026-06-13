"use client"

import * as React from "react"
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  DollarSign,
  Gift,
  Globe,
  Link2,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Tiers", href: "#tiers" },
  { label: "Payouts", href: "#payouts" },
  { label: "Testimonials", href: "#proof" },
]

const STAT_BAND = [
  { icon: DollarSign, value: "$4.2M", label: "Paid to partners in 2025" },
  { icon: Users, value: "12,400+", label: "Active affiliates" },
  { icon: BadgePercent, value: "30%", label: "Recurring commission" },
  { icon: Globe, value: "90 days", label: "Cookie attribution window" },
]

const STEPS = [
  {
    icon: Link2,
    title: "Grab your link",
    body: "Sign up in two minutes and get a unique referral link plus ready-made creative assets.",
  },
  {
    icon: Sparkles,
    title: "Share & promote",
    body: "Drop your link in newsletters, videos, or your community. We track every click automatically.",
  },
  {
    icon: Wallet,
    title: "Get paid monthly",
    body: "Earn recurring commission on every customer you refer, paid out reliably on the 1st.",
  },
]

const TIERS = [
  {
    name: "Starter",
    rate: "20%",
    blurb: "For creators just getting started.",
    highlighted: false,
    perks: ["Recurring 20% commission", "30-day cookie window", "Self-serve dashboard", "Standard creative kit"],
  },
  {
    name: "Growth",
    rate: "30%",
    blurb: "For partners driving steady referrals.",
    highlighted: true,
    perks: ["Recurring 30% commission", "90-day cookie window", "Dedicated partner manager", "Co-marketing features"],
  },
  {
    name: "Elite",
    rate: "40%",
    blurb: "For top-performing power partners.",
    highlighted: false,
    perks: ["Recurring 40% commission", "120-day cookie window", "Custom landing pages", "Quarterly bonus pool"],
  },
]

const TESTIMONIALS = [
  {
    quote:
      "I added the affiliate link to one tutorial and it now pays my hosting bill every single month. The recurring model is the real deal.",
    name: "Mara Whitfield",
    role: "YouTube educator, 180K subs",
    initials: "MW",
    img: "https://i.pravatar.cc/120?img=47",
    earned: "$3,180 / mo",
  },
  {
    quote:
      "Payouts always land on time and the dashboard shows exactly where my conversions come from. Best partner program I've joined.",
    name: "Diego Alvarez",
    role: "SaaS newsletter writer",
    initials: "DA",
    img: "https://i.pravatar.cc/120?img=12",
    earned: "$5,940 / mo",
  },
  {
    quote:
      "My partner manager helped me build a custom landing page that doubled my conversion rate within a quarter. Genuinely supportive.",
    name: "Priya Nandakumar",
    role: "Marketing consultant",
    initials: "PN",
    img: "https://i.pravatar.cc/120?img=32",
    earned: "$8,210 / mo",
  },
]

const FAQS = [
  {
    q: "When and how do I get paid?",
    a: "Payouts run on the 1st of every month for balances above $50. We support PayPal, Wise, and direct bank transfer in 40+ countries.",
  },
  {
    q: "Is the commission really recurring?",
    a: "Yes. You earn commission for the full lifetime of every subscription you refer, not just the first payment.",
  },
  {
    q: "How long is the attribution window?",
    a: "Depending on your tier, referred visitors are attributed to you for 30 to 120 days after their first click.",
  },
  {
    q: "Do I need an audience to join?",
    a: "No minimum audience is required to start. Anyone can join the Starter tier and grow into Growth and Elite as referrals scale.",
  },
  {
    q: "What can I promote with?",
    a: "We provide banners, email swipe copy, demo videos, and a brand kit. Custom assets are available for Growth and Elite partners.",
  },
]

const CALC_PLANS = [
  { id: "team", label: "Team", price: 49 },
  { id: "business", label: "Business", price: 149 },
  { id: "scale", label: "Scale", price: 399 },
]

export default function AffiliateProgramPage() {
  const [referrals, setReferrals] = React.useState(25)
  const [plan, setPlan] = React.useState(CALC_PLANS[1])

  const rate = 0.3
  const monthly = Math.round(referrals * plan.price * rate)
  const yearly = monthly * 12

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BadgePercent className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Plinth Partners</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Become a partner
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_0%,theme(colors.primary/12%),transparent)]" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Recurring 30% commission
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Earn while you{" "}
                <span className="text-primary">share what you love</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Join thousands of creators turning recommendations into recurring monthly
                income. No fees, no caps, paid out like clockwork.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Start earning today
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  See commission rates
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {[15, 33, 51, 65].map((n) => (
                    <Avatar key={n} className="h-9 w-9 border-2 border-background">
                      <AvatarImage src={`https://i.pravatar.cc/64?img=${n}`} alt="" />
                      <AvatarFallback>P{n}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="ml-1">Loved by 12,400+ partners</span>
                </div>
              </div>
            </div>

            {/* Earnings calculator card */}
            <Card className="border-primary/30 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">Earnings calculator</CardTitle>
                </div>
                <CardDescription>
                  Estimate your recurring income at the 30% Growth tier.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="referrals">Referred customers / month</Label>
                    <span className="text-sm font-medium tabular-nums">{referrals}</span>
                  </div>
                  <input
                    id="referrals"
                    type="range"
                    min={1}
                    max={100}
                    value={referrals}
                    onChange={(e) => setReferrals(Number(e.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
                    aria-label="Referred customers per month"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Their plan</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {CALC_PLANS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlan(p)}
                        className={cn(
                          "rounded-lg border px-2 py-2.5 text-center text-sm transition-colors",
                          plan.id === p.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        <span className="block font-medium">{p.label}</span>
                        <span className="block text-xs">${p.price}/mo</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="rounded-xl bg-muted/30 p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">You could earn</p>
                      <p className="text-3xl font-semibold tabular-nums text-primary">
                        ${monthly.toLocaleString()}
                        <span className="text-base font-normal text-muted-foreground">/mo</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Per year</p>
                      <p className="text-xl font-semibold tabular-nums">
                        ${yearly.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Claim this income
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stat band */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-2 sm:px-6 lg:grid-cols-4">
            {STAT_BAND.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 px-2 py-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">How it works</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Start earning in three simple steps
            </h2>
            <p className="mt-4 text-muted-foreground">
              No technical setup, no waiting. Go from signup to your first payout faster than
              you'd expect.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="relative">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium tabular-nums text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tiers */}
        <section id="tiers" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">Commission tiers</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                The more you refer, the more you earn
              </h2>
              <p className="mt-4 text-muted-foreground">
                Climb tiers automatically as your referrals grow. Every tier pays recurring
                commission for the lifetime of the customer.
              </p>
            </div>
            <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
              {TIERS.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "relative flex flex-col",
                    tier.highlighted && "border-primary shadow-lg lg:scale-[1.03]"
                  )}
                >
                  {tier.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most popular
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight">{tier.rate}</span>
                      <span className="text-muted-foreground">recurring</span>
                    </div>
                    <CardDescription className="mt-1">{tier.blurb}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <ul className="space-y-3">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-6 w-full"
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      Join {tier.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4">Why partners stay</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built to reward the people who grow with us
              </h2>
              <p className="mt-4 text-muted-foreground">
                We obsess over fast payouts, transparent tracking, and the kind of support that
                actually moves your numbers.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  { icon: TrendingUp, title: "Real-time analytics", body: "See clicks, conversions, and earnings update live." },
                  { icon: ShieldCheck, title: "Reliable tracking", body: "Server-side attribution that never misses a sale." },
                  { icon: CreditCard, title: "On-time payouts", body: "Paid every month across 40+ countries." },
                  { icon: Gift, title: "Bonus pool", body: "Top partners share a quarterly performance bonus." },
                ].map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{b.title}</p>
                      <p className="text-sm text-muted-foreground">{b.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="bg-primary/5">
              <CardContent className="p-8">
                <Rocket className="h-8 w-8 text-primary" />
                <p className="mt-5 text-2xl font-medium leading-snug">
                  "Within six months our affiliate channel became our #2 source of new revenue.
                  The partners genuinely love promoting it."
                </p>
                <Separator className="my-6" />
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src="https://i.pravatar.cc/96?img=68" alt="" />
                    <AvatarFallback>RT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Rowan Tate</p>
                    <p className="text-sm text-muted-foreground">Head of Growth, Plinth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section id="proof" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">Partner stories</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Real people, real recurring income
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <Quote className="h-7 w-7 text-primary/40" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                      {t.quote}
                    </p>
                    <Separator className="my-5" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={t.img} alt="" />
                          <AvatarFallback>{t.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="tabular-nums">{t.earned}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Payouts / FAQ */}
        <section id="payouts" className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Payouts & FAQ</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to know
            </h2>
            <p className="mt-4 text-muted-foreground">
              Clear answers on commission, attribution, and how you get paid.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Turn your audience into recurring income
                </h2>
                <p className="mt-4 max-w-md text-primary-foreground/80">
                  It takes two minutes to join. No fees, no quotas, no risk. Start earning on
                  every customer you send our way.
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {["Free to join", "Recurring lifetime commission", "Monthly on-time payouts"].map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-background text-foreground">
                <CardHeader>
                  <CardTitle>Apply to the partner program</CardTitle>
                  <CardDescription>We review every application within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Alex Rivera" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="channel">Where will you promote?</Label>
                    <Input id="channel" placeholder="Newsletter, YouTube, blog…" />
                  </div>
                  <Button className="w-full" size="lg">
                    Apply now
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    By applying you agree to the partner terms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:px-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BadgePercent className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Plinth Partners</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {["Terms", "Privacy", "Brand assets", "Partner support", "Status"].map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Plinth, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
