"use client"

import * as React from "react"
import {
  ArrowRight,
  Droplets,
  GraduationCap,
  Hand,
  HandHeart,
  Heart,
  Megaphone,
  Quote,
  Sprout,
  Users,
  Utensils,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const NAV = ["Mission", "Programs", "Donate", "Get Involved"]

const STATS = [
  { value: "2.4M", label: "Meals served" },
  { value: "180+", label: "Communities reached" },
  { value: "94%", label: "Goes to programs" },
  { value: "12K", label: "Active volunteers" },
]

const PROGRAMS = [
  {
    icon: Utensils,
    title: "Food Security",
    body: "Hot meals and grocery support for families facing hunger across the region.",
  },
  {
    icon: Droplets,
    title: "Clean Water",
    body: "Building wells and filtration systems so every village has safe drinking water.",
  },
  {
    icon: GraduationCap,
    title: "Education Access",
    body: "Scholarships, supplies, and safe classrooms for children who would otherwise miss school.",
  },
  {
    icon: Sprout,
    title: "Sustainable Farming",
    body: "Training smallholder farmers in resilient, climate-smart growing practices.",
  },
]

const WAYS = [
  {
    icon: HandHeart,
    title: "Give Monthly",
    body: "Become a sustaining member and fuel year-round programs with a recurring gift.",
    cta: "Start giving",
  },
  {
    icon: Hand,
    title: "Volunteer",
    body: "Lend your time on the ground or remotely. Every skill helps move the mission forward.",
    cta: "Find a role",
  },
  {
    icon: Megaphone,
    title: "Fundraise",
    body: "Rally your friends, run a campaign, and multiply your impact in your own community.",
    cta: "Launch a page",
  },
]

const PARTNERS = ["Brightside", "Evergreen Trust", "Northwind", "Lumina", "Harborline", "Civic Fund"]

const PRESETS = [25, 50, 100, 250]

export default function NonprofitOrg() {
  const [amount, setAmount] = React.useState<number | null>(50)
  const [custom, setCustom] = React.useState("")

  const selectPreset = (value: number) => {
    setAmount(value)
    setCustom("")
  }

  const onCustom = (value: string) => {
    setCustom(value.replace(/[^0-9]/g, ""))
    setAmount(null)
  }

  const effective = amount ?? (custom ? Number(custom) : 0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Heart className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Open Hands</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <Button size="sm" className="gap-1.5">
            <Heart className="h-4 w-4" />
            Donate
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:py-28">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5">
                <Sprout className="h-3.5 w-3.5" />
                Spring relief campaign is live
              </Badge>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Small acts of giving, lasting change.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                We partner with local communities to deliver food, clean water, and
                education where it is needed most. Your gift goes further than you think.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Donate now
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Our mission
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-3xl bg-primary/10" />
              <Card className="absolute -bottom-6 left-6 w-56 shadow-lg">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xl font-bold leading-none">180+</p>
                    <p className="text-xs text-muted-foreground">communities served</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact stat band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="aspect-square w-full rounded-3xl bg-accent" />
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our mission
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Dignity, opportunity, and hope for every community.
              </h2>
              <p className="text-muted-foreground">
                For over a decade we have worked shoulder to shoulder with local leaders
                to build solutions that last. We believe lasting change is led by the
                people closest to the problem, and our job is to resource them well.
              </p>
              <figure className="rounded-2xl border bg-muted/30 p-6">
                <Quote className="h-6 w-6 text-primary" />
                <blockquote className="mt-3 text-base font-medium">
                  The well changed everything. Our children no longer walk three hours
                  for water, they walk to school instead.
                </blockquote>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  Amara K., community partner in Kibera
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Programs grid */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Where your support goes
              </h2>
              <p className="mt-3 text-muted-foreground">
                Four focused programs, each designed with the community and measured for
                real, reported outcomes.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAMS.map((program) => (
                <Card key={program.title} className="h-full">
                  <CardContent className="space-y-3 p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <program.icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-lg font-semibold">{program.title}</h3>
                    <p className="text-sm text-muted-foreground">{program.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Donation selector */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Make a gift
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Choose an amount, change a life.
              </h2>
              <p className="text-muted-foreground">
                Every dollar is stretched as far as it can go. A gift of $50 provides a
                month of clean water for a family of five.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["$25 feeds a child for a week", "$100 stocks a classroom", "$250 funds a community well"].map(
                  (line) => (
                    <li key={line} className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      {line}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <Card className="shadow-sm">
              <CardContent className="space-y-6 p-6 sm:p-8">
                <div className="flex rounded-full bg-muted p-1 text-sm font-medium">
                  <button className="flex-1 rounded-full bg-background py-2 shadow-sm">
                    One-time
                  </button>
                  <button className="flex-1 rounded-full py-2 text-muted-foreground">
                    Monthly
                  </button>
                </div>

                <div>
                  <p className="mb-3 text-sm font-medium">Select an amount</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => selectPreset(preset)}
                        aria-pressed={amount === preset}
                        className={cn(
                          "rounded-xl border py-3 text-base font-semibold transition-colors",
                          amount === preset
                            ? "border-primary bg-primary/10 text-primary"
                            : "bg-background hover:bg-accent",
                        )}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Or enter a custom amount</p>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      inputMode="numeric"
                      value={custom}
                      onChange={(e) => onCustom(e.target.value)}
                      placeholder="Other amount"
                      className="pl-7"
                      aria-label="Custom donation amount"
                    />
                  </div>
                </div>

                <Button size="lg" className="w-full gap-2" disabled={effective <= 0}>
                  <Heart className="h-4 w-4" />
                  {effective > 0 ? `Donate $${effective}` : "Donate"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Secure payment. Your gift is tax-deductible.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Ways to help */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                More ways to help
              </h2>
              <p className="mt-3 text-muted-foreground">
                Giving is one path. Here are three more ways to be part of the change.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {WAYS.map((way) => (
                <Card key={way.title} className="h-full">
                  <CardContent className="flex h-full flex-col items-start gap-4 p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <way.icon className="h-6 w-6" />
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{way.title}</h3>
                      <p className="text-sm text-muted-foreground">{way.body}</p>
                    </div>
                    <Button variant="link" className="mt-auto h-auto gap-1 p-0">
                      {way.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partners strip */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Proudly supported by partners who believe in lasting change
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PARTNERS.map((partner) => (
              <span key={partner} className="text-lg font-semibold tracking-tight text-muted-foreground">
                {partner}
              </span>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Your generosity writes someone&apos;s better tomorrow.
            </h2>
            <p className="max-w-xl text-primary-foreground/80">
              Join thousands of donors who give what they can, when they can. Together it
              adds up to something extraordinary.
            </p>
            <Button size="lg" variant="secondary" className="gap-2">
              Become a donor
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Heart className="h-4 w-4" />
              </span>
              <span className="font-semibold">Open Hands</span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              A registered nonprofit building lasting change with communities since 2012.
            </p>
          </div>
          {[
            { title: "Programs", links: ["Food Security", "Clean Water", "Education", "Farming"] },
            { title: "Get Involved", links: ["Donate", "Volunteer", "Fundraise", "Partner"] },
            { title: "About", links: ["Our Story", "Impact Reports", "Careers", "Contact"] },
          ].map((col) => (
            <div key={col.title} className="space-y-3">
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Open Hands Foundation. EIN 00-0000000.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Financials</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
