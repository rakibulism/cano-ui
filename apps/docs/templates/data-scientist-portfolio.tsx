"use client"
import * as React from "react"
import { Brain, Database, LineChart, Cpu, Mail, Github, Linkedin, FileText, ArrowUpRight, Sparkles, BarChart3, Layers, GitBranch } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const METRICS = [
  { label: "Models in production", value: "27", icon: Cpu },
  { label: "Avg. uplift in F1", value: "+18%", icon: LineChart },
  { label: "Citations", value: "1.4k", icon: FileText },
  { label: "Years of experience", value: "8", icon: BarChart3 },
]

type Category = "All" | "ML" | "NLP" | "CV" | "Analytics"
const FILTERS: Category[] = ["All", "ML", "NLP", "CV", "Analytics"]

const PROJECTS: {
  title: string
  category: Exclude<Category, "All">
  blurb: string
  stack: string[]
  metric: string
}[] = [
  { title: "Churn Prediction Engine", category: "ML", blurb: "Gradient-boosted ensemble that flags at-risk subscribers 30 days early with calibrated probabilities.", stack: ["XGBoost", "SHAP", "Airflow"], metric: "AUC 0.91" },
  { title: "Support Ticket Triage", category: "NLP", blurb: "Fine-tuned transformer routing 12k daily tickets to the right queue with intent + sentiment tags.", stack: ["PyTorch", "HF", "FastAPI"], metric: "94% routing acc." },
  { title: "Shelf Defect Detection", category: "CV", blurb: "On-device object detection for retail planogram compliance across 200 stores.", stack: ["YOLOv8", "ONNX", "OpenCV"], metric: "mAP 0.87" },
  { title: "Revenue Cohort Explorer", category: "Analytics", blurb: "Self-serve dashboard surfacing LTV cohorts and elasticity to the growth team.", stack: ["dbt", "BigQuery", "Looker"], metric: "−40% report time" },
  { title: "Demand Forecasting Suite", category: "ML", blurb: "Hierarchical time-series models reconciling SKU, store and region level forecasts.", stack: ["Prophet", "LightGBM", "Ray"], metric: "MAPE 6.2%" },
  { title: "Semantic Search API", category: "NLP", blurb: "Embedding-backed retrieval service powering docs search with sub-100ms latency.", stack: ["Sentence-T", "FAISS", "Redis"], metric: "p95 82ms" },
]

const SKILLS = [
  { group: "Languages", icon: Database, items: ["Python", "SQL", "R", "Scala"] },
  { group: "ML / DL", icon: Brain, items: ["PyTorch", "scikit-learn", "XGBoost", "Hugging Face"] },
  { group: "Data & Infra", icon: Layers, items: ["Spark", "Airflow", "dbt", "Snowflake"] },
  { group: "MLOps", icon: GitBranch, items: ["MLflow", "Docker", "Kubernetes", "Ray"] },
]

const PUBLICATIONS = [
  { title: "Calibrated Uncertainty for Tabular Churn Models", venue: "KDD Workshop", year: "2024", tag: "First author" },
  { title: "Lightweight Vision Transformers at the Edge", venue: "CVPR Industry Track", year: "2023", tag: "Co-author" },
  { title: "Retrieval-Augmented Triage for Customer Support", venue: "EMNLP Findings", year: "2023", tag: "First author" },
  { title: "Reconciling Hierarchical Demand Forecasts", venue: "International J. Forecasting", year: "2022", tag: "Co-author" },
]

export default function DataScientistPortfolio() {
  const [active, setActive] = React.useState<Category>("All")
  const visible = PROJECTS.filter((p) => active === "All" || p.category === active)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Brain className="h-4 w-4" />
            </span>
            <span>maya.kapoor</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#projects" className="transition-colors hover:text-foreground">Projects</a>
            <a href="#skills" className="transition-colors hover:text-foreground">Stack</a>
            <a href="#publications" className="transition-colors hover:text-foreground">Publications</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <Button size="sm" asChild>
            <a href="#contact">Get in touch</a>
          </Button>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative overflow-hidden border-b">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.primary/15),transparent_55%)]" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Open to senior ML roles
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Maya Kapoor
              </h1>
              <p className="mt-3 text-lg font-medium text-primary">
                Senior Data Scientist & ML Engineer
              </p>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                I turn messy data into reliable, production-grade models. From forecasting and NLP to
                computer vision, I build systems that ship, monitor and earn trust.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href="#projects">View projects <ArrowUpRight className="h-4 w-4" /></a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#contact"><FileText className="h-4 w-4" /> Download CV</a>
                </Button>
                <div className="flex items-center gap-1 pl-1">
                  <Button variant="ghost" size="icon" aria-label="GitHub profile" asChild>
                    <a href="#"><Github className="h-4 w-4" /></a>
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="LinkedIn profile" asChild>
                    <a href="#"><Linkedin className="h-4 w-4" /></a>
                  </Button>
                </div>
              </div>
            </div>

            <Card className="border-primary/20 bg-card/60">
              <CardContent className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border p-0">
                {METRICS.map((m) => (
                  <div key={m.label} className="flex flex-col gap-2 bg-card p-5">
                    <m.icon className="h-5 w-5 text-primary" />
                    <div className="text-2xl font-bold tabular-nums tracking-tight">{m.value}</div>
                    <div className="text-xs leading-tight text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="projects" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Selected projects</h2>
              <p className="mt-2 text-muted-foreground">A sample of shipped, measured work across domains.</p>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    active === f
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <Card key={p.title} className="group flex flex-col transition-colors hover:border-primary/40">
                <CardContent className="flex-1 pt-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{p.category}</Badge>
                    <span className="text-xs font-medium tabular-nums text-primary">{p.metric}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
                </CardContent>
                <CardFooter className="flex-wrap gap-1.5 border-t pt-4">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
          {visible.length === 0 && (
            <p className="mt-10 text-center text-sm text-muted-foreground">No projects in this category yet.</p>
          )}
        </section>

        <section id="skills" className="border-y bg-muted/30 scroll-mt-20">
          <div className="mx-auto w-full max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-bold tracking-tight">Tech stack</h2>
            <p className="mt-2 text-muted-foreground">The tools I reach for, end to end.</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SKILLS.map((s) => (
                <Card key={s.group} className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <s.icon className="h-4.5 w-4.5" />
                      </span>
                      <h3 className="font-semibold">{s.group}</h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.items.map((i) => (
                        <Badge key={i} variant="secondary">{i}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight">Publications</h2>
          <p className="mt-2 text-muted-foreground">Peer-reviewed and workshop papers.</p>
          <ul className="mt-8 divide-y rounded-xl border">
            {PUBLICATIONS.map((pub) => (
              <li key={pub.title} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium leading-snug">{pub.title}</p>
                    <p className="text-sm text-muted-foreground">{pub.venue} &middot; {pub.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-8 sm:pl-0">
                  <Badge variant="outline">{pub.tag}</Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#">Read <ArrowUpRight className="h-3.5 w-3.5" /></a>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="border-t bg-muted/30 scroll-mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">About</h2>
              <Separator className="my-6 max-w-16" />
              <div className="space-y-3">
                <p className="text-sm font-medium">Currently</p>
                <p className="text-sm text-muted-foreground">Lead DS at Northwind Retail, owning the forecasting and personalization stack.</p>
                <p className="pt-2 text-sm font-medium">Previously</p>
                <p className="text-sm text-muted-foreground">Research engineer at a CV startup; MSc in Statistics.</p>
              </div>
            </div>
            <div className="space-y-5 text-pretty text-base leading-relaxed text-muted-foreground">
              <p>
                I care about the unglamorous parts of machine learning: clean evaluation, drift monitoring,
                reproducible pipelines and honest baselines. Good models are a team sport, so I write docs,
                mentor, and pair with engineers to get work into production.
              </p>
              <p>
                Outside of work I maintain two open-source libraries for time-series cross-validation and
                contribute to applied ML reading groups. I am happiest when a stakeholder can trust a number
                without me in the room.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-20">
          <Card className="overflow-hidden border-primary/20">
            <CardContent className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Let&apos;s build something measurable</h2>
                <p className="mt-3 text-muted-foreground">
                  Open to senior data science and ML engineering roles, advisory and speaking. I usually reply within a day.
                </p>
                <div className="mt-6 space-y-3 text-sm">
                  <a href="#" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <Mail className="h-4 w-4 text-primary" /> maya@kapoor.ai
                  </a>
                  <a href="#" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <Github className="h-4 w-4 text-primary" /> github.com/mayakapoor
                  </a>
                  <a href="#" className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground">
                    <Linkedin className="h-4 w-4 text-primary" /> in/mayakapoor
                  </a>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Jordan Lee" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jordan@company.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={4} placeholder="Tell me about the role or project..." />
                </div>
                <Button type="submit" className="w-full">Send message</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Maya Kapoor. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#projects" className="transition-colors hover:text-foreground">Projects</a>
            <a href="#publications" className="transition-colors hover:text-foreground">Publications</a>
            <a href="#contact" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
