"use client"

import * as React from "react"
import {
  ArrowRight,
  ShoppingBag,
  Store,
  Search,
  ShieldCheck,
  Wallet,
  Truck,
  Star,
  Sparkles,
  Camera,
  Sofa,
  Shirt,
  Bike,
  BookOpen,
  Gem,
  CheckCircle2,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Audience = "buyer" | "seller"

const AUDIENCE_CONTENT: Record<
  Audience,
  {
    eyebrow: string
    title: string
    highlight: string
    description: string
    cta: string
    secondary: string
    points: { icon: React.ComponentType<{ className?: string }>; label: string }[]
  }
> = {
  buyer: {
    eyebrow: "For buyers",
    title: "Discover one-of-a-kind goods from",
    highlight: "makers you can trust",
    description:
      "Browse thousands of vetted local sellers, pay securely, and get buyer protection on every order. No middlemen, no surprises.",
    cta: "Start shopping",
    secondary: "Browse categories",
    points: [
      { icon: ShieldCheck, label: "Buyer protection on every order" },
      { icon: Truck, label: "Tracked, insured delivery" },
      { icon: Wallet, label: "Pay securely with any method" },
    ],
  },
  seller: {
    eyebrow: "For sellers",
    title: "Turn your craft into income with",
    highlight: "zero listing fees",
    description:
      "Open a storefront in minutes, reach buyers nationwide, and get paid out fast. We handle payments, fraud, and logistics so you can focus on making.",
    cta: "Open your shop",
    secondary: "See seller pricing",
    points: [
      { icon: Wallet, label: "Fast payouts, low flat fee" },
      { icon: Store, label: "Free storefront and tools" },
      { icon: Sparkles, label: "Promoted to matching buyers" },
    ],
  },
}

const STEPS: Record<Audience, { step: string; title: string; body: string }[]> = {
  buyer: [
    { step: "01", title: "Find it", body: "Search by category, maker, or location to discover items near you." },
    { step: "02", title: "Buy it", body: "Check out securely with full buyer protection built in." },
    { step: "03", title: "Get it", body: "Track your insured shipment from the seller to your door." },
  ],
  seller: [
    { step: "01", title: "List it", body: "Add photos, set a price, and publish your storefront in minutes." },
    { step: "02", title: "Sell it", body: "We surface your listings to buyers actively searching." },
    { step: "03", title: "Ship it", body: "Print a prepaid label and get paid out within 48 hours." },
  ],
}

const CATEGORIES = [
  { icon: Sofa, name: "Home & Living", count: "12.4k items" },
  { icon: Shirt, name: "Apparel", count: "8.1k items" },
  { icon: Gem, name: "Jewelry", count: "5.7k items" },
  { icon: Camera, name: "Vintage Tech", count: "3.2k items" },
  { icon: Bike, name: "Outdoors", count: "4.9k items" },
  { icon: BookOpen, name: "Books & Art", count: "6.3k items" },
]

const STATS = [
  { value: "2.1M", label: "Active buyers" },
  { value: "48k", label: "Verified sellers" },
  { value: "98%", label: "On-time delivery" },
  { value: "4.9/5", label: "Average rating" },
]

const LISTINGS = [
  { title: "Hand-thrown ceramic mug", seller: "ClayHouse Studio", price: "$28", rating: "4.9", tag: "Bestseller" },
  { title: "Reclaimed oak side table", seller: "Northwood Co.", price: "$185", rating: "5.0", tag: "New" },
  { title: "Linen weekender bag", seller: "Field & Thread", price: "$92", rating: "4.8", tag: "Trending" },
  { title: "Brass desk lamp", seller: "Lumen Works", price: "$74", rating: "4.9", tag: "Limited" },
  { title: "Knit wool throw", seller: "Highland Loom", price: "$120", rating: "5.0", tag: "Bestseller" },
  { title: "Stoneware planter set", seller: "Terra Forms", price: "$46", rating: "4.7", tag: "New" },
]

const TESTIMONIALS = [
  {
    quote:
      "I found pieces I could never get anywhere else, and the buyer protection made it completely stress-free.",
    name: "Mara Ellison",
    role: "Buyer in Portland",
    initials: "ME",
  },
  {
    quote:
      "I went from a hobby to a full-time studio in under a year. The payouts are fast and the tools just work.",
    name: "Devon Park",
    role: "Seller, Lumen Works",
    initials: "DP",
  },
  {
    quote:
      "Listing is genuinely a five-minute job. I spend my time making, not fighting software.",
    name: "Sofia Reyes",
    role: "Seller, Terra Forms",
    initials: "SR",
  },
]

export default function MarketplaceLanding() {
  const [audience, setAudience] = React.useState<Audience>("buyer")
  const content = AUDIENCE_CONTENT[audience]
  const steps = STEPS[audience]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Maket</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#categories" className="transition-colors hover:text-foreground">Categories</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#listings" className="transition-colors hover:text-foreground">Featured</a>
            <a href="#stories" className="transition-colors hover:text-foreground">Stories</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log in</Button>
            <Button size="sm">{audience === "seller" ? "Open shop" : "Sign up"}</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" aria-hidden="true" />
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="mx-auto flex max-w-md justify-center">
              <div
                role="tablist"
                aria-label="Choose your audience"
                className="inline-flex w-full items-center gap-1 rounded-full border bg-muted/30 p-1"
              >
                {(["buyer", "seller"] as Audience[]).map((value) => {
                  const active = audience === value
                  const Icon = value === "buyer" ? ShoppingBag : Store
                  return (
                    <button
                      key={value}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setAudience(value)}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {value === "buyer" ? "I'm buying" : "I'm selling"}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">{content.eyebrow}</Badge>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {content.title} <span className="text-primary">{content.highlight}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                {content.description}
              </p>

              <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="h-11 pl-9"
                    placeholder={audience === "buyer" ? "Search ceramics, vintage, art…" : "What do you make?"}
                    aria-label="Search the marketplace"
                  />
                </div>
                <Button size="lg" className="w-full shrink-0 sm:w-auto">
                  {content.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {content.points.map((point) => (
                  <div key={point.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <point.icon className="h-4 w-4 text-primary" />
                    {point.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                How it works {audience === "buyer" ? "for buyers" : "for sellers"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                Three simple steps. We handle the hard parts in between.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <Card key={s.step} className="relative overflow-hidden">
                  <CardContent className="pt-6">
                    <span className="text-4xl font-bold text-primary/15">{s.step}</span>
                    <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop by category</h2>
                <p className="mt-3 text-muted-foreground">Curated collections from independent makers.</p>
              </div>
              <Button variant="outline" size="sm">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  className="group flex flex-col items-start gap-3 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <cat.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium leading-tight">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured listings */}
        <section id="listings" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured listings</h2>
                <p className="mt-3 text-muted-foreground">Fresh finds from sellers our community loves.</p>
              </div>
              <Button variant="outline" size="sm">
                Browse marketplace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LISTINGS.map((item) => (
                <Card key={item.title} className="group overflow-hidden">
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-muted">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground/40" aria-hidden="true" />
                    <Badge className="absolute left-3 top-3" variant="secondary">{item.tag}</Badge>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-medium leading-tight">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.seller}</p>
                      </div>
                      <span className="shrink-0 text-base font-semibold">{item.price}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-medium text-foreground">{item.rating}</span>
                      <span>· Verified seller</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="stories" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Loved by both sides</h2>
              <p className="mt-3 text-muted-foreground">Real stories from buyers and sellers in our community.</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name}>
                  <CardContent className="flex h-full flex-col pt-6">
                    <Quote className="h-6 w-6 text-primary/30" aria-hidden="true" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">{t.quote}</p>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback>{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-12">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                  {["No listing fees", "Buyer protection", "Fast payouts"].map((perk) => (
                    <span key={perk} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {perk}
                    </span>
                  ))}
                </div>
                <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Join the marketplace built for makers and the people who love them
                </h2>
                <p className="max-w-xl text-muted-foreground">
                  Whether you're here to buy something special or build a business, getting started takes two minutes.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg">
                    <ShoppingBag className="h-4 w-4" />
                    Start shopping
                  </Button>
                  <Button size="lg" variant="outline">
                    <Store className="h-4 w-4" />
                    Open a shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <span className="font-semibold">Maket</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
              <a href="#categories" className="transition-colors hover:text-foreground">Categories</a>
              <a href="#listings" className="transition-colors hover:text-foreground">Featured</a>
              <a href="#stories" className="transition-colors hover:text-foreground">Stories</a>
            </nav>
            <p className="text-sm text-muted-foreground">© 2026 Maket, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
