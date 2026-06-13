"use client"

import * as React from "react"
import {
  Terminal,
  Zap,
  Lock,
  Globe,
  Webhook,
  GitBranch,
  ArrowRight,
  Check,
  Copy,
  BookOpen,
  Cpu,
  Activity,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const NAV = ["Products", "Docs", "Pricing", "Changelog", "Blog"]

const SNIPPETS: Record<string, string> = {
  curl: `curl https://api.lumen.dev/v1/messages \\
  -H "Authorization: Bearer sk_live_•••" \\
  -H "Content-Type: application/json" \\
  -d '{
    "channel": "sms",
    "to": "+1 415 555 0142",
    "body": "Your code is 884213"
  }'`,
  node: `import { Lumen } from "@lumen/sdk"

const lumen = new Lumen(process.env.LUMEN_KEY)

await lumen.messages.create({
  channel: "sms",
  to: "+1 415 555 0142",
  body: "Your code is 884213",
})`,
  python: `from lumen import Lumen

lumen = Lumen(api_key=os.environ["LUMEN_KEY"])

lumen.messages.create(
    channel="sms",
    to="+1 415 555 0142",
    body="Your code is 884213",
)`,
}

const QUICKSTART = [
  {
    step: "01",
    title: "Grab an API key",
    body: "Create a project in the dashboard and generate a test key in seconds. No card required.",
  },
  {
    step: "02",
    title: "Install the SDK",
    body: "Typed SDKs for Node, Python, Go, and Ruby. Or hit the REST endpoints directly.",
  },
  {
    step: "03",
    title: "Send your first request",
    body: "Fire a request, watch it land in the live logs, and ship to production with one flag.",
  },
]

const FEATURES = [
  { icon: Zap, title: "Sub-50ms edge", body: "Requests routed to the nearest of 38 regions with automatic failover." },
  { icon: Lock, title: "Scoped keys", body: "Granular, revocable keys with per-key rate limits and audit trails." },
  { icon: Webhook, title: "Signed webhooks", body: "Verified delivery with retries, replay, and HMAC signatures out of the box." },
  { icon: Activity, title: "Live logs", body: "Inspect every request and response payload in real time as you build." },
  { icon: GitBranch, title: "Idempotency", body: "Safe retries with idempotency keys so you never double-charge a customer." },
  { icon: ShieldCheck, title: "SOC 2 Type II", body: "Encryption in transit and at rest, with compliance you can hand to legal." },
]

const ENDPOINTS = [
  { method: "POST", path: "/v1/messages", desc: "Send a message across any channel" },
  { method: "GET", path: "/v1/messages/:id", desc: "Retrieve delivery status and events" },
  { method: "POST", path: "/v1/numbers", desc: "Provision a programmable number" },
  { method: "GET", path: "/v1/logs", desc: "Stream structured request logs" },
]

const SDKS = ["TypeScript", "Python", "Go", "Ruby", "PHP", "Rust", "Java", "Elixir"]

const METHOD_STYLES: Record<string, string> = {
  POST: "bg-primary/10 text-primary",
  GET: "bg-accent text-foreground",
}

export default function ApiPlatformLanding() {
  const [copied, setCopied] = React.useState(false)
  const [lang, setLang] = React.useState<keyof typeof SNIPPETS>("curl")

  const handleCopy = () => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Lumen</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Get API key
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                v2 API now generally available
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                The messaging API built for developers who ship.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                One endpoint for SMS, WhatsApp, email, and push. Typed SDKs, signed webhooks, and edge delivery in 38
                regions.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Start building free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <BookOpen className="h-4 w-4" />
                  Read the docs
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" /> 10k free requests / mo
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" /> No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" /> 99.99% uptime
                </span>
              </div>
            </div>

            {/* Code block */}
            <Card className="overflow-hidden border bg-card p-0 shadow-sm">
              <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                </div>
                <div className="flex items-center gap-1">
                  {(Object.keys(SNIPPETS) as (keyof typeof SNIPPETS)[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setLang(key)}
                      className={cn(
                        "rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                        lang === key
                          ? "bg-background text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {key === "node" ? "Node" : key}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={handleCopy}
                  aria-label="Copy code snippet"
                  className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md border bg-background/80 px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <pre className="overflow-x-auto px-4 py-5 text-sm leading-relaxed text-foreground">
                  <code>{SNIPPETS[lang]}</code>
                </pre>
              </div>
            </Card>
          </div>
        </section>

        {/* Logos / trust */}
        <section className="border-b">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Powering messaging at fast-moving teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-semibold text-muted-foreground">
              {["Vantage", "Northwind", "Orbital", "Hearth", "Fathom", "Quartz"].map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Quickstart */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 max-w-xl space-y-3">
              <Badge variant="outline">Quickstart</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">Live in three steps.</h2>
              <p className="text-muted-foreground">
                From zero to your first delivered message in under five minutes.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {QUICKSTART.map((s) => (
                <Card key={s.step} className="bg-card">
                  <CardHeader>
                    <span className="text-sm font-mono font-semibold text-primary">{s.step}</span>
                    <CardTitle className="mt-2 text-lg">{s.title}</CardTitle>
                    <CardDescription>{s.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 max-w-xl space-y-3">
              <Badge variant="outline">Platform</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">Everything the docs promise, in production.</h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-card p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Endpoints + SDKs */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge variant="outline">API reference</Badge>
                <h2 className="text-3xl font-semibold tracking-tight">A REST API you can read.</h2>
                <p className="text-muted-foreground">
                  Predictable resource-oriented URLs, JSON everywhere, and standard HTTP verbs.
                </p>
              </div>
              <Card className="overflow-hidden p-0">
                <ul className="divide-y">
                  {ENDPOINTS.map((e) => (
                    <li key={e.path} className="flex items-center gap-3 px-4 py-3.5">
                      <span
                        className={cn(
                          "w-12 shrink-0 rounded px-1.5 py-0.5 text-center text-xs font-semibold",
                          METHOD_STYLES[e.method],
                        )}
                      >
                        {e.method}
                      </span>
                      <code className="font-mono text-sm text-foreground">{e.path}</code>
                      <span className="ml-auto hidden text-sm text-muted-foreground sm:block">{e.desc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Badge variant="outline">SDKs</Badge>
                <h2 className="text-3xl font-semibold tracking-tight">Use your language.</h2>
                <p className="text-muted-foreground">
                  First-class, fully typed SDKs maintained in lockstep with the API.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {SDKS.map((sdk) => (
                  <span
                    key={sdk}
                    className="flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium"
                  >
                    <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
                    {sdk}
                  </span>
                ))}
              </div>
              <Tabs defaultValue="install" className="w-full">
                <TabsList>
                  <TabsTrigger value="install">Install</TabsTrigger>
                  <TabsTrigger value="import">Import</TabsTrigger>
                </TabsList>
                <TabsContent value="install">
                  <pre className="overflow-x-auto rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                    <code>npm install @lumen/sdk</code>
                  </pre>
                </TabsContent>
                <TabsContent value="import">
                  <pre className="overflow-x-auto rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                    <code>{`import { Lumen } from "@lumen/sdk"`}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-xl space-y-3">
                <Badge variant="outline">Pricing</Badge>
                <h2 className="text-3xl font-semibold tracking-tight">Usage-based. Pay for what you send.</h2>
                <p className="text-muted-foreground">
                  No seats, no minimums. Volume discounts kick in automatically as you scale.
                </p>
              </div>
              <Button variant="outline">
                See full pricing
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { tier: "Developer", price: "$0", unit: "/ mo", note: "10k requests included", highlight: false },
                { tier: "Scale", price: "$0.004", unit: "/ request", note: "Then metered, billed daily", highlight: true },
                { tier: "Enterprise", price: "Custom", unit: "", note: "Committed volume + SLA", highlight: false },
              ].map((p) => (
                <Card
                  key={p.tier}
                  className={cn("bg-card", p.highlight && "border-primary ring-1 ring-primary")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{p.tier}</CardTitle>
                      {p.highlight && <Badge>Popular</Badge>}
                    </div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
                      <span className="text-sm text-muted-foreground">{p.unit}</span>
                    </div>
                    <CardDescription className="mt-1">{p.note}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant={p.highlight ? "default" : "outline"} className="w-full">
                      {p.tier === "Enterprise" ? "Contact sales" : "Get started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Docs CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <Card className="overflow-hidden border bg-card">
              <div className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold tracking-tight">Read the docs. Ship today.</h2>
                  <p className="mx-auto max-w-md text-muted-foreground">
                    Guides, full API reference, and copy-paste recipes for every framework.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button size="lg">
                    <BookOpen className="h-4 w-4" />
                    Explore docs
                  </Button>
                  <Button size="lg" variant="outline">
                    Get an API key
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Terminal className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold">Lumen</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
              <a href="#" className="hover:text-foreground">Status</a>
              <a href="#" className="hover:text-foreground">Security</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
            </nav>
            <span className="text-sm text-muted-foreground">© 2026 Lumen, Inc.</span>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            Built for developers. Edge delivery in 38 regions.
          </p>
        </div>
      </footer>
    </div>
  )
}
