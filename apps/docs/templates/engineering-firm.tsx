"use client"

import * as React from "react"
import {
  Building2,
  HardHat,
  Ruler,
  Hammer,
  Mountain,
  Zap,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Gauge,
  Layers,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Disciplines", "Projects", "Capabilities", "Team", "Contact"]

const STATS = [
  { value: "1,240+", label: "Projects delivered" },
  { value: "38", label: "Years in practice" },
  { value: "$6.2B", label: "Built value engineered" },
  { value: "0", label: "Recordable incidents (2025)" },
]

const DISCIPLINES = [
  {
    icon: Building2,
    name: "Structural",
    desc: "High-rise, long-span, and seismic-resilient frames in steel, concrete, and mass timber.",
  },
  {
    icon: Ruler,
    name: "Civil",
    desc: "Site development, grading, stormwater, and transportation infrastructure at scale.",
  },
  {
    icon: Zap,
    name: "MEP",
    desc: "Integrated mechanical, electrical, and plumbing systems tuned for performance.",
  },
  {
    icon: Mountain,
    name: "Geotechnical",
    desc: "Foundation engineering, slope stability, and subsurface investigation programs.",
  },
]

const CATEGORIES = ["All", "Structural", "Civil", "MEP", "Geotech"] as const
type Category = (typeof CATEGORIES)[number]

const PROJECTS: {
  name: string
  category: Exclude<Category, "All">
  location: string
  scope: string
}[] = [
  { name: "Meridian Tower", category: "Structural", location: "Austin, TX", scope: "54-story composite frame" },
  { name: "Harbor Crossing", category: "Civil", location: "Tampa, FL", scope: "2.1 mi causeway widening" },
  { name: "Cedar Data Campus", category: "MEP", location: "Reno, NV", scope: "120 MW cooling plant" },
  { name: "Ridgeline Reservoir", category: "Geotech", location: "Boulder, CO", scope: "Earthen dam stabilization" },
  { name: "Union Transit Hub", category: "Structural", location: "Denver, CO", scope: "Long-span steel roof" },
  { name: "Greenfield Logistics Park", category: "Civil", location: "Phoenix, AZ", scope: "640-acre site grading" },
]

const CAPABILITIES = [
  { icon: Compass, title: "Performance-based design", desc: "Nonlinear analysis for seismic and progressive-collapse resilience." },
  { icon: Layers, title: "Digital twin BIM", desc: "Federated models that carry from design through facilities management." },
  { icon: Gauge, title: "Construction engineering", desc: "Shoring, erection sequencing, and field support during delivery." },
  { icon: ShieldCheck, title: "Forensic assessment", desc: "Condition surveys, load rating, and structural rehabilitation." },
]

const CERTS = ["PE Licensed (48 States)", "SE Authority", "ISO 9001:2015", "LEED AP", "OSHA 30", "DBE Certified"]

const TEAM = [
  { name: "Diane Okafor, SE", role: "Principal, Structural", img: "https://i.pravatar.cc/160?img=47" },
  { name: "Marcus Bell, PE", role: "Director, Civil", img: "https://i.pravatar.cc/160?img=12" },
  { name: "Priya Nair, PE", role: "Lead, MEP Systems", img: "https://i.pravatar.cc/160?img=32" },
  { name: "Tom Reyes, PhD", role: "Principal, Geotechnical", img: "https://i.pravatar.cc/160?img=51" },
]

export default function EngineeringFirmPage() {
  const [filter, setFilter] = React.useState<Category>("All")

  const visible = PROJECTS.filter((p) => filter === "All" || p.category === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HardHat className="h-5 w-5" />
            </span>
            Atlas & Forge
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href={"#" + item.toLowerCase()} className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              Request a proposal
            </Button>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-5">
                Civil & Structural Engineering
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Engineering the structures that move communities forward.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                From seismic high-rises to regional infrastructure, Atlas & Forge delivers
                rigorous, buildable design across every discipline of the built environment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg">
                  Start a project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View our work
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-xl border bg-card">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -left-6 hidden w-52 shadow-lg sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Hammer className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">On the boards</p>
                    <p className="text-xs text-muted-foreground">27 active commissions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stat band */}
          <div className="border-t bg-background">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-y border-x lg:grid-cols-4 lg:divide-y-0">
              {STATS.map((s) => (
                <div key={s.label} className="px-6 py-7">
                  <p className="text-3xl font-semibold tracking-tight text-primary">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disciplines */}
        <section id="disciplines" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Disciplines</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Four practices, one integrated team
            </h2>
            <p className="mt-3 text-muted-foreground">
              Multidisciplinary by design. Our engineers collaborate across specialties so
              decisions are coordinated long before they reach the field.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DISCIPLINES.map((d) => (
              <Card key={d.name} className="transition-colors hover:border-primary">
                <CardHeader>
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <d.icon className="h-6 w-6" />
                  </span>
                  <CardTitle className="mt-4">{d.name}</CardTitle>
                  <CardDescription>{d.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects with filter */}
        <section id="projects" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-wide text-primary">Selected work</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                  Projects across the built environment
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                  const active = filter === c
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFilter(c)}
                      aria-pressed={active}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <Card key={p.name} className="overflow-hidden pt-0">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=70"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-lg">{p.name}</CardTitle>
                      <Badge variant="outline">{p.category}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> {p.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{p.scope}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {visible.length === 0 && (
              <p className="mt-10 text-center text-sm text-muted-foreground">
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-primary">Capabilities</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Technical depth, delivered with discipline
              </h2>
              <p className="mt-3 text-muted-foreground">
                We pair advanced analysis with hard-won field experience to give owners and
                contractors designs that are both ambitious and constructible.
              </p>
              <Button variant="outline" className="mt-6">
                Download capability statement
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="rounded-lg border bg-card p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications strip */}
          <Separator className="my-14" />
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {CERTS.map((cert) => (
              <span key={cert} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> {cert}
              </span>
            ))}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-wide text-primary">Leadership</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Principals who stay on your project
              </h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((m) => (
                <Card key={m.name} className="text-center">
                  <CardContent className="flex flex-col items-center pt-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={m.img} alt="" />
                      <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <p className="mt-4 font-semibold">{m.name}</p>
                    <p className="text-sm text-muted-foreground">{m.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Have a project on the horizon?
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Tell us about your site, schedule, and program. A principal engineer will respond
                within one business day.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <p className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  (512) 555-0142
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  studio@atlasforge.com
                </p>
                <p className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  410 Congress Ave, Austin, TX
                </p>
              </div>
            </div>
            <Card>
              <CardContent className="pt-6">
                <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jordan Lee" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="org">Organization</Label>
                      <Input id="org" placeholder="Acme Developments" />
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jordan@acme.com" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="brief">Project brief</Label>
                    <Textarea id="brief" rows={4} placeholder="Scope, location, target schedule..." />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send inquiry
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground">
                We treat all project details as confidential.
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
              <HardHat className="h-4 w-4" />
            </span>
            Atlas & Forge Engineering
          </div>
          <p className="text-sm text-muted-foreground">
            Licensed Professional Engineers, 48 states.
          </p>
        </div>
      </footer>
    </div>
  )
}
