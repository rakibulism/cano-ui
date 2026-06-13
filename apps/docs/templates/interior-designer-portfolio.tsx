"use client"
import * as React from "react"
import { ArrowUpRight, Sofa, Mail, Phone, MapPin, Quote, Ruler, Palette, Lightbulb, Hammer, Star, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const FILTERS = ["All", "Residential", "Commercial", "Kitchen", "Outdoor"] as const
type Filter = (typeof FILTERS)[number]

type Project = {
  title: string
  place: string
  year: string
  category: Exclude<Filter, "All">
  tone: string
}

const PROJECTS: Project[] = [
  { title: "Maple Hill Residence", place: "Aspen, CO", year: "2024", category: "Residential", tone: "bg-primary/10" },
  { title: "Atelier No. 9", place: "Brooklyn, NY", year: "2024", category: "Commercial", tone: "bg-accent" },
  { title: "Slate & Oak Kitchen", place: "Portland, OR", year: "2023", category: "Kitchen", tone: "bg-secondary" },
  { title: "Cedar Courtyard", place: "Santa Fe, NM", year: "2023", category: "Outdoor", tone: "bg-muted" },
  { title: "The Linen Loft", place: "Chicago, IL", year: "2023", category: "Residential", tone: "bg-accent" },
  { title: "Verde Bistro", place: "Austin, TX", year: "2022", category: "Commercial", tone: "bg-primary/10" },
  { title: "Marble Galley", place: "Seattle, WA", year: "2022", category: "Kitchen", tone: "bg-muted" },
  { title: "Terrace at Dune Road", place: "Montauk, NY", year: "2022", category: "Outdoor", tone: "bg-secondary" },
]

const SERVICES = [
  { icon: Lightbulb, title: "Concept & Vision", desc: "Mood, palette, and spatial storytelling tailored to how you live." },
  { icon: Ruler, title: "Space Planning", desc: "Floor plans and flow studies that make every square foot earn its place." },
  { icon: Palette, title: "Material & Finish", desc: "Curated textiles, stone, and finishes sourced from trusted makers." },
  { icon: Hammer, title: "Project Delivery", desc: "On-site coordination with builders and craftspeople through install day." },
]

const PRESS = ["ARCHITECTURAL", "DWELL", "ELLE DÉCOR", "DOMINO", "AD PRO"]

const STEPS = [
  { n: "01", title: "Discovery call", desc: "We talk through your space, timeline, and the feeling you want to come home to." },
  { n: "02", title: "Design proposal", desc: "A tailored concept with palette, plans, and a transparent investment range." },
  { n: "03", title: "Studio handoff", desc: "We manage procurement and install so the reveal day is effortless." },
]

export default function InteriorDesignerPortfolio() {
  const [active, setActive] = React.useState<Filter>("All")
  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sofa className="h-4 w-4" />
            </span>
            Marlowe Studio
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#work" className="hover:text-foreground">Work</a>
            <a href="#about" className="hover:text-foreground">About</a>
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
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

      <main id="top" className="flex flex-col">
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="space-y-6">
              <Badge variant="secondary" className="rounded-full px-3 py-1">Interior Design Studio · Est. 2014</Badge>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Rooms that feel <span className="italic text-primary">quietly extraordinary</span>.
              </h1>
              <p className="max-w-md text-lg text-muted-foreground">
                I'm Elena Marlowe. I design warm, layered interiors for people who want a home that
                tells their story, not a trend.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a href="#work">View the portfolio</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#contact" className="inline-flex items-center gap-1">Work with me <ArrowUpRight className="h-4 w-4" /></a>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
                <div><span className="block text-2xl font-semibold text-foreground">120+</span>projects delivered</div>
                <Separator orientation="vertical" className="h-10" />
                <div><span className="block text-2xl font-semibold text-foreground">10 yrs</span>studio practice</div>
                <Separator orientation="vertical" className="h-10" />
                <div><span className="block text-2xl font-semibold text-foreground">4 cities</span>working across US</div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border bg-accent" aria-hidden="true">
                <div className="flex h-full flex-col justify-between p-8">
                  <div className="self-end rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">Featured · Maple Hill</div>
                  <div className="space-y-2">
                    <div className="h-24 w-24 rounded-xl bg-primary/10" />
                    <div className="h-3 w-2/3 rounded-full bg-foreground/10" />
                    <div className="h-3 w-1/2 rounded-full bg-foreground/10" />
                  </div>
                </div>
              </div>
              <Card className="absolute -bottom-6 -left-6 hidden w-56 sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <Star className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">"Elena turned our house into the calmest place we know."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Selected work</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">A portfolio of lived-in spaces</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    active === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted"
                  )}
                  aria-pressed={active === f}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <Card key={p.title} className="group overflow-hidden pt-0 transition-shadow hover:shadow-lg">
                <div className={cn("aspect-[4/3] w-full", p.tone)} aria-hidden="true">
                  <div className="flex h-full items-end justify-between p-4">
                    <Badge variant="outline" className="bg-background/70 backdrop-blur">{p.category}</Badge>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
                <CardContent className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.place}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{p.year}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          {visible.length === 0 && (
            <p className="mt-10 text-center text-sm text-muted-foreground">No projects in this category yet.</p>
          )}
        </section>

        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr]">
            <div className="space-y-5">
              <div className="aspect-square w-40 overflow-hidden rounded-2xl bg-secondary" aria-hidden="true" />
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Elena Marlowe</p>
                  <p className="text-sm text-muted-foreground">Principal Designer</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Philosophy</p>
              <Quote className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
                Good design isn't loud. It's the way light lands on a worn oak table at 4pm,
                the chair you always reach for, the room that exhales when you walk in.
              </h2>
              <p className="text-muted-foreground">
                I work slowly and personally with a small number of clients each year. Every project
                begins with how you actually live, then we layer texture, patina, and natural materials
                until a space feels both collected and inevitable.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {["Natural materials", "Considered restraint", "Built to last"].map((v) => (
                  <div key={v} className="rounded-lg border bg-card p-4 text-sm font-medium">{v}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Services</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">From first sketch to final styling</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Card key={s.title}>
                <CardContent className="space-y-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-medium">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {STEPS.map((st) => (
              <div key={st.n} className="rounded-xl border bg-card p-6">
                <span className="text-3xl font-semibold text-primary">{st.n}</span>
                <h3 className="mt-3 font-medium">{st.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-12">
            <p className="text-center text-sm uppercase tracking-widest text-muted-foreground">As featured in</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {PRESS.map((name) => (
                <span key={name} className="text-lg font-semibold tracking-tight text-muted-foreground/70">{name}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 rounded-2xl border bg-card p-8 md:grid-cols-2 md:p-12">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Work with me</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Let's design something that lasts</h2>
              <p className="text-muted-foreground">
                I take on a handful of new projects each season. Tell me about your space and we'll
                set up a discovery call.
              </p>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> studio@marlowe.design</p>
                <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> (212) 555-0148</p>
                <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Brooklyn · Aspen · Santa Fe</p>
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
                  <Input id="email" type="email" placeholder="jane@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project type</Label>
                <Input id="project" placeholder="Full-home residential, kitchen, retail…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Tell me about your space</Label>
                <Textarea id="message" rows={4} placeholder="Rooms, timeline, and the feeling you're after." />
              </div>
              <Button type="submit" size="lg" className="w-full">Request a discovery call</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sofa className="h-3.5 w-3.5" />
            </span>
            Marlowe Studio
          </div>
          <p>© 2024 Marlowe Studio. Interior design with intention.</p>
          <div className="flex gap-5">
            <a href="#work" className="hover:text-foreground">Work</a>
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
