"use client"

import * as React from "react"
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  Menu,
  Star,
  Leaf,
  Droplet,
  Sun,
  Moon,
  ShieldCheck,
  Truck,
  Recycle,
  ArrowRight,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Skincare", "Makeup", "Fragrance", "Body", "Gifts"]

const COLLECTIONS = ["All", "Skincare", "Lips", "Eyes", "Body"] as const
type Collection = (typeof COLLECTIONS)[number]

type Product = {
  name: string
  tagline: string
  price: string
  collection: Exclude<Collection, "All">
  rating: number
  tag?: string
  shades: string[]
}

const PRODUCTS: Product[] = [
  {
    name: "Velvet Glow Serum",
    tagline: "Hyaluronic + niacinamide radiance",
    price: "$48",
    collection: "Skincare",
    rating: 5,
    tag: "Bestseller",
    shades: ["bg-primary", "bg-accent", "bg-secondary"],
  },
  {
    name: "Silk Tint Lip Oil",
    tagline: "Sheer, cushiony color",
    price: "$24",
    collection: "Lips",
    rating: 5,
    tag: "New",
    shades: ["bg-primary", "bg-destructive", "bg-accent", "bg-muted"],
  },
  {
    name: "Luminous Eye Balm",
    tagline: "Depuffs + brightens in one swipe",
    price: "$32",
    collection: "Eyes",
    rating: 4,
    shades: ["bg-secondary", "bg-muted", "bg-accent"],
  },
  {
    name: "Cloud Cream Blush",
    tagline: "Weightless flush, buildable",
    price: "$28",
    collection: "Lips",
    rating: 5,
    tag: "Bestseller",
    shades: ["bg-primary", "bg-destructive", "bg-accent"],
  },
  {
    name: "Botanical Body Milk",
    tagline: "48-hour squalane hydration",
    price: "$36",
    collection: "Body",
    rating: 4,
    shades: ["bg-secondary", "bg-muted"],
  },
  {
    name: "Dewy Skin Tint SPF 30",
    tagline: "Your skin, but lit from within",
    price: "$42",
    collection: "Skincare",
    rating: 5,
    tag: "New",
    shades: ["bg-primary", "bg-accent", "bg-secondary", "bg-muted"],
  },
]

const INGREDIENTS = [
  {
    icon: Droplet,
    name: "Hyaluronic Acid",
    note: "Multi-weight moisture that plumps without weight.",
  },
  {
    icon: Leaf,
    name: "Squalane",
    note: "Plant-derived lipid that seals in lasting softness.",
  },
  {
    icon: Sun,
    name: "Vitamin C",
    note: "Brightening antioxidant for an even, lit-up tone.",
  },
  {
    icon: Sparkles,
    name: "Niacinamide",
    note: "Refines texture and calms visible redness.",
  },
]

const ROUTINE = [
  {
    step: "01",
    icon: Droplet,
    title: "Cleanse",
    body: "Melt away the day with the gentle gel-to-milk wash.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Treat",
    body: "Press in the Velvet Glow Serum on damp skin.",
  },
  {
    step: "03",
    icon: Leaf,
    title: "Hydrate",
    body: "Lock it in with the cloud-light moisture veil.",
  },
  {
    step: "04",
    icon: Sun,
    title: "Protect",
    body: "Finish mornings with the Dewy Skin Tint SPF.",
  },
]

const REVIEWS = [
  {
    name: "Amara O.",
    handle: "Verified buyer",
    body: "The lip oil is the only one that doesn't feel sticky. I've repurchased three times.",
    avatar: "https://i.pravatar.cc/96?img=47",
  },
  {
    name: "Priya S.",
    handle: "Verified buyer",
    body: "My skin looks genuinely glassy after two weeks of the serum. Worth every penny.",
    avatar: "https://i.pravatar.cc/96?img=32",
  },
  {
    name: "Lena K.",
    handle: "Verified buyer",
    body: "Clean ingredients that actually perform. The blush gives the prettiest natural flush.",
    avatar: "https://i.pravatar.cc/96?img=20",
  },
]

const PERKS = [
  { icon: Truck, label: "Free shipping over $40" },
  { icon: ShieldCheck, label: "Dermatologist tested" },
  { icon: Recycle, label: "Refillable packaging" },
  { icon: Leaf, label: "Vegan + cruelty-free" },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={count + " out of 5 stars"}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < count ? "fill-primary text-primary" : "text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  )
}

export default function BeautyStore() {
  const [active, setActive] = React.useState<Collection>("All")
  const filtered = PRODUCTS.filter((p) => active === "All" || p.collection === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-lg">Lumière</span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
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
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                2
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
                <Sparkles className="h-3.5 w-3.5" /> New season ritual
              </Badge>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Skin-first beauty,
                <span className="block text-primary">crafted to glow.</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Clean, high-performance formulas in shades made for every you. No
                compromises, just luminous results.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Shop bestsellers <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Take the skin quiz
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                <Stars count={5} />
                <span>4.9 from 12,400+ reviews</span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-accent to-secondary">
                <div className="flex h-full flex-col justify-between p-8">
                  <div className="flex justify-end">
                    <Badge className="rounded-full">Bestseller</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      {["bg-primary", "bg-secondary", "bg-muted", "bg-accent"].map(
                        (s, i) => (
                          <span
                            key={i}
                            className={cn("h-10 w-10 rounded-full border-2 border-background shadow-sm", s)}
                          />
                        )
                      )}
                    </div>
                    <Card className="border-0 bg-background/80 backdrop-blur">
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <p className="text-sm font-medium">Velvet Glow Serum</p>
                          <p className="text-xs text-muted-foreground">Radiance in a bottle</p>
                        </div>
                        <p className="text-lg font-semibold text-primary">$48</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perks bar */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-y px-0 sm:grid-cols-4 sm:divide-y-0">
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

        {/* Bestsellers grid */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Loved by many
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Shop our bestsellers
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
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <Card
                key={p.name}
                className="group overflow-hidden border transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-accent via-secondary to-muted">
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
                    aria-label={"Add " + p.name + " to wishlist"}
                    className="absolute right-3 top-3 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium leading-tight">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                    </div>
                    <p className="shrink-0 font-semibold text-primary">{p.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Stars count={p.rating} />
                    <div className="flex items-center gap-1.5">
                      {p.shades.map((s, i) => (
                        <span
                          key={i}
                          className={cn("h-4 w-4 rounded-full border", s)}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <Button className="w-full gap-2" variant="outline">
                    <ShoppingBag className="h-4 w-4" /> Add to bag
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Ingredients */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                What's inside
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ingredients you can trust
              </h2>
              <p className="mt-3 text-muted-foreground">
                Every formula is built on clinically loved actives and skips the 1,800+
                ingredients we never use.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {INGREDIENTS.map((ing) => (
                <Card key={ing.name} className="border bg-background">
                  <CardContent className="space-y-3 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ing.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-medium">{ing.name}</h3>
                    <p className="text-sm text-muted-foreground">{ing.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Routine steps */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                The ritual
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                A four-step glow routine
              </h2>
              <p className="text-muted-foreground">
                Morning or night, these four steps take under five minutes and leave skin
                soft, balanced, and luminous.
              </p>
              <div className="flex items-center gap-3 rounded-2xl border bg-muted/40 p-4">
                <div className="flex gap-2">
                  <Sun className="h-5 w-5 text-primary" />
                  <Moon className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Works for both AM and PM routines.
                </p>
              </div>
              <Button size="lg" className="gap-2">
                Build my routine <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ROUTINE.map((r) => (
                <Card key={r.step} className="border bg-card">
                  <CardContent className="space-y-3 p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <r.icon className="h-5 w-5" />
                      </span>
                      <span className="text-2xl font-semibold text-muted-foreground/40">
                        {r.step}
                      </span>
                    </div>
                    <h3 className="font-medium">{r.title}</h3>
                    <p className="text-sm text-muted-foreground">{r.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-col items-center gap-2 text-center">
              <Stars count={5} />
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Glowing reviews
              </h2>
              <p className="text-muted-foreground">Real results from real routines.</p>
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
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/15 via-accent to-secondary">
            <CardContent className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div className="space-y-3">
                <Badge variant="secondary" className="gap-1.5 rounded-full">
                  <Sparkles className="h-3.5 w-3.5" /> Join the glow club
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  15% off your first ritual
                </h2>
                <p className="text-muted-foreground">
                  Subscribe for early drops, routine tips, and members-only shades.
                </p>
              </div>
              <form
                className="space-y-3"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    required
                    placeholder="you@email.com"
                    aria-label="Email address"
                    className="h-11 bg-background"
                  />
                  <Button type="submit" size="lg" className="shrink-0 gap-2">
                    Subscribe <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  By subscribing you agree to our privacy policy. Unsubscribe anytime.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                Lumière
              </a>
              <p className="max-w-xs text-sm text-muted-foreground">
                Clean, high-performance beauty made to make you glow from within.
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
              <h3 className="text-sm font-medium">Help</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {["Shipping", "Returns", "Ingredients", "Contact"].map((n) => (
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
                  <Leaf className="h-4 w-4 text-primary" /> Vegan formulas
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Dermatologist tested
                </li>
                <li className="flex items-center gap-2">
                  <Recycle className="h-4 w-4 text-primary" /> Refillable + recyclable
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Lumière Beauty. All rights reserved.</p>
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
