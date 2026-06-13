"use client"

import * as React from "react"
import {
  Sparkles,
  ArrowRight,
  Check,
  Zap,
  ShieldCheck,
  Gauge,
  Workflow,
  LineChart,
  Quote,
  Star,
  Play,
  Layers,
  Bell,
  GitBranch,
  ChevronRight,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const STEPS = [
  {
    icon: GitBranch,
    title: "Connect your sources",
    body: "Pipe events from your warehouse, product DB, or CDP in minutes with prebuilt connectors.",
  },
  {
    icon: Workflow,
    title: "Define the trigger",
    body: "Compose conditions on a visual canvas. No SQL required, full SQL supported.",
  },
  {
    icon: Bell,
    title: "Ship the workflow",
    body: "Route alerts to Slack, email, or webhooks and watch outcomes resolve in real time.",
  },
]

const SUBFEATURES = [
  {
    icon: Zap,
    title: "Sub-second triggers",
    body: "Streaming evaluation fires the instant a condition is met, not on a 5-minute cron.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails built in",
    body: "Rate limits, dedupe windows, and approval gates keep noisy automations in check.",
  },
  {
    icon: Gauge,
    title: "Live observability",
    body: "Every run is traced end to end so you can debug a misfire in one click.",
  },
  {
    icon: Layers,
    title: "Versioned workflows",
    body: "Branch, preview, and roll back any automation with a full change history.",
  },
]

const SHOWCASE = {
  before: {
    label: "Before Pulse",
    metric: "5m 12s",
    metricLabel: "Avg time to detect",
    points: [
      "Cron jobs polled the database every five minutes",
      "Alerts buried in a shared inbox nobody owned",
      "Engineers wrote one-off scripts for each rule",
    ],
  },
  after: {
    label: "After Pulse",
    metric: "0.8s",
    metricLabel: "Avg time to detect",
    points: [
      "Streaming engine reacts the moment data changes",
      "Routed to the right on-call channel automatically",
      "Reusable workflows shipped from a visual builder",
    ],
  },
}

const RELATED = [
  { icon: LineChart, title: "Metrics & Insights", body: "Track adoption and impact across every workflow." },
  { icon: Workflow, title: "Workflow Builder", body: "Drag-and-drop canvas for complex branching logic." },
  { icon: ShieldCheck, title: "Access Controls", body: "SAML, SCIM, and granular role permissions." },
]

const NAV = ["Overview", "How it works", "Showcase", "Customers"]

export default function FeatureDeepDive() {
  const [view, setView] = React.useState<"before" | "after">("after")
  const active = SHOWCASE[view]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </span>
            Pulse
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Start free
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.primary/0.12),transparent_55%)]" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="size-3.5" />
                Real-time automation
              </Badge>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Trigger alerts the instant your data changes
              </h1>
              <p className="mt-5 max-w-md text-pretty text-lg text-muted-foreground">
                Pulse Triggers watch your live data and fire workflows in under a
                second, so your team acts before customers ever notice.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Try Triggers free
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="size-4" />
                  Watch demo
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  No credit card
                </span>
                <span className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  14-day trial
                </span>
              </div>
            </div>

            {/* Product mockup */}
            <Card className="overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
                <span className="size-3 rounded-full bg-muted-foreground/30" />
                <span className="size-3 rounded-full bg-muted-foreground/30" />
                <span className="size-3 rounded-full bg-muted-foreground/30" />
                <span className="ml-3 text-xs text-muted-foreground">pulse.app/triggers</span>
              </div>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center justify-between rounded-lg border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Zap className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">Payment failed</p>
                      <p className="text-xs text-muted-foreground">amount &gt; $500</p>
                    </div>
                  </div>
                  <Badge className="gap-1">
                    <span className="size-1.5 rounded-full bg-primary-foreground" />
                    Live
                  </Badge>
                </div>
                {[
                  { name: "Notify #billing-oncall", t: "0.4s" },
                  { name: "Open Linear incident", t: "0.6s" },
                  { name: "Email account owner", t: "0.8s" },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-2.5 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Check className="size-4 text-primary" />
                      {row.name}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{row.t}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              From raw event to resolved alert in three steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg border bg-card text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sub-features */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                Everything you need to automate with confidence
              </h2>
              <p className="mt-3 text-muted-foreground">
                Triggers are powerful on day one and stay safe as you scale to
                thousands of workflows.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SUBFEATURES.map((f) => (
                <Card key={f.title} className="border-border/60">
                  <CardHeader>
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="size-5" />
                    </span>
                    <CardTitle className="mt-4 text-base">{f.title}</CardTitle>
                    <CardDescription>{f.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive before / after showcase */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">See the difference</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Detection that went from minutes to milliseconds
            </h2>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center rounded-full border bg-muted/40 p-1">
              {(["before", "after"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setView(key)}
                  aria-pressed={view === key}
                  className={cn(
                    "rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
                    view === key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {SHOWCASE[key].label}
                </button>
              ))}
            </div>
          </div>

          <Card className="mx-auto mt-8 max-w-3xl">
            <CardContent className="grid gap-8 p-8 sm:grid-cols-[200px_1fr] sm:items-center">
              <div
                className={cn(
                  "rounded-xl border p-6 text-center transition-colors",
                  view === "after" ? "border-primary bg-primary/10" : "bg-muted/40",
                )}
              >
                <p className="text-4xl font-semibold tracking-tight">{active.metric}</p>
                <p className="mt-1 text-sm text-muted-foreground">{active.metricLabel}</p>
              </div>
              <ul className="space-y-3">
                {active.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        view === "after" ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span className={view === "before" ? "text-muted-foreground" : ""}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Customer quote */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
            <Quote className="mx-auto size-8 text-primary" />
            <blockquote className="mt-6 text-balance text-2xl font-medium leading-snug tracking-tight">
              &ldquo;Pulse Triggers cut our incident response time by 80%. We catch
              failed payments before a customer ever files a ticket.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Avatar>
                <AvatarImage src="" alt="" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium">Maya Rivera</p>
                <p className="text-sm text-muted-foreground">VP Engineering, Northwind</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related features */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Explore related features</h2>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              View all
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {RELATED.map((r) => (
              <a
                key={r.title}
                href="#"
                className="group flex items-start gap-4 rounded-xl border bg-card p-6 transition-colors hover:border-primary"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <r.icon className="size-5" />
                </span>
                <div>
                  <p className="flex items-center gap-1 font-medium">
                    {r.title}
                    <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <Card className="overflow-hidden border-primary/30 bg-primary/10">
            <CardContent className="flex flex-col items-center gap-6 px-8 py-16 text-center">
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight">
                Ship your first real-time trigger today
              </h2>
              <p className="max-w-md text-muted-foreground">
                Spin up a workflow in minutes. No credit card, no sales call, no
                lock-in.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg">
                  Start free
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Talk to sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Zap className="size-3.5" />
            </span>
            Pulse
          </div>
          <p>&copy; 2024 Pulse Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
