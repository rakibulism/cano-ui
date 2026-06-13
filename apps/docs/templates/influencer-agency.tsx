"use client"

import * as React from "react"
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Megaphone,
  Users,
  Video,
  Target,
  Instagram,
  Youtube,
  Twitch,
  Heart,
  Eye,
  TrendingUp,
  Quote,
  Mail,
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

const REACH = [
  { value: "1.2B", label: "Monthly impressions" },
  { value: "850+", label: "Creators on roster" },
  { value: "4.7%", label: "Avg. engagement rate" },
  { value: "320", label: "Campaigns shipped" },
]

const SERVICES = [
  {
    icon: Megaphone,
    title: "Campaigns",
    desc: "End-to-end influencer campaigns, from brief to performance report, run by a dedicated pod.",
  },
  {
    icon: Users,
    title: "Talent",
    desc: "Exclusive management and matchmaking across our vetted roster of creators in every niche.",
  },
  {
    icon: Video,
    title: "UGC",
    desc: "Scroll-stopping user-generated content built for ads, feeds and product pages at scale.",
  },
  {
    icon: Target,
    title: "Paid",
    desc: "Whitelisting and paid amplification that turns organic hits into predictable revenue.",
  },
]

const CATEGORIES = ["All", "Beauty", "Fitness", "Gaming", "Food", "Travel"] as const

const CREATORS = [
  { name: "Maya Rivera", handle: "@mayaglow", category: "Beauty", followers: "2.4M", platform: Instagram, engagement: "5.8%" },
  { name: "Dev Okonkwo", handle: "@devlifts", category: "Fitness", followers: "1.1M", platform: Instagram, engagement: "6.2%" },
  { name: "Pixel Jin", handle: "@pixeljin", category: "Gaming", followers: "3.9M", platform: Twitch, engagement: "8.1%" },
  { name: "Sofia Marchetti", handle: "@sofiaeats", category: "Food", followers: "980K", platform: Youtube, engagement: "4.4%" },
  { name: "Theo Lindqvist", handle: "@theoroams", category: "Travel", followers: "1.7M", platform: Instagram, engagement: "5.1%" },
  { name: "Aria Nakamura", handle: "@ariabeauty", category: "Beauty", followers: "620K", platform: Youtube, engagement: "7.0%" },
  { name: "Cole Bennett", handle: "@colebuilds", category: "Fitness", followers: "1.3M", platform: Youtube, engagement: "4.9%" },
  { name: "Nova Quinn", handle: "@novaplays", category: "Gaming", followers: "2.1M", platform: Twitch, engagement: "9.3%" },
]

const CASES = [
  {
    brand: "Lumi Skincare",
    metric: "+420%",
    metricLabel: "Sales lift during launch week",
    note: "12 beauty creators, one synchronized drop, sold out in 36 hours.",
  },
  {
    brand: "Voltic Energy",
    metric: "61M",
    metricLabel: "Views across TikTok & Reels",
    note: "A gaming-led challenge that became the brand's most-shared campaign ever.",
  },
  {
    brand: "Roamwell Travel",
    metric: "3.2x",
    metricLabel: "Return on creator spend",
    note: "Always-on UGC engine feeding paid social and the booking funnel.",
  },
]

const BRANDS = ["Lumi", "Voltic", "Roamwell", "Crave", "Nimbus", "Forma"]

const TESTIMONIALS = [
  {
    quote: "They don't just send us creators, they build the whole story. Our launch outperformed every paid channel we run.",
    name: "Priya Anand",
    role: "VP Brand, Lumi Skincare",
  },
  {
    quote: "The roster is unreal and the reporting is honest. We finally trust the numbers behind influencer spend.",
    name: "Marcus Webb",
    role: "Growth Lead, Voltic",
  },
]

export default function InfluencerAgencyPage() {
  const [activeCategory, setActiveCategory] = React.useState<(typeof CATEGORIES)[number]>("All")

  const visibleCreators =
    activeCategory === "All"
      ? CREATORS
      : CREATORS.filter((c) => c.category === activeCategory)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            Hype&Co
          </div>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#roster" className="transition-colors hover:text-foreground">Roster</a>
            <a href="#results" className="transition-colors hover:text-foreground">Results</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Start a campaign</a>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-primary/5">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent blur-3xl" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 py-24 text-center lg:py-32">
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Creator-led growth, end to end
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              We turn creators into your
              <span className="text-primary"> best-performing channel.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Hype&Co is the influencer-marketing agency behind the campaigns your feed can&apos;t
              stop talking about. Strategy, talent and content, under one roof.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <a href="#contact" className="gap-2">
                  Book a strategy call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#roster">Meet the creators</a>
              </Button>
            </div>
          </div>

          {/* Reach stat band */}
          <div className="relative border-t bg-primary text-primary-foreground">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-primary-foreground/20 px-6 py-10 sm:grid-cols-4">
              {REACH.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1 px-2 text-center">
                  <span className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</span>
                  <span className="text-xs text-primary-foreground/80 sm:text-sm">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">What we do</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Four ways we make brands famous.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Run a single hero campaign or plug in the whole engine. Same senior team either way.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <Card key={s.title} className="group transition-colors hover:border-primary/50">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roster with filter chips */}
        <section id="roster" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4">The roster</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Talent for every audience.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Filter the roster by category to find the creators that fit your brand.
                </p>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={cat === activeCategory}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    cat === activeCategory
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {visibleCreators.map((c) => (
                <Card key={c.handle} className="overflow-hidden">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {c.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <c.platform className="h-4 w-4" />
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold leading-tight">{c.name}</div>
                      <div className="text-sm text-muted-foreground">{c.handle}</div>
                    </div>
                    <Badge variant="secondary" className="w-fit">{c.category}</Badge>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        {c.followers}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium text-primary">
                        <Heart className="h-4 w-4" />
                        {c.engagement}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Results / case studies */}
        <section id="results" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Proof</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Campaigns that actually moved the number.
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {CASES.map((c) => (
                <Card key={c.brand} className="flex flex-col border-primary/20">
                  <CardContent className="flex flex-1 flex-col gap-4 p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">{c.brand}</span>
                      <Badge className="gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        Win
                      </Badge>
                    </div>
                    <div className="text-5xl font-bold tracking-tight text-primary">{c.metric}</div>
                    <div className="text-sm font-medium">{c.metricLabel}</div>
                    <p className="text-sm text-muted-foreground">{c.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Brand logos */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-12">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Brands we&apos;ve made go viral
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {BRANDS.map((b) => (
                <span key={b} className="text-xl font-semibold tracking-tight text-muted-foreground">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <Badge variant="outline" className="mb-4">Word on the street</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The brands keep coming back.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="bg-primary/5">
                  <CardContent className="flex flex-col gap-6 p-8">
                    <Quote className="h-8 w-8 text-primary" />
                    <p className="text-lg font-medium leading-relaxed">{t.quote}</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {t.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold leading-tight">{t.name}</div>
                        <div className="text-sm text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit">Let&apos;s talk</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to go viral on purpose?
              </h2>
              <p className="text-muted-foreground">
                Tell us about your brand and goals. We&apos;ll come back with a creator shortlist and a
                campaign concept within two business days.
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-4 w-4" />
                </span>
                hello@hypeandco.studio
              </div>
              <div className="flex items-center gap-3">
                {[Instagram, Youtube, Twitch].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground"
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Jordan Reyes" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" placeholder="Acme Beauty" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="you@brand.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="brief">Campaign brief</Label>
                    <Textarea
                      id="brief"
                      rows={4}
                      placeholder="We're launching a new serum and want beauty creators for a synchronized drop..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Send the brief
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No spam. We reply within two business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Hype&Co
          </div>
          <p className="text-sm text-muted-foreground">
            (c) 2024 Hype&Co Creative. Made loud, on purpose.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#roster" className="transition-colors hover:text-foreground">Roster</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
