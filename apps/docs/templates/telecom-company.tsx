"use client"

import * as React from "react"
import {
  Signal,
  Wifi,
  Building2,
  Smartphone,
  Phone,
  Check,
  MapPin,
  Zap,
  ShieldCheck,
  Globe2,
  Gauge,
  Headphones,
  MessageSquare,
  Store,
  Star,
  ArrowRight,
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
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type Plan = {
  name: string
  price: string
  unit: string
  tagline: string
  features: string[]
  highlight?: boolean
}

const PLAN_SETS: Record<string, { label: string; blurb: string; plans: Plan[] }> = {
  mobile: {
    label: "Unlimited mobile, built for the everyday",
    blurb: "5G plans with no contracts and free hotspot data on every line.",
    plans: [
      {
        name: "Essential",
        price: "$25",
        unit: "/mo per line",
        tagline: "Great for light users",
        features: ["Unlimited talk & text", "15GB premium 5G", "5GB mobile hotspot"],
      },
      {
        name: "Unlimited Plus",
        price: "$45",
        unit: "/mo per line",
        tagline: "Most popular",
        features: ["Truly unlimited 5G", "50GB premium data", "30GB hotspot", "HD streaming"],
        highlight: true,
      },
      {
        name: "Premium Max",
        price: "$65",
        unit: "/mo per line",
        tagline: "For power users",
        features: ["Unlimited premium 5G", "100GB hotspot", "4K UHD streaming", "Global roaming"],
      },
    ],
  },
  home: {
    label: "Home internet that just works",
    blurb: "Fiber-fast speeds with no data caps and a price locked for 3 years.",
    plans: [
      {
        name: "Fiber 300",
        price: "$45",
        unit: "/mo",
        tagline: "Stream & browse",
        features: ["300 Mbps download", "Unlimited data", "Free Wi-Fi router"],
      },
      {
        name: "Fiber Gig",
        price: "$65",
        unit: "/mo",
        tagline: "Most popular",
        features: ["1 Gbps symmetrical", "Unlimited data", "Whole-home mesh Wi-Fi", "Free install"],
        highlight: true,
      },
      {
        name: "Fiber 2 Gig",
        price: "$95",
        unit: "/mo",
        tagline: "Whole-home power",
        features: ["2 Gbps symmetrical", "Unlimited data", "Pro mesh system", "Priority support"],
      },
    ],
  },
  business: {
    label: "Connectivity that scales with your business",
    blurb: "Dedicated bandwidth, fleet lines, and a 99.99% uptime SLA.",
    plans: [
      {
        name: "Team",
        price: "$35",
        unit: "/line/mo",
        tagline: "Up to 10 lines",
        features: ["Unlimited business 5G", "100GB pooled hotspot", "Priority network access"],
      },
      {
        name: "Pro Fleet",
        price: "$55",
        unit: "/line/mo",
        tagline: "Most popular",
        features: ["Unlimited premium 5G", "Pooled data & lines", "Mobile device management", "24/7 priority"],
        highlight: true,
      },
      {
        name: "Enterprise",
        price: "Custom",
        unit: "pricing",
        tagline: "100+ lines",
        features: ["Dedicated bandwidth", "99.99% uptime SLA", "Account manager", "Private APN"],
      },
    ],
  },
  prepaid: {
    label: "No credit check, no surprises",
    blurb: "Pay as you go with plans you can change or cancel any month.",
    plans: [
      {
        name: "Starter",
        price: "$15",
        unit: "/mo",
        tagline: "Light & flexible",
        features: ["Unlimited talk & text", "5GB high-speed data", "No contract"],
      },
      {
        name: "Value",
        price: "$30",
        unit: "/mo",
        tagline: "Most popular",
        features: ["Unlimited talk & text", "25GB high-speed data", "10GB hotspot", "No contract"],
        highlight: true,
      },
      {
        name: "Max",
        price: "$50",
        unit: "/mo",
        tagline: "Unlimited everything",
        features: ["Unlimited 5G data", "20GB hotspot", "Calls to 60 countries", "No contract"],
      },
    ],
  },
}

const PLAN_TABS = [
  { key: "mobile", label: "Mobile", icon: Smartphone },
  { key: "home", label: "Home internet", icon: Wifi },
  { key: "business", label: "Business", icon: Building2 },
  { key: "prepaid", label: "Prepaid", icon: Phone },
] as const

const COVERAGE_STATS = [
  { value: "99.7%", label: "Nationwide 5G coverage" },
  { value: "340M", label: "People in our footprint" },
  { value: "1.2 Gbps", label: "Peak download speed" },
  { value: "<10ms", label: "Average network latency" },
]

const FEATURES = [
  { icon: Zap, title: "Real 5G everywhere", body: "Next-gen 5G across cities, suburbs, and 99% of interstates." },
  { icon: ShieldCheck, title: "Scam & spam shield", body: "Built-in call screening blocks robocalls before they ring." },
  { icon: Globe2, title: "Global roaming", body: "Stay connected in 215+ countries with no daily fees." },
  { icon: Gauge, title: "Network-first speeds", body: "Priority data keeps you fast even when towers get busy." },
]

const SUPPORT = [
  { icon: Headphones, title: "24/7 phone support", body: "Talk to a real person any hour, any day.", cta: "Call us" },
  { icon: MessageSquare, title: "Live chat", body: "Average reply under two minutes.", cta: "Start chat" },
  { icon: Store, title: "1,800+ stores", body: "Find a location near you for hands-on help.", cta: "Find a store" },
]

const TESTIMONIALS = [
  {
    quote: "Switched the whole family and cut our bill in half. Coverage at the cabin is finally usable.",
    name: "Dana Whitfield",
    role: "Family of four",
    img: "https://i.pravatar.cc/120?img=32",
  },
  {
    quote: "Our field crews never drop a call now. The pooled business lines are a game changer.",
    name: "Marcus Lee",
    role: "Ops lead, BuildRight",
    img: "https://i.pravatar.cc/120?img=12",
  },
  {
    quote: "Home fiber install was free and the gig speed is exactly what they promised. No caps, ever.",
    name: "Priya Nair",
    role: "Remote designer",
    img: "https://i.pravatar.cc/120?img=45",
  },
]

export default function TelecomCompanyPage() {
  const [activeTab, setActiveTab] = React.useState<string>("mobile")
  const current = PLAN_SETS[activeTab]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Signal className="size-4" />
            </span>
            <span className="text-lg tracking-tight">Novacell</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#plans" className="transition-colors hover:text-foreground">Plans</a>
            <a href="#network" className="transition-colors hover:text-foreground">Network</a>
            <a href="#coverage" className="transition-colors hover:text-foreground">Coverage</a>
            <a href="#support" className="transition-colors hover:text-foreground">Support</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Shop plans</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Zap className="size-3.5" /> New: Unlimited 5G, locked for 3 years
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                The network that keeps up with your life.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Unlimited 5G, home fiber, and business plans on a network engineered for
                speed and reliability. No contracts. No surprises.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Build your plan <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <MapPin className="size-4" /> Check coverage
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="border-primary/20 bg-card/70 shadow-sm backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="size-5 text-primary" /> Live network status
                  </CardTitle>
                  <CardDescription>Your area, updated continuously</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Download", value: "942 Mbps", w: "94%" },
                    { label: "Upload", value: "318 Mbps", w: "62%" },
                    { label: "Signal strength", value: "Excellent", w: "88%" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-medium">{row.value}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: row.w }} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Coverage stat band */}
          <div className="border-t bg-muted/30">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border px-4 sm:px-6 lg:grid-cols-4">
              {COVERAGE_STATS.map((s, i) => (
                <div key={s.label} className={cn("px-2 py-6 text-center", i >= 2 && "border-t lg:border-t-0")}>
                  <div className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section id="plans" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Find the right plan</h2>
            <p className="mt-3 text-muted-foreground">{current.blurb}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8 items-center">
            <TabsList className="h-auto flex-wrap justify-center gap-1 p-1">
              {PLAN_TABS.map((t) => (
                <TabsTrigger key={t.key} value={t.key} className="gap-1.5 px-4 py-2">
                  <t.icon className="size-4" /> {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <p className="mt-6 text-center text-sm font-medium text-muted-foreground">{current.label}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {current.plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col transition-shadow",
                  plan.highlight ? "border-primary shadow-md ring-1 ring-primary/20" : "hover:shadow-sm"
                )}
              >
                {plan.highlight && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">{plan.tagline}</Badge>
                )}
                <CardHeader>
                  {!plan.highlight && (
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {plan.tagline}
                    </span>
                  )}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.unit}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                    Choose {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Network features */}
        <section id="network" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Engineered to stay connected</h2>
              <p className="mt-3 text-muted-foreground">
                A network built from the ground up for the way you actually use it.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <Card key={f.title} className="bg-card">
                  <CardHeader>
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <f.icon className="size-5" />
                    </span>
                    <CardTitle className="mt-3 text-lg">{f.title}</CardTitle>
                    <CardDescription>{f.body}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage map teaser */}
        <section id="coverage" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4 gap-1.5">
                <MapPin className="size-3.5" /> Coverage map
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Coast-to-coast, and everywhere in between
              </h2>
              <p className="mt-4 text-muted-foreground">
                See live 5G, 4G LTE, and home fiber availability at your exact address before you
                commit. Most homes are eligible for next-day activation.
              </p>
              <form
                className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input placeholder="Enter your ZIP code" aria-label="ZIP code" className="bg-card" />
                <Button type="submit" className="gap-2">
                  Check <ArrowRight className="size-4" />
                </Button>
              </form>
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                {[
                  { c: "bg-primary", t: "5G Ultra" },
                  { c: "bg-primary/50", t: "5G" },
                  { c: "bg-muted-foreground/30", t: "4G LTE" },
                ].map((l) => (
                  <span key={l.t} className="flex items-center gap-2 text-muted-foreground">
                    <span className={cn("size-3 rounded-full", l.c)} /> {l.t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted/30">
              <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:32px_32px] opacity-60" />
              <div className="absolute left-[18%] top-[24%] size-28 rounded-full bg-primary/20 blur-xl" />
              <div className="absolute right-[20%] top-[40%] size-36 rounded-full bg-primary/25 blur-xl" />
              <div className="absolute bottom-[18%] left-[40%] size-24 rounded-full bg-primary/15 blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-2 rounded-full border bg-card/90 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
                  <MapPin className="size-4 text-primary" /> 99.7% of the U.S. covered
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section id="support" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Help, your way</h2>
              <p className="mt-3 text-muted-foreground">
                Real support from real people, however you like to reach us.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {SUPPORT.map((s) => (
                <Card key={s.title} className="bg-card text-center">
                  <CardHeader className="items-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <s.icon className="size-6" />
                    </span>
                    <CardTitle className="mt-2 text-lg">{s.title}</CardTitle>
                    <CardDescription>{s.body}</CardDescription>
                  </CardHeader>
                  <CardFooter className="justify-center">
                    <Button variant="link" className="gap-1">
                      {s.cta} <ArrowRight className="size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by millions</h2>
            <p className="mt-3 text-muted-foreground">
              Rated 4.7 out of 5 across more than 80,000 reviews.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="bg-card">
                <CardContent className="pt-6">
                  <div className="mb-3 flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={t.img} alt="" />
                      <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Sign-up CTA */}
        <section className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Ready to switch? It takes minutes.
                  </h2>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Keep your number, bring your phone, and we&rsquo;ll handle the rest. Activation
                    is always free.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {["No contracts or hidden fees", "Free SIM and shipping", "30-day money-back guarantee"].map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="size-4 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <form
                  className="space-y-3 rounded-xl border bg-card p-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input placeholder="First name" aria-label="First name" />
                    <Input placeholder="Last name" aria-label="Last name" />
                  </div>
                  <Input type="email" placeholder="Email address" aria-label="Email address" />
                  <Input placeholder="ZIP code" aria-label="ZIP code" />
                  <Button type="submit" className="w-full gap-2" size="lg">
                    Get started <ArrowRight className="size-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    By continuing you agree to our terms and privacy policy.
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Signal className="size-4" />
                </span>
                Novacell
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                The next-generation network for mobile, home, and business.
              </p>
            </div>
            {[
              { h: "Plans", items: ["Mobile", "Home internet", "Business", "Prepaid"] },
              { h: "Company", items: ["About", "Network", "Careers", "Newsroom"] },
              { h: "Support", items: ["Help center", "Coverage map", "Contact", "Stores"] },
            ].map((col) => (
              <div key={col.h}>
                <h3 className="text-sm font-semibold">{col.h}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="transition-colors hover:text-foreground">{it}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; 2026 Novacell Communications. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
