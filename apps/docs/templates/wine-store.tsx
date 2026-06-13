"use client"

import * as React from "react"
import { Wine, Heart, ShoppingCart, Search, Menu, Grape, Award, Truck, ShieldCheck, Star, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type WineType = "Red" | "White" | "Rosé" | "Sparkling"

type Bottle = {
  id: string
  name: string
  type: WineType
  region: string
  vintage: string
  price: number
  rating: number
}

const FILTERS: Array<"All" | WineType> = ["All", "Red", "White", "Rosé", "Sparkling"]

const BOTTLES: Bottle[] = [
  { id: "b1", name: "Château Lumière", type: "Red", region: "Bordeaux, France", vintage: "2018", price: 64, rating: 4.8 },
  { id: "b2", name: "Coastal Sauvignon", type: "White", region: "Marlborough, NZ", vintage: "2022", price: 28, rating: 4.5 },
  { id: "b3", name: "Provence Blush", type: "Rosé", region: "Provence, France", vintage: "2022", price: 32, rating: 4.6 },
  { id: "b4", name: "Maison Étoile Brut", type: "Sparkling", region: "Champagne, France", vintage: "NV", price: 89, rating: 4.9 },
  { id: "b5", name: "Tuscan Reserve", type: "Red", region: "Tuscany, Italy", vintage: "2019", price: 52, rating: 4.7 },
  { id: "b6", name: "Golden Chardonnay", type: "White", region: "Napa Valley, USA", vintage: "2021", price: 44, rating: 4.4 },
  { id: "b7", name: "Garnet Rosé", type: "Rosé", region: "Rioja, Spain", vintage: "2023", price: 24, rating: 4.3 },
  { id: "b8", name: "Prosecco Superiore", type: "Sparkling", region: "Veneto, Italy", vintage: "NV", price: 36, rating: 4.5 },
  { id: "b9", name: "Old Vine Zinfandel", type: "Red", region: "Sonoma, USA", vintage: "2020", price: 41, rating: 4.6 },
]

const SOMMELIER_PICKS = [
  { id: "b4", note: "A celebratory benchmark — fine bubbles, brioche, and a whisper of citrus." },
  { id: "b1", note: "Cellar-worthy depth with blackcurrant, cedar, and silken tannins." },
  { id: "b3", note: "Crisp, dry, and endlessly food-friendly. Our patio favorite." },
]

const PERKS = [
  { icon: Truck, title: "Free Shipping", desc: "On any case of six or more bottles." },
  { icon: ShieldCheck, title: "Cellar Guarantee", desc: "Every bottle stored at perfect temperature." },
  { icon: Award, title: "Hand Selected", desc: "Curated by our in-house sommeliers." },
]

function typeAccent(type: WineType) {
  return "bg-primary/10 text-primary"
}

export default function WineStorePage() {
  const [active, setActive] = React.useState<"All" | WineType>("All")
  const [wishlist, setWishlist] = React.useState<Record<string, boolean>>({ b1: true })
  const [cartCount, setCartCount] = React.useState(2)

  const visible = active === "All" ? BOTTLES : BOTTLES.filter((b) => b.type === active)
  const wishCount = Object.values(wishlist).filter(Boolean).length

  const toggleWish = (id: string) =>
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))

  const byId = (id: string) => BOTTLES.find((b) => b.id === id)!

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <Wine className="h-6 w-6 text-primary" />
            <span className="text-lg">Cellar & Vine</span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#shop" className="transition-colors hover:text-foreground">Shop</a>
            <a href="#picks" className="transition-colors hover:text-foreground">Sommelier Picks</a>
            <a href="#regions" className="transition-colors hover:text-foreground">Regions</a>
            <a href="#about" className="transition-colors hover:text-foreground">Our Story</a>
          </nav>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist">
              <Heart className={cn("h-5 w-5", wishCount > 0 && "fill-primary text-primary")} />
              {wishCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {wishCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Grape className="h-3.5 w-3.5" /> New harvest arrivals
              </Badge>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Wines worth
                <span className="text-primary"> uncorking</span>.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                A curated cellar of estate-grown bottles, delivered to your door.
                Hand-picked by sommeliers, priced for the everyday table.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#shop">Browse the cellar</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#picks">Sommelier picks</a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-primary text-primary" /> 4.8 avg rating
                </span>
                <Separator orientation="vertical" className="h-5" />
                <span>500+ labels in stock</span>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto flex aspect-[4/5] max-w-sm items-end justify-center gap-3 rounded-2xl border bg-card p-8 shadow-sm">
                {[140, 200, 170].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div
                      className="w-12 rounded-t-full rounded-b-md bg-primary/80"
                      style={{ height: h }}
                      aria-hidden="true"
                    />
                    <div className="h-2 w-12 rounded-full bg-muted" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 left-4 rounded-xl border bg-background px-4 py-3 shadow-sm">
                <p className="text-xs text-muted-foreground">From the estate</p>
                <p className="text-sm font-semibold">Bordeaux 2018</p>
              </div>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="border-b bg-background">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
            {PERKS.map((p) => (
              <div key={p.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shop grid with filters */}
        <section id="shop" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The cellar</h2>
              <p className="mt-1 text-muted-foreground">
                {visible.length} {visible.length === 1 ? "bottle" : "bottles"}
                {active !== "All" && <> in {active}</>}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((b) => (
              <Card key={b.id} className="group overflow-hidden pt-0 transition-shadow hover:shadow-md">
                <div className="relative flex h-44 items-end justify-center bg-muted/40 pt-6">
                  <div
                    className="h-32 w-9 rounded-t-full rounded-b bg-primary/70 transition-transform group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={wishlist[b.id] ? "Remove from wishlist" : "Add to wishlist"}
                    onClick={() => toggleWish(b.id)}
                    className="absolute right-2 top-2 h-9 w-9 rounded-full bg-background/80 backdrop-blur hover:bg-background"
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        wishlist[b.id] ? "fill-primary text-primary" : "text-muted-foreground"
                      )}
                    />
                  </Button>
                  <Badge className={cn("absolute left-2 top-2", typeAccent(b.type))} variant="secondary">
                    {b.type}
                  </Badge>
                </div>
                <CardContent className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-medium leading-tight">{b.name}</h3>
                    <span className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      {b.rating}
                    </span>
                  </div>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {b.region}
                  </p>
                  <p className="text-xs text-muted-foreground">Vintage {b.vintage}</p>
                </CardContent>
                <CardFooter className="items-center justify-between">
                  <span className="text-lg font-semibold">${b.price}</span>
                  <Button size="sm" onClick={() => setCartCount((c) => c + 1)}>
                    <ShoppingCart className="h-4 w-4" /> Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Sommelier picks */}
        <section id="picks" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Sommelier picks</h2>
                <p className="text-muted-foreground">This month&apos;s standout pours, chosen by our team.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {SOMMELIER_PICKS.map(({ id, note }, i) => {
                const b = byId(id)
                return (
                  <Card key={id} className="bg-background">
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Pick #{i + 1}</Badge>
                        <Badge className={typeAccent(b.type)} variant="secondary">{b.type}</Badge>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{b.name}</h3>
                        <p className="text-sm text-muted-foreground">{b.region} · {b.vintage}</p>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{note}&rdquo;</p>
                    </CardContent>
                    <CardFooter className="items-center justify-between border-t">
                      <span className="font-semibold">${b.price}</span>
                      <Button size="sm" variant="outline" onClick={() => setCartCount((c) => c + 1)}>
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Regions strip */}
        <section id="regions" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Shop by region</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Bordeaux", "Tuscany", "Napa Valley", "Champagne"].map((r) => (
              <a
                key={r}
                href="#shop"
                className="group flex flex-col items-center justify-center rounded-xl border bg-card px-4 py-8 text-center transition-colors hover:border-primary"
              >
                <Grape className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                <span className="mt-3 font-medium">{r}</span>
                <span className="text-xs text-muted-foreground">Explore region</span>
              </a>
            ))}
          </div>
        </section>

        {/* Newsletter / about */}
        <section id="about" className="border-t bg-primary/5">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Join the tasting club
            </h2>
            <p className="max-w-md text-muted-foreground">
              Get early access to limited releases and a monthly note from our sommeliers.
            </p>
            <form
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-ring"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground">Must be 21+ to purchase. Please drink responsibly.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <a href="#" className="flex items-center gap-2 font-semibold">
              <Wine className="h-5 w-5 text-primary" /> Cellar & Vine
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              Estate-grown wines and fine spirits, delivered with care.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#shop" className="hover:text-foreground">All wines</a></li>
              <li><a href="#picks" className="hover:text-foreground">Sommelier picks</a></li>
              <li><a href="#regions" className="hover:text-foreground">Regions</a></li>
              <li><a href="#shop" className="hover:text-foreground">Gift cards</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Company</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">Our story</a></li>
              <li><a href="#about" className="hover:text-foreground">Tasting club</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium">Support</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Shipping</a></li>
              <li><a href="#" className="hover:text-foreground">Returns</a></li>
              <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            </ul>
          </div>
        </div>
        <Separator />
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2024 Cellar & Vine. All rights reserved.</p>
          <p>Drink responsibly. 21+ only.</p>
        </div>
      </footer>
    </div>
  )
}
