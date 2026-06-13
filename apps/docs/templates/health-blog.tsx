"use client"
import * as React from "react"
import { Leaf, Search, Menu, Heart, Clock, ArrowRight, ShieldCheck, Sparkles, Apple, Dumbbell, Brain, Moon, TrendingUp, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const TOPICS = ["All", "Nutrition", "Fitness", "Mind", "Sleep"] as const
type Topic = (typeof TOPICS)[number]

const TOPIC_ICON: Record<Exclude<Topic, "All">, React.ComponentType<{ className?: string }>> = {
  Nutrition: Apple,
  Fitness: Dumbbell,
  Mind: Brain,
  Sleep: Moon,
}

const ARTICLES: {
  id: number
  title: string
  excerpt: string
  topic: Exclude<Topic, "All">
  read: string
  author: string
  initials: string
  image: string
}[] = [
  {
    id: 1,
    title: "The Anti-Inflammatory Plate: A Simple Daily Framework",
    excerpt: "Build meals that calm your body using whole foods, colorful produce, and the right healthy fats.",
    topic: "Nutrition",
    read: "6 min read",
    author: "Dr. Maya Reyes",
    initials: "MR",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=640&q=70",
  },
  {
    id: 2,
    title: "Strength After 40: Training That Protects Your Joints",
    excerpt: "A gentle progressive plan to build muscle and mobility without burning out your recovery.",
    topic: "Fitness",
    read: "8 min read",
    author: "Jordan Pike",
    initials: "JP",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=70",
  },
  {
    id: 3,
    title: "Five Minutes of Calm: Micro-Meditations for Busy Days",
    excerpt: "Short, science-backed practices you can fold into your morning, commute, or lunch break.",
    topic: "Mind",
    read: "4 min read",
    author: "Dr. Aisha Khan",
    initials: "AK",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=70",
  },
  {
    id: 4,
    title: "Sleep Hygiene That Actually Works (Backed by Research)",
    excerpt: "Light, temperature, and timing tweaks that help you fall asleep faster and wake refreshed.",
    topic: "Sleep",
    read: "7 min read",
    author: "Dr. Leo Marsh",
    initials: "LM",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=640&q=70",
  },
  {
    id: 5,
    title: "Hydration, Decoded: How Much Water Do You Really Need?",
    excerpt: "Cut through the noise on electrolytes, timing, and the myths around the eight-glass rule.",
    topic: "Nutrition",
    read: "5 min read",
    author: "Dr. Maya Reyes",
    initials: "MR",
    image: "https://images.unsplash.com/photo-1502740479091-635887520276?w=640&q=70",
  },
  {
    id: 6,
    title: "The Walking Workout: Underrated Cardio for Every Body",
    excerpt: "Why a brisk daily walk rivals the gym for heart health, mood, and longevity.",
    topic: "Fitness",
    read: "6 min read",
    author: "Jordan Pike",
    initials: "JP",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=640&q=70",
  },
]

const POPULAR = [
  { id: 1, title: "What Your Cravings Are Trying to Tell You", topic: "Nutrition", read: "5 min" },
  { id: 2, title: "Breathwork for Anxious Evenings", topic: "Mind", read: "4 min" },
  { id: 3, title: "Mobility Routine for Desk Workers", topic: "Fitness", read: "9 min" },
  { id: 4, title: "Why You Wake at 3 a.m. (and How to Stop)", topic: "Sleep", read: "6 min" },
]

const REVIEWERS = [
  { name: "Dr. Maya Reyes", role: "Registered Dietitian" },
  { name: "Dr. Leo Marsh", role: "Sleep Medicine, MD" },
  { name: "Dr. Aisha Khan", role: "Clinical Psychologist" },
  { name: "Jordan Pike", role: "Certified Strength Coach" },
]

export default function HealthBlog() {
  const [active, setActive] = React.useState<Topic>("All")

  const filtered = React.useMemo(
    () => (active === "All" ? ARTICLES : ARTICLES.filter((a) => a.topic === active)),
    [active]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-lg">Verdant</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#articles" className="transition-colors hover:text-foreground">Articles</a>
            <a href="#popular" className="transition-colors hover:text-foreground">Popular</a>
            <a href="#experts" className="transition-colors hover:text-foreground">Our Experts</a>
            <a href="#newsletter" className="transition-colors hover:text-foreground">Newsletter</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search articles" className="hidden sm:inline-flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button size="sm" className="rounded-full">Subscribe</Button>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero featured article */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
            <div className="space-y-5">
              <Badge variant="secondary" className="rounded-full">
                <Sparkles className="mr-1 h-3.5 w-3.5" /> Featured this week
              </Badge>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Small habits, calmer days: a gentle guide to whole-body wellness
              </h1>
              <p className="max-w-prose text-base text-muted-foreground sm:text-lg">
                Evidence-based, expert-reviewed advice on eating well, moving more, resting deeply, and
                quieting a busy mind, written for real life.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Button size="lg" className="rounded-full">
                  Read the story <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <span>By Dr. Maya Reyes</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 10 min</span>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&q=70"
                alt=""
                className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
              />
              <Badge className="absolute left-4 top-4 rounded-full">Nutrition</Badge>
            </div>
          </div>
        </section>

        {/* Expert-reviewed badge strip */}
        <section className="border-b bg-primary/5">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-4 text-sm text-muted-foreground sm:px-6">
            <span className="inline-flex items-center gap-2 font-medium text-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" /> Expert-reviewed content
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Fact-checked by clinicians</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>No fad diets, ever</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Updated for 2026</span>
          </div>
        </section>

        {/* Articles + sidebar */}
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:py-16">
          <div className="lg:col-span-2" id="articles">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Latest articles</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filtered.length} {filtered.length === 1 ? "story" : "stories"}
                  {active !== "All" ? ` in ${active}` : ""}
                </p>
              </div>
            </div>

            {/* Topic filter chips */}
            <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter articles by topic">
              {TOPICS.map((topic) => {
                const Icon = topic === "All" ? null : TOPIC_ICON[topic]
                const isActive = active === topic
                return (
                  <button
                    key={topic}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(topic)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    {topic}
                  </button>
                )
              })}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((a) => {
                const Icon = TOPIC_ICON[a.topic]
                return (
                  <Card key={a.id} className="group overflow-hidden pt-0 transition-shadow hover:shadow-md">
                    <div className="relative overflow-hidden">
                      <img
                        src={a.image}
                        alt=""
                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge variant="secondary" className="absolute left-3 top-3 rounded-full backdrop-blur">
                        <Icon className="mr-1 h-3.5 w-3.5" /> {a.topic}
                      </Badge>
                    </div>
                    <CardContent className="space-y-3">
                      <h3 className="text-lg font-semibold leading-snug tracking-tight">
                        <a href="#" className="transition-colors hover:text-primary">{a.title}</a>
                      </h3>
                      <p className="text-sm text-muted-foreground">{a.excerpt}</p>
                      <Separator />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">{a.initials}</AvatarFallback>
                          </Avatar>
                          {a.author}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {a.read}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No articles in this topic yet. Check back soon.
              </p>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <Card id="popular">
              <CardContent className="space-y-1 pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold tracking-tight">Popular posts</h2>
                </div>
                <ol className="divide-y">
                  {POPULAR.map((p, i) => (
                    <li key={p.id}>
                      <a href="#" className="flex items-start gap-3 py-3 transition-colors hover:text-primary">
                        <span className="text-lg font-semibold text-muted-foreground/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="block text-sm font-medium leading-snug">{p.title}</span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {p.topic} · {p.read}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="bg-primary/5">
              <CardContent className="space-y-3 pt-6">
                <Heart className="h-6 w-6 text-primary" />
                <h2 className="text-lg font-semibold tracking-tight">Wellness, weekly</h2>
                <p className="text-sm text-muted-foreground">
                  One thoughtful read every Sunday. No spam, no noise, just calm guidance.
                </p>
                <Input type="email" placeholder="you@example.com" aria-label="Email address" className="bg-background" />
                <Button className="w-full rounded-full">Join 42,000 readers</Button>
              </CardContent>
            </Card>
          </aside>
        </section>

        {/* Expert reviewers */}
        <section id="experts" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">
                <ShieldCheck className="mr-1 h-3.5 w-3.5 text-primary" /> Medically reviewed
              </Badge>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Every article is checked by our review board
              </h2>
              <p className="mt-3 text-muted-foreground">
                Our content is written and reviewed by licensed clinicians and certified professionals.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {REVIEWERS.map((r) => (
                <Card key={r.name} className="text-center">
                  <CardContent className="flex flex-col items-center gap-3 pt-6">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-sm text-muted-foreground">{r.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section id="newsletter" className="border-t">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
              Take the first small step today
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Get our free 7-day reset guide and a weekly digest of expert-reviewed wellness reads,
              delivered straight to your inbox.
            </p>
            <form className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Enter your email" aria-label="Email address" className="flex-1" />
              <Button type="submit" size="lg" className="rounded-full">Get the guide</Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Unsubscribe anytime. We respect your inbox.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Leaf className="h-5 w-5" />
                </span>
                Verdant
              </a>
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Calm, evidence-based wellness for everyday life.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Topics</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Nutrition</a></li>
                <li><a href="#" className="hover:text-foreground">Fitness</a></li>
                <li><a href="#" className="hover:text-foreground">Mind</a></li>
                <li><a href="#" className="hover:text-foreground">Sleep</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Review board</a></li>
                <li><a href="#" className="hover:text-foreground">Editorial policy</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Medical disclaimer</a></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Verdant Wellness. All rights reserved.</p>
            <p>Content is for informational purposes and not medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
