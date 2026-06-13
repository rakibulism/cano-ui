"use client"
import * as React from "react"
import {
  Play,
  Film,
  Sparkles,
  PenTool,
  Clapperboard,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Instagram,
  Youtube,
  Dribbble,
  Quote,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type WorkCategory = "2D" | "Motion" | "Character" | "Explainer"

const FILTERS: Array<"All" | WorkCategory> = [
  "All",
  "2D",
  "Motion",
  "Character",
  "Explainer",
]

const WORKS: Array<{
  title: string
  client: string
  category: WorkCategory
  duration: string
  tag: string
}> = [
  { title: "Neon City Loop", client: "Pulse Records", category: "Motion", duration: "0:24", tag: "Title sequence" },
  { title: "Pip the Fox", client: "Maple Studio", category: "Character", duration: "1:48", tag: "Rig + walk cycle" },
  { title: "How Compost Works", client: "GreenLeaf", category: "Explainer", duration: "2:10", tag: "Voiceover sync" },
  { title: "Liquid Type Reel", client: "Self-directed", category: "2D", duration: "0:18", tag: "Frame-by-frame" },
  { title: "Onboarding Flow", client: "Drift App", category: "Motion", duration: "0:42", tag: "UI motion" },
  { title: "Little Robot Big Day", client: "Tinker TV", category: "Character", duration: "3:05", tag: "Short film" },
  { title: "Coffee Ritual", client: "Roast Co.", category: "2D", duration: "0:30", tag: "Loop ad" },
  { title: "Banking, Simplified", client: "Vault", category: "Explainer", duration: "1:35", tag: "Iso illustration" },
]

const SKILLS = [
  "Frame-by-frame",
  "Rigging",
  "Storyboarding",
  "Lip sync",
  "Compositing",
  "Sound design",
]

const TOOLS = [
  "After Effects",
  "Toon Boom",
  "Procreate Dreams",
  "Blender",
  "TVPaint",
  "Figma",
  "DaVinci",
]

const CLIENTS = ["Pulse", "Maple", "GreenLeaf", "Drift", "Tinker TV", "Vault"]

const STATS = [
  { value: "120+", label: "Frames a day, on a good one" },
  { value: "60", label: "Projects shipped" },
  { value: "9 yrs", label: "Drawing things that move" },
]

const categoryIcon: Record<WorkCategory, React.ComponentType<{ className?: string }>> = {
  "2D": Film,
  Motion: Sparkles,
  Character: PenTool,
  Explainer: Clapperboard,
}

export default function AnimatorPortfolio() {
  const [active, setActive] = React.useState<"All" | WorkCategory>("All")

  const visible =
    active === "All" ? WORKS : WORKS.filter((w) => w.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Play className="size-4 fill-current" />
            </span>
            <span className="text-base">Remy Aoki</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#tools" className="transition-colors hover:text-foreground">Tools</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button size="sm" className="rounded-full" asChild>
            <a href="#contact">
              Let&apos;s talk
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section id="top" className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-72 rounded-full bg-accent blur-3xl" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1">
                <Sparkles className="size-3.5" />
                2D & motion animator
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                I draw things
                <br />
                that
                <span className="ml-3 inline-block -rotate-2 rounded-xl bg-primary px-3 text-primary-foreground">
                  wiggle
                </span>
                ,
                <br />
                bounce & breathe.
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Freelance animator crafting playful loops, character rigs, and
                explainers with personality. Currently booking projects for the
                next season.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="rounded-full">
                  <Play className="size-4 fill-current" />
                  Watch showreel
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <a href="#work">Browse work</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border bg-muted">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--tw-gradient-stops))] from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    aria-label="Play showreel"
                    className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110"
                  >
                    <Play className="size-8 fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur">
                  <Clock className="size-3.5 text-primary" />
                  Showreel 2026 — 1:32
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rotate-3 items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-sm sm:flex">
                <PenTool className="size-5 text-primary" />
                <div className="text-sm">
                  <div className="font-medium leading-tight">Open for collabs</div>
                  <div className="text-xs text-muted-foreground">Reply within a day</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 lg:py-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  A mix of commissioned pieces and personal experiments. Filter
                  by what you&apos;re after.
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                Showing {visible.length} of {WORKS.length}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {FILTERS.map((f) => {
                const isActive = active === f
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setActive(f)}
                    aria-pressed={isActive}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {f}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((w) => {
                const Icon = categoryIcon[w.category]
                return (
                  <article
                    key={w.title}
                    className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                        <Icon className="size-12" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                          <Play className="size-5 fill-current" />
                        </span>
                      </div>
                      <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2 py-0.5 text-xs font-medium backdrop-blur">
                        {w.duration}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-medium leading-tight">{w.title}</h3>
                        <Badge variant="outline" className="shrink-0 rounded-full text-xs">
                          {w.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{w.client}</p>
                      <p className="mt-auto pt-3 text-xs text-muted-foreground">{w.tag}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section id="about" className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 lg:grid-cols-2 lg:py-20">
            <div>
              <Badge variant="outline" className="mb-4 rounded-full">About</Badge>
              <h2 className="text-3xl font-semibold tracking-tight">
                Hi, I&apos;m Remy. I make pixels move with purpose.
              </h2>
              <p className="mt-5 text-muted-foreground">
                I started out flip-booking in the margins of my notebooks and
                never really stopped. These days I help studios and startups turn
                static ideas into characters and stories that feel alive —
                whether that&apos;s a 4-second loop or a full explainer.
              </p>
              <p className="mt-4 text-muted-foreground">
                I care about timing, weight, and the little anticipations that
                make motion feel right. I work async, share WIPs early, and love
                a tight feedback loop.
              </p>
              <div className="mt-8 rounded-2xl border bg-card p-5">
                <Quote className="size-5 text-primary" />
                <p className="mt-3 text-sm leading-relaxed">
                  &ldquo;Remy took our flat product diagram and gave it a
                  heartbeat. Conversions on the landing page jumped after we
                  swapped in the animation.&rdquo;
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  — Priya N., Head of Brand at Drift
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                What I bring
              </h3>
              <div className="mt-4 space-y-4">
                {SKILLS.map((skill, i) => {
                  const level = [92, 88, 85, 80, 76, 70][i]
                  return (
                    <div key={skill}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium">{skill}</span>
                        <span className="text-muted-foreground">{level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${level}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator className="my-8" />

              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Trusted by
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {CLIENTS.map((c) => (
                  <div
                    key={c}
                    className="flex items-center justify-center rounded-xl border bg-card px-3 py-4 text-sm font-semibold text-muted-foreground"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-5 py-14">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Film className="size-4 text-primary" />
                Tools I reach for daily
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                {TOOLS.map((tool) => (
                  <Badge
                    key={tool}
                    variant="secondary"
                    className="rounded-full px-4 py-1.5 text-sm"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Got something that should move?
              </h2>
              <p className="mt-4 max-w-sm text-muted-foreground">
                Tell me about the project — even a rough idea works. I&apos;ll get
                back with timing, scope, and a quote within a day.
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href="#contact"
                  className="flex items-center gap-3 text-sm transition-colors hover:text-primary"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </span>
                  hello@remyaoki.studio
                </a>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full" aria-label="Instagram">
                    <Instagram className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" aria-label="YouTube">
                    <Youtube className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full" aria-label="Dribbble">
                    <Dribbble className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            <form
              className="rounded-3xl border bg-card p-6 sm:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Jordan Lee" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@studio.com" />
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <Label htmlFor="type">Project type</Label>
                <Input id="type" placeholder="Explainer, loop, character rig…" />
              </div>
              <div className="mt-4 space-y-1.5">
                <Label htmlFor="brief">The brief</Label>
                <Textarea
                  id="brief"
                  rows={4}
                  placeholder="What are we making, and roughly when do you need it?"
                />
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full rounded-full">
                Send the brief
                <ArrowUpRight className="size-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Play className="size-3 fill-current" />
            </span>
            <span>© 2026 Remy Aoki — animation studio</span>
          </div>
          <div className="flex gap-5">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
