"use client"

import * as React from "react"
import {
  Zap,
  Gauge,
  Users,
  BatteryCharging,
  Wind,
  ShieldCheck,
  Cpu,
  Navigation,
  MapPin,
  ArrowRight,
  ChevronRight,
  Menu,
  Sparkles,
  CircleDot,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = ["Models", "Technology", "Charging", "Build", "Locations"]

type Model = {
  id: string
  name: string
  tagline: string
  price: string
  range: string
  zeroToSixty: string
  seats: string
  topSpeed: string
  accent: string
}

const MODELS: Model[] = [
  {
    id: "sedan",
    name: "Volt S",
    tagline: "The executive sedan, reimagined as pure electric motion.",
    price: "$58,900",
    range: "412 mi",
    zeroToSixty: "3.1 s",
    seats: "5",
    topSpeed: "155 mph",
    accent: "Aerodynamic. Silent. Relentless.",
  },
  {
    id: "suv",
    name: "Terra X",
    tagline: "Family-sized capability with a zero-emission heart.",
    price: "$64,500",
    range: "386 mi",
    zeroToSixty: "3.8 s",
    seats: "7",
    topSpeed: "149 mph",
    accent: "Room for everyone. Range for anywhere.",
  },
  {
    id: "truck",
    name: "Haul EV",
    tagline: "Work-grade torque without a drop of fuel.",
    price: "$72,200",
    range: "340 mi",
    zeroToSixty: "4.2 s",
    seats: "6",
    topSpeed: "130 mph",
    accent: "Tows 11,000 lbs. Charges overnight.",
  },
  {
    id: "sport",
    name: "Apex R",
    tagline: "A track weapon disguised as a road car.",
    price: "$118,000",
    range: "298 mi",
    zeroToSixty: "1.9 s",
    seats: "2",
    topSpeed: "201 mph",
    accent: "Instant torque. No apologies.",
  },
]

const FEATURES = [
  {
    icon: BatteryCharging,
    title: "800V Architecture",
    description: "Add 200 miles of range in under 15 minutes at any DC fast charger.",
  },
  {
    icon: Cpu,
    title: "Autonomy Suite",
    description: "12 cameras and edge AI deliver hands-free highway driving.",
  },
  {
    icon: Wind,
    title: "0.21 Drag Coefficient",
    description: "Sculpted in the wind tunnel for whisper-quiet efficiency.",
  },
  {
    icon: ShieldCheck,
    title: "5-Star Safety",
    description: "A rigid battery floor lowers the center of gravity for stability.",
  },
  {
    icon: Navigation,
    title: "Live Trip Planner",
    description: "Routes you charger to charger and pre-conditions the pack.",
  },
  {
    icon: Sparkles,
    title: "OTA Updates",
    description: "Your car improves while it sleeps. New features, no service visit.",
  },
]

const CHARGE_STEPS = [
  { pct: "10%", label: "Arrive", time: "0 min" },
  { pct: "55%", label: "Coffee", time: "8 min" },
  { pct: "80%", label: "Ready", time: "15 min" },
]

export default function AutomotiveCompanyTemplate() {
  const [activeId, setActiveId] = React.useState(MODELS[0].id)
  const active = MODELS.find((m) => m.id === activeId) ?? MODELS[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <CircleDot className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold tracking-tight">VOLTA</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
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
            <Button size="sm">Order now</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="relative mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              All-electric lineup for 2026
            </Badge>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Drive the current.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Zero tailpipe. Zero compromise. A range of electric vehicles
              engineered for the way you actually move.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2">
                Build your VOLTA
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Book a test drive
              </Button>
            </div>
            <div className="mt-16 flex h-56 items-end justify-center rounded-2xl border bg-card/50 sm:h-72 lg:h-80">
              <div className="flex flex-col items-center pb-10">
                <div className="h-2 w-72 rounded-full bg-primary/30 blur-md sm:w-96" />
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  Featured: {active.name} — {active.accent}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Model selector */}
        <section className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Choose your shape
              </h2>
              <p className="mt-2 text-muted-foreground">
                Four bodies, one platform. Switch to compare specs.
              </p>
            </div>
            <Tabs value={activeId} onValueChange={setActiveId}>
              <TabsList>
                <TabsTrigger value="sedan">Sedan</TabsTrigger>
                <TabsTrigger value="suv">SUV</TabsTrigger>
                <TabsTrigger value="truck">Truck</TabsTrigger>
                <TabsTrigger value="sport">Sport</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card className="overflow-hidden border-primary/20">
            <div className="grid gap-0 lg:grid-cols-2">
              <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
                <div>
                  <Badge variant="outline" className="mb-3">
                    {active.id.toUpperCase()}
                  </Badge>
                  <h3 className="text-4xl font-semibold tracking-tight">
                    {active.name}
                  </h3>
                  <p className="mt-3 text-muted-foreground">{active.tagline}</p>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">Starting at</span>
                  <span className="text-3xl font-semibold">{active.price}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="gap-2">
                    Configure {active.name}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline">View gallery</Button>
                </div>
              </div>
              <div className="flex items-center justify-center border-t bg-muted/30 p-8 lg:border-l lg:border-t-0 lg:p-12">
                <div className="flex h-48 w-full items-end justify-center rounded-xl bg-gradient-to-br from-primary/10 to-transparent">
                  <p className="pb-6 text-sm font-medium text-muted-foreground">
                    {active.accent}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Specs stat band */}
        <section className="border-y bg-card">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-y border-l sm:grid-cols-4 sm:divide-y-0">
            <Stat icon={BatteryCharging} label="EPA Range" value={active.range} />
            <Stat icon={Gauge} label="0–60 mph" value={active.zeroToSixty} />
            <Stat icon={Users} label="Seating" value={active.seats} />
            <Stat icon={Wind} label="Top Speed" value={active.topSpeed} />
          </div>
        </section>

        {/* Features grid */}
        <section className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Engineered down to the electron
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every VOLTA shares the same obsessively refined core technology.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="transition-colors hover:border-primary/40">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Charging strip */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <BatteryCharging className="h-3.5 w-3.5" />
                Charge fast
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Coffee-break charging
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Our 800V platform turns long-distance travel into a series of
                short, civilized stops. Plug in, stretch, and go.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {CHARGE_STEPS.map((step) => (
                <div
                  key={step.label}
                  className="rounded-xl border bg-card p-5 text-center"
                >
                  <div className="text-3xl font-semibold text-primary">
                    {step.pct}
                  </div>
                  <div className="mt-1 text-sm font-medium">{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.time}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Configure / build teaser */}
        <section className="mx-auto w-full max-w-7xl px-6 py-20">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center lg:p-16">
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Make it yours in 60 seconds
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Pick a paint, wheels, and interior, then watch your monthly
                payment update in real time. No dealership required.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" className="gap-2">
                  Start your build
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Estimate payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dealer locator CTA */}
        <section className="border-t bg-card">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="text-sm font-medium">Find a VOLTA space</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">
                See it. Sit in it. Drive it.
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Over 140 experience centers nationwide. Enter your ZIP to find
                the nearest one and book a same-week test drive.
              </p>
            </div>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter your ZIP code"
                aria-label="ZIP code"
                className="h-11"
              />
              <Button type="submit" size="lg" className="gap-2">
                Locate
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-7xl px-6 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <CircleDot className="h-5 w-5 text-primary" />
                <span className="font-semibold tracking-tight">VOLTA</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Building the electric future, one current at a time.
              </p>
            </div>
            <FooterCol
              title="Vehicles"
              links={["Volt S", "Terra X", "Haul EV", "Apex R"]}
            />
            <FooterCol
              title="Company"
              links={["About", "Careers", "Sustainability", "Press"]}
            />
            <FooterCol
              title="Support"
              links={["Charging", "Warranty", "Contact", "Roadside"]}
            />
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 VOLTA Motors. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Recalls
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <Icon className="h-5 w-5 text-primary" />
      <div className="text-3xl font-semibold tracking-tight tabular-nums">
        {value}
      </div>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
