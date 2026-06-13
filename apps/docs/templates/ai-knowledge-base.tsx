"use client"

import * as React from "react"
import {
  ArrowUp,
  BookOpen,
  CheckCircle2,
  FileText,
  FolderClosed,
  Library,
  Plus,
  Quote,
  Search,
  Sparkles,
  Star,
  Tag,
  Wand2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type Source = {
  id: string
  title: string
  type: string
  pages: number
  status: "indexed" | "indexing"
}

const SOURCES: Source[] = [
  { id: "s1", title: "Product Handbook v4", type: "PDF", pages: 142, status: "indexed" },
  { id: "s2", title: "Onboarding Playbook", type: "DOC", pages: 38, status: "indexed" },
  { id: "s3", title: "Security & Compliance", type: "PDF", pages: 64, status: "indexed" },
  { id: "s4", title: "API Reference Export", type: "MD", pages: 211, status: "indexed" },
  { id: "s5", title: "Q2 Strategy Notes", type: "DOC", pages: 17, status: "indexing" },
  { id: "s6", title: "Support Macros Library", type: "CSV", pages: 9, status: "indexed" },
]

const COLLECTIONS = [
  { name: "All sources", count: 6, key: "all" },
  { name: "Engineering", count: 2, key: "eng" },
  { name: "Operations", count: 3, key: "ops" },
  { name: "Starred", count: 1, key: "star" },
] as const

type Citation = {
  marker: number
  source: string
  snippet: string
}

type Answer = {
  summary: string
  bullets: string[]
  citations: Citation[]
  confidence: string
}

const SYNTHESIZED: Answer = {
  summary:
    "New customers move through a four-stage onboarding flow: account provisioning, workspace setup, the guided product tour, and a 14-day activation checklist. Most teams reach their first activated milestone within 6 days.",
  bullets: [
    "Provisioning is automated once the admin verifies the work email domain.",
    "The guided tour can be skipped, but completion lifts week-one retention by 23%.",
    "Activation is measured by three core actions, not by login count alone.",
  ],
  citations: [
    {
      marker: 1,
      source: "Onboarding Playbook",
      snippet: "Stage 1 provisioning completes automatically after domain verification.",
    },
    {
      marker: 2,
      source: "Product Handbook v4",
      snippet: "Activation requires three core actions within the first 14 days.",
    },
    {
      marker: 3,
      source: "Q2 Strategy Notes",
      snippet: "Tour completion correlated with a 23% lift in week-one retention.",
    },
  ],
  confidence: "High",
}

const SUGGESTED = [
  "How does the onboarding flow work?",
  "What counts as an activated account?",
  "Summarize our security posture",
  "Which docs cover the public API?",
]

const RECENT = [
  "How do we handle refunds over $500?",
  "What is our data retention window?",
  "Steps to rotate an API key",
]

const TYPE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  DOC: FileText,
  MD: FileText,
  CSV: FileText,
}

export default function AiKnowledgeBase() {
  const [collection, setCollection] = React.useState<string>("all")
  const [question, setQuestion] = React.useState("")
  const [submitted, setSubmitted] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState("")

  const filteredSources = SOURCES.filter((s) =>
    query ? s.title.toLowerCase().includes(query.toLowerCase()) : true
  )

  function ask(q: string) {
    const text = q.trim()
    if (!text) return
    setSubmitted(text)
    setQuestion(text)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    ask(question)
  }

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Sources sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex items-center gap-2 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Library className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">Athenaeum</span>
        </div>

        <div className="px-3 pb-3">
          <Button className="w-full justify-start gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Add source
          </Button>
        </div>

        <nav className="flex flex-col gap-0.5 px-3" aria-label="Collections">
          {COLLECTIONS.map((c) => {
            const active = collection === c.key
            return (
              <button
                key={c.key}
                onClick={() => setCollection(c.key)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {c.key === "star" ? (
                  <Star className="h-4 w-4 shrink-0" />
                ) : (
                  <FolderClosed className="h-4 w-4 shrink-0" />
                )}
                <span className="flex-1 text-left">{c.name}</span>
                <span
                  className={cn(
                    "text-xs",
                    active ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {c.count}
                </span>
              </button>
            )
          })}
        </nav>

        <Separator className="my-4" />

        <div className="flex min-h-0 flex-1 flex-col px-3">
          <div className="relative mb-3 px-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter documents"
              className="pl-9"
              aria-label="Filter documents"
            />
          </div>
          <p className="mb-2 flex items-center gap-2 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Tag className="h-3.5 w-3.5" /> Indexed documents
          </p>
          <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pb-4">
            {filteredSources.map((s) => {
              const Icon = TYPE_ICON[s.type] ?? FileText
              return (
                <li key={s.id}>
                  <div className="flex items-start gap-3 rounded-md px-2 py-2 hover:bg-accent">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{s.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.type} · {s.pages} pages
                      </p>
                    </div>
                    {s.status === "indexing" ? (
                      <Badge variant="outline" className="shrink-0 font-normal">
                        Indexing
                      </Badge>
                    ) : (
                      <CheckCircle2
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-label="Indexed"
                      />
                    )}
                  </div>
                </li>
              )
            })}
            {filteredSources.length === 0 ? (
              <li className="px-2 py-6 text-center text-sm text-muted-foreground">
                No documents match your filter.
              </li>
            ) : null}
          </ul>
        </div>
      </aside>

      {/* Main assistant column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-6 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-sm font-semibold leading-tight">
                Knowledge Assistant
              </h1>
              <p className="text-xs text-muted-foreground">
                Grounded in 6 indexed sources
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden gap-1 font-normal sm:inline-flex">
              <BookOpen className="h-3.5 w-3.5" /> 481 pages
            </Badge>
            <Avatar className="h-8 w-8">
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:px-8">
          {/* Ask box */}
          <section aria-label="Ask the knowledge base">
            <div className="mb-2 flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold tracking-tight">
                Ask your knowledge base
              </h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Answers are synthesized from your indexed documents and always
              cite their sources.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="rounded-xl border bg-card p-3 shadow-sm focus-within:border-primary">
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask anything about your documents…"
                  className="min-h-20 resize-none border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
                  aria-label="Your question"
                />
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">
                    Searching {collection === "all" ? "all sources" : collection}
                  </span>
                  <Button
                    type="submit"
                    size="sm"
                    className="gap-1.5"
                    disabled={!question.trim()}
                  >
                    Ask <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>

            {/* Suggested questions */}
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>

          {/* Answer or empty state */}
          {submitted ? (
            <section className="mt-8" aria-label="Synthesized answer">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">You asked</p>
                  <p className="text-sm font-medium">{submitted}</p>
                </div>
                <Badge variant="outline" className="shrink-0 gap-1 font-normal">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  {SYNTHESIZED.confidence} confidence
                </Badge>
              </div>

              <div className="rounded-xl border bg-card p-5">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {SYNTHESIZED.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {SYNTHESIZED.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-5" />

                <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Quote className="h-3.5 w-3.5" /> Citations
                </p>
                <div className="flex flex-wrap gap-2">
                  {SYNTHESIZED.citations.map((c) => (
                    <span
                      key={c.marker}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        {c.marker}
                      </span>
                      {c.source}
                    </span>
                  ))}
                </div>

                <ol className="mt-4 space-y-3">
                  {SYNTHESIZED.citations.map((c) => (
                    <li key={c.marker} className="flex gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {c.marker}
                      </span>
                      <div className="min-w-0 flex-1 border-l-2 border-muted pl-3">
                        <p className="text-sm italic text-muted-foreground">
                          “{c.snippet}”
                        </p>
                        <p className="mt-1 text-xs font-medium text-foreground">
                          {c.source}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ) : (
            <section className="mt-10" aria-label="Recent questions">
              <div className="rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Ready when you are</p>
                <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                  Ask a question above, or pick a suggestion. Every answer is
                  grounded in your indexed documents with traceable citations.
                </p>
              </div>

              <div className="mt-8">
                <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  <Search className="h-3.5 w-3.5" /> Recent questions
                </p>
                <ul className="divide-y rounded-xl border bg-card">
                  {RECENT.map((r) => (
                    <li key={r}>
                      <button
                        onClick={() => ask(r)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-muted/50"
                      >
                        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="flex-1">{r}</span>
                        <ArrowUp className="h-4 w-4 shrink-0 rotate-45 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
