"use client"

import * as React from "react"
import {
  ShieldCheck,
  Lock,
  Wallet,
  TrendingUp,
  PiggyBank,
  ArrowRight,
  Check,
  X,
  Star,
  Apple,
  Smartphone,
  CreditCard,
  Zap,
  BarChart3,
  Globe,
  Menu,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

const navLinks = ["Features", "Security", "Pricing", "Reviews"]

const trustBadges = [
  { icon: ShieldCheck, label: "Bank-grade encryption" },
  { icon: Lock, label: "FDIC insured to $250k" },
  { icon: Globe, label: "PCI-DSS Level 1" },
  { icon: Zap, label: "Real-time fraud alerts" },
]

const features = [
  {
    icon: Wallet,
    title: "Smart spending",
    body: "Auto-categorized transactions and instant insights into where every dollar goes.",
  },
  {
    icon: PiggyBank,
    title: "Round-up savings",
    body: "Round purchases to the nearest dollar and watch your savings vault grow on autopilot.",
  },
  {
    icon: TrendingUp,
    title: "Invest from $1",
    body: "Build a diversified portfolio with fractional shares and commission-free trades.",
  },
  {
    icon: BarChart3,
    title: "Budget goals",
    body: "Set monthly limits per category and get nudged before you overspend.",
  },
  {
    icon: CreditCard,
    title: "Virtual cards",
    body: "Spin up disposable card numbers for safer online checkouts in one tap.",
  },
  {
    icon: Zap,
    title: "Instant transfers",
    body: "Send and receive money in seconds, 24/7, with no hidden wire fees.",
  },
]

const feeRows = [
  { feature: "Monthly account fee", us: "$0", a: "$12", b: "$8" },
  { feature: "ATM withdrawal", us: "Free", a: "$3.00", b: "$2.50" },
  { feature: "Foreign transactions", us: "0%", a: "3%", b: "2.5%" },
  { feature: "Overdraft penalty", us: "$0", a: "$35", b: "$28" },
  { feature: "Stock trade commission", us: "$0", a: "$6.95", b: "$4.95" },
]

const testimonials = [
  {
    name: "Maya Okonkwo",
    handle: "@mayabuilds",
    avatar: "https://i.pravatar.cc/120?img=47",
    quote:
      "Switched my whole paycheck over in a weekend. The round-up vault hit $400 before I even noticed.",
  },
  {
    name: "Daniel Reyes",
    handle: "@dreyes",
    avatar: "https://i.pravatar.cc/120?img=12",
    quote:
      "Zero foreign fees saved me a fortune on my last trip. The fraud alert caught a bad charge in seconds.",
  },
  {
    name: "Priya Nair",
    handle: "@priyanair",
    avatar: "https://i.pravatar.cc/120?img=32",
    quote:
      "Finally an app where investing and budgeting live in one place. The goal tracker actually keeps me honest.",
  },
]

const stats = [
  { value: "2.4M+", label: "Active members" },
  { value: "$9.1B", label: "Moved monthly" },
  { value: "4.9", label: "App store rating" },
  { value: "0", label: "Hidden fees" },
]

export default function FintechLanding() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wallet className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Nventa</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">Open account</Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="size-5" />
          </Button>
        </nav>
        {menuOpen && (
          <div className="border-t px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link}
                </a>
              ))}
              <Button size="sm" className="mt-2 w-full">
                Open account
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col gap-6">
              <Badge variant="secondary" className="w-fit gap-1.5">
                <Zap className="size-3.5" /> New: instant payouts in 30 seconds
              </Badge>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Banking that grows your money, not your fees.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Spend, save, and invest from one beautiful app. No monthly
                charges, no surprises, just full control of your finances.
              </p>
              <form
                className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  aria-label="Email address"
                />
                <Button type="submit" size="lg" className="shrink-0">
                  Get early access
                  <ArrowRight className="size-4" />
                </Button>
              </form>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {testimonials.map((t) => (
                    <Avatar key={t.name} className="size-7 border-2 border-background">
                      <AvatarImage src={t.avatar} alt="" />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>Joined by 2.4M+ members</span>
              </div>
            </div>

            {/* Card mock */}
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />
              <div className="w-full max-w-sm rotate-2 transition-transform hover:rotate-0">
                <div className="aspect-[1.6/1] rounded-2xl bg-primary p-6 text-primary-foreground shadow-2xl">
                  <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium opacity-90">Nventa</span>
                      <Wallet className="size-6 opacity-90" />
                    </div>
                    <div className="size-9 rounded-md bg-primary-foreground/20" />
                    <div className="space-y-3">
                      <p className="font-mono text-lg tracking-widest">
                        4821 •••• •••• 9034
                      </p>
                      <div className="flex items-center justify-between text-sm opacity-90">
                        <span>A. MORGAN</span>
                        <span>12/29</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Card className="-mt-6 ml-6 mr-0 max-w-[14rem] translate-y-4 shadow-xl">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <TrendingUp className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">+$1,284.50</p>
                      <p className="text-xs text-muted-foreground">
                        Savings this month
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <b.icon className="size-5 shrink-0 text-primary" />
                <span className="text-sm font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Money management
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to master your money
            </h2>
            <p className="mt-4 text-muted-foreground">
              One account that handles spending, saving, and investing so you
              never juggle five apps again.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="size-5" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fees comparison */}
        <section className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Transparent pricing
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              See what you stop paying
            </h2>
            <p className="mt-4 text-muted-foreground">
              The fees traditional banks bury in fine print are simply gone here.
            </p>
          </div>
          <Card className="mt-12 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-2/5">Fee</TableHead>
                  <TableHead className="text-center">
                    <span className="font-semibold text-primary">Nventa</span>
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    Legacy Bank A
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    Legacy Bank B
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeRows.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                        <Check className="size-4" />
                        {row.us}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <X className="size-4 text-destructive" />
                        {row.a}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <X className="size-4 text-destructive" />
                        {row.b}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4">
                Loved by members
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Trusted by millions to handle their money
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name}>
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={t.avatar} alt="" />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.handle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* App store CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-8 p-10 text-center lg:flex-row lg:p-14 lg:text-left">
              <div className="flex-1 space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Your new bank fits in your pocket
                </h2>
                <p className="max-w-md text-muted-foreground">
                  Open an account in under 3 minutes. No paperwork, no branch
                  visits, no minimum balance.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-start">
                  <Button size="lg" className="gap-2">
                    <Apple className="size-5" />
                    <span className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-normal opacity-80">
                        Download on the
                      </span>
                      <span className="text-sm font-semibold">App Store</span>
                    </span>
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Smartphone className="size-5" />
                    <span className="flex flex-col items-start leading-none">
                      <span className="text-[10px] font-normal opacity-70">
                        Get it on
                      </span>
                      <span className="text-sm font-semibold">Google Play</span>
                    </span>
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border bg-card p-5 shadow-sm">
                <div className="flex size-14 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Wallet className="size-7" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="mt-1 text-2xl font-semibold">4.9 / 5</p>
                  <p className="text-xs text-muted-foreground">
                    180k+ ratings worldwide
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Wallet className="size-4" />
                </div>
                <span className="font-semibold">Nventa</span>
              </div>
              <p className="max-w-xs text-sm text-muted-foreground">
                Modern banking for people who want their money to work harder.
              </p>
            </div>
            {[
              { title: "Product", items: ["Spending", "Savings", "Invest", "Cards"] },
              { title: "Company", items: ["About", "Careers", "Press", "Blog"] },
              { title: "Legal", items: ["Privacy", "Terms", "Security", "Disclosures"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-sm font-semibold">{col.title}</p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Nventa Financial, Inc. Member FDIC.</p>
            <p className="flex items-center gap-2">
              <Lock className="size-3.5" /> Insured & encrypted end-to-end
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
