"use client"

import * as React from "react"
import {
  Factory,
  Cog,
  Wrench,
  Hammer,
  Boxes,
  Ruler,
  ShieldCheck,
  Gauge,
  Truck,
  Award,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

const NAV = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Industries", href: "#industries" },
  { label: "Certifications", href: "#certifications" },
  { label: "Facilities", href: "#facilities" },
]

const CAPABILITIES = [
  {
    icon: Cog,
    title: "CNC Machining",
    desc: "5-axis precision milling and turning to tolerances of ±0.0005\" across alloys and exotics.",
  },
  {
    icon: Hammer,
    title: "Metal Fabrication",
    desc: "Laser cutting, press braking, and robotic welding for low- and high-volume runs.",
  },
  {
    icon: Boxes,
    title: "Injection Molding",
    desc: "Multi-cavity tooling and engineered resins for repeatable, scalable plastic components.",
  },
  {
    icon: Ruler,
    title: "Tool & Die",
    desc: "In-house design and build of dies, jigs, and fixtures to keep your line running.",
  },
  {
    icon: Gauge,
    title: "Quality & Metrology",
    desc: "CMM inspection, FAI reporting, and statistical process control on every lot.",
  },
  {
    icon: Truck,
    title: "Assembly & Logistics",
    desc: "Turnkey sub-assembly, kitting, and JIT delivery direct to your dock.",
  },
]

const STATS = [
  { value: "240,000", unit: "sq ft", label: "Climate-controlled floor space" },
  { value: "38", unit: "yrs", label: "In continuous operation" },
  { value: "120+", unit: "machines", label: "CNC & fabrication cells" },
  { value: "99.4", unit: "%", label: "On-time delivery rate" },
]

const CERTS = [
  "ISO 9001:2015",
  "AS9100D",
  "IATF 16949",
  "ITAR Registered",
  "NADCAP",
  "ISO 14001",
]

const INDUSTRIES = [
  { icon: Factory, name: "Aerospace & Defense", note: "Flight-critical components" },
  { icon: Cog, name: "Automotive", note: "High-volume drivetrain parts" },
  { icon: Gauge, name: "Medical Devices", note: "Cleanroom-ready assemblies" },
  { icon: Boxes, name: "Industrial Equipment", note: "Heavy machinery housings" },
  { icon: ShieldCheck, name: "Energy & Power", note: "Turbine and grid hardware" },
  { icon: Wrench, name: "Robotics", note: "Precision motion parts" },
]

const PROCESS = [
  { step: "01", title: "Consult & Quote", desc: "Share your drawings; we return a DFM review and firm quote within 48 hours." },
  { step: "02", title: "Prototype", desc: "Rapid first articles validated against your spec before full production." },
  { step: "03", title: "Produce", desc: "Scaled runs with SPC monitoring and full lot traceability." },
  { step: "04", title: "Deliver", desc: "Inspected, documented, and shipped on your schedule, every time." },
]

export default function ManufacturingCo() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Factory className="h-5 w-5" />
            </span>
            <span className="text-base font-bold tracking-tight">Meridian Manufacturing</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild size="sm">
              <a href="#quote">Request a Quote</a>
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {menuOpen ? (
          <div className="border-t md:hidden">
            <nav className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Mobile">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Button asChild size="sm" className="mt-2">
                <a href="#quote" onClick={() => setMenuOpen(false)}>Request a Quote</a>
              </Button>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="top" className="flex flex-1 flex-col">
        {/* Hero */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 rounded-full">
                Precision since 1986
              </Badge>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Built to spec.
                <span className="block text-primary">Made to last.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Full-service contract manufacturing for the world&apos;s most demanding
                industries. From a single prototype to a million-piece run, we deliver
                precision parts on time, every time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#quote">
                    Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#capabilities">View Capabilities</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> ISO 9001 certified
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Made in the USA
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> 48-hour quotes
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s, i) => (
                  <Card
                    key={s.label}
                    className={cn(
                      "border bg-card",
                      i === 0 && "col-span-2 border-primary/40 bg-primary/10",
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                          {s.value}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {s.unit}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Capabilities
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              One partner, end to end
            </h2>
            <p className="mt-3 text-muted-foreground">
              Vertically integrated under one roof so your part never leaves our control,
              from raw stock to finished assembly.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <Card key={c.title} className="group border bg-card transition-colors hover:border-primary/50">
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications band */}
        <section id="certifications" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Certified to the highest standards</h2>
                  <p className="text-sm text-muted-foreground">
                    Audited annually and trusted across regulated industries.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {CERTS.map((cert) => (
                  <span
                    key={cert}
                    className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-2 text-sm font-semibold"
                  >
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">How we work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              From drawing to dock
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="bg-card p-6">
                <span className="text-4xl font-extrabold text-primary/30">{p.step}</span>
                <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section id="industries" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Industries served
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Trusted where failure is not an option
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((ind) => (
                <Card key={ind.name} className="border bg-card">
                  <CardContent className="flex items-center gap-4 p-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <ind.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{ind.name}</h3>
                      <p className="text-sm text-muted-foreground">{ind.note}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities highlight */}
        <section id="facilities" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Our facilities
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                A factory engineered for throughput
              </h2>
              <p className="mt-4 text-muted-foreground">
                Three connected production halls in Toledo, Ohio run lights-out shifts on
                automated cells, backed by an on-site metrology lab and tool room.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Lights-out automation across machining cells",
                  "Climate-controlled CMM inspection lab",
                  "On-site heat treat and surface finishing",
                  "Full material traceability and lot control",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-primary p-6 text-primary-foreground sm:col-span-2">
                <Gauge className="h-7 w-7" />
                <p className="mt-4 text-3xl font-extrabold tracking-tight">12.5M parts</p>
                <p className="text-sm opacity-90">shipped in the last fiscal year</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <p className="text-2xl font-extrabold tracking-tight">3 halls</p>
                <p className="text-sm text-muted-foreground">connected under one roof</p>
              </div>
              <div className="rounded-xl border bg-card p-6">
                <p className="text-2xl font-extrabold tracking-tight">24 / 7</p>
                <p className="text-sm text-muted-foreground">automated production</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote CTA */}
        <section id="quote" className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Request a quote
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                  Send us your drawings and target volumes. Our engineers return a DFM
                  review and firm pricing within two business days.
                </p>
                <Separator className="my-8" />
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Sales line</p>
                      <p className="text-sm text-muted-foreground">+1 (419) 555-0142</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Email</p>
                      <p className="text-sm text-muted-foreground">quotes@meridianmfg.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">Plant</p>
                      <p className="text-sm text-muted-foreground">2400 Industrial Pkwy, Toledo, OH</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card className="border bg-card">
                <CardContent className="p-6 sm:p-8">
                  <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" placeholder="Jordan Pierce" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Acme Industrial" />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Work email</Label>
                        <Input id="email" type="email" placeholder="you@company.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="volume">Annual volume</Label>
                        <Input id="volume" placeholder="e.g. 25,000 units" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="details">Project details</Label>
                      <Textarea
                        id="details"
                        rows={4}
                        placeholder="Material, tolerances, finishing, target timeline..."
                      />
                    </div>
                    <Button type="submit" size="lg" className="mt-1 w-full">
                      Submit request <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      We respond to every inquiry within 48 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Factory className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">Meridian Manufacturing</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; 1986&ndash;2026 Meridian Manufacturing Co. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#capabilities" className="hover:text-foreground">Capabilities</a>
            <a href="#quote" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
