"use client"

import * as React from "react"
import { Feather, ArrowUpRight, Clock, Mail, ArrowRight, BookOpen, Rss } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const TOPICS = ["All", "Tech", "Life", "Work", "Ideas"] as const
type Topic = (typeof TOPICS)[number]

const ESSAYS: { title: string; excerpt: string; date: string; readTime: string; topic: Exclude<Topic, "All">; featured?: boolean }[] = [
  { title: "The quiet work of paying attention", excerpt: "We mistake noticing for a passive act. It is the most demanding thing we do, and the one we practice least.", date: "May 28, 2026", readTime: "9 min", topic: "Ideas", featured: true },
  { title: "Why I deleted my second brain", excerpt: "After three years of dutiful note-taking, I had a beautiful archive of thoughts I never returned to. Here is what I kept instead.", date: "May 14, 2026", readTime: "12 min", topic: "Tech" },
  { title: "On finishing things", excerpt: "The hardest ninety percent of any project is the last ten. A short meditation on shipping, and on letting go of the perfect version.", date: "Apr 30, 2026", readTime: "6 min", topic: "Work" },
  { title: "Letters to a younger engineer", excerpt: "The career advice I wish someone had handed me at twenty-three, distilled to the few lines that actually held up.", date: "Apr 9, 2026", readTime: "11 min", topic: "Work" },
  { title: "Slowness as a discipline", excerpt: "Speed is celebrated everywhere. But the best thinking I have done arrived only after I agreed to wait for it.", date: "Mar 22, 2026", readTime: "8 min", topic: "Life" },
  { title: "The tools we shape back", excerpt: "We build software to solve a problem, then quietly rearrange our lives around the software. A field note on that exchange.", date: "Mar 3, 2026", readTime: "10 min", topic: "Tech" },
  { title: "What a garden taught me about systems", excerpt: "You cannot force a tomato. You can only build the conditions in which it becomes likely. Most good systems work the same way.", date: "Feb 18, 2026", readTime: "7 min", topic: "Ideas" },
  { title: "Keeping a Sunday", excerpt: "One day a week with no agenda, no screens, no optimization. It changed more than I expected, and less than I feared.", date: "Feb 1, 2026", readTime: "5 min", topic: "Life" },
]

export default function EssayCollection() {
  const [filter, setFilter] = React.useState<Topic>("All")
  const visible = filter === "All" ? ESSAYS : ESSAYS.filter((e) => e.topic === filter)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <Feather className="h-5 w-5" aria-hidden="true" />
            <span>Margins</span>
          </a>
          <nav className="flex items-center gap-1 text-sm">
            <a href="#essays" className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">Essays</a>
            <a href="#about" className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">About</a>
            <Button size="sm" variant="outline" className="ml-1" asChild>
              <a href="#subscribe">Subscribe</a>
            </Button>
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="border-b">
          <div className="mx-auto w-full max-w-4xl px-6 py-20 sm:py-28">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">A writing publication</p>
            <h1 className="max-w-2xl font-serif text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl">
              Essays on technology, work, and the texture of an ordinary life.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Long-form writing, published when the thinking is done and not before. No newsletter cadence, no growth hacks. Just essays worth the read.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <a href="#essays">Start reading <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href="#subscribe" className="flex items-center gap-2"><Rss className="h-4 w-4" aria-hidden="true" /> Follow along</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="essays" className="mx-auto w-full max-w-4xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            <div className="min-w-0">
              <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter essays by topic">
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    aria-pressed={filter === t}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      filter === t
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <ul className="divide-y">
                {visible.map((essay) => (
                  <li key={essay.title} className="group">
                    <a href="#essays" className="block py-7">
                      <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{essay.date}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" /> {essay.readTime}</span>
                        <Badge variant="secondary" className="ml-auto">{essay.topic}</Badge>
                      </div>
                      <h2 className="flex items-start gap-2 font-serif text-2xl font-medium leading-snug tracking-tight">
                        <span className="transition-colors group-hover:text-muted-foreground">{essay.title}</span>
                        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </h2>
                      <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{essay.excerpt}</p>
                    </a>
                  </li>
                ))}
              </ul>

              {visible.length === 0 && (
                <p className="py-12 text-center text-muted-foreground">No essays under this topic yet.</p>
              )}
            </div>

            <aside className="space-y-8 lg:pt-12">
              <div id="about" className="rounded-xl border bg-card p-6">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="font-serif text-lg">EM</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-serif text-lg font-medium">Elena Marsh</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Writer and engineer. I publish slow essays on building things, the habits around the work, and what stays when the deadline passes.
                </p>
                <Separator className="my-4" />
                <dl className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Writing since</dt>
                    <dd className="font-medium tabular-nums">2017</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Essays</dt>
                    <dd className="font-medium tabular-nums">142</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Readers</dt>
                    <dd className="font-medium tabular-nums">9,400</dd>
                  </div>
                </dl>
              </div>

              <div id="subscribe" className="rounded-xl border border-primary/40 bg-primary/5 p-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                  <h3 className="text-sm font-semibold">New essays, by email</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  One thoughtful piece, roughly twice a month. No tracking, unsubscribe anytime.
                </p>
                <form className="mt-4 space-y-2" onSubmit={(e) => e.preventDefault()}>
                  <label htmlFor="sub-email" className="sr-only">Email address</label>
                  <Input id="sub-email" type="email" placeholder="you@example.com" />
                  <Button type="submit" className="w-full">Subscribe</Button>
                </form>
              </div>

              <div className="rounded-xl border bg-muted/30 p-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <h3 className="text-sm font-semibold">Topics</h3>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TOPICS.filter((t) => t !== "All").map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFilter(t)}
                      className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Feather className="h-4 w-4" aria-hidden="true" />
            <span>Margins</span>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a href="#essays" className="transition-colors hover:text-foreground">Essays</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a href="#subscribe" className="transition-colors hover:text-foreground">Subscribe</a>
            <a href="#top" className="transition-colors hover:text-foreground">RSS</a>
          </nav>
          <p className="text-sm text-muted-foreground">© 2026 Margins</p>
        </div>
      </footer>
    </div>
  )
}
