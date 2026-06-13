"use client"

import * as React from "react"
import {
  ArrowUpRight,
  ArrowRight,
  Layers,
  PenTool,
  Globe,
  Search,
  Sparkles,
  Check,
  Star,
  Quote,
  Mail,
  Phone,
  MapPin,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Work", "Services", "Process", "Pricing", "Contact"]

const SERVICES = [
  {
    icon: PenTool,
    title: "Web Design",
    desc: "Pixel-perfect interfaces crafted in Figma, built to convert and delight.",
  },
  {
    icon: Globe,
    title: "Webflow",
    desc: "Fast, CMS-driven sites you can edit yourself — no developer required.",
  },
  {
    icon: Layers,
    title: "Branding",
    desc: "Identity systems, logos, and guidelines that make you unmistakable.",
  },
  {
    icon: Search,
    title: "SEO",
    desc: "Technical and content optimization that climbs you up the rankings.",
  },
]

const FILTERS = ["All", "Web Design", "Webflow", "Branding", "SEO"] as const
type Filter = (typeof FILTERS)[number]

const WORK: { title: string; client: string; category: Exclude<Filter, "All">; year: string }[] = [
  { title: "Lumen Finance", client: "Fintech platform", category: "Web Design", year: "2025" },
  { title: "Terra Studio", client: "Architecture firm", category: "Webflow", year: "2025" },
  { title: "Halcyon Coffee", client: "DTC retail brand", category: "Branding", year: "2024" },
  { title: "Northwind SaaS", client: "B2B software", category: "SEO", year: "2024" },
  { title: "Aperture Lens", client: "Photography portfolio", category: "Webflow", year: "2024" },
  { title: "Verdant Health", client: "Wellness startup", category: "Web Design", year: "2023" },
]

const PROCESS = [
  { step: "01", title: "Discover", desc: "We dig into your goals, audience, and competitors to set a clear direction." },
  { step: "02", title: "Design", desc: "Wireframes evolve into polished, on-brand high-fidelity designs." },
  { step: "03", title: "Build", desc: "We develop responsive, accessible, lightning-fast pages." },
  { step: "04", title: "Launch", desc: "We ship, measure, and refine for ongoing growth." },
]

const PRICING = [
  {
    name: "Starter",
    price: "$3,900",
    note: "Perfect for a sharp landing page",
    features: ["1–3 page site", "Custom design", "Mobile responsive", "Basic SEO setup", "2 weeks delivery"],
    featured: false,
  },
  {
    name: "Studio",
    price: "$8,500",
    note: "Our most popular package",
    features: ["Up to 8 pages", "CMS in Webflow", "Brand mini-system", "On-page SEO", "Analytics + 30-day support"],
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    note: "Full brand + site programs",
    features: ["Unlimited pages", "Full brand identity", "Advanced SEO + content", "Custom integrations", "Dedicated team"],
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote: "They redesigned our site and conversions jumped 42% in the first quarter. Genuinely the best partner we've worked with.",
    name: "Mara Vance",
    role: "CMO, Lumen Finance",
    initials: "MV",
  },
  {
    quote: "Fast, thoughtful, and obsessive about detail. Our brand finally feels like us.",
    name: "Devin Cho",
    role: "Founder, Halcyon Coffee",
    initials: "DC",
  },
]

const STATS = [
  { value: "120+", label: "Projects shipped" },
  { value: "4.9", label: "Avg. client rating" },
  { value: "42%", label: "Avg. lift in conversions" },
  { value: "9 yrs", label: "Studio experience" },
]

export default function WebDesignAgencyTemplate() {
  const [filter, setFilter] = React.useState<Filter>("All")
  const visibleWork = filter === "All" ? WORK : WORK.filter((w) => w.category === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Pixelcraft
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              Start a project
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Now booking Q3 projects
              </Badge>
              <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Websites that make people stop scrolling.
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                We're a web design studio crafting bold, conversion-focused digital experiences for ambitious brands.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="gap-1.5">
                  View our work <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Book a call
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                Rated 4.9/5 by 120+ clients
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {WORK.slice(0, 4).map((w, i) => (
                  <div
                    key={w.title}
                    className={cn(
                      "group relative aspect-[4/5] overflow-hidden rounded-2xl border bg-muted",
                      i % 2 === 1 && "translate-y-6"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-sm font-medium">{w.title}</p>
                      <p className="text-xs text-muted-foreground">{w.category}</p>
                    </div>
                    <ArrowUpRight className="absolute right-4 top-4 h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-6 py-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 text-center">
                <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">What we do</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to launch and grow online.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border bg-card p-6 transition-colors hover:border-primary"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Selected work + filter */}
        <section id="work" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="text-sm font-medium text-primary">Selected work</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  A few projects we're proud of.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      filter === f
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleWork.map((w) => (
                <article
                  key={w.title}
                  className="group overflow-hidden rounded-2xl border bg-card"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent" />
                    <Badge variant="secondary" className="absolute left-4 top-4">
                      {w.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="font-medium">{w.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {w.client} · {w.year}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </article>
              ))}
            </div>
            {visibleWork.length === 0 && (
              <p className="mt-10 text-center text-sm text-muted-foreground">No projects in this category yet.</p>
            )}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">How we work</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              A clear path from idea to launch.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative">
                {i < PROCESS.length - 1 && (
                  <Separator className="absolute left-12 top-5 hidden w-full md:block" />
                )}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border bg-card text-sm font-semibold text-primary">
                  {p.step}
                </div>
                <h3 className="mt-5 text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-sm font-medium text-primary">Pricing</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Simple packages, no surprises.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PRICING.map((p) => (
                <div
                  key={p.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl border bg-card p-7",
                    p.featured && "border-primary ring-1 ring-primary"
                  )}
                >
                  {p.featured && (
                    <Badge className="absolute -top-3 left-7">Most popular</Badge>
                  )}
                  <h3 className="text-lg font-medium">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                  <p className="mt-5 text-4xl font-semibold tracking-tight">{p.price}</p>
                  <Separator className="my-6" />
                  <ul className="flex-1 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-7"
                    variant={p.featured ? "default" : "outline"}
                  >
                    Get started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary">Kind words</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Loved by founders and marketers.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-2xl border bg-card p-7">
                <Quote className="h-7 w-7 text-primary/40" />
                <blockquote className="mt-4 text-lg leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{t.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
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
                Let's build something worth bookmarking.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us about your project and we'll get back within one business day.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  hello@pixelcraft.studio
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  +1 (415) 555-0142
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  San Francisco, CA
                </li>
              </ul>
            </div>
            <form className="rounded-2xl border bg-card p-7" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jane@company.com" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input id="budget" placeholder="$5,000 – $10,000" />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="message">Project details</Label>
                <Textarea id="message" rows={4} placeholder="Tell us what you're building..." />
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full gap-1.5">
                Send inquiry <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Pixelcraft
          </div>
          <p>© 2025 Pixelcraft Studio. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Twitter</a>
            <a href="#" className="hover:text-foreground">Dribbble</a>
            <a href="#" className="hover:text-foreground">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
