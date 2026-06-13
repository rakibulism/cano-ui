"use client"

import * as React from "react"
import {
  ArrowBigUp,
  MessageCircle,
  Share2,
  Rocket,
  Trophy,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe,
  Check,
  ChevronRight,
  Star,
  Twitter,
  Bookmark,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const PRODUCT = {
  name: "Driftboard",
  tagline: "The async whiteboard that thinks with your team",
  rank: 1,
  category: "Productivity",
  baseUpvotes: 1284,
}

const GALLERY = [
  { label: "Live canvas", tone: "bg-primary/10" },
  { label: "Smart frames", tone: "bg-accent" },
  { label: "Comment threads", tone: "bg-secondary" },
  { label: "Export deck", tone: "bg-muted" },
]

const FEATURES = [
  {
    icon: Zap,
    title: "Instant sync",
    body: "Every stroke and sticky shows up for the whole room in under 40ms.",
  },
  {
    icon: Sparkles,
    title: "AI cleanup",
    body: "Turn a messy brainstorm into a tidy flowchart with one shortcut.",
  },
  {
    icon: ShieldCheck,
    title: "SOC 2 ready",
    body: "Granular permissions, audit logs, and SSO baked in from day one.",
  },
  {
    icon: Globe,
    title: "Works offline",
    body: "Sketch on the plane, sync the moment you land. No data lost.",
  },
]

const HIGHLIGHTS = [
  "Unlimited boards on the free plan",
  "Figma, Linear & Notion embeds",
  "Real-time cursors with voice",
  "One-click handoff to engineering",
]

const COMMENTS = [
  {
    name: "Priya Nair",
    handle: "@priyabuilds",
    avatar: "https://i.pravatar.cc/120?img=47",
    badge: "Maker",
    time: "3h ago",
    upvotes: 96,
    body: "Hey hunters! We built Driftboard after two years of fighting laggy whiteboards in remote standups. Today we are finally live. Ask us anything in the comments, we are here all day.",
    maker: true,
  },
  {
    name: "Marcus Bell",
    handle: "@marcusux",
    avatar: "https://i.pravatar.cc/120?img=12",
    badge: "Top Hunter",
    time: "2h ago",
    upvotes: 54,
    body: "Been in the beta for a month. The AI cleanup feature alone replaced an hour of my weekly diagramming. Congrats on the launch team!",
    maker: false,
  },
  {
    name: "Lena Fischer",
    handle: "@lenacodes",
    avatar: "https://i.pravatar.cc/120?img=32",
    badge: "Verified",
    time: "1h ago",
    upvotes: 38,
    body: "The offline mode is genuinely magic. Sketched a whole roadmap on a flight and it synced perfectly. Insta-upvote from me.",
    maker: false,
  },
]

const STATS = [
  { value: "12k+", label: "Beta sketchers" },
  { value: "4.9", label: "Avg rating" },
  { value: "#1", label: "Product of the day" },
]

export default function LaunchDay() {
  const [upvoted, setUpvoted] = React.useState(false)
  const [bookmarked, setBookmarked] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)
  const [votes, setVotes] = React.useState<Record<string, boolean>>({})

  const count = PRODUCT.baseUpvotes + (upvoted ? 1 : 0)

  const toggleComment = (handle: string) =>
    setVotes((prev) => ({ ...prev, [handle]: !prev[handle] }))

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight">LaunchList</span>
          </div>
          <nav className="ml-6 hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <a href="#today" className="hover:text-foreground">Today</a>
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#reviews" className="hover:text-foreground">Reviews</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button size="sm">
              <Rocket className="h-4 w-4" />
              Submit a product
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="today" className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:py-16">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="gap-1">
                  <Trophy className="h-3.5 w-3.5" />
                  #{PRODUCT.rank} Product of the Day
                </Badge>
                <Badge variant="secondary">{PRODUCT.category}</Badge>
                <span className="text-xs text-muted-foreground">Launching today</span>
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                {PRODUCT.name}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-muted-foreground">
                {PRODUCT.tagline}. A faster, calmer canvas your whole team will
                actually want to open.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  variant={upvoted ? "default" : "outline"}
                  onClick={() => setUpvoted((v) => !v)}
                  aria-pressed={upvoted}
                  className={cn(
                    "h-14 gap-3 px-6 text-base",
                    upvoted && "border-primary"
                  )}
                >
                  <ArrowBigUp
                    className={cn("h-6 w-6", upvoted && "fill-primary-foreground")}
                  />
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-lg font-bold tabular-nums">{count}</span>
                    <span className="text-[11px] font-normal opacity-80">
                      {upvoted ? "Upvoted" : "Upvote"}
                    </span>
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-14 gap-2"
                  onClick={() => setBookmarked((b) => !b)}
                  aria-pressed={bookmarked}
                >
                  <Bookmark
                    className={cn("h-5 w-5", bookmarked && "fill-current")}
                  />
                  {bookmarked ? "Saved" : "Save"}
                </Button>
                <Button size="lg" variant="ghost" className="h-14 gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="rounded-lg border bg-card p-4">
                    <div className="text-2xl font-bold tabular-nums">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="relative flex aspect-video items-center justify-center bg-primary/10">
                <Button
                  size="icon"
                  className="h-14 w-14 rounded-full"
                  aria-label="Play product demo"
                >
                  <Play className="h-6 w-6 fill-current" />
                </Button>
                <span className="absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur">
                  Watch 90s demo
                </span>
              </div>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.pravatar.cc/120?img=47" alt="" />
                    <AvatarFallback>PN</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">Built by Priya & 3 makers</p>
                    <p className="truncate text-xs text-muted-foreground">
                      Remote-first, 100% bootstrapped
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant="outline" className="w-full gap-2">
                  Visit website
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Product gallery</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A peek at the canvas, frames, and handoff flow.
              </p>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex">
              4 screenshots
            </Badge>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY.map((g) => (
              <div
                key={g.label}
                className={cn(
                  "group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl border",
                  g.tone
                )}
              >
                <span className="m-3 rounded-md bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur">
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <div className="max-w-2xl">
              <Badge variant="secondary">Why teams switch</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Everything a fast-moving team needs
              </h2>
              <p className="mt-2 text-muted-foreground">
                No more frozen canvases or lost ideas. Driftboard keeps up with the
                way you actually think.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <Card key={f.title} className="h-full">
                  <CardContent className="p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {h}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">What people say</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {COMMENTS.length} comments from the launch thread
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
              <span className="ml-1 font-medium text-foreground">4.9</span>
              <span>/ 5</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {COMMENTS.map((c) => {
              const liked = !!votes[c.handle]
              return (
                <Card
                  key={c.handle}
                  className={cn(c.maker && "border-primary/40 bg-primary/5")}
                >
                  <CardContent className="flex gap-4 p-5">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage src={c.avatar} alt="" />
                      <AvatarFallback>
                        {c.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold">{c.name}</span>
                        <Badge
                          variant={c.maker ? "default" : "outline"}
                          className="h-5 px-1.5 text-[11px]"
                        >
                          {c.badge}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {c.handle} · {c.time}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {c.body}
                      </p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <button
                          type="button"
                          onClick={() => toggleComment(c.handle)}
                          aria-pressed={liked}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-md px-1.5 py-1 hover:bg-accent",
                            liked && "text-primary"
                          )}
                        >
                          <ArrowBigUp
                            className={cn("h-4 w-4", liked && "fill-primary")}
                          />
                          <span className="tabular-nums">
                            {c.upvotes + (liked ? 1 : 0)}
                          </span>
                        </button>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          Reply
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              Help us hit #1 today
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Drop your email for early access perks, or jump in and upvote. Either
              way, the makers will love you.
            </p>

            {subscribed ? (
              <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                You are on the list. Welcome aboard!
              </div>
            ) : (
              <form
                className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSubscribed(true)
                }}
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="h-11"
                />
                <Button type="submit" size="lg" className="shrink-0">
                  Get early access
                </Button>
              </form>
            )}

            <div className="mt-6 flex items-center justify-center gap-3">
              <Button variant="outline" className="gap-2">
                <Twitter className="h-4 w-4" />
                Share the launch
              </Button>
              <Button
                variant={upvoted ? "default" : "secondary"}
                className="gap-2"
                onClick={() => setUpvoted((v) => !v)}
                aria-pressed={upvoted}
              >
                <ArrowBigUp className={cn("h-4 w-4", upvoted && "fill-current")} />
                {upvoted ? "Upvoted" : "Upvote now"}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold">LaunchList</span>
            <span className="text-sm text-muted-foreground">
              · where products go live
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 LaunchList. Built by makers, for makers.
          </p>
        </div>
      </footer>
    </div>
  )
}
