"use client"

import * as React from "react"
import { Film, MapPin, CalendarDays, Clock, Ticket, Star, Play, ArrowRight, Award, Users, Instagram, Twitter, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Screening = {
  time: string
  title: string
  director: string
  venue: string
  runtime: string
  tag: string
}

const DAYS = [
  { id: "day1", label: "Day 1", date: "Oct 03" },
  { id: "day2", label: "Day 2", date: "Oct 04" },
  { id: "day3", label: "Day 3", date: "Oct 05" },
  { id: "day4", label: "Day 4", date: "Oct 06" },
] as const

const SCHEDULE: Record<string, Screening[]> = {
  day1: [
    { time: "14:00", title: "The Quiet Coast", director: "Ana Moreau", venue: "Grand Hall", runtime: "118 min", tag: "Opening Night" },
    { time: "17:30", title: "Neon Marrow", director: "Tomas Riese", venue: "Screen 2", runtime: "94 min", tag: "Drama" },
    { time: "20:00", title: "Letters to the North", director: "Priya Nandan", venue: "Grand Hall", runtime: "131 min", tag: "Premiere" },
  ],
  day2: [
    { time: "11:00", title: "Salt & Static", director: "Marco Vela", venue: "Screen 1", runtime: "87 min", tag: "Documentary" },
    { time: "15:00", title: "Half-Light District", director: "Yuki Hara", venue: "Screen 2", runtime: "102 min", tag: "Thriller" },
    { time: "19:30", title: "A Year of Small Rooms", director: "Liv Sorensen", venue: "Grand Hall", runtime: "124 min", tag: "Drama" },
  ],
  day3: [
    { time: "12:30", title: "Paper Engines", director: "Karim Adel", venue: "Screen 1", runtime: "76 min", tag: "Animation" },
    { time: "16:00", title: "The Long Commute", director: "Elena Brandt", venue: "Grand Hall", runtime: "109 min", tag: "Comedy" },
    { time: "21:00", title: "Undertow", director: "Sam Okafor", venue: "Screen 2", runtime: "98 min", tag: "Midnight" },
  ],
  day4: [
    { time: "13:00", title: "Glasshouse Summer", director: "Noa Feldman", venue: "Screen 1", runtime: "112 min", tag: "Drama" },
    { time: "16:30", title: "Cartographers", director: "Diego Salas", venue: "Screen 2", runtime: "89 min", tag: "Documentary" },
    { time: "19:00", title: "The Final Reel", director: "Festival Selection", venue: "Grand Hall", runtime: "136 min", tag: "Closing Night" },
  ],
}

const FEATURED = [
  { title: "Letters to the North", director: "Priya Nandan", country: "Iceland", award: "In Competition", initials: "LN" },
  { title: "Neon Marrow", director: "Tomas Riese", country: "Germany", award: "Critics' Pick", initials: "NM" },
  { title: "Salt & Static", director: "Marco Vela", country: "Portugal", award: "Documentary", initials: "SS" },
  { title: "Half-Light District", director: "Yuki Hara", country: "Japan", award: "Audience Award", initials: "HD" },
  { title: "Paper Engines", director: "Karim Adel", country: "Egypt", award: "Best Animation", initials: "PE" },
  { title: "Undertow", director: "Sam Okafor", country: "Nigeria", award: "Midnight Selection", initials: "UT" },
]

const PASSES = [
  {
    name: "Day Pass",
    price: "$45",
    period: "per day",
    features: ["Access to one festival day", "All public screenings", "Standard seating", "Festival programme"],
    highlight: false,
  },
  {
    name: "Festival Pass",
    price: "$160",
    period: "all four days",
    features: ["All screenings, Day 1-4", "Priority seating", "Opening & closing galas", "Filmmaker Q&A access", "Festival tote & programme"],
    highlight: true,
  },
  {
    name: "Industry Pass",
    price: "$320",
    period: "all access",
    features: ["Everything in Festival", "Press & industry lounge", "Talent panel reservations", "Networking mixers", "Awards ceremony seat"],
    highlight: false,
  },
]

const SPONSORS = ["LUMINA", "Northgate", "Reel Co.", "Aperture", "Stagelight", "Vista Media"]

export default function FilmFestivalPage() {
  const [activeDay, setActiveDay] = React.useState<string>("day1")
  const screenings = SCHEDULE[activeDay]
  const activeMeta = DAYS.find((d) => d.id === activeDay)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight">Northbank Film Festival</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#films" className="transition-colors hover:text-foreground">Films</a>
            <a href="#passes" className="transition-colors hover:text-foreground">Passes</a>
            <a href="#sponsors" className="transition-colors hover:text-foreground">Sponsors</a>
          </nav>
          <Button size="sm" className="gap-1.5">
            <Ticket className="h-4 w-4" aria-hidden="true" />
            Get Passes
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="absolute inset-0 bg-primary/10" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Star className="h-3.5 w-3.5" aria-hidden="true" />
              12th Annual Edition
            </Badge>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Four days of cinema that lingers.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Sixty-two films, twenty-one countries, and the storytellers behind them — all under one marquee.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">October 3 – 6, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium">Northbank Arts Quarter, Portland</span>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" className="gap-1.5">
                <Ticket className="h-4 w-4" aria-hidden="true" />
                Buy Festival Pass
              </Button>
              <Button size="lg" variant="outline" className="gap-1.5">
                <Play className="h-4 w-4" aria-hidden="true" />
                Watch the Trailer
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-y border-l border-t md:grid-cols-4 md:divide-y-0">
            {[
              { icon: Film, value: "62", label: "Films" },
              { icon: Users, value: "21", label: "Countries" },
              { icon: Award, value: "9", label: "Awards" },
              { icon: CalendarDays, value: "4", label: "Days" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-6 py-8 text-center">
                <stat.icon className="mb-1 h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="schedule" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge variant="outline" className="mb-3">Programme</Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Day-by-day schedule</h2>
              <p className="mt-2 text-muted-foreground">Pick a day to see every screening at a glance.</p>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const isActive = day.id === activeDay
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => setActiveDay(day.id)}
                  className={cn(
                    "flex flex-col items-start rounded-lg border px-5 py-3 text-left transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card hover:bg-accent"
                  )}
                  aria-pressed={isActive}
                >
                  <span className="text-sm font-semibold">{day.label}</span>
                  <span className={cn("text-xs", isActive ? "text-primary-foreground/80" : "text-muted-foreground")}>
                    {day.date}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Showing {screenings.length} screenings for {activeMeta?.label}, {activeMeta?.date}
            </p>
            {screenings.map((s) => (
              <Card key={s.title} className="transition-colors hover:bg-muted/30">
                <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
                  <div className="flex w-24 shrink-0 items-center gap-2 text-sm font-semibold">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    {s.time}
                  </div>
                  <Separator orientation="horizontal" className="sm:hidden" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                      <Badge variant="secondary">{s.tag}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">Directed by {s.director}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-1 text-sm text-muted-foreground sm:items-end">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {s.venue}
                    </span>
                    <span>{s.runtime}</span>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">Reserve</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="films" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10">
              <Badge variant="outline" className="mb-3">Official Selection</Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Featured films</h2>
              <p className="mt-2 text-muted-foreground">Highlights from this year&apos;s competition and showcase lineups.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED.map((film) => (
                <Card key={film.title} className="group overflow-hidden">
                  <div className="relative flex aspect-[3/2] items-center justify-center bg-primary/10">
                    <span className="text-4xl font-semibold tracking-tight text-primary/40">{film.initials}</span>
                    <div className="absolute right-3 top-3">
                      <Badge>{film.award}</Badge>
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-3 left-3 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={"Play trailer for " + film.title}
                    >
                      <Play className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{film.title}</CardTitle>
                    <CardDescription>
                      {film.director} · {film.country}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="passes" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-3">Tickets</Badge>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Choose your pass</h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              From a single day to all-access industry credentials.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PASSES.map((pass) => (
              <Card
                key={pass.name}
                className={cn(
                  "flex flex-col",
                  pass.highlight && "border-primary ring-1 ring-primary"
                )}
              >
                <CardHeader>
                  {pass.highlight && (
                    <Badge className="mb-2 w-fit">Most Popular</Badge>
                  )}
                  <CardTitle>{pass.name}</CardTitle>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight">{pass.price}</span>
                    <span className="text-sm text-muted-foreground">{pass.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {pass.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full gap-1.5"
                    variant={pass.highlight ? "default" : "outline"}
                  >
                    Get {pass.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="sponsors" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Presented with support from
            </p>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-6">
              {SPONSORS.map((sponsor) => (
                <div
                  key={sponsor}
                  className="flex items-center justify-center bg-card px-6 py-8 text-base font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  {sponsor}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-semibold tracking-tight">Northbank Film Festival</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                October 3 – 6, 2026 · Northbank Arts Quarter, Portland.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="ghost" size="icon" aria-label="Instagram">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="YouTube">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
              <div>
                <p className="mb-3 font-medium">Festival</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#schedule" className="hover:text-foreground">Schedule</a></li>
                  <li><a href="#films" className="hover:text-foreground">Films</a></li>
                  <li><a href="#passes" className="hover:text-foreground">Passes</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-medium">Visit</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Venues</a></li>
                  <li><a href="#" className="hover:text-foreground">Travel</a></li>
                  <li><a href="#" className="hover:text-foreground">Accessibility</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-medium">Connect</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Press</a></li>
                  <li><a href="#" className="hover:text-foreground">Submit a film</a></li>
                  <li><a href="#" className="hover:text-foreground">Volunteer</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <span>© 2026 Northbank Film Festival. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
