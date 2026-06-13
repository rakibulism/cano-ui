"use client"

import * as React from "react"
import {
  Sparkles,
  Rocket,
  TrendingUp,
  Users,
  CalendarDays,
  Check,
  Twitter,
  Github,
  Coffee,
  Heart,
  Zap,
  ArrowRight,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const stats = [
  { label: "Monthly recurring", value: "$8,240", icon: TrendingUp, note: "MRR, all public" },
  { label: "Happy makers", value: "2,910", icon: Users, note: "across 41 countries" },
  { label: "Days shipping", value: "412", icon: CalendarDays, note: "no zero-days yet" },
]

const features = [
  {
    icon: Zap,
    title: "Ship in an afternoon",
    body: "Opinionated starter with auth, billing and emails wired up. Clone, rename, deploy.",
  },
  {
    icon: Rocket,
    title: "Launch-day toolkit",
    body: "Pre-written Product Hunt copy, tweet threads and a changelog widget that converts.",
  },
  {
    icon: Heart,
    title: "Built in public",
    body: "Every metric on this page is real and live. No vanity numbers, ever.",
  },
  {
    icon: Coffee,
    title: "Indie-priced",
    body: "One fair price, lifetime updates. No seats, no upsell maze, no enterprise gate.",
  },
]

const checklist = [
  "Full source, MIT-ish license",
  "Stripe + webhooks pre-wired",
  "Magic-link & social auth",
  "Transactional email templates",
  "Lifetime updates",
  "Private maker community",
]

const tweets = [
  {
    name: "Lena Okafor",
    handle: "@lenabuilds",
    avatar: "https://i.pravatar.cc/120?img=47",
    body: "Shipped my side project in a weekend with this. The billing setup alone saved me three days of Stripe docs.",
  },
  {
    name: "Marcus Reid",
    handle: "@marcusreid",
    avatar: "https://i.pravatar.cc/120?img=12",
    body: "Finally a launch kit that feels made by someone who actually ships. The build-in-public widgets are chef's kiss.",
  },
  {
    name: "Priya Nair",
    handle: "@priyancodes",
    avatar: "https://i.pravatar.cc/120?img=32",
    body: "Went from idea to first paying customer in 9 days. The launch checklist kept me honest the whole way.",
  },
]

export default function IndieMakerLanding() {
  const [email, setEmail] = React.useState("")
  const [joined, setJoined] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </span>
            shipfast.kit
          </a>
          <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            <a href="#story" className="transition-colors hover:text-foreground">My story</a>
            <a href="#love" className="transition-colors hover:text-foreground">Love</a>
          </div>
          <Button size="sm" className="gap-1.5" asChild>
            <a href="#pricing">
              Grab it <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Made by one human, for many
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Stop configuring.
              <span className="block text-primary">Start shipping.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              The launch kit I wish I had on my first ten failed projects. Now I ship in
              weekends and tell you exactly how it&apos;s going.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="#pricing">
                  <Rocket className="h-4 w-4" /> Get the kit
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href="#story">
                  <Coffee className="h-4 w-4" /> Read my story
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[47, 12, 32, 5].map((id) => (
                  <Avatar key={id} className="h-7 w-7 border-2 border-background">
                    <AvatarImage src={`https://i.pravatar.cc/80?img=${id}`} alt="" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              Joined by 2,910 makers
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="flex items-center gap-3 p-4">
                <Avatar className="h-11 w-11">
                  <AvatarImage src="https://i.pravatar.cc/120?img=68" alt="" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">Jamie Sol</p>
                  <p className="truncate text-xs text-muted-foreground">
                    solo maker, currently shipping from a tiny desk
                  </p>
                </div>
                <Badge variant="outline" className="ml-auto gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> live
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Build-in-public stat band */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-px px-5 py-2 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-2 py-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight tabular-nums">{s.value}</p>
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto w-full max-w-6xl px-5 py-20">
          <div className="mb-12 max-w-xl">
            <Badge variant="outline" className="mb-3">Everything in the box</Badge>
            <h2 className="text-3xl font-bold tracking-tight">No fluff. Just the parts that matter.</h2>
            <p className="mt-3 text-muted-foreground">
              I cut everything I never used in real launches and kept what got me to revenue.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <Card key={f.title} className="transition-colors hover:border-primary/40">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-3">Honest pricing</Badge>
              <h2 className="text-3xl font-bold tracking-tight">One price. Yours forever.</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                I hate subscriptions for tools I&apos;ll use once a quarter, so I priced this the
                way I&apos;d want to buy it. Pay once, ship forever.
              </p>
              <ul className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="border-primary">
              <CardContent className="p-7">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Lifetime kit</p>
                  <Badge className="gap-1">
                    <Sparkles className="h-3 w-3" /> Launch deal
                  </Badge>
                </div>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight">$79</span>
                  <span className="mb-1 text-sm text-muted-foreground line-through">$149</span>
                  <span className="mb-1 text-sm text-muted-foreground">one time</span>
                </div>
                <Separator className="my-6" />
                <ul className="space-y-2.5 text-sm">
                  {["Full TypeScript source", "Every future update", "Discord with the makers", "Email me directly"].map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-7 w-full gap-2">
                  <Rocket className="h-4 w-4" /> Buy & start shipping
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  7-day no-questions refund. Try it on a real project.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Maker's story */}
        <section id="story" className="mx-auto w-full max-w-3xl px-5 py-20">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://i.pravatar.cc/160?img=68" alt="" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Badge variant="outline" className="mt-4">The honest part</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Hey, I&apos;m Jamie.</h2>
          </div>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              I spent four years building products nobody wanted, mostly because I kept
              rebuilding the same boring plumbing. Auth. Billing. Emails. Over and over.
            </p>
            <p>
              So I extracted the bits that finally worked into one kit. The first project I
              shipped with it crossed{" "}
              <span className="font-semibold text-foreground">$1k MRR in three weeks</span> — the
              fastest I&apos;d ever moved.
            </p>
            <p>
              Now I share every number out loud and put the same toolkit in your hands. If it
              helps you ship even one thing you&apos;re proud of, it did its job.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Twitter className="h-4 w-4" /> Follow the build
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Github className="h-4 w-4" /> See the code
            </Button>
          </div>
        </section>

        {/* Social proof tweets */}
        <section id="love" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-3">Real makers, real tweets</Badge>
              <h2 className="text-3xl font-bold tracking-tight">People are shipping with it</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {tweets.map((t) => (
                <Card key={t.handle} className="flex flex-col">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <Quote className="h-6 w-6 text-primary/40" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed">{t.body}</p>
                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={t.avatar} alt="" />
                        <AvatarFallback>{t.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{t.handle}</p>
                      </div>
                      <Twitter className="ml-auto h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Buy / try CTA */}
        <section className="mx-auto w-full max-w-6xl px-5 py-20">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-14 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Your next launch starts today</h2>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Grab the kit, or drop your email and I&apos;ll send a free chapter of my launch
                  playbook first. No spam, just shipping.
                </p>
              </div>
              {joined ? (
                <p className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Check className="h-4 w-4" /> You&apos;re in. Check your inbox for the playbook.
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (email.trim()) setJoined(true)
                  }}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <Input
                    type="email"
                    required
                    placeholder="you@maker.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background"
                    aria-label="Email address"
                  />
                  <Button type="submit" className="gap-2">
                    Send it <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
              <Button variant="link" className="gap-1.5" asChild>
                <a href="#pricing">
                  Or buy the full kit now <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" />
            </span>
            shipfast.kit — built in public by Jamie
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-foreground" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="transition-colors hover:text-foreground" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
            <span className={cn("flex items-center gap-1.5")}>
              <Heart className="h-3.5 w-3.5 text-primary" /> Made for makers
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
