"use client"

import * as React from "react"
import {
  PenLine,
  Video,
  Share2,
  Search,
  ArrowRight,
  Quote,
  TrendingUp,
  Sparkles,
  Check,
  Star,
  Mail,
  Play,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = ["Services", "Work", "Results", "Team", "Pricing"]

const HERO_STATS = [
  { value: "3.4M", label: "Monthly readers reached" },
  { value: "+218%", label: "Avg. organic traffic lift" },
  { value: "640+", label: "Pieces published / year" },
  { value: "4.9/5", label: "Client satisfaction" },
]

const SERVICES = [
  {
    icon: PenLine,
    title: "Blog & Editorial",
    desc: "Long-form articles, pillar pages, and thought leadership that ranks and converts.",
    tags: ["Strategy", "Writing", "Editing"],
  },
  {
    icon: Video,
    title: "Video Production",
    desc: "Short-form and explainer videos engineered for every platform and funnel stage.",
    tags: ["Scripting", "Shoot", "Edit"],
  },
  {
    icon: Share2,
    title: "Social Content",
    desc: "Always-on social calendars, carousels, and campaigns that grow real communities.",
    tags: ["Calendar", "Design", "Copy"],
  },
  {
    icon: Search,
    title: "SEO & Distribution",
    desc: "Keyword research, on-page optimization, and outreach that compounds over time.",
    tags: ["Audit", "Keywords", "Links"],
  },
]

const SAMPLES = [
  { kind: "Blog", title: "The 2026 Content Operating System", meta: "12 min read", icon: FileText },
  { kind: "Video", title: "Brand Story: Launching in Public", meta: "2:40 film", icon: Play },
  { kind: "Social", title: "30-Day Founder Carousel Series", meta: "Campaign", icon: Share2 },
  { kind: "Blog", title: "How We 10x'd a Niche Newsletter", meta: "9 min read", icon: FileText },
  { kind: "SEO", title: "Programmatic Pages That Actually Rank", meta: "Case note", icon: Search },
  { kind: "Video", title: "Explainer: From Idea to Pipeline", meta: "1:55 film", icon: Play },
]

const CASE_METRICS = [
  { value: "+312%", label: "Organic sessions in 6 months" },
  { value: "1,400", label: "Keywords on page one" },
  { value: "$0.42", label: "Cost per qualified lead" },
  { value: "8.1x", label: "Return on content spend" },
]

const TEAM = [
  { name: "Maya Whitfield", role: "Editorial Director", img: "https://i.pravatar.cc/160?img=47" },
  { name: "Devon Park", role: "Head of Video", img: "https://i.pravatar.cc/160?img=12" },
  { name: "Lena Ortiz", role: "Social Lead", img: "https://i.pravatar.cc/160?img=32" },
  { name: "Ari Cohen", role: "SEO Strategist", img: "https://i.pravatar.cc/160?img=15" },
]

const PACKAGES = [
  {
    name: "Starter",
    price: "$2.4k",
    cadence: "/mo",
    desc: "For lean teams getting a consistent engine running.",
    features: ["4 blog posts / mo", "Editorial calendar", "Monthly SEO report", "1 revision round"],
    featured: false,
  },
  {
    name: "Growth",
    price: "$5.8k",
    cadence: "/mo",
    desc: "Our most popular plan for scaling brands.",
    features: [
      "8 blog posts + 4 videos",
      "Full social calendar",
      "Keyword & link building",
      "Dedicated strategist",
      "Unlimited revisions",
    ],
    featured: true,
  },
  {
    name: "Studio",
    price: "Custom",
    cadence: "",
    desc: "End-to-end content org as a service.",
    features: ["Bespoke production", "Multi-channel campaigns", "Embedded team", "Quarterly strategy offsites"],
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote:
      "They didn't just write for us — they built a content machine. Inbound pipeline doubled in two quarters.",
    name: "Priya Nair",
    role: "VP Marketing, Northbeam",
    img: "https://i.pravatar.cc/120?img=45",
  },
  {
    quote:
      "The video team turned a dry product into something people actually share. Our demo requests jumped overnight.",
    name: "Marcus Hale",
    role: "Founder, Loophole",
    img: "https://i.pravatar.cc/120?img=8",
  },
  {
    quote:
      "Finally an agency that obsesses over results, not vanity metrics. The reporting alone is worth it.",
    name: "Sofia Klein",
    role: "Growth Lead, Caddy",
    img: "https://i.pravatar.cc/120?img=24",
  },
]

export default function ContentStudio() {
  const [activeFilter, setActiveFilter] = React.useState("All")
  const filters = ["All", "Blog", "Video", "Social", "SEO"]
  const visibleSamples =
    activeFilter === "All" ? SAMPLES : SAMPLES.filter((s) => s.kind === activeFilter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Inkwell Studio</span>
          </div>
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">Book a call</Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-5 gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Content marketing studio
                </Badge>
                <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Stories that rank, resonate, and{" "}
                  <span className="text-primary">return revenue.</span>
                </h1>
                <p className="mt-6 max-w-md text-lg text-muted-foreground">
                  We are the editorial team behind ambitious brands — blogs, video, social, and SEO
                  built around measurable outcomes.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg" className="gap-2">
                    Start a project
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Play className="h-4 w-4" />
                    Watch reel
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl border bg-muted/30 p-2 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80"
                    alt=""
                    className="h-72 w-full rounded-xl object-cover sm:h-96"
                  />
                </div>
                <Card className="absolute -bottom-6 -left-2 hidden w-48 sm:block">
                  <CardContent className="flex items-center gap-3 p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <TrendingUp className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-lg font-semibold">+218%</p>
                      <p className="text-xs text-muted-foreground">organic growth</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Stat band */}
          <div className="border-t bg-muted/30">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border px-4 sm:px-6 lg:grid-cols-4">
              {HERO_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn("px-4 py-6 text-center", i >= 2 && "border-t lg:border-t-0")}
                >
                  <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3">
              What we do
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A full-stack content team, on demand.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Four disciplines working in concert — every asset mapped to a stage of your funnel.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Card key={s.title} className="group transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Content samples gallery */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-3">
                  Selected work
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Content we are proud to ship.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      activeFilter === f
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleSamples.map((sample) => (
                <Card key={sample.title} className="group overflow-hidden">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{sample.kind}</Badge>
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <sample.icon className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-medium leading-snug">{sample.title}</h3>
                    <p className="mt-auto pt-4 text-sm text-muted-foreground">{sample.meta}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Results case study */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="mb-3">
                Case study
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                How Northbeam turned content into its #1 channel.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Over six months we rebuilt their editorial engine from scratch — pairing a data-led
                keyword strategy with a weekly publishing cadence and a tight video loop.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Mapped 40 high-intent topic clusters",
                  "Shipped 2 cornerstone assets every week",
                  "Repurposed each piece into 6 social formats",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-8 gap-2">
                Read full story
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {CASE_METRICS.map((m) => (
                <Card key={m.label} className="bg-muted/30">
                  <CardContent className="p-6">
                    <p className="text-3xl font-semibold tracking-tight text-primary">{m.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-3">
                The studio
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Senior people, no hand-offs.
              </h2>
              <p className="mt-4 text-muted-foreground">
                You work directly with the strategists and makers doing the work — no junior layers,
                no churn.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <div key={member.name} className="text-center">
                  <Avatar className="mx-auto h-24 w-24">
                    <AvatarImage src={member.img} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="mt-4 font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">
              Packages
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Simple plans that scale with you.
            </h2>
            <p className="mt-4 text-muted-foreground">
              No long lock-ins. Pause or upgrade as your content needs change.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <Card
                key={pkg.name}
                className={cn(
                  "relative flex flex-col",
                  pkg.featured && "border-primary shadow-md"
                )}
              >
                {pkg.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
                )}
                <CardContent className="flex flex-1 flex-col p-7">
                  <h3 className="text-lg font-semibold">{pkg.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground">{pkg.cadence}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{pkg.desc}</p>
                  <Separator className="my-6" />
                  <ul className="space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 w-full"
                    variant={pkg.featured ? "default" : "outline"}
                  >
                    {pkg.price === "Custom" ? "Contact sales" : "Choose plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-3 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Loved by marketing teams.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <Quote className="h-7 w-7 text-primary/40" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={t.img} alt={t.name} />
                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="grid gap-10 p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <Badge className="mb-4 gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  Let&rsquo;s talk
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to build a content engine that pays for itself?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Tell us about your goals and we&rsquo;ll send back a tailored content plan within two
                  business days.
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    Free 30-minute strategy call
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    Sample content audit included
                  </div>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="jane@brand.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">What are you working on?</Label>
                  <Textarea id="message" rows={4} placeholder="We want to grow our blog and video..." />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  Send brief
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-semibold">Inkwell Studio</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">&copy; 2026 Inkwell Studio</p>
        </div>
      </footer>
    </div>
  )
}
