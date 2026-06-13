"use client"

import * as React from "react"
import {
  Search,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Tag,
  CreditCard,
  Coffee,
  Sandwich,
  CakeSlice,
  CupSoda,
  Soup,
  Receipt,
  UserRound,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Product = {
  id: string
  name: string
  price: number
  category: string
  emoji: string
}

type Category = {
  id: string
  label: string
  icon: React.ElementType
}

const CATEGORIES: Category[] = [
  { id: "all", label: "All", icon: ShoppingCart },
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "tea", label: "Tea", icon: CupSoda },
  { id: "food", label: "Food", icon: Sandwich },
  { id: "soup", label: "Soup", icon: Soup },
  { id: "bakery", label: "Bakery", icon: CakeSlice },
]

const PRODUCTS: Product[] = [
  { id: "p1", name: "Espresso", price: 3.0, category: "coffee", emoji: "☕" },
  { id: "p2", name: "Cappuccino", price: 4.25, category: "coffee", emoji: "☕" },
  { id: "p3", name: "Flat White", price: 4.5, category: "coffee", emoji: "🥛" },
  { id: "p4", name: "Cold Brew", price: 4.75, category: "coffee", emoji: "🧊" },
  { id: "p5", name: "Matcha Latte", price: 5.0, category: "tea", emoji: "🍵" },
  { id: "p6", name: "Chai Tea", price: 4.0, category: "tea", emoji: "🫖" },
  { id: "p7", name: "Green Tea", price: 3.25, category: "tea", emoji: "🍃" },
  { id: "p8", name: "Club Sandwich", price: 8.5, category: "food", emoji: "🥪" },
  { id: "p9", name: "Avocado Toast", price: 7.0, category: "food", emoji: "🥑" },
  { id: "p10", name: "Caesar Salad", price: 9.25, category: "food", emoji: "🥗" },
  { id: "p11", name: "Tomato Soup", price: 6.0, category: "soup", emoji: "🍅" },
  { id: "p12", name: "Pumpkin Soup", price: 6.5, category: "soup", emoji: "🎃" },
  { id: "p13", name: "Croissant", price: 3.5, category: "bakery", emoji: "🥐" },
  { id: "p14", name: "Blueberry Muffin", price: 3.75, category: "bakery", emoji: "🧁" },
  { id: "p15", name: "Cinnamon Roll", price: 4.25, category: "bakery", emoji: "🥮" },
  { id: "p16", name: "Chocolate Cake", price: 5.5, category: "bakery", emoji: "🍰" },
]

type CartLine = { product: Product; qty: number }

const TAX_RATE = 0.08
const DISCOUNT_RATE = 0.1

function formatMoney(value: number) {
  return "$" + value.toFixed(2)
}

export default function PointOfSale() {
  const [activeCategory, setActiveCategory] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [cart, setCart] = React.useState<CartLine[]>([
    { product: PRODUCTS[1], qty: 2 },
    { product: PRODUCTS[12], qty: 1 },
  ])
  const [discountOn, setDiscountOn] = React.useState(false)

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQuery
  })

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id)
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l,
        )
      }
      return [...prev, { product, qty: 1 }]
    })
  }

  function changeQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) =>
          l.product.id === id ? { ...l, qty: l.qty + delta } : l,
        )
        .filter((l) => l.qty > 0),
    )
  }

  function removeLine(id: string) {
    setCart((prev) => prev.filter((l) => l.product.id !== id))
  }

  const itemCount = cart.reduce((sum, l) => sum + l.qty, 0)
  const subtotal = cart.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const discount = discountOn ? subtotal * DISCOUNT_RATE : 0
  const taxed = (subtotal - discount) * TAX_RATE
  const total = subtotal - discount + taxed

  return (
    <div className="flex min-h-full bg-background text-foreground">
      <main className="flex min-h-full flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/80 px-5 py-4 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">Corner Cafe POS</h1>
                <p className="text-xs text-muted-foreground">Register 02 · Open shift</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search menu..."
                  className="pl-9"
                  aria-label="Search menu"
                />
              </div>
              <div className="hidden items-center gap-2 rounded-full border px-3 py-1.5 sm:flex">
                <UserRound className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <span className="text-sm font-medium">Jamie L.</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 px-5 py-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {cat.label}
              </button>
            )
          })}
        </div>

        <div className="flex-1 overflow-auto px-5 pb-8">
          {filtered.length === 0 ? (
            <div className="flex h-full min-h-48 flex-col items-center justify-center text-center text-muted-foreground">
              <Search className="mb-3 h-8 w-8" aria-hidden="true" />
              <p className="text-sm">No items match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addToCart(product)}
                  className="group flex flex-col items-start rounded-xl border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-sm"
                >
                  <div className="mb-3 flex h-16 w-full items-center justify-center rounded-lg bg-muted text-3xl">
                    <span aria-hidden="true">{product.emoji}</span>
                  </div>
                  <span className="text-sm font-medium leading-tight">{product.name}</span>
                  <div className="mt-2 flex w-full items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{formatMoney(product.price)}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <aside className="flex w-full max-w-sm flex-col border-l bg-card">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="text-base font-semibold">Current Order</h2>
          </div>
          <Badge variant="secondary">{itemCount} items</Badge>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full min-h-48 flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingCart className="mb-3 h-8 w-8" aria-hidden="true" />
              <p className="text-sm">Cart is empty.</p>
              <p className="text-xs">Tap a product to add it.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.map((line) => (
                <li
                  key={line.product.id}
                  className="flex items-center gap-3 rounded-lg border bg-background p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-xl">
                    <span aria-hidden="true">{line.product.emoji}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{line.product.name}</p>
                    <p className="text-xs text-muted-foreground">{formatMoney(line.product.price)} each</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => changeQty(line.product.id, -1)}
                      aria-label={"Decrease " + line.product.name}
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                    <span className="w-6 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => changeQty(line.product.id, 1)}
                      aria-label={"Increase " + line.product.name}
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => removeLine(line.product.id)}
                    aria-label={"Remove " + line.product.name}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t px-5 py-4">
          <button
            type="button"
            onClick={() => setDiscountOn((v) => !v)}
            className={cn(
              "mb-4 flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors",
              discountOn
                ? "border-primary bg-primary/10 text-primary"
                : "bg-background text-muted-foreground hover:bg-accent",
            )}
          >
            <span className="flex items-center gap-2 font-medium">
              <Tag className="h-4 w-4" aria-hidden="true" />
              Member discount (10%)
            </span>
            {discountOn ? (
              <span className="flex items-center gap-1 font-semibold">
                Applied
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            ) : (
              <span className="font-semibold">Apply</span>
            )}
          </button>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="tabular-nums text-foreground">{formatMoney(subtotal)}</span>
            </div>
            {discountOn && (
              <div className="flex justify-between text-primary">
                <span>Discount</span>
                <span className="tabular-nums">-{formatMoney(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (8%)</span>
              <span className="tabular-nums text-foreground">{formatMoney(taxed)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{formatMoney(total)}</span>
            </div>
          </div>

          <Button
            size="lg"
            className="mt-4 w-full"
            disabled={cart.length === 0}
          >
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            Charge {formatMoney(total)}
          </Button>
        </div>
      </aside>
    </div>
  )
}
