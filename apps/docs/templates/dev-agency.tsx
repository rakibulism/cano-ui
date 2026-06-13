"use client"

import * as React from "react"
import {
  Code2,
  Smartphone,
  Cloud,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Search,
  PenTool,
  Hammer,
  ShieldCheck,
  Zap,
  Star,
  ExternalLink,
  Check,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "PostgreSQL",
  "GraphQL",
  "Kubernetes",
  "AWS",
  "Terraform",
  "Redis",
]

const STATS = [
  { value: "120+", label: "Products shipped" },
  { value: "38", label: "Engineers on staff" },
  { value: "9 yrs", label: "Building software" },
  { value: "99.9%", label: "Uptime delivered" },
]

const SERVICES = [
  {
    icon: Code2,
    title: "Web Engineering",
    desc: "Type-safe full-stack apps with React, Next.js and Node — built to scale from MVP to millions of users.",
    points: ["Design systems", "Edge rendering", "API platforms"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native iOS and Android plus cross-platform React Native, all sharing one product backbone.",
    points: ["Offline-first", "Push & deep links", "App store launch"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Resilient infrastructure on AWS and GCP with automated pipelines, observability and zero-downtime deploys.",
    points: ["IaC with Terraform", "CI/CD", "24/7 monitoring"],
  },
]

const PORTFOLIO: Record<string, { name: string; tag: string; blurb: string; metric: string }[]> = {
  web: [
    { name: "Ledgerly", tag: "Fintech SaaS", blurb: "Real-time accounting dashboard for 40k SMBs.", metric: "+180% MRR" },
    { name: "Northwind", tag: "Logistics", blurb: "Fleet routing platform cutting fuel spend.", metric: "-22% costs" },
    { name: "Cohort", tag: "EdTech", blurb: "Live cohort learning with video and labs.", metric: "94% retention" },
  ],
  mobile: [
    { name: "Pulse", tag: "Health & Fitness", blurb: "Wearable-synced coaching app, top 10 in store.", metric: "1.2M installs" },
    { name: "Forage", tag: "Marketplace", blurb: "Local grocery delivery with sub-hour windows.", metric: "4.8★ rating" },
    { name: "Tempo", tag: "Productivity", blurb: "Focus timer with team accountability.", metric: "+65% DAU" },
  ],
  cloud: [
    { name: "Vault Migrate", tag: "Platform", blurb: "Zero-downtime migration of a 12TB monolith.", metric: "0 outages" },
    { name: "Scale Mesh", tag: "Infrastructure", blurb: "Multi-region Kubernetes for a video startup.", metric: "3x throughput" },
    { name: "Sentinel", tag: "Security", blurb: "SOC2-ready observability and alerting layer.", metric: "p99 < 80ms" },
  ],
}

const PROCESS = [
  { icon: Search, step: "01", title: "Discover", desc: "Workshops to map goals, users and constraints into a clear technical roadmap." },
  { icon: PenTool, step: "02", title: "Design", desc: "Prototypes and architecture decisions validated before a line of production code." },
  { icon: Hammer, step: "03", title: "Build", desc: "Two-week sprints, demos every Friday, and a staging URL from day one." },
  { icon: Rocket, step: "04", title: "Ship & Scale", desc: "Launch, monitor, iterate — with SLAs and an on-call team that has your back." },
]

const TEAM = [
  { name: "Maya Chen", role: "Founder & Principal Engineer", img: "https://i.pravatar.cc/160?img=47" },
  { name: "Diego Alvarez", role: "Head of Mobile", img: "https://i.pravatar.cc/160?img=12" },
  { name: "Aisha Khan", role: "Cloud Architect", img: "https://i.pravatar.cc/160?img=32" },
  { name: "Sam Okafor", role: "Design Lead", img: "https://i.pravatar.cc/160?img=15" },
]

const GUARANTEES = [
  { icon: ShieldCheck, label: "SOC2-aligned process" },
  { icon: Zap, label: "Senior engineers only" },
  { icon: Check, label: "Fixed-scope estimates" },
]

export default function DevAgencyPage() {
  const [activeWork, setActiveWork] = React.useState("web")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </span>
            <span>Forge<span className="text-muted-foreground">Labs</span></span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Careers
            </Button>
            <Button size="sm" asChild>
              <a href="#contact">Start a project</a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,theme(colors.muted)/0.5,transparent_60%)]" />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Star className="h-3.5 w-3.5" />
                Trusted by 60+ funded startups
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                We design, build and ship software that{" "}
                <span className="text-primary">actually scales.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                ForgeLabs is a senior product engineering studio. From a napkin
                sketch to a system serving millions — web, mobile and cloud,
                under one roof.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#contact" className="gap-2">
                    Book a discovery call <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#work">See our work</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {GUARANTEES.map((g) => (
                  <span key={g.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <g.icon className="h-4 w-4 text-primary" />
                    {g.label}
                  </span>
                ))}
              </div>
            </div>

            <Card className="border-primary/20 bg-card/60 shadow-sm">
              <CardHeader>
                <CardDescription>Currently shipping</CardDescription>
                <CardTitle className="font-mono text-base">~/forgelabs/deploy.log</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 font-mono text-sm">
                {[
                  { t: "build", m: "ledgerly@2.4.0 → production", ok: true },
                  { t: "test", m: "1,284 passing · 0 failing", ok: true },
                  { t: "deploy", m: "us-east-1, eu-west-1 · canary 100%", ok: true },
                  { t: "monitor", m: "p99 latency 74ms · errors 0.00%", ok: true },
                ].map((line) => (
                  <div key={line.t} className="flex items-start gap-3 rounded-md bg-muted/30 px-3 py-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>
                      <span className="text-muted-foreground">[{line.t}]</span> {line.m}
                    </span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                Live status from the last release pipeline.
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Our tooling
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {STACK.map((tech) => (
                <Badge key={tech} variant="outline" className="bg-background px-3 py-1.5 text-sm font-normal">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden px-4 py-4 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-6 py-8 text-center">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-20 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3">Services</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                One team for the whole stack
              </h2>
              <p className="mt-4 text-muted-foreground">
                Engagements scoped to your stage — from rapid prototypes to
                hardened, observable systems in production.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {SERVICES.map((svc) => (
                <Card key={svc.title} className="group transition-shadow hover:shadow-md">
                  <CardHeader>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <svc.icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="mt-4">{svc.title}</CardTitle>
                    <CardDescription>{svc.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {svc.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="work" className="scroll-mt-20 border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-3">Portfolio</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Products we&apos;ve shipped
                </h2>
                <p className="mt-4 text-muted-foreground">
                  A sample of what our teams have taken from zero to launch.
                </p>
              </div>
            </div>

            <Tabs value={activeWork} onValueChange={setActiveWork} className="mt-10">
              <TabsList>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                <TabsTrigger value="cloud">Cloud</TabsTrigger>
              </TabsList>
              {Object.entries(PORTFOLIO).map(([key, items]) => (
                <TabsContent key={key} value={key} className="mt-8">
                  <div className="grid gap-6 md:grid-cols-3">
                    {items.map((item) => (
                      <Card key={item.name} className="overflow-hidden bg-card">
                        <div className="flex aspect-[16/9] items-center justify-center bg-primary/10">
                          <span className="text-2xl font-bold tracking-tight text-primary">{item.name}</span>
                        </div>
                        <CardHeader>
                          <div className="flex items-center justify-between gap-2">
                            <Badge variant="secondary">{item.tag}</Badge>
                            <span className="text-sm font-semibold text-primary">{item.metric}</span>
                          </div>
                          <CardTitle className="mt-2 text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.blurb}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button variant="link" className="h-auto gap-1 p-0 text-sm">
                            Read case study <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="scroll-mt-20 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3">Process</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How we work
              </h2>
              <p className="mt-4 text-muted-foreground">
                Transparent, sprint-based delivery you can watch happen in real time.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => (
                <div key={p.title} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">{p.step}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  {i < PROCESS.length - 1 && (
                    <Separator className="mt-6 lg:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="scroll-mt-20 border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3">Team</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The people behind the code
              </h2>
              <p className="mt-4 text-muted-foreground">
                Small, senior, and accountable. You work directly with the
                engineers building your product.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <Card key={member.name} className="text-center">
                  <CardContent className="pt-6">
                    <Avatar className="mx-auto h-20 w-20">
                      <AvatarImage src={member.img} alt="" />
                      <AvatarFallback>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-semibold">{member.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                    <div className="mt-4 flex justify-center gap-1">
                      <Button variant="ghost" size="icon" aria-label={member.name + " on GitHub"}>
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label={member.name + " on LinkedIn"}>
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-3">Contact</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s build something
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us about your project. We&apos;ll reply within one business
                day with next steps and a rough scope.
              </p>
              <div className="mt-8 space-y-4">
                <a href="mailto:hello@forgelabs.dev" className="flex items-center gap-3 text-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </span>
                  hello@forgelabs.dev
                </a>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </span>
                  +1 (415) 555-0142
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  548 Market St, San Francisco, CA
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project inquiry</CardTitle>
                <CardDescription>No commitment — just a conversation.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Ada Lovelace" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="ada@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brief">What are you building?</Label>
                    <Textarea id="brief" rows={4} placeholder="A mobile app for..." />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Send inquiry <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </span>
            ForgeLabs
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 ForgeLabs Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
