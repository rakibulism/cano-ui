"use client"
import * as React from "react"
import {
  Rocket,
  Calendar,
  ArrowRight,
  DollarSign,
  Users,
  Network,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Presentation,
  TrendingUp,
  Trophy,
  Plus,
  Minus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const BENEFITS = [
  {
    icon: DollarSign,
    title: "$150K in funding",
    body: "Uncapped pre-seed check for 6% equity, wired the week you start the program.",
  },
  {
    icon: Users,
    title: "1:1 mentorship",
    body: "Weekly office hours with operators who have scaled companies from zero to IPO.",
  },
  {
    icon: Network,
    title: "Founder network",
    body: "Lifetime access to 900+ alumni founders, investors, and a private Slack community.",
  },
  {
    icon: Sparkles,
    title: "$2M+ in perks",
    body: "Cloud credits, legal, payroll, and SaaS deals to stretch every dollar of runway.",
  },
  {
    icon: TrendingUp,
    title: "Demo Day stage",
    body: "Pitch to 300+ top-tier VCs at our flagship investor day in San Francisco.",
  },
  {
    icon: Trophy,
    title: "Follow-on access",
    body: "Warm intros and priority allocation for your seed and Series A rounds.",
  },
]

const STATS = [
  { value: "640+", label: "Companies funded" },
  { value: "$12B", label: "Combined valuation" },
  { value: "92%", label: "Raise within 6 months" },
  { value: "38", label: "Countries represented" },
]

const TIMELINE = [
  {
    week: "Weeks 1-2",
    title: "Onboarding & goal-setting",
    icon: Rocket,
    body: "Kickoff retreat, funding wired, and your custom growth scorecard.",
  },
  {
    week: "Weeks 3-6",
    title: "Build & validate",
    icon: Lightbulb,
    body: "Tighten your wedge, talk to users weekly, and ship toward real traction.",
  },
  {
    week: "Weeks 7-9",
    title: "Growth & metrics",
    icon: TrendingUp,
    body: "Dial in your funnel, pricing, and the metrics investors actually care about.",
  },
  {
    week: "Weeks 10-12",
    title: "Pitch & Demo Day",
    icon: Presentation,
    body: "Craft your narrative, rehearse, and take the stage in front of 300 VCs.",
  },
]

const MENTORS = [
  { name: "Dana Okoro", role: "Ex-VP Growth, Stripe", img: "https://i.pravatar.cc/120?img=47" },
  { name: "Marcus Lin", role: "Founder, exited to Adobe", img: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Nair", role: "Partner, Lattice Ventures", img: "https://i.pravatar.cc/120?img=32" },
  { name: "Tomas Reyes", role: "Ex-Head of Product, Figma", img: "https://i.pravatar.cc/120?img=15" },
  { name: "Aisha Bello", role: "GTM Advisor, Notion", img: "https://i.pravatar.cc/120?img=49" },
  { name: "Jonah Park", role: "Founder, IPO 2021", img: "https://i.pravatar.cc/120?img=53" },
]

const ALUMNI = ["Northwind", "Lumenly", "Cobalt", "Driftpay", "Verda", "Quanta", "Stacklane", "Pebble", "Aurora", "Hexpod"]

const FAQ = [
  {
    q: "Who should apply?",
    a: "Pre-seed and seed-stage teams with at least one full-time technical founder and an early product or strong prototype.",
  },
  {
    q: "Is the program remote or in-person?",
    a: "It runs hybrid. Most of the 12 weeks are remote, with two required in-person weeks: the kickoff retreat and Demo Day in San Francisco.",
  },
  {
    q: "What are the terms?",
    a: "We invest $150K for 6% equity on a standard post-money SAFE. There are no hidden fees and you keep full control of your company.",
  },
  {
    q: "Do I need to be incorporated already?",
    a: "No. We help you incorporate as a Delaware C-corp during onboarding if you have not done so yet.",
  },
  {
    q: "How competitive is admission?",
    a: "We accept roughly 2% of applicants each cohort. We read every application and look for momentum, clarity, and an unfair advantage.",
  },
]

export default function AcceleratorProgramPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </span>
            Liftoff Labs
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#benefits" className="transition-colors hover:text-foreground">Benefits</a>
            <a href="#program" className="transition-colors hover:text-foreground">Program</a>
            <a href="#mentors" className="transition-colors hover:text-foreground">Mentors</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#apply">Apply now</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-primary/5" aria-hidden="true" />
          <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Cohort W26 applications close March 14
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
              The 12-week launchpad for founders building the future.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              $150K in funding, world-class mentors, and a Demo Day stage in front of 300+ investors. We help relentless teams go from idea to traction.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="#apply">
                  Start your application
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#program">See the program</a>
              </Button>
            </div>
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              No application fee. We read every submission.
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 text-center">
                <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">What you get</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to go from zero to product-market fit.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <Card key={b.title} className="transition-colors hover:border-primary">
                <CardContent className="pt-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section id="program" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">The cohort</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">12 weeks, one trajectory.</h2>
              <p className="mt-4 text-muted-foreground">
                A structured sprint that ends with you pitching on Demo Day. Every week builds toward the metrics that get you funded.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {TIMELINE.map((t, i) => (
                <div key={t.title} className="relative rounded-xl border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-wide text-primary">{t.week}</p>
                  <h3 className="mt-1 font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentors */}
        <section id="mentors" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Your mentors</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn from operators who have done it before.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {MENTORS.map((m) => (
              <div key={m.name} className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={m.img} alt="" />
                  <AvatarFallback>{m.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <p className="mt-3 text-sm font-semibold">{m.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alumni logo wall */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Trusted by founders who built
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {ALUMNI.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center rounded-lg border bg-card px-4 py-5 text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">FAQ</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Questions, answered.</h2>
          </div>
          <div className="mt-10 divide-y rounded-xl border bg-card">
            {FAQ.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium"
                  >
                    {item.q}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div className={cn("px-6 text-sm text-muted-foreground", open ? "pb-5" : "hidden")}>
                    {item.a}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Apply CTA */}
        <section id="apply" className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
            <Badge className="mb-6 gap-1.5 bg-primary-foreground/15 text-primary-foreground">
              <Calendar className="h-3.5 w-3.5" />
              Applications close March 14
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The next great company starts with one application.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Tell us what you are building. It takes about 15 minutes and we read every word.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="founder@startup.com"
                aria-label="Email address"
                className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button type="submit" variant="secondary" className="gap-2">
                Apply now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-primary-foreground/70">No application fee. Decisions within 3 weeks.</p>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" />
            </span>
            Liftoff Labs
          </div>
          <p>&copy; 2026 Liftoff Labs. Backing founders since 2014.</p>
          <div className="flex gap-5">
            <a href="#benefits" className="transition-colors hover:text-foreground">Benefits</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
            <a href="#apply" className="transition-colors hover:text-foreground">Apply</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
