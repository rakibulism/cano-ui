"use client"
import * as React from "react"
import {
  Brain,
  ArrowRight,
  Sparkles,
  Database,
  Workflow,
  LineChart,
  Bot,
  ShieldCheck,
  Cpu,
  Zap,
  Github,
  Linkedin,
  Twitter,
  Quote,
  Check,
  Layers,
  Gauge,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "120+", label: "Models shipped to prod" },
  { value: "40ms", label: "Median inference latency" },
  { value: "99.9%", label: "Pipeline uptime" },
  { value: "8x", label: "Avg. workflow speedup" },
]

const SERVICES = [
  {
    icon: Bot,
    title: "LLM Applications",
    desc: "Production copilots, agents, and assistants built on frontier models with guardrails and evals baked in.",
    points: ["Agentic workflows", "Tool & function calling", "Eval harnesses"],
  },
  {
    icon: Database,
    title: "RAG & Retrieval",
    desc: "Grounded answers over your private knowledge with hybrid search, reranking, and citation tracing.",
    points: ["Vector + keyword search", "Chunking strategy", "Source citations"],
  },
  {
    icon: Workflow,
    title: "Automation",
    desc: "Replace brittle manual ops with reliable, observable AI pipelines that run unattended at scale.",
    points: ["Event-driven flows", "Human-in-the-loop", "Audit trails"],
  },
  {
    icon: LineChart,
    title: "Custom ML",
    desc: "Forecasting, classification, and ranking models trained on your data and tuned for your metrics.",
    points: ["Feature pipelines", "Model monitoring", "A/B rollout"],
  },
]

const USE_CASES = [
  {
    icon: ShieldCheck,
    title: "Support deflection",
    desc: "An agent that resolves 60% of tier-1 tickets end to end, with seamless human handoff.",
  },
  {
    icon: Layers,
    title: "Document intelligence",
    desc: "Extract, classify, and summarize contracts and reports across millions of pages.",
  },
  {
    icon: Gauge,
    title: "Revenue forecasting",
    desc: "Probabilistic models that turn noisy pipeline data into board-ready projections.",
  },
  {
    icon: Zap,
    title: "Onboarding copilot",
    desc: "An in-product assistant that cuts time-to-value for new accounts in half.",
  },
]

const RESULTS = [
  { value: "-62%", label: "Support handle time", sub: "FinTech, 5M users" },
  { value: "+34%", label: "Lead conversion", sub: "B2B SaaS platform" },
  { value: "$2.4M", label: "Annual ops savings", sub: "Logistics network" },
  { value: "11 wks", label: "Idea to production", sub: "Healthcare pilot" },
]

const STACK = [
  "OpenAI",
  "Anthropic",
  "LangGraph",
  "pgvector",
  "Pinecone",
  "PyTorch",
  "Ray",
  "Modal",
  "Weights & Biases",
  "Temporal",
  "FastAPI",
  "Kubernetes",
]

const TEAM = [
  {
    name: "Dr. Lena Park",
    role: "Founder & ML Lead",
    img: "https://i.pravatar.cc/160?img=47",
    tag: "ex-Research",
  },
  {
    name: "Marcus Hale",
    role: "Head of Engineering",
    img: "https://i.pravatar.cc/160?img=12",
    tag: "Platform",
  },
  {
    name: "Priya Nair",
    role: "Applied AI Architect",
    img: "https://i.pravatar.cc/160?img=32",
    tag: "RAG",
  },
  {
    name: "Tom Andersson",
    role: "Solutions Director",
    img: "https://i.pravatar.cc/160?img=15",
    tag: "Delivery",
  },
]

const TESTIMONIALS = [
  {
    quote:
      "They moved faster than our internal team thought possible. The agent shipped in six weeks and is now handling thousands of conversations a day.",
    name: "Sara Whitfield",
    role: "VP Product, Northwind",
    img: "https://i.pravatar.cc/120?img=45",
  },
  {
    quote:
      "Real engineers, not prompt jockeys. The eval suite they built gave us the confidence to put generative AI in front of regulated customers.",
    name: "David Okafor",
    role: "CTO, Meridian Health",
    img: "https://i.pravatar.cc/120?img=68",
  },
]

export default function AiAgency() {
  const [activeCase, setActiveCase] = React.useState(0)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Brain className="h-4 w-4" />
            </span>
            Nullspace AI
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
            <Button size="sm">
              Book a call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Badge variant="secondary" className="mb-5 gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Applied AI, shipped to production
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              We build the AI systems your roadmap keeps promising.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Nullspace is an AI development studio. We design, ship, and operate
              LLM apps, retrieval systems, and custom models that hold up under
              real traffic, real data, and real audits.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                See case studies
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card p-6">
                  <div className="text-3xl font-semibold tracking-tight">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3">
              Capabilities
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Full-stack AI, from prototype to platform
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four practice areas, one delivery team. We embed with your engineers
              and own the parts that are hard to get right.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {SERVICES.map((svc) => (
              <Card key={svc.title} className="group transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svc.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4 text-xl">{svc.title}</CardTitle>
                  <CardDescription className="text-base">
                    {svc.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 text-sm">
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section id="use-cases" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-3">
                  Use cases
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Where teams put us to work
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Patterns we have shipped repeatedly, refined into reusable
                blueprints so your build starts ahead.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {USE_CASES.map((uc) => (
                <div
                  key={uc.title}
                  className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-sm"
                >
                  <uc.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-medium">{uc.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case study results band */}
        <section id="work" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="overflow-hidden rounded-2xl border bg-primary text-primary-foreground">
            <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <Badge className="mb-4 bg-primary-foreground/15 text-primary-foreground">
                  Results that ship
                </Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Outcomes, not demos.
                </h2>
                <p className="mt-4 max-w-md text-primary-foreground/80">
                  Every engagement is measured against business metrics we agree on
                  up front. Here is what recent partners moved.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {RESULTS.map((r, i) => (
                    <button
                      key={r.label}
                      onClick={() => setActiveCase(i)}
                      className={cn(
                        "rounded-full border border-primary-foreground/25 px-3 py-1 text-sm transition-colors",
                        activeCase === i
                          ? "bg-primary-foreground text-primary"
                          : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-xl bg-primary-foreground/10 p-8">
                <div className="text-6xl font-semibold tracking-tight">
                  {RESULTS[activeCase].value}
                </div>
                <div className="mt-3 text-lg">{RESULTS[activeCase].label}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">
                  {RESULTS[activeCase].sub}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Cpu className="h-4 w-4" />
              The stack we deploy on
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {STACK.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-full px-3.5 py-1.5 text-sm font-normal"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3">
              Team
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Senior people on every engagement
            </h2>
            <p className="mt-3 text-muted-foreground">
              No hand-off to juniors. The people who scope your project are the
              people who build it.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <Card key={m.name} className="text-center">
                <CardContent className="pt-6">
                  <Avatar className="mx-auto h-20 w-20">
                    <AvatarImage src={m.img} alt="" />
                    <AvatarFallback>{m.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="mt-4 font-medium">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                  <Badge variant="outline" className="mt-3 font-normal">
                    {m.tag}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-5 lg:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="bg-card">
                  <CardContent className="pt-6">
                    <Quote className="h-7 w-7 text-primary/40" />
                    <p className="mt-4 text-lg leading-relaxed">{t.quote}</p>
                    <Separator className="my-6" />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={t.img} alt="" />
                        <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {t.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Badge variant="outline" className="mb-3">
                Contact
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Tell us what you are trying to build
              </h2>
              <p className="mt-4 text-muted-foreground">
                Send a few lines about the problem. We will reply within two
                business days with an honest take on scope, risk, and timeline.
              </p>
              <div className="mt-8 grid gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">NDA on request</div>
                    <div className="text-sm text-muted-foreground">
                      We sign before the first technical call.
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Fast first build</div>
                    <div className="text-sm text-muted-foreground">
                      Working prototype in the first three weeks.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form
                  className="grid gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Ada Lovelace" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" type="email" placeholder="ada@acme.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="project">What are you building?</Label>
                    <Textarea
                      id="project"
                      rows={4}
                      placeholder="We want an AI agent that triages support tickets..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send inquiry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-semibold tracking-tight">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Brain className="h-4 w-4" />
                </span>
                Nullspace AI
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                An applied AI studio building production systems for ambitious
                teams.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="ghost" size="icon" aria-label="Nullspace on GitHub">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Nullspace on LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Nullspace on Twitter">
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
              <div>
                <div className="font-medium">Services</div>
                <ul className="mt-3 grid gap-2 text-muted-foreground">
                  <li>LLM apps</li>
                  <li>RAG</li>
                  <li>Automation</li>
                  <li>Custom ML</li>
                </ul>
              </div>
              <div>
                <div className="font-medium">Company</div>
                <ul className="mt-3 grid gap-2 text-muted-foreground">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <div className="font-medium">Legal</div>
                <ul className="mt-3 grid gap-2 text-muted-foreground">
                  <li>Privacy</li>
                  <li>Terms</li>
                  <li>Security</li>
                </ul>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <span>© 2024 Nullspace AI. All rights reserved.</span>
            <span>Built for teams who ship.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
