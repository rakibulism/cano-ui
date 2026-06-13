"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Globe2,
  LineChart,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Results", href: "#results" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

const SERVICES = [
  {
    icon: Compass,
    title: "Strategy & Growth",
    description:
      "Board-ready growth strategies grounded in market evidence, scenario modeling, and disciplined capital allocation.",
    points: ["Market entry", "Portfolio strategy", "M&A advisory"],
  },
  {
    icon: TrendingUp,
    title: "Operational Excellence",
    description:
      "End-to-end performance programs that compress cost-to-serve while protecting customer experience and quality.",
    points: ["Cost transformation", "Supply chain", "Process redesign"],
  },
  {
    icon: BarChart3,
    title: "Digital & Analytics",
    description:
      "Data platforms and AI use-cases that move from pilot to production with measurable bottom-line impact.",
    points: ["Data strategy", "AI deployment", "Cloud modernization"],
  },
  {
    icon: ShieldCheck,
    title: "Risk & Resilience",
    description:
      "Governance, regulatory readiness, and resilience planning that withstands scrutiny from boards and regulators.",
    points: ["Compliance", "Cyber strategy", "Scenario planning"],
  },
  {
    icon: Users,
    title: "Organization & Talent",
    description:
      "Operating models and leadership programs that align structure, culture, and incentives to strategy.",
    points: ["Org design", "Change management", "Leadership"],
  },
  {
    icon: Target,
    title: "Customer & Commercial",
    description:
      "Pricing, go-to-market, and customer strategy that lift revenue quality and lifetime value.",
    points: ["Pricing strategy", "Go-to-market", "CX design"],
  },
]

const INDUSTRIES = [
  { icon: Building2, name: "Financial Services", projects: "240+ engagements" },
  { icon: Globe2, name: "Consumer & Retail", projects: "180+ engagements" },
  { icon: LineChart, name: "Technology & Media", projects: "210+ engagements" },
  { icon: ShieldCheck, name: "Healthcare & Life Sciences", projects: "150+ engagements" },
  { icon: Compass, name: "Energy & Utilities", projects: "120+ engagements" },
  { icon: Users, name: "Public Sector", projects: "90+ engagements" },
]

const STATS = [
  { value: "$4.2B", label: "Client value created" },
  { value: "30+", label: "Years of practice" },
  { value: "94%", label: "Repeat engagement rate" },
  { value: "40", label: "Markets served" },
]

const CLIENTS = ["Northwind", "Meridian", "Aerolux", "Vantage", "Lumen Co.", "Acme Group"]

const TEAM = [
  {
    name: "Eleanor Voss",
    role: "Managing Partner",
    bio: "Leads our global strategy practice with three decades advising boards through transformation.",
    img: "https://i.pravatar.cc/240?img=47",
    initials: "EV",
  },
  {
    name: "Marcus Hale",
    role: "Head of Operations",
    bio: "Architect of large-scale cost and supply-chain programs across industrial sectors.",
    img: "https://i.pravatar.cc/240?img=12",
    initials: "MH",
  },
  {
    name: "Priya Nair",
    role: "Partner, Digital & AI",
    bio: "Brings analytics and AI from proof-of-concept to enterprise-grade production.",
    img: "https://i.pravatar.cc/240?img=32",
    initials: "PN",
  },
  {
    name: "David Okonkwo",
    role: "Partner, Risk Advisory",
    bio: "Advises financial institutions on governance, resilience, and regulatory readiness.",
    img: "https://i.pravatar.cc/240?img=68",
    initials: "DO",
  },
]

export default function ConsultingFirmPage() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Compass className="size-5" />
            </span>
            <span className="text-lg">Halsted & Reed</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm">
              Client login
            </Button>
            <Button size="sm" asChild>
              <a href="#contact">
                Book a consultation
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {menuOpen && (
          <div className="border-t md:hidden">
            <nav className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                  <ChevronRight className="size-4" />
                </a>
              ))}
              <Button className="mt-3" asChild>
                <a href="#contact" onClick={() => setMenuOpen(false)}>
                  Book a consultation
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1" id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-background" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5">
                Strategy. Operations. Outcomes.
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Decisions that hold up under scrutiny.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                We partner with boards and executive teams to translate ambition into
                measurable results — combining sharp analysis with the discipline to
                execute. Trusted by leaders across 40 markets.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#contact">
                    Start a conversation
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#results">See our impact</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> Board-level advisory
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> Senior teams only
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> Outcome-based fees
                </span>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardDescription>Engagement snapshot</CardDescription>
                  <CardTitle className="text-2xl">Transformation in motion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
                    { label: "Cost reduction delivered", value: "22%" },
                    { label: "Time-to-value", value: "< 6 mo" },
                    { label: "Initiatives in production", value: "38" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-xl font-semibold">{row.value}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="rounded-lg bg-muted/30 p-4 text-sm text-muted-foreground">
                    “Halsted & Reed reframed the problem and gave us the conviction
                    to act. The numbers followed.”
                    <div className="mt-3 font-medium text-foreground">
                      CFO, FTSE 100 retailer
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Client logos */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by leadership teams worldwide
            </p>
            <div className="mt-6 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {CLIENTS.map((name) => (
                <div
                  key={name}
                  className="text-center text-lg font-semibold tracking-tight text-muted-foreground/70"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">
                Our services
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Full-spectrum advisory, end to end.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Six integrated practices, one accountable team. We bring the right
                expertise to each phase — from the boardroom strategy to the work that
                makes it real.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => {
                const Icon = service.icon
                return (
                  <Card
                    key={service.title}
                    className="group transition-shadow hover:shadow-md"
                  >
                    <CardHeader>
                      <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <CardTitle className="mt-4">{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="size-4 text-primary" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="scroll-mt-20 border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4">
                  Industries
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Deep expertise where it counts.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Sector specialists who know your competitive landscape, regulators,
                  and economics before the first meeting.
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href="#contact">
                  Discuss your sector
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((industry) => {
                const Icon = industry.icon
                return (
                  <div
                    key={industry.name}
                    className="flex items-center gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">{industry.name}</h3>
                      <p className="text-sm text-muted-foreground">{industry.projects}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Results / stats band */}
        <section id="results" className="scroll-mt-20 bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Results that compound.
              </h2>
              <p className="mt-3 text-primary-foreground/80">
                We measure ourselves by the value we leave behind — not the slides we
                deliver.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-primary-foreground/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4">
                Leadership
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Senior partners, in the room.
              </h2>
              <p className="mt-4 text-muted-foreground">
                The people you meet in the pitch are the people who do the work. No
                hand-offs to junior teams.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <Card key={member.name} className="text-center">
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="size-20">
                      <AvatarImage src={member.img} alt="" />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="scroll-mt-20 border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-4">
                Contact
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&apos;s talk about your toughest decision.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us where you want to go. We&apos;ll bring a point of view to the
                first conversation — no obligation.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">partners@halstedreed.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-muted-foreground">+1 (212) 555-0148</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </span>
                  <div>
                    <div className="font-medium">Headquarters</div>
                    <div className="text-muted-foreground">
                      48 Park Row, New York, NY
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Request a consultation</CardTitle>
                <CardDescription>
                  A partner will respond within one business day.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="jane@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Acme Group" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Briefly describe your challenge…"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Submit request
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Compass className="size-5" />
                </span>
                <span className="text-lg">Halsted & Reed</span>
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                A global advisory firm helping leaders make decisions that hold up
                under scrutiny.
              </p>
            </div>

            {[
              { title: "Services", links: ["Strategy", "Operations", "Digital", "Risk"] },
              { title: "Company", links: ["About", "Careers", "Insights", "Press"] },
              { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Disclosures"] },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-2">
                  {col.links.map((link) => (
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
            ))}
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Halsted & Reed LLP. All rights reserved.</p>
            <p>Offices in New York · London · Singapore · Dubai</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
