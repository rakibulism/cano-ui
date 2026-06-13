"use client"

import * as React from "react"
import {
  Rss,
  Search,
  ArrowRight,
  Calendar,
  Clock,
  Terminal,
  Github,
  Twitter,
  Linkedin,
  Code2,
  Mail,
  TrendingUp,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type Topic = "All" | "Backend" | "Frontend" | "Infra" | "AI"

const TOPICS: Topic[] = ["All", "Backend", "Frontend", "Infra", "AI"]

type Post = {
  title: string
  excerpt: string
  topic: Exclude<Topic, "All">
  author: string
  initials: string
  date: string
  readMins: number
}

const POSTS: Post[] = [
  {
    title: "Cutting p99 latency by 40% with connection pooling",
    excerpt:
      "How we rearchitected our database access layer to eliminate cold connections under spiky load.",
    topic: "Backend",
    author: "Priya Nair",
    initials: "PN",
    date: "May 28, 2026",
    readMins: 9,
  },
  {
    title: "A pragmatic guide to React Server Components",
    excerpt:
      "Where RSC actually pays off, the gotchas we hit in production, and our adoption checklist.",
    topic: "Frontend",
    author: "Marcus Lee",
    initials: "ML",
    date: "May 21, 2026",
    readMins: 12,
  },
  {
    title: "Zero-downtime Kubernetes upgrades at scale",
    excerpt:
      "Our drain-and-rotate playbook for upgrading 2,000 nodes without paging anyone at 3am.",
    topic: "Infra",
    author: "Dana Cruz",
    initials: "DC",
    date: "May 14, 2026",
    readMins: 11,
  },
  {
    title: "Shipping an LLM eval harness our PMs actually use",
    excerpt:
      "Building a feedback loop that turns model regressions into actionable, reproducible test cases.",
    topic: "AI",
    author: "Sam Okafor",
    initials: "SO",
    date: "May 7, 2026",
    readMins: 14,
  },
  {
    title: "Idempotent webhooks without losing your mind",
    excerpt:
      "A dedupe strategy built on event keys, an outbox table, and brutally simple retries.",
    topic: "Backend",
    author: "Priya Nair",
    initials: "PN",
    date: "Apr 30, 2026",
    readMins: 8,
  },
  {
    title: "Design tokens that survive a redesign",
    excerpt:
      "How we structured our token pipeline so a brand refresh shipped in a single PR.",
    topic: "Frontend",
    author: "Aisha Khan",
    initials: "AK",
    date: "Apr 23, 2026",
    readMins: 7,
  },
]

const FEATURED = {
  topic: "Infra" as const,
  title: "How we cut our build times from 22 minutes to 90 seconds",
  excerpt:
    "A deep dive into remote caching, dependency graph pruning, and the one config flag that changed everything for our monorepo CI.",
  author: "Dana Cruz",
  initials: "DC",
  date: "Jun 4, 2026",
  readMins: 16,
}

const AUTHORS = [
  { name: "Priya Nair", role: "Staff Backend Eng", initials: "PN", posts: 24 },
  { name: "Marcus Lee", role: "Frontend Lead", initials: "ML", posts: 18 },
  { name: "Dana Cruz", role: "Platform Eng", initials: "DC", posts: 31 },
  { name: "Sam Okafor", role: "ML Engineer", initials: "SO", posts: 12 },
]

const TRENDING = [
  "Postgres index bloat, explained",
  "Our migration off Webpack",
  "Tracing async jobs end-to-end",
]

export default function DeveloperBlogPage() {
  const [active, setActive] = React.useState<Topic>("All")

  const filtered =
    active === "All" ? POSTS : POSTS.filter((p) => p.topic === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-mono text-sm font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="h-4 w-4" />
            </span>
            <span>kernel<span className="text-muted-foreground">/blog</span></span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#" className="transition-colors hover:text-foreground">Latest</a>
            <a href="#" className="transition-colors hover:text-foreground">Topics</a>
            <a href="#" className="transition-colors hover:text-foreground">Authors</a>
            <a href="#" className="transition-colors hover:text-foreground">Open Source</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts"
                className="h-9 w-44 pl-8 font-mono text-xs"
                aria-label="Search posts"
              />
            </div>
            <Button size="sm" className="gap-1.5">
              <Rss className="h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <section className="mb-12">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="grid gap-0 md:grid-cols-5">
              <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-10">
                <div className="mb-4 flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Featured
                  </Badge>
                  <Badge variant="outline">{FEATURED.topic}</Badge>
                </div>
                <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
                  {FEATURED.title}
                </h1>
                <p className="mt-4 max-w-prose text-muted-foreground">
                  {FEATURED.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback className="text-xs">{FEATURED.initials}</AvatarFallback>
                    </Avatar>
                    {FEATURED.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {FEATURED.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {FEATURED.readMins} min read
                  </span>
                </div>
                <div className="mt-6">
                  <Button className="gap-2">
                    Read the writeup
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="border-t bg-muted/30 p-6 md:col-span-2 md:border-l md:border-t-0 md:p-8">
                <div className="rounded-lg border bg-card p-4 font-mono text-xs leading-relaxed text-muted-foreground shadow-sm">
                  <div className="mb-3 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                    <span className="ml-2 text-[10px] uppercase tracking-wide">ci.toml</span>
                  </div>
                  <pre className="whitespace-pre-wrap">
{`[cache]
remote = true
prune_graph = true
# 22m  ->  90s
parallelism = "auto"

$ build --since main
✓ 1,204 targets cached
✓ done in 89.4s`}
                  </pre>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <div className="grid gap-10 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Latest posts</h2>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setActive(topic)}
                    aria-pressed={active === topic}
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
                      active === topic
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((post) => (
                <Card
                  key={post.title}
                  className="group flex flex-col transition-shadow hover:shadow-md"
                >
                  <CardHeader>
                    <Badge variant="outline" className="mb-2 w-fit font-mono text-[10px]">
                      {post.topic}
                    </Badge>
                    <CardTitle className="text-base leading-snug group-hover:text-primary">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="text-[10px]">{post.initials}</AvatarFallback>
                      </Avatar>
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readMins}m
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="rounded-lg border border-dashed py-12 text-center text-sm text-muted-foreground">
                No posts in this topic yet.
              </p>
            )}
          </section>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Code2 className="h-4 w-4 text-primary" />
                  Authors
                </CardTitle>
                <CardDescription>The engineers behind the writeups.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {AUTHORS.map((author, i) => (
                  <React.Fragment key={author.name}>
                    {i > 0 && <Separator />}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="text-xs">{author.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{author.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{author.role}</p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {author.posts}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Rss className="h-4 w-4 text-primary" />
                  Subscribe via RSS
                </CardTitle>
                <CardDescription>
                  New deep dives every week. No spam, unsubscribe anytime.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@company.dev"
                    className="pl-8 font-mono text-xs"
                    aria-label="Email address"
                  />
                </div>
                <Button className="w-full">Join the newsletter</Button>
                <div className="rounded-md border bg-background px-3 py-2 font-mono text-[11px] text-muted-foreground">
                  <span className="text-foreground">$</span> curl -O kernel.dev/feed.xml
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {TRENDING.map((item, i) => (
                  <a
                    key={item}
                    href="#"
                    className="flex items-start gap-3 text-sm transition-colors hover:text-primary"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </a>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-sm font-semibold">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Terminal className="h-3.5 w-3.5" />
              </span>
              kernel<span className="text-muted-foreground">/blog</span>
            </div>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Engineering notes, postmortems, and tooling deep dives from the team building Kernel.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="RSS feed">
              <Rss className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 font-mono text-xs text-muted-foreground">
          © 2026 Kernel, Inc. Built with too much coffee.
        </div>
      </footer>
    </div>
  )
}
