"use client"

import * as React from "react"
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Activity,
  FileCheck2,
  Globe,
  Server,
  Eye,
  Fingerprint,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

const compliance = [
  { name: "SOC 2 Type II", icon: ShieldCheck, status: "Certified", note: "Audited annually" },
  { name: "GDPR", icon: Globe, status: "Compliant", note: "EU data residency" },
  { name: "ISO 27001", icon: FileCheck2, status: "Certified", note: "Renewed 2026" },
  { name: "HIPAA", icon: Fingerprint, status: "Ready", note: "BAA available" },
  { name: "CCPA", icon: Lock, status: "Compliant", note: "Consumer rights" },
  { name: "PCI DSS", icon: KeyRound, status: "Level 1", note: "Card data scope" },
]

const practices = [
  {
    icon: Lock,
    title: "Encryption everywhere",
    body: "Data is encrypted in transit with TLS 1.3 and at rest with AES-256. Keys are rotated automatically and managed in a dedicated HSM.",
    points: ["TLS 1.3 in transit", "AES-256 at rest", "Automatic key rotation"],
  },
  {
    icon: KeyRound,
    title: "Access control",
    body: "Least-privilege access enforced through SSO, SCIM provisioning, and granular role-based permissions across every workspace.",
    points: ["SAML / OIDC SSO", "SCIM provisioning", "Role-based access"],
  },
  {
    icon: Activity,
    title: "Continuous monitoring",
    body: "Infrastructure is monitored 24/7 with anomaly detection, audit logging, and a dedicated on-call security team.",
    points: ["24/7 anomaly detection", "Immutable audit logs", "Incident response SLA"],
  },
]

const subProcessors = [
  { name: "Amazon Web Services", purpose: "Cloud infrastructure & hosting", location: "United States, EU", cert: "SOC 2, ISO 27001" },
  { name: "Cloudflare", purpose: "CDN, DDoS protection & WAF", location: "Global", cert: "SOC 2, ISO 27001" },
  { name: "Stripe", purpose: "Payment processing", location: "United States", cert: "PCI DSS L1" },
  { name: "Datadog", purpose: "Observability & monitoring", location: "United States", cert: "SOC 2" },
  { name: "Postmark", purpose: "Transactional email delivery", location: "United States", cert: "SOC 2" },
]

const trustStats = [
  { label: "Uptime (12-month)", value: "99.99%", icon: Server },
  { label: "Mean time to detect", value: "< 5 min", icon: Eye },
  { label: "Penetration tests / yr", value: "4", icon: ShieldCheck },
]

export default function SecurityTrustPage() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-base font-semibold tracking-tight">Aegis</span>
          </div>
          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#compliance" className="transition-colors hover:text-foreground">Compliance</a>
            <a href="#practices" className="transition-colors hover:text-foreground">Practices</a>
            <a href="#subprocessors" className="transition-colors hover:text-foreground">Sub-processors</a>
          </div>
          <Button size="sm" variant="outline" className="gap-1.5">
            Trust Center
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Security by design
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Your data, protected at every layer
              </h1>
              <p className="mt-5 text-lg text-muted-foreground">
                We treat security as a first-class product. From encryption to compliance
                certifications and continuous monitoring, here is exactly how we keep your
                information safe.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <FileCheck2 className="h-4 w-4" />
                  Download SOC 2 report
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Visit trust center
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
            {trustStats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 px-2 py-8 sm:justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-2xl font-semibold tabular-nums tracking-tight">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="compliance" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Compliance &amp; certifications</h2>
            <p className="mt-3 text-muted-foreground">
              Independently audited and continuously validated against the standards your
              organization relies on.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compliance.map((item) => (
              <Card key={item.name} className="transition-colors hover:border-primary/50">
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="text-base">{item.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="gap-1 text-primary">
                    <CheckCircle2 className="h-3 w-3" />
                    {item.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="practices" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">Our security practices</h2>
              <p className="mt-3 text-muted-foreground">
                Defense in depth across infrastructure, application, and operations.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {practices.map((practice) => (
                <Card key={practice.title} className="bg-card">
                  <CardHeader>
                    <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <practice.icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="text-lg">{practice.title}</CardTitle>
                    <CardDescription>{practice.body}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Separator className="mb-4" />
                    <ul className="space-y-2.5">
                      {practice.points.map((point) => (
                        <li key={point} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="subprocessors" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">Sub-processors</h2>
              <p className="mt-3 text-muted-foreground">
                The trusted infrastructure partners we work with to deliver our service. We
                notify customers ahead of any changes.
              </p>
            </div>
            <Badge variant="secondary" className="w-fit gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              Updated June 2026
            </Badge>
          </div>
          <Card className="mt-8 overflow-hidden p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Provider</TableHead>
                  <TableHead className="hidden sm:table-cell">Purpose</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="text-right">Certifications</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subProcessors.map((proc) => (
                  <TableRow key={proc.name}>
                    <TableCell className="font-medium">{proc.name}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">{proc.purpose}</TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">{proc.location}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{proc.cert}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <Card className="overflow-hidden border-primary/30 bg-card">
              <div className="grid grid-cols-1 gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <AlertTriangle className="h-6 w-6" />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Found a vulnerability?
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Our security team takes every report seriously. Reach out for responsible
                    disclosure, to request documentation, or to ask anything about how we protect
                    your data.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Contact security team
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      View disclosure policy
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="rounded-xl border bg-muted/40 p-6">
                  <div className="text-sm font-medium text-muted-foreground">Security contact</div>
                  <div className="mt-1 font-mono text-lg">security@aegis.com</div>
                  <Separator className="my-5" />
                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">PGP key</dt>
                      <dd className="font-mono">0xA1B2C3D4</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Response time</dt>
                      <dd>Within 24 hours</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Bug bounty</dt>
                      <dd className="text-primary">Active program</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Aegis — Security &amp; Trust</span>
          </div>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
