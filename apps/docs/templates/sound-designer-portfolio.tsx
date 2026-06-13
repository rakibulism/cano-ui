"use client"

import * as React from "react"
import {
  Play,
  Pause,
  Headphones,
  Waves,
  Mic2,
  Music4,
  Film,
  Gamepad2,
  Megaphone,
  Radio,
  Sliders,
  Clock,
  Mail,
  ArrowRight,
  Volume2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Category = "All" | "Film" | "Games" | "Ads" | "Podcast"

const FILTERS: Category[] = ["All", "Film", "Games", "Ads", "Podcast"]

const CATEGORY_ICON: Record<Exclude<Category, "All">, React.ComponentType<{ className?: string }>> = {
  Film: Film,
  Games: Gamepad2,
  Ads: Megaphone,
  Podcast: Radio,
}

type Track = {
  id: string
  title: string
  client: string
  category: Exclude<Category, "All">
  role: string
  duration: string
  bars: number[]
}

const TRACKS: Track[] = [
  {
    id: "t1",
    title: "Tidewater — Main Title",
    client: "Lantern Films",
    category: "Film",
    role: "Original Score · Sound Design",
    duration: "3:48",
    bars: [12, 28, 44, 36, 60, 48, 72, 54, 40, 66, 30, 22],
  },
  {
    id: "t2",
    title: "Hollow Keep — Combat Loop",
    client: "Northwind Studios",
    category: "Games",
    role: "Adaptive Audio · FX",
    duration: "2:10",
    bars: [40, 58, 34, 70, 50, 62, 44, 76, 38, 54, 48, 64],
  },
  {
    id: "t3",
    title: "Aurora — 30s Spot",
    client: "Meridian Mobility",
    category: "Ads",
    role: "Sound Design · Mix",
    duration: "0:30",
    bars: [20, 36, 52, 30, 44, 60, 38, 28, 50, 42, 24, 34],
  },
  {
    id: "t4",
    title: "Deep Signal — Ep. 14 Bed",
    client: "Static Hour",
    category: "Podcast",
    role: "Theme · Sound Branding",
    duration: "1:22",
    bars: [16, 30, 24, 46, 32, 40, 28, 52, 36, 26, 44, 20],
  },
  {
    id: "t5",
    title: "Glasshouse — Trailer Cut",
    client: "Lantern Films",
    category: "Film",
    role: "Trailer Sound · Risers",
    duration: "1:55",
    bars: [30, 54, 70, 46, 78, 58, 84, 62, 50, 72, 40, 32],
  },
  {
    id: "t6",
    title: "Neon Run — Menu Ambience",
    client: "Northwind Studios",
    category: "Games",
    role: "Ambience · Loops",
    duration: "4:02",
    bars: [22, 18, 34, 28, 40, 30, 48, 36, 26, 44, 32, 24],
  },
]

const GEAR: { label: string; detail: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "Field Recording", detail: "Sound Devices · DPA", icon: Mic2 },
  { label: "Synthesis", detail: "Modular · Serum · Phase Plant", icon: Waves },
  { label: "Mixing", detail: "Pro Tools · Dolby Atmos", icon: Sliders },
  { label: "Scoring", detail: "Orchestral · Hybrid", icon: Music4 },
  { label: "Monitoring", detail: "Genelec 8341 · 7.1.4", icon: Headphones },
  { label: "Restoration", detail: "iZotope RX · Dialogue", icon: Volume2 },
]

const CLIENTS = ["Lantern Films", "Northwind Studios", "Meridian Mobility", "Static Hour", "Halcyon Games", "Verge Media"]

export default function SoundDesignerPortfolio() {
  const [filter, setFilter] = React.useState<Category>("All")
  const [playingId, setPlayingId] = React.useState<string | null>("t1")

  const visible = TRACKS.filter((t) => filter === "All" || t.category === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Waves className="h-4 w-4" />
            </span>
            Rhea Voss
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#gear" className="transition-colors hover:text-foreground">Studio</a>
            <a href="#book" className="transition-colors hover:text-foreground">Booking</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#book">Start a project</a>
          </Button>
        </div>
      </header>

      <main className="flex-1" id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-20 md:py-28">
            <Badge variant="outline" className="w-fit gap-1.5 border-primary/40 text-primary">
              <Headphones className="h-3.5 w-3.5" />
              Sound Designer & Composer
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Sound that makes the picture
              <span className="text-muted-foreground"> feel inevitable.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Twelve years scoring film, designing game audio, and shaping sonic identities for
              brands. Every frame, every footstep, every silence — composed.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2" onClick={() => setPlayingId("t1")}>
                <Play className="h-4 w-4 fill-current" />
                Play showreel
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#work">Browse the work</a>
              </Button>
            </div>
            <div className="flex flex-wrap items-end gap-10 pt-6">
              {[
                { k: "40+", v: "Scored projects" },
                { k: "6", v: "Festival selections" },
                { k: "9", v: "Game titles shipped" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-3xl font-semibold tracking-tight">{s.k}</div>
                  <div className="text-sm text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work / player */}
        <section id="work" className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
              <p className="mt-2 text-muted-foreground">Tap any row to listen. Filter by medium.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {f}
                  </button>
                )
              })}
            </div>
          </div>

          <ul className="mt-8 divide-y rounded-xl border bg-card">
            {visible.map((track) => {
              const isPlaying = playingId === track.id
              const Icon = CATEGORY_ICON[track.category]
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    onClick={() => setPlayingId(isPlaying ? null : track.id)}
                    aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                    className={cn(
                      "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-muted/50",
                      isPlaying && "bg-primary/10"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isPlaying
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-foreground"
                      )}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-medium">{track.title}</span>
                        {isPlaying && (
                          <Badge variant="secondary" className="hidden gap-1 sm:inline-flex">
                            <Volume2 className="h-3 w-3" />
                            Playing
                          </Badge>
                        )}
                      </div>
                      <div className="truncate text-sm text-muted-foreground">
                        {track.client} · {track.role}
                      </div>
                    </div>

                    <div className="hidden items-end gap-0.5 md:flex" aria-hidden="true">
                      {track.bars.map((h, i) => (
                        <span
                          key={i}
                          className={cn(
                            "w-1 rounded-full transition-colors",
                            isPlaying ? "bg-primary" : "bg-muted-foreground/30"
                          )}
                          style={{ height: `${h}%`, minHeight: "4px", maxHeight: "40px" }}
                        />
                      ))}
                    </div>

                    <Badge variant="outline" className="hidden gap-1 sm:inline-flex">
                      <Icon className="h-3 w-3" />
                      {track.category}
                    </Badge>
                    <span className="w-12 text-right text-sm tabular-nums text-muted-foreground">
                      {track.duration}
                    </span>
                  </button>
                </li>
              )
            })}
            {visible.length === 0 && (
              <li className="px-4 py-12 text-center text-sm text-muted-foreground">
                No tracks in this category yet.
              </li>
            )}
          </ul>
        </section>

        {/* About */}
        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold tracking-tight">About</h2>
              <p className="text-muted-foreground">
                I'm Rhea, a sound designer and composer working between a converted barn studio in
                the Pacific Northwest and wherever a project needs me. My work lives in the space
                between music and noise — the rumble under a held breath, the click that tells you
                a door is real.
              </p>
              <p className="text-muted-foreground">
                I collaborate closely with directors and game teams from the first cut, treating
                audio as story rather than decoration. Comfortable in 5.1, 7.1.4, and binaural —
                and just as happy with a single mono ribbon mic and a quiet room.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Dolby Atmos", "Adaptive Audio", "Foley", "Orchestration", "Sound Branding"].map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { year: "2024", text: "Best Sound — Cascade Independent Film Festival" },
                { year: "2023", text: "Lead audio on Hollow Keep, 200k+ copies sold" },
                { year: "2021", text: "Founded the barn studio, fully Atmos-certified" },
                { year: "2018", text: "First feature score for Lantern Films" },
              ].map((row) => (
                <div key={row.year} className="flex gap-4 rounded-lg border bg-card p-4">
                  <span className="font-semibold tabular-nums text-primary">{row.year}</span>
                  <Separator orientation="vertical" className="h-auto" />
                  <span className="text-sm text-muted-foreground">{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gear / skills */}
        <section id="gear" className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">The studio</h2>
              <p className="mt-2 text-muted-foreground">Tools and disciplines I bring to a session.</p>
            </div>
            <Sliders className="hidden h-8 w-8 text-muted-foreground sm:block" aria-hidden="true" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GEAR.map((g) => (
              <div key={g.label} className="flex items-start gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <g.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-medium">{g.label}</div>
                  <div className="text-sm text-muted-foreground">{g.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clients */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-5 py-14">
            <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by studios and storytellers
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
              {CLIENTS.map((c) => (
                <div key={c} className="flex items-center justify-center text-center text-sm font-semibold tracking-tight text-muted-foreground/80">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section id="book" className="mx-auto w-full max-w-6xl px-5 py-24">
          <div className="relative overflow-hidden rounded-2xl border bg-card px-6 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/40" />
            <div className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Headphones className="h-6 w-6" />
              </span>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Have a project that needs a soundtrack?
              </h2>
              <p className="text-muted-foreground">
                Booking select film, game, and brand work for the next two quarters. Send a brief
                and a deadline — I'll reply within two business days.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <Mail className="h-4 w-4" />
                  hello@rheavoss.audio
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Currently booking from August 2026
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <Waves className="h-4 w-4 text-primary" />
            Rhea Voss · Sound & Score
          </div>
          <div className="flex items-center gap-6">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#book" className="transition-colors hover:text-foreground">Booking</a>
          </div>
          <p>© 2026 Rhea Voss. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
