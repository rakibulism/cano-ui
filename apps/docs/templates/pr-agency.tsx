"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Quote,
  Newspaper,
  Radio,
  Users,
  CalendarDays,
  ShieldAlert,
  Sparkles,
  Mail,
  Phone,
  TrendingUp,
  Megaphone,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const PLACEMENTS = ["The Times", "WIRED", "Bloomberg", "Vogue", "Forbes", "The Atlantic", "Fast Company"]

const SERVICES = [
  {
    icon: Newspaper,
    kicker: "01",
    title: "Media Relations",
    desc: "Earned coverage in the outlets your audience actually reads. We pitch the story, not the press release.",
  },
  {
    icon: ShieldAlert,
    kicker: "02",
    title: "Crisis & Reputation",
    desc: "When the story turns, we move first. 24/7 counsel, holding statements, and a plan to take back the narrative.",
  },
  {
    icon: Radio,
    kicker: "03",
    title: "Influencer & Talent",
    desc: "Credible voices, vetted partnerships, and campaigns measured by impact instead of vanity reach.",
  },
  {
    icon: CalendarDays,
    kicker: "04",
    title: "Events & Launches",
    desc: "Launch moments and press days that earn the room, then keep earning column inches for weeks after.",
  },
]

const RESULTS = [
  { metric: "1.2B", label: "Earned media impressions", sub: "Across client campaigns last year" },
  { metric: "340+", label: "Top-tier placements", sub: "In tier-one national press" },
  { metric: "92%", label: "Pitch-to-feature rate", sub: "On flagship launch accounts" },
  { metric: "4.5x", label: "Average share of voice lift", sub: "Versus category competitors" },
]

const CASES = [
  {
    client: "Solstice Beauty",
    sector: "Consumer / Beauty",
    headline: "From quiet launch to category leader",
    metric: "+210%",
    metricLabel: "branded search in 60 days",
    note: "A coordinated press day and founder narrative landed coverage in three national style desks within a week of launch.",
  },
  {
    client: "Aria Fintech",
    sector: "Finance / B2B",
    headline: "Rebuilding trust after a data scare",
    metric: "11 days",
    metricLabel: "to neutral sentiment",
    note: "Rapid-response counsel and a transparent founder op-ed reversed a hostile news cycle and restored analyst confidence.",
  },
  {
    client: "Northbound Travel",
    sector: "Travel / Lifestyle",
    headline: "Owning the sustainable-travel conversation",
    metric: "1.2B",
    metricLabel: "earned impressions",
    note: "A year-long thought-leadership program made the CEO the go-to commentator for every major sustainability story.",
  },
]

const CLIENTS = [
  "Solstice Beauty",
  "Aria Fintech",
  "Northbound Travel",
  "Halcyon Studios",
  "Meridian Foods",
  "Lyra Health",
  "Atlas Mobility",
  "Verve Spirits",
]

const TEAM = [
  { name: "Camille Okafor", role: "Founder & Managing Partner", initials: "CO" },
  { name: "Dev Mehta", role: "Head of Media Strategy", initials: "DM" },
  { name: "Priya Anand", role: "Director, Crisis Practice", initials: "PA" },
  { name: "Marco Bianchi", role: "Lead, Talent & Influencer", initials: "MB" },
]

export default function PrAgencyPage() {
  const [activeCase, setActiveCase] = React.useState(0)
  const current = CASES[activeCase]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Megaphone className="h-4 w-4" />
            </span>
            Marlow & Finch
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#results" className="transition-colors hover:text-foreground">Results</a>
            <a href="#clients" className="transition-colors hover:text-foreground">Clients</a>
            <a href="#team" className="transition-colors hover:text-foreground">Team</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Start a conversation</a>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-6 w-fit gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                A communications agency for brands with something to say
              </Badge>
              <h1 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                We don&apos;t chase headlines.
                <span className="block text-muted-foreground">We write the narrative.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground">
                Marlow & Finch is a public relations and communications partner for founders,
                challenger brands, and category leaders who refuse to be ignored.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#contact" className="gap-2">
                    Pitch us your story
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#results">See the results</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Media placements strip */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              As featured in
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
              {PLACEMENTS.map((p) => (
                <span
                  key={p}
                  className="text-xl font-semibold tracking-tight text-muted-foreground sm:text-2xl"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <div className="mb-14 max-w-2xl">
              <Badge variant="outline" className="mb-4">What we do</Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Four practices, one newsroom mindset.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Every engagement is led by senior counsel and built around the story only your
                brand can tell.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="group flex flex-col gap-5 bg-card p-8 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">{s.kicker}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore practice
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results metric cards */}
        <section id="results" className="border-b bg-primary/5">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <div className="mb-14 max-w-2xl">
              <Badge variant="outline" className="mb-4">The proof</Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Coverage you can measure.
              </h2>
            </div>
            <div className="mb-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {RESULTS.map((r) => (
                <Card key={r.label} className="border-primary/20">
                  <CardContent className="flex flex-col gap-2 p-7">
                    <span className="text-4xl font-bold tracking-tight text-primary">{r.metric}</span>
                    <span className="font-medium">{r.label}</span>
                    <span className="text-sm text-muted-foreground">{r.sub}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Case study selector */}
            <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:items-start">
              <div className="flex flex-col gap-2">
                {CASES.map((c, i) => (
                  <button
                    key={c.client}
                    onClick={() => setActiveCase(i)}
                    aria-pressed={i === activeCase}
                    className={cn(
                      "flex items-center justify-between rounded-lg border bg-card px-5 py-4 text-left transition-colors",
                      i === activeCase ? "border-primary bg-primary/10" : "hover:border-primary/40",
                    )}
                  >
                    <div>
                      <div className="font-semibold">{c.client}</div>
                      <div className="text-sm text-muted-foreground">{c.sector}</div>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 transition-colors",
                        i === activeCase ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                  </button>
                ))}
              </div>

              <Card className="border-primary/30">
                <CardContent className="flex flex-col gap-7 p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">{current.sector}</div>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                        {current.headline}
                      </h3>
                    </div>
                    <Badge className="gap-1 whitespace-nowrap">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Case study
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex flex-wrap items-end gap-4">
                    <span className="text-6xl font-bold tracking-tight text-primary">
                      {current.metric}
                    </span>
                    <span className="pb-2 text-muted-foreground">{current.metricLabel}</span>
                  </div>
                  <p className="text-muted-foreground">{current.note}</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-foreground"
                  >
                    Read the full story
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quote / editorial */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
            <Quote className="mx-auto h-10 w-10 text-primary" />
            <blockquote className="mt-8 text-3xl font-medium leading-snug tracking-tight sm:text-4xl">
              &ldquo;They turned our launch into a moment the whole industry had to talk about.
              No other agency comes close on instinct.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Avatar>
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="font-semibold">Rina Solberg</div>
                <div className="text-sm text-muted-foreground">CEO, Solstice Beauty</div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section id="clients" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Selected clients</Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                In good company.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {CLIENTS.map((c) => (
                <div
                  key={c}
                  className="flex items-center justify-center bg-card px-6 py-10 text-center text-lg font-semibold tracking-tight transition-colors hover:bg-accent"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <div className="mb-14 max-w-2xl">
              <Badge variant="outline" className="mb-4">The people</Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Senior counsel, every account.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                No junior hand-offs. The people who win your business are the people who do the work.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((m) => (
                <Card key={m.name}>
                  <CardContent className="flex flex-col items-start gap-4 p-6">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="text-base">{m.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold tracking-tight">{m.name}</div>
                      <div className="text-sm text-muted-foreground">{m.role}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="bg-primary/5">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-start">
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit">Start a conversation</Badge>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Have a story worth telling?
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us where you are and where you want to be. We&apos;ll come back with a point
                of view, not a templated proposal.
              </p>
              <div className="flex flex-col gap-4 pt-2">
                <a
                  href="#contact"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  hello@marlowfinch.com
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  +1 (212) 555-0148
                </a>
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jordan Reyes" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="brief">What&apos;s the story?</Label>
                    <Textarea
                      id="brief"
                      rows={4}
                      placeholder="We're launching a new product in Q3 and want tier-one coverage..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Send the brief
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    We respond to every brief within one business day.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Megaphone className="h-3.5 w-3.5" />
            </span>
            Marlow & Finch
          </div>
          <p className="text-sm text-muted-foreground">
            (c) 2024 Marlow & Finch Communications. Earned, not bought.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#clients" className="transition-colors hover:text-foreground">Clients</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
