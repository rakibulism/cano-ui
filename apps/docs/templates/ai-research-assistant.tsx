"use client"
import * as React from "react"
import {
  Sparkles,
  Search,
  BookmarkPlus,
  FileText,
  Filter,
  Quote,
  ExternalLink,
  Clock,
  Star,
  Globe,
  FlaskConical,
  Newspaper,
  GraduationCap,
  ChevronRight,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type SourceType = "journal" | "preprint" | "web" | "thesis"

const SOURCE_TYPES: { id: SourceType; label: string; icon: React.ElementType }[] = [
  { id: "journal", label: "Peer-reviewed", icon: GraduationCap },
  { id: "preprint", label: "Preprints", icon: FlaskConical },
  { id: "web", label: "Web", icon: Globe },
  { id: "thesis", label: "Theses", icon: Newspaper },
]

const SAVED_SEARCHES = [
  { id: "s1", title: "Sparse attention scaling laws", count: 18 },
  { id: "s2", title: "RLHF reward hacking", count: 11 },
  { id: "s3", title: "Diffusion model distillation", count: 24 },
  { id: "s4", title: "Long-context retrieval", count: 9 },
]

const SOURCES: {
  id: number
  title: string
  authors: string
  venue: string
  year: string
  type: SourceType
  cites: number
}[] = [
  { id: 1, title: "Efficient Sparse Attention for Long Sequences", authors: "Okafor, Lindgren et al.", venue: "NeurIPS", year: "2024", type: "journal", cites: 412 },
  { id: 2, title: "Scaling Laws Under Sparse Routing", authors: "Mehta & Park", venue: "arXiv", year: "2025", type: "preprint", cites: 87 },
  { id: 3, title: "A Survey of Attention Sparsity Patterns", authors: "Delacroix et al.", venue: "JMLR", year: "2023", type: "journal", cites: 1190 },
  { id: 4, title: "Benchmarking Long-Context Recall on the Open Web", authors: "Hartwell Lab", venue: "blog.hartwell.ai", year: "2025", type: "web", cites: 0 },
  { id: 5, title: "Block-Sparse Kernels: A Reproducibility Study", authors: "N. Abara (PhD thesis)", venue: "ETH Zürich", year: "2024", type: "thesis", cites: 23 },
]

const RECENT_PAPERS = [
  { id: "r1", title: "Memory-Efficient Routing for MoE Decoders", tag: "preprint", date: "Jun 12" },
  { id: "r2", title: "Calibrated Uncertainty in Retrieval Chains", tag: "journal", date: "Jun 10" },
  { id: "r3", title: "On the Limits of Context Window Extension", tag: "preprint", date: "Jun 09" },
  { id: "r4", title: "Distillation Without Teacher Logits", tag: "journal", date: "Jun 07" },
]

const SUMMARY_POINTS = [
  { text: "Sparse attention reduces quadratic cost to near-linear while retaining 97% of dense recall on long-context benchmarks.", refs: [1, 2] },
  { text: "Scaling laws hold under block-sparse routing, though optimal sparsity shifts with model width.", refs: [2, 3] },
  { text: "Reproducibility remains a concern: kernel-level results vary across hardware and precision settings.", refs: [5] },
]

const TYPE_META: Record<SourceType, { label: string; icon: React.ElementType }> = {
  journal: { label: "Peer-reviewed", icon: GraduationCap },
  preprint: { label: "Preprint", icon: FlaskConical },
  web: { label: "Web", icon: Globe },
  thesis: { label: "Thesis", icon: Newspaper },
}

export default function AiResearchAssistant() {
  const [query, setQuery] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [activeSearch, setActiveSearch] = React.useState(SAVED_SEARCHES[0].id)
  const [activeTypes, setActiveTypes] = React.useState<SourceType[]>(["journal", "preprint", "web", "thesis"])

  const toggleType = (t: SourceType) =>
    setActiveTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const visibleSources = SOURCES.filter((s) => activeTypes.includes(s.type))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Lumen Scholar</p>
              <p className="text-xs text-muted-foreground">Research assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex gap-1">
              <Star className="h-3 w-3" /> Pro
            </Badge>
            <Avatar className="h-8 w-8">
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[16rem_minmax(0,1fr)_18rem]">
        {/* Left: saved searches */}
        <aside className="order-2 lg:order-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Saved searches
            </h2>
            <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="New saved search">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <nav className="mt-3 space-y-1">
            {SAVED_SEARCHES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSearch(s.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                  activeSearch === s.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <BookmarkPlus className="h-4 w-4 shrink-0" />
                  <span className="truncate">{s.title}</span>
                </span>
                <span className="ml-2 shrink-0 text-xs tabular-nums">{s.count}</span>
              </button>
            ))}
          </nav>

          <Separator className="my-5" />

          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <p className="text-sm font-medium">Synthesis credits</p>
              <p className="mt-1 text-xs text-muted-foreground">
                412 of 1,000 used this month
              </p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[41%] rounded-full bg-primary" />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Center: query + results */}
        <section className="order-1 lg:order-2">
          <form onSubmit={handleSubmit}>
            <Card className="border-primary/30">
              <CardContent className="p-4">
                <label htmlFor="rq" className="text-sm font-medium">
                  Ask a research question
                </label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="rq"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="How does sparse attention affect scaling laws?"
                      className="pl-9"
                    />
                  </div>
                  <Button type="submit" className="gap-2">
                    <Sparkles className="h-4 w-4" /> Synthesize
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Compare methods", "Cite key results", "Find gaps"].map((c) => (
                    <Badge key={c} variant="outline" className="font-normal">
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </form>

          {!submitted ? (
            <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Quote className="h-6 w-6" />
              </div>
              <p className="mt-4 text-sm font-medium">No synthesis yet</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Enter a question above and Lumen will summarize the literature with numbered, cited sources.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <Badge className="gap-1">
                      <Sparkles className="h-3 w-3" /> Synthesis
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {visibleSources.length} sources analyzed
                    </span>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {SUMMARY_POINTS.map((p, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          {p.text}{" "}
                          {p.refs.map((r) => (
                            <sup
                              key={r}
                              className="ml-0.5 rounded bg-primary/10 px-1 text-[10px] font-semibold text-primary"
                            >
                              {r}
                            </sup>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div>
                <h3 className="mb-3 text-sm font-semibold">Cited sources</h3>
                <div className="space-y-3">
                  {visibleSources.map((s) => {
                    const Meta = TYPE_META[s.type]
                    const Icon = Meta.icon
                    return (
                      <Card key={s.id} className="transition-colors hover:bg-muted/30">
                        <CardContent className="flex gap-4 p-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary tabular-nums">
                            {s.id}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium leading-snug">{s.title}</p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0"
                                aria-label="Open source"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {s.authors} &middot; {s.venue} &middot; {s.year}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="gap-1 font-normal">
                                <Icon className="h-3 w-3" />
                                {Meta.label}
                              </Badge>
                              {s.cites > 0 && (
                                <span className="text-xs text-muted-foreground">
                                  {s.cites} citations
                                </span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                  {visibleSources.length === 0 && (
                    <p className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                      No sources match the active filters.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right: filters + recent */}
        <aside className="order-3 space-y-6">
          <div>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Source types
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {SOURCE_TYPES.map((t) => {
                const Icon = t.icon
                const active = activeTypes.includes(t.id)
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleType(t.id)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Recent papers
            </h2>
            <div className="mt-3 space-y-2">
              {RECENT_PAPERS.map((p) => (
                <Card key={p.id} className="transition-colors hover:bg-muted/30">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{p.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {p.tag} &middot; {p.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              View feed
            </Button>
          </div>
        </aside>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          Lumen Scholar &middot; Syntheses are AI-generated. Always verify primary sources.
        </div>
      </footer>
    </div>
  )
}
