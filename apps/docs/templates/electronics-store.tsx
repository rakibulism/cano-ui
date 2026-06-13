"use client"

import * as React from "react"
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  CreditCard,
  Smartphone,
  Laptop,
  Watch,
  Camera,
  Gamepad2,
  Speaker,
  ArrowRight,
  Zap,
  Mail,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = ["Deals", "Laptops", "Phones", "Audio", "Gaming", "Support"]

const COUNTDOWN = [
  { value: "02", label: "Days" },
  { value: "14", label: "Hours" },
  { value: "37", label: "Mins" },
  { value: "09", label: "Secs" },
]

const CATEGORIES = [
  { name: "Smartphones", count: 184, icon: Smartphone },
  { name: "Laptops", count: 96, icon: Laptop },
  { name: "Wearables", count: 73, icon: Watch },
  { name: "Cameras", count: 58, icon: Camera },
  { name: "Gaming", count: 142, icon: Gamepad2 },
  { name: "Audio", count: 211, icon: Speaker },
]

const PRODUCTS = [
  {
    id: "p1",
    name: "Aurora Pro 15 Ultrabook",
    cat: "Laptops",
    price: 1299,
    was: 1499,
    rating: 4.8,
    reviews: 412,
    badge: "Best Seller",
    tone: "from-primary/20 to-primary/5",
  },
  {
    id: "p2",
    name: "Pulse Buds Wireless ANC",
    cat: "Audio",
    price: 149,
    was: 199,
    rating: 4.7,
    reviews: 1284,
    badge: "-25%",
    tone: "from-accent to-muted",
  },
  {
    id: "p3",
    name: "Nova X9 5G Smartphone",
    cat: "Phones",
    price: 899,
    was: 999,
    rating: 4.9,
    reviews: 738,
    badge: "New",
    tone: "from-secondary to-muted",
  },
  {
    id: "p4",
    name: "Vortex Pro Mechanical Keyboard",
    cat: "Gaming",
    price: 119,
    was: 159,
    rating: 4.6,
    reviews: 523,
    badge: "-25%",
    tone: "from-muted to-accent",
  },
  {
    id: "p5",
    name: "Zenith Smartwatch Series 6",
    cat: "Wearables",
    price: 329,
    was: 399,
    rating: 4.5,
    reviews: 290,
    badge: "Hot",
    tone: "from-primary/15 to-muted",
  },
  {
    id: "p6",
    name: "Lumix 4K Mirrorless Camera",
    cat: "Cameras",
    price: 749,
    was: 849,
    rating: 4.8,
    reviews: 167,
    badge: "Best Seller",
    tone: "from-accent to-secondary",
  },
  {
    id: "p7",
    name: "BassWave Portable Speaker",
    cat: "Audio",
    price: 79,
    was: 99,
    rating: 4.4,
    reviews: 940,
    badge: "-20%",
    tone: "from-muted to-primary/10",
  },
  {
    id: "p8",
    name: "Quantum Console Edition One",
    cat: "Gaming",
    price: 499,
    was: 549,
    rating: 4.9,
    reviews: 2103,
    badge: "Hot",
    tone: "from-secondary to-accent",
  },
]

const FILTERS = ["All", "Laptops", "Phones", "Audio", "Gaming"]

const BRANDS = ["Aurora", "Nova", "Pulse", "Zenith", "Lumix", "Vortex"]

const PERKS = [
  { icon: Truck, title: "Free 2-Day Shipping", desc: "On orders over $99" },
  { icon: ShieldCheck, title: "2-Year Warranty", desc: "Every device covered" },
  { icon: Headphones, title: "Expert Support", desc: "Real humans, 24/7" },
  { icon: CreditCard, title: "Flexible Financing", desc: "0% APR available" },
]

export default function ElectronicsStore() {
  const [activeFilter, setActiveFilter] = React.useState("All")
  const [cartCount, setCartCount] = React.useState(3)
  const [wishlist, setWishlist] = React.useState<string[]>(["p3"])

  const visibleProducts =
    activeFilter === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.cat === activeFilter)

  const toggleWish = (id: string) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id]
    )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-sm">
          <Zap className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium">
            Mega Tech Sale — up to 40% off + free shipping over $99
          </span>
        </div>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <a href="#" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </span>
            <span className="text-lg">VoltMart</span>
          </a>

          <div className="relative ml-2 hidden flex-1 lg:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search 4,000+ products..."
              className="pl-9"
              aria-label="Search products"
            />
          </div>

          <div className="ml-auto hidden items-center gap-1 md:flex lg:ml-0">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href="#"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-1 md:ml-2">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Deal hero with countdown */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 lg:grid-cols-2 lg:py-16">
            <div>
              <Badge variant="secondary" className="mb-4">
                Deal of the Week
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Aurora Pro 15
                <span className="block text-primary">now $1,299</span>
              </h1>
              <p className="mt-4 max-w-md text-muted-foreground">
                The flagship ultrabook with a 15&quot; OLED display, 32GB RAM and
                all-day battery. Save $200 before the timer hits zero.
              </p>

              <div className="mt-6 flex gap-3">
                {COUNTDOWN.map((c) => (
                  <div
                    key={c.label}
                    className="flex w-16 flex-col items-center rounded-lg border bg-card py-3"
                  >
                    <span className="text-2xl font-bold tabular-nums">
                      {c.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {c.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  onClick={() => setCartCount((c) => c + 1)}
                >
                  Add to Cart
                  <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View Details
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-accent" />
              <Card className="absolute -bottom-4 left-4 w-44 shadow-lg">
                <CardContent className="flex items-center gap-3 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Fast charge</p>
                    <p className="text-xs text-muted-foreground">
                      60% in 30 min
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Category tiles */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Shop by category
            </h2>
            <a
              href="#"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              All categories <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <a
                key={c.name}
                href="#"
                className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center transition-colors hover:border-primary hover:bg-accent"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <c.icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground">
                  {c.count} items
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Best-sellers grid */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Best sellers
                </h2>
                <p className="text-sm text-muted-foreground">
                  Top-rated gear our customers love
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={activeFilter === f ? "default" : "outline"}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((p) => {
                const wished = wishlist.includes(p.id)
                return (
                  <Card
                    key={p.id}
                    className="group overflow-hidden p-0 transition-shadow hover:shadow-md"
                  >
                    <div
                      className={cn(
                        "relative aspect-square bg-gradient-to-br",
                        p.tone
                      )}
                    >
                      <Badge className="absolute left-3 top-3">{p.badge}</Badge>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-3 top-3 h-8 w-8 rounded-full"
                        aria-label={
                          wished ? "Remove from wishlist" : "Add to wishlist"
                        }
                        onClick={() => toggleWish(p.id)}
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            wished && "fill-primary text-primary"
                          )}
                        />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {p.cat}
                      </p>
                      <h3 className="mt-1 line-clamp-1 font-semibold">
                        {p.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-3.5 w-3.5",
                                i < Math.round(p.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/40"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {p.rating} ({p.reviews})
                        </span>
                      </div>
                      <div className="mt-3 flex items-end justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold tabular-nums">
                            ${p.price}
                          </span>
                          <span className="text-sm text-muted-foreground line-through tabular-nums">
                            ${p.was}
                          </span>
                        </div>
                        <Button
                          size="icon"
                          className="h-8 w-8"
                          aria-label={`Add ${p.name} to cart`}
                          onClick={() => setCartCount((c) => c + 1)}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="flex items-center gap-4 rounded-xl border bg-card p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <perk.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">{perk.title}</p>
                  <p className="text-sm text-muted-foreground">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand logos */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-10">
            <p className="mb-6 text-center text-sm uppercase tracking-widest text-muted-foreground">
              Trusted brands we carry
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {BRANDS.map((b) => (
                <span
                  key={b}
                  className="text-xl font-bold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-7xl px-4 py-14">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-md">
                <div className="mb-3 flex items-center justify-center gap-2 lg:justify-start">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Insider deals
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Save an extra 10% on your first order
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Join 80,000+ subscribers and get early access to flash sales,
                  restocks and price-drop alerts.
                </p>
              </div>
              <form
                className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="bg-background"
                />
                <Button type="submit" className="shrink-0">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-2 font-bold">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Zap className="h-5 w-5" />
                </span>
                <span className="text-lg">VoltMart</span>
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Your go-to electronics store for the latest tech at unbeatable
                prices.
              </p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold">Shop</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Laptops", "Phones", "Audio", "Gaming"].map((x) => (
                  <li key={x}>
                    <a href="#" className="hover:text-foreground">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold">Support</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Track Order", "Returns", "Warranty", "Contact"].map((x) => (
                  <li key={x}>
                    <a href="#" className="hover:text-foreground">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold">Company</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["About", "Careers", "Press", "Privacy"].map((x) => (
                  <li key={x}>
                    <a href="#" className="hover:text-foreground">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 VoltMart Inc. All rights reserved.</p>
            <p>Secure checkout · Free returns within 30 days</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
