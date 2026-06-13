"use client"

import * as React from "react"
import {
  Check,
  Minus,
  Sparkles,
  Zap,
  Building2,
  ArrowRight,
  ShieldCheck,
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV_LINKS = ["Product", "Solutions", "Pricing", "Docs", "Company"]

type Tier = {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  monthly: number
  annual: number
  featured: boolean
  cta: string
  features: string[]
}

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Sparkles,
    description: "For individuals shipping their first projects.",
    monthly: 12,
    annual: 9,
    featured: false,
    cta: "Start for free",
    features: [
      "Up to 3 projects",
      "1 team member",
      "Community support",
      "5 GB storage",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Zap,
    description: "For growing teams that need power and speed.",
    monthly: 32,
    annual: 26,
    featured: true,
    cta: "Start 14-day trial",
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "Priority email support",
      "100 GB storage",
      "Advanced analytics",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    description: "For organizations with advanced security needs.",
    monthly: 88,
    annual: 72,
    featured: false,
    cta: "Contact sales",
    features: [
      "Everything in Pro",
      "Unlimited members",
      "Dedicated success manager",
      "SSO & SAML",
      "Custom SLA",
    ],
  },
]

type CompareRow = {
  label: string
  starter: string | boolean
  pro: string | boolean
  enterprise: string | boolean
}

const COMPARE_ROWS: CompareRow[] = [
  { label: "Projects", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { label: "Team members", starter: "1", pro: "10", enterprise: "Unlimited" },
  { label: "Storage", starter: "5 GB", pro: "100 GB", enterprise: "1 TB+" },
  { label: "Advanced analytics", starter: false, pro: true, enterprise: true },
  { label: "API access", starter: false, pro: true, enterprise: true },
  { label: "SSO & SAML", starter: false, pro: false, enterprise: true },
  { label: "Audit logs", starter: false, pro: false, enterprise: true },
  { label: "Dedicated support", starter: false, pro: false, enterprise: true },
]

const FAQS = [
  {
    q: "Can I change plans at any time?",
    a: "Yes. You can upgrade, downgrade, or cancel your plan at any moment from your billing settings. Changes take effect immediately and we prorate the difference automatically.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Every paid plan includes a 14-day free trial with full access to all features. No credit card is required to get started.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, as well as ACH transfers and invoicing for annual Enterprise contracts.",
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Yes. Switching to annual billing saves you roughly 20% compared to paying month to month across all plans.",
  },
  {
    q: "What happens to my data if I cancel?",
    a: "Your data remains accessible in a read-only state for 30 days after cancellation, giving you ample time to export everything you need.",
  },
]

function CompareCell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-primary" aria-label="Included" />
    ) : (
      <Minus
        className="mx-auto size-4 text-muted-foreground"
        aria-label="Not included"
      />
    )
  }
  return <span className="text-sm text-foreground">{value}</span>
}

export default function SaasPricingPage() {
  const [annual, setAnnual] = React.useState(true)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Plated</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className={cn(
                  "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  link === "Pricing" && "text-foreground"
                )}
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Get started</Button>
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
        <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
          <Badge variant="secondary" className="mb-4">
            Simple, transparent pricing
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Pricing that scales with your team
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Start free and upgrade as you grow. No hidden fees, no surprises —
            cancel any time with a single click.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium transition-colors",
                !annual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={annual}
              onCheckedChange={setAnnual}
              aria-label="Toggle annual billing"
            />
            <Label
              htmlFor="billing-toggle"
              className={cn(
                "text-sm font-medium transition-colors",
                annual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Annual
            </Label>
            <Badge variant="outline" className="ml-1 text-primary">
              Save 20%
            </Badge>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => {
              const price = annual ? tier.annual : tier.monthly
              const Icon = tier.icon
              return (
                <Card
                  key={tier.id}
                  className={cn(
                    "relative flex flex-col",
                    tier.featured && "border-primary shadow-lg"
                  )}
                >
                  {tier.featured && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        ${price}
                      </span>
                      <span className="pb-1 text-sm text-muted-foreground">
                        / user / mo
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {annual
                        ? "Billed annually"
                        : "Billed monthly"}
                    </p>
                    <Separator className="my-5" />
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={tier.featured ? "default" : "outline"}
                    >
                      {tier.cta}
                      <ArrowRight className="size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Compare all features
              </h2>
              <p className="mt-2 text-muted-foreground">
                A detailed look at what each plan includes.
              </p>
            </div>
            <Card className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Feature</TableHead>
                    <TableHead className="text-center">Starter</TableHead>
                    <TableHead className="text-center">Pro</TableHead>
                    <TableHead className="text-center">Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPARE_ROWS.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell className="font-medium">{row.label}</TableCell>
                      <TableCell className="text-center">
                        <CompareCell value={row.starter} />
                      </TableCell>
                      <TableCell className="text-center">
                        <CompareCell value={row.pro} />
                      </TableCell>
                      <TableCell className="text-center">
                        <CompareCell value={row.enterprise} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need to know about billing and plans.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <ShieldCheck className="size-10" />
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready to get started?
              </h2>
              <p className="max-w-md text-sm text-primary-foreground/90">
                Join thousands of teams building faster with Plated. Try it free
                for 14 days — no credit card required.
              </p>
              <Button size="lg" variant="secondary" className="mt-2">
                Start your free trial
                <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </div>
            <span className="font-medium text-foreground">Plated</span>
            <span>© 2026 All rights reserved.</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
