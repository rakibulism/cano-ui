"use client"

import * as React from "react"
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Quote,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = ["Story", "Values", "Leadership", "Numbers", "Press"]

const TIMELINE = [
  {
    year: "2014",
    title: "Two engineers, one garage",
    body: "Lena and Marco sketched the first prototype of Northwind on a whiteboard, convinced supply chains deserved better software.",
  },
  {
    year: "2017",
    title: "First thousand customers",
    body: "We crossed a thousand teams running daily operations on the platform and opened our first office in Lisbon.",
  },
  {
    year: "2020",
    title: "Going remote-first",
    body: "We rebuilt the company around distributed work, hiring across fourteen countries without losing our craft-first culture.",
  },
  {
    year: "2023",
    title: "Series C and a new mission",
    body: "A $120M raise let us double down on sustainability tooling, helping customers cut emissions across their logistics.",
  },
  {
    year: "2026",
    title: "Where we are today",
    body: "Eight hundred people, four continents, and a single goal: make global operations radically more transparent.",
  },
]

const VALUES = [
  {
    icon: Compass,
    title: "Customer obsession",
    body: "Every roadmap decision starts with a real operator problem, not an internal opinion.",
  },
  {
    icon: ShieldCheck,
    title: "Earn trust daily",
    body: "We are stewards of mission-critical data and we treat that responsibility with seriousness.",
  },
  {
    icon: Lightbulb,
    title: "Bias for clarity",
    body: "Complex systems demand simple explanations. We write, ship, and lead with clarity.",
  },
  {
    icon: Leaf,
    title: "Build for the long term",
    body: "We optimize for the decade, not the quarter, in our product and our planet.",
  },
]

const LEADERS = [
  {
    name: "Lena Okonkwo",
    role: "Co-founder & CEO",
    img: "https://i.pravatar.cc/160?img=47",
    initials: "LO",
  },
  {
    name: "Marco Reyes",
    role: "Co-founder & CTO",
    img: "https://i.pravatar.cc/160?img=12",
    initials: "MR",
  },
  {
    name: "Priya Nair",
    role: "Chief Product Officer",
    img: "https://i.pravatar.cc/160?img=32",
    initials: "PN",
  },
  {
    name: "David Hsu",
    role: "Chief Financial Officer",
    img: "https://i.pravatar.cc/160?img=15",
    initials: "DH",
  },
  {
    name: "Sofia Bergström",
    role: "VP of Engineering",
    img: "https://i.pravatar.cc/160?img=45",
    initials: "SB",
  },
  {
    name: "Amir Haddad",
    role: "VP of Customer Success",
    img: "https://i.pravatar.cc/160?img=68",
    initials: "AH",
  },
]

const STATS = [
  { value: "800+", label: "Teammates worldwide" },
  { value: "42", label: "Countries served" },
  { value: "$1.4B", label: "Goods routed monthly" },
  { value: "98%", label: "Customer retention" },
]

const INVESTORS = ["Meridian Capital", "Polestar Ventures", "Atlas Growth", "Foundry Partners", "Greenline Fund"]
const PRESS = ["The Ledger", "TechWire", "Global Trade Weekly", "Founders Daily"]

export default function AboutCompanyPage() {
  const [activeYear, setActiveYear] = React.useState(TIMELINE.length - 1)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Northwind</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Section navigation">
            {NAV.map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button size="sm" className="gap-1.5">
            Careers
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <Badge variant="secondary" className="mb-6 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Our story since 2014
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              We make the world&apos;s supply chains radically transparent.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Northwind builds the operating system for modern logistics. Our mission is to give every operator the
              clarity to move goods faster, cheaper, and with a lighter footprint on the planet.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-1.5">
                Read our story
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Meet the team
              </Button>
            </div>
          </div>
        </section>

        <section id="story" className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium text-primary">Our story</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">A decade of building in the open</h2>
              <p className="mt-4 text-muted-foreground">
                From a whiteboard sketch to a platform routing billions in goods, here is how we got here.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
              <div className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1" role="tablist" aria-label="Company timeline years">
                {TIMELINE.map((item, i) => (
                  <button
                    key={item.year}
                    role="tab"
                    aria-selected={activeYear === i}
                    onClick={() => setActiveYear(i)}
                    className={cn(
                      "shrink-0 rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors",
                      activeYear === i
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {item.year}
                  </button>
                ))}
              </div>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold tracking-tight text-primary">{TIMELINE[activeYear].year}</span>
                    <Separator orientation="vertical" className="h-8" />
                    <h3 className="text-xl font-semibold">{TIMELINE[activeYear].title}</h3>
                  </div>
                  <p className="mt-4 max-w-2xl text-muted-foreground">{TIMELINE[activeYear].body}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {TIMELINE.map((item, i) => (
                      <span
                        key={item.year}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          activeYear === i ? "w-10 bg-primary" : "w-5 bg-border"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="values" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium text-primary">What we believe</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The values that guide us</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value) => (
                <Card key={value.title} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <value.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
            <Quote className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <blockquote className="mt-6 text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">
              We never set out to build software. We set out to give operators their time back, so they could focus on
              the decisions only humans can make.
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Avatar>
                <AvatarImage src="https://i.pravatar.cc/160?img=47" alt="" />
                <AvatarFallback>LO</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-semibold">Lena Okonkwo</p>
                <p className="text-sm text-muted-foreground">Co-founder &amp; CEO</p>
              </div>
            </div>
          </div>
        </section>

        <section id="leadership" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <p className="text-sm font-medium text-primary">Leadership</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">The people steering the ship</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LEADERS.map((leader) => (
                <Card key={leader.name} className="group h-full">
                  <CardContent className="flex items-center gap-4 p-5">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={leader.img} alt="" />
                      <AvatarFallback>{leader.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold">{leader.name}</h3>
                      <p className="truncate text-sm text-muted-foreground">{leader.role}</p>
                      <div className="mt-2 flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={"Email " + leader.name}>
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={leader.name + " on LinkedIn"}>
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="numbers" className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="mb-12 flex items-center gap-3">
              <TrendingUp className="h-6 w-6" aria-hidden="true" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">By the numbers</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-bold tracking-tight sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="press" className="border-b">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-primary">Backed by the best</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">Our investors</h3>
                <div className="mt-6 flex flex-wrap gap-3">
                  {INVESTORS.map((name) => (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-lg border bg-card px-4 py-3 text-sm font-medium"
                    >
                      <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      {name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-primary">In the press</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight">What people are saying</h3>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {PRESS.map((name) => (
                    <div
                      key={name}
                      className="flex h-16 items-center justify-center rounded-lg bg-muted px-4 text-center text-sm font-semibold text-muted-foreground"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col items-start gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-12">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 text-primary">
                    <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                    <span className="text-sm font-medium">Join us</span>
                  </div>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight">Help us build the future of logistics</h2>
                  <p className="mt-3 text-muted-foreground">
                    We are hiring across engineering, product, and operations. Come build something that moves the world.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Remote-first, with hubs in Lisbon, Austin &amp; Singapore
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="gap-1.5">
                    View open roles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Life at Northwind
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Compass className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold">Northwind</span>
          </div>
          <p className="text-sm text-muted-foreground">2026 Northwind Logistics, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#story" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#story" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
