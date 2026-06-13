"use client"

import * as React from "react"
import { ArrowRight, Check, Menu, Star, Zap } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/ui/accordion"

const features = [
  ["Ship in minutes", "Drop-in components and a CLI that wires up everything for you."],
  ["Own your code", "Source lands in your repo. Edit it, extend it, no lock-in."],
  ["Accessible by default", "Keyboard, focus, and screen-reader support out of the box."],
  ["Dark mode", "Every surface and token adapts to light and dark automatically."],
  ["Type-safe", "Strict TypeScript across every component and prop."],
  ["Composable", "Small primitives that snap together into anything."],
]

const metrics = [
  ["12k+", "Projects shipped"],
  ["99.98%", "Uptime"],
  ["4.9/5", "Average rating"],
  ["60+", "Components"],
]

const tiers = [
  { name: "Hobby", price: "$0", note: "For side projects", features: ["2 projects", "Community support", "Core components"], cta: "Start free" },
  { name: "Pro", price: "$24", note: "For growing teams", features: ["Unlimited projects", "Email support", "All components", "Themes"], cta: "Start Pro", featured: true },
  { name: "Team", price: "$96", note: "For organizations", features: ["SSO & audit log", "Priority support", "Design reviews", "SLA"], cta: "Contact sales" },
]

const faqs = [
  ["Is it really free?", "The Hobby tier is free forever. Paid tiers add unlimited projects and support."],
  ["Do I own the code?", "Yes — components are copied into your project as source. There is no runtime dependency."],
  ["Can I cancel anytime?", "Of course. Plans are month-to-month with no commitment."],
]

function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Zap className="size-3.5" />
      </span>
      Northwind
    </span>
  )
}

export default function SaasLanding() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="max-sm:hidden">Sign in</Button>
            <Button size="sm">Get started</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <Badge variant="secondary" className="mb-5 gap-1.5">
            <Star className="size-3.5" /> New: v2 is here
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            The fastest way to build a polished product
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Beautiful, accessible components and a CLI that does the wiring.
            Ship a production-grade interface this afternoon.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">Start building <ArrowRight /></Button>
            <Button size="lg" variant="outline">Book a demo</Button>
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["Acme", "Globex", "Initech", "Umbrella", "Soylent"].map((c) => (
              <span key={c} className="text-lg font-semibold tracking-tight">{c}</span>
            ))}
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden px-6 py-16 sm:grid-cols-4">
            {metrics.map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-semibold tracking-tight tabular-nums">{value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-6xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Everything you need</h2>
            <p className="mt-3 text-muted-foreground">A complete toolkit, nothing you don't.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, body]) => (
              <Card key={title}>
                <CardContent className="pt-6">
                  <div className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Check className="size-4.5" />
                  </div>
                  <h3 className="mt-4 font-medium">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-t bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Simple pricing</h2>
              <p className="mt-3 text-muted-foreground">Start free. Upgrade when you grow.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {tiers.map((tier) => (
                <Card key={tier.name} className={cn(tier.featured && "border-primary shadow-md")}>
                  <CardContent className="flex flex-col gap-5 pt-6">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{tier.name}</span>
                        {tier.featured ? <Badge>Popular</Badge> : null}
                      </div>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-3xl font-semibold tracking-tight">{tier.price}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{tier.note}</p>
                    </div>
                    <Button variant={tier.featured ? "default" : "outline"}>{tier.cta}</Button>
                    <ul className="flex flex-col gap-2 text-sm">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="size-4 text-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-2xl px-6 py-24">
          <h2 className="text-center text-3xl font-semibold tracking-tight">Questions</h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="border-t">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-24 text-center">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance">
              Ready to ship something great?
            </h2>
            <div className="flex gap-3">
              <Button size="lg">Get started free <ArrowRight /></Button>
              <Button size="lg" variant="outline">Talk to sales</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <Logo />
          <span>© 2026 Northwind, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
