"use client"

import * as React from "react"
import {
  Mic,
  Play,
  Scissors,
  Radio,
  Share2,
  TrendingUp,
  Headphones,
  Download,
  Star,
  ArrowRight,
  Check,
  Sparkles,
  Waves,
  Quote,
  Mail,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navLinks = ["Services", "Shows", "Process", "Pricing", "Contact"]

const services = [
  {
    icon: Scissors,
    title: "Editing",
    desc: "Clean cuts, noise removal, leveling and mastering that make every voice sound studio-grade.",
  },
  {
    icon: Mic,
    title: "Production",
    desc: "Full-service recording, sound design, intros, transitions and music beds tailored to your brand.",
  },
  {
    icon: Radio,
    title: "Distribution",
    desc: "We publish across Apple, Spotify, YouTube and beyond with optimized show notes and metadata.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    desc: "Audience strategy, clip repurposing and analytics that turn listeners into a loyal community.",
  },
]

const shows = [
  { title: "Founders After Dark", host: "with Maya Reyes", tag: "Business", episodes: 86 },
  { title: "The Long Cut", host: "with Dev Okafor", tag: "Film", episodes: 142 },
  { title: "Quiet Mornings", host: "with Lena Park", tag: "Wellness", episodes: 54 },
  { title: "Signal & Noise", host: "with Theo Mills", tag: "Tech", episodes: 209 },
  { title: "Kitchen Confidence", host: "with Rosa Bianchi", tag: "Food", episodes: 31 },
  { title: "Field Notes", host: "with Sam Adeyemi", tag: "Science", episodes: 67 },
]

const stats = [
  { value: "48M+", label: "Downloads produced" },
  { value: "120+", label: "Shows launched" },
  { value: "9", label: "Chart-topping series" },
  { value: "98%", label: "Client retention" },
]

const steps = [
  { step: "01", title: "Discovery call", desc: "We map your goals, format and voice, then design a show concept that fits your audience." },
  { step: "02", title: "Record", desc: "Guided remote or in-studio sessions with our engineers handling the technical heavy lifting." },
  { step: "03", title: "Polish", desc: "Editing, mixing and mastering, plus show notes, chapters and eye-catching audiograms." },
  { step: "04", title: "Launch & grow", desc: "We distribute everywhere and run a 90-day growth playbook to compound your reach." },
]

const packages = [
  {
    name: "Starter",
    price: "$890",
    cadence: "/ episode",
    desc: "For solo creators finding their rhythm.",
    features: ["Editing & mastering", "Show notes", "2 audiograms", "Standard distribution"],
    featured: false,
  },
  {
    name: "Studio",
    price: "$1,640",
    cadence: "/ episode",
    desc: "Our most popular full-production package.",
    features: ["Everything in Starter", "Music & sound design", "5 social clips", "Chapter markers", "Priority turnaround"],
    featured: true,
  },
  {
    name: "Network",
    price: "Custom",
    cadence: "",
    desc: "For brands running multiple shows.",
    features: ["Dedicated producer", "Unlimited clips", "Growth strategist", "Quarterly reporting"],
    featured: false,
  },
]

const testimonials = [
  {
    quote: "They took our rough recordings and turned them into a top-10 business podcast in under a year. Total game-changer.",
    name: "Maya Reyes",
    role: "Host, Founders After Dark",
  },
  {
    quote: "The production quality is indistinguishable from the big networks, but the team actually feels like part of ours.",
    name: "Theo Mills",
    role: "Host, Signal & Noise",
  },
]

export default function PodcastStudioPage() {
  const [activeShow, setActiveShow] = React.useState(0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Waves className="size-5" />
            </span>
            Resonant Studio
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <a key={link} href={"#" + link.toLowerCase()} className="transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </nav>
          <Button size="sm" className="rounded-full">
            Book a call
          </Button>
        </div>
      </header>

      <main id="top" className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full px-3 py-1">
                <Sparkles className="size-3.5" /> Podcast production, end to end
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                We make podcasts people actually finish.
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                A warm, full-service studio that handles recording, editing, distribution and growth so you can just show up and talk.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button size="lg" className="gap-2 rounded-full">
                  <Play className="size-4 fill-current" /> Play the reel
                </Button>
                <Button size="lg" variant="outline" className="gap-2 rounded-full">
                  See our work <ArrowRight className="size-4" />
                </Button>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground">
                <Headphones className="size-4 text-primary" />
                Trusted by 120+ creators & brands
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden border-primary/20 bg-card shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <button
                      aria-label="Play featured reel"
                      className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                    >
                      <Play className="size-7 fill-current" />
                    </button>
                    <div>
                      <p className="text-sm text-muted-foreground">Now playing</p>
                      <p className="font-semibold">Studio Reel 2026</p>
                    </div>
                  </div>
                  <div className="mt-6 flex h-20 items-end gap-1">
                    {[
                      40, 70, 30, 90, 55, 80, 35, 65, 95, 50, 75, 25, 85, 45, 60, 30, 92, 48, 70, 38, 82, 28, 66, 52,
                    ].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-full bg-primary/40"
                        style={{ height: h + "%" }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>0:42</span>
                    <span>2:18</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Services</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything your show needs, in one room.</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <Card key={s.title} className="group h-full border bg-card transition-colors hover:border-primary/40">
                <CardContent className="flex h-full flex-col p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Shows gallery */}
        <section id="shows" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Shows we make</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A catalogue we are proud of.</h2>
              </div>
              <Button variant="ghost" className="gap-2">
                View all shows <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shows.map((show, i) => (
                <button
                  key={show.title}
                  onClick={() => setActiveShow(i)}
                  className={cn(
                    "group flex flex-col rounded-2xl border bg-card p-6 text-left transition-all hover:-translate-y-1",
                    activeShow === i ? "border-primary ring-1 ring-primary" : "border-border"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mic className="size-5" />
                    </span>
                    <Badge variant="outline" className="rounded-full">{show.tag}</Badge>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{show.title}</h3>
                  <p className="text-sm text-muted-foreground">{show.host}</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Headphones className="size-3.5" /> {show.episodes} episodes
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <Download className="size-5 opacity-80" />
                  <span className="text-4xl font-semibold tracking-tight">{stat.value}</span>
                </div>
                <p className="mt-2 text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Process</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From idea to chart-topper.</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col bg-card p-6">
                <span className="text-3xl font-semibold text-primary/30">{s.step}</span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Packages</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Pricing that scales with your show.</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {packages.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={cn(
                    "relative flex h-full flex-col bg-card",
                    pkg.featured ? "border-primary shadow-md ring-1 ring-primary" : "border"
                  )}
                >
                  {pkg.featured && (
                    <Badge className="absolute -top-3 left-6 rounded-full">Most popular</Badge>
                  )}
                  <CardContent className="flex h-full flex-col p-7">
                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{pkg.desc}</p>
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold tracking-tight">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground">{pkg.cadence}</span>
                    </div>
                    <Separator className="my-6" />
                    <ul className="flex flex-1 flex-col gap-3 text-sm">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="size-4 text-primary" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-7 w-full rounded-full"
                      variant={pkg.featured ? "default" : "outline"}
                    >
                      {pkg.name === "Network" ? "Contact sales" : "Get started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.name} className="h-full border bg-card">
                <CardContent className="flex h-full flex-col p-8">
                  <Quote className="size-8 text-primary/30" />
                  <p className="mt-4 flex-1 text-lg leading-relaxed">{t.quote}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5 text-primary">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star key={s} className="size-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="border-t bg-primary/5">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s make your next episode.</h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us about your show and we&apos;ll send back a tailored production plan within two business days.
              </p>
              <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="size-4 text-primary" /> hello@resonant.studio
              </div>
            </div>
            <Card className="border bg-card">
              <CardContent className="p-7">
                <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Jordan Avery" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="you@studio.com" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="show" className="text-sm font-medium">About your show</label>
                    <Input id="show" placeholder="A weekly interview podcast about design" />
                  </div>
                  <Button type="submit" className="mt-2 w-full gap-2 rounded-full">
                    Send brief <ArrowRight className="size-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Waves className="size-4" />
            </span>
            Resonant Studio
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 Resonant Studio. All rights reserved.</p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#contact" aria-label="Instagram" className="transition-colors hover:text-foreground">
              <Instagram className="size-5" />
            </a>
            <a href="#contact" aria-label="YouTube" className="transition-colors hover:text-foreground">
              <Youtube className="size-5" />
            </a>
            <a href="#contact" aria-label="Twitter" className="transition-colors hover:text-foreground">
              <Twitter className="size-5" />
            </a>
            <a href="#contact" aria-label="Share" className="transition-colors hover:text-foreground">
              <Share2 className="size-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
