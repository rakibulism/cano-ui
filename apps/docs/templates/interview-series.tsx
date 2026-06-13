"use client"

import * as React from "react"
import {
  MessageSquareQuote,
  ArrowRight,
  ArrowUpRight,
  Mic,
  Clock,
  Calendar,
  Quote,
  Mail,
  Search,
  Twitter,
  Linkedin,
  Rss,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const topics = ["All", "Founders", "Design", "Engineering", "Career"] as const
type Topic = (typeof topics)[number]

const featured = {
  guest: "Priya Raman",
  initials: "PR",
  role: "Co-founder & CEO, Lumen Labs",
  topic: "Founders" as Topic,
  issue: "Issue No. 048",
  readTime: "18 min read",
  date: "Jun 11, 2026",
  title: "On building a company that refuses to rush",
  excerpt:
    "We sat down with Priya to talk about slow growth as a strategy, the discipline of saying no to good ideas, and why she still answers every support ticket on Fridays.",
}

const interviews = [
  {
    guest: "Marcus Lindqvist",
    initials: "ML",
    role: "Staff Engineer, Veridian",
    topic: "Engineering" as Topic,
    title: "The quiet art of deleting code",
    excerpt:
      "Why the best engineering work often leaves the codebase smaller than it found it.",
    readTime: "12 min",
    date: "Jun 6, 2026",
  },
  {
    guest: "Adaeze Okonkwo",
    initials: "AO",
    role: "Head of Design, Northwind",
    topic: "Design" as Topic,
    title: "Designing for the people who never read the docs",
    excerpt:
      "On intuition, defaults, and the empathy it takes to design for the impatient majority.",
    readTime: "15 min",
    date: "Jun 2, 2026",
  },
  {
    guest: "Theo Vance",
    initials: "TV",
    role: "Founder, Halcyon",
    topic: "Founders" as Topic,
    title: "Bootstrapping past the point of comfort",
    excerpt:
      "Eight years, zero outside money, and the trade-offs nobody warns you about.",
    readTime: "20 min",
    date: "May 28, 2026",
  },
  {
    guest: "Joan Mercer",
    initials: "JM",
    role: "Engineering Manager, Cardinal",
    topic: "Career" as Topic,
    title: "How to grow without becoming a manager",
    excerpt:
      "Mapping a senior IC track when every promotion seems to point at meetings.",
    readTime: "11 min",
    date: "May 22, 2026",
  },
  {
    guest: "Rafael Costa",
    initials: "RC",
    role: "Principal Engineer, Aperture",
    topic: "Engineering" as Topic,
    title: "Latency is a feature, not a bug report",
    excerpt:
      "A candid conversation about performance culture and treating speed as design.",
    readTime: "14 min",
    date: "May 16, 2026",
  },
  {
    guest: "Ines Dubois",
    initials: "ID",
    role: "Creative Director, Atelier Nine",
    topic: "Design" as Topic,
    title: "Taste is a skill you can practice",
    excerpt:
      "On developing an eye, defending the details, and learning to articulate why.",
    readTime: "13 min",
    date: "May 9, 2026",
  },
]

const guests = [
  { name: "Priya Raman", role: "CEO, Lumen Labs", initials: "PR" },
  { name: "Marcus Lindqvist", role: "Staff Eng, Veridian", initials: "ML" },
  { name: "Adaeze Okonkwo", role: "Head of Design", initials: "AO" },
  { name: "Theo Vance", role: "Founder, Halcyon", initials: "TV" },
  { name: "Joan Mercer", role: "EM, Cardinal", initials: "JM" },
]

const stats = [
  { value: "48", label: "Interviews" },
  { value: "26k", label: "Subscribers" },
  { value: "Weekly", label: "New issue" },
]

export default function InterviewSeries() {
  const [active, setActive] = React.useState<Topic>("All")

  const filtered =
    active === "All"
      ? interviews
      : interviews.filter((i) => i.topic === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MessageSquareQuote className="size-4" />
            </span>
            <span>The Long Answer</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#interviews" className="transition-colors hover:text-foreground">
              Interviews
            </a>
            <a href="#guests" className="transition-colors hover:text-foreground">
              Guests
            </a>
            <a href="#subscribe" className="transition-colors hover:text-foreground">
              Subscribe
            </a>
          </nav>
          <Button size="sm" variant="outline" className="gap-2">
            <Search className="size-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero — latest interview */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Mic className="size-3" />
                Latest interview · {featured.issue}
              </Badge>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">
                In conversation with
              </p>
              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                {featured.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="mt-7 flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {featured.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-semibold">{featured.guest}</p>
                  <p className="text-muted-foreground">{featured.role}</p>
                </div>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Read the interview
                  <ArrowRight className="size-4" />
                </Button>
                <span className="inline-flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" />
                    {featured.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    {featured.date}
                  </span>
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border bg-muted shadow-sm">
                <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-to-br from-primary/20 via-muted to-accent p-8 text-center">
                  <Avatar className="size-28 border-4 border-background shadow-sm">
                    <AvatarFallback className="bg-primary text-3xl font-bold text-primary-foreground">
                      {featured.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-bold">{featured.guest}</p>
                    <p className="text-sm text-muted-foreground">{featured.role}</p>
                  </div>
                  <Quote className="size-7 text-primary" />
                  <p className="max-w-xs text-sm font-medium italic text-foreground">
                    &ldquo;Speed is overrated. The companies I admire all moved
                    deliberately.&rdquo;
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border bg-card p-4 text-center"
                  >
                    <p className="text-lg font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interviews grid + sidebar */}
        <section
          id="interviews"
          className="mx-auto w-full max-w-6xl px-6 py-16"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_18rem]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    The interviews
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Long-form Q&A with the people doing the work.
                  </p>
                </div>
              </div>

              {/* Topic filter chips */}
              <div
                className="mt-6 flex flex-wrap gap-2"
                role="group"
                aria-label="Filter interviews by topic"
              >
                {topics.map((topic) => {
                  const isActive = active === topic
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setActive(topic)}
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {topic}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {filtered.map((item) => (
                  <Card
                    key={item.title}
                    className="group flex flex-col transition-colors hover:border-primary/40"
                  >
                    <CardContent className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{item.topic}</Badge>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="size-3.5" />
                          {item.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                        {item.excerpt}
                      </p>
                      <Separator className="my-4" />
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                            {item.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {item.guest}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.role}
                          </p>
                        </div>
                        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="mt-10 rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                  No interviews in this topic yet — check back soon.
                </p>
              )}
            </div>

            {/* Guests sidebar */}
            <aside id="guests" className="lg:sticky lg:top-24 lg:self-start">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold uppercase tracking-wide">
                      Recent guests
                    </h3>
                  </div>
                  <ul className="mt-5 flex flex-col gap-4">
                    {guests.map((g) => (
                      <li key={g.name} className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-muted text-xs font-semibold">
                            {g.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{g.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {g.role}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Separator className="my-5" />
                  <p className="text-sm text-muted-foreground">
                    Know someone with a story worth telling?
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 w-full gap-2">
                    Suggest a guest
                    <ArrowRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        {/* Newsletter signup */}
        <section id="subscribe" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <Card className="overflow-hidden border-primary/40">
              <CardContent className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <Badge variant="secondary" className="mb-4 gap-1.5">
                    <Mail className="size-3" />
                    One thoughtful email a week
                  </Badge>
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Get the next interview in your inbox
                  </h2>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Every Thursday we send the full Q&A, plus a few links and
                    a question worth sitting with. No noise, unsubscribe anytime.
                  </p>
                </div>
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      aria-label="Email address"
                      className="h-12 flex-1"
                    />
                    <Button size="lg" type="submit" className="h-12 gap-2">
                      Subscribe
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Join 26,000+ readers. We never share your address.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MessageSquareQuote className="size-4" />
            </span>
            The Long Answer
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="#interviews" className="transition-colors hover:text-foreground">
              Interviews
            </a>
            <a href="#guests" className="transition-colors hover:text-foreground">
              Guests
            </a>
            <a href="#subscribe" className="transition-colors hover:text-foreground">
              Subscribe
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="RSS feed">
              <Rss className="size-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="mx-auto w-full max-w-6xl px-6 py-5 text-center text-sm text-muted-foreground">
          © 2026 The Long Answer. A series of unhurried conversations.
        </div>
      </footer>
    </div>
  )
}
