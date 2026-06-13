"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Search,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  MoreHorizontal,
  Store,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

type Section = "dashboard" | "orders" | "products" | "customers"
type OrderStatus = "Pending" | "Shipped" | "Refunded"
type OrderFilter = "All" | OrderStatus

const NAV: { id: Section; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
]

const KPIS = [
  { label: "Revenue", value: "$48,260", delta: "+12.4%", up: true, icon: DollarSign },
  { label: "Orders", value: "1,284", delta: "+6.1%", up: true, icon: ShoppingCart },
  { label: "Avg. Order", value: "$37.59", delta: "+2.8%", up: true, icon: TrendingUp },
  { label: "Refunds", value: "$1,940", delta: "-4.2%", up: false, icon: TrendingDown },
]

type Order = {
  id: string
  customer: string
  email: string
  date: string
  total: string
  status: OrderStatus
}

const ORDERS: Order[] = [
  { id: "#3201", customer: "Amara Diallo", email: "amara@mail.com", date: "Jun 12", total: "$128.00", status: "Pending" },
  { id: "#3200", customer: "Leo Mercer", email: "leo.m@mail.com", date: "Jun 12", total: "$64.50", status: "Shipped" },
  { id: "#3199", customer: "Priya Raman", email: "priya@mail.com", date: "Jun 11", total: "$212.30", status: "Shipped" },
  { id: "#3198", customer: "Tomás Vela", email: "tomas@mail.com", date: "Jun 11", total: "$19.99", status: "Refunded" },
  { id: "#3197", customer: "Hana Kim", email: "hana.k@mail.com", date: "Jun 10", total: "$340.00", status: "Pending" },
  { id: "#3196", customer: "Noah Bauer", email: "noah@mail.com", date: "Jun 10", total: "$88.75", status: "Shipped" },
  { id: "#3195", customer: "Sofia Rossi", email: "sofia@mail.com", date: "Jun 09", total: "$45.20", status: "Refunded" },
  { id: "#3194", customer: "Yusuf Okafor", email: "yusuf@mail.com", date: "Jun 09", total: "$156.40", status: "Shipped" },
]

type Product = {
  name: string
  sku: string
  price: string
  stock: number
}

const PRODUCTS: Product[] = [
  { name: "Linen Throw Blanket", sku: "HM-201", price: "$58.00", stock: 42 },
  { name: "Ceramic Pour-Over", sku: "KT-118", price: "$34.00", stock: 8 },
  { name: "Walnut Desk Tray", sku: "OF-440", price: "$72.00", stock: 0 },
  { name: "Brass Table Lamp", sku: "LT-305", price: "$129.00", stock: 17 },
  { name: "Wool Felt Coasters", sku: "HM-090", price: "$22.00", stock: 64 },
  { name: "Stoneware Mug Set", sku: "KT-077", price: "$48.00", stock: 5 },
  { name: "Cotton Apron", sku: "KT-150", price: "$36.00", stock: 0 },
  { name: "Glass Carafe", sku: "KT-201", price: "$41.00", stock: 29 },
]

const STATUS_FILTERS: OrderFilter[] = ["All", "Pending", "Shipped", "Refunded"]

function statusBadge(status: OrderStatus) {
  if (status === "Pending") return <Badge variant="secondary">Pending</Badge>
  if (status === "Shipped") return <Badge variant="default">Shipped</Badge>
  return <Badge variant="outline" className="text-destructive">Refunded</Badge>
}

function stockBadge(stock: number) {
  if (stock === 0) return <Badge variant="outline" className="text-destructive">Out of stock</Badge>
  if (stock <= 10) return <Badge variant="secondary">Low · {stock} left</Badge>
  return <Badge variant="outline">{stock} in stock</Badge>
}

export default function StoreAdmin() {
  const [section, setSection] = React.useState<Section>("dashboard")
  const [filter, setFilter] = React.useState<OrderFilter>("All")
  const [query, setQuery] = React.useState("")

  const filteredOrders = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return ORDERS.filter((o) => {
      const matchesStatus = filter === "All" || o.status === filter
      const matchesQuery =
        q === "" ||
        o.customer.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [filter, query])

  const activeNav = NAV.find((n) => n.id === section)

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Store className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold">Maison Goods</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = item.id === section
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="border-t p-3">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <div className="flex flex-1 items-center gap-3">
            <h1 className="text-base font-semibold capitalize sm:text-lg">{activeNav?.label}</h1>
          </div>
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" className="w-56 pl-9" aria-label="Search" />
          </div>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="" />
            <AvatarFallback>MG</AvatarFallback>
          </Avatar>
        </header>

        {/* Mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-b bg-card px-3 py-2 lg:hidden">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = item.id === section
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </div>

        <main className="flex-1 space-y-6 p-4 sm:p-6">
          {section === "dashboard" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {KPIS.map((kpi) => {
                  const Icon = kpi.icon
                  return (
                    <Card key={kpi.label}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>{kpi.label}</CardDescription>
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-semibold tracking-tight">{kpi.value}</div>
                        <p
                          className={cn(
                            "mt-1 flex items-center gap-1 text-xs font-medium",
                            kpi.up ? "text-primary" : "text-destructive"
                          )}
                        >
                          {kpi.up ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {kpi.delta}
                          <span className="text-muted-foreground">vs last month</span>
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent orders</CardTitle>
                    <CardDescription>Latest activity across your store</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSection("orders")}>
                    View all
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden sm:table-cell">Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {ORDERS.slice(0, 5).map((o) => (
                        <TableRow key={o.id}>
                          <TableCell className="font-medium">{o.id}</TableCell>
                          <TableCell>{o.customer}</TableCell>
                          <TableCell className="hidden text-muted-foreground sm:table-cell">{o.date}</TableCell>
                          <TableCell>{statusBadge(o.status)}</TableCell>
                          <TableCell className="text-right font-medium">{o.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {section === "orders" && (
            <Card>
              <CardHeader className="space-y-4">
                <div>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>
                    {filteredOrders.length} of {ORDERS.length} orders shown
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {STATUS_FILTERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                          filter === f
                            ? "border-primary bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="relative sm:w-64">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search orders…"
                      className="pl-9"
                      aria-label="Search orders"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-medium">{o.id}</TableCell>
                        <TableCell>{o.customer}</TableCell>
                        <TableCell className="hidden text-muted-foreground md:table-cell">{o.email}</TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">{o.date}</TableCell>
                        <TableCell>{statusBadge(o.status)}</TableCell>
                        <TableCell className="text-right font-medium">{o.total}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" aria-label="Order actions">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                          No orders match your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {section === "products" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Products</h2>
                  <p className="text-sm text-muted-foreground">{PRODUCTS.length} items in catalog</p>
                </div>
                <Button size="sm">
                  <Package className="mr-1 h-4 w-4" />
                  Add product
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {PRODUCTS.map((p) => (
                  <Card key={p.sku} className="overflow-hidden">
                    <div className="flex h-32 items-center justify-center bg-muted/30">
                      <Package className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <CardContent className="space-y-2 pt-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">SKU {p.sku}</p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold">{p.price}</span>
                      </div>
                      {stockBadge(p.stock)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {section === "customers" && (
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
                <CardDescription>People who have ordered from your store</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead className="text-right">Lifetime value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDERS.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {o.customer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{o.customer}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">{o.email}</TableCell>
                        <TableCell className="text-right font-medium">{o.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
