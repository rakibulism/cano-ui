"use client"
import * as React from "react"
import {
  Briefcase,
  CalendarDays,
  MapPin,
  Users,
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Mic,
  Handshake,
  GraduationCap,
  Star,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const STATS = [
  { icon: Building2, value: "180+", label: "Companies hiring" },
  { icon: Briefcase, value: "2,400", label: "Open roles" },
  { icon: Users, value: "9,000+", label: "Attendees expected" },
  { icon: Handshake, value: "32", label: "On-site interviews/hr" },
]

const INDUSTRIES = ["All", "Tech", "Finance", "Healthcare", "Creative", "Energy"] as const
type Industry = (typeof INDUSTRIES)[number]

const COMPANIES: { name: string; industry: Exclude<Industry, "All">; roles: number }[] = [
  { name: "Northwind", industry: "Tech", roles: 42 },
  { name: "Lumen Labs", industry: "Tech", roles: 28 },
  { name: "Cortex AI", industry: "Tech", roles: 35 },
  { name: "Sterling & Co", industry: "Finance", roles: 19 },
  { name: "Vault Capital", industry: "Finance", roles: 14 },
  { name: "Meridian Bank", industry: "Finance", roles: 22 },
  { name: "Helix Health", industry: "Healthcare", roles: 31 },
  { name: "CareBridge", industry: "Healthcare", roles: 26 },
  { name: "Nova Pharma", industry: "Healthcare", roles: 12 },
  { name: "Atelier Nine", industry: "Creative", roles: 9 },
  { name: "Pixel Forge", industry: "Creative", roles: 17 },
  { name: "Studio Verde", industry: "Creative", roles: 8 },
  { name: "Helios Power", industry: "Energy", roles: 21 },
  { name: "GridWorks", industry: "Energy", roles: 16 },
  { name: "Terra Renew", industry: "Energy", roles: 11 },
]

const SCHEDULE = [
  { time: "09:00", title: "Doors open & badge pickup", tag: "All day", lead: "Main Concourse" },
  { time: "10:00", title: "Keynote: The 2026 hiring landscape", tag: "Talk", lead: "Hall A" },
  { time: "11:30", title: "Speed networking with recruiters", tag: "Networking", lead: "Hall B" },
  { time: "13:00", title: "Resume clinic & headshot booth", tag: "Workshop", lead: "Studio 2" },
  { time: "14:30", title: "Panel: Breaking into tech without a degree", tag: "Panel", lead: "Hall A" },
  { time: "16:00", title: "On-the-spot interview blocks", tag: "Interviews", lead: "Booth Row" },
]

const PACKAGES = [
  {
    name: "Booth",
    price: "$1,200",
    tagline: "For growing teams",
    featured: false,
    perks: ["6ft branded booth", "2 recruiter passes", "Logo on event map", "Resume database access"],
  },
  {
    name: "Pavilion",
    price: "$3,400",
    tagline: "Most popular",
    featured: true,
    perks: [
      "Premium island booth",
      "6 recruiter passes",
      "Featured logo placement",
      "20-min stage spotlight",
      "Priority interview rooms",
    ],
  },
  {
    name: "Headline",
    price: "$7,500",
    tagline: "Maximum visibility",
    featured: false,
    perks: ["Hall naming rights", "Unlimited passes", "Keynote slot", "Custom branded lounge"],
  },
]

const FAQ = [
  {
    q: "How much does it cost to attend as a job seeker?",
    a: "Attendance is completely free for job seekers. Just register online and bring your badge confirmation on the day.",
  },
  {
    q: "Should I bring printed resumes?",
    a: "Yes. We recommend 15-20 printed copies. A free resume clinic and headshot booth will also be on-site in Studio 2.",
  },
  {
    q: "Can I interview on the same day?",
    a: "Many exhibitors run on-the-spot interview blocks starting at 4:00 PM. Pavilion and Headline partners have dedicated rooms.",
  },
  {
    q: "How do employers reserve a booth?",
    a: "Choose a package below and our partnerships team will confirm your space within one business day.",
  },
]

export default function CareerFairPage() {
  const [industry, setIndustry] = React.useState<Industry>("All")

  const filteredCompanies = React.useMemo(
    () => (industry === "All" ? COMPANIES : COMPANIES.filter((c) => c.industry === industry)),
    [industry]
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Briefcase className="h-4 w-4" />
            </span>
            HireSummit
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#companies" className="transition-colors hover:text-foreground">Companies</a>
            <a href="#schedule" className="transition-colors hover:text-foreground">Schedule</a>
            <a href="#exhibit" className="transition-colors hover:text-foreground">Exhibit</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
            <Button size="sm">Register free</Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Spring 2026 Edition
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Meet your next employer in person.
              </h1>
              <p className="mt-4 max-w-md text-lg text-muted-foreground">
                One day. 180+ companies. Thousands of open roles. The largest career fair on the West Coast.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  Sat, April 18, 2026 · 9AM-6PM
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <MapPin className="h-4 w-4 text-primary" />
                  Moscone West, San Francisco
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Register as a job seeker
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Building2 className="h-4 w-4" />
                  Exhibit as an employer
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <Mic className="h-6 w-6" />
                    <CardTitle className="text-primary-foreground">Live keynotes</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Hiring leaders on what gets candidates noticed in 2026.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="sm:mt-8">
                  <CardHeader>
                    <Handshake className="h-6 w-6 text-primary" />
                    <CardTitle>On-spot offers</CardTitle>
                    <CardDescription>
                      Interview and walk out with an offer the same afternoon.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Star className="h-6 w-6 text-primary" />
                    <CardTitle>Resume clinic</CardTitle>
                    <CardDescription>
                      Free reviews and a professional headshot booth on-site.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-accent sm:mt-8">
                  <CardHeader>
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Networking</CardTitle>
                    <CardDescription>
                      Speed-network with recruiters across every industry.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-b bg-primary text-primary-foreground">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4 py-8 text-center">
                <s.icon className="mb-1 h-6 w-6 opacity-90" />
                <span className="text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</span>
                <span className="text-sm text-primary-foreground/80">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Companies with industry filter */}
        <section id="companies" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Who's hiring</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Participating companies
            </h2>
            <p className="mt-3 text-muted-foreground">
              Filter by industry to find the teams that match your career goals.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {INDUSTRIES.map((ind) => (
              <Button
                key={ind}
                size="sm"
                variant={industry === ind ? "default" : "outline"}
                onClick={() => setIndustry(ind)}
                aria-pressed={industry === ind}
              >
                {ind}
              </Button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {filteredCompanies.map((c) => (
              <Card
                key={c.name}
                className="group flex flex-col items-center justify-center gap-2 p-6 text-center transition-colors hover:border-primary"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                  {c.name.charAt(0)}
                </span>
                <span className="text-sm font-semibold leading-tight">{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.roles} open roles</span>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Showing {filteredCompanies.length} of {COMPANIES.length} companies
          </p>
        </section>

        {/* Schedule */}
        <section id="schedule" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3">April 18</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Event schedule</h2>
            </div>
            <ol className="space-y-3">
              {SCHEDULE.map((item) => (
                <li key={item.time}>
                  <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2 sm:w-28 sm:flex-col sm:items-start sm:gap-1">
                      <Clock className="h-4 w-4 text-primary sm:hidden" />
                      <span className="text-lg font-bold tracking-tight">{item.time}</span>
                    </div>
                    <Separator className="hidden sm:block sm:h-12" orientation="vertical" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.lead}</p>
                    </div>
                    <Badge variant="secondary">{item.tag}</Badge>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Exhibitor packages */}
        <section id="exhibit" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">For employers</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Exhibitor packages</h2>
            <p className="mt-3 text-muted-foreground">
              Reserve your space and meet thousands of qualified candidates in a single day.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p) => (
              <Card
                key={p.name}
                className={cn(
                  "flex flex-col",
                  p.featured && "border-primary shadow-sm ring-1 ring-primary"
                )}
              >
                <CardHeader>
                  {p.featured && (
                    <Badge className="mb-2 w-fit gap-1">
                      <Star className="h-3 w-3" />
                      Most popular
                    </Badge>
                  )}
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>{p.tagline}</CardDescription>
                  <p className="pt-2 text-3xl font-bold tracking-tight">
                    {p.price}
                    <span className="text-sm font-normal text-muted-foreground"> / event</span>
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gap-2" variant={p.featured ? "default" : "outline"}>
                    Reserve {p.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-3">Questions</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
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
        <section className="border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <Card className="overflow-hidden bg-primary text-primary-foreground">
              <CardContent className="flex flex-col items-center gap-4 px-6 py-12 text-center sm:px-12">
                <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Your next role is one Saturday away.
                </h2>
                <p className="max-w-md text-primary-foreground/80">
                  Registration is free for job seekers. Spaces for employers are limited.
                </p>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Register free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Become an exhibitor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <a href="#top" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Briefcase className="h-4 w-4" />
                </span>
                HireSummit
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                The West Coast's largest in-person career fair. Connecting talent with teams since 2014.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
              <div>
                <p className="mb-3 font-medium">Attend</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#companies" className="hover:text-foreground">Companies</a></li>
                  <li><a href="#schedule" className="hover:text-foreground">Schedule</a></li>
                  <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-medium">Employers</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#exhibit" className="hover:text-foreground">Packages</a></li>
                  <li><a href="#exhibit" className="hover:text-foreground">Floor plan</a></li>
                  <li><a href="#exhibit" className="hover:text-foreground">Contact sales</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-3 font-medium">Visit</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    Moscone West
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    April 18, 2026
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2026 HireSummit. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#top" className="flex items-center gap-1 hover:text-foreground">
                Back to top
                <ChevronRight className="h-3.5 w-3.5 -rotate-90" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
