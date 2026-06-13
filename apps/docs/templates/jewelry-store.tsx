"use client"

import * as React from "react"
import {
  Gem,
  ShoppingBag,
  Heart,
  Search,
  Menu,
  Star,
  Truck,
  ShieldCheck,
  Sparkles,
  Hammer,
  Award,
  ArrowRight,
  Quote,
  RefreshCw,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Rings", "Necklaces", "Earrings", "Bracelets", "Bespoke"]

const COLLECTIONS = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"] as const
type Collection = (typeof COLLECTIONS)[number]

type Product = {
  name: string
  detail: string
  price: string
  collection: Exclude<Collection, "All">
  metal: string
  tag?: string
  swatch: string
}

const PRODUCTS: Product[] = [
  {
    name: "Aurelia Solitaire",
    detail: "0.9ct brilliant-cut, six-prong",
    price: "$3,480",
    collection: "Rings",
    metal: "18k Yellow Gold",
    tag: "Signature",
    swatch: "from-primary/30 via-accent to-secondary",
  },
  {
    name: "Étoile Pendant",
    detail: "Pavé halo on a fine box chain",
    price: "$1,260",
    collection: "Necklaces",
    metal: "Platinum",
    tag: "New",
    swatch: "from-secondary via-accent to-muted",
  },
  {
    name: "Lumen Drop Earrings",
    detail: "Pear-cut sapphires, lever back",
    price: "$2,150",
    collection: "Earrings",
    metal: "18k White Gold",
    swatch: "from-accent via-secondary to-primary/20",
  },
  {
    name: "Vesper Tennis Bracelet",
    detail: "Five carats, channel-set line",
    price: "$5,900",
    collection: "Bracelets",
    metal: "Platinum",
    tag: "Signature",
    swatch: "from-primary/25 via-muted to-accent",
  },
  {
    name: "Soleil Stacking Band",
    detail: "Milgrain edge, comfort fit",
    price: "$680",
    collection: "Rings",
    metal: "14k Rose Gold",
    tag: "Bestseller",
    swatch: "from-accent via-primary/20 to-secondary",
  },
  {
    name: "Cascade Layered Chain",
    detail: "Three-strand, adjustable length",
    price: "$940",
    collection: "Necklaces",
    metal: "18k Yellow Gold",
    swatch: "from-muted via-accent to-secondary",
  },
  {
    name: "Halo Stud Earrings",
    detail: "0.5ct centers, micro-pavé",
    price: "$1,480",
    collection: "Earrings",
    metal: "Platinum",
    tag: "Bestseller",
    swatch: "from-secondary via-primary/20 to-accent",
  },
  {
    name: "Liane Cuff",
    detail: "Hand-engraved open bangle",
    price: "$1,120",
    collection: "Bracelets",
    metal: "18k Yellow Gold",
    swatch: "from-primary/30 via-secondary to-muted",
  },
]

const PERKS = [
  { icon: Truck, label: "Complimentary insured shipping" },
  { icon: RefreshCw, label: "30-day returns & resizing" },
  { icon: ShieldCheck, label: "Lifetime warranty" },
  { icon: Award, label: "Ethically sourced stones" },
]

const CRAFT = [
  {
    icon: Sparkles,
    title: "Hand-selected stones",
    body: "Each diamond and gem is chosen by our gemologists for cut, clarity, and fire.",
  },
  {
    icon: Hammer,
    title: "Made by master jewelers",
    body: "Every piece is set and finished by hand in our atelier over several weeks.",
  },
  {
    icon: Award,
    title: "Certified & conflict-free",
    body: "All center stones arrive with independent grading and full provenance.",
  },
]

const REVIEWS = [
  {
    name: "Eleanor V.",
    handle: "Verified client",
    body: "The Aurelia exceeded every expectation. The craftsmanship is simply breathtaking in person.",
    avatar: "https://i.pravatar.cc/96?img=44",
  },
  {
    name: "Marcus T.",
    handle: "Verified client",
    body: "Designed a bespoke band with their atelier. The whole experience felt genuinely personal.",
    avatar: "https://i.pravatar.cc/96?img=12",
  },
  {
    name: "Sophie L.",
    handle: "Verified client",
    body: "Heirloom quality without the markup. The packaging alone felt like a gift in itself.",
    avatar: "https://i.pravatar.cc/96?img=25",
  },
]

export default function JewelryStore() {
  const [active, setActive] = React.useState<Collection>("All")
  const [wishlist, setWishlist] = React.useState<string[]>(["Aurelia Solitaire"])

  const filtered = PRODUCTS.filter((p) => active === "All" || p.collection === active)

  const toggleWish = (name: string) =>
    setWishlist((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <Gem className="h-4 w-4" />
            </span>
            <span className="font-serif text-xl tracking-wide">Maison Lior</span>
          </a>
          <nav className="ml-8 hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                1
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="space-y-7">
              <Badge variant="outline" className="gap-1.5 rounded-full border-primary/40 px-3 py-1 text-primary">
                <Sparkles className="h-3.5 w-3.5" /> The Solstice Collection
              </Badge>
              <h1 className="font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Jewelry made
                <span className="block italic text-primary">to be remembered.</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Heirloom-quality fine jewelry, hand-crafted in our atelier with
                ethically sourced stones and certified provenance.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Shop the collection <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Book a private viewing
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span>4.9 from 3,200+ clients</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border bg-gradient-to-br from-primary/20 via-accent to-secondary">
                <div className="flex h-full flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-sm uppercase tracking-[0.25em] text-foreground/70">
                      Est. 1987
                    </span>
                    <Badge className="rounded-full">Signature</Badge>
                  </div>
                  <Card className="border-0 bg-background/85 backdrop-blur">
                    <CardContent className="flex items-center gap-4 p-5">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Gem className="h-5 w-5" />
                      </span>
                      <div className="flex-1">
                        <p className="font-serif text-base">Aurelia Solitaire</p>
                        <p className="text-xs text-muted-foreground">18k Yellow Gold · 0.9ct</p>
                      </div>
                      <p className="font-serif text-lg text-primary">$3,480</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perks bar */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-y sm:grid-cols-4 sm:divide-y-0">
            {PERKS.map((perk) => (
              <div
                key={perk.label}
                className="flex items-center justify-center gap-2.5 px-4 py-5 text-center text-sm text-muted-foreground"
              >
                <perk.icon className="h-5 w-5 shrink-0 text-primary" />
                <span>{perk.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product grid + filter chips */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                The Collection
              </p>
              <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">
                Browse by category
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLLECTIONS.map((c) => (
                <Button
                  key={c}
                  size="sm"
                  variant={active === c ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((p) => {
              const wished = wishlist.includes(p.name)
              return (
                <Card
                  key={p.name}
                  className="group overflow-hidden border transition-shadow hover:shadow-lg"
                >
                  <div className={cn("relative aspect-square overflow-hidden bg-gradient-to-br", p.swatch)}>
                    {p.tag && (
                      <Badge
                        className="absolute left-3 top-3 rounded-full"
                        variant={p.tag === "New" ? "secondary" : "default"}
                      >
                        {p.tag}
                      </Badge>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label={
                        wished
                          ? "Remove " + p.name + " from wishlist"
                          : "Add " + p.name + " to wishlist"
                      }
                      aria-pressed={wished}
                      onClick={() => toggleWish(p.name)}
                      className="absolute right-3 top-3 h-8 w-8 rounded-full"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4 transition-colors",
                          wished && "fill-primary text-primary"
                        )}
                      />
                    </Button>
                    <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-full bg-background/70 text-primary backdrop-blur">
                      <Gem className="h-5 w-5" />
                    </span>
                  </div>
                  <CardContent className="space-y-2 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-lg leading-tight">{p.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                      </div>
                    </div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {p.metal}
                    </p>
                    <Separator className="my-1" />
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-lg text-primary">{p.price}</p>
                      <Button size="sm" variant="ghost" className="gap-1.5">
                        Add <ShoppingBag className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              No pieces in this category yet.
            </p>
          )}
        </section>

        {/* Craftsmanship */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Our craft
              </p>
              <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">
                Made by hand, made to last
              </h2>
              <p className="max-w-md text-muted-foreground">
                For over three decades our jewelers have set every stone by hand. No
                shortcuts, no mass production — only pieces worth passing down.
              </p>
              <div className="space-y-5">
                {CRAFT.map((c) => (
                  <div key={c.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 via-accent to-secondary sm:mt-10" />
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-tr from-secondary via-accent to-muted" />
            </div>
          </div>
        </section>

        {/* Bespoke banner */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/15 via-accent to-secondary">
            <CardContent className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <Badge variant="outline" className="gap-1.5 rounded-full border-primary/40 text-primary">
                  <Hammer className="h-3.5 w-3.5" /> Bespoke atelier
                </Badge>
                <h2 className="font-serif text-3xl font-light tracking-tight sm:text-4xl">
                  Design something one of a kind
                </h2>
                <p className="max-w-md text-muted-foreground">
                  Work one-on-one with our master jewelers to create a piece that tells
                  your story — from first sketch to final polish.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="lg" className="gap-2">
                    Start a design <ArrowRight className="h-4 w-4" />
                  </Button>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" /> Or visit our salon
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["Sketch", "Cast", "Set"].map((step, i) => (
                  <div
                    key={step}
                    className="flex flex-col items-center gap-2 rounded-2xl border bg-background/70 p-5 text-center backdrop-blur"
                  >
                    <span className="font-serif text-2xl text-primary">0{i + 1}</span>
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Reviews */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">
                Loved by our clients
              </h2>
              <p className="text-muted-foreground">Worn for the moments that matter most.</p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {REVIEWS.map((rev) => (
                <Card key={rev.name} className="border bg-background">
                  <CardContent className="space-y-4 p-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="text-sm leading-relaxed text-foreground">"{rev.body}"</p>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={rev.avatar} alt="" />
                        <AvatarFallback>{rev.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{rev.name}</p>
                        <p className="text-xs text-muted-foreground">{rev.handle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <Gem className="h-5 w-5" />
            </span>
            <h2 className="font-serif text-3xl font-light tracking-tight sm:text-4xl">
              Join the Maison list
            </h2>
            <p className="text-muted-foreground">
              Be first to see new collections, private events, and members-only pieces.
            </p>
            <form
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <Input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                className="h-11"
              />
              <Button type="submit" size="lg" className="shrink-0 gap-2">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                  <Gem className="h-4 w-4" />
                </span>
                <span className="font-serif text-xl tracking-wide">Maison Lior</span>
              </a>
              <p className="max-w-xs text-sm text-muted-foreground">
                Heirloom-quality fine jewelry, hand-crafted in our atelier since 1987.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Shop</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {NAV.map((n) => (
                  <li key={n}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Service</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {["Shipping", "Returns & resizing", "Care guide", "Warranty"].map((n) => (
                  <li key={n}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Our promise</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" /> Ethically sourced
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Lifetime warranty
                </li>
                <li className="flex items-center gap-2">
                  <Hammer className="h-4 w-4 text-primary" /> Hand-made to order
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Maison Lior. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
