"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  Flame,
  Mail,
  Menu,
  Rss,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const CATEGORIES = ["All", "SEO", "Content", "Social", "Email", "Ads"] as const
type Category = (typeof CATEGORIES)[number]

const ARTICLES: {
  title: string
  excerpt: string
  category: Exclude<Category, "All">
  readTime: string
  author: string
  initials: string
}[] = [
  {
    title: "The 2026 SEO playbook: ranking when AI eats the SERP",
    excerpt: "Search results are changing fast. Here is how to keep organic traffic compounding when answer boxes take the top fold.",
    category: "SEO",
    readTime: "9 min",
    author: "Priya Nair",
    initials: "PN",
  },
  {
    title: "Build a content engine that ships every single week",
    excerpt: "A repeatable system for briefs, drafts, and distribution so your editorial calendar never runs dry again.",
    category: "Content",
    readTime: "7 min",
    author: "Marcus Bell",
    initials: "MB",
  },
  {
    title: "LinkedIn growth: 12 hooks that doubled our reach",
    excerpt: "The exact opening lines, formats, and posting cadence we used to grow from 4k to 80k followers in a year.",
    category: "Social",
    readTime: "6 min",
    author: "Dana Cho",
    initials: "DC",
  },
  {
    title: "Welcome sequences that actually convert subscribers",
    excerpt: "Five emails, mapped to intent, that turn a fresh signup into a paying customer within the first two weeks.",
    category: "Email",
    readTime: "8 min",
    author: "Liam Foster",
    initials: "LF",
  },
  {
    title: "Cutting CPA by 38% with creative testing, not bidding",
    excerpt: "Why your ad account is creative-bound, and a simple weekly testing loop to find winners before budget burns.",
    category: "Ads",
    readTime: "10 min",
    author: "Sofia Reyes",
    initials: "SR",
  },
  {
    title: "Topic clusters: the link architecture Google rewards",
    excerpt: "Stop publishing orphan posts. Map pillars and supporting pages to build authority search engines can read.",
    category: "SEO",
    readTime: "11 min",
    author: "Priya Nair",
    initials: "PN",
  },
  {
    title: "Repurpose one post into ten pieces of content",
    excerpt: "A teardown of our atomic content workflow: one long-form essay, ten downstream assets, zero extra writing.",
    category: "Content",
    readTime: "5 min",
    author: "Marcus Bell",
    initials: "MB",
  },
  {
    title: "Re-engagement emails that win back cold lists",
    excerpt: "Before you scrub dormant subscribers, run this three-email win-back flow. We recovered 22% of a dead list.",
    category: "Email",
    readTime: "6 min",
    author: "Liam Foster",
    initials: "LF",
  },
  {
    title: "Short-form video for B2B: a starter framework",
    excerpt: "You do not need a studio. A lightweight script-to-screen process for founders who hate being on camera.",
    category: "Social",
    readTime: "7 min",
    author: "Dana Cho",
    initials: "DC",
  },
]

const POPULAR = [
  { title: "The complete guide to keyword intent", views: "24.1k", category: "SEO" },
  { title: "How we hit $1M ARR with content alone", views: "19.8k", category: "Content" },
  { title: "Email subject lines: a swipe file", views: "17.3k", category: "Email" },
  { title: "Retargeting funnels that don't annoy", views: "12.6k", category: "Ads" },
]

const CATEGORY_VARIANT: Record<Exclude<Category, "All">, "default" | "secondary" | "outline"> = {
  SEO: "default",
  Content: "secondary",
  Social: "outline",
  Email: "secondary",
  Ads: "outline",
}

export default function MarketingBlogPage() {
  const [active, setActive] = React.useState<Category>("All")

  const filtered =
    active === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </span>
            <span className="text-base">Growthletter</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#articles" className="transition-colors hover:text-foreground">Articles</a>
            <a href="#resources" className="transition-colors hover:text-foreground">Resources</a>
            <a href="#newsletter" className="transition-colors hover:text-foreground">Newsletter</a>
            <a href="#" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search articles">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">Subscribe</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero featured guide */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="mb-6 flex items-center gap-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Featured guide</span>
            </div>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Badge variant="default" className="mb-4">SEO</Badge>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  The growth marketer's guide to compounding traffic
                </h1>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                  A 47-page deep dive on building channels that grow while you sleep, from search and content
                  to lifecycle email. Free, no fluff, packed with templates.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button size="lg">
                    Read the guide
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    <BookOpen className="h-4 w-4" />
                    Browse chapters
                  </Button>
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>PN</AvatarFallback>
                    </Avatar>
                    <span>By Priya Nair</span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> 22 min read
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-primary/10">
                  <TrendingUp className="h-16 w-16 text-primary" aria-hidden="true" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">3.4x</div>
                    <div className="text-xs text-muted-foreground">avg. traffic lift</div>
                  </div>
                  <div className="border-x">
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-xs text-muted-foreground">actionable plays</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12k</div>
                    <div className="text-xs text-muted-foreground">marketers read it</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles + sidebar */}
        <section id="articles" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Latest articles</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Tactical breakdowns from the people doing the work.
                  </p>
                </div>
              </div>

              {/* Category filter chips */}
              <div className="mb-8 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-pressed={active === cat}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      active === cat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {filtered.map((article) => (
                  <Card
                    key={article.title}
                    className="group overflow-hidden pt-0 transition-shadow hover:shadow-md"
                  >
                    <div className="flex aspect-[16/9] items-center justify-center bg-muted">
                      <BookOpen className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <CardHeader>
                      <Badge variant={CATEGORY_VARIANT[article.category]} className="mb-1">
                        {article.category}
                      </Badge>
                      <CardTitle className="text-lg leading-snug transition-colors group-hover:text-primary">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="justify-between border-t pt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-[10px]">{article.initials}</AvatarFallback>
                        </Avatar>
                        <span>{article.author}</span>
                      </div>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {article.readTime}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
                  No articles in this category yet.
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside id="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Flame className="h-4 w-4 text-primary" />
                    Popular resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {POPULAR.map((item, i) => (
                    <React.Fragment key={item.title}>
                      {i > 0 && <Separator />}
                      <a
                        href="#"
                        className="group flex items-start gap-3 py-3 text-sm transition-colors hover:text-primary"
                      >
                        <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                        <span className="flex-1">
                          <span className="font-medium leading-snug">{item.title}</span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {item.category} · {item.views} reads
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </a>
                    </React.Fragment>
                  ))}
                </CardContent>
              </Card>

              {/* Lead magnet card */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/15">
                    <Download className="h-5 w-5" />
                  </span>
                  <CardTitle className="mt-3 text-lg">Free: 30 high-converting CTA templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary-foreground/80">
                    Swipe the exact calls-to-action we use across landing pages, emails, and ads.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    Get the templates
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="flex items-center gap-3 py-2 text-sm">
                  <Rss className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    Prefer a reader? Grab the <a href="#" className="font-medium text-foreground underline-offset-2 hover:underline">RSS feed</a>.
                  </span>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        {/* Newsletter signup */}
        <section id="newsletter" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Join 38,000 marketers getting one tactic every Tuesday
            </h2>
            <p className="mt-3 text-muted-foreground">
              Short, actionable, and free. The growth ideas we wish we had earlier, delivered weekly.
            </p>
            <form
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="you@company.com"
                aria-label="Email address"
                className="bg-background"
              />
              <Button type="submit">Subscribe free</Button>
            </form>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No spam, ever
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Unsubscribe anytime
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Read in under 4 minutes
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <span>Growthletter</span>
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Practical growth marketing, written by operators.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Topics</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">SEO</a></li>
                <li><a href="#" className="hover:text-foreground">Content</a></li>
                <li><a href="#" className="hover:text-foreground">Social</a></li>
                <li><a href="#" className="hover:text-foreground">Email & Ads</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Write for us</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Stay in the loop</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                One tactic, every Tuesday.
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                <Rss className="h-4 w-4" />
                Subscribe via RSS
              </Button>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Growthletter. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
