"use client"

import * as React from "react"
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Hash,
  History,
  Home,
  Link2,
  MessageSquare,
  PencilLine,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Section = { id: string; title: string }
type Article = {
  id: string
  space: string
  spaceLabel: string
  title: string
  emoji: string
  author: string
  initials: string
  updated: string
  readTime: string
  tags: string[]
  intro: string
  sections: { heading: string; body: string[] }[]
}

const SPACES = [
  { id: "all", label: "All spaces", icon: BookOpen },
  { id: "eng", label: "Engineering", icon: Hash },
  { id: "design", label: "Design", icon: Hash },
  { id: "people", label: "People Ops", icon: Hash },
]

const ARTICLES: Article[] = [
  {
    id: "onboarding",
    space: "people",
    spaceLabel: "People Ops",
    title: "New Hire Onboarding Guide",
    emoji: "🚀",
    author: "Priya Nair",
    initials: "PN",
    updated: "2 hours ago",
    readTime: "6 min read",
    tags: ["onboarding", "checklist"],
    intro:
      "Everything a new teammate needs in their first two weeks — accounts, introductions, and the rituals that make us tick.",
    sections: [
      {
        heading: "Before day one",
        body: [
          "IT provisions your laptop and core accounts 48 hours ahead of your start date. You'll receive a welcome email with temporary credentials and a link to set up multi-factor authentication.",
          "Your onboarding buddy reaches out the Friday before to schedule a coffee chat and answer any early questions.",
        ],
      },
      {
        heading: "Your first week",
        body: [
          "Spend the first three days reading through your team's space and shadowing standups. Resist the urge to ship anything — context first.",
          "Book 1:1s with each direct collaborator. A short intro call now saves hours of confusion later.",
        ],
      },
      {
        heading: "Tools & access",
        body: [
          "Request access to repositories through the self-serve portal. Approvals are usually granted within an hour during business days.",
        ],
      },
    ],
  },
  {
    id: "deploys",
    space: "eng",
    spaceLabel: "Engineering",
    title: "Production Deploy Runbook",
    emoji: "⚙️",
    author: "Marcus Lee",
    initials: "ML",
    updated: "Yesterday",
    readTime: "9 min read",
    tags: ["runbook", "infra", "on-call"],
    intro:
      "The canonical steps for shipping to production safely, plus what to do when a deploy goes sideways.",
    sections: [
      {
        heading: "Pre-flight checklist",
        body: [
          "Confirm the release branch is green on CI and that the changelog entry is merged. Never deploy on a red pipeline.",
          "Announce the deploy window in the #releases channel so on-call is aware before traffic shifts.",
        ],
      },
      {
        heading: "Rolling out",
        body: [
          "Promote to the canary fleet first and watch error rates for ten minutes. A clean canary is the gate to full rollout.",
          "Use the gradual rollout slider — 10%, 50%, then 100% — pausing at each step to read the dashboards.",
        ],
      },
      {
        heading: "Rolling back",
        body: [
          "If latency or error budgets breach, trigger the one-click rollback. Speed beats diagnosis during an incident.",
        ],
      },
    ],
  },
  {
    id: "design-system",
    space: "design",
    spaceLabel: "Design",
    title: "Design System Principles",
    emoji: "🎨",
    author: "Sofia Alvarez",
    initials: "SA",
    updated: "3 days ago",
    readTime: "5 min read",
    tags: ["design", "tokens"],
    intro:
      "How we keep a consistent, accessible product surface across every team and every screen.",
    sections: [
      {
        heading: "Tokens over values",
        body: [
          "Always reach for a semantic token rather than a raw hex value. Tokens carry intent and adapt automatically to light and dark themes.",
        ],
      },
      {
        heading: "Spacing rhythm",
        body: [
          "We use a four-point base grid. Stick to the scale so layouts feel intentional rather than improvised.",
          "Generous whitespace is a feature, not wasted space — let content breathe.",
        ],
      },
      {
        heading: "Accessibility first",
        body: [
          "Every interactive element needs a visible focus state and a label a screen reader can announce. No exceptions.",
        ],
      },
    ],
  },
  {
    id: "pto",
    space: "people",
    spaceLabel: "People Ops",
    title: "Time Off & Leave Policy",
    emoji: "🌴",
    author: "Priya Nair",
    initials: "PN",
    updated: "Last week",
    readTime: "4 min read",
    tags: ["policy", "benefits"],
    intro:
      "Our flexible time-off philosophy, how to request leave, and what counts toward your balance.",
    sections: [
      {
        heading: "Requesting time off",
        body: [
          "Submit requests through the HR portal at least two weeks ahead for anything longer than three days. Shorter breaks just need a heads-up to your manager.",
        ],
      },
      {
        heading: "Holidays & closures",
        body: [
          "Company-wide closures are listed on the People Ops calendar and don't count against your personal balance.",
        ],
      },
    ],
  },
]

const RECENT = [
  { id: "deploys", title: "Production Deploy Runbook", who: "Marcus Lee", when: "Yesterday" },
  { id: "design-system", title: "Design System Principles", who: "Sofia Alvarez", when: "3 days ago" },
  { id: "onboarding", title: "New Hire Onboarding Guide", who: "Priya Nair", when: "2 hours ago" },
  { id: "pto", title: "Time Off & Leave Policy", who: "Priya Nair", when: "Last week" },
]

export default function TeamWikiTemplate() {
  const [activeSpace, setActiveSpace] = React.useState("all")
  const [query, setQuery] = React.useState("")
  const [activeId, setActiveId] = React.useState("onboarding")
  const [openSpaces, setOpenSpaces] = React.useState(true)

  const treeArticles = ARTICLES.filter((a) => {
    const inSpace = activeSpace === "all" || a.space === activeSpace
    const q = query.trim().toLowerCase()
    const inQuery =
      q === "" ||
      a.title.toLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q)) ||
      a.intro.toLowerCase().includes(q)
    return inSpace && inQuery
  })

  const active = ARTICLES.find((a) => a.id === activeId) ?? ARTICLES[0]
  const toc: Section[] = active.sections.map((s, i) => ({
    id: `${active.id}-${i}`,
    title: s.heading,
  }))

  return (
    <div className="flex min-h-full bg-background text-foreground">
      {/* Left tree */}
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-muted/30 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b px-5">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen className="size-4" />
          </div>
          <span className="text-sm font-semibold">Orbit Wiki</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <nav className="space-y-0.5">
            <a
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
            >
              <Home className="size-4" />
              Home
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent"
            >
              <Star className="size-4" />
              Starred
            </a>
          </nav>

          <Separator className="my-3" />

          <button
            type="button"
            onClick={() => setOpenSpaces((v) => !v)}
            className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            <span>Spaces</span>
            {openSpaces ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronRight className="size-3.5" />
            )}
          </button>

          {openSpaces && (
            <div className="mt-1 space-y-1">
              {SPACES.filter((s) => s.id !== "all").map((s) => {
                const pages = ARTICLES.filter((a) => a.space === s.id)
                return (
                  <div key={s.id}>
                    <button
                      type="button"
                      onClick={() => setActiveSpace(s.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent",
                        activeSpace === s.id ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <s.icon className="size-3.5 text-muted-foreground" />
                      {s.label}
                    </button>
                    <div className="ml-5 mt-0.5 space-y-0.5 border-l pl-2">
                      {pages.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActiveId(p.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
                            activeId === p.id
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          <FileText className="size-3.5 shrink-0" />
                          <span className="truncate">{p.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="border-t p-3">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Plus className="size-4" />
            New page
          </Button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top search bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-6">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the wiki..."
              className="pl-9"
              aria-label="Search articles"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="size-4" />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Space filter chips */}
        <div className="flex flex-wrap items-center gap-2 border-b bg-muted/20 px-4 py-3 md:px-6">
          {SPACES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSpace(s.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
                activeSpace === s.id
                  ? "border-primary bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <s.icon className="size-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Reader + page list */}
          <main className="min-w-0 flex-1 overflow-y-auto">
            {/* Filtered page selector (mobile + result list) */}
            {(query.trim() !== "" || treeArticles.length > 0) && (
              <div className="border-b bg-card px-4 py-3 md:px-6 lg:hidden">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {query.trim() !== ""
                    ? `${treeArticles.length} result${treeArticles.length === 1 ? "" : "s"}`
                    : "Pages"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {treeArticles.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setActiveId(a.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm",
                        activeId === a.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent"
                      )}
                    >
                      <span>{a.emoji}</span>
                      {a.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <article className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
              {/* Breadcrumb */}
              <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <BookOpen className="size-3.5" />
                <span>{active.spaceLabel}</span>
                <ChevronRight className="size-3.5" />
                <span className="text-foreground">{active.title}</span>
              </div>

              <div className="mb-6 flex items-start gap-3">
                <span className="text-3xl leading-none">{active.emoji}</span>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{active.title}</h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Avatar className="size-5">
                        <AvatarFallback className="text-[10px]">
                          {active.initials}
                        </AvatarFallback>
                      </Avatar>
                      {active.author}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <PencilLine className="size-3.5" />
                      Updated {active.updated}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {active.readTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-2">
                {active.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="font-normal">
                    #{t}
                  </Badge>
                ))}
                <div className="ml-auto flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <Share2 className="size-3.5" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <Star className="size-3.5" />
                    Star
                  </Button>
                </div>
              </div>

              <Separator className="mb-6" />

              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {active.intro}
              </p>

              <div className="space-y-10">
                {active.sections.map((s, i) => (
                  <section key={`${active.id}-${i}`} id={`${active.id}-${i}`}>
                    <h2 className="group mb-3 flex items-center gap-2 text-xl font-semibold tracking-tight">
                      <Hash className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      {s.heading}
                    </h2>
                    <div className="space-y-4">
                      {s.body.map((p, j) => (
                        <p key={j} className="leading-relaxed text-foreground/90">
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <Separator className="my-10" />

              <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
                <MessageSquare className="size-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Was this page helpful?</p>
                  <p className="text-sm text-muted-foreground">
                    Leave a comment or suggest an edit for the next reader.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <PencilLine className="size-3.5" />
                  Suggest edit
                </Button>
              </div>
            </article>
          </main>

          {/* Right rail: TOC + recently edited */}
          <aside className="hidden w-72 shrink-0 overflow-y-auto border-l bg-muted/20 p-5 xl:block">
            <div>
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Link2 className="size-3.5" />
                On this page
              </p>
              <nav className="space-y-1 border-l">
                {toc.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="block border-l-2 border-transparent py-1 pl-3 text-sm text-muted-foreground hover:border-primary hover:text-foreground"
                  >
                    {t.title}
                  </a>
                ))}
              </nav>
            </div>

            <Separator className="my-6" />

            <div>
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <History className="size-3.5" />
                Recently edited
              </p>
              <div className="space-y-1">
                {RECENT.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setActiveId(r.id)}
                    className={cn(
                      "block w-full rounded-md px-2 py-1.5 text-left hover:bg-accent",
                      activeId === r.id && "bg-accent"
                    )}
                  >
                    <p className="truncate text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.who} · {r.when}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
