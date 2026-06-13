"use client"

import * as React from "react"
import {
  Shield,
  ShieldCheck,
  Eye,
  Laptop,
  Cloud,
  FileCheck,
  Lock,
  Activity,
  Bell,
  Search,
  Zap,
  ArrowRight,
  CheckCircle2,
  Menu,
  Globe,
  Server,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navLinks = ["Platform", "Solutions", "Threat Intel", "Resources", "Company"]

const statBand = [
  { value: "4.2B", label: "Threats blocked daily" },
  { value: "<60s", label: "Mean time to detect" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "180+", label: "Countries protected" },
]

const solutions = [
  {
    icon: Eye,
    title: "Threat Detection",
    desc: "AI-driven analytics surface anomalies across your network in real time, before they become breaches.",
    points: ["Behavioral analysis", "24/7 SOC monitoring", "Automated triage"],
  },
  {
    icon: Laptop,
    title: "Endpoint Security",
    desc: "Stop ransomware and zero-days at every device with autonomous response that contains threats instantly.",
    points: ["EDR + XDR", "Device isolation", "Rollback recovery"],
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    desc: "Continuous posture management across AWS, Azure, and GCP with misconfiguration detection.",
    points: ["CSPM coverage", "Workload protection", "Identity guardrails"],
  },
  {
    icon: FileCheck,
    title: "Compliance",
    desc: "Automate evidence collection and audit readiness for the frameworks your customers demand.",
    points: ["SOC 2 & ISO 27001", "HIPAA & PCI DSS", "Continuous audits"],
  },
]

const steps = [
  {
    icon: Search,
    title: "Discover",
    desc: "Map every asset, identity, and data flow across your environment in under an hour.",
  },
  {
    icon: Activity,
    title: "Detect",
    desc: "Our engine correlates billions of signals to flag genuine threats with near-zero noise.",
  },
  {
    icon: Zap,
    title: "Respond",
    desc: "Automated playbooks contain attacks in seconds while your team stays fully in control.",
  },
  {
    icon: ShieldCheck,
    title: "Harden",
    desc: "Close gaps with prioritized remediation guidance that measurably reduces your risk.",
  },
]

const compliance = ["SOC 2 Type II", "ISO 27001", "HIPAA", "PCI DSS", "GDPR", "FedRAMP"]

const caseResults = [
  { metric: "92%", label: "Reduction in alert fatigue" },
  { metric: "14x", label: "Faster incident response" },
  { metric: "$3.1M", label: "Breach costs avoided / yr" },
]

const team = [
  { name: "Dana Reyes", role: "Chief Executive Officer", initials: "DR" },
  { name: "Marcus Okafor", role: "Chief Security Officer", initials: "MO" },
  { name: "Priya Nair", role: "VP, Threat Research", initials: "PN" },
  { name: "Leon Vasquez", role: "Head of Cloud", initials: "LV" },
]

export default function SecurityCompanyPage() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Sentinel</span>
          </div>
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">Request a demo</Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </nav>
        {menuOpen ? (
          <div className="border-t px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-sm text-muted-foreground">
                  {link}
                </a>
              ))}
              <Button size="sm" className="mt-1">
                Request a demo
              </Button>
            </div>
          </div>
        ) : null}
      </header>

      <main className="flex-1">
        {/* Hero — authoritative dark */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-background blur-3xl" />
            <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-background blur-3xl" />
          </div>
          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <Badge
              variant="outline"
              className="mb-6 border-background/30 bg-background/10 text-background"
            >
              <Lock className="mr-1 h-3 w-3" /> Trusted by 2,400+ security teams
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Stop threats before they reach what matters.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-background/70">
              Sentinel unifies detection, response, and compliance into one autonomous platform
              that defends your business around the clock.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2">
                Request a demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
              >
                View the platform
              </Button>
            </div>

            {/* Threat-stopped stat band */}
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-4">
              {statBand.map((s) => (
                <div key={s.label} className="bg-foreground px-5 py-6">
                  <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-sm text-background/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions grid */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              The platform
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Complete coverage, one console
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four integrated solutions that share intelligence so a signal in one becomes
              protection across all.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {solutions.map((s) => (
              <Card key={s.title} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">
                How it works
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                From blind spots to airtight in four steps
              </h2>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-background text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">
                      0{i + 1}
                    </span>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / compliance strip */}
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-center text-sm text-muted-foreground">
            Audited, certified, and continuously validated
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {compliance.map((c) => (
              <Badge
                key={c}
                variant="secondary"
                className="gap-1.5 px-3 py-1.5 text-sm font-medium"
              >
                <FileCheck className="h-3.5 w-3.5 text-primary" />
                {c}
              </Badge>
            ))}
          </div>
        </section>

        {/* Case-study results band */}
        <section className="bg-foreground text-background">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-5 border-background/30 bg-background/10 text-background"
              >
                Case study
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How Northwind Financial cut breach risk in a single quarter
              </h2>
              <p className="mt-4 text-background/70">
                After deploying Sentinel across 40,000 endpoints, Northwind consolidated five
                tools into one platform and gave their lean SOC team superhuman reach.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm text-background/70">
                <TrendingDown className="h-5 w-5 text-background" />
                Risk score dropped from 78 to 12 in 90 days
              </div>
              <Button variant="secondary" className="mt-7 gap-2">
                Read the full story <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border border-background/15 bg-background/15 sm:grid-cols-3">
              {caseResults.map((r) => (
                <div key={r.label} className="bg-foreground px-5 py-8 text-center">
                  <div className="text-3xl font-bold tracking-tight">{r.metric}</div>
                  <div className="mt-2 text-xs text-background/60">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership team */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Leadership
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built by defenders, for defenders
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our team has spent decades on the front lines of nation-state defense, incident
              response, and large-scale infrastructure security.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Request a demo CTA */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See Sentinel defend your environment
            </h2>
            <p className="mt-3 text-muted-foreground">
              Book a personalized demo and get a free risk assessment of your current posture.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Work email"
                className="bg-background"
              />
              <Button type="submit" className="gap-2">
                Request a demo <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">
              No credit card required. SOC 2 Type II certified.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-semibold">Sentinel</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Autonomous cybersecurity for modern enterprises.
              </p>
              <div className="mt-4 flex gap-3 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <Server className="h-4 w-4" />
                <Bell className="h-4 w-4" />
              </div>
            </div>
            {[
              { title: "Platform", links: ["Threat Detection", "Endpoint", "Cloud", "Compliance"] },
              { title: "Company", links: ["About", "Careers", "Newsroom", "Contact"] },
              { title: "Resources", links: ["Threat Intel", "Docs", "Blog", "Trust Center"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold">{col.title}</h4>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Sentinel Security, Inc. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className={cn("transition-colors hover:text-foreground")}>
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Security
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
