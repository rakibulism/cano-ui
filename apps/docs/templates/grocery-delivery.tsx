"use client"

import * as React from "react"
import {
  ShoppingCart,
  MapPin,
  Search,
  Truck,
  Leaf,
  Tag,
  Clock,
  Plus,
  Minus,
  Star,
  Heart,
  ChevronRight,
  Apple,
  Milk,
  Croissant,
  Package,
  Snowflake,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type Category = "All" | "Produce" | "Dairy" | "Bakery" | "Pantry" | "Frozen"

type Product = {
  id: string
  name: string
  category: Exclude<Category, "All">
  price: string
  unit: string
  tag?: string
  rating: number
  bg: string
}

const CATEGORIES: { key: Category; label: string; icon: React.ElementType }[] = [
  { key: "All", label: "All", icon: ShoppingCart },
  { key: "Produce", label: "Produce", icon: Apple },
  { key: "Dairy", label: "Dairy", icon: Milk },
  { key: "Bakery", label: "Bakery", icon: Croissant },
  { key: "Pantry", label: "Pantry", icon: Package },
  { key: "Frozen", label: "Frozen", icon: Snowflake },
]

const PRODUCTS: Product[] = [
  { id: "p1", name: "Organic Hass Avocados", category: "Produce", price: "$4.49", unit: "bag of 4", tag: "Organic", rating: 4.8, bg: "bg-primary/10" },
  { id: "p2", name: "Vine Tomatoes", category: "Produce", price: "$2.99", unit: "per lb", rating: 4.6, bg: "bg-secondary" },
  { id: "p3", name: "Baby Spinach", category: "Produce", price: "$3.29", unit: "5 oz", tag: "Fresh", rating: 4.7, bg: "bg-accent" },
  { id: "p4", name: "Whole Milk", category: "Dairy", price: "$3.79", unit: "1 gal", rating: 4.9, bg: "bg-secondary" },
  { id: "p5", name: "Greek Yogurt", category: "Dairy", price: "$5.49", unit: "32 oz", tag: "High Protein", rating: 4.8, bg: "bg-primary/10" },
  { id: "p6", name: "Aged Cheddar Block", category: "Dairy", price: "$6.99", unit: "8 oz", rating: 4.7, bg: "bg-accent" },
  { id: "p7", name: "Sourdough Loaf", category: "Bakery", price: "$4.99", unit: "each", tag: "Baked Today", rating: 4.9, bg: "bg-primary/10" },
  { id: "p8", name: "Butter Croissants", category: "Bakery", price: "$5.29", unit: "pack of 4", rating: 4.6, bg: "bg-secondary" },
  { id: "p9", name: "Sea Salt Bagels", category: "Bakery", price: "$3.99", unit: "pack of 6", rating: 4.5, bg: "bg-accent" },
  { id: "p10", name: "Extra Virgin Olive Oil", category: "Pantry", price: "$9.99", unit: "500 ml", tag: "Best Seller", rating: 4.9, bg: "bg-secondary" },
  { id: "p11", name: "Whole Grain Pasta", category: "Pantry", price: "$2.49", unit: "16 oz", rating: 4.4, bg: "bg-accent" },
  { id: "p12", name: "Wildflower Honey", category: "Pantry", price: "$7.49", unit: "12 oz", tag: "Raw", rating: 4.8, bg: "bg-primary/10" },
  { id: "p13", name: "Frozen Berry Mix", category: "Frozen", price: "$5.99", unit: "16 oz", rating: 4.6, bg: "bg-primary/10" },
  { id: "p14", name: "Stone-Baked Pizza", category: "Frozen", price: "$6.49", unit: "each", tag: "New", rating: 4.5, bg: "bg-secondary" },
  { id: "p15", name: "Sweet Corn Cobs", category: "Frozen", price: "$4.29", unit: "pack of 4", rating: 4.7, bg: "bg-accent" },
]

const PERKS = [
  { icon: Truck, title: "Free 1-hour delivery", desc: "On orders over $35, right to your door." },
  { icon: Leaf, title: "Farm-fresh, daily", desc: "Sourced from local growers every morning." },
  { icon: ShieldCheck, title: "Freshness guarantee", desc: "Not happy? We refund it, no questions." },
]

export default function GroceryDeliveryTemplate() {
  const [active, setActive] = React.useState<Category>("All")
  const [cartCount, setCartCount] = React.useState(2)
  const [added, setAdded] = React.useState<Record<string, number>>({})

  const visible = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)

  function addToCart(id: string) {
    setCartCount((c) => c + 1)
    setAdded((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  function removeFromCart(id: string) {
    setAdded((prev) => {
      const current = prev[id] || 0
      if (current <= 0) return prev
      setCartCount((c) => Math.max(0, c - 1))
      return { ...prev, [id]: current - 1 }
    })
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">FreshCart</span>
          </a>

          <button className="ml-2 hidden items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-foreground">Deliver to</span>
            <span className="font-medium text-foreground">221B Baker St</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="relative ml-auto hidden flex-1 max-w-md lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search milk, bread, snacks..." className="pl-9" aria-label="Search products" />
          </div>

          <Button variant="outline" className="relative ml-auto gap-2 lg:ml-0" aria-label="Open cart">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <Badge className="absolute -right-2 -top-2 h-5 min-w-5 justify-center rounded-full px-1.5 tabular-nums">
              {cartCount}
            </Badge>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1">
                <Clock className="h-3.5 w-3.5" />
                Delivery in as little as 30 min
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Groceries, fresh at your door.
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Shop thousands of farm-fresh products and get them delivered the same day. Skip the lines, keep the freshness.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" className="gap-2">
                  Start shopping
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Browse weekly deals
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {PERKS.map((perk) => (
                  <div key={perk.title} className="flex flex-col gap-1">
                    <perk.icon className="h-5 w-5 text-primary" />
                    <p className="text-sm font-medium leading-tight">{perk.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-accent to-secondary p-8">
              <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <div key={p.id} className="rounded-xl bg-card p-4 shadow-sm">
                    <div className={cn("mb-3 flex h-20 items-center justify-center rounded-lg", p.bg)}>
                      <Leaf className="h-8 w-8 text-primary" />
                    </div>
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15">
                <Tag className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Weekend Fresh Sale — up to 30% off produce</p>
                <p className="text-sm text-primary-foreground/80">Use code FRESH30 at checkout. Ends Sunday.</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Shop the sale
            </Button>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Shop by category</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {visible.length} products in {active === "All" ? "all categories" : active}
              </p>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-muted"
                  )}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visible.map((product) => {
              const qty = added[product.id] || 0
              return (
                <div
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                >
                  <div className={cn("relative flex h-32 items-center justify-center", product.bg)}>
                    {product.tag ? (
                      <Badge className="absolute left-2 top-2" variant="default">
                        {product.tag}
                      </Badge>
                    ) : null}
                    <button
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:text-destructive"
                      aria-label={"Save " + product.name}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <Leaf className="h-10 w-10 text-primary/70" />
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="tabular-nums">{product.rating.toFixed(1)}</span>
                      <span className="ml-auto rounded bg-muted px-1.5 py-0.5">{product.category}</span>
                    </div>
                    <p className="text-sm font-medium leading-snug">{product.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{product.unit}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="font-semibold tabular-nums">{product.price}</span>
                      {qty === 0 ? (
                        <Button size="sm" className="h-8 gap-1 px-3" onClick={() => addToCart(product.id)}>
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      ) : (
                        <div className="flex items-center gap-1 rounded-md border">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(product.id)}
                            aria-label={"Remove one " + product.name}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-5 text-center text-sm font-medium tabular-nums">{qty}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => addToCart(product.id)}
                            aria-label={"Add another " + product.name}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
            {PERKS.map((perk) => (
              <div key={perk.title} className="rounded-xl border bg-card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <perk.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-semibold">{perk.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="grid items-center gap-6 p-8 md:grid-cols-2 lg:p-12">
              <div>
                <Badge variant="outline" className="mb-3">Membership</Badge>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Go FreshCart+ for free delivery, every order.
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Unlimited free delivery, exclusive member prices, and early access to seasonal produce — all for one low monthly fee.
                </p>
                <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                  <Input type="email" placeholder="you@email.com" aria-label="Email address" className="sm:max-w-xs" />
                  <Button type="submit">Join FreshCart+</Button>
                </form>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-primary/15 to-accent p-8">
                <ul className="space-y-3">
                  {["Free delivery on every order", "Member-only weekly deals", "Priority same-day slots", "Cancel anytime"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Leaf className="h-5 w-5" />
                </span>
                <span className="text-lg tracking-tight">FreshCart</span>
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Fresh groceries delivered to your door in under an hour. Local, sustainable, always fresh.
              </p>
            </div>
            {[
              { title: "Shop", links: ["Produce", "Dairy", "Bakery", "Pantry", "Frozen"] },
              { title: "Company", links: ["About us", "Careers", "Sustainability", "Press"] },
              { title: "Support", links: ["Help center", "Delivery areas", "Returns", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold">{col.title}</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition-colors hover:text-foreground">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>2024 FreshCart Markets, Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
