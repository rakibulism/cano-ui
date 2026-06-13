"use client"

import * as React from "react"
import {
  Search,
  Menu,
  ArrowRight,
  ArrowUpRight,
  Clock,
  TrendingUp,
  Mail,
  Twitter,
  Instagram,
  Github,
  Rss,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const CATEGORIES = [
  "Design",
  "Engineering",
  "Culture",
  "Product",
  "Startups",
  "AI",
] as const

const FEATURED = {
  category: "Product",
  title: "The Quiet Revolution in How We Build Software Teams",
  excerpt:
    "Distributed-first companies are rewriting the playbook on collaboration. We spent six months inside three of them to find out what actually works — and what quietly falls apart.",
  author: "Maya Chen",
  avatar: "https://i.pravatar.cc/120?img=47",
  date: "Jun 11, 2026",
  readTime: "9 min read",
  image:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
}

const POSTS = [
  {
    category: "Design",
    title: "Designing for Calm: Interfaces That Respect Attention",
    excerpt:
      "What if your product fought for less of the user's time, not more? A field guide to restraint.",
    author: "Priya Nair",
    avatar: "https://i.pravatar.cc/120?img=32",
    date: "Jun 9, 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Engineering",
    title: "Why Your Migrations Keep Breaking on Friday Afternoons",
    excerpt:
      "Schema changes are deceptively social. The fix is rarely technical — it's about who knows what, when.",
    author: "Daniel Okafor",
    avatar: "https://i.pravatar.cc/120?img=12",
    date: "Jun 7, 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "AI",
    title: "Small Models, Big Footprints: The New Edge Computing",
    excerpt:
      "On-device inference is finally good enough to matter. Here's what changes for product teams.",
    author: "Sofia Alvarez",
    avatar: "https://i.pravatar.cc/120?img=24",
    date: "Jun 5, 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Culture",
    title: "The Four-Day Week, Two Years In: An Honest Ledger",
    excerpt:
      "We promised to report back. The wins were real. So were the costs nobody warns you about.",
    author: "Tom Becker",
    avatar: "https://i.pravatar.cc/120?img=53",
    date: "Jun 3, 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
  },
]

const TRENDING = [
  { rank: "01", title: "A Field Note on Naming Things Well", views: "12.4k" },
  { rank: "02", title: "The Case Against the All-Hands Meeting", views: "9.8k" },
  { rank: "03", title: "How We Cut Our Build Time in Half", views: "8.1k" },
  { rank: "04", title: "Writing Docs Nobody Hates Reading", views: "6.7k" },
  { rank: "05", title: "Onboarding Is a Product. Treat It Like One.", views: "5.2k" },
]

const TOPICS = [
  "Remote Work",
  "Typography",
  "Hiring",
  "Open Source",
  "Leadership",
  "Tooling",
  "Research",
  "Burnout",
]

export default function BlogMagazine() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All")
  const [email, setEmail] = React.useState("")

  const visiblePosts =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Rss className="size-4" />
            </span>
            <span className="text-lg">The Margin</span>
          </a>
          <nav className="ml-6 hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
            {CATEGORIES.map((c) => (
              <a
                key={c}
                href="#"
                className="transition-colors hover:text-foreground"
              >
                {c}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search stories"
                className="w-48 pl-9"
                aria-label="Search stories"
              />
            </div>
            <Button size="sm">Subscribe</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {/* Featured hero */}
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <Badge variant="secondary" className="mb-4">
              {FEATURED.category}
            </Badge>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {FEATURED.title}
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {FEATURED.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={FEATURED.avatar} alt="" />
                  <AvatarFallback>MC</AvatarFallback>
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
                Read story
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="order-1 overflow-hidden rounded-xl border lg:order-2">
            <img
              src={FEATURED.image}
              alt=""
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </section>

        <Separator className="my-12" />

        {/* Body: posts grid + sidebar */}
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Latest posts */}
          <section className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight">Latest stories</h2>
              <div className="flex flex-wrap items-center gap-2">
                {(["All", ...CATEGORIES] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCategory(c)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm transition-colors",
                      activeCategory === c
                        ? "border-primary bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {visiblePosts.map((post) => (
                <Card
                  key={post.title}
                  className="group overflow-hidden pt-0 transition-shadow hover:shadow-md"
                >
                  <div className="overflow-hidden">
                    <img
                      src={post.image}
                      alt=""
                      className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="px-5">
                    <Badge variant="outline" className="mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-lg font-semibold leading-snug tracking-tight">
                      <a href="#" className="hover:underline">
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Avatar className="size-7">
                        <AvatarImage src={post.avatar} alt="" />
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{post.author}</span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {visiblePosts.length === 0 && (
              <p className="rounded-lg border border-dashed py-12 text-center text-sm text-muted-foreground">
                No stories in this category yet.
              </p>
            )}

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="gap-2">
                Load more stories
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-8">
            <Card>
              <CardContent className="px-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <TrendingUp className="size-4 text-primary" />
                  Trending now
                </h3>
                <ul className="mt-4 space-y-4">
                  {TRENDING.map((item) => (
                    <li key={item.rank}>
                      <a
                        href="#"
                        className="group flex items-start gap-3"
                      >
                        <span className="text-lg font-semibold text-muted-foreground/60">
                          {item.rank}
                        </span>
                        <div>
                          <p className="text-sm font-medium leading-snug group-hover:underline">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.views} reads
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
                  Explore topics
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TOPICS.map((topic) => (
                    <a key={topic} href="#">
                      <Badge
                        variant="secondary"
                        className="cursor-pointer hover:bg-accent"
                      >
                        {topic}
                      </Badge>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="px-5">
                <Mail className="size-6 text-primary" />
                <h3 className="mt-3 text-base font-semibold">The weekly dispatch</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  One thoughtful read on building and design, every Sunday. No noise.
                </p>
                <form
                  className="mt-4 space-y-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                  />
                  <Button type="submit" className="w-full">
                    Subscribe free
                  </Button>
                </form>
                <p className="mt-2 text-xs text-muted-foreground">
                  Join 24,000 readers. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Full-width newsletter CTA */}
        <section className="mt-16 overflow-hidden rounded-2xl border bg-muted/30 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Stories worth your attention, not your scroll.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Become a member to unlock the full archive, member-only essays, and our
            quarterly print edition.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="gap-2">
              Become a member
              <ArrowUpRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline">
              See membership perks
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
                <Rss className="size-4" />
              </span>
              <span className="text-lg">The Margin</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              An independent magazine about the craft of building software and the
              people who do it.
            </p>
            <div className="mt-4 flex items-center gap-1">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="size-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Sections</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c}>
                  <a href="#" className="hover:text-foreground">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["About", "Contributors", "Careers", "Ethics", "Contact"].map(
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
            <h4 className="text-sm font-semibold">Stay in the loop</h4>
            <p className="mt-3 text-sm text-muted-foreground">
              Get the best of The Margin in your inbox.
            </p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input placeholder="Email" aria-label="Email address" />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </div>
        <Separator />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 The Margin Media. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              RSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
