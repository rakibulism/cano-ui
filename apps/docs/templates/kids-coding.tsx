"use client"

import * as React from "react"
import {
  Rocket,
  Sparkles,
  Gamepad2,
  Bot,
  Code2,
  Cpu,
  Blocks,
  Star,
  Heart,
  CheckCircle2,
  Trophy,
  Calendar,
  Smile,
  Menu,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV_LINKS = ["Programs", "What They Learn", "Parents", "Pricing", "FAQ"]

const AGE_GROUPS = [
  {
    icon: Blocks,
    age: "Ages 5–7",
    title: "Block Explorers",
    blurb:
      "Drag-and-drop coding with colorful blocks. Kids build their first animations and silly stories.",
    badge: "Beginner",
    bullets: ["Logic with blocks", "First animations", "Counting & patterns"],
  },
  {
    icon: Gamepad2,
    age: "Ages 8–10",
    title: "Game Makers",
    blurb:
      "Design real games with characters, scores, and levels using friendly visual coding.",
    badge: "Most popular",
    bullets: ["Build 2D games", "Events & loops", "Sound & art design"],
  },
  {
    icon: Code2,
    age: "Ages 11–13",
    title: "Code Wizards",
    blurb:
      "Type real Python and JavaScript to make websites, quizzes, and tiny apps from scratch.",
    badge: "Intermediate",
    bullets: ["Python & JS", "Build a website", "Problem solving"],
  },
  {
    icon: Bot,
    age: "Ages 14+",
    title: "Robot Inventors",
    blurb:
      "Program robots and dabble in AI. Big kids ship projects they can show off to friends.",
    badge: "Advanced",
    bullets: ["Robotics", "Intro to AI", "Real projects"],
  },
]

const LEARNINGS = [
  {
    icon: Cpu,
    title: "Computational thinking",
    text: "Breaking big problems into small, friendly steps a computer can follow.",
  },
  {
    icon: Sparkles,
    title: "Creative confidence",
    text: "Every lesson ends with something kids made themselves and feel proud of.",
  },
  {
    icon: Trophy,
    title: "Stick-with-it grit",
    text: "Debugging teaches kids that mistakes are just clues, not failures.",
  },
  {
    icon: Smile,
    title: "Joyful collaboration",
    text: "Small groups share ideas, swap projects, and cheer each other on.",
  },
]

const TESTIMONIALS = [
  {
    name: "Priya M.",
    role: "Parent of Aarav, 9",
    quote:
      "He used to beg for screen time. Now he begs to build games. The teachers make it feel like play.",
  },
  {
    name: "Daniel R.",
    role: "Parent of Mia, 12",
    quote:
      "Mia built her own website in three weeks. The confidence she gained is worth every penny.",
  },
  {
    name: "Sofia L.",
    role: "Parent of twins, 7",
    quote:
      "Tiny class sizes mean both my kids actually get attention. They high-five each other after class!",
  },
]

const PLANS = [
  {
    name: "Explorer",
    price: "$19",
    cadence: "/ month",
    blurb: "One live class a week to get started.",
    features: ["1 weekly live class", "Small groups (max 6)", "Take-home projects", "Cancel anytime"],
    highlight: false,
  },
  {
    name: "Builder",
    price: "$39",
    cadence: "/ month",
    blurb: "Our most-loved plan for steady progress.",
    features: ["2 weekly live classes", "Small groups (max 6)", "Progress report card", "Project showcase day", "Priority support"],
    highlight: true,
  },
  {
    name: "Inventor",
    price: "$69",
    cadence: "/ month",
    blurb: "For super-keen coders who want it all.",
    features: ["3 weekly live classes", "1:1 mentor session", "Robotics kit included", "Showcase day", "Certificate path"],
    highlight: false,
  },
]

const FAQS = [
  {
    q: "Does my child need any coding experience?",
    a: "Not at all. We start every child exactly where they are, from total beginner to budding builder, and group them by skill as much as age.",
  },
  {
    q: "What computer do we need?",
    a: "Any laptop or desktop with a web browser works. Everything runs in the browser, so there is nothing to install.",
  },
  {
    q: "How big are the classes?",
    a: "Live classes are capped at six kids so every child gets plenty of personal attention from their teacher.",
  },
  {
    q: "Is the free trial really free?",
    a: "Yes. The first class is on us, no card required. If it is not a fit, you simply do not come back.",
  },
]

export default function KidsCodingTemplate() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activePlan, setActivePlan] = React.useState("Builder")
  const [trialAge, setTrialAge] = React.useState("8")

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-bold">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Rocket className="size-5" />
            </span>
            <span className="text-lg">CodeSprout</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={"#" + link.toLowerCase().replace(/\s+/g, "-")}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button className="hidden rounded-full sm:inline-flex">Book free trial</Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu className="size-5" />
            </Button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t px-4 py-2 md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={"#" + link.toLowerCase().replace(/\s+/g, "-")}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="rounded-full">
                <Heart className="mr-1 size-3" /> Loved by 12,000+ families
              </Badge>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Coding made{" "}
                <span className="text-primary">wildly fun</span> for kids
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                Live, tiny-group classes where kids build games, websites, and
                robots, and discover they love to learn.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full">
                  Start free trial <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  See the programs
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {["A", "B", "C", "D"].map((l) => (
                    <span
                      key={l}
                      className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-accent text-sm font-semibold"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="size-4 fill-primary text-primary" />
                  <span className="font-semibold">4.9</span>
                  <span className="text-muted-foreground">from 2,400 parent reviews</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="rotate-1 border-2 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <span className="size-3 rounded-full bg-destructive/70" />
                    <span className="size-3 rounded-full bg-primary/70" />
                    <span className="size-3 rounded-full bg-accent" />
                    <span className="ml-2">my-first-game.js</span>
                  </div>
                  <pre className="mt-4 overflow-x-auto rounded-xl bg-muted p-4 text-sm leading-relaxed">
{`when start:
  hero.say("Hi! 👋")
  while playing:
    if catch(star):
      score += 10
      cheer()`}
                  </pre>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/10 p-3 text-sm">
                    <span className="flex items-center gap-2 font-medium text-primary">
                      <Sparkles className="size-4" /> Score: 120
                    </span>
                    <Badge className="rounded-full">Level up!</Badge>
                  </div>
                </CardContent>
              </Card>
              <Card className="absolute -bottom-6 -left-4 -rotate-3 border-2 shadow-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-accent">
                    <Trophy className="size-5" />
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold">First game shipped!</p>
                    <p className="text-muted-foreground">Badge unlocked</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section id="programs" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">Programs by age</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                A path for every age and stage
              </h2>
              <p className="mt-3 text-muted-foreground">
                From first blocks to real robots, kids grow with us year after year.
              </p>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {AGE_GROUPS.map((group) => (
                <Card key={group.title} className="flex flex-col border-2 transition-transform hover:-translate-y-1">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <group.icon className="size-6" />
                      </span>
                      <Badge variant="secondary" className="rounded-full text-xs">
                        {group.badge}
                      </Badge>
                    </div>
                    <p className="mt-5 text-sm font-semibold text-primary">{group.age}</p>
                    <h3 className="mt-1 text-lg font-bold">{group.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{group.blurb}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {group.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What they learn */}
        <section id="what-they-learn">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
            <div>
              <Badge variant="outline" className="rounded-full">More than code</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Skills that last way past the screen
              </h2>
              <p className="mt-3 text-muted-foreground">
                Coding is the playground, but the real wins are the thinking
                habits kids carry into everything they do.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {LEARNINGS.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { n: "12k+", l: "Happy young coders" },
                { n: "98%", l: "Would recommend us" },
                { n: "6", l: "Max kids per class" },
                { n: "200+", l: "Projects built weekly" },
              ].map((stat) => (
                <Card key={stat.l} className="border-2 bg-primary/5">
                  <CardContent className="p-6">
                    <p className="text-4xl font-extrabold text-primary">{stat.n}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.l}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Parents */}
        <section id="parents" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">Parent love</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Parents see the spark too
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="border-2">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="size-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-accent font-semibold">
                        {t.name.charAt(0)}
                      </span>
                      <div className="text-sm">
                        <p className="font-semibold">{t.name}</p>
                        <p className="text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="rounded-full">Simple pricing</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Plans that grow with your kid
              </h2>
              <p className="mt-3 text-muted-foreground">
                No contracts, no surprises. Switch or cancel any time.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => {
                const selected = activePlan === plan.name
                return (
                  <Card
                    key={plan.name}
                    className={cn(
                      "flex flex-col border-2 transition-all",
                      selected ? "border-primary shadow-sm" : "border-border"
                    )}
                  >
                    <CardContent className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                        {plan.highlight && (
                          <Badge className="rounded-full">Most popular</Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>
                      <div className="mt-4 flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">{plan.cadence}</span>
                      </div>
                      <ul className="mt-6 flex-1 space-y-3 text-sm">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="mt-6 rounded-full"
                        variant={selected ? "default" : "outline"}
                        onClick={() => setActivePlan(plan.name)}
                      >
                        {selected ? "Selected" : "Choose " + plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Trial CTA */}
        <section className="border-t bg-primary/5">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
            <div>
              <Badge variant="secondary" className="rounded-full">
                <Calendar className="mr-1 size-3" /> Free trial class
              </Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Book a free class. Watch the magic.
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                One hour, no card needed. Your child builds something real and
                you see if we are the right fit, zero pressure.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {["Live teacher, real project", "Picks the perfect age group", "Cancel or keep going, your call"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-2 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold">Claim your free spot</h3>
                <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1.5">
                    <Label htmlFor="parent">Parent name</Label>
                    <Input id="parent" placeholder="Alex Johnson" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="alex@email.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="age">Child&apos;s age</Label>
                    <div className="flex flex-wrap gap-2">
                      {["5", "8", "11", "14"].map((age) => (
                        <Button
                          key={age}
                          type="button"
                          size="sm"
                          variant={trialAge === age ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => setTrialAge(age)}
                        >
                          {age}+
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="w-full rounded-full" size="lg">
                    Book free trial <ArrowRight className="ml-1 size-4" />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No payment details required. Spots fill fast!
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="text-center">
              <Badge variant="outline" className="rounded-full">Questions?</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Things parents ask us
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-8 w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={faq.q} value={"item-" + i}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a href="#top" className="flex items-center gap-2 font-bold">
              <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Rocket className="size-5" />
              </span>
              <span className="text-lg">CodeSprout</span>
            </a>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={"#" + link.toLowerCase().replace(/\s+/g, "-")}
                  className="hover:text-foreground"
                >
                  {link}
                </a>
              ))}
              <a href="#top" className="hover:text-foreground">Contact</a>
            </nav>
          </div>
          <Separator className="my-6" />
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2024 CodeSprout Coding School. Made with curiosity for curious kids.
          </p>
        </div>
      </footer>
    </div>
  )
}
