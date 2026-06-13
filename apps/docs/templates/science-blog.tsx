"use client"

import * as React from "react"
import {
  Atom,
  Rocket,
  Dna,
  Orbit,
  CloudSun,
  Microscope,
  ArrowRight,
  Clock,
  Calendar,
  ShieldCheck,
  BookOpenCheck,
  Flame,
  Mail,
  Telescope,
  Twitter,
  Github,
  Rss,
  Sparkles,
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type Field = "All" | "Space" | "Biology" | "Physics" | "Climate"

const FIELDS: { name: Field; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: "All", icon: Sparkles },
  { name: "Space", icon: Rocket },
  { name: "Biology", icon: Dna },
  { name: "Physics", icon: Atom },
  { name: "Climate", icon: CloudSun },
]

const FIELD_ICON: Record<Exclude<Field, "All">, React.ComponentType<{ className?: string }>> = {
  Space: Rocket,
  Biology: Dna,
  Physics: Atom,
  Climate: CloudSun,
}

type Article = {
  title: string
  excerpt: string
  field: Exclude<Field, "All">
  author: string
  initials: string
  date: string
  readMins: number
}

const ARTICLES: Article[] = [
  {
    title: "Why Webb keeps finding galaxies that shouldn't exist yet",
    excerpt:
      "The earliest galaxies are brighter and more massive than our models predicted. Here is what astronomers think is going on.",
    field: "Space",
    author: "Dr. Lena Ortiz",
    initials: "LO",
    date: "Jun 9, 2026",
    readMins: 8,
  },
  {
    title: "CRISPR's quiet leap from the lab to the clinic",
    excerpt:
      "Gene-editing therapies are now treating sickle cell disease. We break down how the edit actually works inside a cell.",
    field: "Biology",
    author: "Dr. Amir Haddad",
    initials: "AH",
    date: "Jun 6, 2026",
    readMins: 11,
  },
  {
    title: "Quantum entanglement, explained without the hand-waving",
    excerpt:
      "No, it does not let you send messages faster than light. A grounded walk through what the experiments really show.",
    field: "Physics",
    author: "Dr. Priya Raman",
    initials: "PR",
    date: "Jun 3, 2026",
    readMins: 9,
  },
  {
    title: "Reading 800,000 years of climate in a single ice core",
    excerpt:
      "Trapped air bubbles are a time machine. Here is how researchers decode ancient atmospheres layer by layer.",
    field: "Climate",
    author: "Dr. Noah Fischer",
    initials: "NF",
    date: "May 30, 2026",
    readMins: 7,
  },
  {
    title: "The tardigrade proteins that survive being completely dried out",
    excerpt:
      "Water bears can lose 99% of their body water and bounce back. The molecular trick may help us store vaccines.",
    field: "Biology",
    author: "Dr. Sofia Mendes",
    initials: "SM",
    date: "May 27, 2026",
    readMins: 6,
  },
  {
    title: "What a fourth state of matter looks like in your kitchen",
    excerpt:
      "Plasma is more common than you think. We trace it from lightning to neon signs to the heart of the Sun.",
    field: "Physics",
    author: "Dr. Priya Raman",
    initials: "PR",
    date: "May 23, 2026",
    readMins: 10,
  },
]

const FEATURED = {
  field: "Space" as const,
  title: "The map of the universe just got 10 times sharper",
  excerpt:
    "A new all-sky survey charted nearly two billion stars and galaxies. We unpack what this cosmic census reveals about dark matter, and why it changes the questions cosmologists are asking next.",
  author: "Dr. Lena Ortiz",
  initials: "LO",
  date: "Jun 12, 2026",
  readMins: 14,
}

const EXPLAINERS = [
  { title: "How do mRNA vaccines actually work?", views: "42k", field: "Biology" as const },
  { title: "Why is the sky blue, really?", views: "38k", field: "Physics" as const },
  { title: "What is a black hole made of?", views: "31k", field: "Space" as const },
  { title: "Can we still hit 1.5 degrees C?", views: "27k", field: "Climate" as const },
]

const REVIEWERS = [
  "Peer-reviewed sources",
  "Fact-checked by PhDs",
  "Citations on every claim",
  "Corrections logged openly",
]

export default function ScienceBlogPage() {
  const [active, setActive] = React.useState<Field>("All")

  const filtered =
    active === "All" ? ARTICLES : ARTICLES.filter((a) => a.field === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Telescope className="h-4 w-4" />
            </span>
            <span>
              Curio<span className="text-muted-foreground">Lab</span>
            </span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#" className="transition-colors hover:text-foreground">Articles</a>
            <a href="#" className="transition-colors hover:text-foreground">Explainers</a>
            <a href="#" className="transition-colors hover:text-foreground">Podcast</a>
            <a href="#" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm" className="gap-1.5">
              <Rss className="h-4 w-4" />
              Subscribe
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <section className="mb-14">
          <Card className="overflow-hidden border-primary/20">
            <div className="grid gap-0 md:grid-cols-5">
              <div className="relative flex items-center justify-center overflow-hidden bg-primary/10 p-10 md:col-span-2">
                <div className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_30%,theme(colors.primary/0.15),transparent_60%)]" />
                <Orbit className="h-28 w-28 text-primary" strokeWidth={1} />
                <Sparkles className="absolute right-8 top-8 h-5 w-5 text-primary/60" />
                <Sparkles className="absolute bottom-10 left-10 h-4 w-4 text-primary/40" />
              </div>
              <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-10">
                <div className="mb-4 flex items-center gap-2">
                  <Badge className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Rocket className="h-3 w-3" />
                    {FEATURED.field}
                  </Badge>
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
                    Read the feature
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <div className="flex flex-col items-center gap-4 rounded-xl border bg-muted/30 px-6 py-5 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Expert-reviewed, always
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {REVIEWERS.map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <BookOpenCheck className="h-4 w-4 text-primary/70" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Microscope className="h-5 w-5 text-primary" />
                Latest research
              </h2>
              <div className="flex flex-wrap gap-2">
                {FIELDS.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActive(name)}
                    aria-pressed={active === name}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      active === name
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((article) => {
                const Icon = FIELD_ICON[article.field]
                return (
                  <Card
                    key={article.title}
                    className="group flex flex-col transition-shadow hover:shadow-md"
                  >
                    <CardHeader>
                      <Badge variant="secondary" className="mb-2 w-fit gap-1 text-[10px]">
                        <Icon className="h-3 w-3" />
                        {article.field}
                      </Badge>
                      <CardTitle className="text-base leading-snug group-hover:text-primary">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="" alt="" />
                          <AvatarFallback className="text-[10px]">{article.initials}</AvatarFallback>
                        </Avatar>
                        {article.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readMins}m
                      </span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filtered.length === 0 && (
              <p className="rounded-lg border border-dashed py-12 text-center text-sm text-muted-foreground">
                No articles in this field yet.
              </p>
            )}
          </section>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Flame className="h-4 w-4 text-primary" />
                  Popular explainers
                </CardTitle>
                <CardDescription>The questions readers ask most.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {EXPLAINERS.map((item, i) => (
                  <React.Fragment key={item.title}>
                    {i > 0 && <Separator />}
                    <a href="#" className="group flex items-start gap-3">
                      <span className="mt-0.5 text-sm font-semibold tabular-nums text-muted-foreground">
                        0{i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-snug transition-colors group-hover:text-primary">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {item.field} · {item.views} reads
                        </p>
                      </div>
                    </a>
                  </React.Fragment>
                ))}
              </CardContent>
            </Card>

            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-4 w-4 text-primary" />
                  The Weekly Hypothesis
                </CardTitle>
                <CardDescription>
                  One big idea from science, explained simply, every Sunday.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-8 text-sm"
                    aria-label="Email address"
                  />
                </div>
                <Button className="w-full">Subscribe free</Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  Join 84,000 curious readers. No spam, ever.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Telescope className="h-4 w-4 text-primary" />
                  Explore by field
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {FIELDS.filter((f) => f.name !== "All").map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActive(name)}
                    className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {name}
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Telescope className="h-3.5 w-3.5" />
              </span>
              Curio<span className="text-muted-foreground">Lab</span>
            </div>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Science journalism for the endlessly curious. Rigorous, readable, and reviewed by working scientists.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="RSS feed">
              <Rss className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground">
          © 2026 CurioLab Media. Stay curious.
        </div>
      </footer>
    </div>
  )
}
