"use client"

import * as React from "react"
import {
  Blocks,
  Zap,
  Globe,
  Workflow,
  Database,
  MousePointerClick,
  Plug,
  Check,
  ChevronRight,
  Sparkles,
  Layers,
  ShieldCheck,
  GitBranch,
  Play,
  Star,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV_LINKS = ["Product", "Templates", "Integrations", "Pricing", "Docs"]

type UseCaseKey = "internal" | "websites" | "automations"

const USE_CASES: Record<
  UseCaseKey,
  {
    label: string
    icon: React.ComponentType<{ className?: string }>
    heading: string
    blurb: string
    blocks: string[]
    metric: string
    metricLabel: string
  }
> = {
  internal: {
    label: "Internal tools",
    icon: Database,
    heading: "Admin panels your team actually likes",
    blurb:
      "Connect a database, drag in a table, and ship a CRUD app before lunch. No deploy pipeline required.",
    blocks: ["Data table", "Detail drawer", "Approval flow", "Role gating"],
    metric: "9 min",
    metricLabel: "avg. build time",
  },
  websites: {
    label: "Websites",
    icon: Globe,
    heading: "Marketing sites that load instantly",
    blurb:
      "Compose pixel-perfect pages from responsive blocks, then publish to a global edge with one click.",
    blocks: ["Hero block", "Pricing grid", "Blog CMS", "SEO meta"],
    metric: "98",
    metricLabel: "Lighthouse score",
  },
  automations: {
    label: "Automations",
    icon: Workflow,
    heading: "Workflows that run while you sleep",
    blurb:
      "Chain triggers, branches, and actions on a visual canvas. Watch every run replay step by step.",
    blocks: ["Webhook trigger", "Branch logic", "Slack action", "Retry rule"],
    metric: "1.2M",
    metricLabel: "runs / month",
  },
}

const FEATURES = [
  {
    icon: MousePointerClick,
    title: "Visual canvas",
    body: "Drag blocks onto an infinite grid with smart snapping and instant preview.",
  },
  {
    icon: Database,
    title: "Any data source",
    body: "Native connectors for Postgres, REST, and Sheets plus a typed query builder.",
  },
  {
    icon: GitBranch,
    title: "Version history",
    body: "Every edit is a checkpoint. Branch, preview, and roll back without fear.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-ready",
    body: "SSO, audit logs, and granular permissions baked into every workspace.",
  },
]

const TEMPLATES = [
  { name: "CRM Lite", tag: "Internal", accent: true },
  { name: "Help Center", tag: "Website", accent: false },
  { name: "Lead Scorer", tag: "Automation", accent: false },
  { name: "Inventory Hub", tag: "Internal", accent: false },
  { name: "Launch Page", tag: "Website", accent: true },
]

const INTEGRATIONS = [
  "Postgres",
  "Stripe",
  "Slack",
  "Notion",
  "Airtable",
  "Sheets",
  "HubSpot",
  "Twilio",
  "GitHub",
  "Segment",
  "Zendesk",
  "OpenAI",
]

const PLANS = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    tagline: "For tinkering and side projects",
    features: ["1 workspace", "3 published apps", "Community support"],
    featured: false,
  },
  {
    name: "Pro",
    monthly: 29,
    annual: 24,
    tagline: "For teams shipping real tools",
    features: [
      "Unlimited apps",
      "Custom domains",
      "Version history",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Scale",
    monthly: 89,
    annual: 74,
    tagline: "For orgs with compliance needs",
    features: ["SSO & SAML", "Audit logs", "Dedicated infra", "SLA uptime"],
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote:
      "We replaced three SaaS subscriptions with internal tools we built in an afternoon.",
    name: "Priya Anand",
    role: "Head of Ops, Northwind",
    initials: "PA",
  },
  {
    quote:
      "Our designers ship marketing pages without waiting on an engineering sprint anymore.",
    name: "Marcus Webb",
    role: "Growth Lead, Tidepool",
    initials: "MW",
  },
  {
    quote:
      "The automation canvas saved my support team roughly twenty hours every single week.",
    name: "Lena Ortiz",
    role: "Support Director, Beacon",
    initials: "LO",
  },
]

const FAQS = [
  {
    q: "Do I need to know how to code?",
    a: "Not at all. Everything is built visually. If you do write code, you can drop in custom JavaScript and SQL anywhere.",
  },
  {
    q: "Where do my apps run?",
    a: "Apps deploy to a global edge network automatically. You can also bring your own domain on Pro and above.",
  },
  {
    q: "Can I migrate off later?",
    a: "Yes. Export your schema and logic as portable JSON, or self-host with our enterprise runtime.",
  },
  {
    q: "Is there a free plan?",
    a: "The Starter plan is free forever and includes everything you need to publish your first three apps.",
  },
]

export default function NoCodeLandingPage() {
  const [useCase, setUseCase] = React.useState<UseCaseKey>("internal")
  const [annual, setAnnual] = React.useState(true)
  const active = USE_CASES[useCase]
  const ActiveIcon = active.icon

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Blocks className="h-4 w-4" />
            </span>
            Stackless
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Start building
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                New: AI block suggestions
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Build software by{" "}
                <span className="text-primary">dragging blocks</span>, not writing
                boilerplate.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Stackless turns your ideas into internal tools, websites, and
                automations — all on one visual canvas, shipped in minutes.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="h-4 w-4" />
                  Watch demo
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Free forever plan. No credit card required.
              </p>
            </div>

            {/* Builder mockup */}
            <div className="relative">
              <div className="rounded-xl border bg-card shadow-sm">
                <div className="flex items-center gap-1.5 border-b px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="ml-3 text-xs text-muted-foreground">
                    untitled-app · canvas
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 p-4">
                  <div className="col-span-1 space-y-2">
                    {["Text", "Table", "Button", "Chart"].map((b) => (
                      <div
                        key={b}
                        className="flex items-center gap-2 rounded-md border bg-background px-2.5 py-2 text-xs text-muted-foreground"
                      >
                        <Layers className="h-3.5 w-3.5" />
                        {b}
                      </div>
                    ))}
                  </div>
                  <div className="col-span-2 space-y-3 rounded-lg border border-dashed bg-muted/30 p-3">
                    <div className="rounded-md border bg-background p-3">
                      <div className="h-2.5 w-24 rounded bg-primary/30" />
                      <div className="mt-2 h-2 w-36 rounded bg-muted-foreground/20" />
                    </div>
                    <div className="rounded-md border border-primary bg-primary/10 p-3">
                      <div className="flex items-center justify-between">
                        <div className="h-2.5 w-20 rounded bg-primary/40" />
                        <Badge className="h-5 px-2 text-[10px]">selected</Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="h-6 rounded bg-background" />
                        <div className="h-6 rounded bg-background" />
                        <div className="h-6 rounded bg-background" />
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-7 w-16 rounded bg-muted-foreground/15" />
                      <div className="h-7 w-16 rounded bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-lg border bg-card px-3 py-2 text-xs shadow-sm sm:block">
                <span className="flex items-center gap-1.5 text-primary">
                  <Zap className="h-3.5 w-3.5" />
                  Deployed in 0.8s
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Use-case tabs (interactive) */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              One canvas, three superpowers
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pick what you want to build and watch the canvas adapt.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {(Object.keys(USE_CASES) as UseCaseKey[]).map((key) => {
              const uc = USE_CASES[key]
              const Icon = uc.icon
              const isActive = key === useCase
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setUseCase(key)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {uc.label}
                </button>
              )
            })}
          </div>

          <Card className="mt-10 overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="p-8 lg:p-10">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ActiveIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold">{active.heading}</h3>
                <p className="mt-3 text-muted-foreground">{active.blurb}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {active.blocks.map((block) => (
                    <li
                      key={block}
                      className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {block}
                    </li>
                  ))}
                </ul>
                <Button className="mt-7" variant="outline">
                  Explore {active.label.toLowerCase()}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-col justify-center border-t bg-muted/30 p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="rounded-xl border bg-card p-6 text-center shadow-sm">
                  <div className="text-5xl font-bold text-primary">
                    {active.metric}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {active.metricLabel}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {active.blocks.slice(0, 2).map((b) => (
                    <div
                      key={b}
                      className="rounded-lg border bg-background p-3 text-xs text-muted-foreground"
                    >
                      <div className="mb-2 h-2 w-12 rounded bg-primary/30" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Features */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Everything you need, nothing you don&apos;t
              </h2>
              <p className="mt-3 text-muted-foreground">
                Powerful primitives that stay out of your way until you need them.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <Card key={f.title} className="h-full">
                    <CardHeader>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <CardTitle className="mt-3 text-base">{f.title}</CardTitle>
                      <CardDescription>{f.body}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Templates gallery row */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Start from a template
              </h2>
              <p className="mt-3 text-muted-foreground">
                Fully editable starting points for the most common builds.
              </p>
            </div>
            <Button variant="link" className="px-0">
              Browse all templates
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TEMPLATES.map((t) => (
              <Card
                key={t.name}
                className={cn(
                  "group overflow-hidden transition-shadow hover:shadow-sm",
                  t.accent && "border-primary"
                )}
              >
                <div
                  className={cn(
                    "flex aspect-[4/3] items-center justify-center",
                    t.accent ? "bg-primary/10" : "bg-muted"
                  )}
                >
                  <Blocks
                    className={cn(
                      "h-8 w-8",
                      t.accent ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2 text-[10px]">
                    {t.tag}
                  </Badge>
                  <div className="text-sm font-medium">{t.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Integrations grid */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-xl text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Plug className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                Connects to your stack
              </h2>
              <p className="mt-3 text-muted-foreground">
                Native connectors for the tools your team already uses.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {INTEGRATIONS.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center gap-2 rounded-lg border bg-card px-3 py-4 text-sm font-medium text-muted-foreground"
                >
                  <span className="h-5 w-5 rounded bg-primary/20" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing with monthly/annual toggle */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Simple, scalable pricing
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start free and upgrade when your apps go to production.
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
              <Switch
                checked={annual}
                onCheckedChange={setAnnual}
                aria-label="Toggle annual billing"
              />
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

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => {
              const price = annual ? plan.annual : plan.monthly
              return (
                <Card
                  key={plan.name}
                  className={cn(
                    "relative flex h-full flex-col",
                    plan.featured && "border-primary shadow-sm"
                  )}
                >
                  {plan.featured && (
                    <Badge className="absolute -top-3 left-6">Most popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.tagline}</CardDescription>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-sm text-muted-foreground">
                        /mo
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <Separator className="mb-5" />
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-6 w-full"
                      variant={plan.featured ? "default" : "outline"}
                    >
                      {plan.monthly === 0 ? "Get started" : "Choose " + plan.name}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Loved by builders everywhere
              </h2>
              <p className="mt-3 text-muted-foreground">
                Teams of every size ship faster with Stackless.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex gap-0.5 text-primary">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs">
                          {t.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <div className="font-medium">{t.name}</div>
                        <div className="text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything else you might be wondering about.
            </p>
          </div>
          <Accordion type="single" collapsible className="mt-8 w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={"item-" + i}>
                <AccordionTrigger className="text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="overflow-hidden rounded-2xl border bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
            <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ship your first app today
            </h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Join thousands of teams building software without the wait. Free to
              start, no credit card needed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary">
                Start building free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Talk to sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Blocks className="h-3.5 w-3.5" />
            </span>
            Stackless
          </div>
          <p>© 2024 Stackless, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
