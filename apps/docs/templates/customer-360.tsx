"use client"

import * as React from "react"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Globe,
  LifeBuoy,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Plus,
  Smile,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Health = "Healthy" | "At risk" | "Critical"

const ACCOUNT = {
  name: "Northwind Apparel",
  domain: "northwindapparel.com",
  plan: "Enterprise",
  industry: "Retail & E-commerce",
  location: "Portland, OR",
  owner: "Jordan Reyes",
  customerSince: "Mar 2021",
  seats: 240,
  renewal: "Nov 14, 2026",
  health: "Healthy" as Health,
  healthScore: 86,
}

const KPIS = [
  {
    label: "Monthly recurring revenue",
    value: "$18,400",
    delta: "+12.4%",
    up: true,
    sub: "vs. last quarter",
    icon: TrendingUp,
  },
  {
    label: "Open support tickets",
    value: "3",
    delta: "-2",
    up: true,
    sub: "1 high priority",
    icon: LifeBuoy,
  },
  {
    label: "NPS score",
    value: "62",
    delta: "+8",
    up: true,
    sub: "Promoter, last survey",
    icon: Smile,
  },
  {
    label: "Product adoption",
    value: "74%",
    delta: "+5%",
    up: true,
    sub: "Weekly active seats",
    icon: Activity,
  },
] as const

const CONTACTS = [
  {
    name: "Amelia Brooks",
    initials: "AB",
    title: "VP Operations",
    email: "amelia@northwindapparel.com",
    role: "Champion",
    primary: true,
  },
  {
    name: "Marcus Hale",
    initials: "MH",
    title: "Chief Technology Officer",
    email: "marcus@northwindapparel.com",
    role: "Economic buyer",
    primary: false,
  },
  {
    name: "Priya Nair",
    initials: "PN",
    title: "Head of Merchandising",
    email: "priya@northwindapparel.com",
    role: "User",
    primary: false,
  },
  {
    name: "Owen Frost",
    initials: "OF",
    title: "IT Administrator",
    email: "owen@northwindapparel.com",
    role: "Technical",
    primary: false,
  },
] as const

const TIMELINE = [
  {
    icon: MessageSquare,
    title: "QBR completed with Amelia Brooks",
    detail: "Reviewed Q2 expansion roadmap and adoption goals.",
    time: "2 days ago",
    tag: "Meeting",
  },
  {
    icon: LifeBuoy,
    title: "Ticket #4821 resolved",
    detail: "Bulk export latency fixed by the platform team.",
    time: "4 days ago",
    tag: "Support",
  },
  {
    icon: TrendingUp,
    title: "Upsell opportunity created",
    detail: "40 additional seats — Analytics add-on, $4.8k ARR.",
    time: "1 week ago",
    tag: "Sales",
  },
  {
    icon: CreditCard,
    title: "Invoice INV-2041 paid",
    detail: "$18,400 — paid on time via ACH transfer.",
    time: "2 weeks ago",
    tag: "Billing",
  },
  {
    icon: Smile,
    title: "NPS survey response received",
    detail: "Scored 9 — \"Support has been outstanding this year.\"",
    time: "3 weeks ago",
    tag: "Feedback",
  },
] as const

const INVOICES = [
  { id: "INV-2041", date: "May 01, 2026", amount: "$18,400", status: "Paid" },
  { id: "INV-2018", date: "Apr 01, 2026", amount: "$18,400", status: "Paid" },
  { id: "INV-1994", date: "Mar 01, 2026", amount: "$16,200", status: "Paid" },
  { id: "INV-1970", date: "Feb 01, 2026", amount: "$16,200", status: "Refunded" },
] as const

const TABS = ["Overview", "Activity", "Billing"] as const
type Tab = (typeof TABS)[number]

function healthVariant(h: Health): "default" | "secondary" | "destructive" {
  if (h === "Healthy") return "default"
  if (h === "At risk") return "secondary"
  return "destructive"
}

function invoiceVariant(
  status: string,
): "default" | "secondary" | "outline" | "destructive" {
  if (status === "Paid") return "default"
  if (status === "Refunded") return "destructive"
  return "outline"
}

export default function Customer360() {
  const [tab, setTab] = React.useState<Tab>("Overview")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Accounts</span>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm font-medium">{ACCOUNT.name}</span>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Log activity
            </Button>
            <Button variant="ghost" size="icon" aria-label="More account actions">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {/* Account header */}
        <section className="flex flex-col gap-5 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-8 w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {ACCOUNT.name}
              </h1>
              <Badge variant={healthVariant(ACCOUNT.health)}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                {ACCOUNT.health}
              </Badge>
              <Badge variant="outline">{ACCOUNT.plan}</Badge>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-4 w-4" />
                {ACCOUNT.domain}
                <ExternalLink className="h-3 w-3" />
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {ACCOUNT.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {ACCOUNT.seats} seats
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Customer since {ACCOUNT.customerSince}
              </span>
            </div>
          </div>
          <div className="w-full shrink-0 rounded-lg border bg-muted/30 p-4 sm:w-52">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Health score
              </span>
              <span className="text-sm font-semibold">{ACCOUNT.healthScore}/100</span>
            </div>
            <Progress value={ACCOUNT.healthScore} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">
              Renews {ACCOUNT.renewal} • Owner {ACCOUNT.owner}
            </p>
          </div>
        </section>

        {/* KPI tiles */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <kpi.icon className="h-4 w-4" />
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-0.5 text-xs font-medium",
                      kpi.up ? "text-primary" : "text-destructive",
                    )}
                  >
                    {kpi.up ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}
                    {kpi.delta}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold tracking-tight">
                  {kpi.value}
                </p>
                <p className="mt-1 text-sm font-medium">{kpi.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{kpi.sub}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Tabs */}
        <div className="mt-8">
          <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
            <TabsList>
              {TABS.map((t) => (
                <TabsTrigger key={t} value={t}>
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Overview */}
            <TabsContent value="Overview" className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="flex-row items-center justify-between">
                      <CardTitle className="text-base">Key contacts</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </CardHeader>
                    <CardContent className="divide-y p-0">
                      {CONTACTS.map((c) => (
                        <div
                          key={c.email}
                          className="flex items-center gap-3 px-6 py-3"
                        >
                          <Avatar className="h-9 w-9">
                            <AvatarFallback>{c.initials}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="truncate text-sm font-medium">
                                {c.name}
                              </span>
                              {c.primary && (
                                <Star
                                  className="h-3.5 w-3.5 fill-primary text-primary"
                                  aria-label="Primary contact"
                                />
                              )}
                            </div>
                            <p className="truncate text-xs text-muted-foreground">
                              {c.title}
                            </p>
                          </div>
                          <Badge variant="secondary" className="hidden sm:inline-flex">
                            {c.role}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Email ${c.name}`}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Call ${c.name}`}
                            className="hidden sm:inline-flex"
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Account summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-3 text-sm">
                        {[
                          ["Industry", ACCOUNT.industry],
                          ["Plan", ACCOUNT.plan],
                          ["Account owner", ACCOUNT.owner],
                          ["Renewal date", ACCOUNT.renewal],
                          ["Licensed seats", String(ACCOUNT.seats)],
                        ].map(([k, v]) => (
                          <div key={k} className="flex items-center justify-between gap-4">
                            <dt className="text-muted-foreground">{k}</dt>
                            <dd className="text-right font-medium">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <Separator className="my-4" />
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="h-4 w-4" />
                        View account plan
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Activity */}
            <TabsContent value="Activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative space-y-6 border-l pl-6">
                    {TIMELINE.map((item, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border bg-card text-muted-foreground">
                          <item.icon className="h-3.5 w-3.5" />
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium">{item.title}</p>
                          <Badge variant="outline" className="text-xs">
                            {item.tag}
                          </Badge>
                          <span className="ml-auto text-xs text-muted-foreground">
                            {item.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing */}
            <TabsContent value="Billing" className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="text-base">Invoice history</CardTitle>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Invoice</TableHead>
                          <TableHead className="hidden sm:table-cell">Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {INVOICES.map((inv) => (
                          <TableRow key={inv.id}>
                            <TableCell className="font-medium">{inv.id}</TableCell>
                            <TableCell className="hidden text-muted-foreground sm:table-cell">
                              {inv.date}
                            </TableCell>
                            <TableCell>{inv.amount}</TableCell>
                            <TableCell>
                              <Badge variant={invoiceVariant(inv.status)}>
                                {inv.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Subscription</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Current plan</p>
                      <p className="mt-1 text-lg font-semibold">
                        {ACCOUNT.plan} — Annual
                      </p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <p className="text-xs text-muted-foreground">
                        Contract value (ARR)
                      </p>
                      <p className="mt-1 text-2xl font-semibold tracking-tight">
                        $220,800
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Renews {ACCOUNT.renewal}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>ACH transfer •••• 4471</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage subscription
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
