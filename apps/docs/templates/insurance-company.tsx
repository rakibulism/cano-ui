"use client"

import * as React from "react"
import {
  Shield,
  Car,
  Home,
  HeartPulse,
  Activity,
  Phone,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  Star,
  Users,
  Award,
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
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

type QuoteType = "auto" | "home" | "life" | "health"

const QUOTE_TABS: { id: QuoteType; label: string; icon: React.ElementType }[] = [
  { id: "auto", label: "Auto", icon: Car },
  { id: "home", label: "Home", icon: Home },
  { id: "life", label: "Life", icon: HeartPulse },
  { id: "health", label: "Health", icon: Activity },
]

type Plan = {
  name: string
  price: string
  cadence: string
  blurb: string
  features: string[]
  featured?: boolean
}

const PLANS: Record<QuoteType, Plan[]> = {
  auto: [
    {
      name: "Essential Drive",
      price: "$39",
      cadence: "/mo",
      blurb: "Liability coverage for everyday commuters.",
      features: ["Bodily injury liability", "Property damage", "Roadside basics"],
    },
    {
      name: "Full Cover",
      price: "$72",
      cadence: "/mo",
      blurb: "Collision + comprehensive with zero hassle claims.",
      features: ["Collision & comprehensive", "Rental reimbursement", "24/7 roadside", "Glass repair"],
      featured: true,
    },
    {
      name: "Premier Auto",
      price: "$118",
      cadence: "/mo",
      blurb: "Maximum protection for new and luxury vehicles.",
      features: ["New car replacement", "Gap coverage", "Accident forgiveness", "Concierge claims"],
    },
  ],
  home: [
    {
      name: "Dwelling Basic",
      price: "$48",
      cadence: "/mo",
      blurb: "Core structure protection for homeowners.",
      features: ["Dwelling coverage", "Personal liability", "Fire & theft"],
    },
    {
      name: "Home Shield",
      price: "$89",
      cadence: "/mo",
      blurb: "Structure, belongings, and living expenses combined.",
      features: ["Replacement cost", "Personal property", "Loss of use", "Water backup"],
      featured: true,
    },
    {
      name: "Estate Guard",
      price: "$156",
      cadence: "/mo",
      blurb: "High-value homes with extended coverage limits.",
      features: ["Extended dwelling", "Scheduled valuables", "Identity theft", "Service line"],
    },
  ],
  life: [
    {
      name: "Term 20",
      price: "$24",
      cadence: "/mo",
      blurb: "Affordable term coverage for growing families.",
      features: ["$250k payout", "Level premiums", "Convertible policy"],
    },
    {
      name: "Whole Life",
      price: "$96",
      cadence: "/mo",
      blurb: "Lifelong protection that builds cash value.",
      features: ["Lifetime coverage", "Cash value growth", "Fixed premiums", "Living benefits"],
      featured: true,
    },
    {
      name: "Universal Plus",
      price: "$142",
      cadence: "/mo",
      blurb: "Flexible premiums with investment upside.",
      features: ["Adjustable coverage", "Investment options", "Tax-deferred growth", "Estate planning"],
    },
  ],
  health: [
    {
      name: "Bronze Care",
      price: "$62",
      cadence: "/mo",
      blurb: "Catastrophic protection with low premiums.",
      features: ["Preventive care", "Emergency coverage", "Generic Rx"],
    },
    {
      name: "Silver Wellness",
      price: "$148",
      cadence: "/mo",
      blurb: "Balanced cost-sharing for individuals and families.",
      features: ["Primary & specialist", "Lower deductible", "Mental health", "Telehealth included"],
      featured: true,
    },
    {
      name: "Gold Complete",
      price: "$268",
      cadence: "/mo",
      blurb: "Comprehensive low out-of-pocket coverage.",
      features: ["Minimal copays", "Brand-name Rx", "Vision & dental", "Global coverage"],
    },
  ],
}

const STATS = [
  { icon: Users, value: "2.4M", label: "Policyholders protected" },
  { icon: Award, value: "A+", label: "Financial strength rating" },
  { icon: Clock, value: "48 hrs", label: "Average claim payout" },
  { icon: Shield, value: "$9.6B", label: "Claims paid last year" },
]

const STEPS = [
  {
    icon: Phone,
    title: "Report your claim",
    desc: "File online or call our 24/7 line. It takes under five minutes to get started.",
  },
  {
    icon: FileText,
    title: "Submit the details",
    desc: "Upload photos and documents. A dedicated adjuster is assigned the same day.",
  },
  {
    icon: CheckCircle2,
    title: "Get reviewed",
    desc: "We assess your claim transparently and keep you updated every step of the way.",
  },
  {
    icon: Clock,
    title: "Receive payout",
    desc: "Approved claims are paid in as little as 48 hours, direct to your account.",
  },
]

const FAQS = [
  {
    q: "How quickly can I get a quote?",
    a: "Most quotes are generated instantly online. Choose a coverage type, answer a few questions, and you'll see personalized pricing in under two minutes.",
  },
  {
    q: "Can I bundle multiple policies?",
    a: "Yes. Bundling auto, home, and life policies can save you up to 25%. Our advisors will automatically apply every discount you qualify for.",
  },
  {
    q: "What happens if I need to file a claim?",
    a: "You can file anytime through our app, website, or 24/7 phone line. A dedicated adjuster guides you from first notice to final payout.",
  },
  {
    q: "Are there discounts available?",
    a: "We offer safe-driver, multi-policy, loyalty, and paperless discounts, along with seasonal promotions for new members.",
  },
  {
    q: "Can I cancel or change my plan later?",
    a: "Absolutely. You can adjust coverage, switch plans, or cancel at any time with no hidden fees through your member dashboard.",
  },
]

const NAV_LINKS = ["Coverage", "Claims", "About", "Resources", "Contact"]

export default function InsuranceCompanyPage() {
  const [quoteType, setQuoteType] = React.useState<QuoteType>("auto")
  const activePlans = PLANS[quoteType]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Sentinel</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Get a quote</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-4 w-fit gap-1">
                <Star className="h-3 w-3" /> Rated 4.9 by 80,000+ members
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Insurance that pays out when it matters most.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Personalized coverage for your car, home, life, and health, backed by
                lightning-fast claims and real human support.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" className="gap-2">
                  Start my quote <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Talk to an advisor
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No obligation. Cancel anytime.
              </div>
            </div>

            <Card className="self-center shadow-sm">
              <CardHeader>
                <CardTitle>Build your quote</CardTitle>
                <CardDescription>Pick a coverage type to see matching plans.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {QUOTE_TABS.map((tab) => {
                    const Icon = tab.icon
                    const active = quoteType === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setQuoteType(tab.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-sm font-medium transition-colors",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "bg-card text-muted-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
                <div className="rounded-lg border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">Recommended plan</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {activePlans.find((p) => p.featured)?.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    from{" "}
                    <span className="font-semibold text-foreground">
                      {activePlans.find((p) => p.featured)?.price}
                    </span>
                    {activePlans.find((p) => p.featured)?.cadence}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  See my plans <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-12 sm:px-6 lg:grid-cols-4 lg:gap-8">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-3xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 flex flex-col items-center text-center">
            <Badge variant="outline" className="mb-3 capitalize">
              {quoteType} coverage
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight">Compare {quoteType} plans</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Transparent pricing, no surprises. Switch coverage types above to explore other
              options.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {activePlans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col",
                  plan.featured && "border-primary shadow-sm ring-1 ring-primary"
                )}
              >
                {plan.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.blurb}</CardDescription>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.cadence}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <Separator className="mb-4" />
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                  >
                    Choose {plan.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-12 max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight">Claims made simple</h2>
              <p className="mt-3 text-muted-foreground">
                A clear, four-step process designed to get you back on your feet fast.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm font-medium text-muted-foreground">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to know before you get covered. Still have questions?
            </p>
            <Button variant="outline" className="mt-6 gap-2">
              <Phone className="h-4 w-4" /> Contact support
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <Card className="overflow-hidden border-primary bg-primary text-primary-foreground">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">
                  Ready to protect what matters? Get covered in minutes.
                </h2>
                <p className="max-w-xl text-primary-foreground/80">
                  Join millions who trust Sentinel for fast claims, fair pricing, and coverage
                  that actually shows up.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Start my quote <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Talk to an advisor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-semibold tracking-tight">Sentinel</span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Modern insurance for life's unexpected moments. Coverage you can count on.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Coverage</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["Auto", "Home", "Life", "Health"].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["About us", "Careers", "Press", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Support</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["File a claim", "Help center", "Privacy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2025 Sentinel Insurance Group. All rights reserved.</p>
            <p>Licensed in all 50 states · NAIC #80432</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
