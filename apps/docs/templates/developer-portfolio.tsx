"use client"
import * as React from "react"
import {
  Terminal,
  Github,
  Star,
  GitFork,
  ArrowUpRight,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Rss,
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Boxes,
  Calendar,
  Building2,
  Download,
  Copy,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Experience", href: "#experience" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
]

const TERMINAL_LINES = [
  { prompt: "~/dev", cmd: "whoami", out: "maya chen — staff software engineer" },
  { prompt: "~/dev", cmd: "cat focus.txt", out: "distributed systems · developer tooling · rust" },
  { prompt: "~/dev", cmd: "uptime", out: "9 yrs shipping · 0 unhandled rejections (today)" },
  { prompt: "~/dev", cmd: "git status", out: "clean — open to senior/staff roles" },
]

type LangKey = "Rust" | "TypeScript" | "Go" | "Python"

const PROJECTS: {
  name: string
  org: string
  desc: string
  lang: LangKey
  stars: string
  forks: string
}[] = [
  {
    name: "ferrolog",
    org: "mayac",
    desc: "Append-only log engine with zero-copy reads and crash-safe segments. Powers ingestion at 1.2M events/s.",
    lang: "Rust",
    stars: "8.4k",
    forks: "412",
  },
  {
    name: "tsx-trace",
    org: "mayac",
    desc: "Tiny tracing layer for TypeScript services with OpenTelemetry export and flamegraph output.",
    lang: "TypeScript",
    stars: "3.1k",
    forks: "188",
  },
  {
    name: "gossipd",
    org: "mayac",
    desc: "Eventually-consistent membership protocol implementing SWIM with anti-entropy reconciliation.",
    lang: "Go",
    stars: "2.7k",
    forks: "154",
  },
  {
    name: "promptkit",
    org: "mayac",
    desc: "Composable prompt-engineering toolkit with deterministic evals and snapshot testing.",
    lang: "Python",
    stars: "1.9k",
    forks: "97",
  },
]

const LANG_DOT: Record<LangKey, string> = {
  Rust: "bg-primary",
  TypeScript: "bg-foreground",
  Go: "bg-muted-foreground",
  Python: "bg-primary/60",
}

const STACK = [
  { group: "Languages", icon: Code2, items: ["Rust", "TypeScript", "Go", "Python", "SQL"] },
  { group: "Backend", icon: Server, items: ["gRPC", "Axum", "Node", "GraphQL"] },
  { group: "Data", icon: Database, items: ["Postgres", "Redis", "Kafka", "ClickHouse"] },
  { group: "Infra", icon: Cloud, items: ["Kubernetes", "Terraform", "AWS", "Nix"] },
  { group: "Tooling", icon: Wrench, items: ["Bazel", "OpenTelemetry", "Vitest", "perf"] },
  { group: "Frontend", icon: Boxes, items: ["React", "Next.js", "Tailwind", "WASM"] },
]

const EXPERIENCE = [
  {
    role: "Staff Software Engineer",
    company: "Vector Labs",
    period: "2022 — Present",
    points: [
      "Led the rewrite of the ingestion pipeline in Rust, cutting p99 latency by 63%.",
      "Owned the platform reliability roadmap across 40+ services and 9 teams.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Northbeam",
    period: "2019 — 2022",
    points: [
      "Built a real-time attribution engine processing 500M daily events.",
      "Mentored 6 engineers and established the internal RFC review process.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Lumen Systems",
    period: "2016 — 2019",
    points: [
      "Shipped the first version of the public REST API, now used by 12k developers.",
      "Reduced build times 4x by migrating CI to a remote cache.",
    ],
  },
]

const WRITING = [
  { title: "Designing a crash-safe log engine in Rust", date: "Mar 2026", read: "12 min", tag: "Systems" },
  { title: "What I learned shipping SWIM to production", date: "Jan 2026", read: "9 min", tag: "Distributed" },
  { title: "Deterministic evals for LLM prompts", date: "Nov 2025", read: "7 min", tag: "Tooling" },
  { title: "A pragmatic guide to zero-copy parsing", date: "Sep 2025", read: "11 min", tag: "Performance" },
]

const STATS = [
  { label: "GitHub stars", value: "16k+" },
  { label: "Open-source repos", value: "48" },
  { label: "Years shipping", value: "9" },
]

export default function DeveloperPortfolio() {
  const [copied, setCopied] = React.useState(false)
  const email = "maya@chen.dev"

  const handleCopy = React.useCallback(() => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Terminal className="h-4 w-4" />
            </span>
            maya@chen.dev
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="GitHub profile">
              <Github className="h-4 w-4" />
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-5 w-fit font-mono">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                Available for staff roles
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Maya Chen
              </h1>
              <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
                Staff engineer building fast, reliable distributed systems and the
                developer tools that keep them honest.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href="#projects">
                    View projects
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#contact">
                    <Mail className="h-4 w-4" />
                    Get in touch
                  </a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Berlin, DE
                <Separator orientation="vertical" className="mx-2 h-4" />
                <span className="font-mono">UTC+1</span>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <Card className="overflow-hidden border bg-card font-mono">
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-destructive/70" />
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
                  <span className="h-3 w-3 rounded-full bg-primary/60" />
                  <span className="ml-2 text-xs text-muted-foreground">zsh — 80×24</span>
                </div>
                <CardContent className="space-y-3 p-5 text-sm">
                  {TERMINAL_LINES.map((line) => (
                    <div key={line.cmd} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">{line.prompt}</span>
                        <span className="text-muted-foreground">$</span>
                        <span className="text-foreground">{line.cmd}</span>
                      </div>
                      <div className="pl-4 text-muted-foreground">{line.out}</div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="text-primary">~/dev</span>
                    <span className="text-muted-foreground">$</span>
                    <span className="inline-block h-4 w-2 animate-pulse bg-foreground" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-3 divide-x px-4 sm:px-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center sm:py-8">
                <div className="font-mono text-2xl font-bold sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured open source</h2>
                <p className="mt-2 text-muted-foreground">Projects I maintain and ship in the open.</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                <a href="#">
                  All repos
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <Card key={project.name} className="group flex flex-col transition-colors hover:border-primary/40">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 font-mono text-base">
                        <Github className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{project.org}/</span>
                        <span>{project.name}</span>
                      </CardTitle>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">{project.desc}</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className={cn("h-2.5 w-2.5 rounded-full", LANG_DOT[project.lang])} />
                      {project.lang}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      {project.forks}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stack */}
        <section id="stack" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Skills &amp; stack</h2>
              <p className="mt-2 text-muted-foreground">The tools I reach for, grouped by where they live.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {STACK.map((cat) => {
                const Icon = cat.icon
                return (
                  <Card key={cat.group} className="bg-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        {cat.group}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <Badge key={item} variant="outline" className="font-mono font-normal">
                          {item}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Experience</h2>
              <p className="mt-2 text-muted-foreground">Where I&apos;ve shipped over the last decade.</p>
            </div>
            <ol className="relative space-y-8 border-l pl-8">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="relative">
                  <span className="absolute -left-[2.35rem] flex h-6 w-6 items-center justify-center rounded-full border bg-background text-primary">
                    <Building2 className="h-3 w-3" />
                  </span>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold">
                      {job.role}
                      <span className="text-muted-foreground"> · {job.company}</span>
                    </h3>
                    <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Writing */}
        <section id="writing" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Writing</h2>
                <p className="mt-2 text-muted-foreground">Notes on systems, performance, and tooling.</p>
              </div>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Rss className="h-4 w-4" />
                RSS
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border bg-card">
              {WRITING.map((post, i) => (
                <a
                  key={post.title}
                  href="#"
                  className={cn(
                    "group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted",
                    i !== WRITING.length - 1 && "border-b",
                  )}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="hidden font-mono sm:inline-flex">
                        {post.tag}
                      </Badge>
                      <h3 className="truncate font-medium group-hover:text-primary">{post.title}</h3>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {post.date} · {post.read} read
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Let&apos;s build something</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                Open to staff and principal roles, advisory work, and the occasional
                deep-dive on distributed systems. I reply to everything.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <code className="rounded-md border bg-muted px-3 py-2 font-mono text-sm">{email}</code>
                <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy email address">
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <Button variant="ghost" size="icon" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Ada Lovelace" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="ada@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={4} placeholder="What are you working on?" />
                  </div>
                  <Button type="submit" className="w-full">
                    <Mail className="h-4 w-4" />
                    Send message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <p className="font-mono text-sm text-muted-foreground">© 2026 maya@chen.dev — built with care</p>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Footer">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
