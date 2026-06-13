"use client"

import * as React from "react"
import {
  TrendingUp,
  Search,
  BarChart3,
  Link2,
  FileText,
  Target,
  Gauge,
  ArrowUpRight,
  ArrowRight,
  Check,
  Star,
  Quote,
  ChartNoAxesCombined,
  ClipboardCheck,
  Rocket,
  LineChart,
  Globe,
  Mail,
  Phone,
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "+312%", label: "Avg. organic traffic", icon: TrendingUp },
  { value: "#1–3", label: "Keyword rankings won", icon: Target },
  { value: "5.4x", label: "Return on ad spend", icon: ChartNoAxesCombined },
  { value: "240+", label: "Brands scaled", icon: Globe },
]

const SERVICES = [
  {
    icon: Search,
    title: "Technical SEO",
    desc: "Crawlability, Core Web Vitals, schema and site architecture tuned for indexation.",
  },
  {
    icon: FileText,
    title: "Content & Editorial",
    desc: "Search-intent content engines that rank, convert and compound over time.",
  },
  {
    icon: Link2,
    title: "Authority & Link Building",
    desc: "White-hat digital PR and outreach that earns links from real publications.",
  },
  {
    icon: BarChart3,
    title: "Conversion Rate Optimization",
    desc: "Turn rankings into revenue with funnel audits and landing-page testing.",
  },
  {
    icon: Gauge,
    title: "Local & E-commerce SEO",
    desc: "Map-pack dominance and product-feed visibility across every market.",
  },
  {
    icon: LineChart,
    title: "Analytics & Reporting",
    desc: "GA4, Search Console and revenue attribution in one transparent dashboard.",
  },
]

const CASE_STUDIES = [
  {
    company: "Northwind SaaS",
    tag: "B2B Software",
    metric: "Organic sign-ups",
    before: "1,240 / mo",
    after: "6,890 / mo",
    delta: "+456%",
  },
  {
    company: "Lumen Retail",
    tag: "E-commerce",
    metric: "Non-brand revenue",
    before: "$84K / mo",
    after: "$391K / mo",
    delta: "+365%",
  },
  {
    company: "Atlas Clinics",
    tag: "Local Services",
    metric: "Map-pack leads",
    before: "62 / mo",
    after: "318 / mo",
    delta: "+413%",
  },
]

const PROCESS = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Audit & Discovery",
    desc: "We crawl your site, mine competitor gaps and build a prioritized opportunity map.",
  },
  {
    icon: Target,
    step: "02",
    title: "Strategy & Roadmap",
    desc: "A quarter-by-quarter plan tied to revenue targets and keyword clusters.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Execution Sprints",
    desc: "Technical fixes, content and links shipped in two-week, measurable sprints.",
  },
  {
    icon: ChartNoAxesCombined,
    step: "04",
    title: "Scale & Report",
    desc: "We double down on winners and report on traffic, rankings and pipeline monthly.",
  },
]

const PRICING = [
  {
    name: "Launch",
    price: "$2,400",
    period: "/mo",
    desc: "For startups ready to build a search foundation.",
    features: [
      "Technical SEO audit",
      "8 optimized pages / mo",
      "Keyword & competitor research",
      "Monthly reporting",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "$5,800",
    period: "/mo",
    desc: "Our most popular plan for scaling brands.",
    features: [
      "Everything in Launch",
      "20 content pieces / mo",
      "Authority link building",
      "CRO & landing-page testing",
      "Dedicated strategist",
    ],
    featured: true,
  },
  {
    name: "Dominate",
    price: "Custom",
    period: "",
    desc: "Enterprise programs with aggressive targets.",
    features: [
      "Everything in Growth",
      "Unlimited content scope",
      "Digital PR campaigns",
      "Revenue attribution modeling",
      "Quarterly executive reviews",
    ],
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote:
      "They didn't just grow our traffic, they grew pipeline. Organic is now our cheapest acquisition channel by a mile.",
    name: "Priya Natarajan",
    role: "VP Marketing, Northwind",
    initials: "PN",
  },
  {
    quote:
      "Within two quarters we owned page one for our category. The reporting is the most honest we've ever seen from an agency.",
    name: "Marcus Bell",
    role: "Founder, Lumen Retail",
    initials: "MB",
  },
  {
    quote:
      "Every sprint shipped something measurable. No fluff, no vanity metrics, just leads walking through the door.",
    name: "Dr. Hana Voss",
    role: "Director, Atlas Clinics",
    initials: "HV",
  },
]

export default function SeoAgencyTemplate() {
  const [submitted, setSubmitted] = React.useState(false)
  const [url, setUrl] = React.useState("")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ChartNoAxesCombined className="h-4 w-4" />
            </span>
            Rankforge
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" asChild>
              <a href="#contact">Free audit</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Star className="h-3.5 w-3.5 fill-current" />
                Rated 4.9/5 by 240+ growth teams
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                SEO that compounds into{" "}
                <span className="text-primary">predictable revenue</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                We engineer organic growth programs that win rankings, drive
                qualified traffic and turn search into your most profitable
                channel.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2" asChild>
                  <a href="#contact">
                    Get your free audit
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#results">See client results</a>
                </Button>
              </div>
            </div>

            {/* Results stat band */}
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 bg-card px-6 py-8 text-center"
                >
                  <stat.icon className="h-5 w-5 text-primary" />
                  <div className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">
                What we do
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A full-funnel organic growth engine
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every lever of search visibility, run by specialists and tied to
                outcomes you can measure.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <Card
                  key={service.title}
                  className="group transition-colors hover:border-primary"
                >
                  <CardHeader>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="mt-4">{service.title}</CardTitle>
                    <CardDescription>{service.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case study results */}
        <section id="results" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">
                Proven results
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Before and after the work
              </h2>
              <p className="mt-4 text-muted-foreground">
                Real programs, real numbers. Here is what compounding organic
                growth looks like.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {CASE_STUDIES.map((study) => (
                <Card key={study.company} className="overflow-hidden bg-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{study.company}</CardTitle>
                      <Badge variant="secondary">{study.tag}</Badge>
                    </div>
                    <CardDescription>{study.metric}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border bg-muted/40 p-4">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">
                          Before
                        </div>
                        <div className="mt-1 text-lg font-semibold text-muted-foreground">
                          {study.before}
                        </div>
                      </div>
                      <div className="rounded-lg border border-primary/40 bg-primary/10 p-4">
                        <div className="text-xs uppercase tracking-wide text-primary">
                          After
                        </div>
                        <div className="mt-1 text-lg font-semibold text-foreground">
                          {study.after}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <ArrowUpRight className="h-4 w-4" />
                      {study.delta} growth
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process timeline */}
        <section id="process" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">
                How it works
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A clear path from audit to scale
              </h2>
              <p className="mt-4 text-muted-foreground">
                No black boxes. You always know what we shipped, why, and what it
                moved.
              </p>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((phase, i) => (
                <div key={phase.step} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-card text-primary">
                      <phase.icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {phase.step}
                    </span>
                    {i < PROCESS.length - 1 && (
                      <span className="hidden h-px flex-1 bg-border lg:block" />
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{phase.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Packages
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Plans that scale with your ambition
              </h2>
              <p className="mt-4 text-muted-foreground">
                Transparent retainers. No long lock-ins. Cancel with 30 days
                notice.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PRICING.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(
                    "flex flex-col",
                    plan.featured && "border-primary shadow-lg ring-1 ring-primary"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.featured && <Badge>Most popular</Badge>}
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <CardDescription className="mt-2">
                      {plan.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={plan.featured ? "default" : "outline"}
                      asChild
                    >
                      <a href="#contact">
                        {plan.price === "Custom" ? "Talk to sales" : "Start now"}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Client love
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted by marketing leaders
              </h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col pt-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed">
                      {t.quote}
                    </p>
                    <Separator className="my-5" />
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {t.initials}
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / audit CTA */}
        <section id="contact" className="bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="outline" className="mb-4">
                  Free SEO audit
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Find out what your site is leaving on the table
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Drop your URL and our strategists will send a personalized
                  growth audit within 48 hours. No obligation, no pushy sales
                  call.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Technical health & indexation score",
                    "Top keyword & content opportunities",
                    "Competitor gap analysis",
                    "90-day growth roadmap",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Request your audit</CardTitle>
                  <CardDescription>
                    We reply within two business days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 px-6 py-12 text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-6 w-6" />
                      </span>
                      <h3 className="text-lg font-semibold">Audit on its way</h3>
                      <p className="text-sm text-muted-foreground">
                        Thanks. We will review {url || "your site"} and email your
                        report shortly.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSubmitted(false)}
                      >
                        Submit another
                      </Button>
                    </div>
                  ) : (
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        setSubmitted(true)
                      }}
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full name</Label>
                          <Input id="name" placeholder="Jamie Rivera" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Work email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jamie@company.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="url">Website URL</Label>
                        <Input
                          id="url"
                          placeholder="https://yourcompany.com"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goals">Your growth goals</Label>
                        <Textarea
                          id="goals"
                          rows={4}
                          placeholder="We want to grow non-brand organic traffic and demo requests..."
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full gap-2">
                        Get my free audit
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ChartNoAxesCombined className="h-4 w-4" />
                </span>
                Rankforge
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                The growth-marketing partner for brands that want search to drive
                revenue, not just traffic.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                hello@rankforge.com
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +1 (415) 555-0148
              </span>
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                San Francisco · Remote-first
              </span>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <span>© 2024 Rankforge Agency. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Careers
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
