"use client"

import * as React from "react"
import {
  Leaf,
  ShoppingCart,
  Search,
  Sun,
  CloudSun,
  Moon,
  Droplets,
  Truck,
  Sprout,
  Heart,
  Menu,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
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

type Light = "Low" | "Medium" | "Bright"
type Category = "Indoor" | "Outdoor" | "Succulents" | "Pots"

type Plant = {
  id: number
  name: string
  category: Category
  price: number
  light: Light
  blurb: string
}

const CATEGORIES: Array<"All" | Category> = ["All", "Indoor", "Outdoor", "Succulents", "Pots"]

const PLANTS: Plant[] = [
  { id: 1, name: "Monstera Deliciosa", category: "Indoor", price: 38, light: "Medium", blurb: "Iconic split leaves for a leafy corner." },
  { id: 2, name: "Snake Plant", category: "Indoor", price: 24, light: "Low", blurb: "Nearly unkillable, purifies the air." },
  { id: 3, name: "Fiddle Leaf Fig", category: "Indoor", price: 52, light: "Bright", blurb: "Statement tree with broad glossy leaves." },
  { id: 4, name: "Lavender", category: "Outdoor", price: 18, light: "Bright", blurb: "Fragrant blooms that pollinators adore." },
  { id: 5, name: "Japanese Maple", category: "Outdoor", price: 74, light: "Medium", blurb: "Delicate foliage that flames red in fall." },
  { id: 6, name: "Echeveria Trio", category: "Succulents", price: 21, light: "Bright", blurb: "Three rosette succulents, minimal fuss." },
  { id: 7, name: "Jade Plant", category: "Succulents", price: 16, light: "Bright", blurb: "Lucky thick-leaved keeper for any sill." },
  { id: 8, name: "Terracotta Pot Set", category: "Pots", price: 29, light: "Low", blurb: "Hand-thrown trio with drainage saucers." },
  { id: 9, name: "Speckled Ceramic Pot", category: "Pots", price: 34, light: "Low", blurb: "Matte glaze planter in sage and cream." },
  { id: 10, name: "Pothos Golden", category: "Indoor", price: 19, light: "Low", blurb: "Trailing vine that thrives on neglect." },
  { id: 11, name: "Boxwood Shrub", category: "Outdoor", price: 46, light: "Medium", blurb: "Tidy evergreen for borders and hedges." },
  { id: 12, name: "Aloe Vera", category: "Succulents", price: 22, light: "Bright", blurb: "Soothing gel and architectural spikes." },
]

const LIGHT_ICON: Record<Light, React.ComponentType<{ className?: string }>> = {
  Low: Moon,
  Medium: CloudSun,
  Bright: Sun,
}

const CARE_TIPS = [
  { icon: Droplets, title: "Water wisely", text: "Most houseplants prefer a deep soak only when the top inch of soil is dry." },
  { icon: Sun, title: "Read the light", text: "Match each plant to its light badge — south windows are bright, corners are low." },
  { icon: Sprout, title: "Feed in spring", text: "A diluted liquid feed every few weeks fuels new growth through the season." },
]

export default function PlantStorePage() {
  const [active, setActive] = React.useState<"All" | Category>("All")
  const [cartCount, setCartCount] = React.useState(0)

  const visible = React.useMemo(
    () => (active === "All" ? PLANTS : PLANTS.filter((p) => p.category === active)),
    [active]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-4 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-lg">Fernly</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#shop" className="transition-colors hover:text-foreground">Shop</a>
            <a href="#care" className="transition-colors hover:text-foreground">Care Guides</a>
            <a href="#" className="transition-colors hover:text-foreground">Gift Cards</a>
            <a href="#" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search plants" className="h-9 w-40 pl-9 lg:w-56" aria-label="Search plants" />
            </div>
            <Button variant="ghost" size="icon" className="relative" aria-label={`Cart with ${cartCount} items`}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5">
                <Sprout className="h-3.5 w-3.5" /> Fresh drop every Friday
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Greener spaces,
                <span className="text-primary"> delivered to your door.</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Hand-picked houseplants, hardy outdoor varieties, and the pots to match — each shipped with a personal care card.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2" asChild>
                  <a href="#shop">
                    Shop the collection <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#care">Browse care guides</a>
                </Button>
              </div>
              <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-primary" />
                Free carbon-neutral shipping over $50
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-3xl border bg-primary/10">
                <div className="flex h-full w-full items-center justify-center">
                  <Leaf className="h-40 w-40 text-primary/40" aria-hidden="true" />
                </div>
              </div>
              <Card className="absolute -bottom-6 -left-2 w-44 shadow-lg sm:-left-6">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="h-5 w-5" />
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold leading-none">12k+</p>
                    <p className="text-muted-foreground">happy plant parents</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="shop" className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop by category</h2>
              <p className="mt-1 text-muted-foreground">
                {visible.length} {visible.length === 1 ? "plant" : "plants"} available
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={active === cat}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((plant) => {
              const LightIcon = LIGHT_ICON[plant.light]
              return (
                <Card key={plant.id} className="group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                      <Leaf className="h-16 w-16 text-primary/30 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                    </div>
                    <Badge variant="secondary" className="absolute left-3 top-3 gap-1">
                      <LightIcon className="h-3 w-3" /> {plant.light} light
                    </Badge>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-3 top-3 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={`Save ${plant.name} to wishlist`}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="space-y-1 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium leading-tight">{plant.name}</h3>
                      <span className="shrink-0 font-semibold">${plant.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plant.blurb}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full gap-2" onClick={() => setCartCount((c) => c + 1)}>
                      <ShoppingCart className="h-4 w-4" /> Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </section>

        <section id="care" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="max-w-xl">
              <Badge variant="outline" className="gap-1.5">
                <Sprout className="h-3.5 w-3.5 text-primary" /> Care tips
              </Badge>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Keep your plants thriving
              </h2>
              <p className="mt-2 text-muted-foreground">
                A few simple habits go a long way. Every order ships with a tailored care card, but here are our evergreen basics.
              </p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {CARE_TIPS.map((tip) => (
                <Card key={tip.title} className="bg-card">
                  <CardContent className="space-y-3 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <tip.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-medium">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <Card className="overflow-hidden bg-primary/10">
            <CardContent className="grid items-center gap-6 p-8 md:grid-cols-2 md:p-12">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight">Grow your inbox</h2>
                <p className="text-muted-foreground">
                  Join the newsletter for seasonal planting guides, restock alerts, and member-only discounts.
                </p>
              </div>
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-background"
                  aria-label="Email address"
                />
                <Button type="submit" className="shrink-0">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Leaf className="h-4 w-4" />
                </span>
                Fernly
              </a>
              <p className="text-sm text-muted-foreground">
                Plants and pots for greener, calmer spaces. Grown with care, shipped with love.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Shop</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#shop" className="hover:text-foreground">Indoor</a></li>
                <li><a href="#shop" className="hover:text-foreground">Outdoor</a></li>
                <li><a href="#shop" className="hover:text-foreground">Succulents</a></li>
                <li><a href="#shop" className="hover:text-foreground">Pots</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Support</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Shipping</a></li>
                <li><a href="#" className="hover:text-foreground">Plant guarantee</a></li>
                <li><a href="#care" className="hover:text-foreground">Care guides</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Follow along</h3>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="icon" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Fernly. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
