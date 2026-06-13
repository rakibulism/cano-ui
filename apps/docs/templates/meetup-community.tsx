"use client"

import * as React from "react"
import {
  Code2,
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Play,
  Coffee,
  Pizza,
  Wifi,
  Github,
  Twitter,
  Linkedin,
  Menu,
  Ticket,
  Sparkles,
  Mic,
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = ["Events", "Talks", "Organizers", "Venue"]

const NEXT_EVENT = {
  title: "Edge Functions & The Future of Serverless",
  date: "Thu, Jun 26",
  time: "6:30 PM – 9:00 PM",
  venue: "The Foundry, 4th Floor",
  rsvps: 142,
  capacity: 160,
  speaker: "Lena Ortiz",
  topic: "Live demo + Q&A",
}

const UPCOMING = [
  {
    month: "JUL",
    day: "10",
    title: "TypeScript Patterns at Scale",
    speaker: "Marcus Bell, Staff Engineer @ Loomly",
    time: "6:30 PM",
    tags: ["TypeScript", "Architecture"],
    spots: "Few spots left",
  },
  {
    month: "JUL",
    day: "24",
    title: "Building Offline-First Mobile Apps",
    speaker: "Priya Nair, Mobile Lead @ Driftwave",
    time: "6:30 PM",
    tags: ["Mobile", "Sync"],
    spots: "RSVP open",
  },
  {
    month: "AUG",
    day: "07",
    title: "Vector Search for Product Teams",
    speaker: "Tomás Reyes, ML Engineer @ Querio",
    time: "6:30 PM",
    tags: ["AI", "Search"],
    spots: "RSVP open",
  },
]

const PAST_TALKS = [
  {
    title: "Rethinking State Management in 2026",
    speaker: "Dana Wu",
    views: "3.2k views",
    length: "41 min",
  },
  {
    title: "Postgres Performance Deep Dive",
    speaker: "Idris Cole",
    views: "5.8k views",
    length: "37 min",
  },
  {
    title: "From Monolith to Modular: A War Story",
    speaker: "Sara Lindqvist",
    views: "2.4k views",
    length: "52 min",
  },
]

const ORGANIZERS = [
  { name: "Jules Okafor", role: "Lead Organizer", initials: "JO" },
  { name: "Mei Tanaka", role: "Speaker Curation", initials: "MT" },
  { name: "Olu Adebayo", role: "Logistics & Venue", initials: "OA" },
  { name: "Riya Sharma", role: "Community & Socials", initials: "RS" },
]

const PERKS = [
  { icon: Pizza, label: "Free pizza & snacks" },
  { icon: Coffee, label: "Drinks on the house" },
  { icon: Wifi, label: "Fast guest Wi-Fi" },
  { icon: Users, label: "Hallway networking" },
]

const STATS = [
  { value: "2,400+", label: "Members" },
  { value: "68", label: "Talks given" },
  { value: "6 yrs", label: "Running strong" },
]

export default function MeetupCommunity() {
  const [email, setEmail] = React.useState("")
  const [joined, setJoined] = React.useState(false)
  const pct = Math.round((NEXT_EVENT.rsvps / NEXT_EVENT.capacity) * 100)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">DevTown.dev</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              <Ticket className="h-4 w-4" />
              RSVP
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                A meetup for builders
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Where local developers ship, share, and{" "}
                <span className="text-primary">level up together</span>.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Twice-monthly talks, hands-on demos, and a community that
                actually answers your questions. Free to attend, always.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg">
                  RSVP for next meetup
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  <Play className="h-4 w-4" />
                  Watch past talks
                </Button>
              </div>
              <div className="mt-10 flex gap-8">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-sm text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Next event
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground">
                    {NEXT_EVENT.date}
                  </span>
                </div>
                <CardTitle className="pt-2 text-2xl">{NEXT_EVENT.title}</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  <Mic className="h-4 w-4" />
                  {NEXT_EVENT.speaker} · {NEXT_EVENT.topic}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {NEXT_EVENT.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {NEXT_EVENT.venue}
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {NEXT_EVENT.rsvps} going
                    </span>
                    <span className="text-muted-foreground">
                      {NEXT_EVENT.capacity - NEXT_EVENT.rsvps} spots left
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: pct + "%" }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Ticket className="h-4 w-4" />
                  Save my seat
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Upcoming events</h2>
              <p className="mt-1 text-muted-foreground">
                Reserve your spot — seats fill fast.
              </p>
            </div>
            <Button variant="ghost">
              View full calendar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {UPCOMING.map((ev) => (
              <Card
                key={ev.title}
                className="transition-colors hover:border-primary/50"
              >
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="text-xs font-semibold uppercase">
                      {ev.month}
                    </span>
                    <span className="text-2xl font-bold leading-none">
                      {ev.day}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{ev.title}</h3>
                    <p className="text-sm text-muted-foreground">{ev.speaker}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {ev.time}
                      </span>
                      {ev.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className="text-xs font-medium text-muted-foreground">
                      {ev.spots}
                    </span>
                    <Button size="sm" variant="outline">
                      RSVP
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Past talks</h2>
              <p className="mt-1 text-muted-foreground">
                Missed one? Catch the recordings on our channel.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PAST_TALKS.map((talk) => (
                <Card key={talk.title} className="overflow-hidden">
                  <div className="relative flex aspect-video items-center justify-center bg-primary/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 shadow-sm">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="absolute bottom-2 right-2"
                    >
                      {talk.length}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-base">{talk.title}</CardTitle>
                    <CardDescription>
                      {talk.speaker} · {talk.views}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Meet the organizers</h2>
            <p className="mt-1 text-muted-foreground">
              A volunteer crew that keeps the lights on and the pizza warm.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ORGANIZERS.map((p) => (
              <Card key={p.name} className="text-center">
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                      {p.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1">
                <MapPin className="h-3.5 w-3.5" />
                The venue
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                The Foundry, Downtown
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                A bright co-working loft with a proper stage, great acoustics,
                and room to mingle. Enter from Maple St — we are on the 4th
                floor, signs posted.
              </p>
              <address className="mt-5 not-italic text-sm text-muted-foreground">
                218 Maple Street, Suite 400
                <br />
                Open from 6:00 PM on event nights
              </address>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {PERKS.map((perk) => (
                  <div
                    key={perk.label}
                    className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm"
                  >
                    <perk.icon className="h-4 w-4 text-primary" />
                    {perk.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border bg-background">
              <div className="absolute inset-0 bg-primary/5" />
              <div className="relative flex flex-col items-center gap-2 text-muted-foreground">
                <MapPin className="h-10 w-10 text-primary" />
                <span className="text-sm font-medium">Map preview</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-4 py-20 text-center sm:px-6">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join 2,400+ developers
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Get a heads-up on new talks, speaker drops, and ticket releases. One
            email per event, no spam.
          </p>
          {joined ? (
            <div className="mx-auto mt-7 max-w-md rounded-lg border bg-muted/30 px-4 py-5 text-sm">
              You are on the list. See you at the next meetup!
            </div>
          ) : (
            <form
              className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setJoined(true)
              }}
            >
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                className="bg-background"
              />
              <Button type="submit">
                Join the list
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="font-bold">DevTown.dev</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-sm text-muted-foreground">
            Run by volunteers, for the community. Code of conduct applies at all
            events.
          </p>
        </div>
      </footer>
    </div>
  )
}
