"use client"

import * as React from "react"
import {
  Mountain,
  ShoppingCart,
  Search,
  Star,
  Tent,
  Backpack,
  Shirt,
  Footprints,
  Compass,
  Truck,
  ShieldCheck,
  Leaf,
  Flame,
  ArrowRight,
  MapPin,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Category = "All" | "Tents" | "Backpacks" | "Apparel" | "Footwear"

const CATEGORIES: { label: Category; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "All", icon: Compass },
  { label: "Tents", icon: Tent },
  { label: "Backpacks", icon: Backpack },
  { label: "Apparel", icon: Shirt },
  { label: "Footwear", icon: Footprints },
]

type Product = {
  id: number
  name: string
  category: Exclude<Category, "All">
  price: number
  rating: number
  reviews: number
  tag?: string
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Summit 2P Ultralight Tent", category: "Tents", price: 329, rating: 4.8, reviews: 214, tag: "Bestseller" },
  { id: 2, name: "Basecamp 4-Season Dome", category: "Tents", price: 489, rating: 4.6, reviews: 98 },
  { id: 3, name: "TrailHaul 65L Expedition Pack", category: "Backpacks", price: 219, rating: 4.9, reviews: 312, tag: "New" },
  { id: 4, name: "DayRunner 28L Hiking Pack", category: "Backpacks", price: 119, rating: 4.7, reviews: 187 },
  { id: 5, name: "Stormshield Down Jacket", category: "Apparel", price: 199, rating: 4.8, reviews: 256, tag: "Bestseller" },
  { id: 6, name: "Merino Base Layer Crew", category: "Apparel", price: 79, rating: 4.5, reviews: 143 },
  { id: 7, name: "Ridgeline GORE Trail Boots", category: "Footwear", price: 169, rating: 4.7, reviews: 401 },
  { id: 8, name: "Switchback Approach Shoes", category: "Footwear", price: 139, rating: 4.4, reviews: 88, tag: "New" },
  { id: 9, name: "Canyon 50L Travel Pack", category: "Backpacks", price: 159, rating: 4.6, reviews: 76 },
]

const GUIDES: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; read: string }[] = [
  { icon: Tent, title: "How to Pick Your First Tent", desc: "Capacity, seasons, and weight explained for every kind of trip.", read: "8 min read" },
  { icon: Backpack, title: "Pack Fit & Load Distribution", desc: "Dial in torso length and hip support to carry more, comfortably.", read: "6 min read" },
  { icon: Footprints, title: "Breaking In Trail Boots", desc: "A field-tested routine to avoid blisters on the long haul.", read: "5 min read" },
]

const PERKS = [
  { icon: Truck, label: "Free shipping over $99" },
  { icon: ShieldCheck, label: "Lifetime gear warranty" },
  { icon: Leaf, label: "Carbon-neutral delivery" },
]

function formatPrice(n: number) {
  return "$" + n.toFixed(0)
}

export default function OutdoorGearStore() {
  const [active, setActive] = React.useState<Category>("All")
  const [cartCount, setCartCount] = React.useState(0)
  const [added, setAdded] = React.useState<number | null>(null)

  const visible =
    active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)

  function addToCart(id: number) {
    setCartCount((c) => c + 1)
    setAdded(id)
    window.setTimeout(() => setAdded((cur) => (cur === id ? null : cur)), 900)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-xs font-medium">
          <Flame className="h-3.5 w-3.5" />
          Spring Trail Sale — up to 30% off select packs & tents
        </div>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Mountain className="h-5 w-5" />
            </span>
            <span className="text-lg">Northridge</span>
          </a>

          <div className="ml-4 hidden items-center gap-5 text-sm font-medium md:flex">
            <a href="#shop" className="text-muted-foreground transition-colors hover:text-foreground">Shop</a>
            <a href="#guides" className="text-muted-foreground transition-colors hover:text-foreground">Gear Guides</a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">Trips</a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">About</a>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search gear..." className="h-9 w-40 pl-8 lg:w-56" />
            </div>
            <Button variant="ghost" size="icon" className="relative" aria-label={"Cart with " + cartCount + " items"}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold tabular-nums text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1">
                <Compass className="h-3.5 w-3.5" /> Built for the backcountry
              </Badge>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Gear that goes
                <span className="text-primary"> wherever you do.</span>
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Field-tested tents, packs, and layers for the next ridge, river, and
                summit. Pack light. Go far.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#shop">Shop the gear <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#guides">Read gear guides</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {PERKS.map((perk) => (
                  <div key={perk.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <perk.icon className="h-4 w-4 text-primary" />
                    {perk.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="aspect-square rounded-3xl border bg-card p-8 shadow-sm">
                <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-primary/10 to-accent p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="h-4 w-4 text-primary" /> Trailhead Pick
                    </div>
                    <Badge>Bestseller</Badge>
                  </div>
                  <div className="flex h-40 items-center justify-center">
                    <Tent className="h-28 w-28 text-primary" strokeWidth={1.25} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Summit 2P Ultralight</p>
                    <div className="mt-1 flex items-end justify-between">
                      <span className="text-2xl font-bold">$329</span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-primary text-primary" /> 4.8
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop / product grid */}
        <section id="shop" className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Shop the collection</h2>
              <p className="mt-1 text-muted-foreground">
                {visible.length} {visible.length === 1 ? "item" : "items"} ready for your next adventure.
              </p>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.label
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setActive(cat.label)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <Card key={p.id} className="group overflow-hidden pt-0">
                <div className="relative flex h-44 items-center justify-center bg-muted/50">
                  {p.category === "Tents" && <Tent className="h-20 w-20 text-muted-foreground transition-transform group-hover:scale-105" strokeWidth={1.25} />}
                  {p.category === "Backpacks" && <Backpack className="h-20 w-20 text-muted-foreground transition-transform group-hover:scale-105" strokeWidth={1.25} />}
                  {p.category === "Apparel" && <Shirt className="h-20 w-20 text-muted-foreground transition-transform group-hover:scale-105" strokeWidth={1.25} />}
                  {p.category === "Footwear" && <Footprints className="h-20 w-20 text-muted-foreground transition-transform group-hover:scale-105" strokeWidth={1.25} />}
                  {p.tag && (
                    <Badge
                      variant={p.tag === "New" ? "secondary" : "default"}
                      className="absolute left-3 top-3"
                    >
                      {p.tag}
                    </Badge>
                  )}
                </div>
                <CardContent className="px-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-semibold leading-snug">{p.name}</h3>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-foreground">{p.rating.toFixed(1)}</span>
                    <span>({p.reviews})</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between px-5">
                  <span className="text-lg font-bold tabular-nums">{formatPrice(p.price)}</span>
                  <Button
                    size="sm"
                    variant={added === p.id ? "secondary" : "default"}
                    onClick={() => addToCart(p.id)}
                    aria-label={"Add " + p.name + " to cart"}
                  >
                    {added === p.id ? (
                      "Added!"
                    ) : (
                      <>
                        <Plus className="h-4 w-4" /> Add
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">
              No gear in this category yet — check back soon.
            </p>
          )}
        </section>

        {/* Gear guide section */}
        <section id="guides" className="border-y bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3 gap-1">
                <Compass className="h-3.5 w-3.5" /> Field Notes
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight">Gear guides from people who use it</h2>
              <p className="mt-2 text-muted-foreground">
                Our staff logs thousands of trail miles a year. Here is what they have learned about choosing and caring for your kit.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {GUIDES.map((g) => (
                <Card key={g.title} className="transition-shadow hover:shadow-md">
                  <CardContent className="px-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <g.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 font-semibold">{g.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{g.desc}</p>
                  </CardContent>
                  <CardFooter className="px-6">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Read guide <ArrowRight className="h-4 w-4" />
                    </a>
                    <span className="ml-auto text-xs text-muted-foreground">{g.read}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-10 text-center md:flex-row md:text-left">
              <div className="flex-1">
                <h2 className="text-2xl font-bold tracking-tight">Join the trail crew</h2>
                <p className="mt-2 text-muted-foreground">
                  Get restock alerts, route ideas, and members-only gear drops. No spam, just dirt-road wisdom.
                </p>
              </div>
              <form
                className="flex w-full max-w-md gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input type="email" placeholder="you@email.com" aria-label="Email address" className="h-11" />
                <Button size="lg" type="submit">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2 font-bold">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Mountain className="h-4 w-4" />
                </span>
                Northridge
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Outdoor gear built to outlast the trip. Family-run since 1998.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Shop</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#shop" className="hover:text-foreground">Tents</a></li>
                <li><a href="#shop" className="hover:text-foreground">Backpacks</a></li>
                <li><a href="#shop" className="hover:text-foreground">Apparel</a></li>
                <li><a href="#shop" className="hover:text-foreground">Footwear</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Shipping & returns</a></li>
                <li><a href="#" className="hover:text-foreground">Warranty</a></li>
                <li><a href="#" className="hover:text-foreground">Gear repair</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Our story</a></li>
                <li><a href="#" className="hover:text-foreground">Sustainability</a></li>
                <li><a href="#" className="hover:text-foreground">Stores</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 1998–2026 Northridge Outfitters. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
