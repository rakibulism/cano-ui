"use client"

import * as React from "react"
import {
  ArrowRightLeft,
  Check,
  X,
  ArrowRight,
  Quote,
  Download,
  Wand2,
  PlugZap,
  PartyPopper,
  Star,
  ShieldCheck,
  Clock,
  DollarSign,
  Headphones,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

const RIVALS = [
  { id: "hivedesk", label: "HiveDesk" },
  { id: "zentro", label: "Zentro" },
  { id: "boltcrm", label: "BoltCRM" },
] as const

type RivalId = (typeof RIVALS)[number]["id"]

const HERO_STATS = [
  { value: "9 min", label: "average migration time" },
  { value: "31%", label: "lower seat price" },
  { value: "12,400", label: "teams already switched" },
]

type Cell = boolean | string

const COMPARISON: {
  feature: string
  hint: string
  us: Cell
  rivals: Record<RivalId, Cell>
}[] = [
  {
    feature: "Flat per-seat pricing",
    hint: "No surprise usage tiers or overage bills.",
    us: true,
    rivals: { hivedesk: false, zentro: "Tiered", boltcrm: false },
  },
  {
    feature: "Unlimited automations",
    hint: "Build as many workflows as you need.",
    us: true,
    rivals: { hivedesk: "Capped", zentro: false, boltcrm: "Capped" },
  },
  {
    feature: "One-click data import",
    hint: "Bring your records over without a CSV maze.",
    us: true,
    rivals: { hivedesk: false, zentro: true, boltcrm: false },
  },
  {
    feature: "Native mobile apps",
    hint: "Full-featured iOS and Android, not a wrapper.",
    us: true,
    rivals: { hivedesk: true, zentro: false, boltcrm: false },
  },
  {
    feature: "24/7 human support",
    hint: "Real people, no chatbot loops.",
    us: true,
    rivals: { hivedesk: "Email only", zentro: "Business hrs", boltcrm: "Email only" },
  },
  {
    feature: "SOC 2 Type II + SSO",
    hint: "Enterprise-grade security on every plan.",
    us: true,
    rivals: { hivedesk: true, zentro: "Add-on", boltcrm: "Add-on" },
  },
  {
    feature: "Open REST + webhooks",
    hint: "Connect anything in your stack.",
    us: true,
    rivals: { hivedesk: "Read-only", zentro: true, boltcrm: false },
  },
  {
    feature: "Free migration concierge",
    hint: "We move your data and rebuild your views.",
    us: true,
    rivals: { hivedesk: false, zentro: false, boltcrm: false },
  },
]

const REASONS = [
  {
    icon: DollarSign,
    title: "Predictable pricing",
    body: "One flat rate per seat with every feature included. No metered surprises at the end of the month.",
  },
  {
    icon: Clock,
    title: "Faster every day",
    body: "Pages load in under 200ms and bulk actions never queue. Your team stops waiting on the spinner.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    body: "SOC 2 Type II, SSO, and granular roles ship on every plan instead of hiding behind an enterprise upsell.",
  },
  {
    icon: Headphones,
    title: "Support that answers",
    body: "Talk to a real specialist any hour of the day, with a median first reply under four minutes.",
  },
]

const STEPS = [
  {
    icon: PlugZap,
    step: "01",
    title: "Connect your old tool",
    body: "Authorize a secure read-only sync. We map your fields, owners, and pipelines automatically.",
  },
  {
    icon: Download,
    step: "02",
    title: "Import everything",
    body: "Records, files, notes, and history move over intact. Nothing is left behind in the export.",
  },
  {
    icon: Wand2,
    step: "03",
    title: "Rebuild your views",
    body: "Our concierge recreates your dashboards and automations so your team feels at home on day one.",
  },
  {
    icon: PartyPopper,
    step: "04",
    title: "Go live with your team",
    body: "Invite everyone, run side by side for a week, then flip the switch when you are ready.",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "We moved 40 seats off HiveDesk in an afternoon. The concierge rebuilt our pipelines before our standup even ended.",
    name: "Renata Cole",
    role: "RevOps Lead, Northwind",
    img: "https://i.pravatar.cc/120?img=45",
    initials: "RC",
    from: "Switched from HiveDesk",
  },
  {
    quote:
      "Zentro kept nickel-and-diming us on automations. Here everything is included and our bill actually dropped.",
    name: "Marcus Ihejirika",
    role: "Founder, Tidewave",
    img: "https://i.pravatar.cc/120?img=15",
    initials: "MI",
    from: "Switched from Zentro",
  },
  {
    quote:
      "The import just worked. Twelve thousand contacts, every note, full history. I budgeted a week and needed an hour.",
    name: "Sofia Berg",
    role: "COO, Alpine Labs",
    img: "https://i.pravatar.cc/120?img=32",
    initials: "SB",
    from: "Switched from BoltCRM",
  },
]

function CellMark({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-4" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <X className="size-4" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    )
  }
  return (
    <Badge variant="outline" className="font-normal text-muted-foreground">
      {value}
    </Badge>
  )
}

export default function SaasComparison() {
  const [rival, setRival] = React.useState<RivalId>("hivedesk")
  const activeRival = RIVALS.find((r) => r.id === rival) ?? RIVALS[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ArrowRightLeft className="size-4" />
            </span>
            <span>Switchly</span>
          </a>
          <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <li>
              <a href="#compare" className="transition-colors hover:text-foreground">
                Comparison
              </a>
            </li>
            <li>
              <a href="#why" className="transition-colors hover:text-foreground">
                Why switch
              </a>
            </li>
            <li>
              <a href="#migrate" className="transition-colors hover:text-foreground">
                Migration
              </a>
            </li>
            <li>
              <a href="#proof" className="transition-colors hover:text-foreground">
                Customers
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" asChild={false}>
              <a href="#cta">Start free</a>
            </Button>
          </div>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.primary/0.12),transparent)]" />
          <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <ArrowRightLeft className="size-3.5" />
              Switchly vs {activeRival.label}
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Make the switch from {activeRival.label} in an afternoon
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-muted-foreground">
              Same workflows, none of the limits. See exactly how Switchly stacks
              up, then let our concierge move your data for free.
            </p>

            <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-1.5" asChild={false}>
                <a href="#cta">
                  Start your migration
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild={false}>
                <a href="#compare">See the full comparison</a>
              </Button>
            </div>

            <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t pt-8">
              {HERO_STATS.map((s) => (
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

        {/* Comparison table */}
        <section id="compare" className="scroll-mt-20 border-b bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Feature comparison
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Switchly vs the rest, line by line
              </h2>
              <p className="mt-3 text-muted-foreground">
                Pick a competitor to compare against. Every feature below is
                included on every Switchly plan.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-sm text-muted-foreground">
                Compare with:
              </span>
              {RIVALS.map((r) => (
                <Button
                  key={r.id}
                  size="sm"
                  variant={r.id === rival ? "default" : "outline"}
                  onClick={() => setRival(r.id)}
                  aria-pressed={r.id === rival}
                >
                  {r.label}
                </Button>
              ))}
            </div>

            <Card className="mt-8 overflow-hidden p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-card hover:bg-card">
                    <TableHead className="w-[46%] py-4 text-sm font-semibold text-foreground">
                      Feature
                    </TableHead>
                    <TableHead className="text-center py-4">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                        <ArrowRightLeft className="size-4" />
                        Switchly
                      </span>
                    </TableHead>
                    <TableHead className="text-center py-4 text-sm font-semibold text-foreground">
                      {activeRival.label}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPARISON.map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell className="py-4 align-top">
                        <div className="font-medium">{row.feature}</div>
                        <div className="mt-0.5 text-sm text-muted-foreground">
                          {row.hint}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-center align-middle">
                        <div className="flex justify-center">
                          <CellMark value={row.us} />
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-center align-middle">
                        <div className="flex justify-center">
                          <CellMark value={row.rivals[rival]} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Comparison reflects publicly listed plans as of this quarter.
            </p>
          </div>
        </section>

        {/* Why switch */}
        <section id="why" className="scroll-mt-20 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Why teams switch
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The reasons people never look back
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {REASONS.map((r) => (
                <Card key={r.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <r.icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-base">{r.title}</CardTitle>
                    <CardDescription>{r.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Migration steps */}
        <section id="migrate" className="scroll-mt-20 border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 gap-1.5">
                <Clock className="size-3.5" />
                Migration, handled
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Switching is four easy steps
              </h2>
              <p className="mt-3 text-muted-foreground">
                Our concierge does the heavy lifting. You just approve the move.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <div key={s.step} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <s.icon className="size-5" />
                    </span>
                    {i < STEPS.length - 1 && (
                      <Separator className="hidden flex-1 lg:block" />
                    )}
                  </div>
                  <div className="mt-5 text-xs font-semibold tracking-wider text-primary">
                    STEP {s.step}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="proof" className="scroll-mt-20 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                From the switchers
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Teams that already made the move
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex h-full flex-col">
                  <CardContent className="flex flex-1 flex-col">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="mt-4 size-6 text-muted-foreground/40" />
                    <p className="mt-2 flex-1 text-sm leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <Separator className="my-5" />
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10">
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
                    <Badge variant="secondary" className="mt-4 w-fit gap-1.5">
                      <ArrowRightLeft className="size-3" />
                      {t.from}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section id="cta" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6">
            <Card className="overflow-hidden border-primary/40 bg-primary/5">
              <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
                <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to leave {activeRival.label} behind?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Start free, keep your old tool running, and switch for good once
                  you see the difference. Migration is on us.
                </p>
                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
                  <Button size="lg" className="gap-1.5" asChild={false}>
                    <a href="#top">
                      Start free migration
                      <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild={false}>
                    <a href="#compare">Talk to migration team</a>
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  No credit card. Free concierge migration. Cancel anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <a href="#top" className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ArrowRightLeft className="size-4" />
              </span>
              <span>Switchly</span>
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="#compare" className="hover:text-foreground">
                Comparison
              </a>
              <a href="#migrate" className="hover:text-foreground">
                Migration
              </a>
              <a href="#proof" className="hover:text-foreground">
                Customers
              </a>
              <a href="#cta" className="hover:text-foreground">
                Pricing
              </a>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; 2026 Switchly, Inc. All rights reserved.</p>
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
