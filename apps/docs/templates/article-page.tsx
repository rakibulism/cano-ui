"use client"
import * as React from "react"
import { Menu, Search, Twitter, Linkedin, Link2, Bookmark, Heart, Share2, Clock, Calendar, ArrowRight, ArrowUpRight, CheckCircle2, Rss } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = ["Articles", "Topics", "Newsletter", "About"]

const TAGS = ["Engineering", "Design Systems", "8 min read"]

const TOC = [
  { id: "intro", label: "The problem with one-off components" },
  { id: "tokens", label: "Designing with tokens" },
  { id: "process", label: "A repeatable process" },
  { id: "closing", label: "Where to go from here" },
]

const RELATED = [
  {
    tag: "Engineering",
    title: "Theming at scale: light, dark, and everything between",
    excerpt: "How a single token layer lets you ship three themes without forking a single component.",
    read: "6 min read",
  },
  {
    tag: "Design Systems",
    title: "Naming things: a field guide to component APIs",
    excerpt: "Props are a public contract. Here is how we keep ours predictable across forty components.",
    read: "9 min read",
  },
  {
    tag: "Process",
    title: "From Figma to production in one afternoon",
    excerpt: "A look at the handoff rituals that cut our design-to-ship time roughly in half.",
    read: "5 min read",
  },
]

const POPULAR = [
  "The case against utility soup",
  "We deleted 12,000 lines of CSS",
  "Accessibility is a feature, not a phase",
]

export default function ArticlePage() {
  const [bookmarked, setBookmarked] = React.useState(false)
  const [liked, setLiked] = React.useState(false)
  const [likes, setLikes] = React.useState(214)
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const toggleLike = () => {
    setLiked((v) => {
      setLikes((n) => (v ? n - 1 : n + 1))
      return !v
    })
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Rss className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>Overflow</span>
          </a>
          <nav className="ml-6 hidden items-center gap-6 md:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a key={l} href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {l}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">Subscribe</Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Article header */}
        <div className="mx-auto w-full max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
          <div className="flex flex-wrap items-center gap-2">
            {TAGS.map((t, i) => (
              <Badge key={t} variant={i === 0 ? "default" : "secondary"}>
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.1]">
            Building a design system that survives its own success
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Most component libraries collapse under the weight of exceptions. Here is the small set of
            principles that kept ours coherent as the team — and the product — tripled in size.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage src="" alt="" />
                <AvatarFallback>MA</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-foreground">Mara Albescu</p>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> March 4, 2026
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> 8 min read
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={liked ? "secondary" : "outline"}
                size="sm"
                onClick={toggleLike}
                aria-pressed={liked}
                aria-label="Like article"
              >
                <Heart className={cn("h-4 w-4", liked && "fill-current text-primary")} />
                {likes}
              </Button>
              <Button
                variant={bookmarked ? "secondary" : "outline"}
                size="icon"
                onClick={() => setBookmarked((v) => !v)}
                aria-pressed={bookmarked}
                aria-label="Bookmark article"
              >
                <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current text-primary")} />
              </Button>
              <Button variant="outline" size="icon" aria-label="Share article">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cover image */}
        <div className="mx-auto mt-10 w-full max-w-4xl px-4 sm:px-6">
          <div className="aspect-[16/8] w-full overflow-hidden rounded-2xl border bg-muted">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-accent">
              <span className="text-sm text-muted-foreground">Cover illustration</span>
            </div>
          </div>
        </div>

        {/* Body + sidebar */}
        <div className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-12 px-4 pb-4 sm:px-6 lg:grid-cols-[1fr_220px]">
          <article className="min-w-0 max-w-2xl text-[15px] leading-7 text-foreground/90">
            <h2 id="intro" className="scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground">
              The problem with one-off components
            </h2>
            <p className="mt-4">
              Every team starts with good intentions. A button here, a card there, a modal someone copied from
              another page on a Friday afternoon. Six months later you have eleven buttons that all look almost
              the same, and nobody can tell you which one is canonical.
            </p>
            <p className="mt-4">
              The fix is not more components. It is a smaller, sharper set of decisions that everything else
              inherits. When the foundations are right, the components practically write themselves.
            </p>

            <blockquote className="my-8 border-l-2 border-primary bg-muted/30 py-3 pl-5 pr-4 text-lg italic text-foreground">
              “A design system is not a library of components. It is a set of agreements about how decisions get
              made.”
            </blockquote>

            <h2 id="tokens" className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground">
              Designing with tokens
            </h2>
            <p className="mt-4">
              Tokens are the vocabulary. Instead of hardcoding a color, you reference a role:{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                background
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                foreground
              </code>
              ,{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                primary
              </code>
              . The theme decides what those resolve to.
            </p>
            <p className="mt-4">A healthy token layer tends to cover three things:</p>
            <ul className="mt-4 space-y-2">
              {[
                "Color roles that map to intent, never to a literal hue",
                "A spacing scale so layouts breathe consistently",
                "Radii and elevation that signal hierarchy at a glance",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4">
              Apply a single token swap and the whole product follows. That is what makes light and dark mode a
              configuration detail rather than a rewrite.
            </p>

            <h2 id="process" className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground">
              A repeatable process
            </h2>
            <p className="mt-4">
              Treat every new pattern as a proposal. It earns a place in the system once it has shipped twice and
              survived a review. Anything used once stays in the product, not the library — that single rule keeps
              the surface area honest.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 marker:text-muted-foreground">
              <li>Sketch it in the product, against real content.</li>
              <li>Find the second use case before promoting it.</li>
              <li>Document the props, the states, and the do-nots.</li>
            </ol>

            <h2 id="closing" className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground">
              Where to go from here
            </h2>
            <p className="mt-4">
              Start small. Pick the five components you reach for daily, give them a shared token foundation, and
              resist the urge to systematize everything at once. The system that survives is the one that stays
              boring on purpose.
            </p>

            <Separator className="my-10" />

            {/* Author card */}
            <Card className="bg-muted/30">
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-start">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Written by
                  </p>
                  <h3 className="mt-0.5 text-lg font-semibold text-foreground">Mara Albescu</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Principal design engineer building the systems behind Overflow. Writes about tokens,
                    component APIs, and the unglamorous work of keeping a product coherent.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Button variant="outline" size="icon" aria-label="Author on Twitter">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Author on LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" aria-label="Copy author link">
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <nav aria-label="Table of contents">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  On this page
                </p>
                <ul className="mt-3 space-y-2 border-l">
                  {TOC.map((t) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="-ml-px block border-l border-transparent pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                      >
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Popular now
                </p>
                <ul className="mt-3 space-y-3">
                  {POPULAR.map((p, i) => (
                    <li key={p}>
                      <a href="#" className="flex gap-3 text-sm text-muted-foreground hover:text-foreground">
                        <span className="font-mono text-xs text-primary">0{i + 1}</span>
                        <span>{p}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* Newsletter */}
        <section className="mx-auto mt-12 w-full max-w-5xl px-4 sm:px-6">
          <Card className="overflow-hidden border-primary/20 bg-primary/10">
            <CardContent className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Get the next essay in your inbox
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  One thoughtful piece on design systems and front-end craft, every other week. No spam, ever.
                </p>
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  You are subscribed. Talk soon.
                </div>
              ) : (
                <form
                  className="flex w-full max-w-sm flex-col gap-2 sm:flex-row"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (email.trim()) setSubscribed(true)
                  }}
                >
                  <Input
                    type="email"
                    required
                    placeholder="you@company.com"
                    aria-label="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background"
                  />
                  <Button type="submit">
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Related posts */}
        <section className="mx-auto mt-16 w-full max-w-5xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Keep reading</h2>
            <a href="#" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              All articles <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED.map((post) => (
              <Card key={post.title} className="group flex flex-col transition-colors hover:border-primary/40">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-muted">
                  <div className="h-full w-full bg-gradient-to-br from-primary/10 via-muted to-accent" />
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">{post.tag}</Badge>
                  <CardTitle className="mt-2 text-base leading-snug">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {post.read}
                  </span>
                  <span className="inline-flex items-center gap-1 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Rss className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Overflow
          </div>
          <p>© 2026 Overflow Media. Written by humans.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Twitter" className="hover:text-foreground">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" aria-label="RSS feed" className="hover:text-foreground">
              <Rss className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
