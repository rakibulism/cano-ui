"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Building2,
  Check,
  CreditCard,
  Download,
  HardDrive,
  Mail,
  Plus,
  Receipt,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Cycle = "monthly" | "annual"

type Method = {
  id: string
  brand: string
  last4: string
  expiry: string
  icon: React.ComponentType<{ className?: string }>
}

type Invoice = {
  id: string
  date: string
  amount: string
  plan: string
  status: "Paid" | "Due"
}

const USAGE = [
  { label: "Seats used", icon: Users, used: 38, limit: 50, unit: "seats" },
  { label: "API requests", icon: Zap, used: 824000, limit: 1000000, unit: "calls" },
  { label: "Storage", icon: HardDrive, used: 412, limit: 500, unit: "GB" },
] as const

const METHODS: Method[] = [
  { id: "visa", brand: "Visa", last4: "4242", expiry: "08 / 27", icon: CreditCard },
  { id: "mc", brand: "Mastercard", last4: "5518", expiry: "11 / 26", icon: CreditCard },
  { id: "amex", brand: "Amex", last4: "0093", expiry: "03 / 28", icon: CreditCard },
]

const INVOICES: Invoice[] = [
  { id: "INV-2048", date: "Jun 1, 2026", amount: "$240.00", plan: "Scale - Monthly", status: "Due" },
  { id: "INV-2031", date: "May 1, 2026", amount: "$240.00", plan: "Scale - Monthly", status: "Paid" },
  { id: "INV-2014", date: "Apr 1, 2026", amount: "$240.00", plan: "Scale - Monthly", status: "Paid" },
  { id: "INV-1998", date: "Mar 1, 2026", amount: "$120.00", plan: "Growth - Monthly", status: "Paid" },
  { id: "INV-1981", date: "Feb 1, 2026", amount: "$120.00", plan: "Growth - Monthly", status: "Paid" },
]

const PLAN_PERKS = [
  "Up to 50 team seats",
  "1M API requests / month",
  "Priority support & SLA",
  "Advanced audit logs",
]

function formatNumber(n: number) {
  if (n >= 1000) return n.toLocaleString("en-US")
  return String(n)
}

export default function BillingPortal() {
  const [cycle, setCycle] = React.useState<Cycle>("monthly")
  const [defaultMethod, setDefaultMethod] = React.useState<string>("visa")
  const [autoCharge, setAutoCharge] = React.useState(true)

  const planPrice = cycle === "monthly" ? "$240" : "$2,304"
  const planSuffix = cycle === "monthly" ? "/ month" : "/ year"

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Receipt className="size-4" />
            </div>
            <span className="text-sm font-semibold">Northwind Billing</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <span className="text-foreground">Overview</span>
            <span>Usage</span>
            <span>Invoices</span>
            <span>Settings</span>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Mail className="size-4" />
              Support
            </Button>
            <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
              AK
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Billing & Plan</h1>
          <p className="text-sm text-muted-foreground">
            Manage your subscription, payment methods and download past invoices.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="bg-primary/10 px-6 pb-5 pt-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Current plan</span>
                  </div>
                  <h2 className="text-2xl font-semibold">Scale</h2>
                  <p className="text-sm text-muted-foreground">
                    Renews on Jul 1, 2026 - cancel anytime
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-semibold tabular-nums">{planPrice}</div>
                  <div className="text-xs text-muted-foreground">{planSuffix}</div>
                </div>
              </div>
            </div>
            <CardContent className="pt-6">
              <div className="mb-5 inline-flex items-center gap-1 rounded-lg border bg-muted/30 p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setCycle("monthly")}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-medium transition-colors",
                    cycle === "monthly"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setCycle("annual")}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-1.5 font-medium transition-colors",
                    cycle === "annual"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  Annual
                  <Badge variant="secondary" className="text-[10px]">Save 20%</Badge>
                </button>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {PLAN_PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 border-t bg-muted/20">
              <Button>
                Upgrade to Enterprise
                <ArrowUpRight className="size-4" />
              </Button>
              <Button variant="outline">Compare plans</Button>
              <Button variant="ghost" className="ml-auto text-muted-foreground">
                Cancel plan
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Usage this period</CardTitle>
              <CardDescription>Jun 1 - Jun 30, 2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {USAGE.map((u) => {
                const pct = Math.round((u.used / u.limit) * 100)
                const Icon = u.icon
                return (
                  <div key={u.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <Icon className="size-4 text-muted-foreground" />
                        {u.label}
                      </span>
                      <span className="tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                    <Progress value={pct} />
                    <p className="text-xs tabular-nums text-muted-foreground">
                      {formatNumber(u.used)} of {formatNumber(u.limit)} {u.unit}
                    </p>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base">Payment methods</CardTitle>
                <CardDescription>Set which card is charged on renewal.</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="size-4" />
                Add card
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {METHODS.map((m) => {
                const isDefault = m.id === defaultMethod
                const Icon = m.icon
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex flex-wrap items-center gap-4 rounded-lg border p-4 transition-colors",
                      isDefault ? "border-primary bg-primary/5" : "bg-card",
                    )}
                  >
                    <div className="flex size-10 items-center justify-center rounded-md bg-muted">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {m.brand} ending in {m.last4}
                        </span>
                        {isDefault && (
                          <Badge variant="secondary" className="text-[10px]">Default</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Expires {m.expiry}</p>
                    </div>
                    {isDefault ? (
                      <span className="text-xs font-medium text-primary">In use</span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDefaultMethod(m.id)}
                      >
                        Make default
                      </Button>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing details</CardTitle>
              <CardDescription>Where invoices are sent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="company" defaultValue="Acme Robotics Inc." className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Billing email</Label>
                <Input id="email" type="email" defaultValue="ap@acmerobotics.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vat">Tax / VAT ID</Label>
                <Input id="vat" defaultValue="US-84-2910337" />
              </div>
              <Separator />
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Auto-charge on renewal</p>
                  <p className="text-xs text-muted-foreground">
                    Charge the default card automatically.
                  </p>
                </div>
                <Switch checked={autoCharge} onCheckedChange={setAutoCharge} aria-label="Toggle auto-charge" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save details</Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-base">Invoices</CardTitle>
              <CardDescription>Download receipts for your records.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="size-4" />
              Export all
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">{inv.id}</TableCell>
                    <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                    <TableCell className="hidden text-muted-foreground sm:table-cell">
                      {inv.plan}
                    </TableCell>
                    <TableCell>
                      <Badge variant={inv.status === "Paid" ? "secondary" : "destructive"}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{inv.amount}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Download invoice ${inv.id}`}
                      >
                        <Download className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center gap-3 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          <Shield className="size-4 shrink-0 text-primary" />
          Payments are encrypted and processed securely. We never store full card numbers.
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>&copy; 2026 Northwind Billing, Inc.</span>
          <div className="flex items-center gap-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Tax docs</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
