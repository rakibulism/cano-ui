"use client"
import * as React from "react"
import {
  HardHat,
  Building2,
  Home,
  Hammer,
  PencilRuler,
  ShieldCheck,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ClipboardList,
  DraftingCompass,
  Wrench,
  KeyRound,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Services", "Projects", "Process", "Team", "Contact"]

const STATS = [
  { value: "420+", label: "Projects completed" },
  { value: "28", label: "Years of building" },
  { value: "1.4M", label: "Sq. ft. delivered" },
  { value: "0", label: "Lost-time incidents '25" },
]

const SERVICES = [
  {
    icon: Home,
    title: "Residential",
    desc: "Custom homes and multi-family builds crafted for the way you live.",
  },
  {
    icon: Building2,
    title: "Commercial",
    desc: "Offices, retail, and mixed-use spaces built on time and on budget.",
  },
  {
    icon: Wrench,
    title: "Renovation",
    desc: "Adaptive reuse and structural upgrades that breathe new life into properties.",
  },
  {
    icon: PencilRuler,
    title: "Design-Build",
    desc: "A single team from first sketch to final inspection — one point of accountability.",
  },
]

const CATEGORIES = ["All", "Residential", "Commercial", "Renovation"] as const
type Category = (typeof CATEGORIES)[number]

const PROJECTS: { name: string; cat: Exclude<Category, "All">; location: string; year: string }[] = [
  { name: "Cedar Ridge Residences", cat: "Residential", location: "Boulder, CO", year: "2025" },
  { name: "Meridian Tower", cat: "Commercial", location: "Denver, CO", year: "2024" },
  { name: "The Foundry Lofts", cat: "Renovation", location: "Fort Collins, CO", year: "2025" },
  { name: "Hillcrest Custom Home", cat: "Residential", location: "Aspen, CO", year: "2024" },
  { name: "Gateway Retail Plaza", cat: "Commercial", location: "Aurora, CO", year: "2023" },
  { name: "Old Mill District Revamp", cat: "Renovation", location: "Golden, CO", year: "2025" },
]

const PROCESS = [
  { icon: ClipboardList, step: "01", title: "Consult & Scope", desc: "We listen, walk the site, and align on goals, budget, and timeline." },
  { icon: DraftingCompass, step: "02", title: "Design & Estimate", desc: "Architectural drawings paired with transparent, line-item estimates." },
  { icon: HardHat, step: "03", title: "Build", desc: "Licensed crews, weekly progress reports, and rigorous safety oversight." },
  { icon: KeyRound, step: "04", title: "Handover", desc: "Final walkthrough, warranty paperwork, and the keys to your new space." },
]

const CREDENTIALS = [
  "OSHA 30 Certified Crews",
  "Licensed & Bonded GC #C-44219",
  "$5M Liability Coverage",
  "LEED Accredited Pros",
  "EMR Rating 0.71",
]

const TEAM = [
  { name: "Marcus Hале", role: "Founder & GC", initials: "MH" },
  { name: "Priya Venkat", role: "Lead Architect", initials: "PV" },
  { name: "Devon Brooks", role: "Site Superintendent", initials: "DB" },
  { name: "Lena Okafor", role: "Safety Director", initials: "LO" },
]

export default function ConstructionCompanyPage() {
  const [activeCat, setActiveCat] = React.useState<Category>("All")
  const visibleProjects =
    activeCat === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === activeCat)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <HardHat className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">Granite & Beam</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button className="hidden sm:inline-flex">Request a Quote</Button>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-muted/30" aria-hidden="true" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5">
                Building Colorado since 1997
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                We build things that{" "}
                <span className="text-primary">stand the test of time.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Full-service construction and design-build delivery for residential and
                commercial clients who refuse to compromise on craft.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Start your project
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  View our work
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-xl border bg-card shadow-sm">
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Building2 className="h-16 w-16" />
                  <span className="text-sm font-medium">On-site, on-schedule</span>
                </div>
              </div>
              <Card className="absolute -bottom-6 -left-4 hidden w-48 sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <ShieldCheck className="h-8 w-8 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Safety first</p>
                    <p className="text-xs text-muted-foreground">EMR 0.71</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stat band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">What we do</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              One team, every phase of the build
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the first shovel to the final punch list, our crews handle the full lifecycle
              of your project under one roof.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((svc) => (
              <Card key={svc.title} className="group transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svc.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{svc.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{svc.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects gallery with filter */}
        <section id="projects" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Selected work
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  Projects we are proud of
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCat(cat)}
                    aria-pressed={activeCat === cat}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      activeCat === cat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((p) => (
                <Card key={p.name} className="overflow-hidden pt-0">
                  <div className="flex aspect-[4/3] items-center justify-center bg-muted">
                    <Hammer className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <CardContent className="px-6 pb-6">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline">{p.cat}</Badge>
                      <span className="text-xs text-muted-foreground">{p.year}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {p.location}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {visibleProjects.length === 0 && (
              <p className="mt-10 text-center text-sm text-muted-foreground">
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>

        {/* Process timeline */}
        <section id="process" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">How it works</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              A predictable path from idea to keys
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative">
                {i < PROCESS.length - 1 && (
                  <div
                    className="absolute left-12 top-6 hidden h-px w-full bg-border md:block"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border bg-background text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-sm font-semibold text-muted-foreground">{p.step}</p>
                <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety / credentials strip */}
        <section className="border-y bg-primary/10">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <Award className="h-9 w-9 text-primary" />
                <div>
                  <p className="text-lg font-semibold">Credentialed, insured, accountable</p>
                  <p className="text-sm text-muted-foreground">
                    Safety isn&apos;t a slogan — it&apos;s how every job site runs.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {CREDENTIALS.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Leadership</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              The people behind the blueprint
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <Card key={member.name}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quote request CTA */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Request a free project quote
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us about your build. A project manager will reach out within one business day
                with next steps and a ballpark estimate.
              </p>
              <div className="mt-8 space-y-4">
                <p className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-primary" />
                  (303) 555-0142
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-primary" />
                  build@graniteandbeam.com
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                  1820 Quarry Rd, Denver, CO 80216
                </p>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" placeholder="Jordan Rivera" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="(303) 555-0000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Project type</Label>
                    <Input id="type" placeholder="Residential, Commercial, Renovation…" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details">Project details</Label>
                    <Textarea
                      id="details"
                      rows={4}
                      placeholder="Square footage, location, timeline, and anything else we should know."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send request
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <HardHat className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-tight">Granite & Beam</span>
            </div>
            <nav className="flex flex-wrap gap-6" aria-label="Footer">
              {NAV.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <Separator className="my-6" />
          <p className="text-xs text-muted-foreground">
            © 1997–2025 Granite & Beam Construction LLC. License #C-44219. Built to last.
          </p>
        </div>
      </footer>
    </div>
  )
}
