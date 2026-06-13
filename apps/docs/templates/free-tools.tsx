"use client"
import * as React from "react"
import {
  Search,
  Wrench,
  Gauge,
  PenLine,
  Palette,
  Code2,
  Sparkles,
  ArrowRight,
  Star,
  Image as ImageIcon,
  FileText,
  Type,
  Hash,
  QrCode,
  Ruler,
  Braces,
  ShieldCheck,
  Zap,
  Heart,
  Github,
  Twitter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Category = "All" | "SEO" | "Design" | "Writing" | "Dev"

const CATEGORIES: Category[] = ["All", "SEO", "Design", "Writing", "Dev"]

type Tool = {
  name: string
  desc: string
  category: Exclude<Category, "All">
  icon: React.ComponentType<{ className?: string }>
  uses: string
}

const TOOLS: Tool[] = [
  { name: "Meta Tag Generator", desc: "Build clean title and description tags for any page.", category: "SEO", icon: Hash, uses: "48k" },
  { name: "SERP Snippet Preview", desc: "See exactly how your result looks on Google.", category: "SEO", icon: Gauge, uses: "31k" },
  { name: "Robots.txt Tester", desc: "Validate crawl rules before you ship them.", category: "SEO", icon: ShieldCheck, uses: "22k" },
  { name: "Color Palette Maker", desc: "Generate accessible palettes from a single hue.", category: "Design", icon: Palette, uses: "57k" },
  { name: "Image Compressor", desc: "Shrink PNG and JPG files without losing quality.", category: "Design", icon: ImageIcon, uses: "92k" },
  { name: "Favicon Generator", desc: "Export every icon size from one upload.", category: "Design", icon: Sparkles, uses: "40k" },
  { name: "Word Counter", desc: "Count words, characters, and reading time live.", category: "Writing", icon: Type, uses: "120k" },
  { name: "Headline Analyzer", desc: "Score headlines for clarity and emotion.", category: "Writing", icon: PenLine, uses: "35k" },
  { name: "Case Converter", desc: "Switch between title, sentence, and snake case.", category: "Writing", icon: FileText, uses: "28k" },
  { name: "JSON Formatter", desc: "Beautify, minify, and validate JSON instantly.", category: "Dev", icon: Braces, uses: "84k" },
  { name: "QR Code Generator", desc: "Create high-res QR codes for links and text.", category: "Dev", icon: QrCode, uses: "61k" },
  { name: "Unit Converter", desc: "Convert px, rem, em, and more on the fly.", category: "Dev", icon: Ruler, uses: "19k" },
]

const PERKS = [
  { icon: Heart, title: "Free forever", desc: "No trials, no credit card. Every tool here stays free." },
  { icon: ShieldCheck, title: "Private by default", desc: "Files are processed in your browser, never uploaded." },
  { icon: Zap, title: "No sign-up", desc: "Open a tool and start working in seconds." },
]

export default function FreeToolsHubPage() {
  const [active, setActive] = React.useState<Category>("All")
  const [query, setQuery] = React.useState("")

  const filtered = TOOLS.filter((t) => {
    const matchesCategory = active === "All" || t.category === active
    const matchesQuery =
      query.trim() === "" ||
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.desc.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="h-4 w-4" />
            </span>
            <span className="text-lg tracking-tight">ToolKit</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#tools" className="transition-colors hover:text-foreground">Tools</a>
            <a href="#featured" className="transition-colors hover:text-foreground">Featured</a>
            <a href="#why" className="transition-colors hover:text-foreground">Why free</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Log in</Button>
            <Button size="sm">Get the Pro app</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <Badge variant="secondary" className="mb-5 gap-1">
              <Sparkles className="h-3.5 w-3.5" /> 60+ free utilities, zero sign-up
            </Badge>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Free tools for builders, writers, and marketers
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
              A growing collection of fast, private, no-nonsense utilities. Pick one and get the job done.
            </p>
            <div className="mx-auto mt-8 flex max-w-lg items-center gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search 60+ tools…"
                  aria-label="Search tools"
                  className="h-12 pl-9 text-base"
                />
              </div>
              <Button size="lg" className="h-12">Search</Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Popular: Image Compressor, JSON Formatter, Word Counter
            </p>
          </div>
        </section>

        <section id="tools" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Browse the toolbox</h2>
              <p className="mt-1 text-muted-foreground">Filter by what you are working on today.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active === cat
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => {
              const Icon = tool.icon
              return (
                <Card key={tool.name} className="group transition-colors hover:border-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                    <CardTitle className="mt-3 text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardFooter className="justify-between">
                    <span className="text-xs text-muted-foreground">{tool.uses} uses / mo</span>
                    <Button variant="ghost" size="sm" className="gap-1 text-primary">
                      Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-xl border border-dashed py-16 text-center">
              <p className="text-muted-foreground">No tools match that search yet.</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setQuery("")
                  setActive("All")
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </section>

        <section id="featured" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 gap-1">
                <Star className="h-3.5 w-3.5" /> Tool of the month
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">Image Compressor</h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Drag in a folder of screenshots and ship them lighter. Smart compression keeps things
                crisp while cutting file size by up to 80%, all without leaving your browser.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Batch up to 50 images at once",
                  "Supports PNG, JPG, and WebP output",
                  "Nothing ever leaves your device",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="gap-2">
                  Open Image Compressor <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">View all design tools</Button>
              </div>
            </div>
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ImageIcon className="h-4 w-4 text-primary" /> compress-preview.png
                </CardTitle>
                <CardDescription>Live savings estimate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { label: "hero-banner.png", before: "2.4 MB", after: "480 KB", pct: "80%" },
                  { label: "team-photo.jpg", before: "1.1 MB", after: "320 KB", pct: "71%" },
                  { label: "logo-export.png", before: "640 KB", after: "118 KB", pct: "82%" },
                ].map((row) => (
                  <div key={row.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{row.label}</span>
                      <Badge variant="secondary">-{row.pct}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="line-through">{row.before}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="font-semibold text-foreground">{row.after}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Try it with your files</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section id="why" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why are these free?</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              These utilities are a taste of what our full platform can do. Use them as much as you like,
              and upgrade only when your team is ready for more.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PERKS.map((perk) => {
              const Icon = perk.icon
              return (
                <div key={perk.title} className="rounded-xl border bg-card p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{perk.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{perk.desc}</p>
                </div>
              )
            })}
          </div>

          <Card className="mt-16 overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center sm:px-10 md:flex-row md:justify-between md:text-left">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Ready for the full toolkit?</h3>
                <p className="mt-2 max-w-xl text-muted-foreground">
                  Pro unlocks unlimited batch processing, saved presets, team workspaces, and an API for
                  every tool you see here.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">See pricing</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div className="col-span-2">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Wrench className="h-4 w-4" />
                </span>
                ToolKit
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Fast, private, free utilities for the work you do every day.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="icon" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {[
              { title: "SEO", items: ["Meta tags", "SERP preview", "Robots tester"] },
              { title: "Design", items: ["Palette maker", "Compressor", "Favicons"] },
              { title: "Writing", items: ["Word counter", "Headlines", "Case convert"] },
              { title: "Dev", items: ["JSON format", "QR codes", "Units"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="flex items-center gap-1.5 text-sm font-semibold">
                  <Code2 className="h-3.5 w-3.5 text-muted-foreground" /> {col.title}
                </h4>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a href="#tools" className="transition-colors hover:text-foreground">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 ToolKit. Free forever.</p>
            <div className="flex gap-5">
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
