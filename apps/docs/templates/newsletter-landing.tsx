"use client"

import * as React from "react"
import {
  Mail,
  ArrowRight,
  Check,
  Sparkles,
  Clock,
  BookOpen,
  Star,
  Twitter,
  Github,
  Linkedin,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const BENEFITS = [
  {
    icon: BookOpen,
    title: "One deep-dive every Sunday",
    desc: "A single, well-researched essay on building products people love — no fluff, no filler.",
  },
  {
    icon: Sparkles,
    title: "Frameworks you can steal",
    desc: "Mental models, checklists, and templates distilled from 12 years shipping software.",
  },
  {
    icon: Clock,
    title: "A 6-minute read, tops",
    desc: "Respect for your inbox. Every issue is edited down until only the signal remains.",
  },
]

const ISSUES = [
  {
    no: "048",
    date: "Jun 8, 2026",
    title: "The pricing page is a product",
    blurb: "Why your highest-leverage design surface is the one most teams treat as an afterthought.",
    reads: "14.2k reads",
  },
  {
    no: "047",
    date: "Jun 1, 2026",
    title: "Ship the boring version first",
    blurb: "A practical case for shipping the unglamorous v1 — and how it compounds into momentum.",
    reads: "11.8k reads",
  },
  {
    no: "046",
    date: "May 25, 2026",
    title: "Notes on writing for engineers",
    blurb: "How to write docs and updates that busy technical people actually finish reading.",
    reads: "9.6k reads",
  },
  {
    no: "045",
    date: "May 18, 2026",
    title: "The cost of one more setting",
    blurb: "Every toggle you add is a tax on everyone who never wanted it. A budget for options.",
    reads: "13.1k reads",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "The only newsletter I read the minute it lands. It consistently changes how I think about my own work.",
    name: "Dana Reyes",
    role: "Head of Product, Loft",
    initials: "DR",
    img: "https://i.pravatar.cc/120?img=47",
  },
  {
    quote:
      "Short, sharp, and genuinely useful. I've forwarded more issues from this than from any other source.",
    name: "Marcus Lin",
    role: "Founder, Settle",
    initials: "ML",
    img: "https://i.pravatar.cc/120?img=12",
  },
  {
    quote:
      "It reads like a smart friend who happens to have shipped a lot of software. Rare and valuable.",
    name: "Priya Nair",
    role: "Design Lead, Northwind",
    initials: "PN",
    img: "https://i.pravatar.cc/120?img=32",
  },
]

const STATS = [
  { value: "32,400+", label: "subscribers" },
  { value: "48", label: "issues shipped" },
  { value: "61%", label: "open rate" },
]

export default function NewsletterLanding() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim().length > 0) setSubmitted(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Mail className="h-4 w-4" />
            </span>
            The Long Game
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <a href="#issues" className="transition-colors hover:text-foreground">
              Archive
            </a>
            <a href="#author" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#subscribe" className="transition-colors hover:text-foreground">
              Subscribe
            </a>
          </nav>
          <Button size="sm" asChild>
            <a href="#subscribe">Subscribe</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-5xl px-6 py-20 text-center sm:py-28">
            <Badge variant="secondary" className="mb-6 gap-1">
              <Sparkles className="h-3 w-3" />
              Free weekly essay
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Sharper thinking on building products that last
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join 32,400+ founders, designers, and engineers who get one
              thoughtful essay every Sunday. No spam, unsubscribe anytime.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                placeholder="you@work.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 flex-1"
              />
              <Button type="submit" size="lg" className="gap-2">
                {submitted ? (
                  <>
                    <Check className="h-4 w-4" /> Subscribed
                  </>
                ) : (
                  <>
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
            {submitted && (
              <p className="mt-3 text-sm text-primary">
                You're in. Check your inbox to confirm.
              </p>
            )}

            <div className="mx-auto mt-14 flex max-w-lg items-center justify-center gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold sm:text-3xl">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">
                What lands in your inbox
              </h2>
              <p className="mt-3 text-muted-foreground">
                Every issue is built around a single idea, edited until it earns
                its place in your week.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {BENEFITS.map((b) => {
                const Icon = b.icon
                return (
                  <Card key={b.title} className="border bg-card">
                    <CardContent className="pt-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold">{b.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {b.desc}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Recent issues */}
        <section id="issues" className="border-b">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Recent issues
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Browse a few of the most-read essays from the archive.
                </p>
              </div>
              <Button variant="outline" size="sm" className="hidden gap-1 sm:flex" asChild>
                <a href="#issues">
                  Full archive <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="divide-y rounded-xl border">
              {ISSUES.map((issue) => (
                <a
                  key={issue.no}
                  href="#issues"
                  className={cn(
                    "group flex flex-col gap-3 p-5 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:gap-6"
                  )}
                >
                  <div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground sm:w-40">
                    <Badge variant="outline">#{issue.no}</Badge>
                    <span>{issue.date}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {issue.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {issue.blurb}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs text-muted-foreground">
                    {issue.reads}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Author bio */}
        <section id="author" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="grid items-center gap-10 md:grid-cols-[200px_1fr]">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src="https://i.pravatar.cc/240?img=15"
                    alt=""
                  />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="mt-4 flex gap-3 text-muted-foreground">
                  <a href="#author" aria-label="Twitter" className="transition-colors hover:text-foreground">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#author" aria-label="GitHub" className="transition-colors hover:text-foreground">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#author" aria-label="LinkedIn" className="transition-colors hover:text-foreground">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Written by</p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">
                  Alex Kerr
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  I've spent the last 12 years building and leading product teams
                  — from a two-person startup to a public company. The Long Game
                  is where I write down what I wish someone had told me earlier:
                  the durable, unglamorous lessons that actually move the needle.
                </p>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  No growth hacks. No hot takes with a shelf life of a week. Just
                  careful thinking about doing good work over a long time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="mb-12 text-center">
              <div className="mb-3 flex items-center justify-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Loved by thoughtful readers
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
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

        {/* Subscribe CTA */}
        <section id="subscribe" className="bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-6 py-24">
            <Card className="border bg-card">
              <CardContent className="flex flex-col items-center px-6 py-14 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Mail className="h-6 w-6" />
                </span>
                <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Start your Sundays a little sharper
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  One essay a week. Free forever. Join 32,400+ readers who think
                  for a living.
                </p>
                <form
                  onSubmit={handleSubscribe}
                  className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <Input
                    type="email"
                    required
                    placeholder="you@work.com"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 flex-1"
                  />
                  <Button type="submit" size="lg" className="gap-2">
                    {submitted ? (
                      <>
                        <Check className="h-4 w-4" /> Done
                      </>
                    ) : (
                      <>
                        Subscribe <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
                <p className="mt-3 text-xs text-muted-foreground">
                  No spam. Unsubscribe in one click.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Mail className="h-3 w-3" />
            </span>
            <span className="font-medium text-foreground">The Long Game</span>
          </div>
          <nav className="flex gap-6">
            <a href="#issues" className="transition-colors hover:text-foreground">
              Archive
            </a>
            <a href="#author" className="transition-colors hover:text-foreground">
              About
            </a>
            <a href="#subscribe" className="transition-colors hover:text-foreground">
              Subscribe
            </a>
          </nav>
          <p>© 2026 The Long Game. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
