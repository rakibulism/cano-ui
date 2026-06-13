"use client"
import * as React from "react"
import { ArrowUpRight, Search, Menu, Sparkles, Clock, Bookmark, Twitter, Github, Dribbble, Linkedin, Mail, PenTool } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

type Topic = "All" | "UI" | "UX" | "Type" | "Color" | "Tools"

const TOPICS: Topic[] = ["All", "UI", "UX", "Type", "Color", "Tools"]

type Post = {
  id: number
  title: string
  excerpt: string
  topic: Exclude<Topic, "All">
  author: string
  initials: string
  avatar: string
  readTime: string
  date: string
}

const POSTS: Post[] = [
  { id: 1, title: "Designing tactile buttons that beg to be pressed", excerpt: "Shadows, motion, and the quiet physics behind a satisfying tap.", topic: "UI", author: "Mara Vesper", initials: "MV", avatar: "https://i.pravatar.cc/120?img=47", readTime: "6 min", date: "May 28" },
  { id: 2, title: "The empty state is your first impression", excerpt: "How thoughtful zero-data screens turn confusion into momentum.", topic: "UX", author: "Idris Hale", initials: "IH", avatar: "https://i.pravatar.cc/120?img=12", readTime: "9 min", date: "May 24" },
  { id: 3, title: "Optical sizing: when type betrays the grid", excerpt: "Why your headings feel heavy and the math that fixes them.", topic: "Type", author: "Noor Bell", initials: "NB", avatar: "https://i.pravatar.cc/120?img=32", readTime: "7 min", date: "May 21" },
  { id: 4, title: "Building a palette that survives dark mode", excerpt: "Tokens, contrast ratios, and the colors you should never hard-code.", topic: "Color", author: "Theo Ramos", initials: "TR", avatar: "https://i.pravatar.cc/120?img=15", readTime: "11 min", date: "May 18" },
  { id: 5, title: "Five Figma habits that scaled our design system", excerpt: "Variables, components, and the rituals that kept 40 designers in sync.", topic: "Tools", author: "Lina Cho", initials: "LC", avatar: "https://i.pravatar.cc/120?img=44", readTime: "8 min", date: "May 14" },
  { id: 6, title: "Micro-interactions that don't feel gimmicky", excerpt: "A field guide to motion that earns its keep on every screen.", topic: "UI", author: "Mara Vesper", initials: "MV", avatar: "https://i.pravatar.cc/120?img=47", readTime: "5 min", date: "May 11" },
  { id: 7, title: "Research debt is real debt", excerpt: "What happens to a product when nobody talks to the users anymore.", topic: "UX", author: "Idris Hale", initials: "IH", avatar: "https://i.pravatar.cc/120?img=12", readTime: "10 min", date: "May 07" },
  { id: 8, title: "Variable fonts, finally explained simply", excerpt: "One file, infinite weights, and a few performance gotchas.", topic: "Type", author: "Noor Bell", initials: "NB", avatar: "https://i.pravatar.cc/120?img=32", readTime: "6 min", date: "May 03" },
  { id: 9, title: "The 60-30-10 rule is a starting line, not a law", excerpt: "Breaking the classic color ratio without breaking the page.", topic: "Color", author: "Theo Ramos", initials: "TR", avatar: "https://i.pravatar.cc/120?img=15", readTime: "7 min", date: "Apr 29" },
]

const FEATURED = {
  topic: "UI" as const,
  title: "The new craft: designing for taste in an age of templates",
  excerpt: "When every team ships from the same component kit, the differentiator is judgment. We dug into how the best product teams keep their work feeling human, opinionated, and unmistakably theirs.",
  author: "Mara Vesper",
  initials: "MV",
  avatar: "https://i.pravatar.cc/120?img=47",
  readTime: "14 min read",
  date: "June 02, 2026",
}

const AUTHORS = [
  { name: "Mara Vesper", role: "UI & Motion", avatar: "https://i.pravatar.cc/120?img=47", posts: 38 },
  { name: "Idris Hale", role: "UX Research", avatar: "https://i.pravatar.cc/120?img=12", posts: 27 },
  { name: "Noor Bell", role: "Typography", avatar: "https://i.pravatar.cc/120?img=32", posts: 19 },
  { name: "Theo Ramos", role: "Color & Systems", avatar: "https://i.pravatar.cc/120?img=15", posts: 22 },
]

const TOPIC_COUNTS: Record<Topic, number> = {
  All: POSTS.length,
  UI: POSTS.filter((p) => p.topic === "UI").length,
  UX: POSTS.filter((p) => p.topic === "UX").length,
  Type: POSTS.filter((p) => p.topic === "Type").length,
  Color: POSTS.filter((p) => p.topic === "Color").length,
  Tools: POSTS.filter((p) => p.topic === "Tools").length,
}

export default function DesignBlog() {
  const [activeTopic, setActiveTopic] = React.useState<Topic>("All")
  const [subscribed, setSubscribed] = React.useState(false)

  const visiblePosts = React.useMemo(
    () => (activeTopic === "All" ? POSTS : POSTS.filter((p) => p.topic === activeTopic)),
    [activeTopic]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <PenTool className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Kerned</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#" className="font-medium text-foreground">Latest</a>
            <a href="#" className="transition-colors hover:text-foreground">Topics</a>
            <a href="#" className="transition-colors hover:text-foreground">Authors</a>
            <a href="#" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search articles" className="hidden sm:inline-flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">Subscribe</Button>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Featured hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-14 md:py-20">
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Featured this week
            </div>
            <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <Badge variant="secondary" className="mb-4">{FEATURED.topic}</Badge>
                <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  {FEATURED.title}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  {FEATURED.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button size="lg" className="group">
                    Read the essay
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                  <Button size="lg" variant="outline" aria-label="Save for later">
                    <Bookmark className="mr-1 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border bg-card p-5">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={FEATURED.avatar} alt="" />
                  <AvatarFallback>{FEATURED.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-semibold">{FEATURED.author}</p>
                  <p className="text-sm text-muted-foreground">{FEATURED.date}</p>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {FEATURED.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body: posts + sidebar */}
        <section className="mx-auto w-full max-w-6xl px-6 py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            {/* Posts column */}
            <div>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Latest writing</h2>
                <span className="text-sm text-muted-foreground">{visiblePosts.length} articles</span>
              </div>

              {/* Topic filter chips */}
              <div className="mb-10 flex flex-wrap gap-2">
                {TOPICS.map((topic) => {
                  const active = activeTopic === topic
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setActiveTopic(topic)}
                      aria-pressed={active}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {topic}
                      <span className={cn("text-xs", active ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                        {TOPIC_COUNTS[topic]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {visiblePosts.length === 0 ? (
                <div className="rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                  No articles in this topic yet.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {visiblePosts.map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <Badge variant="outline">{post.topic}</Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                        <a href="#" className="after:absolute">{post.title}</a>
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                      <Separator className="my-4" />
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={post.avatar} alt="" />
                          <AvatarFallback>{post.initials}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium leading-none">{post.author}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border bg-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Featured authors</h3>
                <ul className="mt-5 space-y-5">
                  {AUTHORS.map((a) => (
                    <li key={a.name} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={a.avatar} alt="" />
                        <AvatarFallback>{a.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{a.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{a.role}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{a.posts}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="mt-6 w-full">View all authors</Button>
              </div>

              {/* Newsletter */}
              <div className="rounded-xl border bg-primary/10 p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight">The Kerned Letter</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  One sharp design read in your inbox every Tuesday. No fluff.
                </p>
                {subscribed ? (
                  <p className="mt-4 rounded-md border bg-background px-3 py-2 text-sm font-medium text-primary">
                    You're in. Check your inbox.
                  </p>
                ) : (
                  <form
                    className="mt-4 space-y-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubscribed(true)
                    }}
                  >
                    <Input type="email" required placeholder="you@studio.com" aria-label="Email address" />
                    <Button type="submit" className="w-full">Subscribe free</Button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* Full-width newsletter band */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Join 24,000 designers reading Kerned every week
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Essays on craft, type, color, and the tools that make great work possible.
            </p>
            <form
              className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                setSubscribed(true)
              }}
            >
              <Input type="email" required placeholder="Enter your email" aria-label="Email address" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <a href="#" className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <PenTool className="h-4 w-4" />
                </span>
                <span className="font-semibold tracking-tight">Kerned</span>
              </a>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                A publication about design craft, made by people who sweat the details.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Topics</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">UI Design</a></li>
                <li><a href="#" className="hover:text-foreground">UX Research</a></li>
                <li><a href="#" className="hover:text-foreground">Typography</a></li>
                <li><a href="#" className="hover:text-foreground">Color</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Write for us</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">RSS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Follow</h4>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="icon" aria-label="Twitter"><Twitter className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" aria-label="Dribbble"><Dribbble className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" aria-label="GitHub"><Github className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 Kerned. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
