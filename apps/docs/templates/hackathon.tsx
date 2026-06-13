"use client"
import * as React from "react"
import {
  Code2,
  Calendar,
  MapPin,
  Trophy,
  Rocket,
  Brain,
  Globe,
  Heart,
  Zap,
  Clock,
  Users,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Menu,
  Coffee,
  Award,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/registry/ui/accordion"

const NAV = [
  { label: "Prizes", href: "#prizes" },
  { label: "Schedule", href: "#schedule" },
  { label: "Tracks", href: "#tracks" },
  { label: "Judges", href: "#judges" },
  { label: "FAQ", href: "#faq" },
]

const STATS = [
  { value: "$50K", label: "In prizes" },
  { value: "36h", label: "Of building" },
  { value: "800+", label: "Hackers" },
  { value: "40", label: "Mentors" },
]

const PRIZES = [
  {
    place: "Grand Prize",
    amount: "$20,000",
    icon: Trophy,
    perks: ["Cash + equity-free grant", "YC partner office hours", "Featured in DevWeekly"],
    featured: true,
  },
  {
    place: "Runner-up",
    amount: "$10,000",
    icon: Award,
    perks: ["Cash prize", "1 year of cloud credits", "Mentor matching"],
    featured: false,
  },
  {
    place: "Best Rookie",
    amount: "$5,000",
    icon: Star,
    perks: ["For first-time hackers", "Hardware kit bundle", "Community spotlight"],
    featured: false,
  },
]

const SCHEDULE = [
  { day: "Fri", time: "5:00 PM", title: "Check-in & kickoff", desc: "Badge pickup, team mixer, and opening keynote." },
  { day: "Fri", time: "7:30 PM", title: "Hacking begins", desc: "Clocks start. Build anything you can dream up." },
  { day: "Sat", time: "10:00 AM", title: "Workshops", desc: "Hands-on sessions on AI, infra, and design." },
  { day: "Sat", time: "9:00 PM", title: "Midnight snacks", desc: "Refuel with late-night ramen and energy drinks." },
  { day: "Sun", time: "7:30 AM", title: "Submissions close", desc: "Lock in your project on the judging portal." },
  { day: "Sun", time: "1:00 PM", title: "Demos & awards", desc: "Pitch to judges, then celebrate the winners." },
]

const TRACKS = [
  { icon: Brain, name: "AI & Agents", desc: "Build assistants, copilots, and autonomous workflows." },
  { icon: Globe, name: "Climate Tech", desc: "Software fighting the climate crisis at scale." },
  { icon: Heart, name: "Health & Access", desc: "Tools that make care more affordable and equitable." },
  { icon: Zap, name: "Open Innovation", desc: "No theme, no limits. Surprise us with something wild." },
]

const JUDGES = [
  { name: "Dr. Lena Ortiz", role: "VP Eng, Northwind", img: "https://i.pravatar.cc/120?img=47" },
  { name: "Marcus Bell", role: "Founder, Loopframe", img: "https://i.pravatar.cc/120?img=12" },
  { name: "Priya Raman", role: "AI Lead, Verdant", img: "https://i.pravatar.cc/120?img=32" },
  { name: "Theo Nakamura", role: "Partner, Seed&Spark", img: "https://i.pravatar.cc/120?img=15" },
]

const SPONSORS = ["Vercel", "Supabase", "Linear", "Stripe", "Cloudflare", "Postman", "Replit", "Figma"]

const FAQ = [
  { q: "Who can participate?", a: "Anyone 18+ with a love for building. Students, professionals, and first-timers are all welcome." },
  { q: "How big can my team be?", a: "Teams can have up to four people. Solo hackers are welcome and we run a team-matching mixer at kickoff." },
  { q: "Does it cost anything?", a: "Nope. Admission, meals, swag, and 36 hours of caffeine are completely free for accepted hackers." },
  { q: "What should I bring?", a: "Your laptop, charger, a valid ID, and anything that keeps you comfortable for an overnight build." },
  { q: "Do I need a finished idea?", a: "Not at all. Many of the best projects start as a sketch on a napkin during the opening mixer." },
]

export default function HackathonPage() {
  const [activeDay, setActiveDay] = React.useState("All")
  const days = ["All", "Fri", "Sat", "Sun"]
  const filtered = activeDay === "All" ? SCHEDULE : SCHEDULE.filter((s) => s.day === activeDay)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </span>
            HackVerse
          </a>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">Register</Button>
            <Button size="icon" variant="ghost" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1" id="top">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-primary/10" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 text-center md:py-28">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Zap className="h-3.5 w-3.5" /> Applications open
            </Badge>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build the future in 36 hours
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              HackVerse is a weekend-long sprint where 800 builders ship bold ideas, learn from the best, and win their share of $50K.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2">
                Register now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">View schedule</Button>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" /> March 14&ndash;16, 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Mission Bay Campus, SF
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-background px-4 py-8 text-center">
                <div className="text-3xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Prizes */}
        <section id="prizes" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Prizes worth fighting for</h2>
            <p className="mt-3 text-muted-foreground">
              More than $50,000 across three headline tiers, plus track bounties from our sponsors.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRIZES.map((p) => {
              const Icon = p.icon
              return (
                <Card
                  key={p.place}
                  className={cn("relative", p.featured && "border-primary shadow-sm md:-mt-4 md:mb-4")}
                >
                  {p.featured && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most coveted</Badge>
                  )}
                  <CardHeader className="items-center text-center">
                    <span className={cn("flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary")}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <CardTitle className="mt-2">{p.place}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-foreground">{p.amount}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {p.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {perk}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">The weekend at a glance</h2>
              <p className="mt-3 text-muted-foreground">Three days of building, learning, and shipping. Filter by day below.</p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {days.map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={activeDay === d ? "default" : "outline"}
                  onClick={() => setActiveDay(d)}
                >
                  {d}
                </Button>
              ))}
            </div>
            <ol className="mx-auto mt-10 max-w-2xl space-y-4">
              {filtered.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="flex w-20 shrink-0 flex-col items-end pt-4 text-right">
                    <span className="text-sm font-semibold">{item.day}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <span className="mt-5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <span className="w-px flex-1 bg-border" aria-hidden="true" />
                  </div>
                  <Card className="mb-2 flex-1">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-2 font-medium">
                        <Clock className="h-4 w-4 text-primary" /> {item.title}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tracks */}
        <section id="tracks" className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Pick your track</h2>
            <p className="mt-3 text-muted-foreground">Four themes, infinite directions. Choose the one that fires you up.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((t) => {
              const Icon = t.icon
              return (
                <Card key={t.name} className="transition-colors hover:border-primary">
                  <CardHeader>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="mt-3 text-lg">{t.name}</CardTitle>
                    <CardDescription>{t.desc}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Judges & Mentors */}
        <section id="judges" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Judges & mentors</h2>
              <p className="mt-3 text-muted-foreground">
                Founders, engineers, and investors here to coach you and crown the winners.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {JUDGES.map((j) => (
                <Card key={j.name} className="text-center">
                  <CardContent className="flex flex-col items-center py-8">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={j.img} alt="" />
                      <AvatarFallback>{j.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 font-semibold">{j.name}</div>
                    <div className="text-sm text-muted-foreground">{j.role}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Powered by our sponsors</h2>
            <p className="mt-3 text-muted-foreground">The teams keeping the lights on, the servers up, and the coffee flowing.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-4">
            {SPONSORS.map((s) => (
              <div key={s} className="flex items-center justify-center gap-2 bg-background px-6 py-10 text-muted-foreground transition-colors hover:text-foreground">
                <Coffee className="h-4 w-4" />
                <span className="font-semibold">{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Frequently asked</h2>
              <p className="mt-3 text-muted-foreground">Still curious? Reach the team at hello@hackverse.dev.</p>
            </div>
            <Accordion type="single" collapsible className="mt-10 w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={"item-" + i}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20">
          <Card className="overflow-hidden border-primary bg-primary/10">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-14 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Rocket className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Ready to ship something wild?</h2>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Spots fill fast. Drop your email and we will send your application link plus team-matching details.
                </p>
              </div>
              <form
                className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input type="email" placeholder="you@email.com" aria-label="Email address" className="bg-background" />
                <Button type="submit" className="gap-2">
                  Apply <Users className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <a href="#top" className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-4 w-4" />
              </span>
              HackVerse
            </a>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2026 HackVerse. Made by builders, for builders.
          </p>
        </div>
      </footer>
    </div>
  )
}
