"use client"
import * as React from "react"
import {
  Search,
  Sparkles,
  FileText,
  MessageSquare,
  Mail,
  Globe,
  ArrowUpRight,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Filter,
  Command,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type SourceType = "Docs" | "Slack" | "Email" | "Web"

type Result = {
  id: number
  title: string
  snippet: string
  source: SourceType
  meta: string
}

const SOURCE_META: Record<
  SourceType,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  Docs: { icon: FileText, label: "Docs" },
  Slack: { icon: MessageSquare, label: "Slack" },
  Email: { icon: Mail, label: "Email" },
  Web: { icon: Globe, label: "Web" },
}

const SOURCE_ORDER: SourceType[] = ["Docs", "Slack", "Email", "Web"]

const ANSWER =
  "The Q3 onboarding revamp cut median time-to-first-value from 9 days to 4 days, driven by the new guided setup checklist and in-app sample data. Activation among self-serve signups rose 18 points, while support tickets tagged 'getting started' fell by roughly a third."

const CITATIONS: { id: number; label: string; source: SourceType }[] = [
  { id: 1, label: "Onboarding Revamp PRD", source: "Docs" },
  { id: 2, label: "#growth-experiments", source: "Slack" },
  { id: 3, label: "Q3 Activation Review", source: "Email" },
]

const RESULTS: Result[] = [
  {
    id: 1,
    title: "Onboarding Revamp PRD — v3 (final)",
    snippet:
      "Defines the guided setup checklist, sample-data seeding, and the activation north-star metric. Includes the rollout plan across self-serve and sales-assisted cohorts.",
    source: "Docs",
    meta: "Confluence · updated by Priya N.",
  },
  {
    id: 2,
    title: "#growth-experiments — activation thread",
    snippet:
      "'Median TTFV is down to 4 days for the checklist variant. Stat-sig at 95%. Shipping to 100% Monday.' — discussion with 24 replies.",
    source: "Slack",
    meta: "Slack · 24 replies",
  },
  {
    id: 3,
    title: "Q3 Activation Review — deck + notes",
    snippet:
      "Activation +18pts, getting-started tickets -32%. Exec summary attached with cohort breakdowns and next-quarter targets.",
    source: "Email",
    meta: "Email · from Marcus L.",
  },
  {
    id: 4,
    title: "How leading SaaS teams measure time-to-value",
    snippet:
      "Benchmark report on TTFV, activation, and the role of guided onboarding in reducing early churn across B2B products.",
    source: "Web",
    meta: "Web · saasmetrics.io",
  },
  {
    id: 5,
    title: "Setup Checklist — component spec",
    snippet:
      "Engineering spec for the in-product checklist widget: states, persistence, and analytics events fired on each step completion.",
    source: "Docs",
    meta: "Notion · updated by Dana R.",
  },
  {
    id: 6,
    title: "#support — getting-started tickets",
    snippet:
      "Triage channel summary showing the decline in onboarding-related tickets after the revamp shipped to all regions.",
    source: "Slack",
    meta: "Slack · 11 replies",
  },
]

const RECENT_SEARCHES = [
  "Q3 activation results",
  "time to first value benchmark",
  "setup checklist spec",
  "support ticket trends 2026",
]

const SUGGESTED = [
  "What drove the activation lift in Q3?",
  "Summarize the onboarding revamp PRD",
  "Show getting-started ticket trends",
]

function slugCount(source: SourceType, results: Result[]) {
  return results.filter((r) => r.source === source).length
}

export default function AiSearchPage() {
  const [query, setQuery] = React.useState("What drove the activation lift in Q3?")
  const [submitted, setSubmitted] = React.useState(true)
  const [activeFilters, setActiveFilters] = React.useState<SourceType[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const visibleResults = React.useMemo(() => {
    if (activeFilters.length === 0) return RESULTS
    return RESULTS.filter((r) => activeFilters.includes(r.source))
  }, [activeFilters])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim().length === 0) return
    setSubmitted(true)
  }

  function runSearch(q: string) {
    setQuery(q)
    setSubmitted(true)
    setActiveFilters([])
    inputRef.current?.focus()
  }

  function toggleFilter(source: SourceType) {
    setActiveFilters((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source]
    )
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Lumen Search</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">
              Enterprise
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              History
            </Button>
            <Button variant="outline" size="sm">
              <Command className="size-3.5" />
              Connectors
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <section className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 gap-1.5">
            <Sparkles className="size-3 text-primary" />
            Answer engine for your workspace
          </Badge>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ask anything across your company knowledge
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Search Docs, Slack, Email and the web in one place — with cited answers.
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="flex items-center gap-2 rounded-xl border bg-card p-2 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40">
              <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question or search for anything…"
                aria-label="Search query"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button type="submit" size="sm" className="shrink-0">
                <Sparkles className="size-3.5" />
                Answer
              </Button>
            </div>
          </form>

          {!submitted && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => runSearch(s)}
                  className="rounded-full border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </section>

        {submitted && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_260px]">
            <div className="min-w-0 space-y-6">
              <Card className="overflow-hidden border-primary/30">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Sparkles className="size-4" />
                    </div>
                    <span className="text-sm font-medium">AI Answer</span>
                    <Badge variant="secondary" className="ml-auto text-[11px]">
                      Synthesized from 3 sources
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{ANSWER}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {CITATIONS.map((c) => {
                      const Icon = SOURCE_META[c.source].icon
                      return (
                        <span
                          key={c.id}
                          className="inline-flex items-center gap-1.5 rounded-full border bg-muted/30 py-1 pl-1.5 pr-2.5 text-xs"
                        >
                          <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                            {c.id}
                          </span>
                          <Icon className="size-3 text-muted-foreground" />
                          <span className="max-w-[140px] truncate">{c.label}</span>
                        </span>
                      )
                    })}
                  </div>

                  <Separator className="my-4" />
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" aria-label="Helpful answer">
                      <ThumbsUp className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" aria-label="Not helpful">
                      <ThumbsDown className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="size-3.5" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Filter className="size-3.5" />
                    Sources
                  </span>
                  {SOURCE_ORDER.map((source) => {
                    const Icon = SOURCE_META[source].icon
                    const active = activeFilters.includes(source)
                    return (
                      <button
                        key={source}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleFilter(source)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
                          active
                            ? "border-primary bg-primary/10 text-primary"
                            : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <Icon className="size-3.5" />
                        {SOURCE_META[source].label}
                        <span className="opacity-60">{slugCount(source, RESULTS)}</span>
                      </button>
                    )
                  })}
                  {activeFilters.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveFilters([])}
                      className="text-xs text-primary underline-offset-2 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <p className="mb-3 text-xs text-muted-foreground">
                  {visibleResults.length} results
                  {activeFilters.length > 0 && " · filtered"}
                </p>

                <div className="space-y-3">
                  {visibleResults.map((r) => {
                    const Icon = SOURCE_META[r.source].icon
                    return (
                      <Card
                        key={r.id}
                        className="group transition-colors hover:border-primary/40"
                      >
                        <CardContent className="flex gap-3 p-4">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <Icon className="size-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="truncate text-sm font-medium">{r.title}</h3>
                              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              {r.snippet}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline" className="text-[11px]">
                                {r.source}
                              </Badge>
                              <span className="text-[11px] text-muted-foreground">
                                {r.meta}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                  {visibleResults.length === 0 && (
                    <Card>
                      <CardContent className="p-8 text-center text-sm text-muted-foreground">
                        No results for the selected sources.
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Clock className="size-3.5" />
                    Recent searches
                  </div>
                  <ul className="space-y-1">
                    {RECENT_SEARCHES.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => runSearch(s)}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          <Search className="size-3 shrink-0" />
                          <span className="truncate">{s}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="text-xs font-medium">Connected sources</h4>
                  <div className="mt-3 space-y-2">
                    {SOURCE_ORDER.map((source) => {
                      const Icon = SOURCE_META[source].icon
                      return (
                        <div key={source} className="flex items-center gap-2 text-xs">
                          <Icon className="size-3.5 text-muted-foreground" />
                          <span className="flex-1">{SOURCE_META[source].label}</span>
                          <span className="flex size-1.5 rounded-full bg-primary" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        )}
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>Lumen Search — answers grounded in your workspace.</span>
          <span>Indexed 14,802 documents · last sync 2m ago</span>
        </div>
      </footer>
    </div>
  )
}
