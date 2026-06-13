"use client"

import * as React from "react"
import {
  ArrowUpRight,
  TrendingUp,
  Search,
  Megaphone,
  PenTool,
  BarChart3,
  Target,
  Rocket,
  CheckCircle2,
  Quote,
  ArrowRight,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Services", "Work", "Process", "Team", "Contact"]

const SERVICES = [
  {
    icon: Search,
    name: "SEO & Organic",
    blurb:
      "Technical audits, content engines, and link strategy that compound traffic month over month.",
    points: ["Keyword strategy", "On-page + technical", "Content velocity"],
  },
  {
    icon: Megaphone,
    name: "Paid Media",
    blurb:
      "Full-funnel paid acquisition across search, social, and programmatic — engineered for ROAS.",
    points: ["Google & Meta Ads", "Creative testing", "Conversion tracking"],
  },
  {
    icon: PenTool,
    name: "Content & Brand",
    blurb:
      "Story-led content and brand systems that turn attention into demand and demand into revenue.",
    points: ["Brand messaging", "Editorial calendar", "Video & social"],
  },
]

const RESULTS = [
  {
    metric: "+312%",
    label: "Organic revenue",
    client: "Northwind SaaS",
    detail: "Rebuilt content architecture and captured 1,400+ ranked keywords in 9 months.",
    tag: "SEO",
  },
  {
    metric: "5.8x",
    label: "Return on ad spend",
    client: "Lumen DTC",
    detail: "Restructured paid funnel and creative testing loop across search and social.",
    tag: "Paid Media",
  },
  {
    metric: "-41%",
    label: "Cost per lead",
    client: "Atlas Fintech",
    detail: "Tightened targeting and landing-page CRO to halve acquisition cost.",
    tag: "Demand Gen",
  },
]

const LOGOS = ["Northwind", "Lumen", "Atlas", "Cobalt", "Verdant", "Helio"]

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Audit & Discover",
    body: "We dig into your data, market, and competitors to find the highest-leverage opportunities.",
  },
  {
    icon: Target,
    step: "02",
    title: "Strategy & Plan",
    body: "A clear, prioritized roadmap with channels, budgets, and the metrics that actually matter.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch & Test",
    body: "Ship fast, test relentlessly, and let the winners scale. No vanity metrics here.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Scale & Report",
    body: "Double down on what works with transparent dashboards and monthly growth reviews.",
  },
]

const TEAM = [
  {
    name: "Maya Okafor",
    role: "Founder & Growth Lead",
    img: "https://i.pravatar.cc/160?img=47",
    fallback: "MO",
  },
  {
    name: "Daniel Reyes",
    role: "Head of Paid Media",
    img: "https://i.pravatar.cc/160?img=12",
    fallback: "DR",
  },
  {
    name: "Priya Anand",
    role: "SEO Director",
    img: "https://i.pravatar.cc/160?img=32",
    fallback: "PA",
  },
  {
    name: "Theo Brandt",
    role: "Creative Director",
    img: "https://i.pravatar.cc/160?img=15",
    fallback: "TB",
  },
]

export default function MarketingAgencyPage() {
  const [activeService, setActiveService] = React.useState(0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="size-4" />
            </span>
            <span className="text-lg">Upcurve</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button size="sm">
              Book a call
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1" id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-5 w-fit gap-1.5">
                <Sparkles className="size-3.5" />
                Growth marketing, no fluff
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                We turn ad budgets into{" "}
                <span className="text-primary">predictable revenue.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                Upcurve is a results-driven marketing agency for ambitious brands.
                Strategy, execution, and reporting under one roof — measured in
                pipeline, not impressions.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Get a free growth audit
                  <ArrowUpRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  See our work
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {TEAM.map((m) => (
                    <Avatar key={m.name} className="size-9 border-2 border-background">
                      <AvatarImage src={m.img} alt="" />
                      <AvatarFallback>{m.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-medium text-foreground">120+ brands</span> to
                  drive growth
                </p>
              </div>
            </div>

            {/* Key metric card */}
            <div className="flex items-center">
              <Card className="w-full border-primary/20 bg-card shadow-sm">
                <CardContent className="p-8">
                  <p className="text-sm font-medium text-muted-foreground">
                    Avg. client revenue lift
                  </p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-7xl font-semibold tracking-tight text-primary">
                      4.2x
                    </span>
                    <span className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      <TrendingUp className="size-4" />
                      YoY
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    across 48 engagements in the last 12 months
                  </p>
                  <Separator className="my-6" />
                  <dl className="grid grid-cols-2 gap-6">
                    <div>
                      <dt className="text-sm text-muted-foreground">Pipeline driven</dt>
                      <dd className="mt-1 text-2xl font-semibold">$86M</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Avg. ROAS</dt>
                      <dd className="mt-1 text-2xl font-semibold">5.8x</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Client retention</dt>
                      <dd className="mt-1 text-2xl font-semibold">94%</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Avg. time to ROI</dt>
                      <dd className="mt-1 text-2xl font-semibold">63 days</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Powering growth for category leaders
            </p>
            <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
              {LOGOS.map((logo) => (
                <div
                  key={logo}
                  className="text-center text-lg font-semibold tracking-tight text-muted-foreground/70"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4">
              What we do
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Three channels, one growth engine
            </h2>
            <p className="mt-4 text-muted-foreground">
              We don&apos;t sell tactics in a vacuum. Every service plugs into an
              integrated strategy built around your revenue goals.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = service.icon
              const active = activeService === i
              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => setActiveService(i)}
                  className={cn(
                    "group rounded-xl border bg-card p-7 text-left transition-all hover:border-primary/40 hover:shadow-sm",
                    active && "border-primary ring-1 ring-primary"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-lg transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.blurb}</p>
                  <ul className="mt-5 space-y-2">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Explore service
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* Case study results */}
        <section id="work" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4">
                  Proof, not promises
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Results that move the bottom line
                </h2>
              </div>
              <Button variant="outline">
                View all case studies
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {RESULTS.map((r) => (
                <Card key={r.client} className="bg-card">
                  <CardContent className="p-8">
                    <Badge variant="secondary" className="mb-6">
                      {r.tag}
                    </Badge>
                    <p className="text-5xl font-semibold tracking-tight text-primary">
                      {r.metric}
                    </p>
                    <p className="mt-2 text-sm font-medium">{r.label}</p>
                    <Separator className="my-5" />
                    <p className="text-sm font-semibold">{r.client}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{r.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonial */}
            <Card className="mt-6 border-primary/20 bg-card">
              <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:gap-10">
                <Quote className="size-10 shrink-0 text-primary" />
                <blockquote className="text-lg font-medium leading-relaxed">
                  &ldquo;Upcurve didn&apos;t just run our ads — they rebuilt how we
                  think about growth. We hit our annual pipeline target in seven
                  months.&rdquo;
                </blockquote>
                <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-start">
                  <Avatar className="size-11">
                    <AvatarImage src="https://i.pravatar.cc/96?img=5" alt="" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">Sara Klein</p>
                    <p className="text-sm text-muted-foreground">VP Marketing, Northwind</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4">
              How we work
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A process built to compound
            </h2>
            <p className="mt-4 text-muted-foreground">
              No black boxes. Every engagement follows a tight, transparent loop
              designed to find leverage fast and scale what works.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.step} className="relative rounded-xl border bg-card p-7">
                  <span className="text-sm font-semibold text-muted-foreground/60">
                    {p.step}
                  </span>
                  <span className="mt-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">
                The people
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Senior operators, not account managers
              </h2>
              <p className="mt-4 text-muted-foreground">
                You work directly with the people doing the work — practitioners
                who&apos;ve scaled brands from seed to category leader.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((m) => (
                <Card key={m.name} className="bg-card text-center">
                  <CardContent className="p-7">
                    <Avatar className="mx-auto size-20">
                      <AvatarImage src={m.img} alt="" />
                      <AvatarFallback>{m.fallback}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{m.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s build your growth engine
              </h2>
              <p className="mt-4 text-muted-foreground">
                Tell us where you are and where you want to be. We&apos;ll send back a
                free, no-obligation growth audit within 48 hours.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </span>
                  hello@upcurve.co
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="size-5" />
                  </span>
                  +1 (415) 555-0148
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-5" />
                  </span>
                  548 Market St, San Francisco, CA
                </div>
              </div>
            </div>

            <Card className="bg-card">
              <CardContent className="p-8">
                <form
                  className="space-y-5"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jordan Lee" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="jordan@acme.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Monthly budget</Label>
                    <Input id="budget" placeholder="$10k – $25k" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goals">Your goals</Label>
                    <Textarea
                      id="goals"
                      placeholder="What does growth look like for you in the next 12 months?"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Request free audit
                    <ArrowUpRight className="size-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No spam. We reply within two business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-semibold tracking-tight">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TrendingUp className="size-4" />
                </span>
                <span className="text-lg">Upcurve</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                A results-driven marketing agency turning budgets into predictable
                revenue.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold">Services</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>SEO & Organic</li>
                  <li>Paid Media</li>
                  <li>Content & Brand</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold">Company</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>About</li>
                  <li>Work</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold">Legal</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Privacy</li>
                  <li>Terms</li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Upcurve Agency. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
