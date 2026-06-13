"use client"

import * as React from "react"
import {
  Mic,
  Play,
  Pause,
  Headphones,
  Apple,
  Rss,
  Music2,
  Radio,
  Clock,
  Calendar,
  ArrowRight,
  Quote,
  Mail,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const listenOn = [
  { name: "Apple Podcasts", icon: Apple },
  { name: "Spotify", icon: Music2 },
  { name: "Overcast", icon: Radio },
  { name: "RSS Feed", icon: Rss },
]

const episodes = [
  {
    number: 142,
    title: "Building in Public, Quietly",
    blurb:
      "We unpack why shipping fast can mean staying small, and how to keep your craft when the metrics start shouting.",
    duration: "54:12",
    date: "Jun 9, 2026",
    season: "S4",
    featured: true,
  },
  {
    number: 141,
    title: "The Myth of the Overnight Studio",
    blurb:
      "A decade of side projects, three pivots, and the boring habits that actually compound over time.",
    duration: "1:02:40",
    date: "Jun 2, 2026",
    season: "S4",
    featured: false,
  },
  {
    number: 140,
    title: "Designing for the Last 5%",
    blurb:
      "Polish is a feeling. We talk about the micro-details that separate a tool people tolerate from one they love.",
    duration: "47:55",
    date: "May 26, 2026",
    season: "S4",
    featured: false,
  },
  {
    number: 139,
    title: "Saying No, On the Record",
    blurb:
      "Scope creep, founder guilt, and the surprisingly freeing discipline of a shorter roadmap.",
    duration: "58:03",
    date: "May 19, 2026",
    season: "S4",
    featured: false,
  },
]

const hosts = [
  {
    name: "Dana Okafor",
    role: "Host & Producer",
    initials: "DO",
    bio: "Former product lead turned audio nerd. Asks the question everyone is thinking but no one says out loud.",
  },
  {
    name: "Marco Vidal",
    role: "Co-host",
    initials: "MV",
    bio: "Engineer, tinkerer, reluctant optimist. Keeps the conversation honest and the tangents worth it.",
  },
]

const stats = [
  { value: "142", label: "Episodes" },
  { value: "1.2M", label: "Downloads" },
  { value: "4.9", label: "Avg. rating" },
]

export default function PodcastSite() {
  const [playing, setPlaying] = React.useState<number | null>(142)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Headphones className="size-4" />
            </span>
            <span>Signal & Static</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#episodes" className="transition-colors hover:text-foreground">
              Episodes
            </a>
            <a href="#hosts" className="transition-colors hover:text-foreground">
              Hosts
            </a>
            <a href="#subscribe" className="transition-colors hover:text-foreground">
              Subscribe
            </a>
          </nav>
          <Button size="sm" className="gap-2">
            <Play className="size-4" />
            Listen now
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Mic className="size-3" />
                New episode every Tuesday
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Honest conversations about making things people use.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                A weekly show about the craft, chaos, and quiet wins of building
                products. No hype, just the parts no one puts on the landing page.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  <Play className="size-4" />
                  Play latest episode
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="#episodes">
                    Browse episodes
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Listen on
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {listenOn.map((p) => (
                    <a
                      key={p.name}
                      href="#subscribe"
                      className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <p.icon className="size-4" />
                      {p.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border bg-muted shadow-sm">
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/20 via-muted to-accent p-8 text-center">
                  <span className="flex size-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Headphones className="size-9" />
                  </span>
                  <div>
                    <p className="text-2xl font-bold">Signal & Static</p>
                    <p className="text-sm text-muted-foreground">
                      Season 4 — now streaming
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border bg-card p-4 text-center"
                  >
                    <p className="text-xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="episodes" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Latest episodes
              </h2>
              <p className="mt-2 text-muted-foreground">
                Catch up on the newest conversations from Season 4.
              </p>
            </div>
            <Button variant="ghost" className="hidden gap-1 sm:inline-flex">
              View all
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {episodes.map((ep) => {
              const isPlaying = playing === ep.number
              return (
                <Card
                  key={ep.number}
                  className={cn(
                    "transition-colors",
                    ep.featured && "border-primary/40 bg-primary/5"
                  )}
                >
                  <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                    <Button
                      size="icon"
                      variant={isPlaying ? "default" : "outline"}
                      className="size-12 shrink-0 rounded-full"
                      aria-label={
                        isPlaying
                          ? `Pause episode ${ep.number}`
                          : `Play episode ${ep.number}`
                      }
                      onClick={() =>
                        setPlaying(isPlaying ? null : ep.number)
                      }
                    >
                      {isPlaying ? (
                        <Pause className="size-5" />
                      ) : (
                        <Play className="size-5" />
                      )}
                    </Button>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="font-mono">
                          {ep.season} · #{ep.number}
                        </Badge>
                        {ep.featured && <Badge>Latest</Badge>}
                      </div>
                      <h3 className="mt-2 truncate text-lg font-semibold">
                        {ep.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {ep.blurb}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-5 text-sm text-muted-foreground sm:flex-col sm:items-end sm:gap-1">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" />
                        {ep.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {ep.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section id="hosts" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Meet the hosts
              </h2>
              <p className="mt-2 text-muted-foreground">
                Two friends who have shipped, broken, and rebuilt enough things to
                have opinions worth recording.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {hosts.map((host) => (
                <Card key={host.name}>
                  <CardContent className="flex gap-4 p-6">
                    <Avatar className="size-16">
                      <AvatarFallback className="bg-primary/10 text-base font-semibold text-primary">
                        {host.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{host.name}</p>
                      <p className="text-sm text-primary">{host.role}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {host.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-background">
              <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:items-center">
                <Quote className="size-8 shrink-0 text-primary" />
                <div>
                  <p className="text-lg font-medium">
                    "The rare tech podcast that respects your commute and your
                    intelligence. I learn something every single week."
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Apple Podcasts review · 4.9 stars from 3,200 ratings
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="subscribe" className="mx-auto w-full max-w-6xl px-6 py-16">
          <Card className="overflow-hidden border-primary/40">
            <CardContent className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <Mail className="size-3" />
                  Free weekly digest
                </Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Never miss an episode
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Get show notes, links, and the occasional behind-the-mic story
                  in your inbox every Tuesday. No spam, unsubscribe anytime.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {listenOn.map((p) => (
                    <a
                      key={p.name}
                      href="#"
                      aria-label={`Subscribe on ${p.name}`}
                      className="inline-flex size-10 items-center justify-center rounded-full border bg-background transition-colors hover:bg-accent"
                    >
                      <p.icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>

              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="h-12"
                />
                <Button size="lg" type="submit" className="h-12 gap-2">
                  Subscribe
                  <ArrowRight className="size-4" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Join 24,000+ listeners getting the digest.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Headphones className="size-4" />
            </span>
            Signal & Static
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="YouTube">
              <Youtube className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="RSS feed">
              <Rss className="size-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="mx-auto w-full max-w-6xl px-6 py-5 text-center text-sm text-muted-foreground">
          © 2026 Signal & Static. Recorded somewhere with decent coffee.
        </div>
      </footer>
    </div>
  )
}
