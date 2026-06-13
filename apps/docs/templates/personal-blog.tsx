"use client"

import * as React from "react"
import { Rss, Mail, ArrowUpRight, Clock, Calendar, Github, Twitter, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const TOPICS = ["All", "Engineering", "Design", "Writing", "Notes"] as const

type Topic = (typeof TOPICS)[number]

type Post = {
  title: string
  excerpt: string
  date: string
  year: string
  readingTime: string
  topic: Exclude<Topic, "All">
}

const POSTS: Post[] = [
  {
    title: "Writing software that ages gracefully",
    excerpt:
      "Most code rots not because it was bad, but because nobody planned for the boring middle. A few habits that keep projects readable years later.",
    date: "May 28",
    year: "2026",
    readingTime: "7 min read",
    topic: "Engineering",
  },
  {
    title: "The quiet power of a smaller surface area",
    excerpt:
      "Every feature you ship is a promise you have to keep. I've started measuring projects by what they refuse to do.",
    date: "Apr 14",
    year: "2026",
    readingTime: "5 min read",
    topic: "Engineering",
  },
  {
    title: "Designing for the second glance",
    excerpt:
      "First impressions get all the attention, but interfaces live or die on the hundredth interaction. Notes on designing for familiarity.",
    date: "Mar 02",
    year: "2026",
    readingTime: "6 min read",
    topic: "Design",
  },
  {
    title: "A writing routine that survives busy weeks",
    excerpt:
      "I gave up on inspiration and built a system instead. Here is the unglamorous process that keeps this blog alive.",
    date: "Feb 09",
    year: "2026",
    readingTime: "4 min read",
    topic: "Writing",
  },
  {
    title: "Reading notes: on craft and patience",
    excerpt:
      "A loose collection of margin notes from the books that shaped how I think about making things slowly and well.",
    date: "Jan 21",
    year: "2026",
    readingTime: "3 min read",
    topic: "Notes",
  },
  {
    title: "Why I still keep a plain text journal",
    excerpt:
      "No app, no sync, no streak counter. Just a folder of dated files and what that simplicity gives back to me.",
    date: "Dec 30",
    year: "2025",
    readingTime: "5 min read",
    topic: "Notes",
  },
]

export default function PersonalBlogPage() {
  const [active, setActive] = React.useState<Topic>("All")

  const filtered = POSTS.filter((p) => active === "All" || p.topic === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-medium tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </span>
            Mara Okafor
          </a>
          <nav className="flex items-center gap-1 text-sm">
            <Button variant="ghost" size="sm" asChild>
              <a href="#writing">Writing</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#about">About</a>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Subscribe via RSS">
              <Rss className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        <section id="about" className="py-14 sm:py-20">
          <Avatar className="h-14 w-14">
            <AvatarImage src="" alt="" />
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hi, I'm Mara.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I build software and write about the craft behind it &mdash; the small
            decisions, the slow improvements, and the occasional book that changes
            how I think. New posts roughly once a month.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="GitHub profile">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter profile">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Subscribe via RSS">
              <Rss className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <Separator />

        <section id="writing" className="py-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Latest writing
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setActive(topic)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    active === topic
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted",
                  )}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <ol className="mt-8 flex flex-col">
            {filtered.map((post, i) => (
              <li key={post.title}>
                {i > 0 && <Separator />}
                <a
                  href="#"
                  className="group block py-7 transition-colors"
                >
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.date}, {post.year}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-foreground">
                      {post.topic}
                    </span>
                  </div>
                  <h3 className="mt-3 flex items-start gap-1 text-xl font-semibold tracking-tight">
                    <span className="transition-colors group-hover:text-primary">
                      {post.title}
                    </span>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </a>
              </li>
            ))}
          </ol>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No posts under this topic yet.
            </p>
          )}
        </section>

        <section className="pb-16">
          <div className="rounded-2xl border bg-muted/30 p-8 sm:p-10">
            <div className="mx-auto max-w-md text-center">
              <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                Get new posts in your inbox
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                One thoughtful email a month. No spam, no tracking, unsubscribe
                anytime.
              </p>
              <form
                className="mt-6 flex flex-col gap-2 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="subscribe-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="subscribe-email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-background"
                />
                <Button type="submit">Subscribe</Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">
                Join 2,400+ readers.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Mara Okafor. Written by hand.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              RSS
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
