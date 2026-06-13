"use client"

import * as React from "react"
import {
  Search,
  Plug,
  Check,
  Star,
  ArrowRight,
  Sparkles,
  MessageSquare,
  CreditCard,
  BarChart3,
  Mail,
  Calendar,
  Database,
  Cloud,
  GitBranch,
  Headphones,
  ShoppingCart,
  FileText,
  Megaphone,
  Webhook,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const categories = [
  "All",
  "Communication",
  "Payments",
  "Analytics",
  "Marketing",
  "Developer",
  "Sales",
  "Productivity",
] as const

type Category = (typeof categories)[number]

type Integration = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  category: Exclude<Category, "All">
  desc: string
  installs: string
  connected?: boolean
}

const integrations: Integration[] = [
  { name: "Slack", icon: MessageSquare, category: "Communication", desc: "Send alerts and updates straight into your team channels.", installs: "48k", connected: true },
  { name: "Stripe", icon: CreditCard, category: "Payments", desc: "Sync invoices, subscriptions, and payment events in real time.", installs: "61k" },
  { name: "Mixpanel", icon: BarChart3, category: "Analytics", desc: "Stream product events for funnels and retention analysis.", installs: "22k" },
  { name: "Mailchimp", icon: Mail, category: "Marketing", desc: "Push contacts into audiences and trigger email journeys.", installs: "37k" },
  { name: "GitHub", icon: GitBranch, category: "Developer", desc: "Link commits to issues and automate deploy notifications.", installs: "54k", connected: true },
  { name: "Salesforce", icon: Cloud, category: "Sales", desc: "Two-way contact and opportunity sync with your CRM.", installs: "29k" },
  { name: "Google Calendar", icon: Calendar, category: "Productivity", desc: "Create events and reminders from any workflow trigger.", installs: "44k" },
  { name: "Segment", icon: Database, category: "Analytics", desc: "Route customer data to every destination from one source.", installs: "18k" },
  { name: "Zendesk", icon: Headphones, category: "Communication", desc: "Open tickets and surface customer context automatically.", installs: "26k" },
  { name: "Shopify", icon: ShoppingCart, category: "Sales", desc: "Sync orders, products, and inventory with your store.", installs: "33k" },
  { name: "Notion", icon: FileText, category: "Productivity", desc: "Mirror records into databases and keep docs up to date.", installs: "41k" },
  { name: "HubSpot", icon: Megaphone, category: "Marketing", desc: "Sync leads and trigger nurture campaigns from events.", installs: "35k" },
  { name: "PayPal", icon: CreditCard, category: "Payments", desc: "Capture payments and reconcile transactions on the fly.", installs: "20k" },
  { name: "Webhooks", icon: Webhook, category: "Developer", desc: "Send custom HTTP payloads to any endpoint you control.", installs: "57k" },
  { name: "Intercom", icon: MessageSquare, category: "Communication", desc: "Identify users and send proactive in-app messages.", installs: "23k" },
]

const featured: Integration[] = [integrations[0], integrations[1], integrations[4], integrations[10]]

const stats = [
  { label: "Integrations", value: "320+" },
  { label: "Avg. setup", value: "4 min" },
  { label: "Uptime", value: "99.99%" },
]

export default function IntegrationsDirectory() {
  const [active, setActive] = React.useState<Category>("All")
  const [query, setQuery] = React.useState("")

  const visible = integrations.filter((i) => {
    const matchesCategory = active === "All" || i.category === active
    const q = query.trim().toLowerCase()
    const matchesQuery =
      q === "" ||
      i.name.toLowerCase().includes(q) ||
      i.desc.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Plug className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">Conduit</span>
          </div>
          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#directory" className="transition-colors hover:text-foreground">Directory</a>
            <a href="#featured" className="transition-colors hover:text-foreground">Featured</a>
            <a href="#" className="transition-colors hover:text-foreground">Docs</a>
            <a href="#" className="transition-colors hover:text-foreground">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Build an app</Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                12 new apps this month
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Connect every tool in your stack
              </h1>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                Browse hundreds of integrations and wire them up in minutes. No code, no
                maintenance, no broken syncs.
              </p>
              <div className="relative mx-auto mt-8 max-w-lg">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search integrations…"
                  aria-label="Search integrations"
                  className="h-12 pl-10 text-base"
                />
              </div>
            </div>
            <div className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6">
          <div className="mb-6 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold tracking-tight">Featured integrations</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item) => (
              <Card key={item.name} className="border-primary/30 bg-primary/5">
                <CardContent className="flex flex-col gap-4 p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <Badge variant="outline" className="gap-1 bg-background">
                      <Star className="h-3 w-3 text-primary" />
                      Popular
                    </Badge>
                  </div>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Button size="sm" className="mt-auto w-full" variant={item.connected ? "secondary" : "default"}>
                    {item.connected ? (
                      <>
                        <Check className="h-4 w-4" />
                        Connected
                      </>
                    ) : (
                      <>
                        Connect
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="directory" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Browse the directory</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {visible.length} {visible.length === 1 ? "integration" : "integrations"}
                {active !== "All" ? ` in ${active}` : ""}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map((cat) => {
              const isActive = active === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          <Separator className="my-8" />

          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Search className="h-5 w-5 text-muted-foreground" />
              </span>
              <p className="mt-4 font-medium">No integrations found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a different search term or category.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setActive("All")
                  setQuery("")
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => (
                <Card key={item.name} className="group transition-colors hover:border-primary/50">
                  <CardContent className="flex h-full flex-col gap-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                        <item.icon className="h-5 w-5" />
                      </span>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                      <span className="text-xs text-muted-foreground">{item.installs} installs</span>
                      <Button
                        size="sm"
                        variant={item.connected ? "secondary" : "outline"}
                        aria-label={item.connected ? `${item.name} connected` : `Connect ${item.name}`}
                      >
                        {item.connected ? (
                          <>
                            <Check className="h-4 w-4" />
                            Connected
                          </>
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Webhook className="h-6 w-6" />
            </span>
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Don&apos;t see what you need?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Build your own integration with our REST API and webhooks, or request one and
                we&apos;ll prioritize it for the roadmap.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                Read the API docs
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Request an integration
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Plug className="h-3.5 w-3.5" />
            </span>
            <span className="font-medium text-foreground">Conduit</span>
            <span>© 2024</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-foreground">Status</a>
            <a href="#" className="transition-colors hover:text-foreground">Changelog</a>
            <a href="#" className="transition-colors hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
