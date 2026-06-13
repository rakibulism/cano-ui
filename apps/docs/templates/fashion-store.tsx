"use client"

import * as React from "react"
import { ShoppingBag, Search, Menu, Heart, Plus, Star, ArrowRight, Truck, RefreshCw, ShieldCheck, Instagram, Twitter, Facebook } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Product = {
  id: string
  name: string
  category: string
  price: number
  compareAt?: number
  tag?: string
  swatches: string[]
}

const FILTERS = ["All", "New In", "Outerwear", "Knitwear", "Dresses"] as const
type Filter = (typeof FILTERS)[number]

const PRODUCTS: Product[] = [
  { id: "p1", name: "Wool Overcoat", category: "Outerwear", price: 289, compareAt: 340, tag: "New In", swatches: ["bg-foreground", "bg-muted-foreground", "bg-primary"] },
  { id: "p2", name: "Merino Crew Knit", category: "Knitwear", price: 124, tag: "New In", swatches: ["bg-foreground", "bg-primary"] },
  { id: "p3", name: "Silk Slip Dress", category: "Dresses", price: 168, swatches: ["bg-foreground", "bg-muted-foreground"] },
  { id: "p4", name: "Tailored Trench", category: "Outerwear", price: 245, swatches: ["bg-muted-foreground", "bg-foreground"] },
  { id: "p5", name: "Cashmere Cardigan", category: "Knitwear", price: 198, tag: "Low Stock", swatches: ["bg-primary", "bg-foreground"] },
  { id: "p6", name: "Pleated Midi Dress", category: "Dresses", price: 142, compareAt: 175, swatches: ["bg-foreground"] },
  { id: "p7", name: "Quilted Liner Jacket", category: "Outerwear", price: 176, tag: "New In", swatches: ["bg-foreground", "bg-muted-foreground", "bg-primary"] },
  { id: "p8", name: "Ribbed Turtleneck", category: "Knitwear", price: 96, swatches: ["bg-foreground", "bg-primary"] },
]

const COLLECTIONS = [
  { name: "Autumn Tailoring", count: 42, accent: "from-primary/20" },
  { name: "Everyday Knits", count: 28, accent: "from-muted-foreground/20" },
  { name: "Evening Edit", count: 16, accent: "from-secondary" },
]

const PERKS = [
  { icon: Truck, title: "Free shipping", note: "On orders over $150" },
  { icon: RefreshCw, title: "60-day returns", note: "Free and easy" },
  { icon: ShieldCheck, title: "Secure checkout", note: "Encrypted payments" },
]

export default function FashionStorePage() {
  const [filter, setFilter] = React.useState<Filter>("All")
  const [cart, setCart] = React.useState(2)
  const [added, setAdded] = React.useState<string | null>(null)
  const [wishlist, setWishlist] = React.useState<Record<string, boolean>>({})

  const visible = React.useMemo(
    () =>
      filter === "All"
        ? PRODUCTS
        : filter === "New In"
        ? PRODUCTS.filter((p) => p.tag === "New In")
        : PRODUCTS.filter((p) => p.category === filter),
    [filter],
  )

  const addToCart = (id: string) => {
    setCart((c) => c + 1)
    setAdded(id)
    window.setTimeout(() => setAdded((cur) => (cur === id ? null : cur)), 1200)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <a href="#" className="text-lg font-semibold tracking-[0.2em]">
            MAISON
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            {["New In", "Women", "Men", "Collections", "Sale"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search" className="h-9 w-48 pl-8" aria-label="Search products" />
            </div>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label={`Cart, ${cart} items`}>
              <ShoppingBag className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {cart}
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Editorial hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
            <div className="space-y-6">
              <Badge variant="secondary" className="rounded-full">
                Autumn / Winter 2026
              </Badge>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Quiet luxury, made to last
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                A considered wardrobe of tailored layers and soft knits. Designed in studio, crafted from natural fibres.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="gap-2">
                  Shop the collection <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View lookbook
                </Button>
              </div>
              <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <span>Rated 4.9 by 12,400 customers</span>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/15 via-muted to-secondary">
              <div className="absolute inset-0 flex items-end p-6">
                <Card className="w-full max-w-xs border-0 bg-background/85 backdrop-blur">
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="size-12 shrink-0 rounded-md bg-gradient-to-br from-foreground/80 to-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">Featured: Wool Overcoat</p>
                      <p className="text-sm text-muted-foreground">$289</p>
                    </div>
                    <Button size="sm" variant="secondary" className="ml-auto">
                      Shop
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Perks band */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-7xl gap-px bg-border sm:grid-cols-3">
            {PERKS.map((p) => (
              <div key={p.title} className="flex items-center gap-3 bg-background px-4 py-5 sm:px-6 lg:px-8">
                <p.icon className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-sm text-muted-foreground">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collection tiles */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop by collection</h2>
              <p className="mt-1 text-muted-foreground">Curated edits for the season ahead.</p>
            </div>
            <a href="#" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
              All collections <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {COLLECTIONS.map((c) => (
              <a
                key={c.name}
                href="#"
                className={cn(
                  "group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl border bg-gradient-to-t to-muted p-6 transition-shadow hover:shadow-lg",
                  c.accent,
                )}
              >
                <p className="text-sm text-muted-foreground">{c.count} pieces</p>
                <p className="text-xl font-medium">{c.name}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The latest arrivals</h2>
                <p className="mt-1 text-muted-foreground">{visible.length} pieces in this edit.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={filter === f ? "default" : "outline"}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {visible.map((p) => (
                <Card key={p.id} className="group overflow-hidden p-0">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted to-secondary">
                    {p.tag && (
                      <Badge
                        variant={p.tag === "Low Stock" ? "destructive" : "default"}
                        className="absolute left-3 top-3 rounded-full"
                      >
                        {p.tag}
                      </Badge>
                    )}
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-3 top-3 size-8 rounded-full"
                      aria-label={`Save ${p.name} to wishlist`}
                      onClick={() => setWishlist((w) => ({ ...w, [p.id]: !w[p.id] }))}
                    >
                      <Heart className={cn("size-4", wishlist[p.id] && "fill-primary text-primary")} />
                    </Button>
                    <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        className="w-full gap-1.5"
                        onClick={() => addToCart(p.id)}
                      >
                        {added === p.id ? (
                          "Added to bag"
                        ) : (
                          <>
                            <Plus className="size-4" /> Quick add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${p.price}</p>
                        {p.compareAt && (
                          <p className="text-xs text-muted-foreground line-through">${p.compareAt}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {p.swatches.map((s, i) => (
                        <span
                          key={i}
                          className={cn("size-3.5 rounded-full border", s)}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button variant="outline" size="lg">
                Load more
              </Button>
            </div>
          </div>
        </section>

        {/* Lookbook band */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-center gap-3 sm:row-span-1 lg:row-span-2">
              <Badge variant="outline" className="w-fit rounded-full">
                Lookbook
              </Badge>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Styled for the city</h2>
              <p className="text-muted-foreground">
                Layered tailoring meets soft texture. See how the studio team wears the A/W edit.
              </p>
              <Button variant="outline" className="w-fit gap-2">
                View full lookbook <ArrowRight className="size-4" />
              </Button>
            </div>
            {[
              "from-primary/20",
              "from-muted-foreground/20",
              "from-secondary",
            ].map((g, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-[3/4] rounded-xl border bg-gradient-to-br to-muted",
                  g,
                  i === 0 && "lg:row-span-2",
                )}
                aria-hidden="true"
              />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Join the inner circle</h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Early access to new arrivals, private sales and styling notes. No noise, ever.
            </p>
            <form
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="you@email.com" aria-label="Email address" className="h-11" />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="text-lg font-semibold tracking-[0.2em]">MAISON</p>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Considered clothing in natural fibres. Designed to be worn for years, not seasons.
              </p>
              <div className="mt-4 flex gap-1">
                <Button variant="ghost" size="icon" aria-label="Instagram">
                  <Instagram className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Twitter">
                  <Twitter className="size-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Facebook">
                  <Facebook className="size-5" />
                </Button>
              </div>
            </div>
            {[
              { h: "Shop", items: ["New In", "Outerwear", "Knitwear", "Dresses"] },
              { h: "Help", items: ["Shipping", "Returns", "Size Guide", "Contact"] },
              { h: "Company", items: ["About", "Sustainability", "Stores", "Careers"] },
            ].map((col) => (
              <div key={col.h}>
                <p className="text-sm font-medium">{col.h}</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="transition-colors hover:text-foreground">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Maison. All rights reserved.</p>
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
