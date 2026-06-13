"use client"

import * as React from "react"
import {
  Map,
  Plus,
  ChevronUp,
  Lightbulb,
  CircleDot,
  CheckCircle2,
  ListTodo,
  Filter,
  Github,
  Twitter,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Status = "planned" | "progress" | "shipped"

type Feature = {
  id: number
  title: string
  description: string
  status: Status
  category: string
  votes: number
  tags: string[]
}

const categories = ["All", "Editor", "Collaboration", "Integrations", "Performance", "Mobile"] as const

const features: Feature[] = [
  {
    id: 1,
    title: "Real-time multiplayer cursors",
    description: "See teammates editing live with presence avatars and follow mode.",
    status: "planned",
    category: "Collaboration",
    votes: 482,
    tags: ["Most wanted"],
  },
  {
    id: 2,
    title: "Offline-first sync engine",
    description: "Keep working without a connection and merge changes seamlessly on reconnect.",
    status: "planned",
    category: "Performance",
    votes: 311,
    tags: ["Infra"],
  },
  {
    id: 3,
    title: "Slash command palette",
    description: "Insert blocks, links, and templates with a keyboard-first menu.",
    status: "planned",
    category: "Editor",
    votes: 207,
    tags: ["Keyboard"],
  },
  {
    id: 4,
    title: "Native iOS app",
    description: "A first-class mobile experience with push notifications and widgets.",
    status: "progress",
    category: "Mobile",
    votes: 528,
    tags: ["Beta soon"],
  },
  {
    id: 5,
    title: "Zapier & Make integration",
    description: "Automate workflows by connecting to 5,000+ apps with no code.",
    status: "progress",
    category: "Integrations",
    votes: 264,
    tags: ["Partner"],
  },
  {
    id: 6,
    title: "Inline comment threads",
    description: "Discuss any block with resolvable, threaded comments and mentions.",
    status: "progress",
    category: "Collaboration",
    votes: 189,
    tags: ["In QA"],
  },
  {
    id: 7,
    title: "Dark mode redesign",
    description: "A refreshed, accessible dark theme tuned for long editing sessions.",
    status: "shipped",
    category: "Editor",
    votes: 643,
    tags: ["v3.2"],
  },
  {
    id: 8,
    title: "API rate limit increase",
    description: "Higher throughput limits across every plan with clearer error responses.",
    status: "shipped",
    category: "Performance",
    votes: 156,
    tags: ["v3.1"],
  },
  {
    id: 9,
    title: "Linear sync",
    description: "Two-way sync of tasks and statuses with your Linear workspace.",
    status: "shipped",
    category: "Integrations",
    votes: 298,
    tags: ["v3.0"],
  },
]

const columns: { status: Status; label: string; icon: typeof Lightbulb; hint: string }[] = [
  { status: "planned", label: "Planned", icon: Lightbulb, hint: "Under consideration" },
  { status: "progress", label: "In progress", icon: CircleDot, hint: "Actively building" },
  { status: "shipped", label: "Shipped", icon: CheckCircle2, hint: "Live in production" },
]

export default function PublicRoadmap() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All")
  const [voted, setVoted] = React.useState<Record<number, boolean>>({})

  const toggleVote = (id: number) =>
    setVoted((prev) => ({ ...prev, [id]: !prev[id] }))

  const visible =
    activeCategory === "All"
      ? features
      : features.filter((f) => f.category === activeCategory)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Map className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Driftwork</span>
            <Badge variant="secondary" className="ml-1 hidden sm:inline-flex">Roadmap</Badge>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex" aria-label="Primary">
            <a href="#roadmap" className="transition-colors hover:text-foreground">Roadmap</a>
            <a href="#changelog" className="transition-colors hover:text-foreground">Changelog</a>
            <a href="#feedback" className="transition-colors hover:text-foreground">Feedback</a>
          </nav>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Submit idea
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <Badge variant="outline" className="mb-4 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Building in the open
            </Badge>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              The Driftwork product roadmap
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Vote on what matters, follow what we are building, and shape where the product goes next. Every release starts as an idea here.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button className="gap-1.5">
                <Plus className="h-4 w-4" />
                Submit an idea
              </Button>
              <Button variant="outline" className="gap-1.5">
                View changelog
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div>
                <span className="text-xl font-semibold tabular-nums">3,074</span>
                <span className="ml-1.5 text-muted-foreground">total votes</span>
              </div>
              <div>
                <span className="text-xl font-semibold tabular-nums">42</span>
                <span className="ml-1.5 text-muted-foreground">ideas this quarter</span>
              </div>
              <div>
                <span className="text-xl font-semibold tabular-nums">11</span>
                <span className="ml-1.5 text-muted-foreground">shipped in 2025</span>
              </div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filter by category
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                    activeCategory === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {columns.map((col) => {
              const items = visible.filter((f) => f.status === col.status)
              const ColIcon = col.icon
              return (
                <div key={col.status} className="flex flex-col">
                  <div className="mb-3 flex items-center gap-2">
                    <ColIcon className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold">{col.label}</h2>
                    <Badge variant="secondary" className="ml-auto tabular-nums">{items.length}</Badge>
                  </div>
                  <p className="mb-4 text-xs text-muted-foreground">{col.hint}</p>
                  <div className="flex flex-1 flex-col gap-3 rounded-xl bg-muted/30 p-3">
                    {items.length === 0 ? (
                      <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-10 text-center">
                        <ListTodo className="h-5 w-5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Nothing here for this category yet.</p>
                      </div>
                    ) : (
                      items.map((feature) => {
                        const isVoted = !!voted[feature.id]
                        const count = feature.votes + (isVoted ? 1 : 0)
                        return (
                          <Card key={feature.id} className="border bg-card transition-shadow hover:shadow-sm">
                            <CardContent className="flex gap-3 p-4">
                              <button
                                type="button"
                                onClick={() => toggleVote(feature.id)}
                                aria-pressed={isVoted}
                                aria-label={`Upvote ${feature.title}`}
                                className={cn(
                                  "flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-lg border text-xs font-semibold transition-colors",
                                  isVoted
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "bg-background text-muted-foreground hover:border-primary hover:text-foreground",
                                )}
                              >
                                <ChevronUp className="h-4 w-4" />
                                <span className="tabular-nums">{count}</span>
                              </button>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-semibold leading-snug">{feature.title}</h3>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{feature.description}</p>
                                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                                  <Badge variant="outline" className="text-[11px]">{feature.category}</Badge>
                                  {feature.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-[11px]">{tag}</Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section id="feedback" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <Card className="overflow-hidden border bg-card">
              <CardContent className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2">
                <div>
                  <Badge variant="outline" className="mb-4 gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5" />
                    Have an idea?
                  </Badge>
                  <h2 className="text-2xl font-bold tracking-tight">Tell us what to build next</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drop a quick idea and the community can vote it up. The most popular requests move straight onto the roadmap.
                  </p>
                </div>
                <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                  <Input placeholder="A short title for your idea" aria-label="Idea title" />
                  <Input placeholder="your@email.com" type="email" aria-label="Email" />
                  <Button type="submit" className="gap-1.5 self-start">
                    <Plus className="h-4 w-4" />
                    Submit idea
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Map className="h-3.5 w-3.5" />
            </div>
            <span>© 2025 Driftwork. Built in the open.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#changelog" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </a>
            <a href="#twitter" aria-label="Twitter" className="transition-colors hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#github" aria-label="GitHub" className="transition-colors hover:text-foreground">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
