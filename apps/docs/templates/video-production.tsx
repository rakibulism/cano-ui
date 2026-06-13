"use client"

import * as React from "react"
import {
  Play,
  Film,
  Clapperboard,
  Camera,
  Wand2,
  Music2,
  Megaphone,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Mail,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = [
  { label: "Showreel", href: "#showreel" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
]

const FILTERS = ["All", "Commercial", "Music Video", "Documentary", "Brand Film"] as const

type Filter = (typeof FILTERS)[number]

const REELS: { title: string; client: string; category: Exclude<Filter, "All">; length: string; size: "lg" | "sm" }[] = [
  { title: "Run the Night", client: "Volt Motors", category: "Commercial", length: "0:60", size: "lg" },
  { title: "Echoes", client: "Mara Lune", category: "Music Video", length: "3:42", size: "sm" },
  { title: "The Last Harvest", client: "Field & Co.", category: "Documentary", length: "12:08", size: "sm" },
  { title: "Made by Hand", client: "Orbit Coffee", category: "Brand Film", length: "2:15", size: "lg" },
  { title: "Citylights", client: "Neon Audio", category: "Music Video", length: "4:01", size: "sm" },
  { title: "Drive Forward", client: "Apex Bank", category: "Commercial", length: "0:30", size: "sm" },
]

const SERVICES = [
  { icon: Clapperboard, title: "Commercials", desc: "High-impact spots built for broadcast, social and everything in between." },
  { icon: Music2, title: "Music Videos", desc: "Performance and narrative films that turn a track into a moment." },
  { icon: Film, title: "Brand Films", desc: "Cinematic stories that give your brand a voice and a feeling." },
  { icon: Camera, title: "Documentary", desc: "Honest, character-led films shot on location, anywhere." },
  { icon: Wand2, title: "Motion & VFX", desc: "Title design, compositing and 3D that elevate every frame." },
  { icon: Megaphone, title: "Campaigns", desc: "End-to-end content systems from concept to final delivery." },
]

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We dig into your goals, audience and budget to shape the brief." },
  { step: "02", title: "Pre-production", desc: "Treatment, storyboards, casting and a locked shooting schedule." },
  { step: "03", title: "Production", desc: "On set with our crew, cameras and lighting bringing it to life." },
  { step: "04", title: "Post & delivery", desc: "Edit, color, sound and final masters in every format you need." },
]

const CLIENTS = ["Volt", "Orbit", "Neon", "Apex", "Field&Co", "Mara", "Halcyon", "Lumen"]

const STATS = [
  { value: "240+", label: "Films delivered" },
  { value: "11 yrs", label: "Behind the lens" },
  { value: "6", label: "Awards won" },
  { value: "18", label: "Countries shot" },
]

export default function VideoProduction() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [filter, setFilter] = React.useState<Filter>("All")

  const visibleReels = REELS.filter((r) => filter === "All" || r.category === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Clapperboard className="h-4 w-4" />
            </span>
            Halftone&nbsp;Films
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button size="sm" className="gap-2">
              <Play className="h-4 w-4" />
              Start a project
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        {menuOpen && (
          <div className="border-t md:hidden">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <Button size="sm" className="mt-2 w-full gap-2">
                <Play className="h-4 w-4" />
                Start a project
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Cinematic hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-accent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Film className="h-3.5 w-3.5" />
              Video & motion production studio
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-tight md:text-7xl">
              Stories worth
              <span className="text-muted-foreground"> pressing play on.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Halftone is a full-service film studio crafting commercials, music
              videos and brand films from first frame to final master.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4 fill-current" />
                Watch the reel
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                See our work
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Hero showreel frame */}
            <div className="group relative mt-14 aspect-video w-full overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-muted to-accent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Play showreel"
                  className="flex h-20 w-20 items-center justify-center rounded-full border bg-background/80 backdrop-blur transition-transform group-hover:scale-105"
                >
                  <Play className="h-7 w-7 fill-foreground text-foreground" />
                </button>
              </div>
              <div className="absolute bottom-4 left-5 flex items-center gap-3">
                <Badge variant="outline" className="bg-background/70">2024 Reel</Badge>
                <span className="text-sm font-medium text-foreground/80">2:48</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-semibold tracking-tight md:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Showreel grid */}
        <section id="showreel" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Selected work</h2>
                <p className="mt-3 text-muted-foreground">
                  A cut of recent films across formats, clients and continents.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      filter === f
                        ? "border-primary bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {visibleReels.map((r) => (
                <a
                  key={r.title}
                  href="#showreel"
                  className={cn(
                    "group relative flex flex-col justify-end overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg",
                    r.size === "lg" ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-muted to-accent opacity-80" />
                  <div className="absolute right-4 top-4">
                    <Badge variant="outline" className="bg-background/70">{r.length}</Badge>
                  </div>
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-background/80 backdrop-blur transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 fill-foreground text-foreground" />
                  </span>
                  <div className="relative flex items-end justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">{r.category}</Badge>
                      <h3 className="text-xl font-semibold tracking-tight">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.client}</p>
                    </div>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border bg-background/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What we make</h2>
              <p className="mt-3 text-muted-foreground">
                A full crew under one roof, from the first treatment to the final color grade.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="group flex flex-col gap-4 bg-card p-7 transition-colors hover:bg-muted/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How a film comes together</h2>
              <p className="mt-3 text-muted-foreground">
                Four phases, one accountable team. You always know where your project stands.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {PROCESS.map((p, i) => (
                <div key={p.step} className="relative">
                  <div className="text-5xl font-semibold tracking-tight text-primary/20">{p.step}</div>
                  <h3 className="mt-3 font-medium">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  {i < PROCESS.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-6 hidden h-5 w-5 text-muted-foreground/40 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section id="clients" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by brands, labels and agencies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {CLIENTS.map((c) => (
                <span
                  key={c}
                  className="text-lg font-semibold tracking-tight text-muted-foreground/70"
                >
                  {c}
                </span>
              ))}
            </div>
            <Separator className="my-12" />
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote className="text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                &ldquo;Halftone turned a tight brief into the best film our brand has
                ever run. The craft, the calm on set, the delivery — all of it.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                Priya Nair · Head of Brand, Volt Motors
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="grid gap-12 rounded-2xl border bg-card p-8 md:grid-cols-2 md:p-12">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Got a story to tell?
                  <br />
                  Let&rsquo;s roll camera.
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Share your brief and we&rsquo;ll come back within two business days
                  with a treatment direction and ballpark budget.
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <p className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-primary" />
                    hello@halftonefilms.com
                  </p>
                  <p className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    Studio 4, Old Tannery, Lisbon
                  </p>
                  <p className="flex items-center gap-2.5 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    Mon&ndash;Fri · 9 to 6 WET
                  </p>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jane@brand.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Project type</Label>
                  <Input id="type" placeholder="Commercial, music video, brand film…" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brief">Tell us about the project</Label>
                  <Textarea id="brief" rows={4} placeholder="Goals, timeline, rough budget…" />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Send brief
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Clapperboard className="h-4 w-4" />
            </span>
            Halftone Films
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-foreground">
                {l.label}
              </a>
            ))}
            <a href="#top" className="hover:text-foreground">Privacy</a>
          </nav>
          <p className="text-sm text-muted-foreground">© 2024 Halftone Films</p>
        </div>
      </footer>
    </div>
  )
}
