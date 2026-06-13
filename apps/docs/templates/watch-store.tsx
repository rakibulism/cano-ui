"use client"
import * as React from "react"
import {
  Watch,
  ShoppingBag,
  Heart,
  Menu,
  Search,
  Gem,
  ShieldCheck,
  Hammer,
  Truck,
  ArrowRight,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type Collection = "All" | "Dress" | "Dive" | "Chrono" | "Smart"

const COLLECTIONS: Collection[] = ["All", "Dress", "Dive", "Chrono", "Smart"]

type WatchProduct = {
  id: number
  name: string
  reference: string
  collection: Exclude<Collection, "All">
  price: number
  movement: string
  tag?: string
}

const PRODUCTS: WatchProduct[] = [
  { id: 1, name: "Celeste Ultra-Thin", reference: "REF. CL-1842", collection: "Dress", price: 8450, movement: "Automatic", tag: "New" },
  { id: 2, name: "Abyss Seamaster 300", reference: "REF. AB-3000", collection: "Dive", price: 6900, movement: "Automatic" },
  { id: 3, name: "Velocity Racing Chrono", reference: "REF. VC-7700", collection: "Chrono", price: 9750, movement: "Chronograph", tag: "Limited" },
  { id: 4, name: "Aurum Connected", reference: "REF. AU-S1", collection: "Smart", price: 1290, movement: "Quartz Hybrid" },
  { id: 5, name: "Noir Tonneau", reference: "REF. NT-0099", collection: "Dress", price: 12400, movement: "Manual" },
  { id: 6, name: "Trench Diver Pro", reference: "REF. TD-600", collection: "Dive", price: 5300, movement: "Automatic", tag: "Best seller" },
  { id: 7, name: "Tachy Panda Chrono", reference: "REF. TP-1969", collection: "Chrono", price: 7150, movement: "Chronograph" },
  { id: 8, name: "Lumen Smart Classic", reference: "REF. LS-200", collection: "Smart", price: 980, movement: "Quartz Hybrid" },
]

const CRAFT = [
  {
    icon: Hammer,
    title: "Hand-finished movements",
    body: "Every caliber is assembled and regulated by a single master watchmaker over 60 hours.",
  },
  {
    icon: Gem,
    title: "Sapphire & solid gold",
    body: "Scratch-resistant sapphire crystal and ethically sourced 18k cases on flagship pieces.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime guarantee",
    body: "A complimentary service and authenticity guarantee that travels with the watch forever.",
  },
]

const formatPrice = (n: number) =>
  "$" + n.toLocaleString("en-US")

export default function WatchStore() {
  const [active, setActive] = React.useState<Collection>("All")
  const [wishlist, setWishlist] = React.useState<number[]>([3])

  const visible = React.useMemo(
    () => (active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.collection === active)),
    [active]
  )

  const toggleWish = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <a href="#" className="flex items-center gap-2">
            <Watch className="size-6 text-primary" />
            <span className="text-lg font-semibold tracking-[0.18em] uppercase">Méridien</span>
          </a>
          <nav className="ml-6 hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#collection" className="transition-colors hover:text-foreground">Collections</a>
            <a href="#craft" className="transition-colors hover:text-foreground">Craftsmanship</a>
            <a href="#" className="transition-colors hover:text-foreground">Heritage</a>
            <a href="#" className="transition-colors hover:text-foreground">Boutiques</a>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Wishlist">
              <Heart className={cn("size-5", wishlist.length > 0 && "fill-current text-primary")} />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label="Shopping bag">
              <ShoppingBag className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                2
              </span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
            <div className="space-y-6">
              <Badge variant="outline" className="tracking-widest uppercase">Flagship · 2026</Badge>
              <h1 className="text-4xl font-light leading-tight tracking-tight sm:text-5xl md:text-6xl">
                The Celeste <span className="font-semibold">Ultra-Thin</span>
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                3.2mm of relentless precision. A hand-wound caliber housed in a case so slim it
                disappears beneath the cuff.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2">
                  Discover the piece <ArrowRight className="size-4" />
                </Button>
                <Button size="lg" variant="outline">Book a viewing</Button>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Truck className="size-4" /> Insured worldwide delivery</span>
                <span className="flex items-center gap-2"><ShieldCheck className="size-4" /> 5-year warranty</span>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto flex aspect-square max-w-sm items-center justify-center rounded-full border bg-card shadow-sm">
                <div className="flex aspect-square w-3/4 items-center justify-center rounded-full border border-primary/20 bg-background">
                  <Watch className="size-28 text-primary md:size-36" strokeWidth={0.9} />
                </div>
              </div>
              <Card className="absolute bottom-2 left-2 w-44 sm:bottom-6 sm:-left-2">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Starting at</p>
                  <p className="text-xl font-semibold">{formatPrice(8450)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Manual · 18k rose gold</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Collection + filters */}
        <section id="collection" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-light tracking-tight">The Collection</h2>
              <p className="mt-2 text-muted-foreground">
                Mechanical artistry across four distinct families.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLLECTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    active === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => {
              const wished = wishlist.includes(p.id)
              return (
                <Card key={p.id} className="group overflow-hidden pt-0">
                  <div className="relative flex aspect-square items-center justify-center bg-muted/40">
                    {p.tag && (
                      <Badge className="absolute left-3 top-3" variant="secondary">{p.tag}</Badge>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleWish(p.id)}
                      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                      aria-pressed={wished}
                      className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border bg-background/80 backdrop-blur transition-colors hover:bg-background"
                    >
                      <Heart className={cn("size-4", wished ? "fill-current text-primary" : "text-muted-foreground")} />
                    </button>
                    <Watch className="size-20 text-foreground/70 transition-transform duration-300 group-hover:scale-105" strokeWidth={1} />
                  </div>
                  <CardContent className="px-5">
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">{p.collection}</p>
                    <h3 className="mt-1 font-medium">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.reference} · {p.movement}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between px-5">
                    <span className="text-lg font-semibold tabular-nums">{formatPrice(p.price)}</span>
                    <Button size="sm" variant="outline">Add to bag</Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
          {visible.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No pieces in this collection yet.</p>
          )}
        </section>

        {/* Craftsmanship */}
        <section id="craft" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <div className="max-w-2xl">
              <Badge variant="outline" className="tracking-widest uppercase">Savoir-faire</Badge>
              <h2 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl">
                Built to be inherited
              </h2>
              <p className="mt-3 text-muted-foreground">
                In our atelier, time is not measured in days but in the patience each movement demands.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {CRAFT.map((item) => (
                <div key={item.title} className="space-y-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
            <Separator className="my-12" />
            <figure className="mx-auto max-w-3xl text-center">
              <div className="mb-4 flex justify-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl font-light leading-relaxed sm:text-2xl">
                “Wearing a Méridien is the closest thing to carrying a piece of the workshop on your wrist.”
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                Hugo Lefèvre · Collector since 2009
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <Card className="overflow-hidden">
            <CardContent className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div className="max-w-md space-y-2">
                <h2 className="text-2xl font-light tracking-tight">Join the waitlist</h2>
                <p className="text-muted-foreground">
                  Be the first to know when new limited references are released to private clients.
                </p>
              </div>
              <Button size="lg" className="gap-2">
                Request an invitation <ArrowRight className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Watch className="size-5 text-primary" />
                <span className="font-semibold tracking-[0.18em] uppercase">Méridien</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Independent Swiss watchmaking since 1921.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-medium">Collections</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#collection" className="hover:text-foreground">Dress</a></li>
                <li><a href="#collection" className="hover:text-foreground">Dive</a></li>
                <li><a href="#collection" className="hover:text-foreground">Chronograph</a></li>
                <li><a href="#collection" className="hover:text-foreground">Smart</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-medium">Service</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Warranty</a></li>
                <li><a href="#" className="hover:text-foreground">Servicing</a></li>
                <li><a href="#" className="hover:text-foreground">Authenticity</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-medium">Boutiques</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Geneva</li>
                <li>Paris</li>
                <li>Tokyo</li>
                <li>New York</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Méridien Manufacture. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
