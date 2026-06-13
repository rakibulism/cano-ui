"use client"

import * as React from "react"
import { Menu, ShoppingCart, Search, Heart, Frame, Truck, ShieldCheck, Sparkles, ArrowRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Collection = "All" | "Abstract" | "Photography" | "Typography" | "Minimal"

const COLLECTIONS: Collection[] = ["All", "Abstract", "Photography", "Typography", "Minimal"]

type Print = {
  id: string
  title: string
  artist: string
  collection: Exclude<Collection, "All">
  size: string
  price: number
  tone: string
}

const PRINTS: Print[] = [
  { id: "p1", title: "Coral Drift", artist: "M. Halvorsen", collection: "Abstract", size: "24 x 36 in", price: 89, tone: "bg-primary/20" },
  { id: "p2", title: "Dune Light", artist: "Selma Reyes", collection: "Photography", size: "18 x 24 in", price: 64, tone: "bg-secondary" },
  { id: "p3", title: "Quiet Type", artist: "O. Lindgren", collection: "Typography", size: "16 x 20 in", price: 52, tone: "bg-muted" },
  { id: "p4", title: "Form No. 7", artist: "Aria Bennett", collection: "Minimal", size: "24 x 30 in", price: 78, tone: "bg-accent" },
  { id: "p5", title: "Brushfield", artist: "M. Halvorsen", collection: "Abstract", size: "30 x 40 in", price: 118, tone: "bg-primary/10" },
  { id: "p6", title: "Harbor Fog", artist: "Selma Reyes", collection: "Photography", size: "24 x 36 in", price: 92, tone: "bg-muted/60" },
  { id: "p7", title: "Bold Serif", artist: "O. Lindgren", collection: "Typography", size: "18 x 24 in", price: 58, tone: "bg-secondary/70" },
  { id: "p8", title: "Negative Space", artist: "Aria Bennett", collection: "Minimal", size: "20 x 28 in", price: 70, tone: "bg-accent/70" },
  { id: "p9", title: "Spectrum Wash", artist: "Jun Park", collection: "Abstract", size: "36 x 48 in", price: 145, tone: "bg-primary/15" },
]

const FRAMING = [
  { name: "Natural Oak", desc: "Warm, light-grained wood for bright rooms.", add: 45 },
  { name: "Matte Black", desc: "Clean modern edge that frames any palette.", add: 45 },
  { name: "Gallery White", desc: "Minimal float frame with conservation glass.", add: 60 },
  { name: "Unframed Print", desc: "Archival giclée only, ready for your own frame.", add: 0 },
]

const PERKS = [
  { icon: Truck, label: "Free shipping over $120" },
  { icon: ShieldCheck, label: "Museum-grade archival inks" },
  { icon: Frame, label: "Hand-finished framing" },
]

export default function ArtPrintsStore() {
  const [active, setActive] = React.useState<Collection>("All")
  const [cart, setCart] = React.useState(2)

  const visible = React.useMemo(
    () => (active === "All" ? PRINTS : PRINTS.filter((p) => p.collection === active)),
    [active]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Frame className="size-4" />
            </span>
            <span className="text-lg">Paperplane</span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#gallery" className="transition-colors hover:text-foreground">Gallery</a>
            <a href="#framing" className="transition-colors hover:text-foreground">Framing</a>
            <a href="#" className="transition-colors hover:text-foreground">Artists</a>
            <a href="#" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="size-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label={`Cart, ${cart} items`}>
              <ShoppingCart className="size-5" />
              {cart > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {cart}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1">
                <Sparkles className="size-3" /> Spring drop is live
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Art prints that turn walls into galleries.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Limited-run giclée prints from independent artists, printed on heavyweight archival paper and framed by hand in our studio.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#gallery">
                    Shop the collection <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#framing">Explore framing</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {PERKS.map((perk) => (
                  <div key={perk.label} className="flex items-center gap-2">
                    <perk.icon className="size-4 text-primary" />
                    {perk.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-lg border bg-primary/15" aria-hidden="true" />
              <div className="mt-8 aspect-[3/4] rounded-lg border bg-accent" aria-hidden="true" />
              <div className="aspect-[3/4] rounded-lg border bg-secondary" aria-hidden="true" />
              <div className="mt-8 aspect-[3/4] rounded-lg border bg-muted" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="gallery" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">The print gallery</h2>
              <p className="mt-2 text-muted-foreground">{visible.length} works available in this collection.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {COLLECTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                  aria-pressed={active === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((print) => (
              <Card key={print.id} className="group overflow-hidden pt-0">
                <div className={cn("relative flex aspect-[4/5] items-center justify-center", print.tone)}>
                  <Badge variant="outline" className="absolute left-3 top-3 bg-background/80">
                    {print.collection}
                  </Badge>
                  <span className="text-sm font-medium text-muted-foreground">{print.title}</span>
                </div>
                <CardContent className="px-4">
                  <h3 className="font-medium">{print.title}</h3>
                  <p className="text-sm text-muted-foreground">by {print.artist}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{print.size}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between px-4">
                  <span className="text-lg font-semibold">${print.price}</span>
                  <Button size="sm" onClick={() => setCart((n) => n + 1)}>
                    <ShoppingCart className="size-4" /> Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-12 text-center text-muted-foreground">No prints in this collection yet.</p>
          )}
        </section>

        <section id="framing" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
            <div className="max-w-xl">
              <Badge variant="secondary" className="mb-3 gap-1">
                <Frame className="size-3" /> Framing studio
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">Choose how it hangs.</h2>
              <p className="mt-2 text-muted-foreground">
                Every print can ship ready-to-hang. Pick a hand-finished frame or take it bare and make it your own.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FRAMING.map((frame) => (
                <Card key={frame.name} className="h-full">
                  <CardContent className="flex h-full flex-col gap-3">
                    <div className="flex aspect-square items-center justify-center rounded-md border bg-background">
                      <Frame className="size-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{frame.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{frame.desc}</p>
                    </div>
                    <span className="mt-auto text-sm font-semibold">
                      {frame.add === 0 ? "Included" : `+ $${frame.add}`}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <Card className="overflow-hidden">
            <CardContent className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-12">
              <div className="flex items-start gap-4">
                <div className="flex gap-0.5 text-primary">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-5 fill-current" />
                  ))}
                </div>
                <div className="max-w-md">
                  <p className="text-lg font-medium leading-snug">
                    The print quality is unreal and the oak frame arrived flawless. It anchors the whole room.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">Priya N. — verified buyer, Coral Drift</p>
                </div>
              </div>
              <Button size="lg" variant="outline" asChild>
                <a href="#gallery">Find your print</a>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="border-t bg-primary/10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Get early access to new drops.</h2>
              <p className="mt-2 text-muted-foreground">One email a month. New artists, limited editions, and studio sales.</p>
            </div>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="you@email.com" aria-label="Email address" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                  <Frame className="size-4" />
                </span>
                Paperplane
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Independent art prints, printed and framed in our studio.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Shop</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#gallery" className="hover:text-foreground">All prints</a></li>
                <li><a href="#" className="hover:text-foreground">New arrivals</a></li>
                <li><a href="#" className="hover:text-foreground">Best sellers</a></li>
                <li><a href="#framing" className="hover:text-foreground">Framing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Studio</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Artists</a></li>
                <li><a href="#" className="hover:text-foreground">Our process</a></li>
                <li><a href="#" className="hover:text-foreground">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Support</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Shipping</a></li>
                <li><a href="#" className="hover:text-foreground">Returns</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Paperplane Print Co. All rights reserved.</p>
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
