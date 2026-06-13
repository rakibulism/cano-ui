"use client"

import * as React from "react"
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Quote,
  Building2,
  TrendingUp,
  Clock,
  Users,
  Star,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const FILTERS = ["All", "Fintech", "Healthcare", "Retail", "Tech"] as const
type Filter = (typeof FILTERS)[number]

const STATS = [
  { icon: TrendingUp, value: "312%", label: "Average ROI in year one" },
  { icon: Clock, value: "18 hrs", label: "Saved per team each week" },
  { icon: Users, value: "4,200+", label: "Teams shipping with Northbeam" },
  { icon: Star, value: "4.9/5", label: "Customer satisfaction score" },
]

const FEATURED = {
  industry: "Fintech",
  company: "Larksum",
  logoMark: "LK",
  headline: "How Larksum cut fraud reviews by 73% while scaling to 9 markets",
  summary:
    "Facing exploding transaction volume, Larksum replaced six disconnected tools with a single workspace and gave every analyst real-time context.",
  metrics: [
    { value: "73%", label: "Fewer manual reviews" },
    { value: "9", label: "Markets launched" },
    { value: "2.4x", label: "Faster decisioning" },
  ],
  author: { name: "Priya Nair", role: "Head of Risk, Larksum", initials: "PN" },
}

const STORIES: {
  industry: Exclude<Filter, "All">
  company: string
  logoMark: string
  headline: string
  metric: string
  metricLabel: string
}[] = [
  {
    industry: "Fintech",
    company: "Meridian Pay",
    logoMark: "MP",
    headline: "Closing the books 5 days faster with automated reconciliation",
    metric: "5 days",
    metricLabel: "Faster month-end close",
  },
  {
    industry: "Healthcare",
    company: "Vitalis Care",
    logoMark: "VC",
    headline: "Coordinating 40 clinics on one shared patient timeline",
    metric: "40",
    metricLabel: "Clinics unified",
  },
  {
    industry: "Retail",
    company: "Harborline",
    logoMark: "HL",
    headline: "Lifting repeat purchase rate with personalized journeys",
    metric: "+38%",
    metricLabel: "Repeat purchases",
  },
  {
    industry: "Tech",
    company: "Quanta Labs",
    logoMark: "QL",
    headline: "Shipping releases weekly after consolidating their stack",
    metric: "6x",
    metricLabel: "Release frequency",
  },
  {
    industry: "Healthcare",
    company: "BrightPath",
    logoMark: "BP",
    headline: "Reducing intake time so clinicians focus on patients",
    metric: "-61%",
    metricLabel: "Intake time",
  },
  {
    industry: "Retail",
    company: "Nordwell",
    logoMark: "NW",
    headline: "Forecasting demand across 220 stores with live inventory",
    metric: "220",
    metricLabel: "Stores synced",
  },
  {
    industry: "Tech",
    company: "Stackforge",
    logoMark: "SF",
    headline: "Onboarding new engineers in days instead of weeks",
    metric: "3 days",
    metricLabel: "To first commit",
  },
  {
    industry: "Fintech",
    company: "Coinbridge",
    logoMark: "CB",
    headline: "Passing audits faster with a single source of truth",
    metric: "100%",
    metricLabel: "Audit readiness",
  },
]

const LOGOS = [
  "Larksum",
  "Meridian",
  "Vitalis",
  "Harborline",
  "Quanta",
  "Nordwell",
  "Stackforge",
  "Coinbridge",
  "BrightPath",
  "Northwind",
]

export default function CustomersPage() {
  const [active, setActive] = React.useState<Filter>("All")

  const visible =
    active === "All"
      ? STORIES
      : STORIES.filter((s) => s.industry === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Northbeam</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#stories" className="transition-colors hover:text-foreground">
              Stories
            </a>
            <a href="#logos" className="transition-colors hover:text-foreground">
              Customers
            </a>
            <a href="#quote" className="transition-colors hover:text-foreground">
              Reviews
            </a>
          </nav>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#cta">Start free</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center lg:py-24">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
              Customer stories
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Real teams. Measurable results.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              See how thousands of fast-moving companies use Northbeam to ship
              faster, cut busywork, and grow with confidence.
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-card p-6 text-left">
                  <stat.icon
                    className="h-5 w-5 text-primary"
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <Card className="overflow-hidden border-primary/30">
            <div className="grid lg:grid-cols-5">
              <div className="bg-primary/10 p-8 lg:col-span-2 lg:p-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-lg font-semibold text-primary-foreground">
                    {FEATURED.logoMark}
                  </div>
                  <div>
                    <p className="font-semibold">{FEATURED.company}</p>
                    <Badge variant="outline" className="mt-1">
                      {FEATURED.industry}
                    </Badge>
                  </div>
                </div>
                <div className="mt-8 space-y-5">
                  {FEATURED.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-3xl font-semibold tracking-tight text-primary">
                        {m.value}
                      </p>
                      <p className="text-sm text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <CardContent className="flex flex-col justify-center p-8 lg:col-span-3 lg:p-10">
                <Badge variant="secondary" className="w-fit">
                  Featured story
                </Badge>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {FEATURED.headline}
                </h2>
                <p className="mt-4 text-muted-foreground">{FEATURED.summary}</p>
                <div className="mt-8 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{FEATURED.author.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{FEATURED.author.name}</p>
                    <p className="text-muted-foreground">
                      {FEATURED.author.role}
                    </p>
                  </div>
                </div>
                <Button className="mt-8 w-fit gap-2">
                  Read the full story
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        <section id="stories" className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Browse all stories
              </h2>
              <p className="mt-2 text-muted-foreground">
                Filter by industry to find a team that looks like yours.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Showing {visible.length} of {STORIES.length}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter stories by industry">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  active === f
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((story) => (
              <Card
                key={story.company}
                className="group flex flex-col transition-colors hover:border-primary/40"
              >
                <CardContent className="flex-1 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-sm font-semibold">
                        {story.logoMark}
                      </div>
                      <span className="font-medium">{story.company}</span>
                    </div>
                    <Badge variant="outline">{story.industry}</Badge>
                  </div>
                  <h3 className="mt-5 text-base font-semibold leading-snug">
                    {story.headline}
                  </h3>
                </CardContent>
                <CardFooter className="flex items-end justify-between border-t pt-4">
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-primary">
                      {story.metric}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {story.metricLabel}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    Read
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="mt-8 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
              No stories in this industry yet — check back soon.
            </div>
          )}
        </section>

        <section id="logos" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-14">
            <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Trusted by teams at every stage
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {LOGOS.map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center gap-2 rounded-lg border bg-card px-3 py-4 text-sm font-semibold text-muted-foreground"
                >
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  <span className="truncate">{logo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="quote" className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
          <Quote className="mx-auto h-10 w-10 text-primary/30" aria-hidden="true" />
          <blockquote className="mt-6 text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">
            &ldquo;Switching to Northbeam was the highest-leverage decision we
            made all year. Our team finally works from one source of truth — and
            the numbers prove it.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Avatar>
              <AvatarFallback>DC</AvatarFallback>
            </Avatar>
            <div className="text-left text-sm">
              <p className="font-medium">Daniel Cho</p>
              <p className="text-muted-foreground">COO, Quanta Labs</p>
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="overflow-hidden rounded-3xl border bg-primary px-8 py-14 text-center text-primary-foreground sm:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Write your own success story
            </h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Join thousands of teams growing faster with Northbeam. Start free,
              no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="gap-2">
                <a href="#cta">
                  Start free trial
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href="#cta">Talk to sales</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <span className="font-medium text-foreground">Northbeam</span>
          </div>
          <p>© Northbeam, Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#stories" className="transition-colors hover:text-foreground">
              Stories
            </a>
            <a href="#logos" className="transition-colors hover:text-foreground">
              Customers
            </a>
            <a href="#cta" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
