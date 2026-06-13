"use client"

import * as React from "react"
import {
  Slack,
  ArrowRight,
  Check,
  Plug,
  Bell,
  MessageSquare,
  Workflow,
  Lock,
  ShieldCheck,
  Eye,
  RefreshCw,
  Star,
  Quote,
  Hash,
  CheckCircle2,
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

const NAV_LINKS = ["Integrations", "Pricing", "Docs", "Changelog"]

const FEATURES = [
  {
    icon: Bell,
    title: "Real-time alerts in any channel",
    description:
      "Route deploys, incidents, and customer signups straight into the Slack channels your team already lives in.",
  },
  {
    icon: MessageSquare,
    title: "Reply and resolve without leaving Slack",
    description:
      "Acknowledge alerts, add comments, and close tickets with message actions and shortcuts.",
  },
  {
    icon: Workflow,
    title: "Trigger workflows from a message",
    description:
      "Kick off automations, assign owners, and update records using slash commands and the Workflow Builder.",
  },
  {
    icon: Hash,
    title: "Per-channel routing rules",
    description:
      "Map projects, severities, and teams to specific channels so the right people always get pinged.",
  },
]

const SETUP_STEPS = [
  {
    title: "Connect your workspace",
    description:
      "Click Connect, choose your Slack workspace, and authorize cano with a single OAuth approval.",
  },
  {
    title: "Pick your channels",
    description:
      "Select which channels receive which events. Defaults are sensible, and everything is editable later.",
  },
  {
    title: "Customize notifications",
    description:
      "Choose message formats, mention rules, and quiet hours so alerts stay signal, not noise.",
  },
  {
    title: "You're live",
    description:
      "Send a test message to confirm the connection. Your team starts receiving updates instantly.",
  },
]

const PERMISSIONS = [
  {
    icon: MessageSquare,
    label: "Post messages",
    detail: "Send notifications to the channels you select.",
  },
  {
    icon: Hash,
    label: "View channel list",
    detail: "Read public channel names so you can route events.",
  },
  {
    icon: Bell,
    label: "Add shortcuts & actions",
    detail: "Enable in-message replies and quick actions.",
  },
]

const DATA_NOTES = [
  "We never read message history.",
  "Tokens are encrypted at rest and revocable anytime.",
  "Disconnecting removes all access instantly.",
]

const RELATED = [
  { icon: MessageSquare, name: "Microsoft Teams", category: "Messaging", status: "Available" },
  { icon: Bell, name: "PagerDuty", category: "Incident response", status: "Available" },
  { icon: Workflow, name: "Zapier", category: "Automation", status: "Available" },
  { icon: Hash, name: "Discord", category: "Messaging", status: "Available" },
  { icon: RefreshCw, name: "Webhooks", category: "Developer", status: "Available" },
  { icon: Plug, name: "Linear", category: "Project tracking", status: "Beta" },
]

const STATS = [
  { value: "120k+", label: "Workspaces connected" },
  { value: "<2 min", label: "Average setup time" },
  { value: "99.99%", label: "Delivery uptime" },
]

export default function IntegrationDetail() {
  const [connected, setConnected] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plug className="size-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">cano</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  link === "Integrations" && "text-foreground",
                )}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Start free</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
            <a
              href="#"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronRight className="size-4 rotate-180" />
              All integrations
            </a>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-2xl border bg-card shadow-sm">
                    <Plug className="size-7 text-primary" />
                  </div>
                  <div className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground">
                    <Plug className="size-4 rotate-90" />
                  </div>
                  <div className="flex size-14 items-center justify-center rounded-2xl border bg-card shadow-sm">
                    <Slack className="size-7" />
                  </div>
                </div>
                <Badge variant="secondary" className="mb-4">
                  Messaging
                </Badge>
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  cano for Slack
                </h1>
                <p className="mt-4 max-w-md text-base text-muted-foreground">
                  Bring alerts, approvals, and workflows into Slack so your team
                  can act on what matters without context switching.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    onClick={() => setConnected((v) => !v)}
                    variant={connected ? "secondary" : "default"}
                  >
                    {connected ? (
                      <>
                        <Check className="size-4" />
                        Connected
                      </>
                    ) : (
                      <>
                        Connect to Slack
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </Button>
                  <Button size="lg" variant="outline">
                    View documentation
                  </Button>
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="size-4 text-primary" />
                  Secure OAuth connection. No credentials stored.
                </div>
              </div>

              <Card className="border bg-card shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-2.5">
                      <Slack className="size-5" />
                      <span className="text-sm font-medium">#deploys</span>
                    </div>
                    <Badge
                      variant={connected ? "default" : "outline"}
                      className="gap-1"
                    >
                      {connected ? (
                        <>
                          <span className="size-1.5 rounded-full bg-primary-foreground" />
                          Live
                        </>
                      ) : (
                        "Preview"
                      )}
                    </Badge>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Plug className="size-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">cano</span>{" "}
                          <span className="text-muted-foreground">
                            APP 9:24 AM
                          </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Deploy{" "}
                          <span className="font-medium text-foreground">
                            v2.14.0
                          </span>{" "}
                          shipped to production by Priya.
                        </p>
                        <div className="flex gap-2 pt-1">
                          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs">
                            <CheckCircle2 className="size-3 text-primary" />
                            View
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs">
                            Rollback
                          </span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-3 gap-3">
                      {STATS.map((s) => (
                        <div key={s.label}>
                          <p className="text-lg font-semibold">{s.value}</p>
                          <p className="text-xs text-muted-foreground">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What you can do */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              What you can do
            </h2>
            <p className="mt-3 text-muted-foreground">
              The Slack integration turns notifications into a two-way workspace
              for getting things done.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <Card key={f.title} className="border bg-card">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Setup steps + Permissions */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Set up in four steps
              </h2>
              <p className="mt-3 text-muted-foreground">
                Most teams are live in under two minutes. No engineering
                required.
              </p>
              <ol className="mt-10 space-y-8">
                {SETUP_STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-card text-sm font-semibold">
                        {i + 1}
                      </div>
                      {i < SETUP_STEPS.length - 1 && (
                        <div className="mt-2 w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Card className="h-fit border bg-card shadow-sm">
              <CardHeader>
                <div className="mb-1 flex items-center gap-2">
                  <Lock className="size-4 text-primary" />
                  <CardTitle className="text-base">Permissions & data</CardTitle>
                </div>
                <CardDescription>
                  Exactly what cano can access in your workspace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <ul className="space-y-4">
                  {PERMISSIONS.map((p) => (
                    <li key={p.label} className="flex gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                        <p.icon className="size-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Separator />
                <ul className="space-y-2.5">
                  {DATA_NOTES.map((note) => (
                    <li
                      key={note}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Eye className="mt-0.5 size-4 shrink-0 text-primary" />
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Customer quote */}
        <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <Quote className="size-8 text-primary" />
            <blockquote className="mt-6 text-xl font-medium leading-relaxed tracking-tight md:text-2xl">
              "The Slack integration replaced three internal bots. Our on-call
              engineers now triage incidents in the same place they already
              talk. Setup took one coffee break."
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                DM
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Dana Mehta</p>
                <p className="text-sm text-muted-foreground">
                  Head of Platform, Northwind
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
        </section>

        {/* Related integrations */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Related integrations
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Connect cano to the rest of your stack.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Browse all
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RELATED.map((r) => (
                <Card
                  key={r.name}
                  className="group border bg-card transition-colors hover:border-primary/40"
                >
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background text-muted-foreground">
                      <r.icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{r.name}</p>
                        {r.status === "Beta" && (
                          <Badge variant="outline" className="text-[10px]">
                            Beta
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {r.category}
                      </p>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
          <Card className="overflow-hidden border bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-14 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <Slack className="size-6" />
              </div>
              <h2 className="max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">
                Bring cano into your Slack today
              </h2>
              <p className="max-w-md text-primary-foreground/80">
                Free on every plan. Connect in minutes and disconnect anytime,
                no strings attached.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" variant="secondary">
                  Connect to Slack
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  Talk to sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Plug className="size-3.5" />
            </div>
            <span className="text-sm font-medium">cano</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 cano, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Security
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
