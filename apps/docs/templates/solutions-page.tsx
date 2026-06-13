"use client"

import * as React from "react"
import {
  ShoppingBag,
  HeartPulse,
  Landmark,
  GraduationCap,
  ArrowRight,
  Check,
  Quote,
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  Workflow,
  Plug,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type IndustryKey = "retail" | "healthcare" | "finance" | "education"

const INDUSTRIES: {
  key: IndustryKey
  label: string
  icon: React.ComponentType<{ className?: string }>
  tagline: string
  headline: string
  description: string
  benefits: string[]
  metrics: { value: string; label: string }[]
  useCases: { title: string; copy: string }[]
}[] = [
  {
    key: "retail",
    label: "Retail",
    icon: ShoppingBag,
    tagline: "For modern commerce teams",
    headline: "Turn every shopper into a repeat customer",
    description:
      "Unify storefront, inventory, and loyalty data so your team can act on demand signals before they cool off.",
    benefits: [
      "Real-time inventory across every channel",
      "Personalized promotions that convert",
      "One profile per shopper, everywhere",
      "Forecasting that reduces overstock",
    ],
    metrics: [
      { value: "32%", label: "Higher repeat purchase rate" },
      { value: "1.8x", label: "Faster fulfillment cycles" },
      { value: "$4.2M", label: "Recovered from lost carts" },
    ],
    useCases: [
      { title: "Omnichannel loyalty", copy: "Reward shoppers consistently online and in-store with a single ledger." },
      { title: "Smart replenishment", copy: "Auto-trigger restock orders from live sell-through data." },
      { title: "Dynamic pricing", copy: "Adjust offers by region, season, and customer segment." },
    ],
  },
  {
    key: "healthcare",
    label: "Healthcare",
    icon: HeartPulse,
    tagline: "For care delivery organizations",
    headline: "Coordinate care without the busywork",
    description:
      "Connect patient records, scheduling, and billing in one compliant workspace so clinicians spend more time on care.",
    benefits: [
      "HIPAA-ready data handling by default",
      "Unified patient timeline for every visit",
      "Automated eligibility and claims checks",
      "Secure messaging across care teams",
    ],
    metrics: [
      { value: "41%", label: "Less admin time per patient" },
      { value: "99.9%", label: "Uptime for clinical workflows" },
      { value: "26%", label: "Fewer no-show appointments" },
    ],
    useCases: [
      { title: "Care coordination", copy: "Route tasks across providers with a shared patient view." },
      { title: "Revenue cycle", copy: "Catch claim errors before submission to speed reimbursement." },
      { title: "Patient outreach", copy: "Send compliant reminders and follow-ups automatically." },
    ],
  },
  {
    key: "finance",
    label: "Finance",
    icon: Landmark,
    tagline: "For banks and fintech teams",
    headline: "Move money with confidence and control",
    description:
      "Bring risk, compliance, and customer operations onto one platform with the audit trails regulators expect.",
    benefits: [
      "Built-in audit logs for every action",
      "Real-time fraud and anomaly alerts",
      "Configurable approval workflows",
      "SOC 2 and PCI-aligned controls",
    ],
    metrics: [
      { value: "67%", label: "Faster fraud resolution" },
      { value: "3.4x", label: "Quicker onboarding for clients" },
      { value: "0", label: "Reportable compliance gaps" },
    ],
    useCases: [
      { title: "KYC automation", copy: "Verify identities and screen risk in a single guided flow." },
      { title: "Transaction monitoring", copy: "Flag suspicious activity with explainable rules." },
      { title: "Audit readiness", copy: "Export immutable trails for any reporting window." },
    ],
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
    tagline: "For schools and learning platforms",
    headline: "Help every learner reach their potential",
    description:
      "Give educators a clear view of progress, engagement, and outcomes so support reaches students at the right moment.",
    benefits: [
      "Early-warning signals for at-risk students",
      "Unified gradebook and engagement data",
      "Accessible by design for all learners",
      "Parent and guardian communication tools",
    ],
    metrics: [
      { value: "29%", label: "Improvement in completion rates" },
      { value: "12hrs", label: "Saved per educator weekly" },
      { value: "94%", label: "Student satisfaction score" },
    ],
    useCases: [
      { title: "Progress tracking", copy: "Spot struggling learners early with blended signals." },
      { title: "Curriculum insights", copy: "See which lessons drive engagement and outcomes." },
      { title: "Family updates", copy: "Keep guardians informed with automated progress notes." },
    ],
  },
]

const FEATURES = [
  { icon: Workflow, title: "Tailored workflows", copy: "Pre-built flows mapped to how your industry actually operates." },
  { icon: ShieldCheck, title: "Enterprise security", copy: "SOC 2 Type II, encryption at rest, and granular access controls." },
  { icon: Zap, title: "Fast time-to-value", copy: "Launch in weeks with guided onboarding and migration support." },
  { icon: BarChart3, title: "Outcome analytics", copy: "Dashboards that translate activity into the metrics you report on." },
  { icon: Plug, title: "Open integrations", copy: "Connect the tools you already use with first-class APIs." },
  { icon: Sparkles, title: "AI assistance", copy: "Summaries, suggestions, and automations across every module." },
]

const INTEGRATIONS = ["Salesforce", "Stripe", "Slack", "Workday", "Snowflake", "Okta", "Zendesk", "HubSpot"]

const QUOTES: Record<IndustryKey, { quote: string; name: string; role: string }> = {
  retail: {
    quote: "We finally see the whole customer journey in one place. Our loyalty revenue jumped within a single quarter.",
    name: "Maya Chen",
    role: "VP Commerce, Northfield Goods",
  },
  healthcare: {
    quote: "Clinicians spend less time fighting software and more time with patients. That is the win we needed.",
    name: "Dr. Omar Reyes",
    role: "CMIO, Brightpath Health",
  },
  finance: {
    quote: "Audit prep used to take weeks. Now the trail is always there. Our examiners noticed the difference.",
    name: "Priya Nair",
    role: "Head of Compliance, Meridian Bank",
  },
  education: {
    quote: "Our advisors reach students before they fall behind. Completion rates have climbed every term since.",
    name: "James Whitfield",
    role: "Dean of Students, Lakeside College",
  },
}

export default function SolutionsPage() {
  const [active, setActive] = React.useState<IndustryKey>("retail")
  const current = INDUSTRIES.find((i) => i.key === active) ?? INDUSTRIES[0]
  const quote = QUOTES[active]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Workflow className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Atlas Cloud</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#solutions" className="transition-colors hover:text-foreground">Solutions</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#customers" className="transition-colors hover:text-foreground">Customers</a>
            <a href="#integrations" className="transition-colors hover:text-foreground">Integrations</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Request demo</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 text-center md:py-28">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Built for your industry
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              One platform, shaped to the way your industry works
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
              Atlas Cloud adapts to your sector with tailored workflows, security, and analytics. Choose your industry to see how teams like yours move faster.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2">
                Explore solutions <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">Talk to sales</Button>
            </div>
          </div>
        </section>

        <section id="solutions" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Solutions by industry</h2>
            <p className="mt-2 text-muted-foreground">Switch industries to see tailored benefits, metrics, and use-cases.</p>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Select industry">
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon
              const selected = industry.key === active
              return (
                <button
                  key={industry.key}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(industry.key)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {industry.label}
                </button>
              )
            })}
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-primary">{current.tagline}</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{current.headline}</h3>
              <p className="mt-3 text-pretty text-muted-foreground">{current.description}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {current.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <Button className="gap-2">
                  See the {current.label} solution <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                {current.metrics.map((metric) => (
                  <Card key={metric.label} className="bg-muted/30">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-semibold tracking-tight md:text-3xl">{metric.value}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="grid gap-3">
                {current.useCases.map((useCase) => (
                  <Card key={useCase.title}>
                    <CardContent className="flex items-start gap-3 p-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                        <current.icon className="h-4 w-4 text-foreground" />
                      </span>
                      <div>
                        <div className="text-sm font-medium">{useCase.title}</div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{useCase.copy}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Everything you need, on one platform</h2>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
                The same trusted core powers every industry solution, so you never trade flexibility for depth.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="bg-card transition-shadow hover:shadow-sm">
                    <CardContent className="p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{feature.copy}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="customers" className="mx-auto w-full max-w-4xl px-6 py-16 md:py-20">
          <Card className="bg-card">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-8 w-8 text-primary" />
              <blockquote className="mt-5 text-balance text-xl font-medium leading-relaxed md:text-2xl">
                {quote.quote}
              </blockquote>
              <div className="mt-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {quote.name.split(" ").map((part) => part[0]).join("")}
                </span>
                <div>
                  <div className="text-sm font-semibold">{quote.name}</div>
                  <div className="text-sm text-muted-foreground">{quote.role}</div>
                </div>
                <Badge variant="outline" className="ml-auto gap-1.5">
                  <current.icon className="h-3.5 w-3.5" />
                  {current.label}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="integrations" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
            <div className="mb-8 text-center">
              <p className="text-sm font-medium text-muted-foreground">Connects with the tools you already trust</p>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {INTEGRATIONS.map((name) => (
                <div key={name} className="flex items-center justify-center gap-2 bg-card px-4 py-8 text-sm font-medium text-muted-foreground">
                  <Plug className="h-4 w-4" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
          <Card className="overflow-hidden border-primary/20 bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center md:p-14">
              <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">
                Ready to see Atlas Cloud built for {current.label.toLowerCase()}?
              </h2>
              <p className="max-w-xl text-pretty text-primary-foreground/80">
                Get a personalized walkthrough with an industry specialist and see your workflows come to life.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" className="gap-2">
                  Book a demo <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  Contact sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Workflow className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold">Atlas Cloud</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="#solutions" className="transition-colors hover:text-foreground">Solutions</a>
              <a href="#features" className="transition-colors hover:text-foreground">Features</a>
              <a href="#customers" className="transition-colors hover:text-foreground">Customers</a>
              <a href="#integrations" className="transition-colors hover:text-foreground">Integrations</a>
            </nav>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">© 2024 Atlas Cloud, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
