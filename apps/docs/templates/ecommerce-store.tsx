"use client"

import * as React from "react"
import {
  ShoppingCart,
  Search,
  Menu,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Heart,
  ArrowRight,
  Plus,
  Minus,
  Headphones,
  Shirt,
  Watch,
  Footprints,
  Sparkles,
  Check,
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

const NAV_LINKS = ["New", "Men", "Women", "Accessories", "Sale"]

const CATEGORIES = [
  { name: "Apparel", count: "248 items", icon: Shirt },
  { name: "Footwear", count: "164 items", icon: Footprints },
  { name: "Watches", count: "92 items", icon: Watch },
  { name: "Audio", count: "76 items", icon: Headphones },
]

type Product = {
  id: number
  name: string
  category: string
  price: number
  compareAt?: number
  rating: number
  reviews: number
  tag?: string
  swatch: string
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Aero Knit Runner", category: "Footwear", price: 128, compareAt: 160, rating: 5, reviews: 214, tag: "Bestseller", swatch: "from-primary/20 to-primary/5" },
  { id: 2, name: "Cloudline Hoodie", category: "Apparel", price: 78, rating: 4, reviews: 96, tag: "New", swatch: "from-muted to-accent" },
  { id: 3, name: "Meridian Chrono Watch", category: "Watches", price: 245, compareAt: 290, rating: 5, reviews: 142, swatch: "from-accent to-muted" },
  { id: 4, name: "Pulse Wireless Buds", category: "Audio", price: 99, rating: 4, reviews: 308, tag: "Bestseller", swatch: "from-primary/15 to-muted" },
  { id: 5, name: "Drift Linen Shirt", category: "Apparel", price: 64, rating: 4, reviews: 51, swatch: "from-muted to-secondary" },
  { id: 6, name: "Summit Trail Pack", category: "Accessories", price: 142, compareAt: 175, rating: 5, reviews: 88, tag: "Limited", swatch: "from-secondary to-accent" },
  { id: 7, name: "Halo Studio Headset", category: "Audio", price: 189, rating: 5, reviews: 176, swatch: "from-primary/20 to-accent" },
  { id: 8, name: "Atlas Leather Belt", category: "Accessories", price: 48, rating: 4, reviews: 33, swatch: "from-muted to-primary/10" },
]

const PERKS = [
  { icon: Truck, title: "Free shipping", desc: "On orders over $75" },
  { icon: RefreshCw, title: "30-day returns", desc: "No questions asked" },
  { icon: ShieldCheck, title: "Secure checkout", desc: "Encrypted payments" },
  { icon: Headphones, title: "24/7 support", desc: "We're here to help" },
]

const REVIEWS = [
  { name: "Jordan Avery", handle: "Verified buyer", rating: 5, text: "The Aero Runners are unreal — lightweight, breathable, and they actually look as good as the photos. Shipping was lightning fast.", initials: "JA" },
  { name: "Priya Nair", handle: "Verified buyer", rating: 5, text: "Second order from here and the quality keeps me coming back. The Meridian watch feels premium far beyond its price.", initials: "PN" },
  { name: "Marcus Lee", handle: "Verified buyer", rating: 4, text: "Great gear and the returns process was painless when I needed a size swap. Customer support replied within minutes.", initials: "ML" },
]

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating ? "fill-primary text-primary" : "text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  )
}

export default function EcommerceStore() {
  const [cartCount, setCartCount] = React.useState(2)
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [wishlist, setWishlist] = React.useState<number[]>([])
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const filterTabs = ["All", "Apparel", "Footwear", "Watches", "Audio"]
  const visible = PRODUCTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  )

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium sm:text-sm">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Summer Sale — up to 40% off select styles. Use code <span className="font-semibold underline underline-offset-2">SUMMER40</span>
        </p>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>

          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
            </span>
            <span className="text-lg">Lumen</span>
          </a>

          <ul className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    link === "Sale" && "text-primary"
                  )}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products"
                className="w-48 pl-9 lg:w-64"
                aria-label="Search products"
              />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
              <Heart className="size-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" aria-label={`Cart, ${cartCount} items`} className="relative">
              <ShoppingCart className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4">
                New season drop
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Gear that moves <span className="text-primary">the way you do</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
                Premium essentials engineered for everyday performance. Thoughtful design, honest pricing, free returns.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Shop the collection
                  <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Explore new arrivals
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {["AK", "RS", "MJ", "LP"].map((i) => (
                    <Avatar key={i} className="size-9 border-2 border-background">
                      <AvatarFallback className="bg-secondary text-xs">{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <Stars rating={5} />
                  <p className="mt-1 text-sm text-muted-foreground">
                    Loved by <span className="font-medium text-foreground">12,400+</span> customers
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent to-muted shadow-sm" />
              <Card className="absolute -bottom-6 left-4 w-56 shadow-lg sm:left-8">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="aspect-square size-12 shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">Aero Knit Runner</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-semibold">$128</span>
                      <span className="text-xs text-muted-foreground line-through">$160</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="border-b">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
            {PERKS.map((perk) => (
              <div key={perk.title} className="flex items-center gap-3 bg-background px-4 py-6 sm:px-6">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <perk.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{perk.title}</p>
                  <p className="text-xs text-muted-foreground">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category tiles */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Shop by category</h2>
              <p className="mt-2 text-muted-foreground">Find exactly what you're looking for.</p>
            </div>
            <Button variant="ghost" className="hidden gap-1 sm:flex">
              View all <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-muted/60 to-background p-6 transition-colors hover:border-primary"
              >
                <div className="mb-12 grid size-11 place-items-center rounded-lg bg-background text-primary shadow-sm">
                  <cat.icon className="size-5" />
                </div>
                <p className="font-semibold">{cat.name}</p>
                <p className="text-sm text-muted-foreground">{cat.count}</p>
                <ArrowRight className="absolute bottom-6 right-6 size-5 -translate-x-2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </section>

        {/* Featured product grid */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured products</h2>
                <p className="mt-2 text-muted-foreground">Hand-picked favorites from this season.</p>
              </div>
              <div className="flex flex-wrap gap-1 rounded-lg border bg-background p-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveCategory(tab)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      activeCategory === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((product) => {
                const wished = wishlist.includes(product.id)
                return (
                  <Card key={product.id} className="group overflow-hidden pt-0 transition-shadow hover:shadow-md">
                    <div className={cn("relative aspect-square overflow-hidden bg-gradient-to-br", product.swatch)}>
                      {product.tag && (
                        <Badge
                          variant={product.compareAt ? "destructive" : "default"}
                          className="absolute left-3 top-3"
                        >
                          {product.compareAt ? "Sale" : product.tag}
                        </Badge>
                      )}
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                        aria-pressed={wished}
                        className="absolute right-3 top-3 size-8 rounded-full"
                      >
                        <Heart className={cn("size-4", wished && "fill-primary text-primary")} />
                      </Button>
                    </div>
                    <CardContent className="px-4">
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <h3 className="mt-1 font-medium leading-tight">{product.name}</h3>
                      <div className="mt-2 flex items-center gap-2">
                        <Stars rating={product.rating} />
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-lg font-semibold">${product.price}</span>
                        {product.compareAt && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.compareAt}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="px-4">
                      <Button
                        className="w-full gap-2"
                        onClick={() => setCartCount((c) => c + 1)}
                      >
                        <Plus className="size-4" />
                        Add to cart
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <Button variant="outline" size="lg" className="gap-2">
                Load more products
                <RefreshCw className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Promo banner */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-accent to-background p-8 sm:p-12 lg:p-16">
            <div className="max-w-xl">
              <Badge variant="outline" className="mb-4 bg-background">
                Limited time
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Build your kit and save 25%
              </h2>
              <p className="mt-4 text-muted-foreground">
                Bundle any three items from the new collection and we'll take a quarter off automatically at checkout. No code needed.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Free express shipping included", "Mix and match across categories", "Stacks with your first-order discount"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-8 gap-2">
                Start a bundle
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-y bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What our customers say</h2>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Stars rating={5} />
                <span className="text-sm text-muted-foreground">
                  4.9 average from 3,800+ reviews
                </span>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {REVIEWS.map((review) => (
                <Card key={review.name} className="bg-background">
                  <CardContent className="px-6">
                    <Stars rating={review.rating} />
                    <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <Separator className="my-5" />
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-secondary text-xs">
                          {review.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.handle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Get 10% off your first order
            </h2>
            <p className="mt-3 text-muted-foreground">
              Join the list for early access to drops, members-only deals, and styling tips. No spam, unsubscribe anytime.
            </p>
            <form
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSubscribed(true)
              }}
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-11 flex-1"
              />
              <Button type="submit" size="lg" className="shrink-0">
                {subscribed ? "Subscribed" : "Subscribe"}
              </Button>
            </form>
            {subscribed && (
              <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-primary">
                <Check className="size-4" />
                Thanks! Your discount code is on the way.
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-5">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
                  <Sparkles className="size-4" aria-hidden="true" />
                </span>
                <span className="text-lg">Lumen</span>
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Premium everyday essentials, designed to move with you and priced to make sense.
              </p>
            </div>
            {[
              { title: "Shop", links: ["New arrivals", "Bestsellers", "Apparel", "Accessories"] },
              { title: "Company", links: ["About us", "Careers", "Sustainability", "Press"] },
              { title: "Support", links: ["Help center", "Shipping", "Returns", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
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
            <p>© 2026 Lumen. All rights reserved.</p>
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
