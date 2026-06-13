"use client"

import * as React from "react"
import {
  Notebook,
  CheckSquare,
  Calendar,
  Sparkles,
  Zap,
  Lock,
  Cloud,
  Search,
  Command,
  Star,
  Check,
  ChevronDown,
  Apple,
  Monitor,
  Smartphone,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const FEATURES = {
  notes: {
    label: "Notes",
    icon: Notebook,
    title: "A canvas for every thought",
    blurb:
      "Rich text, embeds, and instant search. Capture an idea in a keystroke and find it again in milliseconds.",
    rows: [
      { title: "Q3 product roadmap", meta: "Edited 2h ago", tag: "Planning" },
      { title: "Interview notes — design lead", meta: "Edited yesterday", tag: "Hiring" },
      { title: "Reading list 2026", meta: "Edited Mon", tag: "Personal" },
      { title: "Architecture sketch", meta: "Edited Mon", tag: "Eng" },
    ],
  },
  tasks: {
    label: "Tasks",
    icon: CheckSquare,
    title: "Tasks that move with you",
    blurb:
      "Turn any line into a task. Group by project, sort by priority, and watch your day come together automatically.",
    rows: [
      { title: "Ship onboarding revamp", meta: "Due today", tag: "High", done: true },
      { title: "Review pull request #482", meta: "Due today", tag: "Med" },
      { title: "Draft launch announcement", meta: "Tomorrow", tag: "Med" },
      { title: "Sync with marketing", meta: "Friday", tag: "Low" },
    ],
  },
  calendar: {
    label: "Calendar",
    icon: Calendar,
    title: "Your week, in focus",
    blurb:
      "Notes and tasks flow straight onto your calendar. Time-block deep work and never lose context between meetings.",
    rows: [
      { title: "Standup", meta: "9:00 — 9:15", tag: "Daily" },
      { title: "Design review", meta: "11:00 — 12:00", tag: "Focus" },
      { title: "Lunch + walk", meta: "12:30 — 1:30", tag: "Break" },
      { title: "Roadmap planning", meta: "3:00 — 4:30", tag: "Deep work" },
    ],
  },
} as const

type FeatureKey = keyof typeof FEATURES

const CARDS = [
  { icon: Zap, title: "Built for speed", body: "Sub-50ms search and keyboard-first navigation across your whole workspace." },
  { icon: Cloud, title: "Sync everywhere", body: "Pick up exactly where you left off on Mac, web, and mobile — instantly." },
  { icon: Lock, title: "End-to-end private", body: "Your notes are encrypted at rest. Only you hold the keys." },
  { icon: Search, title: "Find anything", body: "Full-text search that understands context, tags, and backlinks." },
  { icon: Sparkles, title: "Smart capture", body: "Paste a link, photo, or voice memo — it organizes itself." },
  { icon: Command, title: "Command palette", body: "Every action one shortcut away. Never touch the mouse." },
]

const SHORTCUTS = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["⌘", "N"], label: "New note" },
  { keys: ["⌘", "Enter"], label: "Complete task" },
  { keys: ["⌘", "/"], label: "Quick search" },
  { keys: ["⌘", "B"], label: "Toggle sidebar" },
  { keys: ["⌘", "D"], label: "Schedule for today" },
]

const TESTIMONIALS = [
  { quote: "I replaced four apps with Plume. My whole team's brain lives here now.", name: "Mara Velasquez", role: "Founder, Tidepool" },
  { quote: "The speed is unreal. Search is instant and the shortcuts are addictive.", name: "Devon Okoro", role: "Staff Engineer, Northwind" },
  { quote: "Finally a notes app that respects my time and my privacy.", name: "Sana Iqbal", role: "Product Lead, Lumen" },
]

const PLANS = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    blurb: "For getting organized.",
    features: ["Unlimited notes", "3 task boards", "Mobile + web apps", "7-day version history"],
    highlight: false,
  },
  {
    name: "Pro",
    monthly: 10,
    annual: 8,
    blurb: "For focused professionals.",
    features: ["Everything in Free", "Unlimited task boards", "Calendar sync", "AI smart capture", "Unlimited history"],
    highlight: true,
  },
  {
    name: "Team",
    monthly: 18,
    annual: 15,
    blurb: "For teams that ship.",
    features: ["Everything in Pro", "Shared workspaces", "Admin controls", "Priority support", "SSO + SCIM"],
    highlight: false,
  },
]

const FAQS = [
  { q: "Can I use Plume offline?", a: "Yes. Everything works offline and syncs automatically the moment you reconnect, with no conflicts." },
  { q: "How does the free plan work?", a: "Free forever — no credit card required. Upgrade to Pro whenever you need calendar sync or unlimited boards." },
  { q: "Is my data really private?", a: "Notes are encrypted at rest and in transit. On Pro you can enable end-to-end encryption so only you can read them." },
  { q: "Which platforms are supported?", a: "Native apps for macOS, iOS, and Android, plus a fast web app that runs in any modern browser." },
  { q: "Can I import from other apps?", a: "Import from Markdown, Notion, Evernote, and Apple Notes in a couple of clicks during onboarding." },
]

export default function ProductivityAppLanding() {
  const [feature, setFeature] = React.useState<FeatureKey>("notes")
  const [annual, setAnnual] = React.useState(true)

  const active = FEATURES[feature]
  const ActiveIcon = active.icon

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Notebook className="h-4 w-4" />
            </span>
            Plume
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#shortcuts" className="transition-colors hover:text-foreground">Shortcuts</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Download</Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Now with AI smart capture
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Your notes, tasks, and calendar — finally in one place.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Plume is the calm, keyboard-first workspace that keeps your thinking and your day perfectly in sync.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Apple className="h-4 w-4" /> Download for Mac
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Monitor className="h-4 w-4" /> Open web app
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {["A", "K", "M", "S"].map((l) => (
                    <span key={l} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                      {l}
                    </span>
                  ))}
                </div>
                <span>Loved by 40,000+ thinkers</span>
              </div>
            </div>

            {/* App mockup */}
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden="true" />
              <Card className="overflow-hidden p-0 shadow-xl">
                <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                  <div className="ml-3 flex items-center gap-2 rounded-md bg-background px-2.5 py-1 text-xs text-muted-foreground">
                    <Search className="h-3.5 w-3.5" /> Search Plume…
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="hidden flex-col gap-1 border-r bg-muted/20 p-3 text-sm sm:flex">
                    {[
                      { i: Notebook, t: "Notes" },
                      { i: CheckSquare, t: "Tasks" },
                      { i: Calendar, t: "Today" },
                      { i: Star, t: "Starred" },
                    ].map(({ i: Ic, t }, idx) => (
                      <span key={t} className={cn("flex items-center gap-2 rounded-md px-2.5 py-1.5", idx === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground")}>
                        <Ic className="h-4 w-4" /> {t}
                      </span>
                    ))}
                  </div>
                  <div className="col-span-3 space-y-3 p-4 sm:col-span-2">
                    <div className="h-2.5 w-1/2 rounded-full bg-muted" />
                    <div className="h-2 w-full rounded-full bg-muted/70" />
                    <div className="h-2 w-5/6 rounded-full bg-muted/70" />
                    <div className="mt-4 space-y-2">
                      {["Sketch onboarding flow", "Draft Q3 narrative", "Send investor update"].map((t, i) => (
                        <div key={t} className="flex items-center gap-2.5 rounded-lg border bg-background px-3 py-2 text-sm">
                          <span className={cn("flex h-4 w-4 items-center justify-center rounded border", i === 0 && "border-primary bg-primary text-primary-foreground")}>
                            {i === 0 && <Check className="h-3 w-3" />}
                          </span>
                          <span className={cn(i === 0 && "text-muted-foreground line-through")}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature tabs */}
        <section id="features" className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">One workspace, three superpowers</h2>
              <p className="mt-4 text-muted-foreground">
                Switch between notes, tasks, and your calendar without ever leaving your flow.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <div className="inline-flex gap-1 rounded-full border bg-background p-1">
                {(Object.keys(FEATURES) as FeatureKey[]).map((key) => {
                  const Ic = FEATURES[key].icon
                  const isActive = feature === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFeature(key)}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                      aria-pressed={isActive}
                    >
                      <Ic className="h-4 w-4" /> {FEATURES[key].label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight">{active.title}</h3>
                </div>
                <p className="mt-4 max-w-md text-muted-foreground">{active.blurb}</p>
                <Button variant="link" className="mt-3 gap-1 px-0">
                  Explore {active.label} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <Card className="overflow-hidden p-0">
                <div className="border-b bg-muted/30 px-4 py-3 text-sm font-medium">{active.label}</div>
                <div className="divide-y">
                  {active.rows.map((row) => (
                    <div key={row.title} className="flex items-center gap-3 px-4 py-3.5">
                      {feature === "tasks" ? (
                        <span className={cn("flex h-5 w-5 items-center justify-center rounded border", (row as { done?: boolean }).done && "border-primary bg-primary text-primary-foreground")}>
                          {(row as { done?: boolean }).done && <Check className="h-3.5 w-3.5" />}
                        </span>
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                          <ActiveIcon className="h-4 w-4 text-muted-foreground" />
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate text-sm font-medium", (row as { done?: boolean }).done && "text-muted-foreground line-through")}>{row.title}</p>
                        <p className="text-xs text-muted-foreground">{row.meta}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0">{row.tag}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature cards */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => (
              <Card key={c.title} className="transition-colors hover:border-primary/40">
                <CardContent className="pt-6">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Keyboard shortcuts highlight */}
        <section id="shortcuts" className="border-y bg-primary/5">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Command className="h-3.5 w-3.5" /> Keyboard-first
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for people who never want to touch a mouse
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Every action in Plume is a shortcut away. Master a handful and your workflow becomes muscle memory.
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Smartphone className="h-4 w-4" /> iOS</span>
                <span className="flex items-center gap-1.5"><Apple className="h-4 w-4" /> macOS</span>
                <span className="flex items-center gap-1.5"><Monitor className="h-4 w-4" /> Web</span>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {SHORTCUTS.map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="flex items-center gap-1">
                    {s.keys.map((k) => (
                      <kbd key={k} className="flex h-7 min-w-7 items-center justify-center rounded-md border bg-muted px-2 text-xs font-medium">
                        {k}
                      </kbd>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Loved by people who get things done</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">“{t.quote}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
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
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t bg-muted/20">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple, honest pricing</h2>
              <p className="mt-4 text-muted-foreground">Start free. Upgrade when you outgrow it.</p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border bg-background px-4 py-2">
                <Label htmlFor="billing" className={cn("text-sm", !annual && "text-foreground", annual && "text-muted-foreground")}>
                  Monthly
                </Label>
                <Switch id="billing" checked={annual} onCheckedChange={setAnnual} aria-label="Toggle annual billing" />
                <Label htmlFor="billing" className={cn("text-sm", annual && "text-foreground", !annual && "text-muted-foreground")}>
                  Annual
                </Label>
                <Badge variant="secondary" className="ml-1">Save 20%</Badge>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {PLANS.map((p) => (
                <Card
                  key={p.name}
                  className={cn("relative flex flex-col", p.highlight && "border-primary shadow-lg")}
                >
                  {p.highlight && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col pt-6">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight">
                        ${annual ? p.annual : p.monthly}
                      </span>
                      <span className="text-sm text-muted-foreground">/ user / mo</span>
                    </div>
                    <ul className="mt-6 space-y-3 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={p.highlight ? "default" : "outline"}
                      className="mt-8 w-full"
                    >
                      {p.monthly === 0 ? "Get started" : `Choose ${p.name}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Notebook className="h-6 w-6" />
              </span>
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Bring your whole workspace into focus
              </h2>
              <p className="max-w-md text-muted-foreground">
                Join 40,000+ people who think, plan, and ship in Plume. Free forever — no credit card required.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Apple className="h-4 w-4" /> Download for Mac
                </Button>
                <Button size="lg" variant="outline">Open web app</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Notebook className="h-3.5 w-3.5" />
            </span>
            Plume
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <a href="#top" className="hover:text-foreground">Privacy</a>
          </nav>
          <p>© 2026 Plume Labs, Inc.</p>
        </div>
      </footer>
    </div>
  )
}
