"use client"

import * as React from "react"
import {
  Banknote,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Plane,
  Receipt,
  ShieldCheck,
  Sparkles,
  Utensils,
  Wallet,
  Wrench,
  X,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Status = "Pending" | "Approved" | "Denied"
type Category = "Travel" | "Meals" | "Software" | "Equipment" | "Other"

type Expense = {
  id: string
  submitter: string
  initials: string
  team: string
  merchant: string
  category: Category
  amount: number
  submitted: string
  note: string
  status: Status
}

const CATEGORY_ICON: Record<Category, React.ComponentType<{ className?: string }>> = {
  Travel: Plane,
  Meals: Utensils,
  Software: Wrench,
  Equipment: Receipt,
  Other: FileText,
}

const INITIAL_EXPENSES: Expense[] = [
  {
    id: "EXP-4821",
    submitter: "Amelia Brooks",
    initials: "AB",
    team: "Sales",
    merchant: "Delta Air Lines",
    category: "Travel",
    amount: 642.4,
    submitted: "Jun 12",
    note: "Round trip to client onsite in Denver.",
    status: "Pending",
  },
  {
    id: "EXP-4820",
    submitter: "Daniel Cho",
    initials: "DC",
    team: "Engineering",
    merchant: "Figma Inc.",
    category: "Software",
    amount: 180.0,
    submitted: "Jun 12",
    note: "Annual design seat renewal for the platform team.",
    status: "Pending",
  },
  {
    id: "EXP-4818",
    submitter: "Sofia Marin",
    initials: "SM",
    team: "Marketing",
    merchant: "The Hearth Bistro",
    category: "Meals",
    amount: 96.75,
    submitted: "Jun 11",
    note: "Team dinner after the spring campaign launch.",
    status: "Pending",
  },
  {
    id: "EXP-4815",
    submitter: "Marcus Hale",
    initials: "MH",
    team: "Engineering",
    merchant: "Apple Store",
    category: "Equipment",
    amount: 1299.0,
    submitted: "Jun 10",
    note: "Replacement laptop for new backend hire.",
    status: "Pending",
  },
  {
    id: "EXP-4811",
    submitter: "Priya Nair",
    initials: "PN",
    team: "Design",
    merchant: "Notion Labs",
    category: "Software",
    amount: 64.0,
    submitted: "Jun 9",
    note: "Monthly workspace upgrade for research team.",
    status: "Approved",
  },
  {
    id: "EXP-4807",
    submitter: "Owen Frost",
    initials: "OF",
    team: "Sales",
    merchant: "Uber",
    category: "Travel",
    amount: 38.2,
    submitted: "Jun 8",
    note: "Airport transfer during regional roadshow.",
    status: "Approved",
  },
  {
    id: "EXP-4802",
    submitter: "Hannah Webb",
    initials: "HW",
    team: "Operations",
    merchant: "Luxe Steakhouse",
    category: "Meals",
    amount: 410.5,
    submitted: "Jun 6",
    note: "Client dinner — exceeds $300 meal cap.",
    status: "Denied",
  },
]

const TABS: Status[] = ["Pending", "Approved", "Denied"]

const POLICY = [
  { icon: Utensils, label: "Meals", limit: "Up to $300 per person" },
  { icon: Plane, label: "Air travel", limit: "Economy fares only" },
  { icon: Wrench, label: "Software", limit: "Manager pre-approval" },
  { icon: Receipt, label: "Equipment", limit: "Receipt required over $75" },
]

function categoryClasses(category: Category): string {
  switch (category) {
    case "Travel":
      return "bg-primary/10 text-primary"
    case "Meals":
      return "bg-accent text-foreground"
    case "Software":
      return "bg-secondary text-secondary-foreground"
    case "Equipment":
      return "bg-muted text-foreground"
    case "Other":
      return "bg-muted text-muted-foreground"
  }
}

function statusVariant(
  status: Status,
): "default" | "secondary" | "destructive" {
  switch (status) {
    case "Approved":
      return "default"
    case "Pending":
      return "secondary"
    case "Denied":
      return "destructive"
  }
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })
}

export default function ExpenseApprovals() {
  const [expenses, setExpenses] = React.useState<Expense[]>(INITIAL_EXPENSES)
  const [tab, setTab] = React.useState<Status>("Pending")

  const resolve = React.useCallback((id: string, status: Status) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    )
  }, [])

  const countByStatus = (status: Status) =>
    expenses.filter((e) => e.status === status).length

  const pendingTotal = expenses
    .filter((e) => e.status === "Pending")
    .reduce((sum, e) => sum + e.amount, 0)

  const approvedTotal = expenses
    .filter((e) => e.status === "Approved")
    .reduce((sum, e) => sum + e.amount, 0)

  const visible = expenses.filter((e) => e.status === tab)

  const kpis = [
    {
      label: "Awaiting review",
      value: String(countByStatus("Pending")),
      hint: formatCurrency(pendingTotal) + " in requests",
      icon: Clock,
    },
    {
      label: "Approved this cycle",
      value: String(countByStatus("Approved")),
      hint: formatCurrency(approvedTotal) + " reimbursed",
      icon: CheckCircle2,
    },
    {
      label: "Denied",
      value: String(countByStatus("Denied")),
      hint: "Policy violations",
      icon: XCircle,
    },
    {
      label: "Avg. turnaround",
      value: "1.8d",
      hint: "Down from 3.1d",
      icon: Sparkles,
    },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Wallet className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight">Ledgerly</p>
            <p className="truncate text-xs text-muted-foreground">
              Expense approvals
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <FileText className="h-4 w-4" />
              Export report
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Approvals queue
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review and resolve team expense requests against policy.
            </p>
          </div>
          <Badge variant="outline" className="gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Q2 budget cycle
          </Badge>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {kpi.label}
                </CardTitle>
                <kpi.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold tabular-nums">
                  {kpi.value}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Requests list */}
          <section className="lg:col-span-2">
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as Status)}
              className="w-full"
            >
              <TabsList>
                {TABS.map((t) => (
                  <TabsTrigger key={t} value={t}>
                    {t}
                    <span className="ml-1.5 rounded-full bg-muted px-1.5 text-xs tabular-nums">
                      {countByStatus(t)}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 space-y-3">
              {visible.map((e) => {
                const Icon = CATEGORY_ICON[e.category]
                return (
                  <Card key={e.id}>
                    <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback>{e.initials}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{e.submitter}</span>
                          <span className="text-xs text-muted-foreground">
                            {e.team}
                          </span>
                          <Badge variant={statusVariant(e.status)}>
                            {e.status}
                          </Badge>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                              categoryClasses(e.category),
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            {e.category}
                          </span>
                          <span>{e.merchant}</span>
                          <span aria-hidden="true">·</span>
                          <span>{e.id}</span>
                          <span aria-hidden="true">·</span>
                          <span>{e.submitted}</span>
                        </div>
                        <p className="mt-1.5 truncate text-sm text-muted-foreground">
                          {e.note}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <span className="text-lg font-semibold tabular-nums">
                          {formatCurrency(e.amount)}
                        </span>
                        {e.status === "Pending" ? (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              aria-label={`Deny ${e.id}`}
                              onClick={() => resolve(e.id, "Denied")}
                            >
                              <X className="h-4 w-4" />
                              Deny
                            </Button>
                            <Button
                              size="sm"
                              aria-label={`Approve ${e.id}`}
                              onClick={() => resolve(e.id, "Approved")}
                            >
                              <Check className="h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => resolve(e.id, "Pending")}
                          >
                            Reopen
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {visible.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 text-sm font-medium">All clear</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      No {tab.toLowerCase()} requests right now.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Policy sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Spend policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {POLICY.map((p, i) => (
                  <div key={p.label}>
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                        <p.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.limit}
                        </p>
                      </div>
                    </div>
                    {i < POLICY.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Banknote className="h-4 w-4 text-primary" />
                  This cycle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Pending value</span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(pendingTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Approved value</span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(approvedTotal)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Budget remaining</span>
                  <span className="font-medium text-primary tabular-nums">
                    {formatCurrency(18250 - approvedTotal)}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View ledger
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>Ledgerly — finance operations workspace</p>
          <p>Synced with accounting · Last update Jun 13</p>
        </div>
      </footer>
    </div>
  )
}
