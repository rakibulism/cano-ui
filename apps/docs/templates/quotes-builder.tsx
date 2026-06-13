"use client"

import * as React from "react"
import {
  FileText,
  Plus,
  Minus,
  Trash2,
  Search,
  Send,
  Download,
  Server,
  Wrench,
  Headphones,
  GraduationCap,
  ShieldCheck,
  Database,
  Tag,
  Building2,
  User,
  Calendar,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type CatalogItem = {
  id: string
  name: string
  category: string
  unit: string
  price: number
  icon: React.ComponentType<{ className?: string }>
}

type LineItem = CatalogItem & { qty: number }

const CATALOG: CatalogItem[] = [
  { id: "sku-cloud", name: "Cloud Platform — Pro", category: "Platform", unit: "per seat / mo", price: 49, icon: Server },
  { id: "sku-data", name: "Data Warehouse Add-on", category: "Platform", unit: "per 100GB / mo", price: 120, icon: Database },
  { id: "sku-security", name: "Advanced Security Suite", category: "Platform", unit: "per org / mo", price: 380, icon: ShieldCheck },
  { id: "sku-onboard", name: "Guided Onboarding", category: "Services", unit: "one-time", price: 2500, icon: Wrench },
  { id: "sku-training", name: "Team Training Workshop", category: "Services", unit: "per session", price: 1200, icon: GraduationCap },
  { id: "sku-support", name: "Priority Support — 24/7", category: "Support", unit: "per org / mo", price: 650, icon: Headphones },
]

const DISCOUNTS = [
  { id: "none", label: "No discount", rate: 0 },
  { id: "loyalty", label: "Loyalty 10%", rate: 0.1 },
  { id: "volume", label: "Volume 15%", rate: 0.15 },
  { id: "partner", label: "Partner 25%", rate: 0.25 },
]

const TAX_RATE = 0.08
const CATEGORIES = ["All", "Platform", "Services", "Support"]

function currency(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function QuotesBuilder() {
  const [items, setItems] = React.useState<LineItem[]>([
    { ...CATALOG[0], qty: 25 },
    { ...CATALOG[5], qty: 1 },
  ])
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [discountId, setDiscountId] = React.useState("loyalty")

  const addItem = (item: CatalogItem) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const changeQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p))
        .filter((p) => p.qty > 0)
    )
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id))

  const filtered =
    activeCategory === "All" ? CATALOG : CATALOG.filter((c) => c.category === activeCategory)

  const discount = DISCOUNTS.find((d) => d.id === discountId) ?? DISCOUNTS[0]
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const discountAmount = subtotal * discount.rate
  const taxed = (subtotal - discountAmount) * TAX_RATE
  const total = subtotal - discountAmount + taxed
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Quote QT-2048</span>
                <Badge variant="secondary" className="text-[10px]">Draft</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Northwind Manufacturing · CPQ Builder</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Download className="size-4" />
              Export PDF
            </Button>
            <Button size="sm">
              <Send className="size-4" />
              Send quote
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-screen-2xl flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12">
        <section className="lg:col-span-3">
          <Card className="lg:sticky lg:top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Product catalog</CardTitle>
              <CardDescription>Click an item to add it to the quote.</CardDescription>
              <div className="relative pt-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search products" className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      activeCategory === cat
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {filtered.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => addItem(item)}
                      className="group flex w-full items-center gap-3 rounded-lg border bg-card p-3 text-left transition-colors hover:border-primary hover:bg-accent"
                      aria-label={`Add ${item.name} to quote`}
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {currency(item.price)} · {item.unit}
                        </p>
                      </div>
                      <Plus className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="lg:col-span-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-base">Quote line items</CardTitle>
                <CardDescription>{itemCount} units across {items.length} products</CardDescription>
              </div>
              <Badge variant="outline" className="tabular-nums">{currency(subtotal)}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-16 text-center">
                  <Tag className="size-6 text-muted-foreground" />
                  <p className="text-sm font-medium">No items yet</p>
                  <p className="text-xs text-muted-foreground">
                    Add products from the catalog to build this quote.
                  </p>
                </div>
              ) : (
                items.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border bg-card p-3"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {currency(item.price)} · {item.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 rounded-md border bg-background p-0.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => changeQty(item.id, -1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="size-3.5" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium tabular-nums">
                          {item.qty}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-7"
                          onClick={() => changeQty(item.id, 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="size-3.5" />
                        </Button>
                      </div>
                      <div className="w-24 text-right text-sm font-semibold tabular-nums">
                        {currency(item.price * item.qty)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Notes & terms</CardTitle>
              <CardDescription>Shown to the customer on the proposal.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={3}
                defaultValue="Pricing valid for 30 days. Annual billing, net-30 payment terms. Includes onboarding kickoff within 2 weeks of signature."
              />
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6 lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback>NM</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">Northwind Manufacturing</p>
                  <p className="truncate text-xs text-muted-foreground">Enterprise · 1,200 employees</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="size-4" />
                  <span className="text-foreground">Dana Whitfield</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="size-4" />
                  <span className="text-foreground">VP Operations</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="size-4" />
                  <span className="text-foreground">Expires Jul 14, 2026</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="po" className="text-xs">PO reference</Label>
                <Input id="po" defaultValue="NW-PO-77310" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:sticky lg:top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Tag className="size-3.5" />
                  Discount
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {DISCOUNTS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDiscountId(d.id)}
                      className={cn(
                        "flex items-center justify-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                        discountId === d.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {discountId === d.id && <Check className="size-3" />}
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">{currency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Discount {discount.rate > 0 ? `(${Math.round(discount.rate * 100)}%)` : ""}
                  </span>
                  <span className="tabular-nums text-destructive">
                    {discountAmount > 0 ? "-" : ""}{currency(discountAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax ({Math.round(TAX_RATE * 100)}%)</span>
                  <span className="tabular-nums">{currency(taxed)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-end justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-2xl font-semibold tabular-nums">{currency(total)}</span>
              </div>
              <Button className="w-full" size="lg" disabled={items.length === 0}>
                <Send className="size-4" />
                Send quote
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Recalculated live as you edit line items.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
