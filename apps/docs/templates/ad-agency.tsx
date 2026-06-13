"use client"
import * as React from "react"
import { ArrowUpRight, Megaphone, Sparkles, Film, Share2, Award, Play, Mail, Phone, MapPin, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const filters = ["All", "Campaigns", "Brand", "Film", "Social"] as const
type Filter = (typeof filters)[number]

const work: { title: string; client: string; category: Exclude<Filter, "All">; award: string; tone: string }[] = [
  { title: "Run The City", client: "Velocity Sportswear", category: "Campaigns", award: "Cannes Lion", tone: "from-primary/30 to-primary/5" },
  { title: "A New Pour", client: "Northwind Coffee", category: "Brand", award: "D&AD Pencil", tone: "from-accent to-muted" },
  { title: "Midnight Reel", client: "Lumen Studios", category: "Film", award: "Clio Gold", tone: "from-muted to-primary/10" },
  { title: "Thumb Stopper", client: "Echo Beauty", category: "Social", award: "Webby", tone: "from-primary/20 to-accent" },
  { title: "Built Different", client: "Forge Motors", category: "Campaigns", award: "One Show", tone: "from-secondary to-primary/10" },
  { title: "Wild Identity", client: "Roam Outdoors", category: "Brand", award: "Effie Award", tone: "from-accent to-primary/10" },
  { title: "The Long Cut", client: "Atlas Airlines", category: "Film", award: "Cannes Lion", tone: "from-primary/10 to-muted" },
  { title: "For You, Always", client: "Petal Florists", category: "Social", award: "Shorty", tone: "from-muted to-accent" },
]

const services = [
  { icon: Megaphone, title: "Campaigns", copy: "Integrated, idea-led campaigns that move culture and metrics in equal measure." },
  { icon: Sparkles, title: "Brand", copy: "Identity, strategy and design systems built to last longer than the trend cycle." },
  { icon: Film, title: "Film", copy: "From scrappy social cuts to broadcast hero films, produced end to end in-house." },
  { icon: Share2, title: "Social", copy: "Always-on content engines that turn audiences into loyal, vocal communities." },
]

const results = [
  { client: "Velocity Sportswear", stat: "+312%", label: "Direct sales lift in 90 days", note: "A launch campaign that turned a regional brand into a national obsession." },
  { client: "Echo Beauty", stat: "84M", label: "Organic social impressions", note: "One thumb-stopping format, remixed across nine markets and four languages." },
  { client: "Forge Motors", stat: "2.4x", label: "Showroom test-drive bookings", note: "Repositioned a 40-year-old marque for a younger, electric-curious buyer." },
]

const clients = ["Velocity", "Northwind", "Lumen", "Echo", "Forge", "Roam", "Atlas", "Petal", "Orbit", "Cascade", "Halcyon", "Ember"]

const team = [
  { name: "Maya Okafor", role: "Founder, ECD", img: "https://i.pravatar.cc/200?img=47" },
  { name: "Theo Lindqvist", role: "Head of Strategy", img: "https://i.pravatar.cc/200?img=12" },
  { name: "Priya Raman", role: "Design Director", img: "https://i.pravatar.cc/200?img=32" },
  { name: "Dris Nakamura", role: "Director of Film", img: "https://i.pravatar.cc/200?img=15" },
]

export default function AdAgencyTemplate() {
  const [active, setActive] = React.useState<Filter>("All")
  const shown = active === "All" ? work : work.filter((w) => w.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-lg font-black tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground">B</span>
            BOLDFACE
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#work" className="text-muted-foreground transition-colors hover:text-foreground">Work</a>
            <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">Services</a>
            <a href="#results" className="text-muted-foreground transition-colors hover:text-foreground">Results</a>
            <a href="#team" className="text-muted-foreground transition-colors hover:text-foreground">Team</a>
          </nav>
          <Button asChild size="sm"><a href="#contact">Start a project</a></Button>
        </div>
      </header>

      <main className="flex-1">
        <section id="top" className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-background to-accent" aria-hidden="true" />
          <div className="mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
            <Badge variant="outline" className="mb-6 gap-1.5 border-primary/40 bg-background/60">
              <Award className="size-3.5 text-primary" /> 41 awards, and counting
            </Badge>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Ideas too big<br />to ignore.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground">
              We are a creative agency for brands that refuse to blend in. Strategy, story and craft, fused into work that earns attention and returns it as growth.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild><a href="#work" className="gap-2">See the work <ArrowUpRight className="size-4" /></a></Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#results" className="gap-2"><Play className="size-4" /> Watch our reel</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="work" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Selected work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Award-winning work</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active === f ? "border-primary bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((w) => (
              <Card key={w.title} className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
                <div className={cn("relative flex aspect-[4/3] items-end bg-gradient-to-br p-5", w.tone)}>
                  <Badge variant="secondary" className="absolute left-4 top-4 gap-1">
                    <Award className="size-3" /> {w.award}
                  </Badge>
                  <ArrowUpRight className="absolute right-4 top-4 size-5 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <CardContent className="flex items-center justify-between gap-3 py-4">
                  <div>
                    <p className="font-semibold leading-tight">{w.title}</p>
                    <p className="text-sm text-muted-foreground">{w.client}</p>
                  </div>
                  <Badge variant="outline">{w.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="services" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">What we do</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Four disciplines, one obsession.</h2>
              <p className="mt-3 text-muted-foreground">Every team plugs into the same idea so the work feels of a piece, wherever it shows up.</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <div key={s.title} className="group bg-card p-7 transition-colors hover:bg-accent">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <s.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Proof, not promises</p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">When the idea is right, the numbers follow.</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {results.map((r) => (
              <Card key={r.client} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <p className="text-5xl font-black tracking-tight text-primary">{r.stat}</p>
                  <p className="mt-2 font-medium">{r.label}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{r.note}</p>
                </CardContent>
                <CardContent className="pb-6">
                  <Separator className="mb-4" />
                  <p className="text-sm font-semibold">{r.client}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-10 overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 to-accent">
            <CardContent className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <Quote className="size-7 text-primary" />
                <p className="mt-4 text-xl font-medium leading-snug md:text-2xl">
                  Boldface did not just make us famous, they made us profitable. The campaign paid for itself before the second flight even aired.
                </p>
                <p className="mt-5 text-sm font-semibold">Jordan Mercer, CMO at Velocity Sportswear</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">Brands that trust us</p>
            <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4 lg:grid-cols-6">
              {clients.map((c) => (
                <div key={c} className="flex h-20 items-center justify-center bg-card text-lg font-bold tracking-tight text-muted-foreground transition-colors hover:text-foreground">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">The people</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Made by a small, fierce team.</h2>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="group text-center">
                <Avatar className="mx-auto size-28 ring-2 ring-transparent transition-all group-hover:ring-primary">
                  <AvatarImage src={m.img} alt="" />
                  <AvatarFallback>{m.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <p className="mt-4 font-semibold">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">Got something big?<br />Let&apos;s make noise.</h2>
              <p className="mt-5 max-w-md text-primary-foreground/80">
                Tell us what you are launching, fixing or dreaming up. We reply to every brief within two business days.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <p className="flex items-center gap-3"><Mail className="size-4" /> hello@boldface.studio</p>
                <p className="flex items-center gap-3"><Phone className="size-4" /> +1 (212) 555-0148</p>
                <p className="flex items-center gap-3"><MapPin className="size-4" /> 88 Canal Street, New York</p>
              </div>
            </div>
            <Card className="bg-background text-foreground">
              <CardContent className="space-y-4 py-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Jane Cooper" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-sm font-medium">Company</label>
                    <Input id="company" placeholder="Acme Co." />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="you@company.com" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="brief" className="text-sm font-medium">The brief</label>
                  <Textarea id="brief" rows={4} placeholder="We are launching..." />
                </div>
                <Button className="w-full gap-2">Send the brief <ArrowUpRight className="size-4" /></Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p className="flex items-center gap-2 font-black tracking-tight text-foreground">
            <span className="flex size-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">B</span>
            BOLDFACE
          </p>
          <p>&copy; 2024 Boldface Studio. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#work" className="transition-colors hover:text-foreground">Instagram</a>
            <a href="#work" className="transition-colors hover:text-foreground">LinkedIn</a>
            <a href="#work" className="transition-colors hover:text-foreground">Behance</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
