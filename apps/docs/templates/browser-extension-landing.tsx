"use client"

import * as React from "react"
import {
  Puzzle,
  Chrome,
  Download,
  Sparkles,
  ShieldCheck,
  Zap,
  MousePointerClick,
  Keyboard,
  Star,
  Check,
  ArrowRight,
  Lock,
  EyeOff,
  Quote,
  Highlighter,
  FolderTree,
  Wand2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const BROWSERS = [
  { id: "chrome", name: "Chrome", icon: Chrome },
  { id: "edge", name: "Edge", icon: Puzzle },
  { id: "firefox", name: "Firefox", icon: Puzzle },
  { id: "brave", name: "Brave", icon: Puzzle },
  { id: "arc", name: "Arc", icon: Puzzle },
]

const STEPS = [
  {
    icon: Download,
    title: "Add to your browser",
    desc: "One click from the store and Clipper lives quietly in your toolbar — no account needed to start.",
  },
  {
    icon: MousePointerClick,
    title: "Highlight anything",
    desc: "Select text, an image, or a whole page. Press the shortcut and Clipper captures it instantly.",
  },
  {
    icon: FolderTree,
    title: "Find it forever",
    desc: "Everything is auto-tagged and searchable. Open a new tab and your clips are right where you left them.",
  },
]

const FEATURES = [
  {
    id: "capture",
    label: "Smart capture",
    icon: Highlighter,
    headline: "Clip the web without breaking your flow",
    body: "Grab text, images, or full pages with a single keystroke. Clipper strips the clutter and saves a clean, readable copy you can actually use later.",
    bullets: [
      "Highlight-to-save on any page",
      "Full-page reader snapshots",
      "Works offline, syncs when you reconnect",
    ],
  },
  {
    id: "organize",
    label: "Auto-organize",
    icon: FolderTree,
    headline: "Your clips, sorted before you ask",
    body: "Every save is auto-tagged by topic and source. Pin collections, drag to reorder, and let smart folders group related research on their own.",
    bullets: [
      "AI topic tagging out of the box",
      "Smart folders and pinned collections",
      "Instant full-text search across clips",
    ],
  },
  {
    id: "shortcuts",
    label: "Keyboard-first",
    icon: Keyboard,
    headline: "Built for people who never touch the mouse",
    body: "Open the command bar, jump to any clip, and trigger actions without leaving the keyboard. Every shortcut is remappable to fit your muscle memory.",
    bullets: [
      "Command bar on a single keystroke",
      "Fully remappable shortcuts",
      "Quick-switch between collections",
    ],
  },
]

const STATS = [
  { value: "180k+", label: "active installs" },
  { value: "4.8", label: "average rating" },
  { value: "12M+", label: "clips saved" },
  { value: "0", label: "trackers, ever" },
]

const REVIEWS = [
  {
    quote:
      "I replaced three different bookmarking tools with this in an afternoon. The keyboard shortcuts alone are worth it.",
    name: "Renata Voss",
    role: "Researcher",
    initials: "RV",
    img: "https://i.pravatar.cc/120?img=5",
  },
  {
    quote:
      "Clean capture, zero bloat, and it actually respects my privacy. Finally an extension that gets out of the way.",
    name: "Theo Marsh",
    role: "Indie developer",
    initials: "TM",
    img: "https://i.pravatar.cc/120?img=13",
  },
  {
    quote:
      "Auto-tagging is borderline magic. My research is organized without me ever thinking about folders.",
    name: "Hana Okafor",
    role: "PhD candidate",
    initials: "HO",
    img: "https://i.pravatar.cc/120?img=45",
  },
]

const PRIVACY = [
  { icon: Lock, text: "Clips encrypted on your device" },
  { icon: EyeOff, text: "No trackers, no ad networks" },
  { icon: ShieldCheck, text: "Your data is never sold — ever" },
]

const PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    desc: "Everything you need to clip and organize the web.",
    features: [
      "Unlimited highlights & clips",
      "AI topic tagging",
      "Full-text search",
      "Sync across 2 devices",
    ],
    cta: "Add to browser",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$5",
    cadence: "per month",
    desc: "For power researchers who live in their browser.",
    features: [
      "Everything in Free",
      "Unlimited device sync",
      "Smart folders & collections",
      "Offline reader & exports",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    highlighted: true,
  },
]

const FAQS = [
  {
    q: "Which browsers are supported?",
    a: "Clipper works on every Chromium-based browser — Chrome, Edge, Brave, and Arc — as well as Firefox. The experience and shortcuts are identical across all of them.",
  },
  {
    q: "Do I need an account to use it?",
    a: "No. You can install Clipper and start saving immediately. An account is only needed if you want to sync your clips across multiple devices.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Clips are encrypted on your device, we run no trackers or ad networks, and we never sell your data. Privacy is a feature, not a setting.",
  },
  {
    q: "Can I export my clips?",
    a: "Pro users can export to Markdown, PDF, and JSON at any time. Your clips are always yours, and there's no lock-in if you decide to leave.",
  },
]

export default function BrowserExtensionLanding() {
  const [browser, setBrowser] = React.useState(BROWSERS[0].id)
  const [feature, setFeature] = React.useState(FEATURES[0].id)

  const activeBrowser =
    BROWSERS.find((b) => b.id === browser) ?? BROWSERS[0]
  const activeFeature =
    FEATURES.find((f) => f.id === feature) ?? FEATURES[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Highlighter className="h-4 w-4" />
            </span>
            Clipper
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <Button size="sm" className="gap-2" asChild>
            <a href="#install">
              <Download className="h-4 w-4" /> Add to browser
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center sm:py-28">
            <Badge variant="secondary" className="mb-6 gap-1">
              <Sparkles className="h-3 w-3" />
              Now with AI auto-tagging
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Save the web with a single keystroke
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Clipper is the browser extension that captures, organizes, and
              resurfaces everything worth keeping — clutter-free and completely
              private.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="#install">
                  <activeBrowser.icon className="h-4 w-4" /> Add to{" "}
                  {activeBrowser.name} — it's free
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#how">
                  See how it works <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Browser picker chips */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">
                Available on
              </span>
              {BROWSERS.map((b) => {
                const Icon = b.icon
                const active = b.id === browser
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBrowser(b.id)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {b.name}
                  </button>
                )
              })}
            </div>

            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              <span className="ml-1">4.8 from 9,200+ reviews</span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium text-primary">How it works</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Three steps to a tidier brain
              </h2>
              <p className="mt-3 text-muted-foreground">
                Install once and Clipper fits into how you already browse — no
                new app to learn.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => {
                const Icon = s.icon
                return (
                  <Card key={s.title} className="relative border bg-card">
                    <CardContent className="pt-6">
                      <span className="absolute right-5 top-5 text-4xl font-bold text-muted-foreground/20">
                        {i + 1}
                      </span>
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {s.desc}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Feature tabs (interactive) */}
        <section id="features" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-medium text-primary">Features</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Everything a power browser needs
              </h2>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {FEATURES.map((f) => {
                const Icon = f.icon
                const active = f.id === feature
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFeature(f.id)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {f.label}
                  </button>
                )
              })}
            </div>

            <div className="grid items-center gap-10 rounded-2xl border bg-muted/30 p-6 md:grid-cols-2 md:p-10">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {activeFeature.headline}
                </h3>
                <p className="mt-4 text-muted-foreground">
                  {activeFeature.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {activeFeature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex aspect-video items-center justify-center rounded-xl border bg-card">
                <activeFeature.icon className="h-20 w-20 text-primary/30" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats / ratings band */}
        <section className="border-b bg-primary/10">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <div className="mb-3 flex items-center justify-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Loved by people who read for a living
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {REVIEWS.map((t) => (
                <Card key={t.name} className="border bg-card">
                  <CardContent className="flex h-full flex-col pt-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed">
                      "{t.quote}"
                    </p>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy note */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <Card className="border bg-card">
              <CardContent className="flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between">
                <div className="max-w-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Private by design, not by promise
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Clipper requests only the permissions it actually needs.
                    Your clips never leave your control, and there are no ads or
                    trackers hiding in the background.
                  </p>
                </div>
                <ul className="space-y-4">
                  {PRIVACY.map((p) => {
                    const Icon = p.icon
                    return (
                      <li
                        key={p.text}
                        className="flex items-center gap-3 text-sm font-medium"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        {p.text}
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <p className="text-sm font-medium text-primary">Pricing</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Free to start, fair to upgrade
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Begin with the full free plan. Upgrade only when you outgrow it.
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
              {PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col border bg-card",
                    plan.highlighted && "border-primary shadow-sm"
                  )}
                >
                  {plan.highlighted && (
                    <Badge className="absolute -top-3 left-6 gap-1">
                      <Zap className="h-3 w-3" /> Most popular
                    </Badge>
                  )}
                  <CardContent className="flex flex-1 flex-col pt-8">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="mb-1 text-sm text-muted-foreground">
                        / {plan.cadence}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {plan.desc}
                    </p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-8 w-full gap-2"
                      variant={plan.highlighted ? "default" : "outline"}
                      asChild
                    >
                      <a href="#install">
                        {plan.highlighted ? (
                          <Wand2 className="h-4 w-4" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        {plan.cta}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Questions, answered
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section id="install">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <Card className="border bg-card">
              <CardContent className="flex flex-col items-center px-6 py-16 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Highlighter className="h-6 w-6" />
                </span>
                <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Add Clipper and never lose a good page again
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Free to install, no account required. Join 180,000+ people who
                  keep the web close.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                  <Button size="lg" className="gap-2" asChild>
                    <a href="#install">
                      <activeBrowser.icon className="h-4 w-4" /> Add to{" "}
                      {activeBrowser.name}
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2" asChild>
                    <a href="#pricing">
                      Compare plans <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Works on Chrome, Edge, Firefox, Brave, and Arc.
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
              <Highlighter className="h-3 w-3" />
            </span>
            <span className="font-medium text-foreground">Clipper</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>
          <p>© 2026 Clipper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
