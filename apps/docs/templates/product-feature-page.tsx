"use client"

import * as React from "react"
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  Boxes,
  Check,
  Cloud,
  Database,
  Gauge,
  GitBranch,
  Layers,
  Lock,
  Menu,
  Shield,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Metrics", href: "#metrics" },
  { label: "Integrations", href: "#integrations" },
]

const FEATURE_ROWS = [
  {
    eyebrow: "Real-time pipelines",
    title: "Stream events the moment they happen",
    body: "Ingest millions of events per second with a durable log that never drops a record. Backpressure, replay, and exactly-once delivery are handled for you — no brittle glue code.",
    bullets: ["Sub-50ms p99 latency", "Automatic replay windows", "Exactly-once semantics"],
    icon: Activity,
    align: "left" as const,
  },
  {
    eyebrow: "Visual workflows",
    title: "Compose logic without leaving the canvas",
    body: "Drag, branch, and fan-out across services in a single visual graph. Every node is versioned and testable, so your team ships transformations with confidence.",
    bullets: ["Version-controlled graphs", "Inline unit testing", "One-click rollbacks"],
    icon: Workflow,
    align: "right" as const,
  },
  {
    eyebrow: "Governance built in",
    title: "Security and lineage out of the box",
    body: "Track every field from source to sink with column-level lineage. Role-based access, audit trails, and PII masking ship enabled by default — not as an upsell.",
    bullets: ["Column-level lineage", "PII auto-masking", "SOC 2 audit trails"],
    icon: Shield,
    align: "left" as const,
  },
]

const FEATURE_VISUALS = [
  [
    { label: "Events / sec", value: "1.2M", icon: Zap },
    { label: "Partitions", value: "256", icon: Boxes },
    { label: "Replay window", value: "7 days", icon: GitBranch },
    { label: "Drop rate", value: "0.00%", icon: Gauge },
  ],
  [
    { label: "Active graphs", value: "48", icon: Workflow },
    { label: "Test coverage", value: "94%", icon: Check },
    { label: "Avg build", value: "11s", icon: Layers },
    { label: "Rollbacks", value: "1-click", icon: GitBranch },
  ],
  [
    { label: "Tracked fields", value: "12.4k", icon: Database },
    { label: "Masked columns", value: "318", icon: Lock },
    { label: "Audit events", value: "2.1M", icon: Shield },
    { label: "Compliance", value: "SOC 2", icon: Check },
  ],
]

const METRICS = [
  { value: "99.99%", label: "Measured uptime" },
  { value: "48ms", label: "p99 latency" },
  { value: "1.2M", label: "Events / second" },
  { value: "7,800+", label: "Teams onboard" },
]

const INTEGRATIONS = [
  { name: "Postgres", icon: Database },
  { name: "Snowflake", icon: Cloud },
  { name: "Kafka", icon: Activity },
  { name: "dbt", icon: Layers },
  { name: "Datadog", icon: BarChart3 },
  { name: "Airflow", icon: Workflow },
  { name: "S3", icon: Boxes },
  { name: "Slack", icon: Bell },
]

export default function ProductFeaturePage() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#overview" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            Streamline
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">
              Start free
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {menuOpen ? (
          <div className="border-t px-6 py-3 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button size="sm" className="mt-2">
                Start free
              </Button>
            </nav>
          </div>
        ) : null}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="overview" className="border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Zap className="size-3.5" aria-hidden="true" />
                Streaming engine
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Move your data the instant it changes
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                One capability, built deep. Capture, transform, and route every
                event in real time — with governance, replay, and lineage that
                most platforms charge extra for.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Start free
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
                <Button size="lg" variant="outline">
                  Book a demo
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  14-day trial
                </span>
              </div>
            </div>

            {/* Product mock placeholder */}
            <div className="relative">
              <div className="rounded-2xl border bg-card p-3 shadow-sm">
                <div className="flex items-center gap-1.5 px-2 py-1.5">
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="ml-2 text-xs text-muted-foreground">
                    streamline.app/pipelines
                  </span>
                </div>
                <div className="mt-2 rounded-xl bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Activity className="size-4 text-primary" aria-hidden="true" />
                      Live throughput
                    </div>
                    <Badge variant="outline">streaming</Badge>
                  </div>
                  <div className="flex h-32 items-end gap-1.5">
                    {[40, 62, 48, 78, 56, 90, 70, 84, 60, 96, 74, 88].map(
                      (h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-primary/70"
                          style={{ height: `${h}%` }}
                        />
                      ),
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      { l: "Throughput", v: "1.2M/s" },
                      { l: "Latency", v: "48ms" },
                      { l: "Errors", v: "0" },
                    ].map((m) => (
                      <div key={m.l} className="rounded-lg bg-background p-2.5">
                        <div className="text-xs text-muted-foreground">
                          {m.l}
                        </div>
                        <div className="text-sm font-semibold">{m.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternating feature rows */}
        <section id="capabilities" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything the capability needs to be production-grade
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three pillars that make real-time data dependable at any scale.
            </p>
          </div>

          <div className="mt-16 space-y-20">
            {FEATURE_ROWS.map((row, idx) => {
              const Icon = row.icon
              const visual = FEATURE_VISUALS[idx]
              return (
                <div
                  key={row.title}
                  className="grid items-center gap-10 lg:grid-cols-2"
                >
                  <div className={cn(row.align === "right" && "lg:order-2")}>
                    <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-medium text-primary">
                      {row.eyebrow}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                      {row.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">{row.body}</p>
                    <ul className="mt-5 space-y-2.5">
                      {row.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-sm">
                          <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual block */}
                  <div className={cn(row.align === "right" && "lg:order-1")}>
                    <div className="rounded-2xl border bg-card p-6 shadow-sm">
                      <div className="grid grid-cols-2 gap-4">
                        {visual.map((stat) => {
                          const StatIcon = stat.icon
                          return (
                            <div
                              key={stat.label}
                              className="rounded-xl bg-muted/30 p-4"
                            >
                              <StatIcon
                                className="size-4 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <div className="mt-3 text-xl font-semibold">
                                {stat.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {stat.label}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Metrics band */}
        <section id="metrics" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {METRICS.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {m.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration logos */}
        <section id="integrations" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Integrations
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">
              Plugs into the stack you already run
            </h2>
            <p className="mt-3 text-muted-foreground">
              Native connectors for the tools your data flows through every day.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {INTEGRATIONS.map((tool) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium">{tool.name}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="overflow-hidden rounded-2xl border bg-primary/10 px-8 py-14 text-center sm:px-14">
            <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight">
              Ship real-time data this week
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Connect a source, draw your first pipeline, and watch events flow
              in minutes — no infrastructure to manage.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg">
                Start free
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="outline">
                Talk to sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" aria-hidden="true" />
              </span>
              Streamline
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Streamline Data, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#overview" className="hover:text-foreground">
                Privacy
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="#overview" className="hover:text-foreground">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
