"use client"

import * as React from "react"
import { Box, Boxes, Cuboid, Sparkles, Layers, Mail, ArrowUpRight, Play, Star, Aperture, Orbit, Hexagon, Triangle, Circle, Square } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type Category = "All" | "Product" | "Character" | "Environment" | "Abstract"

const FILTERS: Category[] = ["All", "Product", "Character", "Environment", "Abstract"]

const WORKS: { id: number; title: string; category: Exclude<Category, "All">; year: string; tag: string }[] = [
  { id: 1, title: "Chrome Atomizer", category: "Product", year: "2025", tag: "Octane" },
  { id: 2, title: "Voidwalker", category: "Character", year: "2025", tag: "ZBrush" },
  { id: 3, title: "Neon Canyon", category: "Environment", year: "2024", tag: "Houdini" },
  { id: 4, title: "Liquid Form 07", category: "Abstract", year: "2025", tag: "Redshift" },
  { id: 5, title: "Glass Headphones", category: "Product", year: "2024", tag: "Cycles" },
  { id: 6, title: "Iron Sentinel", category: "Character", year: "2025", tag: "Substance" },
  { id: 7, title: "Floating City", category: "Environment", year: "2024", tag: "Unreal 5" },
  { id: 8, title: "Fractal Bloom", category: "Abstract", year: "2025", tag: "Octane" },
  { id: 9, title: "Ceramic Vessel", category: "Product", year: "2024", tag: "Redshift" },
]

const ICONS = [Hexagon, Triangle, Circle, Square, Box, Cuboid, Boxes, Aperture, Orbit]

const SKILLS = [
  { label: "Hard Surface Modeling", value: 95 },
  { label: "Lighting & Lookdev", value: 90 },
  { label: "Procedural / Houdini", value: 82 },
  { label: "Character Sculpting", value: 78 },
]

const SOFTWARE = ["Cinema 4D", "Houdini", "Blender", "ZBrush", "Octane", "Redshift", "Substance", "Nuke", "Unreal 5"]

const CLIENTS = ["AERO", "NOV+", "LUMEN", "VANTA", "ORBYT", "HALCYON"]

const STATS = [
  { value: "12+", label: "Years rendering" },
  { value: "240", label: "Projects shipped" },
  { value: "38", label: "Awards & features" },
]

export default function ThreeDArtistPortfolio() {
  const [active, setActive] = React.useState<Category>("All")
  const filtered = active === "All" ? WORKS : WORKS.filter((w) => w.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Cuboid className="h-4 w-4" />
            </span>
            <span>Mara Volkov</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#stack" className="transition-colors hover:text-foreground">Stack</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Hire me</a>
          </Button>
        </div>
      </header>

      <main className="flex-1" id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="outline" className="mb-6 gap-1.5">
                <Sparkles className="h-3 w-3" /> Available for Q3 2026 projects
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                CGI & 3D art that bends light into stories.
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                I'm a 3D artist crafting photoreal renders, surreal worlds, and character work for brands and studios worldwide.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#work">View the work <ArrowUpRight className="ml-1 h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#contact"><Play className="mr-1 h-4 w-4" /> Showreel 2026</a>
                </Button>
              </div>
              <div className="mt-12 flex items-center gap-8">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-semibold">{s.value}</div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl border bg-card shadow-2xl">
                <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-accent/20">
                  <Orbit className="h-40 w-40 text-primary" strokeWidth={0.6} />
                  <div className="absolute left-4 top-4">
                    <Badge className="gap-1"><Aperture className="h-3 w-3" /> Featured render</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border bg-background/80 px-4 py-3 backdrop-blur">
                    <div>
                      <div className="text-sm font-medium">Chrome Atomizer</div>
                      <div className="text-xs text-muted-foreground">Octane · 6K · 2025</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" /> Editor's pick
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Works grid with filter */}
        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Selected works</h2>
              <p className="mt-2 text-muted-foreground">A rotating set of personal and commissioned renders.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    active === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => {
              const Icon = ICONS[w.id % ICONS.length]
              return (
                <article
                  key={w.id}
                  className="group relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-xl"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-muted via-card to-accent/10">
                    <Icon className="h-20 w-20 text-foreground/30 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/60" strokeWidth={0.8} />
                    <Badge variant="secondary" className="absolute left-3 top-3 text-[11px]">{w.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <h3 className="font-medium">{w.title}</h3>
                      <p className="text-xs text-muted-foreground">{w.tag} · {w.year}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </article>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <p className="mt-10 text-center text-muted-foreground">No works in this category yet.</p>
          )}
        </section>

        {/* About + skills */}
        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-5">About</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">From wireframe to final frame.</h2>
              <p className="mt-5 text-muted-foreground">
                Based in Berlin, I've spent over a decade turning ideas into rendered light. I lead lookdev and lighting on commercial campaigns and build my own surreal worlds in between.
              </p>
              <p className="mt-4 text-muted-foreground">
                My pipeline blends procedural generation with hand-sculpted detail, so every shot feels both engineered and alive.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Badge variant="secondary" className="gap-1.5"><Layers className="h-3 w-3" /> Lookdev lead</Badge>
                <Badge variant="secondary" className="gap-1.5"><Box className="h-3 w-3" /> Hard surface</Badge>
                <Badge variant="secondary" className="gap-1.5"><Boxes className="h-3 w-3" /> World building</Badge>
              </div>
            </div>
            <div className="space-y-6">
              {SKILLS.map((s) => (
                <div key={s.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">{s.label}</span>
                    <span className="text-muted-foreground">{s.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${s.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Software badge row */}
        <section id="stack" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">Toolset</Badge>
            <h2 className="text-3xl font-semibold tracking-tight">The software I render with</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              A battle-tested stack for modeling, simulation, shading and compositing.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {SOFTWARE.map((tool) => (
              <span
                key={tool}
                className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary"
              >
                <Hexagon className="h-4 w-4 text-primary" />
                {tool}
              </span>
            ))}
          </div>

          {/* Client logos */}
          <Separator className="my-16" />
          <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">Trusted by studios & brands</p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {CLIENTS.map((c) => (
              <div
                key={c}
                className="flex items-center justify-center rounded-lg border bg-muted/30 py-6 text-lg font-semibold tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {c}
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="outline" className="mb-5">Contact</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Let's build something unreal.</h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Commissions, collaborations, and full-scale productions welcome. Tell me about your project and I'll reply within two business days.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                studio@maravolkov.art
              </div>
            </div>
            <form className="rounded-2xl border bg-card p-6 shadow-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="you@studio.com" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label htmlFor="msg" className="text-sm font-medium">Project brief</label>
                <Textarea id="msg" rows={4} placeholder="What are we making?" />
              </div>
              <Button type="submit" size="lg" className="mt-5 w-full">
                Send inquiry <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Cuboid className="h-3.5 w-3.5" />
            </span>
            <span>Mara Volkov · 3D Artist</span>
          </div>
          <p>© 2026 All renders are original work.</p>
          <div className="flex gap-5">
            <a href="#work" className="transition-colors hover:text-foreground">ArtStation</a>
            <a href="#work" className="transition-colors hover:text-foreground">Behance</a>
            <a href="#work" className="transition-colors hover:text-foreground">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
