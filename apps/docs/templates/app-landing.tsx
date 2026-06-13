"use client"

import * as React from "react"
import {
  Apple,
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  Fingerprint,
  Menu,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const navLinks = ["Features", "Screens", "Reviews", "Download"]

const features = [
  {
    icon: Zap,
    title: "Lightning fast",
    body: "Open, log a transaction, and you're done in under three seconds — no spinners, no waiting.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    body: "End-to-end encryption and on-device storage keep your money data yours alone.",
  },
  {
    icon: Fingerprint,
    title: "Unlock with a touch",
    body: "Face ID and fingerprint sign-in mean your numbers stay private at a glance.",
  },
  {
    icon: Wallet,
    title: "Smart budgets",
    body: "Auto-categorized spending and gentle nudges keep every envelope on track.",
  },
  {
    icon: Bell,
    title: "Calm alerts",
    body: "Only the notifications that matter — bills due, low balances, big purchases.",
  },
  {
    icon: Sparkles,
    title: "Insights that stick",
    body: "Weekly recaps turn raw transactions into habits you can actually act on.",
  },
]

const screens = [
  { label: "Dashboard", tint: "bg-primary/10" },
  { label: "Budgets", tint: "bg-accent" },
  { label: "Insights", tint: "bg-secondary" },
  { label: "Goals", tint: "bg-muted" },
]

const reviews = [
  {
    quote:
      "I finally stopped dreading my finances. The app makes checking in feel almost relaxing.",
    name: "Priya N.",
    handle: "App Store review",
    avatar: "https://i.pravatar.cc/96?img=47",
  },
  {
    quote:
      "Set up two budgets in five minutes and saved more in a month than I had all year.",
    name: "Marcus L.",
    handle: "Google Play review",
    avatar: "https://i.pravatar.cc/96?img=12",
  },
  {
    quote:
      "The weekly recap is my favorite notification. Genuinely look forward to it now.",
    name: "Dana R.",
    handle: "App Store review",
    avatar: "https://i.pravatar.cc/96?img=32",
  },
]

const stats = [
  ["4.9", "Average rating"],
  ["2M+", "Downloads"],
  ["180k", "5-star reviews"],
  ["#3", "Finance, App Store"],
]

function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Wallet className="size-4" />
      </span>
      Tidepool
    </span>
  )
}

function StoreBadge({
  icon: Icon,
  top,
  bottom,
}: {
  icon: React.ElementType
  top: string
  bottom: string
}) {
  return (
    <a
      href="#download"
      className="flex items-center gap-3 rounded-xl border bg-card px-4 py-2.5 transition-colors hover:bg-accent"
    >
      <Icon className="size-6 shrink-0" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {top}
        </span>
        <span className="text-sm font-semibold">{bottom}</span>
      </span>
    </a>
  )
}

function PhoneMock({
  className,
  label,
  tint = "bg-primary/10",
}: {
  className?: string
  label: string
  tint?: string
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full max-w-[260px] rounded-[2.25rem] border-4 border-foreground/10 bg-card p-2 shadow-xl",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-foreground/15" />
      <div
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-[1.75rem]",
          tint,
        )}
      >
        <div className="flex items-center justify-between px-4 pt-7 text-xs text-muted-foreground">
          <span className="font-medium">9:41</span>
          <span className="size-2 rounded-full bg-foreground/20" aria-hidden />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="h-3 w-20 rounded-full bg-foreground/15" />
          <div className="rounded-2xl bg-background/70 p-3">
            <div className="mb-2 h-2.5 w-14 rounded-full bg-foreground/10" />
            <div className="h-6 w-24 rounded-md bg-primary/30" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 rounded-2xl bg-background/70" />
            <div className="h-16 rounded-2xl bg-background/70" />
          </div>
          <div className="mt-auto flex items-center justify-center rounded-full bg-background/70 py-2 text-xs font-medium text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AppLanding() {
  const [active, setActive] = React.useState(0)

  const prev = () =>
    setActive((i) => (i === 0 ? screens.length - 1 : i - 1))
  const next = () =>
    setActive((i) => (i === screens.length - 1 ? 0 : i + 1))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              Get the app
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
            <div className="flex flex-col items-start gap-6">
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="size-3.5" /> New: weekly money recaps
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
                Money that finally feels calm.
              </h1>
              <p className="max-w-md text-pretty text-lg text-muted-foreground">
                Tidepool tracks spending, builds budgets, and nudges you toward
                your goals — all from a tap on your home screen.
              </p>
              <div className="flex flex-wrap gap-3">
                <StoreBadge icon={Apple} top="Download on the" bottom="App Store" />
                <StoreBadge icon={Play} top="Get it on" bottom="Google Play" />
              </div>
              <div className="flex items-center gap-3 pt-2 text-sm text-muted-foreground">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary"
                      aria-hidden
                    />
                  ))}
                </div>
                <span>4.9 from 180k+ reviews</span>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div
                className="absolute inset-0 -z-10 mx-auto size-72 rounded-full bg-primary/10 blur-3xl"
                aria-hidden
              />
              <PhoneMock label="Home" />
              <PhoneMock
                label="Insights"
                tint="bg-accent"
                className="absolute -right-2 top-12 hidden w-[200px] rotate-6 sm:block"
              />
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-10 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need, nothing you don't
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Thoughtful features that work quietly in the background so you can
              get on with your day.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="border bg-card">
                <CardContent className="flex flex-col gap-3 p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Screenshots carousel */}
        <section id="screens" className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col items-center gap-4 text-center">
              <Badge variant="outline">A peek inside</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Designed to be looked at
              </h2>
              <p className="max-w-xl text-lg text-muted-foreground">
                Clean screens that turn complicated finances into something you
                actually want to open.
              </p>
            </div>

            <div className="mt-12 flex items-center justify-center gap-4 sm:gap-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                aria-label="Previous screen"
                className="shrink-0 rounded-full"
              >
                <ChevronLeft className="size-5" />
              </Button>

              <div className="flex items-end gap-4 sm:gap-6">
                {screens.map((s, i) => (
                  <PhoneMock
                    key={s.label}
                    label={s.label}
                    tint={s.tint}
                    className={cn(
                      "transition-all duration-300",
                      i === active
                        ? "w-[220px] opacity-100"
                        : "hidden w-[170px] opacity-60 lg:block",
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next screen"
                className="shrink-0 rounded-full"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {screens.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.label} screen`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === active
                      ? "w-6 bg-primary"
                      : "w-2 bg-foreground/20 hover:bg-foreground/40",
                  )}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by two million people
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Don't take our word for it — here's what the reviews say.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <Card key={r.name} className="border bg-card">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <Quote className="size-6 text-primary" aria-hidden />
                  <p className="flex-1 text-sm leading-relaxed text-foreground">
                    {r.quote}
                  </p>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-muted">
                      <img src={r.avatar} alt="" className="size-full object-cover" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-medium">{r.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {r.handle}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <section id="download" className="border-t bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col items-center gap-6 rounded-3xl border bg-card px-6 py-14 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Download className="size-6" />
              </span>
              <h2 className="max-w-xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Your calmer money life starts today
              </h2>
              <p className="max-w-md text-lg text-muted-foreground">
                Free to download. No ads, no selling your data — ever.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <StoreBadge icon={Apple} top="Download on the" bottom="App Store" />
                <StoreBadge icon={Play} top="Get it on" bottom="Google Play" />
              </div>
              <Button size="lg" className="mt-2">
                Scan to install <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <p>© 2026 Tidepool Labs. All rights reserved.</p>
          <nav className="flex gap-5">
            <a href="#features" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Support
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
