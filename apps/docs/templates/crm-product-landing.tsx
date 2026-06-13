"use client"

import * as React from "react"
import {
  ArrowRight,
  Check,
  Users,
  Zap,
  BarChart3,
  Workflow,
  Mail,
  Phone,
  Star,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Filter,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const navLinks = ["Product", "Features", "Pricing", "Customers", "Resources"]

const logos = ["Northwind", "Acme Co", "Lumen", "Vertex", "Brightside", "Cascade"]

const stats = [
  { value: "38%", label: "More closed deals" },
  { value: "4.2x", label: "Faster follow-ups" },
  { value: "12hrs", label: "Saved per rep weekly" },
]

const featureSections = [
  {
    icon: Workflow,
    badge: "Pipeline",
    title: "A pipeline that updates itself",
    body:
      "Drag deals across stages or let automation move them for you. Every email, call, and meeting is logged automatically so reps stay focused on selling, not data entry.",
    points: ["Visual drag-and-drop board", "Automatic activity capture", "Custom stages per team"],
    reverse: false,
  },
  {
    icon: BarChart3,
    badge: "Forecasting",
    title: "Forecasts leaders actually trust",
    body:
      "Roll up every rep, region, and product into one live forecast. Spot at-risk deals early and know exactly where the quarter is heading before it ends.",
    points: ["Weighted revenue projections", "Deal-risk scoring", "Real-time team rollups"],
    reverse: true,
  },
]

const tabFeatures = [
  {
    value: "automate",
    label: "Automate",
    icon: Zap,
    heading: "Workflows that run while you sleep",
    text:
      "Trigger sequences when a deal changes stage, a lead replies, or a form is filled. Route the right work to the right rep without lifting a finger.",
    metrics: [
      { k: "Active workflows", v: "24" },
      { k: "Tasks auto-created", v: "1,820" },
      { k: "Hours saved / wk", v: "61" },
    ],
  },
  {
    value: "engage",
    label: "Engage",
    icon: Mail,
    heading: "Outreach that feels personal at scale",
    text:
      "Build multi-step email and call sequences, then track opens, replies, and bookings in one timeline. Templates keep messaging on-brand across the team.",
    metrics: [
      { k: "Open rate", v: "58%" },
      { k: "Reply rate", v: "21%" },
      { k: "Meetings booked", v: "342" },
    ],
  },
  {
    value: "analyze",
    label: "Analyze",
    icon: TrendingUp,
    heading: "Dashboards that answer the next question",
    text:
      "Drill from company revenue down to a single rep's calls in seconds. Share live dashboards with leadership and never assemble a slide deck again.",
    metrics: [
      { k: "Win rate", v: "34%" },
      { k: "Avg deal size", v: "$8.4k" },
      { k: "Sales cycle", v: "19 days" },
    ],
  },
]

const testimonials = [
  {
    quote:
      "We replaced three tools with Pipeline. Our reps actually log their work now because they don't have to.",
    name: "Maya Okafor",
    role: "VP Sales, Northwind",
    initials: "MO",
  },
  {
    quote:
      "Forecasting used to take a full day every Monday. Now it's live and I trust the number.",
    name: "Devang Rao",
    role: "Revenue Ops, Lumen",
    initials: "DR",
  },
  {
    quote:
      "Onboarding took an afternoon. By Friday the whole team had moved their entire book of business over.",
    name: "Sofia Bauer",
    role: "Head of Growth, Vertex",
    initials: "SB",
  },
]

type Tier = {
  name: string
  monthly: number
  annual: number
  blurb: string
  features: string[]
  highlighted: boolean
}

const tiers: Tier[] = [
  {
    name: "Starter",
    monthly: 19,
    annual: 15,
    blurb: "For small teams getting organized.",
    features: ["Up to 3 seats", "Visual pipeline", "Email integration", "Basic reports"],
    highlighted: false,
  },
  {
    name: "Growth",
    monthly: 49,
    annual: 39,
    blurb: "For scaling sales teams.",
    features: [
      "Unlimited seats",
      "Workflow automation",
      "Sequences & templates",
      "Advanced forecasting",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthly: 99,
    annual: 79,
    blurb: "For complex, multi-region orgs.",
    features: [
      "Everything in Growth",
      "SSO & SCIM",
      "Custom objects",
      "Dedicated success manager",
      "SLA & audit logs",
    ],
    highlighted: false,
  },
]

const faqs = [
  {
    q: "How long does it take to get set up?",
    a: "Most teams import their contacts and deals in under an hour. Our guided importer maps your existing spreadsheet or CRM fields automatically.",
  },
  {
    q: "Can I migrate from my current CRM?",
    a: "Yes. We support one-click migration from the major CRMs, and our team will handle the move for Growth and Enterprise plans at no extra cost.",
  },
  {
    q: "Is my data secure?",
    a: "All data is encrypted in transit and at rest. We're SOC 2 Type II certified and offer SSO, SCIM, and granular role-based permissions on Enterprise.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Every plan starts with a 14-day free trial. No credit card required, and you keep everything you build if you upgrade.",
  },
]

function DashboardMockup() {
  const stages = [
    { name: "Lead", deals: 18, pct: 30 },
    { name: "Qualified", deals: 11, pct: 55 },
    { name: "Proposal", deals: 6, pct: 75 },
    { name: "Closed", deals: 4, pct: 100 },
  ]
  return (
    <div className="rounded-xl border bg-card p-4 shadow-lg">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="h-3 w-3" /> Live pipeline
        </Badge>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {stages.map((s) => (
          <div key={s.name} className="rounded-lg bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">{s.name}</p>
            <p className="mt-1 text-lg font-semibold">{s.deals}</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[
          { co: "Acme Co", amt: "$24,000", owner: "MO" },
          { co: "Brightside", amt: "$11,500", owner: "DR" },
          { co: "Cascade", amt: "$8,200", owner: "SB" },
        ].map((row) => (
          <div
            key={row.co}
            className="flex items-center justify-between rounded-lg border bg-background px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px]">{row.owner}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{row.co}</span>
            </div>
            <span className="text-sm font-semibold text-primary">{row.amt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CrmProductLanding() {
  const [annual, setAnnual] = React.useState(true)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Workflow className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Pipeline</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Start free trial</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" /> New: AI deal scoring
              </Badge>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                The CRM your sales team will actually use
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Pipeline turns scattered spreadsheets and inbox chaos into one clean, automated
                workflow — so reps sell more and managers forecast with confidence.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Book a demo
                </Button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" /> 14-day trial · No credit card required
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
              <DashboardMockup />
            </div>
          </div>
        </section>

        {/* Social proof */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-10">
            <p className="text-center text-sm text-muted-foreground">
              Trusted by 4,000+ revenue teams worldwide
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {logos.map((logo) => (
                <span key={logo} className="text-lg font-semibold text-muted-foreground/70">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alternating feature sections */}
        <section className="mx-auto w-full max-w-6xl space-y-20 px-4 py-20">
          {featureSections.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <div className={cn(f.reverse && "lg:order-2")}>
                  <Badge variant="outline" className="gap-1">
                    <Icon className="h-3 w-3" /> {f.badge}
                  </Badge>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight">{f.title}</h2>
                  <p className="mt-4 text-muted-foreground">{f.body}</p>
                  <ul className="mt-6 space-y-3">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-sm">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={cn(f.reverse && "lg:order-1")}>
                  <div className="relative">
                    <div className="absolute -inset-4 -z-10 rounded-3xl bg-accent/40 blur-xl" />
                    <Card className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            {f.badge} view
                          </span>
                          <Filter className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="mt-5 space-y-3">
                          {[72, 54, 88, 41].map((w, i) => (
                            <div key={i} className="space-y-1.5">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Stage {i + 1}</span>
                                <span>{w}%</span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${w}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Interactive feature tabs */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">One platform, every revenue motion</h2>
              <p className="mt-3 text-muted-foreground">
                Automate the busywork, engage every lead, and analyze it all in real time.
              </p>
            </div>
            <Tabs defaultValue="automate" className="mt-10">
              <TabsList className="mx-auto flex w-full max-w-md">
                {tabFeatures.map((t) => {
                  const Icon = t.icon
                  return (
                    <TabsTrigger key={t.value} value={t.value} className="flex-1 gap-1.5">
                      <Icon className="h-4 w-4" /> {t.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
              {tabFeatures.map((t) => (
                <TabsContent key={t.value} value={t.value} className="mt-8">
                  <div className="grid items-center gap-8 rounded-xl border bg-card p-8 lg:grid-cols-2">
                    <div>
                      <h3 className="text-2xl font-semibold">{t.heading}</h3>
                      <p className="mt-3 text-muted-foreground">{t.text}</p>
                      <Button variant="link" className="mt-4 h-auto gap-1 p-0">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {t.metrics.map((m) => (
                        <div
                          key={m.k}
                          className="rounded-lg bg-muted/30 p-4 text-center"
                        >
                          <p className="text-2xl font-bold text-primary">{m.v}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{m.k}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Loved by teams that hit their number</h2>
            <p className="mt-3 text-muted-foreground">
              From scrappy startups to global sales orgs.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-xs">{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Simple, scalable pricing</h2>
              <p className="mt-3 text-muted-foreground">
                Start free. Upgrade when your pipeline grows.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <span
                  className={cn(
                    "text-sm",
                    !annual ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  Monthly
                </span>
                <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
                <span
                  className={cn(
                    "text-sm",
                    annual ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  Annual
                </span>
                <Badge variant="secondary">Save 20%</Badge>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {tiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "relative flex flex-col",
                    tier.highlighted && "border-primary shadow-lg"
                  )}
                >
                  {tier.highlighted && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most popular
                    </Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{tier.blurb}</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        ${annual ? tier.annual : tier.monthly}
                      </span>
                      <span className="text-sm text-muted-foreground">/seat / mo</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {annual ? "Billed annually" : "Billed monthly"}
                    </p>
                    <Button
                      className="mt-6"
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      {tier.name === "Enterprise" ? "Contact sales" : "Start free trial"}
                    </Button>
                    <Separator className="my-6" />
                    <ul className="space-y-3">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know before you start.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA footer */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center">
            <ShieldCheck className="mx-auto h-10 w-10" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Close more deals starting today
            </h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Join 4,000+ teams that run their revenue on Pipeline. Set up in minutes, see results
              in your first week.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" variant="secondary" className="gap-2">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Talk to sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Workflow className="h-4 w-4" />
              </div>
              <span className="font-semibold">Pipeline</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {["Product", "Pricing", "Security", "Docs", "Careers", "Contact"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <Phone className="h-4 w-4" />
              <Users className="h-4 w-4" />
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            © 2024 Pipeline, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
