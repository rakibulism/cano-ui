"use client"

import * as React from "react"
import {
  Aperture,
  Camera,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  ArrowRight,
  Check,
  Star,
  Send,
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type GalleryItem = {
  id: number
  title: string
  category: string
  span: string
}

const CATEGORIES = ["All", "Portrait", "Wedding", "Travel", "Editorial"] as const

const GALLERY: GalleryItem[] = [
  { id: 1, title: "Golden Hour", category: "Portrait", span: "row-span-2" },
  { id: 2, title: "Coastal Vows", category: "Wedding", span: "row-span-1" },
  { id: 3, title: "Desert Lines", category: "Travel", span: "row-span-1" },
  { id: 4, title: "Studio Light", category: "Editorial", span: "row-span-2" },
  { id: 5, title: "First Dance", category: "Wedding", span: "row-span-1" },
  { id: 6, title: "Quiet Gaze", category: "Portrait", span: "row-span-1" },
  { id: 7, title: "Alpine Drift", category: "Travel", span: "row-span-2" },
  { id: 8, title: "City Mono", category: "Editorial", span: "row-span-1" },
  { id: 9, title: "Soft Bloom", category: "Portrait", span: "row-span-1" },
]

const PACKAGES = [
  {
    name: "Portrait Session",
    price: "$320",
    unit: "/ session",
    blurb: "A relaxed 1-hour shoot for individuals or couples.",
    features: ["60-minute session", "1 location", "25 edited photos", "Online gallery"],
    featured: false,
  },
  {
    name: "Wedding Day",
    price: "$2,400",
    unit: "/ event",
    blurb: "Full coverage from preparation to the last dance.",
    features: ["Up to 10 hours", "Second shooter", "400+ edited photos", "Premium album", "Sneak peek in 48h"],
    featured: true,
  },
  {
    name: "Editorial / Brand",
    price: "$680",
    unit: "/ half-day",
    blurb: "Story-driven imagery for brands and publications.",
    features: ["4-hour shoot", "Art direction", "40 edited photos", "Commercial license"],
    featured: false,
  },
]

const STATS = [
  { value: "240+", label: "Sessions shot" },
  { value: "9", label: "Years behind the lens" },
  { value: "18", label: "Countries traveled" },
  { value: "4.9", label: "Average rating" },
]

const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
]

export default function PhotographerPortfolio() {
  const [filter, setFilter] = React.useState<(typeof CATEGORIES)[number]>("All")
  const [sent, setSent] = React.useState(false)

  const visible = React.useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <Aperture className="size-5 text-primary" />
            <span>Mara Vance</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Book a session</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-muted" aria-hidden="true" />
          <div className="absolute inset-0 opacity-40" aria-hidden="true">
            <div className="absolute -right-24 top-10 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -left-20 bottom-0 size-72 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Camera className="size-3.5" />
                Available for 2026 bookings
              </Badge>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Light, framed with feeling.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                I'm Mara, a portrait and wedding photographer chasing honest moments
                and the kind of light you can't pose for.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#work">
                    View portfolio
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#packages">See packages</a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </span>
                Loved by 240+ clients worldwide
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-muted shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <Camera className="size-16 opacity-30" aria-hidden="true" />
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg border bg-background/90 px-3 py-2 text-xs backdrop-blur">
                <p className="font-medium">Featured · Coastal Vows</p>
                <p className="text-muted-foreground">Big Sur, California</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-6 py-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-2 text-center">
                <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Selected work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">A look through the lens</h2>
              <p className="mt-2 max-w-md text-muted-foreground">
                A small slice of recent sessions. Filter by the kind of story you're after.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    filter === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3">
            {visible.map((item) => (
              <figure
                key={item.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-muted",
                  item.span
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-muted transition-transform duration-500 group-hover:scale-105" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                  <Aperture className="size-10" aria-hidden="true" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background/90 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <Heart className="size-4 text-primary" aria-hidden="true" />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-accent" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                <Camera className="size-16" aria-hidden="true" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-primary">About</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Nine years of chasing the in-between moments
              </h2>
              <p className="mt-4 text-muted-foreground">
                Based in Lisbon, I travel wherever the story takes me. My approach is
                unhurried and documentary at heart — I'd rather catch the laugh between
                the poses than stage a perfect one.
              </p>
              <p className="mt-4 text-muted-foreground">
                Every gallery is hand-edited with a warm, filmic finish. No presets on
                autopilot, no rushing the process.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Natural light", "Film & digital", "Destination ready", "Hand-edited"].map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                Lisbon, Portugal · Available worldwide
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-primary">Packages</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Simple, honest pricing</h2>
            <p className="mt-2 text-muted-foreground">
              Pick a starting point — every shoot is tailored after a quick call.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <Card
                key={pkg.name}
                className={cn(
                  "flex flex-col",
                  pkg.featured && "border-primary shadow-sm ring-1 ring-primary"
                )}
              >
                <CardHeader>
                  {pkg.featured && (
                    <Badge className="mb-2 w-fit">Most booked</Badge>
                  )}
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.blurb}</CardDescription>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-semibold tracking-tight">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground">{pkg.unit}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={pkg.featured ? "default" : "outline"}
                    asChild
                  >
                    <a href="#contact">Choose {pkg.name.split(" ")[0]}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-primary">Contact</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Let's plan your shoot</h2>
              <p className="mt-3 max-w-sm text-muted-foreground">
                Tell me a little about your day or project and I'll reply within two
                business days with availability and a quote.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <a href="#contact" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  hello@maravance.studio
                </a>
                <a href="#contact" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  +351 912 000 000
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  Lisbon · open to travel
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send an inquiry</CardTitle>
                <CardDescription>No commitment — just a conversation.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jordan Reyes" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type of shoot</Label>
                    <Input id="type" placeholder="Wedding, portrait, editorial..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell me about it</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Dates, location, and what you have in mind."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {sent ? (
                      <>
                        <Check className="size-4" />
                        Inquiry sent
                      </>
                    ) : (
                      <>
                        <Send className="size-4" />
                        Send inquiry
                      </>
                    )}
                  </Button>
                  {sent && (
                    <p className="text-center text-sm text-muted-foreground">
                      Thanks! I'll be in touch within two business days.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Aperture className="size-4 text-primary" aria-hidden="true" />
            <span>© 2026 Mara Vance Photography</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Instagram" asChild>
              <a href="#top">
                <Instagram className="size-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter" asChild>
              <a href="#top">
                <Twitter className="size-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Email" asChild>
              <a href="#contact">
                <Mail className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
