"use client"

import * as React from "react"
import {
  Rocket,
  ArrowRight,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  Clock,
  LineChart,
  Mail,
  Twitter,
  Github,
  Linkedin,
  AlertTriangle,
  CircleDot,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV_LINKS = [
  { label: "Problem", href: "#problem" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
]

const PROBLEMS = [
  "Spreadsheets sprawl across teams with no single source of truth.",
  "Manual handoffs slip through the cracks and stall launches.",
  "You only notice a missed deadline after it has already passed.",
]

const SOLUTIONS = [
  "One shared workspace that every stakeholder actually opens.",
  "Automated handoffs that route work the moment a stage clears.",
  "Live signals flag risk days before anything goes off the rails.",
]

const FEATURES = [
  {
    icon: Zap,
    title: "Instant automations",
    body: "Trigger tasks, reminders, and updates the second something changes — no glue code required.",
  },
  {
    icon: LineChart,
    title: "Predictive insights",
    body: "Forecast delivery dates from real velocity, not optimistic guesses, and catch slippage early.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    body: "SOC 2 aligned controls, granular roles, and audit trails baked in from your very first invite.",
  },
  {
    icon: Sparkles,
    title: "Delightfully simple",
    body: "A clean, fast interface your whole team can master in an afternoon — onboarding included.",
  },
]

const STEPS = [
  {
    step: "01",
    title: "Connect your stack",
    body: "Link the tools you already use in a couple of clicks. We sync the rest automatically.",
  },
  {
    step: "02",
    title: "Map your workflow",
    body: "Drag stages into place and set the rules. Templates get you running in minutes.",
  },
  {
    step: "03",
    title: "Launch with confidence",
    body: "Watch progress unfold live and let automations keep everyone perfectly in sync.",
  },
]

const FOUNDERS = [
  {
    name: "Mara Velez",
    role: "Co-founder & CEO",
    img: "https://i.pravatar.cc/160?img=47",
    initials: "MV",
    bio: "Previously led product at two launch-stage startups through to acquisition.",
  },
  {
    name: "Devin Asad",
    role: "Co-founder & CTO",
    img: "https://i.pravatar.cc/160?img=12",
    initials: "DA",
    bio: "Built distributed systems for millions of daily users before going indie.",
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    img: "https://i.pravatar.cc/160?img=32",
    initials: "PN",
    bio: "Obsessed with interfaces that feel effortless and look unmistakably crafted.",
  },
]

const FAQS = [
  {
    q: "When does early access open?",
    a: "We are onboarding waitlist members in small batches starting next quarter. Join now to hold your spot near the front of the line.",
  },
  {
    q: "Will it be free during the beta?",
    a: "Yes. Every waitlist member gets full access throughout the beta at no cost, plus founder pricing locked in for life after launch.",
  },
  {
    q: "Which tools do you integrate with?",
    a: "We ship native integrations for the most common project, chat, and calendar tools, with a flexible API for everything else.",
  },
  {
    q: "Is my data safe?",
    a: "Always. Data is encrypted in transit and at rest, and we follow SOC 2 aligned practices from day one. You own and can export your data anytime.",
  },
]

const STATS = [
  { value: "2,400+", label: "on the waitlist" },
  { value: "120", label: "teams in private beta" },
  { value: "4.9/5", label: "early tester rating" },
]

export default function StartupLaunch() {
  const [email, setEmail] = React.useState("")
  const [joined, setJoined] = React.useState(false)

  function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim().length > 0) setJoined(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="size-4" />
            </span>
            <span>Liftoff</span>
          </a>
          <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button size="sm" asChild={false}>
            <a href="#waitlist">Join waitlist</a>
          </Button>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.primary/0.12),transparent)]" />
          <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Sparkles className="size-3.5" />
              Now in private beta
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Ship your launch without the chaos
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
              Liftoff turns scattered tasks, tools, and teammates into one
              calm, automated workspace — so nothing slips before launch day.
            </p>

            <div id="waitlist" className="mx-auto mt-8 max-w-md scroll-mt-24">
              {joined ? (
                <div className="flex items-center justify-center gap-2 rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                  <Check className="size-4 text-primary" />
                  You are on the list. We will be in touch soon.
                </div>
              ) : (
                <form
                  onSubmit={handleJoin}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-label="Email address"
                      className="pl-9"
                    />
                  </div>
                  <Button type="submit" className="gap-1.5">
                    Get early access
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                No spam. Unsubscribe anytime. Founder pricing locked for life.
              </p>
            </div>

            <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t pt-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="text-2xl font-bold sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Problem vs Solution */}
        <section id="problem" className="scroll-mt-20 border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Launches break in the gaps
              </h2>
              <p className="mt-3 text-muted-foreground">
                The work is hard enough. The coordination shouldn&apos;t be.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <Card className="border-destructive/30">
                <CardHeader>
                  <Badge variant="destructive" className="w-fit gap-1.5">
                    <AlertTriangle className="size-3.5" />
                    The old way
                  </Badge>
                  <CardTitle className="mt-2 text-xl">
                    Duct-taped tools and crossed fingers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {PROBLEMS.map((p) => (
                      <li key={p} className="flex gap-3 text-sm">
                        <CircleDot className="mt-0.5 size-4 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-primary/40">
                <CardHeader>
                  <Badge className="w-fit gap-1.5">
                    <Sparkles className="size-3.5" />
                    With Liftoff
                  </Badge>
                  <CardTitle className="mt-2 text-xl">
                    One source of truth that runs itself
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {SOLUTIONS.map((s) => (
                      <li key={s} className="flex gap-3 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20 border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to launch on time
              </h2>
              <p className="mt-3 text-muted-foreground">
                Built for small teams who refuse to let great work get lost in
                the shuffle.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <Card key={f.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-base">{f.title}</CardTitle>
                    <CardDescription>{f.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-20 border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 gap-1.5">
                <Clock className="size-3.5" />
                How it works
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                From setup to launch in three steps
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <div key={s.step} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                      {s.step}
                    </span>
                    {i < STEPS.length - 1 && (
                      <Separator className="hidden flex-1 md:block" />
                    )}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders */}
        <section id="team" className="scroll-mt-20 border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                The team
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Built by people who have shipped before
              </h2>
              <p className="mt-3 text-muted-foreground">
                A small, senior team obsessed with making launches feel calm.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FOUNDERS.map((p) => (
                <Card key={p.name} className="text-center">
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="size-20">
                      <AvatarImage src={p.img} alt="" />
                      <AvatarFallback>{p.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{p.name}</h3>
                    <p className="text-sm text-primary">{p.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {p.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-muted-foreground">
                Everything else you might want to know before joining.
              </p>
            </div>
            <Accordion
              type="single"
              collapsible
              className="mt-10 w-full rounded-xl border bg-card px-5"
            >
              {FAQS.map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-base">
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
        <section className="border-t">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Be first in line for liftoff
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Join thousands of builders waiting to launch calmer, faster, and
              right on schedule.
            </p>
            <div className="mt-6 flex justify-center">
              <Button size="lg" className="gap-1.5" asChild={false}>
                <a href="#waitlist">
                  Join the waitlist
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <a href="#top" className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Rocket className="size-4" />
              </span>
              <span>Liftoff</span>
            </a>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="size-4" />
              </Button>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; 2026 Liftoff Labs, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
