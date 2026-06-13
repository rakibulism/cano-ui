"use client"

import * as React from "react"
import {
  Terminal,
  Search,
  Menu,
  ArrowRight,
  Flame,
  Clock,
  Eye,
  Hash,
  Rss,
  Github,
  Twitter,
  Code2,
  Bookmark,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const TAGS = [
  "All",
  "Rust",
  "TypeScript",
  "DevOps",
  "AI/ML",
  "Databases",
  "WebAssembly",
  "Security",
] as const

type Tag = (typeof TAGS)[number]

const FEATURED = {
  tag: "Rust",
  title: "Rewriting Our Hot Path in Rust Cut p99 Latency by 71%",
  excerpt:
    "We had a Go service quietly drowning under tail latency. Here is the full teardown: the flamegraphs, the false starts, and the unsafe block we eventually deleted.",
  author: "Lena Vasquez",
  handle: "@lenav",
  avatar: "https://i.pravatar.cc/120?img=45",
  date: "Jun 12, 2026",
  readTime: "14 min read",
  image:
    "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80",
}

const POSTS: {
  tag: Tag
  title: string
  excerpt: string
  author: string
  avatar: string
  date: string
  readTime: string
  reads: string
}[] = [
  {
    tag: "TypeScript",
    title: "Type-Level State Machines: When the Compiler Is Your Tester",
    excerpt:
      "Encoding valid transitions into the type system so an illegal state literally won't compile. Less runtime guarding, fewer 2am pages.",
    author: "Marcus Field",
    avatar: "https://i.pravatar.cc/120?img=14",
    date: "Jun 10, 2026",
    readTime: "9 min",
    reads: "18.2k",
  },
  {
    tag: "DevOps",
    title: "We Deleted Our Staging Environment. Here's What Replaced It.",
    excerpt:
      "Ephemeral preview environments per pull request changed how the whole team ships. The trade-offs are real but the feedback loop is unbeatable.",
    author: "Priya Raman",
    avatar: "https://i.pravatar.cc/120?img=31",
    date: "Jun 8, 2026",
    readTime: "7 min",
    reads: "12.9k",
  },
  {
    tag: "Databases",
    title: "Postgres Is Enough: Killing Five Services With One Database",
    excerpt:
      "Queues, full-text search, caching, pub/sub, and cron — all collapsed back into Postgres. A pragmatic case for boring infrastructure.",
    author: "Dmitri Sokolov",
    avatar: "https://i.pravatar.cc/120?img=8",
    date: "Jun 6, 2026",
    readTime: "11 min",
    reads: "24.5k",
  },
  {
    tag: "AI/ML",
    title: "Shipping a 4B Model to the Browser With WebGPU",
    excerpt:
      "Quantization, streaming weights, and a memory budget that fits a laptop. Local inference is no longer a demo — it's a feature.",
    author: "Aïsha Bello",
    avatar: "https://i.pravatar.cc/120?img=20",
    date: "Jun 4, 2026",
    readTime: "10 min",
    reads: "15.7k",
  },
  {
    tag: "Security",
    title: "How a Stray Wildcard in CORS Cost Us a Bug Bounty Payout",
    excerpt:
      "A reflective Origin header and one over-trusting check. A short postmortem on the smallest configs that cause the biggest holes.",
    author: "Tom Becker",
    avatar: "https://i.pravatar.cc/120?img=53",
    date: "Jun 2, 2026",
    readTime: "6 min",
    reads: "9.4k",
  },
  {
    tag: "WebAssembly",
    title: "Sandboxing Untrusted Plugins With Wasm Components",
    excerpt:
      "Letting customers run their own code in our product without letting them run our product. The component model makes this finally tractable.",
    author: "Marcus Field",
    avatar: "https://i.pravatar.cc/120?img=14",
    date: "May 30, 2026",
    readTime: "8 min",
    reads: "7.8k",
  },
]

const POPULAR = [
  { rank: "01", title: "The Case for Monoliths in 2026", reads: "41.2k" },
  { rank: "02", title: "Stop Using Microservices as a Resume Builder", reads: "33.8k" },
  { rank: "03", title: "Your Logging Bill Is a Design Smell", reads: "27.1k" },
  { rank: "04", title: "SQLite on the Server, Unironically", reads: "21.6k" },
  { rank: "05", title: "Reading a Flamegraph Without Lying to Yourself", reads: "18.0k" },
]

const AUTHORS = [
  { name: "Lena Vasquez", role: "Systems", avatar: "https://i.pravatar.cc/120?img=45", posts: 42 },
  { name: "Marcus Field", role: "Frontend", avatar: "https://i.pravatar.cc/120?img=14", posts: 38 },
  { name: "Priya Raman", role: "Platform", avatar: "https://i.pravatar.cc/120?img=31", posts: 29 },
  { name: "Aïsha Bello", role: "ML", avatar: "https://i.pravatar.cc/120?img=20", posts: 24 },
]

export default function TechBlog() {
  const [activeTag, setActiveTag] = React.useState<Tag>("All")
  const [email, setEmail] = React.useState("")

  const visiblePosts =
    activeTag === "All" ? POSTS : POSTS.filter((p) => p.tag === activeTag)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <a href="#" className="flex items-center gap-2 font-mono font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Terminal className="size-4" />
            </span>
            <span className="text-lg">stdout.dev</span>
          </a>
          <nav className="ml-6 hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
            {["Articles", "Tutorials", "Deep Dives", "Newsletter"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="grep articles…"
                className="w-48 pl-9 font-mono text-sm"
                aria-label="Search articles"
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="RSS feed">
              <Rss className="size-4" />
            </Button>
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {/* Featured hero */}
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="order-1 overflow-hidden rounded-xl border">
            <img
              src={FEATURED.image}
              alt=""
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="order-2">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
              <Flame className="size-4" />
              Featured
            </div>
            <Badge variant="secondary" className="mt-3 font-mono">
              <Hash className="size-3" />
              {FEATURED.tag}
            </Badge>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {FEATURED.title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              {FEATURED.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={FEATURED.avatar} alt="" />
                  <AvatarFallback>LV</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{FEATURED.author}</p>
                  <p className="flex items-center gap-1.5 text-muted-foreground">
                    {FEATURED.date}
                    <span aria-hidden>•</span>
                    <Clock className="size-3.5" />
                    {FEATURED.readTime}
                  </p>
                </div>
              </div>
              <Button className="gap-2">
                Read article
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Body: tag-filtered list + sidebar */}
        <div className="grid gap-10 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-2">
              <Code2 className="size-5 text-primary" />
              <h2 className="text-xl font-semibold tracking-tight">Latest articles</h2>
            </div>

            {/* Tag filter row */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-sm transition-colors",
                    activeTag === tag
                      ? "border-primary bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {tag !== "All" && <Hash className="size-3" />}
                  {tag}
                </button>
              ))}
            </div>

            {/* List view (distinct from magazine grid) */}
            <ul className="divide-y rounded-xl border">
              {visiblePosts.map((post) => (
                <li key={post.title}>
                  <a
                    href="#"
                    className="group flex flex-col gap-3 p-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          <Hash className="size-3" />
                          {post.tag}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight group-hover:underline">
                        {post.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Avatar className="size-5">
                            <AvatarImage src={post.avatar} alt="" />
                            <AvatarFallback>
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="size-3" />
                          {post.reads}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="hidden size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 sm:block" />
                  </a>
                </li>
              ))}
              {visiblePosts.length === 0 && (
                <li className="p-12 text-center font-mono text-sm text-muted-foreground">
                  // no articles tagged #{activeTag}
                </li>
              )}
            </ul>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="gap-2 font-mono">
                load_more()
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-8">
            <Card>
              <CardContent className="px-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <Flame className="size-4 text-primary" />
                  Popular this week
                </h3>
                <ul className="mt-4 space-y-4">
                  {POPULAR.map((item) => (
                    <li key={item.rank}>
                      <a href="#" className="group flex items-start gap-3">
                        <span className="font-mono text-lg font-semibold text-muted-foreground/50">
                          {item.rank}
                        </span>
                        <div>
                          <p className="text-sm font-medium leading-snug group-hover:underline">
                            {item.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="size-3" />
                            {item.reads} reads
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Top authors
                </h3>
                <ul className="mt-4 space-y-3">
                  {AUTHORS.map((a) => (
                    <li key={a.name} className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={a.avatar} alt="" />
                        <AvatarFallback>
                          {a.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.role}</p>
                      </div>
                      <span className="ml-auto font-mono text-xs text-muted-foreground">
                        {a.posts} posts
                      </span>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="mt-4 w-full gap-1">
                  View all authors
                  <ArrowRight className="size-3.5" />
                </Button>
              </CardContent>
            </Card>

            {/* Subscribe — terminal styled */}
            <Card className="overflow-hidden border-primary/20 bg-primary/10">
              <div className="flex items-center gap-1.5 border-b border-primary/20 bg-background/40 px-4 py-2">
                <span className="size-2.5 rounded-full bg-muted-foreground/40" />
                <span className="size-2.5 rounded-full bg-muted-foreground/40" />
                <span className="size-2.5 rounded-full bg-muted-foreground/40" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  ~/subscribe.sh
                </span>
              </div>
              <CardContent className="px-5">
                <Bookmark className="size-6 text-primary" />
                <h3 className="mt-3 text-base font-semibold">The Weekly Build</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  One deep engineering read every Thursday. No fluff, no recruiter spam.
                </p>
                <form className="mt-4 space-y-2" onSubmit={(e) => e.preventDefault()}>
                  <Input
                    type="email"
                    placeholder="dev@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="font-mono text-sm"
                    aria-label="Email address"
                  />
                  <Button type="submit" className="w-full font-mono">
                    $ subscribe
                  </Button>
                </form>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  # 31,400 devs already subscribed
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Full-width CTA */}
        <section className="mt-16 overflow-hidden rounded-2xl border bg-muted/30 px-6 py-12 text-center sm:px-12">
          <Terminal className="mx-auto size-8 text-primary" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Write for stdout.dev
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            We pay for original, deeply technical writing — postmortems, architecture
            teardowns, and the war stories nobody else will publish.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="gap-2 font-mono">
              Pitch an article
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline">
              Read contributor guide
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 font-mono font-semibold tracking-tight">
              <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
                <Terminal className="size-4" />
              </span>
              <span className="text-lg">stdout.dev</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              A blog by engineers, for engineers. Real systems, real trade-offs.
            </p>
            <div className="mt-4 flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="RSS feed">
                <Rss className="size-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Topics</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {TAGS.slice(1, 6).map((t) => (
                <li key={t}>
                  <a href="#" className="font-mono hover:text-foreground">
                    #{t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["Archive", "RSS Feed", "Sponsor", "Write for us", "Style guide"].map(
                (l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Get the digest</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              The best of stdout.dev, weekly.
            </p>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Email" className="font-mono text-sm" aria-label="Email address" />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </div>
        <Separator />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p className="font-mono">© 2026 stdout.dev — MIT-spirited, ad-free.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">RSS</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
