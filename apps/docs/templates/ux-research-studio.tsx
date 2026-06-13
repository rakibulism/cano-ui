"use client"

import * as React from "react"
import {
  ArrowRight,
  MessagesSquare,
  MousePointerClick,
  ClipboardList,
  Eye,
  LineChart,
  Layers,
  Compass,
  Microscope,
  FileSearch,
  Sparkles,
  Check,
  Quote,
  Mail,
  Phone,
  MapPin,
  Menu,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV_LINKS = ["Methods", "Case Study", "Process", "Team", "Packages"]

const METHODS = [
  {
    icon: MessagesSquare,
    title: "User Interviews",
    description:
      "Deep one-on-one conversations that surface the motivations, frustrations, and mental models behind behavior.",
    tag: "Qualitative",
  },
  {
    icon: MousePointerClick,
    title: "Usability Testing",
    description:
      "Moderated and unmoderated sessions that show exactly where users hesitate, fail, or delight.",
    tag: "Evaluative",
  },
  {
    icon: ClipboardList,
    title: "Surveys at Scale",
    description:
      "Statistically grounded questionnaires that quantify attitudes across thousands of respondents.",
    tag: "Quantitative",
  },
  {
    icon: Eye,
    title: "Diary & Field Studies",
    description:
      "Longitudinal, in-context research that captures how products fit into real, everyday routines.",
    tag: "Ethnographic",
  },
  {
    icon: LineChart,
    title: "Benchmarking",
    description:
      "Repeatable SUS and task-success metrics that track experience quality release over release.",
    tag: "Metrics",
  },
  {
    icon: Microscope,
    title: "Concept Validation",
    description:
      "Early-signal testing of prototypes and propositions before a line of production code is written.",
    tag: "Generative",
  },
]

const OUTCOMES = [
  { value: "+38%", label: "Task completion rate" },
  { value: "-52%", label: "Support tickets" },
  { value: "+24", label: "SUS score increase" },
  { value: "6 wks", label: "From kickoff to ship" },
]

const PROCESS = [
  {
    icon: Compass,
    step: "01",
    title: "Frame",
    description:
      "We align on decisions the research must inform, then write sharp, falsifiable questions.",
  },
  {
    icon: FileSearch,
    step: "02",
    title: "Recruit & Study",
    description:
      "We source the right participants and run rigorous, bias-aware sessions across your audience.",
  },
  {
    icon: Layers,
    step: "03",
    title: "Synthesize",
    description:
      "Raw signal becomes themes, journey maps, and an evidence library your whole team can search.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Activate",
    description:
      "Prioritized recommendations land in your backlog with owners, severity, and expected impact.",
  },
]

const TEAM = [
  {
    name: "Mara Velez",
    role: "Principal Researcher",
    initials: "MV",
    img: "https://i.pravatar.cc/160?img=47",
  },
  {
    name: "Theo Nakamura",
    role: "Research Operations",
    initials: "TN",
    img: "https://i.pravatar.cc/160?img=12",
  },
  {
    name: "Priya Anand",
    role: "Quant & Survey Lead",
    initials: "PA",
    img: "https://i.pravatar.cc/160?img=32",
  },
  {
    name: "Lukas Brandt",
    role: "Design Strategist",
    initials: "LB",
    img: "https://i.pravatar.cc/160?img=15",
  },
]

const PACKAGES = [
  {
    name: "Sprint",
    price: "$9k",
    cadence: "per study",
    description: "A single focused study, scoped and shipped in two weeks.",
    features: [
      "1 research method",
      "Up to 8 participants",
      "Highlight reel + readout",
      "Prioritized findings doc",
    ],
    featured: false,
  },
  {
    name: "Program",
    price: "$14k",
    cadence: "per month",
    description: "Continuous discovery embedded alongside your product team.",
    features: [
      "Mixed-method studies",
      "Dedicated researcher",
      "Searchable insight library",
      "Bi-weekly stakeholder syncs",
      "Recruiting handled end-to-end",
    ],
    featured: true,
  },
  {
    name: "Atlas",
    price: "Custom",
    cadence: "engagement",
    description: "Org-wide research strategy, ops, and team enablement.",
    features: [
      "ResearchOps setup",
      "Repository & governance",
      "Team training & playbooks",
      "Quarterly benchmark program",
    ],
    featured: false,
  },
]

export default function UxResearchStudio() {
  const [activeMethod, setActiveMethod] = React.useState(0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Microscope className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">Northlight Research</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button size="sm" className="hidden sm:inline-flex">
              Book a discovery call
            </Button>
            <Button size="icon" variant="ghost" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5">
                Evidence over opinion
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Research that turns user behavior into product decisions.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                We are a UX and product research studio. We talk to your users, test
                your designs, and hand your team the evidence to build the right thing
                next.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg">
                  Start a study
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  See our methods
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Trusted by product teams at fintech, health, and SaaS scale-ups.
              </p>
            </div>
            <div className="relative">
              <Card className="bg-card">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    Live study snapshot
                  </Badge>
                  <CardTitle className="text-xl">Checkout redesign — Round 2</CardTitle>
                  <CardDescription>Moderated usability, 12 participants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Task success", value: "92%" },
                    { label: "Avg. time on task", value: "41s" },
                    { label: "Confusion points", value: "3 flagged" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{row.label}</span>
                      <span className="text-sm font-medium tabular-nums">{row.value}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="rounded-lg bg-muted/30 p-4">
                    <Quote className="mb-2 h-4 w-4 text-primary" />
                    <p className="text-sm italic text-muted-foreground">
                      "I finally understand exactly where the shipping fee comes from."
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">P7, returning customer</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Methods */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">Methods, matched to the question</h2>
              <p className="mt-3 text-muted-foreground">
                We mix qualitative depth with quantitative confidence so every recommendation
                is grounded in real signal.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {METHODS.map((method, i) => {
                const Icon = method.icon
                const active = i === activeMethod
                return (
                  <button
                    key={method.title}
                    type="button"
                    onClick={() => setActiveMethod(i)}
                    className={cn(
                      "group rounded-xl border bg-card p-6 text-left transition-colors hover:border-primary",
                      active && "border-primary ring-1 ring-primary"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-foreground transition-colors",
                        active && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="mt-4 flex items-center gap-2">
                      <h3 className="font-medium">{method.title}</h3>
                      <Badge variant="outline" className="ml-auto text-[10px]">
                        {method.tag}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{method.description}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Case study */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Case study
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Rebuilding onboarding for a health platform
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Activation had stalled at 41%. Over a six-week mixed-method engagement we ran
                  interviews, a 1,400-person survey, and three rounds of usability testing to find
                  the exact friction killing first-week retention.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Mapped the full first-run journey across 18 real users",
                    "Isolated two dead-end screens responsible for most drop-off",
                    "Validated the redesigned flow before any engineering spend",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-8">
                  Read the full write-up
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {OUTCOMES.map((o) => (
                  <Card key={o.label} className="bg-card">
                    <CardContent className="p-6">
                      <p className="text-3xl font-semibold tracking-tight tabular-nums text-primary">
                        {o.value}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{o.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">How an engagement works</h2>
              <p className="mt-3 text-muted-foreground">
                A clear, repeatable path from open question to confident decision.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS.map((p, i) => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="relative">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-medium tabular-nums text-muted-foreground">
                        {p.step}
                      </span>
                    </div>
                    <h3 className="mt-4 font-medium">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                    {i < PROCESS.length - 1 && (
                      <Separator className="mt-6 lg:hidden" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">The people on your study</h2>
              <p className="mt-3 text-muted-foreground">
                Senior researchers who have run discovery for hundreds of products — no
                hand-offs to juniors.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((member) => (
                <Card key={member.name} className="bg-card text-center">
                  <CardContent className="flex flex-col items-center p-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={member.img} alt="" />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">Engagement packages</h2>
              <p className="mt-3 text-muted-foreground">
                Whether you need a single answer or an always-on discovery engine, there is a
                way in.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {PACKAGES.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={cn(
                    "flex flex-col bg-card",
                    pkg.featured && "border-primary ring-1 ring-primary"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      {pkg.featured && <Badge>Most popular</Badge>}
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold tracking-tight">{pkg.price}</span>
                      <span className="text-sm text-muted-foreground">/ {pkg.cadence}</span>
                    </div>
                    <CardDescription className="mt-2">{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={pkg.featured ? "default" : "outline"}
                    >
                      Choose {pkg.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">Tell us what you need to learn</h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Share the decision you are facing and we will reply within one business day
                  with a recommended approach.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="text-muted-foreground">studio@northlightresearch.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span className="text-muted-foreground">+1 (415) 555-0142</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="text-muted-foreground">Remote-first · Studio in Lisbon</span>
                  </div>
                </div>
              </div>
              <Card className="bg-card">
                <CardContent className="p-6">
                  <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Jane Cooper" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Work email</Label>
                        <Input id="email" type="email" placeholder="jane@company.com" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal">What decision do you need to make?</Label>
                      <Textarea
                        id="goal"
                        rows={4}
                        placeholder="We are deciding whether to redesign our onboarding before launch..."
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Request a proposal
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Microscope className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium">Northlight Research</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Northlight Research Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Ethics", "Careers"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
