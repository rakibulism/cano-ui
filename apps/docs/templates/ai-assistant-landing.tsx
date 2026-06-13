"use client"
import * as React from "react"
import {
  Sparkles,
  Download,
  Apple,
  Smartphone,
  PenLine,
  CalendarCheck,
  Search,
  Code2,
  Shield,
  Lock,
  EyeOff,
  Zap,
  ArrowRight,
  Check,
  Star,
  Send,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV = ["Features", "Privacy", "Pricing", "FAQ"]

type CapKey = "write" | "plan" | "research" | "code"

const CAPABILITIES: {
  key: CapKey
  label: string
  icon: React.ComponentType<{ className?: string }>
  prompt: string
  reply: string[]
}[] = [
  {
    key: "write",
    label: "Write",
    icon: PenLine,
    prompt: "Draft a warm launch email for our new app.",
    reply: [
      "Subject: Meet Aria - your calmer day starts now",
      "Hi there, we built Aria to take the busywork off your plate...",
      "Tone: friendly. Length: 120 words. Want a punchier subject line?",
    ],
  },
  {
    key: "plan",
    label: "Plan",
    icon: CalendarCheck,
    prompt: "Plan my week around two deep-work blocks.",
    reply: [
      "Mon-Fri: 9:00-11:00 protected deep work, notifications paused.",
      "Tue and Thu afternoons reserved for meetings and reviews.",
      "Synced to your calendar - shall I add buffer time between calls?",
    ],
  },
  {
    key: "research",
    label: "Research",
    icon: Search,
    prompt: "Summarize the latest on solid-state batteries.",
    reply: [
      "Three credible sources gathered and cross-checked for you.",
      "Key takeaway: energy density up, cost still the main blocker.",
      "Citations attached. Want a one-paragraph executive summary?",
    ],
  },
  {
    key: "code",
    label: "Code",
    icon: Code2,
    prompt: "Write a debounce hook in TypeScript.",
    reply: [
      "Created useDebounce<T> with a configurable delay.",
      "Cleans up its timer on unmount - no stale updates.",
      "Added a usage snippet and inline types. Want tests too?",
    ],
  },
]

const FEATURES = [
  {
    icon: Zap,
    title: "Instant answers",
    body: "Ask anything and get grounded, well-sourced replies in under a second.",
  },
  {
    icon: CalendarCheck,
    title: "Connected to your day",
    body: "Calendar, mail, and notes in one place so Aria acts with full context.",
  },
  {
    icon: PenLine,
    title: "Sounds like you",
    body: "Learns your tone over time and drafts in a voice that feels native.",
  },
  {
    icon: Shield,
    title: "On-device first",
    body: "Sensitive prompts are processed locally whenever your device allows.",
  },
  {
    icon: Search,
    title: "Deep research",
    body: "Reads across the web, dedupes claims, and cites every source it uses.",
  },
  {
    icon: Code2,
    title: "Builder ready",
    body: "Generate, refactor, and explain code with full project awareness.",
  },
]

const STATS = [
  { value: "2.4M", label: "Daily conversations" },
  { value: "0.4s", label: "Median response time" },
  { value: "98%", label: "Tasks resolved first try" },
  { value: "60+", label: "Languages supported" },
]

const TESTIMONIALS = [
  {
    quote:
      "Aria replaced three separate apps for me. It plans my week and drafts my replies before I even ask.",
    name: "Maya Chen",
    role: "Product designer",
    initials: "MC",
  },
  {
    quote:
      "The research mode is unreal. Real citations, no hallucinated links. It is now my first stop for anything.",
    name: "Daniel Okoro",
    role: "Founder, Lumen Labs",
    initials: "DO",
  },
  {
    quote:
      "I love that the private prompts stay on my phone. Finally an assistant I trust with the sensitive stuff.",
    name: "Sofia Rinaldi",
    role: "Independent consultant",
    initials: "SR",
  },
]

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    tagline: "For getting started",
    features: ["25 chats per day", "Write and plan modes", "On-device privacy", "Community support"],
    cta: "Download free",
    highlighted: false,
  },
  {
    name: "Pro",
    monthly: 12,
    annual: 9,
    tagline: "For everyday power users",
    features: [
      "Unlimited chats",
      "All four capabilities",
      "Deep research with citations",
      "Calendar and mail sync",
      "Priority responses",
    ],
    cta: "Start Pro trial",
    highlighted: true,
  },
  {
    name: "Team",
    monthly: 22,
    annual: 18,
    tagline: "For small teams",
    features: [
      "Everything in Pro",
      "Shared workspaces",
      "Admin and usage controls",
      "SSO and audit logs",
      "Dedicated support",
    ],
    cta: "Talk to sales",
    highlighted: false,
  },
]

const FAQS = [
  {
    q: "Is my data used to train models?",
    a: "No. Your conversations are never used for training. Private prompts are processed on-device whenever your hardware supports it.",
  },
  {
    q: "Which platforms is Aria available on?",
    a: "Aria runs on iOS, Android, macOS, and the web, and your context syncs securely across every device.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Plans are billed monthly or annually and you can cancel or switch tiers at any time from settings.",
  },
  {
    q: "Does Aria cite its sources?",
    a: "Research mode attaches verifiable citations to every claim so you can check the original source in one tap.",
  },
]

export default function AiAssistantLanding() {
  const [active, setActive] = React.useState<CapKey>("write")
  const [annual, setAnnual] = React.useState(true)

  const current = CAPABILITIES.find((c) => c.key === active) ?? CAPABILITIES[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Aria
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Get Aria
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="relative">
              <Badge variant="secondary" className="mb-5 gap-1">
                <Sparkles className="h-3 w-3" />
                Now with on-device research
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Your calmer, smarter day, in one assistant.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Aria writes, plans, researches, and codes alongside you - private by
                default and aware of your whole context.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Apple className="h-5 w-5" />
                  App Store
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Smartphone className="h-5 w-5" />
                  Google Play
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                4.9 from 50k+ reviews
              </div>
            </div>

            {/* Chat mockup */}
            <div className="relative">
              <Card className="mx-auto max-w-md overflow-hidden shadow-lg">
                <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium">Aria</span>
                  <Badge variant="outline" className="ml-auto gap-1 text-xs">
                    <Lock className="h-3 w-3" />
                    Private
                  </Badge>
                </div>
                <CardContent className="space-y-4 p-4">
                  <div className="flex justify-end">
                    <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-sm text-primary-foreground">
                      Plan my week around two deep-work blocks.
                    </p>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm">
                      <p>Done. I protected 9-11am for focus and paused alerts.</p>
                      <p className="text-muted-foreground">
                        Meetings moved to Tue and Thu afternoons. Synced to your calendar.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground">
                    <span>Ask Aria anything...</span>
                    <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Send className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Capabilities (interactive) */}
        <section id="features" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                One assistant, four superpowers
              </h2>
              <p className="mt-3 text-muted-foreground">
                Switch modes and watch Aria adapt. Same chat, very different skills.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {CAPABILITIES.map((cap) => {
                const Icon = cap.icon
                const isActive = cap.key === active
                return (
                  <button
                    key={cap.key}
                    type="button"
                    onClick={() => setActive(cap.key)}
                    aria-pressed={isActive}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {cap.label}
                  </button>
                )
              })}
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl items-center gap-8 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4 gap-1">
                  <current.icon className="h-3 w-3" />
                  {current.label} mode
                </Badge>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {current.prompt}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Aria tailors every response to the task at hand - drafting, scheduling,
                  digging through sources, or shipping code.
                </p>
              </div>
              <Card className="overflow-hidden">
                <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3 text-sm font-medium">
                  <current.icon className="h-4 w-4 text-primary" />
                  {current.label}
                </div>
                <CardContent className="space-y-3 p-4">
                  <div className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-sm text-primary-foreground">
                      {current.prompt}
                    </p>
                  </div>
                  {current.reply.map((line, i) => (
                    <div key={i} className="flex justify-start">
                      <p className="max-w-[90%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2 text-sm">
                        {line}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for the way you actually work
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <Card key={f.title} className="h-full">
                    <CardContent className="p-6">
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Privacy note */}
        <section id="privacy" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <Card className="overflow-hidden border-primary/30 bg-primary/5">
              <CardContent className="grid items-center gap-8 p-8 lg:grid-cols-[1.4fr_1fr] lg:p-12">
                <div>
                  <Badge variant="outline" className="mb-4 gap-1 border-primary/40 text-primary">
                    <Shield className="h-3 w-3" />
                    Privacy by design
                  </Badge>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Your prompts are yours. Full stop.
                  </h2>
                  <p className="mt-3 max-w-lg text-muted-foreground">
                    Sensitive conversations run on-device whenever possible, nothing is
                    sold, and your chats are never used to train models. You can wipe your
                    history in a single tap.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: Lock, text: "End-to-end encrypted sync" },
                    { icon: EyeOff, text: "Zero training on your data" },
                    { icon: Shield, text: "On-device processing first" },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.text} className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/80">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Loved by people who get a lot done
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed">{t.quote}</p>
                    <div className="mt-6 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {t.initials}
                      </span>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Simple, honest pricing
              </h2>
              <p className="mt-3 text-muted-foreground">
                Start free. Upgrade when Aria becomes indispensable.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-card px-4 py-2 text-sm">
                <span className={cn(!annual && "font-medium")}>Monthly</span>
                <Switch
                  checked={annual}
                  onCheckedChange={setAnnual}
                  aria-label="Toggle annual pricing"
                />
                <span className={cn(annual && "font-medium")}>Annual</span>
                <Badge variant="secondary" className="ml-1">Save 25%</Badge>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => {
                const price = annual ? plan.annual : plan.monthly
                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      "relative flex flex-col",
                      plan.highlighted && "border-primary shadow-lg"
                    )}
                  >
                    {plan.highlighted && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                        Most popular
                      </Badge>
                    )}
                    <CardContent className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                      <div className="mt-5 flex items-baseline gap-1">
                        <span className="text-4xl font-semibold tracking-tight">
                          ${price}
                        </span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                      {annual && price > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          billed annually
                        </p>
                      )}
                      <ul className="mt-6 flex-1 space-y-3">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{feat}</span>
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

        {/* FAQ */}
        <section id="faq" className="border-b">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Questions, answered
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <Card className="overflow-hidden border-primary/30 bg-primary text-primary-foreground">
              <CardContent className="flex flex-col items-center gap-6 p-10 text-center lg:p-16">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <Sparkles className="h-6 w-6" />
                </span>
                <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  Meet the assistant that actually gets your day
                </h2>
                <p className="max-w-md text-primary-foreground/80">
                  Free to start. Private by default. Ready on every device you own.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Download className="h-5 w-5" />
                    Download Aria
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    See it in action
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" />
            </span>
            Aria
          </div>
          <p className="text-sm text-muted-foreground">
            Private AI for everyone. Built with care.
          </p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-foreground">Privacy</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
