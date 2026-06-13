"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Sparkles,
  Type,
  BookOpen,
  Quote,
  Mail,
  MapPin,
  Phone,
  Compass,
  Layers,
  PenTool,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const NAV = ["Work", "Services", "Studio", "Contact"]

const SERVICES = [
  {
    icon: PenTool,
    title: "Brand Identity",
    desc: "Logos, marks, color, and type systems that hold up across every surface and scale.",
    items: ["Logo & wordmark", "Color systems", "Typography"],
  },
  {
    icon: Type,
    title: "Naming & Verbal",
    desc: "Names, taglines, and voice that make a brand sound like nothing else in its category.",
    items: ["Naming strategy", "Tone of voice", "Messaging"],
  },
  {
    icon: BookOpen,
    title: "Brand Guidelines",
    desc: "Living systems and documentation so teams ship on-brand without asking us first.",
    items: ["Usage rules", "Design tokens", "Asset libraries"],
  },
]

const CASES = [
  {
    client: "Marrow & Oak",
    sector: "Hospitality",
    year: "2024",
    blurb: "A craft distillery rebrand built around hand-set type and a copper palette.",
    tags: ["Identity", "Packaging"],
  },
  {
    client: "Northbeam",
    sector: "Fintech",
    year: "2024",
    blurb: "Naming and a calm, geometric identity for a savings platform.",
    tags: ["Naming", "Identity"],
  },
  {
    client: "Verde Atlas",
    sector: "Climate",
    year: "2023",
    blurb: "A full guidelines system for a carbon-removal marketplace.",
    tags: ["Guidelines", "Web"],
  },
  {
    client: "Looma",
    sector: "Consumer",
    year: "2023",
    blurb: "Editorial identity and verbal voice for a sleep-wellness label.",
    tags: ["Identity", "Verbal"],
  },
]

const CLIENTS = ["Marrow & Oak", "Northbeam", "Verde Atlas", "Looma", "Field Notes", "Sable & Co."]

const STATS = [
  { value: "120+", label: "Brands shaped" },
  { value: "14", label: "Years in practice" },
  { value: "9", label: "Design awards" },
]

export default function BrandingStudioPage() {
  const [activeCase, setActiveCase] = React.useState(0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Hô|st Studio</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button size="sm" className="rounded-full">
            Start a project
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <Badge variant="outline" className="mb-8 rounded-full px-3 py-1 text-xs uppercase tracking-widest">
              Independent branding studio
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              We build brands with a
              <span className="italic text-muted-foreground"> point of view.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              From the first name to the final guideline, we shape identities that
              feel inevitable — distinctive, durable, and impossible to ignore.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-full">
                View selected work
                <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full">
                Our approach
              </Button>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6 border-t pt-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold tracking-tight md:text-4xl">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  What we do
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Three disciplines, one system
                </h2>
              </div>
              <Layers className="hidden h-10 w-10 text-muted-foreground md:block" aria-hidden="true" />
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {SERVICES.map((svc) => {
                const Icon = svc.icon
                return (
                  <Card key={svc.title} className="border bg-card transition-shadow hover:shadow-md">
                    <CardContent className="p-7">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 text-xl font-semibold tracking-tight">{svc.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{svc.desc}</p>
                      <Separator className="my-5" />
                      <ul className="space-y-2">
                        {svc.items.map((it) => (
                          <li key={it} className="flex items-center gap-2 text-sm">
                            <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Case study showcase */}
        <section id="work" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
            <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Selected work
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Case studies
            </h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="flex flex-col divide-y border-y">
                {CASES.map((c, i) => (
                  <button
                    key={c.client}
                    type="button"
                    onClick={() => setActiveCase(i)}
                    className={cn(
                      "group flex items-center justify-between gap-4 px-1 py-5 text-left transition-colors",
                      activeCase === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-pressed={activeCase === i}
                  >
                    <div>
                      <div className="text-xl font-semibold tracking-tight">{c.client}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {c.sector} · {c.year}
                      </div>
                    </div>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform",
                        activeCase === i ? "translate-x-0 text-primary" : "-translate-x-1 opacity-40 group-hover:translate-x-0 group-hover:opacity-100"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <Card className="overflow-hidden border bg-card">
                <div className="flex h-56 items-center justify-center bg-muted/50 md:h-72">
                  <span className="text-4xl font-semibold italic tracking-tight text-muted-foreground">
                    {CASES[activeCase].client}
                  </span>
                </div>
                <CardContent className="p-8">
                  <div className="flex flex-wrap gap-2">
                    {CASES[activeCase].tags.map((t) => (
                      <Badge key={t} variant="secondary" className="rounded-full">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-5 text-lg leading-relaxed">{CASES[activeCase].blurb}</p>
                  <Button variant="link" className="mt-3 h-auto p-0">
                    Read the full case study
                    <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section id="studio" className="border-b bg-primary/5">
          <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center">
            <Quote className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
            <p className="mt-8 text-3xl font-medium leading-snug tracking-tight md:text-4xl">
              A brand is not a logo. It is the sum of every decision a company makes —
              we just make sure those decisions <span className="italic text-muted-foreground">rhyme.</span>
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Compass className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground">
                The studio philosophy
              </span>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">
              Trusted by brands at every stage
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3 lg:grid-cols-6">
              {CLIENTS.map((c) => (
                <div
                  key={c}
                  className="flex items-center justify-center bg-background px-4 py-8 text-center text-sm font-semibold tracking-tight text-muted-foreground"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:py-24 lg:grid-cols-2">
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Start something
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Let&apos;s build a brand worth remembering.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Tell us where you are and where you want to be. We reply to every
                inquiry within two business days.
              </p>
              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  hello@hoist.studio
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                  +1 (212) 555-0184
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  18 Mercer Street, New York
                </div>
              </div>
            </div>

            <Card className="border bg-card">
              <CardContent className="p-7">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jane Mercer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brief">Project brief</Label>
                    <Textarea id="brief" rows={4} placeholder="We're a climate startup looking for a full identity..." />
                  </div>
                  <Button type="submit" size="lg" className="w-full rounded-full">
                    Send inquiry
                    <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
            </span>
            <span className="font-semibold text-foreground">Hô|st Studio</span>
          </div>
          <p>© 2026 Hô|st Studio. A branding practice.</p>
          <div className="flex gap-6">
            <a href="#work" className="transition-colors hover:text-foreground">Instagram</a>
            <a href="#work" className="transition-colors hover:text-foreground">Behance</a>
            <a href="#work" className="transition-colors hover:text-foreground">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
