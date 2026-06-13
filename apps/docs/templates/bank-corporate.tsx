"use client"

import * as React from "react"
import {
  Landmark,
  ShieldCheck,
  Lock,
  Smartphone,
  CreditCard,
  TrendingUp,
  Building2,
  PiggyBank,
  User,
  ArrowRight,
  Check,
  Star,
  Globe,
  Fingerprint,
  Bell,
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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

type ProductKey = "personal" | "business" | "savings" | "cards"

const PRODUCTS: Record<
  ProductKey,
  {
    label: string
    icon: React.ComponentType<{ className?: string }>
    tagline: string
    headline: string
    blurb: string
    rate: string
    rateLabel: string
    features: string[]
  }
> = {
  personal: {
    label: "Personal",
    icon: User,
    tagline: "Everyday banking",
    headline: "Banking that moves at your speed",
    blurb:
      "A fee-free checking account with instant transfers, smart budgeting, and round-the-clock support.",
    rate: "0%",
    rateLabel: "Monthly account fee",
    features: [
      "No minimum balance, ever",
      "Instant peer-to-peer transfers",
      "Automatic spend categorization",
      "Early paycheck up to 2 days sooner",
    ],
  },
  business: {
    label: "Business",
    icon: Building2,
    tagline: "Built for founders",
    headline: "The operating account for ambitious teams",
    blurb:
      "Multi-user access, automated invoicing, and integrated payroll designed for growing companies.",
    rate: "1.5%",
    rateLabel: "Cashback on operations",
    features: [
      "Unlimited team member seats",
      "Automated invoicing & reconciliation",
      "Native payroll and contractor pay",
      "Real-time cash-flow forecasting",
    ],
  },
  savings: {
    label: "Savings",
    icon: PiggyBank,
    tagline: "Grow your money",
    headline: "A high-yield account that works while you rest",
    blurb:
      "Earn one of the highest rates available with zero lock-ups and automatic round-up deposits.",
    rate: "4.30%",
    rateLabel: "Annual percentage yield",
    features: [
      "4.30% APY, no tiers or caps",
      "Round-up savings on every purchase",
      "Create unlimited goal vaults",
      "Withdraw anytime, no penalties",
    ],
  },
  cards: {
    label: "Cards",
    icon: CreditCard,
    tagline: "Spend smarter",
    headline: "Cards with rewards and control built in",
    blurb:
      "Issue virtual and metal cards instantly, set granular limits, and earn rewards on every swipe.",
    rate: "3%",
    rateLabel: "Rewards on top categories",
    features: [
      "Instant virtual card issuance",
      "Freeze and set limits per card",
      "Up to 3% rewards on spend",
      "Premium metal card option",
    ],
  },
}

const TRUST_STATS = [
  { value: "$48B", label: "Assets safeguarded" },
  { value: "3.2M", label: "Active customers" },
  { value: "256-bit", label: "End-to-end encryption" },
  { value: "99.99%", label: "Platform uptime" },
]

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Biometric security",
    desc: "Face and fingerprint sign-in with hardware-backed key storage on every device.",
  },
  {
    icon: ShieldCheck,
    title: "FDIC insured",
    desc: "Deposits protected up to $250,000 through our member-bank network.",
  },
  {
    icon: Smartphone,
    title: "Award-winning app",
    desc: "Manage everything in seconds with a top-rated mobile experience.",
  },
  {
    icon: Globe,
    title: "Spend worldwide",
    desc: "Zero foreign transaction fees in 150+ countries and currencies.",
  },
  {
    icon: Bell,
    title: "Real-time alerts",
    desc: "Instant notifications the moment money moves in or out.",
  },
  {
    icon: Lock,
    title: "Fraud protection",
    desc: "AI monitoring flags suspicious activity before it reaches you.",
  },
]

const FEE_ROWS = [
  { label: "Monthly maintenance", cano: "$0", legacy: "$12" },
  { label: "Domestic transfers", cano: "Free", legacy: "$25" },
  { label: "ATM withdrawals", cano: "Free", legacy: "$3.50" },
  { label: "Foreign transaction fee", cano: "0%", legacy: "3%" },
  { label: "Overdraft charge", cano: "$0", legacy: "$35" },
]

const TESTIMONIALS = [
  {
    quote:
      "Switching took ten minutes and I have not paid a single fee since. The budgeting tools alone are worth it.",
    name: "Amara Okafor",
    role: "Product Designer",
    img: "https://i.pravatar.cc/120?img=47",
  },
  {
    quote:
      "Running payroll for the whole team straight from our operating account changed how we manage cash flow.",
    name: "Daniel Reyes",
    role: "Founder, Northwind Labs",
    img: "https://i.pravatar.cc/120?img=12",
  },
  {
    quote:
      "The savings vaults keep me on track and the 4.30% APY beats everything my old bank offered.",
    name: "Sofia Lindqvist",
    role: "Freelance Architect",
    img: "https://i.pravatar.cc/120?img=32",
  },
]

const PRODUCT_ORDER: ProductKey[] = [
  "personal",
  "business",
  "savings",
  "cards",
]

export default function BankCorporatePage() {
  const [active, setActive] = React.useState<ProductKey>("personal")
  const product = PRODUCTS[active]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Landmark className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Meridian
            </span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            <a href="#products" className="transition-colors hover:text-foreground">
              Products
            </a>
            <a href="#security" className="transition-colors hover:text-foreground">
              Security
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#stories" className="transition-colors hover:text-foreground">
              Stories
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Open account</Button>
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
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <ShieldCheck className="size-3.5" />
                FDIC insured to $250,000
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Modern banking,
                <span className="text-primary"> built on trust</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Open a fee-free account in minutes, earn 4.30% on your savings,
                and bank securely from anywhere in the world.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Open your account
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Explore products
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {TESTIMONIALS.map((t) => (
                    <Avatar key={t.name} className="size-8 border-2 border-background">
                      <AvatarImage src={t.img} alt="" />
                      <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>Joined by 3.2M+ customers</span>
              </div>
            </div>

            {/* App / card mockup */}
            <div className="relative mx-auto w-full max-w-sm">
              <Card className="overflow-hidden border-primary/20 shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total balance
                    </span>
                    <Badge variant="outline" className="gap-1">
                      <TrendingUp className="size-3" />
                      +2.4%
                    </Badge>
                  </div>
                  <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                    $24,580.50
                  </p>
                  {/* Card visual */}
                  <div className="mt-5 rounded-xl bg-primary p-5 text-primary-foreground">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium opacity-90">
                        Meridian
                      </span>
                      <CreditCard className="size-5 opacity-90" />
                    </div>
                    <p className="mt-8 font-mono text-lg tracking-widest">
                      4821 •••• •••• 9034
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs opacity-90">
                      <span>A. OKAFOR</span>
                      <span>12 / 28</span>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      { name: "Direct deposit", amt: "+$3,200.00", up: true },
                      { name: "Whole Foods", amt: "-$86.40", up: false },
                      { name: "Savings round-up", amt: "+$12.75", up: true },
                    ].map((row) => (
                      <div
                        key={row.name}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">{row.name}</span>
                        <span
                          className={cn(
                            "font-medium tabular-nums",
                            row.up ? "text-primary" : "text-foreground"
                          )}
                        >
                          {row.amt}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust stats */}
        <section id="security" className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-10 sm:px-6 lg:grid-cols-4">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="px-2 text-center">
                <p className="text-3xl font-semibold tracking-tight tabular-nums">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product selector */}
        <section id="products" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              One account, every way to bank
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Choose the product that fits how you move money. Switch anytime
              from a single dashboard.
            </p>
          </div>

          <div className="mt-9 flex justify-center">
            <Tabs
              value={active}
              onValueChange={(v) => setActive(v as ProductKey)}
            >
              <TabsList className="h-auto flex-wrap gap-1 p-1">
                {PRODUCT_ORDER.map((key) => {
                  const Icon = PRODUCTS[key].icon
                  return (
                    <TabsTrigger key={key} value={key} className="gap-1.5 px-4 py-2">
                      <Icon className="size-4" />
                      {PRODUCTS[key].label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-4">
                {product.tagline}
              </Badge>
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {product.headline}
              </h3>
              <p className="mt-3 text-muted-foreground">{product.blurb}</p>
              <ul className="mt-6 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-7 gap-2">
                Get {product.label}
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardDescription>{product.rateLabel}</CardDescription>
                <CardTitle className="text-5xl font-semibold tracking-tight tabular-nums">
                  {product.rate}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Separator className="mb-5" />
                <div className="grid grid-cols-2 gap-4">
                  {product.features.slice(0, 4).map((f, i) => (
                    <div
                      key={f}
                      className="rounded-lg border bg-background p-3 text-sm"
                    >
                      <span className="text-xs font-medium text-muted-foreground">
                        Included {i + 1}
                      </span>
                      <p className="mt-1 font-medium leading-snug">{f}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features grid */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Security you can feel, features you will love
              </h2>
              <p className="mt-3 text-muted-foreground">
                Bank-grade protection paired with the tools that make managing
                money effortless.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <Card key={f.title} className="bg-background">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-lg">{f.title}</CardTitle>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Fees comparison */}
        <section id="pricing" className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Stop paying for banking
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              See how much you save compared to a typical legacy bank.
            </p>
          </div>

          <Card className="mt-10 overflow-hidden">
            <div className="grid grid-cols-3 border-b bg-muted/40 px-6 py-4 text-sm font-medium">
              <span className="text-muted-foreground">Fee</span>
              <span className="text-center text-primary">Meridian</span>
              <span className="text-center text-muted-foreground">
                Legacy bank
              </span>
            </div>
            {FEE_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={cn(
                  "grid grid-cols-3 items-center px-6 py-4 text-sm",
                  i !== FEE_ROWS.length - 1 && "border-b"
                )}
              >
                <span className="font-medium">{row.label}</span>
                <span className="text-center">
                  <Badge variant="secondary" className="font-semibold">
                    {row.cano}
                  </Badge>
                </span>
                <span className="text-center text-muted-foreground line-through">
                  {row.legacy}
                </span>
              </div>
            ))}
          </Card>
        </section>

        {/* Testimonials */}
        <section id="stories" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
              Trusted by millions of people
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="bg-background">
                  <CardContent className="pt-6">
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open-account CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Open your account in 5 minutes
                </h2>
                <p className="mt-3 max-w-md opacity-90">
                  No paperwork, no branch visits, no fees. Just enter your email
                  and we will guide you the rest of the way.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    aria-label="Email address"
                    className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
                  />
                  <Button variant="secondary" className="shrink-0 gap-2">
                    Get started
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
                <p className="mt-3 text-xs opacity-75">
                  By continuing you agree to our terms and privacy policy.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {TRUST_STATS.slice(0, 3).map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-primary-foreground/10 p-4"
                  >
                    <p className="text-2xl font-semibold tabular-nums">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs opacity-80">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Landmark className="size-4" />
                </div>
                <span className="font-semibold">Meridian</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Modern banking built on trust. Member FDIC.
              </p>
            </div>
            {[
              { title: "Products", links: ["Personal", "Business", "Savings", "Cards"] },
              { title: "Company", links: ["About", "Careers", "Press", "Blog"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security", "Disclosures"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium">{col.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-foreground">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Meridian Bank. All rights reserved.</p>
            <p>FDIC insured · Equal Housing Lender</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
