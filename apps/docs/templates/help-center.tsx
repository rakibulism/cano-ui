"use client"

import * as React from "react"
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  Code2,
  LifeBuoy,
  Lock,
  MessageCircle,
  Mail,
  Menu,
  Rocket,
  Search,
  Settings,
  Users,
  FileText,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const categories = [
  {
    icon: Rocket,
    title: "Getting started",
    desc: "Set up your account and ship your first project in minutes.",
    count: 18,
  },
  {
    icon: CreditCard,
    title: "Billing & plans",
    desc: "Invoices, upgrades, refunds, and everything about payments.",
    count: 24,
  },
  {
    icon: Code2,
    title: "API & developers",
    desc: "Authentication, endpoints, webhooks, and SDK reference.",
    count: 41,
  },
  {
    icon: Settings,
    title: "Account & settings",
    desc: "Profiles, security, notifications, and workspace preferences.",
    count: 16,
  },
  {
    icon: Users,
    title: "Teams & permissions",
    desc: "Invite members, manage roles, and control access.",
    count: 12,
  },
  {
    icon: Lock,
    title: "Security & privacy",
    desc: "2FA, data handling, compliance, and audit logs.",
    count: 9,
  },
]

const popular = [
  { title: "How to reset your password", cat: "Account", reads: "32k" },
  { title: "Setting up two-factor authentication", cat: "Security", reads: "21k" },
  { title: "Understanding your invoice", cat: "Billing", reads: "19k" },
  { title: "Generating an API key", cat: "API", reads: "17k" },
  { title: "Inviting teammates to your workspace", cat: "Teams", reads: "14k" },
  { title: "Connecting your first integration", cat: "Getting started", reads: "11k" },
]

const suggestions = ["Refunds", "API rate limits", "SSO setup", "Export data"]

const quickLinks = [
  { icon: BookOpen, label: "Documentation" },
  { icon: FileText, label: "Release notes" },
  { icon: Code2, label: "API reference" },
  { icon: LifeBuoy, label: "System status" },
]

function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <LifeBuoy className="size-3.5" />
      </span>
      Helpdesk
    </span>
  )
}

export default function HelpCenter() {
  const [query, setQuery] = React.useState("")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#categories" className="hover:text-foreground">Browse</a>
            <a href="#popular" className="hover:text-foreground">Popular</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
            <a href="#" className="hover:text-foreground">Status</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="max-sm:hidden">Sign in</Button>
            <Button size="sm">Submit a ticket</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
            <Badge variant="secondary" className="mb-5">Help Center</Badge>
            <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              How can we help you today?
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Search our knowledge base or browse topics to find answers fast.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-9 flex max-w-xl items-center gap-2"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for articles, guides, and answers…"
                  aria-label="Search the help center"
                  className="h-12 pl-11 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="h-12">Search</Button>
            </form>
            <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border bg-background px-3 py-1 text-foreground transition-colors hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Browse by topic</h2>
            <p className="mt-3 text-muted-foreground">
              Pick a category to dive into guides and step-by-step articles.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = c.icon
              return (
                <Card
                  key={c.title}
                  className="group cursor-pointer transition-colors hover:border-primary"
                >
                  <CardContent className="flex flex-col gap-3 pt-6">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{c.title}</h3>
                      <Badge variant="outline" className="tabular-nums">{c.count}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
                    <span className="mt-1 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      View articles <ArrowRight className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section id="popular" className="border-t bg-muted/30">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight">Popular articles</h2>
              <p className="mt-3 text-muted-foreground">
                The answers people reach for most often.
              </p>
            </div>
            <Card className="mt-10 overflow-hidden p-0">
              <ul className="divide-y">
                {popular.map((a, i) => (
                  <li key={a.title}>
                    <a
                      href="#"
                      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{a.title}</p>
                        <p className="text-sm text-muted-foreground">{a.cat}</p>
                      </div>
                      <span className="shrink-0 text-sm tabular-nums text-muted-foreground max-sm:hidden">
                        {a.reads} reads
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((q) => {
              const Icon = q.icon
              return (
                <a
                  key={q.label}
                  href="#"
                  className="flex items-center gap-3 rounded-lg border bg-card px-4 py-4 transition-colors hover:bg-accent"
                >
                  <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <span className="font-medium">{q.label}</span>
                </a>
              )
            })}
          </div>
        </section>

        <section id="contact" className="border-t">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Card className="overflow-hidden border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageCircle className="size-6" />
                </span>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-balance">
                    Still need a hand?
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                    Our support team replies within a few hours, every day of the week.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button size="lg">
                    <Mail /> Contact support
                  </Button>
                  <Button size="lg" variant="outline">
                    <MessageCircle /> Live chat
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Average response time: under 2 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
          <Logo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="#" className="hover:text-foreground">Documentation</a>
            <a href="#" className="hover:text-foreground">Community</a>
            <a href="#" className="hover:text-foreground">Status</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </nav>
          <span>© 2026 Helpdesk, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
