"use client"

import * as React from "react"
import {
  Camera,
  Aperture,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Instagram,
  Twitter,
  Globe,
  ShoppingBag,
  Heart,
  Clock,
  Menu,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const genres = ["All", "Travel", "Street", "Portrait", "Nature"] as const
type Genre = (typeof genres)[number]

const posts: {
  title: string
  genre: Exclude<Genre, "All">
  location: string
  date: string
  read: string
  aspect: string
  featured?: boolean
}[] = [
  {
    title: "Blue Hour Over the Faroe Islands",
    genre: "Travel",
    location: "Vágar, Faroe Islands",
    date: "Jun 4, 2026",
    read: "6 min",
    aspect: "aspect-[4/5]",
    featured: true,
  },
  {
    title: "Neon Rain on Dotonbori",
    genre: "Street",
    location: "Osaka, Japan",
    date: "May 28, 2026",
    read: "4 min",
    aspect: "aspect-square",
  },
  {
    title: "Hands That Tell the Story",
    genre: "Portrait",
    location: "Marrakech, Morocco",
    date: "May 19, 2026",
    read: "5 min",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Fog Banks of the Redwood Coast",
    genre: "Nature",
    location: "Mendocino, USA",
    date: "May 11, 2026",
    read: "7 min",
    aspect: "aspect-square",
  },
  {
    title: "Crossing Lines in Hanoi",
    genre: "Street",
    location: "Hanoi, Vietnam",
    date: "May 2, 2026",
    read: "3 min",
    aspect: "aspect-square",
  },
  {
    title: "Salt Flats at First Light",
    genre: "Travel",
    location: "Uyuni, Bolivia",
    date: "Apr 24, 2026",
    read: "8 min",
    aspect: "aspect-[4/5]",
  },
  {
    title: "A Quiet Study in Window Light",
    genre: "Portrait",
    location: "Lisbon, Portugal",
    date: "Apr 15, 2026",
    read: "4 min",
    aspect: "aspect-square",
  },
  {
    title: "Where the Glaciers Calve",
    genre: "Nature",
    location: "Jökulsárlón, Iceland",
    date: "Apr 6, 2026",
    read: "6 min",
    aspect: "aspect-[4/5]",
  },
]

const gearList = [
  { name: "Sony A7R V", role: "Primary body" },
  { name: "35mm f/1.4 GM", role: "Walkaround" },
  { name: "85mm f/1.8", role: "Portraits" },
  { name: "Peak Design Tripod", role: "Long exposure" },
]

const prints = [
  { title: "Faroe Blue Hour", size: '24 × 30"', price: "$180", tone: "bg-primary/10" },
  { title: "Salt Flat Mirror", size: '18 × 24"', price: "$140", tone: "bg-accent" },
  { title: "Redwood Fog", size: '16 × 20"', price: "$120", tone: "bg-secondary" },
]

const navLinks = ["Journal", "Galleries", "Prints", "About", "Contact"]

export default function PhotographyBlog() {
  const [active, setActive] = React.useState<Genre>("All")

  const visible = React.useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.genre === active)),
    [active]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <Aperture className="h-5 w-5 text-primary" />
            <span className="text-base">Mara Lindqvist</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              Subscribe
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Immersive hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-muted to-background" />
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center md:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sun className="h-3.5 w-3.5" />
                Light Chasers · Issue 14
              </Badge>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                A photo-journal for those who travel toward the light.
              </h1>
              <p className="mt-6 max-w-md text-pretty text-lg text-muted-foreground">
                Field notes, frames, and the stories behind them — shot on the road,
                printed by hand, and shared one honest exposure at a time.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Read the journal
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  View galleries
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div>
                  <div className="text-2xl font-semibold text-foreground">42</div>
                  countries
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div>
                  <div className="text-2xl font-semibold text-foreground">280k</div>
                  frames shot
                </div>
                <Separator orientation="vertical" className="h-10" />
                <div>
                  <div className="text-2xl font-semibold text-foreground">9 yrs</div>
                  on the road
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border bg-gradient-to-tr from-muted via-accent to-primary/20 shadow-xl">
                <div className="flex h-full w-full items-end justify-between p-6">
                  <div className="rounded-lg bg-background/70 px-3 py-2 text-xs backdrop-blur">
                    <div className="font-medium">Faroe Islands</div>
                    <div className="text-muted-foreground">f/8 · 1/4s · ISO 100</div>
                  </div>
                  <Aperture className="h-10 w-10 text-foreground/40" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden h-28 w-40 rotate-[-6deg] overflow-hidden rounded-xl border bg-gradient-to-br from-secondary to-primary/15 shadow-lg sm:block" />
            </div>
          </div>
        </section>

        {/* Gallery / posts with genre filter */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    The Journal
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {visible.length} {visible.length === 1 ? "story" : "stories"}
                    {active !== "All" ? ` in ${active}` : " across every genre"}
                  </p>
                </div>
              </div>

              {/* Genre chips */}
              <div className="mb-8 flex flex-wrap gap-2">
                {genres.map((g) => {
                  const isActive = g === active
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setActive(g)}
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {g}
                    </button>
                  )
                })}
              </div>

              {/* Masonry-ish grid */}
              <div className="columns-1 gap-5 sm:columns-2">
                {visible.map((post) => (
                  <article
                    key={post.title}
                    className="group mb-5 break-inside-avoid"
                  >
                    <div
                      className={cn(
                        "relative overflow-hidden rounded-xl border",
                        post.aspect,
                        post.featured
                          ? "bg-gradient-to-br from-primary/25 via-accent to-muted"
                          : "bg-gradient-to-br from-muted via-secondary to-accent"
                      )}
                    >
                      <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
                      <Badge
                        variant="secondary"
                        className="absolute left-3 top-3 backdrop-blur"
                      >
                        {post.genre}
                      </Badge>
                      <Button
                        size="icon"
                        variant="secondary"
                        aria-label="Save to favourites"
                        className="absolute right-3 top-3 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 px-0.5">
                      <h3 className="font-medium leading-snug tracking-tight transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {post.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.read}
                        </span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {visible.length === 0 && (
                <div className="rounded-xl border border-dashed py-16 text-center text-sm text-muted-foreground">
                  No stories in this genre yet — check back soon.
                </div>
              )}
            </div>

            {/* About-the-photographer sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Mara Lindqvist</div>
                      <div className="text-xs text-muted-foreground">
                        Travel & documentary
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    I&apos;m a Stockholm-based photographer drawn to soft light and slow
                    mornings. This is where I keep the frames worth keeping.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Instagram">
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Website">
                      <Globe className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Gear teaser */}
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                    <Camera className="h-4 w-4 text-primary" />
                    In the bag
                  </div>
                  <ul className="space-y-3">
                    {gearList.map((g) => (
                      <li key={g.name} className="flex items-center justify-between text-sm">
                        <span>{g.name}</span>
                        <span className="text-xs text-muted-foreground">{g.role}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="mt-3 h-auto gap-1 p-0 text-sm">
                    See full kit
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        {/* Prints teaser */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 md:py-20">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge variant="outline" className="mb-3 gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Print shop
                </Badge>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Take a frame home
                </h2>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Archival giclée prints on cotton rag, hand-numbered and signed in
                  editions of 50.
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                Browse all prints
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {prints.map((print) => (
                <Card key={print.title} className="overflow-hidden">
                  <div className={cn("aspect-[3/4] border-b", print.tone)} />
                  <CardContent className="flex items-center justify-between pt-4">
                    <div>
                      <div className="font-medium leading-tight">{print.title}</div>
                      <div className="text-xs text-muted-foreground">{print.size}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{print.price}</div>
                      <Button variant="link" className="h-auto p-0 text-xs">
                        Add to cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter signup */}
        <section className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
          <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent">
            <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Light Chasers, in your inbox
                </h2>
                <p className="mt-3 text-pretty text-muted-foreground">
                  One letter a month: a single story, the frame behind it, and where
                  I&apos;m pointing the lens next. No noise, ever.
                </p>
              </div>
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="pl-9"
                  />
                </div>
                <Button type="submit" className="shrink-0">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-semibold">
                <Aperture className="h-5 w-5 text-primary" />
                Mara Lindqvist
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                A photo-journal of light, distance, and the quiet in between.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
              <div>
                <div className="mb-3 font-medium">Explore</div>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Journal</a></li>
                  <li><a href="#" className="hover:text-foreground">Galleries</a></li>
                  <li><a href="#" className="hover:text-foreground">Prints</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-3 font-medium">Studio</div>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">About</a></li>
                  <li><a href="#" className="hover:text-foreground">Gear</a></li>
                  <li><a href="#" className="hover:text-foreground">Licensing</a></li>
                </ul>
              </div>
              <div>
                <div className="mb-3 font-medium">Connect</div>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground">Instagram</a></li>
                  <li><a href="#" className="hover:text-foreground">Newsletter</a></li>
                  <li><a href="#" className="hover:text-foreground">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <span>© 2026 Mara Lindqvist. All frames reserved.</span>
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
