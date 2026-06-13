"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
  Palette,
  Code2,
  Megaphone,
  Camera,
  Star,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
]

const SERVICES = [
  {
    icon: Palette,
    title: "Brand Identity",
    desc: "Logos, systems and guidelines that make brands impossible to ignore.",
  },
  {
    icon: Code2,
    title: "Web & Product",
    desc: "Fast, accessible sites and products engineered to convert and last.",
  },
  {
    icon: Megaphone,
    title: "Campaigns",
    desc: "Launch stories and motion that move audiences and metrics alike.",
  },
  {
    icon: Camera,
    title: "Art Direction",
    desc: "Photography and visual worlds crafted frame by deliberate frame.",
  },
]

const WORK = [
  { title: "Lumen Finance", tag: "Brand · Web", year: "2024", size: "lg" },
  { title: "Arc Coffee Co.", tag: "Identity", year: "2024", size: "sm" },
  { title: "Northwind Labs", tag: "Product", year: "2023", size: "sm" },
  { title: "Atlas Travel", tag: "Campaign", year: "2023", size: "lg" },
]

const TEAM = [
  { name: "Mara Vance", role: "Creative Director", initials: "MV", src: "https://i.pravatar.cc/160?img=47" },
  { name: "Theo Nklem", role: "Lead Designer", initials: "TN", src: "https://i.pravatar.cc/160?img=12" },
  { name: "Sofia Reyes", role: "Strategist", initials: "SR", src: "https://i.pravatar.cc/160?img=32" },
  { name: "Jun Park", role: "Engineer", initials: "JP", src: "https://i.pravatar.cc/160?img=15" },
]

const CLIENTS = ["Orbit", "Foundry", "Meridian", "Vellum", "Cobalt", "Halcyon"]

const STATS = [
  { value: "120+", label: "Projects shipped" },
  { value: "9 yrs", label: "In the studio" },
  { value: "24", label: "Awards won" },
]

export default function AgencyStudio() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Fold&nbsp;Studio
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
            <Button asChild={false} size="sm">
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
              <Button size="sm" className="mt-2 w-full">
                Start a project
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Independent creative studio
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              We craft brands the
              <span className="text-muted-foreground"> world remembers.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Fold is a design and engineering studio building identities,
              websites and campaigns for ambitious teams.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2">
                View our work
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Book a call
              </Button>
            </div>
            <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client logos */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 py-10">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by
            </span>
            {CLIENTS.map((c) => (
              <span
                key={c}
                className="text-lg font-semibold tracking-tight text-muted-foreground/70"
              >
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                What we do
              </h2>
              <p className="mt-3 text-muted-foreground">
                Four disciplines, one studio. We pair strategy with craft to ship
                work that performs.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Selected work */}
        <section id="work" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Selected work
                </h2>
                <p className="mt-3 text-muted-foreground">
                  A look at recent projects across brand, web and motion.
                </p>
              </div>
              <Button variant="ghost" className="hidden gap-1.5 sm:inline-flex">
                All projects
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {WORK.map((w) => (
                <a
                  key={w.title}
                  href="#work"
                  className={cn(
                    "group relative flex flex-col justify-end overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg",
                    w.size === "lg"
                      ? "md:col-span-2 aspect-[16/9]"
                      : "aspect-[4/3]"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent opacity-70" />
                  <div className="relative flex items-end justify-between">
                    <div>
                      <Badge variant="outline" className="mb-2 bg-background/60">
                        {w.tag}
                      </Badge>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {w.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{w.year}</p>
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

        {/* Studio / team */}
        <section id="studio" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  A small team with a long view.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We stay deliberately small so the people you meet are the people
                  doing the work. No layers, no handoffs, just craft.
                </p>
                <Separator className="my-8" />
                <div className="flex flex-wrap gap-x-10 gap-y-4">
                  <div>
                    <div className="text-2xl font-semibold">100%</div>
                    <div className="text-sm text-muted-foreground">In-house</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">4 wk</div>
                    <div className="text-sm text-muted-foreground">Avg. sprint</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">Remote</div>
                    <div className="text-sm text-muted-foreground">First</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                {TEAM.map((m) => (
                  <div key={m.name} className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={m.src} alt="" />
                      <AvatarFallback>{m.initials}</AvatarFallback>
                    </Avatar>
                    <div className="mt-3 text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center md:py-28">
            <Quote className="mx-auto h-8 w-8 text-primary" />
            <blockquote className="mt-6 text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              &ldquo;Fold rebuilt our brand and site in six weeks. Sign-ups jumped
              40% and we finally look like the company we want to be.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage src="https://i.pravatar.cc/120?img=5" alt="" />
                <AvatarFallback>EL</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <div className="text-sm font-medium">Elena Marsh</div>
                <div className="text-xs text-muted-foreground">CEO, Lumen Finance</div>
              </div>
            </div>
            <div className="mt-5 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <div className="grid gap-12 rounded-2xl border bg-card p-8 md:grid-cols-2 md:p-12">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  Let&rsquo;s build something
                  <br />
                  worth remembering.
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  Tell us about your project and we&rsquo;ll get back within two
                  business days with next steps.
                </p>
                <div className="mt-8 space-y-2 text-sm">
                  <p className="font-medium">hello@foldstudio.com</p>
                  <p className="text-muted-foreground">Mon&ndash;Fri · 9 to 6 CET</p>
                </div>
              </div>
              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
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
                <div className="space-y-2">
                  <Label htmlFor="project">Project details</Label>
                  <Textarea
                    id="project"
                    rows={4}
                    placeholder="A few words about what you're building…"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Send inquiry
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
              <Sparkles className="h-4 w-4" />
            </span>
            Fold Studio
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-foreground">
                {l.label}
              </a>
            ))}
            <a href="#top" className="hover:text-foreground">
              Privacy
            </a>
          </nav>
          <p className="text-sm text-muted-foreground">© 2024 Fold Studio</p>
        </div>
      </footer>
    </div>
  )
}
