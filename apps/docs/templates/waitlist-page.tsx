"use client"

import * as React from "react"
import {
  ArrowRight,
  Check,
  Copy,
  Gift,
  Sparkles,
  Twitter,
  Github,
  Linkedin,
  Zap,
  ShieldCheck,
  Layers,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const SOCIAL_PROOF = [
  { name: "Ava Lin", src: "https://i.pravatar.cc/80?img=47", fallback: "AL" },
  { name: "Marcus Reid", src: "https://i.pravatar.cc/80?img=12", fallback: "MR" },
  { name: "Priya Nair", src: "https://i.pravatar.cc/80?img=32", fallback: "PN" },
  { name: "Tom Becker", src: "https://i.pravatar.cc/80?img=15", fallback: "TB" },
  { name: "Sofia Cruz", src: "https://i.pravatar.cc/80?img=20", fallback: "SC" },
]

const FEATURES = [
  {
    icon: Zap,
    title: "Instant sync",
    desc: "Your workspace stays in lockstep across every device, in real time.",
  },
  {
    icon: Layers,
    title: "Composable flows",
    desc: "Stack reusable blocks into automations without writing a line of code.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    desc: "End-to-end encryption with zero data retention. Your work stays yours.",
  },
  {
    icon: Sparkles,
    title: "AI copilot",
    desc: "An assistant that drafts, summarizes, and ships alongside your team.",
  },
]

const PERKS = [
  "Skip the line with 3 referrals",
  "Lifetime 40% founder discount",
  "Early access to the beta build",
]

export default function WaitlistPage() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const referralLink = "launchpad.app/r/ava-2049"
  const position = 1284
  const ahead = 12480

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  function handleCopy() {
    setCopied(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">Launchpad</span>
          </div>
          <Badge variant="secondary" className="gap-1.5">
            <span className="size-1.5 rounded-full bg-primary" />
            Launching Q3 2049
          </Badge>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-primary/10 blur-3xl" />
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 pb-16 pt-20 text-center sm:pt-28">
            <Badge variant="outline" className="mb-6 gap-1.5 rounded-full px-3 py-1">
              <Gift className="size-3.5 text-primary" />
              Refer friends, climb the list
            </Badge>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              The workspace that
              <span className="text-primary"> ships with you</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
              Join the waitlist for an early invite to the calmest, fastest place
              your team has ever planned, built, and launched from.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              >
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
                  Get early access
                  <ArrowRight className="size-4" />
                </Button>
              </form>
            ) : (
              <div className="mt-9 w-full max-w-md rounded-2xl border bg-card p-6 text-left shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">You are on the list!</p>
                    <p className="text-sm text-muted-foreground">
                      We sent a confirmation to {email || "your inbox"}.
                    </p>
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Your position
                    </p>
                    <p className="text-2xl font-bold tabular-nums">
                      #{position.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      People ahead
                    </p>
                    <p className="text-2xl font-bold tabular-nums text-muted-foreground">
                      {ahead.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-muted/30 p-4">
                  <p className="text-sm font-medium">Share to move up the queue</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex h-10 flex-1 items-center truncate rounded-md border bg-background px-3 text-sm text-muted-foreground">
                      {referralLink}
                    </div>
                    <Button
                      type="button"
                      variant={copied ? "secondary" : "default"}
                      size="icon"
                      aria-label="Copy referral link"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="size-4" />
                      ) : (
                        <Copy className="size-4" />
                      )}
                    </Button>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {PERKS.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="size-4 shrink-0 text-primary" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <div className="flex -space-x-2">
                {SOCIAL_PROOF.map((person) => (
                  <Avatar
                    key={person.name}
                    className="size-9 border-2 border-background"
                  >
                    <AvatarImage src={person.src} alt="" />
                    <AvatarFallback>{person.fallback}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground tabular-nums">
                  13,764
                </span>{" "}
                builders already waiting
              </p>
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-primary">
                <Users className="size-4" />
                What is coming
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Built for teams who would rather ship than wrangle tools
              </h2>
              <p className="mt-3 text-muted-foreground">
                A preview of what lands the moment your invite goes live.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className={cn(
                      "rounded-2xl border bg-card p-6",
                      "transition-colors hover:border-primary"
                    )}
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-semibold">{feature.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {feature.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-3" />
            </span>
            <span>© 2049 Launchpad. All rights reserved.</span>
          </div>
          <nav className="flex items-center gap-1" aria-label="Social links">
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="size-4" />
            </Button>
          </nav>
        </div>
      </footer>
    </div>
  )
}
