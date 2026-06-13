"use client"

import * as React from "react"
import {
  BookOpen,
  Star,
  Quote,
  ArrowRight,
  Calendar,
  MapPin,
  Mail,
  Feather,
  Headphones,
  Tablet,
  BookMarked,
  Check,
  Instagram,
  Twitter,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const praise = [
  {
    quote:
      "A luminous, unhurried novel that lingers long after the final page. Estelle Marchetti writes silence better than most writers write sound.",
    source: "The Atlantic Review",
  },
  {
    quote:
      "Every sentence feels carved rather than written. This is the rare book that earns the word masterpiece.",
    source: "Lila Hammond, bestselling author of Saltwater",
  },
  {
    quote:
      "Quietly devastating and impossibly tender. I read it twice in one weekend and would gladly start again.",
    source: "Bookmark Monthly",
  },
]

const excerpt = [
  "The lighthouse had not worked in thirty years, but every evening at dusk Mara climbed its iron stairs anyway, as if light were a habit the building might one day remember.",
  "She kept the letters in the lamp room, where the salt could not reach them, and read one each night until the paper grew soft as cloth in her hands.",
  "What she was waiting for, she could not have said. Only that waiting, like the sea, had its own slow grammar — and she had learned at last to speak it.",
]

const tour = [
  { city: "Portland, OR", venue: "Powell's City of Books", date: "Sep 12", time: "7:00 PM" },
  { city: "Seattle, WA", venue: "Elliott Bay Book Company", date: "Sep 15", time: "6:30 PM" },
  { city: "San Francisco, CA", venue: "City Lights Booksellers", date: "Sep 19", time: "7:30 PM" },
  { city: "Austin, TX", venue: "BookPeople", date: "Sep 24", time: "7:00 PM" },
  { city: "Brooklyn, NY", venue: "Greenlight Bookstore", date: "Oct 02", time: "7:00 PM" },
]

const formats = [
  {
    name: "Hardcover",
    icon: BookMarked,
    price: "$26",
    note: "First-edition cloth binding",
    perks: ["Signed bookplate edition", "Ribbon marker", "Free shipping over $35"],
    featured: true,
  },
  {
    name: "eBook",
    icon: Tablet,
    price: "$12",
    note: "Instant download, all devices",
    perks: ["EPUB & Kindle formats", "Lifetime re-downloads", "Bonus author footnotes"],
    featured: false,
  },
  {
    name: "Audiobook",
    icon: Headphones,
    price: "$19",
    note: "Read by the author, 9h 14m",
    perks: ["Unabridged narration", "DRM-free files", "Includes a sample chapter"],
    featured: false,
  },
]

const stats = [
  { value: "Sep 2", label: "On sale" },
  { value: "Vol. I", label: "The Tide trilogy" },
  { value: "342 pp", label: "Hardcover" },
]

export default function BookLaunch() {
  const [format, setFormat] = React.useState("Hardcover")
  const selected = formats.find((f) => f.name === format) ?? formats[0]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Feather className="size-4" />
            </span>
            <span className="font-serif text-lg">The Salt Keeper</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#praise" className="transition-colors hover:text-foreground">Praise</a>
            <a href="#inside" className="transition-colors hover:text-foreground">Inside</a>
            <a href="#author" className="transition-colors hover:text-foreground">Author</a>
            <a href="#tour" className="transition-colors hover:text-foreground">Tour</a>
          </nav>
          <Button size="sm" className="gap-2" asChild>
            <a href="#order">
              Pre-order
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.85fr] lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Star className="size-3" />
                A New York Times notable debut
              </Badge>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                The Salt Keeper
              </h1>
              <p className="mt-4 text-lg font-medium text-primary">
                A novel by Estelle Marchetti
              </p>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                On a forgotten stretch of coast, a woman tends a dead lighthouse and a
                box of letters she was never meant to read. A haunting story about
                memory, distance, and the things we keep alight.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2" asChild>
                  <a href="#order">
                    Pre-order the book
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <a href="#inside">
                    <BookOpen className="size-4" />
                    Read an excerpt
                  </a>
                </Button>
              </div>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border bg-card p-4 text-center">
                    <p className="font-serif text-xl font-semibold">{s.value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xs">
              <div className="aspect-[2/3] w-full overflow-hidden rounded-r-xl rounded-l-sm border bg-muted shadow-2xl shadow-primary/10 ring-1 ring-border">
                <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-primary/20 via-muted to-accent p-7 text-center">
                  <div className="text-left">
                    <p className="font-serif text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      A Novel
                    </p>
                  </div>
                  <div>
                    <Feather className="mx-auto size-10 text-primary" />
                    <p className="mt-4 font-serif text-3xl font-semibold leading-tight">
                      The Salt Keeper
                    </p>
                  </div>
                  <p className="font-serif text-sm tracking-wide text-muted-foreground">
                    Estelle Marchetti
                  </p>
                </div>
              </div>
              <Badge className="absolute -right-3 -top-3 gap-1 rounded-full px-3 py-1.5 shadow-md">
                <Star className="size-3" />
                Pre-order now
              </Badge>
            </div>
          </div>
        </section>

        <section id="praise" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="mb-10 flex items-center justify-center gap-1.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" />
              ))}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                Acclaimed by critics and readers alike
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {praise.map((p) => (
                <Card key={p.source} className="bg-background">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <Quote className="size-7 text-primary" />
                    <p className="flex-1 font-serif text-lg italic leading-relaxed">
                      {p.quote}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      — {p.source}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="inside" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge variant="outline" className="mb-4 gap-1.5">
                <BookOpen className="size-3" />
                Inside the book
              </Badge>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Turn to the first page
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                A short passage from the opening chapter. Settle in — the rest of the
                story is waiting in print, audio, and on every screen you own.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2" asChild>
                  <a href="#order">
                    Download chapter one
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-primary/30 bg-card">
              <CardContent className="p-8 sm:p-10">
                <p className="font-serif text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Chapter One — The Lamp Room
                </p>
                <Separator className="my-6" />
                <div className="space-y-5">
                  {excerpt.map((para, i) => (
                    <p
                      key={i}
                      className={cn(
                        "font-serif text-lg leading-relaxed text-foreground/90",
                        i === 0 &&
                          "first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:leading-none first-letter:text-primary"
                      )}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="author" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[0.6fr_1fr]">
            <div className="mx-auto w-full max-w-xs">
              <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border bg-muted shadow-sm">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent via-muted to-primary/20">
                  <span className="font-serif text-6xl font-semibold text-primary">EM</span>
                </div>
              </div>
            </div>
            <div>
              <Badge variant="outline" className="mb-4 gap-1.5">
                <Feather className="size-3" />
                About the author
              </Badge>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Estelle Marchetti
              </h2>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Estelle Marchetti grew up between a fishing village in Liguria and the
                grey coast of Maine, and both shorelines run through everything she
                writes. Her short fiction has appeared in The Paris Review and Granta,
                and her stories have twice been anthologized in Best American Short
                Stories.
              </p>
              <p className="mt-4 max-w-xl text-muted-foreground">
                The Salt Keeper is her first novel — a decade in the making and the
                opening volume of the Tide trilogy. She lives near the water, of course.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Award className="size-4 text-primary" />
                  PEN/Hemingway shortlist
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookMarked className="size-4 text-primary" />
                  Two-time Pushcart winner
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="tour" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="mb-8 max-w-2xl">
            <Badge variant="outline" className="mb-4 gap-1.5">
              <Calendar className="size-3" />
              On tour this autumn
            </Badge>
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Meet Estelle on the road
            </h2>
            <p className="mt-3 text-muted-foreground">
              Readings, signings, and conversation across the country. Seats are
              limited — reserve yours and bring your copy to be signed.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {tour.map((stop) => (
              <Card key={stop.city} className="transition-colors hover:bg-accent/40">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-lg border bg-muted/40 py-2 text-center">
                    <span className="font-serif text-lg font-semibold">
                      {stop.date.split(" ")[1]}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {stop.date.split(" ")[0]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 font-semibold">
                      <MapPin className="size-4 text-primary" />
                      {stop.city}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stop.venue} · {stop.time}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="shrink-0">
                    Reserve a seat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="order" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Choose your edition
              </h2>
              <p className="mt-3 text-muted-foreground">
                Pre-order today and you will be among the first to read it on launch day.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {formats.map((f) => {
                const isActive = format === f.name
                return (
                  <Card
                    key={f.name}
                    className={cn(
                      "relative cursor-pointer bg-background transition-all",
                      isActive
                        ? "border-primary ring-2 ring-primary/40"
                        : "hover:border-primary/40"
                    )}
                    onClick={() => setFormat(f.name)}
                  >
                    {f.featured && (
                      <Badge className="absolute -top-3 left-6 rounded-full px-3">
                        Most popular
                      </Badge>
                    )}
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex items-center justify-between">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <f.icon className="size-5" />
                        </span>
                        {isActive && (
                          <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="size-4" />
                          </span>
                        )}
                      </div>
                      <p className="mt-4 font-serif text-xl font-semibold">{f.name}</p>
                      <p className="text-sm text-muted-foreground">{f.note}</p>
                      <p className="mt-4 font-serif text-3xl font-semibold">
                        {f.price}
                      </p>
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {f.perks.map((perk) => (
                          <li
                            key={perk}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            {perk}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-background p-6 sm:flex-row">
              <div>
                <p className="font-serif text-lg font-semibold">
                  {selected.name} edition selected — {selected.price}
                </p>
                <p className="text-sm text-muted-foreground">{selected.note}</p>
              </div>
              <Button size="lg" className="gap-2">
                Pre-order the {selected.name.toLowerCase()}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <Card className="overflow-hidden border-primary/40">
            <CardContent className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="secondary" className="mb-4 gap-1.5">
                  <Mail className="size-3" />
                  From the author's desk
                </Badge>
                <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                  Get the launch-day letter
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  A few times a year, Estelle writes about the sea, the craft, and what
                  comes next in the Tide trilogy. Subscribe for the first chapter free.
                </p>
              </div>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="h-12"
                />
                <Button size="lg" type="submit" className="h-12 gap-2">
                  Send me chapter one
                  <ArrowRight className="size-4" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Join 18,000+ readers. No spam, only stories.
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
              <Feather className="size-4" />
            </span>
            <span className="font-serif text-lg">The Salt Keeper</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Instagram">
              <Instagram className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Author newsletter">
              <Mail className="size-4" />
            </Button>
          </div>
        </div>
        <Separator />
        <div className="mx-auto w-full max-w-6xl px-6 py-5 text-center text-sm text-muted-foreground">
          © 2026 Estelle Marchetti. Published by Tidewater & Co.
        </div>
      </footer>
    </div>
  )
}
