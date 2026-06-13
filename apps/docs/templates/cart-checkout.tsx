"use client"

import * as React from "react"
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Tag,
  Lock,
  Truck,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type LineItem = {
  id: string
  name: string
  variant: string
  price: number
  qty: number
  initials: string
}

const INITIAL_ITEMS: LineItem[] = [
  { id: "lp-01", name: "Loop Pro Wireless Headphones", variant: "Graphite / Over-ear", price: 249, qty: 1, initials: "LP" },
  { id: "tm-02", name: "Tactile Mechanical Keyboard", variant: "Walnut / Brown switches", price: 159, qty: 2, initials: "TK" },
  { id: "cw-03", name: "Canvas Weekender Bag", variant: "Sand / 32L", price: 88, qty: 1, initials: "CW" },
]

const PROMOS: Record<string, { label: string; rate: number }> = {
  SAVE10: { label: "10% off order", rate: 0.1 },
  WELCOME15: { label: "15% off first order", rate: 0.15 },
}

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard", eta: "5–7 business days", cost: 0 },
  { id: "express", label: "Express", eta: "2–3 business days", cost: 12 },
  { id: "overnight", label: "Overnight", eta: "Next business day", cost: 28 },
]

const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function CartCheckout() {
  const [items, setItems] = React.useState<LineItem[]>(INITIAL_ITEMS)
  const [promoInput, setPromoInput] = React.useState("")
  const [appliedPromo, setAppliedPromo] = React.useState<string | null>(null)
  const [promoError, setPromoError] = React.useState<string | null>(null)
  const [shipping, setShipping] = React.useState("standard")
  const [placed, setPlaced] = React.useState(false)

  const setQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    )

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((it) => it.id !== id))

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0)
  const shippingCost =
    SHIPPING_OPTIONS.find((s) => s.id === shipping)?.cost ?? 0
  const discountRate = appliedPromo ? PROMOS[appliedPromo].rate : 0
  const discount = subtotal * discountRate
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shippingCost + tax
  const itemCount = items.reduce((sum, it) => sum + it.qty, 0)

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (PROMOS[code]) {
      setAppliedPromo(code)
      setPromoError(null)
    } else {
      setAppliedPromo(null)
      setPromoError("That code isn’t valid. Try SAVE10 or WELCOME15.")
    }
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Northbound</span>
          </div>
          <nav className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <span className="font-medium text-foreground">Cart</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Shipping</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Payment</span>
          </nav>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ShoppingBag className="h-4 w-4" />
            <span aria-live="polite">{itemCount} items</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Checkout
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Review your bag, choose delivery, and complete your order securely.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  Your bag
                  <Badge variant="secondary" className="ml-1">
                    {itemCount}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-12 text-center">
                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Your bag is empty.</p>
                  </div>
                ) : (
                  items.map((it, i) => (
                    <div key={it.id}>
                      {i > 0 && <Separator className="mb-4" />}
                      <div className="flex gap-4">
                        <div
                          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground"
                          aria-hidden="true"
                        >
                          {it.initials}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <p className="truncate font-medium">{it.name}</p>
                            <p className="text-sm text-muted-foreground">{it.variant}</p>
                            <p className="mt-2 text-sm font-medium sm:hidden">
                              {money(it.price)}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center rounded-md border">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-r-none"
                                aria-label={`Decrease quantity of ${it.name}`}
                                onClick={() => setQty(it.id, -1)}
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium tabular-nums">
                                {it.qty}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-l-none"
                                aria-label={`Increase quantity of ${it.name}`}
                                onClick={() => setQty(it.id, 1)}
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <div className="hidden w-20 text-right text-sm font-semibold tabular-nums sm:block">
                              {money(it.price * it.qty)}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              aria-label={`Remove ${it.name} from bag`}
                              onClick={() => removeItem(it.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  Shipping address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-1.5">
                    <Label htmlFor="first">First name</Label>
                    <Input id="first" placeholder="Avery" autoComplete="given-name" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="last">Last name</Label>
                    <Input id="last" placeholder="Mercer" autoComplete="family-name" />
                  </div>
                  <div className="grid gap-1.5 sm:col-span-2">
                    <Label htmlFor="addr">Street address</Label>
                    <Input id="addr" placeholder="221 Birchwood Ave" autoComplete="street-address" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Portland" autoComplete="address-level2" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="zip">ZIP / Postal code</Label>
                    <Input id="zip" placeholder="97201" autoComplete="postal-code" />
                  </div>
                  <div className="grid gap-1.5 sm:col-span-2">
                    <Label htmlFor="email">Email for receipt</Label>
                    <Input id="email" type="email" placeholder="avery@example.com" autoComplete="email" />
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  Delivery method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => {
                  const active = shipping === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setShipping(opt.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors",
                        active ? "border-primary bg-primary/10" : "hover:bg-muted/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-full border",
                            active ? "border-primary" : "border-muted-foreground/40"
                          )}
                        >
                          {active && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.eta}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold tabular-nums">
                        {opt.cost === 0 ? "Free" : money(opt.cost)}
                      </span>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="promo" className="flex items-center gap-1.5">
                    <Tag className="h-3.5 w-3.5" />
                    Promo code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="promo"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="SAVE10"
                      className="uppercase"
                    />
                    <Button variant="outline" onClick={applyPromo}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <p className="flex items-center gap-1.5 text-xs text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {PROMOS[appliedPromo].label} applied
                    </p>
                  )}
                  {promoError && (
                    <p className="text-xs text-destructive">{promoError}</p>
                  )}
                </div>

                <Separator />

                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="font-medium tabular-nums">{money(subtotal)}</dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <dt>Discount</dt>
                      <dd className="font-medium tabular-nums">−{money(discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="font-medium tabular-nums">
                      {shippingCost === 0 ? "Free" : money(shippingCost)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Estimated tax</dt>
                    <dd className="font-medium tabular-nums">{money(tax)}</dd>
                  </div>
                </dl>

                <Separator />

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-xl font-semibold tabular-nums">{money(total)}</span>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  disabled={items.length === 0}
                  onClick={() => setPlaced(true)}
                >
                  <Lock className="h-4 w-4" />
                  Place order
                </Button>

                {placed && (
                  <p className="flex items-center justify-center gap-1.5 rounded-md bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Order placed — confirmation on its way.
                  </p>
                )}

                <div className="space-y-2 pt-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Secure 256-bit SSL encrypted checkout
                  </p>
                  <p className="flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5" />
                    Visa, Mastercard, Amex &amp; Apple Pay accepted
                  </p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2024 Northbound Goods. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Returns</span>
            <span>Privacy</span>
            <span>Help center</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
