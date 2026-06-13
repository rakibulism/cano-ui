"use client"

import * as React from "react"
import {
  ArrowRight,
  Armchair,
  BedDouble,
  Hammer,
  Leaf,
  Menu,
  Minus,
  Plus,
  Recycle,
  Search,
  ShoppingBag,
  Sofa,
  Star,
  Truck,
  TreePine,
  Utensils,
  X,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = [
  { label: "Rooms", href: "#rooms" },
  { label: "Shop", href: "#shop" },
  { label: "Materials", href: "#materials" },
  { label: "Reviews", href: "#reviews" },
]

const ROOMS = [
  { icon: Sofa, name: "Living Room", count: "84 pieces" },
  { icon: BedDouble, name: "Bedroom", count: "61 pieces" },
  { icon: Utensils, name: "Dining", count: "47 pieces" },
  { icon: Armchair, name: "Workspace", count: "39 pieces" },
]

const COLLECTIONS = ["All", "Seating", "Tables", "Storage", "Lighting"] as const

const PRODUCTS = [
  { name: "Halden Lounge Chair", category: "Seating", price: 690, material: "Oak + Boucle", badge: "New", rating: 4.9 },
  { name: "Marlow Three-Seat Sofa", category: "Seating", price: 1840, material: "Linen Weave", badge: "Bestseller", rating: 4.8 },
  { name: "Pell Dining Table", category: "Tables", price: 1120, material: "Solid Walnut", badge: null, rating: 4.7 },
  { name: "Aro Coffee Table", category: "Tables", price: 430, material: "Ash + Stone", badge: null, rating: 4.6 },
  { name: "Nest Sideboard", category: "Storage", price: 980, material: "Birch Ply", badge: "New", rating: 4.9 },
  { name: "Loft Bookshelf", category: "Storage", price: 760, material: "FSC Pine", badge: null, rating: 4.5 },
  { name: "Soma Arc Floor Lamp", category: "Lighting", price: 320, material: "Brushed Brass", badge: null, rating: 4.8 },
  { name: "Bask Pendant Light", category: "Lighting", price: 210, material: "Rattan", badge: "Bestseller", rating: 4.7 },
]

const SUSTAINABILITY = [
  { icon: TreePine, title: "FSC-certified timber", text: "Every frame is built from responsibly forested hardwood, traceable to the source." },
  { icon: Recycle, title: "Recycled fills & foams", text: "Cushions use CertiPUR foam blended with reclaimed fibers, never virgin plastics." },
  { icon: Hammer, title: "Built to be repaired", text: "Modular joinery and a 15-year frame warranty keep pieces out of landfill." },
]

const REVIEWS = [
  { name: "Priya Anand", room: "Marlow Sofa", quote: "The linen is even better in person and it arrived two days early. Genuinely the comfiest sofa we have owned.", initials: "PA" },
  { name: "Daniel Roe", room: "Pell Dining Table", quote: "You can feel the difference solid walnut makes. It has become the heart of every dinner we host.", initials: "DR" },
  { name: "Mei Lin", room: "Halden Chair", quote: "Sustainable, beautiful, and the assembly took ten minutes. Telling all my friends about this shop.", initials: "ML" },
]

function formatPrice(value: number) {
  return "$" + value.toLocaleString("en-US")
}

export default function FurnitureStore() {
  const [activeCollection, setActiveCollection] = React.useState<(typeof COLLECTIONS)[number]>("All")
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [cartCount, setCartCount] = React.useState(2)

  const visibleProducts =
    activeCollection === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCollection)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sofa className="h-4 w-4" />
            </span>
            <span className="text-lg">Maker & Grain</span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search" className="hidden sm:inline-flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open cart"
              className="relative"
              onClick={() => setCartCount((c) => c + 1)}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            </Button>
            <Button className="hidden md:inline-flex">Book a showroom visit</Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              className="md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t px-4 py-3 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Editorial hero */}
        <section className="border-b">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center md:py-24 lg:px-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5">
                <Leaf className="h-3.5 w-3.5" />
                Spring 2024 Collection
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Furniture made to be
                <span className="text-primary"> lived in</span>, not replaced.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                Honest materials, slow craftsmanship, and a fifteen-year frame warranty.
                Pieces designed for the long, ordinary, beautiful life of a home.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Shop the collection
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Order free swatches
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Free white-glove delivery
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  4.8 / 5 from 6,200 homes
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border bg-muted">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-accent">
                  <Armchair className="h-24 w-24 text-muted-foreground/40" aria-hidden="true" />
                </div>
              </div>
              <Card className="absolute -bottom-6 -left-6 hidden w-56 sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <TreePine className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">12,400 trees</p>
                    <p className="text-xs text-muted-foreground">replanted in 2023</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Room category tiles */}
        <section id="rooms" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Shop by room</h2>
                <p className="mt-1 text-muted-foreground">Start where you spend your time.</p>
              </div>
              <a href="#shop" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
                View everything
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {ROOMS.map((room) => (
                <a
                  key={room.name}
                  href="#shop"
                  className="group flex flex-col justify-between rounded-xl border bg-card p-5 transition-colors hover:border-primary"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <room.icon className="h-6 w-6" />
                  </span>
                  <div className="mt-10">
                    <p className="font-medium">{room.name}</p>
                    <p className="text-sm text-muted-foreground">{room.count}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products grid */}
        <section id="shop" className="border-b">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured pieces</h2>
                <p className="mt-1 text-muted-foreground">Hand-finished and ready to ship.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {COLLECTIONS.map((collection) => (
                  <Button
                    key={collection}
                    size="sm"
                    variant={activeCollection === collection ? "default" : "outline"}
                    onClick={() => setActiveCollection(collection)}
                  >
                    {collection}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <Card key={product.name} className="group overflow-hidden pt-0">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-accent">
                      <Sofa className="h-14 w-14 text-muted-foreground/30" aria-hidden="true" />
                    </div>
                    {product.badge && (
                      <Badge className="absolute left-3 top-3" variant={product.badge === "New" ? "default" : "secondary"}>
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="space-y-1.5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.material}</p>
                    <h3 className="font-medium leading-tight">{product.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setCartCount((c) => c + 1)}>
                      <Plus className="h-3.5 w-3.5" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Materials / sustainability band */}
        <section id="materials" className="border-b bg-primary/5">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="gap-1.5 border-primary/40 text-primary">
                <Recycle className="h-3.5 w-3.5" />
                Made responsibly
              </Badge>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                What goes into every piece
              </h2>
              <p className="mt-2 text-muted-foreground">
                Materials you can trace, joinery you can repair, and a footprint we work hard to shrink.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {SUSTAINABILITY.map((item) => (
                <div key={item.title} className="rounded-xl border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-medium">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
            <Separator className="my-10" />
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
              {[
                { value: "100%", label: "FSC hardwood" },
                { value: "15 yr", label: "Frame warranty" },
                { value: "0", label: "Plastic packaging" },
                { value: "6,200+", label: "Homes furnished" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold tracking-tight text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="border-b">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Loved in real homes</h2>
              <div className="mt-2 flex items-center justify-center gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">4.8 average from 6,200 reviews</span>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {REVIEWS.map((review) => (
                <Card key={review.name}>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">&ldquo;{review.quote}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-2">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{review.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{review.name}</p>
                        <p className="text-xs text-muted-foreground">Verified buyer &middot; {review.room}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Leaf className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Join the workshop list
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Early access to new pieces, restock alerts, and the occasional behind-the-scenes
              from our makers. No more than twice a month.
            </p>
            <form
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input type="email" placeholder="you@example.com" aria-label="Email address" className="bg-background" />
              <Button type="submit" className="gap-2">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              We send useful things and never share your address.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="space-y-3">
              <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Sofa className="h-4 w-4" />
                </span>
                Maker & Grain
              </a>
              <p className="max-w-xs text-sm text-muted-foreground">
                Solid-wood furniture for the long life of a home. Designed in Portland, built to last.
              </p>
            </div>
            {[
              { title: "Shop", links: ["Seating", "Tables", "Storage", "Lighting"] },
              { title: "Company", links: ["Our makers", "Sustainability", "Showrooms", "Careers"] },
              { title: "Support", links: ["Delivery", "Returns", "Warranty", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#shop" className="text-sm text-muted-foreground hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; 2024 Maker & Grain. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#top" className="hover:text-foreground">Privacy</a>
              <a href="#top" className="hover:text-foreground">Terms</a>
              <a href="#top" className="hover:text-foreground">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
