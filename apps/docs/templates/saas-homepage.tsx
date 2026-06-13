"use client"

import * as React from "react"
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3,
  Workflow,
  Globe,
  Star,
  Layers,
  Activity,
  Users,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const navLinks = ["Product", "Solutions", "Customers", "Pricing", "Docs"]

const logos = ["Northwind", "Acme Corp", "Globex", "Initech", "Umbra", "Vertex"]

const pillars = [
  {
    icon: Zap,
    title: "Ship in minutes",
    body: "Pre-built workflows and an opinionated SDK get your team from zero to production without the boilerplate.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    body: "SOC 2 Type II, SSO, and field-level encryption are baked in so compliance is never an afterthought.",
  },
  {
    icon: BarChart3,
    title: "Insight on tap",
    body: "Real-time dashboards turn raw events into decisions your whole org can act on instantly.",
  },
]

const stats = [
  { label: "Active teams", value: "12,400+" },
  { label: "Uptime SLA", value: "99.99%" },
  { label: "Events / day", value: "3.1B" },
  { label: "Avg. setup", value: "8 min" },
]

const pricing = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    blurb: "For side projects and small teams getting started.",
    features: ["Up to 3 seats", "10k monthly events", "Community support"],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    blurb: "For scaling teams that need automation and insight.",
    features: ["Unlimited seats", "5M monthly events", "Priority support", "Advanced analytics"],
    cta: "Start trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    blurb: "For organizations with security and scale needs.",
    features: ["SSO & SCIM", "Dedicated SLA", "Solutions architect", "Audit logs"],
    cta: "Contact sales",
    highlighted: false,
  },
]

const chartBars = [42, 58, 49, 71, 63, 88, 76]

export default function SaasHomepage() {
  const [annual, setAnnual] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Cascade</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="flex flex-col items-start gap-6">
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                New: AI-powered automations
              </Badge>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                The operating system for{" "}
                <span className="text-primary">modern product teams</span>
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground">
                Cascade unifies your data, workflows, and analytics into one fast,
                opinionated platform, so your team can build and ship without the glue code.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Start building free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Book a demo
                </Button>
              </div>
              <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((n) => (
                    <Avatar key={n} className="h-7 w-7 border-2 border-background">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback className="text-[10px]">U{n}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>Trusted by 12,400+ teams</span>
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
              <Card className="relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                      <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                      <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    </div>
                    <span className="text-xs text-muted-foreground">app.cascade.io</span>
                    <Badge variant="outline" className="gap-1 text-[10px]">
                      <Activity className="h-3 w-3" />
                      Live
                    </Badge>
                  </div>
                  <div className="space-y-5 p-5">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Revenue", value: "$48.2k", icon: TrendingUp },
                        { label: "Active", value: "2,841", icon: Users },
                        { label: "Conv.", value: "6.4%", icon: Zap },
                      ].map((m) => (
                        <div key={m.label} className="rounded-lg border bg-card p-3">
                          <m.icon className="h-4 w-4 text-primary" />
                          <p className="mt-2 text-lg font-semibold tracking-tight">{m.value}</p>
                          <p className="text-xs text-muted-foreground">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium">Weekly activity</span>
                        <Badge variant="secondary" className="text-[10px]">+18%</Badge>
                      </div>
                      <div className="flex h-28 items-end gap-2">
                        {chartBars.map((h, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex-1 rounded-t-md",
                              i === chartBars.length - 2 ? "bg-primary" : "bg-primary/30"
                            )}
                            style={{ height: `${h}%` }}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trusted by */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Powering data teams at companies you know
            </p>
            <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center gap-2 text-base font-semibold text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  <Globe className="h-4 w-4" aria-hidden="true" />
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3-pillar value */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">Why Cascade</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need, nothing you don't
              </h2>
              <p className="mt-4 text-muted-foreground">
                One platform that replaces the patchwork of tools your team duct-tapes together today.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {pillars.map((p) => (
                <Card key={p.title}>
                  <CardContent className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bento feature grid */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">Platform</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Built for the whole workflow
              </h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
              <Card className="md:col-span-2 md:row-span-2">
                <CardContent className="flex h-full flex-col p-6">
                  <Workflow className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-xl font-semibold">Visual workflow builder</h3>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Drag, drop, and connect triggers to actions. Automate the work nobody
                    wants to do, no engineering ticket required.
                  </p>
                  <div className="mt-6 grid flex-1 grid-cols-3 gap-3">
                    {["Trigger", "Transform", "Deliver"].map((step, i) => (
                      <div
                        key={step}
                        className="flex flex-col items-center justify-center rounded-xl border bg-card p-4 text-center"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {i + 1}
                        </span>
                        <span className="mt-2 text-sm font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Activity className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-base font-semibold">Real-time events</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Stream millions of events with sub-second latency.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 text-base font-semibold">Enterprise security</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    SSO, SCIM, and audit logs out of the box.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 rounded-2xl border bg-card p-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold tracking-tight">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col items-center text-center">
              <div className="flex gap-1 text-primary" aria-label="Rated 5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                "We replaced four separate tools with Cascade and cut our time-to-insight
                from days to minutes. It's the backbone of how we operate now."
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-semibold">Maya Rodriguez</p>
                  <p className="text-sm text-muted-foreground">VP Engineering, Northwind</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline">Pricing</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple pricing that scales
              </h2>
              <div className="mt-6 inline-flex items-center gap-1 rounded-full border bg-background p-1">
                <button
                  type="button"
                  onClick={() => setAnnual(false)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                  aria-pressed={!annual}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnual(true)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                  aria-pressed={annual}
                >
                  Annual
                  <span className="ml-1.5 text-xs opacity-80">-20%</span>
                </button>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {pricing.map((plan) => {
                const annualPrice =
                  plan.price.startsWith("$") && plan.price !== "$0"
                    ? "$" + Math.round(Number(plan.price.slice(1)) * 0.8)
                    : plan.price
                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      "relative flex flex-col",
                      plan.highlighted && "border-primary shadow-sm"
                    )}
                  >
                    {plan.highlighted && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        Most popular
                      </Badge>
                    )}
                    <CardContent className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{plan.blurb}</p>
                      <div className="mt-5 flex items-baseline gap-1">
                        <span className="text-4xl font-bold tracking-tight">
                          {annual ? annualPrice : plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-sm text-muted-foreground">{plan.period}</span>
                        )}
                      </div>
                      <Separator className="my-6" />
                      <ul className="flex flex-1 flex-col gap-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 shrink-0 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-6 w-full"
                        variant={plan.highlighted ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-6 p-10 text-center sm:p-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to build on Cascade?
                </h2>
                <p className="max-w-md text-muted-foreground">
                  Start free, no credit card required. Invite your team and ship your first
                  workflow today.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg">
                    Get started free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Talk to sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Layers className="h-5 w-5" />
                </div>
                <span className="text-lg font-semibold tracking-tight">Cascade</span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                The operating system for modern product teams. Build, automate, and analyze
                in one place.
              </p>
            </div>
            {[
              { title: "Product", items: ["Features", "Integrations", "Pricing", "Changelog"] },
              { title: "Company", items: ["About", "Careers", "Blog", "Contact"] },
              { title: "Resources", items: ["Docs", "API", "Status", "Community"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">© 2026 Cascade, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Security"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
