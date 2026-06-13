"use client"
import * as React from "react"
import {
  ArrowUpRight,
  Figma,
  Framer,
  PenTool,
  Layers,
  Compass,
  Sparkles,
  Award,
  Quote,
  Mail,
  MapPin,
  Linkedin,
  Dribbble,
  Twitter,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const NAV = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Recognition", href: "#recognition" },
  { label: "Contact", href: "#contact" },
]

type CaseStudy = {
  title: string
  client: string
  year: string
  role: string
  cover: string
  summary: string
  metrics: { label: string; value: string }[]
  tags: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Reimagining the Lumen banking app",
    client: "Lumen Financial",
    year: "2024",
    role: "Lead Product Designer",
    cover:
      "linear-gradient(135deg, hsl(var(--primary)/0.25), hsl(var(--accent)))",
    summary:
      "An end-to-end redesign of the mobile money experience, from onboarding to spend insights. I led discovery, prototyping, and a design system that shipped across 4 squads.",
    metrics: [
      { label: "Activation", value: "+38%" },
      { label: "Support tickets", value: "-21%" },
      { label: "App rating", value: "4.8" },
    ],
    tags: ["Mobile", "Design System", "0 to 1"],
  },
  {
    title: "Orchard onboarding for clinicians",
    client: "Orchard Health",
    year: "2023",
    role: "Senior Product Designer",
    cover:
      "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)/0.2))",
    summary:
      "Cut a 40-minute clinical setup flow to under 8 minutes. I ran field research in three hospitals and prototyped progressive forms that adapt to specialty.",
    metrics: [
      { label: "Setup time", value: "-80%" },
      { label: "Completion", value: "+52%" },
      { label: "NPS", value: "+24" },
    ],
    tags: ["Healthcare", "Research", "Forms"],
  },
  {
    title: "Atlas analytics for operators",
    client: "Atlas Logistics",
    year: "2023",
    role: "Product Designer",
    cover:
      "linear-gradient(135deg, hsl(var(--primary)/0.2), hsl(var(--muted)))",
    summary:
      "Turned a dense fleet dashboard into a glanceable command center. Defined data-visualization patterns and shipped a dark-mode-first console for night dispatch.",
    metrics: [
      { label: "Time to insight", value: "-44%" },
      { label: "Daily active", value: "+29%" },
      { label: "Adoption", value: "91%" },
    ],
    tags: ["B2B", "Data Viz", "Dashboard"],
  },
]

const TOOLS = [
  { name: "Figma", icon: Figma, note: "Design & prototyping" },
  { name: "Framer", icon: Framer, note: "High-fidelity web" },
  { name: "Sketching", icon: PenTool, note: "Ideation & flows" },
  { name: "Design systems", icon: Layers, note: "Tokens & components" },
  { name: "User research", icon: Compass, note: "Interviews & testing" },
  { name: "Motion", icon: Sparkles, note: "Microinteractions" },
]

const RECOGNITION = [
  {
    title: "Awwwards — Site of the Day",
    org: "Lumen Financial relaunch",
    year: "2024",
  },
  {
    title: "Fast Company Innovation by Design",
    org: "Finalist, Health category",
    year: "2023",
  },
  {
    title: "CSS Design Awards — UX Honoree",
    org: "Atlas operator console",
    year: "2023",
  },
  {
    title: "ADP List — Top Mentor",
    org: "120+ mentorship sessions",
    year: "2022",
  },
]

const PRINCIPLES = [
  "Start with the problem, not the pixels",
  "Prototype to learn, not to impress",
  "Systems beat one-off screens",
  "Accessibility is table stakes",
]

const TESTIMONIAL = {
  quote:
    "Maya is the rare designer who can hold the whole system in her head while still sweating the smallest interaction. She raised the bar for the entire product org.",
  name: "Daniel Okafor",
  title: "VP Product, Lumen Financial",
}

export default function ProductDesignerPortfolio() {
  const [activeStudy, setActiveStudy] = React.useState(0)
  const study = CASE_STUDIES[activeStudy]

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              M
            </span>
            Maya Rivera
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">
              Get in touch
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <Badge variant="secondary" className="mb-6">
            Available for select projects — Q3 2026
          </Badge>
          <div className="grid items-end gap-10 md:grid-cols-[1.5fr_1fr]">
            <div>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Product designer crafting calm, useful tools for complex
                problems.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                I&apos;m Maya — a senior product designer focused on fintech,
                health, and B2B platforms. I turn fuzzy ambition into shipped,
                measurable product.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#work">
                    View selected work
                    <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#about">Read my story</a>
                </Button>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-4 md:grid-cols-1">
              {[
                { k: "9 yrs", v: "Designing products" },
                { k: "30+", v: "Shipped features" },
                { k: "4", v: "Industry awards" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border bg-card p-4">
                  <dt className="text-2xl font-semibold">{s.k}</dt>
                  <dd className="text-sm text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Separator />

        {/* Selected case studies */}
        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">Selected work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Case studies with outcomes
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              A few projects where research, craft, and a clear strategy moved
              the metrics that mattered.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Case studies">
            {CASE_STUDIES.map((c, i) => (
              <button
                key={c.title}
                role="tab"
                aria-selected={activeStudy === i}
                onClick={() => setActiveStudy(i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  activeStudy === i
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c.client}
              </button>
            ))}
          </div>

          <div className="grid gap-8 overflow-hidden rounded-2xl border bg-card md:grid-cols-2">
            <div
              className="min-h-64 md:min-h-full"
              style={{ background: study.cover }}
              aria-hidden="true"
            />
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{study.year}</span>
                <span aria-hidden="true">•</span>
                <span>{study.role}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {study.title}
              </h3>
              <p className="mt-4 text-muted-foreground">{study.summary}</p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-xl font-semibold text-primary">
                      {m.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {study.tags.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>

              <Button variant="link" className="mt-6 px-0" asChild>
                <a href="#contact">
                  Read the full case study
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <Separator />

        {/* About */}
        <section id="about" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-primary">About</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Strategy and craft, in equal measure
              </h2>
              <p className="mt-6 text-muted-foreground">
                I started as a visual designer and fell hard for the messy,
                human side of product. Today I partner with founders and product
                leaders to find the sharpest problem, then design the simplest
                thing that solves it.
              </p>
              <p className="mt-4 text-muted-foreground">
                I work best embedded in a team — pairing with engineers,
                pressure-testing with research, and shipping in small, confident
                steps.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                How I work
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {PRINCIPLES.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4 text-sm"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>

              <figure className="rounded-2xl bg-muted/30 p-6">
                <Quote className="size-6 text-primary" aria-hidden="true" />
                <blockquote className="mt-3 text-lg leading-relaxed">
                  {TESTIMONIAL.quote}
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {TESTIMONIAL.name}
                  </span>{" "}
                  — {TESTIMONIAL.title}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="bg-muted/30 py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10">
              <p className="text-sm font-medium text-primary">Toolkit</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                What I reach for
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-4 rounded-xl border bg-card p-5"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <tool.icon className="size-5" />
                  </span>
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {tool.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Users, k: "End-to-end", v: "Research to shipped UI" },
                { icon: TrendingUp, k: "Impact-led", v: "Designed for metrics" },
                { icon: Clock, k: "Fast", v: "Small, confident releases" },
              ].map((b) => (
                <div
                  key={b.k}
                  className="rounded-xl border bg-card p-5"
                >
                  <b.icon className="size-5 text-primary" />
                  <div className="mt-3 font-medium">{b.k}</div>
                  <div className="text-sm text-muted-foreground">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section id="recognition" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-10">
            <p className="text-sm font-medium text-primary">Recognition</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Awards & honors
            </h2>
          </div>
          <ul className="divide-y rounded-2xl border bg-card">
            {RECOGNITION.map((r) => (
              <li
                key={r.title}
                className="flex items-center gap-4 p-5 sm:p-6"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Award className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-sm text-muted-foreground">{r.org}</div>
                </div>
                <span className="text-sm text-muted-foreground">{r.year}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-muted/30 py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-primary">Contact</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Let&apos;s build something worth using
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Have a product that needs sharpening, or a 0-to-1 idea looking
                  for a design partner? Tell me about it.
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <a
                    href="#contact"
                    className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4 text-primary" />
                    maya@mayarivera.design
                  </a>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="size-4 text-primary" />
                    Lisbon — working globally
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" size="icon" aria-label="Dribbble">
                    <Dribbble className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="LinkedIn">
                    <Linkedin className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Twitter">
                    <Twitter className="size-4" />
                  </Button>
                </div>
              </div>

              <form
                className="rounded-2xl border bg-card p-6 sm:p-8"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jordan Lee" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc." />
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="project">About the project</Label>
                  <Textarea
                    id="project"
                    rows={4}
                    placeholder="What are you building, and what does success look like?"
                  />
                </div>
                <Button type="submit" size="lg" className="mt-6 w-full">
                  Send message
                  <ArrowUpRight className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 Maya Rivera — Product Designer</span>
          <nav className="flex gap-6" aria-label="Footer">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
