"use client"

import * as React from "react"
import {
  Leaf,
  Sun,
  Wind,
  BatteryCharging,
  Network,
  ArrowRight,
  Menu,
  Phone,
  Mail,
  MapPin,
  Gauge,
  ShieldCheck,
  TrendingDown,
  Lightbulb,
  ClipboardCheck,
  Hammer,
  Activity,
  CheckCircle2,
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV = [
  { label: "Solutions", href: "#solutions" },
  { label: "Impact", href: "#impact" },
  { label: "How we work", href: "#process" },
  { label: "Case studies", href: "#cases" },
  { label: "Team", href: "#team" },
]

const STATS = [
  { value: "4.2 GW", label: "Clean capacity deployed" },
  { value: "1.8M t", label: "CO₂ avoided per year" },
  { value: "320K", label: "Homes powered" },
  { value: "27", label: "Active projects" },
]

const SOLUTIONS = [
  {
    icon: Sun,
    title: "Solar",
    desc: "Utility-scale photovoltaic farms and rooftop arrays engineered for maximum yield.",
    points: ["Single-axis tracking", "Bifacial modules", "Smart inverters"],
  },
  {
    icon: Wind,
    title: "Wind",
    desc: "Onshore and offshore turbines siting that turns prevailing winds into baseload-grade output.",
    points: ["Resource modeling", "Low-noise blades", "Predictive maintenance"],
  },
  {
    icon: BatteryCharging,
    title: "Storage",
    desc: "Grid-scale battery systems that shift clean power to where and when it is needed most.",
    points: ["LFP chemistry", "8-hour duration", "Black-start ready"],
  },
  {
    icon: Network,
    title: "Grid",
    desc: "Intelligent distribution and demand-response that keeps renewable supply firm and stable.",
    points: ["Virtual power plants", "Real-time telemetry", "Resilience planning"],
  },
]

const METRICS = [
  { icon: Gauge, value: "99.4%", label: "Fleet availability" },
  { icon: TrendingDown, value: "−41%", label: "Levelized cost since 2020" },
  { icon: ShieldCheck, value: "0", label: "Lost-time incidents in 2025" },
  { icon: Activity, value: "12.6M", label: "MWh delivered to date" },
]

const PROCESS = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Assess",
    desc: "We map your load profile, site potential, and decarbonization targets into a clear baseline.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Design",
    desc: "Engineers model generation, storage, and grid interconnection for the best lifetime return.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Build",
    desc: "Our EPC teams deliver on schedule with rigorous safety and local workforce commitments.",
  },
  {
    icon: Activity,
    step: "04",
    title: "Operate",
    desc: "24/7 monitoring and predictive maintenance keep every asset performing at peak.",
  },
]

const CASES = [
  {
    sector: "Manufacturing",
    title: "Northvale Steel cuts grid draw by 62%",
    result: "180 MW solar + 90 MWh storage",
    blurb:
      "A behind-the-meter hybrid plant now powers two smelting lines through peak tariff windows.",
  },
  {
    sector: "Municipality",
    title: "Cedar County reaches 100% renewable",
    result: "240 MW wind portfolio",
    blurb:
      "Long-term PPAs stabilized energy budgets for 14 public facilities and 40K residents.",
  },
  {
    sector: "Logistics",
    title: "Meridian Ports electrifies its fleet",
    result: "Microgrid + 30 MWh batteries",
    blurb:
      "An islandable microgrid keeps cranes and chargers running through grid outages.",
  },
]

const TEAM = [
  { name: "Dr. Amara Okonkwo", role: "Chief Executive Officer", initials: "AO" },
  { name: "Liang Wei", role: "Head of Engineering", initials: "LW" },
  { name: "Sofia Marchetti", role: "VP, Project Development", initials: "SM" },
  { name: "Daniel Ferreira", role: "Director of Operations", initials: "DF" },
]

export default function EnergyCompanyPage() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeSector, setActiveSector] = React.useState("All")

  const sectors = ["All", ...Array.from(new Set(CASES.map((c) => c.sector)))]
  const visibleCases =
    activeSector === "All"
      ? CASES
      : CASES.filter((c) => c.sector === activeSector)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-lg">Verdant Power</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm">
              Investor login
            </Button>
            <Button size="sm">
              Partner with us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {menuOpen && (
          <div className="border-t bg-background px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button size="sm" className="mt-2">
                Partner with us
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-5 gap-1.5">
                  <Leaf className="h-3.5 w-3.5 text-primary" />
                  Powering the energy transition
                </Badge>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Clean energy,{" "}
                  <span className="text-primary">built to last.</span>
                </h1>
                <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                  We develop, build, and operate renewable power plants that
                  deliver reliable, affordable electricity for utilities,
                  industry, and communities.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg">
                    Explore solutions
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    See our impact
                  </Button>
                </div>
              </div>
              <Card className="border-primary/20 bg-card/60 shadow-sm backdrop-blur">
                <CardHeader>
                  <CardDescription>Live portfolio snapshot</CardDescription>
                  <CardTitle className="text-2xl">Sustainability at scale</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border">
                  {STATS.map((s) => (
                    <div key={s.label} className="bg-card p-5">
                      <div className="text-2xl font-semibold text-primary">
                        {s.value}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stat band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6">
            <p className="text-sm font-medium">
              Certified carbon-negative operations since 2024.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> ISO 14001 certified
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> 100% local hiring pledge
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Backed by green bonds
              </span>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">
              Our solutions
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Four pillars of a resilient clean grid
            </h2>
            <p className="mt-4 text-muted-foreground">
              From generation to delivery, we own every layer of the renewable
              value chain.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((s) => {
              const Icon = s.icon
              return (
                <Card key={s.title} className="group h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <CardTitle>{s.title}</CardTitle>
                    <CardDescription>{s.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Impact / metrics */}
        <section id="impact" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
              <div>
                <Badge variant="outline" className="mb-3">
                  Measured impact
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Performance you can hold us to
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Transparency is part of our operating model. Every plant is
                  monitored, audited, and reported against the targets we set
                  with our partners.
                </p>
                <Button variant="outline" className="mt-6">
                  Read the impact report
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
                {METRICS.map((m) => {
                  const Icon = m.icon
                  return (
                    <div
                      key={m.label}
                      className="rounded-2xl border bg-card p-6"
                    >
                      <Icon className="h-6 w-6 text-primary" />
                      <div className="mt-4 text-3xl font-semibold">
                        {m.value}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {m.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How we work timeline */}
        <section id="process" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">
              How we work
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A clear path from plan to power
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {PROCESS.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={p.step} className="relative">
                  {i < PROCESS.length - 1 && (
                    <div className="absolute left-12 top-6 hidden h-px w-full bg-border md:block" />
                  )}
                  <div className="relative flex flex-col gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border bg-card text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold tracking-widest text-primary">
                        {p.step}
                      </span>
                      <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Case studies */}
        <section id="cases" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-3">
                  Case studies
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Real projects, real results
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {sectors.map((sec) => (
                  <Button
                    key={sec}
                    size="sm"
                    variant={activeSector === sec ? "default" : "outline"}
                    onClick={() => setActiveSector(sec)}
                  >
                    {sec}
                  </Button>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {visibleCases.map((c) => (
                <Card key={c.title} className="h-full">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      {c.sector}
                    </Badge>
                    <CardTitle className="mt-2 text-lg leading-snug">
                      {c.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{c.blurb}</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-2 border-t pt-4">
                    <BatteryCharging className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{c.result}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership team */}
        <section id="team" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">
              Leadership
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The people behind the power
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="flex flex-col items-center pt-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact / partner CTA */}
        <section className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Let us build your clean energy future
              </h2>
              <p className="mt-4 max-w-md text-primary-foreground/80">
                Tell us about your project or decarbonization goal and our
                development team will be in touch within two business days.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4" /> +1 (800) 555-0142
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4" /> partners@verdantpower.example
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" /> 88 Solaris Way, Austin, TX
                </p>
              </div>
            </div>
            <Card className="bg-background text-foreground">
              <CardHeader>
                <CardTitle>Partner with us</CardTitle>
                <CardDescription>
                  Share a few details to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="grid gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jane Doe" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="org">Organization</Label>
                      <Input id="org" placeholder="Acme Utilities" />
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="jane@acme.com" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="msg">Project details</Label>
                    <Textarea
                      id="msg"
                      rows={4}
                      placeholder="Tell us about your energy goals..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Request a consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Leaf className="h-4 w-4" />
                </span>
                Verdant Power
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Developing, building, and operating renewable power for a
                cleaner grid.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-semibold">Company</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">About</a></li>
                  <li><a href="#team" className="hover:text-foreground">Leadership</a></li>
                  <li><a href="#" className="hover:text-foreground">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Solutions</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#solutions" className="hover:text-foreground">Solar</a></li>
                  <li><a href="#solutions" className="hover:text-foreground">Wind</a></li>
                  <li><a href="#solutions" className="hover:text-foreground">Storage</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Resources</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#impact" className="hover:text-foreground">Impact report</a></li>
                  <li><a href="#cases" className="hover:text-foreground">Case studies</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Verdant Power, Inc. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Sustainability</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
