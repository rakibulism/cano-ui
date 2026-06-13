"use client"

import * as React from "react"
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  GraduationCap,
  Hammer,
  Layers,
  Menu,
  Quote,
  Sparkles,
  Star,
  Users,
  Video,
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const COHORTS = [
  { label: "Spring Cohort", dates: "Apr 8 — May 13", seats: "9 seats left", featured: false },
  { label: "Summer Cohort", dates: "Jun 10 — Jul 15", seats: "21 seats left", featured: true },
  { label: "Fall Cohort", dates: "Sep 9 — Oct 14", seats: "Waitlist", featured: false },
]

const OUTCOMES = [
  {
    icon: Layers,
    title: "A production-ready design system",
    body: "Build a token-driven component library with theming, variants, and full a11y coverage.",
  },
  {
    icon: Code2,
    title: "A full-stack web app",
    body: "Ship a real app with auth, a database, and deploys — wired end to end during live sessions.",
  },
  {
    icon: Hammer,
    title: "A polished portfolio piece",
    body: "Leave with a case study and repo you can show in interviews, reviewed by your instructor.",
  },
  {
    icon: Sparkles,
    title: "A repeatable workflow",
    body: "Adopt the patterns, shortcuts, and review habits that senior engineers use every day.",
  },
]

const SCHEDULE = [
  { week: "Week 1", title: "Foundations & setup", detail: "Project scaffolding, tokens, and your first components.", live: "Tue 6:00pm" },
  { week: "Week 2", title: "Layout & composition", detail: "Responsive grids, slots, and accessible primitives.", live: "Tue 6:00pm" },
  { week: "Week 3", title: "State & data", detail: "Fetching, caching, and forms that don't fight you.", live: "Tue 6:00pm" },
  { week: "Week 4", title: "Polish & motion", detail: "Micro-interactions, transitions, and feel.", live: "Tue 6:00pm" },
  { week: "Week 5", title: "Ship & review", detail: "Deploy, demo day, and a live code review of your build.", live: "Tue 6:00pm" },
]

const TESTIMONIALS = [
  {
    name: "Priya Raman",
    role: "Frontend Engineer, Lumen",
    quote: "I'd taken three other courses and bounced. The live build sessions are what finally made it click — I shipped my project the same week.",
    img: "https://i.pravatar.cc/96?img=47",
  },
  {
    name: "Marcus Lee",
    role: "Career switcher",
    quote: "Worth every dollar. The instructor reviewed my actual repo, not some toy example. I used the portfolio piece to land my first dev role.",
    img: "https://i.pravatar.cc/96?img=12",
  },
  {
    name: "Dana Whitfield",
    role: "Product Designer",
    quote: "Small cohort, real feedback, zero fluff. The schedule kept me accountable in a way self-paced never did.",
    img: "https://i.pravatar.cc/96?img=32",
  },
]

const PLANS = [
  {
    name: "Self-paced",
    price: "$390",
    note: "per seat",
    features: ["All 5 recorded modules", "Project starter repos", "Community channel access", "Lifetime updates"],
    cta: "Get the recordings",
    featured: false,
  },
  {
    name: "Live cohort",
    price: "$890",
    note: "per seat",
    features: ["Everything in Self-paced", "5 live build sessions", "1:1 code review", "Demo day & certificate", "Private cohort group"],
    cta: "Enroll in the cohort",
    featured: true,
  },
  {
    name: "Team (5 seats)",
    price: "$3,600",
    note: "flat",
    features: ["5 live cohort seats", "Dedicated team channel", "Custom kickoff session", "Invoice billing"],
    cta: "Talk to us",
    featured: false,
  },
]

const FAQ = [
  { q: "Do I need prior experience?", a: "You should be comfortable with HTML, CSS, and basic JavaScript. We move fast, but every session is recorded and the instructor is hands-on." },
  { q: "What if I miss a live session?", a: "Every session is recorded and posted within a day. You also get the project repo at each checkpoint so you can catch up cleanly." },
  { q: "How much time per week?", a: "Plan for one 90-minute live session plus 3–5 hours of build time. The pace is intentional — you ship something real each week." },
  { q: "Is there a refund policy?", a: "Full refund up to 7 days after your cohort starts, no questions asked. If it's not for you, we'll make it right." },
  { q: "Will I get a certificate?", a: "Live cohort members who complete the final project and demo day receive a verified completion certificate." },
]

const NAV = ["Outcomes", "Schedule", "Instructor", "Pricing", "FAQ"]

export default function WorkshopSeriesPage() {
  const [selectedCohort, setSelectedCohort] = React.useState(1)
  const [email, setEmail] = React.useState("")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span>BuildLab</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#pricing">Enroll now</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-5 w-fit gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Live, cohort-based workshop
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Ship a real frontend in five weeks.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                A hands-on, live-build workshop series. Each week you write real code with the cohort,
                get your repo reviewed, and leave with a portfolio piece you're proud of.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#pricing">
                    Enroll in the next cohort <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#schedule">See the schedule</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" /> 600+ builders trained
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-current text-primary" /> 4.9 average rating
                </span>
                <span className="flex items-center gap-1.5">
                  <Video className="h-4 w-4" /> Every session recorded
                </span>
              </div>
            </div>

            <Card className="self-center shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4 text-primary" /> Choose your cohort
                </CardTitle>
                <CardDescription>Small groups. Pick the dates that work for you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {COHORTS.map((cohort, i) => {
                  const active = selectedCohort === i
                  return (
                    <button
                      key={cohort.label}
                      type="button"
                      onClick={() => setSelectedCohort(i)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors",
                        active ? "border-primary bg-primary/10" : "hover:bg-muted"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2 font-medium">
                          {cohort.label}
                          {cohort.featured && <Badge className="text-[10px]">Popular</Badge>}
                        </div>
                        <div className="text-sm text-muted-foreground">{cohort.dates}</div>
                      </div>
                      <Badge variant={active ? "default" : "outline"}>{cohort.seats}</Badge>
                    </button>
                  )
                })}
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Live seat price</span>
                  <span className="text-lg font-semibold">$890</span>
                </div>
                <Button className="w-full" asChild>
                  <a href="#pricing">Reserve {COHORTS[selectedCohort].label.split(" ")[0]} seat</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Outcomes */}
        <section id="outcomes" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you'll build</h2>
            <p className="mt-3 text-muted-foreground">
              This isn't lecture-and-quiz. By the final week you'll have shipped four tangible things.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {OUTCOMES.map((o) => (
              <Card key={o.title} className="transition-shadow hover:shadow-sm">
                <CardHeader>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <o.icon className="h-5 w-5" />
                  </span>
                  <CardTitle className="mt-4">{o.title}</CardTitle>
                  <CardDescription>{o.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Session schedule</h2>
              <p className="mt-3 text-muted-foreground">
                Five focused weeks. One live build session each, plus guided homework between.
              </p>
            </div>
            <ol className="mt-10 space-y-3">
              {SCHEDULE.map((s, i) => (
                <li key={s.week}>
                  <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {s.week}
                        </div>
                        <div className="font-medium">{s.title}</div>
                      </div>
                    </div>
                    <p className="flex-1 text-sm text-muted-foreground sm:px-4">{s.detail}</p>
                    <Badge variant="outline" className="w-fit gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> Live {s.live}
                    </Badge>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Instructor */}
        <section id="instructor" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <Card className="overflow-hidden">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
              <div className="flex flex-col items-center gap-4 text-center lg:w-56">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="https://i.pravatar.cc/256?img=8" alt="" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-semibold">Alex Tran</div>
                  <div className="text-sm text-muted-foreground">Lead instructor</div>
                </div>
              </div>
              <div>
                <Badge variant="secondary" className="mb-3">Your instructor</Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  12 years building interfaces, now in your corner.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Alex has led design-systems and frontend teams at two product companies and mentored
                  hundreds of engineers. Every cohort, Alex personally reviews your code and joins each
                  live session — no teaching assistants standing in.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    ["600+", "engineers mentored"],
                    ["4.9", "instructor rating"],
                    ["5 wk", "hands-on per cohort"],
                  ].map(([stat, label]) => (
                    <div key={label} className="rounded-lg border bg-muted/30 p-4">
                      <div className="text-2xl font-bold">{stat}</div>
                      <div className="text-sm text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">From past cohorts</h2>
              <p className="mt-3 text-muted-foreground">
                What builders said after shipping their projects.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <Quote className="h-6 w-6 text-primary/40" aria-hidden="true" />
                    <p className="mt-3 text-sm leading-relaxed">{t.quote}</p>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={t.img} alt="" />
                      <AvatarFallback>{t.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing per seat</h2>
            <p className="mt-3 text-muted-foreground">
              One payment, lifetime access to the materials. Live seats are limited each cohort.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "flex flex-col",
                  plan.featured && "border-primary shadow-md ring-1 ring-primary"
                )}
              >
                <CardHeader>
                  {plan.featured && <Badge className="mb-2 w-fit">Most popular</Badge>}
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.note}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.featured ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked</h2>
              <p className="mt-3 text-muted-foreground">Still unsure? Here's what most people ask.</p>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={"item-" + i}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  The next cohort fills fast. Save your seat.
                </h2>
                <p className="max-w-xl text-primary-foreground/80">
                  Drop your email for the syllabus and a heads-up before enrollment closes.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="cta-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background text-foreground"
                  />
                  <Button type="submit" variant="secondary" className="shrink-0">
                    Send me the syllabus
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            BuildLab
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
            {NAV.map((item) => (
              <a key={item} href={"#" + item.toLowerCase()} className="hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <Separator className="md:hidden" />
          <p className="text-sm text-muted-foreground">© 2026 BuildLab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
