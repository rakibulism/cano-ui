"use client"

import * as React from "react"
import {
  Search,
  ShoppingCart,
  Star,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgeCheck,
  Store,
  ArrowRight,
  Menu,
  ChevronRight,
  Sparkles,
  Headphones,
  Shirt,
  Home,
  Gamepad2,
  Leaf,
  Watch,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = ["Deals", "Categories", "Sellers", "New Arrivals", "Help"]

const CATEGORIES = [
  { label: "All", icon: Sparkles },
  { label: "Electronics", icon: Headphones },
  { label: "Fashion", icon: Shirt },
  { label: "Home & Living", icon: Home },
  { label: "Gaming", icon: Gamepad2 },
  { label: "Wellness", icon: Leaf },
  { label: "Accessories", icon: Watch },
]

const SELLERS = [
  { name: "Nordic Supply Co.", rating: 4.9, reviews: "12.4k", tag: "Top Rated", initials: "NS" },
  { name: "Lumen Audio", rating: 4.8, reviews: "8.1k", tag: "Verified", initials: "LA" },
  { name: "Verde Goods", rating: 4.7, reviews: "5.6k", tag: "Eco Pick", initials: "VG" },
  { name: "Atelier Maison", rating: 4.9, reviews: "9.3k", tag: "Premium", initials: "AM" },
  { name: "PixelPlay", rating: 4.6, reviews: "4.2k", tag: "Rising", initials: "PP" },
  { name: "Harbor & Oak", rating: 4.8, reviews: "6.7k", tag: "Verified", initials: "HO" },
]

const PRODUCTS = [
  { name: "Aurora Wireless Headphones", seller: "Lumen Audio", price: "$149", was: "$199", rating: 4.9, reviews: 1240, category: "Electronics", badge: "Best Seller" },
  { name: "Linen Oversized Shirt", seller: "Atelier Maison", price: "$68", was: null, rating: 4.7, reviews: 642, category: "Fashion", badge: null },
  { name: "Ceramic Pour-Over Set", seller: "Harbor & Oak", price: "$54", was: "$72", rating: 4.8, reviews: 389, category: "Home & Living", badge: "Deal" },
  { name: "Mecha Pro Keyboard", seller: "PixelPlay", price: "$119", was: null, rating: 4.6, reviews: 902, category: "Gaming", badge: null },
  { name: "Bamboo Yoga Mat", seller: "Verde Goods", price: "$42", was: "$55", rating: 4.7, reviews: 514, category: "Wellness", badge: "Eco" },
  { name: "Minimal Steel Watch", seller: "Nordic Supply Co.", price: "$210", was: null, rating: 4.9, reviews: 778, category: "Accessories", badge: "New" },
  { name: "Studio Desk Lamp", seller: "Nordic Supply Co.", price: "$89", was: "$110", rating: 4.8, reviews: 301, category: "Home & Living", badge: "Deal" },
  { name: "Trailhead Backpack 24L", seller: "Harbor & Oak", price: "$96", was: null, rating: 4.7, reviews: 455, category: "Accessories", badge: null },
]

const TRUST = [
  { icon: ShieldCheck, title: "Buyer Protection", desc: "Full refund if your item never arrives." },
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50 from verified sellers." },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day no-questions-asked returns." },
  { icon: BadgeCheck, title: "Vetted Sellers", desc: "Every shop is reviewed before launch." },
]

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <Star className="size-3.5 fill-primary text-primary" aria-hidden="true" />
      <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
    </span>
  )
}

export default function MarketplaceTemplate() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [query, setQuery] = React.useState("")

  const visibleProducts = PRODUCTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Store className="size-4" aria-hidden="true" />
            </span>
            <span className="text-lg tracking-tight">Marketly</span>
          </a>
          <div className="relative ml-2 hidden flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, sellers, brands…"
              className="pl-9"
              aria-label="Search the marketplace"
            />
          </div>
          <nav className="ml-auto hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button variant="ghost" size="icon" aria-label="Saved items">
              <Heart className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                3
              </span>
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                <Sparkles className="mr-1 size-3.5" aria-hidden="true" />
                Over 2,400 independent sellers
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                One marketplace, thousands of makers
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover handpicked products from verified shops around the world, with buyer protection on every order.
              </p>
              <div className="mx-auto mt-8 flex max-w-xl items-center gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What are you looking for today?"
                    className="h-12 pl-9 text-base"
                    aria-label="Search products"
                  />
                </div>
                <Button size="lg" className="h-12">
                  Search
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>Trending:</span>
                {["headphones", "linen", "desk setup", "yoga"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="rounded-full border bg-background px-3 py-1 text-foreground transition-colors hover:bg-accent"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const active = activeCategory === cat.label
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-pressed={active}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Featured sellers</h2>
              <p className="mt-1 text-sm text-muted-foreground">Top-rated shops loved by our community.</p>
            </div>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              View all
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {SELLERS.map((seller) => (
              <Card key={seller.name} className="w-60 shrink-0">
                <CardContent className="flex items-center gap-3 pt-6">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                      {seller.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{seller.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Stars rating={seller.rating} />
                      <span className="text-xs text-muted-foreground">({seller.reviews})</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pb-5">
                  <Badge variant="secondary">{seller.tag}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {activeCategory === "All" ? "Popular right now" : activeCategory}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {visibleProducts.length} products from verified sellers
              </p>
            </div>
            <Button variant="outline" size="sm">Filters</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <Card key={product.name} className="group overflow-hidden pt-0">
                <div className="relative aspect-square bg-muted">
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
                    <Store className="size-10" aria-hidden="true" />
                  </div>
                  {product.badge ? (
                    <Badge className="absolute left-3 top-3">{product.badge}</Badge>
                  ) : null}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-3 top-3 size-8 opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={"Save " + product.name}
                  >
                    <Heart className="size-4" />
                  </Button>
                </div>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{product.seller}</p>
                  <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Stars rating={product.rating} />
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-semibold">{product.price}</span>
                    {product.was ? (
                      <span className="text-sm text-muted-foreground line-through">{product.was}</span>
                    ) : null}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="sm">
                    <ShoppingCart className="mr-2 size-4" />
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:py-14 md:text-left">
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-3 border-primary/40 text-primary">
                  <Store className="mr-1 size-3.5" aria-hidden="true" />
                  Become a seller
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Turn your craft into a storefront
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Open a shop in minutes, reach millions of buyers, and keep more of every sale with our flat 4% fee. No listing costs, ever.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground md:justify-start">
                  <span className="font-medium text-foreground">2.1M+ buyers</span>
                  <Separator orientation="vertical" className="hidden h-4 md:block" />
                  <span className="font-medium text-foreground">Payouts every week</span>
                  <Separator orientation="vertical" className="hidden h-4 md:block" />
                  <span className="font-medium text-foreground">24/7 seller support</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                <Button size="lg">
                  Start selling
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Learn more
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Store className="size-4" aria-hidden="true" />
                </span>
                <span className="text-lg tracking-tight">Marketly</span>
              </a>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                A multi-vendor marketplace connecting independent makers with buyers who care about quality.
              </p>
            </div>
            {[
              { title: "Shop", links: ["Categories", "Deals", "New arrivals", "Gift cards"] },
              { title: "Sell", links: ["Open a shop", "Seller fees", "Resources", "Success stories"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Marketly Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
