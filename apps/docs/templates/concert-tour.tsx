"use client"

import * as React from "react"
import {
  ArrowRight,
  CalendarDays,
  Disc3,
  Instagram,
  MapPin,
  Menu,
  Music2,
  Play,
  Twitter,
  Youtube,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const navLinks = ["Tour", "Music", "Gallery", "Newsletter"]

type Show = {
  date: string
  month: string
  day: string
  city: string
  venue: string
  status: "available" | "few" | "soldout"
}

const tourDates: Show[] = [
  { date: "2026-07-09", month: "JUL", day: "09", city: "Austin, TX", venue: "Moody Amphitheater", status: "soldout" },
  { date: "2026-07-12", month: "JUL", day: "12", city: "Denver, CO", venue: "Red Rocks", status: "few" },
  { date: "2026-07-16", month: "JUL", day: "16", city: "Chicago, IL", venue: "United Center", status: "available" },
  { date: "2026-07-20", month: "JUL", day: "20", city: "Nashville, TN", venue: "Ryman Auditorium", status: "soldout" },
  { date: "2026-07-24", month: "JUL", day: "24", city: "Brooklyn, NY", venue: "Barclays Center", status: "available" },
  { date: "2026-07-28", month: "JUL", day: "28", city: "Boston, MA", venue: "MGM Music Hall", status: "few" },
  { date: "2026-08-02", month: "AUG", day: "02", city: "Toronto, ON", venue: "History", status: "available" },
  { date: "2026-08-07", month: "AUG", day: "07", city: "Los Angeles, CA", venue: "The Forum", status: "available" },
]

const tracks = [
  { no: "01", title: "Neon Skyline", time: "3:42" },
  { no: "02", title: "Static Hearts", time: "4:08" },
  { no: "03", title: "Run the Night", time: "3:21" },
  { no: "04", title: "Paper Crowns", time: "4:55" },
  { no: "05", title: "Hold the Line", time: "3:33" },
]

const gallery = [
  "Main stage, Lisbon",
  "Crowd at golden hour",
  "Backstage tuning",
  "Encore pyro",
  "Acoustic set",
  "Festival headline",
]

const statusLabel: Record<Show["status"], string> = {
  available: "Buy Tickets",
  few: "Few Left",
  soldout: "Sold Out",
}

export default function ConcertTour() {
  const [filter, setFilter] = React.useState<"all" | "available">("all")
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const shows = tourDates.filter((s) => (filter === "available" ? s.status !== "soldout" : true))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-bold tracking-[0.2em] uppercase">
            <Music2 className="h-5 w-5 text-primary" />
            Calla Vane
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-muted-foreground transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              Tickets
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-36">
            <Badge variant="secondary" className="mb-6 uppercase tracking-[0.25em]">
              World Tour 2026
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Calla Vane
              <span className="block text-primary">Afterglow Tour</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Twenty-three cities. One unforgettable night each. New album live for the first time, start to finish.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2" asChild>
                <a href="#tour">
                  Find a Show <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#music">
                  <Play className="h-4 w-4" /> Listen Now
                </a>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" /> Jul 9 – Sep 14, 2026
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> North America & Europe
              </span>
              <span className="flex items-center gap-2">
                <Disc3 className="h-4 w-4 text-primary" /> Featuring &ldquo;Afterglow&rdquo;
              </span>
            </div>
          </div>
        </section>

        {/* Tour dates */}
        <section id="tour" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tour Dates</h2>
              <p className="mt-2 text-muted-foreground">Catch the Afterglow Tour in a city near you.</p>
            </div>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All Shows
              </Button>
              <Button
                variant={filter === "available" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("available")}
              >
                Available
              </Button>
            </div>
          </div>

          <ul className="mt-10 divide-y border-t">
            {shows.map((show) => (
              <li
                key={show.date}
                className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-md border bg-card">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">{show.month}</span>
                    <span className="text-2xl font-bold leading-none">{show.day}</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{show.city}</p>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {show.venue}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-21 sm:pl-0">
                  {show.status === "few" && (
                    <Badge variant="outline" className="border-primary text-primary">
                      Almost Gone
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant={show.status === "soldout" ? "secondary" : "default"}
                    disabled={show.status === "soldout"}
                    className={cn(show.status === "soldout" && "opacity-60")}
                  >
                    {statusLabel[show.status]}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Latest release */}
        <section id="music" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-xl border bg-gradient-to-br from-primary/20 via-muted to-background">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                <Disc3 className="h-16 w-16 text-primary" />
                <p className="text-2xl font-black uppercase tracking-widest">Afterglow</p>
                <p className="text-sm text-muted-foreground">The new album &middot; 2026</p>
              </div>
            </div>
            <div>
              <Badge variant="secondary" className="uppercase tracking-[0.2em]">
                Latest Release
              </Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Afterglow</h2>
              <p className="mt-3 text-muted-foreground">
                Eleven tracks recorded live off the floor. Out now on every platform.
              </p>
              <Card className="mt-6">
                <CardContent className="p-2">
                  <ul className="divide-y">
                    {tracks.map((track) => (
                      <li key={track.no} className="flex items-center gap-4 px-3 py-3">
                        <span className="w-6 text-sm font-mono text-muted-foreground">{track.no}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" aria-label={`Play ${track.title}`}>
                          <Play className="h-4 w-4" />
                        </Button>
                        <span className="flex-1 font-medium">{track.title}</span>
                        <span className="text-sm text-muted-foreground">{track.time}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Play className="h-4 w-4" /> Stream Album
                </Button>
                <Button variant="outline">Pre-save Deluxe</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">On the Road</h2>
            <p className="mt-2 text-muted-foreground">Moments from the Afterglow Tour.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {gallery.map((caption, i) => (
              <div
                key={caption}
                className={cn(
                  "group relative flex items-end overflow-hidden rounded-lg border bg-gradient-to-br from-muted to-muted/40 p-4",
                  i === 0 ? "aspect-square sm:col-span-2 sm:row-span-2 sm:aspect-auto" : "aspect-square"
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary/15 to-transparent" />
                <span className="relative text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {caption}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="border-y bg-primary/10">
          <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
            <Music2 className="mx-auto h-8 w-8 text-primary" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Never Miss a Drop</h2>
            <p className="mt-3 text-muted-foreground">
              Be first to hear about new dates, presales, and surprise releases. No spam, just the music.
            </p>
            {subscribed ? (
              <p className="mt-8 rounded-md border bg-card px-4 py-4 font-medium text-primary">
                You&rsquo;re on the list. See you on tour.
              </p>
            ) : (
              <form
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSubscribed(true)
                }}
              >
                <Input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  className="bg-background"
                />
                <Button type="submit" className="shrink-0">
                  Sign Up
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
          <a href="#" className="flex items-center gap-2 font-bold uppercase tracking-[0.2em]">
            <Music2 className="h-5 w-5 text-primary" /> Calla Vane
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 Calla Vane. All rights reserved.</p>
        </div>
        <Separator />
        <p className="py-4 text-center text-xs text-muted-foreground">
          Booking & press &middot; management@callavane.com
        </p>
      </footer>
    </div>
  )
}
