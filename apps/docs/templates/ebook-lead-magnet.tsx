"use client"

import * as React from "react"
import {
  BookOpen,
  Download,
  CheckCircle2,
  Star,
  Quote,
  ArrowRight,
  Sparkles,
  FileText,
  Users,
  Clock,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const CHAPTERS = [
  {
    n: "01",
    title: "Mapping the modern funnel",
    desc: "Why the classic AIDA model breaks down and the loop that replaces it.",
  },
  {
    n: "02",
    title: "Writing offers that convert",
    desc: "A 4-part framework for lead magnets people actually trade their email for.",
  },
  {
    n: "03",
    title: "Landing pages that breathe",
    desc: "The structure, copy, and proof elements behind 40%+ opt-in rates.",
  },
  {
    n: "04",
    title: "Nurture without nagging",
    desc: "An 8-email sequence that warms cold leads into ready buyers.",
  },
  {
    n: "05",
    title: "Measuring what matters",
    desc: "The five metrics worth tracking and the dozen vanity numbers to ignore.",
  },
  {
    n: "06",
    title: "Scaling on autopilot",
    desc: "Systems, automations, and the tooling stack to run it all hands-off.",
  },
]

const STATS = [
  { icon: Download, value: "27,400+", label: "Downloads" },
  { icon: Star, value: "4.9 / 5", label: "Reader rating" },
  { icon: Clock, value: "45 min", label: "Avg. read time" },
]

const TESTIMONIALS = [
  {
    quote:
      "I implemented chapter 3 over a weekend and our opt-in rate jumped from 11% to 38%. This is the most actionable guide I have read all year.",
    name: "Priya Raman",
    role: "Growth Lead, Northwind",
    initials: "PR",
    img: "https://i.pravatar.cc/96?img=47",
  },
  {
    quote:
      "Dense with examples, zero fluff. The nurture sequence template alone paid for itself ten times over within a month.",
    name: "Marcus Bell",
    role: "Founder, Ledgerline",
    initials: "MB",
    img: "https://i.pravatar.cc/96?img=12",
  },
  {
    quote:
      "Finally a marketing book that respects your time. I keep the metrics checklist pinned above my desk.",
    name: "Sofia N­avarro",
    role: "Head of Demand Gen, Plenum",
    initials: "SN",
    img: "https://i.pravatar.cc/96?img=32",
  },
]

const TRUST = [
  { icon: ShieldCheck, label: "No spam, ever" },
  { icon: FileText, label: "142 pages, PDF + ePub" },
  { icon: Users, label: "Joined by 27k marketers" },
]

function LeadForm({ id, compact = false }: { id: string; compact?: boolean }) {
  const [submitted, setSubmitted] = React.useState(false)
  return submitted ? (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-6 text-center">
      <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
      <p className="font-semibold text-foreground">Check your inbox</p>
      <p className="text-sm text-muted-foreground">
        Your copy of The Lead Engine is on its way. Look for an email from our team.
      </p>
    </div>
  ) : (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
    >
      {!compact && (
        <div className="grid gap-2">
          <Label htmlFor={id + "-name"}>First name</Label>
          <Input id={id + "-name"} placeholder="Jordan" required />
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor={id + "-email"}>Work email</Label>
        <Input id={id + "-email"} type="email" placeholder="you@company.com" required />
      </div>
      {!compact && (
        <div className="flex items-start gap-2 pt-1">
          <Checkbox id={id + "-consent"} defaultChecked />
          <Label htmlFor={id + "-consent"} className="text-xs font-normal text-muted-foreground">
            Send me the occasional growth tip. Unsubscribe anytime.
          </Label>
        </div>
      )}
      <Button type="submit" size="lg" className="mt-1 w-full">
        <Download className="h-4 w-4" aria-hidden="true" />
        Get the free ebook
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Instant download. No credit card required.
      </p>
    </form>
  )
}

function BookCover({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-r-lg rounded-l-sm border bg-card shadow-xl",
        className,
      )}
    >
      <div className="absolute inset-y-0 left-0 w-3 bg-primary/20" aria-hidden="true" />
      <div className="absolute inset-y-0 left-3 w-px bg-border" aria-hidden="true" />
      <div className="flex h-full flex-col justify-between p-6 pl-9">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
            2026 Edition
          </Badge>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            The complete guide to
          </p>
          <h3 className="text-2xl font-bold leading-tight text-foreground">
            The Lead Engine
          </h3>
          <p className="text-sm text-muted-foreground">
            Build a funnel that fills itself.
          </p>
        </div>
        <div className="flex items-center gap-2 border-t pt-4">
          <div className="h-6 w-6 rounded-full bg-muted" aria-hidden="true" />
          <span className="text-xs text-muted-foreground">by Elena Castro</span>
        </div>
      </div>
    </div>
  )
}

export default function EbookLeadMagnetPage() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>Funnelhouse</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#chapters" className="transition-colors hover:text-foreground">
              What you will learn
            </a>
            <a href="#author" className="transition-colors hover:text-foreground">
              Author
            </a>
            <a href="#reviews" className="transition-colors hover:text-foreground">
              Reviews
            </a>
          </nav>
          <Button size="sm" asChild>
            <a href="#download">Download free</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-background" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Free 142-page guide
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                The marketing funnel that fills itself
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                A practical, no-fluff playbook for turning strangers into subscribers
                and subscribers into customers. Download The Lead Engine free.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {TRUST.map((t) => (
                  <div key={t.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <t.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.label}
                  </div>
                ))}
              </div>
              <Card className="max-w-sm border-primary/20">
                <CardContent className="p-5">
                  <p className="mb-4 text-sm font-medium">
                    Enter your details to get instant access
                  </p>
                  <LeadForm id="hero" />
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
                <BookCover />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-px overflow-hidden px-4 sm:grid-cols-3 sm:px-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center justify-center gap-3 py-8">
                <s.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chapters */}
        <section id="chapters" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Inside the book
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you will learn
            </h2>
            <p className="mt-4 text-muted-foreground">
              Six chapters of field-tested tactics, templates, and teardowns you can
              put to work the same afternoon you read them.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHAPTERS.map((c) => (
              <Card key={c.n} className="group h-full transition-colors hover:border-primary/40">
                <CardContent className="flex h-full flex-col gap-3 p-6">
                  <span className="text-sm font-bold text-primary">{c.n}</span>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                  <div className="mt-auto flex items-center gap-1.5 pt-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read this chapter
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Author */}
        <section id="author" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[auto_1fr] lg:py-24">
            <div className="flex flex-col items-center gap-4 lg:items-start">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://i.pravatar.cc/256?img=5" alt="" />
                <AvatarFallback>EC</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1 text-primary">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Badge variant="outline">About the author</Badge>
              <h2 className="text-3xl font-bold tracking-tight">Elena Castro</h2>
              <p className="text-muted-foreground">
                Elena has spent fifteen years building demand-generation programs for
                companies from seed-stage startups to public SaaS brands. As former VP
                of Growth at Northwind, she scaled an inbound engine from zero to
                six figures in monthly pipeline.
              </p>
              <p className="text-muted-foreground">
                She now advises founders and marketing teams, and writes the weekly
                Funnelhouse newsletter read by more than 27,000 marketers. The Lead
                Engine distills everything she has learned into one practical guide.
              </p>
              <Separator className="my-2" />
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>15 years in growth</span>
                <span aria-hidden="true">•</span>
                <span>Ex-VP Growth, Northwind</span>
                <span aria-hidden="true">•</span>
                <span>27k newsletter readers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="reviews" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Reader reviews
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by 27,000+ marketers
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <Quote className="h-6 w-6 text-primary/40" aria-hidden="true" />
                  <p className="flex-1 text-sm leading-relaxed text-foreground">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3 border-t pt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={t.img} alt="" />
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <section id="download" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Get your free copy today
                  </h2>
                  <p className="text-muted-foreground">
                    142 pages of frameworks, swipe files, and real teardowns.
                    Delivered to your inbox in seconds, completely free.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Instant PDF and ePub download",
                      "Bonus nurture-email templates",
                      "Lifetime updates to new editions",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border bg-card p-6">
                  <LeadForm id="cta" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-medium text-foreground">Funnelhouse</span>
          </div>
          <p>© 2026 Funnelhouse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
