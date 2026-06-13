"use client"

import * as React from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Store,
  TrendingUp,
  Mail,
  Megaphone,
  ShoppingBag,
  Check,
  Star,
  Sparkles,
  Quote,
  BarChart3,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const services = [
  {
    icon: Store,
    title: "Storefront Design",
    desc: "High-converting Shopify themes built for speed, brand, and mobile-first shoppers.",
  },
  {
    icon: TrendingUp,
    title: "CRO & Testing",
    desc: "Data-driven A/B testing on PDPs and checkout to squeeze every point of conversion.",
  },
  {
    icon: Mail,
    title: "Email & SMS",
    desc: "Lifecycle flows and campaigns that turn one-time buyers into loyal repeat customers.",
  },
  {
    icon: Megaphone,
    title: "Paid Ads",
    desc: "Profitable Meta, Google, and TikTok creative engines scaled on real ROAS.",
  },
]

const stats = [
  { value: "$312M", label: "Revenue driven for clients" },
  { value: "4.7x", label: "Average return on ad spend" },
  { value: "+38%", label: "Median conversion lift" },
  { value: "210+", label: "Stores launched & scaled" },
]

const categories = ["All", "Apparel", "Beauty", "Home", "Food & Bev"] as const

const projects = [
  { name: "Northwind Apparel", category: "Apparel", metric: "+52% CVR", tag: "Replatform" },
  { name: "Lumen Skincare", category: "Beauty", metric: "6.1x ROAS", tag: "Paid + Email" },
  { name: "Hearth & Home", category: "Home", metric: "+41% AOV", tag: "CRO" },
  { name: "Daily Grind Coffee", category: "Food & Bev", metric: "3.4x LTV", tag: "Subscription" },
  { name: "Atlas Activewear", category: "Apparel", metric: "+29% CVR", tag: "Storefront" },
  { name: "Bloom Botanicals", category: "Beauty", metric: "$2.1M / mo", tag: "Full-funnel" },
]

const packages = [
  {
    name: "Launch",
    price: "$4.5k",
    period: "/mo",
    desc: "For new stores finding their footing.",
    features: ["Shopify storefront build", "Core 4 email flows", "Monthly CRO sprint", "Analytics setup"],
    featured: false,
  },
  {
    name: "Scale",
    price: "$9k",
    period: "/mo",
    desc: "For brands ready to pour fuel on the fire.",
    features: [
      "Everything in Launch",
      "Full paid media management",
      "Weekly A/B testing",
      "SMS + lifecycle automation",
      "Dedicated growth strategist",
    ],
    featured: true,
  },
  {
    name: "Partner",
    price: "Custom",
    period: "",
    desc: "Embedded team for 8-figure operators.",
    features: ["Everything in Scale", "Custom app & API work", "Retention & loyalty program", "Quarterly roadmap"],
    featured: false,
  },
]

const testimonials = [
  {
    quote:
      "They rebuilt our store and within a quarter our conversion rate jumped 47%. The team feels like an extension of ours.",
    name: "Priya Anand",
    role: "Founder, Lumen Skincare",
  },
  {
    quote:
      "We went from breaking even on ads to a steady 4x ROAS. Finally an agency that obsesses over profit, not vanity metrics.",
    name: "Marcus Hale",
    role: "CEO, Atlas Activewear",
  },
]

const logos = ["Northwind", "Lumen", "Hearth", "Daily Grind", "Atlas", "Bloom"]

export default function EcommerceAgencyPage() {
  const [activeCategory, setActiveCategory] = React.useState<(typeof categories)[number]>("All")

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </span>
            Velocity Commerce
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Get a proposal</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1">
                <Sparkles className="h-3 w-3" /> Shopify Plus Partner
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                We grow e-commerce brands that refuse to plateau.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                Storefronts, conversion, retention, and paid media under one roof. We obsess over the numbers so your store keeps compounding.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#contact">
                    Book a growth audit <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#work">See the work</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="border-primary/20 bg-card shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Net revenue
                    </CardTitle>
                    <Badge variant="outline" className="gap-1 text-primary">
                      <ArrowUpRight className="h-3 w-3" /> 38%
                    </Badge>
                  </div>
                  <p className="text-3xl font-semibold tracking-tight">$1,284,910</p>
                </CardHeader>
                <CardContent>
                  <div className="flex h-32 items-end gap-2">
                    {[38, 52, 44, 61, 73, 68, 88, 96].map((h, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex-1 rounded-t-sm",
                          i >= 6 ? "bg-primary" : "bg-primary/30"
                        )}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <BarChart3 className="h-3.5 w-3.5" />
                    Last 8 weeks, paid + organic
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stat band */}
          <div className="border-t bg-muted/30">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="py-8 text-center">
                  <p className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3">What we do</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Full-funnel growth, no hand-offs.
            </h2>
            <p className="mt-3 text-muted-foreground">
              One integrated team across design, conversion, retention, and acquisition so nothing falls through the cracks.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((svc) => (
              <Card key={svc.title} className="transition-colors hover:border-primary/40">
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svc.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{svc.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{svc.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Portfolio with filter */}
        <section id="work" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <Badge variant="outline" className="mb-3">Selected work</Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Stores we built and scaled.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={activeCategory === cat}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      activeCategory === cat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p) => (
                <Card key={p.name} className="group overflow-hidden">
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/15 via-muted to-accent">
                    <Store className="h-10 w-10 text-primary/60" />
                    <Badge className="absolute left-3 top-3" variant="secondary">
                      {p.tag}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <span className="text-sm font-semibold text-primary">{p.metric}</span>
                    </div>
                    <CardDescription>{p.category}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Case study */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <Card className="overflow-hidden border-primary/20">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12">
                <Badge variant="secondary" className="mb-4">Case study</Badge>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  How Lumen Skincare hit $2.1M / month
                </h3>
                <p className="mt-4 text-muted-foreground">
                  We replatformed Lumen onto a custom Shopify build, rebuilt their post-purchase email flows, and rebalanced ad spend toward proven creative. The result was a compounding revenue engine.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { v: "+61%", l: "Conversion rate" },
                    { v: "6.1x", l: "Blended ROAS" },
                    { v: "42%", l: "Repeat revenue" },
                  ].map((m) => (
                    <div key={m.l}>
                      <p className="text-2xl font-semibold text-primary">{m.v}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{m.l}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-8" asChild>
                  <a href="#contact">
                    Read the full breakdown <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-accent p-12">
                <div className="w-full max-w-xs space-y-4">
                  {["Storefront rebuild", "Email lifecycle", "Paid media", "Retention"].map(
                    (label, i) => (
                      <div key={label}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>{label}</span>
                          <span className="text-muted-foreground">
                            {[100, 92, 78, 64][i]}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${[100, 92, 78, 64][i]}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Logos */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Trusted by fast-growing DTC brands
            </p>
            <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {logos.map((logo) => (
                <div
                  key={logo}
                  className="flex items-center justify-center text-lg font-semibold tracking-tight text-muted-foreground/70"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Packages</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Plans that scale with you.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Transparent monthly retainers. No long-term lock-in, cancel any time.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={cn(
                  "flex flex-col",
                  pkg.featured && "border-primary shadow-sm"
                )}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{pkg.name}</CardTitle>
                    {pkg.featured && <Badge>Most popular</Badge>}
                  </div>
                  <CardDescription>{pkg.desc}</CardDescription>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground">{pkg.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={pkg.featured ? "default" : "outline"}
                    asChild
                  >
                    <a href="#contact">Choose {pkg.name}</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {testimonials.map((t) => (
                <Card key={t.name} className="bg-card">
                  <CardContent className="pt-6">
                    <Quote className="h-7 w-7 text-primary/40" />
                    <p className="mt-4 text-lg leading-relaxed">{t.quote}</p>
                    <div className="mt-6 flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-sm text-muted-foreground">{t.role}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5 text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Let's talk</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to scale your store?
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Tell us where you are today. We'll send back a free growth audit with three concrete opportunities within 48 hours.
              </p>
              <Separator className="my-8" />
              <ul className="space-y-3 text-sm">
                {[
                  "No obligation, no sales pressure",
                  "Audit delivered by a senior strategist",
                  "Tailored to your platform & category",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card>
              <CardContent className="pt-6">
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
                      <Label htmlFor="email">Work email</Label>
                      <Input id="email" type="email" placeholder="jane@brand.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store">Store URL</Label>
                    <Input id="store" placeholder="yourbrand.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">What are you trying to grow?</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="We're doing $80k/mo and want to break $200k..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Request my free audit <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShoppingBag className="h-3.5 w-3.5" />
            </span>
            Velocity Commerce
          </div>
          <p>© 2024 Velocity Commerce. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#services" className="transition-colors hover:text-foreground">Services</a>
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
