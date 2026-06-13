"use client"

import * as React from "react"
import {
  ChevronRight,
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingBag,
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
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const BREADCRUMB = ["Home", "Footwear", "Running", "Trailblazer Pro"]

const THUMBS = [
  "Front view",
  "Side profile",
  "Sole detail",
  "Top angle",
  "Packaging",
]

const SIZES = ["6", "7", "8", "9", "10", "11", "12"]
const UNAVAILABLE_SIZES = ["6", "12"]

const COLORS = [
  { name: "Slate", token: "bg-foreground" },
  { name: "Ember", token: "bg-primary" },
  { name: "Mist", token: "bg-muted-foreground" },
]

const HIGHLIGHTS = [
  { icon: Truck, label: "Free 2-day shipping" },
  { icon: RotateCcw, label: "60-day returns" },
  { icon: ShieldCheck, label: "2-year warranty" },
]

const RELATED = [
  { name: "Skyline Knit", price: "$128", rating: "4.7", badge: "New" },
  { name: "Cascade GTX", price: "$164", rating: "4.9", badge: "Best seller" },
  { name: "Drift Lite", price: "$96", rating: "4.5", badge: null },
  { name: "Summit Trail", price: "$172", rating: "4.8", badge: "Limited" },
]

const REVIEW_BARS = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 3 },
  { stars: 1, pct: 1 },
]

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i <= value
              ? "fill-primary text-primary"
              : "fill-muted text-muted-foreground/40"
          )}
        />
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const [activeThumb, setActiveThumb] = React.useState(0)
  const [size, setSize] = React.useState<string | null>("9")
  const [color, setColor] = React.useState(0)
  const [qty, setQty] = React.useState(1)
  const [wishlisted, setWishlisted] = React.useState(false)
  const [added, setAdded] = React.useState(false)

  function handleAddToCart() {
    if (!size) return
    setAdded(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
              <ShoppingBag className="size-4" />
            </span>
            Stride
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#">Men</a>
            <a className="transition-colors hover:text-foreground" href="#">Women</a>
            <a className="transition-colors hover:text-foreground" href="#">Trail</a>
            <a className="transition-colors hover:text-foreground" href="#">Sale</a>
          </nav>
          <Button variant="outline" size="sm" aria-label="View cart">
            <ShoppingBag className="size-4" />
            <span className="hidden sm:inline">Cart (2)</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            {BREADCRUMB.map((crumb, i) => (
              <li key={crumb} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3.5" />}
                <span
                  className={cn(
                    i === BREADCRUMB.length - 1 && "font-medium text-foreground"
                  )}
                >
                  {crumb}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {THUMBS.map((thumb, i) => (
                <button
                  key={thumb}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  aria-label={`Show ${thumb}`}
                  aria-pressed={activeThumb === i}
                  className={cn(
                    "grid size-16 shrink-0 place-items-center rounded-lg border bg-muted/30 text-[10px] text-muted-foreground transition-colors",
                    activeThumb === i
                      ? "border-primary ring-2 ring-ring"
                      : "hover:border-foreground/30"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="relative flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-2xl border bg-muted/30">
              <Badge className="absolute left-4 top-4" variant="secondary">
                {THUMBS[activeThumb]}
              </Badge>
              <span className="text-sm text-muted-foreground">Product image {activeThumb + 1}</span>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <Badge variant="outline" className="mb-3">Trail series</Badge>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Trailblazer Pro
                </h1>
              </div>
              <Button
                variant="outline"
                size="icon"
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={wishlisted}
                onClick={() => setWishlisted((w) => !w)}
              >
                <Heart className={cn("size-4", wishlisted && "fill-primary text-primary")} />
              </Button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <Stars value={5} />
              <span className="text-sm text-muted-foreground">4.8 · 1,204 reviews</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">$148</span>
              <span className="text-lg text-muted-foreground line-through">$190</span>
              <Badge>22% off</Badge>
            </div>

            <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground">
              A responsive trail runner built for long distances on mixed terrain.
              Featherlight knit upper, a grippy lugged outsole, and a carbon-infused
              plate for effortless propulsion.
            </p>

            <Separator className="my-6" />

            {/* Color */}
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm text-muted-foreground">{COLORS[color].name}</span>
              </div>
              <div className="flex gap-3">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(i)}
                    aria-label={`Select color ${c.name}`}
                    aria-pressed={color === i}
                    className={cn(
                      "grid size-9 place-items-center rounded-full border transition-all",
                      color === i ? "border-primary ring-2 ring-ring" : "hover:border-foreground/40"
                    )}
                  >
                    <span className={cn("size-6 rounded-full", c.token)} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium">Size</span>
                <a href="#" className="text-sm text-primary hover:underline">Size guide</a>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {SIZES.map((s) => {
                  const disabled = UNAVAILABLE_SIZES.includes(s)
                  return (
                    <button
                      key={s}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSize(s)}
                      aria-pressed={size === s}
                      className={cn(
                        "h-11 rounded-md border text-sm font-medium transition-colors",
                        disabled &&
                          "cursor-not-allowed text-muted-foreground/40 line-through",
                        !disabled && size === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : !disabled && "hover:border-foreground/40"
                      )}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="inline-flex h-11 items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">{qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-11"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1"
                disabled={!size}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="size-4" /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    {size ? "Add to cart" : "Select a size"}
                  </>
                )}
              </Button>
            </div>

            {/* Highlights */}
            <div className="mt-6 grid grid-cols-1 gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex items-center gap-2 text-sm">
                  <h.icon className="size-4 text-primary" />
                  <span>{h.label}</span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-6" defaultValue="details">
              <AccordionItem value="details">
                <AccordionTrigger>Product details</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Engineered knit upper with a seamless toe box, EVA midsole, and a
                  4mm lugged rubber outsole. Weighs 248g in a US 9. Heel-to-toe drop
                  of 8mm.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger>Materials &amp; care</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Upper made from 60% recycled polyester. Spot clean with cold water
                  and a soft brush. Air dry away from direct heat. Do not machine wash.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping &amp; returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Free standard shipping on orders over $75. Express options available
                  at checkout. Unworn items can be returned within 60 days for a full
                  refund.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Reviews summary */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold tracking-tight">Customer reviews</h2>
          <div className="mt-6 grid gap-8 rounded-2xl border bg-card p-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex flex-col items-center justify-center gap-1 sm:pr-8">
              <span className="text-5xl font-semibold">4.8</span>
              <Stars value={5} />
              <span className="text-sm text-muted-foreground">1,204 reviews</span>
            </div>
            <div className="space-y-2">
              {REVIEW_BARS.map((bar) => (
                <div key={bar.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-12 shrink-0 text-muted-foreground">{bar.stars} star</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right tabular-nums text-muted-foreground">
                    {bar.pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related products */}
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">You might also like</h2>
            <Button variant="link" className="px-0">View all</Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {RELATED.map((p) => (
              <Card key={p.name} className="group overflow-hidden pt-0">
                <div className="relative flex aspect-square items-center justify-center bg-muted/30">
                  {p.badge && (
                    <Badge className="absolute left-3 top-3" variant="secondary">
                      {p.badge}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{p.name}</span>
                </div>
                <CardContent className="px-4">
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-primary text-primary" />
                    {p.rating}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between px-4">
                  <span className="text-sm font-semibold">{p.price}</span>
                  <Button variant="outline" size="sm" aria-label={`Add ${p.name} to cart`}>
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span>© 2024 Stride. All rights reserved.</span>
          <nav className="flex items-center gap-6">
            <a className="transition-colors hover:text-foreground" href="#">Privacy</a>
            <a className="transition-colors hover:text-foreground" href="#">Terms</a>
            <a className="transition-colors hover:text-foreground" href="#">Support</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
