"use client"

import * as React from "react"
import { Terminal, Copy, Check, Zap, ShieldCheck, GitBranch, Gauge, Boxes, Plug, ArrowRight, Github, Twitter, BookOpen, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const INSTALL_COMMAND = "npm i -g forge-cli"

const INSTALL_TABS = [
  { value: "npm", label: "npm", command: "npm install -D forge-cli" },
  { value: "pnpm", label: "pnpm", command: "pnpm add -D forge-cli" },
  { value: "yarn", label: "yarn", command: "yarn add -D forge-cli" },
]

const TERMINAL_LINES = [
  { prompt: "$", text: "forge build --watch", muted: false },
  { prompt: "", text: "⚡ Forge v3.2.0  ready in 218ms", muted: true },
  { prompt: "", text: "✓ compiled 142 modules", muted: true },
  { prompt: "", text: "✓ types verified  ·  0 errors", muted: true },
  { prompt: "", text: "→ local:   http://localhost:5173", muted: true },
  { prompt: "", text: "→ watching for changes…", muted: true },
]

const FEATURES = [
  { icon: Zap, title: "Instant HMR", body: "Sub-50ms hot reloads powered by a Rust-based bundler. No more waiting on rebuilds." },
  { icon: ShieldCheck, title: "Type-safe by default", body: "First-class TypeScript with strict inference across every command and config file." },
  { icon: GitBranch, title: "Zero-config CI", body: "Drop in one workflow file and Forge handles caching, matrix builds, and previews." },
  { icon: Gauge, title: "Profiled builds", body: "Flame graphs and per-module timings ship in the box. Find the slow path in seconds." },
  { icon: Boxes, title: "Monorepo aware", body: "Detects workspaces automatically and only rebuilds the packages that changed." },
  { icon: Plug, title: "Plugin API", body: "Extend any stage of the pipeline with a tiny, fully typed plugin contract." },
]

const LOGOS = ["Vercel", "Linear", "Supabase", "Raycast", "Resend", "Clerk"]

const PLANS = [
  {
    name: "Open Source",
    price: "$0",
    note: "forever",
    features: ["Unlimited local builds", "Community plugins", "Public repos", "Community support"],
    cta: "Install the CLI",
    highlight: false,
  },
  {
    name: "Team",
    price: "$19",
    note: "per dev / month",
    features: ["Remote build cache", "Private registries", "Org-wide config", "Priority support"],
    cta: "Start free trial",
    highlight: true,
  },
]

function CommandBlock({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)
  const onCopy = () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3 font-mono text-sm",
        className
      )}
    >
      <code className="flex items-center gap-2 truncate text-foreground">
        <span className="select-none text-muted-foreground">$</span>
        {command}
      </code>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Copy install command"
        onClick={onCopy}
        className="size-8 shrink-0"
      >
        {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
      </Button>
    </div>
  )
}

export default function DevtoolLanding() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="size-4" />
            </span>
            forge<span className="text-muted-foreground">/cli</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#install" className="transition-colors hover:text-foreground">Install</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#docs" className="transition-colors hover:text-foreground">Docs</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden gap-1.5 sm:inline-flex">
              <Star className="size-4" />
              <span className="font-mono">14.2k</span>
            </Button>
            <Button size="sm">Get started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="install" className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div className="flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit gap-1.5 font-mono text-xs">
                <Zap className="size-3" />
                v3.2 — now 4x faster
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                The build tool that gets
                <span className="text-primary"> out of your way.</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Forge is a blazing-fast, type-safe CLI for building and shipping modern apps. One command to start, zero config to maintain.
              </p>
              <CommandBlock command={INSTALL_COMMAND} className="max-w-md" />
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Read the docs
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Github className="size-4" />
                  Star on GitHub
                </Button>
              </div>
            </div>

            {/* Terminal preview */}
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
                <span className="size-3 rounded-full bg-muted-foreground/40" />
                <span className="size-3 rounded-full bg-muted-foreground/40" />
                <span className="size-3 rounded-full bg-muted-foreground/40" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">forge — build --watch</span>
              </div>
              <div className="space-y-1.5 p-5 font-mono text-sm leading-relaxed">
                {TERMINAL_LINES.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    {line.prompt ? <span className="select-none text-primary">{line.prompt}</span> : <span className="w-2" />}
                    <span className={cn(line.muted ? "text-muted-foreground" : "text-foreground")}>{line.text}</span>
                  </div>
                ))}
                <div className="flex gap-2">
                  <span className="select-none text-primary">$</span>
                  <span className="inline-block h-5 w-2 animate-pulse bg-foreground/70" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos strip */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Trusted by engineering teams at
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {LOGOS.map((logo) => (
                <span key={logo} className="text-lg font-semibold tracking-tight text-muted-foreground">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section id="features" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 font-mono text-xs">Developer experience</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built for the way you actually work</h2>
              <p className="mt-4 text-muted-foreground">
                Every feature is designed to keep you in flow. No plugins to wrangle, no config to babysit.
              </p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <Card key={f.title} className="transition-colors hover:border-primary/40">
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="size-5" />
                    </div>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <CardDescription>{f.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tabbed code examples */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit font-mono text-xs">Quickstart</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">Up and running in one command</h2>
              <p className="text-muted-foreground">
                Pick your package manager and you are building in under a minute. Forge auto-detects your framework and writes a sensible default config you can override anytime.
              </p>
              <ul className="space-y-3 text-sm">
                {["Detects React, Vue, Svelte & Solid", "Generates typed config on first run", "Caches everything, rebuilds nothing twice"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="overflow-hidden">
              <Tabs defaultValue="npm" className="gap-0">
                <div className="border-b bg-muted/30 px-4 pt-3">
                  <TabsList className="bg-transparent">
                    {INSTALL_TABS.map((t) => (
                      <TabsTrigger key={t.value} value={t.value} className="font-mono text-xs">
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                {INSTALL_TABS.map((t) => (
                  <TabsContent key={t.value} value={t.value} className="m-0">
                    <div className="space-y-4 p-6 font-mono text-sm">
                      <div>
                        <span className="text-muted-foreground"># install</span>
                        <div className="mt-1 flex gap-2">
                          <span className="select-none text-primary">$</span>
                          <span>{t.command}</span>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <span className="text-muted-foreground"># initialize & build</span>
                        <div className="mt-1 flex gap-2">
                          <span className="select-none text-primary">$</span>
                          <span>forge init</span>
                        </div>
                        <div className="mt-1 flex gap-2">
                          <span className="select-none text-primary">$</span>
                          <span>forge build</span>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                        ✓ done in 218ms · output written to /dist
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
          </div>
        </section>

        {/* Pricing teaser */}
        <section id="pricing" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 font-mono text-xs">Pricing</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Free for local. Pay for the cloud.</h2>
              <p className="mt-4 text-muted-foreground">
                The CLI is open source and always free. Add remote caching and team features when you scale.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
              {PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(plan.highlight && "border-primary ring-1 ring-primary")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {plan.highlight && <Badge className="font-mono text-xs">Popular</Badge>}
                    </div>
                    <div className="flex items-baseline gap-1.5 pt-2">
                      <span className="font-mono text-4xl font-semibold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.note}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2.5 text-sm">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-muted-foreground">
                          <Check className="size-4 shrink-0 text-primary" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="docs" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ship faster, starting today</h2>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Install Forge and feel the difference on your next build. No credit card, no signup required.
            </p>
            <CommandBlock command={INSTALL_COMMAND} className="mx-auto mt-8 max-w-sm" />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="lg" className="gap-2">
                <BookOpen className="size-4" />
                Read the docs
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Github className="size-4" />
                View source
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="size-4" />
            </span>
            forge<span className="text-muted-foreground">/cli</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#docs" className="hover:text-foreground">Docs</a>
            <a href="#" className="hover:text-foreground">Changelog</a>
          </nav>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="GitHub" className="size-9">
              <Github className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter" className="size-9">
              <Twitter className="size-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <p className="text-center font-mono text-xs text-muted-foreground">
            © 2026 Forge Labs · MIT Licensed · Built with caffeine and Rust
          </p>
        </div>
      </footer>
    </div>
  )
}
