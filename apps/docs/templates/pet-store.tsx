"use client"

import * as React from "react"
import {
  PawPrint,
  ShoppingCart,
  Search,
  Heart,
  Truck,
  RefreshCw,
  ShieldCheck,
  Star,
  Menu,
  Bone,
  Cat,
  Fish,
  Rabbit,
  Plus,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

type Category = "All" | "Dogs" | "Cats" | "Small pets" | "Fish"

type Product = {
  id: number
  name: string
  blurb: string
  price: number
  category: Exclude<Category, "All">
  rating: number
  tag?: string
  emoji: string
}

const CATEGORIES: { label: Category; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: "All", icon: PawPrint },
  { label: "Dogs", icon: Bone },
  { label: "Cats", icon: Cat },
  { label: "Small pets", icon: Rabbit },
  { label: "Fish", icon: Fish },
]

const PRODUCTS: Product[] = [
  { id: 1, name: "Grain-Free Salmon Kibble", blurb: "5kg bag, wild-caught salmon", price: 42, category: "Dogs", rating: 4.8, tag: "Bestseller", emoji: "🐟" },
  { id: 2, name: "Orthopedic Cloud Bed", blurb: "Memory foam, washable cover", price: 68, category: "Dogs", rating: 4.9, emoji: "🛏️" },
  { id: 3, name: "Tug & Toss Rope Pack", blurb: "Set of 3 cotton chew ropes", price: 16, category: "Dogs", rating: 4.6, emoji: "🪢" },
  { id: 4, name: "Whisker Lounge Tower", blurb: "5-tier sisal scratching post", price: 89, category: "Cats", rating: 4.7, tag: "New", emoji: "🐱" },
  { id: 5, name: "Tuna Pâté Variety Box", blurb: "24 grain-free cat pouches", price: 28, category: "Cats", rating: 4.8, emoji: "🍱" },
  { id: 6, name: "Crinkle Mouse Toys", blurb: "Catnip-filled, pack of 6", price: 12, category: "Cats", rating: 4.5, emoji: "🐭" },
  { id: 7, name: "Timothy Hay Bundle", blurb: "2kg premium first-cut hay", price: 19, category: "Small pets", rating: 4.7, emoji: "🌾" },
  { id: 8, name: "Burrow & Hide Hut", blurb: "Cozy fleece tunnel home", price: 24, category: "Small pets", rating: 4.6, tag: "Cozy", emoji: "🏠" },
  { id: 9, name: "Nano Reef Pellets", blurb: "Color-enhancing fish food", price: 14, category: "Fish", rating: 4.4, emoji: "🐠" },
  { id: 10, name: "Crystal Gravel Mix", blurb: "5lb natural aquarium substrate", price: 22, category: "Fish", rating: 4.5, emoji: "💎" },
  { id: 11, name: "Dental Chew Sticks", blurb: "Plaque-fighting daily treats", price: 18, category: "Dogs", rating: 4.7, emoji: "🦴" },
  { id: 12, name: "Self-Cleaning Litter Mat", blurb: "Traps stray litter, easy rinse", price: 31, category: "Cats", rating: 4.6, emoji: "🧼" },
]

const PERKS = [
  { icon: Truck, title: "Free 2-day shipping", desc: "On orders over $35, every paw welcome." },
  { icon: RefreshCw, title: "Easy 30-day returns", desc: "Picky eater? Send it back, no fuss." },
  { icon: ShieldCheck, title: "Vet-approved picks", desc: "Curated by real veterinary nutritionists." },
]

export default function PetStorePage() {
  const [active, setActive] = React.useState<Category>("All")
  const [cartCount, setCartCount] = React.useState(2)
  const [favorites, setFavorites] = React.useState<number[]>([2])

  const visible =
    active === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active)

  const addToCart = () => setCartCount((c) => c + 1)

  const toggleFav = (id: number) =>
    setFavorites((f) =>
      f.includes(id) ? f.filter((x) => x !== id) : [...f, id]
    )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PawPrint className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Pawthentic</span>
          </a>
          <nav className="ml-4 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#shop" className="transition-colors hover:text-foreground">Shop</a>
            <a href="#autoship" className="transition-colors hover:text-foreground">Auto-Ship</a>
            <a href="#" className="transition-colors hover:text-foreground">Brands</a>
            <a href="#" className="transition-colors hover:text-foreground">Vets</a>
          </nav>
          <div className="ml-auto hidden items-center md:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search treats, beds, toys..."
                className="w-56 pl-9"
                aria-label="Search products"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" aria-label="Saved items" className="relative">
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Button>
          <Button variant="outline" className="relative gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">
              {cartCount}
            </span>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1">
                <Bone className="h-3.5 w-3.5" /> Happy tails since 2014
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Everything your{" "}
                <span className="text-primary">best friend</span> deserves.
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Vet-curated food, toys, and cozy gear for dogs, cats, and every
                little critter in between. Delivered to your door with a wag.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#shop" className="gap-2">
                    Shop the store <PawPrint className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#autoship">Start Auto-Ship</a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  4.8 / 5 from 12k pet parents
                </span>
                <Separator orientation="vertical" className="h-4" />
                <span>200+ trusted brands</span>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {["🐶", "🐱", "🐰", "🐠"].map((e, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-3xl border bg-card text-6xl shadow-sm",
                      i % 2 === 0 ? "translate-y-3" : "-translate-y-3"
                    )}
                  >
                    {e}
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border bg-background px-5 py-2 text-sm font-medium shadow-sm">
                Free shipping over $35 🚚
              </div>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3">
            {PERKS.map((perk) => (
              <div key={perk.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <perk.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-medium">{perk.title}</p>
                  <p className="text-sm text-muted-foreground">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shop */}
        <section id="shop" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Shop by pet</h2>
              <p className="mt-1 text-muted-foreground">
                {visible.length} {visible.length === 1 ? "product" : "products"}
                {active !== "All" ? ` for ${active.toLowerCase()}` : " across the store"}
              </p>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const selected = active === cat.label
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setActive(cat.label)}
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    selected
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

          {/* Product grid */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => {
              const faved = favorites.includes(product.id)
              return (
                <Card
                  key={product.id}
                  className="group overflow-hidden transition-shadow hover:shadow-md"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/40 text-6xl">
                    {product.emoji}
                    {product.tag && (
                      <Badge className="absolute left-3 top-3">{product.tag}</Badge>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label={faved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
                      onClick={() => toggleFav(product.id)}
                      className="absolute right-3 top-3 h-8 w-8"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          faved && "fill-primary text-primary"
                        )}
                      />
                    </Button>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      {product.rating.toFixed(1)}
                      <span className="mx-1">·</span>
                      {product.category}
                    </div>
                    <h3 className="mt-1.5 font-semibold leading-tight">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {product.blurb}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button size="sm" className="gap-1.5" onClick={addToCart}>
                      <Plus className="h-4 w-4" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Auto-ship banner */}
        <section id="autoship" className="border-y bg-primary/10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <Badge variant="outline" className="mb-3 gap-1 border-primary text-primary">
                <RefreshCw className="h-3.5 w-3.5" /> Auto-Ship & Save
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Never run out of kibble again.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Set your schedule and save 10% on every recurring order. Skip,
                swap, or pause anytime — your pet's pantry runs on autopilot.
              </p>
              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {[
                  "Save 10% on every delivery",
                  "Flexible 2–8 week cadence",
                  "Free shipping, always",
                  "Edit or cancel in one tap",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-7 gap-2">
                Set up Auto-Ship <Truck className="h-4 w-4" />
              </Button>
            </div>
            <Card className="bg-card">
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your plan</span>
                  <Badge variant="secondary">Every 4 weeks</Badge>
                </div>
                <Separator />
                {[
                  { name: "Grain-Free Salmon Kibble", price: 42 },
                  { name: "Dental Chew Sticks", price: 18 },
                ].map((line) => (
                  <div key={line.name} className="flex items-center justify-between text-sm">
                    <span>{line.name}</span>
                    <span className="font-medium">${line.price}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Auto-Ship total
                  </span>
                  <span className="text-lg font-bold">
                    $54<span className="ml-1 text-sm font-normal text-muted-foreground line-through">$60</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Treats for your inbox
            </h2>
            <p className="max-w-md text-muted-foreground">
              Join 40,000 pet parents for care tips, new arrivals, and the
              occasional very good boy.
            </p>
            <form
              className="mt-2 flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <PawPrint className="h-4 w-4" />
              </span>
              Pawthentic
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              Thoughtfully sourced supplies for the pets who run our lives.
            </p>
          </div>
          {[
            { title: "Shop", links: ["Dogs", "Cats", "Small pets", "Fish"] },
            { title: "Company", links: ["About", "Our vets", "Careers", "Blog"] },
            { title: "Support", links: ["Contact", "Shipping", "Returns", "FAQ"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
            <span>© 2014–2024 Pawthentic Pet Supply. All rights reserved.</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3.5 w-3.5 fill-primary text-primary" /> for pets
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
