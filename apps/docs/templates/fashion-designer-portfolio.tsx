"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Quote,
  Scissors,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Season = "All" | "SS" | "FW" | "Resort" | "Couture"

const SEASONS: Season[] = ["All", "SS", "FW", "Resort", "Couture"]

const COLLECTIONS: {
  title: string
  season: Exclude<Season, "All">
  seasonLabel: string
  year: string
  pieces: number
  accent: string
}[] = [
  { title: "Lumen", season: "SS", seasonLabel: "Spring / Summer", year: "26", pieces: 24, accent: "from-primary/20 to-muted" },
  { title: "Noir Atelier", season: "FW", seasonLabel: "Fall / Winter", year: "25", pieces: 31, accent: "from-muted to-accent" },
  { title: "Côte", season: "Resort", seasonLabel: "Resort", year: "26", pieces: 18, accent: "from-secondary to-muted" },
  { title: "Reverie", season: "Couture", seasonLabel: "Haute Couture", year: "25", pieces: 12, accent: "from-primary/10 to-accent" },
  { title: "Solstice", season: "SS", seasonLabel: "Spring / Summer", year: "25", pieces: 27, accent: "from-accent to-muted" },
  { title: "Glaçon", season: "FW", seasonLabel: "Fall / Winter", year: "26", pieces: 22, accent: "from-muted to-secondary" },
  { title: "Mirage", season: "Resort", seasonLabel: "Resort", year: "25", pieces: 16, accent: "from-primary/15 to-muted" },
  { title: "Astra", season: "Couture", seasonLabel: "Haute Couture", year: "26", pieces: 9, accent: "from-accent to-primary/10" },
]

const PRESS = [
  { outlet: "VOGUE", quote: "An architect of light and silhouette redefining modern couture.", issue: "March 2026" },
  { outlet: "DAZED", quote: "Each collection reads like a manifesto stitched in motion.", issue: "Feb 2026" },
  { outlet: "AnOther", quote: "Restraint and rebellion in perfect, tailored tension.", issue: "Jan 2026" },
]

const STOCKISTS = [
  { name: "Dover Street Market", city: "London" },
  { name: "10 Corso Como", city: "Milan" },
  { name: "L'Eclaireur", city: "Paris" },
  { name: "Ssense", city: "Montréal" },
  { name: "United Arrows", city: "Tokyo" },
  { name: "The Webster", city: "New York" },
]

export default function FashionDesignerPortfolio() {
  const [season, setSeason] = React.useState<Season>("All")

  const filtered = React.useMemo(
    () => (season === "All" ? COLLECTIONS : COLLECTIONS.filter((c) => c.season === season)),
    [season],
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-[0.3em] uppercase">
            <Scissors className="h-4 w-4" aria-hidden="true" />
            Elise Marchand
          </a>
          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex">
            <a href="#collections" className="transition-colors hover:text-foreground">Collections</a>
            <a href="#about" className="transition-colors hover:text-foreground">Atelier</a>
            <a href="#press" className="transition-colors hover:text-foreground">Press</a>
            <a href="#stockists" className="transition-colors hover:text-foreground">Stockists</a>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden uppercase tracking-[0.18em] sm:inline-flex">
              <a href="#contact">Enquire</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-accent" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
            <div className="space-y-8">
              <Badge variant="outline" className="uppercase tracking-[0.22em]">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Lookbook 2026
              </Badge>
              <h1 className="text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
                Couture in
                <span className="block italic">perpetual motion.</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                The studio of Elise Marchand — sculpting light, structure, and movement into
                garments built for the women who move the world.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="uppercase tracking-[0.18em]">
                  <a href="#collections">View Collections</a>
                </Button>
                <Button asChild variant="link" size="lg" className="uppercase tracking-[0.18em]">
                  <a href="#about">The Atelier <ArrowUpRight className="h-4 w-4" /></a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] w-full rounded-sm bg-gradient-to-b from-primary/15 via-muted to-secondary" aria-hidden="true" />
              <div className="absolute -bottom-6 -left-6 hidden rounded-sm border bg-card p-5 shadow-sm sm:block">
                <p className="text-3xl font-light">12</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Seasons shown</p>
              </div>
            </div>
          </div>
        </section>

        {/* Collections + filter */}
        <section id="collections" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The Archive</p>
              <h2 className="text-4xl font-light tracking-tight">Collections</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {SEASONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors",
                    season === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  aria-pressed={season === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <article key={c.title} className="group cursor-pointer overflow-hidden rounded-sm border bg-card">
                <div className={cn("relative aspect-[4/5] w-full bg-gradient-to-b", c.accent)} aria-hidden="true">
                  <Badge variant="secondary" className="absolute left-4 top-4 uppercase tracking-[0.16em]">
                    {c.season} &apos;{c.year}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="text-lg font-light tracking-tight">{c.title}</h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {c.seasonLabel} · {c.pieces} looks
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-12 text-center text-sm text-muted-foreground">No collections in this season yet.</p>
          )}
        </section>

        {/* About / Philosophy */}
        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
            <div className="aspect-square w-full rounded-sm bg-gradient-to-tr from-secondary via-muted to-primary/15" aria-hidden="true" />
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Philosophy</p>
              <h2 className="text-4xl font-light leading-tight tracking-tight">
                Garments as architecture for the body.
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Trained in Paris and Antwerp, Elise founded the atelier in 2014 with a singular
                obsession: the dialogue between rigid structure and fluid movement. Every piece
                begins on the body — draped, pinned, and resolved by hand before a single
                pattern is cut.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The studio works in small, deliberate runs, partnering with European mills who
                share a commitment to longevity over season.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { n: "2014", l: "Founded" },
                  { n: "180+", l: "Looks made" },
                  { n: "9", l: "Cities stocked" },
                ].map((stat) => (
                  <div key={stat.l}>
                    <p className="text-3xl font-light">{stat.n}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{stat.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Press */}
        <section id="press" className="mx-auto w-full max-w-6xl px-6 py-24">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">In the press</p>
            <h2 className="text-4xl font-light tracking-tight">Featured</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {PRESS.map((p) => (
              <figure key={p.outlet} className="flex flex-col gap-5 border-t pt-6">
                <Quote className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                <blockquote className="text-lg font-light leading-relaxed">{p.quote}</blockquote>
                <figcaption className="mt-auto flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="font-semibold tracking-[0.28em] text-foreground">{p.outlet}</span>
                  <span>{p.issue}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Stockists */}
        <section id="stockists" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-24">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Where to find us</p>
                <h2 className="text-4xl font-light tracking-tight">Stockists</h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Selected pieces are available at leading boutiques worldwide, alongside private
                appointments at the Paris atelier.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-sm border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {STOCKISTS.map((s) => (
                <div key={s.name} className="flex items-center justify-between bg-card px-6 py-6">
                  <div>
                    <p className="text-base font-light">{s.name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      <MapPin className="mr-1 inline h-3 w-3" aria-hidden="true" />
                      {s.city}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto w-full max-w-4xl px-6 py-28 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Enquiries</p>
          <h2 className="mt-4 text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            Press, wholesale & private commissions.
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted-foreground">
            Leave your details and the studio will be in touch within two business days.
          </p>
          <form className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="your@email.com" aria-label="Email address" className="h-12" />
            <Button type="submit" size="lg" className="h-12 uppercase tracking-[0.18em]">
              <Mail className="h-4 w-4" />
              Enquire
            </Button>
          </form>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-sm uppercase tracking-[0.3em]">Elise Marchand</p>
            <div className="flex items-center gap-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <a href="#collections" className="transition-colors hover:text-foreground">Collections</a>
              <a href="#press" className="transition-colors hover:text-foreground">Press</a>
              <a href="#contact" className="flex items-center gap-1 transition-colors hover:text-foreground">
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-xs uppercase tracking-[0.16em] text-muted-foreground">
            © 2026 Maison Marchand · Paris
          </p>
        </div>
      </footer>
    </div>
  )
}
