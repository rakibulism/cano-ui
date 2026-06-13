"use client"

import * as React from "react"
import {
  ArrowRight,
  Quote,
  Sparkles,
  Heart,
  Compass,
  Flame,
  MapPin,
  Mail,
  Linkedin,
  Twitter,
  Award,
  Rocket,
  Users,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const MILESTONES = [
  {
    year: "2016",
    title: "A note on a napkin",
    body: "After a decade in hospital logistics, I sketched a system that could route medicine to rural clinics faster. The napkin still lives on my desk.",
  },
  {
    year: "2018",
    title: "The first 12 clinics",
    body: "We bootstrapped a pilot across twelve clinics. Half of them had never received a same-day delivery before. Every box mattered.",
  },
  {
    year: "2020",
    title: "Through the hardest year",
    body: "When the world shut down, our small team kept the cold chain running. We learned that resilience is built, not inherited.",
  },
  {
    year: "2022",
    title: "A million doses delivered",
    body: "We crossed a million doses delivered. I cried in the warehouse. Then we went back to work — there was still so far to go.",
  },
  {
    year: "2024",
    title: "Building for the next decade",
    body: "Today, Meridian serves four countries. But the napkin question is the same: who is still waiting, and how fast can we reach them?",
  },
]

const VALUES = [
  {
    icon: Compass,
    title: "Purpose over hype",
    body: "We measure ourselves by lives reached, not press cycles. The mission is the metric.",
  },
  {
    icon: Heart,
    title: "Radical care",
    body: "Care for patients, for partners, and for each other. Kindness is an operating principle here.",
  },
  {
    icon: Flame,
    title: "Bias to ship",
    body: "Perfect plans help no one if they sit on a shelf. We move, we learn, we adjust.",
  },
  {
    icon: Leaf,
    title: "Built to last",
    body: "We build for the next decade, not the next demo. Durable systems, durable trust.",
  },
]

const TEAM = [
  { name: "Amara Okafor", role: "Founder & CEO", initials: "AO", src: "https://i.pravatar.cc/120?img=47" },
  { name: "Daniel Reyes", role: "Head of Operations", initials: "DR", src: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Nadar", role: "Chief Medical Officer", initials: "PN", src: "https://i.pravatar.cc/120?img=32" },
  { name: "Kofi Mensah", role: "VP Engineering", initials: "KM", src: "https://i.pravatar.cc/120?img=68" },
  { name: "Lena Sørensen", role: "Head of Partnerships", initials: "LS", src: "https://i.pravatar.cc/120?img=24" },
  { name: "Marcus Hale", role: "Design Lead", initials: "MH", src: "https://i.pravatar.cc/120?img=15" },
]

const PRESS = ["The Atlantic", "WIRED", "Fast Company", "TechCrunch", "Forbes 30u30"]

const STATS = [
  { icon: Rocket, value: "1.2M", label: "doses delivered" },
  { icon: MapPin, value: "4", label: "countries served" },
  { icon: Users, value: "320+", label: "clinic partners" },
  { icon: Award, value: "98%", label: "on-time rate" },
]

export default function FounderStory() {
  const [email, setEmail] = React.useState("")
  const [joined, setJoined] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Meridian</span>
          </div>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#story" className="transition-colors hover:text-foreground">The story</a>
            <a href="#journey" className="transition-colors hover:text-foreground">Journey</a>
            <a href="#values" className="transition-colors hover:text-foreground">Values</a>
            <a href="#team" className="transition-colors hover:text-foreground">Team</a>
          </div>
          <Button size="sm" asChild>
            <a href="#join">Join us</a>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="story" className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div className="space-y-6">
              <Badge variant="secondary" className="gap-1.5">
                <Quote className="h-3.5 w-3.5" /> Our founder's story
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                I started Meridian because a clinic ran out of insulin on a Tuesday.
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                I am Amara — a logistics nerd turned founder. This is the honest story
                of how a napkin sketch became a mission to get medicine where it is
                needed, on time, every time.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#journey">
                    Read the journey <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#join">Join the mission</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl border bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80"
                  alt=""
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -left-6 hidden w-56 shadow-lg sm:block">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-none">Amara Okafor</p>
                    <p className="mt-1 text-xs text-muted-foreground">Founder & CEO</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-6 py-12 md:grid-cols-4">
            {STATS.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex flex-col items-center gap-2 px-4 text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-3xl font-semibold tracking-tight">{s.value}</span>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Pull quote */}
        <section className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
          <Quote className="mx-auto h-10 w-10 text-primary/40" aria-hidden="true" />
          <blockquote className="mt-6 text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">
            &ldquo;I never set out to build a company. I set out to make sure no one
            waits for medicine that already exists. The company was just what the
            mission required.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm font-medium text-muted-foreground">
            — Amara Okafor, Founder
          </p>
        </section>

        {/* Journey timeline */}
        <section id="journey" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-6 py-20">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">The journey</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Eight years, one question
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every milestone came from the same place — someone, somewhere, was
                still waiting.
              </p>
            </div>
            <ol className="relative space-y-10 border-l pl-8">
              {MILESTONES.map((m, i) => (
                <li key={m.year} className="relative">
                  <span
                    className={cn(
                      "absolute -left-[2.55rem] flex h-7 w-7 items-center justify-center rounded-full border-2 border-background text-xs font-semibold",
                      i === MILESTONES.length - 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold text-primary">{m.year}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Values / mission */}
        <section id="values" className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <Badge variant="outline" className="mb-4">What we believe</Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The values that survived every hard quarter
            </h2>
            <p className="mt-3 text-muted-foreground">
              These were not written in a workshop. They were earned, one decision at
              a time, often the hard way.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((v) => {
              const Icon = v.icon
              return (
                <Card key={v.title} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex gap-4 p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">{v.body}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section id="team" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <Badge variant="outline" className="mb-4">The people</Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                I did not build this alone
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                A founder is only as good as the team that says yes to an impossible
                mission. Meet a few of them.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
              {TEAM.map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 border-2 border-background shadow-sm">
                    <AvatarImage src={member.src} alt="" />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <p className="mt-3 text-sm font-semibold leading-tight">{member.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press strip */}
        <section className="mx-auto w-full max-w-6xl px-6 py-16">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Recognized by
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {PRESS.map((name) => (
              <span
                key={name}
                className="text-xl font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Join us CTA */}
        <section id="join" className="border-t bg-primary/5">
          <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
            <Badge className="mb-4 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Join the mission
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The next chapter needs you in it
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Whether you want to build with us or just follow the journey, leave your
              email. No spam — just the honest story as it unfolds.
            </p>
            {joined ? (
              <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-xl border bg-card px-6 py-4 text-sm font-medium">
                <Heart className="h-4 w-4 text-primary" />
                Thank you for joining the journey. We will be in touch.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setJoined(true)
                }}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  aria-label="Email address"
                  className="bg-background"
                />
                <Button type="submit" size="lg">
                  Count me in <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              We are hiring across engineering, ops, and design.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Meridian</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span className="text-sm text-muted-foreground">Medicine, on time.</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Email us">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Twitter">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
