"use client"
import * as React from "react"
import {
  Megaphone,
  TrendingUp,
  Users,
  Eye,
  Heart,
  PenLine,
  MessagesSquare,
  Target,
  Sparkles,
  Star,
  ArrowUpRight,
  Check,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
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

const STATS = [
  { label: "Followers gained", value: "2.4M+", icon: Users },
  { label: "Avg. engagement lift", value: "+186%", icon: Heart },
  { label: "Monthly reach", value: "94M", icon: Eye },
  { label: "Campaigns shipped", value: "320+", icon: TrendingUp },
]

const SERVICES = [
  {
    icon: PenLine,
    title: "Content Studio",
    desc: "Scroll-stopping reels, carousels, and shorts produced end-to-end by our in-house creative team.",
    tags: ["Reels", "Design", "Copy"],
  },
  {
    icon: MessagesSquare,
    title: "Community",
    desc: "Daily moderation, DMs, and replies that turn followers into a loyal, vocal fanbase.",
    tags: ["Moderation", "DMs", "UGC"],
  },
  {
    icon: Target,
    title: "Paid Social",
    desc: "Full-funnel ad buying across Meta, TikTok, and YouTube tuned to your CAC targets.",
    tags: ["Meta", "TikTok", "ROAS"],
  },
  {
    icon: Sparkles,
    title: "Influencer",
    desc: "Vetted creator partnerships and seeding programs that put your brand in the right feeds.",
    tags: ["Seeding", "Briefs", "Whitelisting"],
  },
]

const PORTFOLIO = [
  { brand: "Lumen Skincare", category: "Beauty", metric: "+312% reach", accent: "from-primary/30 to-accent" },
  { brand: "Halo Athletics", category: "Fitness", metric: "1.1M new followers", accent: "from-accent to-primary/20" },
  { brand: "Brew & Co.", category: "F&B", metric: "8.4% engagement", accent: "from-primary/20 to-muted" },
  { brand: "Nova Travel", category: "Travel", metric: "22M video views", accent: "from-muted to-accent" },
  { brand: "Pulse Audio", category: "Tech", metric: "4.1x ROAS", accent: "from-accent to-primary/30" },
  { brand: "Verde Living", category: "Home", metric: "+540 UGC posts", accent: "from-primary/30 to-muted" },
]

const PACKAGES = [
  {
    name: "Spark",
    price: "$2.4k",
    period: "/mo",
    desc: "For growing brands ready to show up consistently.",
    features: ["3 platforms managed", "12 posts / month", "Community replies", "Monthly report"],
    featured: false,
  },
  {
    name: "Momentum",
    price: "$5.8k",
    period: "/mo",
    desc: "Our most popular full-funnel growth engine.",
    features: ["5 platforms managed", "30 posts + 8 reels", "Paid social ($5k budget)", "Bi-weekly strategy calls", "Influencer seeding"],
    featured: true,
  },
  {
    name: "Takeover",
    price: "Custom",
    period: "",
    desc: "Dedicated pod for brands scaling at volume.",
    features: ["Unlimited platforms", "Dedicated creative team", "Always-on paid + creators", "Weekly war-room", "Custom dashboards"],
    featured: false,
  },
]

const TESTIMONIALS = [
  {
    quote: "They turned our dead account into the most-engaged page in our category. Sales followed within a quarter.",
    name: "Priya Nair",
    role: "CMO, Lumen Skincare",
    initials: "PN",
  },
  {
    quote: "The content quality is unreal and the reporting actually ties back to revenue. Best agency we've worked with.",
    name: "Marcus Webb",
    role: "Founder, Halo Athletics",
    initials: "MW",
  },
  {
    quote: "Their creator program got us into feeds we could never reach on our own. ROAS doubled in two months.",
    name: "Elena Ruiz",
    role: "Growth Lead, Pulse Audio",
    initials: "ER",
  },
]

const CASE_RESULTS = [
  { label: "Engagement rate", value: "8.4%", note: "up from 1.2%" },
  { label: "Follower growth", value: "1.1M", note: "in 6 months" },
  { label: "Revenue from social", value: "$3.2M", note: "attributed" },
]

const NAV = ["Services", "Work", "Results", "Pricing", "Contact"]

export default function SocialMediaAgencyPage() {
  const [plan, setPlan] = React.useState("Momentum")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Megaphone className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Amplify</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button size="sm" className="rounded-full">
            Book a call
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="top" className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/15 via-accent to-background" />
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Social-first growth agency
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              We make brands{" "}
              <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                impossible to scroll past.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Content, community, paid, and influencer — one team obsessed with turning attention into revenue.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="rounded-full">
                Start a project <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                See our work
              </Button>
            </div>

            {/* Stat band */}
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card p-6">
                  <s.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-3xl font-bold tracking-tight">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything your feed needs</h2>
            <p className="mt-3 text-muted-foreground">
              Four core services that work together as one growth machine.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {SERVICES.map((svc) => (
              <Card key={svc.title} className="group relative overflow-hidden transition-shadow hover:shadow-lg">
                <CardContent className="p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <svc.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{svc.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{svc.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {svc.tags.map((t) => (
                      <Badge key={t} variant="outline" className="rounded-full font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="work" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Campaigns that hit</h2>
                <p className="mt-3 text-muted-foreground">A few brands we helped go viral — on purpose.</p>
              </div>
              <Button variant="ghost" className="rounded-full">
                View all work <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PORTFOLIO.map((p) => (
                <div
                  key={p.brand}
                  className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className={cn("flex h-44 items-center justify-center bg-gradient-to-br", p.accent)}>
                    <span className="rounded-full bg-background/70 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                      {p.metric}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <div className="font-semibold">{p.brand}</div>
                      <div className="text-sm text-muted-foreground">{p.category}</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case study results */}
        <section id="results" className="mx-auto w-full max-w-6xl px-6 py-20">
          <Card className="overflow-hidden border-primary/30 bg-gradient-to-br from-primary/10 via-background to-accent">
            <CardContent className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
              <div>
                <Badge className="mb-4 rounded-full">Case study</Badge>
                <h2 className="text-3xl font-bold tracking-tight">
                  How Halo Athletics gained 1.1M followers in 6 months
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We rebuilt their content engine around short-form storytelling, layered a creator seeding program on
                  top, and let paid amplify only the winners. The result was category-leading engagement and a direct
                  line from feed to checkout.
                </p>
                <Button className="mt-6 rounded-full">
                  Read the full story <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="grid content-center gap-4">
                {CASE_RESULTS.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between rounded-xl border bg-card px-5 py-4"
                  >
                    <div>
                      <div className="text-sm text-muted-foreground">{r.label}</div>
                      <div className="text-xs text-muted-foreground">{r.note}</div>
                    </div>
                    <div className="text-2xl font-bold tracking-tight text-primary">{r.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Packages built to scale</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Transparent retainers. No surprise fees. Cancel any time.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {PACKAGES.map((pkg) => {
                const active = plan === pkg.name
                return (
                  <Card
                    key={pkg.name}
                    onClick={() => setPlan(pkg.name)}
                    className={cn(
                      "relative cursor-pointer transition-all",
                      active ? "border-primary shadow-lg ring-1 ring-primary" : "hover:border-primary/40"
                    )}
                  >
                    {pkg.featured && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full">Most popular</Badge>
                    )}
                    <CardContent className="p-7">
                      <h3 className="text-lg font-semibold">{pkg.name}</h3>
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-4xl font-bold tracking-tight">{pkg.price}</span>
                        <span className="text-muted-foreground">{pkg.period}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{pkg.desc}</p>
                      <Separator className="my-6" />
                      <ul className="space-y-3">
                        {pkg.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={active ? "default" : "outline"}
                        className="mt-7 w-full rounded-full"
                      >
                        {active ? "Selected" : "Choose " + pkg.name}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Clients who love the feed</h2>
            <p className="mt-3 text-muted-foreground">Don't take our word for it.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name}>
                <CardContent className="flex h-full flex-col p-7">
                  <div className="flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed">{"“" + t.quote + "”"}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="border-t bg-gradient-to-br from-accent via-background to-primary/10">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:py-24">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let's grow your feed</h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us about your brand and goals. We'll send back a tailored growth plan within two business days.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    aria-label="Social profile"
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
            <Card>
              <CardContent className="p-7">
                <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jordan Avery" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="you@brand.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="msg">What are you working on?</Label>
                    <Textarea id="msg" rows={4} placeholder="We want to grow our TikTok and launch a creator program..." />
                  </div>
                  <Button type="submit" className="mt-1 w-full rounded-full">
                    Get my growth plan
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Megaphone className="h-4 w-4" />
            </span>
            Amplify
          </div>
          <p className="text-sm text-muted-foreground">© 2024 Amplify Social. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
