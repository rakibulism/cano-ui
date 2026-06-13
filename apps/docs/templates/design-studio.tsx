"use client"

import * as React from "react"
import {
  ArrowUpRight,
  ArrowRight,
  Award,
  Check,
  Menu,
  Sparkles,
  PenTool,
  Layers,
  Compass,
  Box,
  Mail,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
]

const SERVICES = [
  {
    icon: Compass,
    title: "Brand Strategy",
    description:
      "Positioning, naming, and narrative that give a brand somewhere true to stand.",
    deliverables: ["Audits", "Naming", "Messaging"],
  },
  {
    icon: PenTool,
    title: "Visual Identity",
    description:
      "Logos, type systems, and color built to flex across every surface you live on.",
    deliverables: ["Logo", "Typography", "Guidelines"],
  },
  {
    icon: Layers,
    title: "Digital Product",
    description:
      "Interfaces and design systems that feel inevitable the moment people use them.",
    deliverables: ["UX", "UI", "Systems"],
  },
  {
    icon: Box,
    title: "Motion & 3D",
    description:
      "Animation and dimensional work that turns a static brand into something alive.",
    deliverables: ["Motion", "3D", "Direction"],
  },
]

const CASES = [
  {
    client: "Lumen Optics",
    title: "A precision eyewear brand, refocused",
    category: "Identity / Retail",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    client: "Halden Coffee",
    title: "Slow-roast packaging with quiet confidence",
    category: "Branding / Packaging",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    client: "Northwind Bank",
    title: "Rebuilding trust through a calmer interface",
    category: "Product / Fintech",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    client: "Atlas Studios",
    title: "A motion identity for a film collective",
    category: "Motion / Identity",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
  },
]

const AWARDS = [
  { name: "Awwwards", detail: "Site of the Day", count: "×6" },
  { name: "FWA", detail: "Site of the Month", count: "×3" },
  { name: "D&AD", detail: "Wood Pencil", count: "×2" },
  { name: "Webby", detail: "Honoree", count: "×4" },
  { name: "CSSDA", detail: "Best Innovation", count: "×5" },
]

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "We interview, audit, and listen until the real problem stops hiding.",
  },
  {
    step: "02",
    title: "Define",
    description:
      "Strategy, territory, and a single sentence everyone can rally behind.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Concepts become systems — explored widely, then sharpened relentlessly.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "Files, guidelines, and the kind of handoff that survives real life.",
  },
]

export default function DesignStudioPage() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [filter, setFilter] = React.useState("All")
  const [sent, setSent] = React.useState(false)

  const filters = ["All", "Identity", "Product", "Motion"]
  const visibleCases = CASES.filter((c) =>
    filter === "All" ? true : c.category.includes(filter)
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="text-base">Fold&nbsp;Studio</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button size="sm" asChild>
              <a href="#contact">Start a project</a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
        {menuOpen && (
          <div className="border-t px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-3" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button size="sm" asChild className="mt-2">
                <a href="#contact">Start a project</a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
          <Badge variant="secondary" className="mb-8 gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            Accepting two projects for Q3
          </Badge>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            We design brands
            <br />
            that refuse
            <br />
            <span className="text-muted-foreground">to be ignored.</span>
          </h1>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-muted-foreground">
              An independent design studio crafting identity, product, and
              motion for ambitious teams across the globe.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#work">
                  View work
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-md text-3xl font-semibold tracking-tight md:text-4xl">
                What we do, end to end
              </h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Four disciplines, one team. We move between them so your brand
                never feels stitched together.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {SERVICES.map((service) => (
                <div
                  key={service.title}
                  className="group flex flex-col gap-4 bg-card p-8 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <service.icon className="size-5" />
                    </span>
                    <ArrowUpRight className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {service.deliverables.map((d) => (
                      <Badge key={d} variant="outline" className="font-normal">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work / Case studies */}
        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Selected work
            </h2>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    filter === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  )}
                  aria-pressed={filter === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {visibleCases.map((item) => (
              <a
                key={item.client}
                href="#work"
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-muted">
                  <img
                    src={item.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {item.client}
                      </span>
                      <span>·</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {item.year}
                  </span>
                </div>
              </a>
            ))}
          </div>
          {visibleCases.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              No projects in this category yet.
            </p>
          )}
        </section>

        {/* Awards */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <div className="mb-10 flex items-center gap-3">
              <Award className="size-5 text-primary" />
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Recognition
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-5">
              {AWARDS.map((award) => (
                <div
                  key={award.name}
                  className="flex flex-col gap-1 bg-card p-6"
                >
                  <span className="text-2xl font-semibold tracking-tight">
                    {award.count}
                  </span>
                  <span className="text-sm font-medium">{award.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {award.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="mb-12 max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              A process you can actually see
            </h2>
            <p className="mt-4 text-muted-foreground">
              No black boxes. Every engagement runs through the same four
              movements, so you always know where we are.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((phase) => (
              <div key={phase.step} className="flex flex-col gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {phase.step}
                </span>
                <Separator />
                <h3 className="text-xl font-semibold tracking-tight">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
            <div id="studio">
              <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Let&apos;s make something worth remembering.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Tell us about the brand, the problem, or the deadline keeping
                you up. We reply to every serious inquiry within two days.
              </p>
              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-primary" />
                  <span>hello@foldstudio.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 text-primary" />
                  <span>Lisbon · Remote worldwide</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-8">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-6" />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">
                    Message received
                  </h3>
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Thanks for reaching out. We&apos;ll get back to you shortly.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSent(false)}>
                    Send another
                  </Button>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jane Cooper" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="jane@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget range</Label>
                    <Input id="budget" placeholder="$25k – $50k" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Project details</Label>
                    <Textarea
                      id="project"
                      rows={4}
                      placeholder="Tell us what you're building…"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send inquiry
                    <ArrowRight className="size-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            Fold Studio
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Fold Studio. Independent design, since 2014.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Dribbble
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
