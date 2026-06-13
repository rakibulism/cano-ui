"use client"
import * as React from "react"
import { ArrowUpRight, Sparkles, Palette, Box, Layers, PenTool, Mail, Instagram, Dribbble, Twitter, Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const CATEGORIES = ["All", "Editorial", "Branding", "3D", "Personal"] as const
type Category = (typeof CATEGORIES)[number]

type Work = {
  id: number
  title: string
  category: Exclude<Category, "All">
  client: string
  year: string
  span: string
  tint: string
}

const WORKS: Work[] = [
  { id: 1, title: "Neon Bloom", category: "3D", client: "Studio Aurora", year: "2025", span: "sm:row-span-2", tint: "bg-primary/15" },
  { id: 2, title: "Paper Cities", category: "Editorial", client: "The Atlas Review", year: "2024", span: "", tint: "bg-accent" },
  { id: 3, title: "Mango Soda", category: "Branding", client: "Pulp & Fizz", year: "2025", span: "", tint: "bg-secondary" },
  { id: 4, title: "Dream Logic", category: "Personal", client: "Self-initiated", year: "2024", span: "sm:row-span-2", tint: "bg-primary/10" },
  { id: 5, title: "Soft Machines", category: "3D", client: "Vellum Labs", year: "2023", span: "", tint: "bg-muted" },
  { id: 6, title: "Tidal Type", category: "Editorial", client: "Wavelength Mag", year: "2025", span: "", tint: "bg-accent" },
  { id: 7, title: "Citrus Co.", category: "Branding", client: "Citrus Co.", year: "2024", span: "sm:row-span-2", tint: "bg-secondary" },
  { id: 8, title: "Quiet Riot", category: "Personal", client: "Self-initiated", year: "2023", span: "", tint: "bg-primary/15" },
  { id: 9, title: "Glass Garden", category: "3D", client: "Botanic Future", year: "2025", span: "", tint: "bg-muted" },
]

const SERVICES = [
  { icon: PenTool, title: "Editorial Illustration", desc: "Covers, spreads and spot art for magazines, books and long-form stories." },
  { icon: Palette, title: "Brand Worlds", desc: "Characters, mascots and full visual systems that give brands a beating heart." },
  { icon: Box, title: "3D & Motion", desc: "Stylized 3D scenes, looping animations and product moments that pop." },
  { icon: Layers, title: "Art Direction", desc: "End-to-end direction across campaigns, packaging and launch toolkits." },
]

const CLIENTS = ["Aurora", "Pulp & Fizz", "Vellum", "Wavelength", "Citrus Co.", "Botanic"]

const STATS = [
  { value: "120+", label: "Projects shipped" },
  { value: "9", label: "Years drawing" },
  { value: "40+", label: "Happy clients" },
]

export default function IllustratorPortfolio() {
  const [active, setActive] = React.useState<Category>("All")
  const filtered = active === "All" ? WORKS : WORKS.filter((w) => w.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="text-lg">Remy Vega</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button size="sm" className="rounded-full" asChild>
            <a href="#contact">Let&apos;s talk <ArrowUpRight className="size-4" /></a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-16 top-40 size-64 rounded-full bg-accent blur-3xl" aria-hidden="true" />
          <div className="mx-auto w-full max-w-6xl px-5 py-20 md:py-28">
            <Badge variant="secondary" className="mb-6 rounded-full px-3 py-1">
              <Star className="mr-1 size-3.5 fill-current" /> Open for projects — Fall 2025
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
              Illustrator & <span className="text-primary">3D artist</span> drawing strange, joyful worlds.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground">
              I make bold editorial art, playful brand characters and dreamy 3D scenes for studios and publishers who like things a little weird.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button size="lg" className="rounded-full" asChild>
                <a href="#work">View selected work <ArrowUpRight className="size-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="#contact">Start a commission</a>
              </Button>
            </div>
            <div className="mt-14 flex flex-wrap gap-10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-semibold text-primary">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work + filters */}
        <section id="work" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Selected work</h2>
                <p className="mt-2 text-muted-foreground">A rotating shelf of commissions and personal experiments.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      active === c
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((w) => (
                <article
                  key={w.id}
                  className={cn(
                    "group relative flex flex-col justify-end overflow-hidden rounded-2xl border p-5 transition-transform hover:-translate-y-1",
                    w.tint,
                    w.span
                  )}
                >
                  <div className="pointer-events-none absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </div>
                  <Badge variant="outline" className="mb-2 w-fit rounded-full bg-background/60 backdrop-blur">
                    {w.category}
                  </Badge>
                  <h3 className="text-xl font-semibold tracking-tight">{w.title}</h3>
                  <p className="text-sm text-muted-foreground">{w.client} · {w.year}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <Badge variant="secondary" className="mb-5 rounded-full">About</Badge>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Hi, I&apos;m Remy — I turn loose ideas into vivid, characterful images.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Based in Lisbon, working worldwide. I sketch analog, build in 3D, and finish with a heavy hand of color. My work lives in print, on packaging and across screens.
              </p>
              <p className="mt-4 text-muted-foreground">
                When I&apos;m not drawing, you&apos;ll find me collecting risograph zines and far too many markers.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Procreate", "Cinema 4D", "Blender", "Risograph", "Adobe"].map((t) => (
                  <Badge key={t} variant="outline" className="rounded-full">{t}</Badge>
                ))}
              </div>
            </div>
            <figure className="relative rounded-3xl border bg-primary/10 p-8">
              <Quote className="size-8 text-primary" />
              <blockquote className="mt-4 text-xl font-medium leading-snug">
                Remy gave our brand a face people actually fall in love with. Every frame felt alive.
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">
                Mara Sol — Creative Director, Pulp & Fizz
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What I do</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">From a single spot illustration to a full visual universe.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.title} className="group flex gap-4 rounded-2xl border bg-card p-6 transition-colors hover:border-primary">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-14" />

            <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Trusted by playful brands & publishers
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {CLIENTS.map((c) => (
                <span key={c} className="text-xl font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="relative overflow-hidden rounded-3xl border bg-primary p-10 text-primary-foreground md:p-16">
            <div className="pointer-events-none absolute -right-10 -top-10 size-52 rounded-full bg-primary-foreground/10 blur-2xl" aria-hidden="true" />
            <div className="relative grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
                  Have a wild idea? Let&apos;s draw it.
                </h2>
                <p className="mt-4 max-w-md text-primary-foreground/80">
                  Tell me about your project and I&apos;ll get back within two days. Commissions, collaborations and the strange stuff welcome.
                </p>
                <div className="mt-7 flex gap-3">
                  {[Instagram, Dribbble, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#contact"
                      aria-label="Social link"
                      className="grid size-10 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  placeholder="Your name"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
                  aria-label="Your name"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
                  aria-label="Email address"
                />
                <Button type="submit" size="lg" variant="secondary" className="rounded-full">
                  Send the brief <Mail className="size-4" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© 2025 Remy Vega. Drawn with too much coffee.</span>
          <div className="flex gap-6">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
