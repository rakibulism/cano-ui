"use client"

import * as React from "react"
import {
  Flame,
  Search,
  Menu,
  Clock,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Mail,
  Globe2,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Article = {
  title: string
  excerpt: string
  author: string
  read: string
  tag: string
}

const SECTIONS = ["World", "Business", "Tech", "Culture"] as const
type Section = (typeof SECTIONS)[number]

const ARTICLES: Record<Section, Article[]> = {
  World: [
    {
      title: "Coastal nations sign landmark accord on shared fishing waters",
      excerpt:
        "After three years of stalled talks, delegates reached a framework that caps annual catches and funds a joint patrol fleet.",
      author: "Lena Ortiz",
      read: "6 min",
      tag: "Diplomacy",
    },
    {
      title: "Record turnout reshapes parliament in northern elections",
      excerpt:
        "First-time voters made up nearly a third of ballots cast, shifting the balance toward a coalition government.",
      author: "Amir Said",
      read: "4 min",
      tag: "Politics",
    },
    {
      title: "Relief convoys reach flood-hit valley after week-long delay",
      excerpt:
        "Engineers cleared the final mountain pass overnight, opening a corridor for medicine and clean water.",
      author: "Priya Nair",
      read: "5 min",
      tag: "Crisis",
    },
  ],
  Business: [
    {
      title: "Green bonds outpace traditional issuance for the first time",
      excerpt:
        "Institutional investors poured a record sum into climate-linked debt as yields stabilized across markets.",
      author: "Marcus Bell",
      read: "7 min",
      tag: "Markets",
    },
    {
      title: "Regional banks merge to weather rising rate pressure",
      excerpt:
        "The combined lender will serve nine states and promises to keep every branch open through the transition.",
      author: "Hana Kim",
      read: "5 min",
      tag: "Finance",
    },
    {
      title: "Logistics startup hits profitability without a single layoff",
      excerpt:
        "Founders credit a slow-growth playbook and a refusal to chase vanity metrics during the funding boom.",
      author: "Diego Cruz",
      read: "6 min",
      tag: "Startups",
    },
  ],
  Tech: [
    {
      title: "Open-source model rivals closed systems on reasoning tests",
      excerpt:
        "A volunteer collective released weights and training data, sparking debate over the future of proprietary AI.",
      author: "Sofia Lang",
      read: "8 min",
      tag: "AI",
    },
    {
      title: "Right-to-repair law forces redesign of flagship devices",
      excerpt:
        "Manufacturers must now publish part diagrams and sell components directly to independent shops.",
      author: "Tom Wexler",
      read: "5 min",
      tag: "Policy",
    },
    {
      title: "Quiet chip breakthrough cuts data-center power in half",
      excerpt:
        "The new architecture trades peak speed for efficiency, a bet that cooling costs matter more than benchmarks.",
      author: "Yuki Tanaka",
      read: "6 min",
      tag: "Hardware",
    },
  ],
  Culture: [
    {
      title: "Debut novelist wins top prize for a book written on a phone",
      excerpt:
        "Composed entirely during a two-hour commute, the manuscript spent eight months at the top of bestseller lists.",
      author: "Claire Dunn",
      read: "4 min",
      tag: "Books",
    },
    {
      title: "Restored silent films find a second life with live scores",
      excerpt:
        "Sold-out theaters pair century-old footage with orchestras, drawing a younger crowd than expected.",
      author: "Noah Frey",
      read: "5 min",
      tag: "Film",
    },
    {
      title: "Street muralists turn a forgotten underpass into a gallery",
      excerpt:
        "What began as a weekend cleanup grew into a permanent open-air exhibition funded by the neighborhood.",
      author: "Ines Vega",
      read: "3 min",
      tag: "Art",
    },
  ],
}

const TRENDING = [
  "The five charts that explain this quarter's market mood",
  "Inside the lab racing to recycle wind-turbine blades",
  "A field guide to the new privacy rules taking effect",
  "Why the world's busiest port went fully electric",
  "The unlikely town betting everything on geothermal heat",
]

const TICKER = [
  "Central bank holds rates steady for a third meeting",
  "Wildfire season opens early across the southern range",
  "Tech giant unveils repairable laptop line",
  "Underdog club clinches the cup in extra time",
]

export default function NewsMagazineTemplate() {
  const [active, setActive] = React.useState<Section>("World")
  const list = ARTICLES[active]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Breaking news bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2">
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            <Flame className="size-3.5" aria-hidden="true" />
            Breaking
          </span>
          <Separator orientation="vertical" className="h-4 bg-primary-foreground/30" />
          <div className="relative flex-1 overflow-hidden">
            <div className="flex items-center gap-6 whitespace-nowrap text-sm">
              {TICKER.map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-primary-foreground/60" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex items-center justify-between gap-4 py-4">
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
            <div className="flex flex-1 flex-col items-center md:items-start">
              <span className="font-serif text-2xl font-black tracking-tight md:text-3xl">
                The Meridian
              </span>
              <span className="hidden text-[11px] uppercase tracking-[0.25em] text-muted-foreground md:block">
                Independent Daily — Est. 1998
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search stories"
                  className="h-9 w-44 pl-8"
                  aria-label="Search stories"
                />
              </div>
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
          <Separator />
          <nav className="flex items-center gap-1 overflow-x-auto py-1" aria-label="Primary">
            {["Home", ...SECTIONS, "Opinion", "Sport", "Lifestyle"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (SECTIONS.includes(item as Section)) setActive(item as Section)
                }}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  item === active && "text-foreground"
                )}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {/* Lead story + secondary headlines */}
        <section className="grid gap-6 lg:grid-cols-3">
          <article className="group relative overflow-hidden rounded-xl border bg-card lg:col-span-2">
            <div className="flex aspect-[16/9] items-end bg-muted p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" aria-hidden="true" />
              <div className="relative">
                <Badge className="mb-3">Cover Story</Badge>
                <h1 className="font-serif text-2xl font-bold leading-tight sm:text-4xl">
                  The quiet town rewriting the rulebook on clean energy
                </h1>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                  How a community of nine thousand people built a grid that exports more power than it
                  consumes — and why neighbors are taking notes.
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">By Eleanor March</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> 12 min read
                  </span>
                </div>
              </div>
            </div>
          </article>

          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              More headlines
            </h2>
            {[
              {
                t: "Senate passes sweeping transparency bill in late-night vote",
                k: "Politics",
              },
              {
                t: "Artists reclaim a derelict mill as the city's largest studio",
                k: "Culture",
              },
              {
                t: "New telescope captures the sharpest image of a distant galaxy",
                k: "Science",
              },
            ].map((h) => (
              <article key={h.t} className="group border-b pb-4 last:border-0">
                <Badge variant="outline" className="mb-2">
                  {h.k}
                </Badge>
                <h3 className="font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                  {h.t}
                </h3>
              </article>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section grid with tabs + trending sidebar */}
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-2xl font-bold">Sections</h2>
              <div className="flex flex-wrap gap-1 rounded-lg border bg-muted/30 p-1">
                {SECTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActive(s)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      active === s
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-pressed={active === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {list.map((a) => (
                <article
                  key={a.title}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[16/10] bg-muted" aria-hidden="true" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="secondary">{a.tag}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" /> {a.read}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                      {a.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                      <span className="text-xs font-medium">{a.author}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={"Save " + a.title}
                        className="size-7 text-muted-foreground"
                      >
                        <Bookmark className="size-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Button variant="outline">
                More from {active}
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold">
                <TrendingUp className="size-4 text-primary" />
                Trending now
              </h2>
              <ol className="space-y-4">
                {TRENDING.map((t, i) => (
                  <li key={t} className="group flex gap-3">
                    <span className="font-serif text-2xl font-black leading-none text-primary/40">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                      {t}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border bg-primary/10 p-5">
              <Mail className="mb-3 size-5 text-primary" />
              <h2 className="font-serif text-lg font-bold">The Morning Brief</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Everything that matters, distilled into a five-minute read. Free, every weekday.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Input placeholder="you@example.com" type="email" aria-label="Email address" />
                <Button className="w-full">Sign me up</Button>
              </div>
            </div>

            <div className="rounded-xl border bg-muted/30 p-5">
              <h2 className="mb-3 font-serif text-lg font-bold">Most read</h2>
              <ul className="space-y-3 text-sm">
                {[
                  "A practical guide to the new tax brackets",
                  "The recipe that broke the internet this week",
                  "Ten minutes with the year's breakout director",
                ].map((m) => (
                  <li key={m} className="border-b pb-3 last:border-0 last:pb-0">
                    <a className="font-medium transition-colors hover:text-primary" href="#">
                      {m}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <span className="font-serif text-xl font-black">The Meridian</span>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Independent journalism for a connected world. Reader-funded, ad-light, always
                accountable.
              </p>
              <div className="mt-4 flex gap-2">
                {[Twitter, Facebook, Youtube, Globe2].map((Icon, i) => (
                  <Button key={i} variant="outline" size="icon" className="size-9" aria-label="Social link">
                    <Icon className="size-4" />
                  </Button>
                ))}
              </div>
            </div>
            {[
              { h: "Sections", l: ["World", "Business", "Tech", "Culture", "Opinion"] },
              { h: "Company", l: ["About", "Careers", "Ethics", "Contact", "Press"] },
              { h: "Account", l: ["Subscribe", "Sign in", "Newsletters", "Gift", "Help"] },
            ].map((col) => (
              <div key={col.h}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {col.h}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {col.l.map((link) => (
                    <li key={link}>
                      <a className="text-muted-foreground transition-colors hover:text-foreground" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
            <span>© 1998–2025 The Meridian Media Group. All rights reserved.</span>
            <div className="flex gap-4">
              <a className="hover:text-foreground" href="#">Privacy</a>
              <a className="hover:text-foreground" href="#">Terms</a>
              <a className="hover:text-foreground" href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
