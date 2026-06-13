"use client"

import * as React from "react"
import { Calendar, MapPin, Clock, Palette, ArrowRight, Ticket, Instagram, Twitter, Mail, Check, Frame } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Medium = "All" | "Painting" | "Sculpture" | "Photography" | "Digital"

const MEDIA: Medium[] = ["All", "Painting", "Sculpture", "Photography", "Digital"]

const ARTWORKS: { title: string; artist: string; medium: Exclude<Medium, "All">; year: string; tone: string }[] = [
  { title: "Cobalt Reverie", artist: "IrisВаленте", medium: "Painting", year: "2024", tone: "bg-primary/20" },
  { title: "Hollow Forms II", artist: "Mateo Ríos", medium: "Sculpture", year: "2023", tone: "bg-muted" },
  { title: "Silent Avenues", artist: "Naomi Park", medium: "Photography", year: "2024", tone: "bg-secondary" },
  { title: "Phase Drift", artist: "Lukas Behr", medium: "Digital", year: "2025", tone: "bg-accent" },
  { title: "Ochre Fields", artist: "Salima Diop", medium: "Painting", year: "2022", tone: "bg-primary/10" },
  { title: "Weight of Light", artist: "Hana Mori", medium: "Sculpture", year: "2024", tone: "bg-muted/60" },
  { title: "Glass Horizon", artist: "Theo Lindqvist", medium: "Photography", year: "2023", tone: "bg-secondary" },
  { title: "Render / Decay", artist: "Aya Kobayashi", medium: "Digital", year: "2025", tone: "bg-accent" },
]

const ARTISTS = [
  { name: "Iris Валенте", role: "Painter", bio: "Builds layered abstractions drawn from coastal light and memory.", initials: "IV" },
  { name: "Mateo Ríos", role: "Sculptor", bio: "Carves negative space from reclaimed stone and welded steel.", initials: "MR" },
  { name: "Aya Kobayashi", role: "Digital Artist", bio: "Generative systems exploring the texture of synthetic decay.", initials: "AK" },
]

const TIERS = [
  { name: "Day Pass", price: "$18", note: "Single-day general admission", perks: ["Full gallery access", "Self-guided map", "Free coat check"], highlight: false },
  { name: "Patron", price: "$45", note: "All-festival, plus the opening", perks: ["All-day re-entry", "Opening night reception", "Curator-led walk", "Exhibition catalogue"], highlight: true },
  { name: "Collector", price: "$120", note: "Private preview & artist dinner", perks: ["Everything in Patron", "Private collectors preview", "Artist dinner seat", "Limited edition print"], highlight: false },
]

const SPONSORS = ["MERIDIAN FOUNDATION", "Atelier Press", "NORTHBANK", "Cobalt & Co.", "The Vellum Trust", "STUDIO NINE"]

const VISIT_INFO = [
  { icon: Calendar, label: "Dates", value: "October 4 – November 16" },
  { icon: Clock, label: "Hours", value: "Tue – Sun, 10:00 – 18:00" },
  { icon: MapPin, label: "Venue", value: "Hall of Forms, Pier 9, Lisbon" },
]

export default function ArtExhibitionPage() {
  const [active, setActive] = React.useState<Medium>("All")

  const visible = active === "All" ? ARTWORKS : ARTWORKS.filter((a) => a.medium === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase">
            <Frame className="h-4 w-4" aria-hidden="true" />
            Liminal
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Primary">
            <a href="#works" className="transition-colors hover:text-foreground">Works</a>
            <a href="#artists" className="transition-colors hover:text-foreground">Artists</a>
            <a href="#visit" className="transition-colors hover:text-foreground">Visit</a>
            <a href="#tickets" className="transition-colors hover:text-foreground">Tickets</a>
          </nav>
          <Button size="sm" className="gap-2">
            <Ticket className="h-4 w-4" aria-hidden="true" />
            Get Tickets
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
            <div className="flex flex-col justify-center">
              <Badge variant="outline" className="mb-6 w-fit gap-1.5 rounded-full px-3 py-1 text-xs tracking-widest uppercase">
                <Palette className="h-3 w-3" aria-hidden="true" />
                Contemporary Group Show
              </Badge>
              <h1 className="text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
                Liminal <span className="italic text-muted-foreground">States</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Twenty-four artists trace the thresholds between matter and light across painting, sculpture, photography, and the digital.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" className="gap-2">
                  Plan your visit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <span className="text-sm text-muted-foreground">Free entry every first Sunday</span>
              </div>
              <Separator className="my-10" />
              <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {VISIT_INFO.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <info.icon className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{info.label}</dt>
                      <dd className="mt-1 text-sm font-medium">{info.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative hidden items-center md:flex">
              <div className="grid w-full grid-cols-2 gap-3">
                <div className="aspect-[3/4] rounded-sm bg-primary/20" />
                <div className="mt-10 aspect-[3/4] rounded-sm bg-muted" />
                <div className="-mt-4 aspect-[3/4] rounded-sm bg-secondary" />
                <div className="mt-6 aspect-[3/4] rounded-sm bg-accent" />
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Featured</p>
                <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Works on view</h2>
              </div>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by medium">
                {MEDIA.map((m) => (
                  <button
                    key={m}
                    role="tab"
                    aria-selected={active === m}
                    onClick={() => setActive(m)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      active === m
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((art) => (
                <Card key={art.title} className="group overflow-hidden border bg-card pt-0">
                  <div className={cn("aspect-square w-full transition-transform duration-500 group-hover:scale-105", art.tone)} />
                  <CardContent className="px-5">
                    <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wider">{art.medium}</Badge>
                    <h3 className="text-base font-medium leading-tight">{art.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{art.artist} · {art.year}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {visible.length === 0 && (
              <p className="mt-10 text-center text-sm text-muted-foreground">No works in this medium yet.</p>
            )}
          </div>
        </section>

        <section id="artists" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Voices</p>
            <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Featured artists</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {ARTISTS.map((artist) => (
                <Card key={artist.name} className="border bg-background">
                  <CardHeader>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-base font-medium text-primary">
                      {artist.initials}
                    </div>
                    <CardTitle className="pt-3 text-lg font-medium">{artist.name}</CardTitle>
                    <CardDescription className="uppercase tracking-wider">{artist.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{artist.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="visit" className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Visit</p>
              <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Plan your visit</h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                The Hall of Forms sits on the waterfront at Pier 9. The exhibition spans three floors with a quiet reading room and a riverside café.
              </p>
              <div className="mt-8 space-y-4">
                {VISIT_INFO.map((info) => (
                  <div key={info.label} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                    <info.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{info.label}</p>
                      <p className="text-sm font-medium">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-lg border bg-muted/40 p-8">
              <h3 className="text-lg font-medium">Guided experiences</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" /> Curator walkthroughs every Thursday at 17:00</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" /> Family workshops on weekend mornings</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" /> Accessible routes and step-free access throughout</li>
                <li className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" /> Audio guides in six languages</li>
              </ul>
              <Button variant="outline" className="mt-8 w-fit gap-2">
                Book a guided tour
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>

        <section id="tickets" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admission</p>
              <h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Ticket tiers</h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {TIERS.map((tier) => (
                <Card
                  key={tier.name}
                  className={cn(
                    "flex flex-col border bg-background",
                    tier.highlight && "border-primary ring-1 ring-primary"
                  )}
                >
                  <CardHeader>
                    {tier.highlight && (
                      <Badge className="mb-2 w-fit text-[10px] uppercase tracking-wider">Most popular</Badge>
                    )}
                    <CardTitle className="text-lg font-medium">{tier.name}</CardTitle>
                    <CardDescription>{tier.note}</CardDescription>
                    <p className="pt-2 text-4xl font-light tracking-tight">{tier.price}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3 text-sm">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-3 text-muted-foreground">
                          <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant={tier.highlight ? "default" : "outline"} className="w-full">
                      Choose {tier.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Supported by</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {SPONSORS.map((s) => (
                <span key={s} className="text-sm font-medium tracking-widest text-muted-foreground/80">{s}</span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase">
              <Frame className="h-4 w-4" aria-hidden="true" />
              Liminal
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A contemporary exhibition at the Hall of Forms, Lisbon. October 4 – November 16.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#works" className="hover:text-foreground">Works</a></li>
              <li><a href="#artists" className="hover:text-foreground">Artists</a></li>
              <li><a href="#visit" className="hover:text-foreground">Visit</a></li>
              <li><a href="#tickets" className="hover:text-foreground">Tickets</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Follow</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="icon" aria-label="Instagram"><Instagram className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" aria-label="Twitter"><Twitter className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" aria-label="Email"><Mail className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="mx-auto w-full max-w-6xl px-6 py-6 text-center text-xs text-muted-foreground">
          © 2026 Liminal States Exhibition. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
