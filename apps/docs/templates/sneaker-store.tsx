"use client"

import * as React from "react"
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Flame,
  ArrowRight,
  Instagram,
  Twitter,
  Youtube,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Product = {
  id: number
  name: string
  brand: string
  price: number
  category: string
  sizes: number[]
  colors: string[]
  tag?: string
  rating: number
}

const CATEGORIES = ["All", "Running", "Basketball", "Lifestyle", "Skate", "Trail"] as const
const SIZES = [7, 8, 9, 10, 11, 12, 13]
const COLORS = ["Black", "White", "Red", "Blue", "Green", "Grey"]

const PRODUCTS: Product[] = [
  { id: 1, name: "Velocity Pro 3", brand: "Aerus", price: 145, category: "Running", sizes: [8, 9, 10, 11], colors: ["Black", "Red"], tag: "New", rating: 4.8 },
  { id: 2, name: "Court King Mid", brand: "Hexa", price: 175, category: "Basketball", sizes: [9, 10, 11, 12, 13], colors: ["White", "Blue"], tag: "Hot", rating: 4.9 },
  { id: 3, name: "Drift Low Canvas", brand: "Curbside", price: 89, category: "Skate", sizes: [7, 8, 9, 10], colors: ["Black", "White"], rating: 4.6 },
  { id: 4, name: "Cloudstep Lite", brand: "Aerus", price: 120, category: "Lifestyle", sizes: [8, 9, 10, 11, 12], colors: ["Grey", "Green"], tag: "New", rating: 4.7 },
  { id: 5, name: "Ridgeline GTX", brand: "Summit", price: 165, category: "Trail", sizes: [9, 10, 11, 12], colors: ["Green", "Black"], rating: 4.5 },
  { id: 6, name: "Tempo Racer 2", brand: "Aerus", price: 135, category: "Running", sizes: [7, 8, 9, 10], colors: ["Blue", "White"], rating: 4.4 },
  { id: 7, name: "Slam Dunk Hi", brand: "Hexa", price: 190, category: "Basketball", sizes: [10, 11, 12, 13], colors: ["Red", "Black"], tag: "Hot", rating: 4.8 },
  { id: 8, name: "Boardwalk Suede", brand: "Curbside", price: 99, category: "Skate", sizes: [8, 9, 10, 11], colors: ["Grey", "Blue"], rating: 4.3 },
  { id: 9, name: "Metro Knit", brand: "Hexa", price: 110, category: "Lifestyle", sizes: [7, 8, 9, 10, 11], colors: ["White", "Black"], tag: "New", rating: 4.6 },
]

const NEW_ARRIVALS = [
  { id: 1, name: "Velocity Pro 3", brand: "Aerus", price: 145, swatch: "bg-foreground" },
  { id: 4, name: "Cloudstep Lite", brand: "Aerus", price: 120, swatch: "bg-muted-foreground" },
  { id: 9, name: "Metro Knit", brand: "Hexa", price: 110, swatch: "bg-primary" },
  { id: 2, name: "Court King Mid", brand: "Hexa", price: 175, swatch: "bg-foreground" },
]

const PROMOS = [
  { icon: Truck, title: "Free shipping", desc: "On orders over $120" },
  { icon: RotateCcw, title: "60-day returns", desc: "No questions asked" },
  { icon: ShieldCheck, title: "100% authentic", desc: "Verified by SoleCheck" },
]

function priceFmt(n: number) {
  return "$" + n.toFixed(0)
}

function SneakerThumb({ accent }: { accent: string }) {
  return (
    <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-muted">
      <div className="relative h-24 w-44 sm:h-28 sm:w-52">
        <div className={cn("absolute bottom-2 left-2 h-10 w-40 rounded-full", accent)} />
        <div className="absolute bottom-7 left-6 h-12 w-28 rounded-t-[2.5rem] bg-foreground/80" />
        <div className="absolute bottom-9 left-12 h-7 w-14 rounded-tr-3xl bg-background/70" />
        <div className="absolute bottom-1 left-2 h-3 w-44 rounded-full bg-background shadow-sm" />
      </div>
    </div>
  )
}

export default function SneakerStore() {
  const [category, setCategory] = React.useState<string>("All")
  const [activeSizes, setActiveSizes] = React.useState<number[]>([])
  const [activeColors, setActiveColors] = React.useState<string[]>([])
  const [cartCount, setCartCount] = React.useState<number>(2)
  const [wishlist, setWishlist] = React.useState<number[]>([])

  const toggleSize = (s: number) =>
    setActiveSizes((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))
  const toggleColor = (c: string) =>
    setActiveColors((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]))
  const toggleWish = (id: number) =>
    setWishlist((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const clearFilters = () => {
    setActiveSizes([])
    setActiveColors([])
    setCategory("All")
  }

  const filtered = PRODUCTS.filter((p) => {
    if (category !== "All" && p.category !== category) return false
    if (activeSizes.length && !activeSizes.some((s) => p.sizes.includes(s))) return false
    if (activeColors.length && !activeColors.some((c) => p.colors.includes(c))) return false
    return true
  })

  const filterCount = activeSizes.length + activeColors.length + (category !== "All" ? 1 : 0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="#" className="flex items-center gap-2 font-black tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Flame className="h-4 w-4" />
            </span>
            <span className="text-lg">SOLEHAUS</span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm font-medium lg:flex">
            <a href="#shop" className="text-muted-foreground transition-colors hover:text-foreground">Men</a>
            <a href="#shop" className="text-muted-foreground transition-colors hover:text-foreground">Women</a>
            <a href="#new" className="text-muted-foreground transition-colors hover:text-foreground">New Drops</a>
            <a href="#shop" className="font-semibold text-foreground">Sale</a>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search kicks..."
                className="h-9 w-48 rounded-full border bg-muted/40 pl-9 pr-4 text-sm outline-none transition-all focus:w-56 focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
              )}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                <Flame className="h-3.5 w-3.5" /> Drop 04 — Live Now
              </Badge>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Step into the
                <span className="block text-primary">Velocity era.</span>
              </h1>
              <p className="max-w-md text-base text-muted-foreground sm:text-lg">
                Limited-run silhouettes engineered for the street and the track. Cop the freshest sneakers before they sell out.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2" asChild={false}>
                  <a href="#shop" className="flex items-center gap-2">Shop the drop <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" asChild={false}>
                  <a href="#new">View new arrivals</a>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-primary text-primary" /> 4.9 / 5 from 12k reviews</span>
                <span className="hidden sm:inline">Worn by 200k+ runners</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative rounded-3xl border bg-card p-8 shadow-sm">
                <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-muted">
                  <div className="relative h-40 w-72">
                    <div className="absolute bottom-4 left-4 h-16 w-64 rounded-full bg-primary" />
                    <div className="absolute bottom-12 left-10 h-20 w-44 rounded-t-[4rem] bg-foreground/85" />
                    <div className="absolute bottom-16 left-20 h-11 w-24 rounded-tr-[3rem] bg-background/70" />
                    <div className="absolute bottom-2 left-4 h-4 w-64 rounded-full bg-background shadow" />
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Featured</p>
                    <p className="text-lg font-bold">Velocity Pro 3</p>
                  </div>
                  <p className="text-2xl font-black">$145</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6">
            {PROMOS.map((p) => (
              <div key={p.title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="shop" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Shop all sneakers</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "style" : "styles"} available
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    category === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider">Filters</h3>
                {filterCount > 0 && (
                  <button onClick={clearFilters} className="text-xs font-medium text-primary hover:underline">
                    Clear ({filterCount})
                  </button>
                )}
              </div>
              <div>
                <p className="mb-3 text-sm font-semibold">Size (US)</p>
                <div className="grid grid-cols-4 gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      aria-pressed={activeSizes.includes(s)}
                      className={cn(
                        "flex h-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                        activeSizes.includes(s)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <p className="mb-3 text-sm font-semibold">Color</p>
                <div className="space-y-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleColor(c)}
                      aria-pressed={activeColors.includes(c)}
                      className="flex w-full items-center gap-2.5 text-sm"
                    >
                      <span
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                          activeColors.includes(c) ? "border-primary ring-2 ring-ring" : "border-border"
                        )}
                      >
                        {activeColors.includes(c) && <Check className="h-3 w-3 text-primary" />}
                      </span>
                      <span className={cn(activeColors.includes(c) ? "font-semibold" : "text-muted-foreground")}>
                        {c}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div>
              {filtered.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed text-center">
                  <p className="font-semibold">No sneakers match your filters</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try removing a size or color.</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                    Reset filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p, i) => (
                    <article
                      key={p.id}
                      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                    >
                      <div className="relative p-4">
                        {p.tag && (
                          <Badge
                            variant={p.tag === "Hot" ? "destructive" : "default"}
                            className="absolute left-4 top-4 z-10 text-[11px] font-bold uppercase"
                          >
                            {p.tag}
                          </Badge>
                        )}
                        <button
                          onClick={() => toggleWish(p.id)}
                          aria-label={wishlist.includes(p.id) ? "Remove from wishlist" : "Add to wishlist"}
                          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-accent"
                        >
                          <Heart
                            className={cn(
                              "h-4 w-4",
                              wishlist.includes(p.id) ? "fill-primary text-primary" : "text-muted-foreground"
                            )}
                          />
                        </button>
                        <SneakerThumb accent={i % 2 === 0 ? "bg-primary" : "bg-muted-foreground"} />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.brand}</p>
                            <h3 className="font-bold leading-tight">{p.name}</h3>
                          </div>
                          <span className="flex items-center gap-0.5 text-xs font-medium text-muted-foreground">
                            <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {p.rating}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {p.colors.map((c) => (
                            <Badge key={c} variant="outline" className="text-[10px] font-normal">
                              {c}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <p className="text-lg font-black">{priceFmt(p.price)}</p>
                          <Button size="sm" className="gap-1.5" onClick={() => setCartCount((c) => c + 1)}>
                            <ShoppingBag className="h-4 w-4" /> Add
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="new" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Just landed</p>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">New arrivals</h2>
              </div>
              <a href="#shop" className="hidden items-center gap-1 text-sm font-medium text-foreground hover:underline sm:flex">
                See all <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {NEW_ARRIVALS.map((p, i) => (
                <article key={p.id + "-" + i} className="rounded-xl border bg-card p-4 transition-shadow hover:shadow-md">
                  <SneakerThumb accent={p.swatch} />
                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{p.brand}</p>
                    <p className="font-bold leading-tight">{p.name}</p>
                    <p className="mt-1 font-black">{priceFmt(p.price)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border bg-card p-8 sm:p-12">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative grid items-center gap-6 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Get early access to drops.</h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  Join the SoleHaus list for 10% off your first pair and first dibs on limited releases.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="h-11 flex-1 rounded-full border bg-background px-5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="lg" type="submit" className="rounded-full">Notify me</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2 font-black tracking-tight">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Flame className="h-4 w-4" />
                </span>
                <span className="text-lg">SOLEHAUS</span>
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Authentic sneakers and streetwear, shipped fast worldwide.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="icon" aria-label="Instagram"><Instagram className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" aria-label="Twitter"><Twitter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" aria-label="YouTube"><Youtube className="h-4 w-4" /></Button>
              </div>
            </div>
            {[
              { h: "Shop", links: ["Men", "Women", "New Drops", "Sale"] },
              { h: "Support", links: ["Contact", "Shipping", "Returns", "Size guide"] },
              { h: "Company", links: ["About", "Careers", "Press", "Stores"] },
            ].map((col) => (
              <div key={col.h}>
                <p className="text-sm font-bold uppercase tracking-wider">{col.h}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition-colors hover:text-foreground">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; 2026 SoleHaus. All rights reserved.</p>
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
