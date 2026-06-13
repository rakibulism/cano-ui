"use client"
import * as React from "react"
import {
  Shield,
  Zap,
  Globe2,
  Lock,
  Power,
  Eye,
  Server,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
  Tv,
  Check,
  X,
  ChevronRight,
  Star,
  ArrowRight,
  Wifi,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const stats = [
  { value: "6,400+", label: "Servers" },
  { value: "94", label: "Countries" },
  { value: "10 Gbps", label: "Port speed" },
  { value: "0", label: "Logs kept" },
]

const features = [
  {
    icon: Zap,
    title: "Blazing speed",
    desc: "WireGuard-powered tunnels with 10 Gbps ports keep streaming and gaming lag-free.",
  },
  {
    icon: Eye,
    title: "Strict no-logs",
    desc: "We never record your activity, DNS queries, or IP. Independently audited twice a year.",
  },
  {
    icon: Globe2,
    title: "Global servers",
    desc: "Hop across 94 countries to unblock content and find the fastest route anywhere.",
  },
  {
    icon: Power,
    title: "Kill switch",
    desc: "If the tunnel drops, traffic stops instantly. No accidental leaks, ever.",
  },
]

const steps = [
  {
    n: "01",
    title: "Download the app",
    desc: "One click installs on every device you own. No configuration required.",
  },
  {
    n: "02",
    title: "Pick a location",
    desc: "Choose from 6,400+ servers or let Quick Connect find the fastest one.",
  },
  {
    n: "03",
    title: "Browse privately",
    desc: "Your traffic is encrypted end to end. Your IP disappears from the web.",
  },
]

const platforms = [
  { icon: Monitor, name: "Windows" },
  { icon: Laptop, name: "macOS" },
  { icon: Smartphone, name: "iOS" },
  { icon: Tablet, name: "Android" },
  { icon: Tv, name: "Smart TV" },
  { icon: Wifi, name: "Routers" },
]

const comparison = [
  { feature: "AES-256 encryption", us: true, free: true, isp: false },
  { feature: "No activity logs", us: true, free: false, isp: false },
  { feature: "Unlimited bandwidth", us: true, free: false, isp: true },
  { feature: "Kill switch", us: true, free: false, isp: false },
  { feature: "Servers in 94 countries", us: true, free: false, isp: false },
  { feature: "Independent audits", us: true, free: false, isp: false },
]

const tiers = [
  {
    name: "Monthly",
    monthly: 11.99,
    yearly: 11.99,
    note: "Billed every month",
    featured: false,
    perks: ["5 devices", "All 6,400+ servers", "24/7 support"],
  },
  {
    name: "Plus",
    monthly: 9.99,
    yearly: 4.99,
    note: "Billed annually",
    featured: true,
    perks: ["10 devices", "All 6,400+ servers", "Ad & malware blocker", "Priority support"],
  },
  {
    name: "Pro",
    monthly: 12.99,
    yearly: 6.99,
    note: "Billed annually",
    featured: false,
    perks: ["Unlimited devices", "Dedicated IP", "Ad & malware blocker", "Priority support"],
  },
]

const testimonials = [
  {
    quote:
      "Switched the whole team over in an afternoon. Speeds are indistinguishable from no VPN at all.",
    name: "Dana Whitfield",
    role: "Security Lead, Northbeam",
  },
  {
    quote:
      "The audited no-logs policy is what sold me. Finally a privacy product that proves its claims.",
    name: "Marcus Lee",
    role: "Freelance journalist",
  },
  {
    quote:
      "Connects in under a second and the kill switch has saved me on flaky hotel Wi-Fi more than once.",
    name: "Priya Nair",
    role: "Remote consultant",
  },
]

const faqs = [
  {
    q: "Does VeilNet keep any logs?",
    a: "No. We operate a strict no-logs policy covering activity, connection timestamps, and IP addresses. Independent auditors verify this twice every year.",
  },
  {
    q: "How many devices can I protect?",
    a: "Depending on your plan you can connect 5, 10, or unlimited devices simultaneously under a single account.",
  },
  {
    q: "Will it slow down my connection?",
    a: "Our WireGuard-based protocol and 10 Gbps ports mean most users see no perceptible difference in speed.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes. Every plan is backed by a 30-day money-back guarantee, no questions asked.",
  },
]

export default function VpnLanding() {
  const [annual, setAnnual] = React.useState(true)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </span>
            VeilNet
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Get VeilNet</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Lock className="h-3 w-3" /> Audited no-logs policy
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your internet, <span className="text-primary">invisible.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Military-grade encryption, lightning-fast servers, and a kill switch that never lets your data leak. Privacy on every device.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Start protecting now <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">See the apps</Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                30-day money-back guarantee. No questions asked.
              </p>
            </div>

            {/* Connect mockup */}
            <div className="relative">
              <Card className="mx-auto max-w-sm border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                    <Badge className="gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" /> Connected
                    </Badge>
                  </div>
                  <div className="my-6 flex flex-col items-center">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Power className="h-8 w-8" />
                      </div>
                    </div>
                    <p className="mt-4 font-semibold">Secure tunnel active</p>
                    <p className="text-sm text-muted-foreground">Your IP is hidden</p>
                  </div>
                  <Separator />
                  <div className="mt-4 flex items-center justify-between rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-background">
                        <Globe2 className="h-4 w-4 text-primary" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">Zurich, CH</p>
                        <p className="text-xs text-muted-foreground">Server #042 - 12ms</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Activity className="h-3 w-3" /> Download
                      </div>
                      <p className="mt-1 font-semibold tabular-nums">328 Mbps</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Activity className="h-3 w-3" /> Upload
                      </div>
                      <p className="mt-1 font-semibold tabular-nums">214 Mbps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stat band */}
          <div className="border-t bg-background">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-r px-6 py-7 text-center last:border-r-0 sm:border-b-0">
                  <p className="text-2xl font-bold tabular-nums sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy without compromise</h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to disappear online, built into one effortless app.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="border-border/60 transition-colors hover:border-primary/40">
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">How it works</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Protected in three steps</h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="relative">
                  <span className="text-5xl font-bold text-primary/20 tabular-nums">{s.n}</span>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms strip */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            One account, every device
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-medium"
              >
                <p.icon className="h-4 w-4 text-muted-foreground" />
                {p.name}
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why VeilNet wins</h2>
              <p className="mt-4 text-muted-foreground">See how real protection stacks up.</p>
            </div>
            <Card className="mt-10 overflow-hidden">
              <div className="grid grid-cols-4 border-b bg-card text-sm font-semibold">
                <div className="p-4 text-muted-foreground">Capability</div>
                <div className="p-4 text-center text-primary">VeilNet</div>
                <div className="p-4 text-center text-muted-foreground">Free VPN</div>
                <div className="p-4 text-center text-muted-foreground">No VPN</div>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.feature}
                  className={cn(
                    "grid grid-cols-4 items-center text-sm",
                    i !== comparison.length - 1 && "border-b"
                  )}
                >
                  <div className="p-4 font-medium">{row.feature}</div>
                  <div className="flex justify-center p-4">
                    {row.us ? (
                      <Check className="h-5 w-5 text-primary" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                  <div className="flex justify-center p-4">
                    {row.free ? (
                      <Check className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                  <div className="flex justify-center p-4">
                    {row.isp ? (
                      <Check className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, honest pricing</h2>
            <p className="mt-4 text-muted-foreground">
              Save up to 58% when you choose an annual plan.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2">
              <span className={cn("text-sm font-medium", annual ? "text-muted-foreground" : "text-foreground")}>
                Monthly
              </span>
              <Switch checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
              <span className={cn("text-sm font-medium", annual ? "text-foreground" : "text-muted-foreground")}>
                Annual
              </span>
              <Badge variant="secondary" className="ml-1">Save 58%</Badge>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {tiers.map((t) => {
              const price = annual ? t.yearly : t.monthly
              return (
                <Card
                  key={t.name}
                  className={cn(
                    "relative flex flex-col",
                    t.featured ? "border-primary shadow-lg ring-1 ring-primary" : "border-border/60"
                  )}
                >
                  {t.featured && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col p-6">
                    <h3 className="font-semibold">{t.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tabular-nums">${price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {annual ? "Billed annually" : t.note}
                    </p>
                    <Separator className="my-6" />
                    <ul className="space-y-3 text-sm">
                      {t.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2.5">
                          <Check className="h-4 w-4 shrink-0 text-primary" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-6 w-full"
                      variant={t.featured ? "default" : "outline"}
                    >
                      Choose {t.name}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by 2 million users</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="border-border/60">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed">{t.quote}</p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {t.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={"item-" + i}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Server className="h-6 w-6" />
              </span>
              <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                Take back your privacy today
              </h2>
              <p className="max-w-md text-muted-foreground">
                Join 2 million people who browse, stream, and work without leaving a trace.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Get VeilNet <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">Compare plans</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-3.5 w-3.5" />
            </span>
            VeilNet
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Transparency report</a>
            <a href="#" className="transition-colors hover:text-foreground">Status</a>
          </nav>
          <p>© 2026 VeilNet, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
