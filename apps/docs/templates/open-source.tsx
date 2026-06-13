"use client"

import * as React from "react"
import {
  Github,
  Star,
  GitFork,
  Copy,
  Check,
  Terminal,
  Zap,
  Shield,
  Puzzle,
  FileCode2,
  Heart,
  MessageSquare,
  BookOpen,
  Download,
  ArrowRight,
  CircleDot,
  Users,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const INSTALL_COMMAND = "npm install @forge/runtime"

const STATS = [
  { icon: Star, label: "Stars", value: "24.8k" },
  { icon: GitFork, label: "Forks", value: "1.9k" },
  { icon: CircleDot, label: "Issues", value: "142" },
  { icon: Download, label: "Weekly", value: "380k" },
]

const CODE_SAMPLE = `import { forge } from "@forge/runtime"

const app = forge({
  routes: "./src/routes",
  cache: "edge",
})

app.on("request", (ctx) => {
  ctx.header("x-powered-by", "forge")
  return ctx.next()
})

await app.listen(3000)`

const FEATURES = [
  {
    icon: Zap,
    title: "Zero-config edge",
    body: "Ships with sane defaults. Deploy to the edge in a single command with no boilerplate.",
  },
  {
    icon: Shield,
    title: "Type-safe core",
    body: "End-to-end inference across routes, middleware, and handlers. Catch errors before runtime.",
  },
  {
    icon: Puzzle,
    title: "Pluggable adapters",
    body: "Swap runtimes, databases, and caches through a tiny, well-documented adapter contract.",
  },
  {
    icon: FileCode2,
    title: "Readable internals",
    body: "A small codebase by design. Every module is documented and easy to fork or extend.",
  },
]

const CONTRIBUTORS = [
  { name: "Ada Reyes", handle: "areyes", src: "https://i.pravatar.cc/96?img=1" },
  { name: "Kenji Ito", handle: "kito", src: "https://i.pravatar.cc/96?img=12" },
  { name: "Lena Fox", handle: "lfox", src: "https://i.pravatar.cc/96?img=5" },
  { name: "Marco Diaz", handle: "mdiaz", src: "https://i.pravatar.cc/96?img=33" },
  { name: "Priya Nair", handle: "pnair", src: "https://i.pravatar.cc/96?img=20" },
  { name: "Sam Cole", handle: "scole", src: "https://i.pravatar.cc/96?img=15" },
  { name: "Tara Webb", handle: "twebb", src: "https://i.pravatar.cc/96?img=9" },
  { name: "Yusuf Khan", handle: "ykhan", src: "https://i.pravatar.cc/96?img=51" },
  { name: "Iris Lund", handle: "ilund", src: "https://i.pravatar.cc/96?img=44" },
  { name: "Otto Berg", handle: "oberg", src: "https://i.pravatar.cc/96?img=68" },
  { name: "Noa Stein", handle: "nstein", src: "https://i.pravatar.cc/96?img=24" },
  { name: "Quinn Ray", handle: "qray", src: "https://i.pravatar.cc/96?img=60" },
]

const SPONSOR_TIERS = [
  {
    tier: "Bronze",
    price: "$25/mo",
    perks: ["Name in README", "Sponsor badge", "Release notes mention"],
    featured: false,
  },
  {
    tier: "Silver",
    price: "$200/mo",
    perks: ["Logo on the website", "Priority issue triage", "Early access builds", "All Bronze perks"],
    featured: true,
  },
  {
    tier: "Gold",
    price: "$1,000/mo",
    perks: ["Logo in hero section", "Roadmap input call", "Dedicated support channel", "All Silver perks"],
    featured: false,
  },
]

const STEPS = [
  {
    num: "01",
    title: "Install the package",
    body: "Add the runtime to any Node, Bun, or Deno project with your package manager of choice.",
  },
  {
    num: "02",
    title: "Scaffold a project",
    body: "Run forge init to generate a typed starter with routes, config, and a dev server wired up.",
  },
  {
    num: "03",
    title: "Deploy to the edge",
    body: "Push to your provider and forge deploy ships your app to a global edge network in seconds.",
  },
]

const COMMUNITY = [
  { icon: MessageSquare, title: "Discord", body: "9.4k developers", cta: "Join the chat" },
  { icon: Github, title: "GitHub Discussions", body: "Q&A and RFCs", cta: "Open a thread" },
  { icon: BookOpen, title: "Documentation", body: "Guides and API reference", cta: "Read the docs" },
]

export default function OpenSourceProject() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }, [])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <Terminal className="h-5 w-5 text-primary" aria-hidden="true" />
            forge
            <Badge variant="secondary" className="ml-1 font-normal">v3.2</Badge>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#start" className="transition-colors hover:text-foreground">Get started</a>
            <a href="#sponsors" className="transition-colors hover:text-foreground">Sponsors</a>
            <a href="#community" className="transition-colors hover:text-foreground">Community</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden gap-1.5 sm:inline-flex">
              <Star className="h-4 w-4" aria-hidden="true" />
              Star
            </Button>
            <Button size="sm" className="gap-1.5">
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit gap-1.5 font-mono">
                <CircleDot className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                MIT Licensed
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                The runtime for shipping at the edge
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                A tiny, type-safe, zero-config framework for building fast web services.
                Open source and built in the open by a community of contributors.
              </p>

              <div className="flex flex-wrap gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm"
                  >
                    <s.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="font-semibold tabular-nums">{s.value}</span>
                    <span className="text-muted-foreground">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 font-mono text-sm">
                  <span className="select-none text-primary">$</span>
                  <code>{INSTALL_COMMAND}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-1 h-7 w-7"
                    onClick={handleCopy}
                    aria-label="Copy install command"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
                <Button size="lg" className="gap-1.5">
                  Read the docs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden border bg-card shadow-sm">
              <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">server.ts</span>
              </div>
              <CardContent className="p-0">
                <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-foreground">
                  <code>{CODE_SAMPLE}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Built for developers</h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need, nothing you don't. Designed to stay out of your way.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Card key={f.title} className="border bg-card">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                  <CardDescription>{f.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Contributors</h2>
                </div>
                <p className="mt-2 text-muted-foreground">
                  248 people have shaped forge. Every pull request counts.
                </p>
              </div>
              <Button variant="outline" className="gap-1.5">
                <Heart className="h-4 w-4" aria-hidden="true" />
                Become a contributor
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {CONTRIBUTORS.map((c) => (
                <div key={c.handle} className="flex items-center gap-2 rounded-full border bg-card py-1 pl-1 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={c.src} alt="" />
                    <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-mono text-xs text-muted-foreground">@{c.handle}</span>
                </div>
              ))}
              <div className="flex items-center rounded-full border border-dashed bg-card px-4 text-sm text-muted-foreground">
                +236 more
              </div>
            </div>
          </div>
        </section>

        <section id="sponsors" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sponsor the project</h2>
            <p className="mt-2 text-muted-foreground">
              forge is free and always will be. Sponsorships fund maintenance and keep the lights on.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {SPONSOR_TIERS.map((t) => (
              <Card
                key={t.tier}
                className={cn(
                  "flex flex-col border bg-card",
                  t.featured && "border-primary ring-1 ring-primary"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{t.tier}</CardTitle>
                    {t.featured && <Badge>Most popular</Badge>}
                  </div>
                  <p className="text-2xl font-bold">{t.price}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <ul className="flex flex-col gap-2.5 text-sm">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={t.featured ? "default" : "outline"}
                    className="mt-auto w-full gap-1.5"
                  >
                    <Heart className="h-4 w-4" aria-hidden="true" />
                    Sponsor {t.tier}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="start" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Getting started</h2>
              <p className="mt-2 text-muted-foreground">
                From install to production in three steps.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.num} className="relative rounded-lg border bg-card p-6">
                  <span className="font-mono text-3xl font-bold text-primary/30">{s.num}</span>
                  <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="community" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Join the community</h2>
            <p className="mt-2 text-muted-foreground">
              Ask questions, share builds, and help shape the roadmap.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {COMMUNITY.map((c) => (
              <Card key={c.title} className="border bg-card">
                <CardContent className="flex flex-col items-start gap-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <c.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.body}</p>
                  </div>
                  <Button variant="link" className="h-auto gap-1 p-0">
                    {c.cta}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
          <Card className="border bg-card">
            <CardContent className="flex flex-col items-center gap-5 px-6 py-12 text-center">
              <Github className="h-10 w-10 text-primary" aria-hidden="true" />
              <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl">
                Star us on GitHub and help forge grow
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Every star helps more developers discover the project. Open an issue, send a PR,
                or just say hi in Discussions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" className="gap-1.5">
                  <Star className="h-4 w-4" aria-hidden="true" />
                  Star on GitHub
                </Button>
                <Button size="lg" variant="outline" className="gap-1.5">
                  <GitFork className="h-4 w-4" aria-hidden="true" />
                  Fork the repo
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <Terminal className="h-4 w-4 text-primary" aria-hidden="true" />
            forge
          </div>
          <p className="text-sm text-muted-foreground">
            Released under the MIT License. Built in the open.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="GitHub" className="transition-colors hover:text-foreground">
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <Separator orientation="vertical" className="h-4" />
            <a href="#" aria-label="Discord" className="transition-colors hover:text-foreground">
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
