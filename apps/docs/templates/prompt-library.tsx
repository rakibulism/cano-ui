"use client"

import * as React from "react"
import { Search, Copy, Check, Sparkles, Star, TrendingUp, Plus, Filter, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Prompt = {
  id: string
  title: string
  snippet: string
  category: string
  tags: string[]
  uses: number
  featured?: boolean
}

const CATEGORIES = ["All", "Writing", "Coding", "Marketing", "Research", "Productivity", "Design"] as const

const PROMPTS: Prompt[] = [
  {
    id: "p1",
    title: "Refactor for readability",
    snippet: "You are a senior engineer. Refactor the following code for clarity and maintainability. Explain each change in one line and keep behavior identical.",
    category: "Coding",
    tags: ["refactor", "code-review"],
    uses: 4820,
    featured: true,
  },
  {
    id: "p2",
    title: "Cold outreach email",
    snippet: "Write a 90-word cold email to a {{role}} at {{company}}. Lead with a specific pain point, keep one clear CTA, and sound human, not salesy.",
    category: "Marketing",
    tags: ["email", "sales"],
    uses: 3611,
    featured: true,
  },
  {
    id: "p3",
    title: "Explain like I'm five",
    snippet: "Explain {{topic}} to a curious 5-year-old using one everyday analogy. No jargon. End with a single sentence a parent could repeat.",
    category: "Writing",
    tags: ["explain", "simplify"],
    uses: 5290,
    featured: true,
  },
  {
    id: "p4",
    title: "Literature synthesis",
    snippet: "Summarize the key findings across these {{n}} sources. Note where they agree, where they conflict, and the strongest open question.",
    category: "Research",
    tags: ["summary", "academic"],
    uses: 1944,
  },
  {
    id: "p5",
    title: "Unit test generator",
    snippet: "Generate exhaustive unit tests for this function, covering happy path, edge cases, and one failure mode. Use the project's existing test style.",
    category: "Coding",
    tags: ["testing", "qa"],
    uses: 2730,
  },
  {
    id: "p6",
    title: "Blog post outline",
    snippet: "Create a skimmable outline for a 1,200-word post on {{topic}}. Include a hook, 4 H2 sections, and a takeaway box.",
    category: "Writing",
    tags: ["blog", "outline"],
    uses: 2105,
  },
  {
    id: "p7",
    title: "Weekly priorities",
    snippet: "Given my task list below, group items by impact and effort, then propose the 3 things I should do first this week and why.",
    category: "Productivity",
    tags: ["planning", "focus"],
    uses: 1582,
  },
  {
    id: "p8",
    title: "Landing page hero",
    snippet: "Write 3 hero headline + subhead pairs for {{product}}. One bold, one benefit-led, one playful. Keep headlines under 8 words.",
    category: "Marketing",
    tags: ["copywriting", "conversion"],
    uses: 2398,
  },
  {
    id: "p9",
    title: "Design feedback pass",
    snippet: "Critique this UI screenshot for hierarchy, spacing, and contrast. Give 5 prioritized fixes, most impactful first, with a why for each.",
    category: "Design",
    tags: ["critique", "ui"],
    uses: 1276,
  },
  {
    id: "p10",
    title: "Competitor teardown",
    snippet: "Analyze {{competitor}}'s positioning from their homepage copy. List their core promise, target buyer, and one gap we can own.",
    category: "Research",
    tags: ["competitive", "strategy"],
    uses: 1430,
  },
  {
    id: "p11",
    title: "Bug root-cause prompt",
    snippet: "Here is a stack trace and the relevant code. Propose the 3 most likely root causes ranked by probability, with a quick test for each.",
    category: "Coding",
    tags: ["debugging", "triage"],
    uses: 3045,
  },
  {
    id: "p12",
    title: "Meeting to action items",
    snippet: "Turn these raw meeting notes into a clean summary: decisions made, owners, due dates, and open questions. Be terse.",
    category: "Productivity",
    tags: ["notes", "summary"],
    uses: 2611,
  },
]

export default function PromptLibraryPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All")
  const [query, setQuery] = React.useState("")
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const featured = React.useMemo(() => PROMPTS.filter((p) => p.featured), [])

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROMPTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.snippet.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const handleCopy = (p: Prompt) => {
    setCopiedId(p.id)
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(p.snippet).catch(() => {})
    }
    window.setTimeout(() => setCopiedId((c) => (c === p.id ? null : c)), 1500)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-base font-semibold tracking-tight">PromptVault</span>
          </div>
          <nav className="ml-2 hidden items-center gap-1 text-sm md:flex">
            <a href="#library" className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">Library</a>
            <a href="#featured" className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">Featured</a>
            <a href="#library" className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">Collections</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              New prompt
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <section className="mb-8">
          <Badge variant="secondary" className="mb-3 gap-1">
            <Zap className="h-3 w-3" />
            142 curated prompts
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your team's prompt library</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Save, organize, and reuse the prompts that actually work. Filter by category, search by keyword, and copy in one click.
          </p>
          <div className="mt-5 flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search prompts, tags, or keywords..."
                className="pl-9"
                aria-label="Search prompts"
              />
            </div>
            <Button variant="outline" className="gap-1.5">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </section>

        <section id="featured" className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Featured this week</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Card key={p.id} className="border-primary/30 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-background">{p.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      {p.uses.toLocaleString()}
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-base">{p.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{p.snippet}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full gap-1.5"
                    onClick={() => handleCopy(p)}
                    aria-label={"Copy prompt " + p.title}
                  >
                    {copiedId === p.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedId === p.id ? "Copied" : "Copy prompt"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="library">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "prompt" : "prompts"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
              <Search className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="font-medium">No prompts found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different category or search term.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Card key={p.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{p.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        {p.uses.toLocaleString()} uses
                      </span>
                    </div>
                    <CardTitle className="mt-2 text-base">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="line-clamp-3 text-sm text-muted-foreground">{p.snippet}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1.5"
                      onClick={() => handleCopy(p)}
                      aria-label={"Copy prompt " + p.title}
                    >
                      {copiedId === p.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copiedId === p.id ? "Copied to clipboard" : "Copy"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>PromptVault</span>
          </div>
          <p>Built for teams that ship with AI.</p>
        </div>
      </footer>
    </div>
  )
}
