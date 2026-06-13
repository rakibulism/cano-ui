"use client"

import * as React from "react"
import {
  Play,
  Film,
  Award,
  ArrowUpRight,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Clapperboard,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type Category = "All" | "Commercial" | "Music video" | "Documentary" | "Short"

const CATEGORIES: Category[] = ["All", "Commercial", "Music video", "Documentary", "Short"]

const PROJECTS: {
  title: string
  client: string
  year: string
  category: Exclude<Category, "All">
  runtime: string
}[] = [
  { title: "Neon Rain", client: "Atlas Motors", year: "2024", category: "Commercial", runtime: "1:20" },
  { title: "Hollow Light", client: "VÉLA", year: "2024", category: "Music video", runtime: "3:48" },
  { title: "The Salt Coast", client: "Independent", year: "2023", category: "Documentary", runtime: "22:10" },
  { title: "After Hours", client: "Self-produced", year: "2023", category: "Short", runtime: "11:32" },
  { title: "Midnight Bloom", client: "Aether Beauty", year: "2023", category: "Commercial", runtime: "0:45" },
  { title: "Echo Chamber", client: "NOVA", year: "2022", category: "Music video", runtime: "4:02" },
  { title: "Last Harvest", client: "PBS Frontline", year: "2022", category: "Documentary", runtime: "48:00" },
  { title: "Glass House", client: "Self-produced", year: "2021", category: "Short", runtime: "14:55" },
]

const AWARDS: { name: string; org: string; year: string; result: string }[] = [
  { name: "Best Cinematography", org: "Sundance Shorts", year: "2024", result: "Winner" },
  { name: "Director of the Year", org: "Clio Awards", year: "2023", result: "Finalist" },
  { name: "Best Documentary Feature", org: "Tribeca Film Festival", year: "2022", result: "Official Selection" },
  { name: "Gold — Branded Content", org: "Cannes Lions", year: "2022", result: "Winner" },
  { name: "Best Music Video", org: "UK Music Video Awards", year: "2021", result: "Nominee" },
]

const CLIENTS = ["Atlas Motors", "VÉLA", "Aether Beauty", "NOVA", "PBS", "Tribeca", "Clio", "A24"]

const STATS = [
  { label: "Films directed", value: "60+" },
  { label: "Festival selections", value: "24" },
  { label: "Years behind the lens", value: "12" },
]

export default function FilmmakerPortfolio() {
  const [active, setActive] = React.useState<Category>("All")

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase">
            <Clapperboard className="h-5 w-5 text-primary" aria-hidden="true" />
            Mara Vance
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#awards" className="transition-colors hover:text-foreground">Awards</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
            <a href="#contact">Book a project</a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden border-b border-border/60 bg-muted">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary/15),transparent_55%)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" aria-hidden="true" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 py-28 md:py-40">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Film className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Director & Cinematographer
            </span>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              Stories told in shadow, light, and motion.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              I direct commercials, music videos, and documentaries with a moody,
              cinematic eye. Based in Los Angeles, shooting everywhere.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="group gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                </span>
                Watch showreel
              </Button>
              <Button asChild size="lg" variant="ghost" className="gap-2">
                <a href="#work">
                  Browse work
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
            <dl className="mt-6 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Work / projects grid */}
        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Selected work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Recent frames
              </h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    active === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border/70 bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.title}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl border border-border/60 bg-muted"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,theme(colors.primary/20),transparent_60%)]" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent transition-opacity duration-300 group-hover:from-background/95" aria-hidden="true" />
                <div className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-background/60 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur">
                  <Play className="h-3 w-3 fill-current" aria-hidden="true" />
                  {p.runtime}
                </div>
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary text-primary-foreground">
                    <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                  </span>
                </div>
                <div className="relative z-10 space-y-1 p-5">
                  <span className="text-xs uppercase tracking-[0.2em] text-primary">{p.category}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {p.client} &middot; {p.year}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About / bio */}
        <section id="about" className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-28">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/60 bg-muted">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,theme(colors.primary/20),transparent_60%)]" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-full bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                Los Angeles, CA
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">About</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                I chase light at the edge of dark.
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  For over a decade I&apos;ve been building worlds through the
                  lens — from neon-soaked commercials to intimate documentaries
                  that linger long after the credits roll. My work lives in
                  contrast: tension and stillness, grain and clarity.
                </p>
                <p>
                  I collaborate closely with brands, artists, and producers who
                  want more than a polished frame. We make images that feel like
                  memories — slightly out of reach, impossible to forget.
                </p>
              </div>
              <figure className="mt-8 border-l-2 border-primary pl-5">
                <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
                <blockquote className="mt-2 text-lg font-medium italic">
                  &ldquo;Mara doesn&apos;t shoot a product — she shoots the feeling around it.&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  — Creative Director, Atlas Motors
                </figcaption>
              </figure>
              <div className="mt-8 flex items-center gap-4">
                <Button asChild variant="outline" size="icon" aria-label="Instagram">
                  <a href="#contact"><Instagram className="h-4 w-4" aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="outline" size="icon" aria-label="YouTube">
                  <a href="#contact"><Youtube className="h-4 w-4" aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="outline" size="icon" aria-label="Twitter">
                  <a href="#contact"><Twitter className="h-4 w-4" aria-hidden="true" /></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Recognition</h2>
          </div>
          <ul className="mt-10 divide-y divide-border/60 border-t border-border/60">
            {AWARDS.map((a) => (
              <li
                key={a.name + a.year}
                className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
              >
                <div>
                  <p className="text-lg font-medium tracking-tight">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.org}</p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                    {a.result}
                  </span>
                  <span className="tabular-nums text-muted-foreground">{a.year}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Clients */}
        <section className="border-y border-border/60 bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-14">
            <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Trusted by brands, labels & studios
            </p>
            <div className="mt-8 grid grid-cols-2 items-center gap-6 sm:grid-cols-4 md:grid-cols-8">
              {CLIENTS.map((c) => (
                <span
                  key={c}
                  className="text-center text-sm font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="relative overflow-hidden bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,theme(colors.primary/15),transparent_55%)]" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">Let&apos;s work</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Got a story worth shooting?
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Tell me about your project — the brief, the budget, the vibe.
                I reply to every message within two business days.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a href="#contact" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                  <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  hello@maravance.film
                </a>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  Available worldwide &middot; based in LA
                </p>
              </div>
            </div>

            <form
              className="rounded-2xl border border-border/60 bg-card p-6 md:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@studio.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project">Project type</Label>
                  <Input id="project" placeholder="Commercial, music video, documentary…" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">The brief</Label>
                  <Textarea id="message" rows={4} placeholder="What are we making?" />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Send inquiry
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase">
            <Clapperboard className="h-5 w-5 text-primary" aria-hidden="true" />
            Mara Vance
          </div>
          <Separator className="sm:hidden" />
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Mara Vance Films. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#contact" aria-label="Instagram" className="transition-colors hover:text-foreground">
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" aria-label="YouTube" className="transition-colors hover:text-foreground">
              <Youtube className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" aria-label="Twitter" className="transition-colors hover:text-foreground">
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
