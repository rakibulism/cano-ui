"use client"
import * as React from "react"
import {
  ArrowUpRight,
  MapPin,
  Award,
  Compass,
  Ruler,
  Building2,
  Trees,
  Mail,
  Phone,
  Menu,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Awards", href: "#awards" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

const FILTERS = ["All", "Residential", "Cultural", "Commercial"] as const
type Filter = (typeof FILTERS)[number]

const PROJECTS: {
  name: string
  type: Exclude<Filter, "All">
  location: string
  year: string
  blurb: string
  image: string
  span: boolean
}[] = [
  {
    name: "Meridian House",
    type: "Residential",
    location: "Oslo, Norway",
    year: "2024",
    blurb: "A cliffside residence framing the fjord through a folded concrete shell.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80",
    span: true,
  },
  {
    name: "Linnaeus Pavilion",
    type: "Cultural",
    location: "Uppsala, Sweden",
    year: "2023",
    blurb: "A botanical research pavilion of laminated timber and glass.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
    span: false,
  },
  {
    name: "Slate Tower",
    type: "Commercial",
    location: "Rotterdam, NL",
    year: "2023",
    blurb: "A 21-storey office reimagined around a vertical atrium.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    span: false,
  },
  {
    name: "Quarry Museum",
    type: "Cultural",
    location: "Carrara, Italy",
    year: "2022",
    blurb: "A subterranean gallery carved into a working marble quarry.",
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=80",
    span: false,
  },
  {
    name: "Atrium Lofts",
    type: "Residential",
    location: "Copenhagen, DK",
    year: "2022",
    blurb: "Twelve cross-laminated timber homes around a planted court.",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80",
    span: true,
  },
]

const AWARDS = [
  { year: "2024", title: "RIBA International Prize", project: "Meridian House" },
  { year: "2023", title: "Mies van der Rohe Nominee", project: "Linnaeus Pavilion" },
  { year: "2023", title: "Dezeen Award, Civic", project: "Quarry Museum" },
  { year: "2021", title: "AIA Honor, Sustainability", project: "Atrium Lofts" },
]

const PRINCIPLES = [
  { icon: Compass, title: "Site First", text: "Every project begins with the land, light, and climate it inhabits." },
  { icon: Ruler, title: "Honest Material", text: "We let concrete, timber, and stone speak in their unfinished voice." },
  { icon: Trees, title: "Low Carbon", text: "Designing for longevity, reuse, and a measurably lighter footprint." },
  { icon: Building2, title: "Quiet Detail", text: "Restraint at every junction, so the architecture recedes for life." },
]

const TEAM = [
  { name: "Ingrid Vald", role: "Founding Partner", img: "https://i.pravatar.cc/160?img=47" },
  { name: "Tomas Reyes", role: "Design Director", img: "https://i.pravatar.cc/160?img=12" },
  { name: "Mei Lin", role: "Associate, Cultural", img: "https://i.pravatar.cc/160?img=32" },
  { name: "Olu Banks", role: "Sustainability Lead", img: "https://i.pravatar.cc/160?img=15" },
]

const STATS = [
  { value: "18", label: "Years practicing" },
  { value: "64", label: "Projects realised" },
  { value: "11", label: "Countries built in" },
  { value: "9", label: "Major awards" },
]

export default function ArchitectPortfolio() {
  const [filter, setFilter] = React.useState<Filter>("All")
  const visible = PROJECTS.filter((p) => filter === "All" || p.type === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tracking-tight">VALD&middot;REYES</span>
            <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground sm:inline">
              Architects
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <a href="#contact">Start a project</a>
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative isolate min-h-[78vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="relative mx-auto flex min-h-[78vh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-32">
            <Badge variant="outline" className="mb-6 w-fit bg-background/60 uppercase tracking-[0.2em]">
              Nordic studio &middot; est. 2007
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Architecture that listens to its landscape.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              An Oslo-based studio designing residences, civic spaces, and quiet
              workplaces in concrete, timber, and stone.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#work">
                  View selected work
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-background/60" asChild>
                <a href="#studio">Our philosophy</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border px-6 sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="px-2 py-8 text-center sm:py-10">
                <div className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Selected work</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Recent projects</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm transition-colors",
                    filter === f
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {visible.map((p) => (
              <article
                key={p.name}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-muted/30",
                  p.span && "md:col-span-2",
                )}
              >
                <div className={cn("overflow-hidden", p.span ? "aspect-[21/9]" : "aspect-[4/3]")}>
                  <img
                    src={p.image}
                    alt={p.name + ", " + p.location}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                      <Badge variant="secondary">{p.type}</Badge>
                    </div>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">{p.blurb}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs uppercase tracking-wider text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> {p.location}
                      </span>
                      <span>{p.year}</span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    aria-label={"View " + p.name}
                    className="shrink-0 transition-transform group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="size-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="studio" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Studio philosophy</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                We build slowly, and for a long time.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Vald&middot;Reyes is a studio of twenty-two architects who believe a
                building should feel inevitable once it stands. We work in close
                dialogue with clients, makers, and the ground itself.
              </p>
              <p className="mt-4 text-muted-foreground">
                Each project is led by a partner from first sketch to final
                handover, with an in-house workshop for prototyping joints,
                surfaces, and details at full scale.
              </p>
              <Separator className="my-8" />
              <blockquote className="text-xl font-medium leading-relaxed tracking-tight">
                &ldquo;Good architecture disappears into the life it shelters.&rdquo;
              </blockquote>
              <p className="mt-3 text-sm text-muted-foreground">Ingrid Vald, Founding Partner</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((pr) => (
                <div key={pr.title} className="rounded-xl border bg-card p-6">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <pr.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-semibold tracking-tight">{pr.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{pr.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="awards" className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <div className="flex items-center gap-3">
            <Award className="size-5 text-primary" />
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Recognition</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Awards &amp; honors</h2>
          <ul className="mt-10 divide-y divide-border border-y">
            {AWARDS.map((a) => (
              <li
                key={a.title}
                className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:items-baseline"
              >
                <span className="text-sm font-medium tabular-nums text-muted-foreground sm:col-span-2">
                  {a.year}
                </span>
                <span className="text-lg font-medium tracking-tight sm:col-span-7">{a.title}</span>
                <span className="text-sm text-muted-foreground sm:col-span-3 sm:text-right">
                  {a.project}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="team" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">The studio</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">People behind the work</h2>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {TEAM.map((m) => (
                <div key={m.name} className="text-center">
                  <Avatar className="mx-auto size-24 rounded-xl">
                    <AvatarImage src={m.img} alt={m.name} className="object-cover" />
                    <AvatarFallback className="rounded-xl">
                      {m.name.split(" ").map((w) => w[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold tracking-tight">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Let&rsquo;s talk about your site.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                We take on a small number of new commissions each year. Tell us
                about your project and we&rsquo;ll arrange a first conversation.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <a href="#" className="flex items-center gap-3 text-foreground hover:underline">
                  <Mail className="size-4 text-muted-foreground" />
                  studio@valdreyes.no
                </a>
                <a href="#" className="flex items-center gap-3 text-foreground hover:underline">
                  <Phone className="size-4 text-muted-foreground" />
                  +47 22 04 18 90
                </a>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-4" />
                  Storgata 12, 0184 Oslo, Norway
                </p>
              </div>
            </div>
            <form
              className="rounded-xl border bg-card p-6 sm:p-8"
              onSubmit={(e) => e.preventDefault()}
            >
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
              <div className="mt-4 space-y-2">
                <Label htmlFor="location">Project location</Label>
                <Input id="location" placeholder="City, country" />
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="brief">Project brief</Label>
                <Textarea id="brief" rows={4} placeholder="A few lines about the site and your ambitions..." />
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full">
                Send enquiry
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold tracking-tight">VALD&middot;REYES</span>
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Architects</span>
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 Vald&middot;Reyes Studio. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">Journal</a>
            <a href="#" className="hover:text-foreground">Press</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
