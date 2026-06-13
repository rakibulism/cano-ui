"use client"
import * as React from "react"
import {
  HeartPulse,
  CalendarCheck,
  Video,
  Pill,
  Stethoscope,
  Brain,
  Baby,
  Activity,
  ShieldCheck,
  Clock,
  Star,
  Phone,
  ChevronRight,
  Menu,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/ui/accordion"

const NAV = ["How it works", "Services", "Doctors", "Pricing", "FAQ"]

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Book a visit",
    body: "Pick a time that suits you. Same-day appointments are usually available within the hour.",
  },
  {
    icon: Video,
    title: "Consult online",
    body: "Meet a licensed clinician over secure video from your phone, tablet, or laptop.",
  },
  {
    icon: Pill,
    title: "Get your plan",
    body: "Receive a diagnosis, prescription, and follow-up — sent straight to your pharmacy.",
  },
]

const SERVICES = [
  { icon: Stethoscope, name: "Primary care", desc: "Everyday illnesses, checkups, and ongoing care." },
  { icon: Brain, name: "Mental health", desc: "Therapy and psychiatry with vetted specialists." },
  { icon: Baby, name: "Pediatrics", desc: "Trusted care for children, from infancy onward." },
  { icon: Activity, name: "Chronic care", desc: "Managed plans for diabetes, blood pressure, and more." },
  { icon: HeartPulse, name: "Urgent care", desc: "Fast help for non-emergencies, day or night." },
  { icon: Pill, name: "Prescriptions", desc: "Refills and renewals delivered to your door." },
]

const DOCTORS = [
  { name: "Dr. Amara Okafor", role: "Family Medicine", img: "https://i.pravatar.cc/120?img=47", initials: "AO" },
  { name: "Dr. Liam Bennett", role: "Psychiatry", img: "https://i.pravatar.cc/120?img=12", initials: "LB" },
  { name: "Dr. Sofia Marchetti", role: "Pediatrics", img: "https://i.pravatar.cc/120?img=32", initials: "SM" },
  { name: "Dr. Noah Kim", role: "Internal Medicine", img: "https://i.pravatar.cc/120?img=15", initials: "NK" },
]

const INSURERS = ["Aetna", "Cigna", "United", "Humana", "Kaiser", "BlueCross"]

const FAQ = [
  {
    q: "Is my visit covered by insurance?",
    a: "We accept most major insurance plans. You can verify your coverage during booking, and self-pay visits start at a flat, transparent rate.",
  },
  {
    q: "How quickly can I see a clinician?",
    a: "Most patients are seen within 60 minutes of booking. Scheduled visits can be set for any time that works for you, including evenings and weekends.",
  },
  {
    q: "Can I get a prescription online?",
    a: "Yes. When clinically appropriate, your clinician can send prescriptions directly to your preferred pharmacy or arrange home delivery.",
  },
  {
    q: "Is my health data kept private?",
    a: "All consultations are encrypted end to end and stored in a HIPAA-compliant system. Your data is never sold or shared without consent.",
  },
]

const TRUST = [
  { icon: ShieldCheck, label: "HIPAA-compliant & encrypted" },
  { icon: Clock, label: "Care in under 60 minutes" },
  { icon: Star, label: "4.9 average patient rating" },
]

export default function HealthcareLanding() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="text-lg tracking-tight">Wella</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-foreground">
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">Book now</Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        {open && (
          <div className="border-t px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-1 text-sm">
              {NAV.map((item) => (
                <a key={item} href="#" className="rounded-md px-2 py-2 hover:bg-muted">
                  {item}
                </a>
              ))}
              <Button className="mt-2">Book now</Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                Trusted by 2M+ patients
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Quality care, the moment you need it.
              </h1>
              <p className="mt-5 max-w-md text-lg text-muted-foreground">
                See a licensed clinician by video in minutes. No waiting rooms, no
                stress — just calm, reassuring care from home.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-1.5">
                  Book a visit
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Talk to us
                </Button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                {TRUST.map((t) => (
                  <div key={t.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <t.icon className="h-4 w-4 text-primary" />
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" aria-hidden="true" />
              <Card className="relative overflow-hidden border-primary/20">
                <CardContent className="p-0">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80"
                    alt=""
                    className="h-64 w-full object-cover sm:h-80"
                  />
                  <div className="flex items-center justify-between gap-3 p-5">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="" />
                        <AvatarFallback>AO</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Dr. Amara Okafor</p>
                        <p className="text-xs text-muted-foreground">Available now</p>
                      </div>
                    </div>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-sm font-medium text-primary">How it works</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Care in three simple steps
              </h2>
              <p className="mt-3 text-muted-foreground">
                From booking to prescription, the whole visit takes less time than a coffee break.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <Card key={step.title} className="relative">
                  <CardContent className="p-6">
                    <span className="absolute right-5 top-5 text-5xl font-semibold text-muted-foreground/15">
                      {i + 1}
                    </span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <step.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-primary">Services</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Every kind of care, one place
              </h2>
            </div>
            <Button variant="link" className="px-0">
              View all specialties
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Card key={s.name} className="group transition-colors hover:border-primary/40">
                <CardContent className="flex items-start gap-4 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-foreground group-hover:bg-primary/10 group-hover:text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-medium">{s.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Doctors */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-20">
            <div className="mx-auto max-w-xl text-center">
              <p className="text-sm font-medium text-primary">Our clinicians</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Meet the people behind your care
              </h2>
              <p className="mt-3 text-muted-foreground">
                Board-certified, compassionate, and rated 4.9 or higher by patients.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {DOCTORS.map((d) => (
                <Card key={d.name} className="text-center">
                  <CardContent className="flex flex-col items-center p-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={d.img} alt="" />
                      <AvatarFallback>{d.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-medium">{d.name}</h3>
                    <p className="text-sm text-muted-foreground">{d.role}</p>
                    <div className="mt-3 flex items-center gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance */}
        <section className="mx-auto w-full max-w-6xl px-4 py-14">
          <p className="text-center text-sm text-muted-foreground">
            In-network with the plans you already have
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {INSURERS.map((name) => (
              <span
                key={name}
                className="text-xl font-semibold tracking-tight text-muted-foreground/60"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-20">
            <div>
              <p className="text-sm font-medium text-primary">FAQ</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                Questions, answered
              </h2>
              <p className="mt-3 text-muted-foreground">
                Still unsure? Our care team is available around the clock to help.
              </p>
              <Button variant="outline" className="mt-6 gap-2">
                <Phone className="h-4 w-4" />
                Contact support
              </Button>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={item.q} value={"item-" + i}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Book-now CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Feel better, starting today
                </h2>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Book your first visit in under a minute. No commitment, no waiting room.
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarCheck className="h-4 w-4 text-primary" />
                  Next slot: today, within the hour
                </div>
              </div>
              <form
                className="space-y-4 rounded-2xl bg-card p-6 shadow-sm"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="cta-name">Full name</Label>
                  <Input id="cta-name" placeholder="Jordan Reyes" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cta-email">Email</Label>
                  <Input id="cta-email" type="email" placeholder="you@email.com" />
                </div>
                <Button type="submit" className="w-full gap-1.5">
                  Book my visit
                  <Plus className="h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By booking you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div className="max-w-xs">
              <a href="#" className="flex items-center gap-2 font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <HeartPulse className="h-4 w-4" />
                </span>
                Wella
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                Reassuring, on-demand healthcare for you and your family — wherever you are.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
              {[
                { h: "Care", links: ["Primary care", "Mental health", "Pediatrics"] },
                { h: "Company", links: ["About", "Clinicians", "Careers"] },
                { h: "Support", links: ["Help center", "Insurance", "Contact"] },
              ].map((col) => (
                <div key={col.h}>
                  <p className="font-medium">{col.h}</p>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a href="#" className="hover:text-foreground">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
            <p>© 2024 Wella Health, Inc. All rights reserved.</p>
            <p>Not for medical emergencies — call your local emergency number.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
