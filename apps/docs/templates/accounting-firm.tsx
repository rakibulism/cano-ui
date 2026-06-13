"use client"
import * as React from "react"
import { Calculator, BookOpen, ShieldCheck, TrendingUp, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Award, Building2, Briefcase, HeartPulse, Store, Quote, FileSearch, Handshake, ClipboardCheck, Star, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Who We Serve", href: "#clients" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

const SERVICES = [
  { icon: Calculator, title: "Tax Planning & Prep", desc: "Year-round strategy and accurate filing for individuals, partnerships, and corporations.", points: ["Federal & state returns", "Multi-state filings", "IRS representation"] },
  { icon: BookOpen, title: "Bookkeeping", desc: "Clean, reconciled books every month so you always know where you stand.", points: ["Monthly close", "Payroll support", "Cash-flow reporting"] },
  { icon: ShieldCheck, title: "Audit & Assurance", desc: "Independent audits, reviews, and compilations that satisfy lenders and boards.", points: ["Financial statement audits", "Internal controls", "Compliance reviews"] },
  { icon: TrendingUp, title: "Advisory", desc: "Forward-looking guidance on growth, entity structure, and succession.", points: ["Budgeting & forecasts", "M&A support", "CFO advisory"] },
]

const CLIENTS = [
  { icon: Store, title: "Small Business", desc: "Retailers, restaurants, and service firms keeping the books tidy and taxes lean." },
  { icon: Building2, title: "Real Estate", desc: "Investors and developers managing depreciation, 1031 exchanges, and entities." },
  { icon: HeartPulse, title: "Healthcare", desc: "Practices and clinics navigating payroll, compliance, and partner distributions." },
  { icon: Briefcase, title: "Professional Services", desc: "Law firms, agencies, and consultancies optimizing cash flow and structure." },
]

const PROCESS = [
  { icon: Phone, step: "01", title: "Discovery Call", desc: "We learn your goals, review last year's numbers, and scope the engagement." },
  { icon: FileSearch, step: "02", title: "Assessment", desc: "A fixed-fee proposal with a clear plan tailored to your situation." },
  { icon: ClipboardCheck, step: "03", title: "Execution", desc: "We handle the filings, the books, and the deadlines so you don't have to." },
  { icon: Handshake, step: "04", title: "Ongoing Partnership", desc: "Quarterly reviews and proactive advice keep you ahead all year." },
]

const CREDENTIALS = ["AICPA Member", "State CPA Society", "QuickBooks ProAdvisor", "Enrolled Agents", "PCAOB Registered", "Xero Certified"]

const TEAM = [
  { name: "Margaret Chen, CPA", role: "Managing Partner", img: "https://i.pravatar.cc/160?img=47", focus: "Tax Strategy" },
  { name: "David Okafor, CPA", role: "Audit Partner", img: "https://i.pravatar.cc/160?img=12", focus: "Assurance" },
  { name: "Priya Nair, EA", role: "Senior Tax Manager", img: "https://i.pravatar.cc/160?img=32", focus: "Small Business" },
  { name: "James Whitfield", role: "Advisory Director", img: "https://i.pravatar.cc/160?img=15", focus: "CFO Services" },
]

const TESTIMONIALS = [
  { quote: "They turned our messy books into a clear picture and saved us five figures on taxes the first year.", name: "Lena Torres", title: "Owner, Bright Harbor Cafe" },
  { quote: "The audit was painless and on time. Our board finally trusts the numbers without a second thought.", name: "Marcus Reed", title: "CFO, Meridian Realty" },
  { quote: "Having a real advisor on call changed how we run the practice. Proactive, not reactive.", name: "Dr. Aisha Kamau", title: "Partner, Lakeside Dental" },
]

const STATS = [
  { value: "30+", label: "Years in practice" },
  { value: "1,200+", label: "Clients served" },
  { value: "$48M", label: "Tax savings delivered" },
  { value: "98%", label: "Client retention" },
]

export default function AccountingFirmPage() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Calculator className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Hallow & Pierce</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a key={n.label} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+15551234567" className="text-sm font-medium text-muted-foreground hover:text-foreground">(555) 123-4567</a>
            <Button asChild size="sm"><a href="#contact">Book a Consult</a></Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {open && (
          <nav className="border-t md:hidden" aria-label="Mobile">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3">
              {NAV.map((n) => (
                <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  {n.label}
                </a>
              ))}
              <Button asChild size="sm" className="mt-2"><a href="#contact" onClick={() => setOpen(false)}>Book a Consult</a></Button>
            </div>
          </nav>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
            <div>
              <Badge variant="secondary" className="mb-5">Trusted CPAs since 1994</Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Accounting that gives you back your peace of mind.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                We handle the tax, the books, and the audits so you can focus on running the business. Clear advice, fixed fees, and zero surprises.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg"><a href="#contact">Book a Free Consult <ArrowRight className="ml-1 h-4 w-4" /></a></Button>
                <Button asChild size="lg" variant="outline"><a href="#services">Explore Services</a></Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Fixed-fee pricing</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Dedicated CPA</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Same-week response</span>
              </div>
            </div>
            <Card className="border-primary/20 bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Request a callback</CardTitle>
                <CardDescription>A partner will reach out within one business day.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="hero-name">Full name</Label>
                  <Input id="hero-name" placeholder="Jane Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hero-email">Work email</Label>
                  <Input id="hero-email" type="email" placeholder="jane@company.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hero-need">What do you need help with?</Label>
                  <Input id="hero-need" placeholder="Tax prep, bookkeeping, audit..." />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request callback</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b bg-muted/30">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Services</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Full-service accounting under one roof</h2>
            <p className="mt-4 text-muted-foreground">From the day-to-day to the big decisions, our partners cover every corner of your finances.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((svc) => (
              <Card key={svc.title} className="flex flex-col transition-shadow hover:shadow-md">
                <CardHeader>
                  <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svc.icon className="h-5 w-5" />
                  </span>
                  <CardTitle className="text-lg">{svc.title}</CardTitle>
                  <CardDescription>{svc.desc}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <ul className="space-y-2 text-sm">
                    {svc.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Who We Serve */}
        <section id="clients" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <Badge variant="outline" className="mb-3">Who we serve</Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Specialists for the industries you operate in</h2>
                <p className="mt-4 text-muted-foreground">
                  Generic accounting misses the nuances. We bring deep, sector-specific experience so the advice actually fits your business.
                </p>
                <Button asChild variant="outline" className="mt-6"><a href="#contact">Talk to a specialist <ArrowRight className="ml-1 h-4 w-4" /></a></Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {CLIENTS.map((c) => (
                  <Card key={c.title} className="bg-card">
                    <CardHeader>
                      <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <CardTitle className="text-base">{c.title}</CardTitle>
                      <CardDescription>{c.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">How it works</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A clear path from hello to handled</h2>
            <p className="mt-4 text-muted-foreground">No jargon, no runaround. Here's exactly what working with us looks like.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="relative">
                <div className="flex h-full flex-col rounded-xl border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <p.icon className="h-5 w-5" />
                    </span>
                    <span className="text-2xl font-bold text-muted-foreground/40">{p.step}</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
                {i < PROCESS.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground/40 lg:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <section className="border-y bg-primary/5">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Award className="h-4 w-4 text-primary" /> Accredited, certified, and accountable
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {CREDENTIALS.map((c) => (
                  <Badge key={c} variant="secondary" className="px-3 py-1.5 text-sm">{c}</Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Our partners</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The people behind your numbers</h2>
            <p className="mt-4 text-muted-foreground">You'll work directly with a partner, not a rotating cast of juniors.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m) => (
              <Card key={m.name} className="text-center">
                <CardContent className="flex flex-col items-center pt-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={m.img} alt="" />
                    <AvatarFallback>{m.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-semibold">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                  <Badge variant="outline" className="mt-3">{m.focus}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-3">Client stories</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by businesses that count on the details</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <Card key={t.name} className="flex flex-col bg-card">
                  <CardContent className="flex flex-1 flex-col pt-6">
                    <div className="mb-3 flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="h-6 w-6 text-primary/30" aria-hidden="true" />
                    <p className="mt-2 flex-1 text-sm leading-relaxed">{t.quote}</p>
                    <Separator className="my-4" />
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.title}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary" className="mb-3">Book a consult</Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let's talk about your numbers</h2>
              <p className="mt-4 text-muted-foreground">
                Schedule a free 30-minute consultation. We'll review where you are and outline a clear plan to get you where you want to be.
              </p>
              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Phone className="h-5 w-5" /></span>
                  <div><div className="font-medium">(555) 123-4567</div><div className="text-muted-foreground">Mon–Fri, 9am–6pm</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Mail className="h-5 w-5" /></span>
                  <div><div className="font-medium">hello@hallowpierce.com</div><div className="text-muted-foreground">We reply within a day</div></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></span>
                  <div><div className="font-medium">220 Ledger Street, Suite 400</div><div className="text-muted-foreground">Portland, OR 97204</div></div>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Schedule your consultation</CardTitle>
                <CardDescription>No obligation, no sales pressure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="c-first">First name</Label>
                    <Input id="c-first" placeholder="Jane" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="c-last">Last name</Label>
                    <Input id="c-last" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" type="email" placeholder="jane@company.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-company">Company</Label>
                  <Input id="c-company" placeholder="Acme Inc." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-msg">How can we help?</Label>
                  <Textarea id="c-msg" placeholder="Tell us a bit about your situation..." rows={4} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg">Request consultation <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <a href="#top" className="flex items-center gap-2 font-semibold">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Calculator className="h-5 w-5" />
                </span>
                <span className="text-lg tracking-tight">Hallow & Pierce</span>
              </a>
              <p className="mt-3 text-sm text-muted-foreground">Certified public accountants serving growing businesses since 1994.</p>
            </div>
            <div>
              <div className="text-sm font-semibold">Services</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {SERVICES.map((s) => (<li key={s.title}><a href="#services" className="hover:text-foreground">{s.title}</a></li>))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#team" className="hover:text-foreground">Our Team</a></li>
                <li><a href="#process" className="hover:text-foreground">Our Process</a></li>
                <li><a href="#clients" className="hover:text-foreground">Industries</a></li>
                <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Get in touch</div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (555) 123-4567</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@hallowpierce.com</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Portland, OR</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <span>© 1994–2026 Hallow & Pierce CPAs. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Client Portal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
