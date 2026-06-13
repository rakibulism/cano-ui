"use client"

import * as React from "react"
import {
  Mail,
  Search,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Inbox,
  Clock,
  Twitter,
  Rss,
  CheckCircle2,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type Issue = {
  number: number
  date: string
  title: string
  summary: string
  readTime: string
  tag: string
  reads: string
}

const ISSUES: Issue[] = [
  {
    number: 48,
    date: "Jun 6, 2026",
    title: "The Slow Web Is Coming Back",
    summary:
      "Why a quiet movement of hand-built sites and personal blogs is reshaping how we think about the internet — and what it means for makers.",
    readTime: "7 min",
    tag: "Essay",
    reads: "12.4k",
  },
  {
    number: 47,
    date: "May 30, 2026",
    title: "Five Tools That Replaced My Entire Stack",
    summary:
      "I spent a month cutting subscriptions and consolidating workflows. Here is the lean toolkit that survived the purge.",
    readTime: "5 min",
    tag: "Toolkit",
    reads: "9.1k",
  },
  {
    number: 46,
    date: "May 23, 2026",
    title: "How I Write 1,000 Words Before Breakfast",
    summary:
      "A look at the morning ritual that turned a stalled draft into a weekly habit, with the exact prompts I use to break the blank page.",
    readTime: "6 min",
    tag: "Craft",
    reads: "15.2k",
  },
  {
    number: 45,
    date: "May 16, 2026",
    title: "Notes on Building a Tiny Audience",
    summary:
      "You do not need a million subscribers. You need a thousand who actually open the email. Here is how the math really works.",
    readTime: "8 min",
    tag: "Growth",
    reads: "11.7k",
  },
  {
    number: 44,
    date: "May 9, 2026",
    title: "The Case Against Productivity",
    summary:
      "What if doing less, more deliberately, is the real unlock? A contrarian take on the optimization culture eating creative work.",
    readTime: "9 min",
    tag: "Essay",
    reads: "18.9k",
  },
  {
    number: 43,
    date: "May 2, 2026",
    title: "My Reading List for a Quiet Month",
    summary:
      "Seven books that pulled me out of a creative rut, plus a short note on why I stopped reading productivity titles entirely.",
    readTime: "4 min",
    tag: "Toolkit",
    reads: "7.3k",
  },
]

const POPULAR = [
  { number: 44, title: "The Case Against Productivity", reads: "18.9k" },
  { number: 46, title: "How I Write 1,000 Words Before Breakfast", reads: "15.2k" },
  { number: 48, title: "The Slow Web Is Coming Back", reads: "12.4k" },
]

const STATS = [
  { label: "Issues published", value: "48" },
  { label: "Subscribers", value: "24.6k" },
  { label: "Avg. open rate", value: "62%" },
]

export default function NewsletterArchive() {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ISSUES
    return ISSUES.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.summary.toLowerCase().includes(q) ||
        i.tag.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Mail className="size-4" />
            </span>
            The Margins
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <a href="#archive" className="transition-colors hover:text-foreground">
              Archive
            </a>
            <a href="#popular" className="transition-colors hover:text-foreground">
              Popular
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              About
            </a>
          </nav>
          <Button size="sm" className="gap-1.5">
            Subscribe
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 text-center sm:py-20">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Sparkles className="size-3.5" />
              A weekly letter for makers
            </Badge>
            <h1 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Notes from the edges of creative work
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              Every Saturday I send one essay on writing, building, and the quiet
              craft of doing meaningful work. No spam, unsubscribe anytime.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1">
                <Inbox className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="pl-9"
                />
              </div>
              <Button type="submit" className="gap-1.5">
                Subscribe
              </Button>
            </form>
            <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-semibold tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 py-14 lg:grid-cols-[1fr_280px]">
          <div id="archive" className="min-w-0">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  All issues
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse every letter ever sent.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search issues..."
                  aria-label="Search issues"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map((issue) => (
                <Card
                  key={issue.number}
                  className="group cursor-pointer transition-colors hover:border-primary/40"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Issue #{issue.number}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {issue.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {issue.readTime}
                      </span>
                      <Badge variant="outline" className="ml-auto">
                        {issue.tag}
                      </Badge>
                    </div>
                    <h3 className="mt-3 flex items-center gap-1.5 text-lg font-semibold tracking-tight">
                      {issue.title}
                      <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {issue.summary}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {filtered.length === 0 && (
                <div className="rounded-lg border border-dashed py-16 text-center">
                  <Search className="mx-auto size-6 text-muted-foreground" />
                  <p className="mt-3 text-sm font-medium">No issues found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a different search term.
                  </p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-8">
            <div id="popular">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <TrendingUp className="size-4" />
                Popular issues
              </h3>
              <div className="mt-4 space-y-4">
                {POPULAR.map((p, idx) => (
                  <a
                    key={p.number}
                    href="#"
                    className="flex gap-3 text-sm transition-colors hover:text-primary"
                  >
                    <span className="text-lg font-semibold tabular-nums text-muted-foreground">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-medium leading-snug">{p.title}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        Issue #{p.number} · {p.reads} reads
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <Separator />

            <Card id="about" className="bg-muted/30">
              <CardContent className="p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  About the author
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://i.pravatar.cc/120?img=12"
                      alt=""
                    />
                    <AvatarFallback>RH</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Rosa Hale</div>
                    <div className="text-xs text-muted-foreground">
                      Writer & independent maker
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  I write about the unglamorous side of creative work — the habits,
                  doubts, and small wins that rarely make the highlight reel.
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="icon" aria-label="Twitter">
                    <Twitter className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="RSS feed">
                    <Rss className="size-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Mail className="size-4" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/10">
              <CardContent className="p-5">
                <CheckCircle2 className="size-5 text-primary" />
                <h3 className="mt-3 font-semibold">Never miss an issue</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Join 24,600 readers getting the letter every Saturday.
                </p>
                <form
                  className="mt-4 space-y-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                  />
                  <Button type="submit" className="w-full">
                    Subscribe free
                  </Button>
                </form>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Mail className="size-4" />
            The Margins
          </div>
          <p>© 2026 Rosa Hale. A letter for makers.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Archive
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              RSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
