"use client"

import * as React from "react"
import {
  Newspaper,
  Download,
  Palette,
  Image as ImageIcon,
  Type,
  ArrowRight,
  Mail,
  ExternalLink,
  Building2,
  Users,
  Globe2,
  Rocket,
  Quote,
  Copy,
  CheckCircle2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const assetCards = [
  {
    title: "Logos & Wordmark",
    description: "SVG and PNG in primary, mono, and reversed variants.",
    icon: ImageIcon,
    size: "4.2 MB",
    format: ".ZIP",
  },
  {
    title: "Brand Colors",
    description: "Full palette with HEX, RGB, and accessibility notes.",
    icon: Palette,
    size: "120 KB",
    format: ".PDF",
  },
  {
    title: "Product Screenshots",
    description: "High-resolution captures of the web and mobile app.",
    icon: Newspaper,
    size: "18.6 MB",
    format: ".ZIP",
  },
  {
    title: "Typography",
    description: "Approved typefaces, weights, and usage guidelines.",
    icon: Type,
    size: "2.1 MB",
    format: ".ZIP",
  },
]

const palette = [
  { name: "Ink", hex: "#0F172A", className: "bg-foreground" },
  { name: "Primary", hex: "#4F46E5", className: "bg-primary" },
  { name: "Accent", hex: "#E2E8F0", className: "bg-accent" },
  { name: "Surface", hex: "#F8FAFC", className: "bg-muted" },
]

const facts = [
  { label: "Founded", value: "2021" },
  { label: "Team members", value: "84" },
  { label: "Customers", value: "12,000+" },
  { label: "Countries served", value: "37" },
]

const founders = [
  {
    name: "Dana Whitfield",
    role: "Co-founder & CEO",
    bio: "Former product lead at two infrastructure startups. Drives company strategy and partnerships.",
    initials: "DW",
  },
  {
    name: "Marco Estevez",
    role: "Co-founder & CTO",
    bio: "Distributed systems engineer. Architects the platform and leads the engineering org.",
    initials: "ME",
  },
  {
    name: "Priya Nandakumar",
    role: "Co-founder & COO",
    bio: "Scaled operations at a high-growth fintech. Owns finance, people, and customer success.",
    initials: "PN",
  },
]

const pressMentions = [
  {
    outlet: "TechCrunch",
    headline: "Northgate raises $40M Series B to rethink data infrastructure",
    date: "May 14, 2026",
  },
  {
    outlet: "The Verge",
    headline: "How a quiet startup became the backbone for 12,000 teams",
    date: "Apr 2, 2026",
  },
  {
    outlet: "Forbes",
    headline: "The next generation of platform tooling, according to Northgate",
    date: "Feb 19, 2026",
  },
  {
    outlet: "Wired",
    headline: "Inside the engineering culture powering Northgate's growth",
    date: "Jan 8, 2026",
  },
]

export default function PressKitTemplate() {
  const [copied, setCopied] = React.useState(false)

  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Northgate</span>
            <Badge variant="secondary" className="ml-1">Press Kit</Badge>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#assets" className="transition-colors hover:text-foreground">Brand assets</a>
            <a href="#facts" className="transition-colors hover:text-foreground">Fast facts</a>
            <a href="#founders" className="transition-colors hover:text-foreground">Leadership</a>
            <a href="#press" className="transition-colors hover:text-foreground">In the news</a>
          </nav>
          <Button size="sm">
            <Download className="h-4 w-4" />
            Full kit
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
            <Badge variant="outline" className="mb-5 gap-1.5">
              <Rocket className="h-3.5 w-3.5" />
              Media & Brand Resources
            </Badge>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              The infrastructure layer for modern data teams.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Everything journalists, partners, and analysts need to tell the
              Northgate story accurately, all in one place. Download our logos,
              brand guidelines, and high-resolution imagery below.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg">
                <Download className="h-4 w-4" />
                Download press kit
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="h-4 w-4" />
                Contact media team
              </Button>
            </div>
          </div>
        </section>

        <section id="assets" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Brand assets</h2>
            <p className="mt-2 text-muted-foreground">
              Approved files for press and partner use. Please follow our brand
              guidelines when reproducing any of these assets.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {assetCards.map((asset) => (
              <Card key={asset.title} className="flex flex-col transition-shadow hover:shadow-md">
                <CardContent className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <asset.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{asset.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{asset.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{asset.format}</span>
                    <span>{asset.size}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-medium">Brand color palette</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our core colors. Use the primary indigo for accents and CTAs only.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {palette.map((color) => (
                  <div key={color.name} className="flex items-center gap-3">
                    <div className={cn("h-10 w-10 shrink-0 rounded-md border", color.className)} />
                    <div className="text-sm">
                      <div className="font-medium">{color.name}</div>
                      <div className="text-xs text-muted-foreground">{color.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="facts" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Fast facts</h2>
              <p className="mt-2 text-muted-foreground">
                Key numbers about the company, accurate as of our latest reporting.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-card p-8">
                  <div className="text-3xl font-semibold tracking-tight md:text-4xl">{fact.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{fact.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border bg-card p-5">
                <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-medium">Headquarters</div>
                  <div className="text-sm text-muted-foreground">San Francisco, CA, with remote teams worldwide.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border bg-card p-5">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-medium">Backed by</div>
                  <div className="text-sm text-muted-foreground">Tier-one funds across seed through Series B.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="founders" className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Leadership</h2>
            <p className="mt-2 text-muted-foreground">
              Meet the founding team. High-resolution headshots are available in the full press kit.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {founders.map((person) => (
              <Card key={person.name}>
                <CardContent className="p-6">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary/10 text-base font-medium text-primary">
                      {person.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-medium">{person.name}</h3>
                  <p className="text-sm text-primary">{person.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{person.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="press" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">In the news</h2>
              <p className="mt-2 text-muted-foreground">
                Recent coverage from publications around the world.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border bg-card">
              {pressMentions.map((item, i) => (
                <div key={item.headline}>
                  {i > 0 && <Separator />}
                  <a
                    href="#press"
                    className="flex items-center gap-4 p-5 transition-colors hover:bg-muted/50 md:p-6"
                  >
                    <Badge variant="outline" className="shrink-0">{item.outlet}</Badge>
                    <span className="flex-1 text-sm font-medium md:text-base">{item.headline}</span>
                    <span className="hidden shrink-0 text-sm text-muted-foreground sm:block">{item.date}</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
          <Card className="overflow-hidden border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
              <div className="max-w-xl">
                <Quote className="h-7 w-7 text-primary" />
                <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                  Working on a story?
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Our media team typically responds within one business day. Reach
                  out for interviews, quotes, additional assets, or fact-checking.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button size="lg">
                    <Mail className="h-4 w-4" />
                    Email the press team
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setCopied(true)}
                    aria-label="Copy press email address"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        press@northgate.io
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="w-full rounded-xl border bg-card p-6 md:w-72">
                <div className="text-sm font-medium">Media contact</div>
                <Separator className="my-4" />
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">Lena Brooks</div>
                    <div className="text-muted-foreground">Head of Communications</div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    press@northgate.io
                  </div>
                  <Button variant="ghost" size="sm" className="-ml-2 h-8 px-2 text-primary">
                    View media room
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Building2 className="h-3.5 w-3.5" />
            </div>
            <span>Northgate, Inc.</span>
          </div>
          <span>Brand assets are provided for editorial use only.</span>
        </div>
      </footer>
    </div>
  )
}
