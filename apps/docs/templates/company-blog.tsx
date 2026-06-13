"use client"

import * as React from "react"
import {
  ArrowRight,
  Calendar,
  Clock,
  Code2,
  Cpu,
  Flame,
  Rss,
  Search,
  Send,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type Post = {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: { name: string; role: string; initials: string; avatar: string }
  accent: string
}

const CATEGORIES = ["All", "Engineering", "Product", "Design", "Infrastructure", "AI"] as const

const FEATURED: Post = {
  id: 0,
  title: "Rebuilding our event pipeline to handle 12 billion records a day",
  excerpt:
    "How we moved off a monolithic ingestion path to a partitioned, back-pressure-aware streaming architecture — and the three outages that taught us everything along the way.",
  category: "Infrastructure",
  date: "Jun 9, 2026",
  readTime: "14 min read",
  author: {
    name: "Dana Whitfield",
    role: "Principal Engineer",
    initials: "DW",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
  accent: "from-primary/20",
}

const POSTS: Post[] = [
  {
    id: 1,
    title: "Designing a type-safe feature flag system in TypeScript",
    excerpt:
      "We wanted flags that the compiler could reason about. Here is the generics-heavy API we landed on after four rewrites.",
    category: "Engineering",
    date: "Jun 7, 2026",
    readTime: "9 min read",
    author: { name: "Marco Reyes", role: "Staff Engineer", initials: "MR", avatar: "https://i.pravatar.cc/120?img=12" },
    accent: "Engineering",
  },
  {
    id: 2,
    title: "Shipping the new onboarding flow: a product retrospective",
    excerpt:
      "Activation jumped 23% after we cut three steps. The surprising part was which step actually mattered.",
    category: "Product",
    date: "Jun 5, 2026",
    readTime: "6 min read",
    author: { name: "Priya Nair", role: "Product Lead", initials: "PN", avatar: "https://i.pravatar.cc/120?img=32" },
    accent: "Product",
  },
  {
    id: 3,
    title: "A practical color system that survives dark mode",
    excerpt:
      "Semantic tokens, contrast budgets, and the one rule that kept our palette from collapsing into mush.",
    category: "Design",
    date: "Jun 3, 2026",
    readTime: "7 min read",
    author: { name: "Leah Osei", role: "Design Systems", initials: "LO", avatar: "https://i.pravatar.cc/120?img=20" },
    accent: "Design",
  },
  {
    id: 4,
    title: "Cutting our Kubernetes bill by 40% without hurting latency",
    excerpt:
      "Right-sizing requests is boring and unglamorous. It is also where almost all of our savings came from.",
    category: "Infrastructure",
    date: "Jun 1, 2026",
    readTime: "11 min read",
    author: { name: "Tomas Berg", role: "SRE", initials: "TB", avatar: "https://i.pravatar.cc/120?img=51" },
    accent: "Infrastructure",
  },
  {
    id: 5,
    title: "Evaluating LLMs for code review without lying to ourselves",
    excerpt:
      "Most eval setups reward confident nonsense. We built a harness that punishes it instead.",
    category: "AI",
    date: "May 28, 2026",
    readTime: "13 min read",
    author: { name: "Hana Kim", role: "ML Engineer", initials: "HK", avatar: "https://i.pravatar.cc/120?img=44" },
    accent: "AI",
  },
  {
    id: 6,
    title: "How we run a 2,000-test suite in under four minutes",
    excerpt:
      "Sharding, smart retries, and ruthless deletion of flaky tests. A tour of our CI internals.",
    category: "Engineering",
    date: "May 24, 2026",
    readTime: "8 min read",
    author: { name: "Owen Clarke", role: "Platform Eng", initials: "OC", avatar: "https://i.pravatar.cc/120?img=15" },
    accent: "Engineering",
  },
]

const POPULAR = [
  { id: 11, title: "The migration that took 18 months (and was worth it)", views: "42.1k" },
  { id: 12, title: "Why we deleted 60% of our microservices", views: "38.7k" },
  { id: 13, title: "A field guide to debugging production at 3am", views: "31.4k" },
  { id: 14, title: "Postgres is still the answer most of the time", views: "29.8k" },
]

const TOPICS = ["Distributed Systems", "TypeScript", "Observability", "Design Tokens", "LLMs", "CI/CD", "Postgres"]

export default function CompanyBlogPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All")

  const filtered =
    activeCategory === "All" ? POSTS : POSTS.filter((p) => p.category === activeCategory)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </span>
            <span className="text-base tracking-tight">Northwind Labs</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
              Engineering
            </Badge>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#" className="transition-colors hover:text-foreground">Latest</a>
            <a href="#" className="transition-colors hover:text-foreground">Topics</a>
            <a href="#" className="transition-colors hover:text-foreground">Authors</a>
            <a href="#" className="transition-colors hover:text-foreground">Careers</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search posts" className="h-9 w-48 pl-8" />
            </div>
            <Button size="sm" className="gap-1.5">
              <Rss className="h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {/* Featured hero */}
        <section className="mb-12">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Flame className="h-4 w-4 text-primary" />
            Featured story
          </p>
          <Card className="overflow-hidden border-primary/30">
            <div className="grid gap-0 lg:grid-cols-2">
              <div
                className={cn(
                  "relative flex min-h-56 items-end bg-gradient-to-br to-background p-6 lg:p-8",
                  "from-primary/20 via-accent",
                )}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge>{FEATURED.category}</Badge>
                  <Badge variant="outline" className="bg-background/60">Deep dive</Badge>
                </div>
                <Cpu className="absolute right-6 top-6 h-16 w-16 text-primary/30" aria-hidden="true" />
              </div>
              <CardContent className="flex flex-col justify-center gap-4 p-6 lg:p-8">
                <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                  {FEATURED.title}
                </h1>
                <p className="text-muted-foreground">{FEATURED.excerpt}</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={FEATURED.author.avatar} alt="" />
                    <AvatarFallback>{FEATURED.author.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{FEATURED.author.name}</p>
                    <p className="text-muted-foreground">{FEATURED.author.role}</p>
                  </div>
                  <Separator orientation="vertical" className="mx-1 h-8" />
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {FEATURED.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {FEATURED.readTime}
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="gap-1.5">
                    Read the story
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Posts column */}
          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Latest posts</h2>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm transition-colors",
                      activeCategory === cat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((post) => (
                <Card
                  key={post.id}
                  className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="flex h-28 items-center justify-center bg-muted/30">
                    <Code2 className="h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-3 p-5">
                    <Badge variant="secondary" className="w-fit">{post.category}</Badge>
                    <h3 className="font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                      <a href="#">{post.title}</a>
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                    <div className="mt-auto flex items-center gap-2 pt-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={post.author.avatar} alt="" />
                        <AvatarFallback>{post.author.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author.name}</span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                No posts in this category yet.
              </p>
            )}
          </section>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                Popular this month
              </h3>
              <ol className="flex flex-col gap-4">
                {POPULAR.map((item, i) => (
                  <li key={item.id} className="flex gap-3">
                    <span className="text-lg font-bold tabular-nums text-primary/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <a
                        href="#"
                        className="text-sm font-medium leading-snug transition-colors hover:text-primary"
                      >
                        {item.title}
                      </a>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.views} reads</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Separator />

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Explore topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <a key={t} href="#">
                    <Badge variant="outline" className="hover:bg-muted">{t}</Badge>
                  </a>
                ))}
              </div>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="flex flex-col gap-3 p-5">
                <Rss className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="font-semibold leading-snug">Get the engineering digest</h3>
                <p className="text-sm text-muted-foreground">
                  One thoughtful email a week. No spam, unsubscribe anytime.
                </p>
                <Input type="email" placeholder="you@company.com" className="bg-background" />
                <Button className="w-full gap-1.5">
                  <Send className="h-4 w-4" />
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Subscribe banner */}
        <section className="mt-16">
          <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 to-background">
            <CardContent className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold tracking-tight">
                  Build with us — read how we build.
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Join 18,000+ engineers getting our deep dives, postmortems, and product
                  retrospectives delivered straight to their inbox.
                </p>
              </div>
              <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
                <Input type="email" placeholder="you@company.com" className="bg-background" />
                <Button className="shrink-0 gap-1.5">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Code2 className="h-3.5 w-3.5" />
            </span>
            Northwind Labs Engineering
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="transition-colors hover:text-foreground">RSS</a>
            <a href="#" className="transition-colors hover:text-foreground">GitHub</a>
            <a href="#" className="transition-colors hover:text-foreground">Careers</a>
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
          </nav>
          <p>© 2026 Northwind Labs</p>
        </div>
      </footer>
    </div>
  )
}
