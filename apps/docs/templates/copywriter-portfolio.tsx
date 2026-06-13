"use client"

import * as React from "react"
import { ArrowUpRight, PenLine, Mail, Quote, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const DISCIPLINES = ["All", "Brand", "Web", "Ads", "Email"] as const
type Discipline = (typeof DISCIPLINES)[number]

const WORK: { title: string; client: string; year: string; discipline: Exclude<Discipline, "All">; blurb: string }[] = [
  { title: "A voice worth remembering", client: "Maren & Co.", year: "2024", discipline: "Brand", blurb: "Naming, tagline, and a full verbal identity system for a heritage coffee roaster going direct-to-consumer." },
  { title: "Words that load fast", client: "Northwind", year: "2024", discipline: "Web", blurb: "Homepage and product narrative for a developer infra startup. Tripled demo signups in the first quarter." },
  { title: "Scroll-stopping in six words", client: "Lumen", year: "2023", discipline: "Ads", blurb: "Performance social campaign — 40+ headline variants tested down to a champion that cut CPA by 31%." },
  { title: "The welcome that converts", client: "Folio", year: "2023", discipline: "Email", blurb: "A nine-part onboarding flow rewritten line by line. Open rates up, churn down, replies way up." },
  { title: "Manifesto for a new category", client: "Atlas Labs", year: "2023", discipline: "Brand", blurb: "Positioning and a launch manifesto that gave a quiet B2B product a point of view people quoted." },
  { title: "Landing pages that earn the click", client: "Cedar", year: "2022", discipline: "Web", blurb: "A suite of paid-traffic landers with message-match copy tuned per audience segment." },
]

const CLIENTS = ["Maren & Co.", "Northwind", "Lumen", "Folio", "Atlas Labs", "Cedar"]

const SERVICES = [
  { name: "Brand voice & messaging", desc: "Naming, taglines, positioning, and the verbal system that ties it together." },
  { name: "Website & product copy", desc: "Homepages, landing pages, and product narratives that read fast and convert." },
  { name: "Campaigns & ads", desc: "Concepts and headlines built to be tested, killed, and won on the metric that matters." },
  { name: "Email & lifecycle", desc: "Welcome flows, nurture, and broadcasts people actually want to open." },
]

export default function CopywriterPortfolio() {
  const [filter, setFilter] = React.useState<Discipline>("All")
  const visible = filter === "All" ? WORK : WORK.filter((w) => w.discipline === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <PenLine className="h-5 w-5" aria-hidden="true" />
            Della Voss
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button asChild size="sm">
            <a href="#contact">Start a project</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-20 sm:pt-28">
          <Badge variant="outline" className="mb-7 gap-1.5 rounded-full px-3 py-1 text-xs font-normal">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Freelance copywriter — open for Q3
          </Badge>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl">
            I write the words that make people <span className="italic text-primary">stop, read, and act.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Twelve years turning fuzzy briefs into sharp brand voices, conversion-tested pages, and campaigns that
            outperform the deck they were sold on.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <a href="#work" className="gap-2">
                See selected work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#contact">Book a call</a>
            </Button>
          </div>
          <dl className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t pt-8">
            {[
              { k: "12 yrs", v: "writing professionally" },
              { k: "80+", v: "brands shipped" },
              { k: "31%", v: "avg. CPA reduction" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="text-3xl font-semibold tracking-tight">{s.k}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Separator />

        <section id="work" className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Selected work</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A few I'm proud of.</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by discipline">
              {DISCIPLINES.map((d) => {
                const active = filter === d
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setFilter(d)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-12 flex flex-col">
            {visible.map((w, i) => (
              <a
                key={w.title}
                href="#contact"
                className={cn(
                  "group flex flex-col gap-4 border-t py-8 transition-colors hover:bg-muted/30 sm:flex-row sm:items-baseline sm:gap-8",
                  i === visible.length - 1 && "border-b",
                )}
              >
                <div className="flex shrink-0 items-baseline gap-3 sm:w-44">
                  <Badge variant="secondary" className="font-normal">{w.discipline}</Badge>
                  <span className="text-sm text-muted-foreground">{w.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold tracking-tight">{w.title}</h3>
                  <p className="mt-2 max-w-2xl text-muted-foreground">{w.blurb}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                  {w.client}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </div>
              </a>
            ))}
            {visible.length === 0 && (
              <p className="border-t py-12 text-center text-muted-foreground">No work in this discipline yet.</p>
            )}
          </div>
        </section>

        <section id="about" className="bg-muted/30 py-20">
          <div className="mx-auto grid w-full max-w-5xl gap-12 px-6 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">About</p>
              <h2 className="mt-2 text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
                Strategy first. Then the sentence that does the heavy lifting.
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I started in agency land, defected to in-house brand teams, and now work with founders who care
                  about the difference between copy that fills a box and copy that earns attention.
                </p>
                <p>
                  Every project starts with a question, not a template. Who are we talking to, what do they already
                  believe, and what one idea could change their mind? The words come after that.
                </p>
              </div>
            </div>
            <figure className="flex flex-col justify-center rounded-2xl border bg-card p-8">
              <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
              <blockquote className="mt-4 text-xl font-medium leading-relaxed">
                "Della rewrote one paragraph and our trial conversion went up by a third. I've stopped writing copy
                myself."
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                Priya N. — Founder, Northwind
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-6 py-16">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by teams at
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
            {CLIENTS.map((c) => (
              <div key={c} className="flex items-center justify-center text-center text-lg font-semibold tracking-tight text-muted-foreground">
                {c}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section id="services" className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Services</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Ways we can work together.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <div key={s.name} className="flex flex-col gap-3 bg-card p-8">
                <span className="text-sm font-medium text-muted-foreground">0{i + 1}</span>
                <h3 className="text-xl font-semibold tracking-tight">{s.name}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-5xl px-6 pb-24 pt-4">
          <div className="rounded-3xl border bg-primary/10 p-10 sm:p-14">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <Mail className="h-9 w-9 text-primary" aria-hidden="true" />
                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  Got a brief that needs better words?
                </h2>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">
                  Tell me what you're working on. I reply to every serious inquiry within two business days.
                </p>
              </div>
              <form
                className="flex flex-col gap-4 rounded-2xl border bg-card p-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input type="text" placeholder="Your name" aria-label="Your name" required />
                <Input type="email" placeholder="Email address" aria-label="Email address" required />
                <Input type="text" placeholder="What's the project?" aria-label="Project description" />
                <Button type="submit" size="lg" className="gap-2">
                  Send the brief
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Prefer email? hello@dellavoss.co
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p className="flex items-center gap-2">
            <PenLine className="h-4 w-4" aria-hidden="true" />
            Della Voss — Copywriter
          </p>
          <p>© 2024 Della Voss. Written, not generated.</p>
        </div>
      </footer>
    </div>
  )
}
