"use client"

import * as React from "react"
import {
  ShoppingCart,
  Sparkles,
  Search,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Gift,
  Menu,
  Blocks,
  Rocket,
  PartyPopper,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Category = "All" | "Toddler" | "Kids" | "Teens" | "Games"

type Product = {
  id: number
  name: string
  blurb: string
  price: number
  rating: number
  reviews: number
  category: Exclude<Category, "All">
  badge?: string
  emoji: string
}

const CATEGORIES: Category[] = ["All", "Toddler", "Kids", "Teens", "Games"]

const PRODUCTS: Product[] = [
  { id: 1, name: "Rainbow Stacker", blurb: "Soft wooden rings for tiny hands", price: 18, rating: 4.9, reviews: 214, category: "Toddler", badge: "Bestseller", emoji: "🌈" },
  { id: 2, name: "Cuddle Bear Plush", blurb: "Huggable, washable, oh-so-soft", price: 24, rating: 4.8, reviews: 488, category: "Toddler", emoji: "🧸" },
  { id: 3, name: "Mega Brick Box", blurb: "500 colorful building bricks", price: 39, rating: 4.7, reviews: 1023, category: "Kids", badge: "Top rated", emoji: "🧱" },
  { id: 4, name: "Rocket Lab Kit", blurb: "Launch your own foam rockets", price: 32, rating: 4.6, reviews: 356, category: "Kids", emoji: "🚀" },
  { id: 5, name: "Galaxy Drone", blurb: "Beginner-friendly flying drone", price: 79, rating: 4.5, reviews: 142, category: "Teens", badge: "New", emoji: "🛸" },
  { id: 6, name: "Circuit Builder Pro", blurb: "Snap-together STEM electronics", price: 64, rating: 4.8, reviews: 209, category: "Teens", emoji: "⚡" },
  { id: 7, name: "Castle Quest Board", blurb: "Family strategy board game", price: 29, rating: 4.7, reviews: 671, category: "Games", badge: "Family pick", emoji: "🏰" },
  { id: 8, name: "Speedy Cards", blurb: "Fast-paced party card game", price: 14, rating: 4.6, reviews: 845, category: "Games", emoji: "🃏" },
  { id: 9, name: "Plush Puzzle Cube", blurb: "Squishy first puzzle for babies", price: 16, rating: 4.9, reviews: 132, category: "Toddler", emoji: "🟦" },
]

const GIFT_GUIDE = [
  { icon: PartyPopper, title: "Birthday Wow", copy: "Crowd-pleasing gifts that get the loudest cheers.", tag: "Ages 3-12" },
  { icon: Blocks, title: "Little Builders", copy: "Open-ended sets that spark hours of imagination.", tag: "Creative play" },
  { icon: Rocket, title: "Future Scientists", copy: "STEM kits that make learning feel like an adventure.", tag: "Ages 8+" },
]

function formatPrice(n: number) {
  return "$" + n.toFixed(2)
}

export default function ToyStorePage() {
  const [active, setActive] = React.useState<Category>("All")
  const [cartCount, setCartCount] = React.useState(2)
  const [added, setAdded] = React.useState<number | null>(null)

  const filtered = React.useMemo(
    () => (active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  )

  function addToCart(id: number) {
    setCartCount((c) => c + 1)
    setAdded(id)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Gift className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg">Wonderbox</span>
          </a>
          <nav className="ml-4 hidden items-center gap-1 text-sm font-medium md:flex">
            <a href="#shop" className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Shop</a>
            <a href="#gifts" className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Gift Guide</a>
            <a href="#" className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">New Arrivals</a>
            <a href="#" className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Sale</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input placeholder="Search toys..." className="w-44 rounded-full pl-9 lg:w-56" aria-label="Search toys" />
            </div>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="size-5" aria-hidden="true" />
            </Button>
            <Button variant="secondary" className="relative rounded-full" aria-label={`Cart with ${cartCount} items`}>
              <ShoppingCart className="size-5" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-primary/10">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1 rounded-full">
                <Sparkles className="size-3.5" aria-hidden="true" /> Free shipping over $35
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Big smiles, delivered to your door
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Hand-picked toys that spark giggles, curiosity, and a whole lot of play. From first steps to teen tech.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full" asChild={false}>
                  <span className="inline-flex items-center gap-2">
                    <a href="#shop" className="inline-flex items-center gap-2">Shop the toys <Rocket className="size-4" aria-hidden="true" /></a>
                  </span>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  <a href="#gifts">See gift guide</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Truck className="size-4 text-primary" aria-hidden="true" /> Next-day delivery</span>
                <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" aria-hidden="true" /> Safety tested</span>
                <span className="flex items-center gap-2"><Star className="size-4 text-primary" aria-hidden="true" /> 12k+ happy parents</span>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {["🧸", "🚀", "🧱", "🎨"].map((e, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-3xl border bg-card text-6xl shadow-sm",
                      i % 2 === 0 ? "translate-y-2" : "-translate-y-2",
                    )}
                  >
                    <span aria-hidden="true">{e}</span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-semibold shadow-sm">
                <PartyPopper className="size-4 text-primary" aria-hidden="true" /> 500+ playful picks
              </div>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Find the perfect toy</h2>
              <p className="mt-1 text-muted-foreground">Filter by age and play style.</p>
            </div>
            <p className="text-sm text-muted-foreground">{filtered.length} toys</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Card key={p.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative flex aspect-[4/3] items-center justify-center bg-muted/30 text-7xl">
                  <span aria-hidden="true">{p.emoji}</span>
                  {p.badge ? (
                    <Badge className="absolute left-3 top-3 rounded-full">{p.badge}</Badge>
                  ) : null}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-3 size-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Save ${p.name} to wishlist`}
                  >
                    <Heart className="size-4" aria-hidden="true" />
                  </Button>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold leading-tight">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0 rounded-full text-xs">{p.category}</Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm">
                    <Star className="size-4 fill-primary text-primary" aria-hidden="true" />
                    <span className="font-medium">{p.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({p.reviews})</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-3">
                  <span className="text-lg font-bold">{formatPrice(p.price)}</span>
                  <Button
                    size="sm"
                    variant={added === p.id ? "secondary" : "default"}
                    className="rounded-full"
                    onClick={() => addToCart(p.id)}
                  >
                    {added === p.id ? (
                      <span className="inline-flex items-center gap-1"><PartyPopper className="size-4" aria-hidden="true" /> Added</span>
                    ) : (
                      <span className="inline-flex items-center gap-1"><ShoppingCart className="size-4" aria-hidden="true" /> Add</span>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="gifts" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-3 gap-1 rounded-full">
                <Gift className="size-3.5" aria-hidden="true" /> Gift Guide
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">Not sure what to pick?</h2>
              <p className="mt-3 text-muted-foreground">
                Let us match the moment. Curated bundles for every occasion and every age.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {GIFT_GUIDE.map((g) => (
                <Card key={g.title} className="text-center transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center pt-8">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <g.icon className="size-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{g.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{g.copy}</p>
                    <Badge variant="outline" className="mt-4 rounded-full">{g.tag}</Badge>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button variant="ghost" className="rounded-full">Browse picks</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-14">
          <Card className="overflow-hidden border-primary/30 bg-primary/10">
            <CardContent className="flex flex-col items-center gap-6 py-10 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Join the Play Club</h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Get 10% off your first order plus playful tips, early access, and surprise drops.
                </p>
              </div>
              <form className="flex w-full max-w-sm flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <Input type="email" placeholder="you@email.com" aria-label="Email address" className="rounded-full bg-background" />
                <Button type="submit" className="rounded-full">Sign up</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2 font-bold">
                <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Gift className="size-4" aria-hidden="true" />
                </span>
                Wonderbox
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Joyful, safety-tested toys for every age and every adventure.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Shop</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#shop" className="hover:text-foreground">Toddler</a></li>
                <li><a href="#shop" className="hover:text-foreground">Kids</a></li>
                <li><a href="#shop" className="hover:text-foreground">Teens</a></li>
                <li><a href="#shop" className="hover:text-foreground">Games</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Help</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Shipping</a></li>
                <li><a href="#" className="hover:text-foreground">Returns</a></li>
                <li><a href="#" className="hover:text-foreground">Track order</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Safety promise</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Stores</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Wonderbox Toys. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
