"use client"
import * as React from "react"
import { Bell, Sparkles, Zap, Shield, Gauge, ArrowRight, Check, Lock, Twitter, Github, Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const FEATURES = [
  {
    icon: Zap,
    label: "Hint 01",
    title: "Instant by design",
    body: "Something that responds before you finish the thought. We rebuilt the core from the ground up.",
  },
  {
    icon: Shield,
    label: "Hint 02",
    title: "Private by default",
    body: "Your data stays yours. No tracking, no resale, no fine print buried six pages down.",
  },
  {
    icon: Gauge,
    label: "Hint 03",
    title: "Effortless control",
    body: "A surface so quiet it disappears, and so capable you will wonder how you worked without it.",
  },
]

const COUNTDOWN = [
  { value: "12", unit: "Days" },
  { value: "06", unit: "Hours" },
  { value: "48", unit: "Minutes" },
  { value: "21", unit: "Seconds" },
]

const STATS = [
  { value: "8,420", label: "On the waitlist" },
  { value: "37", label: "Countries" },
  { value: "v1.0", label: "First release" },
]

export default function ProductTeaserPage() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim().length > 0) {
      setSubmitted(true)
    }
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">Lumen</span>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Coming soon
          </Badge>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-3xl px-6 py-24 text-center sm:py-32">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              The next chapter
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              Something quietly remarkable is almost here.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground">
              We have spent two years on a single idea. In a few days, you will see what it became. Be the first through the door.
            </p>

            <div className="mx-auto mt-10 max-w-md">
              {submitted ? (
                <div className="flex items-center justify-center gap-3 rounded-xl border border-primary bg-primary/10 px-5 py-4 text-left">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">You are on the list.</p>
                    <p className="text-sm text-muted-foreground">We will email you the moment we go live.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    aria-label="Email address"
                    className="h-11 flex-1"
                  />
                  <Button type="submit" size="lg" className="h-11 gap-2">
                    <Bell className="h-4 w-4" />
                    Notify me
                  </Button>
                </form>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                No spam. One email at launch, and that is it.
              </p>
            </div>
          </div>
        </section>

        {/* Blurred product preview */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="select-none blur-md" aria-hidden="true">
                  <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                    <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                    <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 p-6">
                    <div className="col-span-1 space-y-3">
                      <div className="h-8 rounded-lg bg-primary/30" />
                      <div className="h-24 rounded-lg bg-muted" />
                      <div className="h-24 rounded-lg bg-muted" />
                    </div>
                    <div className="col-span-2 space-y-3">
                      <div className="h-32 rounded-lg bg-primary/20" />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="h-20 rounded-lg bg-muted" />
                        <div className="h-20 rounded-lg bg-muted" />
                      </div>
                      <div className="h-16 rounded-lg bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border bg-background/90 shadow-sm backdrop-blur">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                </span>
                <p className="text-sm font-medium text-foreground">Preview unlocks at launch</p>
                <p className="max-w-xs text-center text-sm text-muted-foreground">
                  A first look is behind the glass. The waitlist gets in first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Teaser feature hints */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Three things we can tell you</h2>
              <p className="mt-3 text-muted-foreground">
                The rest stays under wraps a little longer. Here is the shape of it.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="group rounded-2xl border bg-card p-6 transition-colors hover:border-primary"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {f.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Countdown row */}
        <section className="border-b bg-primary/5">
          <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Reveal countdown</p>
            <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6">
              {COUNTDOWN.map((c) => (
                <div key={c.unit} className="rounded-2xl border bg-card px-2 py-6 sm:py-8">
                  <div className="text-3xl font-semibold tabular-nums tracking-tight sm:text-5xl">{c.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">{c.unit}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 grid grid-cols-3 divide-x rounded-2xl border bg-card">
              {STATS.map((s) => (
                <div key={s.label} className="px-4 py-6">
                  <div className="text-xl font-semibold tracking-tight sm:text-2xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                }}
              >
                Claim your spot
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm text-muted-foreground">
              Lumen &middot; Launching soon, 2026
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Lumen on Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Lumen on GitHub">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Lumen on LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
