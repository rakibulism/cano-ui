"use client"
import * as React from "react"
import {
  Dna,
  FlaskConical,
  Microscope,
  Activity,
  HeartPulse,
  Brain,
  ShieldPlus,
  Leaf,
  ArrowRight,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Phone,
  Beaker,
  Atom,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "Science", href: "#areas" },
  { label: "Leadership", href: "#team" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "18", label: "Programs in development" },
  { value: "7", label: "Therapeutic areas" },
  { value: "120+", label: "Peer-reviewed papers" },
  { value: "4", label: "Clinical-stage assets" },
]

type Phase = "Discovery" | "Preclinical" | "Phase I" | "Phase II" | "Phase III"

const PHASE_ORDER: Phase[] = ["Discovery", "Preclinical", "Phase I", "Phase II", "Phase III"]

const PIPELINE: { code: string; indication: string; area: string; phase: Phase }[] = [
  { code: "CN-104", indication: "Treatment-resistant depression", area: "Neuroscience", phase: "Phase III" },
  { code: "CN-217", indication: "Non-small cell lung cancer", area: "Oncology", phase: "Phase II" },
  { code: "CN-330", indication: "Chronic heart failure", area: "Cardiometabolic", phase: "Phase II" },
  { code: "CN-088", indication: "Systemic lupus erythematosus", area: "Immunology", phase: "Phase I" },
  { code: "CN-451", indication: "Pancreatic adenocarcinoma", area: "Oncology", phase: "Preclinical" },
  { code: "CN-512", indication: "Rare metabolic disorder", area: "Rare Disease", phase: "Discovery" },
]

const PHASE_BADGE: Record<Phase, string> = {
  Discovery: "bg-muted text-muted-foreground",
  Preclinical: "bg-secondary text-foreground",
  "Phase I": "bg-primary/10 text-primary",
  "Phase II": "bg-primary/10 text-primary",
  "Phase III": "bg-primary text-primary-foreground",
}

const AREAS = [
  { icon: Activity, title: "Oncology", body: "Precision therapies targeting tumor-driving mutations and the immune microenvironment." },
  { icon: Brain, title: "Neuroscience", body: "Restoring synaptic function across mood, cognition, and neurodegeneration." },
  { icon: HeartPulse, title: "Cardiometabolic", body: "Disease-modifying approaches for heart failure and metabolic dysfunction." },
  { icon: ShieldPlus, title: "Immunology", body: "Selective modulation of immune pathways in autoimmune and inflammatory disease." },
  { icon: Dna, title: "Rare Disease", body: "Genetically targeted medicines for underserved patient populations." },
  { icon: Leaf, title: "Antivirals", body: "Broad-spectrum agents engineered for durability against emerging pathogens." },
]

const TEAM = [
  { name: "Dr. Elena Hartman", role: "Chief Executive Officer", img: "https://i.pravatar.cc/160?img=47", initials: "EH" },
  { name: "Dr. Marcus Vale", role: "Chief Scientific Officer", img: "https://i.pravatar.cc/160?img=12", initials: "MV" },
  { name: "Dr. Priya Anand", role: "Head of Clinical Development", img: "https://i.pravatar.cc/160?img=32", initials: "PA" },
  { name: "Dr. Tomas Reuel", role: "VP, Translational Medicine", img: "https://i.pravatar.cc/160?img=15", initials: "TR" },
]

const PUBLICATIONS = [
  { journal: "Nature Medicine", title: "Selective CN-104 modulation in treatment-resistant depression", year: "2025" },
  { journal: "Cell", title: "Tumor microenvironment remodeling via dual-pathway inhibition", year: "2025" },
  { journal: "The Lancet", title: "Phase II outcomes for CN-330 in chronic heart failure", year: "2024" },
  { journal: "Science Translational Medicine", title: "Biomarker-guided patient stratification in immunology", year: "2024" },
]

const PARTNERS = ["MERIDIAN BIO", "ATLAS GENOMICS", "NORTHWELL", "HELIX LABS", "CALDERA TX", "ORION HEALTH"]

export default function PharmaCompanyTemplate() {
  const [area, setArea] = React.useState<string>("All")

  const areaFilters = React.useMemo(
    () => ["All", ...Array.from(new Set(PIPELINE.map((p) => p.area)))],
    [],
  )
  const filteredPipeline = React.useMemo(
    () => (area === "All" ? PIPELINE : PIPELINE.filter((p) => p.area === area)),
    [area],
  )

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Atom className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Canovera</span>
            <Badge variant="outline" className="ml-1 hidden sm:inline-flex">NASDAQ: CNVR</Badge>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Investors</Button>
            <Button size="sm">Partner with us</Button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.primary/10),transparent)]" aria-hidden="true" />
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-5 gap-1.5">
                <FlaskConical className="h-3.5 w-3.5" /> Science-driven, patient-first
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Engineering medicines from the molecule up
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                We translate deep biological insight into precision therapeutics for the diseases
                that need them most, advancing a pipeline grounded in rigorous, reproducible science.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="gap-2">
                  Explore the pipeline <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Read our science
                </Button>
              </div>
            </div>
          </div>
          {/* Science stat band */}
          <div className="border-t bg-muted/30">
            <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-x divide-border px-4 sm:px-6 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="px-4 py-8 text-center first:pl-0 lg:px-6">
                  <div className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section id="pipeline" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="text-sm font-medium text-primary">Clinical pipeline</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Programs advancing across every phase
              </h2>
              <p className="mt-3 text-muted-foreground">
                From early discovery to late-stage trials, each asset is built on a validated
                mechanism and a clear path to patients.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {areaFilters.map((f) => (
              <button
                key={f}
                onClick={() => setArea(f)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  area === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border">
            <div className="hidden grid-cols-[1fr] bg-muted/40 md:grid">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <div className="col-span-2">Program</div>
                <div className="col-span-4">Indication</div>
                <div className="col-span-2">Area</div>
                <div className="col-span-4">Development phase</div>
              </div>
            </div>
            <div className="divide-y">
              {filteredPipeline.map((p) => (
                <div key={p.code} className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-12 md:items-center">
                  <div className="col-span-2 flex items-center gap-2 font-mono text-sm font-semibold">
                    <Beaker className="h-4 w-4 text-primary" /> {p.code}
                  </div>
                  <div className="col-span-4 text-sm">{p.indication}</div>
                  <div className="col-span-2">
                    <Badge variant="outline">{p.area}</Badge>
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-1.5">
                      {PHASE_ORDER.map((phase) => {
                        const reached = PHASE_ORDER.indexOf(phase) <= PHASE_ORDER.indexOf(p.phase)
                        const current = phase === p.phase
                        return (
                          <div
                            key={phase}
                            className={cn(
                              "h-1.5 flex-1 rounded-full",
                              reached ? "bg-primary" : "bg-muted",
                              current && "ring-2 ring-primary/30",
                            )}
                            aria-hidden="true"
                          />
                        )
                      })}
                    </div>
                    <div className="mt-2">
                      <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", PHASE_BADGE[p.phase])}>
                        {p.phase}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Therapeutic areas */}
        <section id="areas" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium text-primary">Therapeutic areas</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Where our biology runs deepest
              </h2>
              <p className="mt-3 text-muted-foreground">
                We concentrate on areas where mechanism, modality, and unmet need align.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {AREAS.map((a) => (
                <Card key={a.title} className="border bg-card transition-shadow hover:shadow-sm">
                  <CardHeader>
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <a.icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="mt-4 text-lg">{a.title}</CardTitle>
                    <CardDescription>{a.body}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href="#pipeline" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      See programs <ChevronRight className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Approach / science callout */}
        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-medium text-primary">Our approach</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Reproducible science, accountable to patients
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every program begins with human biology. We pair functional genomics with
                translational models and biomarker-guided trial design to move only the
                molecules most likely to help patients.
              </p>
              <div className="mt-8 space-y-5">
                {[
                  { icon: Microscope, title: "Target validation", body: "Genetically and functionally de-risked before a single dose." },
                  { icon: Dna, title: "Modality-agnostic", body: "Small molecules, biologics, and genetic medicines, chosen by the biology." },
                  { icon: Activity, title: "Biomarker-led trials", body: "Stratified cohorts that surface signal earlier and more clearly." },
                ].map((row) => (
                  <div key={row.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <row.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-medium">{row.title}</div>
                      <p className="text-sm text-muted-foreground">{row.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border bg-card">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border">
                  {[
                    { k: "Hit-to-lead", v: "9 mo avg" },
                    { k: "Translational fidelity", v: "92%" },
                    { k: "Trials enrolling", v: "11" },
                    { k: "Patients dosed", v: "3,400+" },
                  ].map((m) => (
                    <div key={m.k} className="bg-card p-6">
                      <div className="text-2xl font-semibold tracking-tight">{m.v}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{m.k}</div>
                    </div>
                  ))}
                </div>
                <Separator className="my-6" />
                <p className="text-sm text-muted-foreground">
                  Operating across discovery, translational, and clinical functions under
                  one rigorous, shared standard of evidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Leadership */}
        <section id="team" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-medium text-primary">Leadership</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Scientists and operators, side by side
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((m) => (
                <Card key={m.name} className="border bg-card text-center">
                  <CardContent className="p-6">
                    <Avatar className="mx-auto h-20 w-20">
                      <AvatarImage src={m.img} alt="" />
                      <AvatarFallback>{m.initials}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 font-medium">{m.name}</div>
                    <div className="text-sm text-muted-foreground">{m.role}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Publications */}
        <section id="publications" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="text-sm font-medium text-primary">Publications</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Our work, in the open literature
              </h2>
              <p className="mt-3 text-muted-foreground">
                Peer review is part of our process, not an afterthought.
              </p>
              <Button variant="outline" className="mt-6 gap-2">
                <FileText className="h-4 w-4" /> View all publications
              </Button>
            </div>
            <div className="divide-y rounded-xl border">
              {PUBLICATIONS.map((pub) => (
                <a key={pub.title} href="#" className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-muted/40">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{pub.journal}</Badge>
                      <span className="text-xs text-muted-foreground">{pub.year}</span>
                    </div>
                    <div className="mt-2 text-sm font-medium">{pub.title}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Partners strip */}
          <div className="mt-16">
            <p className="text-center text-sm text-muted-foreground">Trusted by research and clinical partners worldwide</p>
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3 lg:grid-cols-6">
              {PARTNERS.map((p) => (
                <div key={p} className="flex items-center justify-center bg-card px-4 py-6 text-sm font-semibold tracking-wide text-muted-foreground">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-primary">Get in touch</span>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Partner, invest, or join the mission
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Whether you are a collaborator, an investor, or a scientist, we would like
                  to hear from you.
                </p>
                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Mail className="h-4 w-4" /></span>
                    partnerships@canovera.bio
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><Phone className="h-4 w-4" /></span>
                    +1 (617) 555-0142
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><MapPin className="h-4 w-4" /></span>
                    300 Genome Way, Cambridge, MA
                  </div>
                </div>
              </div>
              <Card className="border bg-card">
                <CardContent className="p-6">
                  <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="grid gap-1.5">
                        <Label htmlFor="fn">First name</Label>
                        <Input id="fn" placeholder="Jane" />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="ln">Last name</Label>
                        <Input id="ln" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="email">Work email</Label>
                      <Input id="email" type="email" placeholder="jane@institute.org" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="org">Organization</Label>
                      <Input id="org" placeholder="Research institute or company" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="msg">How can we help?</Label>
                      <Textarea id="msg" rows={4} placeholder="Tell us about your interest..." />
                    </div>
                    <Button type="submit" size="lg" className="mt-1 w-full">Send message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <a href="#top" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Atom className="h-4 w-4" />
              </span>
              <span className="font-semibold">Canovera Therapeutics</span>
            </a>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
              {NAV.map((n) => (
                <a key={n.label} href={n.href} className="hover:text-foreground">{n.label}</a>
              ))}
              <a href="#" className="hover:text-foreground">Careers</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
            </nav>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-xs text-muted-foreground">
            (c) 2026 Canovera Therapeutics, Inc. Forward-looking statements are subject to risks and uncertainties.
          </p>
        </div>
      </footer>
    </div>
  )
}
