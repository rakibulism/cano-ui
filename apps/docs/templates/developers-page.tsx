"use client"

import * as React from "react"
import {
  Terminal,
  Code2,
  Zap,
  Lock,
  Webhook,
  GitBranch,
  ArrowRight,
  Check,
  Copy,
  BookOpen,
  Cpu,
  Activity,
  Github,
  MessageSquare,
  Boxes,
  Server,
  FileCode,
  PlayCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const NAV = ["Docs", "SDKs", "API Reference", "Changelog", "Pricing"]

const LANGS = [
  { id: "node", label: "Node.js" },
  { id: "python", label: "Python" },
  { id: "go", label: "Go" },
  { id: "curl", label: "cURL" },
]

const SNIPPETS: Record<string, string> = {
  node: `import { Forge } from "@forge/sdk"

const forge = new Forge(process.env.FORGE_KEY)

const deploy = await forge.deploy({
  service: "checkout-api",
  region: "iad1",
  replicas: 3,
})

console.log(deploy.url) // https://checkout-api.forge.app`,
  python: `from forge import Forge

forge = Forge(api_key=os.environ["FORGE_KEY"])

deploy = forge.deploy(
    service="checkout-api",
    region="iad1",
    replicas=3,
)

print(deploy.url)  # https://checkout-api.forge.app`,
  go: `package main

import "github.com/forge/forge-go"

func main() {
    f := forge.New(os.Getenv("FORGE_KEY"))
    d, _ := f.Deploy(forge.DeployOpts{
        Service:  "checkout-api",
        Region:   "iad1",
        Replicas: 3,
    })
    fmt.Println(d.URL)
}`,
  curl: `curl https://api.forge.app/v1/deploy \\
  -H "Authorization: Bearer fg_live_•••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "service": "checkout-api",
    "region": "iad1",
    "replicas": 3
  }'`,
}

const FEATURES = [
  {
    icon: Zap,
    title: "Edge deploys",
    body: "Ship to 18 regions in under 400ms. Atomic rollouts with instant rollback on any failed health check.",
  },
  {
    icon: Webhook,
    title: "Typed webhooks",
    body: "Every event is versioned and signed. Generated types stay in sync with your SDK on each release.",
  },
  {
    icon: Lock,
    title: "Scoped keys",
    body: "Mint short-lived, least-privilege tokens per environment. Rotate or revoke from the dashboard or API.",
  },
  {
    icon: Cpu,
    title: "Autoscaling",
    body: "Scale to zero between requests, burst to thousands of replicas. You only pay for compute you use.",
  },
  {
    icon: GitBranch,
    title: "Preview branches",
    body: "Every pull request gets an isolated, full-stack preview URL with its own database and secrets.",
  },
  {
    icon: Server,
    title: "Self-host ready",
    body: "Run the same control plane in your own VPC. One binary, no external dependencies, BYO storage.",
  },
]

const RESOURCES = [
  { icon: BookOpen, title: "Quickstart", body: "Deploy your first service in five minutes.", meta: "Guide" },
  { icon: FileCode, title: "API Reference", body: "Every endpoint, parameter, and error code.", meta: "Reference" },
  { icon: Boxes, title: "SDK examples", body: "Copy-paste recipes for the common workflows.", meta: "Cookbook" },
  { icon: PlayCircle, title: "Video tutorials", body: "Watch teams build real apps end to end.", meta: "Watch" },
  { icon: Code2, title: "Open templates", body: "Starter repos for Next.js, FastAPI, and Go.", meta: "GitHub" },
  { icon: Activity, title: "Status & metrics", body: "Live latency, uptime, and incident history.", meta: "Status" },
]

const QUICKSTART = [
  { step: "01", title: "Install the CLI", code: "npm i -g @forge/cli" },
  { step: "02", title: "Authenticate", code: "forge login" },
  { step: "03", title: "Ship it", code: "forge deploy --prod" },
]

const STATUS = [
  { label: "API", value: "Operational", up: "99.99%" },
  { label: "Edge network", value: "Operational", up: "99.98%" },
  { label: "Dashboard", value: "Operational", up: "99.99%" },
  { label: "Webhooks", value: "Operational", up: "99.97%" },
]

const COMMUNITY = [
  { icon: Github, title: "GitHub", body: "24.1k stars", cta: "Star the repo" },
  { icon: MessageSquare, title: "Discord", body: "9,400 developers", cta: "Join the chat" },
  { icon: BookOpen, title: "Changelog", body: "Shipped weekly", cta: "Read updates" },
]

export default function DevelopersPage() {
  const [lang, setLang] = React.useState("node")
  const [copied, setCopied] = React.useState(false)

  const onCopy = () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Terminal className="h-4 w-4" />
              </span>
              <span className="font-mono text-sm">forge.app</span>
            </a>
            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
              {NAV.map((item) => (
                <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" className="gap-1.5 font-mono">
              Get API key
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 font-mono text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                v3.2 — typed everywhere
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                The deploy API built for developers
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                One command from commit to global edge. First-class SDKs, signed webhooks, and preview
                environments for every pull request.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2 font-mono">
                  Start building
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Read the docs
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <span className="text-primary">$</span>
                <span>npm i -g @forge/cli</span>
                <button
                  type="button"
                  aria-label="Copy install command"
                  onClick={onCopy}
                  className="ml-1 rounded p-1 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <Card className="overflow-hidden border-border/80 bg-muted/30 shadow-sm">
              <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">deploy.ts</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground/90">
                <code>{SNIPPETS.node}</code>
              </pre>
            </Card>
          </div>
        </section>

        {/* Status strip */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2 font-mono text-sm font-medium">
              <Activity className="h-4 w-4 text-primary" />
              All systems operational
            </div>
            <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2">
              {STATUS.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-foreground">{s.label}</span>
                  <span className="font-mono text-xs">{s.up}</span>
                </div>
              ))}
            </div>
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              status page
            </a>
          </div>
        </section>

        {/* SDK / language tabs */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Speak your language</h2>
              <p className="mt-3 text-muted-foreground">
                Official, fully typed SDKs that feel native in every stack. Same primitives, idiomatic everywhere.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg border bg-muted/30">
              <div className="flex items-center gap-1 border-b bg-muted/50 px-2" role="tablist" aria-label="SDK languages">
                {LANGS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    role="tab"
                    aria-selected={lang === l.id}
                    onClick={() => setLang(l.id)}
                    className={cn(
                      "relative px-4 py-3 font-mono text-sm transition-colors",
                      lang === l.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {l.label}
                    {lang === l.id && (
                      <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-foreground/90">
                <code>{SNIPPETS[lang]}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* API feature cards */}
        <section className="border-b bg-muted/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 font-mono text-xs">
                Platform
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">Primitives, not boilerplate</h2>
              <p className="mt-3 text-muted-foreground">
                Every layer of the platform exposed through a clean, predictable API surface.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <Card key={f.title} className="border-border/80 transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <f.icon className="h-4.5 w-4.5" />
                    </div>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{f.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quickstart */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Up and running in 60 seconds</h2>
                <p className="mt-3 text-muted-foreground">
                  No YAML to memorize. Install, log in, and deploy — the CLI infers the rest from your repo.
                </p>
                <Button variant="outline" className="mt-6 gap-2">
                  <Terminal className="h-4 w-4" />
                  Full quickstart guide
                </Button>
              </div>
              <div className="space-y-3">
                {QUICKSTART.map((q) => (
                  <div
                    key={q.step}
                    className="flex items-center gap-4 rounded-lg border bg-muted/30 p-4"
                  >
                    <span className="font-mono text-sm font-semibold text-primary">{q.step}</span>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{q.title}</p>
                      <code className="font-mono text-sm text-muted-foreground">{q.code}</code>
                    </div>
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Docs / resources grid */}
        <section className="border-b bg-muted/20">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight">Docs & resources</h2>
                <p className="mt-3 text-muted-foreground">Everything you need to go from zero to production.</p>
              </div>
              <a href="#" className="text-sm font-medium text-primary hover:underline">
                Browse all docs
              </a>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RESOURCES.map((r) => (
                <a
                  key={r.title}
                  href="#"
                  className="group flex flex-col rounded-lg border bg-card p-5 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-foreground">
                      <r.icon className="h-4.5 w-4.5" />
                    </div>
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wide">
                      {r.meta}
                    </Badge>
                  </div>
                  <h3 className="mt-4 font-medium">{r.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{r.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Built in the open</h2>
              <p className="mt-3 text-muted-foreground">
                Join thousands of developers shipping on Forge every day.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
              {COMMUNITY.map((c) => (
                <Card key={c.title} className="text-center">
                  <CardContent className="flex flex-col items-center gap-3 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-sm text-muted-foreground">{c.body}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1.5">
                      {c.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-14 text-center sm:px-12">
              <div className="absolute inset-0 bg-primary/5" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your next deploy is one command away</h2>
                <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                  Free for hobby projects. No credit card. Scale when you are ready.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button size="lg" className="gap-2 font-mono">
                    Get your API key
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <Terminal className="h-4 w-4" />
            forge.app — © 2026
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground" aria-label="Footer">
            <a href="#" className="hover:text-foreground">Docs</a>
            <a href="#" className="hover:text-foreground">Status</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
