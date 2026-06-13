"use client"

import * as React from "react"
import {
  BookOpen,
  Sparkles,
  Heart,
  Coffee,
  Instagram,
  Twitter,
  Rss,
  Menu,
  ChevronRight,
  Star,
  Play,
  Mail,
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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Episode = {
  id: number
  title: string
  chapter: string
  number: string
  date: string
  blurb: string
  hue: string
  reads: string
}

const CHAPTERS = ["All", "Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"] as const

const EPISODES: Episode[] = [
  {
    id: 12,
    title: "The Lantern at the End of the Hall",
    chapter: "Chapter 4",
    number: "#42",
    date: "Jun 10",
    blurb: "Pip finally reaches the attic door — and something is humming behind it.",
    hue: "from-primary/30 to-accent",
    reads: "8.4k",
  },
  {
    id: 11,
    title: "Tea for Two Ghosts",
    chapter: "Chapter 4",
    number: "#41",
    date: "Jun 03",
    blurb: "A polite haunting goes sideways over the last biscuit.",
    hue: "from-accent to-secondary",
    reads: "7.1k",
  },
  {
    id: 10,
    title: "The Map Folds Back",
    chapter: "Chapter 3",
    number: "#33",
    date: "May 27",
    blurb: "Every path on the parchment leads to the same crooked tree.",
    hue: "from-secondary to-primary/20",
    reads: "9.6k",
  },
  {
    id: 9,
    title: "Where the River Whispers",
    chapter: "Chapter 3",
    number: "#31",
    date: "May 20",
    blurb: "Bramble learns to read the language of stones.",
    hue: "from-muted to-accent",
    reads: "6.8k",
  },
  {
    id: 8,
    title: "A Knock in the Fog",
    chapter: "Chapter 2",
    number: "#24",
    date: "May 13",
    blurb: "The traveling salesman has no shadow, and far too many keys.",
    hue: "from-primary/20 to-muted",
    reads: "10.2k",
  },
  {
    id: 7,
    title: "The Smallest Door",
    chapter: "Chapter 2",
    number: "#22",
    date: "May 06",
    blurb: "Some doors are made for things much smaller than people.",
    hue: "from-accent to-primary/30",
    reads: "5.9k",
  },
  {
    id: 6,
    title: "Crumbs & Constellations",
    chapter: "Chapter 1",
    number: "#11",
    date: "Apr 29",
    blurb: "Pip maps the kitchen ceiling and names every star.",
    hue: "from-secondary to-accent",
    reads: "12.7k",
  },
  {
    id: 5,
    title: "The First Step Out",
    chapter: "Chapter 1",
    number: "#01",
    date: "Apr 22",
    blurb: "It all begins with a loose floorboard and a very brave nap.",
    hue: "from-primary/30 to-secondary",
    reads: "15.3k",
  },
]

const TIERS = [
  { name: "Doodler", price: "$3", perk: "Early panels + name in the credits" },
  { name: "Inker", price: "$7", perk: "High-res wallpapers + behind-the-sketch" },
  { name: "Storyteller", price: "$15", perk: "Monthly mini-zine mailed to you" },
]

export default function WebcomicTemplate() {
  const [activeChapter, setActiveChapter] =
    React.useState<(typeof CHAPTERS)[number]>("All")

  const visibleEpisodes =
    activeChapter === "All"
      ? EPISODES
      : EPISODES.filter((e) => e.chapter === activeChapter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <span className="text-lg tracking-tight">Crumbtown</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#episodes" className="transition-colors hover:text-foreground">
              Episodes
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              The Creator
            </a>
            <a href="#support" className="transition-colors hover:text-foreground">
              Support
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              <BookOpen className="size-4" aria-hidden="true" />
              Read from start
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero — latest strip */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-16">
            <div className="space-y-5">
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="size-3" aria-hidden="true" />
                New strip every Wednesday
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                A tiny adventure in a very large house.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Follow Pip the mouse and friends through Crumbtown — a hand-inked
                webcomic about courage, snacks, and the doors we are afraid to open.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg">
                  <Play className="size-4" aria-hidden="true" />
                  Read latest episode
                </Button>
                <Button size="lg" variant="outline">
                  <BookOpen className="size-4" aria-hidden="true" />
                  Start from #01
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
                  4.9 average rating
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span>42 episodes</span>
              </div>
            </div>

            {/* Latest strip card */}
            <Card className="overflow-hidden border-2 border-primary/40 shadow-sm">
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/30 via-accent to-secondary">
                <div className="rounded-2xl border-2 border-foreground/10 bg-background/70 px-5 py-4 text-center backdrop-blur">
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    Latest panel
                  </p>
                  <p className="mt-1 text-2xl font-bold">#42</p>
                  <p className="text-sm text-muted-foreground">
                    The Lantern at the End of the Hall
                  </p>
                </div>
              </div>
              <CardFooter className="flex items-center justify-between gap-2 py-3">
                <span className="text-sm text-muted-foreground">
                  Chapter 4 · Jun 10
                </span>
                <Button variant="link" size="sm" className="px-0">
                  Read now
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Content: episodes + sidebar */}
        <section
          id="episodes"
          className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-16"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Episodes grid */}
            <div>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">All episodes</h2>
                  <p className="text-sm text-muted-foreground">
                    {visibleEpisodes.length} strip
                    {visibleEpisodes.length === 1 ? "" : "s"}
                    {activeChapter === "All" ? "" : ` in ${activeChapter}`}
                  </p>
                </div>
              </div>

              {/* Chapter chips */}
              <div className="mb-6 flex flex-wrap gap-2">
                {CHAPTERS.map((chapter) => {
                  const active = activeChapter === chapter
                  return (
                    <button
                      key={chapter}
                      type="button"
                      onClick={() => setActiveChapter(chapter)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {chapter}
                    </button>
                  )
                })}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {visibleEpisodes.map((ep) => (
                  <Card
                    key={ep.id}
                    className="group overflow-hidden pt-0 transition-shadow hover:shadow-md"
                  >
                    <div
                      className={cn(
                        "flex aspect-[16/10] items-center justify-center bg-gradient-to-br",
                        ep.hue
                      )}
                    >
                      <span className="rounded-full bg-background/70 px-3 py-1 text-sm font-bold backdrop-blur">
                        {ep.number}
                      </span>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline">{ep.chapter}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {ep.date}
                        </span>
                      </div>
                      <CardTitle className="text-base leading-snug">
                        {ep.title}
                      </CardTitle>
                      <CardDescription>{ep.blurb}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="size-3.5" aria-hidden="true" />
                        {ep.reads} reads
                      </span>
                      <Button variant="ghost" size="sm">
                        Read
                        <ChevronRight className="size-4" aria-hidden="true" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* About the creator */}
              <Card id="about">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback>MO</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">Mara Olwen</CardTitle>
                      <CardDescription>Writer & illustrator</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    I draw Crumbtown from a sunny corner of a very old flat, fueled
                    by tea and the conviction that small creatures deserve big
                    stories. Inking since 2019.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Instagram"
                    >
                      <Instagram className="size-4" aria-hidden="true" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Twitter">
                      <Twitter className="size-4" aria-hidden="true" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="RSS feed">
                      <Rss className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Support / membership */}
              <Card id="support" className="border-primary/40 bg-primary/5">
                <CardHeader>
                  <Badge className="w-fit gap-1">
                    <Coffee className="size-3" aria-hidden="true" />
                    Membership
                  </Badge>
                  <CardTitle className="text-lg">Support the comic</CardTitle>
                  <CardDescription>
                    Crumbtown stays free thanks to readers like you. Pick a tier
                    and unlock the good stuff.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {TIERS.map((tier, i) => (
                    <div
                      key={tier.name}
                      className={cn(
                        "rounded-lg border bg-background p-3",
                        i === 1 && "border-primary"
                      )}
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="font-medium">{tier.name}</span>
                        <span className="text-sm font-semibold">
                          {tier.price}
                          <span className="text-muted-foreground">/mo</span>
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {tier.perk}
                      </p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Heart className="size-4" aria-hidden="true" />
                    Become a member
                  </Button>
                </CardFooter>
              </Card>

              {/* Newsletter */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Never miss a strip</CardTitle>
                  <CardDescription>
                    New episodes straight to your inbox.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input type="email" placeholder="you@crumbtown.ink" aria-label="Email address" />
                  <Button variant="secondary" className="w-full">
                    <Mail className="size-4" aria-hidden="true" />
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <a href="#top" className="flex items-center gap-2 font-semibold">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" aria-hidden="true" />
              </span>
              Crumbtown
            </a>
            <p className="max-w-xs text-sm text-muted-foreground">
              A hand-inked webcomic. Updated every Wednesday since 2019.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#episodes" className="transition-colors hover:text-foreground">
              Episodes
            </a>
            <a href="#about" className="transition-colors hover:text-foreground">
              The Creator
            </a>
            <a href="#support" className="transition-colors hover:text-foreground">
              Support
            </a>
            <a href="#top" className="transition-colors hover:text-foreground">
              Shop
            </a>
          </div>
        </div>
        <div className="border-t py-4">
          <p className="mx-auto w-full max-w-6xl px-4 text-xs text-muted-foreground">
            © 2026 Crumbtown Comics. All panels drawn with love.
          </p>
        </div>
      </footer>
    </div>
  )
}
