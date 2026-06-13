"use client"

import * as React from "react"
import {
  TrendingUp,
  PiggyBank,
  Wallet,
  Calculator,
  Receipt,
  Search,
  Menu,
  ArrowRight,
  Clock,
  ShieldCheck,
  Mail,
  Twitter,
  Linkedin,
  Rss,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Category = "All" | "Investing" | "Saving" | "Budgeting" | "Taxes"

const CATEGORIES: Category[] = ["All", "Investing", "Saving", "Budgeting", "Taxes"]

const ARTICLES = [
  {
    title: "Index Funds vs ETFs: Which Belongs in Your Portfolio",
    excerpt:
      "A plain-English breakdown of fees, taxes, and flexibility so you can pick the wrapper that actually fits your goals.",
    category: "Investing" as Category,
    readMins: 9,
    author: "Maya Reyes",
    initials: "MR",
    tag: "Portfolio",
  },
  {
    title: "The 5-Account Method for Automatic Saving",
    excerpt:
      "Split every paycheck across five buckets and let automation do the discipline for you. Setup takes one afternoon.",
    category: "Saving" as Category,
    readMins: 6,
    author: "Daniel Okafor",
    initials: "DO",
    tag: "Habits",
  },
  {
    title: "Zero-Based Budgeting Without the Spreadsheet Fatigue",
    excerpt:
      "Give every dollar a job using a lightweight system that survives real life and the occasional impulse purchase.",
    category: "Budgeting" as Category,
    readMins: 7,
    author: "Priya Nair",
    initials: "PN",
    tag: "Planning",
  },
  {
    title: "Tax-Loss Harvesting Explained for Normal People",
    excerpt:
      "Turn a down market into a smaller tax bill. Here is when it helps, when it backfires, and the wash-sale trap.",
    category: "Taxes" as Category,
    readMins: 11,
    author: "Maya Reyes",
    initials: "MR",
    tag: "Strategy",
  },
  {
    title: "Dollar-Cost Averaging Through Volatile Markets",
    excerpt:
      "Why steady, boring contributions tend to beat trying to time the perfect entry, with the math to back it up.",
    category: "Investing" as Category,
    readMins: 8,
    author: "Liam Carter",
    initials: "LC",
    tag: "Mindset",
  },
  {
    title: "Build a 6-Month Emergency Fund on Any Income",
    excerpt:
      "A realistic, milestone-based plan to reach financial breathing room without feeling deprived along the way.",
    category: "Saving" as Category,
    readMins: 5,
    author: "Daniel Okafor",
    initials: "DO",
    tag: "Safety Net",
  },
]

const POPULAR = [
  { title: "Roth vs Traditional IRA: The Honest Comparison", category: "Investing" as Category, reads: "42k" },
  { title: "How to Cut Subscriptions Without Feeling It", category: "Budgeting" as Category, reads: "38k" },
  { title: "Sinking Funds: Saving for the Predictable", category: "Saving" as Category, reads: "31k" },
  { title: "Deductions Most Filers Forget to Claim", category: "Taxes" as Category, reads: "27k" },
]

const CATEGORY_ICONS: Record<Category, React.ComponentType<{ className?: string }>> = {
  All: TrendingUp,
  Investing: TrendingUp,
  Saving: PiggyBank,
  Budgeting: Wallet,
  Taxes: Receipt,
}

export default function FinanceBlog() {
  const [active, setActive] = React.useState<Category>("All")

  const filtered = active === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PiggyBank className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Ledger & Latte</span>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#articles" className="transition-colors hover:text-foreground">Guides</a>
            <a href="#popular" className="transition-colors hover:text-foreground">Popular</a>
            <a href="#calculator" className="transition-colors hover:text-foreground">Calculators</a>
            <a href="#newsletter" className="transition-colors hover:text-foreground">Newsletter</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search articles" className="hidden sm:inline-flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">Subscribe</Button>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Featured guide
                </Badge>
                <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Money advice you can actually trust, minus the hype.
                </h1>
                <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                  Practical, jargon-free guides on investing, saving, and taxes, written by certified planners and
                  fact-checked before they ever reach your inbox.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button size="lg" className="gap-2">
                    Read the starter guide <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Browse all topics
                  </Button>
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-primary" /> No sponsored picks
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" /> Updated weekly
                  </span>
                </div>
              </div>
              <Card className="overflow-hidden">
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-primary/15 via-accent to-muted">
                  <div className="flex h-full flex-col justify-end p-6">
                    <Badge className="mb-3 w-fit">Investing</Badge>
                    <h2 className="text-xl font-semibold leading-snug sm:text-2xl">
                      The First $10,000: A Step-by-Step Investing Roadmap
                    </h2>
                  </div>
                </div>
                <CardContent className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium leading-none">Maya Reyes, CFP</p>
                      <p className="mt-1 text-muted-foreground">14 min read</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Read featured guide">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:py-16">
          <div className="lg:col-span-2">
            <div id="articles" className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">Latest guides</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Filter by what you are working on right now.
              </p>
            </div>

            <div className="mb-7 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat]
                const isActive = active === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    aria-pressed={isActive}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat}
                  </button>
                )
              })}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((article) => (
                <Card key={article.title} className="flex flex-col transition-shadow hover:shadow-md">
                  <div className="aspect-[16/9] w-full rounded-t-xl bg-gradient-to-br from-muted via-accent to-primary/10" />
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">{article.tag}</span>
                    </div>
                    <CardTitle className="text-base leading-snug">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-3">
                    <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">{article.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{article.author}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readMins} min
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="rounded-lg border border-dashed py-12 text-center text-sm text-muted-foreground">
                No guides in this category yet. Check back soon.
              </p>
            )}
          </div>

          <aside className="space-y-6">
            <Card id="popular">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" /> Popular this month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {POPULAR.map((item, i) => (
                  <div key={item.title}>
                    <a
                      href="#articles"
                      className="group flex items-start gap-3 rounded-md py-2.5 transition-colors hover:bg-muted/60"
                    >
                      <span className="mt-0.5 text-base font-semibold tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-medium leading-snug group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.category} · {item.reads} reads
                        </p>
                      </div>
                    </a>
                    {i < POPULAR.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card id="calculator" className="bg-primary/10">
              <CardHeader>
                <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Calculator className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">Compound interest calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  See how a monthly contribution could grow over 30 years. Free, no signup, instant results.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border bg-background p-3">
                    <p className="text-xs text-muted-foreground">Monthly</p>
                    <p className="text-lg font-semibold tabular-nums">$300</p>
                  </div>
                  <div className="rounded-lg border bg-background p-3">
                    <p className="text-xs text-muted-foreground">In 30 yrs</p>
                    <p className="text-lg font-semibold tabular-nums text-primary">$367k</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  Open calculator <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>

        <section id="newsletter" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-14 text-center sm:px-6">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The Sunday money brief
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              One short email every week: a single actionable tip, a chart worth seeing, and the one number to watch.
              Join 84,000 readers.
            </p>
            <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="you@example.com" aria-label="Email address" className="bg-background" />
              <Button type="submit" className="shrink-0">Subscribe free</Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe in one click.</p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <PiggyBank className="h-4 w-4" />
                </span>
                <span className="font-semibold">Ledger & Latte</span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Independent personal-finance education. We never sell your data and never take pay-to-play product spots.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Topics</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#articles" className="hover:text-foreground">Investing</a></li>
                <li><a href="#articles" className="hover:text-foreground">Saving</a></li>
                <li><a href="#articles" className="hover:text-foreground">Budgeting</a></li>
                <li><a href="#articles" className="hover:text-foreground">Taxes</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About us</a></li>
                <li><a href="#" className="hover:text-foreground">Editorial policy</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Follow along</h3>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="icon" aria-label="Twitter"><Twitter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" aria-label="RSS feed"><Rss className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
          <Separator className="my-7" />
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <p>© 2026 Ledger & Latte. Educational content, not individualized financial advice.</p>
            <p>Made for people who like their money boring.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
