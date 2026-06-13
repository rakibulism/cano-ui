"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Check,
  CreditCard,
  Download,
  HardDrive,
  Plus,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Meter = {
  label: string
  icon: React.ElementType
  used: number
  limit: number
  unit: string
  value: number
}

const METERS: Meter[] = [
  { label: "Seats", icon: Users, used: 18, limit: 25, unit: "members", value: 72 },
  { label: "API requests", icon: Zap, used: 842, limit: 1000, unit: "K / mo", value: 84 },
  { label: "Storage", icon: HardDrive, used: 312, limit: 500, unit: "GB", value: 62 },
]

type Method = {
  id: string
  brand: string
  last4: string
  expiry: string
  primary: boolean
}

const METHODS: Method[] = [
  { id: "m1", brand: "Visa", last4: "4242", expiry: "08 / 27", primary: true },
  { id: "m2", brand: "Mastercard", last4: "8810", expiry: "11 / 26", primary: false },
]

type Invoice = {
  id: string
  date: string
  amount: string
  plan: string
  status: "Paid" | "Pending" | "Failed"
  year: string
}

const INVOICES: Invoice[] = [
  { id: "INV-2025-006", date: "Jun 1, 2025", amount: "$480.00", plan: "Scale (annual)", status: "Paid", year: "2025" },
  { id: "INV-2025-005", date: "May 1, 2025", amount: "$480.00", plan: "Scale (annual)", status: "Paid", year: "2025" },
  { id: "INV-2025-004", date: "Apr 1, 2025", amount: "$480.00", plan: "Scale (annual)", status: "Pending", year: "2025" },
  { id: "INV-2024-012", date: "Dec 1, 2024", amount: "$320.00", plan: "Growth (annual)", status: "Paid", year: "2024" },
  { id: "INV-2024-011", date: "Nov 1, 2024", amount: "$320.00", plan: "Growth (annual)", status: "Failed", year: "2024" },
  { id: "INV-2024-010", date: "Oct 1, 2024", amount: "$320.00", plan: "Growth (annual)", status: "Paid", year: "2024" },
]

const YEARS = ["All", "2025", "2024"] as const
type Year = (typeof YEARS)[number]

const PLAN_FEATURES = [
  "Up to 25 team seats",
  "1M API requests / month",
  "Advanced analytics & exports",
  "Priority email support",
]

function statusVariant(status: Invoice["status"]) {
  if (status === "Paid") return "secondary" as const
  if (status === "Pending") return "outline" as const
  return "destructive" as const
}

export default function SubscriptionsBilling() {
  const [year, setYear] = React.useState<Year>("All")
  const [annual, setAnnual] = React.useState(true)

  const invoices = React.useMemo(
    () => (year === "All" ? INVOICES : INVOICES.filter((i) => i.year === year)),
    [year]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Billing &amp; Plans</p>
              <p className="text-xs text-muted-foreground">Acme Workspace</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export all
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Subscription overview</h1>
          <p className="text-sm text-muted-foreground">
            Manage your plan, payment methods, and billing history.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>Scale plan</CardTitle>
                    <Badge>Current</Badge>
                  </div>
                  <CardDescription>
                    Renews on July 1, 2025 &middot; billed annually
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold tracking-tight">$480</p>
                  <p className="text-xs text-muted-foreground">per month</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="grid gap-2 sm:grid-cols-2">
                {PLAN_FEATURES.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Separator />
              <div className="space-y-5">
                {METERS.map((m) => {
                  const Icon = m.icon
                  return (
                    <div key={m.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {m.label}
                        </span>
                        <span className="tabular-nums text-muted-foreground">
                          {m.used} / {m.limit} {m.unit}
                        </span>
                      </div>
                      <Progress value={m.value} />
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button variant="outline">Change plan</Button>
              <Button variant="ghost" className="text-muted-foreground">
                Cancel subscription
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle className="pt-2">Upgrade to Enterprise</CardTitle>
              <CardDescription>
                Unlimited seats, SSO, audit logs, and a dedicated success manager.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-lg border bg-card p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setAnnual(false)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 font-medium transition-colors",
                    !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnual(true)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 font-medium transition-colors",
                    annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                >
                  Annual
                </button>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight">
                  {annual ? "$1,200" : "$1,500"}
                  <span className="text-base font-normal text-muted-foreground"> / mo</span>
                </p>
                {annual && (
                  <p className="text-xs text-primary">Save 20% with annual billing</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Upgrade now
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment methods</CardTitle>
                  <CardDescription>Cards used for recurring billing.</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add card
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {METHODS.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-14 items-center justify-center rounded-md border bg-card text-xs font-semibold">
                      {m.brand}
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">
                        {m.brand} ending in {m.last4}
                      </p>
                      <p className="text-xs text-muted-foreground">Expires {m.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {m.primary && <Badge variant="secondary">Default</Badge>}
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle>Billing history</CardTitle>
                  <CardDescription>Download invoices for your records.</CardDescription>
                </div>
                <div className="flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
                  {YEARS.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYear(y)}
                      className={cn(
                        "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                        year === y
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                      <TableCell className="text-muted-foreground">{inv.plan}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(inv.status)}>{inv.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{inv.amount}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={"Download invoice " + inv.id}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {invoices.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No invoices for this period.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Questions about billing? Reach out to billing@acme.com</p>
          <p>Powered by cano</p>
        </div>
      </footer>
    </div>
  )
}
