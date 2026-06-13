"use client"
import * as React from "react"
import {
  Shield,
  KeyRound,
  Clock,
  Headphones,
  Lock,
  FileCheck,
  Globe,
  Server,
  Users,
  Building2,
  ArrowRight,
  Check,
  Quote,
  ChevronRight,
  ScrollText,
  Fingerprint,
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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const features = [
  {
    icon: Shield,
    title: "Enterprise security",
    desc: "End-to-end encryption at rest and in transit, with customer-managed keys and continuous threat monitoring.",
  },
  {
    icon: KeyRound,
    title: "SSO & SCIM",
    desc: "SAML 2.0, OIDC, and automated provisioning across Okta, Azure AD, and Google Workspace.",
  },
  {
    icon: Clock,
    title: "99.99% SLA",
    desc: "A contractually backed uptime guarantee with financial credits and real-time status transparency.",
  },
  {
    icon: Headphones,
    title: "Dedicated support",
    desc: "A named technical account manager, priority routing, and a 15-minute critical response time.",
  },
]

const compliance = [
  { icon: FileCheck, label: "SOC 2 Type II" },
  { icon: Lock, label: "ISO 27001" },
  { icon: ScrollText, label: "GDPR" },
  { icon: Shield, label: "HIPAA" },
  { icon: Globe, label: "Data residency" },
  { icon: Fingerprint, label: "Pen tested" },
]

const stats = [
  { value: "99.99%", label: "Measured uptime" },
  { value: "8,000+", label: "Enterprise seats deployed" },
  { value: "<15min", label: "Critical response SLA" },
  { value: "42%", label: "Lower total cost of ownership" },
]

const logos = [
  "Northwind",
  "Acme Corp",
  "Vertex",
  "Globex",
  "Initech",
  "Umbra",
  "Stark Inc",
  "Helios",
]

const controls = [
  {
    icon: Users,
    title: "Role-based access",
    desc: "Granular permissions and custom roles mapped to your org chart.",
  },
  {
    icon: ScrollText,
    title: "Audit logging",
    desc: "Immutable, exportable logs for every action across the workspace.",
  },
  {
    icon: Server,
    title: "Data governance",
    desc: "Retention policies, legal holds, and one-click data export.",
  },
  {
    icon: Building2,
    title: "Multi-workspace",
    desc: "Centralized billing and policy enforcement across business units.",
  },
]

export default function EnterprisePage() {
  const [enforceSso, setEnforceSso] = React.useState(true)
  const [auditExport, setAuditExport] = React.useState(true)
  const [dataResidency, setDataResidency] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Aegis</span>
            <Badge variant="outline" className="ml-1 hidden sm:inline-flex">
              Enterprise
            </Badge>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Platform
            </a>
            <a href="#security" className="transition-colors hover:text-foreground">
              Security
            </a>
            <a href="#controls" className="transition-colors hover:text-foreground">
              Admin
            </a>
            <a href="#customers" className="transition-colors hover:text-foreground">
              Customers
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Contact sales</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Lock className="h-3 w-3" />
                Trusted by regulated industries
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                The platform built for the world&apos;s most demanding organizations
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                Aegis pairs enterprise-grade security, identity, and governance
                with a contractual uptime guarantee and white-glove support, so
                your teams scale without compromise.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Contact sales
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Download security brief
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" />
                  No setup fees
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" />
                  Dedicated onboarding
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-primary" />
                  Custom MSA
                </span>
              </div>
            </div>

            <Card className="border-primary/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Talk to our enterprise team</CardTitle>
                <CardDescription>
                  Get a tailored proposal within one business day.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="fname">First name</Label>
                    <Input id="fname" placeholder="Jordan" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lname">Last name</Label>
                    <Input id="lname" placeholder="Avery" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" placeholder="jordan@company.com" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Company, Inc." />
                </div>
                <Button className="w-full gap-2">
                  Request a demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By submitting you agree to our enterprise terms.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Compliance strip */}
        <section id="security" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Audited, certified, and compliant
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {compliance.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center justify-center gap-2 rounded-lg border bg-card px-3 py-3 text-sm font-medium"
                >
                  <c.icon className="h-4 w-4 text-primary" />
                  {c.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">
              Enterprise capabilities, by default
            </h2>
            <p className="mt-3 text-muted-foreground">
              Everything procurement, security, and IT teams expect, included in
              every enterprise agreement.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="h-full">
                <CardHeader>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Outcomes stat band */}
        <section className="border-y bg-primary/5">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-14 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Admin controls */}
        <section id="controls" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Admin controls
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Centralized control for IT and security
              </h2>
              <p className="mt-3 text-muted-foreground">
                A single console to enforce policy, monitor activity, and govern
                data across every team in your organization.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {controls.map((c) => (
                  <div key={c.title} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-foreground">
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{c.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workspace policy</CardTitle>
                <CardDescription>
                  Preview the controls available to your administrators.
                </CardDescription>
              </CardHeader>
              <CardContent className="divide-y">
                {[
                  {
                    title: "Enforce single sign-on",
                    desc: "Require SAML for all members.",
                    state: enforceSso,
                    set: setEnforceSso,
                  },
                  {
                    title: "Automated audit export",
                    desc: "Stream logs to your SIEM hourly.",
                    state: auditExport,
                    set: setAuditExport,
                  },
                  {
                    title: "Regional data residency",
                    desc: "Pin data storage to the EU region.",
                    state: dataResidency,
                    set: setDataResidency,
                  },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="pr-4">
                      <div className="text-sm font-medium">{row.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {row.desc}
                      </div>
                    </div>
                    <Switch
                      checked={row.state}
                      onCheckedChange={row.set}
                      aria-label={row.title}
                    />
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 text-primary" />
                    Policies applied across 6 workspaces
                  </span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Manage
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Logo wall + quote */}
        <section id="customers" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Powering security-first teams worldwide
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
              {logos.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-center bg-card px-4 py-7 text-sm font-semibold text-muted-foreground"
                >
                  {name}
                </div>
              ))}
            </div>

            <Card className="mx-auto mt-12 max-w-3xl border-primary/20">
              <CardContent className="p-8 text-center">
                <Quote className="mx-auto h-8 w-8 text-primary/40" />
                <blockquote className="mt-4 text-xl font-medium leading-relaxed tracking-tight">
                  &ldquo;Aegis cleared our security review faster than any vendor
                  we&apos;ve onboarded. The SSO rollout, audit logging, and SLA
                  made the procurement decision straightforward.&rdquo;
                </blockquote>
                <Separator className="mx-auto my-6 w-16" />
                <div className="text-sm">
                  <div className="font-medium">Priya Nair</div>
                  <div className="text-muted-foreground">
                    VP of Information Security, Vertex
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact sales CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center lg:flex-row lg:justify-between lg:p-14 lg:text-left">
              <div className="max-w-xl">
                <h2 className="text-3xl font-semibold tracking-tight">
                  Ready to evaluate Aegis for your enterprise?
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Our team will prepare a tailored proposal, security
                  documentation, and a guided proof of concept for your stakeholders.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Contact sales
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Talk to support
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Shield className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium text-foreground">Aegis</span>
            <span>&middot; Enterprise platform</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#security" className="transition-colors hover:text-foreground">
              Trust center
            </a>
            <a href="#controls" className="transition-colors hover:text-foreground">
              Compliance
            </a>
            <span>&copy; 2026 Aegis, Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
