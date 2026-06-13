"use client"

import * as React from "react"
import {
  PenLine,
  ArrowUpRight,
  Mail,
  Award,
  Quote,
  Newspaper,
  BookOpen,
  ArrowRight,
  Twitter,
  Linkedin,
  Rss,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const NAV_LINKS = [
  { label: "Writing", href: "#writing" },
  { label: "About", href: "#about" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
]

const BEATS = [
  "Climate & Environment",
  "Long-form Reporting",
  "Technology",
  "Cultural Criticism",
  "Investigations",
  "Profiles",
]

const ARTICLES = [
  {
    title: "The Last Glacier Keepers of the Alps",
    publication: "The Atlantic",
    year: "2026",
    kind: "Feature",
    excerpt:
      "Inside a quiet alpine village, a handful of scientists race to chronicle ice that may not survive the decade.",
  },
  {
    title: "What We Lose When the Newsroom Goes Quiet",
    publication: "The New Yorker",
    year: "2025",
    kind: "Essay",
    excerpt:
      "A meditation on local journalism, civic memory, and the slow erosion of the places we report from.",
  },
  {
    title: "The Algorithm Will See You Now",
    publication: "Wired",
    year: "2025",
    kind: "Investigation",
    excerpt:
      "How predictive software quietly reshaped the way one city decides who deserves a second chance.",
  },
  {
    title: "A Portrait of the River That Refused to Die",
    publication: "National Geographic",
    year: "2024",
    kind: "Reportage",
    excerpt:
      "Decades after it was declared dead, a poisoned waterway returns — and so do the people who left it.",
  },
  {
    title: "Notes on Writing in the Margins",
    publication: "The Paris Review",
    year: "2024",
    kind: "Essay",
    excerpt:
      "On annotation, attention, and the small private acts that keep reading alive in a distracted age.",
  },
]

const AWARDS = [
  { name: "Pulitzer Finalist, Feature Writing", org: "Pulitzer Board", year: "2025" },
  { name: "National Magazine Award", org: "ASME", year: "2024" },
  { name: "Livingston Award for Young Journalists", org: "Wallace House", year: "2022" },
  { name: "Best American Essays, Notable", org: "Houghton Mifflin", year: "2021" },
]

const STATS = [
  { value: "120+", label: "Published pieces" },
  { value: "9", label: "Years reporting" },
  { value: "14", label: "Countries covered" },
]

export default function WriterPortfolio() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-serif text-lg tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PenLine className="h-4 w-4" />
            </span>
            Elena Marsh
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button size="sm" variant="outline" className="hidden sm:inline-flex" asChild>
            <a href="#contact">Get in touch</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="mx-auto w-full max-w-5xl px-6 pb-20 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 rounded-full px-3 py-1 text-xs font-normal">
              Journalist &amp; Essayist
            </Badge>
            <h1 className="font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl">
              I write about the quiet places where people and change collide.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Long-form reporting and essays on climate, technology, and the human texture of
              the stories beneath the headlines.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#writing">
                  Read selected work
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href="#contact">Commission a piece</a>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border bg-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-card px-4 py-8 text-center">
                <div className="font-serif text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="writing" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="mb-12 flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Newspaper className="h-4 w-4" />
                  Selected work
                </div>
                <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">
                  Articles &amp; essays
                </h2>
              </div>
              <a
                href="#contact"
                className="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
              >
                Full archive
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <ul className="divide-y border-y">
              {ARTICLES.map((article) => (
                <li key={article.title}>
                  <a
                    href="#writing"
                    className="group flex flex-col gap-3 py-6 transition-colors hover:bg-accent/40 sm:flex-row sm:items-center sm:gap-8"
                  >
                    <div className="flex shrink-0 items-center gap-3 sm:w-44">
                      <span className="font-serif text-sm text-foreground">
                        {article.publication}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.year}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="rounded-full text-[11px] font-normal">
                          {article.kind}
                        </Badge>
                        <h3 className="font-serif text-lg tracking-tight transition-colors group-hover:text-primary">
                          {article.title}
                        </h3>
                      </div>
                      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {article.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground sm:block" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="about" className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-start">
            <div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <BookOpen className="h-4 w-4" />
                About
              </div>
              <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">
                A reporter with a notebook and a long attention span.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  I have spent the last nine years chasing the slow stories — the ones that
                  unfold over seasons rather than news cycles. My work has taken me from melting
                  glaciers to courtrooms to the back rooms where quiet decisions reshape lives.
                </p>
                <p>
                  Before going independent I was a staff writer covering the environment beat. I
                  hold a degree in literature, which mostly taught me that every fact is also a
                  sentence waiting to be written well.
                </p>
              </div>

              <figure className="mt-8 rounded-2xl border bg-muted/40 p-6">
                <Quote className="h-6 w-6 text-primary" />
                <blockquote className="mt-3 font-serif text-lg leading-relaxed">
                  Elena writes with the patience of a documentarian and the precision of a poet.
                </blockquote>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  — Margaret Hale, Editor-in-Chief, The Atlantic
                </figcaption>
              </figure>
            </div>

            <div>
              <div className="rounded-2xl border bg-card p-6">
                <h3 className="text-sm font-medium">Beats &amp; topics</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Subjects I report on most often.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {BEATS.map((beat) => (
                    <Badge
                      key={beat}
                      variant="secondary"
                      className="rounded-full px-3 py-1 text-xs font-normal"
                    >
                      {beat}
                    </Badge>
                  ))}
                </div>
                <Separator className="my-6" />
                <h3 className="text-sm font-medium">Currently</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Reporting a book-length project on water rights in the American West, and
                  reading far too many field journals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="awards" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-6 py-20">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Award className="h-4 w-4" />
              Recognition
            </div>
            <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">
              Awards &amp; honors
            </h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2">
              {AWARDS.map((award) => (
                <div
                  key={award.name}
                  className="flex items-start justify-between gap-4 bg-card p-6"
                >
                  <div>
                    <h3 className="font-serif text-lg leading-snug tracking-tight">
                      {award.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{award.org}</p>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground">{award.year}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="overflow-hidden rounded-3xl border bg-card">
            <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
              <div>
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Mail className="h-4 w-4" />
                  Contact
                </div>
                <h2 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">
                  Let&apos;s work together.
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
                  Open to features, essays, and investigative commissions. For pitches and
                  speaking, the fastest way to reach me is email.
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 font-serif text-lg text-foreground underline-offset-4 hover:underline"
                >
                  hello@elenamarsh.com
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="mt-6 flex items-center gap-2">
                  <Button variant="outline" size="icon" aria-label="Twitter" asChild>
                    <a href="#contact">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="LinkedIn" asChild>
                    <a href="#contact">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="RSS feed" asChild>
                    <a href="#contact">
                      <Rss className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border bg-muted/40 p-6 md:p-8">
                <h3 className="font-serif text-xl tracking-tight">The Margins</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A monthly letter with new work, reading notes, and what I am chasing next. No
                  noise, no spam.
                </p>
                {subscribed ? (
                  <div className="mt-6 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm text-primary">
                    Thank you — you are on the list. Watch your inbox for the next issue.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                    <Input
                      type="email"
                      required
                      placeholder="you@email.com"
                      aria-label="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                      Subscribe
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Unsubscribe anytime. Read by 12,000 curious people.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <PenLine className="h-4 w-4" />
            <span className="font-serif text-foreground">Elena Marsh</span>
          </div>
          <p className={cn("text-center")}>
            &copy; 2026 Elena Marsh. Words are my own.
          </p>
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
