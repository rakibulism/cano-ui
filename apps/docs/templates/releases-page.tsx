"use client"

import * as React from "react"
import {
  Rocket,
  Sparkles,
  Wrench,
  Zap,
  Bell,
  ArrowRight,
  Check,
  Github,
  Rss,
  Tag,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type ChangeKind = "Feature" | "Improvement" | "Fix"

type Release = {
  version: string
  date: string
  title: string
  highlight?: boolean
  changes: { kind: ChangeKind; items: string[] }[]
}

const RELEASES: Release[] = [
  {
    version: "v3.4.0",
    date: "Jun 11, 2026",
    title: "Workspaces, reimagined",
    highlight: true,
    changes: [
      {
        kind: "Feature",
        items: [
          "Introduced shared Workspaces so teams can group projects, members, and billing in one place.",
          "Added per-workspace API keys with scoped permissions and rotation reminders.",
        ],
      },
      {
        kind: "Improvement",
        items: [
          "The command palette now searches across every workspace you belong to.",
          "Reduced cold-start load time of the dashboard by roughly 40%.",
        ],
      },
    ],
  },
  {
    version: "v3.3.2",
    date: "May 28, 2026",
    title: "Editor stability pass",
    changes: [
      {
        kind: "Fix",
        items: [
          "Resolved an issue where unsaved drafts could be lost after an idle timeout.",
          "Fixed keyboard shortcuts conflicting with browser defaults on Windows.",
        ],
      },
      {
        kind: "Improvement",
        items: ["Autosave now runs every 5 seconds with a clear status indicator."],
      },
    ],
  },
  {
    version: "v3.3.0",
    date: "May 14, 2026",
    title: "Insights & exports",
    changes: [
      {
        kind: "Feature",
        items: [
          "New Insights tab with usage trends, top contributors, and weekly digests.",
          "Export any report to CSV or PDF directly from the share menu.",
        ],
      },
      {
        kind: "Fix",
        items: ["Corrected timezone handling in scheduled reports."],
      },
    ],
  },
  {
    version: "v3.2.1",
    date: "Apr 30, 2026",
    title: "Mobile polish",
    changes: [
      {
        kind: "Improvement",
        items: [
          "Reworked the mobile navigation for one-handed reach.",
          "Tables now scroll horizontally with sticky first columns.",
        ],
      },
      {
        kind: "Fix",
        items: ["Fixed avatar uploads failing on slow connections."],
      },
    ],
  },
]

const KIND_META: Record<
  ChangeKind,
  { icon: React.ComponentType<{ className?: string }>; badge: "default" | "secondary" | "outline" }
> = {
  Feature: { icon: Sparkles, badge: "default" },
  Improvement: { icon: Zap, badge: "secondary" },
  Fix: { icon: Wrench, badge: "outline" },
}

const FILTERS: ("All" | ChangeKind)[] = ["All", "Feature", "Improvement", "Fix"]

export default function ReleasesPage() {
  const [filter, setFilter] = React.useState<"All" | ChangeKind>("All")
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const visible = RELEASES.map((release) => ({
    ...release,
    changes:
      filter === "All"
        ? release.changes
        : release.changes.filter((c) => c.kind === filter),
  })).filter((release) => release.changes.length > 0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Plated</span>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <span className="text-sm text-muted-foreground">Changelog</span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Docs
            </Button>
            <Button variant="ghost" size="icon" aria-label="RSS feed">
              <Rss className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="GitHub repository">
              <Github className="h-4 w-4" />
            </Button>
            <Button size="sm">Sign in</Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
        <section className="border-b py-12 sm:py-16">
          <Badge variant="secondary" className="mb-4 gap-1.5">
            <Bell className="h-3 w-3" />
            Updated weekly
          </Badge>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            What&apos;s new in Plated
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Every feature, improvement, and fix we ship — documented in one
            timeline. Follow along to stay current with the product.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                >
                  {f !== "All" && (
                    <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {f}
                </button>
              )
            })}
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <ol className="relative space-y-12 border-l pl-6 sm:pl-8">
            {visible.map((release) => (
              <li key={release.version} className="relative">
                <span
                  className={cn(
                    "absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-background sm:-left-[41px]",
                    release.highlight ? "bg-primary" : "bg-muted-foreground/40"
                  )}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold tracking-tight">
                      {release.version}
                    </h2>
                    {release.highlight && (
                      <Badge className="gap-1">
                        <Sparkles className="h-3 w-3" />
                        Major
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground sm:before:mr-3 sm:before:content-['·']">
                    {release.date}
                  </span>
                </div>
                <p className="mt-1 text-base font-medium text-foreground/90">
                  {release.title}
                </p>

                <div className="mt-5 space-y-6 rounded-xl border bg-card p-5 sm:p-6">
                  {release.changes.map((group) => {
                    const meta = KIND_META[group.kind]
                    const Icon = meta.icon
                    return (
                      <div key={group.kind}>
                        <div className="mb-3 flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <Badge variant={meta.badge}>{group.kind}</Badge>
                        </div>
                        <ul className="space-y-2 pl-1">
                          {group.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-sm text-muted-foreground"
                            >
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex justify-center">
            <Button variant="outline" className="gap-2">
              Load older releases
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="pb-16">
          <div className="overflow-hidden rounded-2xl border bg-muted/30">
            <div className="grid gap-8 p-6 sm:grid-cols-2 sm:items-center sm:p-10">
              <div>
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Bell className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Get the changelog in your inbox
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  One short email whenever we ship something noteworthy. No spam,
                  unsubscribe anytime.
                </p>
              </div>
              <div>
                {subscribed ? (
                  <div className="flex items-center gap-3 rounded-xl border bg-background p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">You&apos;re subscribed</p>
                      <p className="text-sm text-muted-foreground">
                        We&apos;ll keep you posted on every release.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (email.trim()) setSubscribed(true)
                    }}
                    className="space-y-3"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email address"
                        className="bg-background"
                      />
                      <Button type="submit" className="gap-2 sm:shrink-0">
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Prefer a feed? Add our{" "}
                      <span className="font-medium text-foreground">RSS</span> or
                      follow us on GitHub.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" />
            </div>
            <span>© 2026 Plated, Inc.</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Status
            </a>
            <a href="#" className="hover:text-foreground">
              Roadmap
            </a>
            <a href="#" className="hover:text-foreground">
              Docs
            </a>
            <a href="#" className="hover:text-foreground">
              Twitter
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
