"use client"

import * as React from "react"
import {
  Layers,
  ArrowRight,
  Check,
  Zap,
  GitBranch,
  BarChart3,
  Bell,
  ShieldCheck,
  Gauge,
  Workflow,
  Quote,
  Star,
  Sparkles,
  Play,
  Search,
  MoreHorizontal,
  CircleDot,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

type FeatureKey = "automate" | "branch" | "insights" | "alerts"

const FEATURES: {
  key: FeatureKey
  icon: React.ComponentType<{ className?: string }>
  label: string
  eyebrow: string
  title: string
  desc: string
  points: string[]
}[] = [
  {
    key: "automate",
    icon: Workflow,
    label: "Automations",
    eyebrow: "No-code workflows",
    title: "Automate the busywork, keep the judgment",
    desc: "Chain triggers, conditions, and actions into workflows that run the moment something changes — so your team never copies data between tools again.",
    points: [
      "200+ pre-built triggers and actions",
      "Branch on any field with visual logic",
      "Dry-run mode before you ship",
    ],
  },
  {
    key: "branch",
    icon: GitBranch,
    label: "Environments",
    eyebrow: "Safe by default",
    title: "Preview every change before it ships",
    desc: "Spin up an isolated environment for each branch, test against real data, and merge with confidence. Roll back any deploy in a single click.",
    points: [
      "Per-branch preview environments",
      "One-click rollback to any point",
      "Audit log of every promotion",
    ],
  },
  {
    key: "insights",
    icon: BarChart3,
    label: "Insights",
    eyebrow: "Live analytics",
    title: "See what's working in real time",
    desc: "Funnels, cohorts, and retention curves update as events land — no warehouse, no waiting. Drill into any metric down to the individual session.",
    points: [
      "Sub-second query on live events",
      "Shareable dashboards and alerts",
      "Export to CSV or your warehouse",
    ],
  },
  {
    key: "alerts",
    icon: Bell,
    label: "Alerts",
    eyebrow: "Stay ahead",
    title: "Get pinged before users feel it",
    desc: "Set thresholds on any metric and route alerts to Slack, email, or PagerDuty. Smart grouping means signal without the noise.",
    points: [
      "Anomaly detection out of the box",
      "Per-team routing and on-call schedules",
      "Snooze, mute, and escalation rules",
    ],
  },
]

const BENEFITS = [
  {
    icon: Zap,
    title: "Live in an afternoon",
    desc: "Drop in the SDK, connect your stack, and ship your first workflow before lunch is over.",
  },
  {
    icon: Gauge,
    title: "Built for scale",
    desc: "From your first hundred events to a billion a day — the same fast queries, no re-architecture.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    desc: "SOC 2 Type II, SSO, row-level permissions, and full audit trails baked in from day one.",
  },
  {
    icon: Layers,
    title: "Plays with everything",
    desc: "Native integrations for the 60+ tools your team already lives in, plus a typed REST API.",
  },
]

const STATS = [
  { value: "9,200+", label: "teams onboard" },
  { value: "2.4B", label: "events / day" },
  { value: "99.99%", label: "uptime" },
]

const LOGOS = ["Northwind", "Loft", "Settle", "Vertex", "Cobalt", "Drift"]

function MockHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
      </div>
      <span className="text-xs font-medium text-muted-foreground">{title}</span>
      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

function FeatureMock({ feature }: { feature: FeatureKey }) {
  if (feature === "automate") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card">
        <MockHeader title="onboarding.flow" />
        <div className="space-y-3 p-5">
          {[
            { icon: CircleDot, name: "New signup", tag: "Trigger" },
            { icon: GitBranch, name: "Plan is Pro?", tag: "Condition" },
            { icon: Bell, name: "Send welcome series", tag: "Action" },
            { icon: Check, name: "Add to CRM", tag: "Action" },
          ].map((step, i) => {
            const Icon = step.icon
            return (
              <div key={step.name} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-1 items-center justify-between rounded-lg border bg-background px-3 py-2">
                  <span className="text-sm font-medium">{step.name}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {step.tag}
                  </Badge>
                </div>
                {i < 3 && null}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (feature === "branch") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card">
        <MockHeader title="environments" />
        <div className="divide-y">
          {[
            { name: "production", status: "Live", active: true },
            { name: "feature/new-billing", status: "Preview", active: false },
            { name: "fix/auth-redirect", status: "Preview", active: false },
          ].map((env) => (
            <div
              key={env.name}
              className="flex items-center justify-between px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-sm">{env.name}</span>
              </div>
              <Badge variant={env.active ? "default" : "outline"}>
                {env.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t bg-muted/30 px-5 py-3 text-xs text-muted-foreground">
          <span>Last promoted 4m ago</span>
          <span className="font-medium text-primary">Rollback ready</span>
        </div>
      </div>
    )
  }

  if (feature === "insights") {
    const bars = [42, 58, 35, 72, 64, 88, 76]
    return (
      <div className="overflow-hidden rounded-xl border bg-card">
        <MockHeader title="growth.dashboard" />
        <div className="p-5">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Weekly active</p>
              <p className="text-2xl font-bold">128,940</p>
            </div>
            <Badge variant="secondary" className="gap-1">
              <BarChart3 className="h-3 w-3" /> +12.4%
            </Badge>
          </div>
          <div className="flex h-32 items-end gap-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t-md",
                  i === bars.length - 1 ? "bg-primary" : "bg-primary/30"
                )}
                style={{ height: h + "%" }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { l: "Retention", v: "64%" },
              { l: "Sessions", v: "3.2" },
              { l: "Churn", v: "1.8%" },
            ].map((m) => (
              <div key={m.l} className="rounded-lg border bg-background py-2">
                <p className="text-sm font-semibold">{m.v}</p>
                <p className="text-[10px] text-muted-foreground">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <MockHeader title="alerts" />
      <div className="divide-y">
        {[
          { name: "API latency p95", val: "spiked to 842ms", level: 78, hot: true },
          { name: "Error rate", val: "0.4% — nominal", level: 18, hot: false },
          { name: "Queue depth", val: "approaching limit", level: 61, hot: false },
        ].map((a) => (
          <div key={a.name} className="px-5 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell
                  className={cn(
                    "h-4 w-4",
                    a.hot ? "text-destructive" : "text-muted-foreground"
                  )}
                />
                <span className="text-sm font-medium">{a.name}</span>
              </div>
              <span
                className={cn(
                  "text-xs",
                  a.hot ? "text-destructive" : "text-muted-foreground"
                )}
              >
                {a.val}
              </span>
            </div>
            <Progress value={a.level} className="mt-3 h-1.5" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FeatureTour() {
  const [active, setActive] = React.useState<FeatureKey>("automate")
  const current = FEATURES.find((f) => f.key === active) ?? FEATURES[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" />
            </span>
            Cascade
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#tour" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#benefits" className="transition-colors hover:text-foreground">
              Why Cascade
            </a>
            <a href="#proof" className="transition-colors hover:text-foreground">
              Customers
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
              <a href="#cta">Sign in</a>
            </Button>
            <Button size="sm" asChild>
              <a href="#cta">Start free</a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center sm:py-28">
            <Badge variant="secondary" className="mb-6 gap-1">
              <Sparkles className="h-3 w-3" />
              New: anomaly detection is live
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              One platform to ship, watch, and scale your product
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Automations, preview environments, live insights, and smart alerts
              — together, so your team moves fast without flying blind.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="#cta">
                  Start free <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#tour">
                  <Play className="h-4 w-4" /> Take the tour
                </a>
              </Button>
            </div>

            <div className="mx-auto mt-14 flex max-w-lg items-center justify-center gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold sm:text-3xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Trusted by fast-moving teams
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base font-semibold text-muted-foreground/70">
                {LOGOS.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed feature switcher */}
        <section id="tour" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                A guided tour of everything inside
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Click through the core surfaces your team will use every day.
              </p>
            </div>

            {/* Tab buttons */}
            <div
              role="tablist"
              aria-label="Feature tour"
              className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2"
            >
              {FEATURES.map((f) => {
                const Icon = f.icon
                const selected = f.key === active
                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(f.key)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {f.label}
                  </button>
                )
              })}
            </div>

            {/* Active feature panel */}
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-primary">
                  {current.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 text-muted-foreground">{current.desc}</p>
                <ul className="mt-6 space-y-3">
                  {current.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm">{p}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="mt-6 h-auto gap-1 p-0" asChild>
                  <a href="#cta">
                    Explore {current.label.toLowerCase()}{" "}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <FeatureMock feature={active} />
            </div>
          </div>
        </section>

        {/* Benefits grid */}
        <section id="benefits" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">
                Why teams switch to Cascade
              </h2>
              <p className="mt-3 text-muted-foreground">
                The power of four point tools, with none of the glue code holding
                them together.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b) => {
                const Icon = b.icon
                return (
                  <Card key={b.title} className="border bg-card">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{b.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {b.desc}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section id="proof" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
            <div className="mb-5 flex items-center justify-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <Quote className="mx-auto h-8 w-8 text-primary/40" />
            <blockquote className="mx-auto mt-6 max-w-2xl text-2xl font-medium leading-snug tracking-tight">
              "We replaced three tools and a pile of brittle scripts with Cascade.
              Our team ships twice as often and finds out about issues before our
              customers do."
            </blockquote>
            <Separator className="mx-auto my-8 max-w-xs" />
            <div className="flex items-center justify-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage src="https://i.pravatar.cc/120?img=5" alt="" />
                <AvatarFallback>JM</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-sm font-semibold">Jordan Maris</div>
                <div className="text-xs text-muted-foreground">
                  VP Engineering, Vertex
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="bg-background">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <Card className="border bg-card">
              <CardContent className="flex flex-col items-center px-6 py-14 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Search className="h-6 w-6" />
                </span>
                <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                  See the whole picture in one place
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Start free in minutes — no credit card, no sales call. Invite
                  your team whenever you are ready.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="gap-2" asChild>
                    <a href="#top">
                      Start free <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#tour">Book a demo</a>
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Free for up to 3 seats. Cancel anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Layers className="h-3 w-3" />
            </span>
            <span className="font-medium text-foreground">Cascade</span>
          </div>
          <nav className="flex gap-6">
            <a href="#tour" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#benefits" className="transition-colors hover:text-foreground">
              Why Cascade
            </a>
            <a href="#proof" className="transition-colors hover:text-foreground">
              Customers
            </a>
          </nav>
          <p>© 2026 Cascade Labs, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
