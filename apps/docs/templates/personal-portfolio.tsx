"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Sparkles,
  Code2,
  Palette,
  Zap,
  Star,
  Calendar,
  Download,
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

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "8+", label: "Years building" },
  { value: "40+", label: "Projects shipped" },
  { value: "12", label: "Happy clients" },
]

const PROJECTS = [
  {
    title: "Helm Analytics",
    description:
      "A real-time dashboard for product teams to track activation funnels and retention cohorts.",
    tags: ["React", "TypeScript", "D3"],
    year: "2025",
    featured: true,
  },
  {
    title: "Nimbus Design System",
    description:
      "An accessible, themeable component library powering 6 internal applications.",
    tags: ["Design Systems", "Radix", "Tailwind"],
    year: "2024",
    featured: false,
  },
  {
    title: "Pocket Field Notes",
    description:
      "An offline-first field journal app for researchers, syncing notes across devices.",
    tags: ["Next.js", "IndexedDB", "PWA"],
    year: "2024",
    featured: false,
  },
  {
    title: "Loom Commerce",
    description:
      "Headless storefront with sub-second navigation and a custom checkout flow.",
    tags: ["Remix", "Stripe", "Edge"],
    year: "2023",
    featured: false,
  },
]

const SKILLS: { group: string; items: string[]; icon: React.ElementType }[] = [
  {
    group: "Engineering",
    icon: Code2,
    items: ["TypeScript", "React", "Next.js", "Node.js", "GraphQL", "Postgres"],
  },
  {
    group: "Design",
    icon: Palette,
    items: ["Figma", "Design Systems", "Prototyping", "Accessibility", "Motion"],
  },
  {
    group: "Craft",
    icon: Zap,
    items: ["Performance", "Testing", "CI/CD", "Observability", "DX"],
  },
]

const EXPERIENCE = [
  {
    role: "Staff Frontend Engineer",
    company: "Northwind Labs",
    period: "2022 — Present",
    summary:
      "Lead the web platform team, owning the design system and the migration to a typed, server-driven UI.",
  },
  {
    role: "Senior Product Engineer",
    company: "Cobalt",
    period: "2019 — 2022",
    summary:
      "Built the analytics suite from zero to 30k weekly active users and mentored four engineers.",
  },
  {
    role: "Frontend Engineer",
    company: "Studio Mara",
    period: "2017 — 2019",
    summary:
      "Shipped marketing sites and interactive product demos for early-stage startups.",
  },
]

const SOCIALS = [
  { label: "GitHub", icon: Github, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "Twitter", icon: Twitter, href: "#" },
]

export default function PersonalPortfolio() {
  const [sent, setSent] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Avery Quinn
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button size="sm" className="gap-1.5" asChild={false}>
            <a href="#contact" className="flex items-center">
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Available for select projects
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Designer & engineer crafting calm, fast interfaces.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                I'm Avery — I help teams turn fuzzy ideas into polished products
                that feel effortless. I care about the details that make software
                feel human.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="gap-2" asChild={false}>
                  <a href="#work" className="flex items-center">
                    View my work
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download résumé
                </Button>
              </div>
              <div className="mt-10 flex gap-8">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold tracking-tight tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
                <Card className="relative w-full max-w-xs">
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback className="text-2xl">AQ</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-3 text-lg">Avery Quinn</CardTitle>
                    <CardDescription>Product Engineer & Designer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      Lisbon, Portugal
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      hello@averyquinn.dev
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center gap-2">
                    {SOCIALS.map((s) => (
                      <Button
                        key={s.label}
                        variant="outline"
                        size="icon"
                        aria-label={s.label}
                        asChild={false}
                      >
                        <a href={s.href} className="flex items-center justify-center">
                          <s.icon className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured work */}
        <section id="work" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline" className="mb-3">
                Selected work
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Projects I'm proud of
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              A handful of recent builds spanning analytics, design systems, and
              commerce.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <Card
                key={project.title}
                className={cn(
                  "group transition-shadow hover:shadow-md",
                  project.featured && "md:col-span-2"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {project.title}
                      {project.featured && (
                        <Badge className="gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {project.year}
                    </span>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1.5 px-0 text-primary">
                    View case study
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* About + Skills */}
        <section id="about" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <Badge variant="outline" className="mb-3">
                About
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                I bridge design and engineering.
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  For the last eight years I've worked at the seam between design
                  and code — close enough to designers to sweat the pixels, and
                  close enough to engineers to ship them.
                </p>
                <p>
                  I believe the best products feel inevitable. That comes from
                  taste, restraint, and a stubborn refusal to leave rough edges.
                  When I'm not building, I'm sketching type or running trails
                  along the coast.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-foreground">
                    Open to new collaborations
                  </div>
                  <div className="text-muted-foreground">
                    Booking projects starting next quarter
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {SKILLS.map((skill) => (
                <Card key={skill.group}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <skill.icon className="h-4 w-4" />
                      </span>
                      {skill.group}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience timeline */}
        <section id="experience" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-10">
            <Badge variant="outline" className="mb-3">
              Experience
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">Where I've been</h2>
          </div>

          <ol className="relative ml-3 space-y-10 border-l pl-8">
            {EXPERIENCE.map((job) => (
              <li key={job.role} className="relative">
                <span
                  className="absolute -left-[2.30rem] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-background"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-semibold">
                    {job.role}{" "}
                    <span className="text-muted-foreground">· {job.company}</span>
                  </h3>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {job.period}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-muted-foreground">{job.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-3">
                Contact
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight">
                Let's build something good.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Have a project in mind or just want to say hello? Drop me a line
                and I'll get back to you within a couple of days.
              </p>
              <Separator className="my-8" />
              <div className="space-y-4 text-sm">
                <a
                  href="#"
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  hello@averyquinn.dev
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Lisbon, Portugal · GMT+0
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="pt-0">
                {sent ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">Message sent</h3>
                    <p className="max-w-xs text-sm text-muted-foreground">
                      Thanks for reaching out — I'll reply soon. In the meantime,
                      take a look at my recent work.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSent(false)}>
                      Send another
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Jamie Rivera" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jamie@studio.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="A new product idea" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        placeholder="Tell me a little about your project…"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gap-2">
                      Send message
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" />
            </span>
            © 2026 Avery Quinn. Built with care.
          </div>
          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => (
              <Button
                key={s.label}
                variant="ghost"
                size="icon"
                aria-label={s.label}
                asChild={false}
              >
                <a href={s.href} className="flex items-center justify-center">
                  <s.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
