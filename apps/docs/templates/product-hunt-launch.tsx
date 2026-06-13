"use client"
import * as React from "react"
import { ArrowBigUp, MessageCircle, Share2, Bookmark, ExternalLink, Sparkles, Zap, ShieldCheck, Gauge, Trophy, Github, Twitter, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const gallery = [
  { id: 1, label: "Dashboard overview", tone: "bg-primary/10" },
  { id: 2, label: "Workflow board", tone: "bg-accent" },
  { id: 3, label: "Mobile companion", tone: "bg-secondary" },
  { id: 4, label: "Insights report", tone: "bg-muted" },
]

const features = [
  { icon: Zap, title: "Instant setup", body: "Connect your stack and ship your first automation in under five minutes." },
  { icon: ShieldCheck, title: "SOC 2 ready", body: "Enterprise-grade encryption with audit logs baked in from day one." },
  { icon: Gauge, title: "Realtime sync", body: "Sub-second updates across every device, no refresh required." },
  { icon: Sparkles, title: "AI copilot", body: "Draft, summarize, and triage with a model tuned to your workspace." },
]

const ranking = [
  { rank: 1, name: "FlowForge", votes: 1284, you: false },
  { rank: 2, name: "Pulse Analytics", votes: 1102, you: false },
  { rank: 3, name: "Beacon", votes: 947, you: true },
  { rank: 4, name: "Tally Notes", votes: 803, you: false },
  { rank: 5, name: "Hatch CRM", votes: 612, you: false },
]

const comments = [
  { name: "Maya Okafor", handle: "@mayabuilds", role: "Maker", avatar: "https://i.pravatar.cc/80?img=47", body: "Hey hunters! Maya here, founder of Beacon. We built this after burning out on tool-switching. Ask me anything today!", time: "6h ago", maker: true, votes: 84 },
  { name: "Dev Sharma", handle: "@devships", role: "Hunter", avatar: "https://i.pravatar.cc/80?img=12", body: "Been in the beta for two weeks. The realtime sync genuinely changed how my team standups run. Congrats on the launch!", time: "4h ago", maker: false, votes: 31 },
  { name: "Lena Park", handle: "@lenacodes", role: "Hunter", avatar: "https://i.pravatar.cc/80?img=32", body: "The AI copilot triaging my inbox is wild. Is there a roadmap for Slack threads support?", time: "2h ago", maker: false, votes: 18 },
]

export default function ProductHuntLaunchPage() {
  const [votes, setVotes] = React.useState(947)
  const [voted, setVoted] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [activeShot, setActiveShot] = React.useState(1)

  const toggleVote = () => {
    setVoted((prev) => {
      setVotes((v) => (prev ? v - 1 : v + 1))
      return !prev
    })
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Trophy className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">LaunchDay</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#product" className="transition-colors hover:text-foreground">Product</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#discussion" className="transition-colors hover:text-foreground">Discussion</a>
            <a href="#ranking" className="transition-colors hover:text-foreground">Ranking</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm" onClick={toggleVote} className="gap-1.5">
              <ArrowBigUp className={cn("h-4 w-4", voted && "fill-current")} />
              {votes.toLocaleString()}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="product" className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1fr_320px] lg:py-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Beacon</h1>
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="h-3 w-3" /> #3 of the day
                    </Badge>
                  </div>
                  <p className="max-w-xl text-lg text-muted-foreground">
                    The all-in-one workspace that replaces five tabs with one calm, AI-native command center for small teams.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  variant={voted ? "default" : "outline"}
                  onClick={toggleVote}
                  className="h-auto flex-col gap-0 px-6 py-3"
                  aria-pressed={voted}
                  aria-label="Upvote Beacon"
                >
                  <ArrowBigUp className={cn("h-6 w-6", voted && "fill-current")} />
                  <span className="text-lg font-bold leading-none">{votes.toLocaleString()}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
                    {voted ? "Upvoted" : "Upvote"}
                  </span>
                </Button>
                <Button size="lg" className="gap-2">
                  Visit Beacon <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => setSaved((s) => !s)}
                  aria-pressed={saved}
                  className="gap-2"
                >
                  <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button size="icon" variant="ghost" aria-label="Share Beacon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Productivity", "AI", "SaaS", "Teams"].map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <Card className="self-start">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Launching today</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="" />
                    <AvatarFallback>MO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Maya Okafor</p>
                    <p className="text-xs text-muted-foreground">Maker, hunting live</p>
                  </div>
                </div>
                <Separator />
                <dl className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <dt className="text-xs text-muted-foreground">Upvotes</dt>
                    <dd className="text-lg font-semibold tabular-nums">{votes.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Comments</dt>
                    <dd className="text-lg font-semibold tabular-nums">{comments.length}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Rank</dt>
                    <dd className="text-lg font-semibold tabular-nums">#3</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-10">
            <div className="aspect-[16/8] overflow-hidden rounded-2xl border">
              <div className={cn("flex h-full w-full items-center justify-center text-muted-foreground transition-colors", gallery.find((g) => g.id === activeShot)?.tone)}>
                <span className="text-sm font-medium">{gallery.find((g) => g.id === activeShot)?.label}</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((shot) => (
                <button
                  key={shot.id}
                  onClick={() => setActiveShot(shot.id)}
                  aria-label={"Show " + shot.label}
                  className={cn(
                    "aspect-video overflow-hidden rounded-lg border text-xs text-muted-foreground transition-all",
                    shot.tone,
                    activeShot === shot.id ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <span className="sr-only">{shot.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14">
            <div className="mb-8 max-w-2xl">
              <Badge variant="secondary" className="mb-3">Why makers love it</Badge>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Everything in one calm surface</h2>
              <p className="mt-2 text-muted-foreground">Beacon strips away the busywork so your team spends its day shipping, not switching tabs.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <Card key={f.title} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{f.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_320px]">
          <div id="discussion">
            <div className="mb-6 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold tracking-tight">Discussion</h2>
              <Badge variant="outline" className="ml-1">{comments.length}</Badge>
            </div>

            <div className="mb-6 flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 gap-2">
                <Input placeholder="Add a thoughtful comment..." aria-label="Add a comment" />
                <Button size="icon" aria-label="Post comment">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ul className="space-y-5">
              {comments.map((c) => (
                <li key={c.handle} className={cn("rounded-xl border p-4", c.maker && "border-primary/40 bg-primary/5")}>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={c.avatar} alt="" />
                      <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.handle}</span>
                        {c.maker && <Badge className="gap-1"><Sparkles className="h-3 w-3" /> Maker</Badge>}
                        <span className="ml-auto text-xs text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/90">{c.body}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <button className="flex items-center gap-1 transition-colors hover:text-foreground" aria-label={"Upvote comment by " + c.name}>
                          <ArrowBigUp className="h-3.5 w-3.5" /> {c.votes}
                        </button>
                        <button className="transition-colors hover:text-foreground">Reply</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside id="ranking" className="space-y-6 lg:sticky lg:top-20 lg:self-start">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Trophy className="h-4 w-4 text-primary" /> Today&apos;s ranking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {ranking.map((p) => (
                  <div
                    key={p.rank}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-2 py-2 text-sm",
                      p.you ? "bg-primary/10" : "hover:bg-muted"
                    )}
                  >
                    <span className={cn("w-5 text-center font-semibold tabular-nums", p.you ? "text-primary" : "text-muted-foreground")}>
                      {p.rank}
                    </span>
                    <span className="flex-1 truncate font-medium">
                      {p.name}
                      {p.you && <span className="ml-1 text-xs font-normal text-primary">(this)</span>}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground tabular-nums">
                      <ArrowBigUp className="h-3 w-3" /> {p.you ? votes.toLocaleString() : p.votes.toLocaleString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Help us hit #1</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm opacity-90">Your upvote pushes Beacon up the leaderboard before the day closes.</p>
                <Button
                  variant="secondary"
                  className="w-full gap-2"
                  onClick={toggleVote}
                  aria-pressed={voted}
                >
                  <ArrowBigUp className={cn("h-4 w-4", voted && "fill-current")} />
                  {voted ? "Upvoted - thank you!" : "Upvote Beacon"}
                </Button>
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 text-center">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Try Beacon free while we&apos;re live
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Launch-day special: 3 months of Pro on us for the first 500 sign-ups. No credit card required.
            </p>
            <form className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="you@studio.com" aria-label="Email address" className="bg-background" />
              <Button type="submit" className="gap-2">Claim offer <ExternalLink className="h-4 w-4" /></Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="h-4 w-4" />
            <span>Hunted on LaunchDay - 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Beacon on GitHub">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Beacon on Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
