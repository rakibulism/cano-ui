"use client"

import * as React from "react"
import {
  Play,
  Pause,
  Calendar,
  MapPin,
  Ticket,
  Quote,
  Disc3,
  Instagram,
  Youtube,
  Music2,
  Mail,
  ArrowRight,
  Volume2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const NAV = ["Music", "Shows", "Listen", "Press", "Booking"]

const RELEASES = [
  { title: "Velvet Static", year: "2025", type: "Album", tracks: 11 },
  { title: "Nightdrive", year: "2024", type: "EP", tracks: 5 },
  { title: "Paper Moon", year: "2023", type: "Single", tracks: 1 },
  { title: "Low Tide", year: "2022", type: "Album", tracks: 9 },
  { title: "Cold Signal", year: "2021", type: "EP", tracks: 6 },
  { title: "First Light", year: "2020", type: "Single", tracks: 1 },
]

const SHOWS = [
  { date: "JUL 12", city: "Berlin, DE", venue: "Festsaal Kreuzberg", status: "On Sale" },
  { date: "JUL 19", city: "Amsterdam, NL", venue: "Paradiso", status: "On Sale" },
  { date: "AUG 03", city: "London, UK", venue: "Village Underground", status: "Few Left" },
  { date: "AUG 16", city: "Paris, FR", venue: "La Maroquinerie", status: "Sold Out" },
  { date: "SEP 02", city: "Brooklyn, US", venue: "Music Hall of Williamsburg", status: "On Sale" },
]

const TRACKS = [
  { title: "Velvet Static", album: "Velvet Static", length: "3:48", plays: "1.2M" },
  { title: "Headlights", album: "Velvet Static", length: "4:12", plays: "842K" },
  { title: "Nightdrive", album: "Nightdrive", length: "3:21", plays: "2.1M" },
  { title: "Paper Moon", album: "Paper Moon", length: "3:57", plays: "3.4M" },
  { title: "Low Tide", album: "Low Tide", length: "4:40", plays: "618K" },
]

const PRESS = [
  {
    quote: "A hypnotic record that lingers long after the last note fades.",
    source: "The Wire",
  },
  {
    quote: "Equal parts intimate and cinematic — one of the year's quiet triumphs.",
    source: "Pitchfork",
  },
  {
    quote: "Live, the songs swell into something genuinely transcendent.",
    source: "NME",
  },
]

export default function MusicianPortfolio() {
  const [playing, setPlaying] = React.useState<number | null>(2)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <Disc3 className="h-5 w-5 text-primary" />
            <span>MARA VEX</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <Button size="sm" className="gap-2">
            <Ticket className="h-4 w-4" />
            Tour
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden border-b bg-muted/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-24 md:py-32">
            <Badge variant="secondary" className="w-fit gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              New album out now
            </Badge>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
                Mara Vex
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground">
                Ambient pop from the edges of the night. Twelve years, four records, one slow-burning
                sound built for headlights and empty highways.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2" onClick={() => setPlaying(0)}>
                <Play className="h-4 w-4 fill-current" />
                Play latest
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#shows">
                  See tour dates
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <div className="flex items-center gap-1 pl-2">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" },
                  { icon: Music2, label: "Spotify" },
                ].map(({ icon: Icon, label }) => (
                  <Button key={label} size="icon" variant="ghost" aria-label={label}>
                    <Icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Discography */}
        <section id="music" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Discography</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">The full catalog</h2>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">2020 — 2025</span>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {RELEASES.map((release) => (
              <Card key={release.title} className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-muted to-primary/10">
                  <Disc3 className="h-16 w-16 text-muted-foreground/40 transition-transform duration-500 group-hover:rotate-90" />
                  <Button
                    size="icon"
                    aria-label={`Play ${release.title}`}
                    className="absolute bottom-3 right-3 opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                  >
                    <Play className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                <CardContent className="space-y-1 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-semibold">{release.title}</h3>
                    <Badge variant="outline" className="shrink-0 text-xs">{release.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {release.year} · {release.tracks} {release.tracks === 1 ? "track" : "tracks"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shows */}
        <section id="shows" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">On tour</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Upcoming shows</h2>
            </div>
            <div className="space-y-3">
              {SHOWS.map((show) => {
                const soldOut = show.status === "Sold Out"
                return (
                  <div
                    key={show.city}
                    className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center"
                  >
                    <div className="flex w-20 shrink-0 flex-col">
                      <span className="text-lg font-semibold tabular-nums tracking-tight">{show.date}</span>
                      <span className="text-xs text-muted-foreground">2026</span>
                    </div>
                    <Separator orientation="vertical" className="hidden h-10 sm:block" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 font-medium">
                        <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                        {show.city}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{show.venue}</p>
                    </div>
                    <div className="flex items-center gap-3 sm:justify-end">
                      <Badge
                        variant={soldOut ? "outline" : show.status === "Few Left" ? "destructive" : "secondary"}
                      >
                        {show.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant={soldOut ? "ghost" : "default"}
                        disabled={soldOut}
                        className="gap-2"
                      >
                        <Ticket className="h-4 w-4" />
                        {soldOut ? "Sold out" : "Tickets"}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Listen */}
        <section id="listen" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Listen</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Top tracks</h2>
            </div>
            <Calendar className="hidden h-6 w-6 text-muted-foreground sm:block" aria-hidden="true" />
          </div>
          <Card>
            <CardContent className="divide-y p-0">
              {TRACKS.map((track, index) => {
                const isPlaying = playing === index
                return (
                  <button
                    key={track.title}
                    type="button"
                    onClick={() => setPlaying(isPlaying ? null : index)}
                    className={cn(
                      "flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50",
                      isPlaying && "bg-primary/5"
                    )}
                    aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                    aria-pressed={isPlaying}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                        isPlaying ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground"
                      )}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn("truncate font-medium", isPlaying && "text-primary")}>{track.title}</span>
                        {isPlaying && <Volume2 className="h-4 w-4 shrink-0 text-primary" />}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">{track.album}</p>
                    </div>
                    <span className="hidden text-sm text-muted-foreground sm:block">{track.plays} plays</span>
                    <span className="w-12 text-right text-sm tabular-nums text-muted-foreground">{track.length}</span>
                  </button>
                )
              })}
            </CardContent>
          </Card>
        </section>

        {/* Press */}
        <section id="press" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-10 text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Press</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">What critics say</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {PRESS.map((item) => (
                <Card key={item.source} className="bg-card">
                  <CardContent className="space-y-4 p-6">
                    <Quote className="h-7 w-7 text-primary/40" aria-hidden="true" />
                    <p className="text-lg font-medium leading-snug">{item.quote}</p>
                    <p className="text-sm text-muted-foreground">— {item.source}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section id="booking" className="mx-auto w-full max-w-6xl px-6 py-24">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="grid gap-10 p-10 md:grid-cols-2 md:items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold tracking-tight">Book Mara Vex</h2>
                <p className="text-muted-foreground">
                  Festivals, private events, and collaborations. Send the details and the management
                  team will reply within 48 hours.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  booking@maravex.com
                </div>
              </div>
              <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input placeholder="Your name" aria-label="Your name" />
                  <Input type="email" placeholder="Email" aria-label="Email" />
                </div>
                <Input placeholder="Event type & date" aria-label="Event type and date" />
                <Button type="submit" className="w-full gap-2">
                  Send inquiry
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Disc3 className="h-5 w-5 text-primary" />
            MARA VEX
          </div>
          <div className="flex items-center gap-5">
            {NAV.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </div>
          <span>© 2026 Mara Vex. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
