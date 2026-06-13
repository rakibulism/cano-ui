"use client"
import * as React from "react"
import { Check, X, Minus, Plus, Zap, TrendingUp, ShieldCheck, Sparkles, Rocket, ArrowRight, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/registry/ui/accordion"

type PlanId = "starter" | "growth" | "scale"

const PLANS: {
  id: PlanId
  name: string
  icon: React.ComponentType<{ className?: string }>
  tagline: string
  monthly: number
  includedSeats: number
  perSeat: number
  highlight?: boolean
  features: string[]
}[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    tagline: "For small teams getting off the ground.",
    monthly: 29,
    includedSeats: 3,
    perSeat: 8,
    features: ["Up to 10k events / mo", "Community support", "1 project workspace"],
  },
  {
    id: "growth",
    name: "Growth",
    icon: Rocket,
    tagline: "For scaling teams that need automation.",
    monthly: 99,
    includedSeats: 8,
    perSeat: 12,
    highlight: true,
    features: ["Up to 250k events / mo", "Priority support", "Unlimited workspaces", "Advanced analytics"],
  },
  {
    id: "scale",
    name: "Scale",
    icon: Sparkles,
    tagline: "For orgs with compliance and SLAs.",
    monthly: 249,
    includedSeats: 20,
    perSeat: 18,
    features: ["Unlimited events", "Dedicated success manager", "SSO & SAML", "Custom contracts"],
  },
]

const COMPARISON: { feature: string; values: Record<PlanId, string | boolean> }[] = [
  { feature: "Monthly events", values: { starter: "10k", growth: "250k", scale: "Unlimited" } },
  { feature: "Team seats included", values: { starter: "3", growth: "8", scale: "20" } },
  { feature: "Advanced analytics", values: { starter: false, growth: true, scale: true } },
  { feature: "Automation workflows", values: { starter: false, growth: true, scale: true } },
  { feature: "SSO & SAML", values: { starter: false, growth: false, scale: true } },
  { feature: "Audit logs", values: { starter: false, growth: true, scale: true } },
  { feature: "SLA guarantee", values: { starter: false, growth: "99.5%", scale: "99.99%" } },
  { feature: "Support", values: { starter: "Community", growth: "Priority", scale: "Dedicated" } },
]

const FAQ = [
  { q: "How is my monthly estimate calculated?", a: "Your estimate combines the base plan price with any seats beyond the included allowance, billed at the per-seat rate. Switching to annual applies a 20% discount across the year." },
  { q: "Can I change plans later?", a: "Yes. Upgrades take effect immediately and downgrades apply at the start of your next billing cycle. We prorate the difference automatically." },
  { q: "What counts as an event?", a: "An event is any tracked action your application sends to our pipeline, such as a page view, API call, or custom trigger." },
  { q: "Do you offer a free trial?", a: "Every plan includes a 14-day free trial with full feature access. No credit card required to start." },
]

const ANNUAL_DISCOUNT = 0.2
const MIN_SEATS = 1
const MAX_SEATS = 50

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US")
}

export default function PricingCalculatorPage() {
  const [annual, setAnnual] = React.useState(false)
  const [seats, setSeats] = React.useState(8)
  const [selected, setSelected] = React.useState<PlanId>("growth")

  const plan = PLANS.find((p) => p.id === selected)!

  const extraSeats = Math.max(0, seats - plan.includedSeats)
  const monthlyRaw = plan.monthly + extraSeats * plan.perSeat
  const effectiveMonthly = annual ? monthlyRaw * (1 - ANNUAL_DISCOUNT) : monthlyRaw
  const annualTotal = monthlyRaw * 12 * (1 - ANNUAL_DISCOUNT)
  const annualSavings = monthlyRaw * 12 - annualTotal

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Meterly</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#calculator" className="transition-colors hover:text-foreground">Calculator</a>
            <a href="#plans" className="transition-colors hover:text-foreground">Plans</a>
            <a href="#compare" className="transition-colors hover:text-foreground">Compare</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Start free trial</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-10 text-center sm:px-6">
          <Badge variant="secondary" className="mb-4 gap-1">
            <Sparkles className="h-3 w-3" /> Usage-based pricing
          </Badge>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Pricing that scales with your team
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Build your plan with the calculator below. Adjust seats, switch billing, and see your estimate update instantly.
          </p>
        </section>

        <section id="calculator" className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
          <Card className="overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-5">
              <div className="space-y-8 p-6 sm:p-8 lg:col-span-3">
                <div>
                  <Label className="text-sm font-medium">Billing cycle</Label>
                  <div className="mt-3 inline-flex rounded-lg border bg-muted/30 p-1">
                    <button
                      type="button"
                      onClick={() => setAnnual(false)}
                      className={cn(
                        "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                        !annual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnnual(true)}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                        annual ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Annual
                      <Badge variant="default" className="px-1.5 py-0 text-[10px]">-20%</Badge>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Team seats</Label>
                    <span className="text-sm text-muted-foreground">
                      {plan.includedSeats} included &middot; {fmt(plan.perSeat)}/extra seat
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Decrease seats"
                      onClick={() => setSeats((s) => Math.max(MIN_SEATS, s - 1))}
                      disabled={seats <= MIN_SEATS}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <div className="text-3xl font-bold tabular-nums">{seats}</div>
                      <div className="text-xs text-muted-foreground">seats</div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Increase seats"
                      onClick={() => setSeats((s) => Math.min(MAX_SEATS, s + 1))}
                      disabled={seats >= MAX_SEATS}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[3, 8, 20, 50].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSeats(preset)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          seats === preset
                            ? "border-primary bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {preset} seats
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Selected plan</Label>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {PLANS.map((p) => {
                      const Icon = p.icon
                      const active = p.id === selected
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setSelected(p.id)}
                          className={cn(
                            "flex items-center gap-2 rounded-lg border p-3 text-left transition-colors",
                            active ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                          )}
                        >
                          <span className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-md",
                            active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-medium">{p.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between border-t bg-muted/30 p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Your estimate</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight tabular-nums">{fmt(effectiveMonthly)}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  {annual && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {fmt(annualTotal)} billed annually
                    </p>
                  )}
                  <Separator className="my-5" />
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{plan.name} base</dt>
                      <dd className="font-medium tabular-nums">{fmt(plan.monthly)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">{extraSeats} extra seat{extraSeats === 1 ? "" : "s"}</dt>
                      <dd className="font-medium tabular-nums">{fmt(extraSeats * plan.perSeat)}</dd>
                    </div>
                    {annual && (
                      <div className="flex justify-between text-primary">
                        <dt>Annual discount</dt>
                        <dd className="font-medium tabular-nums">-{fmt(monthlyRaw * ANNUAL_DISCOUNT)}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="lg">
                    Start with {plan.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">14-day free trial &middot; no card required</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section id="plans" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Choose your plan</h2>
            <p className="mt-2 text-muted-foreground">The calculator highlights your current selection.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p) => {
              const Icon = p.icon
              const active = p.id === selected
              const price = annual ? Math.round(p.monthly * (1 - ANNUAL_DISCOUNT)) : p.monthly
              return (
                <Card
                  key={p.id}
                  className={cn(
                    "relative flex flex-col transition-shadow",
                    active ? "border-primary shadow-lg ring-1 ring-primary" : "hover:shadow-md"
                  )}
                >
                  {p.highlight && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                  )}
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">{p.name}</CardTitle>
                    <CardDescription>{p.tagline}</CardDescription>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight tabular-nums">{fmt(price)}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Includes {p.includedSeats} seats, then {fmt(p.perSeat)}/seat
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2.5 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={active ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelected(p.id)}
                    >
                      {active ? "Selected" : "Select " + p.name}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="grid items-center gap-6 p-8 md:grid-cols-3">
              <div className="flex items-center gap-4 md:col-span-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Save {fmt(annualSavings)} a year with annual billing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Teams on the {plan.name} plan recover an average of 9 hours per week through automation, paying for the subscription many times over.
                  </p>
                </div>
              </div>
              <div className="flex md:justify-end">
                <Button size="lg" variant={annual ? "outline" : "default"} onClick={() => setAnnual(true)} className="w-full md:w-auto">
                  Switch to annual
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="compare" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Compare every feature</h2>
            <p className="mt-2 text-muted-foreground">Your selected plan is highlighted across the table.</p>
          </div>
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-medium text-muted-foreground">Feature</th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      className={cn(
                        "p-4 text-center font-semibold",
                        p.id === selected && "bg-primary/5 text-primary"
                      )}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-4 text-left text-muted-foreground">{row.feature}</td>
                    {PLANS.map((p) => {
                      const v = row.values[p.id]
                      return (
                        <td
                          key={p.id}
                          className={cn("p-4 text-center", p.id === selected && "bg-primary/5")}
                        >
                          {typeof v === "boolean" ? (
                            v ? (
                              <Check className="mx-auto h-4 w-4 text-primary" />
                            ) : (
                              <X className="mx-auto h-4 w-4 text-muted-foreground/40" />
                            )
                          ) : (
                            <span className="font-medium">{v}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "SOC 2 Type II", body: "Enterprise-grade security audited annually." },
              { icon: Zap, title: "99.99% uptime", body: "Backed by financially guaranteed SLAs." },
              { icon: HelpCircle, title: "Human support", body: "Real engineers, average reply under 2 hours." },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-xl border bg-card p-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={"item-" + i}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Ready to build your plan?</h2>
              <p className="max-w-md text-primary-foreground/80">
                Start your 14-day free trial today. Configure seats and billing anytime as your team grows.
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary">Start free trial</Button>
                <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  Talk to sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Zap className="h-3 w-3" />
            </div>
            <span>&copy; 2026 Meterly, Inc.</span>
          </div>
          <nav className="flex gap-6">
            <a href="#plans" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
