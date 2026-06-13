"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  Layout,
  Layers,
  MousePointerClick,
  Quote,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "+38%", label: "Avg. conversion lift across redesigns" },
  { value: "120+", label: "Products shipped since 2016" },
  { value: "4.9/5", label: "Client satisfaction across engagements" },
  { value: "9 wks", label: "Median time to a validated MVP" },
]

const SERVICES = [
  {
    icon: Search,
    title: "Research",
    desc: "Interviews, usability testing and journey mapping that turn guesses into evidence.",
  },
  {
    icon: Layout,
    title: "UX Design",
    desc: "Flows, wireframes and high-fidelity screens that make complex products feel obvious.",
  },
  {
    icon: Layers,
    title: "Design Systems",
    desc: "Token-driven component libraries that keep teams fast, consistent and on-brand.",
  },
  {
    icon: MousePointerClick,
    title: "Prototyping",
    desc: "Interactive prototypes you can test with real users before a line of code ships.",
  },
]

const CATEGORIES = ["All", "Research", "UX Design", "Design Systems", "Prototyping"] as const

const WORK = [
  { title: "Helio Banking App", client: "Helio Financial", category: "UX Design", result: "+42% task success" },
  { title: "Atlas Component Kit", client: "Atlas Health", category: "Design Systems", result: "3x faster delivery" },
  { title: "Field Ops Discovery", client: "Northwind Logistics", category: "Research", result: "27 insights mapped" },
  { title: "Checkout Reflow", client: "Marketly", category: "UX Design", result: "-19% drop-off" },
  { title: "Onboarding Prototype", client: "Cadence AI", category: "Prototyping", result: "11 tests, 0 blockers" },
  { title: "Pulse Research Sprint", client: "Vector Mobility", category: "Research", result: "5 personas defined" },
]

const PROCESS = [
  { step: "01", title: "Discover", desc: "We immerse in your users, data and goals to frame the right problem." },
  { step: "02", title: "Define", desc: "Insights become a sharp strategy, flows and success metrics." },
  { step: "03", title: "Design", desc: "We craft, test and refine experiences in tight feedback loops." },
  { step: "04", title: "Deliver", desc: "Polished systems and specs your engineers can ship with confidence." },
]

const LOGOS = ["Helio", "Northwind", "Marketly", "Cadence", "Vector", "Atlas"]

const TESTIMONIALS = [
  {
    quote: "They reframed our entire onboarding around real behavior. Activation jumped within the first month.",
    name: "Dana Whitfield",
    role: "VP Product, Helio Financial",
    initials: "DW",
  },
  {
    quote: "The design system they built paid for itself in a quarter. Our team finally moves at one speed.",
    name: "Marcus Lin",
    role: "Head of Design, Atlas Health",
    initials: "ML",
  },
  {
    quote: "Research that actually changed roadmap decisions instead of sitting in a deck. Rare and invaluable.",
    name: "Priya Raman",
    role: "CPO, Cadence AI",
    initials: "PR",
  },
]

export default function UxAgency() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState<(typeof CATEGORIES)[number]>("All")

  const filteredWork =
    activeCategory === "All" ? WORK : WORK.filter((w) => w.category === activeCategory)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" />
            </span>
            Foldwise
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild size="sm">
              <a href="#contact">
                Start a project
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {menuOpen && (
          <div className="border-t md:hidden">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-3" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild size="sm" className="mt-2">
                <a href="#contact" onClick={() => setMenuOpen(false)}>
                  Start a project
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <Badge variant="secondary" className="mb-6">
              UX & product design studio
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              We design products people actually understand.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Foldwise is a research-led UX agency. We turn messy problems into clear,
              measurable experiences your customers love and your team can ship.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">
                  Book a discovery call
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#work">See selected work</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Outcomes stat band */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-6 py-12 md:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-2 text-center md:text-left">
                <div className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                  {stat.value}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">What we do</h2>
            <p className="mt-3 text-muted-foreground">
              Four practices that compound. Engage one or run the full loop end to end.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <service.icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-medium">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected work with filter chips */}
        <section id="work" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
                <p className="mt-3 text-muted-foreground">
                  A sample of recent engagements. Filter by the practice that fits your need.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter work by category">
              {CATEGORIES.map((cat) => {
                const active = cat === activeCategory
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredWork.map((item) => (
                <article
                  key={item.title}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-card"
                >
                  <div className="flex aspect-[4/3] items-center justify-center bg-muted">
                    <Layout className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{item.category}</Badge>
                      <span className="text-xs font-medium text-primary">{item.result}</span>
                    </div>
                    <h3 className="mt-3 flex items-center gap-1 text-lg font-medium">
                      {item.title}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.client}</p>
                  </div>
                </article>
              ))}
            </div>
            {filteredWork.length === 0 && (
              <p className="mt-10 text-center text-sm text-muted-foreground">
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>

        {/* Process timeline */}
        <section id="process" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">How we work</h2>
            <p className="mt-3 text-muted-foreground">
              A transparent, four-phase loop that keeps risk low and momentum high.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {PROCESS.map((phase, i) => (
              <div key={phase.step} className="relative">
                {i < PROCESS.length - 1 && (
                  <span
                    className="absolute left-5 top-5 hidden h-px w-full bg-border md:block"
                    aria-hidden="true"
                  />
                )}
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border bg-background text-sm font-semibold text-primary">
                  {phase.step}
                </span>
                <h3 className="mt-4 text-lg font-medium">{phase.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{phase.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Client logos */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-14">
            <p className="text-center text-sm text-muted-foreground">
              Trusted by product teams at
            </p>
            <div className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 md:grid-cols-6">
              {LOGOS.map((logo) => (
                <div
                  key={logo}
                  className="text-center text-lg font-semibold tracking-tight text-muted-foreground"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight">
            What clients say
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-xl border bg-card p-6">
                <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Let&rsquo;s design your next release.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us where you&rsquo;re stuck. We&rsquo;ll reply within two business days with
                a point of view and suggested next steps.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Free 30-minute discovery call",
                  "Senior designers, no handoffs to juniors",
                  "Fixed-scope sprints or ongoing partnership",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <form className="rounded-xl border bg-card p-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Jordan Avery" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" type="email" placeholder="you@company.com" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Inc." />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="project">What are you working on?</Label>
                <Textarea
                  id="project"
                  rows={4}
                  placeholder="A few sentences about your product and goals..."
                />
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full">
                Send inquiry
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Layers className="h-4 w-4" />
              </span>
              Foldwise
            </div>
            <nav className="flex gap-6 text-sm text-muted-foreground" aria-label="Footer">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-foreground">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2024 Foldwise UX Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
