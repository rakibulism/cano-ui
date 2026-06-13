"use client"
import * as React from "react"
import {
  Play,
  ArrowUpRight,
  Boxes,
  Film,
  Sparkles,
  Layers,
  Wand2,
  Award,
  Mail,
  Instagram,
  Youtube,
  Dribbble,
  Menu,
  Clapperboard,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const NAV = [
  { label: "Reel", href: "#reel" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Clients", href: "#clients" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
]

type Filter = "all" | "product" | "title" | "motion"

const REEL: { title: string; type: Filter; runtime: string; tag: string }[] = [
  { title: "Helix — Product Launch Film", type: "product", runtime: "1:42", tag: "3D / Product" },
  { title: "Aurora Title Sequence", type: "title", runtime: "0:58", tag: "Titles" },
  { title: "Kinetic Identity — Loop Set", type: "motion", runtime: "0:30", tag: "Motion" },
  { title: "Nebula GPU Reveal", type: "product", runtime: "1:14", tag: "3D / Product" },
  { title: "Voltage Festival Mainframe", type: "title", runtime: "1:05", tag: "Titles" },
  { title: "Fluid Brand System", type: "motion", runtime: "0:44", tag: "Motion" },
]

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "product", label: "3D / Product" },
  { key: "title", label: "Title design" },
  { key: "motion", label: "Motion systems" },
]

const CAPABILITIES = [
  { icon: Boxes, title: "3D & CGI", body: "Hard-surface modeling, look-dev and physically based rendering for product hero shots." },
  { icon: Film, title: "Title Design", body: "Cinematic main-on-end sequences, kinetic typography and broadcast packages." },
  { icon: Layers, title: "Motion Systems", body: "Scalable animation libraries and brand-ready loops for product and social." },
  { icon: Wand2, title: "Simulation & FX", body: "Fluids, cloth, particles and procedural destruction baked for final pixel." },
]

const CLIENTS = ["Nebula", "Helix", "Voltage", "Aurora", "Kinetic", "Fluidworks", "Mainframe", "Orbital"]

const AWARDS = [
  { year: "2025", name: "FWA Site of the Day", project: "Helix Launch Film" },
  { year: "2024", name: "Motion Awards — Gold", project: "Aurora Title Sequence" },
  { year: "2024", name: "Vimeo Staff Pick", project: "Fluid Brand System" },
  { year: "2023", name: "Webby Honoree", project: "Voltage Festival" },
]

const STATS = [
  { value: "120+", label: "Films delivered" },
  { value: "9", label: "Years rendering" },
  { value: "14", label: "Awards & honors" },
]

export default function MotionStudioPortfolio() {
  const [filter, setFilter] = React.useState<Filter>("all")
  const visible = filter === "all" ? REEL : REEL.filter((r) => r.type === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Clapperboard className="h-4 w-4" />
            </span>
            <span className="text-base">Kael Mori</span>
            <span className="hidden text-sm text-muted-foreground sm:inline">/ Motion Studio</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#contact">Start a project</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" aria-hidden="true" />
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
            <Badge variant="outline" className="mb-6 gap-1.5 border-primary/40 text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Available for select projects Q3
            </Badge>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
              Frames that move
              <span className="block text-muted-foreground">brands forward.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I&apos;m Kael — a 3D & motion director crafting launch films, title sequences and kinetic
              identities for studios that refuse to be still.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="#reel">
                  <Play className="h-4 w-4 fill-current" /> Watch the reel
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#contact">Book a call</a>
              </Button>
            </div>
            <div className="mt-16 grid max-w-lg grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reel grid */}
        <section id="reel" className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Selected reel</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Recent renders</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    filter === f.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-xl border bg-muted/30"
              >
                <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-primary/20 via-muted to-background">
                  <div className="absolute left-3 top-3">
                    <Badge variant="secondary" className="font-mono text-xs">{item.runtime}</Badge>
                  </div>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-transform duration-300 group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-0.5 fill-current" />
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <h3 className="font-medium leading-tight">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.tag}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">What I do</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                A full pipeline, one director.
              </h2>
              <p className="mt-4 text-muted-foreground">
                From the first storyboard to the final graded frame — I handle concept, animation and
                rendering end to end, or plug into your team.
              </p>
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="bg-card p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-medium">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section id="clients" className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Selected clients</p>
            <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Trusted by studios and brands shipping bold ideas.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
            {CLIENTS.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center bg-card px-4 py-8 text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Recognition</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Awards & honors
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Work celebrated by the people who obsess over every keyframe as much as I do.
                </p>
              </div>
              <ul className="divide-y border-y">
                {AWARDS.map((a) => (
                  <li key={a.name} className="flex items-center gap-5 py-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Award className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{a.name}</p>
                      <p className="text-sm text-muted-foreground">{a.project}</p>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{a.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Let&apos;s make something move.
                </h2>
                <p className="mt-5 max-w-md text-muted-foreground">
                  Tell me about the launch, the deadline and the vibe. I reply to every brief within two
                  working days.
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="#contact" className="font-medium hover:text-primary">hello@kaelmori.studio</a>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" size="icon" aria-label="Instagram">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="YouTube">
                    <Youtube className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Dribbble">
                    <Dribbble className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <form className="rounded-xl border bg-card p-7" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jordan Vela" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@studio.com" />
                  </div>
                </div>
                <div className="mt-5 space-y-2">
                  <Label htmlFor="budget">Project type</Label>
                  <Input id="budget" placeholder="Launch film, title sequence, motion system…" />
                </div>
                <div className="mt-5 space-y-2">
                  <Label htmlFor="brief">The brief</Label>
                  <Textarea id="brief" rows={4} placeholder="What are we bringing to life?" />
                </div>
                <Button type="submit" size="lg" className="mt-6 w-full gap-2">
                  Send brief <ArrowUpRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clapperboard className="h-4 w-4" />
            <span>Kael Mori — Motion Studio</span>
          </div>
          <Separator className="sm:hidden" />
          <p className="text-sm text-muted-foreground">Rendered with care. All frames original.</p>
        </div>
      </footer>
    </div>
  )
}
